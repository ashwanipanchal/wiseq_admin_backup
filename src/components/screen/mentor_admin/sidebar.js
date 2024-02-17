import search_img from '../../../img/search_header.svg';
import dark_logo from '../../../img/wise.svg';
import toggle_img from '../../../img/svg/align-center-alt.svg';
import home_img from '../../../img/sidebar_icon/home.svg';
import activity_icon from '../../../img/activity_icon.svg';
import wiseuser_img from '../../../img/sidebar_icon/wise_user.svg';
import package_img from '../../../img/sidebar_icon/package.svg';
import onboard_img from '../../../img/sidebar_icon/onboard1.svg';
import organsiation_img from '../../../img/sidebar_icon/organisation.svg';
import resources_img from '../../../img/sidebar_icon/resource.svg';
import program_img from '../../../img/sidebar_icon/program.svg';
import payment_img from '../../../img/sidebar_icon/payment.svg';
import customize_img from '../../../img/sidebar_icon/customize.svg';
import report_img from '../../../img/sidebar_icon/report.svg';
import survey_img from '../../../img/sidebar_icon/survey.svg';
import setting_img from '../../../img/sidebar_icon/settings.svg';
// import message_img from '../../../img/messagess.svg';
import { BASE_URL, BASE_URL_APPLSURE } from '../../../services/Config';
import message_img from '../../../img/chat_mentor_mentee.svg';
import team_img from '../../../img/team-1.png';
import alarm_img from '../../../img/notificationss.svg';
import authornav_img from '../../../img/user_pic.png';
import search1_img from '../../../img/svg/search.svg';
import x_img from '../../../img/svg/search.svg';
import vertical_img from '../../../img/svg/more-vertical.svg';
import powered_logo from '../../../img/powered_logo.svg';
import notificationbell_img from '../../../img/notification_bells.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import EventEmitter from "reactjs-eventemitter";
import { io } from "socket.io-client";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Side_bar({ onClick, sideBarOpen, notificationCount }) {
    // console.log("notificationCount in side bar from home", notificationCount)
    const navigate = useNavigate()
    const [showHello, setShowHello] = useState(false);
    const [menteeSearch, setmenteeSearch] = useState("")
    const [notificationValue, setnotificationValue] = useState("")
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);
    const [showMoreOption, setShowMoreOption] = useState(false);
    const [showNotification, setShowNotofication] = useState(false)
    const [notificationData, setNotificationData] = useState([])
    const [activities, setActivities] = useState([])
    const [chatList, setChatList] = useState([])
    const [NotificationId, setNotoficationId] = useState("");
    const [payload, setPayload] = useState({});
    const [showMessage, setShowMessage] = useState(false)
    const [delay, setDelay] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    useEffect(() => {
        getNotificationCount()
        getSessionRequest()
        getActivities()
        // getNotification()
        // getNewNotification()
        getAllChat()
        const socket = io("https://api.wiseq.co",{
        transport:["websocket"],
        auth: {
            token: localStorage.getItem("token")
        }
      });
      socket.on('connect', () => {
        // console.log('socket connected');
      });
      socket.on('connect_error', err => {
        console.log(err);
      });
      socket.on('notification', res => {
        // console.log("notification recieved from socket==", res);
        if(res){
            setnotificationValue(notificationValue + 1)
            getSessionRequest()
            // getNotification()
            // getNewNotification(userInfo)
        }
      });
        
    }, [])

    useEffect(() => {
        getProfile()
    },[])
    const getProfile = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

              const res = await fetch(`${BASE_URL}mentor/profile`,{
                  method:'GET',
                  headers:{
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                  },
                })
                const response = await res.json()
            //   console.log(response)
              const {success} = response
              if(success){
                getNewNotification(response.data?.id)
                setUserInfo(response.data)
              }
        
    }

    const getSessionRequest = async () => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}session/requests`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        // console.log("requezt", response)
        if (response.success) {
            // setNotificationData(response.data)
        }

    }

    const getActivities = async () => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}activities`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        // console.log("Activities", response)
        if (response.success) {
            setActivities(response.data)
        }

    }
    // const getNotification = async () => {
    //     const token = localStorage.getItem("token")
    //     const btoken = `Bearer ${token}`;
    //     const res = await fetch(`${BASE_URL}notifications`, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //     })
    //     const response = await res.json()
    //     console.log("Notifications", response)
    //     if (response.success) {
    //         setNotificationData(response.data)
    //     }

    // }
    const getNewNotification = async (id) => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body ={
            "user_id":id
        }
        const res = await fetch(`${BASE_URL_APPLSURE}get-notification`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        // console.log("Notifications", response)
        if (response.status) {
            setNotificationData(response.notifications)
        }

    }
    const getNotificationCount = async () => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentor/dashboard-counts`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        // console.log("Notifications count in sidebar", response)
        if (response.success) {
            setnotificationValue(response.data?.notificationCount)
        }

    }

    const getAllChat = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}chats`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        // console.log(response)
        setChatList(response.data)
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

    const logout_fun = () => {
        // _RemoveAuthToke()
        // window.localStorage.clear();
        // window.sessionStorage.clear()
        localStorage.setItem("token", "")
        localStorage.setItem("user_type", "")
        localStorage.setItem("user_id","")
        localStorage.setItem("switch_message_flag", "")
        localStorage.setItem("full_details", "")
        navigate('../admin_login')
    }

    const acceptSession = async (val) => {
        // alert(JSON.stringify(val))
        //     return
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body = {
            status: val == 0 ? "rejected" : "accepted"
        }
        const res = await fetch(`${BASE_URL}session/requests/${payload.sessionId}`, {
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
            getSessionRequest()
            closeModal()
            getNotificationCount()
        }

    }


    const switchUser = async() => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body = {
            "email": userInfo.email,
            "role": "mentee",
            "deviceToken": localStorage.getItem("token")
        }
        // console.log(body)
        // return
        const res = await fetch(`${BASE_URL}auth/switchtouser`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        // console.log(response)
        // return
        const { success } = response
        if(success){
            localStorage.removeItem("wrong_login")
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user_id", response.data.id)
                localStorage.setItem("user_type", response.data.role)
                localStorage.setItem("pref", response.data.isFirstLogin)
                localStorage.setItem("user_info", response.data.name);
                localStorage.setItem("image", response.data.imageUrl);
                localStorage.setItem("orgLogo", response.data.orgLogo);
                localStorage.setItem("switch_message_flag", response.data.switch_message_flag);
                EventEmitter.emit('eventName', response.data.role)
                if(response.data.role == "mentor" || response.data.role == "mentee"){
                    if(response.data.isFirstLogin){
                        navigate("/preference_one")
                    }else{
                        navigate("/");
                    }
                }else{
                    navigate("/");
                }
        }
    }

    return (


        <div className="layout-light side-menu">
            <div className="mobile-search">
                <form action="#" className="search-form">
                    <img src={search_img} className="svg" />
                    <input className="form-control me-sm-2 box-shadow-none" type="search" placeholder="Search..." aria-label="Search" />
                </form>
            </div>
            <div className="mobile-author-actions"></div>
            <header className="header-top">
                <nav className="navbar navbar-light">
                    <div className="navbar-left">
                        <div className="logo-area logo_colour">
                            <NavLink className="navbar-brand" to="/">
                                <img src={localStorage.getItem("orgLogo")} className="dark" />
                                <img src={localStorage.getItem("orgLogo")} className="light" />
                            </NavLink>
                            <div className='sidebar-toggle' onClick={onClick}>
                                <img src={toggle_img} className="svg" />
                            </div>
                        </div>
                    </div>
                    {/* Header */}
                    <div className="navbar-right">
                        <ul className="navbar-right__menu">
                            <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                <img onClick={() => navigate('/browse_mentee')} src={search_img} alt="search" className="svg" />
                                <input value={menteeSearch} onChange={e => {
                                    setmenteeSearch(e.target.value)
                                    EventEmitter.emit('searchField', e.target.value)
                                }} onClick={() => navigate('/browse_mentee')} className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Browse Mentees" aria-label="Search" />
                            </div>

                            <li className="nav-notification">
                                <div className="dropdown-custom">
                                    {notificationValue > 0 && (
                                        <p style={{ backgroundColor:"#026666",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50px",
                                            color: "#fff",
                                            fontSize: "9px",
                                            textAlign: "center",
                                            position: "absolute",
                                            left: "20px",
                                            bottom: "5px",
                                            lineHeight:"21px"
                                            }}>{notificationValue}</p>
                                    )}
                                    
                                    <img onClick={() => setShowNotofication(!showNotification)} src={alarm_img} className="svg" />
                            
                                    {
                                        showNotification ?

                                        <div className="dropdown-parent-wrapper">
                                        <div className="dropdown-wrapper box_shadow1">
                                          <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                              <Tabs>
                                                <TabList
                                                  style={{ justifyContent: "space-around", overflow:"hidden", paddingBottom:"6px", paddingTop:"10px" }}
                                                  className="nav nav-tabs vertical-tabs"
                                                >
                                                  <Tab>Notifications</Tab>
                                                  <Tab>Activities</Tab>
                                                </TabList>
                
                                                <TabPanel className="tab-content">
                                                  <ul>
                                                  {notificationData && notificationData.map((i) => (
                                                             <li 
                                                            //  onClick={() => {
                                                            //     if(i.type == "session_request"){
                                                            //         setNotoficationId(i.payload)
                                                            //         showModal()
                                                            //     }  
                                                            //  }}
                                                              className="nav-notification__single nav-notification__single--unread d-flex flex-wrap box_shadow1">
                                                                 <div  className="nav-notification__type nav-notification__type--secondary">
                                                                     <img src={notificationbell_img} className="svg" />
                                                                 </div>
                                                                 <div className="nav-notification__details">
                                                                     <p><span>{i.message}</span></p>
                                                                     {/* <p><span>New Session is created by {i.scheduler}</span></p> */}
                                                                     {/* <p><span>Schedule time is {moment(i.scheduleTime).format("DD MMM YY")}</span></p> */}
                                                                     {i.type == "session_request" &&
                                                                     <p style={{cursor:'pointer'}} onClick={() => {
                                                                        setPayload(JSON.parse(i.payload))
                                                                        // console.log(JSON.parse(i.payload))
                                                                        setNotoficationId(i.payload)
                                                                        showModal()
                                                                     }}>
                                                                         <span style={{textDecoration:'underline'}} className="time-posted">Click here to accept/decline.</span>
                                                                     </p>}
                                                                     <p>
                                                                         {/* <span className="time-posted">{new Date(i.updated_at).toDateString()} {new Date(i.updated_at).toTimeString().split(" ")[0]}</span> */}
                                                                         <span className="time-posted">{new Date(parseInt(i.createdAt['$date']['$numberLong'])).toDateString()} {new Date(parseInt(i.createdAt['$date']['$numberLong'])).toTimeString().split(" ")[0]}</span>
                                                                     </p>
                                                                 </div>
                                                             </li>
                                                         ))}
                                                  </ul>
                                                  <div onClick={() => navigate('/all_notification', {state:notificationData})} style={{cursor:'pointer'}} className="dropdown-wrapper__more color-green">
                                                    View All
                                                  </div>
                                                </TabPanel>
                
                                                <TabPanel className="tab-content">
                                                    <ul>
                                                    {activities && activities.map((i) => (
                                                             <li onClick={() => {
                                                                //  setNotoficationId(i.id)
                                                                //  showModal()
                                                             }} className="nav-notification__single nav-notification__single--unread d-flex flex-wrap box_shadow1">
                                                                 <div className="nav-notification__type nav-notification__type--secondary">
                                                                     <img src={activity_icon} className="svg" />
                                                                 </div>
                                                                 <div className="nav-notification__details">
                                                                     <p><span>{i.message}</span></p>
                                                                     {/* <p><span>{moment(i.scheduleTime).format("DD MMM YY")}</span></p> */}
                                                                     <p>
                                                                         {/* <span className="time-posted">27 Oct 22, 22:49</span> */}
                                                                         <span className="time-posted">{new Date(i.updatedAt).toDateString()} {new Date(i.updatedAt).toTimeString().split(" ")[0]}</span>
                                                                     </p>
                                                                 </div>
                                                             </li>
                                                         ))}
                                                    
                                                    </ul>
                                                    <div onClick={() => navigate('/all_activity', {state:activities})} style={{cursor:'pointer'}} className="dropdown-wrapper__more color-green">
                                                    View All
                                                  </div>
                                                </TabPanel>
                                              </Tabs>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                            // <div className="dropdown-parent-wrapper">
                                            //     <div className="dropdown-wrapper">
                                            //         <ul>
                                            //             {notificationData && notificationData.map((i) => (
                                            //                 <li onClick={() => {
                                            //                     setNotoficationId(i.id)
                                            //                     showModal()
                                            //                 }} className="nav-notification__single nav-notification__single--unread d-flex flex-wrap box_shadow1">
                                            //                     <div className="nav-notification__type nav-notification__type--secondary">
                                            //                         <img src={notificationbell_img} className="svg" />
                                            //                     </div>
                                            //                     <div className="nav-notification__details">
                                            //                         <p><span>New Session is created by {i.scheduler}</span></p>
                                            //                         <p><span>Schedule time is {moment(i.scheduleTime).format("DD MMM YY")}</span></p>
                                            //                         {/* <p>
                                            //                             <span className="time-posted">27 Oct 22, 22:49</span>
                                            //                         </p> */}
                                            //                     </div>
                                            //                 </li>
                                            //             ))}
                                            //         </ul>
                                            //         <div className="dropdown-wrapper__more">View All</div>
                                            //     </div>
                                            // </div> 
                                            : null}
                                </div>
                            </li>

                            <li className="nav-message">
                                <div className="dropdown-custom">
                                    {/* <a href="#" className="nav-item-toggle icon-active"> */}

                                    <img onClick={() => setShowNotofication(!showNotification)} src={message_img} className="svg" />
                                    {/* </a> */}
                                    {
                                        showNotification ?

                                            <div className="dropdown-parent-wrapper">
                                                <div className="dropdown-wrapper">
                                                    <ul>
                                                        {chatList && chatList.map((i) => (
                                                            <li onClick={() => navigate('/chat', {state:i})} className="nav-notification__single nav-notification__single--unread d-flex flex-wrap box_shadow1">
                                                            {/* <div className="nav-notification__type nav-notification__type--secondary">
                                                                <img src={i.imageUrl == "" ? authornav_img : i.imageUrl} className="svg" />
                                                            </div> */}
                                                            <div className="user-avater">
                                                                <img src={i.imageUrl == "" ? authornav_img : i.imageUrl} />
                                                            </div>
                                                            <div className="user-message">
                                                            <p>
                                                                <div className="subject stretched-link text-truncate">{i.userName}</div>
                                                                {/* <span className="time-posted">3 hrs ago</span> */}
                                                            </p>
                                                            <p>
                                                                <span className="desc text-truncate" style={{ maxWidth: '215px' }}>{i.message}..</span>
                                                                {/* <span className="msg-count badge-circle badge-success badge-sm">1</span> */}
                                                            </p>
                                                        </div>
                                                            {/* <div className="nav-notification__details">
                                                                <p><span>{i.userName}</span></p>
                                                                <p> */}
                                                                    {/* <span className="time-posted">{new Date(i.createdAt).toDateString()} {new Date(i.createdAt).toLocaleTimeString()} */}
                                                                    {/* 27 Oct 22, 22:49 */}
                                                                    {/* </span> */}
                                                                {/* </p>
                                                            </div> */}
                                                        </li>
                                                        ))}
                                                        {/* <li className="nav-notification__single nav-notification__single--unread d-flex flex-wrap box_shadow1">
                                                            <div className="nav-notification__type nav-notification__type--secondary">
                                                                <img src={notificationbell_img} className="svg" />
                                                            </div>
                                                            <div className="nav-notification__details">
                                                                <p><span>You have been assigned a training by Santosh Bala</span></p>
                                                                <p>
                                                                    <span className="time-posted">27 Oct 22, 22:49</span>
                                                                </p>
                                                            </div>
                                                        </li> */}
                                                        {/* <li className="nav-notification__single nav-notification__single--unread d-flex flex-wrap box_shadow1">
                                                            <div className="nav-notification__type nav-notification__type--secondary">
                                                                <img src={notificationbell_img} className="svg" />
                                                            </div>
                                                            <div className="nav-notification__details">
                                                                <p><span>You have been assigned a training by Santosh Bala</span></p>
                                                                <p>
                                                                    <span className="time-posted">27 Oct 22, 22:49</span>
                                                                </p>
                                                            </div>
                                                        </li> */}
                                                        {/* <li className="nav-notification__single nav-notification__single--unread d-flex flex-wrap box_shadow1">
                                                            <div className="nav-notification__type nav-notification__type--secondary">

                                                                <img src={notificationbell_img} className="svg" />
                                                            </div>
                                                            <div className="nav-notification__details">
                                                                <p><span>You have been assigned a training by Santosh Bala</span></p>
                                                                <p>
                                                                    <span className="time-posted">27 Oct 22, 22:49</span>
                                                                </p>
                                                            </div>
                                                        </li> */}
                                                        {/* <li className="nav-notification__single nav-notification__single d-flex flex-wrap box_shadow1">
                                                            <div className="nav-notification__type nav-notification__type--secondary">
                                                                <img src={notificationbell_img} className="svg" />
                                                            </div>
                                                            <div className="nav-notification__details">
                                                                <p><span>You have been assigned a training by Santosh Bala</span></p>
                                                                <p>
                                                                    <span className="time-posted">27 Oct 22, 22:49</span>
                                                                </p>
                                                            </div>
                                                        </li> */}
                                                        {/* <li className="nav-notification__single nav-notification__single d-flex flex-wrap box_shadow1">
                                                            <div className="nav-notification__type nav-notification__type--secondary">
                                                                <img src={notificationbell_img} className="svg" />
                                                            </div>
                                                            <div className="nav-notification__details">
                                                                <p><span>You have been assigned a training by Santosh Bala</span></p>
                                                                <p>
                                                                    <span className="time-posted">27 Oct 22, 22:49</span>
                                                                </p>
                                                            </div>
                                                        </li> */}
                                                    </ul>
                                                    <div style={{cursor:'pointer'}} onClick={() => navigate('/chat',{state:chatList[0]})} className="dropdown-wrapper__more color-green">View All</div>
                                                </div>
                                            </div> : null}
                                </div>
                            </li>

                            <li className="nav-author">
                                <div className="dropdown-custom">
                                <div onClick={() => setShowMoreOption(!showMoreOption)} className="nav-item-toggle">
                                        <img src={localStorage.getItem("image") == "" ? authornav_img : localStorage.getItem("image")} className="rounded-circle" />
                                        <span className="nav-item__title">{localStorage.getItem("user_info")}<i className="las la-angle-down nav-item__arrow"></i></span>
                                    </div>
                                    {/* <a href="#" className="nav-item-toggle">
                                        <img src={localStorage.getItem("image") == "" ? authornav_img : localStorage.getItem("image")} className="rounded-circle" />
                                        <span className="nav-item__title">{localStorage.getItem("user_info")}<i className="las la-angle-down nav-item__arrow"></i></span>
                                    </a> */}
                                    {showMoreOption ? 
                                    <div className="dropdown-parent-wrapper">
                                        <div className="dropdown-wrapper">
                                            <div className="nav-author__options">
                                                <ul>
                                                    <li>
                                                        <NavLink className="navbar-link" to="/my_profile">
                                                            <i class="uil uil-user-circle"></i> View Profile

                                                        </NavLink>
                                                    </li>
                                                    {userInfo && userInfo.userMeta?.switchPower == 1 && (
                                                        <li onClick={() => switchUser()}>
                                                        <NavLink className="navbar-link">
                                                            <i class="uil uil-user-circle"></i> Switch to Mentee
                                                        </NavLink>
                                                    </li>
                                                    )}
                                                    

                                                    <li>
                                                        <NavLink className="navbar-link" to="/change_password">
                                                            <i className="la la-key"></i> Reset Password

                                                        </NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink className="navbar-link" to="/#">
                                                            <i className="uil uil-question-circle"></i> Help & Support

                                                        </NavLink>
                                                    </li>

                                                    <li onClick={()=> window.open("https://wiseqglobal.com/privacy.html", "_blank")}>
                                                        <NavLink className="navbar-link">
                                                            <i  className="uil uil-lock-alt"></i> Privacy Policy
                                                        </NavLink>
                                                    </li>

                                                    <li onClick={()=> window.open("https://wiseqglobal.com/term.html", "_blank")}>
                                                        <NavLink className="navbar-link">
                                                            <i  className="uil uil-file-alt"></i> Terms of Use
                                                        </NavLink>
                                                    </li>

                                                    <li className="signout" onClick={() => logout_fun()}>
                                                        <NavLink className="navbar-link">
                                                            <i className="la la-file-export"></i> Sign Out

                                                        </NavLink>


                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div> : null }
                                </div>
                            </li>
                        </ul>

                        <div className="navbar-right__mobileAction d-md-none">
                            <a href="#" className="btn-search">
                                <img src={search1_img} alt="search" className="svg feather-search" />
                                <img src={x_img} alt="x" className="svg feather-x" />
                            </a>

                            <a href="#" className="btn-author-action">
                                <img src={vertical_img} alt="more-vertical" className="svg" />
                            </a>
                        </div>
                    </div>

                </nav>
            </header>
            {/* Desktop SideBar */}
            {windowSize.innerWidth > 768 || sideBarOpen == true ?
                <div className="sidebar-wrapper">
                    <div style={{ width: sideBarOpen ? "280px" : "76px" }} className="sidebar sidebar-collapse sidebar_colour" id="sidebar">
                        <div className="sidebar__menu-group">
                            <ul className="sidebar_nav">


                                <li className="nav-author1 mb-25">
                                    <div style={{ height: "75px" }} className="nav-author__info1 kris1">
                                        <div className="author-img1">
                                            <img src={localStorage.getItem("image") == "" ? authornav_img : localStorage.getItem("image")} className="rounded-circle" />
                                        </div>
                                        <div>
                                            <h6>{sideBarOpen ? localStorage.getItem("user_info") : ''}</h6>
                                            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/my_profile')}>{sideBarOpen ? 'View Profile' : ''}</span>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/">
                                        <span className="nav-icon">
                                            <img src={home_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Home</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/my_mentee">
                                        <span className="nav-icon">
                                            <img src={wiseuser_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Mentees</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/sessions_list">
                                        <span className="nav-icon">
                                            <img src={package_img} className="svg" />
                                        </span>

                                        {sideBarOpen ? <span className="menu-text">Sessions</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/mentoring_program">
                                        <span className="nav-icon">
                                            <img src={onboard_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Mentoring Programs</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/idp">
                                        <span className="nav-icon">
                                            <img src={organsiation_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">IDP</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/learning_screen">
                                        <span className="nav-icon">
                                            <img src={resources_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Learnings</span> : null}
                                    </NavLink>
                                </li>


                                <li>
                                    <NavLink className="navbar-link" to="/assessment_screen">
                                        <span className="nav-icon">
                                            <img src={program_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Assessment</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/calender">
                                        <span className="nav-icon">
                                            <img src={payment_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Calendar</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/resources">
                                        <span className="nav-icon">
                                            <img src={customize_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Resources</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/community_screen">
                                        <span className="nav-icon">
                                            <img src={report_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Community</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/survey">
                                        <span className="nav-icon">
                                            <img src={survey_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Survey</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/reports_screen">
                                        <span className="nav-icon">
                                            <img src={survey_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Reports</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/support_help">
                                        <span className="nav-icon">
                                            <img src={survey_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Support & Help</span> : null}
                                    </NavLink>
                                </li>
                            </ul>


                        </div>
                        <div style={{
                            backgroundColor: "#ebf3f3",
                            position: "absolute",
                            bottom: "0px",
                            width: "100%",
                            paddingBottom: "20px"
                        }}  className="powered_log">
                            <center>
                                <img src={powered_logo} className="svg" />
                            </center>
                        </div>
                    </div>
                </div> : null}

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Do you want to accept this session invitation?</h4>
                        <h4 class="text-capitalize fw-600 mb-25">Session Details: {new Date(payload.date).toDateString()} {new Date(payload.date).toLocaleTimeString()}</h4>

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

export default Side_bar;
