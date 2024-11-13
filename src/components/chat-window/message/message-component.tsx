import moment from "moment";

import TriangleIcon from "../../../svg/TriangleIcon";

export const Message = ({message, me}) => {
    // console.log(message)

    // const timestamp = moment(message.createdAt).fromNow();
    const timeStampInHoursAndMin = moment(message.createdAt).format("hh:mm")

  return (
    <div className="flex flex-col">
        <span className={`${me ? "ml-auto justify-end" : ""}`}>
            <div className="flex flex-col">
                <span>
                    {
                        me ? "You" : `${message.sender.firstName}: `
                    }
                </span>
                
                <img src={message.sender.picture} className="rounded-full h-[50px] w-[50px] object-cover"></img>

            </div>

        </span>
        <div className={`w-full flex mt-2 mb-6 space-x-3 max-w-xs ${me ? "ml-auto justify-end relative right-24" : ""}`}>


            {/* message container */}
            <div className="">
                <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? "bg-green_3 left-8 bottom-16" : "dark:bg-dark_bg_2 left-16 bottom-16"}`}>

                    {/* Display message */}
                    <p className="float-left h-full text-md pb-6 pr-2">{message.message}</p>

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

// Old code before refactoring
// return (

//     <div className="w-full">
//         {
//             message.sender._id === currentUser_id ? 
//             (
//                 <div className="w-full flex justify-end ml-auto space-x-3 max-w-xs mr-6">
//                     <div className="flex flex-col">
//                         <span className="mt-4 ml-auto">You :</span>
//                         <div className="relative flex flex-col h-full w-fit bg-green_3 rounded-lg px-3 py-1 mt-4 right-[50px]">
//                             <TriangleIcon className="absolute rotate-[60deg] right-[-10px] top-[-5px] fill-green_3"></TriangleIcon>
//                             <span className="float-left h-full pr-4 py-2">{message.message}</span>
//                             <span className="flex justify-end mb-2">{timeStampInHoursAndMin}</span>
//                         </div>
//                     </div>
//                 </div>
//             )

//             : (
//                 <div className="w-full flex flex-col space-x-3 max-w-xs ml-6">
//                     <span className="">{message.sender.firstName} :</span>
//                     <div className="relative flex flex-col h-full w-fit bg-dark_bg_5 rounded-lg px-3 py-1 my-4 left-[50px] space-y-2">
//                         <TriangleIcon className="absolute top-[-5px] left-[-8px] rotate-[60deg] fill-dark_bg_5"></TriangleIcon>
//                         <span className="flex">{message.message}</span>
//                         <span className="flex justify-end">{timeStampInHoursAndMin}</span>
//                     </div>
//                 </div>
//             )
//         }
//     </div>
//   );
