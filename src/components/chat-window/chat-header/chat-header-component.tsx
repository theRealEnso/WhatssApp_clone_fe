import { useSelector } from 'react-redux';
import { selectOnlineUsers } from '../../../redux/chat/chatSelector';

import { SearchLargeIcon, DotsIcon, CallIcon, VideoCallIcon } from '../../../svg';

export const ChatHeader = ({recipientUser, callUser}) => {
    const onlineUsers = useSelector(selectOnlineUsers);

    const isRecipientUserOnline = () => {
        const onlineRecipientUser = onlineUsers.find((user) => user.userId === recipientUser._id);

        return onlineRecipientUser ? true : false;
    }
  return (
    <div className="flex items-center justify-between h-[70px] dark:bg-dark_bg_2 w-full px-2">
        
        <div className="flex items-center align-center justify-center mt-2">
            <img 
                src={recipientUser.picture} 
                className={`h-[50px] w-[50px] rounded-full object-cover mr-4 ${isRecipientUserOnline() ? "border-4 border-green_1" : ""}`}>
            </img>

            <div className="flex flex-col">
                <h1 className="text-white">{recipientUser.firstName}</h1>
                {
                    isRecipientUserOnline() 
                    ? <span className="text-green_1">online</span> 
                    : <span>offline</span>
                }
            </div>
        </div>

        <div className="mr-8">
            <ul className="flex items-center justify-center space-x-4 cursor-pointer w-full">
                <li onClick={() => callUser()}>
                    <button className="btn">
                        <VideoCallIcon className="" ></VideoCallIcon>
                    </button>
                </li>
                <li>
                    <button className="btn">
                        <CallIcon className="" ></CallIcon>
                    </button>
                </li>
                <li>
                    <button className="btn">
                        <SearchLargeIcon className="" ></SearchLargeIcon>
                    </button>
                </li>
                <li>
                    <button className="btn">
                        <DotsIcon className="" ></DotsIcon>
                    </button>
                </li>
            </ul>
        </div>

    </div>
  );
};

