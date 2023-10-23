import clock_img from '../../../img/mentee_user.svg';
import resources_img from '../../../img/programs.png';
import { useEffect, useState } from 'react';
import pdf_img from '../../../img/pdf_file.svg';
import Side_Bar from './sidebar';
import { NavLink } from "react-router-dom";

const data = [
    { id: 1, mentoring_hours: "Assigned Program", mentoring_num: "High Potential Mentor..." },
    { id: 2, mentoring_hours: "Audience", mentoring_num: "40" },
];

function Check_Verify_assessment() {

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
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Checked and Verified</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-lg-12 col-md-12">
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills Assessed</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        <span className="badge badge-square btn-outline-orange me-10">SWOT</span>
                                        <span className="badge badge-square btn-outline-orange me-10">Competency</span>
                                        <span className="badge badge-square btn-outline-orange me-10">Communication</span>
                                        <span className="badge badge-square btn-outline-orange me-10">Leadership</span>
                                    </ul>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Linkedin</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Assigned By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Kristina Kris</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Duration</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">45 mins</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finished By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">23 Oct, 2022</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Self Assessment</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">20</p>
                                </div>
                            </div>

                            <div className="col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-2">Files Uploaded By Mentee</p>
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="blog-details-meta ms-1 box_shadow1 py-10 px-10">
                                            <img src={pdf_img} className="me-10" />
                                            <span className="admin_name color-status">View File</span>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="blog-details-meta ms-1 box_shadow1 py-10 px-10">
                                            <img src={pdf_img} className="me-10" />
                                            <span className="admin_name color-status">View File</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 feed_border">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Your Feedback</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Check_Verify_assessment;
