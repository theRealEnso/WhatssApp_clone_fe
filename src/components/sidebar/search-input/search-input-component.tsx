import axios from "axios";
import { SearchIcon, ReturnIcon, FilterIcon } from "../../../svg";

export const SearchInput = () => {
  return (
    <div className="w-full flex items-center justify-center">
        <div className="h-[45px] flex items-center dark:bg-dark_bg_2 rounded-lg">
            <SearchIcon className="dark:fill-dark_svg_2 dark:bg_dark_bg_2 mx-2"></SearchIcon>
            <input 
                type="text" 
                placeholder="Search or start a new chat..." 
                className="h-[40px] rounded-lg px-2 dark:bg-dark_bg_2 outline-none text-white">
            </input>
        </div>
        
        <div className="p-4">
            <FilterIcon className="dark:fill-dark_svg_2"></FilterIcon>
        </div>
       
    </div>
  );
};
