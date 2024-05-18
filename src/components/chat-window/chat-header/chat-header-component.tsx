import { SearchLargeIcon } from '../../../svg';
import {DotsIcon} from '../../../svg';

export const ChatHeader = ({recipientUser}) => {

  return (
    <div className="flex items-center justify-between h-[70px] dark:bg-dark_bg_2 w-full px-2">
        
        <div className="flex items-center align-center justify-center mt-2">
            <img src={recipientUser.picture}className="h-[50px] w-[50px] rounded-full object-cover mr-4"></img>

            <div className="flex flex-col">
                <h1 className="text-white">{recipientUser.firstName}</h1>
                <span className="dark:text-dark_text_2 text-sm">online</span>
            </div>
        </div>

        <div className="mr-8">
            <ul className="flex justify-between space-x-4 cursor-pointer w-full">
                <li><SearchLargeIcon></SearchLargeIcon></li>
                <li><DotsIcon></DotsIcon></li>
            </ul>
        </div>

    </div>
  );
};
