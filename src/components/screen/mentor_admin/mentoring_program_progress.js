import clock_img from '../../../img/mentoring_pro.svg';
import team_img from '../../../img/tm1.png';
import pdf_img from '../../../img/pdf_file.svg';
import resources_img from '../../../img/programs.png';
import word_img from '../../../img/word.svg';
import delete_img from '../../../img/deletes.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const data = [
    { id: 1, mentoring_hours: "Program Mentees", mentoring_num: "50" },
    { id: 2, mentoring_hours: "Program Mentors", mentoring_num: "30" },
];

const data1 = [
    { id: 1, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Key Skills", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning & Development", mentee_one: "+1" },
    { id: 2, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Key Skills", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning & Development", mentee_one: "+1" },
];

function Progress_Program() {

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
                <div className="blog-page2">
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
                                        <button type="button" className="btn btn-outline-petrol btn-default btn-squared">Mandatory</button>
                                        <button type="button" className="btn btn-petrol btn-squared color-primary">Give Feedback</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="">
                                    <div className="blog-details-thumbnail mb-25">
                                        <img src={resources_img} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Overview</h4>
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program ID</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">#12345</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">High Potential Employee Mentoring Program</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills Covered</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        <span className="badge badge-square btn-outline-orange me-10">Leadership Skills</span>
                                        <span className="badge badge-square btn-outline-orange me-10"> Individual Core</span>
                                        <span className="badge badge-square btn-outline-orange me-10">Business Skills</span>
                                    </ul>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Objectives:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">To Develop leadership skills and efficiency skills.</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Duration:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">8 months</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">One on One</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Total Sessions:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">16</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Summary:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Learn from experience and advice of leaders through knowledge sharing and guidance. This program is designed for those who aspire to confidently lead large teams and make key decisions for business.
                                        Through this program you would be able to :
                                        Develop business skills that you want to improve
                                        Develop core skills that are required
                                        Understand what your next role entails
                                        Work on your IDP
                                    </p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Participation</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Eligibility</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Pre-defined</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Participation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Mandatory</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentees allowed</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">20</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">10</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Metrics</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score for Mentees</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">200</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Impact Score for Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">300</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Evaluation Metrics</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">-</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Learnings</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">-</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Assessments</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">-</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Schedule</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Start Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">1 Nov, 2022</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program End Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">30 Jun, 2023</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Cut off date for confirmation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Proposed Graduation Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Mandatory Learnings</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Title</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Public Speaking</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">External</p>
                                </div>

                                <div className="col-md-12 mb-15">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finished By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <p className="color-blue fs-12 fw-500 align-center mb-20 view_more">View More Info</p>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Mandatory Assessments</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Title</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Public Speaking</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">External</p>
                                </div>

                                <div className="col-md-12 mb-15">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finished By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <p className="color-blue fs-12 fw-500 align-center mb-20 view_more">View More Info</p>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Inaugural Session</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Time</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">10:00 AM</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Cohort Session Schedule</h4>

                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>S No.</th>
                                                                <th>Title</th>
                                                                <th>Mentor Name</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Session 1</td>
                                                                <td>Public Speaking</td>
                                                                <td>Santosh Bala</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>10:00 AM</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Session 2</td>
                                                                <td>Public Speaking</td>
                                                                <td>Santosh Bala</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>10:00 AM</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Session 3</td>
                                                                <td>Public Speaking</td>
                                                                <td>Santosh Bala</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>10:00 AM</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="col-lg-6 col-md-12 col-sm-12">

                                <div className="col-xxl-6 col-sm-6 mb-25">
                                    <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                        <div className="overview-content w-100">
                                            <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                <div className="ap-po-details__titlebar">
                                                    <h2 className="program_pro">Program Progress</h2>
                                                </div>

                                                <div className="ap-po-details__icon-area">
                                                    <div className="svg-icon">
                                                        <CircularProgressbar
                                                            value={"48"}
                                                            text={`48%`}
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
                                <div className="row">
                                    {data.map((user) => (
                                        <div className="col-xxl-6 col-sm-6 mb-25">
                                            <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                                                <div className="overview-content w-100">
                                                    <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                        <div className="ap-po-details__titlebar">
                                                            <p>{user.mentoring_hours}</p>
                                                            <h2>{user.mentoring_num}</h2>
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
                                </div>

                                <div className="col-lg-12">
                                    <div className="breadcrumb-main user-member justify-content-sm-between">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">My Program Mentees</h4>
                                        <div class="view_all text-center"><a href="#" class="dropdown-wrapper__more color-green">View All</a></div>
                                    </div>
                                </div>

                                <div className="row">
                                    {data1.map((user) => (
                                        <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                            <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                                <div className="media user-group-media d-flex justify-content-between">
                                                    <div className="media-body d-flex align-items-center">
                                                        <img src={team_img} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                        <div>
                                                            <a href="#">
                                                                <h6 className="mt-0  fw-500">{user.mentee_name}</h6>
                                                            </a>
                                                            <p className="fs-13 color-light mb-0">{user.mentee_position}</p>
                                                            <span className="badge badge-round btn-petrol mt-10">{user.mentee_number}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-group-people">
                                                    <p className="mt-15">{user.mentee_skill}</p>
                                                    <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                                        <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_employee}</span>
                                                        <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                                        <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_learning}</span>
                                                        <span className="badge badge-square btn-outline-emlpoy">{user.mentee_one}</span>
                                                    </ul>
                                                </div>
                                                <div className="layout-button">
                                                    <NavLink className="navbar-link flex-grow-1 me-10" to="/mentee_profile"><button type="button" className="btn btn-default btn-squared color-primary btn-outline-petrol w-100">View Profile</button></NavLink>
                                                    <NavLink className="navbar-link flex-grow-1" to="/mentee_profile"><button type="button" className="btn btn-petrol btn-default btn-squared w-100">Chat</button></NavLink>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills I am Mentoring on</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        <span className="badge badge-square btn-outline-orange me-10">Leadership Skills</span>
                                        <span className="badge badge-square btn-outline-orange me-10"> Individual Core</span>
                                    </ul>
                                </div>

                                <div class="col-md-12 mb-20">
                                    <button type="button" class="btn btn-default btn-squared color-primary btn-outline-petrol w-100" onClick={showModal}>Request Worksheet(s)</button>
                                </div>

                                <div class="col-md-12 mb-20">
                                    <button type="button" class="btn btn-petrol btn-default btn-squared w-100">Assign a Learning</button>
                                </div>

                                <div class="col-md-12 mb-40">
                                    <button type="button" class="btn btn-petrol btn-default btn-squared w-100">Assign an Assessment</button>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Worksheets Requested By Admin</h4>

                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Worksheet Name</th>
                                                                <th>Due Date</th>
                                                                <th>Requested by</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-petrol btn-xs btn-squared">Download</button></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-petrol btn-xs btn-squared">Download</button></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-petrol btn-xs btn-squared">Download</button></td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Upload Worksheets Requested By Admin</h4>

                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Worksheet Name</th>
                                                                <th>Due Date</th>
                                                                <th>Requested by</th>
                                                                <th>File</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={word_img} className="me-20" />
                                                                        <img src={delete_img} className="" />
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-petrol btn-xs btn-squared">Upload</button></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Admin Name</td>
                                                                <td><button class="btn btn-petrol btn-xs btn-squared">Upload</button></td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par">Worksheets Requested By Me</h4>

                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Worksheet Name</th>
                                                                <th>Due Date</th>
                                                                <th>Requested by</th>
                                                                <th>File</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Santosh Bala</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={word_img} className="me-10" />
                                                                        <span className="color-dark">abcd.doc</span>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Santosh Bala</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={pdf_img} className="me-10" />
                                                                        <span className="color-dark">abcd.pdf</span>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Public Speaking</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>Santosh Bala</td>
                                                                <td>
                                                                    <div className="">
                                                                        <img src={pdf_img} className="me-10" />
                                                                        <span className="color-dark">abcd.pdf</span>
                                                                    </div>
                                                                </td>
                                                            </tr>

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
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Worksheet</Modal.Title>
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

                            <div className="col-md-12 mb-25">
                                <label for="formFile" className="form-label">File</label>
                                <input className="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" className="btn btn-petrol btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Progress_Program;
