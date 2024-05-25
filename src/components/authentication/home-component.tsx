import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { selectActiveConversation } from "../../redux/chat/chatSelector";
import { getAllUserConversations } from "../../redux/chat/chatReducer";

import { Sidebar } from "../sidebar/sidebar-component";
import { Banner } from "../banner/banner-component";
import { ChatWindow } from "../chat-window/chat-window-component";

const Home = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;
    // console.log(access_token);

    const activeConversation = useSelector(selectActiveConversation);

    useEffect(() => {
        // const values = {
        //     access_token: access_token,
        // };

        if(currentUser) {
            dispatch(getAllUserConversations(access_token));
        }
    },[currentUser, access_token, dispatch])

    return (
        <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center align-center overflow-hidden">
            <div className="container h-full flex py-[20px]">
                <Sidebar></Sidebar>

                {
                    activeConversation && Object.keys(activeConversation).length > 0 ? <ChatWindow></ChatWindow> : <Banner></Banner>
                }
                
            </div>

        </div>
    );
};

export default Home;