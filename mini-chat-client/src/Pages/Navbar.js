import React from 'react'
import pic from "../images/expressU.png"
function Navbar() {
  return (
    <>
    <nav className="nav flex-column">
    <a className="nav-brand active">
        <img className="w-75 w-sm-75 w-md-100 h-75 h-sm-75 h-md-75"  src={pic} alt="" />
    </a>
    <a className="nav-link mt-5" >
    <i  style={{color:"pink"}}  data-toggle="tooltip" data-placement="right" title="Profile" className="fa-solid fa-user"></i>
    </a>
    <a className="nav-link mt-2">
    <i style={{color:"pink"}}  data-toggle="tooltip" data-placement="right" title="friends"className="fa-solid fa-users"></i>
    </a>
    <a className="nav-link mt-2">
    <i style={{color:"pink"}}  data-toggle="tooltip" data-placement="right" title="add friend" className="fa-solid fa-user-plus mask flex-center rgba-red-strong"></i>
    </a>
    <a className="nav-link mt-2">
    <i style={{color:"pink"}}  data-toggle="tooltip" data-placement="right" title="messages" className="fa-solid fa-list-ul"></i>
    </a>
    <a className="nav-link">
    <i style={{color:"pink"}}  data-toggle="tooltip" data-placement="right" title="status" className="fa-solid fa-mars-double"></i>
    </a>
    <a className="nav-link">
    <i style={{color:"pink"}}  data-toggle="tooltip" data-placement="right" title="log out" className="fa-solid fa-right-from-bracket ms-4 fixed-bottom "></i>
    </a>
   
    </nav>
    </>
  )
}

export default Navbar