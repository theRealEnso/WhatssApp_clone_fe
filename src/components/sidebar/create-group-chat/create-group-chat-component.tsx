import { useState } from "react";

import { useSelector } from "react-redux";

//import selectors
import { selectAllUsers, selectTaggedUsers } from "../../../redux/chat/chatSelector";

//import components
import { UnderlineInput } from "./underline-input-component";
import { SearchUserInput } from "./search-user-input";
import { UserSearchList } from "./user-search-list-component";
import { TaggedUserList } from "./tagged-user-list-component";

//import SVG icon
import { ReturnIcon } from "../../../svg";

export const CreateGroupChat = ({setShowCreateGroupChat}) => {
    const allUsers = useSelector(selectAllUsers);
    const taggedUsers = useSelector(selectTaggedUsers);

    const [groupName, setGroupName] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const hideSelectGroupChat = () => {
        setShowCreateGroupChat(false);
    };

    console.log(taggedUsers);

  return (
    <div className="createGroupAnimation relative flex0030 h-full w-full">
        {/* container */}
        <div className="mt-5">
            <button className="btn w-8 h-8 border-4 border-green_3" onClick={hideSelectGroupChat}>
                <ReturnIcon className="dark:fill-green_1 h-full w-full"></ReturnIcon>
            </button>

            {/* group name input */}
            <UnderlineInput groupName={groupName} setGroupName={setGroupName}></UnderlineInput>

            {
                taggedUsers && taggedUsers.length > 0
                ? (
                    <TaggedUserList taggedUsers={taggedUsers} setSearchInput={setSearchInput}></TaggedUserList>
                ) : null
            }

            {/* search input component */}
            <SearchUserInput allUsers={allUsers} filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers} searchInput={searchInput} setSearchInput={setSearchInput}></SearchUserInput>

            {/* user list */}
            {
                filteredUsers.length === 0 && searchInput.length > 0
                ? (
                    <div className="mt-2">
                        <h1 className="text-white text-2xl tracking-wide">No users found!</h1>
                    </div>
                ) : (
                    <UserSearchList filteredUsers={filteredUsers} setSearchInput={setSearchInput}></UserSearchList>
                )
            }
            
        </div>
    </div>
  );
};
