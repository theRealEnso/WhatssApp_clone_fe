import { useSelector } from 'react-redux';
import { selectOnlineUsers } from '../../../redux/chat/chatSelector';

import { SearchLargeIcon, DotsIcon, CallIcon, VideoCallIcon } from '../../../svg';

export const ChatHeader = ({recipientUser, callUser, activeConversation, numUsersOnlineInGroup}) => {
    const onlineUsers = useSelector(selectOnlineUsers);

    const isRecipientUserOnline = () => {
        const onlineRecipientUser = onlineUsers.find((user) => user.userId === recipientUser._id);

        return onlineRecipientUser ? true : false;
    }
  return (
    <div className="flex items-center justify-between h-[70px] dark:bg-dark_bg_2 w-full px-2">
        
        <div className="flex items-center align-center justify-center mt-2">
            <img 
                src={activeConversation.isGroupConversation ? activeConversation.picture : recipientUser.picture} 
                className={`h-[50px] w-[50px] rounded-full object-cover mr-4 ${isRecipientUserOnline() ? "border-4 border-green_1" : ""}`}>
            </img>

            <div className="flex flex-col">
                <h1 className="text-white">{activeConversation.isGroupConversation ? activeConversation.name : recipientUser.firstName}</h1>
                {
                    activeConversation.isGroupConversation && numUsersOnlineInGroup > 1
                        ? <span className="dark:text-green_1">{`${numUsersOnlineInGroup} users are online`}</span>
                        : activeConversation.isGroupConversation && numUsersOnlineInGroup === 1
                        ? <span className="dark:text-green_1">{`${numUsersOnlineInGroup} user is online`}</span>
                        : isRecipientUserOnline() 
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

