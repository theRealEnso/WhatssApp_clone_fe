import moment from "moment";
import { truncate } from "../../../utilities/truncateString";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";
import { selectActiveConversation } from "../../../redux/chat/chatSelector";

import { openConversation } from "../../../redux/chat/chatReducer";

import { timestampHandler } from "../../../utilities/date";

export const Conversation = ({convo}) => {
    // console.log(convo);
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);
    const currentUserId = currentUser._id;
    const {access_token} = currentUser;

    const activeConversation = useSelector(selectActiveConversation);

    // need to filter through the users array and extract the data of the other user (ie user that the currently signed in user is communicating with)
    const usersArray = convo.users;
    const recipientUserData = usersArray.filter((user) => user._id !== currentUserId);
    const recipientUser = recipientUserData[0];
    const recipient_id = recipientUser._id;
    // console.log(recipientUser);

    const values = {
        access_token,
        recipient_id
    }

    //already have list of conversations in the state. We need to somehow write code that, when user clicks on a conversation in the list, that conversation gets added to the activeConversation state in order to displayed in the chat window.
    //Our backend api endpoint is expecting to receive a recipient_id in the body... so if this is the case, we already have the recipient user data in this component...
    const openConvo = async () => {
        await dispatch(openConversation(values))
    }

  return (
    <div className={`flex flex-auto mt-8 outline-0 p-2 cursor-pointer rounded-lg hover:bg-dark_bg_2 hover:border-2 hover:border-green_1 shadow-inner shadow-2xl shadow-dark_bg_5 focus:ring-2 focus:ring-green_1 active:ring-2 active:ring-green_1 active:transition-shadow duration-75 ${convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""}`} onClick={openConvo}>
        <div className="flex flex-none items-center w-14 mr-4">
            <img src={recipientUser.picture} className="w-[45px] h-[45px] rounded-full object-cover"></img>
        </div>

        <div className="flex flex-col justify-center align-center w-full border-y-2 border-dark_bg_5">
            <div className="flex justify-between">
                <h1 className="text-md font-bold text-white tracking-wide">{`${recipientUser.firstName} ${recipientUser.lastName}`}</h1>
                {
                    convo.latestMessage ? <span className="text-dark_text_2">{timestampHandler(convo.latestMessage.createdAt)}</span> : null
                }
            </div>


            {
                convo.latestMessage ? 
                (
                    <div className="flex flex-col">
                        <span className="overflow-hidden text-dark_text_4">{truncate(convo.latestMessage.message, 25)}</span>
                        <span className="text-dark_text_2">{moment(convo.latestMessage.createdAt).fromNow()}</span>
                    </div>
                ) 
                : null
            }
        </div>
    </div>
  );
};

{/* <div className="flex flex-auto mt-8 outline-0 p-2 cursor-pointer rounded-lg hover:bg-dark_bg_5 hover:border-2 hover:border-green_1 shadow-inner shadow-2xl shadow-dark_bg_5 focus:ring-2 focus:ring-green_1 active:ring-2 active:ring-green_1 active:transition-shadow duration-75" onClick={openConvo}>
    <!-- Your existing content here -->
</div> */}

