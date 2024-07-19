import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/userSelector';
import { selectActiveConversation, selectFiles } from '../../redux/chat/chatSelector';
import { getAllConversationMessages } from '../../redux/chat/chatReducer';

import { ChatHeader } from "./chat-header/chat-header-component";
import ChatMessages from './chat-messages/chat-messages-component';
import MessageActions from './message-actions/message-actions-component';
import { FilesPreview } from './preview/files/files-preview-component';
import { Viewer } from './viewer/viewer-component';

export const ChatWindow = () => {
    const dispatch = useDispatch();

    const [textMessage, setTextMessage] = useState<string>("");
    const [showViewer, setShowViewer] = useState(false);

    const [recipientUser, setRecipientUser] = useState({});
    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;
    const currentUser_id = currentUser._id;

    const activeConversation = useSelector(selectActiveConversation);
    // console.log(activeConversation);
    const conversation_id = activeConversation._id;

    const files = useSelector(selectFiles);


    useEffect(() => {

        if(activeConversation && activeConversation.users){
            const recipientUserData = activeConversation.users.filter((user) => user._id !== currentUser_id);
            // console.log(recipientUserData);
            if(recipientUserData.length > 0) {
                const recipient = recipientUserData[0];
                // console.log(recipient);
                setRecipientUser(recipient);
            }
            
            dispatch(getAllConversationMessages({access_token, conversation_id}))
        }
        
    },[activeConversation, currentUser_id, access_token, conversation_id, dispatch]);

  return (
    <div className="h-fit text-white flex flex-col w-full">
        <div>
            <ChatHeader recipientUser={recipientUser}></ChatHeader>
        </div>
        
        {
            showViewer ? <Viewer setShowViewer={setShowViewer}></Viewer> :
            files.length > 0 
                ? <FilesPreview textMessage={textMessage} setTextMessage={setTextMessage}></FilesPreview> 
                :   <>
                        <div>
                            <ChatMessages setShowViewer={setShowViewer}></ChatMessages>
                        </div>

                        <div>
                            <MessageActions textMessage={textMessage} setTextMessage={setTextMessage}></MessageActions>
                        </div>
                    </>
        }
    </div>
  );
};
