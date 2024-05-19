import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectChatReducer } from "../../../redux/chat/chatSelector";
import { selectActiveConversation } from "../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../redux/user/userSelector";
import { sendMessage } from "../../../redux/chat/chatReducer";

import { EmojiIcon } from "../../../svg";
import {AttachmentIcon} from "../../../svg";
import {SendIcon} from "../../../svg";

import { MessageInput } from "./message-input/message-input-component";
import { ClipLoader } from "react-spinners";

export const MessageActions = () => {
    const [textMessage, setTextMessage] = useState("");

    const dispatch = useDispatch();

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

  return (

    <div className="w-full h-[85px] dark:bg-dark_bg_3 flex">
        <div className="flex items-center mx-6 space-x-6">
            <span className="cursor-pointer"><EmojiIcon></EmojiIcon></span>
            <span className="cursor-pointer"><AttachmentIcon></AttachmentIcon></span>

            <div className="flex flex-1">
                {/* message input */}
                <MessageInput textMessage={textMessage} setTextMessage={setTextMessage}></MessageInput>

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
