import React, {useState,useEffect} from 'react'
import pic from "../images/expressU.png"
import axios from 'axios'
import logOut from '../Components/LogOut';
import { Navbar,Container,Offcanvas,Nav,Dropdown,Form,FormControl,OverlayTrigger,Tooltip,Button,Image } from "react-bootstrap";
import {Routes,Route,Navigate,useNavigate,Link,useParams} from 'react-router-dom'
function Naver() {
  const{id}=useParams("")
  // const url='https://instagram-v-tk.herokuapp.com/presentUser'
  const url='http://localhost:5001/presentUser'
  const [message,setmessage] = useState([])
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
  },[])
  return (
    
    <>
    <Navbar style={{backgroundColor:"white"}}  expand="lg" className="mb-3 text-dark">
      <Container fluid> 
      <Navbar.Toggle placement='start' aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Brand style={{fontFamily:"Lucida Bright!important",color:"pink"}} className="col-3 text-center mt-3 ms-5" >ExpressU</Navbar.Brand>
      
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="start"
          style={{width:"120px"}}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
            <img className='w-50 rounded-circle' src={pic} alt="" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="col-9 flex-grow-5">
          
              <div className="">
                <Form className="d-none justify-content-center d-md-flex align-items-center">
                        <FormControl
                          style={{fontFamily:'Arial, FontAwesome',color:"lightgrey",backgroundColor:"lightgray"}}
                          type="search"
                          placeholder="&#61442;Search"
                          className="me-2 mt-3 w-75 h-50 mr-sm-2"
                          aria-label="Search"
                        />
                      </Form>
              </div>
            
              <div style={{}} className= 'ms-0 ms-md-5 w-50 col-5 ps-0 ps-md-5'>
                <ul style={{}} className="navbar-nav justify-content-center ms-0 ms-md-5 ps-0 ps-md-5align-items-center mt-2">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-1">home</Tooltip>}
                   >
                    <Nav.Link className='ms-2'>
                      <Link to="/home"><i className="fa-solid fa-house"></i> <span className="sr-only">(current)</span></Link> 
                    </Nav.Link> 
                  </OverlayTrigger>


                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-1">message</Tooltip>}
                  >
                    <Nav.Link className='ms-2'>
                      <Link className='' to="/message"><i className="fa-solid fa-paper-plane"></i></Link>
                    </Nav.Link> 
                  </OverlayTrigger>


                  <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-1">post</Tooltip>}
                  >
                    <Nav.Link  className='ms-2'>
                      <Link className='' to="/post"><i className="fa-regular fa-square-plus"></i></Link>
                    </Nav.Link> 
                  </OverlayTrigger>


                  {/* <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip  contentStyle={{color:"red!important",backgroundColor:'pink'}}id="button-tooltip-1">like</Tooltip>}
                  >
                    <Nav.Link className='ms-2'>
                      <i className="fa-regular fa-heart"></i>
                    </Nav.Link>
                  </OverlayTrigger> */}


                  {/* <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-1">profile</Tooltip>}
                  > */}
                    <Dropdown>
                      <Dropdown.Toggle bsPrefix="p-0" style={{}} variant="link"  className='shadow-none mt-2' id="dropdown-basic"
                     >
                      
                      <i className="fa-solid text-dark text-decoration-none fa-circle mt-1 ms-2"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu> 
                       
                        <Dropdown.Item >
                          <Nav.Link className=''>
                            <Link className='text-decoration-none text-dark' to={ message.username?"/profile/"+message.username:"/profile"}>
                            <i class="fa-solid fa-user"></i> Profile 
                            </Link>
                          </Nav.Link>
                        </Dropdown.Item>
                        
                        
                        <Dropdown.Item href="#/action-2"><i className="fa-solid fa-gear"></i> Settings</Dropdown.Item>
                        <Dropdown.Item onClick={logOut}><i class="fa-solid fa-right-from-bracket"></i> logOut</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                     
                   
                  {/* </OverlayTrigger> */}
                </ul>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

</>

  )
}

export default Naver