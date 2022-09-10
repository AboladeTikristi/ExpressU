import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
function FollowModal({ show2, setShow2, show3, setShow3, show4, setShow4, fullscreen3, fullscreen2, presentUser, allUsers, sent, allPosts, index }) {
  const followID = useRef({})
  const follow = (index) => {
  }
  return (
    <> {
      sent === "1" ? <Modal
        show={show2}
        // fullscreen={fullscreen2} 
        onHide={() => setShow2(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {
              allUsers.filter(o => o._id === presentUser._id).map((users, index) => (
                //   user.followers.includes(user.followers.find(el=>el.email===presentUser.email))?
                users.followers.map((user, i) => (
                  <div key={index} style={{ height: "45px", width: "400px" }} className="row  mt-3 text-dark">
                    {/* <img  style={{height:"40px", width:"65px"}}className="rounded-circle col-1"src={user.file} alt="" /> */}
                    <span className="col-8 ">
                      <span className='mt-5'>{user.firstname} {user.lastname}</span><br />
                      <input type="text" value={user.id} name="" id="" hidden />
                      <small style={{ color: "gray" }}>Followed by <small>{user.followers.length}</small></small>
                    </span>
                    <span ref={ref => {
                      followID.current[index] = ref;
                    }} onClick={() => follow(index)} style={{ color: "#0099ff" }} id={user._id} className='col-1'>
                      {
                        allUsers.filter(o => o._id === user.id).map((follow, index) => (
                          follow.followers.includes(follow.followers.find(el => el.email === presentUser.email)) ?

                            <b>Following</b>
                            :
                            <b> Follow</b>
                        ))}
                    </span>
                  </div>))
                // :""

              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
        :
        sent === "2" ?
          <Modal
            show={show2}
            // fullscreen={fullscreen2} 
            onHide={() => setShow2(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Following</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {
                  allUsers.filter(o => o._id === presentUser._id).map((users, index) => (
                    //   user.followers.includes(user.followers.find(el=>el.email===presentUser.email))?
                    users.following.map((user, i) => (
                      <div key={index} style={{ height: "45px", width: "400px" }} className="row  mt-3 text-dark">
                        {/* <img  style={{height:"40px", width:"65px"}}className="rounded-circle col-1"src={user.file} alt="" /> */}
                        <span className="col-8 ">
                          <span className='mt-5'>{user.firstname} {user.lastname}</span><br />
                          <input type="text" value={user.id} name="" id="" hidden />
                          <small style={{ color: "gray" }}>Followed by <small>{user.followers.length}</small></small>
                        </span>
                        <span ref={ref => {
                          followID.current[index] = ref;
                        }} onClick={() => follow(index)} style={{ color: "#0099ff" }} id={user._id} className='col-1'>

                          <b> Unfollow</b>

                        </span>
                      </div>))
                    // :""

                  ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="primary">Understood</Button> */}
            </Modal.Footer>
          </Modal>
          :
          ""
    }

      {/* modal for showing likes */}
      <Modal
        show={show3}
        // fullscreen={fullscreen2} 
        onHide={() => setShow3(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="row"style={{ overflow: "scroll",}} >
            {
              allPosts.filter(o => o._id === index).map((post, index) => (
                //   user.followers.includes(user.followers.find(el=>el.email===presentUser.email))?
                post.likes.map((likes, i) => (
                  <div key={index} style={{ height: "45px", width: "400px" }} className="row mt-5 bg-light h-50 w-100 p-3 text-dark">
                      <span>{
                        allUsers.filter(o => o._id === likes.likerId).map((user, index) => (
                          <div key={index} style={{ height: "60px", width: "100%" }} className="row w-100  text-dark">
                            <img
                              style={{ width: "65px", height: "45px", cursor: "default" }}
                              className={user.file === "" ? "d-none" : "d-block rounded-circle col-2 col-md-2"}
                              src={
                                user.file !== "" ? user.file : ""}
                              alt=""
                            />
                            <i style={{ color: "gray" }} className={user.file !== "" ? "d-none" : "fa-solid  mt-1 fa-2x  ms-3 rounded-circle fa-user col-2 col-md-2"}></i>
                            <span className="col-7 col-md-9">
                              <span className='float-end'>{user.firstname} {user.lastname}</span><br />
                              <input type="text" value={user.id} name="" id="" hidden />
                            </span>
                          </div>

                        ))}</span><br />
                      <input type="text" value={likes.like} name="" id="" hidden />
                  
                   
                  </div>))

              ))}
          </div>
        </Modal.Body>
      </Modal>


      {/* modal for showing comments */}
      <Modal
        show={show4}
        // fullscreen={fullscreen2} 
        onHide={() => setShow4(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className=''>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="row" style={{ overflow: "scroll", }}
          >
            {
              allPosts.filter(o => o._id === index).map((post, index) => (
                post.comments.map((comments, i) => (
                  <div key={index} style={{ height: "45px", width: "400px" }} className="row bg-light p-3 h-50 w-100 mt-5 text-dark">

                    <span>{
                      allUsers.filter(o => o._id === comments.commenterId).map((user, index) => (
                        <div key={index} style={{ height: "60px", width: "100%", }} className="row w-100   text-dark">
                          <img
                            style={{ width: "65px", height: "45px", cursor: "default" }}
                            className={user.file === "" ? "d-none" : "d-block rounded-circle col-2 col-md-2"}
                            src={
                              user.file !== "" ? user.file : ""}
                            alt=""
                          />
                          <i style={{ color: "gray" }} className={user.file !== "" ? "d-none" : "fa-solid  mt-1 fa-2x  ms-3 rounded-circle fa-user col-2 col-md-2"}></i>
                          <span className="col-7 col-md-9">
                            <input type="text" value={user.id} name="" id="" hidden />
                            <span>{comments.comment}</span><br />
                            <span className='float-end'>{user.firstname} {user.lastname}</span>
                          </span>
                        </div>

                      ))}
                    </span>
                    <br />
                    <input type="text" value={comments.like} name="" id="" hidden />

                  </div>))

              ))}
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default FollowModal