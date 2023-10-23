import clock_img from '../../../img/arc.svg';
import checks_img from '../../../img/checks.svg';
import education_img from '../../../img/educationsss.svg';
import achievement_img from '../../../img/achiess.svg';
import suitcase_img from '../../../img/suitcasess.svg';
import linkdin_img from '../../../img/linkdin.svg';
import website_img from '../../../img/website.svg';
import team_img from '../../../img/tm1.png';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink, useLocation } from "react-router-dom";

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

function Mentee_Program_progress() {
    const {state} = useLocation()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [testimonial, setTestimonial] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token"))
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
                // getProfile()
              }
              
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
                                        <img src={team_img} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                        <div>
                                            <h3 className="fw-500 mb-2">{state.name}</h3>
                                            <p className="fs-13 color-light mb-0">{state.jobTitle}</p>
                                        </div>
                                    </div>

                                    <div class="layout-button">
                                        <button type="button" className="btn btn-outline-petrol btn-squared color-petrol px-15">Assign a Learning</button>
                                        <button type="button" className="btn btn-petrol btn-squared color-primary px-15">Assign an Assessment</button>
                                        <button type="button" onClick={() => showModal()}  className="btn btn-outline-petrol btn-squared color-petrol px-15">Write a Testimonial</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">

                                <div className="col-lg-12 col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Mentoring on</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        <span className="badge badge-square btn-outline-orange me-10">HR Strategy & Budgeting</span>
                                        <span className="badge badge-square btn-outline-orange me-10">Public Speaking</span>
                                    </ul>
                                </div>

                                <div className="col-lg-12 col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">High Performance Mentoring Program</p>
                                </div>

                                <div className="col-lg-12 col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Duration</p>
                                    <div class="tag-box">
                                        <span class="dm-tag tag-primary"></span>
                                        <span class="dm-tag tag-primary"></span>
                                        <span class="dm-tag tag-primary"></span>
                                        <span class="dm-tag tag-primary"></span>
                                        <span class="dm-tag tag-primary"></span>
                                        <span class="dm-tag tag-light"></span>
                                        <span class="dm-tag tag-light"></span>
                                        <span class="dm-tag tag-light"></span>
                                        <span class="dm-tag tag-light"></span>
                                        <span class="dm-tag tag-light"></span>
                                        <span class="dm-tag tag-light"></span>
                                        <span class="dm-tag tag-light"></span>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">3 Months Completed Out of 8 Months</p>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Session Completed</p>
                                    <div className="d-flex flex-wrap user-group-people__parent justify-content-between">
                                        <span className="color-dark fs-14 fw-300 align-center mb-0">4</span>
                                        <span className="color-green fs-14 fw-300 align-center mb-0">View Details</span>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Learnings Completed</p>
                                    <div className="d-flex flex-wrap user-group-people__parent justify-content-between">
                                        <span className="color-dark fs-14 fw-300 align-center mb-0">2</span>
                                        <span className="color-green fs-14 fw-300 align-center mb-0">View Details</span>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Assessments Completed</p>
                                    <div className="d-flex flex-wrap user-group-people__parent justify-content-between">
                                        <span className="color-dark fs-14 fw-300 align-center mb-0">1</span>
                                        <span className="color-green fs-14 fw-300 align-center mb-0">View Details</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20"></div>

                            <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                                <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                                    <div className="card-header px-0 border-0">
                                        <h6>Skills Progression on HR Strategy & Budgeting</h6>
                                    </div>
                                    <div className="card-body p-0">
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                                <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                                    <div className="card-header px-0 border-0">
                                        <h6>Skills Progression on Public Speaking</h6>
                                    </div>
                                    <div className="card-body p-0">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
          <Modal.Header className="mentor_feedback" closeButton>
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
                    className="btn btn-petrol btn-squared color-primary px-15"
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

export default Mentee_Program_progress;
