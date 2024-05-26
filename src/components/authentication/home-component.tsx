import { useEffect } from "react";
import SocketContext from "../../context/socket-context";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { selectActiveConversation } from "../../redux/chat/chatSelector";
import { getAllUserConversations } from "../../redux/chat/chatReducer";

import { Sidebar } from "../sidebar/sidebar-component";
import { Banner } from "../banner/banner-component";
import { ChatWindow } from "../chat-window/chat-window-component";

const Home = ({socket}) => {
    // console.log(socket);
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;
    // console.log(access_token);

    const activeConversation = useSelector(selectActiveConversation);

    //join the user id to socket io instance on the server
    useEffect(() => {
        socket.emit("join", currentUser._id)
    }, [currentUser, socket]);

    // listen to messages received from socket on backend
    useEffect(() => {
        socket.on("message received", (message) => {
            console.log("message received from backend: ", message)
        })
    },[socket])

    //fetch conversation data from api
    useEffect(() => {
        // const values = {
        //     access_token: access_token,
        // };

        if(access_token) {
            dispatch(getAllUserConversations(access_token));
        }
    },[access_token, dispatch])

    return (
        <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center align-center overflow-hidden">
            <div className="container h-full flex py-[20px]">
                <Sidebar></Sidebar>

                {
                    activeConversation && Object.keys(activeConversation).length > 0 ? <ChatWindow></ChatWindow> : <Banner></Banner>
                }
                
            </div>

        </div>
    );
};

const HomeWithSocket = (props) => (
    // when `SocketContext.Consumer is used, the function inside the consumer receives the `value` prop that was provided in the `SocketContext.Provider`, i.e. the socket instance
    <SocketContext.Consumer>
        {/* receive the socket instance, then pass this as props to the Home component */}
        {(socket) => <Home {...props} socket={socket}></Home>}
    </SocketContext.Consumer>
)

export default HomeWithSocket;