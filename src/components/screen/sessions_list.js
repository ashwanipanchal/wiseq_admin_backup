import search_img from '../../img/svg/search1.svg';
import edit_img from '../../img/svg/edit.svg';
import delete_img from '../../img/svg/delete.svg';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import moment from 'moment'
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
const data = [
    { id: 1, date_time: "Wed, Dec 14, 202205:30 PM IST", mentee_name: "Jane Arora", session: "28", skill_mentored: "HR Strategy", objective: "Objective 1", type: "MentoringProgram" },
    { id: 2, date_time: "Wed, Dec 14, 202205:30 PM IST", mentee_name: "Jane Arora", session: "28", skill_mentored: "HR Strategy", objective: "Objective 1", type: "MentoringProgram" },
];


function Session_list() {
    const navigate = useNavigate()
    const {state} = useLocation()
    // console.log(state)
    const [sessions, setSessions] = useState([])
    const [expiredSessions, setExpiredSessions] = useState([])
    const [upcomingSessions, setUpcomingSessions] = useState([])
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
        getSessions()

    }, [])

    const getSessions = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
          "program_id":state?.id,
      });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-sessions`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success){
                setExpiredSessions(result.ExpiredSessions)
                setUpcomingSessions(result.UpcomingSessions)
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));

    }

    console.log(upcomingSessions)
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
            return `${words?.substr(0, i + 1)} (...)`;
          }
          oldResult = currentRusult;
        }
        // you need to decide whether you will just return truncated or original
        // in case you want original just return word
        return '(...)';
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
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">Upcoming Sessions</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="userDatatable w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                {/* <th>
                                                    <span className="userDatatable-title">S No.</span>
                                                </th> */}
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
                                                    <span className="userDatatable-title">Type</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end"></span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {upcomingSessions && upcomingSessions?.map((user,index) => (
                                                <>
                                                    <tr className="box_shadow1">
                                                        {/* <td>
                                                            <div className="userDatatable-content">
                                                            {sessions?.length + ( index+1)}
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {/* {new Date(user?.session?.schedule_time).toDateString()}<br />
                                                                {new Date(user?.session?.schedule_time).toLocaleTimeString()} {user?.timeZone?.charAt(0) == "+" || "-" ? `GMT ${user?.timeZone}` : user?.timeZone} */}
                                                                {new Date(user?.session.schedule_time).toDateString()}<br />
                                                                {new Date(`${user?.session?.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}
                                                                {/* {moment(`${user?.session?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")} */}
                                                                 {user?.session?.time_zone?.charAt(0) == "+" || "-" ? `GMT ${user?.session?.time_zone}` : user?.session?.time_zone}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.scheduler?.name}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.session?.session_number}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.session?.skills}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {wordsTruncate(user?.session?.objective, 30)}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user?.session?.type}
                                                            </div>
                                                        </td>

                                                        <td>

                                                            {/* <NavLink className="" to="/live_session_profile">
                                                                    <button className="btn btn-petrol">
                                                                        Join
                                                                    </button>
                                                                </NavLink> */}
                                                            <button onClick={() => {
                                                                if(user?.session?.type == "inaugural"){

                                                                    navigate('/live_session_profile', { state: user })
                                                                }else{
                                                                    
                                                                    navigate('/live_session_profile', { state: user })
                                                                }
                                                            }
                                                                } className="btn btn-primary ment_btn">
                                                                Join
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

                            <div className="col-lg-12">
                                <h4 class="text-capitalize fw-500 mb-20">Past Sessions</h4>
                            </div>

                            <div className="userDatatable w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                {/* <th>
                                                    <span className="userDatatable-title">S No.</span>
                                                </th> */}
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
                                                    <span className="userDatatable-title">Type</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end"></span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {expiredSessions && expiredSessions?.map((user, index) => (
                                                <>
                                                    <tr className="box_shadow1">
                                                        {/* <td>
                                                            <div className="userDatatable-content">
                                                                {sessions?.length - index}
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            {/* <div className="userDatatable-content"> */}
                                                               {/* {new Date(user?.session?.schedule_time).toDateString()}<br />
                                                                {new Date(user?.session?.schedule_time).toLocaleTimeString()} {user?.timeZone?.charAt(0) == "+" || "-" ? `GMT ${user?.timeZone}` : user?.timeZone}  */}
                                                                <div className="userDatatable-content">
                                                                {new Date(user?.session.schedule_time).toDateString()}<br />
                                                                {new Date(`${user?.session?.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}
                                                                {/* {moment(`${user?.session?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")} */}
                                                                 {user?.session?.time_zone?.charAt(0) == "+" || "-" ? `GMT ${user?.session?.time_zone}` : user?.session?.time_zone}
                                                            </div>
                                                               
                                                            {/* </div> */}
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.scheduler?.name}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                            {user?.session?.session_number}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                            {user?.session?.skills}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                            {wordsTruncate(user?.session?.objective, 30)}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                            {user?.session?.type}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <button onClick={() => navigate('/past_session_profile', { state: user })} className="btn px-15 btn-primary">
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
        </div>

    );
}

export default Session_list;
