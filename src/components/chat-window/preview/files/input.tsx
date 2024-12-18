import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//import redux selectors
import { selectCurrentUser } from "../../../../redux/user/userSelector";
import { selectActiveConversation, selectFiles } from "../../../../redux/chat/chatSelector";


// import redux actions
import { sendMessage, removeFiles } from "../../../../redux/chat/chatReducer";

//import SVG icon
import { SendIcon } from "../../../../svg";

//import components
import { ScaleLoader } from "react-spinners";

// import custom utility function
import { uploadFiles } from "../../../../utilities/upload-files";

//import socket context
import { SocketContext } from "../../../../context/socket-context";

const Input = ({textMessage, setTextMessage, socket}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {access_token} = useSelector(selectCurrentUser);

  const activeConversation = useSelector(selectActiveConversation);
  const conversation_id = activeConversation._id;

  const files = useSelector(selectFiles);
  // console.log(files);

  const handleInputChange = (event) => {
    const typedInput = event.target.value;
    setTextMessage(typedInput);
  };

  const sendMessageWithFiles = async (event) => {
    // console.log(files, textMessage);
    event.preventDefault();
    setLoading(true);

    //upload files first to cloudinary
    const uploaded_files = await uploadFiles(files);
    // console.log(uploaded_files);

    const values = {
      access_token,
      message: textMessage,
      conversation_id,
      files: uploaded_files.length > 0 ? uploaded_files : [],
    };

    //send message + files, then emit message so recipient user receives them
    const sentMessageWithFiles = await dispatch(sendMessage(values));
    // console.log(sentMessageWithFiles);

    socket.emit("newly sent message", sentMessageWithFiles.payload);

    await dispatch(removeFiles());

    setLoading(false);

    setTextMessage("");

  };

  const sendTxtMsg = async (event) => {
    if(event.key === "Enter"){
      await sendMessageWithFiles(textMessage);
    }
  }

  // console.log(textMessage);

  return (
    <div className="flex items-center justify-center w-full space-x-4 border-b dark:border-dark_border_2 p-4">
      {/* Message input */}
      <input 
        type="text" 
        placeholder="Type a message..." 
        value={textMessage} 
        onChange={handleInputChange}
        onKeyDown={sendTxtMsg}
        className="w-full h-[50px] max-w-[60%] bg-transparent border-none dark:text-dark_text_1 dark:bg-dark_hover_1 rounded-lg p-4"
        >
      </input>
    

      {/* send button */}
      <div className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer">
        <button onClick={sendMessageWithFiles}>
          {
            loading ? <ScaleLoader color="#fff" size={30}></ScaleLoader> : <SendIcon className="fill-white"></SendIcon> 
          }
        </button>
      </div>
    </div>
  );
};

const InputWithSocket = (props) => {
  // console.log(props); // props is an object containing all of the props or properties that it received from the parent component
  return (
    <SocketContext.Consumer>
      {(socket) => <Input {...props} socket={socket}></Input>}
    </SocketContext.Consumer>
  );
};

export default InputWithSocket;