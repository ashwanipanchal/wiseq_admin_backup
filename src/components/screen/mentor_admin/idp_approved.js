import signature_img from '../../../img/your_sig.svg';
import mentee_img from '../../../img/mentee_sig.svg';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

function Idp_Approved() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Individual Development Plan</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row line">
                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">IDP Name</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">Lorem Ipsum</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">OM - Collaboration</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Mentor Name</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">Jane Arora</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Skills</p>
                                <ul className="d-flex flex-wrap user-group-people__parent">
                                    <span className="badge badge-square btn-outline-orange me-10">Public Speaking</span>
                                    <span className="badge badge-square btn-outline-orange me-10">Business Presentation</span>
                                </ul>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Experience Gaps</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">Lack of opportunity...</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Development Objective</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">To present impactfully...</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Development Activity</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">I have been chosen...</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Measure</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">Meetings</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Start Date</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">27/01/23</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">End Date</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">27/01/23</p>
                            </div>

                            <div className="col-lg-6 col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Support/Resource</p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">Mentor, Self...</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12 mb-20 mt-20">
                            <p className="color-gray fs-14 fw-300 align-center mb-0">Your Feedback</p>
                            <p className="color-dark fs-14 fw-300 align-center mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-sm-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Your Signature</p>
                                <img src={signature_img} className="svg mt-2" />
                            </div>

                            <div className="col-lg-3 col-md-12 col-sm-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Signature</p>
                                <img src={mentee_img} className="svg mt-2" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12 mb-20">
                            <p className="color-gray fs-14 fw-300 align-center mb-0">Status</p>
                            <p className="color-tuar fs-14 fw-600 align-center mb-0">Approved</p>
                        </div>
                    </div>
                </div>
            </div>
            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Idp_Approved;
