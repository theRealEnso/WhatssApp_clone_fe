import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { getAllUserConversations } from "../../redux/chat/chatReducer";

import { Sidebar } from "../sidebar/sidebar-component";

const Home = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;
    // console.log(access_token);

    useEffect(() => {
        // const values = {
        //     access_token: access_token,
        // };

        if(currentUser) {
            dispatch(getAllUserConversations(access_token));
        }
    },[currentUser, access_token, dispatch])

    return (
        <div className="w-full h-screen flex items-center justify-center dark:bg-dark_bg_1 overflow-hidden">
            <div className="w-[1700px] h-full min-h-screen flex">
                <Sidebar></Sidebar>
            </div>

        </div>
    );
};

export default Home;