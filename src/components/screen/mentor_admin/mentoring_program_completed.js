import clock_img from '../../../img/mentoring_pro.svg';
import team_img from '../../../img/tm1.png';
import pdf_img from '../../../img/pdf_file.svg';
import resources_img from '../../../img/programs.png';
import word_img from '../../../img/word.svg';
import delete_img from '../../../img/deletes.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import moment from 'moment';
import { Rating } from 'react-simple-star-rating'
import path from "../../../img/Path.png";

const data1 = [
    { id: 1, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Key Skills", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning & Development", mentee_one: "+1" },
    { id: 2, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Key Skills", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning & Development", mentee_one: "+1" },
];

function Completed_Program() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullDetails, setFullDetails] = useState()
    const [testimonial, setTestimonial] = useState("")
    const [data, setData] = useState([
        { id: 1, mentoring_hours: "Program Mentors", mentoring_num: "40" },
        { id: 2, mentoring_hours: "Program Mentees", mentoring_num: "40" },
    ]);
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

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const [rating1, setRating1] = useState(0)
    const [rating2, setRating2] = useState(0)
    const [rating3, setRating3] = useState(0)
    const [feedbackText, setfeedbackText] = useState("")

        // Catch Rating value
        const handleRating1 = (rate) => {
            setRating1(rate)
            // other logic
        }
        const handleRating2 = (rate) => {
            setRating2(rate)
            // other logic
        }
        const handleRating3 = (rate) => {
            setRating3(rate)
            // other logic
        }
        // Optinal callback functions
        const onPointerEnter = () => console.log('Enter')
        const onPointerLeave = () => console.log('Leave')
        const onPointerMove = (value, index) => console.log(value, index)


    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const [showHello2, setShowHello2] = useState(false);
    const closeModal2 = () => setShowHello2(false);
    const showModal2 = () => setShowHello2(true);

    useEffect(()=>{
        getFullDetails()
    },[])
        const getFullDetails = async() => {
            const token = await localStorage.getItem("program_token_node")
            const body = {
                "program_id":state?.program_id
            }
            const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/program-details-other`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": token,
                },
                body:JSON.stringify(body)
            })
            const response = await res.json()
            console.log("program full details on mentor", response)
            if(response.success){
                setFullDetails(response)
                setData([
                    { id: 1, mentoring_hours: "Program Mentors", mentoring_num: response.totalmentoraccepted },
                    { id: 2, mentoring_hours: "Program Mentees", mentoring_num: response.totalmenteeaccepted },
                ])
            }
            // https://www.wiseq.co/ndwiseqbackend/api/program/template-list
          
        }


        const rateSubmit = async() => {
            // e.preventDefault()
            // return
            const token = await localStorage.getItem("program_token_node")
            const body = {
                "role":"mentee",
                "program_id":state?.program_id,
                "feedback":feedbackText,
                "rating1":rating1,
                "rating2":rating2,
                "rating3":rating3
            }
            console.log(body)
            // return
            const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/add-rating`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": token,
                },
                body:JSON.stringify(body)
            })
            const response = await res.json()
            console.log("feedback res", response)
            if(response.success){
                alert("Rating has been added successfully")
                setfeedbackText("")
                closeModal2()
            }else{
                alert(response.message)
                setfeedbackText("")
                closeModal2()
            }
          
        }


        const testimonialSubmit = async(e) => {
            e.preventDefault()
            // return
            const token = await localStorage.getItem("program_token_node")
            const body = {
                "message":testimonial,
                "role":"mentee",
                "program_id":state?.program_id
            }
            console.log(body)
            // return
            const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/add-testimonial`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": token,
                },
                body:JSON.stringify(body)
            })
            const response = await res.json()
            console.log("feedback res", response)
            if(response.success){
                alert("Testimonoial has been added successfully")
                setTestimonial("")
                closeModal2()
            }else{
                alert(response.message)
                setTestimonial("")
                closeModal2()
            }
          
        }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className=" d-flex flex-wrap breadcrumb-main__wrapper">
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
                                Mentoring Programs
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
                                color: "#006666",
                                fontWeight: "400",
                                lineHeight: "22px",
                                
                                }}
                            >
                                Profile
                            </p>
                                </div>
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">{fullDetails?.program?.name}</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" onClick={showModal2} className="btn btn-outline-primary btn-default btn-squared">Rate</button>
                                        <button type="button" className="btn btn-outline-petrol btn-default btn-squared" onClick={showModal}>Write a testimonial</button>
                                        <NavLink className="navbar-link" to="/program_statistics" state={fullDetails}><button type="button" className="btn btn-petrol btn-squared color-primary">Program Statistics</button></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="">
                                    <div className="blog-details-thumbnail mb-25">
                                        <img src={fullDetails?.program?.image} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Overview</h4>
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program ID</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">#{fullDetails?.program?.program_id}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.program?.name}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills Covered</p>
                                    {fullDetails?.program?.skills?.split(",").map((i, index)=>(
                                            <span key={index} class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Objectives:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.objective}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Duration:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.duration}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.type}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Total Sessions:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.no_of_sessions}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Summary:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.summary}
                                    </p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Participation</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Eligibility</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.eligibility}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Participation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.participation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentees allowed</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.no_of_mentees}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.no_of_mentor}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Metrics</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score for Mentees</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.growthscore_mentee}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Impact Score for Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.impactscore_mentor}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Evaluation Metrics</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.define_evalutaion}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Learnings</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.define_learnings}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Assessments</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.define_assessment}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Creation of IDP</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails?.program?.idp_creation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Schedule</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Start Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullDetails?.program?.start_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program End Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullDetails?.program?.end_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Cut off date for confirmation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullDetails?.program?.cutt_off).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Proposed Graduation Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullDetails?.program?.proposed_graduation).format("DD MMM, YYYY")}</p>
                                </div>

                                {/* <h4 className="text-capitalize fw-500 mb-25 program_par">Mandatory Learnings</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Title</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Public Speaking</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">External</p>
                                </div>

                                <div className="col-md-12 mb-15">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finished By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <p className="color-blue fs-12 fw-500 align-center mb-20 view_more">View More Info</p> */}

                                {/* <h4 className="text-capitalize fw-500 mb-25 program_par">Mandatory Assessments</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Title</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Public Speaking</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">External</p>
                                </div>

                                <div className="col-md-12 mb-15">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finished By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <p className="color-blue fs-12 fw-500 align-center mb-20 view_more">View More Info</p> */}

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Inaugural Session</h4>

                                {fullDetails && fullDetails?.inaugralsession.length > 0 && (
                                    <>
                                        <div className="col-md-12 mb-20">
                                            <p className="color-gray fs-14 fw-300 align-center mb-0">Date</p>
                                            <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails.inaugralsession.map((i) => (
                                                <p>
                                                    {moment(i?.schedule_time).format("DD MMM, YYYY")}
                                                </p>
                                            ))}</p>
                                        </div>

                                        <div className="col-md-12 mb-20">
                                            <p className="color-gray fs-14 fw-300 align-center mb-0">Time</p>
                                            <p className="color-dark fs-14 fw-300 align-center mb-0">
                                            {fullDetails.inaugralsession.map((i) => (
                                                <p>
                                                    {moment(`${i?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")}
                                                </p>
                                            ))}</p>
                                        </div>
                                    </>
                                )}

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Cohort Session Schedule</h4>

                                {fullDetails && fullDetails.cohartsessionlist.map((i) => (
                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>S No.</th>
                                                                <th>Title</th>
                                                                <th>Mentor Name</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{i?.session?.session_number}</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>{moment(i?.session?.schedule_time).format("DD MMM, YYYY")}</td>
                                                                <td>{moment(`${i?.session?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))}

                            </div>


                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    {data.map((user) => (
                                        <div className="col-xxl-6 col-sm-6 mb-25">
                                            <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                                                <div className="overview-content w-100">
                                                    <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                        <div className="ap-po-details__titlebar">
                                                            <p>{user.mentoring_hours}</p>
                                                            <h2>{user.mentoring_num}</h2>
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
                                    ))}
                                </div>

                                <div className="col-lg-12">
                                    <div className="breadcrumb-main user-member justify-content-sm-between">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">My Program Mentees</h4>
                                        <div class="view_all text-center"><a href="#" class="dropdown-wrapper__more color-green">View All</a></div>
                                    </div>
                                </div>

                                <div className="row">
                                {fullDetails &&fullDetails?.menteerlistWithRatings?.map((user) => (
                                        <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                            <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                                <div className="media user-group-media d-flex justify-content-between">
                                                    <div className="media-body d-flex align-items-center">
                                                        <img src={user?.mentee_meta?.image_url} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                        <div>
                                                            <a href="#">
                                                                <h6 className="mt-0  fw-500">{user.mentee_meta?.name}</h6>
                                                            </a>
                                                            <p className="fs-13 color-light mb-0">{user.mentor_organisation_user?.job_title}</p>
                                                            <span className="badge badge-round btn-petrol mt-10">{user.mentee_number}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-group-people">
                                                    <p className="mt-15">{user.mentee_skill}</p>
                                                    {user.mentee_meta?.user_skills?.map((i)=>(
                                                        <span className="badge badge-square btn-outline-emlpoy me-10">{i.to_develop && i.skill}</span>
                                                    ))}
                                                    {/* <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                                        <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                                        <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_learning}</span>
                                                        <span className="badge badge-square btn-outline-emlpoy">{user.mentee_one}</span>
                                                    </ul> */}
                                                </div>
                                                <div className="layout-button">
                                                    <NavLink className="navbar-link flex-grow-1 me-10" to="/mentee_profile" state={user}><button type="button" className="btn btn-default btn-squared color-primary btn-outline-petrol w-100">View Profile</button></NavLink>
                                                    <NavLink className="navbar-link flex-grow-1" to="/mentee_profile"><button type="button" className="btn btn-petrol btn-default btn-squared w-100">Chat</button></NavLink>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills I am Mentoring on</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        <span className="badge badge-square btn-outline-orange me-10">Leadership Skills</span>
                                        <span className="badge badge-square btn-outline-orange me-10"> Individual Core</span>
                                    </ul>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Worksheets Requested By Admin</h4>

                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Worksheet Name</th>
                                                                <th>Due Date</th>
                                                                <th>Requested by</th>
                                                                <th>File</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {fullDetails && fullDetails?.worksheetassigned?.map((i) => (
                                                                                    <tr>
                                                                                        <td>{i?.program_worksheets?.name}</td>
                                                                                        <td>{moment(i?.due_date).format("DD MMM, YYYY")}</td>
                                                                                        <td>Admin</td>
                                                                                        <td><button class="btn btn-petrol btn-xs btn-squared">Download</button></td>
                                                                                        
                                                                                    </tr>
                                                                                    ))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Worksheets Requested By Me</h4>

                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Worksheet Name</th>
                                                                <th>Due Date</th>
                                                                <th>Requested by</th>
                                                                <th>File</th>
                                                            </tr>
                                                        </thead>
                                                        
                                                        {fullDetails && fullDetails.worksheetassignedother?.map((i) => (
                                                            <tbody>
                                                            <tr>
                                                                <td>{i?.program_worksheets?.name}</td>
                                                                <td>{moment(i?.program_worksheets?.due_date).format("DD MMM, YYYY")}</td>
                                                                <td>Mentor</td>
                                                                <td>
                                                                    <div className="">
                                                                        {/* <img src={word_img} className="me-10" /> */}
                                                                        <span className="color-dark">View</span>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            {/* <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Santosh Bala</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={pdf_img} className="me-10" />
                                                                        <span className="color-dark">abcd.pdf</span>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Santosh Bala</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={pdf_img} className="me-10" />
                                                                        <span className="color-dark">abcd.pdf</span>
                                                                    </div>
                                                                </td>
                                                            </tr> */}
                                                            </tbody>
                                                        ))}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header className='mentor_feedback' closeButton>
                    <Modal.Title>Write a testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={testimonialSubmit}>
                        <div className="row">
                            <div className="col-md-12 mb-25">
                            <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                value={testimonial}
                                onChange={(e) => setTestimonial(e.target.value)}
                                rows="5"
                                placeholder="Write..."
                                required
                            ></textarea>                            
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="submit" className="btn btn-petrol btn-default btn-squared m-auto">Send</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

            <Modal show={showHello2} onHide={closeModal2}>
          <Modal.Header className="mentor_feedback" closeButton>
            <Modal.Title>Rate Program</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 class="text-capitalize fw-600 mb-20">Effectiveness of the Program
              </h5>
              <Rating
                onClick={handleRating1}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
              <h5 class="text-capitalize fw-600 mb-20 mt-20">
              Program Structure and Delivery
              </h5>
              <Rating
                onClick={handleRating2}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
              <h5 class="text-capitalize fw-600 mb-20 mt-20">
              Did the Program meet its objectives
              </h5>
              <Rating
                onClick={handleRating3}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
              {/* <div class="layout-button justify-content-center">
                            <button onClick={() => closeModal()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => { }} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                        </div> */}
            </div>

            <h6 class="text-capitalize fw-600 mb-10 mt-25">
            Any feedback you may have
            </h6>
            <textarea
              value={feedbackText}
              onChange={(e) => setfeedbackText(e.target.value)}
              class="form-control ip-gray radius-xs b-deep px-15"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder=""
            ></textarea>

            <center>
              <button
                onClick={() => rateSubmit()}
                type="button"
                className="btn btn-petrol btn-squared color-primary px-15 mt-20"
              >
                Submit
              </button>
            </center>
          </Modal.Body>
        </Modal>
        </div>

    );
}

export default Completed_Program;
