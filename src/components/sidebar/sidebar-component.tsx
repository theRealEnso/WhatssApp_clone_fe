import { useState } from "react";

import { useSelector } from "react-redux";
import { selectAllUserConversations } from "../../redux/chat/chatSelector";

import { SidebarHeader } from "./sidebar-header/sidebar-header-component"
import { Notifications } from "./notifications/notifications-component";
import { SearchInput } from "./search-input/search-input-component";
import { ConversationsList } from "./conversations-list/conversations-list-component";

export const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);

  const conversations = useSelector(selectAllUserConversations);
  console.log(conversations);
  
  return (
    <div className="w-[40%] min-h-full p-6 flex">
        <div>
            <SidebarHeader></SidebarHeader>

            <Notifications></Notifications>

            <SearchInput searchResults={searchResults} setSearchResults={setSearchResults}></SearchInput>

            <ConversationsList></ConversationsList>

        </div>
    </div>
  );
};
