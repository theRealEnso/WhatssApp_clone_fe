import { PollIcon, ContactIcon, DocumentIcon, CameraIcon, StickerIcon} from "../../../../../svg";

import { PhotoAttachment } from "./photo-attachment";
import { DocumentAttachments } from "./documents-attachment-component";

export const AttachmentMenu = ({attachmentsRef, setShowAttachmentMenu}) => {
  return (
    <div className="flex flex-col gap-y-2" ref={attachmentsRef}>

       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full">
                <PollIcon></PollIcon>
            </button>
       </div>

       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full bg-[#0EABF4]">
                <ContactIcon></ContactIcon>
            </button>
       </div>


       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full bg-[#D3396D]">
                <CameraIcon></CameraIcon>
            </button>
       </div>

       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full">
                <StickerIcon></StickerIcon>
            </button>
       </div>

        <DocumentAttachments setShowAttachmentMenu={setShowAttachmentMenu}></DocumentAttachments>

        <PhotoAttachment setShowAttachmentMenu={setShowAttachmentMenu}></PhotoAttachment>

    </div>
  );
};
