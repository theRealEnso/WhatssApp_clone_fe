import { useState, useEffect } from "react"

import { useSelector } from "react-redux";

//import redux selector(s)
import { selectCurrentUser } from "../../../redux/user/userSelector";

//import axios
import axios from "axios";

//import SVG icons
import { ReturnIcon, SearchIcon } from "../../../svg";

const API_ENDPOINT = import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT;

export const SearchUserInput = ({searchInput, setSearchInput, setUserSearchResults, setSearchExecuted, setNoSearchResults}) => {
    const {access_token} = useSelector(selectCurrentUser);

    const [returnIcon, setReturnIcon] = useState<boolean>(false);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleUserSearch = async (event) => {
        if(searchInput && event.key === "Enter"){
            setSearchExecuted(false);
            const {data} = await axios.get(`${API_ENDPOINT}/user?search=${searchInput}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            if(data.length > 0){
                // console.log(data);
                setSearchExecuted(true);
                setNoSearchResults(false);
                setUserSearchResults(data);
                setSearchInput("");
            } else {
                setSearchExecuted(true);
                setNoSearchResults(true);
                setSearchInput("");
            }
        }
    };

    const showReturnIcon = () => {
        setReturnIcon(true);
    };

    const hideReturnIcon = () => {
        setReturnIcon(false);
    };

    // console.log(searchInput);
    // console.log(API_ENDPOINT);

  return (
    <div className="mt-4 w-full">
        <div className="h-[50px] flex items-center justify-center w-full rounded-lg dark:bg-dark_bg_5 p-2 space-x-2">
            <div className="h-[45px] flex">
                {                
                    returnIcon || (searchInput && searchInput.length > 0) 
                    ? (
                        <button className="dark:bg-dark_bg_5 cursor-pointer rotateAnimation">
                            <ReturnIcon className="dark:fill-green_1 h-full w-full"></ReturnIcon>
                        </button>
                    ) :  (
                        <button className="dark:bg-dark_bg_5 cursor-pointer">
                            <SearchIcon className="dark:fill-dark_svg_2 dark:bg_dark_bg_2 h-full h-full"></SearchIcon> 
                        </button>
                    )                   
                }

            </div>

            <div className="w-full">
                <input 
                    type="text"
                    placeholder="Search for a user by name or email address"
                    name="searchInput"
                    value={searchInput}
                    onChange={handleInputChange}
                    onFocus={showReturnIcon}
                    onBlur={hideReturnIcon}
                    onKeyDown={handleUserSearch}
                    className="w-full p-2 rounded-lg dark:bg-dark_bg_5 dark:text-green_1 tracking-wide text-lg outline-none"
                    >
                </input>
            </div>
        </div>
    </div>
  );
};
