import search_img from '../../../img/svg/search1.svg';
import edit_img from '../../../img/svg/edit.svg';
import delete_img from '../../../img/svg/delete.svg';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment'
import Modal from "react-bootstrap/Modal";
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
const data = [
    { id: 1, date_time: "Wed, Dec 14, 202205:30 PM IST", mentee_name: "Jane Arora", session: "28", skill_mentored: "HR Strategy", objective: "Objective 1", type: "MentoringProgram" },
    { id: 2, date_time: "Wed, Dec 14, 202205:30 PM IST", mentee_name: "Jane Arora", session: "28", skill_mentored: "HR Strategy", objective: "Objective 1", type: "MentoringProgram" },
];


function Session_list() {
    const navigate = useNavigate()
    const [sessions, setSessions] = useState([])
    const [deletedID, setDeleteID] = useState({})
    const [payload, setPayload] = useState({});
    const [pendingSessions, setPendingSessions] = useState([])
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [reason, setReason] = useState("")
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    const [showHello2, setShowHello2] = useState(false);
    const closeModal2 = () => setShowHello2(false);
    const showModal2 = () => setShowHello2(true);

    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

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
        words = words?.trim(); //you need to decied wheather you do this or not
        length -= 6; // because ' (...)'.length === 6
        if (length >= words?.length) return words;
      
        let oldResult = /\s/.test(words?.charAt(length));
        for (let i = length - 1; i > -1; i--) {
          const currentRusult = /\s/.test(words?.charAt(i))
      
          //check if oldresult is white space and current is not.
          //which means current character is end of word
          if (oldResult && !currentRusult) {
            return `${words.substr(0, i + 1)} (...)`;
          }
          oldResult = currentRusult;
        }
        // you need to decide whether you will just return truncated or original
        // in case you want original just return word
        return '(...)';
      }
      
    const checkIfMentorAccept = (user) => {
        if(user.sessionUsers.length > 0){
            navigate('/live_session_profile', { state: user })
        }else{
            showModal()
        }
    }


    const removeSession =async () => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        if(reason.length == 0){
            alert("Please enter your reason")
            return
        }
        const body = {
            reason
        }
        const res = await fetch(`${BASE_URL}session/remove-session/${deletedID.id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log(response)
        const { success, data } = response
        if (success) {
            getSessions()
            closeModal1()
        }
        
    }
    // console.log(Array.from(moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).zoneAbbr())[0])

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
            closeModal2()
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
                                                    <span className="userDatatable-title">Mentor</span>
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
                                                            {sessions.expired?.length + ( index+1)}
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
                                                                {/* {user.sessionUsers[0]?.name} */}
                                                                {/* {user?.sessionUsers[0]?.name || ""} */}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                            {user?.sessions_model.session_number}
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

                                                        <td style={{display:'flex'}}>
                                                            <button onClick={() => {
                                                                setPayload(user)
                                                                showModal2()
                                                            } } className="btn btn-light-petrol ment_btn">
                                                                Accept Session
                                                            </button>
                                                            {/* <button type='button' onClick={() => {
                                                                setDeleteID(user)
                                                                showModal1()
                                                            }  } class="btn btn-icon btn-danger btn-squared ms-10">
                                                                <img src="/admin/static/media/delete.b1b3f65b6ae97f82f445da289c28da65.svg" alt="layers" class="svg"></img>
                                                                </button> */}
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
                                                    <span className="userDatatable-title">Mentor</span>
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
                                                                {moment(user.scheduleTime).format('ddd, MMM DD, YYYY')}<br />
                                                                {moment(user.scheduleTime).format(' hh:mm A ')} {Array.from(moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).zoneAbbr())[0] == "+" ? `GMT ${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).zoneAbbr()}` : moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).zoneAbbr() }
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {/* {user.sessionUsers[0]?.name} */}
                                                                {user?.sessionUsers?.length > 0 ? user?.sessionUsers?.map((i) => (
                                                                    i.name
                                                                ))  :""}
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

                                                        <td style={{display:'flex'}}>
                                                            <button onClick={() => checkIfMentorAccept(user) } className="btn btn-light-petrol ment_btn">
                                                                Join
                                                            </button>
                                                            <button type='button' onClick={() => {
                                                                setDeleteID(user)
                                                                showModal1()
                                                            }  } class="btn btn-icon btn-danger btn-squared ms-10"><img src="/admin/static/media/delete.b1b3f65b6ae97f82f445da289c28da65.svg" alt="layers" class="svg"></img></button>
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
                                                    <span className="userDatatable-title">Mentor</span>
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
                                                                {moment(user.scheduleTime).format('ddd, MMM DD, YYYY')}<br />
                                                                {moment(user.scheduleTime).format(' hh:mm A ')} {Array.from(moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).zoneAbbr())[0] == "+" ? `GMT ${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).zoneAbbr()}` : moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).zoneAbbr() }
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.sessionUsers[0]?.name}
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
                                                            <button onClick={() => navigate('/past_session_profile', { state: user })} className="btn px-15 btn-light-petrol ment_btn">
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

            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
        <Modal.Header className="mentee_feedback" closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5 class="text-capitalize fw-600 mb-20">
            Looks like your mentor is yet to accept the session invitation. As soon as the mentor accepts the invitation you would be able to join.
            </h5>
        </div>
        </Modal.Body>
      </Modal>

      <Modal show={showHello1} onHide={closeModal1}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
                Are you sure you want to delete this session?
                 {/* with {deletedID ? deletedID.sessionUsers[0]?.name : ""} on {deletedID ? moment(deletedID.scheduleTime).format('ddd, MMM DD, YYYY'): ""} at {deletedID ? moment(deletedID.scheduleTime).format(' hh:mm A '): ""}? */}
              </h4>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                class="form-control ip-gray radius-xs b-deep px-15"
                id="exampleFormControlTextarea1"
                rows="4"
                placeholder="Please enter your reason..."
            ></textarea>

              <div style={{marginTop:'10px'}} class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal1()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() => removeSession()}
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        
        <Modal show={showHello2} onHide={closeModal2}>
                <Modal.Header className="mentee_feedback" closeButton>
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
