import { useState } from "react";

import { FilesHeader } from "./files-header-component";
import { FileViewer } from "./file-viewer-component";
import InputWithSocket from "./input";
import { MiniPreviewSelector } from "./mini-preview-selector";

export const FilesPreview = ({textMessage, setTextMessage}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">

        {/* container */}
        <div className="w-full flex flex-col items-center">

            {/* Header */}
            <FilesHeader activeIndex={activeIndex}></FilesHeader>

            {/* Viewing selected file */}
            <FileViewer activeIndex={activeIndex}></FileViewer>

            <div className="w-full flex flex-col items-center">
                {/*custom input to send files and message  */}
                <InputWithSocket textMessage={textMessage} setTextMessage={setTextMessage}></InputWithSocket>

                {/*manipulate files */}
                <MiniPreviewSelector activeIndex={activeIndex} setActiveIndex={setActiveIndex}></MiniPreviewSelector>
            </div>
        </div>
    </div>
  );
};
