import moment from "moment";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/user/userSelector";

// import components
import TriangleIcon from "../../../../svg/TriangleIcon";
import { FileImageVideo } from "../file-image-video/file-image-video-component";
import { OtherFiles } from "../other-files/other-files-component";

export const FileMessage = ({fileMessage, message, me}) => {
    const {file, type} = fileMessage;
    const currentUser = useSelector(selectCurrentUser);

    const timestamp = moment(message.createdAt).fromNow();
    const timeStampInHoursAndMin = moment(message.createdAt).format("hh:mm");

    return (
        <div className="flex flex-col">
            <span className={`${me ? "ml-auto justify-end" : ""}`}>
                {
                    me ? "You: " : `${message.sender.firstName}: `
                }
            </span>

            <div className={`w-full flex mt-2 mb-6 space-x-3 max-w-xs ${me ? "ml-auto justify-end relative right-12" : ""}`}>
    
    
                {/* message container */}
                <div className="">
                    <div className={`relative left-2 h-full dark:text-dark_text_1 rounded-lg ${me ? "border-[3px] border-green_3" : "dark:bg-dark_bg_1 border-[3px] border-dark_bg_2"} ${me && file.public_id.split(".")[1] === "png" ? "bg-white" : "bg-green_3"}`}>
    
                        {/* Display message */}
                        <div className={`h-full text-md ${type !== "IMAGE" && type !== "VIDEO" ? "pb-5" : ""}`}>
                            {
                                type === "IMAGE" || type === "VIDEO"
                                    ? 
                                        <a href={file.secure_url} target="_blank" download>
                                            <FileImageVideo url={file.secure_url} type={type}></FileImageVideo>
                                        </a> 
                                    : <OtherFiles file={file} type={type} me={me}></OtherFiles>
                            }
                        </div>
    
                        {/* display message timestamp */}
                        <span className="absolute right-1.5 bottom-1 text-sm text-dark_text_5 leading-none">{timeStampInHoursAndMin}</span>
    
                        {/* Triangle */}
                        {
                            !me ? (
                                <span>
                                    <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-8px] -left-2"></TriangleIcon>
                                </span>
                            ) : (
                                <span>
                                    <TriangleIcon className="dark:fill-green_4 rotate-[60deg] absolute right-[-14px] -top-[7.5px]"></TriangleIcon>
                                </span>
                            )
                        }
    
                    </div>
                </div>
            </div>
        </div>  
    );
};

//   return (

//     <div className={`w-full flex mt-2 mb-6 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`}>

//         <span className="relative bottom-3">
//             {
//                 me ? "You: " : `${message.sender.firstName}: `
//             }
//         </span>

//         {/* message container */}
//         <div className="">
//             <div className={`relative left-2 h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? "border-[3px] border-green_3" : "dark:bg-dark_bg_2"}`}>

//                 {/* Display message */}
//                 <div className="h-full text-md">
//                     {
//                         type === "IMAGE" || type === "VIDEO"
//                             ? <FileImageVideo url={file.secure_url} type={type}></FileImageVideo> : null
//                     }
//                 </div>

//                 {/* display message timestamp */}
//                 <span className="absolute right-1.5 bottom-1 text-sm text-dark_text_5 leading-none">{timeStampInHoursAndMin}</span>

//                 {/* Triangle */}
//                 {
//                     !me ? (
//                         <span>
//                             <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"></TriangleIcon>
//                         </span>
//                     ) : (
//                         <span>
//                             <TriangleIcon className="dark:fill-green_3 rotate-[60deg] absolute -left-[8px] -top-[5px]"></TriangleIcon>
//                         </span>
//                     )
//                 }

//             </div>

//         </div>
//     </div>
// );