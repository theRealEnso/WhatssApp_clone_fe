import { Routes, Route } from 'react-router-dom';

import Home from './components/authentication/home-component';
import Login from './components/authentication/login-component';
import Register from './components/register-component';
import './index.css';

const  App = () => {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;
