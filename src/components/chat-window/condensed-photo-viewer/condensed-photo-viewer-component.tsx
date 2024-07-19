import { useState } from "react";
import { useDispatch } from "react-redux";

import { addFilesToViewer } from "../../../redux/chat/chatReducer";

import moment from "moment";

import TriangleIcon from "../../../svg/TriangleIcon";

export const CondensedPhotoViewer = ({message, me, setShowViewer}) => {
    console.log(message);
    const {files} = message;

    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const displayViewer = () => {
        setShowViewer(true);
        dispatch(addFilesToViewer(files));
    };

    // const timestamp = moment(message.createdAt).fromNow();
    const timeStampInHoursAndMin = moment(message.createdAt).format("hh:mm")

  return (
    <div className="flex flex-col">
        <span className={`${me ? "ml-auto justify-end" : ""}`}>
            {
                me ? "You: " : `${message.sender.firstName}: `
            }
        </span>
        <div className={`w-full flex mt-2 mb-6 space-x-3 max-w-xs ${me ? "ml-auto justify-end relative right-24" : ""}`}>


            {/* message container */}
            <div className="">
                <div className={`relative left-16 h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>

                    {/* Display condensed photos */}
                    <div className={`grid grid-cols-2 grid-rows-2 gap-2 w-[300px] h-[300px] cursor-pointer ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`} onClick={displayViewer}>
                        {
                            message.files.slice(1).filter((_, idx) => idx < 3)
                            .map((f) => {
                                // console.log(f);
                                return (
                                    <div key={f.file.public_id} className="border-4 border-dark_bg_3 bg-dark_bg_1">
                                        <img src={f.file.secure_url} className="object-cover h-full w-full"></img>
                                    </div>
                                )

                            })
                        }

                        <div 
                            className={`flex items-center justify-center relative border-4 border-dark_bg_3 dark: bg-dark_bg_1 ${isHovered ? "opacity-100 transition-opacity" : "opacity-50"}`} 
                            onMouseEnter={() => setIsHovered(true)} 
                            onMouseLeave={() => setIsHovered(false)}>
                            <span className="absolute">{`+${message.files.length - 4} additional files`}</span>
                            <img src={message.files[4].file.secure_url} className="object-cover h-full w-full dark:bg-dark_bg_1"></img>
                        </div>
                    </div>

                    {/* display message timestamp */}
                    <span className="absolute right-1.5 bottom-1 text-sm text-dark_text_5 leading-none">{timeStampInHoursAndMin}</span>

                    {/* Triangle */}
                    {
                        !me ? (
                            <span>
                                <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"></TriangleIcon>
                            </span>
                        ) : (
                            <span>
                                <TriangleIcon className="dark:fill-green_3 rotate-[60deg] absolute right-[-11px] -top-[5px]"></TriangleIcon>
                            </span>
                        )
                    }

                </div>

            </div>
        </div>
    </div>  
  );
};

