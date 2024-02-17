import horizontal_img from '../../../img/svg/more-verticals.svg';
import edit_img from '../../../img/svg/edit.svg';
import search_img from '../../../img/svg/search1.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment'
import Multiselect from 'multiselect-react-dropdown';
import { BASE_URL } from '../../../services/Config';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import {matchSorter} from 'match-sorter'
import { filterData, SearchType } from 'filter-data';

const data = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", created_on: "12/12/23" },
];

const data1 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23", status_by: "Assigned" },
    { id: 2, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23", status_by: "Assigned" },
];

const data2 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23", completed_on: "12/12/23", status_by: "In Progress" },
];

const data3 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "-", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23" },
];

function Learning_Screen() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [assignedID, setAssignedID] = useState("")
    const [reAssignedID, setReassignedID] = useState("")
    const [createdLearning, setCreatedLearning] = useState([])
    const [createdLearning1, setCreatedLearning1] = useState([])
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMenteeForAssign, setSelectedMenteeForAssign] = useState([])
    const [finishDate, setFinishDate] = useState("")
    const [assignedLearning, setAssignedLearning] = useState([])
    const [completedLearning, setCompletedLearning] = useState([])
    const [checked, setChecked] = useState(false)
    const [checkedAndVerifiedLearning, setCheckedAndVerifiedLearning] = useState([])
    const [menteeList, setMenteeList] = useState([])
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [date, setDate] = useState("")
    const [searchLearning, setSearchLearning] = useState("")
    const [skills, setSkillsList] = useState([])
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    useEffect(() => {
        getCreatedLearning()
        getCheckedVerified()
        getAssignedLearning()
        getCompletedLearning()
        getMyMentee()
        getSkills()
    }, [])

    const getSkills = async() => {
      const btoken = `Bearer ${token}`;
      const res = await fetch(`${BASE_URL}organisation-info/skills`, {
          method: 'GET',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
      })
      const response = await res.json()
      console.log("skill list", response)
      if(response.success){
          let tt = []
          response.data.map((i) => {
              tt.push({skill: i.skill, value: false})
          })
          setSkillsList(tt)
      }
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

    const showModal2 = () => {
        setShowFilter(prevStat => !prevStat)
    }

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

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
        setCreatedLearning1(response.data)
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

    const getCheckedVerified = async() => {
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
        console.log("check-verified learning", response)
        setCheckedAndVerifiedLearning(response.data)
    }

    const getMyMentee = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentor/my-mentees`, {
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
        // menteeList
        let temp = []
        menteeList.map((i) => {
            temp.push(i.id)
        })
        console.log(temp)
        const body = {
            "mentees": checked ? temp : selectedMenteeForAssign,
              // "finishBy":finishDate
              "finishBy":value,
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
            getCreatedLearning()
            getAssignedLearning()
        }
        // setCheckedAndVerifiedLearning(response.data)
    }

    const reAssignedToMentee = async() => {
        const btoken = `Bearer ${token}`;
        let temp = []
        menteeList.map((i) => {
            temp.push(i.id)
        })
        console.log(temp)
        const body = {
            "mentees": checked ? temp : selectedMenteeForAssign,
              // "finishBy":finishDate
              "finishBy":value,
        }
        const res = await fetch(`${BASE_URL}learnings/${reAssignedID}/re-assign-learning`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("re assigned learning status", response)
        if(response.success){
            closeModal1()
            getCreatedLearning()
            getAssignedLearning()
        }
        // setCheckedAndVerifiedLearning(response.data)
    }


    const assignedOption = (user) => {
        // if(user.status == "overdue"){
        //     showModal1()
        //     setReassignedID(user.id)
        // }else{
            navigate("/assigned_learning_profile", {state: user})
        // }
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

    const showCalc = () => {
      setCalc(!calc)
  }

  const onChange = (e) => {
      console.log(e)
      setValue(moment(e).format("YYYY-MM-DD"))
      setDate(moment(e).format("DD/MM/YYYY"))
      showCalc()
  }

  const [catDate, setCatDate] = useState([
    {
      name:"Podcast",
      value:false
    },
    {
      name:"Article",
      value:false
    },
    {
      name:"Video",
      value:false
    },
    {
      name:"CaseStudy",
      value:false
    },
    {
      name:"Cource",
      value:false
    },
  ])

  
  const handleOnChange = async(index) => {
    let f;

    // console.log(all)
    console.log(skills[index].value)
    skills[index].value == false ? skills[index].value = true : skills[index].value = false
    if(skills[index].value == true){

      f = matchSorter(createdLearning, skills[index].skill, {keys: ['skills']})
      // f = matchSorter(createdLearning, ["Node, React"], {keys: ['skills']})
      setCreatedLearning(f)
    }else{
      
      setCreatedLearning(createdLearning1)
    }
    // console.log(f)
  }
  const handleOnChange1 = async(index) => {
    let f;

    // console.log(all)
    console.log(catDate[index].value)
    catDate[index].value == false ? catDate[index].value = true : catDate[index].value = false
    if(catDate[index].value == true){

      f = matchSorter(createdLearning, catDate[index].name, {keys: ['category']})
      // f = matchSorter(createdLearning, ["Node, React"], {keys: ['skills']})
      setCreatedLearning(f)
    }else{
      console.log("hell")
      setCreatedLearning(createdLearning1)
    }
    // console.log(f)
  }

  const filterLearning = searchLearning
  ? createdLearning.filter(x => 

    x.learningName.toLowerCase().includes(searchLearning.toLowerCase()),
      // alert(JSON.stringify(x,null,2))
      // return
      // x.skills.toLowerCase().includes(searchLearning.toLowerCase())
  )
  : createdLearning;


  const searchConditions = [
    {
      key: "category",
      value: 'Podcast',
      type: SearchType.LK,
    }, 
    {
      key: "skills",
      value: "React",
      type: SearchType.LK
    },
    
  ];

  const result = filterData(createdLearning, searchConditions);

  console.log(result)
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
                    <p onClick={()=>showModal2()} className="filter_box me-10 mt-10">
                        <i class="las la-filter"></i> Filter
                      </p>
                      <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                        <img src={search_img} alt="search" className="svg" />
                        <input
                          value={searchLearning}
                          onChange={(e) =>setSearchLearning(e.target.value)}
                          className="me-sm-2 border-0 box-shadow-none ms-10"
                          type="search"
                          placeholder="Search by keywords bar"
                          aria-label="Search by keywords bar"
                        />
                      </div>
                      <NavLink className="" to="/create_learning">
                        <button
                          type="button"
                          class="btn btn-petrol modal_btn_btn"
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
                            {/* Created Panel */}
                            <TabPanel className="tab-content">
                              <div className="row">
                                {/* {createdLearning && createdLearning.map((user) => ( */}
                                {createdLearning &&
                                  filterLearning.map((user) => (
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
                                                    {/* user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": "" */}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="userDatatable-content">
                                                    {/* {user.skills?.split(",")
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
                                                      : user.skills} */}
                                                      {user.skills.substring(
                                                      0,
                                                      10
                                                    )}
                                                    {user.skills.length >
                                                    10
                                                      ? "..."
                                                      : ""}
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
                                                        className="btn btn-icon btn-petrol btn-squared ms-10"
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
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabPanel>

                            {/* Assigned Panel */}
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
                                                    Mentee Name
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
                                                    {/* {user.skills?.split(",")
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
                                                      : user.skills} */}
                                                      {user.skills.substring(
                                                      0,
                                                      10
                                                    )}
                                                    {user.skills.length >
                                                    10
                                                      ? "..."
                                                      : ""}
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
                                                    {/* {user.audience[0]?.name +
                                                      `${
                                                        user.audience.length > 1
                                                          ? ` + ${
                                                              user.audience
                                                                .length - 1
                                                            }`
                                                          : ""
                                                      }`} */}
                                                      {user.audience[0]?.name.substring(
                                                      0,
                                                      8
                                                    )}
                                                    {user.audience[0]?.name.length >
                                                    8
                                                      ? "..."
                                                      : "" }
                                                      {`${
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
                                                  {
                                                  moment(user.finishBy?.split('T')[0]).format("DD/MM/YYYY")}
                                                    {/* {moment(user.finishBy).subtract(1, "days").format("DD/MM/YY")} */}
                                                  </div>
                                                </td>

                                                <td>
                                                {user.status == "overdue" ? 
                                                    <div style={{color:"#B93D49"}} className="userDatatable-content fw-600">
                                                      {user.status.replace(/([a-z])([A-Z])/, '$1 $2')}
                                                    </div>:
                                                    <div className="userDatatable-content color-status fw-600">
                                                      {user.status.replace(/([a-z])([A-Z])/, '$1 $2')}
                                                    </div>
                                                  }
                                                  {/* <div
                                                    style={{ color: "#B93D49" }}
                                                    className="userDatatable-content fw-600"
                                                  >
                                                    {user.status.replace(/([a-z])([A-Z])/, '$1 $2')}
                                                  </div> */}
                                                </td>

                                                <td>
                                                  <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                    {/* <li>
                                                      <button
                                                        onClick={() =>
                                                          navigate(
                                                            "/edit_learning",
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
                                                    </li> */}

                                                    {/* <NavLink className="navbar-link" to="/created_learning_profile"> */}
                                                    <li>
                                                      <button
                                                        onClick={() =>
                                                          assignedOption(user)
                                                        }
                                                        className="btn btn-icon btn-petrol btn-squared ms-10"
                                                      >
                                                        {/* {user.status ==
                                                        "overdue"
                                                          ? "Re assign"
                                                          : "View"} */}
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
                            {/* Completed Panel */}
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
                                                    Mentee Name
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
                                                        user.audience.length > 1
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
                                                    {moment(user.finishBy).subtract(1, "days").format("DD/MM/YY")}
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
                                                        className="btn btn-icon btn-petrol btn-squared ms-10"
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

                            {/* Verified Panel */}
                            <TabPanel className="tab-content">
                              <div className="row">
                                {checkedAndVerifiedLearning &&
                                  checkedAndVerifiedLearning.map((user) => (
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
                                                    Mentee Name
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
                                                    {/* {user.skills?.split(",")
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
                                                      : user.skills} */}
                                                      {user.skills.substring(
                                                      0,
                                                      10
                                                    )}
                                                    {user.skills.length >
                                                    10
                                                      ? "..."
                                                      : ""}
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
                                                    {/* <NavLink className="navbar-link" to="/check_verify_learning_profile"> */}
                                                    <li>
                                                      <button
                                                        onClick={() =>
                                                          navigate(
                                                            "/check_verify_learning_profile",
                                                            { state: user }
                                                          )
                                                        }
                                                        className="btn btn-icon btn-petrol btn-squared ms-10"
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

        {showFilter ?
                    <div className="filter_box1">
                        <div className="products_page product_page--grid mb-30">
                            <div className="1">
                                <div className="1">
                                    <div className="1">
                                        <div className="widget box_shadow1">
                                            <div className="category_sidebar">
                                                <div className="product-sidebar-widget mb-10">
                                                    {/* {data9.map((user) => ( */}

                                                        <Accordion>
                                                            <Accordion.Item eventKey="0" className="filter_accor">
                                                                <Accordion.Header className="widget_title">Skills Addressed</Accordion.Header>
                                                                <Accordion.Body className="card border-0 shadow-none">
                                                                    <div className="product-brands">
                                                                        <ul>
                                                                          {skills && skills.map((i,index) =>(
                                                                            <li>
                                                                                <div className="checkbox-theme-default custom-checkbox">
                                                                                    <input 
                                                                                      name={i}
                                                                                      value={i} 
                                                                                      onChange={() => handleOnChange(index)}
                                                                                      className="checkbox" type="checkbox" id={`custom-checkbox-${index}`} />
                                                                                    <label for={`custom-checkbox-${index}`}>
                                                                                        <span className="checkbox-text">
                                                                                            {i.skill}
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                          ))}
                                                                           
                                                                        </ul>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>
                                                        <Accordion>
                                                            <Accordion.Item eventKey="0" className="filter_accor">
                                                                <Accordion.Header className="widget_title">Category</Accordion.Header>
                                                                <Accordion.Body className="card border-0 shadow-none">
                                                                    <div className="product-brands">
                                                                        <ul>
                                                                          {catDate.map((i,index) => (
                                                                            <li>
                                                                                <div className="checkbox-theme-default custom-checkbox">
                                                                                    <input  
                                                                                      name={i}
                                                                                      value={i} 
                                                                                      onChange={() => handleOnChange1(index)} className="checkbox" type="checkbox" id={`custom-checkbox-${index+100}`} />
                                                                                    <label for={`custom-checkbox-${index+100}`}>
                                                                                        <span className="checkbox-text">
                                                                                        {i.name}
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                          ))}
                                                                            
                                                                            
                                                                        </ul>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>



                                                    {/* ))} */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""}

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
          <Modal.Header className="mentor_feedback" closeButton>
            <Modal.Title>Assign</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
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
                    {/* <select value={selectedMentee} onChange={(e) =>setSelectedMentee(e.target.value)} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option value="">Select Mentees</option>
                                        {menteeList && menteeList.map((i) => (
                                            <option value={i.id}>{i.name}</option>
                                        ))}
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
                        setChecked(e.target.checked)
                        
                    }}
                  />
                  <label for="check-1">
                    <span className="checkbox-text fw-600">Select All Mentees</span>
                  </label>
                </div>
                {/* <input
                  value="test"
                  placeholder="Select All Mentees"
                  type="checkbox"
                  onChange={(e) => setChecked(e.target.checked)}
                /> */}

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

                <div className="col-md-12">
                  <div className="mt-0">
                    <button
                      type="button"
                      onClick={() => assignedToMentee()}
                      className="btn btn-petrol btn-default btn-squared m-auto"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={showHello1} onHide={closeModal1}>
          <Modal.Header className="mentor_feedback" closeButton>
            <Modal.Title>Re Assign</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
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
                    {/* <select
                      value={selectedMentee}
                      onChange={(e) => setSelectedMentee(e.target.value)}
                      className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                      aria-label="Default select example"
                    >
                      <option value="">Select Mentees</option>
                      {menteeList &&
                        menteeList.map((i) => (
                          <option value={i.id}>{i.name}</option>
                        ))}
                    </select> */}
                  </div>
                </div>

                <div>
                  <input
                    value="test"
                    placeholder="Select All Mentees"
                    type="checkbox"
                    onChange={(e) => {
                        setChecked(e.target.checked)
                        
                    }}
                  />
                  <label for="check-1">
                    <span className="checkbox-text fw-600">Select All Mentees</span>
                  </label>
                </div>
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

                <div className="col-md-12">
                  <div className="mt-0">
                    <button
                      type="button"
                      onClick={() => reAssignedToMentee()}
                      className="btn btn-petrol btn-default btn-squared m-auto"
                    >
                      Re Assign
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
