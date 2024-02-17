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
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BASE_URL_APPLSURE, BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import moment from 'moment';



const data1 = [
    { id: 1, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Key Skills", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning & Development", mentee_one: "+1" },
    { id: 2, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Key Skills", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning & Development", mentee_one: "+1" },
];

function Progress_Program() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [feedback, setFeedback] = useState("")
    const [fullDetails, setFullDetails] = useState({})
    const [worksheetNameArray, setWorksheetsNameArray] = useState([])
    const [worksheetUrlString, setWorksheetUrlString] = useState("")
    const [worksheetDeleteID, setWorksheetDeleteID] = useState("")
    const [uploadID, setUploadID] = useState("")
    const [data, setData] = useState([
        { id: 1, mentoring_hours: "Program Mentees", mentoring_num: "50" },
        { id: 2, mentoring_hours: "Program Mentors", mentoring_num: "30" },
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

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const [showHello2, setShowHello2] = useState(false);
    const closeModal2 = () => setShowHello2(false);
    const showModal2 = () => setShowHello2(true);

    const [showHello3, setShowHello3] = useState(false);
    const closeModal3 = () => setShowHello3(false);
    const showModal3 = () => setShowHello3(true);

    useEffect(()=>{
        getFullDetails()
        getMyMentors()
    },[])
        const getFullDetails = async() => {
            const token = await localStorage.getItem("program_token_node")
            const body = {
                "program_id":state?.program_id
            }
            const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/program-details`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": token,
                },
                body:JSON.stringify(body)
            })
            const response = await res.json()
            console.log("program full details", response)
            if(response.success){
                setFullDetails(response)
                setData([
                    { id: 1, mentoring_hours: "Program Mentors", mentoring_num: response.totalmentoraccepted },
                    { id: 2, mentoring_hours: "Program Mentees", mentoring_num: response.totalmenteeaccepted },
                ])
            }
            // https://www.wiseq.co/ndwiseqbackend/api/program/template-list
          
        }
        const getMyMentors = async() => {
            const token = await localStorage.getItem("program_token_node")
            const body = {
                "program_id":state?.program_id
            }
            const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/program-mentor-list`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": token,
                },
                body:JSON.stringify(body)
            })
            const response = await res.json()
            console.log("mentor list", response)
            if(response.success){
                // setFullDetails(response)
            }
            // https://www.wiseq.co/ndwiseqbackend/api/program/template-list
          
        }

    const feedbackSubmit = async(e) => {
        e.preventDefault()
        // return
        const token = await localStorage.getItem("program_token_node")
        const body = {
            "feedback" : feedback,
            "role":"mentee",
            "program_id":state?.program_id
        }
        // console.log(body)
        // return
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/add-feedback`, {
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
            alert("Feedback has been sent successfully")
            setFeedback("")
            closeModal()
        }else{
            alert(response.message)
            setFeedback("")
            closeModal()
        }
      
    }

    const uploadWorksheetInputReply = async (item) => {
        // setImagePath(item)
        console.log(item)
        let formData = new FormData()
        item.forEach((i,index) => {
            formData.append("uploadfile[]", item[index])
            formData.append("pathto", "program-worksheet-assigned")
            formData.append("id", state?.program_id)

        })

        // return
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        // console.log(btoken)  
        const res = await fetch(`${BASE_URL_APPLSURE}file-upload-multiple`, {
        // const res = await fetch(`${BASE_URL}files/upload?fileType=learning_file`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                //   'Content-Type': 'multipart/form-data',
                "Authorization": btoken,
            },
            body: formData
        })
        const response = await res.json()
        console.log(response)
        // return
        const { status } = response
        if (status) {
            setWorksheetUrlString(response.data)
            let temp = []
            if(response?.nameimg?.split("|") != undefined){
                response?.nameimg?.split("|")?.map((i)=> {
                    // console.log(i)
                    temp.push(i)
                })
            }
                console.log(temp) 
                // setWorksheetUrl(response.data)
                setWorksheetsNameArray(temp)
        }
    }

    const uploadWorksheetReply = (e) => {
        e.preventDefault()
        // console.log(user)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.program_id,
            "files": worksheetUrlString,
            "id": uploadID,
        });
 
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}user/upload-assignment`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success){
                alert("Assignment sent successfully")
                setUploadID("")
                closeModal2()
                getFullDetails()
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
    }

    const deleteWorksheet = async() => {
        const token = await localStorage.getItem("program_token_node")

        const body = {
            "id":worksheetDeleteID
        }
        console.log(body)
        // return
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/program-worksheet-delete`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                  'Content-Type': 'application/json',
                "Authorization": token,
            },
            body:JSON.stringify(body)
            
        })
        const response = await res.json()
        console.log(response)
        // return
        const { status, success } = response
        if(success){
            getFullDetails()
            closeModal3()
        }
    }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">{fullDetails?.program?.name}</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" className="btn btn-primary btn-default btn-squared">{state?.program_model?.participation == 1 ? "Mandatory" : "Optional"}</button>
                                        <button type="button" onClick={showModal} className="btn btn-light-petrol btn-squared color-primary">Give Feedback</button>
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
                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Program Overview</h4>
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
                                    {/* <ul className="d-flex flex-wrap user-group-people__parent">
                                        <span className="badge badge-square btn-outline-orange me-10">Leadership Skills</span>
                                        <span className="badge badge-square btn-outline-orange me-10"> Individual Core</span>
                                        <span className="badge badge-square btn-outline-orange me-10">Business Skills</span>
                                    </ul> */}
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
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails && fullDetails.program?.summary}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Program Participation</h4>

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

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Program Metrics</h4>

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
                                
                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Program Schedule</h4>

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

                                {/* <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Mandatory Learnings</h4>

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

                                <p className="color-blue fs-12 fw-500 align-center mb-20 view_more">View More Info</p>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Mandatory Assessments</h4>

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

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Inaugural Session</h4>

                                {fullDetails && fullDetails?.inaugralsession?.length > 0 && (
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
                                            {fullDetails?.inaugralsession?.map((i) => (
                                                <p>
                                                    {moment(`${i?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")}
                                                </p>
                                            ))}</p>
                                        </div>
                                    </>
                                )}

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Cohort Session Schedule</h4>

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
                                {fullDetails && fullDetails?.cohartsessionlist?.map((i) => (
                                                            <tr>
                                                                <td>{i?.session?.session_number}</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>{moment(i?.session?.schedule_time).format("DD MMM, YYYY")}</td>
                                                                <td>{moment(`${i?.session?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")}</td>
                                                            </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="col-lg-6 col-md-12 col-sm-12">

                                <div className="col-xxl-6 col-sm-6 mb-25">
                                    <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                        <div className="overview-content w-100">
                                            <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                <div onClick={() => navigate("/mentoring_program_rating")} className="ap-po-details__titlebar">
                                                    <h2 className="program_pro">Program Progress</h2>
                                                </div>

                                                <div className="ap-po-details__icon-area">
                                                    <div className="svg-icon">
                                                        <CircularProgressbar
                                                            value={fullDetails?.hasOwnProperty('totolprogress') ? parseInt(fullDetails?.totolprogress).toFixed() : 0}
                                                            text={fullDetails?.hasOwnProperty('totolprogress') ? `${parseInt(fullDetails?.totolprogress).toFixed()}%` : '0%'}
                                                            styles={buildStyles({
                                                                // Rotation of path and trail, in number of turns (0-1)
                                                                

                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',

                                                                // Text size
                                                                textSize: '18px',

                                                                // How long animation takes to go from one percentage to another, in seconds
                                                                pathTransitionDuration: 0.5,

                                                                // Can specify path transition in more detail, or remove it entirely
                                                                // pathTransition: 'none',

                                                                // Colors
                                                                pathColor:"#006666",
                                                                textColor: "#323232",
                                                                trailColor: "#ebf3f3",
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">My Program Mentors</h4>
                                        <div class="view_all text-center"><a href="#" class="dropdown-wrapper__more color-green">View All</a></div>
                                    </div>
                                </div>

                                <div className="row">
                                    {fullDetails &&fullDetails?.mentorlistWithRatings?.map((user) => (
                                        <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                            <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                                <div className="media user-group-media d-flex justify-content-between">
                                                    <div className="media-body d-flex align-items-center">
                                                        <img src={user?.mentor_meta?.image_url} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                        <div>
                                                            <a href="#">
                                                                <h6 className="mt-0  fw-500">{user.mentor_meta?.name}</h6>
                                                            </a>
                                                            <p className="fs-13 color-light mb-0">{user.mentor_organisation_user?.job_title}</p>
                                                            <span className="badge badge-round btn-petrol mt-10">{user.mentee_number}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-group-people">
                                                    <p className="mt-15">{user.mentee_skill}</p>
                                                    {user.mentor_meta?.user_skills?.map((i)=>(
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

                                {/* <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills I am Mentoring on</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        <span className="badge badge-square btn-outline-orange me-10">Leadership Skills</span>
                                        <span className="badge badge-square btn-outline-orange me-10"> Individual Core</span>
                                    </ul>
                                </div>

                                <div class="col-md-12 mb-20">
                                    <button type="button" class="btn btn-default btn-squared color-primary btn-outline-petrol w-100" onClick={showModal}>Request Worksheet(s)</button>
                                </div>

                                <div class="col-md-12 mb-20">
                                    <button type="button" class="btn btn-petrol btn-default btn-squared w-100">Assign a Learning</button>
                                </div>

                                <div class="col-md-12 mb-40">
                                    <button type="button" class="btn btn-petrol btn-default btn-squared w-100">Assign an Assessment</button>
                                </div> */}

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Worksheets Requested By Admin</h4>

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
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                                                <tbody>
                                                        {fullDetails && fullDetails?.worksheetassigned?.map((i) => (
                                                                                    <tr>
                                                                                        <td>{i?.program_worksheets?.name}</td>
                                                                                        <td>{moment(i?.due_date).format("DD MMM, YYYY")}</td>
                                                                                        <td>Admin</td>
                                                                                        <td><button onClick={() => {
                                                                                            i?.program_worksheets?.files?.split("|").map((j)=>{
                                                                                                console.log(j)
                                                                                                window.open(j, "_blank")
                                                                                            })
                                                                                        }} class="btn btn-light-petrol btn-xs btn-squared">Download</button></td>
                                                                                    </tr>
                                                                                    ))}
                                                                                </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Upload Worksheets Requested By Admin</h4>

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
                                                                                        {i.status == 0 && new Date(i.due_date) > new Date() ? (
                                                                                            <td><button onClick={() => {
                                                                                                showModal2()
                                                                                                setUploadID(i.id)
                                                                                            }} class="btn btn-light-petrol btn-xs btn-squared">Upload</button></td>
                                                                                        ): (
                                                                                            <td>
                                                                                                <div className="">
                                                                                                    {/* <img src={word_img} className="me-20" /> */}
                                                                                                    <span onClick={() => {
                                                                                                        i?.files.split("|").map((j)=>{
                                                                                                            console.log(j)
                                                                                                            window.open(j, "_blank")
                                                                                                        })
                                                                                                    }} style={{marginRight:'30px', fontWeight:'bold', textDecoration:'underline', cursor:'pointer'}} className="color-dark">View</span>
                                                                                                    { new Date(i.due_date) > new Date() && (

                                                                                                        <img onClick={() => {
                                                                                                            showModal3()
                                                                                                            setWorksheetDeleteID(i.id)
                                                                                                        }} src={delete_img} className="" />
                                                                                                        )}
                                                                                                </div>
                                                                                            </td>
                                                                                        )}
                                                                                    </tr>
                                                        ))}
                                                                                </tbody>
                                                        {/* <tbody>
                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={word_img} className="me-20" />
                                                                        <img src={delete_img} className="" />
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-light-petrol btn-xs btn-squared">Upload</button></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-light-petrol btn-xs btn-squared">Upload</button></td>
                                                            </tr>

                                                        </tbody> */}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Worksheets Requested By Mentors</h4>

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
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                {fullDetails && fullDetails?.worksheetassignedother?.map((i) => (
                                                            <tr>
                                                                <td>{i?.program_worksheets?.name}</td>
                                                                <td>{moment(i?.due_date).format("DD MMM, YYYY")}</td>
                                                                <td>Mentor</td>
                                                                <td><button onClick={() => {
                                                                                            i?.program_worksheets?.files?.split("|").map((j)=>{
                                                                                                console.log(j)
                                                                                                window.open(j, "_blank")
                                                                                            })
                                                                                        }}
                                                                                        class="btn btn-light-petrol btn-xs btn-squared">Download</button></td>
                                                            </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_mentee">Upload Worksheets Requested By Mentors</h4>

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
                                                        {fullDetails && fullDetails?.worksheetassignedother?.map((i) => (
                                                            <tr>
                                                                <td>{i?.program_worksheets?.name}</td>
                                                                <td>{moment(i?.due_date).format("DD MMM, YYYY")}</td>
                                                                <td>Mentor</td>
                                                                {i.status == 0 && new Date(i.due_date) > new Date() ? (
                                                                    <td><button onClick={() => {
                                                                        showModal2()
                                                                        setUploadID(i.id)
                                                                    }} class="btn btn-light-petrol btn-xs btn-squared">Upload</button></td>
                                                                ): (
                                                                    <td>
                                                                        <div className="">
                                                                            {/* <img src={word_img} className="me-20" /> */}
                                                                            <span onClick={() => {
                                                                            i?.files.split("|").map((j)=>{
                                                                                console.log(j)
                                                                                window.open(j, "_blank")
                                                                            })
                                                                        }} style={{marginRight:'30px', fontWeight:'bold', textDecoration:'underline', cursor:'pointer'}} className="color-dark">View</span>
                                                                            { new Date(i.due_date) > new Date() && (

                                                                            <img onClick={() => {
                                                                                showModal3()
                                                                                setWorksheetDeleteID(i.id)
                                                                            }} src={delete_img} className="" />
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        {/* <tbody>
                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={word_img} className="me-20" />
                                                                        <img src={delete_img} className="" />
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-light-petrol btn-xs btn-squared">Upload</button></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-light-petrol btn-xs btn-squared">Upload</button></td>
                                                            </tr>

                                                        </tbody> */}
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

            {/* <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Worksheet</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Name of the worksheet" />
                            </div>

                            <div className="col-md-12 mb-25">
                                <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Due By" />
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Mentees</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <label for="formFile" className="form-label">File</label>
                                <input className="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" className="btn btn-petrol btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal> */}

        <Modal show={showHello} onHide={closeModal}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Write a feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
                <form onSubmit={feedbackSubmit}>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
                placeholder="Write..."
                required
              ></textarea>

              <div className="layout-button mt-15">
                <div className="btn_center">
                  <button
                //   onClick={() => feedbackSubmit()}
                    type="submit"
                    className="btn btn-light-petrol btn-default btn-squared"
                  >
                    Send
                  </button>
                </div>
              </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showHello3} onHide={closeModal3}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
              Are you sure you want to delete this worksheet?
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
                    deleteWorksheet()
                  }}
                  type="button"
                  className="btn btn-light-petrol btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showHello2} onHide={closeModal2}>
                <Modal.Header className='mentor_feedback' closeButton>
                    <Modal.Title>Upload Worksheet</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={uploadWorksheetReply}>
                        <div className="row">
                           
                            <div className="col-md-12 mb-25">
                                <label for="formFile" className="form-label">File</label>
                                <input 
                                    className="form-control ip-gray radius-xs b-deep px-15" 
                                    type="file" 
                                    id="customFile"
                                    multiple 
                                    onChange={(event) => {
                                        // setImageLocal(event.target.files)
                                        uploadWorksheetInputReply(event.target.files)
                                    }} />
                                    {worksheetNameArray && worksheetNameArray.map((i)=> (
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <p>{i}</p>
                                        <p style={{cursor:'pointer', color:'red'}} onClick={() =>{}}>Delete</p>
                                    </div>
                                    ))}
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="submit" className="btn btn-petrol btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Progress_Program;
