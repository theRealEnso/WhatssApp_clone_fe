import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import TriangleIcon from "../../../svg/TriangleIcon";
import { PulseLoader } from "react-spinners";

export const TypingStatusBubble = ({typing}) => {
    const currentUser = useSelector(selectCurrentUser);
    const currentUser_id = currentUser._id;

  return (

    <div className="w-full">
        {
            typing && 
            (
                <div className="w-full flex flex-col space-x-3 max-w-xs ml-6">
                    <div className="relative flex flex-col h-full w-fit bg-dark_bg_5 rounded-lg px-3 py-1 my-4 left-[50px] space-y-2">
                        <TriangleIcon className="absolute top-[-5px] left-[-8px] rotate-[60deg] fill-dark_bg_5"></TriangleIcon>
                        <span><PulseLoader size={10} color="#ffffff"></PulseLoader></span>
                    </div>
                </div>
                
            )
        }
    </div>
  );
};
