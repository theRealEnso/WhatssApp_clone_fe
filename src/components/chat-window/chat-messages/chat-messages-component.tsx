import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectConversationMessages } from "../../../redux/chat/chatSelector";

import { Message } from "../message/message-component";

export const ChatMessages = () => {
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

  return (
    <div className="bg-[url('../../../src/assets/WhatsApp_chat_background.jpg')] bg-cover bg-center bg-no-repeat">
        {/* messages container */}
        <div className="scrollbar message-window overflow-auto py-2 px-[2%]">
            {
                messages.map((message) => (<Message key={message._id} message={message}></Message>))
            }
            
            {/* automatic scroll to end or bottom */}
            <div ref={endRef}></div>

        </div>
        
    </div>
  );
};
