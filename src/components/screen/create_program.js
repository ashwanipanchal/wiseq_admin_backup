import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import Side_Bar from './sidebar';
import { NavLink } from "react-router-dom";

function Create_Program() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Create Program</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card card-default card-md">
                                    <div className="">
                                        <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                                <Tabs>
                                                    <TabList className="nav nav-tabs vertical-tabs">
                                                        <Tab>Program Overview</Tab>
                                                        <Tab>Program Participation</Tab>
                                                        <Tab>Program Metrics</Tab>
                                                        <Tab>Program Schedule</Tab>
                                                    </TabList>

                                                    <TabPanel className="tab-content">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Program Name" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <div className="countryOption">
                                                                                        <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                            <option selected>Skills Covered</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Program Objectives" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Duration" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <div className="countryOption">
                                                                                        <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                            <option selected>Program Type</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="No. of Sessions" />
                                                                                </div>

                                                                                <div className="col-md-12 mb-25">
                                                                                    <textarea class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Program Summary"></textarea>
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <label for="formFile" className="form-label">Upload Photo</label>
                                                                                    <input className="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                                                </div>

                                                                                <div className="col-md-12">
                                                                                    <div className="mt-0">
                                                                                        <button type="button" className="btn btn-primary btn-default btn-squared m-auto">Next</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
                                                                                    <div className="countryOption">
                                                                                        <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                            <option selected>Eligibility</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Number of Mentees" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Number of Mentors" />
                                                                                </div>

                                                                                <div className="col-md-12 mb-25">
                                                                                    <div className="form-group status-radio add-product-status-radio mb-20">
                                                                                        <label className="mb-10">Program Participation </label>
                                                                                        <div className="d-flex">
                                                                                            <div className="radio-horizontal-list d-flex flex-wrap">
                                                                                                <div className="radio-theme-default custom-radio ">
                                                                                                    <input className="radio" type="radio" name="radio-optional" id="radio-hl1" />
                                                                                                    <label for="radio-hl1">
                                                                                                        <span className="radio-text">Mandatory</span>
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="radio-theme-default custom-radio ">
                                                                                                    <input className="radio" type="radio" name="radio-optional" id="radio-hl2" />
                                                                                                    <label for="radio-hl2">
                                                                                                        <span className="radio-text">Optional</span>
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="layout-button">
                                                                                    <div className="btn_center">
                                                                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Previous</button>
                                                                                        <button type="button" className="btn btn-primary btn-default btn-squared">Next</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Growth Score for Mentees" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Impact Score for Mentors" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Evaluation Metrics" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Learnings" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Assessments" />
                                                                                </div>

                                                                                <div className="layout-button">
                                                                                    <div className="btn_center">
                                                                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Previous</button>
                                                                                        <button type="button" className="btn btn-primary btn-default btn-squared">Next</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Program Start Date" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Program End Date" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Cut off date for confirmation" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Proposed Graduation Date" />
                                                                                </div>

                                                                                <div className="layout-button">
                                                                                    <div className="btn_center">
                                                                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Previous</button>
                                                                                        <NavLink className="navbar-link" to="/program_preview"><button type="button" className="btn btn-primary btn-default btn-squared">Preview & Create</button></NavLink>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
        </div>

    );
}

export default Create_Program;
