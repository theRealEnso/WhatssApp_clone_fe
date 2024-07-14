import { useState } from "react"
import {useDispatch} from "react-redux";

//import redux actions
import { removeFileFromFiles } from "../../../../redux/chat/chatReducer";

//import components
import VideoThumbnail from "react-video-thumbnail";

export const MiniPreview = ({file, index, activeIndex, setActiveIndex}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

    const dispatch = useDispatch();

    const handlePreviewChange = () => setActiveIndex(index);

    const removeSelectedFile = (index: number) => {
        dispatch(removeFileFromFiles(index));
      };
    
    return (
        <div 
          key={index} 
          className={`flex relative w-20 h-20 mt-6 border dark:border-white rounded-md overflow-hidden cursor-pointer ${activeIndex === index || hoveredIndex === index ? "opacity 100 transition-opacity" : "opacity-50"} ${activeIndex === index ? "border-[4px] dark:border-green_2" : ""}`} 
          onClick={handlePreviewChange}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          >
          {
            file.type === "IMAGE"
              ? (
                <img 
                  src={file.base64EncodedURL} 
                  alt={file.type} 
                  className="w-full h-full object-cover">
                </img>
                )
              : file.type === "VIDEO"
                ? (
                  <VideoThumbnail videoUrl={file.base64EncodedURL}></VideoThumbnail>
                )
              :
               (
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
              <div className="absolute top-[-1px] right-[-1px] w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center" onClick={() => removeSelectedFile(index)}>
                <span className="text-white">X</span>
              </div>
            )
          }
        </div>
      )
}
