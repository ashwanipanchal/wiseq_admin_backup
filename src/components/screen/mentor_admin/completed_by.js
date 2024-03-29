// import team_img from '../../img/tm1.png';
// import search_img from '../../img/svg/search1.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import authornav_img from '../../../img/user_pic.png';
import moment from 'moment'
import { BASE_URL, BASE_URL_APPLSURE } from '../../../services/Config';

const data = [
    { id: 1, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 2, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 3, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 4, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 5, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
];

function Completed_By() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [learningDetailsFull, setLearningDetailsFull] = useState({})
    const [single, setSingle] = useState("")
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [audiencesList, setAudiencesList] = useState([])
    const [audiencesListNew, setAudiencesListNew] = useState([])
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
        getCheckedAud()
        getAudiences()
    },[])
    
    const getAudiences = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state}/audience`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("audience list", response)
        setAudiencesList(response.data)
        setLearningDetailsFull({state:state, mentee:response.data})
    }
    const getCheckedAud = async() => {
        const btoken = `Bearer ${token}`;
        const body = {
            "learning_id":state
        }
        const res = await fetch(`${BASE_URL_APPLSURE}get-learning-verified`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("audience list cehcked", response)
        setAudiencesListNew(response.getdata)
        // setLearningDetailsFull({state:state, mentee:response.data})
    }

    const removeAudience = async(id) => {
        return
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state}/user?userId=${id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("audience removed", response)
        getAudiences()
        // setAudiencesList(response.data)
    }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Learning Completed By </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* <div className="col-md-12 mb-25">
                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                    <img src={search_img} alt="search" className="svg" />
                                    <input className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Search here..." aria-label="Search" />
                                </div>
                            </div> */}
                            {audiencesList && audiencesList.map((i, index) => {
                                if(i.completedOn != null){
                                    return(
                                        // (
                                            <div className="col-md-12 mb-15">
                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                                <div className="media-body d-flex align-items-center">
                                                    <img src={i.imageUrl == "" ? authornav_img : i.imageUrl} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                                    <div>
                                                        <h6 className="fw-500">{i.name}</h6>
                                                        <p className="fs-12 color-light mb-0">{i.jobTitle}</p>
                                                        <p className="fs-14 color-light mb-0">Completed on: <span style={{color:"#639FA5"}}>{moment(i.completedOn).format("DD/MM/YY")}</span></p>
                                                    </div>
                                                </div>
                                                {audiencesListNew && audiencesListNew[index]?.verified_on != null ? <button onClick={() => {
                                                    // setSingle(i.userId),
                                                    
                                                    }} style={{ color:'#fff'}} className='btn btn-petrol'>Checked</button> :
                                                    <button onClick={() => {
                                                        // setSingle(i.userId),
                                                        navigate("/check_learning_mentee", {state:{menteeId:i.userId,learningId:state}})
                                                        }} style={{ color:'#fff'}} className='btn btn-petrol'>Check</button>
                                                }
                                                {/* {i.verified_on != null ? 
                                                    <button onClick={() => {
                                                    // setSingle(i.userId),
                                                    
                                                    }} style={{ color:'#fff'}} className='btn btn-petrol'>Checked</button>

                                                 : 
                                                <button onClick={() => {
                                                    // setSingle(i.userId),
                                                    navigate("/check_learning_mentee", {state:{menteeId:i.userId,learningId:state}})
                                                    }} style={{ color:'#fff'}} className='btn btn-petrol'>Check</button>} */}
                                            </div>
                                        </div>
                                        // )
                                    )
                                }
                                })}
                            
{/* 
                            <div className="col-md-12 mb-15">
                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                    <div className="media-body d-flex align-items-center">
                                        <img src={team_img} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                        <div>
                                            <h6 className="fw-500">Anika Schleifer</h6>
                                            <p className="fs-12 color-light mb-0">Senior Director - Human Resources</p>
                                        </div>
                                    </div>
                                    <button style={{backgroundColor:'#EF4F5F', color:'#fff'}} className='btn'>Remove</button>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Completed_By;
