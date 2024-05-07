import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../redux/user/userSelector"

import { CommunityIcon, StoryIcon, ChatIcon, DotsIcon } from "../../../svg"
import { Menu } from "./menu";


export const SidebarHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();

    const currentUser = useSelector(selectCurrentUser);
    const {picture} = currentUser;

    const toggleMenu = (event) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleOutsideMenuClick = (event) => {
            // console.log(event.target);
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsMenuOpen(false);
            }
        };

        document.body.addEventListener("click", handleOutsideMenuClick);
        return () => document.body.removeEventListener("click", handleOutsideMenuClick);
    }, [isMenuOpen])

  return (
    <div className="h-[70px] w-full flex items-center justify-between dark:bg-dark_bg_2 px-[16px]">
        {/* profile picture */}
        <div className="flex items-center justify-center h-[50px] w-[50px] rounded-full overflow-hidden">
            <img src={picture} alt={`${currentUser.firstName} ${currentUser.lastName}'s profile picture`} className="object-cover rounded-full w-full h-full"></img>
        </div>

        {/* icons */}
        <div className="relative">
            <ul className="flex align-center justify-center items-center px-4 list-none">
                <li className="px-2 cursor-pointer">
                    <CommunityIcon className="dark:fill-dark_svg_1"></CommunityIcon>
                </li>

                <li className="px-2 cursor-pointer">
                    <StoryIcon className="dark:fill-dark_svg_1"></StoryIcon>
                </li>

                <li className="px-2 cursor-pointer">
                    <ChatIcon className="dark:fill-dark_svg_1"></ChatIcon>
                </li>

                <li className="px-2 cursor-pointer" onClick={toggleMenu}>
                    <DotsIcon className="dark:fill-dark_svg_1"></DotsIcon>
                    <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} ref={menuRef}></Menu>
                </li>
            </ul>
        </div>
    </div>
  );
};
