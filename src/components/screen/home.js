import clock_img from "../../img/clocks.svg";
import growth_home from "../../img/growth_home.svg";
import impact_home from "../../img/impact_home.svg";
import mentee_home from "../../img/mentee_home.svg";
import mentees_home from "../../img/mentees_home.svg";
import mentoring_home from "../../img/mentoring_home.svg";
import session_home from "../../img/session_home.svg";
import upcoming_home from "../../img/upcoming_home.svg";
import team_img from "../../img/user_pic.png";
import { useEffect, useState } from "react";
import edit_img from "../../img/edit.svg";
import Side_Bar from "./sidebar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/Config";
import Modal from 'react-bootstrap/Modal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DateRangePicker, DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import {
//   G2,
//   Chart,
//   Interval,
//   Axis,
//   Tooltip,
//   Coordinate,
//   Label,
//   Legend,
//   View,
//   Guide,
//   Shape,
//   Facet,
//   Util,
// } from "bizcharts";
import DataSet from "@antv/data-set";

const data = [
  {
    id: 1,
    mentoring_hours: "Mentoring Hours",
    mentoring_num: "7816",
    mentoring_count: "+12",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: clock_img,
  },
  {
    id: 2,
    mentoring_hours: "Mentees",
    mentoring_num: "887",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: mentees_home,
  },
  {
    id: 3,
    mentoring_hours: "Mentors",
    mentoring_num: "122",
    mentoring_count: "+12",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: mentee_home,
  },
  {
    id: 4,
    mentoring_hours: "Avg. Impact Score",
    mentoring_num: "407",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: impact_home,
  },
  {
    id: 5,
    mentoring_hours: "Sessions Completed",
    mentoring_num: "6975",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: session_home,
  },
  {
    id: 6,
    mentoring_hours: "Upcoming Sessions",
    mentoring_num: "166",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: upcoming_home,
  },
  {
    id: 7,
    mentoring_hours: "Mentoring Programs",
    mentoring_num: "109",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: mentoring_home,
  },
  {
    id: 8,
    mentoring_hours: "Growth Credits",
    mentoring_num: "166",
    mentoring_month: "This Month:",
    mentoring_number: "170",
    image: growth_home,
  },
];

const data1 = [
  {
    id: 1,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
  },
  {
    id: 2,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
  },
  {
    id: 3,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
  },
];

const data2 = [
  {
    id: 1,
    task_para: "Assign mentors for High Performance mentoring...",
    task_date: "By: Sep 15, 2022, 06:00 PM",
  },
  {
    id: 2,
    task_para: "Assign mentors for High Performance mentoring...",
    task_date: "By: Sep 15, 2022, 06:00 PM",
  },
  {
    id: 3,
    task_para: "Assign mentors for High Performance mentoring...",
    task_date: "By: Sep 15, 2022, 06:00 PM",
  },
  {
    id: 4,
    task_para: "Assign mentors for High Performance mentoring...",
    task_date: "By: Sep 15, 2022, 06:00 PM",
  },
];

const graphdata = [
  {
    label: "Sep",
    Skill: 2,
    Productivity: 8,
    Stress: 2,
    Work: 3,
    Job: 6,
    Workplace: 7,
  },
  {
    label: "Aug",
    Skill: 1,
    Productivity: 7,
    Stress: 1,
    Work: 6,
    Job: 2,
    Workplace:4,
  },
  {
    label: "Jul",
    Skill: 8,
    Productivity: 8,
    Stress: 2,
    Work: 6,
    Job: 7,
    Workplace: 2,
  },
];

function Home_Screen() {
  const navigate = useNavigate();
  const ds = new DataSet();
  const dv = ds.createView().source(graphdata);
  dv.transform({
    type: "fold",
    fields: ["Skill", "Productivity", "Stress", "Work", "Job", "Workplace"],
    key: "type",
    value: "value",
  });
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [topPeople, setTopPeople] = useState({});
  const [dashboardStat, setDashboardStat] = useState({})
  const [filterValue, setFilterValue] = useState("")
  const [newGraphData, setnewGraphData] = useState([])
  // const [value, setValue] = useState(new Date());
  const [value1, onChange1] = useState(new Date());
  const [tasks, setTasks] = useState([])
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const onChange = (e) => {
    console.log(e)
    // setValue(e)
    // setstartDate(moment(e).format("DD/MM/YYYY"))
    // showCalc()
}

  const [showHello, setShowHello] = useState(false);
  const closeModal = () => setShowHello(false);
  const showModal = () => setShowHello(true);

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
    // getMentor();
    // getMentee();
    getTasks()
    getTasks1()
    getStats()
    getTopMentorMentee()
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getTasks1 = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;   
    const res = await fetch(`https://api.wiseqglobal.com/api/tasks`,{
        method:'GET',
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": btoken,
        },
      })
      const response = await res.json()
        console.log("Tasks ",response)
        const {success, data} = response
        if(success){
            setTasks(data)
        }
        
}

  const getTasks = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;   
    // 2023-01-10T02:00:00Z from Date
    // const res = await fetch(`https://api.wiseqglobal.com/api/session/evolution-chart?from=${from != ""? from : "2023-01-10T02:00:00Z"}&to=${to != "" ? to : "2023-07-31T02:00:00Z"}`,{

    const res = await fetch(`https://api.wiseqglobal.com/api/session/evolution-chart?from=2023-01-10T02:00:00Z&to=${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString()}`,{
        method:'GET',
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": btoken,
        },
      })
      const response = await res.json()
        console.log("Chart Data ",response)
        const {success, data} = response
        let dataPoints = Object.values(data);
        let GD = []
        dataPoints.forEach((i, index) => {
          GD.push({
            name: index == 0 && "Jan" || index == 1 && "Feb" || index == 2 && "Mar" || index == 3 && "Apr" || index == 4 && "May" || index == 5 && "Jun" || index == 6 && "Jul" || index == 7 && "Aug" || index == 8 && "Sep" || index == 9 && "Oct" || index == 10 && "Nov" || index == 11 && "Dec",
            sessions: i,
          })
          // console.log(`There are ${i}`);
        })
        setnewGraphData(GD)
        let graphdata = [
          {
            name: 'Jan',
            sessions: 0,
          },
          {
            name: 'Feb',
            sessions: 0,
          },
          {
            name: 'Mar',
            sessions: 0,
          },
          {
            name: 'Apr',
            sessions: 0,
          },
          {
            name: 'May',
            sessions: 0,
          },
          {
            name: 'June',
            sessions: 2,
          },
          
        ];
        console.log(graphdata)
        // setnewGraphData(graphdata)
}

  console.log(state)
  const getStats = async() => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}dashboard/admin/stats`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    console.log("DASHBOAD STTATS", response);
    setDashboardStat(response.data)
    const { success } = response;

  }
  const getTopMentorMentee = async() => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}dashboard/admin/ranking`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    console.log("DASHBOAD STTATS", response);
    setTopPeople(response.data)
    const { success } = response;

  }

  const filterStats = async(i) => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    let url = ""
    if(i == "Year to Date"){
      url = `${BASE_URL}dashboard/admin/stats?start=${new Date(new Date().getFullYear(), 0, 1).toISOString()}&end=${new Date().toISOString()}`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
      });
      const response = await res.json();
      console.log("DASHBOAD STTATS for Year", response);
      if(response.success){
        setDashboardStat(response.data)
      }
    }
    if(i == "Month to Date"){
      url = `${BASE_URL}dashboard/admin/stats?start=${new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()}&end=${new Date().toISOString()}`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
      });
      const response = await res.json();
      console.log("DASHBOAD STTATS for Month", response);
      if(response.success){
        setDashboardStat(response.data)
      }
    }
    if(i == "Custom (Calendar Selection)"){
      showModal()
    }
    if(i == ""){
      getStats()
    }
    
  }

  const customDateFilter = async(e) => {
    console.log(e)
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    // if(state[0].startDate != null && state[0].endDate != null){
      console.log(state)
      // const res = await fetch(`${BASE_URL}dashboard/admin/stats?start=${state[0].startDate.toISOString()}&end=${state[0].endDate.toISOString()}`, {
        console.log(`${BASE_URL}dashboard/admin/stats?start=${new Date(e[0]).toISOString()}&end=${new Date(e[1]).toISOString()}`)
        const res = await fetch(`${BASE_URL}dashboard/admin/stats?start=${new Date(e[0]).toISOString()}&end=${new Date(e[1]).toISOString()}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
      });
      const response = await res.json();
      console.log("DASHBOAD STTATS from Custom Date ",state, "====", response);
      if(response.success){
        setDashboardStat(response.data)
        closeModal()
      }
      // const { success } = response;
    // }
    

  }


  return (
    <div className="main-content">
      <div
        style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
        className="contents expanded mt-30"
      >
        <div className="crm mb-25">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="contact-breadcrumb">
                  <div className="breadcrumb-main add-contact justify-content-sm-between">
                    <h4 className="text-capitalize fw-500 breadcrumb-title">
                      Home
                    </h4>

                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center add-contact__title justify-content-center me-sm-2">
                        <div className="action-btn">
                          <a href="#" className="btn px-15 btn-primary">
                            WiseQ Mentor Pool
                          </a>
                        </div>
                        <span className="sub-title ms-sm-25 ps-sm-25"></span>
                      </div>
                      <form
                        action="#"
                        className="d-flex align-items-center add-contact__form my-sm-0 my-2 bg-transparent"
                      >
                        <select
                          className="form-select custom_selects"
                          aria-label="Default select example"
                          value={filterValue}
                          onChange={(e) => {
                            setFilterValue(e.target.value)
                            filterStats(e.target.value)}}
                        >
                          <option value="">Select Filter</option>
                          <option value="Year to Date">Year to Date</option>
                          <option value="Month to Date">Month to Date</option>
                          <option value="Custom (Calendar Selection)">Custom (Calendar Selection)</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="row">
                  <div
                    onClick={() => navigate("/progress_report")}
                    className="col-lg-3 col-sm-3 col-md-6 mb-25"
                  >
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Mentoring Hours</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.mentoringHours?.session
                                  ?.value}{" "}
                              {/* <span className="fs-12 fw-400">+0</span> */}
                            </h2>
                            <p className="fs-11">
                              This Month:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.mentoringHours?.thisMonth}
                              </span>
                            </p>
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={clock_img} className="svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate("/mentee_management")}
                    className="col-lg-3 col-sm-3 col-md-6 mb-25"
                  >
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Mentees</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.menteeCounts?.totalUsers}
                            </h2>
                            <p className="fs-11">
                              Active Mentees:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.menteeCounts?.activeUsers}
                              </span>
                            </p>
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={mentees_home} className="svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate("/mentors")}
                    className="col-lg-3 col-sm-3 col-md-6 mb-25"
                  >
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Mentors</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.mentorCounts?.totalUsers}
                            </h2>
                            <p className="fs-11">
                              Active Mentors:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.mentorCounts?.activeUsers}
                              </span>
                            </p>
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={mentee_home} className="svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate("/progress_report")}
                    className="col-lg-3 col-sm-3 col-md-6 mb-25"
                  >
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Avg. Impact Score</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.avgImpactScore?.avgImpactScore.toFixed(
                                  1
                                )}
                            </h2>
                            <p className="fs-11">
                              Total Impact Score:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.avgImpactScore
                                    ?.totalImpactScore}
                              </span>
                            </p>
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={impact_home} className="svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate("/progress_report")}
                    className="col-lg-3 col-sm-3 col-md-6 mb-25"
                  >
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Sessions Completed</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.completedSessions?.session?.value}
                            </h2>
                            <p className="fs-11">
                              Today:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.completedSessions?.today}
                              </span>
                            </p>
                            <p className="fs-11">
                              This Week:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.completedSessions?.thisWeek}
                              </span>
                            </p>
                            <p className="fs-11">
                              This month:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.completedSessions?.thisMonth}
                              </span>
                            </p>
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={session_home} className="svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-3 col-md-6 mb-25">
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Upcoming Sessions</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.upcomingSessions?.session?.value}
                            </h2>
                            <p className="fs-11">
                              Today:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.upcomingSessions?.today}
                              </span>
                            </p>
                            <p className="fs-11">
                              This Week:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.upcomingSessions?.thisWeek}
                              </span>
                            </p>
                            <p className="fs-11">
                              This month:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.upcomingSessions?.thisMonth}
                              </span>
                            </p>
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={upcoming_home} className="svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-3 col-md-6 mb-25">
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Mentoring Programs</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.mentoringPrograms?.count}
                            </h2>
                            <p className="fs-11">
                              In-progress:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.mentoringPrograms?.progress}
                              </span>
                            </p>
                            <p className="fs-11">
                              To Start:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.mentoringPrograms?.start}
                              </span>
                            </p>
                            <p className="fs-11">
                              Completed:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.mentoringPrograms?.completed}
                              </span>
                            </p>
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={mentoring_home} className="svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate("/progress_report")}
                    className="col-lg-3 col-sm-3 col-md-6 mb-25"
                  >
                    <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                      <div className="overview-content w-100">
                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                          <div className="ap-po-details__titlebar">
                            <p>Growth Credits</p>
                            <h2>
                              {dashboardStat &&
                                dashboardStat.growthCredit?.totalGrowthCredit}
                            </h2>
                            
                          </div>
                          <div className="ap-po-details__icon-area">
                            <div className="svg-icon">
                              <img src={growth_home} className="svg" />
                            </div>
                          </div>
                        </div>
                        <div class="ap-po-details-time1">
                        <p className="fs-11">
                              Total Growth Credits:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.growthCredit?.totalGrowthCredit}
                              </span>
                            </p>
                            <p className="fs-11">
                              Avg. Growth Credits:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.growthCredit?.avgGrowthCredit}
                              </span>
                            </p>
                            <p className="fs-11">
                              Mentees &lt; 100 Growth Credits:{" "}
                              <span className="color-dark fs-12 fw-400">
                                {dashboardStat &&
                                  dashboardStat.growthCredit
                                    ?.menteesLessThan100GrowthCredit}
                              </span>
                            </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6 mb-25">
                    <div className="card border-0 px-25 pb-20 project-task-list--event box_shadow1">
                      <div className="card-header px-0 border-0">
                        <h6>Top Mentees</h6>
                        {/* <p className="color-orange fw-400 mb-0 fs-14">View All</p> */}
                      </div>
                      <div className="card-body p-0">
                        <div className="row">
                          {topPeople &&
                            topPeople.mentees?.map((user, index) => (
                              <div
                                style={{ cursor: "pointer", borderRight: index == 2 && 'none' }}
                                onClick={() =>
                                  navigate("/mentee_profile", {
                                    state: user.id,
                                  })
                                }
                                className="col-lg-4 col-md-6 border-end mentee_border"
                              >
                                <div className="text-center">
                                  <div className="account-profile-cards">
                                    <div className="ap-img d-flex justify-content-center">
                                      <img
                                        src={
                                          user.imageUrl == ""
                                            ? team_img
                                            : user.imageUrl
                                        }
                                        className="ap-img__main bg-opacity-primary  wh-80 rounded-circle mb-3"
                                      />
                                    </div>
                                    <div className="ap-nameAddress">
                                      <h6 className="ap-nameAddress__title">
                                        {user.name}
                                      </h6>
                                      {/* <p className="ap-nameAddress__subTitle  fs-14 pt-1 m-0">
                                        {user.mentee_manager}
                                      </p> */}
                                      <p className="ap-nameAddress__subTitle  fs-14 m-0 ">
                                        {user.jobTitle}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-25">
                    <div className="card border-0 px-25 pb-20 project-task-list--event box_shadow1">
                      <div className="card-header px-0 border-0">
                        <h6>Top Mentors</h6>
                        {/* <p className="color-orange fw-400 mb-0 fs-14">View All</p> */}
                      </div>
                      <div className="card-body p-0">
                        <div className="row">
                          {topPeople &&
                            topPeople.mentors?.map((user) => (
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate("/mentor_profile", {
                                    state: user.id,
                                  })
                                }
                                className="col-lg-4 col-md-6 border-end mentee_border"
                              >
                                <div className="text-center">
                                  <div className="account-profile-cards">
                                    <div className="ap-img d-flex justify-content-center">
                                      <img
                                        src={
                                          user.imageUrl == ""
                                            ? team_img
                                            : user.imageUrl
                                        }
                                        className="ap-img__main bg-opacity-primary  wh-80 rounded-circle mb-3"
                                      />
                                    </div>
                                    <div className="ap-nameAddress">
                                      <h6 className="ap-nameAddress__title">
                                        {user.name}
                                      </h6>
                                      {/* <p className="ap-nameAddress__subTitle  fs-14 pt-1 m-0">
                                        {user.mentee_manager}
                                      </p> */}
                                      <p className="ap-nameAddress__subTitle  fs-14 m-0 ">
                                        {user.jobTitle}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                  <div className="card-header px-0 border-0">
                    <h6>Tasks To Complete</h6>
                  </div>
                  <div className="card-body p-0">
                    <div className="tab-content">
                      <div className="project-task table-responsive table-responsive--dynamic">
                        <table className="table table-borderless mb-1">
                          <tbody>
                            
                            {tasks && tasks.slice(0,3).map((user) => (
                              <tr className="project-task-list">
                                <td>
                                  <div className="box_shadow1 p-15 notifi">
                                    <div className="event-Wrapper">
                                      <div className="event-Wrapper__left">
                                        <div className="event-wrapper-item">
                                          <img src={user.icon} className="svg" />
                                        </div>
                                      </div>
                                      <div className="event-Wrapper__right">
                                      <h6>{user.title}</h6>
                                      <span>{user.task_date}</span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{cursor:'pointer'}} onClick={() => navigate("/all_task", {state:tasks})} className="view_all text-center">
                                                        <h6 className="dropdown-wrapper__more ">View All</h6>
                                                    </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                <div className="card border-0 px-25 pb-10 project-task-list--event box_shadow1">
                  <div className="card-header px-0 border-0">
                    <h6>Sessions Evolution</h6>
                  </div>
                  <BarChart
                            width={500}
                            height={300}
                            data={newGraphData || []}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false}/>
                            <Tooltip />
                            {/* <Legend /> */}
                            {/* <Line
                              type="monotone"
                              dataKey="pv"
                              stroke="#8884d8"
                              activeDot={{ r: 8 }}
                            /> */}
                            <Bar dataKey="sessions" fill="#82ca9d" />
                          </BarChart>
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
          <Modal.Title>Select Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
          <Calendar onChange={e => {
              onChange1(e)
              customDateFilter(e)
              }} value={value1} maxDate={new Date()} selectRange={true}/>
          </center>
            {/* <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setState([item.selection])
                customDateFilter()
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            /> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home_Screen;
