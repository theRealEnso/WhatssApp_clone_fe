import { PollIcon, ContactIcon, DocumentIcon, CameraIcon, StickerIcon, PhotoIcon } from "../../../../../svg";

export const AttachmentMenu = ({attachmentsRef}) => {
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
            <button className="rounded-full bg-[#5F66CD]">
                <DocumentIcon></DocumentIcon>
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

       <div className="cursor-pointer hover:scale-125 transition-transform">
            <button className="rounded-full bg-[#BF59CF]">
                <PhotoIcon></PhotoIcon>
            </button>
       </div>

    </div>
  );
};
