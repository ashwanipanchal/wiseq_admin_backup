import camera_img from '../../img/svg/camera.svg';
import author_logo from '../../img/author/hcl.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

function Edit_Profile() {

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
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="card-body py-md-30">
                                        <form>
                                            <div className="row">

                                                <div className="account-profile d-flex align-items-center mb-4 ">
                                                    <div className="ap-img pro_img_wrapper">
                                                        <input id="file-upload" type="file" name="fileUpload" className="d-none" />

                                                        <label for="file-upload">
                                                            <img src={author_logo} className="ap-img__main rounded-circle wh-120 bg-lighter d-flex" />
                                                            <span className="cross" id="remove_pro_pic">
                                                                <img src={camera_img} className="svg" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="account-profile__title">
                                                        <h6 className="fs-18 ms-20 fw-500 text-capitalize">Upload Organisation Logo</h6>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Org Name" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Head Quarters" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Founded" />
                                                </div>


                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option selected>Industry</option>
                                                            <option value="1">Abc</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Nature of Business" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Company Size" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option selected>Company Type</option>
                                                            <option value="1">Xyz</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Website" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Company Email" />
                                                </div>

                                                <div className="layout-button">
                                                    <div className="btn_center">
                                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Preview</button>
                                                        <button type="button" className="btn btn-primary btn-default btn-squared">save</button>

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

export default Edit_Profile;
