import axios from 'axios'
import React,{useState,useRef,useEffect} from 'react'
import pic from "../images/expressU.png"
import {Routes,Route,Navigate,useNavigate,Link,useLocation} from 'react-router-dom'
function EmailSent() {
    const navigate=useNavigate()
    const location=useLocation()
    const [email, setemail] = useState('')
    const [token, settoken] = useState('')
    const [secs, setsecs] = useState(0)
    const tokenInput = useRef(null)
    const time=10
    var sec=0
    useEffect(() => {
        
        setemail(location.state.email)
       
        while (sec <= time){
            sec++
            console.log(sec)
            localStorage.settoken=location.state.token;
            settoken(location.state.token)
         };
    }, [])
    const submit=()=>{
        if(tokenInput.current.value===localStorage.settoken){
            navigate("/resetpassword",{state:{email:email}})
        }
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
                      <div className='text-center'>
                        <span>Great! Email Sent</span>
                        <br />
                        <span>A code to reset your password has been sent to you on {email}</span>
                        <form action="">
                        <input className='form-control mt-2' ref={tokenInput} placeholder="00-00-00"type="number" required />
                        <button onClick={()=>submit()} type="submit" className='btn form-control btn-primary'>Submit Token</button>
                        </form>
                        <div>No token in your mail? <span className='text-primary'>Resend token</span></div>
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

export default EmailSent