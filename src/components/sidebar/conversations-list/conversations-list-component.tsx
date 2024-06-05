import { useSelector } from "react-redux";
import { selectAllUserConversations } from "../../../redux/chat/chatSelector";
import { selectActiveConversation } from "../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import Conversation  from "../conversation/conversation-component"; // reminder that `exporting default <component name>` does not work with {} brackets when importing for use

import { getRecipientUserId } from "../../../utilities/chat";

export const ConversationsList = ({onlineUsers}) => {
    const conversations = useSelector(selectAllUserConversations);
    console.log(conversations);

    const activeConversation = useSelector(selectActiveConversation);
    
    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);

  return (
    <div className="convos scrollbar">
        {
          // only show conversations that have a message. If a convo has no messages at all, then do not display it
            conversations && 
              conversations.filter((conversation) => conversation.latestMessage !== null || conversation._id === activeConversation._id)
              .map((convo) => {
                const isUserOnline = onlineUsers.find((user) => user.userId === getRecipientUserId(currentUser._id, convo.users));
                return <Conversation key={convo._id} convo={convo} online={isUserOnline ? true : false}></Conversation>
              })
        }
    </div>
  );
};
