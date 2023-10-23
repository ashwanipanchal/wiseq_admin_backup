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
let workExp = ""
let locc = ""
let cSkilll = ""
let bSkilll = ""
function Browse_Mentee() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [menteeSearch, setmenteeSearch] = useState("")
    const [showMore, setShowMore] = useState(false)
    const [showMoreR, setShowMoreR] = useState(false)
    const [recomanded, setRecomanded] = useState([])
    const [myMentee, setMyMentee] = useState([])
    const [exp, setExp] = useState("")
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
        EventEmitter.subscribe('searchField', event => {
            console.log("event", event)
            setmenteeSearch(event)
        })
    }, [])

    useEffect(() => {
        getMenteeList()
        getRecommandedList()
    }, [])

    const getRecommandedList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/recommended-mentees`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("rec", response)
        if (response.success) {
            setRecomanded(response.data)
        }
        console.log("recomanded list", response)
    }
    const getMenteeList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentee`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("all menetee", response)
        if (response.success) {
            setMyMentee(response.data)
        }
    }

    const sendRequest = async (id) => {
        // console.log(id)
        // return
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/match-making/requests/${id.id}`, {
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
            getMenteeList()
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
            getMenteeList()
        }
    }

    const ExpFilter = async (e) => {
        workExp = `yearsOfExperience=${e}`
        let furl;

        if (locc != "" || bSkilll != "" || cSkilll != "") {
            if (locc != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + workExp

            }

            if (locc != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + workExp

            }
            if (locc != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (locc != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = workExp
        }

        console.log(furl)
        console.log(e)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/recommended-mentees?${furl}`, {
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
        workExp = `yearsOfExperience=${e}`
        let furl;

        if (locc != "" || bSkilll != "" || cSkilll != "") {
            if (locc != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + workExp

            }

            if (locc != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + workExp

            }
            if (locc != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (locc != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = workExp
        }

        console.log(furl)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee?${furl}`, {
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
        locc = `workLocation=${e}`
        let furl;




        if (workExp != "" || bSkilll != "" || cSkilll != "") {
            if (workExp != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (workExp == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + locc

            }

            if (workExp != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (workExp == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + locc

            }
            if (workExp != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        }
        else {
            furl = locc
        }
        console.log(furl)
        console.log(e)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/recommended-mentees?${furl}`, {
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
        locc = `workLocation=${e}`
        let furl;




        if (workExp != "" || bSkilll != "" || cSkilll != "") {
            if (workExp != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (workExp == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + locc

            }

            if (workExp != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (workExp == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + locc

            }
            if (workExp != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        }
        else {
            furl = locc
        }
        console.log(furl)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee?${furl}`, {
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
        cSkilll = `coreSkills=${e}`
        let furl;

        if (workExp != "" || bSkilll != "" || locc != "") {
            if (workExp != "" || bSkilll == "" || locc == "") {
                furl = workExp + "&" + cSkilll
            }
            if (workExp == "" || bSkilll != "" || locc == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || bSkilll == "" || locc != "") {
                furl = cSkilll + "&" + locc

            }

            if (workExp != "" || bSkilll != "" || locc == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp == "" || bSkilll != "" || locc != "") {
                furl = cSkilll + "&" + bSkilll + "&" + locc

            }
            if (workExp != "" || bSkilll == "" || locc != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = cSkilll
        }

        console.log(furl)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/recommended-mentees?${furl}`, {
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
        cSkilll = `coreSkills=${e}`
        let furl;

        if (workExp != "" || bSkilll != "" || locc != "") {
            if (workExp != "" || bSkilll == "" || locc == "") {
                furl = workExp + "&" + cSkilll
            }
            if (workExp == "" || bSkilll != "" || locc == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || bSkilll == "" || locc != "") {
                furl = cSkilll + "&" + locc

            }

            if (workExp != "" || bSkilll != "" || locc == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp == "" || bSkilll != "" || locc != "") {
                furl = cSkilll + "&" + bSkilll + "&" + locc

            }
            if (workExp != "" || bSkilll == "" || locc != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = cSkilll
        }

        console.log(furl)
        console.log(e)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee?${furl}`, {
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
        bSkilll = `businessSkills=${e}`
        let furl;


        if (workExp != "" || cSkilll != "" || locc != "") {
            if (workExp != "" || cSkilll == "" || locc == "") {
                furl = workExp + "&" + bSkilll
            }
            if (workExp == "" || cSkilll != "" || locc == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || cSkilll == "" || locc != "") {
                furl = bSkilll + "&" + locc

            }

            if (workExp != "" || cSkilll != "" || locc == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp == "" || cSkilll != "" || locc != "") {
                furl = bSkilll + "&" + cSkilll + "&" + locc

            }
            if (workExp != "" || cSkilll == "" || locc != "") {
                furl = workExp + "&" + locc + "&" + bSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = bSkilll
        }
        console.log(furl)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/recommended-mentees?${furl}`, {
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
        bSkilll = `businessSkills=${e}`
        let furl;


        if (workExp != "" || cSkilll != "" || locc != "") {
            if (workExp != "" || cSkilll == "" || locc == "") {
                furl = workExp + "&" + bSkilll
            }
            if (workExp == "" || cSkilll != "" || locc == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || cSkilll == "" || locc != "") {
                furl = bSkilll + "&" + locc

            }

            if (workExp != "" || cSkilll != "" || locc == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp == "" || cSkilll != "" || locc != "") {
                furl = bSkilll + "&" + cSkilll + "&" + locc

            }
            if (workExp != "" || cSkilll == "" || locc != "") {
                furl = workExp + "&" + locc + "&" + bSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = bSkilll
        }
        console.log(furl)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/mentee?${furl}`, {
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

    const filteredDataMentor = menteeSearch
        ? myMentee.filter(x =>
            // alert(JSON.stringify(x,null,2))
            x.name.toLowerCase().includes(menteeSearch.toLowerCase())
        )
        : myMentee;

    const filteredDataMentorRec = menteeSearch
        ? recomanded.filter(x =>
            // alert(JSON.stringify(x,null,2))
            x.name.toLowerCase().includes(menteeSearch.toLowerCase())
        )
        : recomanded;
    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">Mentees</h4>
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

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">Recommended Mentees</h4>
                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                    setShowMoreR(!showMoreR)
                                }} class="view_all text-center">{showMoreR ? "View Less" : "View All"}
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
                                                <span className="badge badge-round btn-petrol mt-10">{user.scores}</span>
                                                {/* <span className="badge badge-round btn-petrol mt-10">{user.percentageMatch}%</span> */}

                                            </div>
                                        </div>
                                    </div>

                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Skills to Develop</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoyes me-10">{i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoyes me-10">{user.mentee_hcm}</span>
                                            <span className="badge badge-square btn-outline-emlpoyes">{user.mentee_three}</span> */}
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
                                        <button onClick={() => navigate('/mentee_profile', { state: user })} type="button" className="btn btn-default btn-squared color-petrol btn-outline-petrol flex-grow-1">View Profile</button>
                                        {/* <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button> */}
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1"> Accept </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))}
                        {recomanded && showMoreR && filteredDataMentorRec.slice(3).map((user) => (
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
                                                <span className="badge badge-round btn-petrol mt-10">{user.scores}</span>
                                                {/* <span className="badge badge-round btn-petrol mt-10">{user.percentageMatch}%</span> */}

                                            </div>
                                        </div>
                                    </div>

                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Skills to Develop</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoyes me-10">{i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoyes me-10">{user.mentee_hcm}</span>
                                            <span className="badge badge-square btn-outline-emlpoyes">{user.mentee_three}</span> */}
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
                                        <button onClick={() => navigate('/mentee_profile', { state: user })} type="button" className="btn btn-default btn-squared color-petrol btn-outline-petrol flex-grow-1">View Profile</button>
                                        {/* <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button> */}
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1"> Accept </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between">
                                <h4 className="text-capitalize fw-500 breadcrumb-title">List of all Mentees </h4>
                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                    setShowMore(!showMore)
                                }} class="view_all text-center">{showMore ? "View Less" : "View All"}
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
                                                <span className="badge badge-round btn-petrol mt-10">{user.scores}</span>
                                                {/* <span className="badge badge-round btn-petrol mt-10">{user.percentageMatch}%</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Skills to Develop</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoyes me-10">{i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoyes me-10">{user.mentee_hcm}</span>
                                            <span className="badge badge-square btn-outline-emlpoyes">{user.mentee_three}</span> */}
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
                                        <button onClick={() => navigate('/mentee_profile', { state: user })} type="button" className="btn btn-default btn-squared color-petrol btn-outline-petrol flex-grow-1">View Profile</button>
                                        {/* <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button> */}
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1"> Accept </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))}
                        {myMentee && showMore && filteredDataMentor.slice(3).map((user) => (
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
                                                <span className="badge badge-round btn-petrol mt-10">{user.scores}</span>
                                                {/* <span className="badge badge-round btn-petrol mt-10">{user.percentageMatch}%</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                    <div className="user-group-people">
                                        <p className="mt-15">Skills to Develop</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoyes me-10">{i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                            {/* <span className="badge badge-square btn-outline-emlpoyes me-10">{user.mentee_hcm}</span>
                                            <span className="badge badge-square btn-outline-emlpoyes">{user.mentee_three}</span> */}
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
                                        <button onClick={() => navigate('/mentee_profile', { state: user })} type="button" className="btn btn-default btn-squared color-petrol btn-outline-petrol flex-grow-1">View Profile</button>
                                        {/* <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button> */}
                                        {!user.isRequested ?
                                            <button onClick={() => sendRequest(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Connect</button>:
                                            user.requestedByMe ?
                                            <button type="button" className="btn btn-request-petrol btn-default btn-squared flex-grow-1"> Requested </button> :
                                            <button onClick={() => acceptReqst(user)} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1"> Accept </button>
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

export default Browse_Mentee;
