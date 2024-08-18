import { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/userSelector';
import { selectActiveConversation, selectFiles, selectOnlineUsers } from '../../redux/chat/chatSelector';
import { getAllConversationMessages } from '../../redux/chat/chatReducer';

import { ChatHeader } from "./chat-header/chat-header-component";
import ChatMessages from './chat-messages/chat-messages-component';
import MessageActions from './message-actions/message-actions-component';
import { FilesPreview } from './preview/files/files-preview-component';
import { Viewer } from './viewer/viewer-component';

import { getRecipientUser, onlineUsersInGroupChat } from '../../utilities/chat';

export const ChatWindow = ({callUser, recipientUser, setRecipientUser}) => {

    const dispatch = useDispatch();

    const [textMessage, setTextMessage] = useState<string>("");
    const [showViewer, setShowViewer] = useState<boolean>(false);

    const [numUsersOnlineInGroup, setNumUsersOnlineInGroup] = useState<number>(0);

    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;

    const activeConversation = useSelector(selectActiveConversation);
    console.log(activeConversation);
    const conversation_id = activeConversation._id;

    const onlineUsers = useSelector(selectOnlineUsers);

    const files = useSelector(selectFiles);


    useEffect(() => {

        if(activeConversation && activeConversation.isGroupConversation === false && activeConversation.users){
            const recipientUserData = getRecipientUser(currentUser._id, activeConversation.users);
            // console.log(recipientUserData);
            setRecipientUser(recipientUserData);
            
        }

        if(activeConversation && activeConversation.isGroupConversation === true && activeConversation.users){
            // want the chat header to display how many users in that group conversation are online. If none are online, then it should read `offline`
            // we have the users array for that group conversation. Need to iterate through that users array of ID's
            // if the ID is contained in the online users, then push it into a new array
            setNumUsersOnlineInGroup(onlineUsersInGroupChat(onlineUsers, activeConversation.users));
        }

        dispatch(getAllConversationMessages({access_token, conversation_id}))
        
    },[activeConversation, access_token, currentUser._id, conversation_id, setRecipientUser, onlineUsers, dispatch]);

    // console.log(onlineUsers);
    // console.log(numUsersOnlineInGroup);


    return (
    <div className="h-fit text-white flex flex-col w-full">
        <div>
            <ChatHeader recipientUser={recipientUser} callUser={callUser} activeConversation={activeConversation} numUsersOnlineInGroup={numUsersOnlineInGroup}></ChatHeader>
        </div>
        
        {
            showViewer 
            ? <Viewer setShowViewer={setShowViewer}></Viewer> 
            : files.length > 0 
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
