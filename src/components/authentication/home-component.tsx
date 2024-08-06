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
import { Ringer } from "../video-calling/ringer-component";

import Peer from "simple-peer";
import { SignalData } from "simple-peer";

//define typescript types ----------------------------------------

type RecipientUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    status: string;
};

type CallData = {
    socketId: string;
    receivingCall: boolean;
    callEnded: boolean;
    name: string;
    picture: string;
    signal: string | SignalData; // Record<string, never> means an empty object, according to code editor suggestion
};

type SuccessfulConnection = {
    successfulConnection : object;
};

//----------------------------------------------------------------------------------------

const callData: CallData = {
    socketId: "",
    receivingCall: false,
    callEnded: false,
    name: "",
    picture: "",
    signal: "",
};

const Home = ({socket}) => {
    // console.log(socket);
    console.log("Home component rendered");
    const myVideoFeed = useRef<HTMLVideoElement>();
    const recipientVideoFeed = useRef<HTMLVideoElement>();
    const connectionRef = useRef();

    const [recipientUser, setRecipientUser] = useState<Partial<RecipientUser>>({});

    //call
    const [showCallComponent, setShowCallComponent] = useState<boolean>(false);
    const [videoCall, setVideoCall] = useState(callData);
    const [videoCallAccepted, setVideoCallAccepted] = useState<boolean>(false);
    const [videoCallEnded, setVideoCallEnded] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    // const [initiatorSocketId, setInitiatorSocketId] = useState<string>("");

    //destructure params
    const {receivingCall, callEnded, socketId} = videoCall;

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);
    const {access_token} = currentUser;
    // console.log(access_token);

    const activeConversation = useSelector(selectActiveConversation);
    // console.log(activeConversation);

    //---------------------------------------------------------
    //function to request access to user's video camera and mic
    const setupMedia = () => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then((mediaStream) => { //receive a media stream after user grants permission
            setStream(mediaStream);
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

        setShowCallComponent(true);
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

        //peer 1 a.k.a the sender instance a.k.a me. When peer 1 initializes, it automatically creates signaling data to send to peer 2.
        //creates "SDP offer"
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        //Once signaling data is created, we emit to the backend an object that contains the ID of the user we are calling, the initiator's signaling data, the socket ID of the initiator, the initiator's name + picture
        peer.on("signal", (data) => {
            // console.log(data);
            const signalData = JSON.stringify(data);
            socket.emit("call user", {
                userToCall: recipientUser._id,
                signal: signalData,
                from: socketId,
                name: `${currentUser.firstName} ${currentUser.lastName}`,
                picture: currentUser.picture,
            });
        });

        //when call is accepted by the recipient, the server emits signaling data back to the initiator
        //`peer.signal()` is finally used to establish the connection. The signal that is passed in is the responder's signaling data that is emitted back from the server
        //don't move this into a useEffect and do it here because we need access to the initiators peer instance in order to establish the connection to the responder
        socket.on("call accepted", (responderSignal) => {
            setVideoCallAccepted(true);
            peer.signal(responderSignal);
        });

        // console.log(typeof successfulConnection);

        //After the connection is established, the stream event is fired when the responder's stream is received. Receive the responder's stream
        peer.on("stream", (stream) => {
            if(recipientVideoFeed.current){
                recipientVideoFeed.current.srcObject = stream;
            }
        });
        

        peer.on("error", (error) => {
            console.error("Peer error:", error);
        });

        //store the peer instance in `connectionRef` for future reference. This will be used for ending the call or for cleanup
        connectionRef.current = peer; 
    };

    //-------------------------------------------------
    //answer call function

    const answerCall = () => {
        if(!stream){
            console.log("stream is undefined");
            return;
        }

        enableMedia();
        setVideoCallAccepted(true);

        //this peer instance is the user receiving the call, aka the responder. Automatically creates signaling data when it initializes. Generates an SDP Answer in response to peer 1
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        //once signaling data is created, emit to the backend an object containing the the responder's signaling data, as well as the socket ID of the other peer instance (i.e. the person who initiated the call)
        peer.on("signal", (data) => {
            const signalData = JSON.stringify(data);
            socket.emit("answer call", {
                signal: signalData, // responder's signal
                to: videoCall.socketId,
            });
        });

        //peer.signal(data) is finally used to establish a connection. Pass in the initiator's signaling data
        peer.signal(videoCall.signal);

        // console.log(typeof successfulConnection);

        //After the connection is established, the stream event is fired when the initiator's stream is received. Receive the initiator's stream and put it on the recipient video feed
        peer.on("stream", (stream) => {
            if(recipientVideoFeed.current){
                recipientVideoFeed.current.srcObject = stream;
            }
        });
        
        peer.on("error", (error) => {
            console.error("Peer error:", error);
        });

        // store peer instance in `connectionRef` for future reference, such as ending the call or cleaning up
        connectionRef.current = peer;
    };

    //----------------------------------------------------------------
    // end call function
    const endCall = () => {
        setShowCallComponent(false);
        setVideoCall({
            ...videoCall,
            callEnded: true,
            receivingCall: false,
        });

        setVideoCallEnded(true);

        socket.emit("end call", videoCall.socketId);

        myVideoFeed.current.srcObject = null;

        if(connectionRef.current){
            connectionRef?.current?.destroy();
        }

    };

    //---------------- define all of the useEffects ----------------------

    //emit the user id back to the server socket under the name "user logged in" to join user to socket io
    useEffect(() => {
        socket.emit("user logged in", currentUser._id);

        //get online users that is emmited from the server, then add this data to the redux store
        socket.on("get-online-users", (users) => {
            dispatch(setOnlineUsers(users));
        });

        return () => {
            socket.off("get-online-users");
        };

    }, [currentUser, socket, dispatch]);

    //video calls
    //need socket ID's of all users  in order to start a joint stream call. SocketId connects to another SocketId.
    //"setup socket" event emitted from the server sends over the socket ID's of users that logged into the app

    useEffect(() => {
        const storeOnlineUsers = (users) => {
            dispatch(setOnlineUsers(users));
        }
        socket.on("get-updated-online-users", storeOnlineUsers);

        return () => {
            socket.off("get-updated-online-users", storeOnlineUsers);
        };

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

    useEffect(() => {
        setupMedia();

        socket.on("setup socket", (socket_id) => {
            // console.log(socket_id);
            setVideoCall({...videoCall, socketId: socket_id});
            // setInitiatorSocketId(socket_id);
        });

        socket.on("received call", (callerData) => {
            setVideoCall({
                ...videoCall, 
                socketId: callerData.from, // initiator's socket ID
                name: callerData.name, //initiator's name
                picture: callerData.picture, //initiator's picture
                signal: callerData.signal, //initiator's signaling data
                receivingCall: true,
            })
        });

        socket.on("call ended", () => {
            setShowCallComponent(false);
            setVideoCall({
                ...videoCall,
                callEnded: true,
                receivingCall: false,
            });

            if(myVideoFeed.current){
                myVideoFeed.current.srcObject = null;
            }
            
            if(videoCallAccepted && connectionRef.current){
                connectionRef?.current?.destroy();
            }
        });

        return () => {
            socket.off("setup socket");
            socket.off("received call");
            socket.off("call ended");
        };

    },[socket, videoCall, videoCallAccepted]);

    console.log("socket ID ---------->", socketId);

    // console.log(recipientUser);
    // console.log(typeof recipientUser);
    // console.log(stream);

    return (
        <>
            <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center align-center overflow-hidden">
                <div className="container h-screen flex py-[20px]">
                    <Sidebar></Sidebar>

                    {
                        activeConversation && Object.keys(activeConversation).length > 0 ? <ChatWindow callUser={callUser} recipientUser={recipientUser} setRecipientUser={setRecipientUser}></ChatWindow> : <Banner></Banner>
                    }

                </div>

                {/* call component to display if user is initiating a call, and if the call is accepted on the receiving end*/}
                <div className={`${(showCallComponent || videoCall.signal) && !videoCallEnded ? "" : "hidden"}`}>
                         
                    <Call 
                        videoCall={videoCall} 
                        setVideoCall={setVideoCall} 
                        videoCallAccepted={videoCallAccepted}
                        videoCallEnded={videoCallEnded} 
                        myVideoFeed={myVideoFeed} 
                        recipientVideoFeed={recipientVideoFeed} 
                        stream={stream}
                        answerCall={answerCall}
                        showCallComponent={showCallComponent}
                        endCall={endCall}
                        >
                    </Call>
                       
                </div>
            </div>
        </>  
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