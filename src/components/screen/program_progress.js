import clock_img from '../../img/clocks.svg';
import team_img from '../../img/tm1.png';
import edit_img from '../../img/history.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import moment from 'moment';





function Program_Progress1() {
  const navigate = useNavigate()
    const {state} = useLocation()
    console.log("state in program progress", state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullDetails, setFullDetails] = useState({})
    const [data, setData] = useState([
      { id: 1, mentoring_hours: "Sessions Scheduled", mentoring_num: "40" },
      { id: 2, mentoring_hours: "Sessions Completed", mentoring_num: "30" },
      { id: 3, mentoring_hours: "Learnings Completed", mentoring_num: "20" },
      { id: 4, mentoring_hours: "Assessments Completed", mentoring_num: "15" },
  ]);
    const [data2, setData2] = useState([
      { id: 1, mentoring_hours: "Mentees", mentoring_num: "40" },
      { id: 2, mentoring_hours: "Mentors", mentoring_num: "30" },
      { id: 3, mentoring_hours: "Avg. Session Score by Mentors", mentoring_num: "20" },
      { id: 4, mentoring_hours: "Avg. Session Score by Mentees", mentoring_num: "15" },
  ]);

  const [data1, setData1] = useState([
    { id: 1, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
    { id: 2, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
    { id: 3, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
    { id: 4, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
]);
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

    useEffect(() => {
      getStats()
  },[])

  const getStats = async () => {
      const token = await localStorage.getItem("program_token_node")
      const body = {
          "program_id":state?.state?.id
      }
      const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}program-stats`, {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": token,
          },
          body:JSON.stringify(body)
      })
      const response = await res.json()
      console.log(response)
      // const { success, allsession } = response
      // console.log(allsession)
      if (response.success) {
          setData([
              { id: 1, mentoring_hours: "Sessions Scheduled", mentoring_num: response.totalsessions },
              { id: 2, mentoring_hours: "Sessions Completed", mentoring_num: response.totalsessionscompleted },
              { id: 3, mentoring_hours: "Learnings Completed", mentoring_num: response.totallearningcompleted },
              { id: 4, mentoring_hours: "Assessments Completed", mentoring_num: response.totallassement },
          ])
        //   setData1([
        //     { id: 1, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
        //     { id: 2, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
        //     { id: 3, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
        //     { id: 4, task_para: "Learning Added by admin", task_date: "02 Feb,23 10:05" },
        // ])
          setFullDetails(response)
      }

  }

    const changeFilter = (e) => {
        console.log(e)
        if(e == "Mentee Wise Progress - Sessions"){
          window.open(
            `https://www.wiseq.co/ndwiseqbackend/api/MentorScheduledCompletedProgram?program_id=${state?.state?.id}`,
            "_blank"
          );
        }
        if(e == "Mentee Wise Progress - Learnings"){

        }
        if(e == "Audience Wise Progress - Worksheets"){
          window.open(
            `https://www.wiseq.co/ndwiseqbackend/api/WorksheetReportProgram?program_id=${state?.state?.id}`,
            "_blank"
          );
        }
        if(e == "View Worksheets"){
            navigate("/view_worksheets", {state:state?.state?.id})
        }
        
    }

    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded mt-30"
        >
          <div className="crm mb-25">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          {state?.state?.name}
                        </h4>
                      </div>
                    </div>
                    {/* <div class="layout-button">
                                    <div className="col-lg-4 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Location</option>
                                                        <option value="delhi">New Delhi</option>
                                                        <option value="mumbai">Mumbai</option>
                                                    </select>
                                                </div>
                                            </div>
                                        <NavLink className="navbar-link" to="/mentee_wise_program"><button type="button" className="btn btn-outline-primary btn-squared color-primary px-15">Mentee Wise Progress</button></NavLink>
                                        <NavLink className="navbar-link" to="/view_worksheets" state={state?.state?.id}><button type="button" className="btn btn-primary btn-default btn-squared px-15">View Worksheets</button></NavLink>
                                        <button type="button" className="btn btn-primary btn-default btn-squared px-15">Generate Detailed Report</button>
                                    </div> */}
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <form
                        action="#"
                        className="d-flex align-items-center add-contact__form my-sm-0 my-2 bg-transparent"
                      >
                        <select
                          className="form-select custom_selects"
                          aria-label="Default select example"
                          onChange={(e) => changeFilter(e.target.value)}
                        >
                          <option value="">Select Report</option>
                          <option value="Mentee Wise Progress - Sessions">Mentee Wise Progress - Sessions</option>
                          <option value="Mentee Wise Progress - Learnings">Mentee Wise Progress - Learnings</option>
                          <option value="Audience Wise Progress - Worksheets">Audience Wise Progress - Worksheets</option>
                          <option value="View Worksheets">View Worksheets</option>
                        </select>
                      </form>
                      <div style={{marginLeft:'30px'}} className="d-flex align-items-center add-contact__title justify-content-center me-sm-2">
                        <div className="action-btn">
                          <a href="#" className="btn px-15 btn-primary">
                            Generate Detailed Report
                          </a>
                        </div>
                        <span className="sub-title ms-sm-25 ps-sm-25"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-sm-3 mb-25">
                  <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                    <div className="overview-content w-100">
                      <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                        <div className="ap-po-details__titlebar">
                          
                            <h2 className="program_pro">Program Progress</h2>
                          
                        </div>

                        <div className="ap-po-details__icon-area">
                          <div className="svg-icon">
                            <CircularProgressbar
                              value={parseInt(fullDetails?.totolprogress).toFixed()}
                              text={`${parseInt(fullDetails?.totolprogress).toFixed()}%`}
                              styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                // rotation: 0.25,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",

                                // Text size
                                textSize: "18px",

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor:"#F8A046",
                        textColor: "#323232",
                        trailColor: "#fdefe6",
                              })}
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

                {data2.map((user,index) => (
                                        <div style={{cursor:'pointer'}} onClick={() => {
                                            // goToSceen(index)
                                        }} className="col-xxl-3 col-sm-3 mb-25">
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
                {/* <div className="col-xxl-3 col-sm-3 mb-25">
                  <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                    <div className="overview-content w-100">
                      <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                        <div className="ap-po-details__titlebar">
                          <p>Program Ratings</p>
                          <h2>
                            <i class="las la-star color-warning fs-20"></i> {fullDetails?.rating?.overallAverageRating == null ? 0 : parseInt(fullDetails?.rating?.overallAverageRating)}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <h4 className="text-capitalize fw-500 mb-25">
                  Program History
                </h4>

                <div className="col-lg-6 col-sm-12 col-md-12 mb-25">
                  <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                    <div className="card-body p-0">
                      <div className="tab-content">
                        <div className="project-task table-responsive table-responsive--dynamic">
                          <table className="table table-borderless mb-1">
                            <tbody>
                              {fullDetails && fullDetails?.activitylog?.map((user) => (
                                <tr className="project-task-list program_history">
                                  <td>
                                    <div className="notifi1">
                                      <div className="event-Wrapper">
                                        <div className="event-Wrapper__left">
                                          <div className="event-wrapper-item">
                                            <img
                                              src={edit_img}
                                              className="svg"
                                            />
                                          </div>
                                        </div>
                                        <div className="event-Wrapper__right">
                                          <h6>{user.message}</h6>
                                          <span>{moment(user.created_at).format("DD MMM, YY HH:MM")}</span>
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

        <Side_Bar
          onClick={toggle}
          sideBarOpen={
            windowSize.innerWidth > 768 && sideBarOpen
              ? true
              : windowSize.innerWidth > 768 && !sideBarOpen
              ? false
              : windowSize.innerWidth < 768 && sideBarOpen
              ? false
              : true
          }
        />
      </div>
    );
}

export default Program_Progress1;
