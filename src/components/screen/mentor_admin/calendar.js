import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
import Timetable from 'react-timetable-events'
import { Calendar as CalenderBig, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function Calendar_Open() {
    const localizer = momentLocalizer(moment)
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const [sessions,setSessions] = useState([])
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [dateType, setDateType] = useState("text")
    const [sesDate, setSesDate] = useState("")
    const [sesTime, setSesTime] = useState("")
    const [menteeForResch, setmenteeForResch] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [myMentee, setMyMentee] = useState([])
    const [menteeList, setMenteeList] = useState([])
    const [selectedMenteeID, setselectedMenteeID] = useState([])
    const [sessionEventDetail, setsessionEventDetail] = useState({})
    const [skillList, setSkillList] = useState([])
    // const [programName, setProgramName] = useState("")
    const [programName, setProgramName] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [objective, setObjective] = useState("")
    const [availableTime, setAvailableTime] = useState([])
    // const [selectedSkill, setSelectedSkill] = useState("")
    const [selectedSkill, setSelectedSkill] = useState([])
    const [newTimeSlot, setNewTimeSlot] = useState("")
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [key, setKey] = useState(1)
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        // getAvalibaleTime()
        // getMyMentorList()
        // getSkills()
        getSkills()
        mentorSessions()
    }, [])

    const getAvalibaleTime = async(date) => {
        
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentor-slots/my-slots?dateFrom=${date}&dateTo=${date}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
          console.log("my Avalivatibe Time", response)
          setAvailableTime(response.data)
    }

    const mentorSessions = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;   
        const res = await fetch(`https://api.wiseqglobal.com/api/session`,{
            method:'GET',
            headers:{
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": btoken,
            },
          })
          const response = await res.json()
            console.log(response.data.upcoming)
            console.log(response.data.expired)
            const ww = []
            for(let i of response.data.expired){
                let dict = {
                    'title': `Session with ${i.scheduler.name} at ${moment(i.scheduleTime).format("HH:mm")}`,
                    'start': new Date(i.scheduleTime),
                    'end': new Date(i.scheduleEndTime),
                    desc: i
                }
                ww.push(dict)
            }
            let yy = []
            for(let i of response.data.upcoming){
                let dict = {
                    'title': `Session with ${i.scheduler.name} at ${moment(i.scheduleTime).format("HH:mm")}`,
                    'start': new Date(i.scheduleTime),
                    'end': new Date(i.scheduleEndTime),
                    desc: i
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

    const getMyMentorList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/my-mentees`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        //   console.log("mentees", response)
        if (response.success) {
            setMyMentee(response.data)
        }
    }

    // const getSkills = async () => {
    //     const btoken = `Bearer ${token}`;
    //     const res = await fetch(`https://api.wiseqglobal.com/api/mentor/profile`, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //     })
    //     const response = await res.json()
    //     console.log(response.data.expertise.businessSkillsGoodAt)
    //     setSkillList(response.data.expertise.businessSkillsGoodAt)

    // }

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
        selectedList.map((i) => (
            temp.push(i.id)
        ))
        console.log(temp)
        setselectedMenteeID(temp)
    }

    const onRemoveBSkillDev = (selectedList, removedItem) => {
        let temp = []
        selectedList.map((i) => (
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
    const getSkills = async () => {
        const btoken = `Bearer ${token}`; 
        const res = await fetch(`https://api.wiseqglobal.com/api/mentee/profile`,{
            method:'GET',
            headers:{
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
            },
          })
          const response = await res.json()
          let temp = []
          let temp1 = []
          for(let i of response.data.expertise?.businessSkillsToDevelop){
            temp.push(i)
        }
          for(let i of response.data.expertise?.coreSkillsToDevelop){
            temp1.push(i)
        }
            const result = [...temp, ...temp1];
            console.log(result)
            setSkillList(result)

    }

    const createSession = async (e) => {
        e.preventDefault()
        // console.log(selectedMenteeID)
        // return
        if(new Date(sessionEventDetail.scheduleTime) > new Date()){
            const btoken = `Bearer ${token}`;
            const body = 
                {
                    "sessionId": Object.keys(sessionEventDetail).length === 0 ? "" :sessionEventDetail.id,
                    "scheduleTime": newTimeSlot
                  }
            const res = await fetch(`https://api.wiseqglobal.com/api/session/suggest-reschedule`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(body)
            })
            const response = await res.json()
            console.log(response)
            if (response.success) {
                alert("Suggestion Sent To Mentee.")
            }
        }else{
            alert("You cannot reschedule past session.")
            return
        }
        
        
    }

    const minDate = moment().format('YYYY-MM-DD');

    const showCalc = () => {
        setCalc(!calc)
    }

    const onChange = (e) => {
        console.log(e)
        setValue(e)
        setDate(moment(e).format("DD/MM/YYYY"))
        getAvalibaleTime(moment(e).format("YYYY-MM-DD"))
        showCalc()
    }


    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between ">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Calendar</h4>
                                        </div>
                                    </div>
                                    {/* <div className="action-btn">
                                        <div className="btn px-15 btn-petrol">Sync Calendar</div>
                                    </div>
                                    <div className="action-btn">
                                        <div className="btn px-15 btn-petrol">Sync Calendar</div>
                                    </div> */}

                                    <div class="layout-button">
                                        <button type="button" class="btn px-15 btn-petrol">Sync Calendar</button>
                                        <button onClick={() => navigate('/create_time_slot')} type="button" class="btn btn-outline-petrol btn-squared color-petrol px-15">Create Time Slot</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-8">
                                {/* <Timetable
                                    events={{
                                        monday: [
                                            {
                                                id: 1,
                                                name: "Booked",
                                                type: "custom",
                                                startTime: new Date("2023-05-22T11:00:00"),
                                                endTime: new Date("2023-05-22T13:00:00"),
                                            },
                                        ],
                                        tuesday: [],
                                        wednesday: [],
                                        thursday: [],
                                        friday: [],
                                        saturday: [],
                                    }}
                                    style={{ height: '500px' }}
                                /> */}
                                <CalenderBig
                                    localizer={localizer}
                                    events={sessions}
                                    onSelectEvent={(event) => {
                                        // navigate("edit_calendar",{state:event.desc})
                                        setKey(key+1)
                                        setsessionEventDetail(event.desc)
                                        console.log(event)
                                    }}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                />
                            </div>

                            <div  className="col-lg-4">
                                <div key={key} className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form onSubmit={createSession}>
                                            <div className="row">
                                                <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        {/* <Multiselect
                                                            style={{ searchBox: { borderColor: 'gray' } }}
                                                            selectionLimit='1'
                                                            options={myMentee} // Options to display in the dropdown
                                                            placeholder='Select Mentees'
                                                            selectedValues={menteeList} // Preselected value to persist in dropdown
                                                            onSelect={onSelectBSkillDev} // Function will trigger on select event
                                                            onRemove={onRemoveBSkillDev} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        /> */}
                                                        <select value={sessionEventDetail.scheduler?.name} onChange={e => {}} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                            <option value={sessionEventDetail.scheduler?.name}>{sessionEventDetail.scheduler?.name}</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <h6 class="fw-500 mb-20 mt-20">Suggest to Reschedule</h6>

                                                <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        <select value={sessionEventDetail.programName} onChange={e => setProgramName(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                            <option value="">Select Program Name</option>
                                                            <option value="WSH - Skill Growth">WSH - Skill Growth</option>
                                                            <option value="WSH - Guidance">WSH - Guidance</option>
                                                            <option value="WSH - Advice">WSH - Advice</option>
                                                            <option value="WSH - Collaboration">WSH - Collaboration</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* <div className="col-md-12 mb-25">
                                                    <input value={date} onChange={e => {
                                                        setDate(e.target.value)
                                                        getAvalibaleTime(e.target.value)}} onFocus={() => setDateType('date')}
                                                        onBlur={() => setDateType('text')} type={dateType} className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" placeholder="Date" min={minDate} required />
                                                </div> */}
                                                <div className="col-md-12 mb-25">
                                                    <input
                                                        onClick={() =>showCalc()}
                                                        value={date}
                                                        // min={minDate}
                                                        // onChange={e => {
                                                        // setDate(e.target.value)
                                                        // getTimeSlots(e.target.value)}} onFocus={() => setDateType('date')} 
                                                        // onBlur={() => setDateType('text')} type={dateType}  
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="Date"  required/>
                                                        {calc && (
                                                            <Calendar onChange={e => onChange(e)} value={value} minDate={new Date()} />
                                                        )}
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                <select value={newTimeSlot} onChange={e => setNewTimeSlot(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                        <option value="">Select Available Slot</option>
                                                            {availableTime.map((i) => (
                                                                <option value={i.startTime}>{moment(i.startTime).format("HH:mm")} - {moment(i.endTime).format("HH:mm")}</option>
                                                            ))}
                                                            {/* <option value={programName}>{programName}</option>
                                                            <option value="OldProgram">Old Program</option>
                                                            <option value="NewProgram">New Program</option> */}
                                                        </select>
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        <select value={Object.keys(sessionEventDetail).length === 0 ? "" :sessionEventDetail.skills} onChange={e => setSelectedSkill(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                             {skillList && skillList.map((i) => (
                                                                <option value={i.skill}>{i.skill}</option>
                                                            ))}

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <textarea value={Object.keys(sessionEventDetail).length === 0 ? "" :sessionEventDetail.objective} onChange={e => setObjective(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Objectives" disabled></textarea>
                                                </div>

                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-petrol btn-default btn-squared w-100">Suggest</button>
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
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Calendar_Open;
