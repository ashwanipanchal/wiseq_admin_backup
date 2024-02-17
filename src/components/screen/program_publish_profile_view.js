import moment from 'moment';
import clock_img from '../../img/mentee_user.svg';
import resources_img from '../../img/programs.png';
import { BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import Side_Bar from './sidebar';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import path from "../../img/Path.png";

function Program_Publish() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [data, setData] = useState([
        { id: 1, mentoring_hours: "Mentees Invited", mentoring_num: "50" },
        { id: 2, mentoring_hours: "Mentors Invited", mentoring_num: "30" },
        { id: 3, mentoring_hours: "Mentees Confirmed", mentoring_num: "40" },
        { id: 4, mentoring_hours: "Mentors Confirmed", mentoring_num: "25" },
    ]);
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullProgram, setFullProgram] = useState({})
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const myRef = useRef(null);


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
        getFullDetails()
    },[myRef])
    
    const getFullDetails = async() => {
        var myHeaders = new Headers();
          myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "program_id": state?.id,
        });
    
          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };
    
          fetch(`${BASE_URL_APPLSURE_MENTORING}program-details`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log("full program details",result)
              setFullProgram(result)
              setData([
                { id: 1, mentoring_hours: "Mentees Invited", mentoring_num: result.totalmenteeinvite },
                { id: 2, mentoring_hours: "Mentors Invited", mentoring_num: result.totalmentorinvite },
                { id: 3, mentoring_hours: "Mentees Confirmed", mentoring_num: result.totalmenteeaccepted},
                { id: 4, mentoring_hours: "Mentors Confirmed", mentoring_num: result.totalmentoraccepted },
            ])
            // console.log(result?.program?.summary)
            myRef.current.innerHTML = result?.program?.summary;
          })
          .catch(error => console.log('error', error));
    }

    const goToSceen = (index) => {
        console.log(state.data)
        // return
        if(index == 0) {
            navigate("/edit_mentees", {state: { myState: state }})
        }
        if(index == 1) {
            navigate("/edit_mentors", {state: { myState: state }})
        }
        if(index == 2) {
            navigate("/confirmed_participants", {state: { myState: state }})
        }
        if(index == 3) {
            navigate("/confirmed_participants", {state: { myState: state }})
        }
    }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className=" d-flex flex-wrap breadcrumb-main__wrapper">
                                    <p
                                    onClick={() => navigate(-1)}
                                    style={{
                                    marginRight: "10px",
                                    color: "#7A7A7A",
                                    fontWeight: "400",
                                    lineHeight: "22px",
                                    cursor: "pointer",
                                    }}
                                >
                                    Mentoring Programs
                                </p>
                                <img
                                    style={{
                                    marginRight: "10px",
                                    width: "6px",
                                    height: "13px",
                                    marginTop: "6px",
                                    }}
                                    src={path}
                                />
                                <p
                                    style={{
                                    color: "#F8A046",
                                    fontWeight: "400",
                                    lineHeight: "22px",
                                    
                                    }}
                                >
                                    Profile
                                </p>
                                    </div>
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">{fullProgram && fullProgram.program?.name}</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" className="btn btn-primary btn-default btn-squared">Mandatory</button>
                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Edit</button>
                                        <NavLink className="navbar-link" to="/program_settings" state={{ myState: "published", data:state }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Program Settings</button></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="">
                                    <div className="mb-25">
                                        <img style={{display: 'block', margin: 'auto'}} src={fullProgram?.program?.image} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Overview</h4>
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program ID</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">#{fullProgram && fullProgram.program?.program_id}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.name}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills Covered</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        {fullProgram?.program?.skills?.split(",").map((i, index)=>(
                                            <span key={index} class="badge badge-square btn-outline-orange me-10 mb-10">{i}</span>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Objectives:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.objective}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Duration:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.duration}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.type}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Total Sessions:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">-</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Summary:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0"  ref={myRef}>
                                    {/* // {fullProgram && fullProgram.program?.summary} */}
                                    </p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Participation</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Eligibility</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.eligibility}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Participation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.participation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentees</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.no_of_mentees}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.no_of_mentor}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Metrics</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score for Mentees</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.growthscore_mentee}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Impact Score for Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.impactscore_mentor}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Evaluation Metrics</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.define_evalutaion}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Learnings</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.define_learnings}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Assessments</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.define_assessment}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Creation of IDP</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.idp_creation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>
                                

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Schedule</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Start Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.start_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program End Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.end_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Cut off date for confirmation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.cutt_off).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Proposed Graduation Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.proposed_graduation).format("DD MMM, YYYY")}</p>
                                </div>

                                {/* <h4 className="text-capitalize fw-500 mb-25 program_par_org">Mandatory Learnings</h4>

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

                                <p className="color-orange fs-12 fw-500 align-center mb-20 view_more">View More Info</p>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Mandatory Assessments</h4>

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

                                <p className="color-orange fs-12 fw-500 align-center mb-20 view_more">View More Info</p> */}

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Inaugural Session</h4>
                                {fullProgram && fullProgram?.inaugralsession?.length > 0 && (
                                    <>
                                        <div className="col-md-12 mb-20">
                                            <p className="color-gray fs-14 fw-300 align-center mb-0">Date</p>
                                            <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram.inaugralsession.map((i) => (
                                                <p>
                                                    {moment(i?.schedule_time).format("DD MMM, YYYY")}
                                                </p>
                                            ))}</p>
                                        </div>

                                        <div className="col-md-12 mb-20">
                                            <p className="color-gray fs-14 fw-300 align-center mb-0">Time</p>
                                            <p className="color-dark fs-14 fw-300 align-center mb-0">
                                            {fullProgram.inaugralsession.map((i) => (
                                                <p>
                                                    {/* {moment(`${i?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")} */}
                                                    {new Date(`${i.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}
                                                </p>
                                            ))}</p>
                                        </div>
                                    </>
                                )}

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Cohort Session Schedule</h4>

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
                                                        {fullProgram && fullProgram?.cohartsessionlist?.map((i)=>(
                                                            <tr>
                                                                <td>{i?.session?.session_number}</td>
                                                                <td>-</td>
                                                                <td>{i.mentors[0]?.name.substring(
                                                                            0,
                                                                            8
                                                                          )}
                                                                          {i.mentors[0]?.name.length >
                                                                          8
                                                                            ? "..."
                                                                            : "" }
                                                                            {`${
                                                                              i.mentors.length > 1
                                                                                ? ` + ${
                                                                                    i.mentors
                                                                                      .length - 1
                                                                                  }`
                                                                                : ""
                                                                            }`}</td>
                                                                <td>{moment(i?.session?.schedule_time).format("DD MMM, YYYY")}</td>
                                                                <td>{new Date(`${i?.session?.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}</td>
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

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    {data.map((user,index) => (
                                        <div style={{cursor:'pointer'}} onClick={() => {
                                            goToSceen(index)
                                        }} className="col-xxl-6 col-sm-6 mb-25">
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

                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-25">
                                        <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                            <div className="overview-content w-100">
                                                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                    <div className="ap-po-details__titlebar">
                                                        <p>Match-Making Status</p>
                                                        <h2 className="color-orange half_done">{fullProgram?.totalmatchmaking}</h2>
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
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Program_Publish;
