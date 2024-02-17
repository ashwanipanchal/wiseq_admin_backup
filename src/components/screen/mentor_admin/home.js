import clock_img from '../../../img/conduuct.svg';
import { useEffect, useState } from 'react';
import team_img from '../../../img/tm1.png';
import edit_img from '../../../img/hand_rating.svg';
import growth_credit from '../../../img/growth_credit.svg';
import rating from '../../../img/mentor_rating.svg';
import mymentee from '../../../img/mentor_mymentee.svg';
import authornav_img from '../../../img/user_pic.png';
import Side_bar from './sidebar';
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

import { DateRangePicker, DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import Modal from 'react-bootstrap/Modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BASE_URL, BASE_URL_APPLSURE, BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';

const graphdata = [
    {
      name: 'Jul',
      uv: 100,
      pv: 240,
      amt: 240,
    },
    {
      name: 'Aug',
      uv: 300,
      pv: 139,
      amt: 221,
    },
    {
      name: 'Sep',
      uv: 200,
      pv: 380,
      amt: 229,
    },
    
  ];

const data = [
    { id: 1, mentoring_hours: "Impact Score", mentoring_num: "241", mentoring_month: "Upcoming:", mentoring_number: "4" },
    { id: 2, mentoring_hours: "Impact Score", mentoring_num: "241", mentoring_month: "Upcoming:", mentoring_number: "4" },
    { id: 3, mentoring_hours: "Impact Score", mentoring_num: "241", mentoring_month: "Upcoming:", mentoring_number: "4" },
    { id: 4, mentoring_hours: "Impact Score", mentoring_num: "241", mentoring_month: "Upcoming:", mentoring_number: "4" },
];

const data1 = [
    { id: 1, mentee_name: "Mira Dorwart", mentee_manager: "Senior Manager", mentee_position: "HRM" },
    { id: 2, mentee_name: "Mira Dorwart", mentee_manager: "Senior Manager", mentee_position: "HRM" },
    { id: 3, mentee_name: "Mira Dorwart", mentee_manager: "Senior Manager", mentee_position: "HRM" },
];

const data2 = [
    { id: 1, task_para: "Assign mentors for High Performance mentoring...", task_date: "By: Sep 15, 2022, 06:00 PM" },
    { id: 2, task_para: "Assign mentors for High Performance mentoring...", task_date: "By: Sep 15, 2022, 06:00 PM" },
    { id: 3, task_para: "Assign mentors for High Performance mentoring...", task_date: "By: Sep 15, 2022, 06:00 PM" },
    { id: 4, task_para: "Assign mentors for High Performance mentoring...", task_date: "By: Sep 15, 2022, 06:00 PM" },
];

function Home_Screen() {
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [value1, onChange1] = useState(new Date());
    const [impactScore, setimpactScore] = useState("")
    const [totalImpactScore, setTotalImpactScore] = useState("")
    const [notificationCount, setNotificationCount] = useState("")
    const [bannerStatus, setBannerStatus] = useState()
    const [sessionConducted, setsessionConducted] = useState("")
    const [totalSessionConducted, setTotalSessionConducted] = useState("")
    const [upcomingSession, setupcomingSession] = useState("")
    const [myMentees, setmyMentees] = useState("")
    const [totalMentees, settotalMentees] = useState("")
    const [myRatings, setmyRatings] = useState("")
    const [totalRatings, settotalRatings] = useState("")
    const [menteeList, setMenteeList] = useState([])
    const [sessions, setSessions] = useState([])
    const [payload, setPayload] = useState({});
    const [tasks, setTasks] = useState([])
    const [newGraphData, setnewGraphData] = useState([])
    const [programs, setPrograms] = useState([])
    const [filterValue, setFilterValue] = useState("")
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      }
    ]);
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }


    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    useEffect(() => {
      createToken()
     
    },[])
    
    const createToken = async() => {
      const body = {
          "user_id":localStorage.getItem("user_id")
      }
      const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}create-access`, {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              // "Authorization": btoken,
              // "Authentication ": btoken,
          },
          body:JSON.stringify(body)
      })
      const response = await res.json()
      console.log(response)
      const { success } = response
      // setIsLoading(false)
      if (success) {
          localStorage.setItem("program_token_node", response.token)
          // setMentorList(response.data)
      }
      
    }



    useEffect(() => {
      getProfile()
        getScores()
        getSessions()
        getTasks()
        getChartData()
    },[])

    const getProfile = async() => {
      const token = await localStorage.getItem("token")
      const btoken = `Bearer ${token}`;

      if(localStorage.hasOwnProperty("full_details") ){
        console.log("inside null")
        if(Object.keys(localStorage.getItem("full_details")).length > 0 ){
        
        }else{
          console.log("first")
        
        const res = await fetch(`${BASE_URL_APPLSURE}profile-mentee?id=${localStorage.getItem("user_id")}`,{
                  method:'GET',
                  headers:{
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                  },
                })
                const response = await res.json()
              console.log("==========",response)
              const {status} = response
              if(status){
                // console.log(Object.keys(localStorage.getItem("full_details")).length == true)
                // if(Object.keys(localStorage.getItem("full_details")).length == true){
  
                // }else{
  
                  localStorage.setItem("full_details", JSON.stringify(response.u))
                // }
              }
            }
            
      }else{
        
        const res = await fetch(`${BASE_URL_APPLSURE}profile-mentee?id=${localStorage.getItem("user_id")}`,{
          method:'GET',
          headers:{
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
          },
        })
        const response = await res.json()
      console.log("==========",response)
      const {status} = response
      if(status){
        // console.log(Object.keys(localStorage.getItem("full_details")).length == true)
        // if(Object.keys(localStorage.getItem("full_details")).length == true){

        // }else{

          localStorage.setItem("full_details", JSON.stringify(response.u))
        // }
      }

      }


      
      
  }

    const getSessions = async() => {
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
            console.log(response)
            const {success, data} = response
            if(success){
                setSessions(data)
            }
            
    }

    const filterStats = async(i) => {
      const token = await localStorage.getItem("token");
      const btoken = `Bearer ${token}`;
      let url = ""
      if(i == 1){
        url = `${BASE_URL}mentor/dashboard-counts?start=${new Date(new Date().getFullYear(), 0, 1).toISOString()}&end=${new Date().toISOString()}`
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
          // setDashboardStat(response.data)
          setimpactScore(response.data.impactScore)
          setTotalImpactScore(response.data.totalImpactScore)
          setsessionConducted(response.data.sessionConducted)
          setTotalSessionConducted(response.data.totalSessionConducted)
          setupcomingSession(response.data.nextSession)
          setmyMentees(response.data.myMentees)
          settotalMentees(response.data.totalMentees)
          setmyRatings(response.data.myRatings.toFixed(1))
          settotalRatings(response.data.totalRatings)
        }

        // getTasks(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),new Date().toISOString())
      }
      if(i == 2){
        url = `${BASE_URL}mentor/dashboard-counts?start=${new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()}&end=${new Date().toISOString()}`
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
          // setDashboardStat(response.data)
          setimpactScore(response.data.impactScore)
          setTotalImpactScore(response.data.totalImpactScore)
          setsessionConducted(response.data.sessionConducted)
          setTotalSessionConducted(response.data.totalSessionConducted)
          setupcomingSession(response.data.nextSession)
          setmyMentees(response.data.myMentees)
          settotalMentees(response.data.totalMentees)
          setmyRatings(response.data.myRatings.toFixed(1))
          settotalRatings(response.data.totalRatings)
        }

        // getTasks(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),new Date().toISOString())
      }
      if(i == 3){
        showModal()
      }
      if(i == ""){
        getScores()
      }
      
    }


    const customDateFilter = async(e) => {
      console.log(e)
      const token = await localStorage.getItem("token");
      const btoken = `Bearer ${token}`;
      // if(state[0].startDate != null && state[0].endDate != null){
        console.log(state)
        // const res = await fetch(`${BASE_URL}dashboard/admin/stats?start=${state[0].startDate.toISOString()}&end=${state[0].endDate.toISOString()}`, {
          console.log(`${BASE_URL}mentor/dashboard-counts?start=${new Date(e[0]).toISOString()}&end=${new Date(e[1]).toISOString()}`)
          const res = await fetch(`${BASE_URL}mentor/dashboard-counts?start=${new Date(e[0]).toISOString()}&end=${new Date(e[1]).toISOString()}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: btoken,
          },
        });
        const response = await res.json();
        console.log("DASHBOAD STTATS from Custom Date ",state, "====", response);
        // if(response.success){
        //   setDashboardStat(response.data)
        //   closeModal()
        // }
        if(response.success){
          setimpactScore(response.data.impactScore)
          setTotalImpactScore(response.data.totalImpactScore)
          setsessionConducted(response.data.sessionConducted)
          setTotalSessionConducted(response.data.totalSessionConducted)
          setupcomingSession(response.data.nextSession)
          setmyMentees(response.data.myMentees)
          settotalMentees(response.data.totalMentees)
          setmyRatings(response.data.myRatings.toFixed(1))
          settotalRatings(response.data.totalRatings)
                closeModal()
        }
        // const { success } = response;
      // }
      
  
    }

  //   const customDateFilter = async() => {
  //   const token = await localStorage.getItem("token");
  //   const btoken = `Bearer ${token}`;

  //   const res = await fetch(`${BASE_URL}mentor/dashboard-counts?start=${state[0].startDate.toISOString()}&end=${state[0].endDate.toISOString()}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: btoken,
  //     },
  //   });
  //   const response = await res.json();
  //   console.log("DASHBOAD STTATS from Custom Date ",state, "====", response);
  //   // setDashboardStat(response.data)
  //   const { success } = response;
  //   if(success){
  //     setimpactScore(response.data.impactScore)
  //           setsessionConducted(response.data.sessionConducted)
  //           setupcomingSession(response.data.upcomingSession)
  //           setmyMentees(response.data.myMentees)
  //           setmyRatings(response.data.myRatings.toFixed(1))
  //           settotalRatings(response.data.totalRatings)
  //   }
  //   // getTasks(state[0].startDate.toISOString(),state[0].endDate.toISOString())
  // }

    // const getTasks = async() => {
    //     const token = await localStorage.getItem("token")
    //     const btoken = `Bearer ${token}`;   
    //     const res = await fetch(`${BASE_URL}session/evolution-chart?from=2023-01-10T02:00:00Z&to=2023-07-31T02:00:00Z`,{
    //         method:'GET',
    //         headers:{
    //           "Accept": "application/json",
    //           "Content-Type": "application/json",
    //           "Authorization": btoken,
    //         },
    //       })
    //       const response = await res.json()
    //         console.log("Chart Data ",response)
    //         const {success, data} = response
    //         let dataPoints = Object.values(data);
    //         console.log(dataPoints)
    //         let GD = []
    //         dataPoints.forEach((i) => {
    //           GD.push({
    //             name: i == 0 && "Jan" || i == 1 && "Feb" || i == 2 && "Mar" || i == 3 && "Apr" || i == 4 && "May" || i == 5 && "Jun" || i == 6 && "Jul" || i == 7 && "Aug",
    //             sessions: i,
    //           })
    //           console.log(`There are ${i}`);
    //         })
    //         console.log(GD)
    //         let graphdata = [
    //           {
    //             name: 'Jan',
    //             sessions: 0,
    //           },
    //           {
    //             name: 'Feb',
    //             sessions: 0,
    //           },
    //           {
    //             name: 'Mar',
    //             sessions: 0,
    //           },
    //           {
    //             name: 'Apr',
    //             sessions: 0,
    //           },
    //           {
    //             name: 'May',
    //             sessions: 0,
    //           },
    //           {
    //             name: 'June',
    //             sessions: 2,
    //           },
              
    //         ];
    //         setnewGraphData(graphdata)
    // }

    const getTasks = async() => {
      const token = await localStorage.getItem("token")
      const btoken = `Bearer ${token}`;   
      // 2023-01-10T02:00:00Z from Date
      // const res = await fetch(`${BASE_URL}session/evolution-chart?from=${from != ""? from : "2023-01-10T02:00:00Z"}&to=${to != "" ? to : "2023-07-31T02:00:00Z"}`,{

      const res = await fetch(`${BASE_URL}session/evolution-chart?from=2023-01-10T02:00:00Z&to=${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString()}`,{
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
          console.log(dataPoints)
          let GD = []
          dataPoints.forEach((i, index) => {
              console.log(i)
            GD.push({
              name: index == 0 && "Jan" || index == 1 && "Feb" || index == 2 && "Mar" || index == 3 && "Apr" || index == 4 && "May" || index == 5 && "Jun" || index == 6 && "Jul" || index == 7 && "Aug" || index == 8 && "Sep" || index == 9 && "Oct" || index == 10 && "Nov" || index == 11 && "Dec",
              sessions: i,
            })
            console.log(`There are ${i}`);
          })
          console.log(GD)
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

    const getChartData = async() => {
      const token = await localStorage.getItem("token");
      const btoken = `Bearer ${token}`;
      // const res = await fetch(`${BASE_URL}tasks`, {
        const body ={
          "user_id":localStorage.getItem("user_id")
      }
      console.log(body)
      const res = await fetch(`${BASE_URL_APPLSURE}get-task`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
        body:JSON.stringify(body)
      });
      const response = await res.json();
      console.log("Tasks ", response);
      const { success, data } = response;
      if (response.status) {
        let temp = []
        response.task.map((i) => {
          if(i.status == "not-completed"){
            temp.push(i)
          }
        })
        setTasks(temp);
      }
            
    }

    const getScores = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;   
        const res = await fetch(`${BASE_URL}mentor/dashboard-counts`,{
            method:'GET',
            headers:{
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": btoken,
            },
          })
          const response = await res.json()

                  const res1 = await fetch(`${BASE_URL}mentor/my-mentees`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
              })
              const response1 = await res1.json()
              setMenteeList(response1.data)
              setBannerStatus(response.data.welcomeBannerEnable)
            console.log(response)
            setNotificationCount(response.data.notificationCount)
            setimpactScore(response.data.impactScore)
            setTotalImpactScore(response.data.totalImpactScore)
            setsessionConducted(response.data.sessionConducted)
            setTotalSessionConducted(response.data.totalSessionConducted)
            setupcomingSession(response.data.nextSession)
            setmyMentees(response.data.myMentees)
            settotalMentees(response.data.totalMentees)
            setmyRatings(response.data.myRatings.toFixed(1))
            settotalRatings(response.data.totalRatings)
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
            // console.log(getWindowSize())
        }
        getMyMentoring()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const goToTask = async(item) => {
      if(item.type == "connect-mentee"){
        navigate("/my_mentee")
      }
      if(item.type == "explore-community"){
        navigate("/community_screen")
      }
      if(item.type == "complete-profile"){
        navigate("/my_profile")
      }
      if(item.type == "session-request"){
        console.log(item)
        setPayload(JSON.parse(item.payloadJson))
        showModal1()
      }
      
    }


    const acceptSession = async (val) => {
      // alert(JSON.stringify(val))
      //     return
      const token = localStorage.getItem("token")
      const btoken = `Bearer ${token}`;
      const body = {
          status: val == 0 ? "rejected" : "accepted"
      }
      const res = await fetch(`${BASE_URL}session/requests/${payload.sessionId}`, {
          method: 'PUT',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
          body: JSON.stringify(body)
      })
      const response = await res.json()
      const { success } = response
      if (success) {
          // getSessionRequest()
          closeModal1()
          getChartData()
          // getNotificationCount()
      }

  }


  const getMyMentoring = async() => {
    var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "status":"4"
    });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch(`${BASE_URL_APPLSURE_MENTORING}user/user-program-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log("==",result)
          setPrograms(result?.programs)
      })
    
    }
    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded mt-30"
        >
          <div className="crm mb-25">
            <div className="container-fluid">
              <div className="">
                <div className="col-lg-12">
                  <div className="contact-breadcrumb">
                    <div className="breadcrumb-main add-contact justify-content-sm-between">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Home
                      </h4>

                      <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                        <form
                          action="#"
                          className="d-flex align-items-center add-contact__form my-sm-0 my-2 bg-transparent"
                        >
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={filterValue}
                          onChange={(e) => filterStats(e.target.value)}
                          >
                            <option value="">Select Filter</option>
                          <option value="1">Year to Date</option>
                          <option value="2">Month to Date</option>
                          <option value="3">Custom (Calendar Selection)</option>
                          </select>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {bannerStatus && (
                  <div className="col-lg-12">
                    <div className="row">
                            <div style={{backgroundColor:'#eaf3f3', padding:'15px', borderRadius:'10px'}} className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div style={{width:'75%'}}>
                                        <h3>Welcome {localStorage.getItem("user_info")}, Let’s Get Started</h3>
                                        <p style={{color:'#2B363B', marginTop:'10px'}}>Get ready to make a meaningful impact by sharing your expertise, experience, and wisdom, while fostering valuable connections. Your invaluable guidance will enable many mentees to achieve their goals and reach greater heights.</p>
                                    </div>
                                    <div class="layout-button">
                                        {/* <button type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1">Watch Platform Video</button> */}
                                        <button onClick={() => navigate('/my_profile')} type="button" className="btn btn-petrol btn-default btn-squared flex-grow-1" >Complete your profile</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                  </div>
                )}

          {localStorage.getItem("switch_message_flag") <=5 && localStorage.getItem("switch_message_flag") != "" && (
                        <div className="col-lg-12">
                              <div className="row">
                                      <div style={{backgroundColor:'#eaf3f3', padding:'15px', borderRadius:'10px'}} className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                          <div style={{display:'flex', justifyContent:'space-between'}}>
                                              <div style={{width:'100%'}}>
                                                  <p style={{color:'#2B363B', marginTop:'10px'}}><span style={{fontWeight:'bold'}}>Hello {localStorage.getItem("user_info")}</span>, You have also been given mentor access on the platform. Click on the top right profile icon to switch between your dual roles.</p>
                                              </div>
                                              
                                          </div>
                                      </div>
                              </div>
                            </div>
                        )}

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3 col-sm-3 col-md-6 mb-25">
                      <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                        <div className="overview-content w-100">
                          <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                            <div className="ap-po-details__titlebar">
                              <p>Impact Score</p>
                              <h2>{impactScore}</h2>
                              <p className="fs-11">
                              Total Impact Score{" "}
                              <span className="color-dark fs-12 fw-400">{totalImpactScore}</span>
                            </p>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img src={growth_credit} className="svg" />
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
                              <p>Sessions Conducted</p>
                              <h2>{sessionConducted}</h2>
                              <p className="fs-11">
                                Total Sessions Conducted{" "}
                                <span className="color-dark fs-12 fw-400">
                                  {totalSessionConducted}
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
                    <div className="col-lg-3 col-sm-3 col-md-6 mb-25">
                      <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                        <div className="overview-content w-100">
                          <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                            <div className="ap-po-details__titlebar">
                              <p>My Mentees</p>
                              <h2>{myMentees}</h2>
                              <p className="fs-11">
                                Total Number of Mentees{" "}
                                <span className="color-dark fs-12 fw-400">
                                  {totalMentees}
                                </span>
                              </p>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img src={mymentee} className="svg" />
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
                              <p>My Rating</p>
                              <h2>{myRatings}</h2>
                              <p className="fs-11">
                                Total Ratings{" "}
                                <span className="color-dark fs-12 fw-400">
                                  {totalRatings}
                                </span>
                              </p>
                            </div>
                            <div className="ap-po-details__icon-area">
                              <div className="svg-icon">
                                <img src={rating} className="svg" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-3 mb-25">
                    <div className="card border-0 px-20 pb-20 project-task-list--event box_shadow1 mentee_card">
                      <div className="card-header px-0 border-0">
                        <h6>Next Session</h6>
                      </div>

                      {upcomingSession && (
                        <>
                        <p className="color-dark fw-500 mb-0">
                          {moment(upcomingSession.scheduleTime).format(
                            "ddd, MMM DD, hh:mm A"
                          )}
                        </p>

                        <div className="media-body d-flex mt-2  mb-3">
                          <img
                            
                            src={
                              upcomingSession.sessionUsers[0].imageUrl == ""
                                ? authornav_img
                                : upcomingSession.sessionUsers[0].imageUrl
                            }
                            className="me-10 wh-40 rounded-circle bg-opacity-primary"
                          />
                          <div className="mt-1">
                            <h6 className="fw-500">
                              {upcomingSession.sessionUsers[0].name}
                            </h6>
                            <p className="fs-12 color-light mb-0">{upcomingSession.sessionUsers[0].jobTitle}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigate('/live_session_profile', { state: upcomingSession })}
                          className="btn btn-petrol btn-default btn-squared w-100"
                        >
                          Join Session
                        </button>
                      </>
                      )}

                      {/* {sessions.upcoming?.length > 0 && (
                        <>
                          <p className="color-dark fw-500 mb-0">
                            {moment(sessions.upcoming[0].scheduleTime).format(
                              "ddd, MMM DD, hh:mm A"
                            )}
                          </p>

                          <div className="media-body d-flex mt-2  mb-3">
                            <img
                              src={authornav_img}
                              className="me-10 wh-40 rounded-circle bg-opacity-primary"
                            />
                            <div className="mt-1">
                              <h6 className="fw-500">
                                {sessions.upcoming[0].sessionUsers[0].name}
                              </h6>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => navigate('/live_session_profile', { state: sessions.upcoming[0] })}
                            className="btn btn-petrol btn-default btn-squared w-100"
                          >
                            Join Session
                          </button>
                        </>
                      )} */}
                    </div>
                  </div>

                  <div className="col-lg-3 mb-25">
                    <div  className="card border-0 px-20 pb-20 project-task-list--event box_shadow1 mentee_card">
                      <div  className="card-header px-0 border-0">
                        <h6>My Mentoring </h6>
                        <p style={{cursor:'pointer'}} onClick={() => navigate("/mentoring_program")} className="color-green fw-500 mb-0 fs-14">
                          View All
                        </p>
                      </div>
                      {programs?.slice(0, 2)?.map((i) => (
                        <div style={{cursor:'pointer'}} onClick={() => navigate("/mentoring_program_progress",{state:i} )} className="media-body d-flex mb-15 mt-2 join_requests">
                        <img
                          src={authornav_img}
                          className="me-10 wh-40 rounded-circle bg-opacity-primary"
                        />
                        <div className="mt-1">
                          <h6 className="fw-500">{i?.program_model?.name}</h6>
                          <p className="fs-12 color-light mb-0">
                            Mentees: <span className="color-dark">2</span>
                          </p>
                        </div>
                      </div>
                      ))}
                      {/* <div className="media-body d-flex mb-15 mt-2 join_requests">
                        <img
                          src={authornav_img}
                          className="me-10 wh-40 rounded-circle bg-opacity-primary"
                        />
                        <div className="mt-1">
                          <h6 className="fw-500">High Potential...</h6>
                          <p className="fs-12 color-light mb-0">
                            Mentees: <span className="color-dark">2</span>
                          </p>
                        </div>
                      </div>

                      <div className="media-body d-flex join_requests">
                        <img
                          src={authornav_img}
                          className="me-10 wh-40 rounded-circle bg-opacity-primary"
                        />
                        <div className="mt-1">
                          <h6 className="fw-500">Leadership Sessions</h6>
                          <p className="fs-12 color-light mb-0">
                            Mentees: <span className="color-dark">15</span>
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-25">
                    <div className="card border-0 px-20 pb-20 project-task-list--event box_shadow1">
                      <div className="card-header px-0 border-0">
                        <h6>My Mentees</h6>
                        <p className="color-green fw-500 mb-0 fs-14">
                          View All
                        </p>
                      </div>
                      <div className="card-body p-0">
                        <div className="row">
                          {menteeList &&
                            menteeList.slice(0, 3).map((user) => (
                              <div
                              style={{cursor:'pointer'}}
                              onClick={() =>
                                navigate("/mentee_profile", {
                                  state: user,
                                })
                              }
                              className="col-lg-4 col-md-6 border-end">
                                <div className="text-center">
                                  <div className="account-profile-cards">
                                    <div className="ap-img d-flex justify-content-center">
                                      <img
                                        src={
                                          user.imageUrl == ""
                                            ? authornav_img
                                            : user.imageUrl
                                        }
                                        className="ap-img__main bg-opacity-primary  wh-80 rounded-circle mb-3"
                                      />
                                    </div>
                                    <div className="ap-nameAddress">
                                      <h6 className="ap-nameAddress__title">
                                        {user.name}
                                      </h6>
                                      <p className="ap-nameAddress__subTitle  fs-14 pt-1 m-0">
                                        {user.jobTitle}
                                      </p>
                                      <p className="ap-nameAddress__subTitle  fs-14 m-0 ">
                                        {user.mentee_position}
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
                                      <div style={{cursor:'pointer'}} onClick={() => goToTask(user)} className="box_shadow1 p-15 notifi">
                                        <div className="event-Wrapper">
                                          <div className="event-Wrapper__left">
                                            <div className="event-wrapper-item">
                                              <img
                                                src={user.icon}
                                                className="svg"
                                              />
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
                            {/* <div className="view_all text-center">
                              <a
                                href="#"
                                className="dropdown-wrapper__more color-green"
                              >
                                View All
                              </a>
                            </div> */}
                            <div style={{cursor:'pointer'}} onClick={() => navigate("/all_task", {state:tasks})} className="view_all text-center">
                                                        <h6 className="dropdown-wrapper__more color-green">View All</h6>
                                                    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6 col-md-12 mb-25">
                    <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                      <div className="card-header px-0 border-0">
                        <h6>Session Evolution</h6>
                      </div>
                      {/* <div className="card-body p-0"> */}
                        {/* <ResponsiveContainer width="400px" height="400px"> */}
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
                        {/* </ResponsiveContainer> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Side_bar
          onClick={toggle}
          notificationCount={notificationCount}
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
          <Modal.Title>Select Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="text-center">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setState([item.selection])
                customDateFilter()
                
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div> */}
          <center>
          <Calendar onChange={e => {
              onChange1(e)
              customDateFilter(e)
              }} value={value1} maxDate={new Date()} selectRange={true}/>
          </center>
        </Modal.Body>
      </Modal>

      <Modal show={showHello1} onHide={closeModal1}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Do you want to accept this session invitation?</h4>
                        <h4 class="text-capitalize fw-600 mb-25">Session Details: {new Date(payload.date).toDateString()} {new Date(payload.date).toLocaleTimeString()}</h4>

                        <div class="layout-button justify-content-center">
                            <button onClick={() => acceptSession(0)} type="button" className="btn btn-no btn-default btn-squared">Reject</button>
                            <button onClick={() => acceptSession(1)} type="button" className="btn btn-yes btn-default btn-squared">Accept</button>
                            {/* <button onClick={() => navigate('/edit_calender')} type="button" className="btn btn-yes btn-default btn-squared">Accept</button> */}
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
      </div>
    );
}

export default Home_Screen;
