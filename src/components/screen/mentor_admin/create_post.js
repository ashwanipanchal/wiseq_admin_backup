import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

function Create_Post() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Create Post</h4>
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

                                                <div className="col-md-12 mb-20">
                                                    <textarea class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Description"></textarea>
                                                </div>

                                                <div className="col-md-6 mb-30">
                                                    <label for="formFile" className="form-label">Upload Photo</label>
                                                    <input className="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        <NavLink className="navbar-brand" to="/community_profile"><button type="button" className="btn btn-petrol btn-default btn-squared m-auto">Post</button></NavLink>
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

export default Create_Post;
