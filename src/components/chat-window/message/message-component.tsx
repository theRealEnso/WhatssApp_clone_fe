import moment from "moment";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import TriangleIcon from "../../../svg/TriangleIcon";

export const Message = ({message}) => {
    // console.log(message)

    const currentUser = useSelector(selectCurrentUser);
    const currentUser_id = currentUser._id;

    const timestamp = moment(message.createdAt).fromNow();
    const timeStampInHoursAndMin = moment(message.createdAt).format("hh:mm")

  return (

    <div className="w-full">
        {
            message.sender._id === currentUser_id ? 
            (
                <div className="w-full flex justify-end ml-auto space-x-3 max-w-xs mr-6">
                    <div className="flex flex-col">
                        <span className="mt-4 ml-auto">You :</span>
                        <div className="relative flex flex-col h-full w-fit bg-green_3 rounded-lg px-3 py-1 mt-4 right-[50px]">
                            <TriangleIcon className="absolute rotate-[60deg] right-[-10px] top-[-5px] fill-green_3"></TriangleIcon>
                            <span className="float-left h-full pr-4 py-2">{message.message}</span>
                            <span className="flex justify-end mb-2">{timeStampInHoursAndMin}</span>
                        </div>
                    </div>
                </div>
            )

            : (
                <div className="w-full flex flex-col space-x-3 max-w-xs ml-6">
                    <span className="">{message.sender.firstName} :</span>
                    <div className="relative flex flex-col h-full w-fit bg-dark_bg_2 rounded-lg px-3 py-1 my-4 left-[50px] space-y-2">
                        <TriangleIcon className="absolute top-[-5px] left-[-8px] rotate-[60deg] fill-dark_bg_2"></TriangleIcon>
                        <span className="flex">{message.message}</span>
                        <span className="flex justify-end">{timeStampInHoursAndMin}</span>
                    </div>
                </div>
            )
        }
    </div>

  );
};
