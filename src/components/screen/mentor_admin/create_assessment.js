import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
function Create_Assessment() {

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
                                            <h4 className="fw-500 breadcrumb-title">Create a Assessment</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-12 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Title" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Growth Score" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option selected>Select Source</option>
                                                            <option value="1">Source 1</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Source Name" />
                                                </div>


                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Source Link" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Type" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option selected>Skill(s) Assessed</option>
                                                            <option value="1">Skill 1</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Duration" />
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <textarea class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="4" placeholder="Summary"></textarea>
                                                </div>


                                                <div className="col-md-6 mb-30">
                                                    <label for="formFile" class="form-label">Assessment Photo</label>
                                                    <input class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                </div>

                                                <div className="layout-button">
                                                    <div className="btn_center">
                                                        <NavLink className="navbar-link" to="/assessment_screen"><button type="button" className="btn btn-petrol btn-default btn-squared">Submit</button></NavLink>
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

export default Create_Assessment;
