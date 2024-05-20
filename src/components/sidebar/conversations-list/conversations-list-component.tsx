import { useSelector } from "react-redux";
import { selectAllUserConversations } from "../../../redux/chat/chatSelector";
import { selectActiveConversation } from "../../../redux/chat/chatSelector";
import { Conversation } from "../conversation/conversation-component";

export const ConversationsList = () => {
    const conversations = useSelector(selectAllUserConversations);
    console.log(conversations);

    const activeConversation = useSelector(selectActiveConversation);

  return (
    <div className="convos scrollbar">
        {
          // only show conversations that have a message. If a convo has no messages at all, then do not display it
            conversations && 
              conversations.filter((conversation) => conversation.latestMessage !== null || conversation._id === activeConversation._id)
              .map((convo) => (<Conversation key={convo._id} convo={convo}></Conversation>))
        }
    </div>
  );
};
