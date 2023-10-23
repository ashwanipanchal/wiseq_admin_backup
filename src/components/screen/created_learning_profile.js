import resources_img from '../../img/programs.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import { BASE_URL } from '../../services/Config'
import Multiselect from 'multiselect-react-dropdown';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function Created_Learning_Profile() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [learningDetails, setLearningDetails] = useState({})
    const [menteeList, setMenteeList] = useState([])
    const [checked, setChecked] = useState(false)
    const [finishDate, setFinishDate] = useState("")
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMenteeForAssign, setSelectedMenteeForAssign] = useState([])
    const [fAreas, setFAreas] = useState([])
    const [levels, setLevels] = useState([])
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

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    useEffect(() => {
        getProfile()
        getDetails()
        getMyMentee()
    },[])
    
    const getProfile = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state.id}/template-details`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("created profile details in org", response)
        if(response.success){
            setLearningDetails(response.data)
        }
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

    // const assignedToMentee = async() => {
    //     const btoken = `Bearer ${token}`;
    //     const body = {
    //         "mentees": selectedMenteeForAssign,
    //           "finishBy":finishDate
    //     }
    //     // console.log(body)
    //     // return
    //     const res = await fetch(`${BASE_URL}learnings/${state.id}/assign-to-mentees`, {
    //         method: 'PUT',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //         body:JSON.stringify(body)
    //     })
    //     const response = await res.json()
    //     console.log("assigned learning status", response)
    //     if(response.success){
    //         closeModal()
    //         navigate(-1)
    //         // getProfile()
    //     }
    //     // setCheckedAndVerifiedLearning(response.data)
    // }
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
        const res = await fetch(`${BASE_URL}learnings/${state.id}/assign-to-mentees`, {
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
          <div className="blog-page2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="fw-500 breadcrumb-title">
                          {learningDetails && learningDetails.learningName}
                        </h4>
                      </div>
                    </div>
                    <div class="layout-button">
                      {/* <NavLink className="navbar-link" to="/create_learning"> */}
                      <button
                        onClick={() =>
                          navigate("/edit_created_learning", { state: state })
                        }
                        type="button"
                        class="btn btn-outline-primary btn-squared color-primary"
                      >
                        Edit
                      </button>
                      {/* </NavLink> */}
                      <button
                        type="button"
                        class="btn btn-primary btn-default btn-squared"
                        onClick={showModal}
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="">
                    <div className="blog-details-thumbnail mb-25">
                      <img src={learningDetails.learningImg} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Summary
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.summary}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Growth Score
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.growthScore}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Source Type
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.sourceType}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Source Name
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.sourceName}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Source Link
                    </p>
                    <p
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() =>
                        window.open(learningDetails.sourceLink, "_blank")
                      }
                      className="color-dark fs-14 fw-300 align-center mb-0"
                    >
                      {learningDetails && learningDetails.sourceLink}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Skill(s) Addressed
                    </p>
                    <ul className="d-flex flex-wrap user-group-people__parent">
                      {learningDetails &&
                        learningDetails.skills
                          ?.split(",")
                          ?.map((i) => (
                            <span class="badge badge-square btn-outline-orange me-10">
                              {i}
                            </span>
                          ))}
                      {/* <span class="badge badge-square btn-outline-orange me-10">{learningDetails && learningDetails.skills}</span> */}
                    </ul>
                  </div>

                  {/* <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finish by</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && moment(learningDetails.finishBy).format("DD MMMM YYYY")}</p>
                                </div> */}

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Duration
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.duration}{' '}
                      {learningDetails &&
                        learningDetails.durationType?.charAt(0).toUpperCase() +
                          learningDetails.durationType?.slice(1)}
                    </p>
                  </div>

                  {/* <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Program Type
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">High Potential Mentoring Program</p>
                  </div> */}

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Worksheet/Assignment Needed?
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails &&
                      learningDetails.isWorksheetNeeded == true
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Comments about Worksheet/Assignment
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.worksheetComments == "" ? "N/A" : learningDetails.worksheetComments}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Learning’s Rating
                    </p>
                    {/* <span className="badge badge-round btn-primary mt-10">4.5 <i className="lar la-star user_star"></i></span> */}
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
                                <input value={finishDate} onChange={(e) =>setFinishDate(e.target.value)} type="date" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Finish By" />
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
                    <span className="checkbox-text fw-600">
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

export default Created_Learning_Profile;
