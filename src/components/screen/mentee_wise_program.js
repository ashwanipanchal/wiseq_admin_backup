import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

function Mentee_Wise_Program() {

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
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="crm mb-25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Mentee Wise Progress</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" className="btn btn-primary btn-default btn-squared px-15">Generate Detailed Report</button>
                                    </div>
                                </div>
                            </div>


                            <div className="col-xxl-12 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                            <div className="ap-po-details__titlebar">
                                                <p>Mentee name</p>
                                                <h5>Jane Arora</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Sessions Completed</p>
                                                <h5>20</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Learnings Completed</p>
                                                <h5>30</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Assessments Completed</p>
                                                <h5>10</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-12 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                            <div className="ap-po-details__titlebar">
                                                <p>Mentee name</p>
                                                <h5>Jane Arora</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Sessions Completed</p>
                                                <h5>20</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Learnings Completed</p>
                                                <h5>30</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Assessments Completed</p>
                                                <h5>10</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-12 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                            <div className="ap-po-details__titlebar">
                                                <p>Mentee name</p>
                                                <h5>Jane Arora</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Sessions Completed</p>
                                                <h5>20</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Learnings Completed</p>
                                                <h5>30</h5>
                                            </div>

                                            <div className="ap-po-details__titlebar">
                                                <p>Assessments Completed</p>
                                                <h5>10</h5>
                                            </div>
                                        </div>
                                    </div>
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

export default Mentee_Wise_Program;
