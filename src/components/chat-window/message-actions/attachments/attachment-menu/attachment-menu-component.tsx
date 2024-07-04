import { PollIcon, ContactIcon, DocumentIcon, PhotoIcon, CameraIcon, StickerIcon} from "../../../../../svg";

import { PhotoAttachment } from "./photo-attachment";
import { DocumentAttachments } from "./documents-attachment-component";

export const AttachmentMenu = ({attachmentsRef, setShowAttachmentMenu}) => {
  return (
    <div className="flex flex-col gap-y-2" ref={attachmentsRef}>

       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full">
                <PollIcon className=""></PollIcon>
            </button>
       </div>

       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full bg-[#0EABF4]">
                <ContactIcon className=""></ContactIcon>
            </button>
       </div>


       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full bg-[#D3396D]">
                <CameraIcon></CameraIcon>
            </button>
       </div>

       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full">
                <StickerIcon className=""></StickerIcon>
            </button>
       </div>

        <DocumentAttachments setShowAttachmentMenu={setShowAttachmentMenu}></DocumentAttachments>

        <PhotoAttachment setShowAttachmentMenu={setShowAttachmentMenu}></PhotoAttachment>

    </div>
  );
};
