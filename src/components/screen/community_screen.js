import community_img from '../../img/community.png';
import keeping_img from '../../img/keeplearning.png';
import team_img from '../../img/tm1.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const data = [
    { id: 1, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "Anika Schleifer" },
    { id: 2, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "Anika Schleifer" },
    { id: 3, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "Anika Schleifer" },
];

const data1 = [
    { id: 1, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "Anika Schleifer" },
    { id: 2, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "Anika Schleifer" },
    { id: 3, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "Anika Schleifer" },
];

function Community_Screen() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">My Community</h4>
                                        </div>
                                    </div>
                                    {/* <div className="action-btn">
                                        <NavLink className="navbar-brand" to="/Create_Community"><div className="btn px-15 btn-primary">Create Community</div></NavLink>
                                    </div> */}
                                </div>
                            </div>

                            {/* {data.map((user) => (
                                <div class="col-lg-4 col-sm-12 col-md-12 mb-25">
                                    <div class="blog-card blog-card--2 box_shadow1">
                                        <div class="blog-card__thumbnail">
                                            <a href="#">
                                                <img src={community_img} />
                                            </a>
                                        </div>
                                        <div class="blog-card__details pt-1 pb-20 px-20">
                                            <div class="blog-card__content">
                                                <h4 class="blog-card__title">
                                                    <NavLink className="entry-title" to="/community_profile">{user.community_name}</NavLink>
                                                </h4>
                                            </div>
                                            <div class="blog-card__meta">
                                                <div class="blog-card__meta-profile">

                                                    <img src={team_img} />
                                                    <span>{user.author_name}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            ))}

                            <div className="col-lg-12">
                                <h4 class="text-capitalize fw-500 mb-20">Requests</h4>
                            </div>

                            {data1.map((user) => (
                                <div class="col-lg-4 col-sm-12 col-md-12 mb-25">
                                    <div class="blog-card blog-card--2 box_shadow1">
                                        <div class="blog-card__thumbnail">
                                            <img src={keeping_img} />
                                        </div>
                                        <div class="blog-card__details pt-1 pb-20 px-20">
                                            <div class="blog-card__content">
                                                <h4 class="blog-card__title">
                                                    <NavLink className="entry-title" to="/community_detail">{user.community_name}</NavLink>
                                                </h4>
                                            </div>
                                            <div class="blog-card__meta pb-10">
                                                <div class="blog-card__meta-profile">
                                                    <img src={team_img} />
                                                    <span>{user.author_name}</span>
                                                </div>
                                            </div>

                                            <div class="layout-button">
                                                <button type="button" class="btn btn-decline btn-default btn-squared flex-grow-1">Decline</button>
                                                <button type="button" class="btn btn-approve btn-default btn-squared flex-grow-1">Approve</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))} */}
                            <div className="col-lg-12">
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
                                                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Community_Screen;
