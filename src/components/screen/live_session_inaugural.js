import resources_img from "../../img/gifs/giphy.gif";
import pdf_img from "../../img/pdf_file.svg";
import word_img from "../../img/word.svg";
import exit_meeting from "../../img/exit_meeting.png";
import path from '../../img/Path.png';
import record from '../../img/record.png';
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Iframe from "react-iframe";
import AgoraUIKit, { layout } from "agora-react-uikit";
import Countdown from "react-countdown";
import "agora-react-uikit/dist/index.css";
import Modal from 'react-bootstrap/Modal';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rating } from 'react-simple-star-rating';
import { Rate } from 'antd';
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import moment from 'moment'
import { io } from "socket.io-client";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

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
    backgroundColor: '#006666',
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

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <FrownOutlined />,
  4: <FrownOutlined />,
  5: <MehOutlined />,
  6: <SmileOutlined />,
  7: <SmileOutlined />,
};
function Live_Session() {
  const handle = useFullScreenHandle();
  console.log(handle.active)
  const { state } = useLocation();
  const navigate = useNavigate()
  console.log(state);
  const [videoCall, setVideoCall] = useState(true);
  const [notes, setNotes] = useState("");
  const [actionss, setActionss] = useState("");
  const [fullSessionDetail, setFullSessionDetail] = useState({});
  const [prevScore, setPrevScore] = useState("");
  const [dateType, setDateType] = useState("text")
  const [worksheetName, setworksheetName] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [worksheetUrl, setworksheetUrl] = useState("")
  const [recordingSign, setrecordingSign] = useState(false)

  const [recordStatus, setRecordStatus] = useState(false)

  const [isPinned, setPinned] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const rtcProps = {
    // appId: "27175970298b42c1af98b752b90bd718",
    appId: "f33de5256ce7490e8bd38f042ce9afe0",
    channel: state?.session?.id, // your agora channel
    token: null, // use null or skip if using app in testing mode
    layout: isPinned ? layout.pin : layout.grid,
    enableScreensharing: true,
  };

  useEffect(() => {
    const socket = io("https://api.wiseqglobal.com",{
        transport:["websocket"],
        auth: {
            token: localStorage.getItem("token")
        }
      });
      socket.on('connect', () => {
        console.log('socket connected');
      });
      socket.on('connect_error', err => {
        console.log(err);
      });
      socket.on('session_end', res => {
        console.log("session recieved from socket==", res);
        // if(res){
        //     setnotificationValue(notificationValue + 1)
        //     getSessionRequest()
        // }
      });
  },[])

  useEffect(() => {
    window.onbeforeunload = function(e) {
     
      var dialogText = 'Dialog text here';
      e.returnValue = dialogText;
      return dialogText;
    }
  },[])
  const callbacks = {
    EndCall: () => {
      // setVideoCall(false)
      // showModal()
      handle.exit()
      showConfirmModal()
      // endCallAndRecording()
    }
  };
  const [videoUrl, setVideoUrl] = useState("");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const [showHello, setShowHello] = useState(false);
  const closeModal = () => {
    setShowHello(false)
    navigate(-1)
  };
  const showModal = () => setShowHello(true);

  const [showWorksheetModal, setshowWorksheetModal] = useState(false);
  const closeModal2 = () => setshowWorksheetModal(false);
  const showModal2 = () => setshowWorksheetModal(true);

  const [showCormfirm, setConfirmModal] = useState(false);
  const hideConfirm = () => setConfirmModal(false);
  const showConfirmModal = () => setConfirmModal(true);

  const [rating1, setRating1] = useState(0)
  const [rating2, setRating2] = useState(0)
  const [rating3, setRating3] = useState(0)
  const [numberRating, setNumberRating] = useState(0)
  const [feedbackText, setfeedbackText] = useState("")

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());
  function getWindowSize() {
    
    const { innerWidth, innerHeight } = window;
    // console.log(innerHeight)
    // console.log(window.screen.height)
    return { innerWidth, innerHeight };
  }
  function getWindowHeight() {
    return window.screen.height
  }
  useEffect(() => {
    // getSessionProfile()
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      // console.log(getWindowSize())
    }
    // getVideo()
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getSessionProfile = async() => {
    const token = await localStorage.getItem("program_token_node")
    // const btoken = `Bearer ${token}`;
    const body ={
      "session_id": state.session.id
  }
    const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}program-session-details`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": token,
        },
        body:JSON.stringify(body)
    })
    const response = await res.json()
    console.log("sessionnnn Full Detail", response)
    if(response.success){
      setFullSessionDetail(response.session[0])
      // setNotes(response.data.notes != null ? response.data.notes : "")
      // setActionss(response.data.actionsAgreedOn != null ? response.data.actionsAgreedOn : "")
      // if(response.data.pendingFeedbacks[0].hasOwnProperty('prevSkillRating')){
      //   setPrevScore(response.data?.pendingFeedbacks[0]?.prevSkillRating)
      // }else{
      //   setPrevScore(0)
      // }
    }
  }

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

    const body = {
        feedbackFor: fullSessionDetail.scheduler?.id,
        sessionParticipation: rating1,
        skillRating: parseInt(numberRating),
        feedbackText: feedbackText
    }
    console.log(body)
    // return
    const res = await fetch(`${BASE_URL}session/mentor-feedback/${state.id}`, {
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
      closeModal()
      navigate(-1)
        
    }
}

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

const saveActionss = async () => {
  const token = await localStorage.getItem("token")
  const btoken = `Bearer ${token}`;

  const body = {
    "actionsAgreedOn": actionss
  }
  console.log(body)
  // return
  const res = await fetch(`${BASE_URL}session/add-actions/${state.id}`, {
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
    alert("Action Agreed on Saved")
  }

}
// {recordStatus == true ? null : startCall()}
  const startCall = async() => {
    console.log("here")
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;


    const res = await fetch(`${BASE_URL}session-video-conference/${state?.session?.id}/start`, {
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        },
    })
    const response = await res.json()
    console.log(response)
    if(response.success){
      setRecordStatus(true)
    }
  } 

  const startRecord = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}session-video-conference/${state.id}/start-recording`, {
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        },
    })
    const response = await res.json()
    console.log(response)
    if(response.success){
      setrecordingSign(true)
    }
  } 
  const endCallAndRecording = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}session-video-conference/${state.id}/end-session`, {
        method: 'PUT',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        },
    })

    const response = await res.json()
    console.log(response)
    if(response.success){
      hideConfirm()
      showModal()
      // navigate(-1)
    }
  } 

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    // console.log(days)
    // console.log(hours)
    // console.log(minutes)
    // console.log(seconds)
    if (completed) {
      // Render a complete state
      startCall()
      return (
        <div className="col-lg-12 col-12" style={{marginLeft : fullScreen && "0px", marginRight: fullScreen && "0px", paddingLeft: fullScreen && "0px", paddingRight: fullScreen && "0px"}}>
          
          {videoCall ? 
          (
            <>
            {fullScreen ? null :
            <div class="layout-button">
                    {/* <button
                      type="button"
                      className="btn btn-outline-petrol btn-squared color-petrol px-15"
                    >
                      Assign a Learning
                    </button> */}
                    <button
                      onClick={()=> startRecord()}
                      type="button"
                      className="btn btn-outline-petrol btn-squared color-petrol px-15"
                    >
                      <img src={record}/>
                      {recordingSign == false ? "Record" : "Recording"}
                      
                    </button>
                    <button
                      type="button"
                      onClick={() => setPinned(!isPinned)}
                      className="btn btn-petrol btn-squared color-primary px-15"
                    >
                      Change Layout
                    </button>
                    <button
                      type="button"
                      // onClick={() => setFullScreen(!fullScreen)}
                      onClick={handle.enter}
                      className="btn btn-petrol btn-squared color-primary px-15"
                    >
                      Full Screen
                    </button>
                  </div> }
                  <FullScreen handle={handle}>
                  {/* <div style={{ display: "flex", width: "100%",  height: fullScreen ? windowSize.innerHeight : "600px", marginBottom: fullScreen ? "0px":'25px', marginTop:fullScreen ? "0px":'15px' }}> */}
                  <div style={{ display: "flex", width: "100%",  height: handle.active ? windowSize.innerHeight : "600px", marginBottom: fullScreen ? "0px":'25px', marginTop:fullScreen ? "0px":'15px' }}>
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
          )
          :
          null
          }
          
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

  const uploadWorksheet = async (item) => {
    // setImagePath(item)
    let formData = new FormData()
    formData.append("file", item)
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;
    // console.log(btoken)  
    const res = await fetch(`${BASE_URL}files/upload?fileType=worksheet`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            //   'Content-Type': 'multipart/form-data',
            "Authorization": btoken,
        },
        body: formData
    })
    const response = await res.json()
    console.log(response)
    const { success } = response
    if (success) {
        setworksheetUrl(response.data.url)
    }
}

  const requestWorksheet = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;
    
    const body = {
      workSheetName:  worksheetName,
      dueBy : new Date(dueDate).toISOString(),
      file: worksheetUrl
    }
    const res = await fetch(`${BASE_URL}session/add-worksheet/${state.id}`, {
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
    alert("Worksheet Requested Successfully.")
    closeModal2()
  }
  }
   

  const minDate = moment().format('YYYY-MM-DD');


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
        style={{ 
          paddingLeft: fullScreen ? "0px": sideBarOpen ? "295px" : "93px", 
          paddingRight: fullScreen && "0px",
          paddingTop: fullScreen && "0px",
          paddingBottom: fullScreen && "0px",
          // padding:fullScreen && "0px" 
        }}
        className="contents expanded"
      >
        <div className="blog-page2">
          {fullScreen ? 
          <div className="exit_button">
            <img onClick={() => setFullScreen(!fullScreen)} style={{
                  position: "absolute",
                  zIndex: "999",
                  right: "25px",
                  top: "25px",
                  width: "50px",
                  height: "50px",
            }} src={exit_meeting}/>
          </div>: null}
          <div className="container-fluid">
            {fullScreen ? null :
            <div className="row">
            <div style={{display:'flex'}} className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                <p onClick={() => navigate(-1)} style={{marginRight:'10px', color:'#7A7A7A', fontWeight:'400', lineHeight:'22px', cursor:'pointer'}}>Sessions</p>
                                <img style={{marginRight:'10px',width:'6px', height:'13px', marginTop:'6px'}} src={path}/>
                                <p style={{color:"#005B5B", fontWeight:'400', lineHeight:'22px', cursor:'pointer', marginTop:'2px'}}>Upcoming Session</p>
                            </div>
              <div className="col-lg-12">
                <div className="breadcrumb-main user-member justify-content-sm-between">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Session scheduled on{" "}
                        {new Date(fullSessionDetail.schedule_time).toDateString()} with{" "}
                        {fullSessionDetail.scheduler?.name}{" "}
                        {new Date(`${fullSessionDetail?.schedule_time?.split(' ').join('T')}Z`).toLocaleTimeString()}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

            <div className="row">
              {/* <div className="col-lg-12 col-12">
                <div className="">
                  <div className="blog-details-thumbnail mb-25">
                    <img src={resources_img} />
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "34%",
                    right: "46px",
                    width: "250px",
                  }}
                > */}
              <Countdown
                date={new Date(`${fullSessionDetail?.schedule_time?.split(' ').join('T')}Z`)}
                renderer={renderer}
              />

              {/* </div> */}

              {/* <div
                    style={{ display: "flex", width: "100%", height: "600px" }}
                  >
                    <AgoraUIKit
                      rtcProps={rtcProps}
                      rtmProps={{
                        username: state.sessionUsers[0].name,
                        displayUsername: true,
                      }}
                      callbacks={callbacks}
                    />
                  </div> */}
              {/* </div> */}
              {fullScreen ? null :
              <div className="col-lg-6 col-md-12 col-sm-12">
                <h5 className="text-capitalize fw-500 mb-15">
                  Session Number #{fullSessionDetail.sessionNumber}
                </h5>
                <h5 className="text-capitalize fw-500 mb-15">
                  {fullSessionDetail && ordinal_suffix_of(fullSessionDetail.withSessionNumber)} session with {fullSessionDetail.scheduler?.name}
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
                  <button
                    onClick={() => {
                      saveNotes();
                    }}
                    type="button"
                    class="btn btn-petrol btn-squared color-primary px-15 mb-20"
                  >
                    Save
                  </button>

                  <h5 class="text-capitalize fw-500 mb-20">Actions Agreed On </h5>
                <div className="col-md-12 mb-25">
                  <textarea
                    value={actionss}
                    onChange={(e) => setActionss(e.target.value)}
                    class="form-control ip-gray radius-xs b-deep px-15"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="Please enter the action items that both you and your mentee agreed on for mentee to finish prior to next session "
                  ></textarea>
                  <button
                    onClick={() => {
                      saveActionss();
                    }}
                    type="button"
                    class="btn btn-petrol btn-squared color-primary px-15 mb-20 mt-20"
                  >
                    Save
                  </button>
                </div>
                  <div class="layout-button">
                    <button
                      type="button"
                      className="btn btn-outline-petrol btn-squared color-petrol px-15"
                    >
                      Assign a Learning
                    </button>
                    <button
                      type="button"
                      onClick={() => showModal2()}
                      className="btn btn-outline-petrol btn-squared color-petrol px-15"
                    >
                      Request Worksheet
                    </button>
                    <button
                      type="button"
                      className="btn btn-petrol btn-squared color-primary px-15"
                    >
                      Assign an Assessment
                    </button>
                  </div>
                </div>
              </div>}
              {fullScreen ? null :
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
                  <p className="color-dark fs-14 fw-300 align-center mb-0">
                   {fullSessionDetail.previousSession?.notes}
                  </p>
                </div>

                <div className="col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-300 align-center mb-0">
                    Actions Agreed On
                  </p>
                  {/* <p className="color-dark fs-14 fw-300 align-center mb-0">
                    The project must first be launched with one business
                    function to ensure the process flow is as planned and if any
                    amendments are needed{" "}
                  </p> */}
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
                    Worksheet/assignment uploaded by Mentee
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
                {/* <div className="col-md-12">
                  <button
                    type="button"
                    class="btn btn-petrol btn-default btn-squared w-100"
                  >
                    Schedule Next Session
                  </button>
                </div> */}
              </div>}
            </div>
          </div>
        </div>
      </div>
      {!fullScreen ? 
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
      /> : null}
      <Modal show={showHello} onHide={closeModal}>
        <Modal.Header className="mentor_feedback" closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5 class="text-capitalize fw-600 mb-10">
              Rate {fullSessionDetail.scheduler?.name}'s Skill Progression On A Scale of 1 To 10.
            </h5>
            {/* <br /> */}
            <h5 class="text-capitalize fw-900 mb-20">
              ({fullSessionDetail.scheduler?.name} Is Currently At ({prevScore}) For {fullSessionDetail && fullSessionDetail.skills})
            </h5>
            {/* <Rate
              defaultValue={0}
              count={10}
              onChange={(e) => setNumberRating(e)}
              character={({ index }) => index + 1}
            /> */}
            <p>1-3 Beginer, 3-5 Competent, 6-8 Proficient, 9-10 Expert</p>
            <div class="rate">
                <input type="radio" id="star10" name="rate" value="10" onChange={e => setNumberRating(e.target.value)} />
                <label for="star10" title="text">10</label>

                <input type="radio" id="star9" name="rate" value="9" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star9" title="text">9</label>

                <input type="radio" id="star8" name="rate" value="8" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star8" title="text">8</label>

                <input type="radio" id="star7" name="rate" value="7" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star7" title="text">7</label>

                <input type="radio" id="star6" name="rate" value="6" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star6" title="text">6</label>

                <input type="radio" id="star5" name="rate" value="5" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star5" title="text">5</label>

                <input type="radio" id="star4" name="rate" value="4" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star4" title="text">4</label>

                <input type="radio" id="star3" name="rate" value="3" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star3" title="text">3</label>

                <input type="radio" id="star2" name="rate" value="2" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star2" title="text">2</label>

                <input type="radio" id="star1" name="rate" value="1" onChange={e => setNumberRating(e.target.value)}/>
                <label for="star1" title="text">1</label>
              </div>
            <h5 class="text-capitalize fw-600 mb-10 mt-10">
              Rate {fullSessionDetail.scheduler?.name}'s session participation
            </h5>
            <Rating
              onClick={handleRating1}
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
            Kindly share your feedback on this session and{" "}
            {fullSessionDetail.scheduler?.name}'s progression?
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
              onClick={() => {
                updateFeedback();
              }}
              type="button"
              className="btn btn-petrol btn-squared color-primary px-15 mt-20"
            >
              Submit
            </button>
          </center>
        </Modal.Body>
      </Modal>

      <Modal show={showWorksheetModal} onHide={closeModal2}>
        <Modal.Header className="mentor_feedback" closeButton>
          <Modal.Title>Request Worksheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="col-md-12 mb-25">
              <input
                  value={worksheetName}
                  onChange={(e) => setworksheetName(e.target.value)}
                type="text"
                className="form-control ih-medium ip-gray b-deep radius-xs px-15"
                placeholder="Name of the worksheet"
              />
            </div>
            <div className="col-md-12 mb-25">
              <input
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                onFocus={() => setDateType('date')} 
                onBlur={() => setDateType('text')} 
                type={dateType}
                min={minDate}
                className="form-control ih-medium ip-gray b-deep radius-xs px-15"
                placeholder="Due By"
              />
            </div>
            <div className="col-md-12 mb-25">
              <input
              onChange={(event) => {
                uploadWorksheet(event.target.files[0])
              }}
                class="form-control ih-medium ip-gray radius-xs b-deep px-15"
                type="file"
                id="customFile"
              />
            </div>
          </div>
          <center>
            <button
              onClick={() => {requestWorksheet()}}
              type="button"
              className="btn btn-petrol btn-squared color-primary px-15 mt-20"
            >
              Submit
            </button>
          </center>
        </Modal.Body>
      </Modal>

      <Modal show={showCormfirm} onHide={hideConfirm}>
      <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Do you want to exit the session?</h4>

                        <h6 style={{fontWeight:'bold'}} class="text-capitalize mb-25">Have you filled and saved actions agreed on? Have you attached any worksheet (if necesssary)?</h6>

                        <div class="layout-button justify-content-center">
                            <button onClick={() =>{
                                setVideoCall(false)
                                
                                endCallAndRecording()
                                
                                // endCallAndRecording()
                            }} type="button" className="btn btn-no btn-default btn-squared">Yes</button>
                            <button onClick={() => hideConfirm()} type="button" className="btn btn-yes btn-default btn-squared">No</button>
                        </div>
                    </div>

                </Modal.Body>
      </Modal>
    </div>
  );
}

export default Live_Session;
