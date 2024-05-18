import { EmojiIcon } from "../../../svg";
import {AttachmentIcon} from "../../../svg";
import {SendIcon} from "../../../svg";

import { MessageInput } from "./message-input/message-input-compnent";

export const MessageActions = () => {
  return (

    <div className="w-full h-[85px] dark:bg-dark_bg_3 flex">
        <div className="flex items-center mx-6 space-x-6">
            <span className="cursor-pointer"><EmojiIcon></EmojiIcon></span>
            <span className="cursor-pointer"><AttachmentIcon></AttachmentIcon></span>

            <div className="flex flex-1">
                {/* message input */}
                <MessageInput></MessageInput>

            </div>
        </div>

        <div className="flex items-center px-2 mr-2 cursor-pointer">
            <span><SendIcon></SendIcon></span>    
        </div>
        
    </div>
  );
};
