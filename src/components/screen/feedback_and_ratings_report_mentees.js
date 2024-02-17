import React from "react";
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Chart } from "react-google-charts";
import { BASE_URL, BASE_URL_APPLSURE } from "../../services/Config";
import One from '../../img/smily_fade/1.png';
import Two from '../../img/smily_fade/2.png';
import Three from '../../img/smily_fade/3.png';
import Four from '../../img/smily_fade/4.png';
import Five from '../../img/smily_full/1.png';
import Six from '../../img/smily_full/2.png';
import Seven from '../../img/smily_full/3.png';
import Eight from '../../img/smily_full/4.png';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-bootstrap/Modal";
import moment from "moment/moment";

export const data = [
  [
    "Element",
    "Density",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["1 Star", 40, "#62B2FD", null],
  ["2 Star", 60, "#9BDFC4", null],
  ["3 Star", 50, "#F99BAB", null],
  ["4 Star", 30, "color: #FFB44F", null],
  ["5 Star", 40, "color: #9F97F7", null],
];
// export const options = {
//   width: 550,
//   height: 400,
//   bar: { groupWidth: "80%" },
//   legend: { position: "none" },
// };

export const options = {
  width: 550,
  height: 400,
  hAxis: {
    title: "Rating",
    minValue: 0,
    format: '0'
  },
  vAxis: {
    title: "% of Mentees",
    minValue: '0',
    viewWindowMode: "explicit",
    viewWindow:{ min: 0 },
    format: '0'
  },
  bar: { groupWidth: "80%" },
  legend: { position: "none" },
};

function Feedback_And_Ratings_Report_Mentees() {
  const percentage = 90;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [overAll , setOverAll] = useState("")
  const [quesOne, setQuesOne] = useState([]);
  const [quesTwo, setQuesTwo] = useState([]);
  const [quesThree, setQuesThree] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [value1, onChange1] = useState(new Date());
  const [fullInfo, setFullInfo] = useState("");
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const [showHello, setShowHello] = useState(false);
  const closeModal = () => setShowHello(false);
  const showModal = () => setShowHello(true);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };
  useEffect(() => {
    // getStats();
    getFullDetail()
  }, []);

  const getFullDetail = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}organisations/4324`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    console.log(response);
    getStats(response.data.id)
    setFullInfo(response.data.id);
  };

  const getStats = async (id) => {
    const btoken = `Bearer ${token}`;
    const body = {
      condition: "all", //lastmonth//lastweek//all/daterange,
      "organization_id":id
      // "month":"10",
      // "from":"2023-10-10",
      // "to":"2023-10-20"
    };
    const res = await fetch(
      `${BASE_URL_APPLSURE}feedback-and-rating-report-mentee`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
        body: JSON.stringify(body),
      }
    );
    const response = await res.json();
    console.log("stats", response);
    if (response.status) {
      setQuesOne([
        [
          "Element",
          "Percentage",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["1 Star", response.questone[1], "#62B2FD", response.questonetakenby[1]],
        ["2 Star", response.questone[2], "#9BDFC4", response.questonetakenby[2]],
        ["3 Star", response.questone[3], "#F99BAB", response.questonetakenby[3]],
        ["4 Star", response.questone[4], "color: #FFB44F", response.questonetakenby[4]],
        ["5 Star", response.questone[5], "color: #9F97F7", response.questonetakenby[5]],
      ]);
      setQuesTwo([
        [
          "Element",
          "Percentage",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["1 Star", response.questtwo[1], "#62B2FD", response.questtwotakenby[1]],
        ["2 Star", response.questtwo[2], "#9BDFC4", response.questtwotakenby[2]],
        ["3 Star", response.questtwo[3], "#F99BAB", response.questtwotakenby[3]],
        ["4 Star", response.questtwo[4], "color: #FFB44F", response.questtwotakenby[4]],
        ["5 Star", response.questtwo[5], "color: #9F97F7", response.questtwotakenby[5]],
      ]);
      setQuesThree([
        [
          "Element",
          "Percentage",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["1 Star", response.questthree[1], "#62B2FD", response.questthreetakenby[1]],
        ["2 Star", response.questthree[2], "#9BDFC4", response.questthreetakenby[2]],
        ["3 Star", response.questthree[3], "#F99BAB", response.questthreetakenby[3]],
        ["4 Star", response.questthree[4], "color: #FFB44F", response.questthreetakenby[4]],
        ["5 Star", response.questthree[5], "color: #9F97F7", response.questthreetakenby[5]],
      ]);
      setOverAll(response.overall)
    }
    // setCreatedLearning(response.data)
  };

  const filterStats = async (i) => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    let url = "";
    if (i == "Year to Date") {
      const btoken = `Bearer ${token}`;
      const body = {
        condition: "all", //lastmonth//lastweek//all/daterange,
        "organization_id":fullInfo
      };
      const res = await fetch(
        `${BASE_URL_APPLSURE}feedback-and-rating-report-mentee`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: btoken,
          },
          body: JSON.stringify(body),
        }
      );
      const response = await res.json();
      console.log("getReportofDevSkill", response);
      if (response.status) {
        setQuesOne([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questone[1], "#62B2FD", response.questonetakenby[1]],
          ["2 Star", response.questone[2], "#9BDFC4", response.questonetakenby[2]],
          ["3 Star", response.questone[3], "#F99BAB", response.questonetakenby[3]],
          ["4 Star", response.questone[4], "color: #FFB44F", response.questonetakenby[4]],
          ["5 Star", response.questone[5], "color: #9F97F7", response.questonetakenby[5]],
        ]);
        setQuesTwo([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questtwo[1], "#62B2FD", response.questtwotakenby[1]],
          ["2 Star", response.questtwo[2], "#9BDFC4", response.questtwotakenby[2]],
          ["3 Star", response.questtwo[3], "#F99BAB", response.questtwotakenby[3]],
          ["4 Star", response.questtwo[4], "color: #FFB44F", response.questtwotakenby[4]],
          ["5 Star", response.questtwo[5], "color: #9F97F7", response.questtwotakenby[5]],
        ]);
        setQuesThree([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questthree[1], "#62B2FD", response.questthreetakenby[1]],
          ["2 Star", response.questthree[2], "#9BDFC4", response.questthreetakenby[2]],
          ["3 Star", response.questthree[3], "#F99BAB", response.questthreetakenby[3]],
          ["4 Star", response.questthree[4], "color: #FFB44F", response.questthreetakenby[4]],
          ["5 Star", response.questthree[5], "color: #9F97F7", response.questthreetakenby[5]],
        ]);
        setOverAll(response.overall)
      }
    }
    if (i == "Month to Date") {
      const btoken = `Bearer ${token}`;
      const body = {
        condition: "lastmonth", //lastmonth//lastweek//all/daterange,
        "organization_id":fullInfo,
        month: `${new Date().getMonth() + 1}`,
      };
      const res = await fetch(
        `${BASE_URL_APPLSURE}feedback-and-rating-report-mentee`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: btoken,
          },
          body: JSON.stringify(body),
        }
      );
      const response = await res.json();
      console.log("getReportofDevSkill", response);
      if (response.status) {
        setQuesOne([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questone[1], "#62B2FD", response.questonetakenby[1]],
          ["2 Star", response.questone[2], "#9BDFC4", response.questonetakenby[2]],
          ["3 Star", response.questone[3], "#F99BAB", response.questonetakenby[3]],
          ["4 Star", response.questone[4], "color: #FFB44F", response.questonetakenby[4]],
          ["5 Star", response.questone[5], "color: #9F97F7", response.questonetakenby[5]],
        ]);
        setQuesTwo([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questtwo[1], "#62B2FD", response.questtwotakenby[1]],
          ["2 Star", response.questtwo[2], "#9BDFC4", response.questtwotakenby[2]],
          ["3 Star", response.questtwo[3], "#F99BAB", response.questtwotakenby[3]],
          ["4 Star", response.questtwo[4], "color: #FFB44F", response.questtwotakenby[4]],
          ["5 Star", response.questtwo[5], "color: #9F97F7", response.questtwotakenby[5]],
        ]);
        setQuesThree([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questthree[1], "#62B2FD", response.questthreetakenby[1]],
          ["2 Star", response.questthree[2], "#9BDFC4", response.questthreetakenby[2]],
          ["3 Star", response.questthree[3], "#F99BAB", response.questthreetakenby[3]],
          ["4 Star", response.questthree[4], "color: #FFB44F", response.questthreetakenby[4]],
          ["5 Star", response.questthree[5], "color: #9F97F7", response.questthreetakenby[5]],
        ]);
        setOverAll(response.overall)
      }
    }

    if (i == "Weekly") {
      const btoken = `Bearer ${token}`;
      const body = {
        condition: "lastweek", //lastmonth//lastweek//all/daterange,
        "organization_id":fullInfo
      };
      const res = await fetch(
        `${BASE_URL_APPLSURE}feedback-and-rating-report-mentee`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: btoken,
          },
          body: JSON.stringify(body),
        }
      );
      const response = await res.json();
      console.log("getReportofDevSkill", response);
      if (response.status) {
        setQuesOne([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questone[1], "#62B2FD", response.questonetakenby[1]],
          ["2 Star", response.questone[2], "#9BDFC4", response.questonetakenby[2]],
          ["3 Star", response.questone[3], "#F99BAB", response.questonetakenby[3]],
          ["4 Star", response.questone[4], "color: #FFB44F", response.questonetakenby[4]],
          ["5 Star", response.questone[5], "color: #9F97F7", response.questonetakenby[5]],
        ]);
        setQuesTwo([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questtwo[1], "#62B2FD", response.questtwotakenby[1]],
          ["2 Star", response.questtwo[2], "#9BDFC4", response.questtwotakenby[2]],
          ["3 Star", response.questtwo[3], "#F99BAB", response.questtwotakenby[3]],
          ["4 Star", response.questtwo[4], "color: #FFB44F", response.questtwotakenby[4]],
          ["5 Star", response.questtwo[5], "color: #9F97F7", response.questtwotakenby[5]],
        ]);
        setQuesThree([
          [
            "Element",
            "Percentage",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["1 Star", response.questthree[1], "#62B2FD", response.questthreetakenby[1]],
          ["2 Star", response.questthree[2], "#9BDFC4", response.questthreetakenby[2]],
          ["3 Star", response.questthree[3], "#F99BAB", response.questthreetakenby[3]],
          ["4 Star", response.questthree[4], "color: #FFB44F", response.questthreetakenby[4]],
          ["5 Star", response.questthree[5], "color: #9F97F7", response.questthreetakenby[5]],
        ]);
        setOverAll(response.overall)
      }
    }

    if (i == "Custom (Calendar Selection)") {
      showModal();
    }
    if (i == "") {
      getStats(fullInfo);
    }
  };
  const customDateFilter = async (e) => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    const body = {
      condition: "daterange", //lastmonth//lastweek//all/daterange,
      // "month":`${new Date().getMonth()+1}`,
      from: moment(new Date(e[0]).toLocaleDateString()).format("YYYY-MM-DD"),
      to: moment(new Date(e[1]).toLocaleDateString()).format("YYYY-MM-DD"),
      "organization_id":fullInfo
    };
    console.log(body);
    // return
    const res = await fetch(
      `${BASE_URL_APPLSURE}feedback-and-rating-report-mentee`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
        body: JSON.stringify(body),
      }
    );
    const response = await res.json();
    console.log("getReportofDevSkill", response);
    if (response.status) {
      setQuesOne([
        [
          "Element",
          "Percentage",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["1 Star", response.questone[1], "#62B2FD", response.questonetakenby[1]],
        ["2 Star", response.questone[2], "#9BDFC4", response.questonetakenby[2]],
        ["3 Star", response.questone[3], "#F99BAB", response.questonetakenby[3]],
        ["4 Star", response.questone[4], "color: #FFB44F", response.questonetakenby[4]],
        ["5 Star", response.questone[5], "color: #9F97F7", response.questonetakenby[5]],
      ]);
      setQuesTwo([
        [
          "Element",
          "Percentage",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["1 Star", response.questtwo[1], "#62B2FD", response.questtwotakenby[1]],
        ["2 Star", response.questtwo[2], "#9BDFC4", response.questtwotakenby[2]],
        ["3 Star", response.questtwo[3], "#F99BAB", response.questtwotakenby[3]],
        ["4 Star", response.questtwo[4], "color: #FFB44F", response.questtwotakenby[4]],
        ["5 Star", response.questtwo[5], "color: #9F97F7", response.questtwotakenby[5]],
      ]);
      setQuesThree([
        [
          "Element",
          "Percentage",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["1 Star", response.questthree[1], "#62B2FD", response.questthreetakenby[1]],
        ["2 Star", response.questthree[2], "#9BDFC4", response.questthreetakenby[2]],
        ["3 Star", response.questthree[3], "#F99BAB", response.questthreetakenby[3]],
        ["4 Star", response.questthree[4], "color: #FFB44F", response.questthreetakenby[4]],
        ["5 Star", response.questthree[5], "color: #9F97F7", response.questthreetakenby[5]],
      ]);
      setOverAll(response.overall)
      closeModal();
    }
  };
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
                <div className="contact-breadcrumb">
                  <div className="breadcrumb-main add-contact justify-content-sm-between">
                    <h4 className="text-capitalize fw-500 breadcrumb-title">
                      Feedback and Ratings Report - Mentees
                    </h4>

                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center add-contact__title justify-content-center me-sm-2">
                        <div className="action-btn">
                          <a href="#" className="btn px-15 btn-primary">
                            Download
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
                            setFilterValue(e.target.value);
                            filterStats(e.target.value);
                          }}
                        >
                          <option value="">Select Filter</option>
                          <option value="Year to Date">Year to Date</option>
                          <option value="Month to Date">Month to Date</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Custom (Calendar Selection)">
                            Custom (Calendar Selection)
                          </option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
            <div className="card border-0 card-timeline h-100 box_shadow1">
              <div className="card-header border-0">
                <h6 className="session_report">
                  Q.1 Was the session objective met?
                </h6>
              </div>
              {/* <BarChart
  width={500}
  height={300}
  data={data}
  margin={{
  top: 5,
  right: 10,
  left: 20,
  bottom: 5,
  }}
  >
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="skills" />
  <YAxis allowDecimals={false} />
  <Tooltip />
  <Bar dataKey="learningCompleted" fill="#F8A046" barSize={20} />
  </BarChart> */}
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={quesOne}
                options={options}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <center>
              <p style={{ color: "#000", fontSize: "18px", fontWeight:'600' }}>How happy are the mentees with their mentorship interventions</p>
            </center>
            <div className="row">
              <div className="col-lg-3" style={{textAlign:'center'}}>
                <img
                  style={{ margin: "20px", height: '64px', width:'64px' }}
                  src={overAll == "Not so happy" ? Five : One}
                />
                <p style={{color: overAll == "Not so happy" && "#000", fontWeight: overAll == "Not so happy" && "bold"}}>Not so happy</p>
              </div>

              <div className="col-lg-3" style={{textAlign:'center'}}>
                <img
                  style={{ margin: "20px", height: '64px', width:'64px' }}
                  src={overAll == "Happy" ? Six : Two}
                />
                <p style={{color: overAll == "Happy" && "#000", fontWeight: overAll == "Happy" && "bold"}}>Happy</p>
              </div>

              <div className="col-lg-3" style={{textAlign:'center'}}>
                <img
                  style={{ margin: "20px", height: '64px', width:'64px' }}
                  src={overAll == "Delighted" ? Seven : Three}
                />
                <p style={{color: overAll == "Delighted" && "#000", fontWeight: overAll == "Delighted" && "bold"}}>Delighted</p>
              </div>

              <div className="col-lg-3" style={{textAlign:'center'}}>
                <img
                  style={{ margin: "20px",  height: '64px', width:'64px' }}
                  src={overAll == "Elated" ? Eight : Four}
                />
                <p style={{color: overAll == "Elated" && "#000", fontWeight: overAll == "Elated" && "bold"}}>Elated</p>
              </div>
              </div>
            </div>
        </div>                 
        
        <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
          <div className="card border-0 card-timeline h-100 box_shadow1">
            <div className="card-header border-0">
              <h6 className="session_report">
                Q.2 Rate the Quality of Content shared by the Mentor
              </h6>
            </div>
            {/* <BarChart
width={500}
height={300}
data={data}
margin={{
top: 5,
right: 10,
left: 20,
bottom: 5,
}}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="skills" />
<YAxis allowDecimals={false} />
<Tooltip />
<Bar dataKey="learningCompleted" fill="#F8A046" barSize={20} />
</BarChart> */}
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={quesTwo}
              options={options}
            />
          </div>
        </div>
        <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
          <div className="card border-0 card-timeline h-100 box_shadow1">
            <div className="card-header border-0">
              <h6 className="session_report">
                Q.3 Rate the mentoring skills of Mentor
              </h6>
            </div>
            {/* <BarChart
width={500}
height={300}
data={data}
// data={learningTopData}
margin={{
top: 5,
right: 10,
left: 20,
bottom: 5,
}}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="skills" />
<YAxis allowDecimals={false} />
<Tooltip />
<Bar dataKey="learningCompleted" fill="#F8A046" barSize={20} />
</BarChart> */}
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={quesThree}
              options={options}
            />
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
            <Calendar
              onChange={(e) => {
                onChange1(e);
                customDateFilter(e);
              }}
              value={value1}
              maxDate={new Date()}
              selectRange={true}
            />
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

export default Feedback_And_Ratings_Report_Mentees;
