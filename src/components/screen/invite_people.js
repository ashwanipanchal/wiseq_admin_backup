import team_img from '../../img/tm1.png';
import search_img from '../../img/svg/search1.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const data = [
    { id: 1, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 2, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 3, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 4, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 5, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
];

function Invite_People() {

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
                <div className="blog-page2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Invite</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                    <img src={search_img} alt="search" className="svg" />
                                    <input className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Search here..." aria-label="Search" />
                                </div>
                            </div>

                            <div className="col-md-12 mb-15">
                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                    <div className="media-body d-flex align-items-center">
                                        <img src={team_img} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                        <div>
                                            <h6 className="fw-500">Anika Schleifer</h6>
                                            <p className="fs-12 color-light mb-0">Senior Director - Human Resources</p>
                                        </div>
                                    </div>
                                    <button class="btn px-15 btn-primary">Invite</button>
                                </div>
                            </div>

                            <div className="col-md-12 mb-15">
                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                    <div className="media-body d-flex align-items-center">
                                        <img src={team_img} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                        <div>
                                            <h6 className="fw-500">Anika Schleifer</h6>
                                            <p className="fs-12 color-light mb-0">Senior Director - Human Resources</p>
                                        </div>
                                    </div>
                                    <button class="btn btn-outline-disabled px-15">Invited</button>
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

export default Invite_People;
