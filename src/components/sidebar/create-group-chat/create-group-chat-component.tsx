import { useState } from "react";

import { useSelector, useDispatch} from "react-redux";

//import selectors
import { selectTaggedUsers } from "../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../redux/user/userSelector";

//import redux action(s)
import { createGroupConversation, clearTaggedUsers } from "../../../redux/chat/chatReducer";

//import components
import { UnderlineInput } from "./underline-input-component";
import { SearchUserInput } from "./search-user-input";
import { UserSearchList } from "./user-search-list-component";
import { TaggedUserList } from "./tagged-user-list-component";

//import SVG icon
import { ReturnIcon } from "../../../svg";

export const CreateGroupChat = ({setShowCreateGroupChat}) => {
    const dispatch = useDispatch();

    const taggedUsers = useSelector(selectTaggedUsers);
    const {access_token} = useSelector(selectCurrentUser);

    const [groupName, setGroupName] = useState<string>("");
    const [userSearchResults, setUserSearchResults] = useState([]);

    const hideSelectGroupChat = () => {
        setShowCreateGroupChat(false);
    };

    const taggedUserIds = [];

    for (const user  of taggedUsers){
        taggedUserIds.push(user._id);
    }

    const values = {
        addedUsers: taggedUserIds,
        groupConversationName: groupName,
        access_token,
    };

    const openGroupConvo = async () => {
        await dispatch(createGroupConversation(values));
        await dispatch(clearTaggedUsers());
        setShowCreateGroupChat(false);
    };

    // console.log(taggedUsers);
    // console.log(groupName);
    console.log(taggedUserIds);

  return (
    <div className="createGroupAnimation relative flex0030 h-full w-full">
        {/* container */}
        <div className="mt-5">
            <div className="w-full flex justify-between">
                <button className="btn w-8 h-8 border-4 border-green_3" onClick={hideSelectGroupChat}>
                    <ReturnIcon className="dark:fill-green_1 h-full w-full"></ReturnIcon>
                </button>

                <button className="dark:text-green_3 hover:dark:text-green_1 hover:transition-all hover:underline" onClick={openGroupConvo}>
                    + create group chat
                </button>
            </div>


            {/* group name input */}
            <UnderlineInput groupName={groupName} setGroupName={setGroupName}></UnderlineInput>

            {
                taggedUsers && taggedUsers.length > 0
                ? (
                    <TaggedUserList taggedUsers={taggedUsers}></TaggedUserList>
                ) : null
            }

            {/* search input component */}
            <SearchUserInput setUserSearchResults={setUserSearchResults} ></SearchUserInput>

            {/* user list */}
            {
                !userSearchResults
                ? (
                    <div className="mt-2">
                        <h1 className="text-white text-2xl tracking-wide">No users found!</h1>
                    </div>
                ) : (
                    <UserSearchList userSearchResults={userSearchResults} setUserSearchResults={setUserSearchResults}></UserSearchList>
                )
            }
            
        </div>
    </div>
  );
};
