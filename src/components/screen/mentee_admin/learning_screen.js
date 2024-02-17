import React from 'react'
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import moment from "moment"
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { BASE_URL, BASE_URL_APPLSURE } from '../../../services/Config';
import { Rating } from 'react-simple-star-rating'
const data = [
  { id: 1, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
  { id: 2, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
  { id: 3, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
  // { id: 4, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
  // { id: 5, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
  // { id: 6, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
];

const Learning_Screen = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [inprogressLearning, setinprogressLearning] = useState([])
    const [toStartLearning, settoStartLearning] = useState([])
    const [completedLearning, setcompletedLearning] = useState([])
    const [mentorList, setMentorList] = useState([])
    const [rating1, setRating1] = useState(0)
    const [skillList, setSkillList] = useState([])
    const [selectedMentor, setSelectedMentor] = useState("")
    const [selectedSkill, setSelectedSkill] = useState("")
    const [feedbackText, setfeedbackText] = useState("")
    const [feedbackText1, setfeedbackText1] = useState("")
    const [menteeId, setMenteeId] = useState("")
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

    const getMyMentor = async() => {
      const btoken = `Bearer ${token}`;
      const res = await fetch(`${BASE_URL}mentee/my-mentors`, {
          method: 'GET',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
      })
      const response = await res.json()
      console.log("mentor list", response)
      setMentorList(response.data)
  }

  const getMentorSkill = async (id) => {
    const btoken = `Bearer ${token}`; 
    const res = await fetch(`${BASE_URL}organisation-admins/${id}/mentor-mentee-profile`,{
        method:'GET',
        headers:{
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        },
      })
      const response = await res.json()
      console.log(response.data.expertise)
      let temp = []
      let temp1 = []
      for(let i of response.data.expertise?.businessSkillsGoodAt){
        temp.push(i)
    }
      for(let i of response.data.expertise?.coreSkillsGoodAt){
        temp1.push(i)
    }
        const result = [...temp, ...temp1];
        console.log(result)
        setSkillList(result)

}

  const submitLearningRequest = async() => {
    const btoken = `Bearer ${token}`;
    const body = {
      "mentorId": selectedMentor,
      "skill": selectedSkill,
      // "skill": "ReactJS",
      "desciption": feedbackText
    }
    const res = await fetch(`${BASE_URL}mentee-learnings/request-learning`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
        },
        body:JSON.stringify(body)
    })
    const response = await res.json()
    console.log("learning request response", response)
    // setMentorList(response.data)
    if(response.success){
      alert("Learning request has been sent to mentor")
      closeModal()
    }
}

    
    const [showHello, setShowHello] = useState(false);
    const closeModal = () => {
        setShowHello(false)
    };
    const showModal = () => setShowHello(true);

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => {
        setShowHello1(false)
    };
    const showModal1 = () => setShowHello1(true);

    useEffect(() => {
      // getAllLearning()
      getAllLearningNew()
      getMyMentor()
    },[])

    const getAllLearning = async() => {
      const btoken = `Bearer ${token}`;
      const res = await fetch(`${BASE_URL}mentee-learnings`, {
          method: 'GET',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
      })
      const response = await res.json()
      console.log("larning list in mentee", response)
      if(response.success){
        setcompletedLearning(response.data?.completedLearnings)
        settoStartLearning(response.data?.toStartLearnings)
        setinprogressLearning(response.data?.pendingLearnings)
      }
  }

//   const getProfile = async() => {
//     const token = await localStorage.getItem("token")
//     const btoken = `Bearer ${token}`;

//           const res = await fetch(`${BASE_URL}mentee/profile`,{
//               method:'GET',
//               headers:{
//                 "Accept": "application/json",
//                 'Content-Type': 'application/json',
//                 "Authorization": btoken,
//               },
//             })
//             const response = await res.json()
//           console.log(response)
//           const {success} = response
//           if(success){
//             setMenteeId(response.data.id)
//             getAllLearningNew(response.data.id)
//           }
    
// }

    const getAllLearningNew = async() => {
      const btoken = `Bearer ${token}`;
      const body = {
        "mentee_id":localStorage.getItem("user_id")
    }
      const res = await fetch(`${BASE_URL_APPLSURE}mentee-learnings`, {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
          body:JSON.stringify(body)
      })
      const response = await res.json()
      console.log("lnew list of leanrinf", response)
      if(response.status){
        setcompletedLearning(response?.completedLearnings)
        settoStartLearning(response?.toStartLearnings)
        setinprogressLearning(response?.pendingLearnings)
      }
  }

  const makeAsBegin = async(learning) => {
    const btoken = `Bearer ${token}`;
    // const body = {
    //   status: "begin"
    // }
    const res = await fetch(`${BASE_URL}mentee-learnings/change-status/${learning.learningId}?status=begin`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
        },
        // body:JSON.stringify(body)
    })
    const response = await res.json()
    console.log("learning started Status", response)
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
    closeModal()
    navigate(-1)
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
              <div className="col-lg-12">
                <div className="breadcrumb-main user-member justify-content-sm-between">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Learnings
                      </h4>
                    </div>
                  </div>
                  <div className='layout-button'>
                      <h4 className="text-capitalize fw-500 breadcrumb-title mt-3 mr-3">
                      Want another learning?
                      </h4>
                    <button onClick={showModal} type="button" class="btn px-15 btn-light-petrol">Request Mentor</button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                        In Progress{" "}
                        </h4>
                      </div>
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/all_process_learning")
                        // setShowMoreR(!showMoreR);
                      }}
                      class="view_all text-center"
                    >
                      {/* {showMoreR ? "View Less" : "View All"} */}
                      View All
                    </div>
                  </div>
                </div>
              </div>
              {inprogressLearning && inprogressLearning.map((user) => (
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
                      {capitalizeFirstLetter(user?.category)}
                    </div>
                      <img src={user?.learning_img} />
                      {/* </a> */}
                    </div>                    <div class="user-group px-25 pt-25 pb-20 radius-xl">
                      <div class="user-group-people">
                        <p class="">Key Skills</p>
                        <ul class="d-flex flex-wrap mb-10 user-group-people__parent">
                        {user?.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-emlpoy me-10">{i}</span>
                                        ))}
                          {/* <span class="badge badge-square btn-outline-emlpoy me-10">{user.learning?.skills}</span> */}
                          {/* <span class="badge badge-square btn-outline-emlpoy me-10">MySQL</span> */}
                          </ul>
                          <p class="color-dark fs-14 fw-600 mb-0">{user?.learning_name}</p>
                          <p class="mb-0 fs-12">Source: <span class="color-dark fs-12 fw-400">{user?.sourceType}</span></p>
                          <p class="mb-0 fs-12">Assigned by: <span class="color-dark fs-12 fw-400">{capitalizeFirstLetter(user?.role == "super_admin" ? "Administrator": user?.role)} ({user?.name})</span></p>
                          {new Date(user?.finish_by)< new Date() ?
                            <p class="mb-0 fs-12">Finish by: <span style={{color:'red'}} class="fs-12 fw-400">{moment(user?.finish_by).format("DD MMMM YYYY")} (Overdue)</span></p>
                          :
                            <p class="mb-0 fs-12">Finish by: <span class="color-dark fs-12 fw-400">{moment(user?.finish_by).format("DD MMMM YYYY")}</span></p>
                          }


                          <div style={{display:'flex',justifyContent:'space-between'}}>
                            <div>
                                      <p class="text-capitalize fw-700 mb-0">Growth Score:</p>
                                      <span class="badge badge-square btn-outline-emlpoy me-10">{user?.growth_score}</span>
                            </div>
                                        <button  onClick={() =>navigate("/learning_profile_detail", {state:{data:user, hint: "progress"}})} type="button" className="btn btn-light-petrol btn-default btn-squared ment_btn">View</button>
                                    </div>
                          </div>
                          </div>
                  </div>
                </div>
              ))}

              {/* To Start List */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                        To Start{" "}
                        </h4>
                      </div>
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/all_toStart_learning")
                      }}
                      class="view_all text-center"
                    >
                      {/* {showMoreR ? "View Less" : "View All"} */}
                      View All
                    </div>
                  </div>
                </div>
              </div>
              {toStartLearning && toStartLearning.map((user) => (
              // {data.map((user) => (
                <div class="col-lg-4 col-sm-12 col-md-12 mb-25">
                  <div class="blog-card blog-card--2 box_shadow1">
                    
                    {/* <div 
                      style={{
                        padding:"0px 13px 0px 13px",
                        height: "34px",
                        borderRadius:"20px",
                        backgroundColor:"#000",
                        color: "#fff",
                        margin:"7px",
                        position: "absolute",
                        bottom: "67%",
                        zIndex: "999",
                        lineHeight: "34px",
                    }}
                    >
                      {user.learning?.category}
                    </div> */}
                    
                    <div class="blog-card__thumbnail">
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
                      {capitalizeFirstLetter(user?.category)}
                    </div>
                      {/* <a href="#"> */}
                      <img src={user?.learning_img} />
                      {/* </a> */}
                    </div>
                    <div class="user-group px-25 pt-25 pb-20 radius-xl">
                      <div class="user-group-people">
                        <p class="">Key Skills</p>
                        <ul class="d-flex flex-wrap mb-10 user-group-people__parent">
                          {user?.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-emlpoy me-10">{i}</span>
                                        ))}
                          {/* <span class="badge badge-square btn-outline-emlpoy me-10">{user.learning?.skills}</span> */}
                          {/* <span class="badge badge-square btn-outline-emlpoy me-10">MySQL</span> */}
                          </ul>
                          <p class="color-dark fs-14 fw-600 mb-0">{user?.learning_name}</p>
                          <p class="mb-0 fs-12">Source: <span class="color-dark fs-12 fw-400">{user?.source_name}</span></p>
                          <p class="mb-0 fs-12">Assigned by: <span class="color-dark fs-12 fw-400">{capitalizeFirstLetter(user?.role == "super_admin" ? "Administrator": user?.role)} ({user?.name})</span></p>
                          {new Date(user?.finish_by)< new Date() ?
                            <p class="mb-0 fs-12">Finish by: <span style={{color:'red'}} class="fs-12 fw-400">{moment(user?.finish_by).format("DD MMMM YYYY")} (Overdue)</span></p>
                          :
                            <p class="mb-0 fs-12">Finish by: <span class="color-dark fs-12 fw-400">{moment(user?.finish_by).format("DD MMMM YYYY")}</span></p>
                          }
                      


                          <div style={{display:'flex',justifyContent:'space-between'}}>
                            <div>
                                      <p class="text-capitalize fw-700 mb-0">Growth Score:</p>
                                      <span class="badge badge-square btn-outline-emlpoy me-10">{user?.growth_score}</span>
                            </div>
                                        <button type="button" 
                                        // onClick={() =>makeAsBegin(user)}
                                        onClick={() =>navigate("/learning_profile_detail", {state:{data:user, hint: "start"}})}
                                         className="btn btn-light-petrol btn-default btn-squared ment_btn">View</button>
                                    </div>
                          </div>
                          </div>
                  </div>
                </div>
              ))}


              {/* Completed List */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Completed{" "}
                        </h4>
                      </div>
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/all_completed_learning",{state:{type:"completed"}})
                      }}
                      class="view_all text-center"
                    >
                      {/* {showMoreR ? "View Less" : "View All"} */}
                      View All
                    </div>
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
                      {capitalizeFirstLetter(user?.category)}
                    </div>
                      <img src={user?.learning_img} />
                      {/* </a> */}
                    </div>
                    <div class="user-group px-25 pt-25 pb-20 radius-xl">
                      <div class="user-group-people">
                        <p class="">Key Skills</p>
                        <ul class="d-flex flex-wrap mb-10 user-group-people__parent">
                        {user?.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-emlpoy me-10">{i}</span>
                                        ))}
                          {/* <span class="badge badge-square btn-outline-emlpoy me-10">{user.learning?.skills}</span> */}
                          {/* <span class="badge badge-square btn-outline-emlpoy me-10">MySQL</span> */}
                          </ul>
                          <p class="color-dark fs-14 fw-600 mb-0">{user?.learning_name}</p>
                          <p class="mb-0 fs-12">Source: <span class="color-dark fs-12 fw-400">{user?.source_name}</span></p>
                          <p class="mb-0 fs-12">Assigned by: <span class="color-dark fs-12 fw-400">{capitalizeFirstLetter(user?.role == "super_admin" ? "Administrator": user?.role)} ({user?.name})</span></p>
                          {/* <p class="mb-0 fs-12">Finish by: <span class="color-dark fs-12 fw-400">{moment(user?.finish_by).subtract(1, "days").format("DD MMMM YYYY")}</span></p> */}
                          <p class="mb-0 fs-12">Finish by: <span class="color-dark fs-12 fw-400">{moment(user?.finish_by).format("DD MMMM YYYY")}</span></p>
                          <p class="mb-0 fs-12">Rating: <span className="badge badge-round btn-sky">{user.mentee_rating} <i className="lar la-star user_star"></i></span></p>


                          <div style={{display:'flex',justifyContent:'space-between'}}>
                            <div>
                                      <p class="text-capitalize fw-700 mb-0">Growth Score:</p>
                                      <span class="badge badge-square btn-outline-emlpoy me-10 mb-10">{user?.growth_score}</span>
                            </div>
                                        {/* <button type="button" className="btn btn-light-petrol btn-default btn-squared ment_btn">Resume</button> */}
                                    </div>
                                    <div className="layout-button">
                                        <button onClick={() =>navigate("/learning_profile_detail", {state:{data:user, hint: "done"}})} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">View</button>
                                        {user.mentee_rating == null || user.mentee_rating == 0 && (
                                          <button onClick={() => {
                                            showModal1()
                                            setRateID(user.learning_id)
                                          }}  type="button" className="btn btn-primary btn-default btn-squared flex-grow-1 ment_btn">Rate</button>
                                        )}
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

<Modal show={showHello} onHide={closeModal}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Request Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <div className="col-md-12 mb-25">
            <div className="countryOption">
              <select value={selectedMentor} onChange={(e) => {
                setSelectedMentor(e.target.value)
                getMentorSkill(e.target.value)
                }} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                <option value="">Select Mentor</option>
                {mentorList && mentorList.map((i) => (
                  <option value={i.id}>{i.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12 mb-25">
            <div className="countryOption">
              <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                <option value="">Select Skill</option>
                {skillList && skillList.map((i) => (
                  <option value={i.skill}>{i.skill}</option>
                ))}
              </select>
            </div>
          </div>

            <textarea
              value={feedbackText}
              onChange={(e) => setfeedbackText(e.target.value)}
              class="form-control ip-gray radius-xs b-deep px-15"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="What kind of learning would you like?"
            ></textarea>

            <center>
              <button
                type="button"
                onClick={() => submitLearningRequest()}
                className="btn btn-light-petrol btn-squared color-primary px-15 mt-20"
              >
                Submit
              </button>
            </center>
          </Modal.Body>
        </Modal>

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
  );
}

export default Learning_Screen