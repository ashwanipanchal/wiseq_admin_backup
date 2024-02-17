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

function Create_Inaugural_Session() {
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
    const [menteeList, setMenteeList] = useState([])
    const [selectedMenteeID, setselectedMenteeID] = useState(state == null ? [state] : [])
    const [skillList, setSkillList] = useState([])
    const [programName, setProgramName] = useState("")
    const [programList, setProgramList] = useState([])
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [objective, setObjective] = useState("")
    const [selectedSkill, setSelectedSkill] = useState("")
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
            "status":[4]
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
              console.log("==",result)
              setProgramList(result.programList)
             
          })
          .catch(error => console.log('error', error));
    
          
        }
        fetchListData()
      },[])

    const menteeSessions = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;   
        const res = await fetch(`${BASE_URL}session`,{
            method:'GET',
            headers:{
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": btoken,
            },
          })
          const response = await res.json()
            console.log(response.data.upcoming)
            const ww = []
            for(let i of response.data.expired){
                let dict = {
                    'title': `Session with ${i.scheduler}`,
                    'start': new Date(i.scheduleTime),
                    'end': new Date(i.scheduleEndTime),
                    desc: 'Most important meal of the day'
                }
                ww.push(dict)
            }
            let yy = []
            for(let i of response.data.upcoming){
                let dict = {
                    'title': `Session with ${i.scheduler}`,
                    'start': new Date(i.scheduleTime),
                    'end': new Date(i.scheduleEndTime),
                    desc: 'Most important meal of the day'
                }
                yy.push(dict)
            }
            yy = yy.concat(ww);
            console.log("ww", yy)
            setSessions(yy)
            // const {success, data} = response
            // if(success){
            //     setSessions(data)
            // }
    }

    const getMyMentorList = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentee/my-mentors`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
              })
              const response = await res.json()
            //   console.log("mentees", response)
              if(response.success){
                setMyMentor(response.data)
            }
    }

    const getSkills = async (id) => {
            const btoken = `Bearer ${token}`; 
            const res = await fetch(`${BASE_URL}organisation-admins/${id}/mentor-mentee-profile`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
              })
              const response = await res.json()
              console.log(response.data.expertise)
              let temp = []
              let temp1 = []
              for(let i of response.data.expertise?.businessSkillsGoodAt){
                temp.push(i)
            }
              for(let i of response.data.expertise?.coreSkillsGoodAt){
                temp1.push(i)
            }
                const result = [...temp, ...temp1];
                console.log(result)
                setSkillList(result)

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

    const onSelectBSkillDev = (selectedList, selectedItem) => {
        let temp = []
        selectedList.map((i) =>(
            temp.push(i.id)
        ))
        console.log(temp)
        setmentorID(temp)
        getSkills(temp[0])
        setselectedMenteeID(temp)
    }

    const onRemoveBSkillDev = (selectedList, removedItem) => {
        let temp = []
        selectedList.map((i) =>(
            temp.push(i.id)
        ))
        console.log(temp)
        setselectedMenteeID(temp)
    }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    
    const createSession = async(e) => {
        //     return
        e.preventDefault()
        // console.log(selectedTimezone.value)

        
        console.log({
            "program_id": state?.data?.id,
            "sessionDetails": {
                "program_name":state?.data?.name,
                "inputDate":date,
                "inputTime":time,
                "inputTimeZone":selectedTimezone.value,
                "schedule_time": "",
                "skills": state?.data?.skills,
                "objective": state?.data?.objective,
                "time_zone": selectedTimezone.value,
                "type":"inaugural"
            }
        })
        // return
    // if(mentorID == ""){
    //     alert("please select a mentor")
    //     return
    // }
    //     const btoken = `Bearer ${token}`;
    //     const body = {
    //         "users": selectedMenteeID,
    //         programName,
    //         "scheduleTime":availableTime[timeValue].startTime ,
    //         "skills": selectedSkill,
    //         objective,
    //         timeZone: availableTime[timeValue].timeZone == "Asia/Kuala_Lumpur" ? "SGT" :  moment().tz(availableTime[timeValue].timeZone).zoneAbbr()
    //     }
    //     console.log(body)
    //     // return
    //     const res = await fetch(`${BASE_URL}session`,{
    //             method:'POST',
    //             headers:{
    //               "Accept": "application/json",
    //               'Content-Type': 'application/json',
    //               "Authorization": btoken,
    //             },
    //             body: JSON.stringify(body)
    //           })
    //           const response = await res.json()
    //           console.log(response)
    //           if(response.success){
    //             navigate('/sessions_list')
    //           }

            var myHeaders = new Headers();
          myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "program_id": state?.data?.id,
            "sessionDetails": {
                "program_name":state?.data?.name,
                title,
                "inputDate":date,
                "inputTime":time,
                "inputTimeZone":selectedTimezone?.value == undefined ? selectedTimezone : selectedTimezone?.value,
                "schedule_time": "",
                "skills": state?.data?.skills,
                "objective": state?.data?.objective,
                "time_zone": selectedTimezone?.value == undefined ? selectedTimezone : selectedTimezone?.value,
                "type":"inaugural"
            }
        });
    
          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };
    
          fetch(`${BASE_URL_APPLSURE_MENTORING}program-session-create-inaugral`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log("==",result)
              if(result.success){
                
                alert("Inaugural Session Created Successfully")
                navigate(-1)
              }
            //   setProgramList(result.programList)
             
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
                      <form onSubmit={createSession}>
                        <div className="row">
                          <h6 class="fw-500 mb-20 mt-20">
                            Schedule Inaugural Session
                          </h6>

                          {/* <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        <select value={programName} onChange={e => setProgramName(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Program Name</option>
                                                            <option value="WSH - Skill Growth">WSH - Skill Growth</option>
                                                            <option value="WSH - Guidance">WSH - Guidance</option>
                                                            <option value="WSH - Collaboration">WSH - Collaboration</option>
                                                            <option value="WSH - Wellbeing">WSH - Wellbeing</option>
                                                            {programList.map((i) => (
                                                                <option value={i.id}>{i.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div> */}

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
                            <div className="countryOption">
                              <TimezoneSelect
                                value={selectedTimezone}
                                onChange={setSelectedTimezone}
                              />
                            </div>
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

export default Create_Inaugural_Session;
