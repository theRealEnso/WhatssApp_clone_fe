import { useDispatch, useSelector } from "react-redux";
import { openConversation } from "../../../redux/chat/chatReducer";
import { selectCurrentUser } from "../../../redux/user/userSelector";

import {SocketContext} from "../../../context/socket-context";

const Contacts = ({result, setSearchResults, socket}) => {
    console.log(result);

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const {access_token} = currentUser;

    const recipient_id = result._id;

    const values = {
        access_token,
        recipient_id,
    }

    const openConvo = async () => {
        const newConvo = await dispatch(openConversation(values));
        await setSearchResults([]);
        socket.emit("join conversation room", newConvo.payload._id);
    }

  return (
    <div className="scrollbar cursor-pointer rounded-lg hover:bg-dark_bg_5 hover:border-green_1 shadow-inner shadow-2xl shadow-dark_bg_5 focus:ring-2 focus:ring-green_1 active:ring-2 active:ring-green_1 active:transition-shadow duration-75" onClick={openConvo}>
        <div className="flex items-center align-center mt-4 space-x-4 ml-2 p-2">
            <div>
                <img src={result.picture} className="h-[45px] w-[45px] rounded-full object-cover"></img>
            </div>

            <div className="flex flex-col border-y-2 border-dark_bg_4 space-y-2 w-full">
                <h1 className="dark:text-dark_text_1">{`${result.firstName} ${result.lastName}`}</h1>
                <span className="dark:text-dark_text_2">{result.status}</span>
            </div>
        </div>
    </div>
  );
};

const ContactWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Contacts {...props} socket={socket}></Contacts>}
    </SocketContext.Consumer>
);

export default ContactWithSocket;
