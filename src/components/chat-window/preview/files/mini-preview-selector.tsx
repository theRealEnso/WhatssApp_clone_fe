import { useState } from "react";
import { useSelector } from "react-redux";

// import selectors
import { selectFiles} from "../../../../redux/chat/chatSelector";


// import react components
import {Add} from "./add"
import { MiniPreview } from "./mini-preview-component";


// import socket context to convert component to one that has access to the socket

export const MiniPreviewSelector = ({activeIndex, setActiveIndex}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isHoveredPrevious, setIsHoveredPrevious] = useState<boolean>(false);
  const [isHoveredNext, setIsHoveredNext] = useState<boolean>(false);

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
      <div className="flex items-center justify-center space-x-4">
        <div>
          <button 
            onClick={previousPage} 
            disabled={currentPage === 0} 
            className={`text-lg font-bold tracking-wide ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"} ${isHoveredPrevious ? "dark:text-green_1 transition-colors" : "text-white"}`}
            onMouseEnter={() => {
              
              setIsHoveredPrevious(true);
            }}
            onMouseLeave={() => {
              setIsHoveredPrevious(false);
            }}
            >
            <div className="flex flex-col">
              <span>previous</span>
              <span>{`<---`}</span>
            </div>
          </button>
        </div>

        {/* list and display files as thumbnails */}
        
        {
          filesToDisplay.map((file, idx) => {
            // console.log(file);
            return (
              //need to make sure that the index passed as props to the MiniPreview component tracks the global index of the entire files array in the redux store, not the filesToDisplay indices because these will always be starting from index 0-4
              <MiniPreview file={file} index={startingIndex + idx} activeIndex={activeIndex} setActiveIndex={setActiveIndex}></MiniPreview>
            )
          })
        }

        <div>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1} 
            className={`text-lg font-bold tracking-wide${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"} ${isHoveredNext ? "dark:text-green_1 transition-colors" : "text-white"}
            `}
            onMouseEnter={() => {
              setIsHoveredNext(true);
            }}
            onMouseLeave={() => {
              setIsHoveredNext(false);
            }}
            >
            <div className="flex flex-col">
              <span>next</span>
              <span>{`--->`}</span>
            </div>
          </button>
        </div>
      </div>

      <div className="relative left-[40px]">
        {/* Add more files */}
        <Add></Add>
      </div>     


    </div>
  );
};
