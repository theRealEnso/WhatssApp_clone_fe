// import { useDispatch, useSelector } from "react-redux";
// import { selectActiveConversation } from "../../../../redux/chat/chatSelector";
// import { selectCurrentUser } from "../../../../redux/user/userSelector";
// import { sendMessage } from "../../../../redux/chat/chatReducer";

// import SocketContext from "../../../../context/socket-context";

export const MessageInput = ({textMessage, setTextMessage, inputTextRef, sendTextMessage}) => {

    // const dispatch = useDispatch();

    // const currentUser = useSelector(selectCurrentUser)
    // const {access_token} = currentUser;

    // const activeConversation = useSelector(selectActiveConversation);
    // const conversation_id = activeConversation._id;

    // const values = {
    //     access_token,
    //     conversation_id,
    //     message: textMessage,
    // };

    const handleMessageInputChange = (event) => {
        const typedInput = event.target.value;
        setTextMessage(typedInput);
    }

    const sendTxtMsg = (event) => {
        if(textMessage && event.key === "Enter"){
            event.preventDefault();
            sendTextMessage();
        }
    };

    // const sendTextMessage = async (event) => {
    //     try {
    //         if(textMessage && event.key === "Enter"){
    //             const sentMessage = await dispatch(sendMessage(values));
    //             // console.log(sentMessage);
    //             setTextMessage("");
    //             socket.emit("newly sent message", sentMessage.payload);
    //         }
    //     } catch(error){
    //         console.log(error);
    //     }
    // }

    // console.log(textMessage);
  return (
    <div className="flex flex-1 items-center justify-center align-center">
        <input 
        type="text" 
        placeholder="Type your message here..." 
        className="dark:bg-dark_bg_5 h-[50px] w-[1100px] flex p-4 rounded-lg"
        value={textMessage}
        onChange={handleMessageInputChange}
        onKeyDown={sendTxtMsg}
        ref={inputTextRef}
        ></input>
    </div>
  );
};

// const MessageInputWithSocket = (props) => (
//     <SocketContext.Consumer>
//         {(socket) => <MessageInput {...props} socket={socket}></MessageInput>}
//     </SocketContext.Consumer>
// );

// export default MessageInputWithSocket;
