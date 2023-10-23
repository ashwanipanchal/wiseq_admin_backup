import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
import Timetable from 'react-timetable-events'
import moment from 'moment'
import { Calendar as CalenderBig, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function Edit_Calendar() {
    const localizer = momentLocalizer(moment)
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const [sessions,setSessions] = useState([])
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [dateType, setDateType] = useState("text")
    const [sesDate, setSesDate] = useState("")
    const [sesTime, setSesTime] = useState("")
    const [menteeForResch, setmenteeForResch] = useState(state.scheduler)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [myMentee, setMyMentee] = useState([])
    const [menteeList, setMenteeList] = useState([])
    const [selectedMenteeID, setselectedMenteeID] = useState([])
    const [skillList, setSkillList] = useState([])
    // const [programName, setProgramName] = useState("")
    const [programName, setProgramName] = useState(state.programName)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [objective, setObjective] = useState(state.objective)
    // const [selectedSkill, setSelectedSkill] = useState("")
    const [selectedSkill, setSelectedSkill] = useState(state.skills)
    const [availableTime, setAvailableTime] = useState([])
    const [newTimeSlot, setNewTimeSlot] = useState("")
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
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

    const getMyMentorList = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`http://13.235.104.81:8000/api/mentor/my-mentees`, {
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

    const getSkills = async () => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`http://13.235.104.81:8000/api/mentor/profile`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response.data.expertise.businessSkillsGoodAt)
        setSkillList(response.data.expertise.businessSkillsGoodAt)

    }

    useEffect(() => {
        mentorSessions()
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

    const minDate = moment().format('YYYY-MM-DD');

    const createSession = async (e) => {
        e.preventDefault()
        // console.log(selectedMenteeID)
        // return
        
        const btoken = `Bearer ${token}`;
        const body = 
            {
                "sessionId": state.id,
                "scheduleTime": newTimeSlot
              }
        // console.log(body)
        // return
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
            navigate('/sessions_list')
        }
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
                                                <div className="col-md-12 mb-25">
                                                    {/* <div class="countryOption"> */}
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
                                                        <select value={menteeForResch.name} onChange={e => setProgramName(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                            <option value={menteeForResch.name}>{menteeForResch.name}</option>
                                                            {/* <option value="OldProgram">Old Program</option>
                                                            <option value="NewProgram">New Program</option> */}
                                                        </select>
                                                        {/* <select value={menteeForResch} onChange={e => setDate(e.target.value)} type='text' disabled/> */}
                                                    {/* </div> */}
                                                </div>

                                                <h6 class="fw-500 mb-20 mt-20">Suggest to Reschedule</h6>

                                                <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        <select value={programName} onChange={e => setProgramName(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                            <option value={programName}>{programName}</option>
                                                            <option value="OldProgram">Old Program</option>
                                                            <option value="NewProgram">New Program</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <input value={date}
                                                    onClick={() =>showCalc()}
                                                    // onChange={e => {
                                                    //     setDate(e.target.value)
                                                    //     getAvalibaleTime(e.target.value)}} 
                                                        // onFocus={() => setDateType('date')}
                                                        // onBlur={() => setDateType('text')} 
                                                        // type={dateType} 
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="Date"
                                                        //  min={minDate} 
                                                         required />
                                                         {calc && (
                                                            <Calendar onChange={e => onChange(e)} value={value} minDate={new Date()} />
                                                        )}
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                <div class="countryOption">
                                                        <select value={newTimeSlot} onChange={e => setNewTimeSlot(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" >
                                                        <option value="">Select Available Slot</option>
                                                            {availableTime.map((i) => (
                                                                <option value={i.startTime}>{moment(i.startTime).format("HH:mm")} - {moment(i.endTime).format("HH:mm")}</option>
                                                            ))}
                                                            {/* <option value={programName}>{programName}</option>
                                                            <option value="OldProgram">Old Program</option>
                                                            <option value="NewProgram">New Program</option> */}
                                                        </select>
                                                    </div>
                                                    {/* <input value={time} onChange={e => setTime(e.target.value)} type="time" className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" placeholder="time" required /> */}
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <div class="countryOption">
                                                        <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                            {/* <option value="">Select Skill</option> */}
                                                            <option value={selectedSkill}>{selectedSkill}</option>
                                                            
                                                            {/* {skillList && skillList.map((i) => (
                                                                <option value={i.skill}>{i.skill}</option>
                                                            ))} */}

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <textarea value={objective} onChange={e => setObjective(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Objectives" disabled></textarea>
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

export default Edit_Calendar;
