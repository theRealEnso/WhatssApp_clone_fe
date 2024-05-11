import moment from "moment";
import { truncate } from "../../../utilities/truncateString";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import { timestampHandler } from "../../../utilities/date";

export const Conversation = ({conversation}) => {
    console.log(conversation);

    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);
    const currentUserId = currentUser._id;

    // need to filter through the users array and extract the data of the other user (ie user that the currently signed in user is communicating with)
    const usersArray = conversation.users;
    const recipientUserData = usersArray.filter((user) => user._id !== currentUserId);
    const recipientUser = recipientUserData[0];
    console.log(recipientUser);
  return (
    <div className="flex mt-8 outline-0 p-2 cursor-pointer rounded-lg hover:bg-dark_bg_5 hover:border-2 hover:border-green_1 transition-all duration-75">
        <div className="flex items-center w-14 mr-4">
            <img src={recipientUser.picture} className="w-[45px] h-[45px] rounded-full object-cover"></img>
        </div>

        <div className="flex flex-col justify-center align-center w-full border-y-2 border-dark_bg_5">
            <div className="flex justify-between">
                <h1 className="text-md font-bold text-white tracking-wide">{`${recipientUser.firstName} ${recipientUser.lastName}`}</h1>
                {
                    conversation.latestMessage ? <span className="text-dark_text_2">{timestampHandler(conversation.latestMessage.createdAt)}</span> : null
                }
            </div>


            {
                conversation.latestMessage ? 
                (
                    <div className="flex flex-col">
                        <span className="overflow-hidden text-dark_text_4">{truncate(conversation.latestMessage.message, 25)}</span>
                        <span className="text-dark_text_2">{moment(conversation.latestMessage.createdAt).fromNow()}</span>
                    </div>
                ) 
                : null
            }
        </div>
    </div>
  );
};
