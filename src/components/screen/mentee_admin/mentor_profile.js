import clock_img from '../../../img/arc.svg';
import checks_img from '../../../img/checks.svg';
import education_img from '../../../img/educationsss.svg';
import achievement_img from '../../../img/achiess.svg';
import suitcase_img from '../../../img/suitcasess.svg';
import profile_sessions from '../../../img/profile_sessions.svg';
import profile_mentees_mentored from '../../../img/profile_mentees_mentored.svg';
import profile_program_mentored from '../../../img/profile_program_mentored.svg';
import linkdin_img from '../../../img/linkdin.svg';
import website_img from '../../../img/website.svg';
import edit_img from '../../../img/progresss.svg';
import team_img from '../../../img/tm1.png';
import authornav_img from '../../../img/user_pic.png';
import loader from '../../../img/gifs/loaderanimation';
import Side_bar from './sidebar';
import path from '../../../img/Path.png';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  spaceBetween: 30,
  speed: 2000,
  autoplaySpeed: 2000,

  responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
};

const data = [
    { id: 1, mentoring_hours: "Matching Score", mentoring_num: "95%" },
    { id: 2, mentoring_hours: "Growth Credits", mentoring_num: "175" },
    { id: 3, mentoring_hours: "Sessions", mentoring_num: "25" },
    { id: 4, mentoring_hours: "Mentoring Programs", mentoring_num: "2" },
];

const data1 = [
    { id: 1, task_para: "MBA HR", task_date: "IIM Indore", year_date: "2014- 2016" },
    { id: 2, task_para: "BA Psychology", task_date: "Jai Hind College", year_date: "2011 - 2014" },
];

const data2 = [
    { id: 1, task_para: "Business Associate - Recruitment", task_date: "Chell Corp.", year_date: " July 2016 - July 2018" },
];

const data3 = [
    { id: 1, task_para: "Topped my MBA" },
    { id: 2, task_para: "Least Attrition rate of Talents I recruited" },
    { id: 3, task_para: "Bright Talent - HR 2021 " },
];

function Mentor_Profile() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const [isRequested, setisRequested] = useState(state.isRequested)
    const [requestedByMe, setrequestedByMe] = useState(state.requestedByMe)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [userData, setUserData] = useState({})
    const [testimonial, setTestimonial] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    useEffect(()=> {
        getProfile()
    },[])
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

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const getProfile = async() => {
        const btoken = `Bearer ${token}`;
        setIsLoading(true)
        const res = await fetch(`https://api.wiseqglobal.com/api/organisation-admins/${state.id}/mentor-mentee-profile`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
              })
              const response = await res.json()
              console.log("profileeeee", response)
              if(response.success){
                setIsLoading(false)
                setUserData(response.data)
            }
    }

    const testimonialSubmit = async() => {
        if(testimonial == ""){
            alert("Please Enter Something..")
            return
        }
        const body= {
            "message": testimonial
          }
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/users/${state.id}/write-testimonial`,{
                method:'PUT',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
                body: JSON.stringify(body)
              })
              const response = await res.json()
              console.log("testimonial submitsion", response)
              if(response.success){
                closeModal()
                getProfile()
              }
              
    }

    const sendRequest = async (id) => {
      console.log(id)
      const btoken = `Bearer ${token}`;
      const res = await fetch(`https://api.wiseqglobal.com/api/match-making/requests/${id}`, {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
      })
      const response = await res.json()
      //   console.log("send reqst respo", response)
      if (response.success) {
        // getProfile()
        setisRequested(true)
        setrequestedByMe(true)
      }
  }

  const acceptReqst = async (id) => {
    const btoken = `Bearer ${token}`;
    const body = {

        "status": "accepted"

    }
    const res = await fetch(`https://api.wiseqglobal.com/api/match-making/requests/${id}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
        },
        body: JSON.stringify(body)
    })
    const response = await res.json()
    console.log("send reqst respo", response)
    if (response.success) {
      getProfile()
    }

}
  const rejectReqst = async (id) => {
    const btoken = `Bearer ${token}`;
    const body = {

        "status": "rejected"

    }
    const res = await fetch(`https://api.wiseqglobal.com/api/match-making/requests/${id}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
        },
        body: JSON.stringify(body)
    })
    const response = await res.json()
    console.log("send reqst respo", response)
    if (response.success) {
      getProfile()
    }

}

    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded"
        >
          <div className="blog-page2">
            <div className="container-fluid">
              <div className="row">
                <div
                  style={{ display: "flex" }}
                  className="col-lg-12 col-sm-12 col-md-12 mb-25"
                >
                  <p
                    onClick={() => navigate(-1)}
                    style={{
                      marginRight: "10px",
                      color: "#7A7A7A",
                      fontWeight: "400",
                      lineHeight: "22px",
                      cursor: "pointer",
                    }}
                  >
                    Mentors
                  </p>
                  <img
                    style={{
                      marginRight: "10px",
                      width: "6px",
                      height: "13px",
                      marginTop: "6px",
                    }}
                    src={path}
                  />
                  <p
                    style={{
                      color: "#005B5B",
                      fontWeight: "400",
                      lineHeight: "22px",
                      cursor: "pointer",
                      marginTop: "2px",
                    }}
                  >
                    Profile
                  </p>
                </div>

                {isLoading ? (
                  <Lottie options={defaultOptions} height={100} width={100} />
                ) : (
                  <>

                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                  <div className="media user-group-media d-flex justify-content-between">
                    <div className="media-body d-flex align-items-center">
                      <img
                        src={
                          userData.imageUrl == ""
                            ? authornav_img
                            : userData.imageUrl
                        }
                        className="me-20 wh-70 rounded-circle bg-opacity-primary"
                      />
                      <div>
                        <h3 className="fw-600 mb-2">
                          {userData && userData.name}
                        </h3>
                        <p className="fs-13 color-light mb-0">
                          {userData && userData.jobTitle}
                        </p>
                      </div>
                    </div>
                    {userData && userData.isConnection ? 
                    <div class="layout-button">
                      <button
                        type="button"
                        onClick={() => showModal()}
                        className="btn btn-outline-light-petrol btn-squared color-primary px-15 mentee_btn"
                      >
                        Write a Testimonial
                      </button>
                        <button
                          type="button"
                          onClick={() =>navigate('/chat', { state: userData })}
                          className="btn btn-outline-light-petrol btn-squared color-primary px-15 mentee_btn"
                        >
                          Chat
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate("/calender", {state:state.id})}
                          className="btn btn-light-petrol btn-squared color-primary px-15 ment_btn"
                        >
                          Book a Session
                        </button>
                    </div> :
                    <div class="layout-button">
                      {!isRequested ?
                          <button onClick={() => sendRequest(state.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1">Connect</button>:
                          requestedByMe ?
                          <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                          <>
                                            <button onClick={() => acceptReqst(state.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1"> Accept </button>
                                            <button onClick={() => rejectReqst(state.id)} type="button" className="btn btn-no btn-default btn-squared flex-grow-1"> Reject </button>
                                            </>
                          // <button onClick={() => acceptReqst(state.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1"> Accept </button>
                      }
                  </div>}
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12">
                  <div className="row">
                    {/* {data.map((user) => ( */}
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-25">
                      <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                        <div className="overview-content w-100">
                          <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                            <div className="ap-po-details__titlebar">
                              <p>Matching Score</p>
                              <h2>{state.percentageMatch}</h2>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img src={clock_img} className="svg" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-25">
                      <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                        <div className="overview-content w-100">
                          <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                            <div className="ap-po-details__titlebar">
                              <p>Impact Score</p>
                              <h2>{userData && userData.impactScore}</h2>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img src={profile_sessions} className="svg" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-25">
                      <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                        <div className="overview-content w-100">
                          <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                            <div className="ap-po-details__titlebar">
                              <p>Programs Mentored </p>
                              <h2>{userData && userData.programMentored}</h2>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img
                                  src={profile_program_mentored}
                                  className="svg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-25">
                      <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                        <div className="overview-content w-100">
                          <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                            <div className="ap-po-details__titlebar">
                              <p>Mentees Mentored</p>
                              <h2>{userData && userData.menteesMentored}</h2>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img
                                  src={profile_mentees_mentored}
                                  className="svg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ))} */}
                  </div>
                </div>

                <h5 className="text-capitalize fw-600 mb-20">Overview</h5>
                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    About me
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.overview}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Years of experience
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.yearsOfExperience}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Years with the Company
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.yearsWithCompany}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Job Title
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.jobTitle}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Functional Area
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.functionalArea}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Email address
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.email}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <div className="svg-icon">
                    <img src={linkdin_img} onClick={() => {userData.linkedinProfileLink != null && window.open(`${userData.linkedinProfileLink}`, "_blank") }} className="svg me-30" />
                    <img src={website_img} onClick={() =>{userData.linkedinProfileLink != null && window.open(`${userData.websiteLink}`, "_blank") }} className="svg" />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Level of Employee
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.designationLevel}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Reporting Manager
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.reportingManagerName}
                  </p>
                </div>

                <h5 className="text-capitalize fw-500 mb-20">Skills</h5>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Business skills I can mentor in:
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {userData &&
                      userData.expertise?.businessSkillsGoodAt?.map((i) => (
                        <span className="badge badge-square btn-outline-orange me-10">
                          {i.skill}
                        </span>
                      ))}
                  </ul>
                </div>

                {/* <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Business skills I need to develop
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {userData &&
                      userData.expertise?.businessSkillsToDevelop?.map((i) => (
                        <span className="badge badge-square btn-outline-orange me-10">
                          {i.skill}
                        </span>
                      ))}
                  </ul>
                </div> */}

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Core skills I can mentor in:
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {userData &&
                      userData.expertise?.coreSkillsGoodAt?.map((i) => (
                        <span className="badge badge-square btn-outline-emlpoy me-10">
                          {i.skill}
                        </span>
                      ))}
                  </ul>
                </div>

                {/* <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Core skills I need to develop
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {userData &&
                      userData.expertise?.coreSkillsToDevelop?.map((i) => (
                        <span className="badge badge-square btn-outline-emlpoy me-10">
                          {i.skill}
                        </span>
                      ))}
                  </ul>
                </div> */}

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Aspirational Goals
                  </p>
                  <p className="color-dark fs-14 fw-300 align-center mb-0">{userData.expertise?.hasOwnProperty('aspirationalGoals') ? userData.expertise?.aspirationalGoals[0] : ""}</p>
                
                </div>

                <div className="col-lg-6 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                  Tools I can mentor in
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {userData &&
                      userData.expertise?.tools?.map((i) => (
                        <span className="badge badge-square btn-outline-dan me-10">
                          {i}
                        </span>
                      ))}
                  </ul>
                </div>

                <h5 className="text-capitalize fw-500 mb-20">Language</h5>

                {userData &&
                  userData.languages?.map((i) => (
                    <div className="row line">
                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-500 align-center mb-0">
                          Languages
                        </p>
                        <p className="color-dark fs-14 fw-600 align-center mb-0">
                          {i.language}
                        </p>
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-500 align-center mb-0">
                          Proficiency
                        </p>
                        <p className="color-dark fs-14 fw-600 align-center mb-0">
                          {i.proficiency}
                        </p>
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-500 align-center mb-0">
                          Read
                        </p>
                        {i.canRead && (
                          <div className="svg-icon">
                            <img src={checks_img} className="svg" />
                          </div>
                        )}
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-500 align-center mb-0">
                          Write
                        </p>
                        {i.canWrite && (
                          <div className="svg-icon">
                            <img src={checks_img} className="svg" />
                          </div>
                        )}
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-500 align-center mb-0">
                          Speak
                        </p>
                        {i.canSpeak && (
                          <div className="svg-icon">
                            <img src={checks_img} className="svg" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                <h5 className="text-capitalize fw-500 mb-20">Location</h5>

                <div className="col-md-6 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Work Location
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.workLocation}
                  </p>
                </div>

                <div className="col-md-6 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Division
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.division}
                  </p>
                </div>

                <div className="col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Country
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.country}
                  </p>
                </div>

                <h5 className="text-capitalize fw-500 mb-15">Education</h5>

                <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                  <div className="tab-content">
                    <div className="project-task table-responsive table-responsive--dynamic">
                      <table className="table table-borderless mb-1">
                        <tbody>
                          {userData &&
                            userData.education?.map((user) => (
                              <tr className="project-task-list">
                                <td>
                                  <div className="box_shadow1 p-15">
                                    <div className="event-Wrapper">
                                      <div className="event-Wrapper__left">
                                        <div className="event-wrapper-item">
                                          <img
                                            src={education_img}
                                            className="svg"
                                          />
                                        </div>
                                      </div>
                                      <div className="event-Wrapper__right">
                                        <h6 className="mb-1 fw-600">
                                          {user.degree}
                                        </h6>
                                        <span className="fs-14">
                                          {user.passingYear}
                                        </span>{" "}
                                        <span className="ms-4 fs-14">
                                          {user.collegeName}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <h5 className="text-capitalize fw-500 mb-15">Work History</h5>

                <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                  <div className="tab-content">
                    <div className="project-task table-responsive table-responsive--dynamic">
                      <table className="table table-borderless mb-1">
                        <tbody>
                          {userData &&
                            userData.workHistory?.map((user) => (
                              <tr className="project-task-list">
                                <td>
                                  <div className="box_shadow1 p-15">
                                    <div className="event-Wrapper">
                                      <div className="event-Wrapper__left">
                                        <div className="event-wrapper-item">
                                          <img
                                            src={suitcase_img}
                                            className="svg"
                                          />
                                        </div>
                                      </div>
                                      <div className="event-Wrapper__right">
                                        <h6 className="mb-1 fw-600">
                                          {user.jobRole}
                                        </h6>
                                        <span className="fs-14">
                                          {user.companyName}
                                        </span>{" "}
                                        <span className="ms-4 fs-14">
                                          {moment(user.startDate).format(
                                            "YYYY"
                                          )}
                                          -
                                          {user.isMyCurrentRole
                                            ? "Present"
                                            : moment(user.endDate).format(
                                                "YYYY"
                                              )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <h5 className="text-capitalize fw-500 mb-15">
                  Key Achievements
                </h5>

                <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                  <div className="tab-content">
                    <div className="project-task table-responsive table-responsive--dynamic">
                      <table className="table table-borderless mb-1">
                        <tbody>
                          {userData &&
                            userData.keyAchievements?.map((user) => (
                              <tr className="project-task-list">
                                <td>
                                  <div className="box_shadow1 p-15">
                                    <div className="event-Wrapper">
                                      <div className="event-Wrapper__left">
                                        <div className="event-wrapper-item">
                                          <img
                                            src={achievement_img}
                                            className="svg"
                                          />
                                        </div>
                                      </div>
                                      <div className="event-Wrapper__right">
                                        <h6 className="mb-1 fw-600">{user}</h6>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <h5 className="text-capitalize fw-500 mb-15">Preferences</h5>
                {userData &&
                  userData.preferences?.map((i, index) => (
                    <div className="col-lg-6 col-sm-12 col-md-12 mb-25">
                      <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                        <div className="card-header px-0 border-0">
                          <h6 className="color-dark fs-16 fw-600">
                            Q{index + 1}. {i.question}
                          </h6>
                        </div>
                        <div className="card-body p-0">
                          <div className="tab-content">
                            <div className="project-task table-responsive table-responsive--dynamic">
                              <table className="table table-borderless mb-1">
                                <tbody>
                                  {i.answers.map((user) => (
                                    <tr className="project-task-list">
                                      <td>
                                        <div className="notifi1">
                                          <div className="event-Wrapper">
                                            <div className="event-Wrapper__left">
                                              <div className="event-wrapper-item">
                                                {i.questionType ==
                                                "priority" ? (
                                                  <h6
                                                    style={{
                                                      backgroundColor:
                                                        "#D5ECEF",
                                                      padding: "25px",
                                                      borderRadius: 14,
                                                    }}
                                                  >
                                                    {user.priority}
                                                  </h6>
                                                ) : (
                                                  <img
                                                    src={edit_img}
                                                    className="svg"
                                                  />
                                                )}
                                                {/* <h6>{user.answer}</h6> */}
                                              </div>
                                            </div>
                                            <div className="event-Wrapper__right">
                                              <h6>{user.answer}</h6>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <h5 className="text-capitalize fw-500 mb-15">Testimonials</h5>
                <Slider {...settings}>
                {userData &&
                  userData.userTestimonials?.map((user) => (

                        <div className="swiper-slide">
                            <div className="testimonial-item bg-white1">
                                <div className="testimonial-main-content">
                                    <div className="testimonial-info">
                                        <div className="testimonial-info__caption">
                                            <p className="testimonial-info__designation1">"{user.message}" - {user.sender.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                {/* {userData && userData.userTestimonials?.map((i)=>(
                    <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                  <div className="card border-0 px-20 py-15  project-task-list--event box_shadow1 card_testi">
                    <div className="card-body p-0">
                      <p class="color-dark fs-14 fw-400 align-center mb-0 text-center">
                      "{i.message}" - {i.sender?.name}
                      </p>
                    </div>
                  </div>
                </div>
                ))}                                   */}
                </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Side_bar
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
            <Modal.Title>Write a testimonial</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                rows="5"
                placeholder="Write..."
              ></textarea>

              <div className="layout-button mt-15">
                <div className="btn_center">
                  <button
                  onClick={() => testimonialSubmit()}
                    type="button"
                    className="btn btn-light-petrol btn-default btn-squared"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default Mentor_Profile;
