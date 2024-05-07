import { useState } from "react";

import axios from "axios";
import { SearchIcon, ReturnIcon, FilterIcon } from "../../../svg";

export const SearchInput = () => {
  const [returnIcon, setReturnIcon] = useState(false);

  const showReturnIcon = () => setReturnIcon(true);
  const hideReturnIcon = () => setReturnIcon(false);
  return (
    <div className="w-full flex items-center justify-center">
        <div className="h-[50px] flex items-center dark:bg-dark_bg_2 rounded-lg">
          {
            returnIcon 
              ? <div className="flex items-center justify-center px-2 rotateAnimation cursor-pointer">
                  <ReturnIcon className="dark:fill-green_1 h-full w-full"></ReturnIcon>
                </div>
              : <div className="flex items-center justify-center px-2">
                  <SearchIcon className="dark:fill-dark_svg_2 dark:bg_dark_bg_2 h-full w-full"></SearchIcon>
                </div>
          }

            <input 
                type="text" 
                placeholder="Search or start a new chat..." 
                className="h-[40px] rounded-lg px-2 dark:bg-dark_bg_2 outline-none text-white"
                onFocus={showReturnIcon}
                onBlur={hideReturnIcon}
                >
            </input>
        </div>
        
        <div className="p-4">
            <FilterIcon className="dark:fill-dark_svg_2"></FilterIcon>
        </div>
       
    </div>
  );
};
