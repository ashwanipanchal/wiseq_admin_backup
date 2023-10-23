
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import pdf_img from "../../img/pdf_file.svg";
import word_img from "../../img/word.svg";
import csv_img from "../../img/csv.svg";
import picture_img from "../../img/picture.svg";
import moment from 'moment'
import { BASE_URL } from "../../services/Config";
// import mentees_home from '../../img/mentees_home.svg';
// import mentee_home from '../../img/mentee_home.svg';

function Check_Learning_Mentee() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [feedback, setFeedback] = useState("")
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

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    useEffect(() => {
        getProfile()
    },[])
    const getProfile = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state.learningId}/profile?userId=${state.menteeId}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("learning profile in check learning", response)
        if(response.success){
            setLearningDetails(response.data)
            if(response.data?.menteeFeedback?.worksheets != null){
                let totalWorksheet = response.data?.menteeFeedback?.worksheets.split(",")
                console.log(totalWorksheet)
                setWorksheetList(totalWorksheet)
              }
        }
    }

        const doneChecking = async() => {
        const btoken = `Bearer ${token}`;
        const body = {
            "menteeId": state.menteeId,
            "assigneeFeedback": feedback
          }
        const res = await fetch(`${BASE_URL}learnings/${state.learningId}/check-verify`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("check learning response", response)
        if(response.success){
            // setLearningDetails(response.data)
            navigate(-1)
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Check Learning</h4>
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

                            <div className="col-lg-6 col-md-12 col-sm-12">

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Title</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.learningName}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Summary</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.summary}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.growthScore}</p>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceType}</p>
                                    </div>

                                    <div className="col-md-4 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Source Name</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceName}</p>
                                    </div>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skill(s) Addressed</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        {learningDetails && learningDetails.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                                        {/* <span class="badge badge-square btn-outline-orange me-10">Business Presentation</span>
                                        <span class="badge badge-square btn-outline-orange me-10">Presentation Skill</span> */}
                                    </ul>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finish by</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && moment(learningDetails.finishBy).format("DD MMMM YYYY")}</p>
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
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Learning’s Rating</p>
                                    <span className="badge badge-round btn-primary mt-10">{learningDetails && learningDetails.learningRating}<i className="lar la-star user_star"></i></span>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Comments about Worksheet/Assignment added by you</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.worksheetComments}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Rating</p>
                                    <span className="badge badge-round btn-primary mt-10">{learningDetails && learningDetails.menteeFeedback?.menteeRating}<i className="lar la-star user_star"></i></span>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Feedback</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.menteeFeedback?.menteeFeedback}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-2">Worksheet/Assignment Files Uploaded By Mentee</p>
                                    <div className="row">
                                        {worksheetList && worksheetList.map((i) => (
                                            <div style={{cursor:"pointer"}} onClick={()=> window.open(i, "_blank")} className="col-md-3">
                                            <div className="blog-details-meta ms-1 box_shadow1 py-10 px-10">
                                                <img src={getImageIcon(i)} className="me-10" />
                                                <span className="admin_name color-status">View File</span>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25 feed_border">
                                <label>Add Your Feedback</label>
                                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="4" placeholder="write here...."></textarea>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    
                                        <button onClick={() => doneChecking()} type="button" className="btn btn-primary btn-default btn-squared m-auto">Checked and Verified</button>
                                   
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div className="row">
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
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Program</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select by function</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select by Level</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <input type="date" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Finish By" />
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" className="btn btn-primary btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Check_Learning_Mentee;
