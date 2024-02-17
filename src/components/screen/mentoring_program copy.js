import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const data = [
    { id: 1, program_id: "-", program_name: "-", skills: "-", duration: "-", type: "-", program_parti: "-", starting_on: "-", status: "-", finishing: "-", completion_percen: "50%" },
];

function Mentoring_Program() {

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

    const [showFilter, setShowFilter] = useState(false)

    const showModal = () => {
        setShowFilter(prevStat => !prevStat)
        // alert(showFilter)
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
                          Mentoring Programs
                        </h4>
                      </div>
                    </div>

                    <NavLink className="navbar-link" to="/create_program">
                      <div className="action-btn">
                        <div className="btn px-15 btn-primary">
                          Create Program
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card card-default card-md">
                    <div className="">
                      <div className="tab-wrapper">
                        <div className="dm-tab tab-horizontal">
                          <Tabs>
                            <TabList className="nav nav-tabs vertical-tabs">
                              <Tab>Programs Created</Tab>
                              <Tab>Programs Published</Tab>
                              <Tab>Programs In-Progress</Tab>
                              <Tab>Past Batches</Tab>
                            </TabList>

                            <TabPanel className="tab-content">
                              <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program ID</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Name</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Skill(s)</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Duration</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Type</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Program Participation</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Starting on</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title"></span>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {data.map((user) => (

                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.program_id}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.program_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.skills}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.duration}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.type}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.program_parti}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content color-status fw-600">
                                                                                                {user.starting_on}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="d-flex align-content-center">
                                                                                                    <li>
                                                                                                        <div className="dropdown dropleft">
                                                                                                            <button className="btn-link border-0 bg-transparent p-0">
                                                                                                                <img src={horizontal_img} className="svg" onClick={() => showModal()} />
                                                                                                            </button>



                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>

                                                                                            {showFilter ?
                                                                                                <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                                                                    <NavLink className="" to="/program_create_profile_view"><div className="dropdown-item">view</div></NavLink>
                                                                                                    <a className="dropdown-item" href="#">edit</a>
                                                                                                    <NavLink className="" to="/program_settings"><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                                                                </div> : ""}
                                                                                        </td>
                                                                                    </tr>


                                                                                ))}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                              {/* <div className="col-lg-12">
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
                                        We are currently developing this
                                        feature. It will be available to you
                                        soon.
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </TabPanel>

                            <TabPanel>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                      <table className="table mb-0 table-borderless">
                                        <thead>
                                          <tr className="userDatatable-header">
                                            <th>
                                              <span className="userDatatable-title">
                                                Program ID
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Name
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Skill(s)
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Duration
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Type
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Participation
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Starting on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Status
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title"></span>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {data.map((user) => (
                                            <tr>
                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.program_id}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.program_name}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.skills}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.duration}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.type}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.program_parti}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.starting_on}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.status}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            onClick={() =>
                                                              showModal()
                                                            }
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {showFilter ? (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                    <NavLink
                                                      className=""
                                                      to="/program_publish_profile_view"
                                                    >
                                                      <div className="dropdown-item">
                                                        view
                                                      </div>
                                                    </NavLink>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                    >
                                                      edit
                                                    </a>
                                                    <NavLink className="" to="/program_settings"><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-lg-12">
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
                            </div> */}
                            </TabPanel>

                            <TabPanel className="tab-content">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                      <table className="table mb-0 table-borderless">
                                        <thead>
                                          <tr className="userDatatable-header">
                                            <th>
                                              <span className="userDatatable-title">
                                                Program ID
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Name
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Skill(s)
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Duration
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Type
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Participation
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Started on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Finishing on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Completion
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title"></span>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {data.map((user) => (
                                            <tr>
                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.program_id}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.program_name}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.skills}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.duration}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.type}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.program_parti}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.starting_on}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.finishing}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.completion_percen}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            onClick={() =>
                                                              showModal()
                                                            }
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {showFilter ? (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                    <NavLink
                                                      className=""
                                                      to="/program_progress_profile_view"
                                                    >
                                                      <div className="dropdown-item">
                                                        view
                                                      </div>
                                                    </NavLink>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                    >
                                                      edit
                                                    </a>
                                                    <NavLink className="" to="/program_settings"><div className="dropdown-item" href="#">Program Settings</div></NavLink>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-lg-12">
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
                            </div> */}
                            </TabPanel>

                            <TabPanel className="tab-content">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                      <table className="table mb-0 table-borderless">
                                        <thead>
                                          <tr className="userDatatable-header">
                                            <th>
                                              <span className="userDatatable-title">
                                                Program ID
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Name
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Skill(s)
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Duration
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Type
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Program Participation
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Started on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Finished on
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title">
                                                Status
                                              </span>
                                            </th>

                                            <th>
                                              <span className="userDatatable-title"></span>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {data.map((user) => (
                                            <tr>
                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.program_id}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.program_name}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.skills}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.duration}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.type}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.program_parti}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.starting_on}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.finishing}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content color-status fw-600">
                                                  {user.status}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            onClick={() =>
                                                              showModal()
                                                            }
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {showFilter ? (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                    <NavLink
                                                      className=""
                                                      to="/past_batches"
                                                    >
                                                      <div className="dropdown-item">
                                                        view
                                                      </div>
                                                    </NavLink>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                    >
                                                      Duplicate
                                                    </a>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-lg-12">
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
                            </div> */}
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

export default Mentoring_Program;
