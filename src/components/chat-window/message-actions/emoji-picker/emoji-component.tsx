import { useState, useEffect, forwardRef, MouseEvent} from "react";

import { EmojiIcon } from "../../../../svg";
import {CloseIcon} from "../../../../svg";
import EmojiPicker from "emoji-picker-react";

export const Emoji = forwardRef(({textMessage, setTextMessage, showEmojiPicker, setShowEmojiPicker, inputTextRef, setShowAttachmentMenu}, ref) => {

  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const toggleEmojiPicker = (event) => {
    event.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
    setShowAttachmentMenu(false);
  };

  const handleEmojiSelection = (emojiData, event: MouseEvent) => {
    // console.log(emojiData);
    const {emoji} = emojiData;
    const inputRef = inputTextRef.current;

    if(inputRef) {
      inputRef.focus(); // focus the input first so that the cursor is active

      // grab everything starting from the beginning of the string up to where the cursor is currently positioned-- selectionStart grabs the index of where the cursor is positioned if nothing is highlighted. The `substring` method returns the part of the string from the index up to and excluding the index, or to the end of the string if no index is supplied
      const startOfText = textMessage.substring(0, inputRef.selectionStart);

      // grab everything after where the cursor is positioned--selectionEnd also grabs the index of where the cursor is positioned if nothing is highlighted. Substring will just get everything to the end of the string if no index is supplied. So here, we grab everything after the index of where the cursor is currently positioned
      const endOfText = textMessage.substring(inputRef.selectionEnd);
  
      const newText = startOfText + emoji + endOfText;
      setTextMessage(newText);

      const cursorPositionIndex = startOfText.length + emoji.length;
      setCursorPosition(cursorPositionIndex);
    }

  };

  // Move the position of the input cursor right after the inserted emoji
  useEffect(() => {
    if(inputTextRef && inputTextRef.current){
      inputTextRef.current.setSelectionRange(cursorPosition, cursorPosition); 
    }
    
  }, [cursorPosition, inputTextRef]);

  return (
    <div className="flex items-center cursor-pointer">
      <button className="relative" onClick={toggleEmojiPicker}>
        {
          showEmojiPicker ? <CloseIcon className=""></CloseIcon> : <EmojiIcon className=""></EmojiIcon>
        }
      </button>

      <div ref={ref} className={showEmojiPicker ? "w-[1322px] absolute opacity-100 -translate-y-[266px] -translate-x-6 pointer-events-auto transition-opacity transition-transform" : "w-[1322px] absolute opacity-0 -translate-y-[220px] -translate-x-6 pointer-events-none"}>
        {
          showEmojiPicker && <EmojiPicker theme="dark" onEmojiClick={handleEmojiSelection}></EmojiPicker>
        }
        
      </div>
    </div>
  );
});
