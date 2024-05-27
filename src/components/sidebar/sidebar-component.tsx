import { useState } from "react";

import { useSelector } from "react-redux";
import { selectAllUserConversations } from "../../redux/chat/chatSelector";

import { SidebarHeader } from "./sidebar-header/sidebar-header-component"
import { Notifications } from "./notifications/notifications-component";
import { SearchInput } from "./search-input/search-input-component";
import { ConversationsList } from "./conversations-list/conversations-list-component";
import { SearchList } from "./search-list/search-list-component";

export const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  // console.log(searchResults);

  const conversations = useSelector(selectAllUserConversations);
  console.log(conversations);
  
  return (
    <div className="max-w-[30%] flex0030 h-full select-none border-r-2 border-dark_bg_3">
        <SidebarHeader></SidebarHeader>

        <Notifications></Notifications>

        <SearchInput searchResults={searchResults} setSearchResults={setSearchResults}></SearchInput>

        {
          searchResults && searchResults.length > 0 ? 
          (
            <SearchList searchResults={searchResults} setSearchResults={setSearchResults}></SearchList>
          )

          :
            (
            <ConversationsList searchResults={searchResults} setSearchResults={setSearchResults}></ConversationsList>
            )
        }

      </div>
  );
};
