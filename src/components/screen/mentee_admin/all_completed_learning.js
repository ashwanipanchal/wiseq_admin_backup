import React from 'react'
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import moment from "moment"
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../../services/Config';
import { Rating } from 'react-simple-star-rating'
import Modal from 'react-bootstrap/Modal';

function All_Completed_Learning() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [completedLearning, setcompletedLearning] = useState([])
    const [rating1, setRating1] = useState(0)
    const [feedbackText1, setfeedbackText1] = useState("")
    const [rateID, setRateID] = useState("")
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const handleRating1 = (rate) => {
      setRating1(rate)
      // other logic
  }
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

    
    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => {
        setShowHello1(false)
    };
    const showModal1 = () => setShowHello1(true);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
            // console.log(getWindowSize())
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        getAllCompletedLearning()
    },[])

    const getAllCompletedLearning = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentee-learnings/completed`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("all completed list", response)
        if(response.success){
          setcompletedLearning(response.data)
        }
    }
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const submitRating = async() => {
      const btoken = `Bearer ${token}`;
      const body = {
          "menteeFeedback": feedbackText1,
          "menteeRating": rating1
        }
        console.log(body)
        // return
      const res = await fetch(`${BASE_URL}mentee-learnings/${rateID}/feedback`, {
          method: 'PUT',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
          body:JSON.stringify(body)
      })
      const response = await res.json()
      console.log("learning rating Status", response)
      if(response.success){
        alert("Rating has been sent successfully")
        closeModal1()
        getAllCompletedLearning()
      }
    }

  return (
    <div className="main-content">
      <div
        style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
        className="contents expanded"
      >
        <div className="demo5 mt-30 mb-25">
          <div className="container-fluid">
            <div className="row">


              {/* Completed List */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                        All Completed Learning {" "}
                        </h4>
                      </div>
                    </div>

                    {/* <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/all_completed_learning")
                      }}
                      class="view_all text-center"
                    >
                      View All
                    </div> */}
                  </div>
                </div>
              </div>
              {completedLearning && completedLearning.map((user) => (
              // {data.map((user) => (
                <div class="col-lg-4 col-sm-12 col-md-12 mb-25">
                  <div class="blog-card blog-card--2 box_shadow1">
                    <div class="blog-card__thumbnail">
                      {/* <a href="#"> */}
                      <div 
                      style={{
                        padding:"0px 13px 0px 13px",
                        height: "27px",
                        borderRadius:"20px",
                        backgroundColor:"#0006",
                        color: "#fff",
                        margin:"8px",
                        position: "absolute",
                        bottom: "80%",
                        zIndex: "999",
                        lineHeight: "26px",
                    }}
                    >
                      {capitalizeFirstLetter(user.learning?.category)}
                    </div>
                      <img src={user.learning?.learningImg} />
                      {/* </a> */}
                    </div>
                    <div class="user-group px-25 pt-25 pb-20 radius-xl">
                      <div class="user-group-people">
                        <p class="">Key Skills</p>
                        <ul class="d-flex flex-wrap mb-10 user-group-people__parent">
                          {user.learning?.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-emlpoy me-10">{i}</span>
                                        ))}
                          
                          {/* <span class="badge badge-square btn-outline-emlpoy me-10">MySQL</span> */}
                          </ul>
                          <p class="color-dark fs-14 fw-600 mb-0">{user.learning?.learningName}</p>
                          <p class="mb-0 fs-12">Source: <span class="color-dark fs-12 fw-400">{user.learning?.sourceName}</span></p>
                          <p class="mb-0 fs-12">Assigned by: <span class="color-dark fs-12 fw-400">{user.learning?.creator?.name}</span></p>
                          <p class="mb-0 fs-12">Finish by: <span class="color-dark fs-12 fw-400">{moment(user.learning?.finishBy).format("DD MMMM YYYY")}</span></p>
                          <span class="badge badge-round btn-sky mt-10">{user.menteeRating}<i class="lar la-star user_star"></i></span>

                          <div style={{display:'flex',justifyContent:'space-between'}}>
                            <div>
                                      <p class="text-capitalize fw-700 mb-0">Growth Score:</p>
                                      <span class="badge badge-square btn-outline-emlpoy me-10 mb-10">{user.learning?.growthScore}</span>
                            </div>
                                        {/* <button type="button" className="btn btn-light-petrol btn-default btn-squared ment_btn">Resume</button> */}
                                    </div>
                                    <div className="layout-button">
                                        <button onClick={() =>navigate("/learning_profile_detail", {state:{data:user, hint: "done"}})} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">View</button>
                                        {user.menteeRating == 0 &&
                                            <button  type="button" onClick={() => {
                                              showModal1()
                                              setRateID(user.learningId)
                                            }} className="btn btn-primary btn-default btn-squared flex-grow-1 ment_btn">Rate</button>
                                        }
                                    </div>
                          </div>
                          </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Side_Bar
        onClick={toggle}
        sideBarOpen={
          windowSize.innerWidth > 768 && sideBarOpen
            ? true
            : windowSize.innerWidth > 768 && !sideBarOpen
            ? false
            : windowSize.innerWidth < 768 && sideBarOpen
            ? false
            : true
        }
      />

<Modal show={showHello1} onHide={closeModal1}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Rate this Learning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 class="text-capitalize fw-600 mb-20">
                Rate this learning on usefulness and context
              </h5>
              <Rating
                onClick={handleRating1}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
            </div>

            <h6 class="text-capitalize fw-600 mb-10 mt-25">
              Share your feedback on the learning ?
            </h6>
            <textarea
              value={feedbackText1}
              onChange={(e) => setfeedbackText1(e.target.value)}
              class="form-control ip-gray radius-xs b-deep px-15"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder=""
            ></textarea>

            <center>
              <button
                type="button"
                onClick={() => submitRating()}
                className="btn btn-light-petrol btn-squared color-primary px-15 mt-20"
              >
                Submit
              </button>
            </center>
          </Modal.Body>
        </Modal>

    </div>

    
  )
}

export default All_Completed_Learning