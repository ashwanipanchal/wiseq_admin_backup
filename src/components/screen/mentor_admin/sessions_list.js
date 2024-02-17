import search_img from '../../../img/svg/search1.svg';
import edit_img from '../../../img/svg/edit.svg';
import delete_img from '../../../img/svg/delete.svg';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment'
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import Modal from 'react-bootstrap/Modal';

const data = [
    { id: 1, date_time: "Wed, Dec 14, 202205:30 PM IST", mentee_name: "Jane Arora", session: "28", skill_mentored: "HR Strategy", objective: "Objective 1", type: "MentoringProgram" },
    { id: 2, date_time: "Wed, Dec 14, 202205:30 PM IST", mentee_name: "Jane Arora", session: "28", skill_mentored: "HR Strategy", objective: "Objective 1", type: "MentoringProgram" },
];


function Session_list() {
    const navigate = useNavigate()
    const [sessions, setSessions] = useState([])
    const [pendingSessions, setPendingSessions] = useState([])
    const [payload, setPayload] = useState({});
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    useEffect(() => {
        getSessions()
        getExtraSessions()
    }, [])

    const getSessions = async () => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}session`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success, data } = response
        if (success) {
            setSessions(data)
        }

    }
    const getExtraSessions = async () => {
        const token = await localStorage.getItem("program_token_node")
        const btoken = `Bearer ${token}`;
        const body = {
            "condition":["pending"]//"('accepted','pending','rejected')"
        }
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/program-sessions`, {
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
        const { success, allsession } = response
        console.log(allsession)
        if (success) {
            setPendingSessions(allsession)
        }

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

    const wordsTruncate = (words, length) => {
        // console.log(words)
        words = words?.trim(); //you need to decied wheather you do this or not
        length -= 6; // because ' (...)'.length === 6
        if (length >= words?.length) return words;
      
        let oldResult = /\s/.test(words?.charAt(length));
        for (let i = length - 1; i > -1; i--) {
          const currentRusult = /\s/.test(words?.charAt(i))
      
          //check if oldresult is white space and current is not.
          //which means current character is end of word
          if (oldResult && !currentRusult) {
            return `${words?.substr(0, i + 1)} (...)`;
          }
          oldResult = currentRusult;
        }
        // you need to decide whether you will just return truncated or original
        // in case you want original just return word
        return '(...)';
      }


      
    const acceptSession = async (val) => {
        // alert(JSON.stringify(val))
        //     return
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body = {
            status: val == 0 ? "rejected" : "accepted"
        }
        const res = await fetch(`${BASE_URL}session/requests/${payload.session_id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        const { success } = response
        if (success) {
            // getSessionRequest()
            closeModal1()
            getSessions()
            getExtraSessions()
            // getNotificationCount()
        }
  
    }


    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">Pending Sessions</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="userDatatable w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                <th>
                                                    <span className="userDatatable-title">S No.</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Date & Time</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Mentee</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Session No.</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Skills Mentored</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Objective</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Program Name</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end"></span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {pendingSessions && pendingSessions?.map((user,index) => (
                                                <>
                                                    <tr className="box_shadow1">
                                                        <td>
                                                            <div className="userDatatable-content">
                                                            1
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {new Date(user?.sessions_model.schedule_time).toDateString()}<br />
                                                                {new Date(`${user?.sessions_model?.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}
                                                                {/* {moment(`${user?.sessions_model?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")} */}
                                                                 {user?.sessions_model?.time_zone?.charAt(0) == "+" || "-" ? `GMT ${user?.sessions_model?.time_zone}` : user?.sessions_model?.time_zone}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.scheduler?.name}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.sessions_model.session_number}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.skills}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {wordsTruncate(user?.objective, 30)}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.programName}
                                                            </div>
                                                        </td>

                                                        <td>

                                                           
                                                            {/* <button onClick={() => navigate('/live_session_profile', { state: user })} className="btn btn-petrol ment_btn">
                                                                Join
                                                            </button> */}
                                                            <button onClick={() => {
                                                                setPayload(user)
                                                                showModal1()
                                                            }} className="btn btn-petrol ment_btn">
                                                               Accept Session
                                                            </button>

                                                        </td>
                                                        {/* <td>
                                                            <button onClick={() => { navigate('/edit_calendar', { state: user }) }} className="btn btn-icon btn-warning btn-squared">
                                                                <img src={edit_img} alt="layers" className="svg" />
                                                            </button>
                                                        </td> */}

                                                    </tr>
                                                    <br />
                                                </>


                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">Upcoming Sessions</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="userDatatable w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                <th>
                                                    <span className="userDatatable-title">S No.</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Date & Time</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Mentee</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Session No.</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Skills Mentored</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Objective</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Program Name</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end"></span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {sessions && sessions.upcoming?.map((user,index) => (
                                                <>
                                                    <tr className="box_shadow1">
                                                        <td>
                                                            <div className="userDatatable-content">
                                                            {sessions.expired?.length + ( index+1)}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {/* {moment(user.scheduleTime).format('ddd, MMM DD, YYYY')}<br /> */}
                                                                {new Date(user.scheduleTime).toDateString()}<br />
                                                                {/* {moment(user.scheduleTime).format(' HH:MM ') + "IST"} */}
                                                                {new Date(user.scheduleTime).toLocaleTimeString()} {user.timeZone.charAt(0) == "+" || "-" ? `GMT ${user.timeZone}` : user.timeZone}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.scheduler.name}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.sessionNumber}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.skills}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {wordsTruncate(user.objective, 30)}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.programName}
                                                            </div>
                                                        </td>

                                                        <td>

                                                            {/* <NavLink className="" to="/live_session_profile">
                                                                    <button className="btn btn-petrol">
                                                                        Join
                                                                    </button>
                                                                </NavLink> */}
                                                            <button onClick={() => navigate('/live_session_profile', { state: user })} className="btn btn-petrol ment_btn">
                                                                Join
                                                            </button>

                                                        </td>
                                                        <td>
                                                            <button onClick={() => { navigate('/edit_calendar', { state: user }) }} className="btn btn-icon btn-warning btn-squared">
                                                                <img src={edit_img} alt="layers" className="svg" />
                                                            </button>
                                                        </td>

                                                    </tr>
                                                    <br />
                                                </>


                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            

                            <div className="col-lg-12">
                                <h4 class="text-capitalize fw-500 mb-20">Past Sessions</h4>
                            </div>

                            <div className="userDatatable w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                <th>
                                                    <span className="userDatatable-title">S No.</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Date & Time</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Mentee</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Session No.</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Skills Mentored</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Objective</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Program Name</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end"></span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {sessions && sessions.expired?.map((user, index) => (
                                                <>
                                                    <tr className="box_shadow1">
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {sessions.expired?.length - index}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {/* {moment(user.scheduleTime).format('ddd, MMM DD, YYYY')}<br />
                                                                {moment(user.scheduleTime).format(' HH:MM ') + "IST"} */}
                                                                {/* {new Date(user.scheduleTime)} */}
                                                                {/* {moment(user.scheduleTime).format('ddd, MMM DD, YYYY')}<br /> */}
                                                                {new Date(user.scheduleTime).toDateString()}<br />
                                                                {/* {moment(user.scheduleTime).format(' HH:MM ') + "IST"} */}
                                                                {new Date(user.scheduleTime).toLocaleTimeString()}  {Array.from(user.timeZone)[0] == "+" || "-" ? `GMT ${user.timeZone}` : user.timeZone}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.scheduler.name}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.sessionNumber}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.skills}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                            {wordsTruncate(user.objective, 30)}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.programName}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <button onClick={() => navigate('/past_session_profile', { state: user })} className="btn px-15 btn-petrol">
                                                                Access Session
                                                            </button>


                                                        </td>
                                                    </tr>
                                                    <br />
                                                </>


                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello1} onHide={closeModal1}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Do you want to accept this session invitation?</h4>
                        <h4 class="text-capitalize fw-600 mb-25">Session Details: {new Date(payload?.sessions_model?.schedule_time).toDateString()} {new Date(`${payload?.sessions_model?.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}</h4>

                        <div class="layout-button justify-content-center">
                            <button onClick={() => acceptSession(0)} type="button" className="btn btn-no btn-default btn-squared">Reject</button>
                            <button onClick={() => acceptSession(1)} type="button" className="btn btn-yes btn-default btn-squared">Accept</button>
                            {/* <button onClick={() => navigate('/edit_calender')} type="button" className="btn btn-yes btn-default btn-squared">Accept</button> */}
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Session_list;
