import { useState } from "react";
import { useSelector } from "react-redux";

// import redux selector
import { selectFilesInViewer } from "../../../redux/chat/chatSelector";

//import svg icon
import { CloseIcon } from "../../../svg";

export const Viewer = ({setShowViewer}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isHoveredNext, setIsHoveredNext] = useState<boolean>(false);
    const [isHoveredPrevious, setIsHoveredPrevious] = useState<boolean>(false);
    const [isFileHovered, setIsFileHovered] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

    const filesInViewer = useSelector(selectFilesInViewer);

    const itemsPerPage = 20;

    const totalPages = Math.ceil(filesInViewer.length / itemsPerPage);

    const startingIndex = currentPage * itemsPerPage;

    const filesToDisplay = filesInViewer.slice(startingIndex, startingIndex + itemsPerPage);

    const closeViewer = () => setShowViewer(false);
    
    const previousPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if(currentPage < totalPages - 1){
            setCurrentPage(currentPage + 1)
        }
    };

    return (
        <div className="dark:bg-dark_bg_3 w-full h-screen px-4 space-y-4 overflow-auto flex flex-col">
            <div className="flex justify-end p-6">
                <button onClick={closeViewer}>
                    <CloseIcon className=""></CloseIcon>
                </button>
                
            </div>
            
            <div className="fileViewerHeight scrollbar overflow-auto px-4 space-y-4">
                <div className="grid grid-cols-4 gap-6">
                    {
                        filesToDisplay.map((f, idx) => {
                            return (
                                <div 
                                    className={`relative w-[200px] h-[200px] aspect-w-1 aspect-h-1 cursor-pointer rounded-lg overflow-hidden ${hoveredIndex === idx ? "scale-110 transition-transform shadow-white shadow-xl" : "shadow-md shadow-white"} `}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                    <a className="block w-full h-full" href={f.file.secure_url} target="_blank" download>
                                        {
                                            f.type === "IMAGE" ? 
                                            (
                                                <img 
                                                    src={f.file.secure_url} 
                                                    className="object-cover w-full h-full"
                                                    alt={f.type}
                                                >
                                                </img>
                                            ) : f.type === "VIDEO" ? 
                                            
                                            (
                                                <video src={f.file.secure_url} controls></video>
                                            ) : 
                                            (
                                                <div className="flex flex-col items-center justify-center">
                                                    <img src={`../../../../images/files/${f.type}.png`}></img>
                                                    <div>
                                                        <span>{f.type}</span>
                                                        <span>{(f.file.bytes / 1048576).toFixed(2)} MB</span>
                                                    </div>
                                                </div>
                                            )
                                        }
        
                                    </a>
                                </div>
                            )
                        })
                    }
        
                </div>
            </div>


            <div className="flex justify-center items-center space-x-20 p-4 mt-auto bg-dark_bg_3">
                <button
                    onClick={previousPage} disabled={currentPage === 0}
                    className={`text-2xl tracking-wide cursor-pointer ${currentPage === 0 ? "cursor-not-allowed opacity-50" : "opacity-100"} ${isHoveredPrevious ? "text-green_1" : "text-white"}`}
                    onMouseEnter={() => setIsHoveredPrevious(true)}
                    onMouseLeave={() => setIsHoveredPrevious(false)}
                >
                    {`<- previous`}
                </button>

                <button
                    onClick={nextPage} disabled={currentPage === totalPages - 1}
                    className={`text-2xl tracking-wide cursor-pointer ${currentPage === totalPages - 1 ? "cursor-not-allowed opacity-50" : "opacity-100"} ${isHoveredNext ? "text-green_1" : "text-white"}`}
                    onMouseEnter={() => setIsHoveredNext(true)}
                    onMouseLeave={() => setIsHoveredNext(false)}
                >
                    {`next ->`}
                </button>
            </div>
        </div>
      );
};
