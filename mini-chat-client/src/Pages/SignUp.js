import React,{ useState } from 'react'
import {Routes,Route,Navigate,useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import pic from "../images/expressU.png"

function SignUp() {
   const navigate = useNavigate()
  //  const url='http://localhost:5001/signup'
   const url='https://instagram-v-tk.herokuapp.com/signup'
    const [message, setmessage] = useState("")
    const [status, setstatus] = useState("")
    const formik=useFormik({
      initialValues:{
          firstname:'',
          lastname:'',
          username:'',
          email:'',
          password:'',
          file:'',
          gallery:[],
          follow:false,
          following:[],
          followers:[],


      },
      onSubmit:(values)=>{
            setmessage("load")
            console.log(values)
            axios.post(url,values).then((res)=>{
                    console.log(res)
                    setmessage(res.data.message)
                    setstatus(true)
                    if (res.data.status===true) {
                       setstatus(true)
                       navigate('/login')
                    }
                    else{
                      setstatus(false)
                    }
                  })
      },
      validationSchema:yup.object({
      firstname:yup.string().required(' required').matches("[a-zA-Z]{3,30}",'not matching'),
      lastname:yup.string().required('Required').matches("[a-zA-Z]{3,30}","not matching"),
      email:yup.string().required('Required').matches("[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,}$","not matching"),
      username:yup.string().required('Required').matches("[a-zA-Z0-9]{1,15}","not matching"),
      password:yup.string().required('Required').min(6,'at least six character'),
      })
      })
  return (
   <>
  <section className=" container-fluid vh-100 " style={{backgroundColor:"#9A616D",}}>
  <div className="container h-100">
    <div align="center" className="row d-flex  justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="w-100" style={{borderRadius: "1rem"}}>
          <div className="row align-items-center justify-content-center g-0">
            {/* image place close to Input */}
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" className="img-fluid rounded-circle h-100" style={{borderRadius: '1rem 0 0 1rem'}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center ">
              <div className="card-body p-lg-5 text-black ">
                {/* input form */}
                <form onSubmit={formik.handleSubmit} className="w-75">
                  {/* logo */}
                  <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                  <img className="w-25 w-sm-75 w-md-100 h-75 h-sm-75 h-md-75 rounded-circle"  src={pic} alt="" />
                    <span className="h1 fw-bold mb-0"></span>
                  </div>

                  <h5 className="mb-3 pb-3" style={{letterSpacing: "1px"}}> Create your Account</h5> 
                  {/* //output message */}
                  {message==="load"? 
                  <div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                 </div>:<div class="text-white fw-bold text-uppercase">{message}</div>}
                  <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input type="text" id="floatingInput" placeholder='First Name' name="firstname" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" value={formik.values.firstname} />
                      <label className="floatingInput" >First name {formik.touched.firstname?<span class="text-danger">{formik.errors.firstname}</span>:''}</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input type="text" placeholder="last name" id="floatingInput2" name="lastname" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
                      <label className="floatingInput2">Last name {formik.touched.lastname?<span class="text-danger">{formik.errors.lastname}</span>:''}</label>
                    </div>
                  </div>
                 </div>
                  <div className="form-floating mb-4">
                    <input type="email" id="floatingInput3" placeholder="Email Address" name="email" onBlur={formik.handleBlur}onChange={formik.handleChange}className="form-control form-control-lg" />
                    <label className="floatingInput3">Email Address {formik.touched.email?<span class="text-danger">{formik.errors.email}</span>:''}</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input type="text" id="FloatingInput4"name="username"placeholder='Username' onBlur={formik.handleBlur} onChange={formik.handleChange}className="form-control form-control-lg"  />
                    <label className="floatingInput4">Username {formik.touched.username?<span class="text-danger">{formik.errors.username}</span>:''}</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input type="password" id="floatingInput5" placeholder='Password' name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-lg"/>
                    <label className="floatingInput5">Password {formik.touched.password?<span class="text-danger">{formik.errors.password}</span>:''}</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Sign Up</button>
                  </div>

                  
               </form>
                 <span className="mb-1  pb-lg-2" style={{color: "black"}}>Already have an account? 
                 <Link to="/login" style={{color: "#393f81",textDecoration:"none"}}> Login here</Link>
                  </span>
                    <p><a className=" text-decoration-none nav-link text-dark">Terms of use</a>
                    <a className="text-decoration-none text-dark">Privacy policy</a></p>
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

export default SignUp