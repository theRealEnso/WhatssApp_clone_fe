import { useDispatch, useSelector } from "react-redux";
import { selectActiveConversation } from "../../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../../redux/user/userSelector";
import { sendMessage } from "../../../../redux/chat/chatReducer";

export const MessageInput = ({textMessage, setTextMessage, inputTextRef}) => {

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser)
    const {access_token} = currentUser;

    const activeConversation = useSelector(selectActiveConversation);
    const conversation_id = activeConversation._id;

    const values = {
        access_token,
        conversation_id,
        message: textMessage,
    };

    const handleMessageInputChange = (event) => {
        const typedInput = event.target.value;
        setTextMessage(typedInput);
    }

    const sendTextMessage = async (event) => {
        try {
            if(textMessage && event.key === "Enter"){
                await dispatch(sendMessage(values));
                setTextMessage("");
            }
        } catch(error){
            console.log(error);
        }
    }

    // console.log(textMessage);
  return (
    <div className="flex flex-1 items-center justify-center align-center">
        <input 
        type="text" 
        placeholder="Type your message here..." 
        className="dark:bg-dark_bg_5 h-[50px] w-[1100px] flex p-4 rounded-lg"
        value={textMessage}
        onChange={handleMessageInputChange}
        onKeyDown={sendTextMessage}
        ref={inputTextRef}
        ></input>
    </div>
  );
};
