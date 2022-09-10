import React,{useState} from 'react'
import {Routes,Route,Navigate,useNavigate,Link} from 'react-router-dom'
import pic from "../images/expressU.png"
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
function Login() {
    const navigate = useNavigate()
    const url='https://instagram-v-tk.herokuapp.com/login'
    // const url='http://localhost:5001/login'
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [status,setstatus] = useState("")
    const [message,setmessage] = useState("")
    const formik=useFormik({
      initialValues:{
          email:'',
          password:''
      },
      onSubmit:(values)=>{
            setmessage("load")
            console.log(values)
            axios.post(url,values).then((res)=>{  
                  if (res.data.status===true) { 
                      console.log(res)
                      setmessage(res.data.message)
                      localStorage.token=res.data.token
                      // navigate("/home")
                      window.location.href="/home"
                   
                  }
                    // localStorage.message=JSON.stringify([res.data.presentResult])
                    // if (res.data.status===true) {
                    //   navigate('/home')
                    //   setstatus(true)
                    // }
                    else{
                      setmessage(res.data.message)
                      setstatus(false)
                    }
                     
              
                  })
      }, 
      validationSchema:yup.object({
      email:yup.string().required('Required field').matches("[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,}$","not matching"),
      password:yup.string().required('Required field').min(4,'at least six character'),
      })
      })
  
  return (
   <>
  <section className="vh-100" style={{backgroundColor:"#9A616D"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img  src="https://media2.clevescene.com/clevescene/imager/u/original/36345264/image2.jpg"
                alt="login form" className="img-fluid h-100" style={{borderRadius: '1rem 0 0 1rem'}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                  <img className="w-25 w-sm-75 w-md-100 h-75 h-sm-75 h-md-75 rounded-circle"  src={pic} alt="" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <h5 className="fw-normal mb-3 text-center pb-3" style={{letterSpacing:"1px"}}>Sign into your     account</ h5>
                   {/* output message */}
                   {message==="load"? 
                  <div class="spinner-border text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                  </div>:<div class="text-primary fw-bold text-uppercase">{message}</div>}
                  <div className="form-floating mb-4">
                    <input type="email" id="floatingInput3" placeholder="Email Address" name="email" onBlur={formik.handleBlur}onChange={formik.handleChange}className="form-control form-control-lg" />
                    <label className="floatingInput3">Email Address {formik.touched.email?<span className="text-danger">{formik.errors.email}</span>:''}</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input type="password" id="floatingInput5" placeholder='Password' name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-lg"/>
                    <label className="floatingInput5">Password {formik.touched.password?<span className="text-danger">{formik.errors.password}</span>:''}</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block"  type="submit">Login</button>
                  </div>

                  <Link to="/forgotpassword" className="small text-muted text-decoration-none">Forgot password?</Link>
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? 
                  <Link to="/" style={{color: "#393f81",textDecoration:"none"}}> Register here</Link></p>
                  <a className="small text-muted">Terms of use.</a>
                  <a className="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
   </>
  )
}

export default Login