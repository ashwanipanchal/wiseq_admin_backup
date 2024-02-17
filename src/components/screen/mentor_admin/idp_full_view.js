import clock_img from '../../../img/mentoring_pro.svg';
import resources_img from '../../../img/programs.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import moment from 'moment';

function Idp_Full_View() {
    const {state} = useLocation()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullDetails, setFullDetails] = useState({})
    const [feedback, setFeedback] = useState("")
    const [initial, setInitial] = useState("")
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

    useEffect(() => {
        getFullDetail()
    },[])

    const getFullDetail = async() => {
        const body = {
            "id": state?.id
        }
        const token = await localStorage.getItem("program_token_node")
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/idpdetailsother`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": token,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("idp detail res", response)
        if(response.success){
        //   setIDPList(response.allidps)
        setFullDetails(response)
        }else{
        }
      
  }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const paymentShow = () => setShow(true);

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);


    const submitFeedback = async() => {
        const body = {
                "id": fullDetails?.idp?.id,
                "feedback":feedback
        }
        console.log(body)
        const token = await localStorage.getItem("program_token_node")
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/giveipdfeedback`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": token,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("idp feedback res", response)
        if(response.success){
        //   setIDPList(response.allidps)
            alert("Feedback has been added successfully")
            getFullDetail()
            closeModal()
        }else{
        }    
  }
    const submitApproval = async() => {
        const body = {
                "id": fullDetails?.idp?.id,
                "intials_by_givenuser": initial
        }
        console.log(body)
        const token = await localStorage.getItem("program_token_node")
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/approveidp`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": token,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("approved feedback res", response)
        if(response.success){
        //   setIDPList(response.allidps)
            alert("Approved successfully")
            getFullDetail()
            handleClose()
        }else{
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Individual Development Plan</h4>
                                        </div>
                                    </div>
                                    {fullDetails?.idp?.status == 0 && (
                                        <div class="layout-button">
                                            <button type="button" className="btn btn-outline-petrol btn-default btn-squared" onClick={showModal}>Give Feedback</button>
                                            <button type="button" className="btn btn-petrol btn-squared color-primary" onClick={paymentShow}>Approve</button>
                                        </div>
                                    )}
                                    {fullDetails?.idp?.status == 3 && (
                                        <div class="layout-button">
                                            {/* <button type="button" className="btn btn-outline-petrol btn-default btn-squared" onClick={showModal}>Give Feedback</button> */}
                                            <button type="button" className="btn btn-petrol btn-squared color-primary" >Add Comments</button>
                                        </div>
                                    )}
                                    

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">IDP Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.individual_development_plans?.name}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Jane Arora</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Experience Gaps</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.individual_development_plans?.experience_gaps}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Development Activity</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.individual_development_plans?.devleopment_activity}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Start Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(
                                            fullDetails?.idp?.individual_development_plans?.start_date
                                            ).format("DD/MM/YY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Support/Resource</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.individual_development_plans?.support_resources}</p>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row">

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.programdetails?.name}</p>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Skills </p>
                                        {fullDetails?.idp?.individual_development_plans?.skills?.split(",").map((i, index)=>(
                                            <span key={index} class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Development Objective</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.individual_development_plans?.devleopment_objective}.</p>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Measure</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.individual_development_plans?.measures}</p>
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">End Date</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(
                                            fullDetails?.idp?.individual_development_plans?.end_date
                                            ).format("DD/MM/YY")}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {fullDetails?.idp?.status == 1 && (
                            <>
                                <hr/>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row">

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Your Feedback</p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.feedback}</p>
                                    </div>
                                    <div className="col-md-6 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Your Signature</p>

                                        <div className='box' style={{backgroundColor:'#639FA5', width:'30px', height:'30px', borderRadius:"50%"}} >
                                        <p className=" fs-14 fw-600 text-center mb-0" style={{position:"relative", top:'15%', color:"#fff"}}>{fullDetails?.idp?.intials_by_givenuser}</p>
                                    </div>
                                    </div>
                                    <div className="col-md-6 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Signature</p>
                                        <div className='box' style={{backgroundColor:'#639FA5', width:'30px', height:'30px', borderRadius:"50%"}} >
                                        <p className="fs-14 fw-600 text-center mb-0" style={{position:"relative", top:'15%', color:"#fff"}}>{fullDetails?.idp?.intials_by_user}</p>
                                    </div>
                                        {/* <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.feedback}</p> */}
                                    </div>

                                    <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">Status</p>
                                        <p className="fs-14 fw-300 align-center mb-0" style={{color:'#639FA5'}}>Approved</p>
                                    </div>
                                    
                                </div>
                            </div>
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='mentor_feedback'>
                    <Modal.Title>Approve</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div class="col-md-12 mb-25">
                                <input value={initial} onChange={(e) => setInitial(e.target.value)} type="text" class="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Write your Initials" required/>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    {/* <NavLink className="navbar-link" to="/idp_approved"> */}
                                        <button type="button" onClick={() =>submitApproval()} className="btn btn-petrol btn-default btn-squared m-auto">Send Approval</button>
                                        {/* </NavLink> */}
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton className='mentor_feedback'>
                    <Modal.Title>Add Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="row">
                            <div class="col-md-12 mb-25">
                                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Write..." required></textarea>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="button" onClick={() => submitFeedback()} className="btn btn-petrol btn-default btn-squared m-auto">Send</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Idp_Full_View;
