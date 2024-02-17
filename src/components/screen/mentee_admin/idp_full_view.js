import clock_img from '../../../img/mentoring_pro.svg';
import resources_img from '../../../img/programs.png';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import moment from 'moment';

function Idp_Full_View() {
    const {state} = useLocation()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullDetails, setFullDetails] = useState({})
    const [initial, setInitial] = useState("")
    const [comment, setComment] = useState("")
    const [signOffID, setSignOffID] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0);
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

    const handleSelect = index => {
      setSelectedIndex(index)
      // this.setState({ selectedIndex: index });
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const paymentShow = () => setShow(true);

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    useEffect(() => {
        getFullDetail()
    },[])

    const getFullDetail = async() => {
        const body = {
            "idp_id": state?.id
        }
        const token = await localStorage.getItem("program_token_node")
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/idpdetails`, {
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


  const submitSignOff = async() => {
    const body = {
            "id": signOffID,
            "intials_by_user": initial
    }
    console.log(body)
    const token = await localStorage.getItem("program_token_node")
    const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/signofffrom`, {
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
        alert("SignOff successfully")
        getFullDetail()
        handleClose()
    }else{
    }    
}

  const sendComment = async() => {
    const body = 
    {
      "idp_id": signOffID,
      "comments": comment,
      "role": "mentee"
  }
    console.log(body)
    const token = await localStorage.getItem("program_token_node")
    const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/addcomments`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": token,
        },
        body:JSON.stringify(body)
    })
    const response = await res.json()
    console.log("comment feedback res", response)
    if(response.success){
    //   setIDPList(response.allidps)
        alert("Comment sent successfully")
        getFullDetail()
        closeModal()
    }else{
    }    
}


    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded"
        >
          <div className="demo5 mt-30 mb-25">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          Individual Development Plan
                        </h4>
                      </div>
                    </div>
                    {state?.mentorlist[selectedIndex]?.status == 1 &&(
                    <div class="layout-button">
                        {/* <button type="button" className="btn btn-outline-petrol btn-default btn-squared" onClick={showModal}>Give Feedback</button> */}
                        <button type="button" className="btn btn-light-petrol btn-squared color-primary" onClick={() => {
                          showModal()
                          setSignOffID(state?.mentorlist[selectedIndex]?.id)
                          }}>Add Comments</button>
                    </div>
                    ) }
                    
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card card-default card-md">
                    <div className="">
                      <div className="tab-wrapper">
                        <div className="dm-tab tab-horizontal">
                          <Tabs selectedIndex={selectedIndex}
                                                        onSelect={handleSelect}>
                            <TabList className="nav nav-tabs vertical-tabs">
                              {fullDetails &&
                                fullDetails?.mentorlist?.map((i) => {
                                  console.log(i)
                                  return(
                                  <Tab>{i?.user_meta?.name}</Tab>
                                )})}
                              {/* <Tab>Programs in Progress</Tab>
                                                        <Tab>Programs Completed</Tab> */}
                            </TabList>

                            {fullDetails &&
                              fullDetails?.mentorlist?.map((i) => (
                                <TabPanel className="tab-content">
                                  <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                      <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                                          IDP Name
                                        </p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                                          {fullDetails?.idp?.name}
                                        </p>
                                      </div>

                                      <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                                          Mentor Name
                                        </p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                                        {i?.user_meta?.name}
                                        </p>
                                      </div>

                                      <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                                          Experience Gaps
                                        </p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                                          {fullDetails?.idp?.experience_gaps}
                                        </p>
                                      </div>

                                      <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                                          Development Activity
                                        </p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                                        {fullDetails?.idp?.devleopment_activity}
                                        </p>
                                      </div>

                                      <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                                          Start Date
                                        </p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                                        {moment(
                                            fullDetails?.idp?.start_date
                                            ).format("DD/MM/YY")}
                                        </p>
                                      </div>

                                      <div className="col-md-12 mb-20">
                                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                                          Support/Resource
                                        </p>
                                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                                        {fullDetails?.idp?.support_resources}
                                        </p>
                                      </div>
                                    </div>
                                        
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-12 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">
                                            Program Name
                                          </p>
                                          <p className="color-dark fs-14 fw-300 align-center mb-0">
                                          {fullDetails?.programdetails?.name}
                                          </p>
                                        </div>

                                        <div className="col-md-12 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">
                                            Skills{" "}
                                          </p>
                                          {fullDetails?.idp?.skills?.split(",").map((i, index)=>(
                                            <span key={index} class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                                          {/* <ul className="d-flex flex-wrap user-group-people__parent">
                                            <span className="badge badge-square btn-outline-orange me-10">
                                              Public Speaking
                                            </span>
                                            <span className="badge badge-square btn-outline-orange me-10">
                                              Business Presentation
                                            </span>
                                          </ul> */}
                                        </div>

                                        <div className="col-md-12 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">
                                            Development Objective
                                          </p>
                                          <p className="color-dark fs-14 fw-300 align-center mb-0">
                                          {fullDetails?.idp?.devleopment_objective}
                                          </p>
                                        </div>

                                        <div className="col-md-12 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">
                                            Measure
                                          </p>
                                          <p className="color-dark fs-14 fw-300 align-center mb-0">
                                          {fullDetails?.idp?.measures}
                                          </p>
                                        </div>

                                        <div className="col-md-12 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">
                                            End Date
                                          </p>
                                          <p className="color-dark fs-14 fw-300 align-center mb-0">
                                          {moment(
                                            fullDetails?.idp?.end_date
                                            ).format("DD/MM/YY")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr/>
                                {i?.status == 3 && (
                                <>
                                    <div className="col-md-12 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">
                                            Mentor Feedback
                                          </p>
                                          <p className="color-dark fs-14 fw-300 align-center mb-0">
                                          {i?.feedback}
                                          </p>
                                        </div>
                                        <div className="col-md-12">
                                        {/* <div className="mt-0"> */}
                                            {/* <button onClick={() => addMentorFun()} type="button" className="btn btn-primary btn-default btn-squared m-auto">Add</button> */}
                                            <button type="button" onClick={() =>{
                                              paymentShow()
                                              setSignOffID(i?.id)
                                              }} className="btn btn-light-petrol btn-default btn-squared">Sign Off</button>
                                        {/* </div> */}
                                    </div>
                                    </>
                                )}
                                {i?.status == 1 && (
                                  <>
                                  <hr/>
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                  <div className="row">
  
                                      <div className="col-md-12 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">Mentor Feedback</p>
                                          <p className="color-dark fs-14 fw-300 align-center mb-0">{i?.feedback}</p>
                                      </div>
                                      <div className="col-md-6 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">Mentor Signature</p>
  
                                          <div className='box' style={{backgroundColor:'#639FA5', width:'30px', height:'30px', borderRadius:"50%"}} >
                                          <p className=" fs-14 fw-600 text-center mb-0" style={{position:"relative", top:'15%', color:"#fff"}}>{i?.intials_by_givenuser}</p>
                                      </div>
                                      </div>
                                      <div className="col-md-6 mb-20">
                                          <p className="color-gray fs-14 fw-300 align-center mb-0">Your Signature</p>
                                          <div className='box' style={{backgroundColor:'#639FA5', width:'30px', height:'30px', borderRadius:"50%"}} >
                                          <p className="fs-14 fw-600 text-center mb-0" style={{position:"relative", top:'15%', color:"#fff"}}>{i?.intials_by_user}</p>
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
                                // <>
                                //     <div className="col-md-12 mb-20">
                                //           <p className="color-gray fs-14 fw-300 align-center mb-0">
                                //             Mentor Feedback
                                //           </p>
                                //           <p className="color-dark fs-14 fw-300 align-center mb-0">
                                //           {i?.feedback}
                                //           </p>
                                //         </div>
                                        
                                //         <div className="col-md-6 mb-20">
                                //         <p className="color-gray fs-14 fw-300 align-center mb-0">Your Signature</p>
                                //         <p className="color-dark fs-14 fw-300 align-center mb-0" style={{backgroundColor:'#639FA5'}}>{fullDetails?.idp?.intials_by_givenuser}</p>
                                //     </div>
                                //     <div className="col-md-6 mb-20">
                                //         <p className="color-gray fs-14 fw-300 align-center mb-0">Mentee Signature</p>
                                //         <p className="color-dark fs-14 fw-300 align-center mb-0">{fullDetails?.idp?.feedback}</p>
                                //     </div>
                                //     </>
                                )}
                                  
                                </TabPanel>
                              ))}

                            {/* <TabPanel>
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                    </TabPanel> */}
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Side_Bar
          onClick={toggle}
          sideBarOpen={
            windowSize.innerWidth > 768 && sideBarOpen
              ? true
              : windowSize.innerWidth > 768 && !sideBarOpen
              ? false
              : windowSize.innerWidth < 768 && sideBarOpen
              ? false
              : true
          }
        />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="mentee_feedback">
            <Modal.Title>Sign Off</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div class="col-md-12 mb-25">
                  <input
                    type="text"
                    value={initial}
                    onChange={(e) => setInitial(e.target.value)}
                    class="form-control ih-medium ip-gray radius-xs b-deep px-15"
                    placeholder="Write your Initials"
                  />
                </div>

                <div className="col-md-12">
                  <div className="mt-0">
                    {/* <NavLink className="navbar-link" to="/idp_approved"> */}
                      <button
                        type="button"
                        onClick={() =>{submitSignOff()}}
                        className="btn btn-light-petrol btn-default btn-squared m-auto"
                      >
                        Sign Off
                      </button>
                    {/* </NavLink> */}
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={showHello} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Write a Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div class="col-md-12 mb-25">
                  <textarea
                    class="form-control ip-gray radius-xs b-deep px-15"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Write..."
                  ></textarea>
                </div>

                <div className="col-md-12">
                  <div className="mt-0">
                    <button
                      type="button"
                      onClick={() => sendComment()}
                      className="btn btn-petrol btn-default btn-squared m-auto"
                    >
                      Send
                    </button>
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
