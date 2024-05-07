import { SidebarHeader } from "./sidebar-header/sidebar-header-component"
import { Notifications } from "./notifications/notifications-component";
import { SearchInput } from "./search-input/search-input-component";

export const Sidebar = () => {
  return (
    <div className="w-[40%] min-h-full p-6 flex">
        <div>
            <SidebarHeader></SidebarHeader>
            <Notifications></Notifications>
            <SearchInput></SearchInput>
        </div>
    </div>
  );
};
