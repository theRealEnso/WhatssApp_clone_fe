import moment from "moment";
import { truncate } from "../../../utilities/truncateString";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelector";
import { selectActiveConversation} from "../../../redux/chat/chatSelector";

import {SocketContext} from "../../../context/socket-context";

import { openConversation} from "../../../redux/chat/chatReducer";

import { timestampHandler } from "../../../utilities/date";
import { getRecipientUser } from "../../../utilities/chat";

const Conversation = ({convo, socket, online, isTyping, convoId, currentTypingStatus, nameOfUserTyping}) => {
    console.log(convo);
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);
    const currentUserId = currentUser._id;
    const {access_token} = currentUser;

    const activeConversation = useSelector(selectActiveConversation);
    console.log(activeConversation);

    // need to filter through the users array and extract the data (ID) of the other user (ie user that the currently signed in user is communicating with)
    const recipientUser = getRecipientUser(currentUserId, convo.users);
    const recipient_id = recipientUser._id;

    const values = {
        access_token,
        recipient_id,
        isGroupConversation: convo.isGroupConversation ? convo._id : false, // will contain the conversation ID of the group conversation or a false boolean value
    };

    //already have list of conversations in the state. We need to somehow write code that, when user clicks on a conversation in the list, that conversation gets added to the activeConversation state in order to displayed in the chat window.
    //Our backend api endpoint is expecting to receive a recipient_id in the body... so if this is the case, we already have the recipient user data in this component...
    const openConvo = async () => {
        try {
            const openedConvo = await dispatch(openConversation(values));
            // console.log(openedConvo);
            socket.emit("join conversation room", openedConvo.payload._id); // send conversation ID back to server
        } catch(error) {
            console.error(error);
        }
    };

  return (
    <div className={`flex flex-auto mt-8 outline-0 p-2 cursor-pointer rounded-lg hover:bg-dark_bg_2 hover:border-2 hover:border-green_1 shadow-inner shadow-2xl shadow-dark_bg_5 focus:ring-2 focus:ring-green_1 active:ring-2 active:ring-green_1 active:transition-shadow duration-75 ${convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""}`} onClick={openConvo}>
        <div className="flex flex-none items-center w-14 mr-4 relative">
            {
                online && 
                <div className="w-3 h-3 rounded-full bg-green_online_1 absolute top-[8px] right-[-5px]"></div>
            }
            <img src=
                {
                    convo.isGroupConversation === true ? convo.picture
                    : recipientUser.picture
                } 
                className={`w-[45px] h-[45px] rounded-full object-cover ${online ? "border-4 border-green_1" : ""}`}>
            
            </img>
        </div>

        <div className="flex flex-col justify-center align-center w-full border-y-2 border-dark_bg_5">
            <div className="flex justify-between">
                <h1 className="text-md font-bold text-white tracking-wide">{convo.isGroupConversation ? convo.name : `${recipientUser.firstName} ${recipientUser.lastName}`}</h1>
                {
                    convo.latestMessage ? <span className="text-dark_text_2">{timestampHandler(convo.latestMessage.createdAt)}</span> : null
                }
            </div>


            {
                online && isTyping && convoId === convo._id ? 
                (
                    <div className="flex flex-col">
                        <span className="text-green_1 text-md">{`${nameOfUserTyping} is ${currentTypingStatus}`}</span>
                        <span className="text-dark_text_2">{moment(convo.latestMessage.createdAt).fromNow()}</span>
                    </div>
                ) :
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

const ConversationWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Conversation {...props} socket={socket}></Conversation>}
    </SocketContext.Consumer>
);

export default ConversationWithSocket;


