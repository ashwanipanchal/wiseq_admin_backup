import resources_img from '../../../img/gifs/giphy.gif';
import pdf_img from '../../../img/pdf_file.svg';
import word_img from '../../../img/word.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Iframe from 'react-iframe';
import moment from 'moment'
import AgoraUIKit, { layout } from "agora-react-uikit";
import Countdown from "react-countdown";
import "agora-react-uikit/dist/index.css";
import Modal from 'react-bootstrap/Modal';
import { Rating } from 'react-simple-star-rating'
import { io } from "socket.io-client";
import record from '../../../img/record.png';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BASE_URL } from '../../../services/Config';

const styleProps = {
  // iconSize: 100,
  // theme: 'black',
  // videoMode: {
  //   max: VideoRenderMode.Hidden,
  //   min: VideoRenderMode.Hidden,
  // },
  // overlayContainer: {
  //   backgroundColor: '#2edb8533',
  //   opacity: 1,
  // },
  localBtnStyles: {
    // muteLocalVideo: btnStyle,
    // muteLocalAudio: btnStyle,
    // switchCamera: btnStyle,
    // endCall: {
    //   borderRadius: 0,
    //   width: 50,
    //   height: 50,
    //   backgroundColor: '#f66',
    //   borderWidth: 0,
    // },
    // video: {
    //   borderRadius: 0,
    //   width: 50,
    //   height: 50,
    //   backgroundColor: '#f66',
    //   borderWidth: 0,
    // },
  },
  localBtnContainer: {
    backgroundColor: '#72B8BF',
    // position:'absolute',
    bottom: 100,
    paddingVertical: 10,
    // border:'1px solid red'
    // height: 80,
  },
  // maxViewRemoteBtnContainer: {
  //   top: 0,
  //   alignSelf: 'flex-end',
  // },
  // remoteBtnStyles: {
  //   muteRemoteAudio: remoteBtnStyle,
  //   muteRemoteVideo: remoteBtnStyle,
  //   remoteSwap: remoteBtnStyle,
  //   minCloseBtnStyles: remoteBtnStyle,
  // },
  minViewContainer: {
    bottom: 80,
    top: 190,
    // backgroundColor: '#fff',
    // borderColor: '#2edb85',
    // borderWidth: 4,
    width: 100,
    height: 150,
  },
  minViewStyles: {
    height: '100%',
    width: 300,
  },
  // maxViewStyles: {
  //   height: '64%',
  // },
  // UIKitContainer: {height: '94%'},
  // UIKitContainer: {height: '100%', width: '50%'},
};

function Live_Session() {
  const handle = useFullScreenHandle();
    const {state} = useLocation()
    console.log(state)
    const navigate = useNavigate()
    const [notes, setNotes] = useState("");
    const [videoUrl, setVideoUrl] = useState('')
    const [videoCall, setVideoCall] = useState(true);
    const [fullSessionDetail, setFullSessionDetail] = useState({});
    const [isPinned, setPinned] = useState(false);
    const [showHello, setShowHello] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);


    // useEffect(() => {
      const joinChannel = async () => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
    
        const res = await fetch(`${BASE_URL}session-video-conference/${state.id}/join-session`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("cannel Join Succusfully", response)
        if(response.success){
          setRecordingStatus(response.data.isRecordingOn)
        }
      }
      
      
    // },[])

    useEffect(() => {
      const socket = io("https://api.wiseqglobal.com",{
        transport:["websocket"],
        auth: {
            token: localStorage.getItem("token")
        }
      });
      socket.on('connect', () => {
        console.log('socket connected');
        joinChannel()
        socket.on("recording_started", res => {
          if(res){
            console.log(res)
            setRecordingStatus(true)
          }
        })
      });
      socket.on('connect_error', err => {
        console.log(err);
      });
      socket.on('session_end', res => {
        console.log("session end recieved from socket==", res);
        if(res){
          setVideoCall(false)
          showModal()
        }
      });
    },[])
    const rtcProps = {
    //   appId: "27175970298b42c1af98b752b90bd718",
    //   channel: "test", // your agora channel
      appId: "f33de5256ce7490e8bd38f042ce9afe0",
      channel: state.id,
      token: null, // use null or skip if using app in testing mode
      layout: isPinned ? layout.pin : layout.grid,
      enableScreensharing: true,
    };
    const callbacks = {
      EndCall: () => {
        handle.exit()
        // alert("hi")
          setVideoCall(false)
          showModal()
      }
    };
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
      getSessionProfile()
        function handleWindowResize() {
            setWindowSize(getWindowSize());
            // console.log(getWindowSize())
        }
        
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const getSessionProfile = async() => {
      const token = await localStorage.getItem("token")
      const btoken = `Bearer ${token}`;
  
      const res = await fetch(`${BASE_URL}session/profile/${state.id}`, {
          method: 'GET',
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
          },
      })
      const response = await res.json()
      console.log("sessionnnn Full Detail", response)
      if(response.success){
        setNotes(response.data.notes != null ? response.data.notes : "")
      // setActionss(response.data.actionsAgreedOn != null ? response.data.actionsAgreedOn : "")
        setFullSessionDetail(response.data)
      }
    }

    const [rating1, setRating1] = useState(0)
    const [rating2, setRating2] = useState(0)
    const [rating3, setRating3] = useState(0)
    const [feedbackText, setfeedbackText] = useState("")

    // Catch Rating value
    const handleRating1 = (rate) => {
        setRating1(rate)
        // other logic
    }
    const handleRating2 = (rate) => {
        setRating2(rate)
        // other logic
    }
    const handleRating3 = (rate) => {
        setRating3(rate)
        // other logic
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value, index) => console.log(value, index)

    const updateFeedback = async () => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const body =
        {
            "feedbackFor": state.sessionUsers[0].id,
            "contentQuality": rating1,
            "metObjective": rating2,
            "mentorSkill": rating3,
            "feedbackText": feedbackText
        }
        // console.log(body)
        // return
        const res = await fetch(`${BASE_URL}session/mentee-feedback/${state.id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            navigate(-1)
        }
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a complete state
          return (
            <div className="col-lg-12 col-12">
              {videoCall ? 
              (
                <>
                <div class="layout-button">
                  {recordingStatus ? 
                  <button
                        
                        type="button"
                        className="btn btn-outline-petrol btn-squared color-petrol px-15"
                      >
                        <img src={record}/>
                        {"Recording"}
                        
                      </button> : null}
                        {/* <button
                          type="button"
                          className="btn btn-outline-petrol btn-squared color-petrol px-15"
                        >
                          Assign a Learning
                        </button> */}
                        {/* <button
                          type="button"
                          className="btn btn-outline-light-petrol btn-squared color-petrol px-15"
                        >
                          Recording
                        </button> */}
                        <button
                          type="button"
                          onClick={() => setPinned(!isPinned)}
                          className="btn btn-light-petrol btn-squared color-primary px-15 ment_btn"
                        >
                          Change Layout
                        </button>
                        <button
                      type="button"
                      // onClick={() => setFullScreen(!fullScreen)}
                      onClick={handle.enter}
                      className="btn btn-light-petrol btn-squared color-primary px-15"
                    >
                      Full Screen
                    </button>
                      </div>
                      <FullScreen handle={handle}>
                      <div style={{ display: "flex", width: "100%", height: handle.active ? windowSize.innerHeight : "600px", marginBottom:'25px', marginTop:'15px' }}>
                      <AgoraUIKit
                        rtcProps={rtcProps}
                        styleProps={styleProps}
                        rtmProps={{
                          username: localStorage.getItem("user_info"),
                          displayUsername: true,
                        }}
                        callbacks={callbacks}
                      />
                    </div>
                    </FullScreen>
                    </>
              ) :null}
            </div>
          );
        } else {
          // Render a countdown
          return (
            // <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', backgroundColor: 'black', padding: '10px' }}>
            //     <h5 style={{ color: 'white' }}>Session Start In</h5>
            //     <span >
            //         {days}:{hours}:{minutes}:{seconds}
            //     </span>
            // </div>
            <div className="col-lg-12 col-12">
              <div className="">
                <div className="blog-details-thumbnail mb-25">
                  <img src={resources_img} />
                </div>
              </div>
              <div style={{position:'relative', bottom:'35%'}}>
              <div style={{ position: 'absolute', top: '0%', right: '14px', width: '250px' }}>
              <div
                style={{
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "bold",
                  backgroundColor: "#00000080",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <h5
                  style={{ color: "white", fontSize: "14px", marginBottom: "10px" }}
                >
                  Session Start In
                </h5>
                <div className="time_para">
                  <span>
                    {days} <p className="hours">Days</p>
                  </span>{" "}
                  <span>
                    {hours} <p className="hours">Hours</p>
                  </span>{" "}
                  <span>
                    {minutes} <p className="hours">Minutes</p>
                  </span>{" "}
                  <span>
                    {seconds} <p className="hours">Seconds</p>
                  </span>
                </div>
              </div>
              </div>
              </div>
              
            </div>
          );
        }
      };

      const saveNotes = async () => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
      
        const body = {
            notes 
        }
        console.log(body)
        // return
        const res = await fetch(`${BASE_URL}session/add-notes/${state.id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        console.log(response)
        if(response.success){
          alert("Notes Saved")
        }
      
      }

      function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded"
        >
          <div className="blog-page2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          Session scheduled on{" "}
                          {moment(fullSessionDetail.scheduleTime).format(
                            "ddd, MMM DD, YYYY"
                          )}
                          {moment(fullSessionDetail.scheduleTime).format(" hh:mm  ")}{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <Countdown
                  date={new Date(fullSessionDetail.scheduleTime)}
                  renderer={renderer}
                />

                <div className="col-lg-6 col-md-12 col-sm-12">
                  <h5 className="text-capitalize fw-500 mb-15">
                    Session Number #{fullSessionDetail.sessionNumber}
                  </h5>
                  <h5 className="text-capitalize fw-500 mb-15">
                  {fullSessionDetail && ordinal_suffix_of(fullSessionDetail.withSessionNumber)} session with {state.sessionUsers[0]?.name || ""}
                    {/* 3rd session with {fullSessionDetail.sessionUsers[0]?.name} */}
                  </h5>
                  <h5 className="text-capitalize fw-500 mb-15">
                    Session Overview
                  </h5>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Session Objective
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                    {fullSessionDetail.objective}
                  </p>
                    {/* <p className="color-dark fs-14 fw-300 align-center mb-0">
                      Discuss casestudy findings
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      Quick review of ammended Gap Analysis Questionaire
                    </p> */}
                  </div>

                  <h5 class="text-capitalize fw-500 mb-20">Notes</h5>
                  <div className="col-md-12 mb-25">
                    <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                      class="form-control ip-gray radius-xs b-deep px-15"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      placeholder="Notes"
                    ></textarea>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div class="layout-button">
                      <button
                        onClick={() => {
                          saveNotes();
                        }}
                        type="button"
                        class="btn btn-light-petrol btn-squared color-primary px-15 mb-20 ment_btn"
                      >
                        Save
                      </button>
                      {/* <button type="button" className="btn btn-outline-petrol btn-squared color-primary px-15">Assign a Learning</button>
                                        <button type="button" className="btn btn-outline-petrol btn-squared color-primary px-15">Request Worksheet</button>
                                        <button type="button" className="btn btn-petrol btn-squared color-primary px-15">Assign an Assessment</button> */}
                    </div>
                  </div>

                  <h5 className="text-capitalize fw-500 mb-15 mt-20">
                    Actions Agreed On 
                  </h5>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                    The action items that both you and your mentor agreed on for 
                    you to finish prior to the next session, will be filled by your mentor. 
                    You would be able to view this by accessing this session under
                    past sessions.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12">
                  <h5 className="text-capitalize fw-500 mb-15">
                    Previous Session {fullSessionDetail.hasOwnProperty('previousSession') ? new Date(fullSessionDetail.previousSession?.scheduleTime).toDateString() : "(Details Not Available)"}
                  </h5>
                  <h5 className="text-capitalize fw-500 mb-15">
                    Session Number #{fullSessionDetail.previousSession?.sessionNumber}
                  </h5>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Notes
                    </p>
                    {fullSessionDetail.previousSession?.notes}
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Actions Agreed On
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                    {fullSessionDetail.previousSession?.actionsAgreedOn}
                    </p>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Skills Mentored
                    </p>
                    <ul class="d-flex flex-wrap user-group-people__parent">
                      <span class="badge badge-square btn-outline-orange me-10">
                        {fullSessionDetail.previousSession?.skills}
                      </span>
                    </ul>
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Feedback Given
                    </p>
                    {fullSessionDetail &&
                        fullSessionDetail.previousSession?.feedbacksGiven?.length > 0 ? (
                          <p className="color-dark fs-14 fw-300 align-center mb-0">
                            {fullSessionDetail.previousSession?.feedbacksGiven[0].feedback}
                          </p>
                        ) : null}
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Feedback Received
                    </p>
                    {fullSessionDetail &&
                        fullSessionDetail.previousSession?.feedbacksRecieved?.length > 0 ? (
                          <p className="color-dark fs-14 fw-300 align-center mb-0">
                            {fullSessionDetail.previousSession?.feedbacksRecieved[0].feedback}
                          </p>
                        ) : null}
                  </div>

                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-2">
                      Worksheet/assignment uploaded
                    </p>
                    {fullSessionDetail &&
                          fullSessionDetail.previousSession?.worksheets?.map((i) => {
                            console.log(i);
                            if (i.submissions.length > 0) {
                              console.log("here");
                              let t = i.submissions.map((i) => (
                                <div className="row">
                                  <div className="col-md-6">
                                    <div onClick={()=> window.open(i.file, "_blank")} className="blog-details-meta">
                                      <img src={word_img} className="me-10" />
                                      <span className="color-dark">
                                        {i.file}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ));
                              return t;
                            }
                          })}
                  </div>
                  <div className="col-md-12">
                    <button
                      type="button"
                      onClick={() => navigate("/calender")}
                      class="btn btn-light-petrol btn-default btn-squared w-100 ment_btn"
                    >
                      Schedule Next Session
                    </button>
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
        <Modal show={showHello} onHide={closeModal}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 class="text-capitalize fw-600 mb-20">
                Rate the Quality of Content shared by{" "}
                {state.sessionUsers[0]?.name}.
              </h5>
              <Rating
                onClick={handleRating1}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
              <h5 class="text-capitalize fw-600 mb-20 mt-20">
                Was the session objective met?
              </h5>
              <Rating
                onClick={handleRating2}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
              <h5 class="text-capitalize fw-600 mb-20 mt-20">
                Rate the mentoring skills of {state.sessionUsers[0]?.name}
              </h5>
              <Rating
                onClick={handleRating3}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
              {/* <div class="layout-button justify-content-center">
                            <button onClick={() => closeModal()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => { }} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                        </div> */}
            </div>

            <h6 class="text-capitalize fw-600 mb-10 mt-25">
              Do you have any feedback for {state.sessionUsers[0]?.name}?
            </h6>
            <textarea
              value={feedbackText}
              onChange={(e) => setfeedbackText(e.target.value)}
              class="form-control ip-gray radius-xs b-deep px-15"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder=""
            ></textarea>

            <center>
              <button
                onClick={() => updateFeedback()}
                type="button"
                className="btn btn-light-petrol btn-squared color-primary px-15 mt-20"
              >
                Submit
              </button>
            </center>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default Live_Session;
