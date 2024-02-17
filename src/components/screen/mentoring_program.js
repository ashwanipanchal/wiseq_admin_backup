import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL_APPLSURE, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

const data = [
    { id: 1, program_id: "-", program_name: "-", skills: "-", duration: "-", type: "-", program_parti: "-", starting_on: "-", status: "-", finishing: "-", completion_percen: "50%" },
];

function Mentoring_Program() {
  const navigate = useNavigate()
    const [programTemplateList, setProgramTemplateList] = useState([])
    const [publishedList, setPublishedList] = useState([])
    const [progressList, setProgressList] = useState([])
    const [deleteID, setDeleteID] = useState("")
    const [pastList, setPastList] = useState([])
    const [indexValue, setIndexValue] = useState(-1);
    const [indexValue1, setIndexValue1] = useState(-1);
    const [indexValue2, setIndexValue2] = useState(-1);
    const [indexValue3, setIndexValue3] = useState(-1);
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

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

    const [showFilter, setShowFilter] = useState(false)

    // const showModal = () => {
    //     setShowFilter(prevStat => !prevStat)
    // }

    useEffect(() => {
      getProgramList()
    },[])

    const getProgramList = async() =>{
      const token = await localStorage.getItem("program_token_old")
    const btoken = `Bearer ${token}`;   
      // const btoken = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTJiNTY4ZmU0MDE4NmEyZDFmZDA4MjU1NmYxMmNiZTA5NDI2ODJiZTAxNTM1OGJhNTRlOWRmNDY1NmQzNzJjMjk0ZTBmYWI0YzE2ZGMxYzkiLCJpYXQiOjE3MDEwNTk4MjAuOTYxMjQxLCJuYmYiOjE3MDEwNTk4MjAuOTYxMjQ1LCJleHAiOjE3MzI2ODIyMjAuOTU3NDksInN1YiI6IjVjY2I5NWQwLWQwYWQtNDFjZS1iODEyLWY5YjVkZTRiMTJlMCIsInNjb3BlcyI6W119.BkZl-BXCxoYIcjXoEYOymy1I4kEVNroQy9wmDirrIuPt2tMVcRJLMXSYjGzua3TchY8cKtQGCZSW0skYinM8m5ixRatJGPIrhpjwlphY5Kfp_MquMRANJATt6C8yH3nsUtTSWR-DLdQYgIqt7HGYrxOGe2UC33_iZdY0Z9dHMOy3apio1fdlJ9xEG8hs_m3-susi_EYeeoa2CUYZpA08HqqZbm3qQXnTj3wtLv80nHWGlp-HefUyKkf5dJwJ8M9a--_H4xpvG2uNWWdX8TcX344oWSo-ttGKu5wrWz3QkHM_0KaJsVarQQP4QXhko3n1J5lvO-9uFz_wme1fpTkiipVySP_ioKzGgfkPbQxQPdp-9eftKpcpEfxvZiwzaZyZmPTK0GQjEt9JSLgoL3Us57KbO9S3nBXvYpkUmlPtU-ryChaxffnTByMyTroAw8ayMA3nu8ORHCi79Hhk4xxg3sq8GTr7PeZ4ijLxaqrQ3e-tvlVXhAVFB2s2zIdUxvt45D0NjsJrTOnf4D4ZNYuU5ggsZc1V3AwwSlPFxV8o8b2B_W7f5JZh5MEkfCq9BpCvkDpzX1TBeA9VgeeErqxIlYzH0uD640SUvvHJlNqQP3X8izpxt8e2r2Kbc8Tu2_rJU6cORhs7VF7UFhT3od5cuhpwZiAs9YCqmP1RdDlTX78`;
      const res = await fetch(`${BASE_URL_APPLSURE}program/template-list`, {
          method: 'GET',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
      })
      const response = await res.json()
      console.log("program list", response)
      if(response.status){
          setProgramTemplateList(response.template)
      }
      // https://www.wiseq.co/ndwiseqbackend/api/program/template-list
    }

    const fetchListData = async(index) => {
      let pp = []
      if(index == 1){
        pp.push(0,1)
      }
      if(index == 2){
        pp.push(4)
      }
      if(index == 3){
        pp.push(3)
      }

      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "status":pp
    });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch(`${BASE_URL_APPLSURE_MENTORING}program-list-published`, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(pp,"==",result)
          if(index == 1){
            setPublishedList(result.programList)
          }
          if(index == 2){
            setProgressList(result.programList)
          }
          if(index == 3){
            setPastList(result.programList)
          }
         
      })
      .catch(error => console.log('error', error));

      
    }


    const deleteProgram = async() => {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "program_id":deleteID
    });

    console.log(raw)
    return
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch(`${BASE_URL_APPLSURE_MENTORING}program-delete`, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
          alert("Program Deleted Successfully")
          // navigate(-1)
      })
      .catch(error => console.log('error', error));
    }


    const activeAProgram = (user) => {
      // console.log(user)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "program_id":user.id,
        "status":4
    });

    // console.log(localStorage.getItem("program_token_node"))
    // console.log(raw)
    // return
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch(`${BASE_URL_APPLSURE_MENTORING}program-status-change`, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
          alert("Program Activated Successfully")
          // navigate(-1)
      })
      .catch(error => console.log('error', error));
    }


    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded"
        >
          <div className="demo5 mt-30 mb-25">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          Mentoring Programs
                        </h4>
                      </div>
                    </div>

                    <NavLink className="navbar-link" to="/create_program">
                      <div className="action-btn">
                        <div className="btn px-15 btn-primary">
                          Create Program
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card card-default card-md">
                    <div className="">
                      <div className="tab-wrapper">
                        <div className="dm-tab tab-horizontal">
                          <Tabs defaultIndex={0} onSelect={(index) => fetchListData(index)}>
                            <TabList className="nav nav-tabs vertical-tabs organisation-tab">
                              <Tab>Programs Created</Tab>
                              <Tab>Programs Published</Tab>
                              <Tab>Programs In-Progress</Tab>
                              <Tab>Past Batches</Tab>
                            </TabList>

                            <TabPanel className="tab-content">
                              <div className="row">
                              {programTemplateList&&programTemplateList.map((user, index) => (
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

                                                                                {/* {programTemplateList&&programTemplateList.map((user) => ( */}

                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                -
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div style={{cursor:"pointer", color:'#f8a046'}} onClick={() => navigate("/program_create_profile_view",{state:user})} className="userDatatable-content">
                                                                                                
                                                                                                {user.name.substring(
                                                                                                  0,
                                                                                                  4
                                                                                                )}
                                                                                                {user.name.length >
                                                                                                4
                                                                                                  ? "..."
                                                                                                  : ""}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                            {user.skills?.split(",")[0]?.substring(
                                                                                                  0,
                                                                                                  6
                                                                                                )}
                                                                                                {user.skills?.split(",")[0]?.length >
                                                                                                6
                                                                                                  ? "..."
                                                                                                  : "" }

                                                                                              {`${
                                                                                                  user.skills?.split(",").length > 1
                                                                                                    ? ` + ${
                                                                                                        user.skills?.split(",").length - 1
                                                                                                      }`
                                                                                                    : ""
                                                                                                }`}

                                                                                            {/* {user.skills?.split(",")
                                                                                                  .length > 1
                                                                                                  ? `
                                                                                                  ${
                                                                                                      user.skills?.split(
                                                                                                        ","
                                                                                                      )[0]
                                                                                                    } 
                                                                                                    + ${
                                                                                                      user.skills?.split(
                                                                                                        ","
                                                                                                      )?.length - 1
                                                                                                    }`
                                                                                                  : user.skills} */}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.duration}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.participation == 1 ? "Mandatory" : "Optional"}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                            {moment(
                                                                                                user.start_date
                                                                                              ).format("DD/MM/YY")}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="d-flex align-content-center">
                                                                                                    <li>
                                                                                                        <div className="dropdown dropleft">
                                                                                                            <button className="btn-link border-0 bg-transparent p-0">
                                                                                                                <img src={horizontal_img} className="svg" 
                                                                                                                  // showModal()
                                                                                                                  onClick={() =>{
                                                                                                                    if(index == indexValue){
                                                                                                                        setIndexValue(-1)
                                                                                                                    }else{
                                                    
                                                                                                                        setIndexValue(index)
                                                                                                                    }
                                                                                                                    // showModal()
                                                                                                                }
                                                                                                                  } />
                                                                                                            </button>



                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>

                                                                                            {/* {showFilter ?
                                                                                                <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                    <NavLink className="" to="/program_create_profile_view">
                                                                                                      <div onClick={() => navigate("/program_create_profile_view",{state:user})} className="dropdown-item">view</div>
                                                                                                      </NavLink>
                                                                                                    <a className="dropdown-item" href="#">edit</a>
                                                                                                    <NavLink className="" to="/program_settings"><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                                                                </div> : ""} */}

                                                                                                {index == indexValue && (
                                                                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                    {/* <NavLink className="" to="/program_create_profile_view"> */}
                                                                                                      <div onClick={() => navigate("/program_create_profile_view",{state:user})} className="dropdown-item">view</div>
                                                                                                      {/* </NavLink> */}
                                                                                                    {/* <a className="dropdown-item" href="#">edit</a> */}
                                                                                                    <div onClick={() => navigate("/edit_program",{state:user})} className="dropdown-item">edit</div>
                                                                                                    <NavLink className="" to="/program_settings" state={{ myState: "created", data:user }}><div className="dropdown-item" href="#">Program Settings</div></NavLink>
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
                              ))}
                                                        </div>
                              {/* <div className="col-lg-12">
                                <div className="row">
                                  <div
                                    style={{
                                      backgroundColor: "#feeee6",
                                      padding: "50px",
                                      borderRadius: "10px",
                                    }}
                                    className="col-lg-12 col-sm-12 col-md-12 mb-25"
                                  >
                                    <div>
                                      <h3 style={{ textAlign: "center" }}>
                                        We are currently developing this
                                        feature. It will be available to you
                                        soon.
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </TabPanel>

                            <TabPanel>
                              <div className="row">
                              {publishedList&&publishedList.map((user, index) => (
                                <div className="col-lg-12">
                                  <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                      <table className="table mb-0 table-borderless">
                                        <thead>
                                          <tr className="userDatatable-header">
                                            <th>
                                              <span className="userDatatable-title">
                                                Program ID
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Name
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Skill(s)
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Duration
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Type
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Participation
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Starting on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Status
                                              </span>
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
                                                  {user.program_id}
                                                </div>
                                              </td>

                                              <td>
                                                <div style={{cursor:"pointer",color:'#f8a046'}} onClick={() => navigate("/program_publish_profile_view",{state:user})} className="userDatatable-content">
                                                {user.name.substring(0,
                                                                      4
                                                                    )}
                                                                    {user.name.length >
                                                                    4
                                                                      ? "..."
                                                                      : ""}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {/* {user.skills?.split(",")
                                                            .length > 1
                                                            ? `${
                                                                user.skills?.split(
                                                                  ","
                                                                )[0]
                                                              } + ${
                                                                user.skills?.split(
                                                                  ","
                                                                )?.length - 1
                                                              }`
                                                            : user.skills} */}

                                                  {user.skills?.split(",")[0]?.substring(
                                                      0,
                                                      6
                                                    )}
                                                    {user.skills?.split(",")[0]?.length >
                                                    6
                                                      ? "..."
                                                      : "" }

                                                  {`${
                                                      user.skills?.split(",").length > 1
                                                        ? ` + ${
                                                            user.skills?.split(",").length - 1
                                                          }`
                                                        : ""
                                                    }`}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                  {user.duration}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                  {user.type}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {user.participation == 1 ? "Mandatory" : "Optional"}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {moment(
                                                      user.start_date
                                                    ).format("DD/MM/YY")}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                  {user.status == 0 ? "Published" : "Activated"}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            onClick={() =>{
                                                              if(index == indexValue1){
                                                                  setIndexValue1(-1)
                                                              }else{

                                                                  setIndexValue1(index)
                                                              }
                                                              // showModal()
                                                          }
                                                            }
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {/* {showFilter ? (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                    <NavLink
                                                      className=""
                                                      to="/program_publish_profile_view"
                                                    >
                                                      <div className="dropdown-item">
                                                        view
                                                      </div>
                                                    </NavLink>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                    >
                                                      edit
                                                    </a>
                                                    <NavLink className="" to="/program_settings" state={{ myState: "published" }}><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                  </div>
                                                ) : (
                                                  ""
                                                )} */}
                                                 {index == indexValue1 && (
                                                    <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                      {/* <NavLink className="" to="/program_create_profile_view"> */}
                                                        <div onClick={() => navigate("/program_publish_profile_view",{state:user})} className="dropdown-item">view</div>
                                                        {/* </NavLink> */}
                                                      {/* <a className="dropdown-item" href="#">edit</a> */}
                                                      <div onClick={() => navigate("/edit_program",{state:user})} className="dropdown-item">edit</div>
                                                      <NavLink className="" to="/program_settings" state={{ myState: "published", data:user }}><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                      {/* {user.status == 0 && (
                                                        <div onClick={() => activeAProgram(user)} className="dropdown-item">Active</div>
                                                        )} */}
                                                      {/* <div onClick={() => {
                                                        setDeleteID(user.id)
                                                        showModal()
                                                        }} className="dropdown-item">Delete</div> */}
                                                  </div>
                                                  )}
                                              </td>
                                            </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>))}
                              </div>
                              {/* <div className="col-lg-12">
                              <div className="row">
                                <div
                                  style={{
                                    backgroundColor: "#feeee6",
                                    padding: "50px",
                                    borderRadius: "10px",
                                  }}
                                  className="col-lg-12 col-sm-12 col-md-12 mb-25"
                                >
                                  <div>
                                    <h3 style={{ textAlign: "center" }}>
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                            </TabPanel>

                            {/* Progress List Tab */}
                            <TabPanel className="tab-content">
                              <div className="row">
                              {progressList&&progressList.map((user, index) => (
                                <div className="col-lg-12">
                                  <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                      <table className="table mb-0 table-borderless">
                                        <thead>
                                          <tr className="userDatatable-header">
                                            <th>
                                              <span className="userDatatable-title">
                                                Program ID
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Name
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Skill(s)
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Duration
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Type
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Participation
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Started on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Finishing on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Completion
                                              </span>
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
                                                  {user.program_id}
                                                </div>
                                              </td>

                                              <td>
                                                <div style={{cursor:"pointer",color:'#f8a046'}} onClick={() => navigate("/program_progress_profile_view",{state:user})} className="userDatatable-content">
                                                {user.name.substring(0,
                                                                      4
                                                                    )}
                                                                    {user.name.length >
                                                                    4
                                                                      ? "..."
                                                                      : ""}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {/* {user.skills?.split(",")
                                                  .length > 1
                                                  ? `${
                                                      user.skills?.split(
                                                        ","
                                                      )[0]
                                                    } + ${
                                                      user.skills?.split(
                                                        ","
                                                      )?.length - 1
                                                    }`
                                                  : user.skills} */}
                                                  {user.skills?.split(",")[0]?.substring(
                                                      0,
                                                      6
                                                    )}
                                                    {user.skills?.split(",")[0]?.length >
                                                    6
                                                      ? "..."
                                                      : "" }

                                                  {`${
                                                      user.skills?.split(",").length > 1
                                                        ? ` + ${
                                                            user.skills?.split(",").length - 1
                                                          }`
                                                        : ""
                                                    }`}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                  {user.duration}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                  {user.type}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {user.participation == 1 ? "Mandatory" : "Optional"}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {moment(
                                                      user.start_date
                                                    ).format("DD/MM/YY")}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {moment(
                                                      user.end_date
                                                    ).format("DD/MM/YY")}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.hasOwnProperty('totalProgress') ? `${user.totalProgress}%` : "0%"}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            // onClick={() =>{}
                                                            //   // showModal()
                                                            // }
                                                            onClick={() =>{
                                                              if(index == indexValue2){
                                                                  setIndexValue2(-1)
                                                              }else{

                                                                  setIndexValue2(index)
                                                              }
                                                              // showModal()
                                                          }}
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>
                                                {index == indexValue2 && (
                                                    <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                      {/* <NavLink className="" to="/program_create_profile_view"> */}
                                                        <div onClick={() => navigate("/program_progress_profile_view",{state:user})} className="dropdown-item">view</div>
                                                        {/* </NavLink> */}
                                                      {/* <a className="dropdown-item" href="#">edit</a> */}
                                                      <div onClick={() => navigate("/edit_program",{state:user})} className="dropdown-item">edit</div>
                                                      <NavLink className="" to="/program_settings" state={{ myState: "progress", data:user }}><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                      {/* {user.status == 0 && (
                                                        <div onClick={() => activeAProgram(user)} className="dropdown-item">Active</div>
                                                        )} */}
                                                      {/* <div onClick={() => {
                                                        setDeleteID(user.id)
                                                        showModal()
                                                        }} className="dropdown-item">Delete</div> */}
                                                  </div>
                                                  )}

                                                {/* {showFilter ? (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                    <NavLink
                                                      className=""
                                                      to="/program_progress_profile_view"
                                                    >
                                                      <div className="dropdown-item">
                                                        view
                                                      </div>
                                                    </NavLink>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                    >
                                                      edit
                                                    </a>
                                                    <NavLink className="" to="/program_settings" state={{ myState: "progress" }}><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                  </div>
                                                ) : (
                                                  ""
                                                )} */}
                                              </td>
                                            </tr>
                                          {/* ))} */}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>))}
                              </div>
                              {/* <div className="col-lg-12">
                              <div className="row">
                                <div
                                  style={{
                                    backgroundColor: "#feeee6",
                                    padding: "50px",
                                    borderRadius: "10px",
                                  }}
                                  className="col-lg-12 col-sm-12 col-md-12 mb-25"
                                >
                                  <div>
                                    <h3 style={{ textAlign: "center" }}>
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                            </TabPanel>

                            <TabPanel className="tab-content">
                            {pastList&&pastList.map((user, index) => (
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                      <table className="table mb-0 table-borderless">
                                        <thead>
                                          <tr className="userDatatable-header">
                                            <th>
                                              <span className="userDatatable-title">
                                                Program ID
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Name
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Skill(s)
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Duration
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Type
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Participation
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Started on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Finished on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Status
                                              </span>
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
                                                  {user.program_id}
                                                </div>
                                              </td>

                                              <td>
                                                <div style={{cursor:"pointer",color:'#f8a046'}} onClick={() => navigate("/program_past_profile_view",{state:user})} className="userDatatable-content">
                                                {user.name.substring(0,
                                                                      4
                                                                    )}
                                                                    {user.name.length >
                                                                    4
                                                                      ? "..."
                                                                      : ""}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {/* {user.skills?.split(",")
                                                  .length > 1
                                                  ? `${
                                                      user.skills?.split(
                                                        ","
                                                      )[0]
                                                    } + ${
                                                      user.skills?.split(
                                                        ","
                                                      )?.length - 1
                                                    }`
                                                  : user.skills} */}
                                                  {user.skills?.split(",")[0]?.substring(
                                                      0,
                                                      6
                                                    )}
                                                    {user.skills?.split(",")[0]?.length >
                                                    6
                                                      ? "..."
                                                      : "" }

                                                  {`${
                                                      user.skills?.split(",").length > 1
                                                        ? ` + ${
                                                            user.skills?.split(",").length - 1
                                                          }`
                                                        : ""
                                                    }`}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                  {user.duration}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                  {user.type}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {user.participation == 1 ? "Mandatory" : "Optional"}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {moment(
                                                      user.start_date
                                                    ).format("DD/MM/YY")}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content fw-600">
                                                {moment(
                                                      user.end_date
                                                    ).format("DD/MM/YY")}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.completion_percen}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {/* {user.status} */}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            onClick={() =>{

                                                              {index == indexValue3 && (
                                                                <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                    <div onClick={() => navigate("/program_progress_profile_view",{state:user})} className="dropdown-item">view</div>
                                                                  <NavLink className="" to="/program_settings" state={{ myState: "progress", data:user }}><div className="dropdown-item" href="#">Dublicate</div></NavLink>
                                                                  {/* {user.status == 0 && (
                                                                    <div onClick={() => activeAProgram(user)} className="dropdown-item">Active</div>
                                                                    )} */}
                                                                  {/* <div onClick={() => {
                                                                    setDeleteID(user.id)
                                                                    showModal()
                                                                    }} className="dropdown-item">Delete</div> */}
                                                              </div>
                                                              )}
                                                            }
                                                              // showModal()
                                                            }
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {showFilter ? (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                    <NavLink
                                                      className=""
                                                      to="/past_batches"
                                                    >
                                                      <div className="dropdown-item">
                                                        view
                                                      </div>
                                                    </NavLink>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                    >
                                                      Duplicate
                                                    </a>
                                                  </div>
                                                ) : (
                                                  ""
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
                              {/* <div className="col-lg-12">
                              <div className="row">
                                <div
                                  style={{
                                    backgroundColor: "#feeee6",
                                    padding: "50px",
                                    borderRadius: "10px",
                                  }}
                                  className="col-lg-12 col-sm-12 col-md-12 mb-25"
                                >
                                  <div>
                                    <h3 style={{ textAlign: "center" }}>
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div> */}
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
        <Side_Bar
          onClick={toggle}
          sideBarOpen={
            windowSize.innerWidth > 768 && sideBarOpen
              ? true
              : windowSize.innerWidth > 768 && !sideBarOpen
              ? false
              : windowSize.innerWidth < 768 && sideBarOpen
              ? false
              : true
          }
        />

    <Modal show={showHello} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
              Are you sure you want to delete this program?
              </h4>

              <div class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() =>{
                    deleteProgram()
                  } }
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default Mentoring_Program;
