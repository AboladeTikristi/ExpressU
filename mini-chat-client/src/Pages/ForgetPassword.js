import axios from 'axios'
import React,{useState} from 'react'
import pic from "../images/expressU.png"
import {Routes,Route,Navigate,useNavigate,Link} from 'react-router-dom'
import EmailSent from './EmailSent'
function ForgetPassword() {
    const url="https://instagram-v-tk.herokuapp.com/forgetPassword"
    // const url="http://localhost:5001/forgetPassword"
    const navigate=useNavigate()
    const [email, setemail] = useState('')
    const [message, setmessage] = useState('')
    const sendLink=()=>{
        axios.post(url,{email:email}).then((res)=>{
        if(!res.data.status){
          alert(res.data.message)
          
        }
        else{
            setmessage(res.data.message)
            setemail(res.data.email)
            navigate("/sendemail",{state:{email:email,token:res.data.message}})
        }
        })
       
    }
  return (
   <>
   <div className="container-fluid">
    <div className="row h-50">
    <div className="col-md-6 rounded shadow  mx-auto col-lg-5 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                        <img className="w-25 w-sm-75 w-md-75 h-75 h-sm-75 h-md-75 rounded-circle"  src={pic} alt="" />
                    </div>
                    <input className='form-control' placeholder='Input your email'onChange={(e)=>setemail(e.target.value)} type="text" />
                     <button className='btn btn-primary mx-auto w-100 text-center mt-5' onClick={()=>sendLink()}>Send Login link</button>
                     
                     <div className='text-center justify-content-center mx-auto align-items-center'>
                        or
                     </div>
                     <br />
                     <div className='text-center'>
                        <Link to='/' className='text-center text-decoration-none'>Create another account</Link>
                        </div>
                       <hr />
                    <div className='text-center'>
                            <Link to='/login' className='text-center text-decoration-none'>Back to login</Link>
                    </div>  
                  
                    </div>
                   
                   
        </div>
    </div>
   </div> 
   </>
  )
}

export default ForgetPassword