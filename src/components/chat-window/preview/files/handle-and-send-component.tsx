import { useSelector } from "react-redux";

import { selectFiles } from "../../../../redux/chat/chatSelector";

import {Add} from "./add"
import { SendIcon } from "../../../../svg";

export const HandleAndSend = ({activeIndex, setActiveIndex}) => {
  const files = useSelector(selectFiles);

  return (
    <div className="flex w-[97%] items-center justify-between mt-2 border-t dark:border-dark_border_2">

      {/* empty */}
      <span></span>

      {/* list and display files as thumbnails */}
      <div className="flex gap-x-2">
        {
          files.map((file, index) => {
            console.log(file);
            const handlePreviewChange = () => setActiveIndex(index);
            return (
              <div key={index} className={`w-14 h-14 mt-2 border dark:border-white rounded-md overflow-hidden cursor-pointer ${activeIndex === index ? "border-[4px] border-green_1" : ""}`} onClick={handlePreviewChange}>
                {
                  file.type === "IMAGE"
                    ? (
                      <img 
                        src={file.base64EncodedURL} 
                        alt={file.type} className="w-full h-full object-cover">
                      </img>
                      )
                    : (
                      <img 
                        src={`../../../../images/files/${file.type}.png`} 
                        alt={file.type} className="w-8 h-10 mt-1.5 ml-2.5">
                      </img>
                    )
                }
              </div>
            )
          })
        }
        
        {/* Add another file */}
        <Add setActiveIndex={setActiveIndex}></Add>
      </div>

      {/* send button */}
      <div className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer">
          <SendIcon className="fill-white"></SendIcon>
      </div>
    </div>
  );
};
