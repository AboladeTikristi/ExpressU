import logo from './logo.svg';
import './App.css';
import {Routes,Route,Redirect,Navigate,useParams} from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login';
import MessagePage from './Pages/MessagePage';
import HomePage from './Pages/HomePage';
import Footer from './Pages/Footer';
import'../node_modules/bootstrap/dist/js/bootstrap'
import ProfilePage from './Pages/ProfilePage';
import Naver from './Pages/Naver';
import MessageingPage from './Pages/MessageingPage';
import PostPage from './Pages/PostPage';
import Test from './Pages/Test';
import{useRef}from 'react'
import socketClient from 'socket.io-client'
import ForgetPassword from './Pages/ForgetPassword';
import EmailSent from './Pages/EmailSent';
import PasswordReset from './Pages/PasswordReset';



function App() {
  const token=localStorage.token
  const settoken=localStorage.settoken
  // const endpoint='http://localhost:5001'
  // const socket= useRef(socketClient(endpoint))
  return (
    <>
   {/* socket={socket}  */}
   <Routes>
     <Route path="/" element={<SignUp/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/forgotpassword" element={<ForgetPassword/>}/>
     <Route path="/sendemail" element={<EmailSent/>}/>
     <Route path="/message" element={token?<MessageingPage />:<Navigate to="/login"/>}/>
     <Route path="/home" element={token?<HomePage/>:<Navigate to="/login"/>}/>
     <Route path="/resetpassword" element={settoken?<PasswordReset/>:<Navigate to="/login"/>}/>
     
     <Route path="/profile/:id" element={token?<ProfilePage/>:<Navigate to="/login"/>}/>
     <Route path="/post" element={token?<PostPage/>:<Navigate to="/login"/>}/>
     {/* <Route path="/test" element={<Test/>}/> */}
    
   </Routes>
  {/* <Footer style={{position:"relative",bottom:"0px"}}className=""></Footer> */}
    </>
  );
}

export default App;
