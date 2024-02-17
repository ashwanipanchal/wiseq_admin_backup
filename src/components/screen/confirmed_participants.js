import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL_APPLSURE_MENTORING } from '../../services/Config';

const data = [
    { id: 1, serial_id: "-", eid_id: "-", email: "-", first_name: "-", last_name: "-", division: "-", country: "-", location: "-", function: "-", role: "-" },
];

function Confirmed_Participants() {
    const navigate = useNavigate()
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
            "program_id":state?.myState?.id,
            "role":"mentee" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist-accepted`, requestOptions)
        .then(response => response.json())
        .then(result => {
        //    let pp = []
        //     result?.list?.map((i) => {
        //         pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
        //     })
            console.log(result.list)
            setListOfAcceptedMentee(result?.list)

          })
        .catch(error => console.log('error', error));
        
   } 
    const getProgramMentor = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state?.myState?.id,
            "role":"mentor" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist-accepted`, requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log("000-----------",result)
            // let pp = []
            // result?.list?.map((i) => {
            //     pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
            // })
            // console.log(pp)
            setListOfAcceptedMentor(result?.list)

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Confirmed Participants</h4>
                                        </div>
                                    </div>

                                    <div class="layout-button">
                                        <button type="button" class="btn btn-outline-primary btn-squared color-primary px-15" onClick={() => navigate("/match_making")}>Match-Make</button>
                                        <button type="button" class="btn btn-primary btn-default btn-squared px-15"  onClick={() => navigate(-1)}>Add</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card card-default card-md">
                                    <div className="">
                                        <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                                <Tabs>
                                                    <TabList className="nav nav-tabs vertical-tabs">
                                                        <Tab>Mentees</Tab>
                                                        <Tab>Mentors</Tab>
                                                    </TabList>

                                                    <TabPanel className="tab-content">
                                                        <div className="row">
                                                            {listOfAcceptedMentee && listOfAcceptedMentee.map((user) => (
                                                                <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">S.no.</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">EID</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Email</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">First Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Last Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Division</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Country</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Location</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Function</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Role</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title"></span>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {/* {data.map((user) => ( */}

                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                -
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                            {user?.organisation_user?.emp_id}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user?.user_meta?.email}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user?.user_meta?.name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.last_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.division}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.country}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.work_location}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.functional_area}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user?.organisation_user?.role}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="d-flex align-content-center">
                                                                                                    <li>
                                                                                                        <div className="dropdown dropleft">
                                                                                                            <button className="btn-link border-0 bg-transparent p-0">
                                                                                                                <img src={horizontal_img} className="svg" onClick={() => showModal()} />
                                                                                                            </button>



                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>

                                                                                            {showFilter ?
                                                                                                <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                    <div className="dropdown-item">Remove</div>
                                                                                                </div> : ""}
                                                                                        </td>
                                                                                    </tr>


                                                                                 {/* ))}  */}

                                                                            </tbody>
                                                                        </table>
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
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">S.no.</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">EID</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Email</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">First Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Last Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Division</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Country</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Location</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Function</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Role</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title"></span>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {/* {data.map((user) => ( */}

                                                                                <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                -
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                            {user?.organisation_user?.emp_id}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user?.user_meta?.email}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user?.user_meta?.name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.last_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.division}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.country}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.work_location}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.organisation_user?.functional_area}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user?.organisation_user?.role}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="d-flex align-content-center">
                                                                                                    <li>
                                                                                                        <div className="dropdown dropleft">
                                                                                                            <button className="btn-link border-0 bg-transparent p-0">
                                                                                                                <img src={horizontal_img} className="svg" onClick={() => showModal()} />
                                                                                                            </button>



                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>

                                                                                            {showFilter ?
                                                                                                <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                    <div className="dropdown-item">Remove</div>
                                                                                                </div> : ""}
                                                                                        </td>
                                                                                    </tr>


                                                                                {/* ))} */}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>))}
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

export default Confirmed_Participants;
