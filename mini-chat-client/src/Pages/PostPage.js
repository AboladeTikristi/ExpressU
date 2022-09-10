import React,{useState,useRef,useEffect} from 'react'
import Naver from './Naver'
import axios from 'axios'
import pic from "../images/expressU.png"
import { useFormik } from 'formik'
import {useNavigate,Link} from 'react-router-dom'
function PostPage() {
    const [message,setmessage] = useState([])
    const [result, setresult] = useState("")
    const token=localStorage.token
    const navigate=useNavigate()
    const [reply, setreply] = useState('')
    const myFile = useRef(null);
    const myImage = useRef(null);
    const [postImage, setpostImage] = useState("")
    // const url='http://localhost:5001/presentUser'
    // const postUrl='http://localhost:5001/postImage'
    const url='https://instagram-v-tk.herokuapp.com/presentUser'
    const postUrl='https://instagram-v-tk.herokuapp.com/postImage'
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
            if (res.data.userDetails.file!==""){
              setresult(res.data.userDetails.file)
            }
            else{
              setresult("")
            }
            
        }
        else{
         
            localStorage.removeItem('token')
            navigate('/login')
        }
         console.log(res)
    })
    
    },[])
    function imagePicker(){
        
        myFile.current.click()
        
      }
      const fileUpload=(e)=>{
        const file=e.target.files[0]
        console.log(file)
        const reader= new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
        const result=reader.result
        console.log(reader.result)
        setpostImage(result)}
    }
    const formik=useFormik({
        initialValues:{
            posterId:"",
            email:"",
            name:"",
            posterImage:message.file,
            date:"",
            time:'',
            postMessage:'',
            file:postImage,

        },
       
        onSubmit:(values)=>{
          var d = new Date();
          var yr=d.getFullYear();
          var mth=d.getMonth();
          var day=d.getDate();
          var hr=d.getHours()
          var min=d.getMinutes();
          var sec=d.getSeconds();
          formik.values.posterId=message._id;
          formik.values.email=message.email 
          formik.values.name=`${message.firstname} ${message.lastname}`
          formik.values.posterImage=message.file
          formik.values.date=`${day}-${mth+1}-${yr}`
          formik.values.time=d;
          formik.values.file=postImage;
          console.log(values)
         
            axios.post(postUrl,values).then((res)=>{
            console.log(res)
            
            setreply(res.data.message)
            setpostImage(res.data.image)
            alert(res.data.message)
           
            })
         

          
        },
      
      })
  return (
    <>
    <Naver/>
    <div className="vh-100 row" style={{backgroundColor:"rgb(240, 240, 240,0.4)",overflow:"auto"}}>
    <hr style={{height:"3px",backgroundColor:"rgb(180, 180, 180,0.9)"}}></hr>
        <div style={{backgroundColor:"white",border:"2px solid rgb(180, 180, 180,0.2)"}}className="col-11 mx-auto mt-4 vh-100">
            <span>{reply}</span>
        <div className="col-12 col-md-9 col-lg-6 mx-auto">
            <form action="" onSubmit={formik.handleSubmit}>
                            <div 
                              style={{backgroundColor:"lightgray",backgroundRepeat:"no-repeat", backgroundSize: "100% 100%",width:"100%",height:"500px",backgroundImage:`url(${postImage})`}}            className="container d-flex  aligns-items-center justify-content-center">
                              <span>
                              {/* <img style={{width:"100px",height:"100px"}}
                                ref={myImage}
                               className={"rounded-circle "}
                               src={``}
                               alt="" /> */}
                              {/* <i className={myImage.current==""?"fa-solid text-light fa-5x ms-3 mt-1 rounded-circle fa-user":"d-none"}></i> */}
                              </span>
                              <input  type="file"
                               ref={myFile} 
                               onChange={(e)=>fileUpload(e)} 
                               placeholder='hey' 
                               name="file"
                               className="" 
                               id="" hidden/>
                               
                                <span className='h-100 w-100 d-flex aligns-items-center justify-content-center '>
                                <i align="center"style={{marginTop:"29px!important"}} onClick=
                                    {()=>imagePicker()} 
                                    className="fa-solid text-primary fa-10x mx-auto my-auto fa-camera">
                                    <small class="fs-6">click me</small>
                                </i>
                                
                                </span>
                              
                            
                            </div>
                            <hr />
                           
                            {/* <div style={{backgroundColor:"lightgray",width:"100px",height:"100px"}}className="rounded-circle"> */}
                            <div className="row">
                            <div style={{backgroundColor:"",height:"300px",width:"100%"}} className="row "> 
                            <div  style={{height:"45px", width:"100%"}} className="row text-dark">
                            <div className="col-2 col-md-1">
                            <img  style={{width:"50px",height:"50px"}}
                              //  ref={myImage}
                               className={result===""?"d-none":"d-block rounded-circle"}
                               src={
                                 result!==""?result:""}
                               alt=""  />
                                <i style={{color:"gray"}} className={result!==""?"d-none":"fa-solid  mt-1 fa-2x  ms-3 rounded-circle fa-user"}></i>
                            </div>
                            <span className="col-10 col-md-10 ms-0 ms-md-2 ">
                                <div className="row">
                                    <div className="col-2 col-md-2"> 
                                        <small>{message.username}</small>
                                    </div>
                                    <div className=" col-8 col-md-9">
                            
                                    <textArea rows="1" type="text"
                                    name="postMessage"
                                    onChange={formik.handleChange}
                                    className="form-control w-100"
                                    />
                                    </div>
                                    <div className="col-1">
                                    <button type="submit"className="btn  border">post</button>
                                    </div>
                                </div>
                            </span>
                           
                            </div>
                            
                            </div>
                            </div>
                              
             </form>            
        </div>
        </div>
    </div>
    </>
  )
}

export default PostPage