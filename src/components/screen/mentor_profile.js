import clock_img from '../../img/growth.svg';
import checks_img from '../../img/checks.svg';
import education_img from '../../img/educations.svg';
import mentor_program from '../../img/mentor_program.svg';
import mentor_mentored from '../../img/mentor_mentored.svg';
import success_msg from '../../img/success_msg.svg';
import achievement_img from '../../img/achie.svg';
import suitcase_img from '../../img/suitcase.svg';
import linkdin_img from '../../img/linkdin.svg';
import website_img from '../../img/website.svg';
import path from "../../img/Path.png";
import team_img from '../../img/tm1.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_APPLSURE } from '../../services/Config';
import authornav_img from '../../img/user_pic.png';
import moment from 'moment';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
    { id: 1, mentoring_hours: "Impact Score", mentoring_num: "241" , image:clock_img},
    { id: 2, mentoring_hours: "Programs Mentored", mentoring_num: "2" , image:mentor_program},
    { id: 3, mentoring_hours: "Mentees Mentored", mentoring_num: "41" , image:mentor_mentored},
];

const data1 = [
    { id: 1, task_para: "Bachelor of Commerce", task_date: "Delhi University", year_date: "2003- 2006" },
    { id: 2, task_para: "MBA", task_date: "XLRI", year_date: "2006 - 2008" },
];

const data2 = [
    { id: 1, task_para: "Senior Director - Human Resources", task_date: "Bright Consulting", year_date: "2008 - Present" },
];

const data3 = [
    { id: 1, task_para: "Topped my MBA" },
    { id: 2, task_para: "Least Attrition rate of Talents I recruited" },
    { id: 3, task_para: "Bright Talent - HR 2021 " },
];

function Mentor_Profile() {
    const {state} = useLocation()
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [showHello, setShowHello] = useState(false);
    const [userData, setUserData] = useState()
    const [testimonial, setTestimonial] = useState("")
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
            // console.log(getWindowSize())
        }
        getDetail()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const getDetail = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

              const res = await fetch(`${BASE_URL}organisation-admins/${state}/mentor-mentee-profile`,{
                  method:'GET',
                  headers:{
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                  },
                })
                const response = await res.json()
                console.log(response)
              const {success} = response
              if(success){
                setUserData(response.data)
              }
    }
    
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);


    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    const [showHello2, setShowHello2] = useState(false);
    const closeModal2 = () => setShowHello2(false);
    const showModal2 = () => setShowHello2(true);

    const [showHello3, setShowHello3] = useState(false);
    const closeModal3 = () => setShowHello3(false);
    const showModal3 = () => setShowHello3(true);

    const [showHello4, setShowHello4] = useState(false);
    const closeModal4 = () => setShowHello4(false);
    const showModal4 = () => setShowHello4(true);

    const [showSuccess, setShowSuccess] = useState(false);
    const hideAddModel = () => setShowSuccess(false);
    const showAddModel = () => setShowSuccess(true);

    const [showSuccess1, setShowSuccess1] = useState(false);
    const hideAddModel1 = () => setShowSuccess1(false);
    const showAddModel1 = () => setShowSuccess1(true);

    const [showSuccess2, setShowSuccess2] = useState(false);
    const hideAddModel2 = () => setShowSuccess2(false);
    const showAddModel2 = () => setShowSuccess2(true);

    const deleteMentor = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

              const res = await fetch(`${BASE_URL}mentor/${state}`,{
                  method:'DELETE',
                  headers:{
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                  },
                })
                const response = await res.json()
            //   console.log(response)
              const {success} = response
              if(success){
                navigate(-1)
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
        const token = await localStorage.getItem("token")
      const btoken = `Bearer ${token}`;
      const res = await fetch(`${BASE_URL}users/${state}/write-testimonial`,{
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
              closeModal1()
              getDetail()
              setTestimonial("")
              showAddModel2()
              // getProfile()
            }
            
  }
  
  const inActiveMentee = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;

          const res = await fetch(`${BASE_URL}organisation-admins/${state}/inactivate-user`,{
              method:'PUT',
              headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
              },
            })
            const response = await res.json()
        //   console.log(response)
          const {success} = response
          if(success){
            // alert("Mentee inactive succesfully")
            closeModal()
            showAddModel()
            getDetail()
            // navigate(-1)
          }
}
const activeMentee = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;

          const res = await fetch(`${BASE_URL}organisation-admins/${state}/activate-user`,{
              method:'PUT',
              headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
              },
            })
            const response = await res.json()
        //   console.log(response)
          const {success} = response
          if(success){
            // alert("Mentee active succesfully")
            closeModal2()
            showAddModel1()
            getDetail()
            // navigate(-1)
          }
}
const enableAsMentee = async(per) => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;
          const body = {
            "user_id":state,
            "what":per
        }
          const res = await fetch(`${BASE_URL_APPLSURE}switch-power-totoggle`,{
              method:'POST',
              headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
              },
              body:JSON.stringify(body)
            })
            const response = await res.json()
          console.log(response)
          const {status} = response
          if(status){
            // alert("Mentee active succesfully")
            // showAddModel1()
            // navigate(-1)
            if(per == "1"){
              closeModal3()
            }else{
              closeModal4()
            }
            getDetail()
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
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <p
                    onClick={() => navigate("/mentors")}
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
                      color: "#F8A046",
                      fontWeight: "400",
                      lineHeight: "22px",
                      cursor: "pointer",
                    }}
                  >
                    Profile
                  </p>
                    </div>
                    <div class="layout-button">
                      <button
                        onClick={() =>{ 
                          if(userData?.userMeta?.switchPower == 0 || userData?.userMeta?.switchPower == null){
                          showModal3()
                        }else{
                          showModal4()
                        }}
                          // navigate("/edit_mentor", { state: userData })
                        }
                        type="button"
                        className="btn btn-outline-primary btn-squared color-primary"
                      >
                        {userData && userData?.userMeta?.switchPower == 0 || userData?.userMeta?.switchPower == null ? "Active As Mentee" : "Disable As Mentee"}
                      </button>
                      <button
                        onClick={() =>
                          navigate("/edit_mentor", { state: userData })
                        }
                        type="button"
                        className="btn btn-outline-primary btn-squared color-primary"
                      >
                        Edit
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-danger btn-default btn-squared"
                        onClick={showModal}
                      >
                        Delete
                      </button> */}
                      {(userData && userData.isActive ? 
                                        <button type="button" onClick={() => showModal()}className="btn btn-danger btn-default btn-squared">Inactive</button> :
                                        <button type="button" onClick={() => showModal2()} className="btn btn-danger btn-default btn-squared">Active</button>)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                  <div className="media user-group-media d-flex justify-content-between profile_button_all">
                    <div className="media-body d-flex align-items-center profile_all">
                      {userData && (
                        <>
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
                              {userData.userMeta?.name}
                            </h3>
                            <p className="fs-13 fw-500 color-light mb-0">
                              {userData.jobTitle}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <div class="layout-button">
                      <button
                        type="button"
                        onClick={() => showModal1()}
                        className="btn btn-outline-primary btn-squared color-primary px-15"
                      >
                        Write a Testimonial
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/chat', {state:userData})}
                        className="btn btn-outline-primary btn-squared color-primary px-15"
                      >
                        Chat
                      </button>
                    </div>
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
                              <p>Impact Score</p>
                              <h2>{userData && userData.impactScore}</h2>
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
                              <p>Programs Mentored</p>
                              <h2>{userData && userData.programMentored}</h2>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img src={mentor_program} className="svg" />
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
                                <img src={mentor_mentored} className="svg" />
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

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Years of experience
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.yearsOfExperience}
                  </p>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Years with the Company
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.yearsWithCompany}
                  </p>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Job Title
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.jobTitle}
                  </p>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Functional Area
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.functionalArea}
                  </p>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Email address
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.userMeta.email}
                  </p>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <div className="svg-icon">
                    <img
                      src={linkdin_img}
                      onClick={() => {
                        userData.linkedinProfileLink != null &&
                          window.open(
                            `${userData.linkedinProfileLink}`,
                            "_blank"
                          );
                      }}
                      className="svg me-30"
                    />
                    <img
                      src={website_img}
                      onClick={() => {
                        userData.websiteLink != null &&
                          window.open(`${userData.websiteLink}`, "_blank");
                      }}
                      className="svg"
                    />
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Level of Employee
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.designationLevel}
                  </p>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Reporting Manager
                  </p>
                  <p className="color-dark fs-14 fw-600 align-center mb-0">
                    {userData && userData.reportingManagerName}
                  </p>
                </div>

                <h5 className="text-capitalize fw-600 mb-20">Expertise</h5>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Business skills I can mentor in:
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {userData &&
                      userData.expertise.businessSkillsGoodAt.map((i) => (
                        <span className="badge badge-square btn-outline-orange me-10">
                          {i.skill}
                        </span>
                      ))}
                  </ul>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Core skills I can mentor in:
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {userData &&
                      userData.expertise.coreSkillsGoodAt.map((i) => (
                        <span className="badge badge-square btn-outline-emlpoy me-10">
                          {i.skill}
                        </span>
                      ))}
                  </ul>
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                    Aspirational Goals
                  </p>
                  {/* <p className="color-dark fs-14 fw-600 align-center mb-0">{userData && userData.expertise.aspirationalGoals[0]}</p> */}
                </div>

                <div className="col-lg-12 col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-500 align-center mb-0">
                  Tools I can mentor in
                  </p>
                  <ul className="d-flex flex-wrap user-group-people__parent">
                    {/* {userData && userData.expertise.tools[0]} */}
                  </ul>
                </div>

                <h5 className="text-capitalize fw-600 mb-20">Language</h5>

                {userData &&
                  userData.languages?.map((i) => (
                    <div className="row line">
                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                          Languages
                        </p>
                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                          {i.language}
                        </p>
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                          Proficiency
                        </p>
                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                          {i.proficiency}
                        </p>
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                          Read
                        </p>
                        {i.canRead && (
                          <div className="svg-icon">
                            <img src={checks_img} className="svg" />
                          </div>
                        )}
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                          Write
                        </p>
                        {i.canWrite && (
                          <div className="svg-icon">
                            <img src={checks_img} className="svg" />
                          </div>
                        )}
                      </div>

                      <div className="col-md-2 mb-20">
                        <p className="color-gray fs-14 fw-300 align-center mb-0">
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

                <h5 className="text-capitalize fw-600 mb-20 mt-20">Location</h5>

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

                <h5 className="text-capitalize fw-600 mb-15">Education</h5>

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

                <h5 className="text-capitalize fw-600 mb-15">Work History</h5>

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

                <h5 className="text-capitalize fw-600 mb-15">Testimonials</h5>
                <Slider {...settings}>
                {userData &&
                  userData.userTestimonials?.map((user) => (

                        <div className="swiper-slide">
                            <div style={{backgroundColor:'#fdefe6'}} className="testimonial-item bg-white1">
                                <div className="testimonial-main-content">
                                    <div className="testimonial-info">
                                        <div className="testimonial-info__caption">
                                            <p className="testimonial-info__designation1">"{user.message}" - {user.sender?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                {/* {userData &&
                  userData.userTestimonials?.map((i) => (
                    <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                      <div className="card border-0 px-20 py-15  project-task-list--event box_shadow1 card_testi1">
                        <div className="card-body p-0">
                          <p class="color-dark fs-14 fw-400 align-center mb-0 text-center">
                            "{i.message}" - {i.sender?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))} */}
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
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
              Are you sure you want to disable {userData && userData.name}'s access to the platform?
              </h4>

              <div class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() => inActiveMentee()}
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showHello2} onHide={closeModal2}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
              Are you sure you want to enable {userData && userData.name}'s access to the platform?
              </h4>

              <div class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal2()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() => activeMentee()}
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showHello3} onHide={closeModal3}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
              Are you sure you want to enable {userData && userData.name} as Mentee to the platform?
              </h4>

              <div class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal3()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() =>{
                    enableAsMentee("1")
                  } }
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showHello4} onHide={closeModal4}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
              Are you sure you want to disable {userData && userData.name} as Mentee to the platform?
              </h4>

              <div class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal4()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() =>{
                    enableAsMentee("2")
                  } }
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showHello1} onHide={() =>{
          closeModal1()
          setTestimonial("")
        }}>
          <Modal.Header closeButton>
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
                    className="btn px-15 btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showSuccess} onHide={hideAddModel}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign:'center'}}>
                    <img src={success_msg}/>
                    <h3 style={{marginTop:'10px'}}>Mentor has been inactive Successfully</h3>
                    </div>
                </Modal.Body>
            </Modal>
        <Modal show={showSuccess1} onHide={hideAddModel1}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign:'center'}}>
                    <img src={success_msg}/>
                    <h3 style={{marginTop:'10px'}}>Mentor has been active Successfully</h3>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showSuccess2} onHide={hideAddModel2}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign:'center'}}>
                    <img src={success_msg}/>
                    <h3 style={{marginTop:'10px'}}>Testimonial has been added succesfully</h3>
                    </div>
                </Modal.Body>
            </Modal>
      </div>
    );
}

export default Mentor_Profile;
