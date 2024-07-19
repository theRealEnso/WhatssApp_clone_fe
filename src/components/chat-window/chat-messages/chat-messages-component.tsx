import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import selectors
import { selectConversationMessages } from "../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../redux/user/userSelector";

// import components
import { Message } from "../message/message-component"; 
import { TypingStatusBubble } from "../typing-status-bubble/typing-status-bubble-component";
import { FileMessage } from "../files/file-message/file-message-component";
import { CondensedPhotoViewer } from "../condensed-photo-viewer/condensed-photo-viewer-component";

//import socket context
import { SocketContext } from "../../../context/socket-context";

const ChatMessages = ({setShowViewer, socket}) => {

  const [currentTypingStatus, setCurrentTypingStatus] = useState<string>("");
  const [convoId, setConvoId] = useState<string>("");

  const messages = useSelector(selectConversationMessages);
  // console.log(messages);

  const currentUser = useSelector(selectCurrentUser);

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
                messages && messages.map((message) => (
                
                  <>
                    {/* display message text */}
                    {
                      // additional check to see if a message is empty. If it is, then don't display it
                      message.message.length > 0 ? (<Message key={message._id} message={message} me={currentUser._id === message.sender._id}></Message>) : null
                    }

                    {/* display message file attachments */}
                    {
                      message.files.length < 3 ? 
                        (
                          <div>
                            {
                              message.files.map((file) => {
                                // console.log(file);
                                return (<FileMessage key={file.file.original_filename} message={message} fileMessage={file} me={currentUser._id === message.sender._id}></FileMessage>)
                              })
                            }
                          </div>
                        ) : message.files.length > 3 ? 
                        (
                          <div>
                            {
                              message.files.filter((_, idx) => idx === 0).map((file) => (<FileMessage key={file.file.original_filename} message={message} fileMessage={file} me={currentUser._id === message.sender._id}></FileMessage>))
                            }

                            <CondensedPhotoViewer message={message} me={currentUser._id === message.sender._id} setShowViewer={setShowViewer}></CondensedPhotoViewer>
                          </div>
                        ): null
                              
                    }

                  </>
                ))
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
