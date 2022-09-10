import React, { useState, useEffect, useRef } from 'react'
import Naver from './Naver'
import pic from "../images/expressU.png"
import { Slide, Button, Modal, Dropdown } from 'react-bootstrap'
import 'react-slideshow-image/dist/styles.css'
import Footer from './Footer'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, Link, useParams } from 'react-router-dom'
import FollowModal from './FollowModal'
function ProfilePage() {

  //variable to handle modal
  const values = ['md-down',];
  const [fullscreen, setFullscreen] = useState(true);
  const [fullscreen2, setFullscreen2] = useState(true);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  // const url = 'http://localhost:5001/presentUser'
  // const url3 = 'http://localhost:5001/allUsers'
  // const url2 = 'http://localhost:5001/allmessages'
  // const url1 = 'http://localhost:5001/update'
  // const url4 = 'http://localhost:5001/postImage'
  const url='https://instagram-v-tk.herokuapp.com/presentUser'
  const url3='https://instagram-v-tk.herokuapp.com/allUsers'
  const url2='https://instagram-v-tk.herokuapp.com/allmessages'
  const url1='https://instagram-v-tk.herokuapp.com/update'
  const url4='https://instagram-v-tk.herokuapp.com/postImage'
  const [myPosts, setmyPosts] = useState([])
  const [sent, setSent] = useState("0")
  const [message, setmessage] = useState([])
  const [allUsers, setallUsers] = useState([])
  const [posts, setposts] = useState(0)
  const [followers, setfollowers] = useState(0)
  const [following, setfollowing] = useState(0)
  const [result, setresult] = useState("")
  const navigate = useNavigate()
  const [followerNo, setfollowerNo] = useState(0)
  const [followingNo, setfollowingNo] = useState(0)
  const token = localStorage.token
  const myFile = useRef(null);
  const myImage = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const Email = useRef(null);
  const userName = useRef(null);
  var num;
  useEffect(() => {
    axios.get(url,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      }).then((res) => {
        if (res.data.status) {
          setmessage(res.data.userDetails)
          console.log(res.data)
          num = res.data.userDetails.followers.length
          setfollowerNo(num)
          setfollowingNo(res.data.userDetails.following.length)
          if (message.file !== "") {
            setresult(res.data.userDetails.file)
          }
          else {
            setresult("")
          }

        }
        else {
          console.log(res.data)
          localStorage.removeItem('token')
          navigate('/login')
        }
        console.log(res)
      })
    axios.get(url3).then((res) => {
      console.log(res)
      setallUsers(res.data.allUsers)
    })
    axios.get(url4).then((res) => {
      console.log(res)
      setmyPosts(res.data.allPosts)
    })
  }, [])
  //to handle modal
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  // to handle modal 2
  function handleShow2(breakpoint) {
    setFullscreen(breakpoint);
    setShow2(true);
    setSent("1")
  }
  function handleShow3(breakpoint) {
    setFullscreen(breakpoint);
    setShow2(true);
    setSent("2")
  }

  function imagePicker() {
    myFile.current.click()

  }
  const fileUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
      console.log(reader.result)
      setresult(result)
    }
    //  const result=reader.result
    //  console.log(result)
  }
  //to handle formik
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      bio: '',
      phone: '',
      gender: '',
      address: '',
      file: result,
    },

    onSubmit: (values) => {
      console.log(result)
      formik.values.file = result;
      formik.values._id = message._id;
      var d = new Date();
      var yr = d.getFullYear();
      var mth = d.getMonth();
      var day = d.getDate();
      var hr = d.getHours()
      var min = d.getMinutes();
      var sec = d.getSeconds();
      formik.values.posterId = message._id;
      formik.values.email = message.email
      formik.values.postMessage = `${message.firstname} ${message.lastname} updated profile`
      formik.values.name = `${message.firstname} ${message.lastname}`
      formik.values.posterImage = result
      formik.values.date = `${day}-${mth + 1}-${yr}`
      formik.values.time = d;
      // formik.values.file=result;
      console.log(formik.values.file)
      if (formik.values.firstname === "") {
        formik.values.firstname = message.firstname
      }
      if (lastName.current.value === "") {
        formik.values.lastname = message.lastname
      }
      if (Email.current.value === "") {
        formik.values.email = message.email
      }
      if (userName.current.value === "") {
        formik.values.username = message.username
      }
      console.log(values)
      let check = formik.values.file.includes('https://res.cloudinary.com')
      console.log(check)
      if (check === false) {

        console.log(values)
        axios.post(url4, values).then((res) => {
          console.log(res.data)
        })
        axios.post(url1, values).then((res) => {
          console.log(res)
          console.log(values)
          // window.location.reload()
        })


        console.log(result)
      }
      else if (check === true) {
        console.log(formik.initialValues)
        console.log(formik.values)
        axios.post(url1, values).then((res) => {
          console.log(res)
          console.log(values)
          // window.location.reload()
        })
      }



    },

  })
  return (
    <>
      <Naver />
      <div style={{ backgroundColor: "rgb(240, 240, 240,0.4)" }} className="row">
        <hr style={{ height: "3px", backgroundColor: "rgb(180, 180, 180,0.9)" }}></hr>
        <div className="col-12 col-md-7 mx-auto">

          <div style={{ marginTop: "10px", height: "700px" }} className="">
            <div className="row ms-3">
              <div className="col-3 mx-auto col-md-3">
                <div style={{ backgroundColor: "lightgray", width: "100px", height: "100px" }} className="rounded-circle">
                  <span className=''>
                    <img style={{ width: "100px", height: "100px" }}
                      //  ref={myImage}
                      className={result === "" ? "d-none" : "d-block rounded-circle"}
                      src={
                        result !== "" ? result : ""}
                      alt="" />
                    <i style={{}} className={result !== "" ? "d-none" : "fa-solid text-light mt-1 fa-5x ms-3 rounded-circle fa-user"}></i>
                  </span>
                </div>
                {/* <img className="rounded-circle w-75 w-md-75 col-1"src={result} alt="" /> */}
              </div>
              <div className="col-9 col-md-8 ms-md-5">
                <span className="mt-2 row">


                  <span><span className='fs-3'>__{message.username}</span>
                    <span className=" w-50">
                      {values.map((v, idx) => (
                        <button
                          key={idx}
                          style={{ fontSize: "10px" }}
                          className='btn border ms-2 ms-md-3 w-sm-25 fw-bold'
                          onClick={() => handleShow(v)}>Edit profile
                        </button>
                      ))}

                      <i className="fa-solid ms-3 fa-gear"></i>
                    </span>
                  </span>

                </span>
                <span className="row mt-3">
                  <span>
                    <span> <span>{myPosts.filter(o => o.posterId === message._id).length}</span> <span>posts</span></span>
                    <span onClick={() => handleShow2()} className='ms-1 btn ms-md-5'>
                      <span>{followerNo}</span> <span>followers</span>
                    </span>
                    <span onClick={() => handleShow3()} className='ms-1 btn ms-md-5'>
                      <span>{followingNo}</span> <span>following</span>
                    </span>
                  </span>
                </span>
                <span className="row">
                  <span className='mt-3 fw-bold'>{message.firstname} {message.lastname}</span>
                  <span style={{ color: 'blue' }} className='text-uppercase'>@{message.username}</span>
                </span>
              </div>
            </div>
            <div className="row col-12 mt-3 col-md-12 ms-2">
              <div className="col-4 col-md-2">
                <img className="rounded-circle w-50 w-md-75" src={pic} alt="Title" />
                <br />
                <span style={{ fontSize: "10px" }} className='ms-0 ms-md-1 fw-bold'>Highlights</span>

              </div>
              <hr style={{}} className=" mt-5 w-100"></hr>
            </div>
            <div className="container">
              <div className="row row-cols-1 row-cols-4">
                {
                  // myPosts.map((posts,index)=>(
                  myPosts.filter(o => o.posterId === message._id).map((posts, index) => (
                    <div key={index} className="col">
                      <img style={{ width: "100%", height: "100%" }} className="" src={posts.file} alt="" /></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* Modal body to edit */}
        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <button className='btn' type="submit"><i className="fa-solid fa-2x text-success fa-check"></i></button>
              <Modal.Title ><span className=" ms-5">Edit Profile</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div className="row text-dark">
                <div className="col-5 mx-auto">
                  <div style={{ backgroundColor: "lightgray", width: "100px", height: "100px" }} className="rounded-circle">
                    <span>
                      <img style={{ width: "100px", height: "100px" }}
                        ref={myImage}
                        className={"rounded-circle "}
                        src={
                          result !== "" ? result : ``}
                        alt="" />
                      <i className={myImage.current !== "" ? "d-none" : "fa-solid text-light fa-5x ms-3 mt-1 rounded-circle fa-user"}></i></span>
                    <input type="file" ref={myFile} onChange={(e) => fileUpload(e)} placeholder='hey' name="file" className="" id="" hidden />
                    <i style={{}} onClick=
                      {() => imagePicker()} className="fa-solid text-primary float-end fa-image"></i>
                  </div>
                </div>
              </div>
              <div className="row mt-3">

                {/* output message */}
                {/* <div className="text-success">{message}</div> */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    {/* Edit inputs */}
                    <div className="form-floating">
                      <input type="text" id="floatingInput" placeholder='First Name'
                        name="firstname"
                        ref={firstName}
                        className="form-control border-0 rounded-0 border-primary border-bottom"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <label className="floatingInput" >{message.firstname}</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input onChange={formik.handleChange} type="text"
                        placeholder="last name" id="floatingInput2"
                        name="lastname"
                        ref={lastName}
                        className="form-control  border-0 rounded-0 border-primary border-bottom" />
                      <label className="floatingInput2">{message.lastname}</label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-4">
                  <input onChange={formik.handleChange} type="text" id="floatingInput3"
                    placeholder="Username"
                    name="username"
                    ref={userName}
                    className="form-control form-control-lg border-0 rounded-0 border-primary border-bottom" />
                  <label className="floatingInput3">{message.username}</label>
                </div>
                <div className="form-floating mb-4">
                  <textarea id="floatingInput5"
                    placeholder='Bio'
                    name="bio"
                    onChange={formik.handleChange}
                    className="form-control form-control-lg border-0 rounded-0 border-primary border-bottom" />
                  <label className="floatingInput5">{message.bio ? message.bio : "Bio"}</label>
                </div>
                <div className="row w-100">
                  <h2>Personal Information Settings</h2>
                  <div className="form-floating mb-4">
                    <input onChange={formik.handleChange} type="text" id="floatingInput3"
                      placeholder="Email"
                      name="email"
                      ref={Email}
                      className="form-control form-control-lg border-0 rounded-0 border-primary border-bottom" />
                    <label className="floatingInput3">{message.email}</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input onChange={formik.handleChange} type="text" id="floatingInput3"
                      placeholder="Phone"
                      name="phone"
                      className="form-control form-control-lg border-0 rounded-0 border-primary border-bottom" />
                    <label className="floatingInput3">{message.phone ? message.phone : "Phone"}</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input onChange={formik.handleChange} type="text" id="floatingInput3"
                      placeholder="Address"
                      name="address"
                      className="form-control form-control-lg border-0 rounded-0 border-primary border-bottom" />
                    <label className="floatingInput3">{message.address ? message.address : "Address"}</label>
                  </div>
                  {/* <div className="form-floating mb-4">
                    <input onChange={formik.handleChange} type="text" id="floatingInput3"
                     placeholder="Password" 
                     name="password"
                     className="form-control form-control-lg border-0 rounded-0 border-primary border-bottom" />
                    <label className="floatingInput3">Password</label>
                  </div> */}
                  <h5>Gender</h5>
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    {<input type="radio" className="btn-check"
                      name="gender"
                      id="btnradio1"
                      value='Female'
                      onChange={formik.handleChange}
                      autoComplete="off"
                      checked={message.gender==="Female"?true:false}
                    //  checked={ true} checked
                     /> }
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Female</label>

                    <input type="radio"
                      className="btn-check"
                      name="gender" id="btnradio2"
                      onChange={formik.handleChange}
                      autoComplete="off"
                      value='Male'
                      checked={message.gender==="Male"? true:false} />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Male</label>
                  </div>

                </div>

              </div>

            </Modal.Body>
          </form>
        </Modal>
        <FollowModal handleShow2={handleShow2} allUsers={allUsers} setShow2={setShow2} show2={show2} presentUser={message} fullscreen2={fullscreen2} allPosts={[]} sent={sent} />
      </div>
    </>
  )
}

export default ProfilePage