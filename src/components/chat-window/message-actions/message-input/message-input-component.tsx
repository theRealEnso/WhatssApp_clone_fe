import { useState, useEffect } from "react";
import { SocketContext } from "../../../../context/socket-context";

import { useSelector, useDispatch } from "react-redux";
import { selectActiveConversation } from "../../../../redux/chat/chatSelector";
import { setTypingStatus } from "../../../../redux/chat/chatReducer";


const MessageInput = ({textMessage, setTextMessage, inputTextRef, sendTextMessage, socket}) => {
    const dispatch = useDispatch();

    const [typing, setTyping] = useState(false);

    const activeConversation = useSelector(selectActiveConversation);
    const conversation_id = activeConversation._id;

    const handleMessageInputChange = (event) => {
        const typedInput = event.target.value;
        setTextMessage(typedInput);

        if(!typing){
            setTyping(true);
            socket.emit("typing", conversation_id);
        }
         
        const lastTypingTime = new Date().getTime();
        const timer = 2000;

        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDifference = timeNow - lastTypingTime;
            if(timeDifference >= timer && typing) {
                socket.emit("stopped typing", conversation_id); 
                setTyping(false);
            }
        }, timer);
    };

    const sendTxtMsg = (event) => {
        if(textMessage && event.key === "Enter"){
            event.preventDefault();
            sendTextMessage();
        }
    };

    useEffect(() => {
        socket.on("typing", (typingStatusObject) => {
            const {typingStatus} = typingStatusObject;
            dispatch(setTypingStatus(typingStatus))
        });

    }, [typing, socket, dispatch]);

    useEffect(() => {
        socket.on("stopped typing", (typingStatusObject) => {
            const {typingStatus} = typingStatusObject;
            dispatch(setTypingStatus(typingStatus));
        })
    }, [typing, socket, dispatch]);

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

const MessageInputWithSocket = (props) => {
    return (
        <SocketContext.Consumer>
            {(socket) => <MessageInput {...props} socket={socket}></MessageInput>}
        </SocketContext.Consumer>
    )
};

export default MessageInputWithSocket;