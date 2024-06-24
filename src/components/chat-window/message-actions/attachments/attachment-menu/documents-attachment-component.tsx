import { useRef } from "react";
import { useDispatch } from "react-redux";

import { addFiles } from "../../../../../redux/chat/chatReducer";

import { DocumentIcon } from "../../../../../svg";

import { getFileType } from "../../../../../utilities/fileChecker";

export const DocumentAttachments = ({setShowAttachmentMenu}) => {
    const dispatch = useDispatch();

    const documentsInputRef = useRef();

    const openDocFileSelection = () => {
        documentsInputRef.current && documentsInputRef.current.click();
    };

    const handleDocumentSelection = (event) => {
        const filesObject = event.target.files;
        console.log(filesObject);
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

        setShowAttachmentMenu(false);
    };

  return (
    <div className="cursor-pointer hover:scale-125 transition-transform">
        <button className="rounded-full bg-[#5F66CD]" onClick={openDocFileSelection}>
            <DocumentIcon></DocumentIcon>
        </button>

        <input 
            type="file"
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.oasis.opendocument.text, application/vnd.openxmlformats-application/vnd.openxmlformats-, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-powerpoint, text/html, text/plain, application/vnd.rar, application/zip, application/x-zip-compressed, audio/mpeg, audio/wav" 
            hidden 
            multiple
            ref={documentsInputRef}
            onChange={handleDocumentSelection}>
        </input>
    </div>
  );
};
