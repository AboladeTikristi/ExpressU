import React,{useEffect,useState,useRef} from 'react'
import Naver from './Naver'
import pic from "../images/expressU.png"
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import Footer from './Footer'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import FollowModal from './FollowModal'
import {format} from 'timeago.js'

function HomePage() {

  const url='https://instagram-v-tk.herokuapp.com/presentUser'
  const url2='https://instagram-v-tk.herokuapp.com/allmessages'
  const url3= 'https://instagram-v-tk.herokuapp.com/follow'
  const url4='https://instagram-v-tk.herokuapp.com/allUsers'
  const url5='https://instagram-v-tk.herokuapp.com/postImage'
  const url6='https://instagram-v-tk.herokuapp.com/like'
  const url8='https://instagram-v-tk.herokuapp.com/unlike'
  const url7='https://instagram-v-tk.herokuapp.com/comment'
  // const url='http://localhost:5001/presentUser'
  // const url2='http://localhost:5001/allmessages'
  // const url3= 'http://localhost:5001/follow'
  // const url4='http://localhost:5001/allUsers'
  // const url5='http://localhost:5001/postImage'
  // const url6='http://localhost:5001/like'
  // const url8='http://localhost:5001/unlike'
  // const url7='http://localhost:5001/comment'

  // const [sent, setsent] = useState("")
  const [message,setmessage] = useState([])
  const [allUsers, setallUsers] = useState([])
  const [allPosts, setallPosts] = useState([])
  // const [fullscreen3, setFullscreen3] = useState(true);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const followID = useRef({})
  const likeID = useRef({})
  const commentsID = useRef({})
  const commentID = useRef({})
  // const shareID = useRef({})
  const commentText = useRef({})
  const navigate=useNavigate()
  const token=localStorage.token
    useEffect(() => {
        axios.get(url,
            {
            headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }).then((res)=>{
        if (res.data.status) {
            setmessage(res.data.userDetails)
            console.log(res.data)
        }
        else{
            localStorage.removeItem('token')
            navigate('/login')
        }
        
    })
    axios.get(url4).then((res)=>{
      console.log(res)
      setallUsers(res.data.allUsers)
    })
    axios.get(url5).then((res)=>{
      console.log(res)
      setallPosts(res.data.allPosts)
    })
    },[])
    
    const follow=(index)=>{
      console.log(followID.current[index].innerText)
      var followId=followID.current[index].id;
      axios.post(url3,
        {followid:followId,followersid:message._id,message:followID.current[index].innerText}).then((res)=>{
        if(res.data.status){
          axios.get(url4).then((result)=>{
            console.log(result)
        })
        }
        console.log(res)
      })
      // alert(followID.current)
    }
    const unfollow=(index)=>{
     if( followID.current[index].innerText==="Following"){
     followID.current[index].innerText="Unfollow"}
    }
    const followhoverLeave=(index)=>{
    //  console.log(followID.current[index])
     if( followID.current[index].innerText==="Unfollow"){
      followID.current[index].innerText="Following"
     }
    }
    const like=(index,i)=>{
      if(allPosts[index].likes.includes(allPosts[index].likes.find(el=>el.likerId===message._id)))
      {
        var likeId=likeID.current[index].id
        var likeDetails={
          postindex:index,
          sendId:i,
          likerId:message._id,
          likedId:likeId,
          like:true,
                    }
        axios.post(url8,likeDetails).then((res)=>{
        if(res.data.status){
            likeID.current[index].style.color="black"
        }
        else{
          alert("An error as occured please relike the post")
        }

      })
      }
      else{
      var likeId=likeID.current[index].id
      var likeDetails={
          sendId:i,
          likerId:message._id,
          likedId:likeId,
          like:true,
                    }
      axios.post(url6,likeDetails).then((res)=>{
        if(res.data.status){
            likeID.current[index].style.color="red"
        }
        else{
          alert("An error as occured please relike the post")
        }

      })
    }
      
    }
    const comments=(index)=>{
      setShow4(true);
    }
    const comment=(index,i)=>{
      if(commentText.current[index].value===""){
          alert("No comment typed yet")

      }
      else{
        var commentId=commentID.current[index].id
        alert(commentId)
        var commentDetails={
            sendId:i,
            commenterId:message._id,
            commentedId:commentId,
            comment:commentText.current[index].value,
                      }
        console.log(commentDetails)
        axios.post(url7,commentDetails).then((res)=>{
          if(res.data.status){
              commentText.current[index].value=""
          }
          else{
            alert("An error as occured please recomment the post")
          }
  
        })
      }
    }
    const share =(index)=>{

    }
    const showLikes=(index,breakpoint)=>{
      // setFullscreen3(breakpoint);
      setShow3(true);
    }
    // const sendIt=()=>{
    //   var sake=JSON.parse(localStorage.getItem("message"));
    //   var toSent={message:sent,from:sake}
    //   axios.post(url2,toSent).then((res)=>{
    //       console.log(res)

    //   })
    // }
  const properties = {
    duration:3000,
    slidesToShow:4,
    slidesToScroll:1,
    autoplay: false,
    indicators:true,
    responsive:[
      {
        breakpoint:500,
        settings:{
          slidesToShow:5,
          slidesToScroll:1,
        }
      },
      {
        breakpoint:500,
        settings:{
          slidesToShow:1,
          slidesToScroll:2,
        }
      }
    ]
  };

  return (
    <>
    <Naver/>
  <div className="vh-100 row mx-auto" style={{backgroundColor:"rgb(240, 240, 240,0.4)",overflow:"auto"}}>
    <hr style={{height:"3px",backgroundColor:"rgb(180, 180, 180,0.9)"}}></hr>
    <div style={{marginTop:"-16px",height:"800px!important",}} className="col-12 col-md-9 mx-auto vh-100">
      <div style={{marginTop:"40px"}}className='row mx-auto'>
       <div className="col-12 col-md-7">
        <div style={{backgroundColor:"white",border:"2px solid rgb(180, 180, 180,0.2)", height:"70px"}} className=" vh-25 card">
        <Slide 
        {...properties}> 
        {allPosts.map((post, index)=> (
          <div key={index} style={{
             textAlign:'left',
             padding: '0px 0',
             fontSize: '30%',
          }}
          className='mx-3 my-2'>
             
              <img style={{height:"50px",width:"53px",}}className="rounded-circle ms-5 ms-md-3 p-none"src={allPosts[index].file} alt="" />
              
             
         </div> ))}
        </Slide> 
        </div>
        <div style={{backgroundColor:"white",marginTop:"10px",border:"2px solid rgb(180, 180, 180,0.2)"}}className="card">
        {allPosts.map((post,index)=>(
          <div key={index} className='mt-5'>
          <div className="row m-1">
            <div className="col-2 col-md-1">
            <img  style={{height:"50px", width:"53px"}}
            className={
              allUsers&&allUsers[allUsers.findIndex(el=>el._id===post.posterId)].file===""?
              'd-none':'rounded-circle'
            }
            src={
              allUsers[allUsers.findIndex(el=>el._id===post.posterId)].file===""?"":
              allUsers[allUsers.findIndex(el=>el._id===post.posterId)].file
              } alt="" />
            <i
             className={allUsers[allUsers.findIndex(el=>el._id===post.posterId)].file==""?'fa-solid fa-user fa-border rounded-circle fa-2x':'d-none'}></i>
            </div>
            <div className="col-7 ms-2 ms-md-0 ps-2 ps-md-4 col-md-8">
              <span className="mt-5"><b>{post.name}</b></span><br />
              <span>{format(post.time)}</span> 
            </div>
            <div className="col-2 ps-5 col-md-3">
            <i className="fa-solid fa-ellipsis  float-end"></i>
            </div>
          </div>
          <div className="row">
           
            <img style={{height:"30rem", width:"50rem"}} className='mt-3'  src={post.file} alt="" />
           

            
          </div>
          <div className="row mt-3">
            <div className="col-6 col-md-4">
              <span>
                <i 
                  ref={ref => {
                    likeID.current[index] = ref;
                    }}
                    onClick={()=>like(index,post._id)}
                    id={post.posterId}
                    style={post.likes.includes(post.likes.find(el=>el.likerId===message._id))? {color:"red"}:{}}
                    className="fa-solid fa-1x fa-md-2x fa-heart ms-3"></i>
                <i 
                  ref={ref => {
                    commentsID.current[index] = ref;
                    }}
                    id={post.posterId}
                    onClick={()=>comments(index)}
                  className="fa-regular fa-1x fa-md-2x fa-comment ms-3"></i>
                <i
                  // ref={ref => {
                  //   shareID.current[index] = ref;
                  //   }}
                    id={post.posterId}
                    onClick={()=>share(index)}
                  className="fa-solid  fa-1x fa-md-2x  fa-paper-plane ms-3"></i>
                </span>
            </div>
            <div className="col-6 col-md-8">
            <i className="fa-regular  fa-1x fa-md-2x  me-3 float-end fa-bookmark"></i>
            </div>
          </div>
          <div className="row">
             <span style={{cursor:"pointer"}} className="ms-3 fs-6" 
               id={post.posterId}
               onClick={()=>showLikes(index)}>{post.likes.length} likes</span>
                 <FollowModal 
                  showLikes={()=>showLikes(index)}
                  allUsers={allUsers} 
                  allPosts={allPosts}
                  setShow3={setShow3} 
                  show3={show3} 
                  setShow4={setShow4} 
                  show4={show4} 
                  index={post._id}
                  
                  presentUser={message}
                  />
             <span><span className='ms-3 fw-bold'>{post.name}</span>  {post.postMessage}</span>
            
          </div>
          <div className="row">
          <div className="row my-auto">
                            <div className="col-10 ">
                                <textarea  
                                ref={ref => {
                                  commentText.current[index] = ref;
                                  }}type="text"placeholder='comment...' className='form-control shadow-none outline-none border-0 w-100' rows="1" />
                            </div>
                            <div className="col-2">
                            <span style={{display:"block"}}>
                                <button 
                                  ref={ref => {
                                    commentID.current[index] = ref;
                                    }}
                                    id={post.posterId}
                                    onClick={()=>comment(index,post._id)}
                                  className='btn shadow-none outline-none text-primary pe-5'>send</button>
                            </span>
                            </div>
                        </div>
          </div>
          </div>
            ))
          }
        </div>
      </div>
      {/* follow path */}
      <div className="col-12 col-md-5 ps-1 mt-5 mt-sm-0">
      <div style={{backgroundColor:"",height:"50px",width:"100%"}} className="row mx-auto w-100 "> 

           <div  style={{height:"45px", width:"400px"}} className="row text-dark w-100 ">
              <img  
              style={{width:"65px",height:"45px",cursor: "default"}}
              className={message.file===""?"d-none":"d-block rounded-circle col-2 col-md-1"}
              src={
                  message.file!==""?message.file:""}
              alt="" 
              />
              <i style={{color:"gray"}} className={message.file!==""?"d-none":"fa-solid  mt-1 fa-2x  ms-3 rounded-circle fa-user col-2 col-md-1"}></i>
              
              <span className="col-7 col-md-8 ">
              <span className='mt-5'>{message.firstname} {message.lastname}</span><br/>
              <small style={{color:"gray"}}>Followed by</small>
              </span>
              <span className="col-1 fw-bold btn" style={{color:"#0099ff"}}>
                <span>Switch</span>
              </span>
           </div>
           
      </div>
        <div style={{}} className="row mt-3 "> 
           <div  style={{height:"45px",}} className="row text-dark mx-auto w-100">
           <span className="col-9">
           <span style={{color:"gray"}} className='mt-5 ms-4'><b>Suggestions For You</b></span>
           </span>
           <span className='col-3 '>
             <b>See All</b>
          </span> 
           </div>
           
        </div>
        <div style={{backgroundColor:"",width:"300px"}} className="row mx-auto w-100 "> 
          {
          allUsers.filter(o => o._id!==message._id).map((user,index)=>(
            //   user.followers.includes(user.followers.find(el=>el.email===message.email))?
            // "":  
            <div key={index} style={{height:"45px", width:"400px"}} className="row w-100 mb-2 text-dark">
            <img  
              style={{width:"45px",height:"35px",cursor: "default"}}
              className={user.file===""?"d-none":"d-block rounded-circle  mt-1 ms-3 col-2 col-md-1"}
              src={
                  user.file!==""?user.file:""}
              alt="" 
          />
          <i style={{color:"gray",width:"45px",height:"35px",}} className={user.file!==""?"d-none":"fa-solid fa-2x  mt-1   ms-3 rounded-circle fa-user col-2 col-md-1"}></i>
              <span className="col-7 col-md-8">
                <span className='mt-5'>{user.firstname} {user.lastname}</span><br/>
                <input  type="text" value={user.id}name="" id="" hidden/>
                <small style={{color:"gray"}}>Followed by <small>{user.followers.length}</small></small>
              </span>
            <span ref={ref => {
                followID.current[index] = ref;
                }}
                onClick={()=>follow(index)}
                style={{color:"#0099ff"}} 
                onMouseLeave={()=>followhoverLeave(index)} 
                onMouseOver={()=>unfollow(index)} 
                id={user._id} 
                className='col-2 col-md-1 btn text-danger fw-bold'>
                  {
                    user.followers.includes(user.followers.find(el=>el.email===message.email))?<b className='text-danger'>Following </b>  :<b style={{color:"#0099ff"}} className=''>Follow</b> 
                    
                    }
            </span> 
            </div>
          
          ))}
          
           
        </div>
      </div>
    </div>
    </div>
    
    </div>
  
    </>
  )
}

export default HomePage