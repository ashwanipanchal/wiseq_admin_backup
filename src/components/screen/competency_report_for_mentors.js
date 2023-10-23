import React from 'react'
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BASE_URL_APPLSURE } from '../../services/Config';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment/moment';
const data2 = [
  { id: 1, community_name: "English Speaking", author_name: "Anika Schleifer" },
  { id: 2, community_name: "Community Speaking", author_name: "Anika Schleifer" },
  { id: 3, community_name: "Management", author_name: "Anika Schleifer" },
  { id: 4, community_name: "Research & Development", author_name: "Anika Schleifer" },
  { id: 5, community_name: "Research & Development", author_name: "Anika Schleifer" },
  { id: 6, community_name: "Research & Development", author_name: "Anika Schleifer" },
  { id: 7, community_name: "Research & Development", author_name: "Anika Schleifer" },
  { id: 8, community_name: "Research & Development", author_name: "Anika Schleifer" },
];

function Competency_Report_For_Mentors() {
  const percentage = 90;
  const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [top10Dev, setTop10Dev] = useState([])
    const [top10Pro, setTop10Pro] = useState([])
    const [totalNumber, setTotalNumber] = useState("")
    const [filterValue, setFilterValue] = useState("")
    const [value1, onChange1] = useState(new Date());
    function getWindowSize() {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }
      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);

    useEffect(() => {
      getReportofDevSkill()
    },[])

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);


    const getReportofDevSkill = async() => {
      const btoken = `Bearer ${token}`;
      const body = {
          "condition":"all",//lastmonth//lastweek//all/daterange,
          // "month":"10",
          // "from":"2023-10-10",
          // "to":"2023-10-20"
      }
      const res = await fetch(`${BASE_URL_APPLSURE}competency-report-for-mentor`, {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
          body:JSON.stringify(body)
      })
      const response = await res.json()
      console.log("getReportofDevSkill", response)
      if(response.status){
        setTop10Dev(response.top10dev)
        setTotalNumber(response.total)
        setTop10Pro(response.profieciancy)
      }
      // setCreatedLearning(response.data)
  }

    const toggle = () => {
        setSideBarOpen(!sideBarOpen);
      };


      const filterStats = async(i) => {
        const token = await localStorage.getItem("token");
        const btoken = `Bearer ${token}`;
        let url = ""
        if(i == "Year to Date"){
          const btoken = `Bearer ${token}`;
          const body = {
              "condition":"all",//lastmonth//lastweek//all/daterange,
          }
          const res = await fetch(`${BASE_URL_APPLSURE}competency-report-for-mentee`, {
              method: 'POST',
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
              },
              body:JSON.stringify(body)
          })
          const response = await res.json()
          console.log("getReportofDevSkill", response)
          if(response.status){
            setTop10Dev(response.top10dev)
            setTotalNumber(response.total)
            setTop10Pro(response.profieciancy)
          }
        }
        if(i == "Month to Date"){
          const btoken = `Bearer ${token}`;
          const body = {
              "condition":"lastmonth",//lastmonth//lastweek//all/daterange,
              "month":`${new Date().getMonth()+1}`,
          }
          const res = await fetch(`${BASE_URL_APPLSURE}competency-report-for-mentee`, {
              method: 'POST',
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
              },
              body:JSON.stringify(body)
          })
          const response = await res.json()
          console.log("getReportofDevSkill", response)
          if(response.status){
            setTop10Dev(response.top10dev)
            setTotalNumber(response.total)
            setTop10Pro(response.profieciancy)
          }
        }

        if(i == "Weekly"){
          const btoken = `Bearer ${token}`;
          const body = {
              "condition":"lastweek",//lastmonth//lastweek//all/daterange,
          }
          const res = await fetch(`${BASE_URL_APPLSURE}competency-report-for-mentee`, {
              method: 'POST',
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
              },
              body:JSON.stringify(body)
          })
          const response = await res.json()
          console.log("getReportofDevSkill", response)
          if(response.status){
            setTop10Dev(response.top10dev)
            setTotalNumber(response.total)
            setTop10Pro(response.profieciancy)
          }
        }

        if(i == "Custom (Calendar Selection)"){
          showModal()
        }
        if(i == ""){
          getReportofDevSkill()
        }
        
      }
    
      const customDateFilter = async(e) => {
        const token = await localStorage.getItem("token");
        const btoken = `Bearer ${token}`;
          const body = {
              "condition":"daterange",//lastmonth//lastweek//all/daterange,
              // "month":`${new Date().getMonth()+1}`,
              "from":moment(new Date(e[0]).toLocaleDateString()).format("YYYY-MM-DD"),
              "to":moment(new Date(e[1]).toLocaleDateString()).format("YYYY-MM-DD")
          }
          console.log(body)
          // return
          const res = await fetch(`${BASE_URL_APPLSURE}competency-report-for-mentee`, {
              method: 'POST',
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
              },
              body:JSON.stringify(body)
          })
          const response = await res.json()
          console.log("getReportofDevSkill", response)
          if(response.status){
            setTop10Dev(response.top10dev)
            setTotalNumber(response.total)
            setTop10Pro(response.profieciancy)
            closeModal()
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
                <div className="contact-breadcrumb">
                  <div className="breadcrumb-main add-contact justify-content-sm-between">
                    <h4 className="text-capitalize fw-500 breadcrumb-title">
                    Competency Report For {totalNumber} Mentors
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
                            setFilterValue(e.target.value)
                            filterStats(e.target.value)}}

                        >
                          <option value="">Select Filter</option>
                          <option value="Year to Date">Year to Date</option>
                          <option value="Month to Date">Month to Date</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Custom (Calendar Selection)">Custom (Calendar Selection)</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div class="col-lg-5 col-sm-12 col-md-12 mb-25">
              <div
                style={{
                  height: 300,
                  width: 300,
                  margin:"0 auto",
                  borderRadius: 150,
                  backgroundColor: "#fdefe6",
                }}
              >
                <p
                  style={{
                    fontSize: "26px",
                    color: "#F8A046",
                    textAlign: "center",
                    paddingTop: "90px",
                  }}
                >
                  Top 10 Skills<br />
                  Mentors can  <br />
                  Mentor in
                </p>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-12 mb-25">
              <div className="row">
                {top10Pro && top10Pro.map((i) => (
                  <div class="col-lg-3 mb-10">
                  <CircularProgressbar
                    value={i.percents}
                    text={`${i.percents}%`}
                    strokeWidth={20}
                    styles={buildStyles({
                      strokeWidth: 50,
                      strokeLinecap: "butt",
                      textSize: '16px',
                      pathTransitionDuration: 0.5,
                      // pathColor: `rgb(48, 60, 70, ${
                      //     percentage / 100
                      //   })`,
                      pathColor:"#F8A046",
                      textColor: "#323232",
                      trailColor: "#fdefe6",
                      // backgroundColor: "red",
                    })}
                  />
                   <p  style={{textAlign:'center', fontSize:"14px", color:'#F8A046', marginBottom:"5px"}}>{i.total_mentee} Mentees</p>
                   <p style={{textAlign:'center', fontSize:"14px", color:'#000'}}>{i.skill_name}</p>
                {/* <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    textColor: "red",
                    pathColor: "blue",
                    trailColor: "gold"
                  })}
                  /> */}
               </div>
                ))}
<div></div>
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

export default Competency_Report_For_Mentors