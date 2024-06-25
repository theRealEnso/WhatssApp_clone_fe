import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// import selectors
import { selectFiles, selectActiveConversation } from "../../../../redux/chat/chatSelector";
import { selectCurrentUser } from "../../../../redux/user/userSelector";

// import redux actions
import { removeFileFromFiles, sendMessage, removeFiles } from "../../../../redux/chat/chatReducer";

// import custom utility function
import { uploadFiles } from "../../../../utilities/upload-files";

// import react components
import {Add} from "./add"
import { SendIcon } from "../../../../svg";
import { MoonLoader } from "react-spinners";
import VideoThumbnail from "react-video-thumbnail";

// import socket context to convert component to one that has access to the socket
import { SocketContext } from "../../../../context/socket-context";

const HandleAndSend = ({activeIndex, setActiveIndex, message, socket}) => {
  const dispatch = useDispatch();

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const files = useSelector(selectFiles);
  const {access_token} = useSelector(selectCurrentUser);
  const activeConversation = useSelector(selectActiveConversation);
  const conversation_id = activeConversation._id;

  const removeSelectedFile = (index: number) => {
    dispatch(removeFileFromFiles(index));
  };

  // solution may work, but is not a best practice. It is recommended to keep logic that handles state management + updates directly in the reducer
  // const removeSelectedFile = (index: number) => {
  //   const updatedFiles = files.filter((_, idx) => idx !== index)
  //   dispatch(removeFileFromFiles(updatedFiles));
  // };

  const sendMessageWithFiles = async (event) => {
    // console.log(files, message);
    event.preventDefault();
    setLoading(true);

    //upload files first to cloudinary
    const uploaded_files = await uploadFiles(files);
    // console.log(uploaded_files);

    const values = {
      access_token,
      message,
      conversation_id,
      files: uploaded_files.length > 0 ? uploaded_files : [],
    };

    //send message + files, then emit message so recipient user receives them
    const sentMessageWithFiles = await dispatch(sendMessage(values));
    // console.log(sentMessageWithFiles);

    socket.emit("newly sent message", sentMessageWithFiles.payload);

    await dispatch(removeFiles());

    setLoading(false);

  };

  console.log(`The active index is currently at: ${activeIndex}`);
  console.log(`HOVERED INDEX =====> : ${hoveredIndex}`)
  return (
    <div className="flex w-[97%] items-center justify-between mt-2 border-t dark:border-dark_border_2">

      {/* empty */}
      <span></span>

      {/* list and display files as thumbnails */}
      <div className="flex gap-x-3">
        {
          files.map((file, index) => {
            // console.log(file);
            const handlePreviewChange = () => setActiveIndex(index);
            return (
              <div 
                key={index} 
                className={`relative w-16 h-16 mt-2 border dark:border-white rounded-md overflow-hidden cursor-pointer ${activeIndex === index ? "border-[4px] dark:border-green_1" : ""}`} 
                onClick={handlePreviewChange}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)}>
                {
                  file.type === "IMAGE"
                    ? (
                      <img 
                        src={file.base64EncodedURL} 
                        alt={file.type} 
                        className="w-full h-full object-cover">
                      </img>
                      )
                    : file.type === "VIDEO"
                      ? (
                        <VideoThumbnail videoUrl={file.base64EncodedURL}></VideoThumbnail>
                      )
                    :
                     (
                      <img 
                        src={`../../../../images/files/${file.type}.png`} 
                        alt={file.type} 
                        className="w-full h-full object-cover"
                        >
                      </img>
                    )
                }

                {
                  hoveredIndex === index && (
                    <div className="absolute top-[-1px] right-[-1px] w-5 h-5 bg-red-600 rounded-lg flex items-center justify-center" onClick={() => removeSelectedFile(index)}>
                      <span className="text-white">X</span>
                    </div>
                  )
                }
                
              </div>
            )
          })
        }
        
        {/* Add another file */}
        <Add setActiveIndex={setActiveIndex}></Add>
      </div>

      {/* send button */}
      <div className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer" onClick={sendMessageWithFiles}>
        {
          loading ? <MoonLoader color="#fff" size={30}></MoonLoader> : <SendIcon className="fill-white"></SendIcon> 
        }
          
      </div>
    </div>
  );
};

const HandleAndSendWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <HandleAndSend {...props} socket={socket}></HandleAndSend>}
    </SocketContext.Consumer>
  )
}

export default HandleAndSendWithSocket;
