import {forwardRef} from "react";

import {useSelector, useDispatch} from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";
import { logoutUser } from "../../../redux/user/userReducer";
import { clearActiveConversation } from "../../../redux/chat/chatReducer";

export const Menu = forwardRef(({isMenuOpen, setIsMenuOpen}, ref) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;

    const signOut = async () => {
        await dispatch(clearActiveConversation());
        await dispatch(logoutUser({access_token}));
    };

  return (
    <div
        ref={ref}
        className={
            isMenuOpen 
                ? "absolute opacity-100 translate-y-3 -translate-x-14 pointer-events-auto transition-opacity transition-transform" 
                :"absolute pointer-events-none -translate-x-14 -translate-y-4 opacity-0"
            }
        >
        <ul className=" flex flex-col align-center justify-center list-none cursor-pointer dark:bg-dark_bg_3 text-white w-[200px]">
            <li className="p-4 hover:bg-dark_bg_2">New Group</li>
            <li className="p-4 hover:bg-dark_bg_2">New Community</li>
            <li className="p-4 hover:bg-dark_bg_2">Starred Messages</li>
            <li className="p-4 hover:bg-dark_bg_2">Settings</li>
            <li className="p-4 hover:bg-dark_bg_2" onClick={signOut}>Logout</li>
        </ul>
    </div>
  )
});
