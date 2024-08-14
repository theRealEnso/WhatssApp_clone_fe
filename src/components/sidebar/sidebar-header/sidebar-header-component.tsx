import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../redux/user/userSelector"

// import components
import MenuWithSocket from "./menu";
import { CreateGroupChat } from "../create-group-chat/create-group-chat-component";

//import SVG icons
import { CommunityIcon, StoryIcon, ChatIcon, DotsIcon } from "../../../svg"

export const SidebarHeader = ({setShowCreateGroupChat}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef();

    const currentUser = useSelector(selectCurrentUser);
    const {picture} = currentUser;

    const toggleMenu = (event) => {
        event.stopPropagation();
        // console.log("Menu clicked!");
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleOutsideMenuClick = (event) => {
            // console.log(event.target);
            if(menuRef.current && !menuRef.current.contains(event.target)){
                // console.log("clicked outside menu")
                setIsMenuOpen(false);
            }
        };

        document.body.addEventListener("click", handleOutsideMenuClick);
        return () => document.body.removeEventListener("click", handleOutsideMenuClick);
    }, [isMenuOpen])

  return (
    <div className="h-[70px] w-full flex items-center justify-between dark:bg-dark_bg_2 px-[16px]">
        {/* profile picture */}
        <div className="flex flex-none items-center justify-center">
            <img src={picture} alt={`${currentUser.firstName} ${currentUser.lastName}'s profile picture`} className="h-[50px] w-[50px] rounded-full object-cover"></img>
        </div>

        {/* icons */}
        <div className="relative flex justify-end flex-auto">
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
                    <MenuWithSocket isMenuOpen={isMenuOpen} ref={menuRef} setShowCreateGroupChat={setShowCreateGroupChat}></MenuWithSocket>
                </li>
            </ul>
        </div>
    </div>
  );
};
