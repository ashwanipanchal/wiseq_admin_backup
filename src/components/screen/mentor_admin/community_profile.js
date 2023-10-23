import team_img from '../../../img/tm1.png';
import smile_img from '../../../img/smile.svg';
import userdefault_img from '../../../img/user_default.svg';
import dot_img from '../../../img/dot.svg';
import comment_img from '../../../img/comments.svg';
import communitys_img from '../../../img/community_profile.png';
import circlecheck_img from '../../../img/circle_check.svg';
import circleclose_img from '../../../img/circle_close.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const data = [
    { id: 1, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources", community_heading: "What is Lorem Ipsum?", community_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", community_react: "10 react", community_comment: "7 comments" },
    { id: 2, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources", community_heading: "What is Lorem Ipsum?", community_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", community_react: "10 react", community_comment: "7 comments" },
];

function Community_Profile() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Community Name</h4>
                                        </div>
                                    </div>

                                    <div className="layout-button">
                                        <NavLink className="" to="/invite_people"><button type="button" className="btn btn-outline-petrol btn-squared color-primary">Invite</button></NavLink>
                                        <NavLink className="" to="/create_post"><button type="button" className="btn btn-petrol btn-default btn-squared">Create Post</button></NavLink>
                                    </div>

                                </div>

                                <ul className="blog-details-meta">
                                    <li className="blog-author">

                                        <img src={userdefault_img} className="wh-10 me-10" />
                                        <span className="admin_name">Jane Arora</span>

                                    </li>
                                    <li className="cate-tag1">
                                        <img src={dot_img} className="me-10" />
                                        <NavLink className="" to="/member_list"><span className="admin_name">100 Members</span></NavLink>

                                    </li>
                                </ul>

                            </div>

                        </div>

                        <div className="row">
                            <div className="col-lg-7 col-md-12 col-sm-12">

                                {data.map((user) => (

                                    <div className="blog-card box_shadow1 mb-25">
                                        <div className="blog-card__meta mb-20">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={team_img} className="me-20 wh-60 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <h4 className="fw-500">{user.community_name}</h4>
                                                    <p className="fs-13 color-light mb-0">{user.author_name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="blog-card__details">
                                            <div className="blog-card__content">
                                                <h4 className="blog-card__title">
                                                    <a href="#" className="entry-title">{user.community_heading}</a>
                                                </h4>
                                                <p>{user.community_para}</p>
                                            </div>
                                        </div>

                                        <div className="blog-card__thumbnail mb-20">
                                            <img src={communitys_img} />
                                        </div>

                                        <div className="blog-card__meta-count">
                                            <ul>
                                                <li>
                                                    <div className="blog-card__meta-reaction">
                                                        <img src={smile_img} className="svg" />
                                                        <NavLink className="" to="/people_react"><span className="blog-card__meta-reaction-like">{user.community_react}</span></NavLink>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="blog-card__meta-doc-wrapper">
                                                        <img src={comment_img} className="svg" />
                                                        <NavLink className="" to="/comment_screen"><span className="blog-card__meta-doc">{user.community_comment}</span></NavLink>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                ))}

                            </div>


                            <div className="col-lg-5 col-md-12 col-sm-12">
                                <div className="row">
                                    <h5 className="text-capitalize fw-600 mb-10">Community Description</h5>
                                    <p className="color-gray fs-14 fw-300 align-center mb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    <p className="color-sky fw-500 mb-15">Read More</p>
                                    <h5 className="text-capitalize fw-600 mb-20">Join Requests(4)</h5>
                                    <div className="col-md-12 mb-15">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={team_img} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <h6 className="fw-500">Anika Schleifer</h6>
                                                    <p className="fs-12 color-light mb-0">Senior Director - Human Resources</p>
                                                </div>
                                            </div>
                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                <li className="me-15">
                                                    <img src={circlecheck_img} className="svg" />
                                                </li>

                                                <li>
                                                    <img src={circleclose_img} className="svg" />
                                                </li>

                                            </ul>
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
                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                <li className="me-15">
                                                    <img src={circlecheck_img} className="svg" />
                                                </li>

                                                <li>
                                                    <img src={circleclose_img} className="svg" />
                                                </li>

                                            </ul>
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
                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                <li className="me-15">
                                                    <img src={circlecheck_img} className="svg" />
                                                </li>

                                                <li>
                                                    <img src={circleclose_img} className="svg" />
                                                </li>

                                            </ul>
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
                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                <li className="me-15">
                                                    <img src={circlecheck_img} className="svg" />
                                                </li>

                                                <li>
                                                    <img src={circleclose_img} className="svg" />
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                    <h5 className="text-capitalize fw-600 mt-20 mb-20">Administrator (2)</h5>

                                    <div className="col-md-12 mb-15">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={team_img} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <h6 className="fw-500">Anika Schleifer</h6>
                                                    <p className="fs-12 color-light mb-0">Senior Director - Human Resources</p>
                                                </div>
                                            </div>
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

export default Community_Profile;
