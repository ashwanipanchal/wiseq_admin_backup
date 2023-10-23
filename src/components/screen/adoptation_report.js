import React from 'react'
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

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
                    Competency Report For 2500 Mentees
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
          <div className="row">
            <div class="col-lg-5 col-sm-12 col-md-12 mb-25">
            <CircularProgressbar
                      value={percentage}
                      strokeWidth={20}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        strokeWidth: 50,
                        strokeLinecap: "butt",
                        textSize: '8px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgb(248, 160, 70, ${
                            percentage / 100
                          })`,
                        textColor: "#000",
                        trailColor: "red",
                        backgroundColor: "red",
                      })}
                    />
            </div>
            <div class="col-lg-6 col-sm-12 col-md-12 mb-25">
              <div className="row">
                {data2.map((i) => (
                  <div class="col-lg-3 mb-10">
                    <CircularProgressbar
                      value={percentage}
                      strokeWidth={20}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        strokeWidth: 50,
                        strokeLinecap: "butt",
                        textSize: '8px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgb(248, 160, 70, ${
                            percentage / 100
                          })`,
                        textColor: "#000",
                        trailColor: "red",
                        backgroundColor: "red",
                      })}
                    />
                    <p  style={{textAlign:'center', fontSize:"14px", color:'#F8A046', marginBottom:"5px"}}>100 Mentees</p>
                    <p style={{textAlign:'center', fontSize:"14px", color:'#000'}}>{i.community_name}</p>
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
                  Top 10 <br />
                  Proficiency <br />
                  Skills
                </p>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-12 mb-25">
              <div className="row">
                {data2.map((i) => (
                  <div class="col-lg-3 mb-10">
                    <CircularProgressbar
                      value={percentage}
                      strokeWidth={20}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        strokeWidth: 50,
                        strokeLinecap: "butt",
                        textSize: '8px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(253, 239, 230, ${
                            percentage / 100
                          })`,
                        textColor: "#000",
                        trailColor: "red",
                        backgroundColor: "red",
                      })}
                    />
                    <p  style={{textAlign:'center', fontSize:"14px", color:'#F8A046', marginBottom:"5px"}}>100 Mentees</p>
                    <p style={{textAlign:'center', fontSize:"14px", color:'#000'}}>{i.community_name}</p>
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