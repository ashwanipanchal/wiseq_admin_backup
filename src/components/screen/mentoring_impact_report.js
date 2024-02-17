import React from 'react'
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { Chart, Line, Point, Tooltip,getTheme } from "bizcharts";
import arrow_up from '../../img/report_arrow_up.svg';
import arrow_down from '../../img/report_arrow_down.svg';
import chart_arrow_down from '../../img/chart_arrow_down.svg';
import chart_arrow_up from '../../img/chart_arrow_up.svg';
import { BASE_URL, BASE_URL_APPLSURE } from '../../services/Config';

const data = [
	{
		year: "1991",
		value: 3,
	},
	{
		year: "1992",
		value: 4,
	},
	{
		year: "1993",
		value: 3.5,
	},
	{
		year: "1994",
		value: 5,
	},
	{
		year: "1995",
		value: 4.9,
	},
	{
		year: "1996",
		value: 6,
	},
];


function Mentoring_Impact_Report() {
  const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [top5Dev, setTop5Dev] = useState([])
    const [overAll, setOverAll] = useState({})
    const [fullInfo, setFullInfo] = useState("");
    const [filterValue, setFilterValue] = useState("");
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
      getImpactReport(response.data.id)
      setFullInfo(response.data.id);
    };

    const getImpactReport = async(id) => {
      const btoken = `Bearer ${token}`;
      const body = {
        "condition":"year",
        // "month":"11",
        "year":new Date().getFullYear(),
        // "from":"",
        // "to":"",
        "organization_id":id
    
    }
      const res = await fetch(`${BASE_URL_APPLSURE}mentoring-impact-report`, {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
          body:JSON.stringify(body)
      })
      const response = await res.json()
      console.log(response)
      if(response.status){
        setTop5Dev(response.top5dev)
        setOverAll(response.overall)
      }
    }
    
    const toggle = () => {
        setSideBarOpen(!sideBarOpen);
      };


      const filterStats = async (i) => {
        const token = await localStorage.getItem("token");
        const btoken = `Bearer ${token}`;
        let url = "";
        if (i == "Year to Date") {
          const btoken = `Bearer ${token}`;
          const body = {
            "condition":"year",
            // "month":"11",
            "year":new Date().getFullYear(),
            // "from":"",
            // "to":"",
            "organization_id":fullInfo
        
        }
          const res = await fetch(`${BASE_URL_APPLSURE}mentoring-impact-report`, 
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
          if(response.status){
            setTop5Dev(response.top5dev)
            setOverAll(response.overall)
          }
        }
        if (i == "Month to Date") {
          const btoken = `Bearer ${token}`;
          // const body = {
          //   condition: "lastmonth", //lastmonth//lastweek//all/daterange,
          //   "organization_id":fullInfo,
          //   month: `${new Date().getMonth() + 1}`,
          // };
          const body = {
            "condition":"month",
            "month":new Date().getMonth()+1,
            "year":new Date().getFullYear(),
            // "from":"",
            // "to":"",
            "organization_id":fullInfo
        
        }
          const res = await fetch(`${BASE_URL_APPLSURE}mentoring-impact-report`, 
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
          if(response.status){
            setTop5Dev(response.top5dev)
            setOverAll(response.overall)
          }
        }
    
        // if (i == "Weekly") {
        //   const btoken = `Bearer ${token}`;
        //   const body = {
        //     condition: "lastweek", //lastmonth//lastweek//all/daterange,
        //     "organization_id":fullInfo
        //   };
        //   const res = await fetch(`${BASE_URL_APPLSURE}mentoring-impact-report`, 
        //     {
        //       method: "POST",
        //       headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: btoken,
        //       },
        //       body: JSON.stringify(body),
        //     }
        //   );
        //   const response = await res.json();
        //   console.log("getReportofDevSkill", response);
        //   if (response.status) {
        //     setQuesOne([
        //       [
        //         "Element",
        //         "Percentage",
        //         { role: "style" },
        //         {
        //           sourceColumn: 0,
        //           role: "annotation",
        //           type: "string",
        //           calc: "stringify",
        //         },
        //       ],
        //       ["1 Star", response.questone[1], "#62B2FD", null],
        //       ["2 Star", response.questone[2], "#9BDFC4", null],
        //       ["3 Star", response.questone[3], "#F99BAB", null],
        //       ["4 Star", response.questone[4], "color: #FFB44F", null],
        //       ["5 Star", response.questone[5], "color: #9F97F7", null],
        //     ]);
        //     setQuesTwo([
        //       [
        //         "Element",
        //         "Percentage",
        //         { role: "style" },
        //         {
        //           sourceColumn: 0,
        //           role: "annotation",
        //           type: "string",
        //           calc: "stringify",
        //         },
        //       ],
        //       ["1 Star", response.questtwo[1], "#62B2FD", null],
        //       ["2 Star", response.questtwo[2], "#9BDFC4", null],
        //       ["3 Star", response.questtwo[3], "#F99BAB", null],
        //       ["4 Star", response.questtwo[4], "color: #FFB44F", null],
        //       ["5 Star", response.questtwo[5], "color: #9F97F7", null],
        //     ]);
        //     setQuesThree([
        //       [
        //         "Element",
        //         "Percentage",
        //         { role: "style" },
        //         {
        //           sourceColumn: 0,
        //           role: "annotation",
        //           type: "string",
        //           calc: "stringify",
        //         },
        //       ],
        //       ["1 Star", response.questthree[1], "#62B2FD", null],
        //       ["2 Star", response.questthree[2], "#9BDFC4", null],
        //       ["3 Star", response.questthree[3], "#F99BAB", null],
        //       ["4 Star", response.questthree[4], "color: #FFB44F", null],
        //       ["5 Star", response.questthree[5], "color: #9F97F7", null],
        //     ]);
        //     setOverAll(response.overall)
        //   }
        // }
    
        // if (i == "Custom (Calendar Selection)") {
        //   showModal();
        // }
        if (i == "") {
          getImpactReport(fullInfo);
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
                      Mentoring Impact Report
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
                            filterStats(e.target.value)
                          }}
                        >
                          <option value="">Select Filter</option>
                          <option value="Year to Date">Year to Date</option>
                          <option value="Month to Date">Month to Date</option>
                          {/* <option value="Custom (Calendar Selection)">
                            Custom (Calendar Selection)
                          </option> */}
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="row">
          <div className="col-lg-12 mb-25">
                  <div className="card border-0 px-20 pb-20 project-task-list--event box_shadow1 mentee_card">
                    <div className="card-header px-0 border-0">
                      <h6>Overall Growth (All Skills Combined)</h6>
                    </div>
                    
                        <>
                        

                        <div className="media-body d-flex mt-2 justify-content-between mb-3">
                        
                        <div className="mt-1">
                        <p className="color-dark fs-2 fw-700 mb-0">
                        {overAll.mentee} <span style={{color:"#FFBC00"}} className='fs-2 fw-700 mb-0'>({overAll.main}%)</span>
                        </p>
                        <p className="color-dark mb-0">
                        Mentees skilled up in various skills among those who have taken at least one session.
                        </p>
                          </div>
                          {overAll.statusfinal == "gain" && (
                            <img
                            src={chart_arrow_up}
                          />
                          )}
                          {overAll.statusfinal == "loss" && (
                            <img
                            src={chart_arrow_down}
                          />
                          )}
                          
                          {/* <img
                            src={overAll.statusfinal == "gain"? chart_arrow_up: overAll.status == "loss" ? chart_arrow_down : ""}
                          /> */}
                          
                        </div>
                        <div style={{backgroundColor:'#F3F3F3', padding:"10px", borderRadius:'10px'}} className='d-flex'>
                          <img src={ overAll.statusfinal == "gain"? arrow_up: overAll.status == "loss" ? arrow_down : ""}/>
                          <p style={{color:overAll.statusfinal == "gain" ?  "#00A94B":"#DD2025", marginRight:'10px', marginLeft:'10px', fontWeight:'bold'}} className='mb-0'>{overAll.previous}%</p>
                          <p className='color-dark mb-0'>Since last month</p>
                        </div>
                      </>
                      
                   
                  </div>
            </div>
            
            {top5Dev && top5Dev.map((i) => (
              <div className="col-lg-6 mb-25">
                  <div className="card border-0 px-20 pb-20 project-task-list--event box_shadow1 mentee_card">
                    <div className="card-header px-0 border-0">
                      <h6>{i.skillname}</h6>
                    </div>
                    
                        <>
                        

                        <div className="media-body d-flex mt-2 justify-content-between mb-3">
                        
                        <div className="mt-1">
                        <p className="color-dark fs-2 fw-700 mb-0">
                        {i.mentee} <span style={{color:"#FFBC00"}} className='fs-2 fw-700 mb-0'>({i.main}%)</span>
                        </p>
                        <p className="color-dark mb-0">
                        Mentees skilled up on <span className='fw-700'>{i.skillname}</span> Skill 
                        </p>
                          </div>
                          <img
                            src={i.statusfinal == "gain"? chart_arrow_up: i.statusfinal == "loss" ? chart_arrow_down : ""}
                          />
                          
                        </div>
                        <div style={{backgroundColor:'#F3F3F3', padding:"10px", borderRadius:'10px'}} className='d-flex'>
                          <img src={ i.statusfinal == "gain"? arrow_up: i.statusfinal == "loss" ? arrow_down : ""}/>
                          <p style={{color:i.statusfinal == "gain" ?  "#00A94B":"#DD2025", marginRight:'10px', marginLeft:'10px', fontWeight:'bold'}} className='mb-0'>{i.previous}%</p>
                          <p className='color-dark mb-0'>Since last month</p>
                        </div>
                      </>
                      
                   
                  </div>
            </div>
            ))}
            

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

export default Mentoring_Impact_Report