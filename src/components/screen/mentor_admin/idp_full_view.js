import clock_img from '../../../img/mentoring_pro.svg';
import resources_img from '../../../img/programs.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function Idp_Full_View() {

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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const paymentShow = () => setShow(true);

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

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
                                    <div class="layout-button">
                                        <button type="button" className="btn btn-outline-petrol btn-default btn-squared" onClick={showModal}>Give Feedback</button>
                                        <button type="button" className="btn btn-petrol btn-squared color-primary" onClick={paymentShow}>Approve</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">IDP Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Lorem Ipsum</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Jane Arora</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Experience Gaps</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Lack of opportunity...</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Development Activity</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">I have been chosen...</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Start Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">27/01/23</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Support/Resource</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Mentor, Self...</p>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row">

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">OM - Collaboration</p>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Skills </p>
                                        <ul className="d-flex flex-wrap user-group-people__parent">
                                            <span className="badge badge-square btn-outline-orange me-10">Public Speaking</span>
                                            <span className="badge badge-square btn-outline-orange me-10">Business Presentation</span>
                                        </ul>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Development Objective</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">To present impactfully...</p>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Measure</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">Meetings</p>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">End Date</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">27/01/23</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Approve</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div class="col-md-12 mb-25">
                                <input type="text" class="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Write your Initials" />
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <NavLink className="navbar-link" to="/idp_approved"><button type="button" className="btn btn-petrol btn-default btn-squared m-auto">Send Approval</button></NavLink>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div class="col-md-12 mb-25">
                                <textarea class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Write..."></textarea>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" className="btn btn-petrol btn-default btn-squared m-auto">Send</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Idp_Full_View;
