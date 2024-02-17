// import team_img from '../../img/tm1.png';
// import search_img from '../../img/svg/search1.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import authornav_img from '../../../img/user_pic.png';
import { BASE_URL, BASE_URL_APPLSURE } from '../../../services/Config';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import Multiselect from 'multiselect-react-dropdown';

const data = [
    { id: 1, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 2, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 3, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 4, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 5, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
];

function Pending_By() {
    const {state} = useLocation()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [audiencesList, setAudiencesList] = useState([])
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [date, setDate] = useState("")
    const [checked, setChecked] = useState(false)
    const [menteeList, setMenteeList] = useState([])
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMenteeForAssign, setSelectedMenteeForAssign] = useState([])

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
        getAudiences()
    },[])
    
    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    const getAudiences = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state.data}/audience`, {
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
        let temp = []
        response.data.map((i) => {
            // console.log(i)
            if(i.completedOn == null){
                console.log("herer", i)
                temp.push(i)
            }
        })
        setMenteeList(temp)
    }

    const sendReminder = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${audiencesList[0].learningId}/send-reminder`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("reminder sent", response)
        if(response.success){
            alert("Reminder Sent Successfully")
        }
        getAudiences()
        // setAudiencesList(response.data)
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
            temp1.push(i.userId)
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
            temp1.push(i.userId)
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentee(temp)
        setSelectedMenteeForAssign(temp1)
    }

    const reAssignedToMentee = async() => {
        const btoken = `Bearer ${token}`;
        let temp = []
        menteeList.map((i) => {
            temp.push(i.userId)
        })
        console.log(temp)
        const body = {
            "mentees": checked ? temp : selectedMenteeForAssign,
              // "finishBy":finishDate
              "finishBy":value,
        }
        console.log(body)
        const res = await fetch(`${BASE_URL}learnings/${state.data}/re-assign-learning`, {
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
            alert("Learning reassigned successfully")
            // getCreatedLearning()
            // getAssignedLearning()
        }
        // setCheckedAndVerifiedLearning(response.data)
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Learning Pending</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        {/* <NavLink className="navbar-link" to="/create_learning"><button type="button" class="btn btn-outline-primary btn-squared color-primary">Edit</button></NavLink> */}
                                        <a href={`${BASE_URL_APPLSURE}PendingAudience?learning_id=${state.data}`}>
                                            <button type="button" class="btn btn-outline-petrol btn-squared color-petrol" onClick={() => {}}>Download List</button>
                                        </a>
                                        {state.hint == "overdue" ? 
                                        <button type="button" class="btn btn-petrol btn-default btn-squared" onClick={() => {showModal1()}}>Re Assign</button>
                                        :
                                        <button type="button" class="btn btn-petrol btn-default btn-squared" onClick={() => sendReminder()}>Send Reminder</button>
                                        }
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
                            {audiencesList && audiencesList.map((i) => {
                                if(i.completedOn == null){
                                    return(
                                        // (
                                            <div className="col-md-12 mb-15">
                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                                <div className="media-body d-flex align-items-center">
                                                    <img src={i.imageUrl == "" ? authornav_img : i.imageUrl} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                                    <div>
                                                        <h6 className="fw-500">{i.name}</h6>
                                                        <p className="fs-12 color-light mb-0">{i.jobTitle}</p>
                                                    </div>
                                                </div>
                                                {/* <button onClick={() => removeAudience(i.userId)} style={{backgroundColor:'#EF4F5F', color:'#fff'}} className='btn'>Check</button> */}
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
            <Modal show={showHello1} onHide={closeModal1}>
          <Modal.Header className='mentor_feedback' closeButton>
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
                      className="btn btn-primary btn-default btn-squared m-auto"
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

export default Pending_By;
