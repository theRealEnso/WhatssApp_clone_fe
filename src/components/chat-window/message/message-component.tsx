import moment from "moment";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import TriangleIcon from "../../../svg/TriangleIcon";

import { timestampHandler } from "../../../utilities/date";

export const Message = ({message}) => {
    console.log(message)

    const currentUser = useSelector(selectCurrentUser);
    const currentUser_id = currentUser._id;

    const timestamp = moment(message.createdAt).fromNow();
    const timeStampInHoursAndMin = moment(message.createdAt).format("hh:mm")

  return (

    <div className="w-full">
        {
            message.sender._id === currentUser_id ? 
            (
                <div className="w-full flex flex-col justify-end ml-auto space-x-3 max-w-xs mr-6">
                    <span className="ml-auto mt-4">You :</span>
                    <div className="relative h-full w-fit bg-green_3 rounded-lg px-3 py-1 mt-4">
                        <TriangleIcon className="absolute rotate-[60deg] right-[-10px] top-[-5px] fill-green_3"></TriangleIcon>
                        <p className="float-left h-full">{message.message}</p>
                        <br></br>
                        <p className="float-right">{timeStampInHoursAndMin}</p>
                    </div>
                </div>
            )

            : (
                <div className="w-full flex flex-col space-x-3 max-w-xs ml-6">
                    <span className="">{message.sender.firstName} :</span>
                    <div className="relative h-full w-fit bg-dark_bg_2 rounded-lg px-3 py-1 my-4">
                        <TriangleIcon className="absolute top-[-5px] left-[-8px] rotate-[60deg] fill-dark_bg_2"></TriangleIcon>
                        <p className="float-left h-full">{message.message}</p>
                        <br></br>
                        <p className="float-right pr-2 mt-2">{timeStampInHoursAndMin}</p>
                    </div>
                </div>
            )
        }
    </div>

  );
};
