import { useEffect, useRef } from "react";
import { AttachmentIcon, CloseIcon } from "../../../../svg"
import { AttachmentMenu } from "./attachment-menu/attachment-menu-component";

export const Attachments = ({showAttachmentMenu, setShowAttachmentMenu, setShowEmojiPicker}) => {

    const attachmentsRef = useRef();

    const toggleAttachmentMenu = (event) => {
        event.stopPropagation();
        setShowAttachmentMenu(!showAttachmentMenu);
        setShowEmojiPicker(false);
    }

    useEffect(() => {
        const handleOutsideAttachmentsClick = (event) => {
            if(attachmentsRef.current && !attachmentsRef.current.contains(event.target)){
                setShowAttachmentMenu(false);
            }
        };

        document.body.addEventListener("click", handleOutsideAttachmentsClick);

        return () => document.body.removeEventListener("click", handleOutsideAttachmentsClick)
    }, [showAttachmentMenu, setShowAttachmentMenu]);

  return (
    <div className="flex items-center cursor-pointer relative">
        <button onClick={toggleAttachmentMenu}>
            {
                showAttachmentMenu ? <CloseIcon></CloseIcon> : <AttachmentIcon></AttachmentIcon>
            }
            
        </button>

        <div className={showAttachmentMenu ? "absolute cursor-pointer -translate-y-[240px] translate-x-[-5px] pointer-events-auto opacity-100 transition-opacity transition-transform" : "absolute opacity-0 translate-x-[-5px] -translate-y-[180px] pointer-events-none"}>
            {
                showAttachmentMenu && <AttachmentMenu attachmentsRef={attachmentsRef}></AttachmentMenu>
            }
        </div>

    </div>
  );
};
