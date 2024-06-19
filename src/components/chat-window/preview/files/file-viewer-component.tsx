import { useSelector } from 'react-redux'

import { selectFiles } from '../../../../redux/chat/chatSelector'

import "../../../../images/files/DOCX.png"

export const FileViewer = ({activeIndex}) => {
    const files = useSelector(selectFiles);

  return (
    <div className="w-full max-w-[60%]">
        
        {/* container */}
        <div className="flex justify-center items-center">
            {
                files[activeIndex].type === "IMAGE" 
                    ? (<img src={files[activeIndex].base64EncodedURL} alt="" className="max-w-[80%] object-contain hview"></img>)
                    : (
                        <div className="min-w-full hview flex flex-col items-center justify-center">
                            {/* file icon image */}
                            <img src={`../../../../images/files/${files[activeIndex].type}.png`} alt={files[activeIndex].type}></img>

                            {/* no preview text */}
                            <h1 className="dark:text-dark_text_2 text-2xl mb-2">No preview available</h1>

                            {/* display file size */}
                            <div className="flex flex-col dark:text-dark_text_2 space-y-2">
                                <span>{`File type: ${files[activeIndex].type}`}</span>
                                <span className="dark:text-dark_text_2">{`File size: ${(files[activeIndex]?.file?.size / 1000000).toFixed(2)}`} MB</span>
                            </div>
                            
                        </div>
                    )
            }
    
        </div>
    </div>
  );
};
