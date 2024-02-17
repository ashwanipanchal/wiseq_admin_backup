import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import close_icon from '../../../img/close.png';
import { NavLink, useNavigate } from "react-router-dom";
import { Checkbox, useCheckboxStore } from "@ariakit/react";
import './mentor.css'
import moment from 'moment'
import ms from 'ms';
import moment1 from 'moment-timezone';
import TimezoneSelect from 'react-timezone-select'
import Modal from "react-bootstrap/Modal";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import { Calendar } from "react-modern-calendar-datepicker";
import DatePicker from "react-date-picker";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { BASE_URL } from '../../../services/Config';

function Create_Time_Slot() {
    const navigate = useNavigate()
    const checkbox = useCheckboxStore();
    const minsec = ms('7d')
    console.log(minsec)
    const [key, setKey] = useState(0)
    const [selectedDay, setSelectedDay] = useState(null);
    const [dateType, setDateType] = useState("text")
    const [dateType1, setDateType1] = useState("text")
    const [selectedZone, setSelectedZone] = useState("")
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [allTimeZone, setAllTimeZone] = useState([])
    const [mentorBookedSlot, setMentorBookedSlot] = useState([])
    const [deletedSlotID, setdeletedSlotID] = useState("");
    const [selectedTimezone, setSelectedTimezone] =useState(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )

    useEffect(() => {
      const allTimezones = moment1.tz.names().map((timezone) => ({
        value: timezone,
        label: timezone,
      }));
      // console.log(allTimezones)
      setAllTimeZone(allTimezones)
    },[])

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);
   

    const [timeSlots, setTimeSlots] = useState([
      {
        isSelected: "",
        startTime:"09:00",
        endTime:"10:00"
      },
      {
        isSelected: "",
        startTime:"10:00",
        endTime:"11:00"
      },
      {
        isSelected: "",
        startTime:"11:00",
        endTime:"12:00"
      },
      {
        isSelected: "",
        startTime:"12:00",
        endTime:"13:00"
      },
      {
        isSelected: "",
        startTime:"13:00",
        endTime:"14:00"
      },
      {
        isSelected: "",
        startTime:"14:00",
        endTime:"15:00"
      },
      {
        isSelected: "",
        startTime:"15:00",
        endTime:"16:00"
      },
      {
        isSelected: "",
        startTime:"16:00",
        endTime:"17:00"
      },
      {
        isSelected: "",
        startTime:"17:00",
        endTime:"18:00"
      },
      {
        isSelected: "",
        startTime:"18:00",
        endTime:"19:00"
      },
      {
        isSelected: "",
        startTime:"19:00",
        endTime:"20:00"
      },
      {
        isSelected: "",
        startTime:"20:00",
        endTime:"21:00"
      },
      {
        isSelected: "",
        startTime:"21:00",
        endTime:"22:00"
      },
    ])
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [allSelected, setAllSelected] = useState([])

    const [value, setValue] = useState(new Date());
    const [value1, setValue1] = useState(new Date());
    // const [startDate, setStartDate] = useState("");
    const onChange = (e) => {
        console.log(e)
        setValue(e)
        setstartDate(moment(e).format("DD/MM/YYYY"))
        showCalc()
    }
    const [calc, setCalc] = useState(false);
    const onChange1 = (e) => {
      if(startDate == ""){
        alert("Please select start date first")
        return
      }else{
        console.log(e)
        setValue1(e)
        setendDate(moment(e).format("DD/MM/YYYY"))
        showCalc1()
      }
        
    }
    const [calc1, setCalc1] = useState(false);

    const showCalc = () => {
      setCalc(!calc)
  }
    const showCalc1 = () => {
      setCalc1(!calc1)
  }

    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    const max_date = new Date(+new Date(value)+minsec);
    console.log(max_date)
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

    const label = checkbox.useState((state) =>
      state.value ? "Checked" : "Unchecked"
    );

    useEffect(() => {
      getMySlots()
    },[])

    const getMySlots = async()=>{
      const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const respRepos = await fetch(`${BASE_URL}mentor-slots/my-slots`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            }
        })
        const response = await respRepos.json()
      console.log(response)
      let temp = []
     let filterTime =  response.data.map((i) => {
        if(new Date() < new Date(i.slotDate)){
         temp.push(i)
        }
        // return i
      })

      let arr = [];
    const cats = temp.reduce(
      (catsSoFar, { slotDate, startTime, endTime, id, timeZone }) => {
        if (!catsSoFar[slotDate]) catsSoFar[slotDate] = [];
        catsSoFar[slotDate].push({ id, startTime, endTime, timeZone });
        return catsSoFar;
      },
      {}
    );
    console.log(cats);
    for (const key in cats) {
      if (cats.hasOwnProperty(key)) {
        console.log(key);
        let dict = {
          key: key,
          value: cats[key],
        };
        arr.push(dict);
      }
    }

    setMentorBookedSlot(arr);

      
    }
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    const disableFutureDate = () => {
        const today = new Date(startDate);
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    const disablePastDateForEndDate = () => {
        const today = new Date(startDate);
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        console.log(yyyy + "-" + mm + "-" + dd)
        return yyyy + "-" + mm + "-" + dd;
    };

    const createTimeSlot = async (e) => {
      e.preventDefault()
      if(allSelected.length == 0){
        alert("Please Select Atleast One Time Slot.")
        return
      }
      console.log(`${startDate}T00:00:00Z`)
      console.log(`${endDate}T00:00:00Z`)
      let temp =[]
      console.log(allSelected)
      for(let time of allSelected){
        if(time.isSelected == "Y"){
          temp.push(time)
        }
      }
      console.log(temp)
      const body = {
        // "slotDateFrom": `${startDate}T00:00:00Z` ,
        "slotDateFrom": `${new Date(value).toISOString()}` ,
        "slotDateTo": `${new Date(value1).toISOString()}`,
        "timeSlots": temp,
        "timeZone": selectedTimezone?.value == undefined ? selectedTimezone : selectedTimezone?.value,
        // "timeZone": selectedZone,
      }
      // console.log(body)
      // return
      const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const respRepos = await fetch(`${BASE_URL}mentor-slots`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await respRepos.json()
        console.log(response)
        if(response.success){
          alert("You have successfully created your time slots")
          getMySlots()
        }
        // navigate('/')
    }

    let selectedTimeSlot = []
    const checkedSlot =(index, user) => {
      setKey(key+1)
      console.log(user)
      // return
      if (user.isSelected == "") {
          // for (let i of timeSlots) {
          //     i.isSelected = ""
          // }
          timeSlots[index].isSelected = "Y"
      } else {
          timeSlots[index].isSelected = ""
      }
      console.log(timeSlots)
      // return
      // selectedTimeSlot.push(timeSlots)
      
      setAllSelected(timeSlots)
      console.log(selectedTimeSlot)
    }

    const minDate = moment().format('YYYY-MM-DD');
    const minDateFor = moment().format(startDate);

    const deleteSlot = async() => {
      const token = localStorage.getItem("token");
      const btoken = `Bearer ${token}`;
      const respRepos = await fetch(
        `${BASE_URL}mentor-slots/${deletedSlotID}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: btoken,
          },
        }
      );
      const response = await respRepos.json();
      if(response.success){
        closeModal1()
        getMySlots()
      }
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
                          Create Time Slot
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="card card-Vertical card-default card-md mb-4">
                    <div className="">
                      <form onSubmit={createTimeSlot}>
                        <div className="row">
                          <div  className="col-md-6 mb-25">
                            <input
                              value={startDate}
                              onClick={() =>showCalc()}
                              // onFocus={() => setDateType('date')} 
                              // onBlur={() => setDateType('text')} 
                              // type={dateType}
                              // onChange={(e) => setstartDate(e.target.value)}
                              
                              className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                              placeholder="Start Date"
                              required
                            />
                            
                             {calc && (
                                <Calendar onChange={e => onChange(e)} value={value} minDate={new Date()} />
                              )}
                          </div>

                          <div className="col-md-6 mb-25">
                            <input
                              value={endDate}
                              onClick={() =>showCalc1()} 
                              // onChange={(e) => {
                              //   if (startDate == "") {
                              //     alert("Please Select Start Date");
                              //     return;
                              //   }
                              //   setendDate(e.target.value);
                              // }}
                              // onFocus={() => setDateType1('date')} 
                              // onBlur={() => setDateType1('text')} 
                              // type={dateType1}
                              // min={minDateFor}
                              // max={moment(max_date).format('YYYY-MM-DD')}
                              
                              className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                              placeholder="End Date"
                              required
                            />
                            {calc1 && (
                                <Calendar onChange={e => onChange1(e)} value={value1} minDate={new Date(value)}
                                maxDate={max_date} />
                              )}
                          </div>
                          <div className="col-md-6 mb-25">
                            <div className="countryOption">
                              {/* <select
                               onChange={e => setSelectedZone(e.target.value)}
                                className="form-select custom_selects"
                                aria-label="Default select example"
                              >
                                <option value="">Select Time Zone</option>
                                {allTimeZone.map((i) => (
                                  <option value={i.value}>{i.value}</option>
                                ))}
                                
                              </select> */}
                              <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
                            </div>
                          </div>
                          
                          <div className="dm-button-list d-flex flex-wrap align-items-end">
                            {/* <Checkbox
                              as="button"
                              store={checkbox}
                              className="buttonCheck"
                            >
                              {label}
                            </Checkbox> */}
                            {/* <button type='button' value={first.selected} onClick={(e) => {updateFirst()}} style={{backgroundColor: first ? "red": "white", color: first ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              9:00 AM TO 10:00 AM
                            </button>
                            <button type='button' value={second.selected} onClick={(e) => {setsecond(!second)}} style={{backgroundColor: second ? "red": "white", color: second ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              10:00 AM TO 11:00 AM
                            </button>
                            <button type='button' value={third.selected} onClick={(e) => {setthird(!third)}} style={{backgroundColor: third ? "red": "white", color: third ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              11:00 AM TO 12:00 PM
                            </button>
                            <button type='button' value={four.selected} onClick={(e) => {setfour(!four)}} style={{backgroundColor: four ? "red": "white", color: four ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              12:00 PM TO 1:00 PM
                            </button>
                            <button type='button' value={five.selected} onClick={(e) => {setfive(!five)}} style={{backgroundColor: five ? "red": "white", color: five ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              1:00 PM TO 2:00 PM
                            </button>
                            <button type='button' value={six.selected} onClick={(e) => {setsix(!six)}} style={{backgroundColor: six ? "red": "white", color: six ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              2:00 PM TO 3:00 PM
                            </button>
                            <button type='button' value={seven.selected} onClick={(e) => {setseven(!seven)}} style={{backgroundColor: seven ? "red": "white", color: seven ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              3:00 PM TO 4:00 PM
                            </button>
                            <button type='button' value={eight.selected} onClick={(e) => {seteight(!eight)}} style={{backgroundColor: eight ? "red": "white", color: eight ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              4:00 PM TO 5:00 PM
                            </button>
                            <button type='button' value={nine.selected} onClick={(e) => {setnine(!nine)}} style={{backgroundColor: nine ? "red": "white", color: nine ? "white": "#000"}}className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              5:00 PM TO 6:00 PM
                            </button>
                            <button type='button' value={ten.selected} onClick={(e) => {setten(!ten)}} style={{backgroundColor: ten ? "red": "white", color: ten ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              6:00 PM TO 7:00 PM
                            </button>
                            <button type='button' value={eleven.selected} onClick={(e) => {seteleven(!eleven)}} style={{backgroundColor: eleven ? "red": "white", color: eleven ? "white": "#000"}} className="btn btn-primary btn-default btn-squared btn-sm px-15">
                              7:00 PM TO 8:00 PM
                            </button> */}
                            {timeSlots.map((i, index) => (
                              <div onClick={() => checkedSlot(index, i)} >
                                <p style={{backgroundColor: i.isSelected == "Y" ? '#006666': "white", marginLeft:"10px", color: i.isSelected == "Y" ? 'white' : '#006666',  border:'1px solid #006666', borderRadius:'5px', cursor:'pointer', padding:'10px'}}>{i.startTime} - {i.endTime}</p>
                              </div>
                            ))}
                          </div>

                          <div className="layout-button">
                            <div className="btn_center">
                                <button
                                  type="submit"
                                  
                                  className="btn btn-petrol btn-default btn-squared mt-30"
                                >
                                  Create Slot
                                </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between ">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          Selected TimeSlots
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {mentorBookedSlot &&
                mentorBookedSlot.map((i) => (
                  <div className="row">
                    {/* {i.type == 'day' ? */}
                    <div className="row">
                      <div className="col-md-12">
                        {" "}
                        <h6 style={{ marginTop: "20px", marginBottom:'15px' }}>
                          Date : {moment(i.key).format("DD-MM-YYYY")}
                        </h6>{" "}
                      </div>
                    </div>
                    {/* null} */}

                    {i.value.map((j) => (
                      <div className="col-md-2">
                        {/* {i.type == 'day' ? null : */}

                        <div className="dm-button-list d-flex flex-wrap align-items-end">
                          <p
                            style={{
                              backgroundColor: "#f5f5f5",
                              marginLeft: "10px",
                              marginTop: "10px",
                              color: "#006666",
                              border: "1px solid #006666",
                              borderRadius: "5px",
                              // cursor: "pointer",
                              padding: "10px",
                            }}
                          >
                            {moment(j.startTime).format("HH:mm")} -{" "}
                            {moment(j.endTime).format("HH:mm")}
                            <br />
                            <span style={{ fontSize: "12px" }}>
                              {j.timeZone}
                            </span>
                          </p>
                          <p
                          onClick={() => {
                            setdeletedSlotID(j.id)
                            showModal1()
                          }}
                            style={{
                              left: 0,
                              cursor: "pointer",
                              marginBottom: "68px",
                              marginLeft: "-15px",
                            }}
                          >
                            <img style={{width:'22px'}} src={close_icon}/>
                          </p>
                        </div>
                        {/* } */}
                      </div>
                    ))}
                  </div>
                ))}
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

<Modal show={showHello1} onHide={closeModal1}>
          <Modal.Header className="mentor_feedback" closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-500 mb-25">
                Are you sure you want to delete this time slot?
                 {/* with {deletedID ? deletedID.sessionUsers[0]?.name : ""} on {deletedID ? moment(deletedID.scheduleTime).format('ddd, MMM DD, YYYY'): ""} at {deletedID ? moment(deletedID.scheduleTime).format(' hh:mm A '): ""}? */}
              </h4>

              <div class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal1()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() => deleteSlot()}
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

export default Create_Time_Slot;
