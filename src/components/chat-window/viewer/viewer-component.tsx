import { useSelector } from "react-redux";

// import redux selector
import { selectFilesInViewer } from "../../../redux/chat/chatSelector";

//import svg icon
import { CloseIcon } from "../../../svg";

export const Viewer = ({setShowViewer}) => {
    const filesInViewer = useSelector(selectFilesInViewer);

    const closeViewer = () => setShowViewer(false);

    return (
        <div className="dark:bg-dark_bg_3 w-full h-screen px-8 space-y-10 overflow-hidden">
            <div className="flex justify-end pt-6">
                <button onClick={closeViewer}>
                    <CloseIcon className=""></CloseIcon>
                </button>
                
            </div>
            
            <div className="grid grid-cols-4 gap-6">
                {
                    filesInViewer && filesInViewer.map((f) => {
                        return (
                            <div className="relative w-[200px] h-[200px] aspect-w-1 aspect-h-1 cursor-pointer rounded-lg overflow-hidden">
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
      );
};
