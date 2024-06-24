import { useState } from "react";

import { FilesHeader } from "./files-header-component";
import { FileViewer } from "./file-viewer-component";
import { Input } from "./input";
import HandleAndSend from "./handle-and-send-component";

export const FilesPreview = () => {
  const [message, setMessage] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
                <Input message={message} setMessage={setMessage}></Input>

                {/* Send and manipulate files */}
                <HandleAndSend activeIndex={activeIndex} setActiveIndex={setActiveIndex} message={message}></HandleAndSend>
            </div>
        </div>
    </div>
  );
};
