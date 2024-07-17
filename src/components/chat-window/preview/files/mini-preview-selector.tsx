import { useState } from "react";
import { useSelector } from "react-redux";

// import selectors
import { selectFiles} from "../../../../redux/chat/chatSelector";


// import react components
import {Add} from "./add"
import { MiniPreview } from "./mini-preview-component";


// import socket context to convert component to one that has access to the socket

export const MiniPreviewSelector = ({activeIndex, setActiveIndex, message}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const files = useSelector(selectFiles);

  console.log(files);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(files.length / itemsPerPage);

  const nextPage = () => {
    if(currentPage <= totalPages - 1){
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 1)
    }
  };

  const startingIndex = currentPage * itemsPerPage;

  const filesToDisplay = files.slice(startingIndex,  startingIndex + itemsPerPage);

  console.log(currentPage);

  // solution may work, but is not a best practice. It is recommended to keep logic that handles state management + updates directly in the reducer
  // const removeSelectedFile = (index: number) => {
  //   const updatedFiles = files.filter((_, idx) => idx !== index)
  //   dispatch(removeFileFromFiles(updatedFiles));
  // };

  return (
    <div className="flex">
      <div className="flex items-center justify-center space-x-10">
        <div>
          <button onClick={previousPage}>
            <div className="flex flex-col">
              <span>previous</span>
              <span>{`<---`}</span>
            </div>
          </button>
        </div>

        {/* list and display files as thumbnails */}
        
        {
          files && files.map((file, index) => {
            // console.log(file);
            return (
              <MiniPreview file={file} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}></MiniPreview>
            )
          })
        }

        <div>
          <button onClick={nextPage}>
            <div className="flex flex-col">
              <span>next</span>
              <span>{`--->`}</span>
            </div>
          </button>
        </div>
      </div>

      <div className="relative left-[40px]">
        {/* Add another file */}
        <Add></Add>
      </div>     


    </div>
  );
};
