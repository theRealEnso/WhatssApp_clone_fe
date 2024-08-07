import { useState, useEffect } from "react";
import { SocketContext } from "../../../../context/socket-context";

import { useSelector, useDispatch } from "react-redux";
import { selectActiveConversation } from "../../../../redux/chat/chatSelector";

const MessageInput = ({textMessage, setTextMessage, inputTextRef, sendTextMessage, socket}) => {
    const dispatch = useDispatch();

    const [typing, setTyping] = useState<boolean>(false);

    const activeConversation = useSelector(selectActiveConversation);
    const conversation_id = activeConversation._id;

    const handleMessageInputChange = (event) => {
        const typedInput = event.target.value;
        setTextMessage(typedInput);

        //'typing state variable initializes as "false"
        //if statement checks if `typing` state variable is false/ falsy (which it is indeed false on initialization). If it is false, then set it to true, and emit the "typing" event
        //So, on the first keystroke, `typing` state variable flips from false to true
        //on every subsequent keystroke, since the `typing` state variable is now true/truthy and no longer false/falsy, the code in the `if` block never runs again, because the if statement only runs if the `typing state variable is "false", which it no longer is with the state update. This ensures that the "typing" event is only emitted once
        if(!typing){
            setTyping(true);
            socket.emit("typing", conversation_id);
        } 
        
        // //if the user deletes everything in the input, and the `typing` state variable is still "true", then flip it back to "false" (because typing should be false in this case), and emit the "stopped typing" event
        // if (typedInput.length === 0 && typing){
        //     setTyping(false);
        //     socket.emit("stopped typing", conversation_id)
        // }
        
        //lastTypingTime gets updated on every keystroke
        const lastTypingTime = new Date().getTime();
        const timer = 2000;

        //setTimeOut to check if user stops typing after two seconds. If two seconds elapse without a new keystroke, then the code snippet runs, emits a "stopped typing" event + sets the `typing` state variable back to false.
        //Since `typing` state variable is false again, then when user starts typing again after two seconds, the if block above runs again, and the process repeats
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

const MessageInputWithSocket = (props) => {
    return (
        <SocketContext.Consumer>
            {(socket) => <MessageInput {...props} socket={socket}></MessageInput>}
        </SocketContext.Consumer>
    )
};

export default MessageInputWithSocket;