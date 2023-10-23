import question_img from '../../../img/questions.svg';
import clock_img from '../../../img/learning.svg';
import team_img from '../../../img/tm1.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Progress_banner from '../../screen_components/progress_banner'

const data = [
    { id: 1, session_name: "Sessions Reports", session_para: "Know the overall status and impact of mentoring and training sessions conducted in the platform for your company.", generate_btn: "Generate Report" },
    { id: 2, session_name: "Mentoring Program Reports", session_para: "Know the overall status and impact of mentoring and training sessions conducted in the platform for your company.", generate_btn: "Generate Report" },
    { id: 3, session_name: "Feedback and Ratings Reports", session_para: "Know the overall status and impact of mentoring and training sessions conducted in the platform for your company.", generate_btn: "Generate Report" },
    { id: 4, session_name: "Learnings Report", session_para: "Know the overall status and impact of mentoring and training sessions conducted in the platform for your company.", generate_btn: "Generate Report" },
    { id: 5, session_name: "Assessments Report", session_para: "Know the overall status and impact of mentoring and training sessions conducted in the platform for your company.", generate_btn: "Generate Report" },
    { id: 6, session_name: "Worksheets", session_para: "Know the overall status and impact of mentoring and training sessions conducted in the platform for your company.", generate_btn: "Generate Report" },
];

const data1 = [
    { id: 1, mentoring_name: "Impact and Outcomes" },
];

function Report_Screen() {

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
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Progress Report</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                {/* <div className="card card-default card-md">
                                    <div className="row">
                                        {data.map((user) => (

                                            <div className="col-lg-4 col-md-12 col-sm-12 mb-25">
                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                    <div className="card-header border-0">
                                                        <h6 className="session_report">{user.session_name}</h6>
                                                    </div>

                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                        <div className="card-timeline-body">
                                                            <div className="card-timeline-body__left">
                                                                <div className="card-timeline-body__title">
                                                                    <p>{user.session_para}</p>
                                                                </div>
                                                            </div>

                                                            <div className="mt-10">
                                                                <button type="button" className="btn btn-default btn-squared btn-petrol w-100">{user.generate_btn}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}


                                        {data1.map((user) => (

                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                    <div className="card-header border-0">
                                                        <h6 className="session_report">{user.mentoring_name}</h6>
                                                    </div>

                                                    <div className="card-body">
                                                        <div className="card-timeline-body">
                                                            <div className="card-timeline-body__left">
                                                                <div className="card-timeline-body__title">

                                                                    <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                        <div className="">
                                                                            <p className="color-dark fs-16 fw-300 align-center mb-0">Impact and Outcomes</p>
                                                                        </div>

                                                                        <div className="">
                                                                            <p className="color-status fs-14 fw-500 align-center mb-0">View Details</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                        <div className="">
                                                                            <p className="color-dark fs-16 fw-300 align-center mb-0">Impact Score</p>
                                                                        </div>

                                                                        <div className="">
                                                                            <p className="color-status fs-14 fw-500 align-center mb-0">View Details</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                        <div className="">
                                                                            <p className="color-dark fs-16 fw-300 align-center mb-0">Engagement </p>
                                                                        </div>

                                                                        <div className="">
                                                                            <p className="color-status fs-14 fw-500 align-center mb-0">View Details</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                        <div className="">
                                                                            <p className="color-dark fs-16 fw-300 align-center mb-0">Insights</p>
                                                                        </div>

                                                                        <div className="">
                                                                            <p className="color-status fs-14 fw-500 align-center mb-0">View Details</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                        <div className="">
                                                                            <p className="color-dark fs-16 fw-300 align-center mb-0">Growth and Happiness Index</p>
                                                                        </div>

                                                                        <div className="">
                                                                            <p className="color-status fs-14 fw-500 align-center mb-0">View Details</p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}

                                    </div>

                                </div> */}
                                <Progress_banner/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Report_Screen;
