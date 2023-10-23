import Side_Bar from './sidebar';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Program_Settings() {

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

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);


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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Program Settings</h4>
                                        </div>
                                    </div>
                                    <div className="layout-button">
                                        <NavLink className="navbar-link" to="/add_mentors"><button type="button" className="btn btn-primary btn-default btn-squared">Add Mentors</button></NavLink>
                                        <NavLink className="navbar-link" to="/add_mentees"><button type="button" className="btn btn-outline-primary btn-squared color-primary">Add Mentees</button></NavLink>
                                    </div>
                                </div>
                            </div>



                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Mandatory Learnings</h2>
                                            </div>
                                            <div className="layout-button">
                                                <NavLink className="navbar-link" to="/mandatory_learning"><button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Request Worksheets</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm" onClick={showModal}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Mandatory Assessments</h2>
                                            </div>
                                            <div className="layout-button">
                                                <NavLink className="navbar-link" to="/mandatory_assessments"><button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Schedule Inaugural Session</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Schedule a group session</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Cohort Schedule</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Schedule Reminders</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Send Email Messages</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="layout-button">
                                <div className="btn_center">
                                    <button type="button" className="btn btn-outline-primary btn-squared color-primary">Preview</button>
                                    <button type="button" className="btn btn-primary btn-default btn-squared">Publish</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Worksheets</Modal.Title>
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

                            <div className="col-md-12 mb-20">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Mentors</option>
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

export default Program_Settings;
