import { useRef } from "react";
import { useDispatch } from "react-redux";

import { addFiles } from "../../../../../redux/chat/chatReducer";

import { PhotoIcon } from "../../../../../svg";

import { getFileType } from "../../../../../utilities/fileChecker";

export const PhotoAttachment = ({setShowAttachmentMenu}) => {
    const dispatch = useDispatch();
    const photoInputRef = useRef<HTMLInputElement>(null);

    const openFileSelection = () => {
        photoInputRef.current && photoInputRef.current.click();
    };

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const handleFileSelection = (event) => {
        // console.log(event.target.files); // returns a `FileList` object, which is an object containing files that the user has selected

        //create a new array from the `FileList` object. Each item in this array will contain a file object for each file
        let files = Array.from(event.target.files);
        // console.log(files);
        files.forEach((file) => {
            //if there is an unsupported file type, then filter it out
            if(
                file.type !== "image/png" 
                && file.type !== "image/jpeg" 
                && file.type !== "image/gif" 
                && file.type !== "image/webp"
                && file.type !== "video/mp4"
                && file.type !== "video/mpeg"
                && file.type !== "video/webm"
            ) {
                files = files.filter((item) => item.name !== file.name);
                return;

                //if there is a file that is greater than 5MB, then filter it out
            } else if (file.size > 1024 * 1024 * 5){
                files = files.filter((item) => item.name !== file.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    const createdDataURL = event.target ? event.target.result : null;
                    dispatch(addFiles(
                        {
                            file: file, 
                            base64EncodedURL: createdDataURL, 
                            type: getFileType(file.type),
                        }
                    ));
                }
            }
        })

        setShowAttachmentMenu(false);
    }

  return (
    <div className="cursor-pointer hover:scale-125 transition-transform">
        <button className="rounded-full bg-[#BF59CF]" onClick={openFileSelection}>
            <PhotoIcon className=""></PhotoIcon>
        </button>

        <input 
            type="file" 
            hidden
            multiple 
            ref={photoInputRef} 
            accept="image/png, image/jpeg, image/gif, image/webp, video/mp4, video/mpeg"
            onChange={handleFileSelection}>

        </input>
    </div>
  );
};


