import clock_img from '../../../img/growth.svg';
import checks_img from '../../../img/checks.svg';
import edits_img from '../../../img/editsss.svg';
import education_img from '../../../img/educationss.svg';
import edit_img from '../../../img/progresss.svg';
import suitcase_img from '../../../img/suitcases.svg';
import linkdin_img from '../../../img/linkdin.svg';
import achievement_img from '../../../img/achiveMentor.svg';
import author_logo from '../../../img/user_pic.png';
import website_img from '../../../img/website.svg';
import team_img from '../../../img/tm1.png';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../../services/Config';
import moment from 'moment/moment';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

  
const data1 = [
    { id: 1, task_para: "MBA HR", task_date: "IIM Indore", year_date: "2014- 2016" },
    { id: 2, task_para: "BA Psychology", task_date: "Jai Hind College", year_date: "2011 - 2014" },
];

const data2 = [
    { id: 1, task_para: "Business Associate - Recruitment", task_date: "Chell Corp.", year_date: " July 2016 - July 2018" },
];

const data3 = [
    { id: 1, task_para: "1. Knowledge Growth" },
    { id: 2, task_para: "2. Career Growth " },
    { id: 3, task_para: "3. Personal Growth" },
];

function My_Profile() {
    const navigate = useNavigate()
    const [showHello, setShowHello] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [userInfo, setUserInfo] = useState()
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
        getProfile()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const getProfile = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

              const res = await fetch(`${BASE_URL}mentee/profile`,{
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
                setUserInfo(response.data)
              }
        
    }
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    function order(a, b) {
        return a < b ? -1 : (a > b ? 1 : 0);
    }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">

                        <div className="row">

                            <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                            <div className="media user-group-media d-flex justify-content-between">
                                     <div className="media-body d-flex align-items-center">
                                        
                                        {(userInfo && 
                                    <>
                                    <img src={userInfo.imageUrl == "" ? author_logo : userInfo.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                        
                                        <div>
                                        <h3 className="fw-500 mb-2">{userInfo.userMeta.name}</h3>
                                        <p className="fs-13 color-light mb-0">EID #{userInfo.empId}  |  {userInfo.jobTitle}</p>
                                    </div>
                                    </>
                                        
                                        )}
                                        
                                        <img onClick={() => navigate('/edit_profile',{state:userInfo})} src={edits_img} className="svg ms-20 mt-4" />
                                    </div>

                                    <div class="layout-button mt-10">
                                    <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                                                            <div className="overview-content w-100">
                                                                                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                                                    <div className="ap-po-details__titlebar">
                                                                                        <h2 className="program_pro">Profile Status</h2>
                                                                                        <p>Complete the profile</p>
                                                                                    </div>
                                                                                    {(userInfo && (
                                                                                        <div className="ap-po-details__icon-area">
                                                                                        <div className="svg-icon">
                                                                                            <CircularProgressbar
                                                                                                value={userInfo.profilePercentage}
                                                                                                text={`${userInfo.profilePercentage}%`}
                                                                                                styles={{
                                                                                                    // Rotation of path and trail, in number of turns (0-1)
                                                                                                    rotation: 0.25,

                                                                                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                                                    strokeLinecap: 'butt',

                                                                                                    // Text size
                                                                                                    textSize: '18px',

                                                                                                    // How long animation takes to go from one percentage to another, in seconds
                                                                                                    pathTransitionDuration: 0.5,

                                                                                                    // Can specify path transition in more detail, or remove it entirely
                                                                                                    // pathTransition: 'none',

                                                                                                    // Colors
                                                                                                    pathColor: '#72b8bf',
                                                                                                    textColor: '#72b8bf',
                                                                                                    trailColor: '#72b8bf',
                                                                                                    backgroundColor: '#72b8bf',
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    ))}
                                                                                    
                                                                                </div>
                                                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5 className="text-capitalize fw-500 mb-20">Overview</h5>
                            <div className="col-lg-12 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">About me</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.overview}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Years of experience</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.yearsOfExperience}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Years with the Company</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.yearsWithCompany}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Job Title</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.jobTitle}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Functional Area</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.functionalArea}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Email address</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.userMeta.email}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">

                                <div className="svg-icon">
                                    <img src={linkdin_img} onClick={() => {userInfo.linkedinProfileLink != null && window.open(`${userInfo.linkedinProfileLink}`, "_blank") }} className="svg me-30" />
                                    <img src={website_img} onClick={() =>{userInfo.linkedinProfileLink != null && window.open(`${userInfo.websiteLink}`, "_blank") }} className="svg" />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Level of Employee</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.designationLevel}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Reporting Manager</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.reportingManagerName}</p>
                            </div>

                            <h5 className="text-capitalize fw-500 mb-20">Expertise</h5>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Business skills I am good at</p>
                                <ul className="d-flex flex-wrap user-group-people__parent">
                                    {/* <span className="badge badge-square btn-outline-orange me-10">Public Speaking</span>
                                    <span className="badge badge-square btn-outline-orange me-10">Emotional Intelligence</span>
                                    <span className="badge badge-square btn-outline-orange me-10">Leadership</span> */}
                                    {userInfo && userInfo.expertise.businessSkillsGoodAt?.map((i)=>(
                                        <span className="badge badge-square btn-outline-orange me-10">{i.skill}</span>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Business skills I would like to develop</p>
                                <ul className="d-flex flex-wrap user-group-people__parent">
                                    {/* <span className="badge badge-square btn-outline-orange me-10">Public Speaking</span>
                                    <span className="badge badge-square btn-outline-orange me-10">Emotional Intelligence</span>
                                    <span className="badge badge-square btn-outline-orange me-10">Leadership</span> */}
                                    {userInfo && userInfo.expertise.businessSkillsToDevelop?.map((i)=>(
                                        <span className="badge badge-square btn-outline-orange me-10">{i.skill}</span>
                                    ))}
                                </ul>
                            </div>

                            

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Core skills I am good at</p>
                                <ul className="d-flex flex-wrap user-group-people__parent">
                                    {/* <span className="badge badge-square btn-outline-emlpoy me-10">HR Operations</span>
                                    <span className="badge badge-square btn-outline-emlpoy me-10">HR Strategy and Budgeting</span> */}
                                    {userInfo && userInfo.expertise.coreSkillsGoodAt?.map((i)=>(
                                        <span className="badge badge-square btn-outline-emlpoy me-10">{i.skill}</span>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Core skills I would like to develop</p>
                                <ul className="d-flex flex-wrap user-group-people__parent">
                                    {/* <span className="badge badge-square btn-outline-emlpoy me-10">HR Operations</span>
                                    <span className="badge badge-square btn-outline-emlpoy me-10">HR Strategy and Budgeting</span> */}
                                    {userInfo && userInfo.expertise.coreSkillsToDevelop?.map((i)=>(
                                        <span className="badge badge-square btn-outline-emlpoy me-10">{i.skill}</span>
                                    ))}
                                </ul>
                            </div>

                           

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Aspirational Goals</p>
                                {/* <p className="color-dark fs-14 fw-300 align-center mb-0">{userInfo && userInfo.expertise?.aspirationalGoals[0]}</p> */}
                                <p className="color-dark fs-14 fw-300 align-center mb-0">{userInfo && userInfo.expertise?.hasOwnProperty('aspirationalGoals') ? userInfo.expertise?.aspirationalGoals[0] : ""}</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Tools I would like to Develop:</p>
                                <ul className="d-flex flex-wrap user-group-people__parent">
                                    {/* <span className="badge badge-square btn-outline-dan me-10">HR Strategy & Budgeting</span>
                                    <span className="badge badge-square btn-outline-dan me-10">HR Strategy & Budgeting</span>
                                    <span className="badge badge-square btn-outline-dan me-10">HR Strategy & Budgeting</span> */}
                                    {userInfo && userInfo.expertise.tools?.map((i)=>(
                                        <span className="badge badge-square btn-outline-dan me-10">{i}</span>
                                    ))}
                                </ul>
                            </div>

                            <h5 className="text-capitalize fw-500 mb-20">Language</h5>
                            {userInfo && userInfo.languages?.map((i)=>(
                                <div className="row line mt-3">
                                <div className="col-md-2 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Languages</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{i.language}</p>
                                </div>

                                <div className="col-md-2 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Proficiency</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{i.proficiency}</p>
                                </div>

                                <div className="col-md-2 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Read</p>
                                    {i.canRead &&(
                                        <div className="svg-icon">
                                        <img src={checks_img} className="svg" />
                                    </div>
                                    )}
                                    
                                </div>

                                <div className="col-md-2 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Write</p>
                                    {i.canWrite &&(
                                        <div className="svg-icon">
                                        <img src={checks_img} className="svg" />
                                    </div>
                                    )}
                                </div>

                                <div className="col-md-2 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Speak</p>
                                    {i.canSpeak &&(
                                        <div className="svg-icon">
                                        <img src={checks_img} className="svg" />
                                    </div>
                                    )}
                                </div>
                            </div>
                            ))}
                            
                            <h5 className="text-capitalize fw-500 mb-20 mt-3">Location</h5>

                            <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Work Location</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.workLocation}</p>
                            </div>

                            <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Division</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.division}</p>
                            </div>

                            <div className="col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-500 align-center mb-0">Country</p>
                                <p className="color-dark fs-14 fw-600 align-center mb-0">{userInfo && userInfo.country}</p>
                            </div>

                            <h5 className="text-capitalize fw-500 mb-15">Education</h5>

                            <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                                <div className="tab-content">
                                    <div className="project-task table-responsive table-responsive--dynamic">
                                        <table className="table table-borderless mb-1">
                                            <tbody>
                                            {userInfo && userInfo.education?.map((user) => (
                                                    <tr className="project-task-list">
                                                        <td>
                                                            <div className="box_shadow1 p-15">
                                                                <div className="event-Wrapper">
                                                                    <div className="event-Wrapper__left">
                                                                        <div className="event-wrapper-item">
                                                                            <img src={education_img} className="svg" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="event-Wrapper__right">
                                                                        <h6 className="mb-1 fw-600">{user.degree}</h6>
                                                                        <span className="fs-14">{user.passingYear}</span> <span className="ms-4 fs-14">{user.collegeName}</span>
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
                                            {userInfo && userInfo.workHistory?.map((user) => (
                                                    <tr className="project-task-list">
                                                        <td>
                                                            <div className="box_shadow1 p-15">
                                                                <div className="event-Wrapper">
                                                                    <div className="event-Wrapper__left">
                                                                        <div className="event-wrapper-item">
                                                                            <img src={suitcase_img} className="svg" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="event-Wrapper__right">
                                                                        <h6 className="mb-1 fw-600">{user.jobRole}</h6>
                                                                        <span className="fs-14">{user.companyName}</span> <span className="ms-4 fs-14">{moment(user.startDate).format('YYYY')}-{ user.isMyCurrentRole ? "Present":  moment(user.endDate ).format('YYYY')}</span>
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


                            <h5 className="text-capitalize fw-600 mb-15">Key Achievements</h5>

                            <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                                <div className="tab-content">
                                    <div className="project-task table-responsive table-responsive--dynamic">
                                        <table className="table table-borderless mb-1">
                                            <tbody>
                                                {userInfo && userInfo.keyAchievements?.map((user) => (
                                                    <tr className="project-task-list">
                                                        <td>
                                                            <div className="box_shadow1 p-15">
                                                                <div className="event-Wrapper">
                                                                    <div className="event-Wrapper__left">
                                                                        <div className="event-wrapper-item">
                                                                            <img src={achievement_img} className="svg" />
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
                            <h5 className="text-capitalize fw-500 mb-15">Testimonials</h5>
                            <Slider {...settings}>
                {userInfo &&
                  userInfo.userTestimonials?.map((user) => (

                        <div className="swiper-slide">
                            <div className="testimonial-item bg-white1">
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
                            {/* {userInfo && userInfo.userTestimonials?.map((i)=>(
                                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                            <div className="card border-0 px-20 py-15  project-task-list--event box_shadow1 card_testi">
                                <div className="card-body p-0">
                                <p class="color-dark fs-14 fw-400 align-center mb-0 text-center">
                                    "{i.message}" - {i.sender.name}
                                </p>
                                </div>
                            </div>
                            </div>
                            ))} */}

                            <h5 className="text-capitalize fw-500 mb-15">Your Preferences<span onClick={() => navigate('/preference_one')} style={{fontSize:'12px', textDecoration:'underline', cursor:'pointer', marginLeft:'10px'}}>Edit</span></h5>
                            {userInfo && userInfo.preferences?.map((i,index) => (
                                <div className="col-lg-6 col-sm-12 col-md-12 mb-25">
                                <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                                    <div className="card-header px-0 border-0">
                                        <h6 className="color-dark fs-16 fw-600">Q{index+1}. {i.question}</h6>
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
                                                                                    {i.questionType == "priority" ?
                                                                                        <h6 style={{backgroundColor:'#D5ECEF', padding:'25px', borderRadius:14}}>{user.priority}</h6>:
                                                                                        <img src={edit_img} className="svg" />
                                                                                    }
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
                            
                        </div>
                    </div>
                </div>
            </div>
            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-500 mb-25">Are you sure you want to delete this profile?</h4>

                        <div class="layout-button justify-content-center">
                            <button type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default My_Profile;
