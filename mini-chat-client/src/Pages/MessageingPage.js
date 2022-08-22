import React,{useState,useEffect,useRef} from 'react'
import Naver from './Naver'
import pic from "../images/expressU.png"
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

function MessageingPage({}) {
  
   
  const [allUsers, setallUsers] = useState([])
  const [presentUser, setpresentUser] = useState([])
  const [messagePerson, setmessagePerson] = useState('')
  const [recieveIndex, setrecieveIndex] = useState()
  const [response, setresponse] = useState("")
  const [allmessages, setallmessages] = useState([])
  const [sendMessaged, setsendMessaged] = useState(null)
  const [receiveMessage, setreceiveMessage] = useState(null)
  const navigate=useNavigate()
  const token=localStorage.token
  const url='http://localhost:5001/allUsers'
  const url2='http://localhost:5001/presentUser'
  const url3='http://localhost:5001/allmessages'
  const messageUrl='http://localhost:5001/messages'
  const endpoint='http://localhost:8800'
  const socket= useRef()
  const [OnlineUsers, setOnlineUsers] = useState([])

//   const url='https://instagram-v-tk.herokuapp.com/allUsers'
//   const url2='https://instagram-v-tk.herokuapp.com/presentUser'
//   const url3='https://instagram-v-tk.herokuapp.com/allmessages'
//   const messageUrl='https://instagram-v-tk.herokuapp.com/messages'
  const landPage = useRef(null)
  const messageTab = useRef(null)
  const likeIcon = useRef(null)
  const sendBtn = useRef(null)
  const messageToSend = useRef(null)
  const direct = useRef(null)
  const general = useRef(null)
  const heading = useRef(null)
  const message = useRef(null)
  
//   const firs = useRef(null)
// socket.current.on('receiveMessage',(result)=>{
//     console.log(result)
//     setallChats([...allChats,result])
//     setchat(message)
// })
// const sendMessage=()=>{
//     socket.current.emit("sendMessage",message)
//     // console.log(message)
  
// }

  useEffect(() => {
    if (sendMessaged!==null) {
        socket.current.emit('send-message',sendMessaged)
    }
  }, [sendMessaged])
  useEffect(() => {
                socket.current= io(endpoint)
                axios.get(url2,
                    {
                    headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            }).then((res)=>{
                    if (res.data.status) {
                        setpresentUser(res.data.userDetails)
                        socket.current.emit("new-user-add",res.data.userDetails._id)
                        socket.current.on('get-users',(users)=>{
                          setOnlineUsers(users);
                        })
                        // console.log(res.data)
                    }
                    else{
                        localStorage.removeItem('token')
                        navigate('/login')
                    }
                if(window.innerWidth>700)
                {
                    direct.current.className="d-block col-12  p-3 col-md-4 p-3"
                    general.current.className="col-12 col-md-4 d-block d-md-block"
                    heading.current.className="d-none d-md-block"
                    message.current.className="col-8 d-none d-md-block"
                }
                })
                axios.get(url).then((res)=>{
                    // console.log(res)
                    setallUsers(res.data.allUsers)
                  })
                  axios.get(messageUrl).then((res)=>{
                    // console.log(res.data)
                    setallmessages(res.data.result)

                  })
   },[response,allmessages])
    
 useEffect(() => {
   
    socket.current.on('receive-message', (data)=>{
         
         console.log(data)
        setreceiveMessage(data)
        console.log('here')
    })
  }, [])
  
 useEffect(() => {
     console.log('hey')
    if (receiveMessage!==null) {
        console.log('datareceived', receiveMessage)
        var ind=allmessages.findIndex(o => o.senderId===presentUser._id && o.receiverId===messagePerson||o.receiverId===presentUser._id && o.senderId===messagePerson)
        console.log(ind)
        // setallmessages([...allmessages[ind].messageDetails,receiveMessage])
        allmessages[ind].messageDetails.push(receiveMessage)
        setallmessages(allmessages)
        console.log(allmessages)
        setresponse(receiveMessage.message)
        console.log(receiveMessage.message)
        console.log(allmessages)
         
        // socket.current.emit('send-message',sendMessaged)
    }
  }, [receiveMessage])
  



   
   
   const showMessageTab=(a)=>{
    alert(a)
    landPage.current.style.display='none'
    messageTab.current.style.display='block'
  
    if(window.innerWidth<700){
        direct.current.className="d-none"
        general.current.className="d-none"
        heading.current.className="d-block"
        message.current.className="d-block"
        
        
    }
  
    setmessagePerson(a)
    var index = allUsers.findIndex(user => user._id === a);
    setrecieveIndex(index)
   
   }
   const goBack=()=>{
    if(window.innerWidth<700){
        direct.current.className="d-block"
        general.current.className="d-block"
        heading.current.className="col-8 d-none d-md-block"
        message.current.className="d-none"
        
        
    }
    
   }
   const showSendBtn=()=>{
    likeIcon.current.style.display='none'
    sendBtn.current.style.display='block'
   }

//    send message onClick handler
    const sendIt=()=>{
        likeIcon.current.style.display='block'
        sendBtn.current.style.display='none'
        var sender=presentUser._id
        var messageSent=messageToSend.current.value;
        var d = new Date();
        var yr=d.getFullYear();
        var mth=d.getMonth();
        var day=d.getDate();
        var hr=d.getHours()
        var min=d.getMinutes();
        var sec=d.getSeconds();
        var date=`${day}-${mth+1}-${yr}`
        var time=`${hr}:${min}:${sec}`
        var detailsArray={
            sender,
            messagePerson,
            messageSent,
            date,
            time
        }
      

        console.log(detailsArray)
        axios.post(url3,detailsArray).then((res)=>{
            if(res.data.status){
                messageToSend.current.value="";
                setresponse(res.data.message)
                console.log(res.data.message)
            }
            else{
                setresponse(res.data.message)
                console.log(res.data.message) 
            }
            
        })
        setsendMessaged({...detailsArray,})
        
    }
  return (
  <>
 <Naver/>
  <div className="vh-100  row" style={{backgroundColor:"rgb(240, 240, 240,0.4)"}}>
   <div style={{backgroundColor:"white",border:"2px solid rgb(180, 180, 180,0.2)"}}className="col-11 h-100 mx-auto mt-4 ">
    <div style={{height:"50px"}} className="row border-bottom">
        <div ref={direct} style={{borderRight:"2px solid rgb(180, 180, 180,0.2)"}} className="col-12  p-3 col-md-4 p-3">
         <div className="row mx-auto  ">
            <div className="col-10 text-center fw-bold">
                Direct
            </div>
            <div className="col-1 fw-bold ms-4">
            <i className="fa-regular fa-1.5x fa-pen-to-square"></i>
            </div>
         </div>
        </div>
        <div ref={heading}style={{}} className="col-8 d-none d-md-block">
        <i onClick={()=>goBack()} class="fa-solid fa-arrow-left d-block d-md-none float-start mt-3"></i>
        {/* h */}
        </div>
    </div>
    <div style={{height:"92%"}} className="row mt-1">
        <div ref={general} style={{borderRight:"2px solid rgb(180, 180, 180,0.2)",}} className="col-12 col-md-4 d-block d-md-block">
            <div style={{borderBottom:"2px solid rgb(180, 180, 180,0.2)",}} className="row justify-content-center text-center vh-50 pt-1 fw-bold">
            <span className='mt-4 mt-md-2'>General</span> 
            </div>
            <div className="row" >
            <div style={{backgroundColor:"",}} className="row mt-3 ">
            {allUsers.filter(o=>o._id!==presentUser._id).map((users,index)=>(
                <div key={index}  style={{height:"45px", width:"400px"}} className="row mt-4 text-dark">
                <div className="col-4">
                    <img  
                        style={{width:"50px",height:"50px",cursor: "default"}}
                        //  ref={myImage}
                        className={users.file===""?"d-none":"d-block rounded-circle"}
                        src={
                            users.file!==""?users.file:""}
                        alt="" 
                    />
                    <i style={{color:"gray"}} className={users.file!==""?"d-none":"fa-solid  mt-1 fa-2x  ms-3 rounded-circle fa-user"}></i>
                </div>
                <span className="col-8 ">
                <span  style={{cursor: "default"}} onClick={()=>showMessageTab(users._id)} className='mt-5'>{users.firstname} {users.lastname}</span><br/>
                <small style={{color:"gray",cursor: "default"}}>Followed by <small style={{cursor: "default"}}>. 2d</small></small>
                </span>
                </div>
            ))} 
            </div>
            </div>
        </div>
        <div ref={message}style={{height:"100%"}} className="col-8 d-none d-md-block">
            <div ref={landPage} className="row h-75 ">
                <div 
                     className="row mx-auto justify-content-center text-center align-items-center my-auto">
                        <div className='text-center rounded-circle'
                          style={{ width:"100px",height:"100px",border:"1px solid black"}} >
                           <i style={{color:"grey"}} className="fa-solid mt-3 me-2 rounded-circle fa-4x fa-border-padding fa-paper-plane"></i>  
                        </div>
                        <div>
                            <span className='text-dark fs-5 fw-bold'>Your Messages</span>
                            <br />
                            <span>Send private photos and messages to a friend or group.</span>
                            <br />
                            <span>Click on any friend to start messaging</span>
                            <br />
                            <span className="text-primary">Send message</span>
                        </div>

                </div>
            

            </div>
               {/* message tab */}
               <div ref={messageTab} style={{position:"relative",display:"none",height:"100%",overflow:"scroll"}} className="row ">
                <div 
                     className="row mx-auto justify-content-center text-center align-items-center my-auto">
                    {/* <div className="justify-content-center text-center align-items-center mx-auto"> */}
                    <div  className="col-7 h-75 mx-auto justify-content-center align-items-center mt-5 my-auto">
                    {
                     allUsers.filter(o => o._id===messagePerson).map((user,index)=>(
                        <div  key={index}className='row mx-auto justify-content-center text-center align-items-center my-auto'> 
                        
                            <div className={user.file!==""?"d-none":'text-center rounded-circle'} 
                            style={{width:"100px",height:"100px",border:"1px solid black"}} >
                             <i style={{color:"gray"}} 
                             className={user.file!==""?"d-none":"fa-solid  mt-3 fa-4x rounded-circle text-center fa-user"}></i>
                             </div>
                            <img  
                            style={{cursor: "default"}}
                            //  ref={myImage}
                            className={
                                user.file===""?
                                "d-none":
                                "d-block text-center w-25 w-md-100 mx-auto justify-content-center align-items-center rounded-circle"}
                            src={
                                user.file!==""?user.file:""}
                            alt="" 
                                />
                                <span className='fw-bold mt-3'>{user.firstname} {user.lastname}</span>
                                <br />
                                <span  className='fw-bold'>{user.username}</span>
                                <Link to="/profile"> 
                                <button className='btn btn-primary fw-bold vh-50 '><small>Edit profile</small></button>
                                </Link>
                           
                     </div>
                    ))
                    }
                   
              

                </div>
                 <div  className=''>
                    {
                    allmessages.filter(o => o.senderId===presentUser._id && o.receiverId===messagePerson||o.receiverId===presentUser._id && o.senderId===messagePerson).map((messages,index)=>(
                         messages.messageDetails.map((message,i)=>(
                            <div key={i} className='mt-5'>
                         {messages.messageDetails[i].id===presentUser._id?
                            <div style={{justifyContent:"flex-end",display:" flex",flexDirection: "row"}}>
                                <div className='w-25 border ps-2 pe-2 border-dark rounded'>
                                    <small className='float-start text-success'>{presentUser.username}</small>
                                    <br />
                                    <span className='float-start'>
                                        {message.message}
                                    </span><br/>
                                    <small className='float-end text-dark'>{message.timeSent}</small>
                                </div>
                            </div>:
                             messages.messageDetails[i].id!==presentUser._id?
                                <div
                                style={{justifyContent:"flex-start",display:" flex",flexDirection: "row"}}>
                                    <div
                                    className='w-25 border ps-2 pe-2 border-dark rounded'>
                                        <small className='float-start text-warning'>{allUsers[recieveIndex].username}</small>
                                        <br />
                                        <span className='float-start'>
                                            {message.message}
                                        </span><br />
                                        <small className='float-end text-dark'>{message.timeSent}</small>
                                    </div>
                                </div>:
                                  ""
                        } 
                       
                        </div>
                         )) 
                     
                       

                    ))
                    }
 
                  </div>
                </div>
                <div style={{position:"sticky",bottom:"0px",height:"50px",backgroundColor:"white",marginTop:"40%"}} 
                     className='w-100  row border border-dark ms-1 rounded-pill'>
                        <div className="row my-auto">
                            <div className="col-1">
                            <span><i className="fa-regular fa-2x fa-face-smile"></i></span>
                            </div>
                            <div className="col-9">
                                <textarea ref={messageToSend}type="text"onClick={()=>showSendBtn()} placeholder='message...' className='form-control  border-0 w-100' rows="1" />
                            </div>
                            <div className="col-2">
                            <span ref={likeIcon}>
                                <i className="fa-regular fa-2x fa-image ms-1"></i>
                                <i className="fa-regular fa-2x fa-heart ms-4"></i>
                                
                            </span>
                            <span style={{display:"none"}} ref={sendBtn}>
                                <button onClick={()=>sendIt()}  className='btn text-primary'>send</button>
                            </span>
                            </div>
                        </div>
                </div>

            </div>
          
        </div>
    </div>
   </div>
  </div>
  </>
  )
}

export default MessageingPage