import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
import moment from 'moment'
import { Calendar as CalenderBig, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import TimezoneSelect from 'react-timezone-select'

function Edit_Group_Session() {
    const {state} = useLocation()
    console.log(state)
    const navigate = useNavigate()
    const localizer = momentLocalizer(moment)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [dateType, setDateType] = useState("text")
    const [sesDate, setSesDate] = useState("")
    const [title, setTitle] = useState("")
    const [sesTime, setSesTime] = useState("")
    const [sessions,setSessions] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [myMentor, setMyMentor] = useState([])
    const [selectedMentor, setSelectedMentor] = useState([])
    const [selectMentorForGroupSession, setSelectMentorForGroupSession] = useState([])
    const [selectedMenteeID, setselectedMenteeID] = useState(state == null ? [state] : [])
    const [skillList, setSkillList] = useState([])
    const [programName, setProgramName] = useState("")
    const [programList, setProgramList] = useState([])
    const [date, setDate] = useState(moment(state?.each?.schedule_time).format("YYYY-MM-DD"))
    const [time, setTime] = useState(moment(state?.each?.schedule_time).format("HH:MM"))
    const [objective, setObjective] = useState(state?.each?.objective)
    const [selectedSkill, setSelectedSkill] = useState(state?.each?.skills)
    const [mentorID, setmentorID] = useState("")
    const [timeValue, setTimeValue] = useState("")
    const [availableTime, setAvailableTime] = useState([])
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [selectedTimezone, setSelectedTimezone] =useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
        useEffect(() => {
        // menteeSessions()
        // getMyMentorList()
        // getSkills()
    },[])

    useEffect(() => {
        const fetchListData = async(index) => {
        
          var myHeaders = new Headers();
          myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "program_id":state?.each?.program_id,
            "role":"mentor"//mentor
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
              console.log("==",result)
              let pp = []
            result?.list?.map((i) => {
                pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
            })
            console.log(pp)
            setMyMentor(pp)
              // setProgramList(result.programList)
             
          })
          .catch(error => console.log('error', error));
    
          
        }
        fetchListData()
      },[])

      useEffect(() => {
        let tt= []
        let nn = state?.each?.session_users?.filter((i) => {
          if(i.role == "mentor"){

            console.log(i)
            // tt.push({user_id: i.user_id,  "role": "mentor"})
            return ({...i , name : i.user_metum?.name})

          }
        })

        let kk = nn.map((i) => {
          if(i.role == "mentor"){
            console.log(i)
            tt.push({user_id: i.user_id,  "role": "mentor"})
            return ({...i , name : i.user_metum?.name})

          }
        })
        console.log(kk)
        console.log(tt)
        setSelectedMentor(kk)
        setSelectMentorForGroupSession(tt)
      },[])

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

    const onSelectMentor = (selectedList, selectedItem) => {
      console.log(selectedList)
      let temp = []
      let temp1 = []
      selectedList.map((i) => {
          temp.push(i)
          temp1.push({user_id: i.id,  "role": "mentor"})
          // setnewSelectedTools(temp)
      })
      setSelectedMentor(temp)
      setSelectMentorForGroupSession(temp1)
  }

  const onRemoveMentor = (selectedList, removedItem) => {
      console.log(selectedList)
      let temp = []
      let temp1 = []
      selectedList.map((i) => {
          temp.push(i)
          temp1.push({user_id: i.id,  "role": "mentor"})
          // setnewSelectedTools(temp)
      })
      // setSelectedCSkill(selectedList)
      setSelectedMentor(temp)
      setSelectMentorForGroupSession(temp1)
  }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    
    const updateSession = async(e) => {
        e.preventDefault()
    //   const body = {
    //     "id": state?.each?.id,
    //     "sessionDetails": {
    //         "inputDate":date,
    //         "inputTime":time,
    //         "inputTimeZone":selectedTimezone?.value == undefined ? selectedTimezone : selectedTimezone?.value,
    //         "schedule_time": "",
    //         "skills": selectedSkill,
    //         "objective": objective,
    //         "time_zone": selectedTimezone?.value == undefined ? selectedTimezone : selectedTimezone?.value,
    //     }
    // }
    // console.log(body)

        
          var myHeaders = new Headers();
          myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "id": state?.each?.id,
            "sessionDetails": {
                "inputDate":date,
                "inputTime":time,
                "inputTimeZone":selectedTimezone?.value == undefined ? selectedTimezone : selectedTimezone?.value,
                "schedule_time": "",
                "skills": selectedSkill,
                "objective": objective,
                "time_zone": selectedTimezone?.value == undefined ? selectedTimezone : selectedTimezone?.value,
            }
        });
    
          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };
    
          fetch(`${BASE_URL_APPLSURE_MENTORING}program-session-edit`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log("Group session edit response",result)
              // setProgramList(result.programList)
              if(result.success){
                alert(result.message)
                navigate(-1)
              }else{
                alert(result.message)
              }
             
          })
          .catch(error => console.log('error', error));

    }

    // const getTimeSlots =async (date) => {
    //     const token = localStorage.getItem("token")
    //     const btoken = `Bearer ${token}`;
    //     const respRepos = await fetch(`${BASE_URL}mentor-slots/${mentorID}/available?date=${date}`, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //     })
    //     const response = await respRepos.json()
    //     console.log(response)
    //     setAvailableTime(response.data||[])
    // }

    // const minDate = moment().format('YYYY-MM-DD');

    const showCalc = () => {
        setCalc(!calc)
    }

    const onChange = (e) => {
        console.log(e)
        setValue(e)
        setDate(moment(e).format("YYYY-MM-DD"))
        // getTimeSlots(moment(e).format("YYYY-MM-DD"))
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
                  <div className="breadcrumb-main user-member justify-content-sm-between ">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          Calendar
                        </h4>
                      </div>
                    </div>
                    <div className="action-btn">
                      <div className="btn px-15 btn-primary">Sync Calendar</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <CalenderBig
                    localizer={localizer}
                    events={sessions}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                  />
                </div>

                <div className="col-lg-4">
                  <div className="card card-Vertical card-default card-md mb-4">
                    <div className="">
                      <form onSubmit={updateSession}>
                        <div className="row">
                          <h6 class="fw-500 mb-20 mt-20">
                          Schedule a group session
                          </h6>

                          <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        <Multiselect
                                                            style={{ searchBox: { borderColor: 'gray' } }}
                                                            // selectionLimit='1'
                                                            // singleSelect={true}
                                                            disable
                                                            options={myMentor} // Options to display in the dropdown
                                                            placeholder='Select Mentors'
                                                            selectedValues={selectedMentor} // Preselected value to persist in dropdown
                                                            onSelect={onSelectMentor} // Function will trigger on select event
                                                            onRemove={onRemoveMentor} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        />
                                                    </div>
                                                </div>

                          <div className="col-md-12 mb-25">
                            <input
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                              // min={minDate}
                              // onChange={e => {
                              // setDate(e.target.value)
                              // getTimeSlots(e.target.value)}} onFocus={() => setDateType('date')}
                              // onBlur={() => setDateType('text')} type={dateType}
                              className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15"
                              placeholder="Title"
                              required
                            />
                          </div>

                          <div className="col-md-12 mb-25">
                            <input
                              onClick={() => showCalc()}
                              value={date}
                              // min={minDate}
                              // onChange={e => {
                              // setDate(e.target.value)
                              // getTimeSlots(e.target.value)}} onFocus={() => setDateType('date')}
                              // onBlur={() => setDateType('text')} type={dateType}
                              className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15"
                              placeholder="Date"
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
                            <div class="countryOption">
                              {/* <select
                                value={timeValue}
                                onChange={(e) => setTimeValue(e.target.value)}
                                class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                                aria-label="Default select example"
                              >
                                <option value="">Select Available Time</option>
                                {availableTime.map((i, index) => (
                                  <option value={index}>
                                    {moment(i.startTime).format("HH:mm")} -{" "}
                                    {moment(i.endTime).format("HH:mm")}
                                  </option>
                                ))}
                              </select> */}
                            <input value={time} onChange={e => setTime(e.target.value)} type="time" className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" placeholder="time" required/>
                            </div>
                          </div>

                          <div className="col-md-12 mb-25">
                              <div class="countryOption">
                                  <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                  <option value="">Select Skill</option>
                                      {state && state?.fullDate?.program?.skills?.split(",")?.map((i) => (
                                          <option value={i}>{i}</option>
                                      ))}
                                      
                                  </select>
                              </div>
                          </div>


                          <div className="col-md-12 mb-25">
                            <div className="countryOption">
                              <TimezoneSelect
                                value={selectedTimezone}
                                onChange={setSelectedTimezone}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 mb-25">
                              <textarea value={objective} onChange={e => setObjective(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Objectives" required></textarea>
                          </div>

                          {/* <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                        <option value="">Select Skill</option>
                                                            {skillList && skillList.map((i) => (
                                                                <option value={i.skill}>{i.skill}</option>
                                                            ))}
                                                            
                                                        </select>
                                                    </div>
                                                </div> */}

                          {/* <div className="col-md-12 mb-25">
                                                    <textarea value={objective} onChange={e => setObjective(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Objectives" required></textarea>
                                                </div> */}

                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="btn btn-primary btn-default btn-squared w-100"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
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
      </div>
    );
}

export default Edit_Group_Session;
