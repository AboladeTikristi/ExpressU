// import React, {useState,useEffect} from 'react'
// import Navbar from './Navbar'
// import pic from "../images/expressU.png"
// import axios from 'axios'

// function MessagePage() {
//     const url='http://localhost:5001/allUser'
//     // const url2='http://localhost:5001/allmessages'
//     const [sent, setsent] = useState("")
//     const [message,setmessage] = useState([])
//     if(message.length===0){
//     axios.post(url).then((res)=>{
//         setmessage(res.data.allUsers)
        
//       })}
//       const sendIt=()=>{
//         var sake=JSON.parse(localStorage.getItem("message"));
//         var toSent={message:sent,from:sake}
//         axios.post(url2,toSent).then((res)=>{
//             console.log(res)

//         })
//       }
     
//   return (
//     <>
//     {message==""?console.log("here"):console.log(message[1].email)}
//     <div  style={{width:"100%"}}className="row w-100 vh-100">
//         <div  style={{backgroundColor:"black"}} className="col-2 col-sm-2 col-md-1 vh-100">
//         <Navbar/>
//         </div>
//         <div   className="col-4 col-sm-4 col-md-4">
//             <div className="row">
//                 <div className=" d-none d-md-block col-md-3 col-0 col-sm-0 pt-2 text-danger">
//                     Messages
//                 </div>
//                 <div className="col-12 col-md-9 col-sm-12 w-md-75 btn-group">
//                     <input type="text" className="form-control w-100 w-sm-75 bg-transparent border-1" placeholder="search contacts" />
//                     <button style={{width:"15px!important"}}className="form-control w-25 btn">
//                         <i className="fa fa-solid fa-search"></i></button>
//                 </div>
//             </div>
//             <div className="row bg-light">
//                <div className="row h-50 ">
//                 <span className="btn-group bg-white">
//                   {message.map((user,index)=>(
//                           <span key={index}><img className="rounded-circle w-25"src={pic} alt="" />
//                           <small>{user.firstname}</small></span>
//                   ))
//                   }
//                   </span>
//                 </div>
                
//                 {message.map((user,index)=>(
//                 <div key={index}className="w-100 row text-dark"> 
           
//                 <small><i style={{color:"green", width:"2px!important"}} className="fa fa-solid fa-circle"></i></small>
//                 <img className="rounded-circle col-3 w-25"src={pic} alt="" />
//                 <div className="col-9">
//                 <small className='float-end'>time</small><br/>
//                 <span className='mt-5'>{user.firstname}</span>
//                 </div> 
//                 </div>
//                 ))}
                
           
//             </div>

//         </div>
//         <div  width="75%"style={{backgroundColor:"lightgrey",width:"100!important%"}} className="col-6 col-sm-6 col-md-7 vh-100">
//             <div  style={{height:"40px", backgroundColor:"pink"}}className="row wh-100">
//               <span>
//               <img style={{width:"40px",height:"40px"}} className="rounded-circle col-3"src={pic} alt="" />
//                <span className='ms-1'>fff</span>
//               </span>
//             </div>
//             <div className="row">
//             <div className=" position-fixed bottom-0 row w-md-40">
//                 <div className="col-6">
//                 <textarea  style={{marginLeft:"-11px"}} name="" onChange={(e)=>setsent(e.target.value)}  className="border-0 w-100 form-control" id="" cols="10" rows="1">
//                 </textarea>
//                 </div>
//             <div  style={{marginLeft:"-12px"}}className="col-3">
//                 <button style={{width:"10px!important", backgroundColor:"pink"}}className='btn' onClick={()=>sendIt()}>send</button>
//                 <button style={{width:"10px!important", backgroundColor:"pink"}}className='btn'><i className="fa-solid fa-paperclip"></i></button>
//             </div>
//             </div>
//             </div>
            
        

//     </div>
//     </div>
//     </>
//   )
// }

// export default MessagePage