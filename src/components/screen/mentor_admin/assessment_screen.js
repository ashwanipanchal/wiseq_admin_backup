import horizontal_img from '../../../img/svg/more-verticals.svg';
import edit_img from '../../../img/svg/edit.svg';
import search_img from '../../../img/svg/search1.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink } from "react-router-dom";
import Progress_banner from '../../screen_components/progress_banner'
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

function Assessment_Screen() {

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
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Assessments</h4>
                                        </div>
                                    </div>

                                    {/* <div class="layout-button">
                                        <NavLink className="" to="/create_assessment"><button type="button" class="btn btn-petrol modal_btn_btn">Create a Assessment</button></NavLink>
                                    </div> */}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card card-default card-md">
                                    <div className="">
                                        <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                                <Tabs>
                                                    <TabList className="nav nav-tabs vertical-tabs">
                                                        <Tab>Created</Tab>
                                                        <Tab>Assigned</Tab>
                                                        <Tab>Submitted</Tab>
                                                        <Tab>Checked and Verified</Tab>
                                                    </TabList>

                                                    <TabPanel className="tab-content">
                                                        {/* <div className="row">
                                                            {data.map((user) => (
                                                                <div className="col-lg-12">
                                                                    <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                        <div className="table-responsive">
                                                                            <table className="table mb-0 table-borderless">
                                                                                <thead>
                                                                                    <tr className="userDatatable-header">
                                                                                        <th>
                                                                                            <span className="userDatatable-title">Title</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Skills Addressed</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Category</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Source Type</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Created On</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title"></span>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>


                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.learning_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.skill_address}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.category_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.source_type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.created_on}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                                                                <li>
                                                                                                    <button className="btn btn-icon btn-warning btn-squared">
                                                                                                        <img src={edit_img} alt="layers" className="svg" />
                                                                                                    </button>
                                                                                                </li>

                                                                                                <li>
                                                                                                    <button className="btn btn-icon btn-petrol btn-squared ms-10" onClick={showModal}>
                                                                                                        Assign
                                                                                                    </button>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            ))}
                                                        </div> */}
                                                        <Progress_banner/>
                                                    </TabPanel>

                                                    <TabPanel>
                                                        {/* <div className="row">
                                                            {data1.map((user) => (
                                                                <div className="col-lg-12">
                                                                    <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                        <div className="table-responsive">
                                                                            <table className="table mb-0 table-borderless">
                                                                                <thead>
                                                                                    <tr className="userDatatable-header">
                                                                                        <th>
                                                                                            <span className="userDatatable-title">Title</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Skills Addressed</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Category</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Source Type</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Mentee Name</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Assigned On</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Finish By</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Status</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title"></span>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>


                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.learning_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.skill_address}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.category_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.source_type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.assigned_to}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.assigned_on}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.finish_by}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.status_by}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                                                                <li>
                                                                                                    <button className="btn btn-icon btn-warning btn-squared">
                                                                                                        <img src={edit_img} alt="layers" className="svg" />
                                                                                                    </button>
                                                                                                </li>

                                                                                                <NavLink className="navbar-link" to="/assessment_profile">
                                                                                                    <li>
                                                                                                        <button className="btn btn-icon btn-petrol btn-squared ms-10">
                                                                                                            View
                                                                                                        </button>
                                                                                                    </li>
                                                                                                </NavLink>
                                                                                            </ul>
                                                                                        </td>
                                                                                    </tr>

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div> */}
                                                        <Progress_banner/>
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                        {/* <div className="row">
                                                            {data2.map((user) => (
                                                                <div className="col-lg-12">
                                                                    <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                        <div className="table-responsive">
                                                                            <table className="table mb-0 table-borderless">
                                                                                <thead>
                                                                                    <tr className="userDatatable-header">
                                                                                        <th>
                                                                                            <span className="userDatatable-title">Title</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Skills Addressed</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Category</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Source Type</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Mentee Name</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Finish By</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Submitted On</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title"></span>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>


                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.learning_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.skill_address}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.category_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.source_type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.assigned_to}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.finish_by}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.completed_on}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                <NavLink className="navbar-link" to="/check_assessment">
                                                                                                    <li>
                                                                                                        <button className="btn btn-icon btn-petrol btn-squared ms-10">
                                                                                                            Check
                                                                                                        </button>
                                                                                                    </li>
                                                                                                </NavLink>
                                                                                            </ul>
                                                                                        </td>
                                                                                    </tr>

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div> */}
                                                        <Progress_banner/>
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                        {/* <div className="row">
                                                            {data3.map((user) => (
                                                                <div className="col-lg-12">
                                                                    <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                        <div className="table-responsive">
                                                                            <table className="table mb-0 table-borderless">
                                                                                <thead>
                                                                                    <tr className="userDatatable-header">
                                                                                        <th>
                                                                                            <span className="userDatatable-title">Title</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Skills Addressed</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Category</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Source Type</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Mentee Name</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Submitted On</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title">Verified On</span>
                                                                                        </th>

                                                                                        <th>
                                                                                            <span className="userDatatable-title"></span>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>


                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.learning_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.skill_address}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.category_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.source_type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.assigned_to}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.assigned_on}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content fw-600">
                                                                                                {user.finish_by}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                <NavLink className="navbar-link" to="/check_verify">
                                                                                                    <li>
                                                                                                        <button className="btn btn-icon btn-petrol btn-squared ms-10">
                                                                                                            View
                                                                                                        </button>
                                                                                                    </li>
                                                                                                </NavLink>
                                                                                            </ul>
                                                                                        </td>
                                                                                    </tr>

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div> */}
                                                        <Progress_banner/>
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

export default Assessment_Screen;
