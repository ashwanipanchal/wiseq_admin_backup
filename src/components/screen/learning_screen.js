import horizontal_img from '../../img/svg/more-verticals.svg';
import edit_img from '../../img/svg/edit.svg';
import search_img from '../../img/svg/search1.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment'
import { BASE_URL } from '../../services/Config'
import Multiselect from 'multiselect-react-dropdown';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

const data = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", created_on: "12/12/23" },
];

const data1 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora + 5", assigned_on: "12/12/23", finish_by: "12/12/23", status_by: "Assigned" },
    { id: 2, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora + 5", assigned_on: "12/12/23", finish_by: "12/12/23", status_by: "Assigned" },
];

const data2 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora + 5", assigned_on: "12/12/23", finish_by: "12/12/23", completed_on: "12/12/23", status_by: "In Progress" },
];

const data3 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "-", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23" },
];

let fAreaF = ""

function Learning_Screen() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [createdLearning, setCreatedLearning] = useState([])
    const [completedLearning, setCompletedLearning] = useState([])
    const [verifiedLearning, setVerifiedLearning] = useState([])
    const [fAreas, setFAreas] = useState([])
    const [levels, setLevels] = useState([])
    const [finishDate, setFinishDate] = useState("")
    const [checked, setChecked] = useState(false)
    const [menteeList, setMenteeList] = useState([])
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMenteeForAssign, setSelectedMenteeForAssign] = useState([])
    const [assignedID, setAssignedID] = useState("")
    const [assignedLearning, setAssignedLearning] = useState([])
    const [filter, setFilter] = useState('');
    const [filter1, setFilter1] = useState('');
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [date, setDate] = useState("")

    const handleChangeFilter = event => {
      setFilter(event.target.value);
      FAreaFilter(event.target.value)
    }
    const handleChangeFilter1 = event => {
      setFilter1(event.target.value);
      LevelFilter(event.target.value)
    //   FAreaFilter(event.target.value)
    }
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
        getCreatedLearning()
        getAssignedLearning()
        getCompletedLearning()
        getVerifiedLearning()
        getDetails()
        getMyMentee()
    },[])

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const getCreatedLearning = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/created`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("created learning", response)
        setCreatedLearning(response.data)
    }

    const getAssignedLearning = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/assigned`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("assigned learning", response)
        setAssignedLearning(response.data)
    }

    const getCompletedLearning = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/completed`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("completed learning", response)
        setCompletedLearning(response.data)
    }
    const getVerifiedLearning = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/check-verified`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("completed learning", response)
        setVerifiedLearning(response.data)
    }

    const getDetails = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}organisation-info`,{
            method:'GET',
            headers:{
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
            },
        })
        const response = await res.json()
        const{success, data} = response
        if(success){
            if(data){
                setLevels(data.levels.split(','))
                setFAreas(data.functionalAreas.split(','))
            }
        }
    }

    const getMyMentee = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentee`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("mentee list", response)
        setMenteeList(response.data)
    }

    const onSelectMentee = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push(i.id)
            // setnewSelectedTools(temp)
        })
        setSelectedMentee(temp)
        setSelectedMenteeForAssign(temp1)
    }

    const onRemoveMentee = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push(i.id)
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentee(temp)
        setSelectedMenteeForAssign(temp1)
    }

    const assignedToMentee = async() => {
        if(!checked){

            if(selectedMenteeForAssign.length == 0){
                alert("Please select atleast one mentee")
                return
            }
        }
        if(date.length == ""){
            alert("Please enter finish by date")
            return
        }
        const btoken = `Bearer ${token}`;
        let temp = []
        menteeList.map((i) => {
            temp.push(i.id)
        })
        console.log(temp)
        const body = {
        "mentees": checked ? temp : selectedMenteeForAssign,
        // "finishBy":finishDate,
        "finishBy":value,
        // "finishBy":date
        }

        console.log(body)
        // return
        const res = await fetch(`${BASE_URL}learnings/${assignedID}/assign-to-mentees`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("assigned learning status", response)
        if(response.success){
            closeModal()
            alert("Learning has been assigned successfully")
            getCreatedLearning()
            getAssignedLearning()
        }
        // setCheckedAndVerifiedLearning(response.data)
    }


    const LevelFilter = async (e) => {
        let finalUrl;
        console.log(filter)
        console.log(filter1)
        

        if(e != ""){
            if(filter.length>0){
                finalUrl  = `levels=${e}&functionalArea=${filter}`
            }else{
                finalUrl  = `levels=${e}`
            }
        }else{
            if(filter.length>0){
                finalUrl  = `functionalArea=${filter}`
            }else{
                finalUrl =""
            }
            
        }
        console.log(finalUrl)
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${finalUrl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("level Filter" , response)
        if(response.success){
            setMenteeList(response.data)
        }
    }

    const FAreaFilter = async (e) => {
        let finalUrl;
        console.log(filter)
        console.log(filter1)
        

        if(e != ""){
            if(filter1.length>0){
                finalUrl  = `functionalArea=${e}&levels=${filter1}`
            }else{
                finalUrl  = `functionalArea=${e}`
            }
        }else{
            if(filter1.length>0){

                finalUrl  = `levels=${filter1}`
            }else{
                finalUrl =""
            }
        }
        console.log(finalUrl)
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${finalUrl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("Farea Filter" , response)
        if(response.success){
            setMenteeList(response.data)
        }

     
    }

    const showCalc = () => {
        setCalc(!calc)
    }

    const onChange = (e) => {
        console.log(e)
        setValue(moment(e).format("YYYY-MM-DD"))
        setDate(moment(e).format("DD/MM/YYYY"))
        showCalc()
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
                          Learnings
                        </h4>
                      </div>
                    </div>

                    <div class="layout-button">
                      <p className="filter_box me-10 mt-10">
                        <i class="las la-filter"></i> Filter
                      </p>
                      <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                        <img src={search_img} alt="search" className="svg" />
                        <input
                          className="me-sm-2 border-0 box-shadow-none ms-10"
                          type="search"
                          placeholder="Search members..."
                          aria-label="Search"
                        />
                      </div>
                      <NavLink className="" to="/create_learning">
                        <button
                          type="button"
                          class="btn btn-primary modal_btn_btn"
                        >
                          Create a Learning
                        </button>
                      </NavLink>
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
                              <Tab>Created</Tab>
                              <Tab>Assigned</Tab>
                              <Tab>Completed</Tab>
                              <Tab>Checked and Verified</Tab>
                            </TabList>
                            {/* Created Tab */}
                            <TabPanel className="tab-content">
                              <div className="row">
                                {createdLearning &&
                                  createdLearning.map((user) => (
                                    <div className="col-lg-12">
                                      <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                        <div className="table-responsive">
                                          <table className="table mb-0 table-borderless">
                                            <thead>
                                              <tr className="userDatatable-header">
                                                <th>
                                                  <span className="userDatatable-title">
                                                    Learning Name
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Skills Addressed
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Category
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Source Type
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Created On
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title"></span>
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <div
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                      navigate(
                                                        "/created_learning_profile",
                                                        { state: user }
                                                      )
                                                    }
                                                    className="userDatatable-content"
                                                  >
                                                    {user.learningName.substring(
                                                      0,
                                                      12
                                                    )}
                                                    {user.learningName.length >
                                                    12
                                                      ? "..."
                                                      : ""}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content">
                                                    {/* {user.skills} */}
                                                    {user.skills?.split(",")
                                                      .length > 2
                                                      ? `${
                                                          user.skills?.split(
                                                            ","
                                                          )[0]
                                                        } + ${
                                                          user.skills?.split(
                                                            ","
                                                          )?.length - 1
                                                        }`
                                                      : user.skills}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.category}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.sourceType}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.createdAt
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  {/* <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                                                                <li>
                                                                                                    <button onClick={() => navigate("/edit_learning", {state:user})} className="btn btn-icon btn-warning btn-squared">
                                                                                                        <img src={edit_img} alt="layers" className="svg" />
                                                                                                    </button>
                                                                                                </li>

                                                                                                <li>
                                                                                                    <button className="btn btn-icon btn-petrol btn-squared ms-10" onClick={() => {
                                                                                                        setAssignedID(user.id)
                                                                                                        showModal()
                                                                                                        }}>
                                                                                                        Assign
                                                                                                    </button>
                                                                                                </li>
                                                                                            </ul> */}
                                                  <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                    <li>
                                                      <button
                                                        onClick={() =>
                                                          navigate(
                                                            "/edit_created_learning",
                                                            { state: user }
                                                          )
                                                        }
                                                        className="btn btn-icon btn-warning btn-squared"
                                                      >
                                                        <img
                                                          src={edit_img}
                                                          alt="layers"
                                                          className="svg"
                                                        />
                                                      </button>
                                                    </li>

                                                    <li>
                                                      <button
                                                        className="btn btn-icon btn-primary btn-squared ms-10"
                                                        onClick={() => {
                                                          setAssignedID(
                                                            user.id
                                                          );
                                                          showModal();
                                                        }}
                                                      >
                                                        Assign
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </td>
                                              </tr>

                                              {/* <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.learning_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.skill_address}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.category_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.source_type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.created_on}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                                                                <li>
                                                                                                    <button className="btn btn-icon btn-warning btn-squared">
                                                                                                        <img src={edit_img} alt="layers" className="svg" />
                                                                                                    </button>
                                                                                                </li>

                                                                                                <li>
                                                                                                    <button className="btn btn-icon btn-primary btn-squared ms-10" onClick={showModal}>
                                                                                                        Assign
                                                                                                    </button>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </td>
                                                                                    </tr> */}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabPanel>

                            {/* Assigned Tab */}
                            <TabPanel>
                              <div className="row">
                                {assignedLearning &&
                                  assignedLearning.map((user) => (
                                    <div className="col-lg-12">
                                      <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                        <div className="table-responsive">
                                          <table className="table mb-0 table-borderless">
                                            <thead>
                                              <tr className="userDatatable-header">
                                                <th>
                                                  <span className="userDatatable-title">
                                                    Learning Name
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Skills Addressed
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Category
                                                  </span>
                                                </th>

                                                {/* <th>
                                                                                            <span className="userDatatable-title">Source Type</span>
                                                                                        </th> */}

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Assigned To
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Assigned On
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Finish By
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
                                              <tr>
                                                <td>
                                                  <div className="userDatatable-content">
                                                    {user.learningName.substring(
                                                      0,
                                                      12
                                                    )}
                                                    {user.learningName.length >
                                                    12
                                                      ? "..."
                                                      : ""}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content">
                                                    {/* {user.skills} */}
                                                    {user.skills?.split(",")
                                                      .length > 2
                                                      ? `${
                                                          user.skills?.split(
                                                            ","
                                                          )[0]
                                                        } + ${
                                                          user.skills?.split(
                                                            ","
                                                          )?.length - 1
                                                        }`
                                                      : user.skills}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.category}
                                                  </div>
                                                </td>

                                                {/* <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.sourceType}
                                                                                            </div>
                                                                                        </td> */}

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.audience[0]?.name +
                                                      `${
                                                        user.audience.length > 1
                                                          ? ` + ${
                                                              user.audience
                                                                .length - 1
                                                            }`
                                                          : ""
                                                      }`}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.createdAt
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.finishBy
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content color-status fw-600">
                                                    {user.status}
                                                  </div>
                                                </td>

                                                <td>
                                                  <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                    <li>
                                                      <button onClick={() => navigate("/edit_learning", {state:user})} className="btn btn-icon btn-warning btn-squared">
                                                        <img
                                                          src={edit_img}
                                                          alt="layers"
                                                          className="svg"
                                                        />
                                                      </button>
                                                    </li>

                                                    {/* <NavLink className="navbar-link" to="/created_learning_profile"> */}
                                                    <li>
                                                      <button
                                                        onClick={() =>
                                                          navigate(
                                                            "/assigned_learning_profile",
                                                            { state: user }
                                                          )
                                                        }
                                                        className="btn btn-icon btn-primary btn-squared ms-10"
                                                      >
                                                        View
                                                      </button>
                                                    </li>
                                                    {/* </NavLink> */}
                                                  </ul>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabPanel>

                            {/* Completed Tab */}
                            <TabPanel className="tab-content">
                              <div className="row">
                                {completedLearning &&
                                  completedLearning.map((user) => (
                                    <div className="col-lg-12">
                                      <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                        <div className="table-responsive">
                                          <table className="table mb-0 table-borderless">
                                            <thead>
                                              <tr className="userDatatable-header">
                                                <th>
                                                  <span className="userDatatable-title">
                                                    Learning Name
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Skills Addressed
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Category
                                                  </span>
                                                </th>

                                                {/* <th>
                                                                                            <span className="userDatatable-title">Source Type</span>
                                                                                        </th> */}

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Assigned To
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Assigned On
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Finish By
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Completed On
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
                                              <tr>
                                                <td>
                                                  <div className="userDatatable-content">
                                                    {user.learningName.substring(
                                                      0,
                                                      12
                                                    )}
                                                    {user.learningName.length >
                                                    12
                                                      ? "..."
                                                      : ""}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content">
                                                    {user.skills?.split(",")
                                                      .length > 2
                                                      ? `${
                                                          user.skills?.split(
                                                            ","
                                                          )[0]
                                                        } + ${
                                                          user.skills?.split(
                                                            ","
                                                          )?.length - 1
                                                        }`
                                                      : user.skills}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.category}
                                                  </div>
                                                </td>

                                                {/* <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.sourceType}
                                                                                            </div>
                                                                                        </td> */}

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.audience[0]?.name +
                                                      `${
                                                        user.audience.length > 2
                                                          ? `+${
                                                              user.audience
                                                                .length - 1
                                                            }`
                                                          : ""
                                                      }`}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.createdAt
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.finishBy
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.completedOn
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content color-orange fw-600">
                                                    {user.status}
                                                  </div>
                                                </td>

                                                <td>
                                                  <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                    {/* <NavLink className="navbar-link" to="/check_learning"> */}
                                                    <li>
                                                      <button
                                                        onClick={() =>
                                                          navigate(
                                                            "/check_learning",
                                                            { state: user }
                                                          )
                                                        }
                                                        className="btn btn-icon btn-primary btn-squared ms-10"
                                                      >
                                                        Check
                                                      </button>
                                                    </li>
                                                    {/* </NavLink> */}
                                                  </ul>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabPanel>

                            <TabPanel className="tab-content">
                              <div className="row">
                                {verifiedLearning &&
                                  verifiedLearning.map((user) => (
                                    <div className="col-lg-12">
                                      <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                        <div className="table-responsive">
                                          <table className="table mb-0 table-borderless">
                                            <thead>
                                              <tr className="userDatatable-header">
                                                <th>
                                                  <span className="userDatatable-title">
                                                    Learning Name
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Skills Addressed
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Category
                                                  </span>
                                                </th>

                                                {/* <th>
                                                                                            <span className="userDatatable-title">Source Type</span>
                                                                                        </th> */}

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Assigned To
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Completed On
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title">
                                                    Verified On
                                                  </span>
                                                </th>

                                                <th>
                                                  <span className="userDatatable-title"></span>
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <div className="userDatatable-content">
                                                    {user.learningName.substring(
                                                      0,
                                                      12
                                                    )}
                                                    {user.learningName.length >
                                                    12
                                                      ? "..."
                                                      : ""}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content">
                                                    {user.skills?.split(",")
                                                      .length > 2
                                                      ? `${
                                                          user.skills?.split(
                                                            ","
                                                          )[0]
                                                        } + ${
                                                          user.skills?.split(
                                                            ","
                                                          )?.length - 1
                                                        }`
                                                      : user.skills}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.category}
                                                  </div>
                                                </td>

                                                {/* <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.source_type}
                                                                                            </div>
                                                                                        </td> */}

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {user.learnerName}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.completedOn
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content fw-600">
                                                    {moment(
                                                      user.verifiedOn
                                                    ).format("DD/MM/YY")}
                                                  </div>
                                                </td>

                                                <td>
                                                  <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                    <li>
                                                      <button
                                                        onClick={() =>
                                                          navigate(
                                                            "/check_verify_learning_profile",
                                                            { state: user }
                                                          )
                                                        }
                                                        className="btn btn-icon btn-primary btn-squared ms-10"
                                                      >
                                                        View
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </td>
                                              </tr>
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
            <Modal.Title>Assign</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                {/* <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Mentees</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div> */}

                <div className="col-md-12 mb-25">
                  <div className="countryOption">
                    <select
                      className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                      aria-label="Default select example"
                      disabled
                    >
                      <option selected>Select Program</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-12 mb-25">
                  <div className="countryOption">
                    <select
                      value={filter}
                      onChange={handleChangeFilter}
                      className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                      aria-label="Default select example"
                    >
                      <option value="">Select by function</option>
                      {fAreas.map((i) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-12 mb-25">
                  <div className="countryOption">
                    <select
                      value={filter1}
                      onChange={handleChangeFilter1}
                      className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                      aria-label="Default select example"
                    >
                      <option value="">Select by Level</option>
                      {levels.map((i) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* <div className="col-md-12 mb-25">
                  <input
                    value={finishDate}
                    onChange={(e) => setFinishDate(e.target.value)}
                    type="date"
                    className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                    placeholder="Finish By"
                  />
                </div> */}

                <div className="col-md-12 mb-25">
                  <input
                    onClick={() => showCalc()}
                    value={date}
                    className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15"
                    placeholder="Finish By"
                    required
                  />
                  {calc && (
                    <Calendar
                      onChange={(e) => onChange(e)}
                      value={value}
                      minDate={new Date()}
                    />
                  )}
                </div>

                <div className="col-md-12 mb-25">
                  <div className="countryOption">
                    {/* <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Mentees</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select> */}
                    <Multiselect
                      style={{ searchBox: { borderColor: "gray" } }}
                      // isObject={false}
                      disable={checked ? true : false}
                      value={[{ id: 1, industry: "as" }]}
                      options={menteeList} // Options to display in the dropdown
                      placeholder="Select Mentees"
                      selectedValues={selectedMentee} // Preselected value to persist in dropdown
                      onSelect={onSelectMentee} // Function will trigger on select event
                      onRemove={onRemoveMentee} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                </div>

                <div>
                  <input
                    value="test"
                    placeholder="Select All Mentees"
                    type="checkbox"
                    onChange={(e) => {
                      setChecked(e.target.checked);
                    }}
                  />
                  <label for="check-1">
                    <span style={{marginLeft:'5px'}} className="checkbox-text fw-600">
                      Select All Mentees
                    </span>
                  </label>
                </div>
                <div className="col-md-12">
                  <div className="mt-0">
                    <button
                      type="button"
                      onClick={() => assignedToMentee()}
                      className="btn btn-primary btn-default btn-squared m-auto"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default Learning_Screen;
