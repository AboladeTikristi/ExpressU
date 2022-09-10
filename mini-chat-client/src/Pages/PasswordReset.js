import axios from 'axios'
import React,{useState,useEffect} from 'react'
import pic from "../images/expressU.png"
import {Routes,Route,Navigate,useNavigate,Link,useLocation} from 'react-router-dom'
function PasswordReset() {
    // const url="http://localhost:5001/resetPassword"
    const url='https://instagram-v-tk.herokuapp.com/resetPassword'
    const navigate=useNavigate()
    const location=useLocation()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [passwordclone, setpasswordclone] = useState('')
    useEffect(() => {
        if(!location.state){
           navigate('/login')
            
          localStorage.removeItem('settoken')
        }
        else{ 
        setemail(location.state.email)
        }
    }, [])
    
   
    const resetPassword=()=>{
        if(password!==passwordclone){
            alert("Your password don't match")
        }
        else{
        axios.post(url,{email:email,password:password}).then((res)=>{
        if(!res.data.status){
          alert(res.data.message)
          
        }
        else{
            alert(res.data.message)
            localStorage.removeItem('settoken')
            navigate("/login")
        }
        })
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
                    <form>
                    <span className='text-danger'>*</span>
                    <input className='form-control' placeholder='Input your password'onChange={(e)=>setpassword(e.target.value)} type="password" required />
                    <span className='text-danger'>*</span>
                    <input className='form-control mt-3' placeholder='Confrim your password'onChange={(e)=>setpasswordclone(e.target.value)} type="password" required/>
                     <button className='btn btn-primary mx-auto w-100 text-center mt-5' onClick={()=>resetPassword()}>Reset Password</button>
                     </form>
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

export default PasswordReset