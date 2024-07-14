import { useRef } from "react"
import { CloseIcon } from "../../../../svg"
import { useDispatch } from "react-redux";

import { addFiles } from "../../../../redux/chat/chatReducer";

import { getFileType } from "../../../../utilities/fileChecker";

export const Add = () => {
    const addRef = useRef();
    const dispatch = useDispatch();

    const openAddFiles = () => {
        addRef.current && addRef.current.click();
    };

    const handleFiles = (event) => {
        const filesObject = event.target.files;
        let docFiles = Array.from(filesObject);

        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
        for (let document of docFiles){
            if(
                document.type !== "application/pdf"
                && document.type !== "application/msword"
                && document.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                && document.type !== "application/vnd.ms-powerpoint"
                && document.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                && document.type !== "text/html"
                && document.type !== "text/plain"
                && document.type !== "application/vnd.rar"
                && document.type !== "application/zip"
                && document.type !== "application/x-zip-compressed"
                && document.type !== "audio/mpeg"
                && document.type !== "audio/wav"
                && document.type !== "image/png" 
                && document.type !== "image/jpeg" 
                && document.type !== "image/gif" 
                && document.type !== "image/webp"
                && document.type !== "video/mp4"
                && document.type !== "video/mpeg"
                && document.type !== "video/webm"
            ){
                docFiles = docFiles.filter((doc) => doc.name !== document.name);
                return;
            } else if(document.size > 1024 * 1024 * 50){
                docFiles = docFiles.filter((doc) => doc.name !== document.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(document);
                reader.onload = (event) => {
                    const dataURL = event.target.result;
                    dispatch(addFiles(
                        {
                            file: document, 
                            base64EncodedURL: dataURL, 
                            type: getFileType(document.type),
                        }
                    ));
                };
            }
        }
    }

  return (
    <div className="mt-6 w-20 h-20 border dark:border-white rounded-md flex items-center justify-center cursor-pointer" onClick={openAddFiles}>
        <span className="rotate-45">
            <CloseIcon className="dark:fill-dark_svg_1"></CloseIcon>
        </span>
        <input
            ref={addRef}
            type="file"
            hidden
            multiple
            accept="application/*, text/plain, image/png, image/jpeg, image/gif, image/webp, video/mp4, video/mpeg"
            onChange={handleFiles}
        >
        </input>
    </div>
  )
}
