import team_img from '../../../img/tm1.png';
import Side_bar from './sidebar';
import authornav_img from '../../../img/user_pic.png';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import EventEmitter from "reactjs-eventemitter";

const data = [
    { id: 1, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Skills to Develop", mentee_employee: "Public Speaking", mentee_hcm: "HCM", mentee_three: "+3", mentoring: "Mentoring on", public: "Public Speaking", plus_one: "+1" },
    { id: 2, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Skills to Develop", mentee_employee: "Public Speaking", mentee_hcm: "HCM", mentee_three: "+3", mentoring: "Mentoring on", public: "Public Speaking", plus_one: "+1" },
    { id: 3, mentee_name: "Jane Arora", mentee_position: "HR Manager - Employee Engage...", mentee_number: "83", mentee_skill: "Skills to Develop", mentee_employee: "Public Speaking", mentee_hcm: "HCM", mentee_three: "+3", mentoring: "Mentoring on", public: "Public Speaking", plus_one: "+1" },
];

const data1 = [
    { id: 1, mentee_name: "Kaylynn Dias", mentee_position: "Assi. Manager - Recruitment", mentee_number: "59", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagement", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Accept" },
    { id: 2, mentee_name: "Kaylynn Dias", mentee_position: "Assi. Manager - Recruitment", mentee_number: "59", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagement", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Accept" },
];

function Browse_Mentee() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [mentorSearch, setmentorSearch] = useState("")
    const [requestList, setRequestList] = useState([])
    const [recomanded, setRecomanded] = useState([])
    const [myMentee, setMyMentee] = useState([])
    const [exp, setExp] = useState("")
    const [showMore, setShowMore] = useState(false)
    const [showMoreR, setShowMoreR] = useState(false)
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
        getMentorList()
        getRecommandedList()
    }, [])

    useEffect(() => {
        EventEmitter.subscribe('searchField', event => {
            console.log("event", event)
            setmentorSearch(event)
        })
    }, [])


    const getRecommandedList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentee/recommended-mentors`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("recomanded list", response)
        if (response.success) {
            setRecomanded(response.data)
        }
    }
    const getMentorList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentor`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("my menetee", response)
        if (response.success) {
            setMyMentee(response.data)
        }
    }

    const sendRequest = async (id) => {
        console.log(id)
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/match-making/requests/${id}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("send reqst respo", response)
        if (response.success) {
            getRecommandedList()
        }
    }

    const acceptReqst = async (id) => {
        const btoken = `Bearer ${token}`;
        const body = {

            "status": "accepted"

        }
        const res = await fetch(`https://api.wiseqglobal.com/api/match-making/requests/${id}`, {
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
            getMentorList()
        }

    }

    const ExpFilter = async (e) => {
        console.log(e)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee/recommended-mentors?yearsOfExperience=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setRecomanded(response.data)
        }
    }

    const ExpFilter1 = async (e) => {
        console.log(e)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor?yearsOfExperience=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMyMentee(response.data)
        }
    }
    const WLFilter = async (e) => {
        console.log(e)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee/recommended-mentors?workLocation=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setRecomanded(response.data)
        }
    }
    const WLFilter1 = async (e) => {
        console.log(e)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor?workLocation=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMyMentee(response.data)
        }
    }

    const CSFilter = async (e) => {
        console.log(e)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee/recommended-mentors?coreSkills=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setRecomanded(response.data)
        }
    }
    const CSFilter1 = async (e) => {
        console.log(e)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor?coreSkills=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMyMentee(response.data)
        }
    }
    const BSFilter = async (e) => {
        console.log(e)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee/recommended-mentors?businessSkills=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setRecomanded(response.data)
        }
    }
    const BSFilter1 = async (e) => {
        console.log(e)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor?businessSkills=${e}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMyMentee(response.data)
        }
    }

    const filteredDataMentor = mentorSearch
        ? myMentee.filter(x =>
            // alert(JSON.stringify(x,null,2))
            x.name.toLowerCase().includes(mentorSearch.toLowerCase())
        )
        : myMentee;

        console.log(filteredDataMentor)

    const filteredDataMentorRec = mentorSearch
        ? recomanded.filter(x =>
            // alert(JSON.stringify(x,null,2))
            x.name.toLowerCase().includes(mentorSearch.toLowerCase())
        )
        : recomanded;
    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">Mentors</h4>
                                {/* <div className="card card-Vertical card-default card-md">

                                    <div className="">
                                        <form>
                                            <div className="row">


                                                <div className="col-lg-2 col-md-4 mb-15">
                                                    <div className="countryOption">
                                                        <select value={exp} onChange={e => {
                                                            setExp(e.target.value)
                                                            ExpFilter(e.target.value)
                                                            ExpFilter1(e.target.value)
                                                        }} className="form-select custom_selects" aria-label="Default select example">
                                                            <option value="">Select Experience</option>
                                                            <option value="1">1 Years</option>
                                                            <option value="2">2 Years</option>
                                                            <option value="3">3 Years</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-md-4 mb-15">
                                                    <div className="countryOption">
                                                        <select onChange={e => {
                                                            WLFilter(e.target.value)
                                                            WLFilter1(e.target.value)
                                                        }} className="form-select custom_selects" aria-label="Default select example">
                                                            <option value="">Select Location</option>
                                                            <option value="delhi">New Delhi</option>
                                                            <option value="mumbai">Mumbai</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-md-4 mb-15">
                                                    <div className="countryOption">
                                                        <select className="form-select custom_selects" aria-label="Default select example">
                                                            <option selected>Growth Score</option>
                                                            <option value="1">9 Score</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-md-4 mb-15">
                                                    <div className="countryOption">
                                                        <select onChange={e => {
                                                            CSFilter(e.target.value)
                                                            CSFilter1(e.target.value)
                                                        }} className="form-select custom_selects" aria-label="Default select example">
                                                            <option value="">Select Core Skills</option>
                                                            <option value="react">React</option>
                                                            <option value="node">Node</option>
                                                            <option value="php">PHP</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-md-4 mb-15">
                                                    <div className="countryOption">
                                                        <select onChange={e => {
                                                            BSFilter(e.target.value)
                                                            BSFilter1(e.target.value)
                                                        }} className="form-select custom_selects" aria-label="Default select example">
                                                            <option value="">Select Business Skills</option>
                                                            <option value="coding">Coding</option>
                                                            <option value="production">Production</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-md-4 mb-15">
                                                    <div className="countryOption">
                                                        <select className="form-select custom_selects" aria-label="Default select example">
                                                            <option selected>All Filters</option>
                                                            <option value="1">3</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-12">

                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">Recommended Mentors</h4>
                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                    setShowMore(!showMore)
                                }} class="view_all text-center">{showMore ? "View Less" : "View All"}
                                </div>
                            </div>
                        </div>

                        {recomanded && filteredDataMentorRec.slice(0, 3).map((user) => (
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
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn"> Accept </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))}

                        {recomanded && showMore && filteredDataMentorRec.slice(3).map((user) => (
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
                                                {/* <span className="badge badge-round btn-petrol mt-10">{user.percentageMatch}%</span> */}
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
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn"> Accept </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))}


                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">List of all Mentors </h4>
                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                    setShowMoreR(!showMoreR)
                                }} class="view_all text-center">{showMoreR ? "View Less" : "View All"}
                                </div>
                            </div>
                        </div>

                        {myMentee && filteredDataMentor.slice(0, 3).map((user) => (
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
                                                {/* <span className="badge badge-round btn-petrol mt-10">{user.percentageMatch}%</span> */}
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
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn"> Accept </button>
                                        }
                                        {/* <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button> */}
                                    </div>
                                </div>
                            </div>

                        ))}

                        {myMentee && showMoreR && filteredDataMentor.slice(3).map((user) => (
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
                                                {/* <span className="badge badge-round btn-petrol mt-10">{user.percentageMatch}%</span> */}
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
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn"> Accept </button>
                                        }
                                        {/* <button onClick={() => sendRequest(user.id)} type="button" className="btn btn-light-petrol btn-default btn-squared flex-grow-1 ment_btn">Connect</button> */}
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

export default Browse_Mentee;
