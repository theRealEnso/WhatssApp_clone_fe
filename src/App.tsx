import { Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/userSelector';

import SocketContext from './context/socket-context';


import Home from './components/authentication/home-component';
import LoginForm from './components/authentication/login-form-component';
import Register from './components/authentication/register-component';
import './index.css';

// socket IO, connect to server endpoint to create socket instance
const socket = io(import.meta.env.VITE_REACT_APP_WHATSAPP_API_ENDPOINT.split("api/v1")[0]);


const  App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {access_token} = currentUser;

  return (
    <>
    {/* specify dark mode for the entire app */}
      <div className="dark">
        {/* create global context, and pass the socket instance in the `value` prop so that all components can access the socket instance */}
        <SocketContext.Provider value={socket}> 
          <Routes>
            {/* pass socket as props to the home component. Can only be passed as props to 1 component only, the rest needs to access the socket via the context */}
            <Route path="/" element={access_token ? <Home socket={socket}></Home> : <Navigate to="login"></Navigate> }></Route>
            <Route path="/login" element={access_token ? <Navigate to="/"></Navigate> : <LoginForm></LoginForm>}></Route>
            <Route path="/register" element={access_token ? <Navigate to="/"></Navigate> : <Register></Register>}></Route>
          </Routes>
        </SocketContext.Provider>
      </div>
    </>
  )
}

export default App;
