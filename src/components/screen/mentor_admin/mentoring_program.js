import horizontal_img from '../../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Progress_banner from '../../screen_components/progress_banner'
import { BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import moment from 'moment';
const data = [
    { id: 1, program_id: "-", program_name: "-", skills: "-", duration: "-", type: "-", program_parti: "-", starting_on: "-", status: "-", finishing: "-", completion_percen: "50%" },
];

const data1 = [
    { id: 1, program_id: "#123", program_name: "High Potenti...", skills: "-", duration: "8 Months", type: "-", program_parti: "-", starting_on: "06/02/23", finishing: "10/02/23", completion_percen: "50%" },
];

function Mentoring_Program() {
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [publishedList, setPublishedList]=useState([])
    const [progressList, setProgressList]=useState([])
    const [pastList, setPastList]=useState([])
    const [indexValue, setIndexValue] = useState(-1);
    const [indexValue1, setIndexValue1] = useState(-1);
    const [indexValue2, setIndexValue2] = useState(-1);
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

    const [showFilter, setShowFilter] = useState(false)

    const showModal = () => {
        setShowFilter(prevStat => !prevStat)
        // alert(showFilter)
    }

    useEffect(() => {
        fetchListData(0)
    },[])

    const fetchListData = async(index) => {
        // console.log(index)
        // return
    //   let pp = []
    //   if(index == 0){
    //     pp.push(0,1)
    //   }
    //   if(index == 2){
    //     pp.push(4)
    //   }
    //   if(index == 3){
    //     pp.push(3)
    //   }

      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "status":index == 0 ? "1": index == 1 ? "4" : "3"
    });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch(`${BASE_URL_APPLSURE_MENTORING}user/user-program-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(index,"==",result)
        //   return
          if(index == 0){
            setPublishedList(result.programs)
          }
          if(index == 1){
            setProgressList(result.programs)
          }
          if(index == 2){
            setPastList(result.programs)
          }
         
      })
      .catch(error => console.log('error', error));

      
    }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-default card-md">
                                    <div className="">
                                        <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                                <Tabs defaultIndex={0} onSelect={(index) => fetchListData(index)}>
                                                    <TabList className="nav nav-tabs vertical-tabs mentoring-tabs">
                                                        <Tab>Upcoming Programs</Tab>
                                                        <Tab>Programs in Progress</Tab>
                                                        <Tab>Programs Completed</Tab>
                                                    </TabList>

                                                    <TabPanel className="tab-content">
                                                    {publishedList && publishedList.map((user, index) => (
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program ID</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Skill(s)</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Duration</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Type</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Participation</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Starting on</span>
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
                                                                                                {user?.program_model?.program_id}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div style={{cursor:"pointer"}} onClick={() => navigate("/mentoring_program_upcoming",{state:user})} className="userDatatable-content">
                                                                                            {/* {user?.program_model?.name} */}
                                                                                            {user?.program_model?.name.substring(0,
                                                                                                    4
                                                                                                    )}
                                                                                                    {user?.program_model?.name.length >
                                                                                                    4
                                                                                                    ? "..."
                                                                                                    : ""}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.skills?.split(",")
                                                                                                .length > 1
                                                                                                ? `${
                                                                                                    user?.program_model?.skills?.split(
                                                                                                        ","
                                                                                                    )[0]
                                                                                                    } + ${
                                                                                                    user?.program_model?.skills?.split(
                                                                                                        ","
                                                                                                    )?.length - 1
                                                                                                    }`
                                                                                                : user?.program_model?.skills}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.duration}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.participation == 1 ? "Mandatory" : "Optional"}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {moment(
                                                                                                user?.program_model?.start_date
                                                                                                ).format("DD/MM/YY")}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="d-flex align-content-center">
                                                                                                    <li>
                                                                                                        <div className="dropdown dropleft">
                                                                                                            <button className="btn-link border-0 bg-transparent p-0">
                                                                                                                <img src={horizontal_img} className="svg" onClick={() => {
                                                                                                                    if(index == indexValue){
                                                                                                                        setIndexValue(-1)
                                                                                                                    }else{
                                                    
                                                                                                                        setIndexValue(index)
                                                                                                                    }
                                                                                                                    // showModal()
                                                                                                                }} />
                                                                                                            </button>



                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>

                                                                                            {index == indexValue && (
                                                                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                  <NavLink className="" to="/mentoring_program_upcoming" state={user}><div className="dropdown-item">View</div></NavLink>
                                                                                              </div>
                                                                                                )}
                                                                                        </td>
                                                                                    </tr>


                                                                                {/* ))} */}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>))}
                                                        {/* <Progress_banner/> */}
                                                    </TabPanel>

                                                    <TabPanel>
                                                    {progressList && progressList.map((user, index) => (
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program ID</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Skill(s)</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Duration</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Type</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Participation</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Started on</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Finishing on</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Completion</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title"></span>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {/* {data1.map((user) => ( */}

                                                                                    <tr>
                                                                                    <td>
                                                                                            <div className="userDatatable-content">
                                                                                            {user?.program_model?.program_id}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div style={{cursor:"pointer"}} onClick={() => navigate("/mentoring_program_progress",{state:user})} className="userDatatable-content">
                                                                                            {user?.program_model?.name.substring(0,
                                                                                                    4
                                                                                                    )}
                                                                                                    {user?.program_model?.name.length >
                                                                                                    4
                                                                                                    ? "..."
                                                                                                    : ""}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.skills?.split(",")
                                                                                                .length > 1
                                                                                                ? `${
                                                                                                    user?.program_model?.skills?.split(
                                                                                                        ","
                                                                                                    )[0]
                                                                                                    } + ${
                                                                                                    user?.program_model?.skills?.split(
                                                                                                        ","
                                                                                                    )?.length - 1
                                                                                                    }`
                                                                                                : user?.program_model?.skills}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.duration}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.participation == 1 ? "Mandatory" : "Optional"}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {moment(
                                                                                                user?.program_model?.start_date
                                                                                                ).format("DD/MM/YY")}
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {moment(
                                                                                                user?.program_model?.end_date
                                                                                                ).format("DD/MM/YY")}
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="d-flex align-content-center">
                                                                                                    <li>
                                                                                                        <div className="dropdown dropleft">
                                                                                                            <button className="btn-link border-0 bg-transparent p-0">
                                                                                                                <img src={horizontal_img} className="svg" onClick={() => {
                                                                                                                    if(index == indexValue1){
                                                                                                                        setIndexValue1(-1)
                                                                                                                    }else{
                                                    
                                                                                                                        setIndexValue1(index)
                                                                                                                    }
                                                                                                                }} />
                                                                                                            </button>



                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            {index == indexValue1 && (
                                                                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                  <NavLink className="" to="/mentoring_program_progress" state={user}><div className="dropdown-item">View</div></NavLink>
                                                                                              </div>
                                                                                                )}
                                                                                            {/* {showFilter ?
                                                                                                <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                    <NavLink className="" to="/mentoring_program_progress"><div className="dropdown-item">view Details</div></NavLink>
                                                                                                </div> : ""} */}
                                                                                        </td>
                                                                                    </tr>


                                                                                {/* ))} */}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>))}
                                                        {/* <Progress_banner/> */}
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                    {pastList && pastList.map((user, index) => (
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program ID</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Skill(s)</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Duration</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Type</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Participation</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Started on</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Finishing on</span>
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
                                                                                            {user?.program_model?.program_id}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div style={{cursor:"pointer"}} onClick={() => navigate("/mentoring_program_completed",{state:user})} className="userDatatable-content">
                                                                                            {user?.program_model?.name.substring(0,
                                                                                                    4
                                                                                                    )}
                                                                                                    {user?.program_model?.name.length >
                                                                                                    4
                                                                                                    ? "..."
                                                                                                    : ""}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {/* {user?.program_model?.skills} */}
                                                                                            {user?.program_model?.skills?.split(",")
                                                                                                .length > 1
                                                                                                ? `${
                                                                                                    user?.program_model?.skills?.split(
                                                                                                        ","
                                                                                                    )[0]
                                                                                                    } + ${
                                                                                                    user?.program_model?.skills?.split(
                                                                                                        ","
                                                                                                    )?.length - 1
                                                                                                    }`
                                                                                                : user?.program_model?.skills}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.duration}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.program_model?.participation == 1 ? "Mandatory" : "Optional"}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {moment(
                                                                                                user?.program_model?.start_date
                                                                                                ).format("DD/MM/YY")}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                            {moment(
                                                                                                user?.program_model?.end_date
                                                                                                ).format("DD/MM/YY")}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="d-flex align-content-center">
                                                                                                    <li>
                                                                                                        <div className="dropdown dropleft">
                                                                                                            <button className="btn-link border-0 bg-transparent p-0">
                                                                                                                <img src={horizontal_img} className="svg" onClick={() => {
                                                                                                                    if(index == indexValue2){
                                                                                                                        setIndexValue2(-1)
                                                                                                                    }else{
                                                    
                                                                                                                        setIndexValue2(index)
                                                                                                                    }
                                                                                                                }} />
                                                                                                            </button>



                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            {index == indexValue2 && (
                                                                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                  <NavLink className="" to="/mentoring_program_completed" state={user}><div className="dropdown-item">View</div></NavLink>
                                                                                              </div>
                                                                                                )}
                                                                                            {/* {showFilter ?
                                                                                                <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                    <NavLink className="" to="/mentoring_program_completed"><div className="dropdown-item">view Details</div></NavLink>
                                                                                                </div> : ""} */}
                                                                                        </td>
                                                                                    </tr>


                                                                                {/* ))} */}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>))}
                                                        {/* <Progress_banner/> */}
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

export default Mentoring_Program;
