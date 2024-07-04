import { useEffect} from "react";
import { SocketContext } from "../../context/socket-context";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { selectActiveConversation, } from "../../redux/chat/chatSelector";
import { getAllUserConversations, updateMessagesAndConversation, setOnlineUsers} from "../../redux/chat/chatReducer";

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

    //emit the user id back to the server socket under the name "join"
    useEffect(() => {
        socket.emit("user logged in", currentUser._id);

        //get online users that is emmited from the server, then add this data to the redux store
        socket.on("get-online-users", (users) => {
            dispatch(setOnlineUsers(users));
        });
    }, [currentUser, socket, dispatch]);

    useEffect(() => {
        socket.on("get-updated-online-users", (users) => {
            dispatch(setOnlineUsers(users));
        })
    },[dispatch, socket]);


    //fetch conversation data from api
    useEffect(() => {
        // const values = {
        //     access_token: access_token,
        // };

        if(access_token) {
            dispatch(getAllUserConversations(access_token));
        }
    },[access_token, dispatch]);

    //listen on received message
    useEffect(() => {
        //define a handleMessage function that receives the message emitted from the server, logs the message, and dispatches the desired action with the message
        const handleMessage = (message) => {
            console.log("message received ----->", message);
            dispatch(updateMessagesAndConversation(message));
        };

        //register event listener only once when the component mounts, does not get added multiple times during any re-renders (unless dependencies change)
        //even if component re-renders due to strict mode, this only runs once
        socket.on("received message", handleMessage);

        // Cleanup / remove the `socket.on` listener that listens for `received message` emitted by the server on component unmount or when socket changes
        //ensures that when the component re-renders due to strict mode, the previous event listener is removed before the new one is added, preventing accumulation of listeners. So, component mounts => socket.on listener is registered => strict mode causes react to re-render this component => on re-render, the component first unmounts + removes the registered  socket.on event listener, then mounts again and registers the listener again
        return () => {
            //socket.off(eventName, listener) => removes the specified listener from the listener array for the event named `eventName`
            socket.off("received message", handleMessage);
        };
    }, [socket, dispatch]);

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
    // when `SocketContext.Consumer is used, the function inside the consumer receives the `value` prop that was provided in the `SocketContext.Provider`, which is the socket instance / connection that we assigned to it
    <SocketContext.Consumer>
        {/* receive the socket instance, then pass this as props to the Home component */}
        {(socket) => <Home {...props} socket={socket}></Home>}
    </SocketContext.Consumer>
)

export default HomeWithSocket;