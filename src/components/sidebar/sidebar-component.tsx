import { useState } from "react";

import { useSelector } from "react-redux";
import { selectOnlineUsers } from "../../redux/chat/chatSelector";

//import components
import { SidebarHeader } from "./sidebar-header/sidebar-header-component"
import { Notifications } from "./notifications/notifications-component";
import { SearchInput } from "./search-input/search-input-component";
import ConversationsList from "./conversations-list/conversations-list-component";
import { SearchList } from "./search-list/search-list-component";
import { CreateGroupChat } from "./create-group-chat/create-group-chat-component";

export const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showCreateGroupChat, setShowCreateGroupChat] = useState<boolean>(false);

  // console.log(searchResults);

  const onlineUsers = useSelector(selectOnlineUsers);
  // console.log(onlineUsers);
  
  return (
    <div className="max-w-[30%] flex0030 h-full select-none border-r-2 border-dark_bg_3">
        <SidebarHeader setShowCreateGroupChat={setShowCreateGroupChat}></SidebarHeader>

        {
          showCreateGroupChat && <CreateGroupChat setShowCreateGroupChat={setShowCreateGroupChat}></CreateGroupChat>
        }

        <Notifications></Notifications>

        <SearchInput searchResults={searchResults} setSearchResults={setSearchResults}></SearchInput>

        {
          searchResults && searchResults.length > 0 ? 
          (
            <SearchList searchResults={searchResults} setSearchResults={setSearchResults}></SearchList>
          )

          :
            (
            <ConversationsList searchResults={searchResults} setSearchResults={setSearchResults} onlineUsers={onlineUsers}></ConversationsList>
            )
        }

      </div>
  );
}; 
