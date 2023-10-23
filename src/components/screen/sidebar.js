import search_img from '../../img/search_header.svg';
import dark_logo from '../../img/wise.svg';
import toggle_img from '../../img/svg/align-center-alt.svg';
import home_img from '../../img/sidebar_icon/home.svg';
import wiseuser_img from '../../img/sidebar_icon/wise_user.svg';
import activity_icon from '../../img/org_activity.svg';
import package_img from '../../img/sidebar_icon/package.svg';
import onboard_img from '../../img/sidebar_icon/onboard1.svg';
import organsiation_img from '../../img/sidebar_icon/organisation.svg';
import resources_img from '../../img/sidebar_icon/resource.svg';
import program_img from '../../img/sidebar_icon/program.svg';
import payment_img from '../../img/sidebar_icon/payment.svg';
import customize_img from '../../img/sidebar_icon/customize.svg';
import report_img from '../../img/sidebar_icon/report.svg';
import survey_img from '../../img/sidebar_icon/survey.svg';
import setting_img from '../../img/sidebar_icon/settings.svg';
// import message_img from '../../img/messages.svg';
import message_img from '../../img/chat_org.svg';
import powered_logo from '../../img/powered_logo.svg';
import team_img from '../../img/team-1.png';
import alarm_img from '../../img/notification.svg';
import authornav_img from '../../img/user_pic.png';
import search1_img from '../../img/svg/search.svg';
import x_img from '../../img/svg/search.svg';
import vertical_img from '../../img/svg/more-vertical.svg';
import notificationbell_img from '../../img/notification_bell.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
import EventEmitter from "reactjs-eventemitter";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BASE_URL } from '../../services/Config';

function Side_bar({ onClick, sideBarOpen }) {
    const navigate = useNavigate()
    const [showNotification, setShowNotofication] = useState(false)
    const [showMoreOption, setShowMoreOption] = useState(false);
    const [showMessage, setShowMessage] = useState(false)
    const [mentorSearch, setmentorSearch] = useState("")
    const [chatList, setChatList] = useState([])
    const [notificationData, setNotificationData] = useState([])
    const [activities, setActivities] = useState([])
    // console.log(sideBarOpen)
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
        getAllChat()
        getNotification()
        getActivities()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    // console.log(windowSize.innerWidth)

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

    const getNotification = async () => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}notifications`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        // console.log("Notifications", response)
        if (response.success) {
            setNotificationData(response.data)
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

    const logout_fun = () => {
        // _RemoveAuthToke()
        // localStorage.setItem("token", "")
        window.localStorage.clear();
        window.sessionStorage.clear()
        navigate('/admin_login')
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
                        <div className="logo-area">

                            <NavLink className="navbar-brand" to="/">
                                <img src={localStorage.getItem("orgLogo")} className="dark" />
                                <img src={localStorage.getItem("orgLogo")} className="light" />
                            </NavLink>
                            <div className='sidebar-toggle' onClick={onClick}>
                                <img src={toggle_img} className="svg" />
                            </div>

                        </div>

                        <div className="top-menu">
                            <div className="hexadash-top-menu position-relative">
                                <ul>
                                    <li>
                                        <NavLink className="navbar-link" to="/home">
                                            <span className="nav-icon">
                                                <img src={home_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Home</span>

                                        </NavLink>

                                    </li>

                                    <li>

                                        <NavLink className="navbar-link" to="/mentee_management">
                                            <span className="nav-icon">
                                                <img src={wiseuser_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Mentees </span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/mentors">
                                            <span className="nav-icon">
                                                <img src={package_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Mentors</span>

                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/match_making">
                                            <span className="nav-icon">
                                                <img src={onboard_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Match-Making</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/mentoring_program">
                                            <span className="nav-icon">
                                                <img src={organsiation_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Mentoring Programs</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/progress_report">
                                            <span className="nav-icon">
                                                <img src={resources_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Progress Reports</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/learning_screen">
                                            <span className="nav-icon">
                                                <img src={program_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Learnings</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/survey">
                                            <span className="nav-icon">
                                                <img src={payment_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Survey</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/resources">
                                            <span className="nav-icon">
                                                <img src={customize_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Resources</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-brand" to="/community_screen">
                                            <span className="nav-icon">
                                                <img src={report_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Community</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="navbar-link" to="/setting_screen">
                                            <span className="nav-icon">
                                                <img src={survey_img} className="svg" />
                                            </span>
                                            <span className="menu-text">Settings</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-right">
                        <ul className="navbar-right__menu">
                            <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                <img onClick={() => { navigate('/browse_mentor_mentee')}} src={search_img} alt="search" className="svg" />
                                <input value={mentorSearch} onChange={e => {
                                    setmentorSearch(e.target.value)
                                    EventEmitter.emit('searchField', e.target.value)
                                }} onClick={() => {navigate('/browse_mentor_mentee') }} className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Browse Mentors, Mentees" aria-label="Search" />
                            </div>

                            <li className="nav-notification">
                                <div className="dropdown-custom">
                                    {/* <a href="#" className="nav-item-toggle icon-active"> */}

                                    <img onClick={() => setShowNotofication(!showNotification)} src={alarm_img} className="svg" />
                                    {/* </a> */}
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
                                                                 <div style={{backgroundColor:'#fdefe6 !important'}} className="nav-notification__type nav-notification__type--secondary1">
                                                                     <img src={notificationbell_img} className="svg" />
                                                                 </div>
                                                                 <div className="nav-notification__details">
                                                                     <p><span>{i.message}</span></p>
                                                                     {/* <p><span>New Session is created by {i.scheduler}</span></p> */}
                                                                     {/* <p><span>Schedule time is {moment(i.scheduleTime).format("DD MMM YY")}</span></p> */}
                                                                     <p>
                                                                         <span className="time-posted">{new Date(i.updatedAt).toDateString()} {new Date(i.updatedAt).toTimeString().split(" ")[0]}</span>
                                                                     </p>
                                                                 </div>
                                                             </li>
                                                         ))}
                                                  </ul>
                                                  <div onClick={() => navigate('/all_notification', {state:notificationData})} style={{cursor:'pointer'}} className="dropdown-wrapper__more">
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
                                                                 <div style={{backgroundColor:'#fdefe6 !important'}} className="nav-notification__type nav-notification__type--secondary1">
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
                                                    <div onClick={() => navigate('/all_activity', {state:activities})} style={{cursor:'pointer'}} className="dropdown-wrapper__more">
                                                    View All
                                                  </div>
                                                </TabPanel>
                                              </Tabs>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                             : null}
                                </div>
                            </li>

                            <li className="nav-message">
                                <div className="dropdown-custom">
                                    <img onClick={() => setShowMessage(!showMessage)} src={message_img} className="svg" />
                                    {
                                        showMessage ?
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
                                                        {/* <li className="author-online has-new-message box_shadow1">
                                                            <div className="user-avater">
                                                                <img src={team_img} />
                                                            </div>
                                                            <div className="user-message">
                                                                <p>
                                                                    <div className="subject stretched-link text-truncate">Web Design</div>
                                                                    <span className="time-posted">3 hrs ago</span>
                                                                </p>
                                                                <p>
                                                                    <span className="desc text-truncate" style={{ maxWidth: '215px' }}>Lorem Ipsum is simply dummy..</span>
                                                                    <span className="msg-count badge-circle badge-success badge-sm">1</span>
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li className="author-offline has-new-message box_shadow1">
                                                            <div className="user-avater">
                                                                <img src={team_img} />
                                                            </div>
                                                            <div className="user-message">
                                                                <p>
                                                                    <div className="subject stretched-link text-truncate" style={{ maxWidth: '180px' }}>Web Design</div>
                                                                    <span className="time-posted">3 hrs ago</span>
                                                                </p>
                                                                <p>
                                                                    <span className="desc text-truncate" style={{ maxWidth: '215px' }}>Lorem Ipsum is simply dummy..</span>
                                                                    <span className="msg-count badge-circle badge-success badge-sm">1</span>
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li className="author-online has-new-message box_shadow1">
                                                            <div className="user-avater">
                                                                <img src={team_img} />
                                                            </div>
                                                            <div className="user-message">
                                                                <p>
                                                                    <div className="subject stretched-link text-truncate" style={{ maxWidth: '180px' }}>Web Design</div>
                                                                    <span className="time-posted">3 hrs ago</span>
                                                                </p>
                                                                <p>
                                                                    <span className="desc text-truncate" style={{ maxWidth: '215px' }}>Lorem Ipsum is simply dummy..</span>
                                                                    <span className="msg-count badge-circle badge-success badge-sm">1</span>
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li className="author-offline box_shadow1">
                                                            <div className="user-avater">
                                                                <img src={team_img} />
                                                            </div>
                                                            <div className="user-message">
                                                                <p>
                                                                    <div className="subject stretched-link text-truncate" style={{ maxWidth: '180px' }}>Web Design</div>
                                                                    <span className="time-posted">3 hrs ago</span>
                                                                </p>
                                                                <p>
                                                                    <span className="desc text-truncate" style={{ maxWidth: '215px' }}>Lorem Ipsum is simply dummy..</span>
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li className="author-offline box_shadow1">
                                                            <div className="user-avater">
                                                                <img src={team_img} />
                                                            </div>
                                                            <div className="user-message">
                                                                <p>
                                                                    <div className="subject stretched-link text-truncate" style={{ maxWidth: '180px' }}>Web Design</div>
                                                                    <span className="time-posted">3 hrs ago</span>
                                                                </p>
                                                                <p>
                                                                    <span className="desc text-truncate" style={{ maxWidth: '215px' }}>Lorem Ipsum is simply dummy..</span>
                                                                </p>
                                                            </div>
                                                        </li> */}
                                                    </ul>
                                                    <div style={{cursor:'pointer'}} onClick={() => navigate('/chat',{state: chatList[0]})} className="dropdown-wrapper__more">View All</div>
                                                </div>
                                            </div> : null
                                    }

                                </div>
                            </li>

                            <li className="nav-author">
                                <div className="dropdown-custom">
                                <div onClick={() => setShowMoreOption(!showMoreOption)} className="nav-item-toggle">
                                        <img src={authornav_img} className="rounded-circle" />
                                        <span className="nav-item__title">{localStorage.getItem("user_info")}<i className="las la-angle-down nav-item__arrow"></i></span>
                                    </div>
                                    {/* <a href="#" className="nav-item-toggle">
                                        <img src={authornav_img} className="rounded-circle" />
                                        <span className="nav-item__title">{localStorage.getItem("user_info")}<i className="las la-angle-down nav-item__arrow"></i></span>
                                    </a> */}
                                    {showMoreOption ? 
                                    <div className="dropdown-parent-wrapper">
                                        <div className="dropdown-wrapper">
                                            <div className="nav-author__options">
                                                <ul>
                                                    <li>
                                                        <NavLink className="navbar-link" to="/#">
                                                            <i class="uil uil-user-circle"></i> View Profile

                                                        </NavLink>
                                                    </li>

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
                                                        <NavLink className="navbar-link" >
                                                            <i className="la la-file-export"></i> Sign Out

                                                        </NavLink>


                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div> : null}
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
                    <div style={{ width: sideBarOpen ? "280px" : "76px" }} className="sidebar sidebar-collapse" id="sidebar">
                        <div className="sidebar__menu-group">
                            <ul className="sidebar_nav">

                                <li className="nav-author1 mb-25">
                                    <div style={{ height: "75px" }} className="nav-author__info1">
                                        <div className="author-img1">
                                            <img src={authornav_img} className="rounded-circle" />
                                        </div>
                                        <div>
                                            <h6>{sideBarOpen ? localStorage.getItem("user_info") : ''}</h6>
                                            <span onClick={() => navigate('/setting_screen')} style={{ cursor: 'pointer' }}>{sideBarOpen ? 'View Profile' : ''}</span>
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
                                    <NavLink className="navbar-link" to="/mentee_management">
                                        <span className="nav-icon">
                                            <img src={wiseuser_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Mentees</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/mentors">
                                        <span className="nav-icon">
                                            <img src={package_img} className="svg" />
                                        </span>

                                        {sideBarOpen ? <span className="menu-text">Mentors</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/match_making">
                                        <span className="nav-icon">
                                            <img src={onboard_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Match-Making</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/mentoring_program">
                                        <span className="nav-icon">
                                            <img src={organsiation_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Mentoring Programs</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/progress_report">
                                        <span className="nav-icon">
                                            <img src={resources_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Progress Reports</span> : null}
                                    </NavLink>
                                </li>


                                <li>
                                    <NavLink className="navbar-link" to="/learning_screen">
                                        <span className="nav-icon">
                                            <img src={program_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Learnings</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/survey">
                                        <span className="nav-icon">
                                            <img src={payment_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Survey</span> : null}
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
                                    <NavLink className="navbar-brand" to="/community_screen">
                                        <span className="nav-icon">
                                            <img src={report_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Community</span> : null}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="navbar-link" to="/setting_screen">
                                        <span className="nav-icon">
                                            <img src={survey_img} className="svg" />
                                        </span>
                                        {sideBarOpen ? <span className="menu-text">Settings</span> : null}
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div style={{
                            backgroundColor: "#fdefe6",
                            position: "absolute",
                            bottom: "0px",
                            width: "100%",
                            paddingBottom: "20px"
                        }} className="powered_log">
                            <center>
                                <img src={powered_logo} className="svg" />
                            </center>
                        </div>
                    </div>
                </div> : null}

        </div>


    );
}

export default Side_bar;
