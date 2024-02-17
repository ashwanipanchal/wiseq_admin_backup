import moment from 'moment';
import clock_img from '../../../img/mentoring_pro.svg';
import resources_img from '../../../img/programs.png';
import { BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import Side_Bar from './sidebar';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import path from "../../../img/Path.png";


function Upcoming_Program() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullDetails, setFullDetails] = useState()
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

    const myRef = useRef(null);

    useEffect(()=>{
        getFullDetails()
    },[myRef])
        const getFullDetails = async() => {
            const token = await localStorage.getItem("program_token_node")
            const body = {
                "program_id":state?.program_id,
                "id": state?.id
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
                myRef.current.innerHTML = response?.program?.summary; 
            }
            // https://www.wiseq.co/ndwiseqbackend/api/program/template-list
          
        }

        
    const changeStatus = async(value) =>{
        const token = await localStorage.getItem("program_token_node")
        const body = {
            "status":value,
            "id":state?.id,
            "program_id":state?.program_id
        }
        console.log(body)
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/user-accept-program`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": token,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("program list", response)
        getFullDetails()
        if(response.success){
            alert("Program accepted successfully")
           getFullDetails()
        }
        // https://www.wiseq.co/ndwiseqbackend/api/program/template-list
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
                                        <button type="button" className="btn btn-primary btn-default btn-squared">{state?.program_model?.participation == 1 ? "Mandatory" : "Optional"}</button>
                                        {fullDetails?.userstatus?.status == 0 && state?.program_model?.participation == 0 && (
                                            <>
                                            <button type="button" onClick={() => changeStatus(1)} className="btn btn-petrol btn-squared color-primary">Accept</button>
                                            <button type="button" onClick={() => changeStatus(3)}className="btn btn-master btn-squared color-primary">Decline</button>
                                            </>
                                        )}
                                        {fullDetails?.userstatus?.status == 1 && state?.program_model?.participation == 0 && (
                                            <>
                                            <button type="button" className="btn btn-petrol btn-squared color-primary">Accepted</button>
                                            </>
                                        )}
                                        {fullDetails?.userstatus?.status == 0 && state?.program_model?.participation == 1 && (
                                            <button type="button" onClick={() => changeStatus(1)} className="btn btn-petrol btn-squared color-primary">Acknowledge</button>
                                        )}
                                        {fullDetails?.userstatus?.status == 1 && state?.program_model?.participation == 1 && (
                                            <button type="button"  className="btn btn-petrol btn-squared color-primary">Acknowledged</button>
                                        )}
                                        {/* <button type="button" className="btn btn-petrol btn-squared color-primary">Acknowledge</button> */}
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
                                    <p className="color-dark fs-14 fw-300 align-center mb-0" ref={myRef}>
                                        {/* {fullDetails && fullDetails.program?.summary} */}
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

                                <p className="color-blue fs-12 fw-500 align-center mb-20 view_more">View More Info</p>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Mandatory Assessments</h4>

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
                                    <div class="col-lg-12">
                                        <h4 class="text-capitalize fw-500 mb-20">My Program Mentees</h4>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-25">
                                        <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                            <div className="overview-content w-100">
                                                <div className=" ap-po-details-content">
                                                    <div className="ap-po-details__titlebar text-center">
                                                        <p className="color-gray fs-16 fw-500">Not Yet Assigned</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Skills I am Mentoring on</p>
                                        <ul className="d-flex flex-wrap user-group-people__parent">
                                            <span className="badge badge-square btn-outline-orange me-10">Leadership Skills</span>
                                            <span className="badge badge-square btn-outline-orange me-10"> Individual Core</span>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            {/* <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" className="btn btn-petrol btn-default btn-squared m-auto">Acknowledge</button>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Upcoming_Program;
