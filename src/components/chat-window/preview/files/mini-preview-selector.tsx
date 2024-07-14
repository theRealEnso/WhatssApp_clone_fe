import { useSelector } from "react-redux";

// import selectors
import { selectFiles} from "../../../../redux/chat/chatSelector";


// import react components
import {Add} from "./add"
import { MiniPreview } from "./mini-preview-component";


// import socket context to convert component to one that has access to the socket

export const MiniPreviewSelector = ({activeIndex, setActiveIndex, message}) => {

  const files = useSelector(selectFiles);

  console.log(files);

  // solution may work, but is not a best practice. It is recommended to keep logic that handles state management + updates directly in the reducer
  // const removeSelectedFile = (index: number) => {
  //   const updatedFiles = files.filter((_, idx) => idx !== index)
  //   dispatch(removeFileFromFiles(updatedFiles));
  // };

  return (
    <div className="flex space-x-2">

      {/* list and display files as thumbnails */}
      
      {
        files && files.map((file, index) => {
          // console.log(file);
          return (
            <MiniPreview file={file} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}></MiniPreview>
          )
        })
      }
     

      {/* Add another file */}
      <Add></Add>
    </div>
  );
};
