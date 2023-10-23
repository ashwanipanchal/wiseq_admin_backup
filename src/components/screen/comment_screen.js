import team_img from '../../img/tm1.png';
import send_img from '../../img/send_btn.svg';
import Side_Bar from './sidebar';
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const data = [
    { id: 1, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources", community_heading: "What is Lorem Ipsum?", community_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", community_react: "10 react", community_comment: "7 comments" },
    { id: 2, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources", community_heading: "What is Lorem Ipsum?", community_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", community_react: "10 react", community_comment: "7 comments" },
];

function Comment_Screen() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Comments(7)</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-lg-12">
                                <div className="ticket-chat-wrapper">
                                    <div className="ticket-search-body">
                                        <ul className="ticket-user-list pe-15">
                                            <li className="ticket-user-list-item">
                                                <div className="ticket-user-list-item__wrapper">
                                                    <div className="avatar avatar-circle ms-0">
                                                        <img src={team_img} className="rounded-circle  d-flex bg-opacity-primary" />
                                                    </div>
                                                    <div className="ticket-users-list-body">
                                                        <div className="ticket-users-list-body-title">
                                                            <div className="text-limit" data-maxlength="10">
                                                                <p className="mb-0">Hello Santosh, <br /> I reviewed the case study and was wondering if there was any more pre-study that you wanted me to do before our next session?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="last-chat-time unread ms-45">
                                                    <small>09:30 pm</small>
                                                </div>
                                            </li>

                                            <li className="ticket-user-list-item">
                                                <div className="ticket-user-list-item__wrapper">
                                                    <div className="avatar avatar-circle ms-0">
                                                        <img src={team_img} className="rounded-circle  d-flex bg-opacity-primary" />
                                                    </div>
                                                    <div className="ticket-users-list-body">
                                                        <div className="ticket-users-list-body-title">
                                                            <div className="text-limit" data-maxlength="10">
                                                                <p className="mb-0">Hello Santosh, <br /> I reviewed the case study and was wondering if there was any more pre-study that you wanted me to do before our next session?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="last-chat-time unread ms-45">
                                                    <small>09:30 pm</small>
                                                </div>
                                            </li>

                                            <li className="ticket-user-list-item">
                                                <div className="ticket-user-list-item__wrapper">
                                                    <div className="avatar avatar-circle ms-0">
                                                        <img src={team_img} className="rounded-circle  d-flex bg-opacity-primary" />
                                                    </div>
                                                    <div className="ticket-users-list-body">
                                                        <div className="ticket-users-list-body-title">
                                                            <div className="text-limit" data-maxlength="10">
                                                                <p className="mb-0">Hello Santosh, <br /> I reviewed the case study and was wondering if there was any more pre-study that you wanted me to do before our next session?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="last-chat-time unread ms-45">
                                                    <small>09:30 pm</small>
                                                </div>
                                            </li>

                                            <li className="ticket-user-list-item">
                                                <div className="ticket-user-list-item__wrapper">
                                                    <div className="avatar avatar-circle ms-0">
                                                        <img src={team_img} className="rounded-circle  d-flex bg-opacity-primary" />
                                                    </div>
                                                    <div className="ticket-users-list-body">
                                                        <div className="ticket-users-list-body-title">
                                                            <div className="text-limit" data-maxlength="10">
                                                                <p className="mb-0">Hello Santosh, <br /> I reviewed the case study and was wondering if there was any more pre-study that you wanted me to do before our next session?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="last-chat-time unread ms-45">
                                                    <small>09:30 pm</small>
                                                </div>
                                            </li>

                                            <li className="ticket-user-list-item">
                                                <div className="ticket-user-list-item__wrapper">
                                                    <div className="avatar avatar-circle ms-0">
                                                        <img src={team_img} className="rounded-circle  d-flex bg-opacity-primary" />
                                                    </div>
                                                    <div className="ticket-users-list-body">
                                                        <div className="ticket-users-list-body-title">
                                                            <div className="text-limit" data-maxlength="10">
                                                                <p className="mb-0">Hello Santosh, <br /> I reviewed the case study and was wondering if there was any more pre-study that you wanted me to do before our next session?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="last-chat-time unread ms-45">
                                                    <small>09:30 pm</small>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="ticket-search-header">
                                        <form action="" className="d-flex align-items-center">

                                            <input className="form-control me-sm-2 border-0 box-shadow-none" type="search" placeholder="write a comment..." aria-label="Search" />
                                            <button type="button" className="border-0 btn-white wh-50 p-10 rounded-circle">
                                                <img src={send_img} className="svg" />
                                            </button>
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

export default Comment_Screen;
