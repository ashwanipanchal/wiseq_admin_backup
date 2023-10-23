import clock_img from '../../img/mentee_user.svg';
import resources_img from '../../img/programs.png';
import { useEffect, useState } from 'react';
import Side_Bar from './sidebar';
import pdf_img from "../../img/pdf_file.svg";
import word_img from "../../img/word.svg";
import csv_img from "../../img/csv.svg";
import picture_img from "../../img/picture.svg";
import { NavLink, useLocation } from "react-router-dom";
import moment from 'moment'
import { BASE_URL } from "../../services/Config";

const data = [
    { id: 1, mentoring_hours: "Assigned Program", mentoring_num: "High Potential Mentor..." },
    { id: 2, mentoring_hours: "Audience", mentoring_num: "40" },
];

function Check_Verify() {
    const {state} = useLocation()
    console.log(state)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [learningDetails, setLearningDetails] = useState({})
    const [worksheetList, setWorksheetList] = useState([])
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

    useEffect(() => {
        getProfile()
    },[])
    
    const getProfile = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state.learningId}/profile?userId=${state.learnerId}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("learning profile", response)
        if(response.success){
            setLearningDetails(response.data)
            if(response.data?.menteeFeedback?.worksheets != null){
                let totalWorksheet = response.data?.menteeFeedback?.worksheets?.split(",")
                console.log(totalWorksheet)
                setWorksheetList(totalWorksheet)
              }
        }
    }

    const getImageIcon = (i) => {
        // console.log(i)
        // return
        if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "png" || i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "jpg"){
          return picture_img
        }
        if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "pdf"){
          return pdf_img
        }
        if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "csv"){
          return csv_img
        }
        if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "doc"){
          return word_img
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">{learningDetails && learningDetails.learningName}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="">
                                    <div className="blog-details-thumbnail mb-25">
                                        <img src={learningDetails.learningImg} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Summary</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.summary}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.growthScore}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceType}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceName}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Link</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceLink}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skill(s) Addressed</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        {learningDetails && learningDetails.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                                        {/* <span className="badge badge-square btn-outline-orange me-10">Business Presentation</span>
                                        <span className="badge badge-square btn-outline-orange me-10">Presentation Skill</span> */}
                                    </ul>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finish by</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(learningDetails.finishBy).format("DD MMMM YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Duration</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.duration}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    {/* <p className="color-dark fs-14 fw-300 align-center mb-0">High Potential Mentoring Program</p> */}
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Worksheet/Assignment Needed?</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.isWorksheetNeeded}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Comments about Worksheet/Assignment</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.worksheetComments}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Learning’s Rating</p>
                                    <span className="badge badge-round btn-primary mt-10">{learningDetails && learningDetails.learningRating}<i className="lar la-star user_star"></i></span>
                                </div>

                                <div className="row">
                                    <div className="col-md-3 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Rating</p>
                                        <span className="badge badge-round btn-primary mt-10">{learningDetails && learningDetails.menteeFeedback?.menteeRating}<i className="lar la-star user_star"></i></span>
                                    </div>

                                    <div className="col-md-3 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.growthScore}</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="col-md-6">
                                <div className="row">
                                    {data.map((user) => (
                                        <div className="col-xxl-6 col-sm-6 mb-25">
                                            <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                                                <div className="overview-content w-100">
                                                    <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                        <div className="ap-po-details__titlebar">
                                                            <p>{user.mentoring_hours}</p>
                                                            <h6>{user.mentoring_num}</h6>
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

                                    <div className="col-xxl-6 col-sm-6 mb-25">
                                        <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                            <div className="overview-content w-100">
                                                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                    <div className="ap-po-details__titlebar">
                                                        <p>Verified Assessment</p>
                                                        <h2 className="color-status half_done">40</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Feedback</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.menteeFeedback?.menteeFeedback}</p>
                            </div>

                            <div className="col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-2">Worksheet/Assignment Files Uploaded By Mentee</p>
                                <div className="row">
                                {worksheetList && worksheetList.map((i) => (
                                    <div style={{cursor:"pointer"}} 
                                    onClick={()=> window.open(i, "_blank")}
                                     className="col-md-2"
                                    //  onClick={console.log(i.split('.').pop())}
                                     >
                                        <div className="blog-details-meta ms-1 box_shadow1 py-10 px-10">
                                            <img src={getImageIcon(i)} className="me-10" />
                                            <span className="admin_name color-status">View File</span>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>

                            <div className="col-md-12 feed_border">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Your Feedback</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.menteeFeedback?.assigneeFeedback}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Check_Verify;
