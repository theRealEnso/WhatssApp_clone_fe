import { useState, useEffect, useRef, MouseEvent } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectChatReducer } from "../../../redux/chat/chatSelector";
import { selectActiveConversation } from "../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../redux/user/userSelector";
import { sendMessage } from "../../../redux/chat/chatReducer";

import SocketContext from "../../../context/socket-context";

import {SendIcon} from "../../../svg";

import { MessageInput } from "./message-input/message-input-component";
import { ClipLoader } from "react-spinners";
import { Emoji } from "./emoji-picker/emoji-component";
import { Attachments } from "./attachments/attachments-component";

const MessageActions = ({socket}) => {
    const [textMessage, setTextMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [sendIcon, setSendIcon] = useState(false);

    const dispatch = useDispatch();

    const emojiPickerRef = useRef();
    const inputTextRef = useRef();

    const {access_token} = useSelector(selectCurrentUser);

    const {status} = useSelector(selectChatReducer);
    const activeConversation = useSelector(selectActiveConversation);
    const conversation_id = activeConversation._id;

    const values = {
        conversation_id,
        access_token,
        message: textMessage
    };

    const sendTextMessage = async () => {
        // console.log("sendTextMessage function was called!");
        setSendIcon(true);
        const newMessage = await dispatch(sendMessage(values));
        setTextMessage("");
        setSendIcon(false);
        socket.emit("newly sent message", newMessage.payload);
    };

    useEffect(() => {
        const handleOutsideEmojiPickerClick = (event: MouseEvent) => {
            // console.log("Click event:", event.target);
            // console.log("emojiPickerRef:", emojiPickerRef.current);
            // console.log("inputTextRef:", inputTextRef.current);

            if(emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)){
                setShowEmojiPicker(false);
            }
        };
    
        document.body.addEventListener("click", handleOutsideEmojiPickerClick)
    
        return () => document.body.removeEventListener("click", handleOutsideEmojiPickerClick);
      },[showEmojiPicker]);

  return (

    <div className="w-full h-[80px] dark:bg-dark_bg_3 flex">
        <div className="flex items-center mx-6 space-x-6">
            <Emoji ref={emojiPickerRef} inputTextRef={inputTextRef} textMessage={textMessage} setTextMessage={setTextMessage} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} setShowAttachmentMenu={setShowAttachmentMenu}></Emoji>

            <Attachments showAttachmentMenu={showAttachmentMenu} setShowAttachmentMenu={setShowAttachmentMenu} setShowEmojiPicker={setShowEmojiPicker}></Attachments>

            <div className="flex flex-1">
                {/* message input */}
                <MessageInput textMessage={textMessage} setTextMessage={setTextMessage} inputTextRef={inputTextRef} ></MessageInput>
            </div>
        </div>

        <div className="flex items-center px-2 mr-2 cursor-pointer">
            {
                status === "loading" && sendIcon 
                ? <span><ClipLoader size={30} color={"#3fe8a4"}></ClipLoader></span>
                : <span onClick={sendTextMessage}><SendIcon></SendIcon></span>
            }  
        </div>
        
    </div>
  );
};

const MessageActionsWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <MessageActions {...props} socket={socket}></MessageActions>}
    </SocketContext.Consumer>
);

export default MessageActionsWithSocket;
