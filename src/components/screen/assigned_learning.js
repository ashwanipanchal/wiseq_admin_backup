import search_img from '../../img/svg/search1.svg';
import Side_Bar from './sidebar';
import view_img from '../../img/view.svg';
import delete_img from '../../img/svg/delete.svg';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';
import Multiselect from 'multiselect-react-dropdown';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function Assigned_Learning() {
    const {state} = useLocation()
    // console.log(state)
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [createdLearning, setCreatedLearning] = useState([])
    const [menteeList, setMenteeList] = useState([])
    const [filter, setFilter] = useState('');
    const [filter1, setFilter1] = useState('');
    const [fAreas, setFAreas] = useState([])
    const [levels, setLevels] = useState([])
    const [assignedID, setAssignedID] = useState("")
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [date, setDate] = useState("")
    const [checked, setChecked] = useState(false)
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMenteeForAssign, setSelectedMenteeForAssign] = useState([])
    const [listOfAcceptedMentee, setListOfAcceptedMentee] = useState([])

    useEffect(() => {
        getLearnings()
    },[])

    const getLearnings = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state.id
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-learning-list`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.success){
            setCreatedLearning(result.learningDetails)
          }
          })
        .catch(error => console.log('error', error));
        
   } 

    const handleChangeFilter = event => {
        setFilter(event.target.value);
        FAreaFilter(event.target.value)
      }
      const handleChangeFilter1 = event => {
        setFilter1(event.target.value);
        LevelFilter(event.target.value)
      //   FAreaFilter(event.target.value)
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

    const LevelFilter = async (e) => {
        let finalUrl;
        console.log(filter)
        console.log(filter1)
        

        if(e != ""){
            if(filter.length>0){
                finalUrl  = `levels=${e.trim()}&functionalArea=${filter.trim()}`
            }else{
                finalUrl  = `levels=${e.trim()}`
            }
        }else{
            if(filter.length>0){
                finalUrl  = `functionalArea=${filter.trim()}`
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
        console.log(e)
        // console.log(filter)
        // console.log(filter1)
        

        if(e != ""){
            if(filter1.length>0){
                finalUrl  = `functionalArea=${e.trim()}&levels=${filter1.trim()}`
            }else{
                finalUrl  = `functionalArea=${e.trim()}`
            }
        }else{
            if(filter1.length>0){

                finalUrl  = `levels=${filter1.trim()}`
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
        getDetails()
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    useEffect(() => {
        // getCreatedLearning()
    },[])
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
        console.log("learnings in mendetory screen", response)
        setCreatedLearning(response.data)
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
        "program_id":state?.id,
        "program": state?.name,
        "finishBy":value,
        }

        // console.log(body)
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
            // getCreatedLearning()
            // getAssignedLearning()
        }
        // setCheckedAndVerifiedLearning(response.data)
    }


    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded"
        >
          <div className="blog-page2">
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
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-25">
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
                                        navigate("/created_learning_profile", {
                                          state: user,
                                        })
                                      }
                                      className="userDatatable-content"
                                    >
                                      {user?.learningName?.substring(0, 12)}
                                      {user?.learningName?.length > 12
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
                                      {user.skills.substring(0, 10)}
                                      {user.skills.length > 10 ? "..." : ""}
                                    </div>
                                  </td>

                                  <td>
                                    <div className="userDatatable-content fw-600">
                                      {user.category}
                                    </div>
                                  </td>

                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="userDatatable-content "
                                    >
                                      {user.sourceType}
                                    </div>
                                  </td>

                                  <td>
                                    <div
                                      style={{ fontWeight: "bold" }}
                                      className="userDatatable-content "
                                    >
                                      {moment(user.createdAt).format(
                                        "DD/MM/YY"
                                      )}
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
                                              "/created_learning_profile",
                                              { state: user }
                                            )
                                          }
                                          className="btn btn-icon btn-warning btn-squared"
                                        >
                                          <img
                                            src={view_img}
                                            alt="layers"
                                            className="svg"
                                          />
                                        </button>
                                      </li>

                                      <li>
                                        <button
                                          className="btn px-15 btn-outline-warning  ms-10"
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
                  {/* <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-borderless">
                                            <thead>
                                                <tr className="userDatatable-header py-20">
                                                    <th>
                                                        <span className="userDatatable-title">Title</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Skill(s)  Addressed</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Category</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Source Type</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Created On</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title float-end">action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            External
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            12/12/23
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                            <li>
                                                                <button className="btn btn-icon btn-warning btn-squared">
                                                                    <img src={view_img} alt="layers" className="svg" />
                                                                </button>
                                                            </li>

                                                            <li>
                                                                <button className="btn px-15 btn-outline-warning  ms-10">
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

                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-borderless">
                                            <thead>
                                                <tr className="userDatatable-header py-20">
                                                    <th>
                                                        <span className="userDatatable-title">Title</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Skill(s)  Addressed</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Category</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Source Type</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Created On</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title float-end">action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            External
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            12/12/23
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                            <li>
                                                                <button className="btn btn-icon btn-warning btn-squared">
                                                                    <img src={view_img} alt="layers" className="svg" />
                                                                </button>
                                                            </li>

                                                            <li>
                                                                <button className="btn px-15 btn-primary ms-10">
                                                                    Assigned
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-borderless">
                                            <thead>
                                                <tr className="userDatatable-header py-20">
                                                    <th>
                                                        <span className="userDatatable-title">Title</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Skill(s)  Addressed</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Category</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Source Type</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Created On</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title float-end">action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            External
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            12/12/23
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                            <li>
                                                                <button className="btn btn-icon btn-warning btn-squared">
                                                                    <img src={view_img} alt="layers" className="svg" />
                                                                </button>
                                                            </li>

                                                            <li>
                                                                <button className="btn px-15 btn-outline-warning  ms-10">
                                                                    Assign
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}
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
                </div> */}

                {/* <div className="col-md-12 mb-25">
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

                <div className="col-md-12 mb-10">
                  <div className="countryOption">
                    <Multiselect
                      style={{ searchBox: { borderColor: "gray" } }}
                      // isObject={false}
                      disable={checked ? true : false}
                      value={[{ id: 1, industry: "as" }]}
                      options={listOfAcceptedMentee} // Options to display in the dropdown
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
                    <span
                      style={{ marginLeft: "5px" }}
                      className="checkbox-text fw-600"
                    >
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

export default Assigned_Learning;
