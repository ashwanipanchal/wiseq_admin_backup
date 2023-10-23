import React from 'react'
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { Chart, Line, Point, Tooltip,getTheme } from "bizcharts";

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
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
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
                          // value={filterValue}
                          // onChange={(e) => {
                          //   setFilterValue(e.target.value)
                          //   filterStats(e.target.value)
                          // }}
                        >
                          <option value="">Select Filter</option>
                          <option value="Year to Date">Year to Date</option>
                          <option value="Month to Date">Month to Date</option>
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

        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12 col-sm-6 col-md-6 mb-25">
              <div className="card border-0 card-timeline h-100 box_shadow1">
                <div className="card-header border-0">
                  <h6 className="session_report">
                  Overall Growth Percentage
                  </h6>
                  <h4>90%</h4>
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
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
              <div className="card border-0 card-timeline h-100 box_shadow1">
                <div className="card-header border-0">
                  <h6 className="session_report">
                  Leadership
                  </h6>
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
                      appendPadding={[10, 0, 0, 10]}
                      autoFit
                      height={500}
                      data={data}
                      onLineClick={console.log}
                      scale={{ value: { min: 0, alias: 'Value', type: 'linear-strict' }, year: { range: [0, 1] } }}
                    >

                      <Line position="year*value" />
                      <Point position="year*value" />
                      <Tooltip showCrosshairs follow={false} />
                    </Chart>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
              <div className="card border-0 card-timeline h-100 box_shadow1">
                <div className="card-header border-0">
                  <h6 className="session_report">
                  Communication
                  </h6>
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
                      appendPadding={[10, 0, 0, 10]}
                      autoFit
                      height={500}
                      data={data}
                      onLineClick={console.log}
                      scale={{ value: { min: 0, alias: 'Value', type: 'linear-strict' }, year: { range: [0, 1] } }}
                    >

                      <Line position="year*value" />
                      <Point position="year*value" />
                      <Tooltip showCrosshairs follow={false} />
                    </Chart>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
              <div className="card border-0 card-timeline h-100 box_shadow1">
                <div className="card-header border-0">
                  <h6 className="session_report">
                  Leadership
                  </h6>
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
                      appendPadding={[10, 0, 0, 10]}
                      autoFit
                      height={500}
                      data={data}
                      onLineClick={console.log}
                      scale={{ value: { min: 0, alias: 'Value', type: 'linear-strict' }, year: { range: [0, 1] } }}
                    >

                      <Line position="year*value" />
                      <Point position="year*value" />
                      <Tooltip showCrosshairs follow={false} />
                    </Chart>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
              <div className="card border-0 card-timeline h-100 box_shadow1">
                <div className="card-header border-0">
                  <h6 className="session_report">
                  Leadership
                  </h6>
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
                      appendPadding={[10, 0, 0, 10]}
                      autoFit
                      height={500}
                      data={data}
                      onLineClick={console.log}
                      scale={{ value: { min: 0, alias: 'Value', type: 'linear-strict' }, year: { range: [0, 1] } }}
                    >

                      <Line position="year*value" />
                      <Point position="year*value" />
                      <Tooltip showCrosshairs follow={false} />
                    </Chart>
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

export default Mentoring_Impact_Report