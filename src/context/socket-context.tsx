import { createContext } from "react";
import { io } from "socket.io-client";

// socket IO, connect front end to server endpoint to create socket instance
const socket = io(import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT.split("api/v1")[0]);

export const SocketContext = createContext({
    
});

export const SocketProvider = ({children}) => {

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
};