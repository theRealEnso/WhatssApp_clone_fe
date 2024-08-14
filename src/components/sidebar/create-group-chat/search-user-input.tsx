import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

//import redux selector(s)
// import { selectAllUsers } from "../../../redux/chat/chatSelector";

//import SVG icons
import { ReturnIcon, SearchIcon } from "../../../svg";

export const SearchUserInput = ({searchInput, setSearchInput, allUsers, filteredUsers, setFilteredUsers}) => {

    const fullUserNames = [];

    const [returnIcon, setReturnIcon] = useState<boolean>(false);

    const handleUserSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const showReturnIcon = () => {
        setReturnIcon(true);
    };

    const hideReturnIcon = () => {
        setReturnIcon(false);
    }

    useEffect(() => {
        if(!searchInput){
            setFilteredUsers([]);
            return;
        }

        const searchUsers = allUsers.filter((user) => {
            const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`
            return (
                user.firstName.toLowerCase().includes(searchInput.toLowerCase()) || user.lastName.toLowerCase().includes(searchInput.toLowerCase()) || user.email.toLowerCase().includes(searchInput.toLowerCase()) || fullName.includes(searchInput.toLowerCase())
            )
        });

        setFilteredUsers(searchUsers);


    }, [allUsers, setFilteredUsers, searchInput]);

    // console.log(searchInput);
    // console.log(filteredUsers);
    // console.log(allUsers);
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
                    value={searchInput}
                    onChange={handleUserSearch}
                    onFocus={showReturnIcon}
                    onBlur={hideReturnIcon}
                    className="w-full p-2 rounded-lg dark:bg-dark_bg_5 dark:text-green_1 tracking-wide text-lg outline-none"
                    >
                </input>
            </div>
        </div>
    </div>
  );
};
