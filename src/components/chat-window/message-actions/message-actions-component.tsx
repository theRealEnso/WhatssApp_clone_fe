import { useState, useEffect, useRef, MouseEvent } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectChatReducer } from "../../../redux/chat/chatSelector";
import { selectActiveConversation } from "../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../redux/user/userSelector";
import { sendMessage } from "../../../redux/chat/chatReducer";

import {AttachmentIcon} from "../../../svg";
import {SendIcon} from "../../../svg";

import { MessageInput } from "./message-input/message-input-component";
import { ClipLoader } from "react-spinners";
import { Emoji } from "./emoji-picker/emoji-component";

export const MessageActions = () => {
    const [textMessage, setTextMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
        await dispatch(sendMessage(values));
        setTextMessage("");
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

    <div className="w-full h-[85px] dark:bg-dark_bg_3 flex">
        <div className="flex items-center mx-6 space-x-6">
            <Emoji ref={emojiPickerRef} inputTextRef={inputTextRef} textMessage={textMessage} setTextMessage={setTextMessage} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker}></Emoji>
            <span className="cursor-pointer"><AttachmentIcon></AttachmentIcon></span>

            <div className="flex flex-1">
                {/* message input */}
                <MessageInput textMessage={textMessage} setTextMessage={setTextMessage} inputTextRef={inputTextRef}></MessageInput>

            </div>
        </div>

        <div className="flex items-center px-2 mr-2 cursor-pointer">
            {
                status === "loading" 
                ? <span><ClipLoader size={30} color={"#3fe8a4"}></ClipLoader></span>
                : <span onClick={sendTextMessage}><SendIcon></SendIcon></span>
            }  
        </div>
        
    </div>
  );
};
