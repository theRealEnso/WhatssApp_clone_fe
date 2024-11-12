import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectAllUserConversations } from "../../../redux/chat/chatSelector";
import { selectActiveConversation } from "../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import Conversation  from "../conversation/conversation-component"; // reminder that `exporting default <component name>` does not work with {} brackets when importing for use

import { SocketContext } from "../../../context/socket-context";

import { checkOnlineStatus } from "../../../utilities/chat";

const ConversationsList = ({onlineUsers, socket}) => {
    const [currentTypingStatus, setCurrentTypingStatus] = useState<string>("");
    const [nameOfUserTyping, setNameOfUserTyping] = useState<string>("");
    const [convoId, setCurrentConvoId] = useState<string>("");

    const conversations = useSelector(selectAllUserConversations);
    // console.log(conversations);

    const activeConversation = useSelector(selectActiveConversation);
    // console.log(activeConversation);
    
    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);

    useEffect(() => {
      socket.on("typing", (typingStatusObject) => {
        const {typingStatus, conversation_id, userTyping} = typingStatusObject;
        setCurrentTypingStatus(typingStatus);
        setNameOfUserTyping(userTyping);
        setCurrentConvoId(conversation_id);
      });
    },[socket]);

    useEffect(() => {
      socket.on("stopped typing", (typingStatusObject) => {
        const {typingStatus, conversation_id, userTyping} = typingStatusObject;
        setCurrentTypingStatus(typingStatus);
        setNameOfUserTyping(userTyping);
        setCurrentConvoId(conversation_id);
      });
    },[socket]);

  return (
    <div className="convos scrollbar">
        {
          // only show conversations that have a message (non null value) If a convo has no messages at all, then do not display it
          // also display group conversations
          // also display active conversations
            conversations && 
              conversations.filter((conversation) => 
                conversation.latestMessage !== null || 
                conversation._id === activeConversation._id || 
                conversation.isGroupConversation === true
              )
              .map((convo) => {
                // const isUserOnline = onlineUsers.find((user) => user.userId === getRecipientUserId(currentUser._id, convo.users));
                // console.log(convo);
                const isUserOnline = checkOnlineStatus(onlineUsers, currentUser._id, convo.users);
                return (
                  <Conversation 
                    key={convo._id} 
                    convo={convo} 
                    online={isUserOnline ? true : false} 
                    isTyping={currentTypingStatus === "typing..." ? true : false} 
                    convoId={convoId}
                    currentTypingStatus={currentTypingStatus}
                    nameOfUserTyping={nameOfUserTyping}
                    >
                  </Conversation>)
              })
        }
    </div>
  );
};

const ConversationsListWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <ConversationsList {...props} socket={socket}></ConversationsList>}
    </SocketContext.Consumer>
  )
};

export default ConversationsListWithSocket;
