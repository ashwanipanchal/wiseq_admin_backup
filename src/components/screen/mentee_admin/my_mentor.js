import team_img from '../../../img/tm1.png';
import authornav_img from '../../../img/user_pic.png';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../services/Config";

const data = [
    { id: 1, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Skills to Develop", mentee_employee: "Public Speaking", mentee_hcm: "HCM", mentee_three: "+3", mentoring: "Mentoring on", public: "Public Speaking", plus_one: "+1" },
    { id: 2, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Skills to Develop", mentee_employee: "Public Speaking", mentee_hcm: "HCM", mentee_three: "+3", mentoring: "Mentoring on", public: "Public Speaking", plus_one: "+1" },
    { id: 3, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Skills to Develop", mentee_employee: "Public Speaking", mentee_hcm: "HCM", mentee_three: "+3", mentoring: "Mentoring on", public: "Public Speaking", plus_one: "+1" },
];

const data1 = [
    { id: 1, mentee_name: "Kaylynn Dias", mentee_position: "Assi. Manager - Recruitment", mentee_number: "59", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagement", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Accept" },
    { id: 2, mentee_name: "Kaylynn Dias", mentee_position: "Assi. Manager - Recruitment", mentee_number: "59", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagement", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Accept" },
];

function My_Mentor() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [requestList, setRequestList] = useState([])
    const [myMentee, setMyMentee] = useState([])
    const [recomanded, setRecomanded] = useState([])
    const [showMore, setShowMore] = useState(false)
    const [showMoreR, setShowMoreR] = useState(false)
    const [showMoreRC, setShowMoreRC] = useState(false)
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
        getMyMentorList()
        getRequestList()
        getRecommandedList()
    }, [])

    const getRequestList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}match-making/requests`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("request list", response)
        if (response.success) {
            setRequestList(response.data)
        }
    }

    const getRecommandedList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentee/recommended-mentors`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        if (response.success) {
            setRecomanded(response.data)
        }
        console.log("recomanded list", response)
    }

    const sendRequest = async (id) => {
        console.log(id)
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}match-making/requests/${id}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        //   console.log("send reqst respo", response)
        if (response.success) {
            getRecommandedList()
            getRequestList()
        }
    }

    const getMyMentorList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentee/my-mentors`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("my mentor", response)
        if (response.success) {
            setMyMentee(response.data)
        }
    }

    const acceptReqst = async (id) => {
        const btoken = `Bearer ${token}`;
        const body = {

            "status": "accepted"

        }
        const res = await fetch(`${BASE_URL}match-making/requests/${id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        console.log("send reqst respo", response)
        if (response.success) {
            getRecommandedList()
            getRequestList()
            getMyMentorList()
        }

    }
    const rejectReqst = async (id) => {
        const btoken = `Bearer ${token}`;
        const body = {

            "status": "rejected"

        }
        const res = await fetch(`${BASE_URL}match-making/requests/${id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        console.log("send reqst respo", response)
        if (response.success) {
            getRecommandedList()
            getRequestList()
            getMyMentorList()
        }

    }


    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">My Mentors</h4>
                                    </div>
                                </div>

                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                    setShowMore(!showMore)
                                }} class="view_all text-center">{showMore ? "View Less" : "View All"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {myMentee && myMentee.slice(0, 3).map((user) => (
                            <div className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <h6 style={{cursor:'pointer'}} onClick={() =>  navigate('/mentor_profile', { state: user })} className="mt-0  fw-500">{user.name}</h6>
                                                <p className="fs-13 color-light mb-0">{user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": ""}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.rating.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                                {/* <span className="badge badge-round btn-light-petrol mt-10">{user.mentee_number}</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Key Skill</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{!i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="user-group-people">
                                        {/* <p className="mt-15">Mentoring on</p> */}
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            <span className="badge badge-square btn-outline-orange me-10">{user.public}</span>
                                            <span className="badge badge-square btn-outline-orange me-10">{user.plus_one}</span>
                                        </ul>
                                    </div>
                                    <div className="layout-button">
                                        <button onClick={() => { navigate("/calender")}} type="button" className="btn btn-default btn-squared color-primary btn-outline-light-petrol  flex-grow-1 mentee_btn">Book a Session</button>
                                        <button onClick={() => navigate('/chat', { state: user })} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Chat</button>
                                    </div>
                                </div>
                            </div>

                        ))}
                        {myMentee && showMore && myMentee.slice(3).map((user) => (
                            <div className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                               
                                                    <h6 style={{cursor:'pointer'}} onClick={() =>  navigate('/mentor_profile', { state: user })} className="mt-0  fw-500">{user.name}</h6>
                                                
                                                    <p className="fs-13 color-light mb-0">{user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": ""}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.rating.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                                {/* <span className="badge badge-round btn-light-petrol mt-10">{user.mentee_number}</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Key Skill</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{!i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="user-group-people">
                                        {/* <p className="mt-15">Mentoring on</p> */}
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            <span className="badge badge-square btn-outline-orange me-10">{user.public}</span>
                                            <span className="badge badge-square btn-outline-orange me-10">{user.plus_one}</span>
                                        </ul>
                                    </div>
                                    <div className="layout-button">
                                        <button onClick={() => { navigate('/calender')}} type="button" className="btn btn-default btn-squared color-primary btn-outline-light-petrol  flex-grow-1 mentee_btn">Book a Session</button>
                                        <button onClick={() => navigate('/chat', { state: user.id })} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Chat</button>
                                    </div>
                                </div>
                            </div>

                        ))}

                        {/* {requestList && requestList.length > 0 && (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb-main user-member justify-content-sm-between">
                                        <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                            <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                                <h4 className="text-capitalize fw-500 breadcrumb-title">Requested Connections </h4>
                                            </div>
                                        </div>

                                        <div style={{ cursor: 'pointer' }} onClick={() => {
                                            setShowMoreR(!showMoreR)
                                        }} class="view_all text-center">{showMoreR ? "View Less" : "View All"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}

                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">Requested Connections</h4>
                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                    setShowMoreR(!showMoreR)
                                }} class="view_all text-center">{showMoreR ? "View Less" : "View All"}
                                </div>
                            </div>
                        </div>


                        {requestList && requestList.slice(0, 3).map((user) => (
                            <div className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <a href="#">
                                                    <h6 className="mt-0  fw-500">{user.name}</h6>
                                                </a>
                                                <p className="fs-13 color-light mb-0">{user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": ""}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.rating.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                                {/* <span className="badge badge-round btn-light-petrol mt-10">{user.mentee_number}</span> */}
                                            </div>

                                        </div>
                                    </div>

                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Key Skill</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{!i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_employee}</span>
                                            <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span> */}
                                        </ul>
                                    </div>

                                    <div className="layout-button">
                                        <button onClick={() => navigate('/mentor_profile', { state: user })} type="button" className="btn btn-default btn-squared color-primary btn-outline-light-petrol flex-grow-1 mentee_btn px-10">View Profile</button>
                                        {user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <>
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 px-25"> Accept </button>
                                            <button onClick={() => rejectReqst(user.id)} type="button" className="btn btn-no btn-default btn-squared flex-grow-1 px-25"> Reject </button>
                                            </>
                                            // <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn"> Accept </button>
                                        }
                                        {/* <button type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1"> {user.mentee_chat} </button> */}
                                    </div>
                                </div>
                            </div>

                        ))}
                        {requestList && showMoreR && requestList.slice(3).map((user) => (
                            <div className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <a href="#">
                                                    <h6 className="mt-0  fw-500">{user.name}</h6>
                                                </a>
                                                <p className="fs-13 color-light mb-0">{user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": ""}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.rating.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                                {/* <span className="badge badge-round btn-light-petrol mt-10">{user.mentee_number}</span> */}
                                            </div>

                                        </div>
                                    </div>

                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Key Skill</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{!i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_employee}</span>
                                            <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span> */}
                                        </ul>
                                    </div>

                                    <div className="layout-button">
                                        <button onClick={() => navigate('/mentor_profile', { state: user})} type="button" className="btn btn-default btn-squared color-primary btn-outline-light-petrol flex-grow-1 mentee_btn">View Profile</button>
                                        {user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :<>
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 px-25"> Accept </button>
                                            <button onClick={() => rejectReqst(user.id)} type="button" className="btn btn-no btn-default btn-squared flex-grow-1 px-25"> Reject </button>
                                            </>
                                        }
                                        {/* <button type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1"> {user.mentee_chat} </button> */}
                                    </div>
                                </div>
                            </div>

                        ))}

                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">Recommended Mentors</h4>
                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                    setShowMoreRC(!showMoreRC)
                                }} class="view_all text-center">{showMoreRC ? "View Less" : "View All"}
                                </div>                            </div>
                        </div>

                        {recomanded && recomanded.slice(0, 3).map((user) => (
                            <div className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <a href="#">
                                                    <h6 className="mt-0  fw-500">{user.name}</h6>
                                                </a>
                                                <p className="fs-13 color-light mb-0">{user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": ""}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.rating.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                                {/* <span className="badge badge-round btn-light-petrol mt-10">{user.percentageMatch}%</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Key Skills</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{!i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                            <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span> */}
                                        </ul>
                                    </div>

                                    {/* <div className="user-group-people">
                                        <p className="mt-15">{user.mentoring}</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            <span className="badge badge-square btn-outline-orange me-10">{user.public}</span>
                                            <span className="badge badge-square btn-outline-orange me-10">{user.plus_one}</span>
                                        </ul>
                                    </div> */}
                                    <div className="layout-button">
                                        <button onClick={() => navigate('/mentor_profile', { state: user })} type="button" className="btn btn-default btn-squared color-primary btn-outline-light-petrol flex-grow-1 mentee_btn">View Profile</button>
                                        {/* <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button> */}
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :<>
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 px-25"> Accept </button>
                                            <button onClick={() => rejectReqst(user.id)} type="button" className="btn btn-no btn-default btn-squared flex-grow-1 px-25"> Reject </button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))}
                        {recomanded && showMoreRC && recomanded.slice(3).map((user) => (
                            <div className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <a href="#">
                                                    <h6 className="mt-0  fw-500">{user.name}</h6>
                                                </a>
                                                <p className="fs-13 color-light mb-0">{user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": ""}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.rating.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                                {/* <span className="badge badge-round btn-light-petrol mt-10">{user.percentageMatch}%</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Key Skills</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{!i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                            <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span> */}
                                        </ul>
                                    </div>

                                    {/* <div className="user-group-people">
                                        <p className="mt-15">{user.mentoring}</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            <span className="badge badge-square btn-outline-orange me-10">{user.public}</span>
                                            <span className="badge badge-square btn-outline-orange me-10">{user.plus_one}</span>
                                        </ul>
                                    </div> */}
                                    <div className="layout-button">
                                        <button onClick={() => navigate('/mentor_profile', { state: user})} type="button" className="btn btn-default btn-squared color-primary btn-outline-light-petrol flex-grow-1 mentee_btn px-10">View Profile</button>
                                        {/* <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button> */}
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :<>
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 px-25"> Accept </button>
                                            <button onClick={() => rejectReqst(user.id)} type="button" className="btn btn-no btn-default btn-squared flex-grow-1 px-25"> Reject </button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))}


                    </div>
                </div>
            </div>

            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>


    );
}

export default My_Mentor;
