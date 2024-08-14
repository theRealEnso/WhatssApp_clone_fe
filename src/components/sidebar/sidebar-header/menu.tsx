import {forwardRef} from "react";

import {useSelector, useDispatch} from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";
import { logoutUser } from "../../../redux/user/userReducer";
import { clearActiveConversation } from "../../../redux/chat/chatReducer";

import { SocketContext } from "../../../context/socket-context";

const Menu = forwardRef(({isMenuOpen, socket, setShowCreateGroupChat}, ref) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);
    const {access_token} = currentUser;

    const signOut = async () => {
        if(currentUser && currentUser._id){
            await socket.emit("user signed out", currentUser._id);
        } else {
            console.error("Current user ID is null or undefined");
        }
        
        await dispatch(clearActiveConversation());
        await dispatch(logoutUser({access_token}));
    };

    const showCreateGroup = () => {
        setShowCreateGroupChat(true);
    };

  return (
    <div
        ref={ref}
        // style={{ display: isMenuOpen ? 'block' : 'none' }} // added as temporary check to see if style is being applied
        className={`${isMenuOpen ? "absolute opacity-100 translate-y-3 -translate-x-14 pointer-events-auto transition-opacity transition-transform z-10" : "absolute pointer-events-none -translate-x-14 -translate-y-4 opacity-0 z-50"}`
            }
        >
        <ul className=" flex flex-col align-center justify-center list-none cursor-pointer dark:bg-dark_bg_3 text-white w-[200px] z-10">
            <li className="p-4 hover:bg-dark_bg_2" onClick={showCreateGroup}>New Group Chat</li>
            <li className="p-4 hover:bg-dark_bg_2">New Community</li>
            <li className="p-4 hover:bg-dark_bg_2">Starred Messages</li>
            <li className="p-4 hover:bg-dark_bg_2">Settings</li>
            <li className="p-4 hover:bg-dark_bg_2" onClick={signOut}>Logout</li>
        </ul>
    </div>
  )
});

const MenuWithSocket = forwardRef((props, ref) => (
    <SocketContext.Consumer>
        {(socket) => <Menu {...props} ref={ref} socket={socket} />}
    </SocketContext.Consumer>
));

export default MenuWithSocket;
