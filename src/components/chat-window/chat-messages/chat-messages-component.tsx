import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectConversationMessages } from "../../../redux/chat/chatSelector";

import { Message } from "../message/message-component";

import { TypingStatusBubble } from "../typing-status-bubble/typing-status-bubble-component";

import { SocketContext } from "../../../context/socket-context";

const ChatMessages = ({socket}) => {

  const [currentTypingStatus, setCurrentTypingStatus] = useState<string>("");
  const [convoId, setConvoId] = useState<string>("");

  const messages = useSelector(selectConversationMessages);

  const endRef = useRef();

  const scrollToBottomOfMessages = () => {
    endRef.current && endRef.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottomOfMessages();
  }, [messages]);

  useEffect(() => {
    socket.on("typing", (typingStatusObject) => {
      const {typingStatus, conversationId} = typingStatusObject;
      setCurrentTypingStatus(typingStatus);
      setConvoId(conversationId)
    });

    socket.on("stopped typing", (typingStatusObject) => {
      const {typingStatus, conversationId} = typingStatusObject;
      setCurrentTypingStatus(typingStatus);
      setConvoId(conversationId);
    })
  },[socket])

  return (
    <div className="bg-[url('../../../src/assets/WhatsApp_chat_background.jpg')] bg-cover bg-center bg-no-repeat">
        {/* messages container */}
        <div className="scrollbar message-window overflow-auto py-2 px-[2%]">
            {
                messages.map((message) => (<Message key={message._id} message={message}></Message>))
            }
            
            {
              currentTypingStatus === "typing..." 
                ? <TypingStatusBubble typing={currentTypingStatus === "typing..." ? true : false}></TypingStatusBubble> 
                : null
            }

            {/* automatic scroll to end or bottom */}
            <div ref={endRef}></div>
        </div>  
    </div>
  );
};

const ChatMessagesWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <ChatMessages {...props} socket={socket}></ChatMessages>}
    </SocketContext.Consumer>
  )
};

export default ChatMessagesWithSocket;
