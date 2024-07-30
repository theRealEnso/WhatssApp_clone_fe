import { useEffect, useState, useRef} from "react";
import { SocketContext } from "../../context/socket-context";

import { useSelector, useDispatch } from "react-redux";

// import redux selectors
import { selectCurrentUser } from "../../redux/user/userSelector";
import { selectActiveConversation, } from "../../redux/chat/chatSelector";

//import redux actions
import { getAllUserConversations, updateMessagesAndConversation, setOnlineUsers} from "../../redux/chat/chatReducer";

// import components
import { Sidebar } from "../sidebar/sidebar-component";
import { Banner } from "../banner/banner-component";
import { ChatWindow } from "../chat-window/chat-window-component";
import { Call } from "../video-calling/call-component";

import Peer from "simple-peer";

type RecipientUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    status: string;
};

const callData = {
    socketId: "",
    receivingCall: false,
    callEnded: false,
    name: "",
    picture: "",
    signal: {},
};

const Home = ({socket}) => {
    // console.log(socket);
    const myVideoFeed = useRef<HTMLVideoElement>();
    const recipientVideoFeed = useRef<HTMLVideoElement>();

    const [recipientUser, setRecipientUser] = useState<Partial<RecipientUser>>({});

    //call
    const [videoCall, setVideoCall] = useState(callData);
    const [videoCallAccepted, setVideoCallAccepted] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const {receivingCall, callEnded, socketId} = videoCall;
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);
    const {access_token} = currentUser;
    // console.log(access_token);

    const activeConversation = useSelector(selectActiveConversation);
    // console.log(activeConversation);

    //----------------------------------
    //function to request access to user's video camera and mic
    const setupMedia = () => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then((mediaStream) => { //receive a media stream after user grants permission
            setStream(mediaStream);
            // recipientVideoFeed.current.srcObject = stream;
        }).catch((error) => {
            console.log(error);
        });
    };

    //---------------------------------
    //function to set the media stream to my video feed
    const enableMedia = () => {
        if(myVideoFeed.current && stream){
            myVideoFeed.current.srcObject = stream;
        }
    };

    //---------------------------------
    // call user function
    const callUser = () => {
        if(!recipientUser._id || !stream){
            console.error("Recipient user id or stream is not defined");
            return;
        }

        enableMedia();
        setVideoCall({
            ...videoCall, 
            name: `${recipientUser.firstName} ${recipientUser.lastName}`,
            picture: recipientUser.picture || "",
        });

        //peer 1 a.k.a the sender instance a.k.a me. When peer 1 has signaling data, give it to peer 2, a.k.a the receiver
        // do this by emitting to the backend an object that contains information about the sender / person initiating the video call
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (data) => {
            // console.log(data);
            socket.emit("call user", {
                userToCall: recipientUser._id,
                signal: data,
                from: socketId,
                name: `${currentUser.firstName} ${currentUser.lastName}`,
                picture: currentUser.picture,
            });
        });

        peer.on("error", (error) => {
            console.error("Peer error:", error);
        });
    };

    //-------------------------------------------------

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

    //video calls
    //need socket ID in order to start a stream call with someone. SocketId connects to another SocketId
    useEffect(() => {
        setupMedia();
        socket.on("setup socket", (socket_id) => {
            // console.log(socket_id);
            setVideoCall({...videoCall, socketId: socket_id})
        });

        socket.on("received call", (callerData) => {
            setVideoCall({
                ...videoCall, 
                socketId: callerData.from, 
                name: callerData.name, 
                picture: callerData.picture, 
                signal: callerData.signal, 
                receivingCall: true})
        });

        return () => {
            socket.off("setup socket");
            socket.off("call user");
        };

    },[socket, videoCall]);

    console.log("socket id =====>", socketId);

    // console.log(recipientUser);
    // console.log(typeof recipientUser);
    // console.log(stream);

    return (
        <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center align-center overflow-hidden">
            <div className="container h-screen flex py-[20px]">
                <Sidebar></Sidebar>

                {
                    activeConversation && Object.keys(activeConversation).length > 0 ? <ChatWindow callUser={callUser} recipientUser={recipientUser} setRecipientUser={setRecipientUser}></ChatWindow> : <Banner></Banner>
                }

            </div>

            {/* call */}
            <Call videoCall={videoCall} setVideoCall={setVideoCall} videoCallAccepted={videoCallAccepted} myVideoFeed={myVideoFeed} recipientVideoFeed={recipientVideoFeed} stream={stream}></Call>

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