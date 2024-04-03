import { Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/userSelector';

import Home from './components/authentication/home-component';
import LoginForm from './components/authentication/login-form-component';
import Register from './components/authentication/register-component';
import './index.css';

const  App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {access_token} = currentUser;

  return (
    <>
    {/* specify dark mode for the entire app */}
      <div className="dark"> 
        <Routes>
          <Route path="/" element={access_token ? <Home></Home> : <Navigate to="login"></Navigate> }></Route>
          <Route path="/login" element={access_token ? <Navigate to="/"></Navigate> : <LoginForm></LoginForm>}></Route>
          <Route path="/register" element={access_token ? <Navigate to="/"></Navigate> : <Register></Register>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;
