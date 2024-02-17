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

function IDP_Status() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [approvedList, setApprovedList] = useState([])
    const [pendingList, setPendingList] = useState([])
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
        getApprovedList()
        getPendingList()
    },[])

    const getApprovedList = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.data?.id,
            "condition":"1" //1== approved, pending
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-idps`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setApprovedList(result.list)
        //    let pp = []
        //     result?.list?.map((i) => {
        //         pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
        //     })
            console.log(result)
            // setListOfAcceptedMentee(result?.list)

          })
        .catch(error => console.log('error', error));
        
   } 
    const getPendingList = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.data?.id,
            "condition":"0" //1== approved, pending
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-idps`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("000-----------",result)
            setPendingList(result.list)
            // let pp = []
            // result?.list?.map((i) => {
            //     pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
            // })
            // console.log(pp)
            // setListOfAcceptedMentor(result?.list)

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">IDP Status</h4>
                                        </div>
                                    </div>

                                    <div class="layout-button">
                                        <button type="button" class="btn btn-primary btn-default btn-squared px-15">Mandatory</button>
                                        <button type="button" class="btn btn-outline-primary btn-squared color-primary px-15">Mentees (50)</button>
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
                                                        <Tab>Approved ({approvedList.length})</Tab>
                                                        <Tab>Pending ({pendingList.length})</Tab>
                                                    </TabList>

                                                    <TabPanel className="tab-content">
                                                        <div className="row">
                                                            {approvedList && approvedList.map((user) => (
                                                                <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">Mentee</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Mentor</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">IDP Name</span>
                                                                                    </th>

                                                                                    {/* <th>
                                                                                        <span className="userDatatable-title"></span>
                                                                                    </th> */}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {/* {data.map((user) => ( */}

                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="userDatatable-content">
                                                                                            {user?.user_meta?.name}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td>
                                                                                        <div className="userDatatable-content">
                                                                                            {user.individual_development_plan_assigneds.map((i)=>(
                                                                                                <p>

                                                                                                    {i?.user_meta?.name}
                                                                                                </p>
                                                                                                ))}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td>
                                                                                        <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.name}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td>
                                                                                        <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                
                                                                                            <li>
                                                                                                <button onClick={() => {navigate("/idp_full_view",{state:user})}} className="btn px-15 btn-primary ms-10">
                                                                                                    View
                                                                                                </button>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </td>
                                                                                </tr>


                                                                               {/* ))}   */}

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
                                                        {pendingList && pendingList.map((user) => (
                                                            <div className="col-lg-12">
                                                            <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                <div className="table-responsive">
                                                                    <table className="table mb-0 table-borderless">
                                                                        <thead>
                                                                            <tr className="userDatatable-header">
                                                                                <th>
                                                                                    <span className="userDatatable-title">Mentee</span>
                                                                                </th>

                                                                                <th>
                                                                                    <span className="userDatatable-title">Mentor</span>
                                                                                </th>

                                                                                <th>
                                                                                    <span className="userDatatable-title">IDP Name</span>
                                                                                </th>

                                                                                {/* <th>
                                                                                    <span className="userDatatable-title"></span>
                                                                                </th> */}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            {/* {data.map((user) => ( */}

                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="userDatatable-content">
                                                                                            {user?.user_meta?.name}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td>
                                                                                        <div className="userDatatable-content">
                                                                                            {user.individual_development_plan_assigneds.map((i)=>(
                                                                                                <p>

                                                                                                    {i?.user_meta?.name}
                                                                                                </p>
                                                                                                ))}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td>
                                                                                        <div className="userDatatable-content color-status fw-600">
                                                                                            {user?.name}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td>
                                                                                        <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                
                                                                                            <li>
                                                                                                <button onClick={() => {navigate("/idp_full_view",{state:user})}} className="btn px-15 btn-primary ms-10">
                                                                                                    View
                                                                                                </button>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </td>
                                                                                </tr>


                                                                           {/* ))}   */}

                                                                        </tbody>
                                                                    </table>
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

export default IDP_Status;
