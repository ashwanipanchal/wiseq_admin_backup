import edit_img from '../../../img/clockss.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const data = [
    { id: 1, mentoring_hours: "Sessions Scheduled", mentoring_num: "40" },
    { id: 2, mentoring_hours: "Sessions Completed", mentoring_num: "30" },
    { id: 3, mentoring_hours: "Learnings Completed", mentoring_num: "20" },
    { id: 4, mentoring_hours: "Assessments Completed", mentoring_num: "15" },
];

const data1 = [
    { id: 1, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
    { id: 2, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
    { id: 3, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
    { id: 4, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
];

function Program_Statistics() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">High Potential Employee Mentoring Program</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" className="btn btn-petrol btn-default btn-squared px-15">Generate Detailed Report</button>
                                    </div>

                                </div>
                            </div>

                            <div className="col-xxl-3 col-sm-3 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                            <div className="ap-po-details__titlebar">
                                                <NavLink className="navbar-link" to="/program_progress"><h2 className="program_pro">Program Progress</h2></NavLink>
                                            </div>

                                            <div className="ap-po-details__icon-area">
                                                <div className="svg-icon">
                                                    <CircularProgressbar
                                                        value={"44"}
                                                        text={`44%`}
                                                        styles={{
                                                            // Rotation of path and trail, in number of turns (0-1)
                                                            rotation: 0.25,

                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap: 'butt',

                                                            // Text size
                                                            textSize: '18px',

                                                            // How long animation takes to go from one percentage to another, in seconds
                                                            pathTransitionDuration: 0.5,

                                                            // Can specify path transition in more detail, or remove it entirely
                                                            // pathTransition: 'none',

                                                            // Colors
                                                            pathColor: `rgba(253, 239, 230, ${66 / 100})`,
                                                            textColor: '#f8a046',
                                                            trailColor: '#f8a046',
                                                            backgroundColor: '#f8a046',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6">
                                <div className="row">
                                    {data.map((user) => (
                                        <div className="col-xxl-3 col-sm-3 mb-25">
                                            <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                                <div className="overview-content w-100">
                                                    <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                        <div className="ap-po-details__titlebar">
                                                            <p>{user.mentoring_hours}</p>
                                                            <h2>{user.mentoring_num}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))}

                                </div>
                            </div>

                            <div className="col-xxl-3 col-sm-3 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                            <div className="ap-po-details__titlebar">
                                                <p>Program Ratings</p>
                                                <h2><i class="las la-star color-warning fs-20"></i> 4.5</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <h4 className="text-capitalize fw-500 mb-25">Program History</h4>

                            <div className="col-lg-6 col-sm-12 col-md-12 mb-25">
                                <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                                    <div className="card-body p-0">
                                        <div className="tab-content">
                                            <div className="project-task table-responsive table-responsive--dynamic">
                                                <table className="table table-borderless mb-1">
                                                    <tbody>

                                                        {data1.map((user) => (

                                                            <tr className="project-task-list program_history">
                                                                <td>
                                                                    <div className="notifi1">
                                                                        <div className="event-Wrapper">
                                                                            <div className="event-Wrapper__left">
                                                                                <div className="event-wrapper-item">
                                                                                    <img src={edit_img} className="svg" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="event-Wrapper__right">
                                                                                <h6>{user.task_para}</h6>
                                                                                <span>{user.task_date}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>


                                                        ))}

                                                    </tbody>
                                                </table>
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

export default Program_Statistics;
