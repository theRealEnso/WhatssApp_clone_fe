import { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/userSelector';
import { selectActiveConversation, selectFiles } from '../../redux/chat/chatSelector';
import { getAllConversationMessages } from '../../redux/chat/chatReducer';

import { ChatHeader } from "./chat-header/chat-header-component";
import ChatMessages from './chat-messages/chat-messages-component';
import MessageActions from './message-actions/message-actions-component';
import { FilesPreview } from './preview/files/files-preview-component';
import { Viewer } from './viewer/viewer-component';

import { getRecipientUser } from '../../utilities/chat';

export const ChatWindow = ({callUser, recipientUser, setRecipientUser}) => {
    const dispatch = useDispatch();

    const [textMessage, setTextMessage] = useState<string>("");
    const [showViewer, setShowViewer] = useState(false);

    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;

    const activeConversation = useSelector(selectActiveConversation);
    // console.log(activeConversation);
    const conversation_id = activeConversation._id;

    const files = useSelector(selectFiles);


    useEffect(() => {

        if(activeConversation && activeConversation.users){
            const recipientUserData = getRecipientUser(currentUser._id, activeConversation.users);
            // console.log(recipientUserData);
            setRecipientUser(recipientUserData);
            
            dispatch(getAllConversationMessages({access_token, conversation_id}))
        }
        
    },[activeConversation, access_token, currentUser._id, conversation_id, setRecipientUser, dispatch]);


    return (
    <div className="h-fit text-white flex flex-col w-full">
        <div>
            <ChatHeader recipientUser={recipientUser} callUser={callUser}></ChatHeader>
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
