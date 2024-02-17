import resources_img from '../../img/programs.png';
import Side_Bar from './sidebar';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Iframe from 'react-iframe';
import moment from 'moment';
import path from "../../img/Path.png";

function Profile_View() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)

    const myRef = useRef(null);
    useEffect(() => {
        myRef.current.innerHTML = state?.summary; 
    }, [myRef])

    
    const [sideBarOpen, setSideBarOpen] = useState(true)
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
                                color: "#F8A046",
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">{state.name}</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" class="btn btn-primary btn-default btn-squared">{state.participation == "1" ? "Mandatory" : "Optional"}</button>
                                        {/* <NavLink className="" to="/program_preview"> */}
                                            <button type="button" onClick={() => navigate("/edit_program",{state:state})} class="btn btn-outline-primary btn-squared color-primary">Edit</button>
                                            {/* </NavLink> */}
                                        <NavLink className="" to="/program_settings" state={{ myState: "created", data:state }}><button type="button" class="btn btn-outline-primary btn-squared color-primary">Program Settings</button></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="">
                                    <div className="mb-25">
                                        <img style={{display: 'block', margin: 'auto'}} src={state.image} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Overview</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program ID</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">-</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.name}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills Covered</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        {state.skills?.split(",").map((i, index)=>(
                                            <span key={index} class="badge badge-square btn-outline-orange me-10 mb-10">{i}</span>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Objectives:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.objective}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Duration:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.duration}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.type}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Total Sessions:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.no_of_sessions}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Summary:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0" ref={myRef}>
                                    </p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Participation</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Eligibility</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.eligibility}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Participation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.participation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentees</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.no_of_mentees}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.no_of_mentor}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Metrics</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score for Mentees</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.growthscore_mentee}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Impact Score for Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.impactscore_mentor}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Evaluation Metrics</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.define_evalutaion}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Learnings</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.define_learnings}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Assessments</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.define_assessment}</p>
                                </div>
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Creation of IDP</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{state.idp_creation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Schedule</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Start Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(state.start_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program End Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(state.end_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Cut off date for confirmation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(state.cutt_off).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Proposed Graduation Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(state.proposed_graduation).format("DD MMM, YYYY")}</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Profile_View;
