import React from 'react'
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BASE_URL, BASE_URL_APPLSURE } from '../../services/Config';

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

function Adoptation_Report() {
  const percentage = 90;
  const [token, setToken] = useState(localStorage.getItem("token"));
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [yearlyData, setYearlyData] = useState([])
    const [totalSession, setTotalSession] = useState("")
    const [top5, setTop5] = useState([])
    const [overAll, setOverAll] = useState("")
    const [fullInfo, setFullInfo] = useState("");
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
      getFullDetail()
    },[])

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
      getReport(response.data.id)
      setFullInfo(response.data.id);
    };

    const getReport = async(id) => {
      const btoken = `Bearer ${token}`;
      const body = {
        "year":"2023",
        "organization_id":id
    };
      const res = await fetch(
        `${BASE_URL_APPLSURE}adaption-report`,
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
      console.log("getReport", response);
      if(response.status){
        setYearlyData([
        { id: 1, community_name: "January", value: response.jan_percent, author_name: "Anika Schleifer" },
        { id: 2, community_name: "February",value: response.feb_percent, author_name: "Anika Schleifer" },
        { id: 3, community_name: "March",value: response.march_percent, author_name: "Anika Schleifer" },
        { id: 4, community_name: "April",value: response.april_percent, author_name: "Anika Schleifer" },
        { id: 5, community_name: "May",value: response.may_percent, author_name: "Anika Schleifer" },
        { id: 6, community_name: "June",value: response.june_percent, author_name: "Anika Schleifer" },
        { id: 7, community_name: "July",value: response.july_percent, author_name: "Anika Schleifer" },
        { id: 8, community_name: "August",value: response.august_percent, author_name: "Anika Schleifer" },
        { id: 9, community_name: "September",value: response.sept_percent, author_name: "Anika Schleifer" },
        { id: 10, community_name: "October",value: response.oct_percent, author_name: "Anika Schleifer" },
        { id: 11, community_name: "November",value: response.nov_percent, author_name: "Anika Schleifer" },
        { id: 12, community_name: "December",value: response.dec_percent, author_name: "Anika Schleifer" },
      ])
      setOverAll(response.overall)
      setTop5(response.topfivedev)
      setTotalSession(response.totalsessions)
      }
    }

    const toggle = () => {
        setSideBarOpen(!sideBarOpen);
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
                    Adoption Report - 2023
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
                      {/* <form
                        action="#"
                        className="d-flex align-items-center add-contact__form my-sm-0 my-2 bg-transparent"
                      >
                        <select
                          className="form-select custom_selects"
                          aria-label="Default select example"
                          // value={filterValue}
                          // onChange={(e) => {
                          //   setFilterValue(e.target.value)
                          //   filterStats(e.target.value)
                          // }}

                        >
                          <option value="">Select Filter</option>
                          <option value="Year to Date">Year to Date</option>
                          <option value="Month to Date">Month to Date</option>
                          <option value="Custom (Calendar Selection)">Custom (Calendar Selection)</option>
                        </select>
                      </form> */}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div style={{marginLeft:"65px", marginRight:"140px"}} class="col-lg-3 col-sm-12 col-md-12 mb-25">
            <CircularProgressbar
                      value={overAll}
                      text={`${overAll}%`}
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
                     <p
                  style={{
                    fontSize: "20px",
                    color: "black",
                    textAlign: "center",
                    fontWeight:'bold',
                    paddingTop: "20px",
                  }}
                >
                  {totalSession} <br />
                  # Mentoring Sessions <br />
                  Conducted
                </p>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-12 mb-25">
              <div className="row">
                {yearlyData.map((i) => (
                  <div class="col-lg-3 mb-10">
                    <CircularProgressbar
                      value={i.value}
                      text={`${i.value}%`}
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
                     <p style={{textAlign:'center', fontSize:"14px", color:'#000', fontWeight:'bold'}}>{i.community_name}</p>
                  </div>
                ))}
<div></div>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div class="col-lg-5 col-sm-12 col-md-12 mb-25">
              <div
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: 150,
                  backgroundColor: "#ebf3f3",
                }}
              >
                <p
                  style={{
                    fontSize: "26px",
                    color: "#006666",
                    textAlign: "center",
                    paddingTop: "90px",
                  }}
                >
                  Top 5 Skills <br />
                  nurtured through <br />
                  Mentoring<br/>
                  Sessions
                </p>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-12 mb-25">
              <div className="row">
                {top5.map((i) => (
                  <div class="col-lg-3 mb-10">
                    <CircularProgressbar
                      value={i.percents}
                      text={`${i.percents}%`}
                      strokeWidth={20}
                      styles={buildStyles({
                        strokeWidth: 40,
                        strokeLinecap: "butt",
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        // pathColor: `rgba(253, 239, 230, ${
                        //     percentage / 100
                        //   })`,
                        // textColor: "#000",
                        // trailColor: "red",
                        // backgroundColor: "red",
                        pathColor:"#006666",
                        textColor: "#323232",
                        trailColor: "#ebf3f3",
                      })}
                    />
                    <p  style={{textAlign:'center', fontSize:"14px", color:'#005B5B', marginBottom:"5px"}}>{i.totalsessions} Sessions</p>
                    <p style={{textAlign:'center', fontSize:"14px", color:'#000', fontWeight:'bold'}}>{i.skill_name}</p>
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
      </div>
  );
}

export default Adoptation_Report