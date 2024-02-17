import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import mentee_img from '../../img/mentee_feedback.svg';
import mentor_img from '../../img/mentor_feedback.svg';
import small_star from '../../img/small_star.svg';

const data = [
    { id: 1, serial_id: "-", eid_id: "-", email: "-", first_name: "-", last_name: "-", division: "-", country: "-", location: "-", function: "-", role: "-" },
];

function View_Ratings() {
    const {state} = useLocation()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [listOfAcceptedMentee, setListOfAcceptedMentee] = useState([])
    const [listOfAcceptedMentor, setListOfAcceptedMentor] = useState([])
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
        getProgramMentee()
        getProgramMentor()
    },[])

    const getProgramMentee = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state?.id,
            "role": "mentee" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-ratings`, requestOptions)
        .then(response => response.json())
        .then(result => {
        //    let pp = []
        //     result?.list?.map((i) => {
        //         pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
        //     })
            console.log(result)
            setListOfAcceptedMentee(result?.allrating)

          })
        .catch(error => console.log('error', error));
        
   } 
    const getProgramMentor = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state?.id,
            "role":"mentor" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-ratings`, requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log("000-----------",result)
            // let pp = []
            // result?.list?.map((i) => {
            //     pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
            // })
            console.log(result)
            setListOfAcceptedMentor(result?.allrating)

          })
        .catch(error => console.log('error', error));
        
   } 

    const [showFilter, setShowFilter] = useState(false)

    const showModal = () => {
        setShowFilter(prevStat => !prevStat)
        // alert(showFilter)
    }


    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Rating</h4>
                                        </div>
                                    </div>

                                    {/* <div class="layout-button">
                                        <button type="button" class="btn btn-primary btn-default btn-squared px-15">Mandatory</button>
                                        <button type="button" class="btn btn-outline-primary btn-squared color-primary px-15">Mentees (50)</button>
                                    </div> */}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card card-default card-md">
                                    <div className="">
                                        <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                                <Tabs >
                                                    <TabList className="nav nav-tabs vertical-tabs">
                                                        <Tab>Mentees Rating</Tab>
                                                        <Tab>Mentors Rating</Tab>
                                                    </TabList>

                                                    <TabPanel className="tab-content">
                                                        <div className="row">
                                                            {listOfAcceptedMentee && listOfAcceptedMentee.map((user) => (
                                                                <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1 px-25">
                                                                    <div className="">
                                                                    <div className="col-md-12 mb-15">
                                                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                            <div className="media-body d-flex align-items-center mt-20 mx-10">
                                                                                <img src={user?.user_meta?.image_url == "" ? mentee_img : user?.user_meta?.image_url} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                                                                <div>
                                                                                    <h6 style={{color:"#72B8BF"}} className="fw-700">{user?.user_meta?.name}</h6>
                                                                                    {/* <p style={{color:'black'}} className="fs-12 fw-700 mb-0">{user?.feedback}</p> */}
                                                                                </div>
                                                                            </div>

                                                                            
                                                                        </div>
                                                                    </div>

                                                                    <div className='row'>
                                                                    <div className="col-md-4 text-center mb-20">
                                                                    <div className='d-flex justify-content-center'>
                                                                            <h3>{user?.rating1}</h3>
                                                                            <img src={small_star} style={{width:'20px', height:'20px'}} className="rounded-circle bg-opacity-primary" />
                                                                        </div>
                                                                        <h6 style={{color:"black"}} className="fw-500">Effectiveness of the Program</h6>
                                                                        </div>

                                                                        <div className="col-md-4 text-center mb-20">
                                                                    <div className='d-flex justify-content-center'>
                                                                            <h3>{user?.rating2}</h3>
                                                                            <img src={small_star} style={{width:'20px', height:'20px'}} className="me-20 rounded-circle bg-opacity-primary" />
                                                                        </div>
                                                                        <h6 style={{color:"black"}} className="fw-500">Program Structure and Delivery</h6>
                                                                        </div>

                                                                        <div className="col-md-4 text-center mb-20">
                                                                    <div className='d-flex justify-content-center'>
                                                                            <h3>{user?.rating3}</h3>
                                                                            <img src={small_star} style={{width:'20px', height:'20px'}} className="me-20 rounded-circle bg-opacity-primary" />
                                                                        </div>
                                                                        <h6 style={{color:"black"}} className="fw-500">Did the Program meet its objectives</h6>
                                                                        </div>

                                                                    <p className='mr-10'>{user?.feedback}</p>
            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                             ))} 
                                                            
                                                            
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel>
                                                        <div className="row">
                                                        {listOfAcceptedMentor && listOfAcceptedMentor.map((user) => (
                                                                <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1 px-25">
                                                                    <div className="">
                                                                    <div className="col-md-12 mb-15">
                                                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                            <div className="media-body d-flex align-items-center mt-20 mx-10">
                                                                                <img src={user?.user_meta?.image_url == "" ? mentor_img : user?.user_meta?.image_url} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                                                                <div>
                                                                                    <h6 style={{color:"#006666"}} className="fw-700">{user?.user_meta?.name}</h6>
                                                                                    {/* <p style={{color:'black'}} className="fs-12 fw-700 mb-0">{user?.feedback}</p> */}
                                                                                </div>
                                                                            </div>

                                                                            
                                                                        </div>
                                                                    </div>

                                                                    <div className='row'>
                                                                    <div className="col-md-4 text-center mb-20">
                                                                    <div className='d-flex justify-content-center'>
                                                                            <h3>{user?.rating1}</h3>
                                                                            <img src={small_star} style={{width:'20px', height:'20px'}}  />
                                                                        </div>
                                                                        <h6 style={{color:"black"}} className="fw-500">Effectiveness of the Program</h6>
                                                                        </div>

                                                                        <div className="col-md-4 text-center mb-20">
                                                                    <div className='d-flex justify-content-center'>
                                                                            <h3>{user?.rating2}</h3>
                                                                            <img src={small_star} style={{width:'20px', height:'20px'}} />
                                                                        </div>
                                                                        <h6 style={{color:"black"}} className="fw-500">Program Structure and Delivery</h6>
                                                                        </div>

                                                                        <div className="col-md-4 text-center mb-20">
                                                                    <div className='d-flex justify-content-center'>
                                                                            <h3>{user?.rating3}</h3>
                                                                            <img src={small_star} style={{width:'20px', height:'20px'}} />
                                                                        </div>
                                                                        <h6 style={{color:"black"}} className="fw-500">Did the Program meet its objectives</h6>
                                                                        </div>

                                                                    <p className='mr-10'>{user?.feedback}</p>
            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                             ))} 
                                                        </div>
                                                    </TabPanel>
                                                </Tabs>
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

export default View_Ratings;
