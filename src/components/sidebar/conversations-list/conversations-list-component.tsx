import { useSelector } from "react-redux";
import { selectAllUserConversations } from "../../../redux/chat/chatSelector";
import { Conversation } from "../conversation/conversation-component";

export const ConversationsList = () => {
    const conversations = useSelector(selectAllUserConversations);

  return (
    <div className="convos">
        {
            conversations && conversations.map((conversation => (
                <Conversation key={conversation._id} conversation={conversation}></Conversation>
            )))
        }
    </div>
  );
};
