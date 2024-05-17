import { useState } from "react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import axios from "axios";

import { SearchIcon, ReturnIcon, FilterIcon } from "../../../svg";

const API_ENDPOINT = import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT;
// console.log(API_ENDPOINT);

export const SearchInput = ({searchResults, setSearchResults}) => {
  const [returnIcon, setReturnIcon] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const currentUser = useSelector(selectCurrentUser);
  const {access_token} = currentUser

  const handleInputChange = (event) => {
    const typedInput = event.target.value;
    setSearchInput(typedInput);
    console.log(searchInput);
  };

  const handleUserSearch = async (event) => {
    const typedInput = event.target.value;
    if(typedInput && event.key === "Enter"){
      const {data} = await axios.get(`${API_ENDPOINT}/user?search=${typedInput}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      // console.log(data);
      if(data){
        setSearchResults(data);
        setSearchInput("");
      }
    }
  };

  const clearSearchResults = () => setSearchResults([]);

  const showReturnIcon = () => setReturnIcon(true);

  const hideReturnIcon = () => setReturnIcon(false);
  return (
    <div className="w-full flex flex-auto items-center justify-center mt-2">
        <div className="h-[50px] flex flex-auto items-center dark:bg-dark_bg_2 rounded-lg">
          {
            returnIcon || searchInput.length > 0 
              ? <div className="flex items-center justify-center px-2 rotateAnimation cursor-pointer" onClick={clearSearchResults}>
                  <ReturnIcon className="dark:fill-green_1 h-full w-full"></ReturnIcon>
                </div>
              : <div className="flex items-center justify-center px-2">
                  <SearchIcon className="dark:fill-dark_svg_2 dark:bg_dark_bg_2"></SearchIcon>
                </div>
          }

            <input 
                type="text" 
                placeholder="Search or start a new chat..." 
                className="h-[40px] rounded-lg px-2 dark:bg-dark_bg_2 outline-none text-white flex-1"
                onFocus={showReturnIcon}
                onBlur={searchResults.length === 0 ? hideReturnIcon : showReturnIcon}
                name="searchInput"
                value={searchInput}
                onChange={handleInputChange}
                onKeyDown={handleUserSearch}
                >
            </input>
        </div>
        
        <div className="p-4">
            <FilterIcon className="dark:fill-dark_svg_2"></FilterIcon>
        </div>
       
    </div>
  );
};
