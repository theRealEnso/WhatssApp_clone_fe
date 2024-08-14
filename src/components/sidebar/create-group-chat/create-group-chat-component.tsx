import { useState } from "react";

import { useSelector } from "react-redux";

//import selectors
import { selectAllUsers } from "../../../redux/chat/chatSelector";

//import components
import { UnderlineInput } from "./underline-input-component";
import { SearchUserInput } from "./search-user-input";
import { UserSearchList } from "./user-search-list-component";

//import SVG icon
import { ReturnIcon } from "../../../svg";

export const CreateGroupChat = ({setShowCreateGroupChat}) => {
    const allUsers = useSelector(selectAllUsers);

    const [groupName, setGroupName] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [taggedUsers, setTaggedUsers] = useState([]);

    const hideSelectGroupChat = () => {
        setShowCreateGroupChat(false);
    };

  return (
    <div className="createGroupAnimation relative flex0030 h-full w-full">
        {/* container */}
        <div className="mt-5">
            <button className="btn w-6 h-6 border" onClick={hideSelectGroupChat}>
                <ReturnIcon className="fill-white"></ReturnIcon>
            </button>
            {/* group name input */}
            <UnderlineInput groupName={groupName} setGroupName={setGroupName}></UnderlineInput>

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
                    <UserSearchList filteredUsers={filteredUsers} taggedUsers={taggedUsers} setTaggedUsers={setTaggedUsers}></UserSearchList>
                )
            }
            
        </div>
    </div>
  );
};
