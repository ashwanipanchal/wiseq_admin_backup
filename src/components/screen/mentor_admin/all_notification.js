import horizontal_img from '../../../img/svg/more-verticals.svg';
import edit_img from '../../../img/svg/edit.svg';
import search_img from '../../../img/svg/search1.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import path from "../../../img/Path.png";
import notificationbell_img from '../../../img/notification_bells.svg';

const data = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", created_on: "12/12/23" },
];

const data1 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23", status_by: "Assigned" },
    { id: 2, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23", status_by: "Assigned" },
];

const data2 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "External", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23", completed_on: "12/12/23", status_by: "In Progress" },
];

const data3 = [
    { id: 1, learning_name: "-", skill_address: "-", category_name: "-", source_type: "-", assigned_to: "Jane Arora", assigned_on: "12/12/23", finish_by: "12/12/23" },
];

function All_Notification() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
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

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);



    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                        <div
                style={{ display: "flex" }}
                className="col-lg-12 col-sm-12 col-md-12"
              >
                <p
                  onClick={() => navigate("/")}
                  style={{
                    marginRight: "10px",
                    color: "#7A7A7A",
                    fontWeight: "400",
                    lineHeight: "22px",
                    cursor: "pointer",
                  }}
                >
                  Home
                </p>
                <img
                  style={{
                    marginRight: "10px",
                    width: "6px",
                    height: "13px",
                    marginTop: "6px",
                  }}
                  src={path}
                />
                <p
                  style={{
                    color: "#005B5B",
                    fontWeight: "400",
                    lineHeight: "22px",
                    cursor: "pointer",
                  }}
                >
                  Notifications
                </p>
              </div>
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h2 className="text-capitalize fw-500 breadcrumb-title">Notifications</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card card-default card-md">
                                <table className="table table-borderless mb-1">
                              <tbody>
                                {state.map((user) => (
                                  <tr className="project-task-list">
                                    <td>
                                      <div style={{cursor:'pointer'}} className="box_shadow1 p-15 notifi">
                                        <div className="event-Wrapper">
                                          <div className="event-Wrapper__left">
                                            <div style={{backgroundColor:'#ebf3f3'}} className="event-wrapper-item">
                                              <img
                                                src={notificationbell_img}
                                                className="svg"
                                              />
                                            </div>
                                          </div>
                                          <div className="event-Wrapper__right">
                                            <h6>{user.message}</h6>
                                            <span>{new Date(user.updatedAt).toDateString()} {new Date(user.updatedAt).toTimeString().split(" ")[0]}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                                                                
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />


            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div className="row">

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Mentees</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Program</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <input type="date" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Finish By" />
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" className="btn btn-petrol btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default All_Notification;
