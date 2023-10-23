import resources_img from '../../../img/programs.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink,useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import { BASE_URL } from '../../../services/Config';

function Created_Learning_Profile() {
    const {state} = useLocation()
    console.log(state)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [learningDetails, setLearningDetails] = useState({})
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

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    useEffect(() => {
        getProfile()
    },[])
    
    const getProfile = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state.id}/template-details`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("learning profile", response)
        if(response.success){
            setLearningDetails(response.data)
        }
    }

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
                                            <h4 className="fw-500 breadcrumb-title">{learningDetails && learningDetails.learningName}</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <NavLink className="navbar-link" to="/create_learning"><button type="button" class="btn btn-petrol btn-default btn-squared">Edit</button></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="">
                                    <div className="blog-details-thumbnail mb-25">
                                        <img src={learningDetails.learningImg} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12">

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Summary</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.summary}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.growthScore}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceType}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceName}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Link</p>
                                    <p style={{textDecoration:'underline',cursor:'pointer',}} onClick={() => window.open(learningDetails.sourceLink, "_blank")} className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceLink}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skill(s) Addressed</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        {learningDetails && learningDetails.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                                        {/* <span class="badge badge-square btn-outline-orange me-10">Presentation Skill</span> */}
                                    </ul>
                                </div>

                                {/* <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finish by</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(learningDetails.finishBy).format("DD MMMM YYYY")}</p>
                                </div> */}

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Duration</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.duration}{learningDetails && learningDetails.durationType?.charAt(0).toUpperCase() + learningDetails.durationType?.slice(1)}</p>
                                </div>

                                {/* <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.duration}</p>
                                </div> */}

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Learning’s Rating</p>
                                    {/* <span className="badge badge-round btn-petrol mt-10">4.5 <i className="lar la-star user_star"></i></span> */}
                                </div>



                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Mentees</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select Program</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select by function</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option selected>Select by Level</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <input type="date" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Finish By" />
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" className="btn btn-primary btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Created_Learning_Profile;
