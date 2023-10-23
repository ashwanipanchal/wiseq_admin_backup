import question_img from "../../img/questions.svg";
import learning from "../../img/learning.svg";
import learning_course from "../../img/learning_course.svg";
import learning_traning from "../../img/learning_traning.svg";
import learning_article from "../../img/learning_article.svg";
import learning_video from "../../img/learning_video.svg";
import learning_podcast from "../../img/learning_podcast.svg";
import team_img from "../../img/tm1.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from "react-google-charts";
import authornav_img from '../../img/user_pic.png';


const data = [
  { id: 1, 
    session_name: "Sessions Reports", 
    session_para: "A comprehensive report to know the overall details of mentoring sessions conducted on the platform. ", 
    generate_btn: "Generate Report" },
  {
    id: 2,
    session_name: "Competency Report For Mentees",
    session_para:
      "This report offers a clear evaluation of mentees' Top 10 Developmental Skill Needs and their Top 10 Proficiency Skills.",
    generate_btn: "View Report",
  },
  {
    id: 3,
    session_name: "Competency Report For Mentor",
    session_para:
      "This report offers a clear evaluation of Top 10 skills that mentors in your organization can mentor in.",
    generate_btn: "View Report",
  },
  { id: 4, 
    session_name: "Feedback and Ratings Report - Mentees", 
    session_para: "Know if your mentees’ are happy with their mentors, helping you design necessary interventions to bridge the gap if necessary.", 
    generate_btn: "View Report" },
  {
    id: 5,
    session_name: "Feedback and Ratings Report - Mentor",
    session_para:
      "Know if your mentors are happy with their mentees’, helping you design necessary interventions to bridge the gap if necessary.",
    generate_btn: "View Report",
  },
  {
    id: 6,
    session_name: "Mentoring Impact Report",
    session_para:
      "Know the measurable effects and significant progress of organizational skill development through mentoring.",
    generate_btn: "View Report",
  },
  {
    id: 7,
    session_name: "Adoption Report",
    session_para:
      "Assesses the overall adoption and utilization of the platform for mentoring and know the    Top 5 Skills nurtured through mentoring.",
    generate_btn: "View Report",
  },
  {
    id: 8,
    session_name: "Profile Completion Report",
    session_para:
      "A comprehensive report to know the overall profile completion status of all the mentors and mentees’",
    generate_btn: "View Report",
  },
];

const data1 = [
  {
    id: 1,
    mentoring_name: "Mentoring Health",
    mentoring_para:
      "How is it going? How is mentoring helping the company and your people to broaden their business networks, which can help you identify new opportunities, ideas and innovative solutions for your business.",
  },
];

const data2 = [{ id: 1, mentoring_name: "Key Activities Statistics" }];

export const options = {
  width: '100%',
  height: 400,
  colors: ["#EF4F5F"],
  hAxis: {
    title: "Months",
    minValue: 0,
    format: '0'
  },
  vAxis: {
    title: "No of Learnings",
    format: '0'
  },
  bar: { groupWidth: "10%" },
  legend: { position: "none" },
};
export const options1 = {
  width: '100%',
  height: 400,
  chartArea: { width: "80%" },
  colors: ["#f8a046"],
  hAxis: {
    // title: "Skills",
    minValue: 0,
    format: '0'
  },
  vAxis: {
    title: "No of Learnings Completed",
    format: '0'
  },
  bar: { groupWidth: "40%" },
  legend: { position: "none" },
};
export const options2 = {
  width: '100%',
  height: 400,
  chartArea: { width: "80%" },
  colors: ["#72B8BF"],
  hAxis: {
    // title: "Skills",
    minValue: 0,
    format: '0'
  },
  vAxis: {
    title: "No of Learnings Completed",
    format: '0'
  },
  bar: { groupWidth: "40%" },
  legend: { position: "none" },
};

const data3 = [
  {
    id: 1,
    mentoring_hours: "Learnings",
    mentoring_num: "2964",
    mentoring_month: "This Month:",
    mentoring_number: "300",
  },
  {
    id: 2,
    mentoring_hours: "Courses",
    mentoring_num: "942",
    mentoring_month: "This Month:",
    mentoring_number: "81",
  },
  {
    id: 3,
    mentoring_hours: "Trainings",
    mentoring_num: "237",
    mentoring_month: "This Month:",
    mentoring_number: "16",
  },
  {
    id: 4,
    mentoring_hours: "Articles",
    mentoring_num: "510",
    mentoring_month: "This Month:",
    mentoring_number: "120",
  },
  {
    id: 5,
    mentoring_hours: "Videos",
    mentoring_num: "298",
    mentoring_month: "This Month:",
    mentoring_number: "73",
  },
  {
    id: 6,
    mentoring_hours: "Podcasts",
    mentoring_num: "345",
    mentoring_month: "This Month:",
    mentoring_number: "82",
  },
];

const data4 = [
  {
    id: 1,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
    mentee_completed: "Completed:",
    mentee_number: "145",
  },
  {
    id: 2,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
    mentee_completed: "Completed:",
    mentee_number: "145",
  },
  {
    id: 3,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
    mentee_completed: "Completed:",
    mentee_number: "145",
  },
  {
    id: 4,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
    mentee_completed: "Completed:",
    mentee_number: "145",
  },
  {
    id: 5,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
    mentee_completed: "Completed:",
    mentee_number: "145",
  },
  {
    id: 6,
    mentee_name: "Mira Dorwart",
    mentee_manager: "Senior Manager",
    mentee_position: "HRM",
    mentee_completed: "Completed:",
    mentee_number: "145",
  },
];


function Progress_Report() {
  const navigate = useNavigate()
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [learningTopData,setLearningTopData] = useState([])
  const [learningBottomData,setLearningBottomData] = useState([])
  const [topLearnerList,setTopLearnerList] = useState([])
  const [evaluationGraph,setEvaluationGraph] = useState([])
  const [learningStatsCount, setLearningStatsCount] = useState([
    { id: 1, mentoring_hours: "Learnings", mentoring_num: "2964", mentoring_month: "This Month:", mentoring_number: "300", image: learning },
    { id: 2, mentoring_hours: "Courses", mentoring_num: "942", mentoring_month: "This Month:", mentoring_number: "81", image: learning_course },
    { id: 3, mentoring_hours: "Case-Study", mentoring_num: "237", mentoring_month: "This Month:", mentoring_number: "16", image: learning_traning },
    { id: 4, mentoring_hours: "Articles", mentoring_num: "510", mentoring_month: "This Month:", mentoring_number: "120", image: learning_article },
    { id: 5, mentoring_hours: "Videos", mentoring_num: "298", mentoring_month: "This Month:", mentoring_number: "73", image: learning_video },
    { id: 6, mentoring_hours: "Podcasts", mentoring_num: "345", mentoring_month: "This Month:", mentoring_number: "82", image: learning_podcast },
])
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };
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

    window.addEventListener("resize", handleWindowResize);
    generateLearningReport()
    generateLearningEvalutionReport()
    topLearner()
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const generateSessionReport = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    const res = await fetch(`https://api.wiseq.co/api/session/report`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
          const response = await res.blob()
            console.log(response)
            const url = window.URL.createObjectURL(
              new Blob([response]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              `FileName.xls`,
            );
        
            // Append to html link element page
            document.body.appendChild(link);
        
            // Start download
            link.click();
            const {success, data} = response 
  };

  const generateLearningReportFile = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;   
    const res = await fetch(`https://api.wiseq.co/api/learnings/reports-download`,{
        method:'GET',
        headers:{
          "Accept": "application/json",
        //   "Content-Type": "application/json",
          "Authorization": btoken,
        },
      })
      console.log(res)
      const response = await res.blob()
        console.log(response)
        // return
        const url = window.URL.createObjectURL(
          new Blob([response]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `LearningReport.xls`,
        );
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
        const {success, data} = response        
}

const generateLearningEvalutionReport = async() => {
  const token = await localStorage.getItem("token")
  const btoken = `Bearer ${token}`;   
  const res = await fetch(`https://api.wiseq.co/api/learnings/learning-evolution`,{
      method:'GET',
      headers:{
        "Accept": "application/json",
      //   "Content-Type": "application/json",
        "Authorization": btoken,
      },
    })
const response = await res.json()
console.log(response)
let temp = [["Month", "No of Learning"]]
for (const key in response.data) {
  let  dd = new Date(key)
  let name = dd.toString().split(" ")[1]
  let value = response.data[key]
  console.log(name)
  console.log(value)
  temp.push([name, value])
}
console.log(temp)
// return
setEvaluationGraph(temp)

}

  const topLearner = async () => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;
    const res = await fetch(`https://api.wiseq.co/api/mentee-learnings/top-learners`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        //   "Content-Type": "application/json",
        "Authorization": btoken,
      },
    })
    const response = await res.json()
    console.log(response)
    if(response.success){
      setTopLearnerList(response.data)
    }
    // let temp = []
    // for (const key in response.data) {
    //   let dd = new Date(key)
    //   let name = dd.toString().split(" ")[1]
    //   let value = response.data[key]
    //   temp.push({ name, value })
    // }
    // setEvaluationGraph(temp)

  }

const generateLearningReport = async() => {
  const token = await localStorage.getItem("token")
  const btoken = `Bearer ${token}`;   
  const res = await fetch(`https://api.wiseq.co/api/learnings/reports-stats`,{
      method:'GET',
      headers:{
        "Accept": "application/json",
      //   "Content-Type": "application/json",
        "Authorization": btoken,
      },
    })
const response = await res.json()
console.log(response.data?.learningSkillStats?.topSkills)
// setLearningStatsCount(response.data.learningStatsCounts)
setLearningStatsCount([
  { id: 1, mentoring_hours: "Learnings", mentoring_num: response.data?.learningStatsCounts?.totalLearnings?.totalCount, mentoring_month: "This Month:", mentoring_number: response.data?.learningStatsCounts?.totalLearnings?.currentMonth, image: learning },
  { id: 2, mentoring_hours: "Courses", mentoring_num: response.data?.learningStatsCounts?.course?.totalCount, mentoring_month: "This Month:", mentoring_number: response.data?.learningStatsCounts?.course?.currentMonth, image: learning_course },
  { id: 3, mentoring_hours: "Case-Study", mentoring_num: response.data?.learningStatsCounts?.["case-study"]?.totalCount, mentoring_month: "This Month:", mentoring_number: response.data?.learningStatsCounts?.["case-study"]?.currentMonth, image: learning_traning },
  { id: 4, mentoring_hours: "Articles", mentoring_num: response.data?.learningStatsCounts?.article?.totalCount, mentoring_month: "This Month:", mentoring_number: response.data?.learningStatsCounts?.article?.currentMonth, image: learning_article },
  { id: 5, mentoring_hours: "Videos", mentoring_num: response.data?.learningStatsCounts?.video?.totalCount, mentoring_month: "This Month:", mentoring_number: response.data?.learningStatsCounts?.video?.currentMonth, image: learning_video },
  { id: 6, mentoring_hours: "Podcasts", mentoring_num: response.data?.learningStatsCounts?.podcast?.totalCount, mentoring_month: "This Month:", mentoring_number: response.data?.learningStatsCounts?.podcast?.currentMonth, image: learning_podcast },
])

let temp = [["Skill", "No of Learning Completed"]]
let temp1 = [["Skill", "No of Learning Completed"]]
response.data?.learningSkillStats?.topSkills.map((i) => {
  console.log(i.skills)
  console.log(i.learningCompleted)
  temp.push([i.skills, i.learningCompleted])
})
console.log(temp)
setLearningTopData(temp)

response.data?.learningSkillStats?.bottomSkills.map((i) => {
  console.log(i.skills)
  console.log(i.learningCompleted)
  temp1.push([i.skills, i.learningCompleted])
})
console.log(temp1)
setLearningBottomData(temp1)


// setLearningTopData(response.data.learningSkillStats?.topSkills)
// setLearningBottomData(response.data.learningSkillStats?.bottomSkills)
 
}

  const onPressHandler = input => {
    console.log(input)
    switch (input) {
        case 1:
              generateSessionReport()
            break;
        case 2:
              navigate("/competency_report_for_mentees")
            break;
        case 3:
              navigate("/competency_report_for_mentors")
            break;
        case 4:
              navigate("/feedback_and_ratings_report_mentees")
            break;
        case 6:
              navigate("/mentoring_impact_report")
            break;
        case 7:
              navigate("/adoptation_report")
            break;
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
                <div className="breadcrumb-main user-member justify-content-sm-between">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Progress Report
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card card-default card-md">
                  <div className="">
                    <div className="tab-wrapper">
                      <div className="dm-tab tab-horizontal">
                        <Tabs>
                          <TabList className="nav nav-tabs vertical-tabs">
                            <Tab>General</Tab>
                            <Tab>Learnings</Tab>
                            <Tab>Assessments</Tab>
                            <Tab>Impact</Tab>
                          </TabList>

                          <TabPanel className="tab-content">
                            <div className="row">
                              {/* <div className="col-lg-4 col-md-12 col-sm-12 mb-25">
                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                  <div className="card-header border-0">
                                    <h6 className="session_report">
                                      Sessions Reports
                                    </h6>
                                  </div>

                                  <div className="card-body pb-15 mt-n15 pt-0">
                                    <div className="card-timeline-body">
                                      <div className="card-timeline-body__left">
                                        <div className="card-timeline-body__title">
                                          <p>
                                            Know the overall status and impact
                                            of mentoring and training sessions
                                            conducted in the platform for your
                                            company.
                                          </p>
                                        </div>
                                      </div>

                                      <div className="mt-10">
                                        <button
                                          onClick={() =>
                                            generateSessionReport()
                                          }
                                          type="button"
                                          className="btn btn-default btn-squared btn-primary w-100"
                                        >
                                          Generate Report
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              {data.map((user) => (

                                                                <div className="col-lg-4 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">{user.session_name}</h6>
                                                                        </div>

                                                                        <div className="card-body pb-15 mt-n15 pt-0">
                                                                            <div className="card-timeline-body">
                                                                                <div className="card-timeline-body__left">
                                                                                    <div className="card-timeline-body__title">
                                                                                        <p>{user.session_para}</p>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="mt-10">
                                                                                    <button onClick={() => onPressHandler(user.id)} type="button" className="btn btn-default btn-squared btn-primary w-100">{user.generate_btn}</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            ))}

                              {/* {data1.map((user) => (

                                                                <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">{user.mentoring_name}</h6>
                                                                        </div>

                                                                        <div className="card-body pb-15 mt-n15 pt-0">
                                                                            <div className="card-timeline-body">
                                                                                <div className="card-timeline-body__left">
                                                                                    <div className="card-timeline-body__title">
                                                                                        <p>{user.mentoring_para}</p>
                                                                                        <div className="row">
                                                                                            <div className="col-md-3">
                                                                                                <h6 className="fs-14">Connections <img src={question_img} className="svg_question" /></h6>
                                                                                            </div>

                                                                                            <div className="col-md-9">
                                                                                                <ProgressBar className="progress_orange" variant="" now={60} />
                                                                                                <p className="mt-10">6 of 10 points <span className="good">Very Good</span></p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-3">
                                                                                                <h6 className="fs-14">Engagement <img src={question_img} className="svg_question" /></h6>
                                                                                            </div>

                                                                                            <div className="col-md-9">
                                                                                                <ProgressBar className="progress_blue" variant="" now={60} />
                                                                                                <p className="mt-10">5 of 10 points <span className="good">Good</span></p>

                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-3">
                                                                                                <h6 className="fs-14">Content <img src={question_img} className="svg_question" /></h6>
                                                                                            </div>

                                                                                            <div className="col-md-9">
                                                                                                <ProgressBar className="progress_blue" variant="" now={60} />
                                                                                                <p className="mt-10">9 of 10 points <span className="good">Outstanding</span></p>

                                                                                            </div>
                                                                                        </div>


                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            ))}

                                                            {data2.map((user) => (

                                                                <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">{user.mentoring_name}</h6>
                                                                        </div>

                                                                        <div className="card-body">
                                                                            <div className="card-timeline-body">
                                                                                <div className="card-timeline-body__left">
                                                                                    <div className="card-timeline-body__title">

                                                                                        <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                                            <div className="">
                                                                                                <p className="color-dark fs-16 fw-300 align-center mb-0">Adoption Rate</p>
                                                                                            </div>

                                                                                            <div className="">
                                                                                                <p className="color-orange fs-14 fw-300 align-center mb-0">View Details</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                                            <div className="">
                                                                                                <p className="color-dark fs-16 fw-300 align-center mb-0">Quality of Sessions</p>
                                                                                            </div>

                                                                                            <div className="">
                                                                                                <p className="color-orange fs-14 fw-300 align-center mb-0">View Details</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                                            <div className="">
                                                                                                <p className="color-dark fs-16 fw-300 align-center mb-0">Growth Score Evolution</p>
                                                                                            </div>

                                                                                            <div className="">
                                                                                                <p className="color-orange fs-14 fw-300 align-center mb-0">View Details</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                                            <div className="">
                                                                                                <p className="color-dark fs-16 fw-300 align-center mb-0">Impact Score Evolution</p>
                                                                                            </div>

                                                                                            <div className="">
                                                                                                <p className="color-orange fs-14 fw-300 align-center mb-0">View Details</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="d-flex flex-wrap justify-content-between mb-15">
                                                                                            <div className="">
                                                                                                <p className="color-dark fs-16 fw-300 align-center mb-0">Open Mentoring Vs Mentoring Programs</p>
                                                                                            </div>

                                                                                            <div className="">
                                                                                                <p className="color-orange fs-14 fw-300 align-center mb-0">View Details</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="mt-10">
                                                                                            <button type="button" className="btn btn-default btn-squared btn-primary w-100">Generate Report</button>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            ))} */}
                            </div>
                          </TabPanel>

                          <TabPanel>
                            {/* <div className="col-lg-12">
                                                            <div className="row">

                                                                {data3.map((user) => (
                                                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-25">
                                                                        <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                                                                            <div className="overview-content w-100">
                                                                                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                                                    <div className="ap-po-details__titlebar">
                                                                                        <p>{user.mentoring_hours}</p>
                                                                                        <h2>{user.mentoring_num}</h2>
                                                                                        <p className="fs-11">{user.mentoring_month} <span className="color-dark fs-12 fw-400">{user.mentoring_number}</span></p>
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

                                                                ))}


                                                                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Learning Evolution Graph</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Top 10 Skills People are Learning</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Bottom 10 Skills People are Resistant to</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-12 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Top 10 Skills Gaps Identified</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="col-lg-12 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 px-25 pb-20 project-task-list--event box_shadow1">
                                                                        <div className="card-header px-0 border-0">
                                                                            <h6>Top Learners</h6>
                                                                            <p className="color-orange fw-300 mb-0 fs-14">View All</p>
                                                                        </div>
                                                                        <div className="card-body p-0">
                                                                            <div className="row">

                                                                                {data4.map((user) => (
                                                                                    <div className="col-lg-2 col-md-6 col-sm-6 col-md-2 border-end">
                                                                                        <div className="text-center">
                                                                                            <div className="account-profile-cards">
                                                                                                <div className="ap-img d-flex justify-content-center">
                                                                                                    <img src={team_img} className="ap-img__main bg-opacity-primary  wh-80 rounded-circle mb-3" />
                                                                                                </div>
                                                                                                <div className="ap-nameAddress">
                                                                                                    <h6 className="ap-nameAddress__title">{user.mentee_name}</h6>
                                                                                                    <p className="ap-nameAddress__subTitle  fs-14 pt-1 m-0">{user.mentee_manager}</p>
                                                                                                    <p className="ap-nameAddress__subTitle  fs-14 m-0">{user.mentee_position}</p>
                                                                                                    <p class="ap-nameAddress__subTitle  fs-14 m-0">{user.mentee_completed}  <span class="good ms-1">{user.mentee_number}</span></p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                ))}


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-12 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Generate Reports</h6>
                                                                        </div>

                                                                        <div className="card-body pb-15 mt-n15 pt-0">
                                                                            <div className="card-timeline-body">
                                                                                <div className="card-timeline-body__left">
                                                                                    <div className="row">
                                                                                        <div className="col-lg-8 col-md-12 col-sm-12">
                                                                                            <div className="card-timeline-body__title">
                                                                                                <p className="generate_report fw-300">You can generate more comprehensive and detailed reports by selecting custom data points like function wise, role wise, skills wise, program length wise and so on, to evaluate efficiency and effectiveness.</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                                                                            <div className="mt-30">
                                                                                                <button type="button" className="btn btn-default btn-squared btn-primary w-100">Generate More Reports</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div> */}
                            
                            <div className="col-lg-12">
                                                            <div className="row">

                                                                {learningStatsCount.map((user) => (
                                                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-25">
                                                                        <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                                                                            <div className="overview-content w-100">
                                                                                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                                                    <div className="ap-po-details__titlebar">
                                                                                        <p>{user.mentoring_hours}</p>
                                                                                        <h2>{user.mentoring_num}</h2>
                                                                                        <p className="fs-11">{user.mentoring_month} <span className="color-dark fs-12 fw-400">{user.mentoring_number}</span></p>
                                                                                    </div>
                                                                                    <div className="ap-po-details__icon-area">
                                                                                        <div className="svg-icon">
                                                                                            <img src={user.image} className="svg" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                ))}


                                                                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Learning Evolution Graph</h6>
                                                                        </div>
                                                                        {/* <BarChart
                                                                          width={1000}
                                                                          height={300}
                                                                          data={evaluationGraph}
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
                                                                          
                                                                          <Bar dataKey="value" fill="#EF4F5F" barSize={30} />
                                                                        </BarChart> */}
                                                                        <Chart
                                                                            chartType="ColumnChart"
                                                                            colo
                                                                            width="100%"
                                                                            height="400px"
                                                                            data={evaluationGraph}
                                                                            options={options}
                                                                            />
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Top 5 Skills People Are Learning (Completed)</h6>
                                                                        </div>
                                                                        {/* <BarChart
                                                                          width={500}
                                                                          height={300}
                                                                          data={learningTopData}
                                                                          margin={{
                                                                            top: 5,
                                                                            right: 10,
                                                                            left: 20,
                                                                            bottom: 5,
                                                                          }}
                                                                        >
                                                                          <CartesianGrid strokeDasharray="3 3" />
                                                                          <XAxis dataKey="skills" />
                                                                          <YAxis allowDecimals={false}/>
                                                                          <Tooltip />
                                                                          <Bar dataKey="learningCompleted" fill="#F8A046" barSize={20} />
                                                                        </BarChart> */}
                                                                        <Chart
                                                                            chartType="ColumnChart"
                                                                            colo
                                                                            width="100%"
                                                                            height="400px"
                                                                            data={learningTopData}
                                                                            options={options1}
                                                                            />
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Bottom 5 Skills People Are Learning (Completed)</h6>
                                                                        </div>
                                                                        {/* <BarChart
                                                                          width={500}
                                                                          height={300}
                                                                          data={learningBottomData}
                                                                          margin={{
                                                                            top: 5,
                                                                            right: 10,
                                                                            left: 20,
                                                                            bottom: 5,
                                                                          }}
                                                                        >
                                                                          <CartesianGrid strokeDasharray="3 3" />
                                                                          <XAxis dataKey="skills" />
                                                                          <YAxis allowDecimals={false}/>
                                                                          <Tooltip />
                                                                          <Bar dataKey="learningCompleted" fill="#72B8BF" barSize={20} />
                                                                        </BarChart> */}
                                                                        <Chart
                                                                            chartType="ColumnChart"
                                                                            colo
                                                                            width="100%"
                                                                            height="400px"
                                                                            data={learningBottomData}
                                                                            options={options2}
                                                                            />
                                                                    </div>
                                                                </div>

                                                                {/* <div className="col-lg-12 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Top 10 Skills Gaps Identified</h6>
                                                                        </div>
                                                                    </div>
                                                                </div> */}


                                                                <div className="col-lg-12 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 px-25 pb-20 project-task-list--event box_shadow1">
                                                                        <div className="card-header px-0 border-0">
                                                                            <h6>Top Learners</h6>
                                                                            <p className="color-orange fw-300 mb-0 fs-14">View All</p>
                                                                        </div>
                                                                        <div className="card-body p-0">
                                                                            <div className="row">

                                                                                {topLearnerList && topLearnerList.map((user) => (
                                                                                    <div className="col-lg-2 col-md-6 col-sm-6 col-md-2 border-end">
                                                                                        <div className="text-center">
                                                                                            <div className="account-profile-cards">
                                                                                                <div className="ap-img d-flex justify-content-center">
                                                                                                    <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="ap-img__main bg-opacity-primary  wh-80 rounded-circle mb-3" />
                                                                                                </div>
                                                                                                <div className="ap-nameAddress">
                                                                                                    <h6 className="ap-nameAddress__title">{user.name}</h6>
                                                                                                    <p className="ap-nameAddress__subTitle  fs-14 pt-1 m-0">{user.jobTitle}</p>
                                                                                                    {/* <p className="ap-nameAddress__subTitle  fs-14 m-0">{user.mentee_position}</p> */}
                                                                                                    <p class="ap-nameAddress__subTitle  fs-14 m-0">Completed :  <span class="good ms-1">{user.completedLearnings}</span></p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                ))}


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-12 col-md-12 col-sm-12 mb-25">
                                                                    <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                        <div className="card-header border-0">
                                                                            <h6 className="session_report">Detailed Learnings Report</h6>
                                                                        </div>

                                                                        <div className="card-body pb-15 mt-n15 pt-0">
                                                                            <div className="card-timeline-body">
                                                                                <div className="card-timeline-body__left">
                                                                                    <div className="row">
                                                                                        <div className="col-lg-8 col-md-12 col-sm-12">
                                                                                            <div className="card-timeline-body__title">
                                                                                                <p className="generate_report fw-300">Generate more comprehensive and detailed report with consolidated data that would help you to evaluate and identifies key trends, enabling informed decision-making for training administration.</p>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                                                                            <div className="mt-30">
                                                                                                <button onClick={() => generateLearningReportFile()} type="button" className="btn btn-default btn-squared btn-primary w-100">Generate More Reports</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                          </TabPanel>

                          <TabPanel className="tab-content">
                            {/* <div className="row">
                                                            <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                                                    <div className="overview-content w-100">
                                                                        <h5 className="mb-10">Assessments</h5>
                                                                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                                            <div className="ap-po-details__titlebar">
                                                                                <p>Total</p>
                                                                                <h5>166</h5>
                                                                            </div>

                                                                            <div className="ap-po-details__titlebar">
                                                                                <p>In-Progress</p>
                                                                                <h5>30</h5>
                                                                            </div>

                                                                            <div className="ap-po-details__titlebar">
                                                                                <p>To Start</p>
                                                                                <h5>10</h5>
                                                                            </div>

                                                                            <div className="ap-po-details__titlebar">
                                                                                <p>Completed</p>
                                                                                <h5>126</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-sm-12 col-md-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Assessment Evolution</h6>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-sm-12 col-md-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Most Popular Assessments people are taking</h6>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Assessment Wise Results</h6>
                                                                    </div>

                                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                                        <div className="card-timeline-body">
                                                                            <div className="card-timeline-body__left">
                                                                                <div className="row">
                                                                                    <div className="col-lg-8 col-sm-12 col-md-12">
                                                                                        <div className="card-timeline-body__title">
                                                                                            <p className="generate_report fw-300">You can generate assessment specific detailed reports for comprehensive analysis of the results...</p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-lg-4 col-md-12 col-sm-12">

                                                                                        <button type="button" className="btn btn-default btn-squared btn-primary w-100">Check Assessment Wise Results</button>

                                                                                    </div>
                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div className="col-lg-12">
                              <div className="row">
                                <div
                                  style={{
                                    backgroundColor: "#feeee6",
                                    padding: "50px",
                                    borderRadius: "10px",
                                  }}
                                  className="col-lg-12 col-sm-12 col-md-12 mb-25"
                                >
                                  <div>
                                    <h3 style={{ textAlign: "center" }}>
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>

                          <TabPanel className="tab-content">
                            {/* <div className="row">

                                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Employee Growth/Performance</h6>
                                                                    </div>

                                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                                        <div className="card-timeline-body">
                                                                            <div className="card-timeline-body__left">
                                                                                <div className="card-timeline-body__title">
                                                                                    <p>How the employees are developing their key business and core skills meeting their business goals.</p>

                                                                                    <ProgressBar className="progress_danger" variant="" now={40} />

                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p className="mt-10 mb-0">Benchmark: <span className="goods">45</span></p>
                                                                                        <p className="mt-10 mb-0 percen">40 <span className="percentage">/ 100</span></p>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Work-life Integration</h6>
                                                                    </div>

                                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                                        <div className="card-timeline-body">
                                                                            <div className="card-timeline-body__left">
                                                                                <div className="card-timeline-body__title">
                                                                                    <p>How well-being and lifestyle coaching is aiding employees in balancing personal and professional demands.</p>

                                                                                    <ProgressBar className="progress_danger" variant="" now={40} />

                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p className="mt-10 mb-0">Benchmark: <span className="goods">45</span></p>
                                                                                        <p className="mt-10 mb-0 percen">40 <span className="percentage">/ 100</span></p>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Team Feedback</h6>
                                                                    </div>

                                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                                        <div className="card-timeline-body">
                                                                            <div className="card-timeline-body__left">
                                                                                <div className="card-timeline-body__title">
                                                                                    <p>Are the various programs run on the platform helping employees feel more connected and engaged.</p>

                                                                                    <ProgressBar className="progress_blue" variant="" now={93} />

                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p className="mt-10 mb-0">Benchmark: <span className="goods">66</span></p>
                                                                                        <p className="mt-10 mb-0 percen">93 <span className="percentage">/ 100</span></p>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Program Satisfaction</h6>
                                                                    </div>

                                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                                        <div className="card-timeline-body">
                                                                            <div className="card-timeline-body__left">
                                                                                <div className="card-timeline-body__title">
                                                                                    <p>How satisfied are employees with various development opportunities presented through the platform.</p>

                                                                                    <ProgressBar className="progress_blue" variant="" now={87} />

                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p className="mt-10 mb-0">Benchmark: <span className="goods">53</span></p>
                                                                                        <p className="mt-10 mb-0 percen">87 <span className="percentage">/ 100</span></p>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Skill Development Impact</h6>
                                                                    </div>

                                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                                        <div className="card-timeline-body">
                                                                            <div className="card-timeline-body__left">
                                                                                <div className="card-timeline-body__title">
                                                                                    <p>How mentoring is helping employees be more productive.</p>

                                                                                    <ProgressBar className="progress_blue" variant="" now={66} />

                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p className="mt-10 mb-0">Benchmark: <span className="goods">40</span></p>
                                                                                        <p className="mt-10 mb-0 percen">66 <span className="percentage">/ 100</span></p>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-25">
                                                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                                                    <div className="card-header border-0">
                                                                        <h6 className="session_report">Platform Happiness</h6>
                                                                    </div>

                                                                    <div className="card-body pb-15 mt-n15 pt-0">
                                                                        <div className="card-timeline-body">
                                                                            <div className="card-timeline-body__left">
                                                                                <div className="card-timeline-body__title">
                                                                                    <p>The extent to which the platform helps employees find  purpose, align to organisations vision and empowers them in doing and feeling their best</p>

                                                                                    <ProgressBar className="progress_orange" variant="" now={65} />

                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p className="mt-10 mb-0">Benchmark: <span className="goods">55</span></p>
                                                                                        <p className="mt-10 mb-0 percen">65 <span className="percentage">/ 100</span></p>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                            <div className="col-lg-12">
                              <div className="row">
                                <div
                                  style={{
                                    backgroundColor: "#feeee6",
                                    padding: "50px",
                                    borderRadius: "10px",
                                  }}
                                  className="col-lg-12 col-sm-12 col-md-12 mb-25"
                                >
                                  <div>
                                    <h3 style={{ textAlign: "center" }}>
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                        </Tabs>
                      </div>
                    </div>
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

export default Progress_Report;
