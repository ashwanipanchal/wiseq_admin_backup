import React from 'react'
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from "react-google-charts";

// const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       amt: 2100,
//     },
//   ];

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
  
  export const options = {
    width: 550,
    height: 400,
    bar: { groupWidth: "80%" },
    legend: { position: "none" },
  };

function Feedback_And_Ratings_Report_Mentees() {
    const percentage = 90;
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
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
                    <div className="card border-0 card-timeline h-100 box_shadow1">
                        <div className="card-header border-0">
                            <h6 className="session_report">Q.1 Was the session objective met?</h6>
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
                            data={data}
                            options={options}
                            />
                    </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
                    <div className="card border-0 card-timeline h-100 box_shadow1">
                        <div className="card-header border-0">
                            <h6 className="session_report">Q.2 Rate the Quality of Content shared by the Mentor</h6>
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
                                data={data}
                                options={options}
                                />
                    </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-md-6 mb-25">
                    <div className="card border-0 card-timeline h-100 box_shadow1">
                        <div className="card-header border-0">
                            <h6 className="session_report">Q.3 Rate the mentoring skills of Mentor</h6>
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
                            data={data}
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
        </div>
    );
}

export default Feedback_And_Ratings_Report_Mentees