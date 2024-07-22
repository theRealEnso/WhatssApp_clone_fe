import { useSelector } from 'react-redux'

import { selectFiles } from '../../../../redux/chat/chatSelector'

export const FileViewer = ({activeIndex}) => {
    const files = useSelector(selectFiles);

    if(!activeIndex || activeIndex === null || !files.length){
        return (
            <div className="h-full w-full flex items-center justify-center text-4xl text-white">
                <h1>No File Selected</h1>
            </div>
        )
    }

  return (
    <div className="w-full max-w-[60%]">
        
        {/* container */}
        <div className="flex justify-center items-center">
            {
                // check if files array is not empty + if activeIndex is truthy + if there is a `type` property. If so, then...
                files.length > 0 && files[activeIndex] && files[activeIndex].type ?
                    // further check if the type is an "IMAGE" string. If so, then render an image
                    (files[activeIndex].type === "IMAGE" 
                        ? (
                            <img 
                                src={files[activeIndex].base64EncodedURL} 
                                alt={files[activeIndex].type} 
                                className="max-w-[80%] object-contain hview"
                                >

                            </img>
                            )
                        //check if file type is "VIDEO", if so, then render a video
                        : files[activeIndex].type === "VIDEO" ? 
                            (
                                <video 
                                    src={files[activeIndex].base64EncodedURL} 
                                    controls
                                    className="hview max-w-[80%] object-contain"
                                    >

                                </video>
                            )
                        //Otherwise, display the following
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
                    ) 
                : null
            }
        </div>
    </div>
  );
};
