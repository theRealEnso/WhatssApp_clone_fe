import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFiles } from "../../../../redux/chat/chatSelector";
import { removeFileFromFiles } from "../../../../redux/chat/chatReducer";

import {Add} from "./add"
import { SendIcon } from "../../../../svg";

export const HandleAndSend = ({activeIndex, setActiveIndex}) => {
  const dispatch = useDispatch();
  const files = useSelector(selectFiles);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const removeSelectedFile = (index: number) => {
    dispatch(removeFileFromFiles(index));
  };

  console.log(`The active index is currently at: ${activeIndex}`);
  console.log(`HOVERED INDEX =====> : ${hoveredIndex}`)
  return (
    <div className="flex w-[97%] items-center justify-between mt-2 border-t dark:border-dark_border_2">

      {/* empty */}
      <span></span>

      {/* list and display files as thumbnails */}
      <div className="flex gap-x-3">
        {
          files.map((file, index) => {
            // console.log(file);
            const handlePreviewChange = () => setActiveIndex(index);
            return (
              <div 
                key={index} 
                className={`relative w-16 h-16 mt-2 border dark:border-white rounded-md overflow-hidden cursor-pointer ${activeIndex === index ? "border-[4px] dark:border-green_1" : ""}`} 
                onClick={handlePreviewChange}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)}>
                {
                  file.type === "IMAGE"
                    ? (
                      <img 
                        src={file.base64EncodedURL} 
                        alt={file.type} 
                        className="w-full h-full object-cover">
                      </img>
                      )
                    : (
                      <img 
                        src={`../../../../images/files/${file.type}.png`} 
                        alt={file.type} 
                        className="w-full h-full object-cover"
                        >
                      </img>
                    )
                }

                {
                  hoveredIndex === index && (
                    <div className="absolute top-[-1px] right-[-1px] w-5 h-5 bg-red-600 rounded-lg flex items-center justify-center" onClick={() => removeSelectedFile(index)}>
                      <span className="text-white">X</span>
                    </div>
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
