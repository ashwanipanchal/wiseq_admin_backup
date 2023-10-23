import program_img from '../../img/resour.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

function Program_Preview() {

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
                                <div className="breadcrumb-main user-member justify-content-sm-between ">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title program_par">Program Overview</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Name</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="High Potential Employee Mentoring Program" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Skills Covered</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Leadership Skills" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Objectives</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="To Develop leadership skills and efficiency skills.." />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Duration</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="8 months" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Type</label>
                                                    <div class="countryOption">
                                                        <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option selected>One on One</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">No. of Sessions</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="16" />
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <label className="label_name">Program Summary</label>
                                                    <textarea class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."></textarea>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label for="formFile" class="form-label label_name">Program Photo</label>
                                                    <input class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label for="formFile" class="form-label label_name">Program Photo</label>
                                                    <img src={program_img} className="" />
                                                </div>

                                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Participation</h4>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Eligibility</label>
                                                    <div class="countryOption">
                                                        <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option selected>Pre-defined</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Max. no. of Mentees</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="20" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Max. no. of Mentors</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="20" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div className="form-group status-radio add-product-status-radio mb-20">
                                                        <label className="mb-10 label_name">Program Participation</label>
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

                                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Metrics</h4>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Growth Score for Mentees</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Impact Score for Mentors</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Define Evaluation Metrics</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Evaluation Metrics" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Define Recommended Learnings</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Learnings" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Define Recommended Assessments</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Assessments" />
                                                </div>

                                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Schedule</h4>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Start Date</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="1 Nov, 2022" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program End Date</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="1 Nov, 2022" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Cut off date for confirmation</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="1 Nov, 2022" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Proposed Graduation Date</label>
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="1 Nov, 2022" />
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        <NavLink className="navbar-brand" to="/mentoring_program"><button type="button" className="btn btn-primary btn-default btn-squared m-auto">Create Program</button></NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default Program_Preview;
