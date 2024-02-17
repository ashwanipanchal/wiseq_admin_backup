import resources_img from "../../../img/past_session.png";
import pdf_img from "../../../img/pdf_file.svg";
import word_img from "../../../img/word.svg";
import csv_img from "../../../img/csv.svg";
import picture_img from "../../../img/picture.svg";
import uploads_img from "../../../img/uploadslight.svg";
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Iframe from "react-iframe";
import Modal from "react-bootstrap/Modal";
import { Rating } from "react-simple-star-rating";
import moment from "moment";
import { BASE_URL, BASE_URL_APPLSURE } from "../../../services/Config";
import { FileUploader } from "react-drag-drop-files";
import { saveAs } from 'file-saver'
import ReactHlsPlayer from 'react-hls-player';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const fileTypes = ["CSV", "PNG", "JPG", "DOC", "PDF"];

function Past_Session() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("session in pas", state);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const [showHello, setShowHello] = useState(false);
  const closeModal = () => setShowHello(false);
  const showModal = () => setShowHello(true);

  const [showWK, setShowWK] = useState(false);
  const [file, setFile] = useState(null);
  const [graphData, setGraphData] = useState([])
  const closeModal2 = () => setShowWK(false);
  const showModal2 = () => setShowWK(true);
  const [worksheetUrl, setworksheetUrl] = useState("");
  const [fullDetails, setFullDetails] = useState({});
  const [windowSize, setWindowSize] = useState(getWindowSize());
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  // useEffect(() => {
  //     getDetails()
  // }, [])

  const getDetails = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    const res = await fetch(
      `${BASE_URL}session/profile/${state.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
      }
    );
    const response = await res.json();
    setFullDetails(response.data);
    console.log("session full details", response);
    let temp = []
        let temp1 = []
        for(let i of response.data.skillRatings){
            let dict = {
              "name" : "Prev",
              "value" : i.prevSkillRate,
            } 
            temp.push(dict)
            let dict2 ={
              "name" : "Curr",
              "value" : i.currentSkillRate
            }
            temp1.push(dict2)
            Array.prototype.push.apply(temp,temp1); 
          }
          console.log("temp", temp)
          setGraphData(temp)
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      // console.log(getWindowSize())
    }
    getDetails();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [feedbackText, setfeedbackText] = useState("");

  // Catch Rating value
  const handleRating1 = (rate) => {
    setRating1(rate);
    // other logic
  };
  const handleRating2 = (rate) => {
    setRating2(rate);
    // other logic
  };
  const handleRating3 = (rate) => {
    setRating3(rate);
    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  const updateFeedback = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const body = {
      feedbackFor: state.sessionUsers[0]?.id || "",
      contentQuality: rating1,
      metObjective: rating2,
      mentorSkill: rating3,
      feedbackText: feedbackText,
    };
    // console.log(body)
    // return
    const res = await fetch(
      `${BASE_URL}session/mentee-feedback/${state.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
        body: JSON.stringify(body),
      }
    );
    const response = await res.json();

    const body1 =
    {
        // "feedbackFor": state.sessionUsers[0].id,
        // "contentQuality": rating1,
        // "metObjective": rating2,
        // "mentorSkill": rating3,
        // "feedbackText": feedbackText

        "user_id":state.scheduler?.id,
        "user_role":"mentee",
        "feedback_for":state.sessionUsers[0].id,
        "session_id":state.id,
        "question_no":[1,2,3],
        "rating":[rating1,rating2,rating3]
    }
    console.log(body1)
    // return
    const res1 = await fetch(`${BASE_URL_APPLSURE}add-question-wise-rating`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
        },
        body: JSON.stringify(body1)
    })
    const response1 = await res1.json()
    console.log(response1)
    console.log(response)

    const { success } = response;
    if (success) {
      navigate(-1);
    }
  };

  const changeHandler = (event) => {
    console.log(event);
  };
  const uploadWorksheet = async (event) => {
    // setImagePath(item)
    setFile(event)
    let formData = new FormData();
    formData.append("file", event);
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    // console.log(btoken)
    const res = await fetch(`${BASE_URL}files/upload?fileType=worksheet`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //   'Content-Type': 'multipart/form-data',
        Authorization: btoken,
      },
      body: formData,
    });
    const response = await res.json();
    console.log(response);
    const { success } = response;
    if (success) {
      
      setworksheetUrl(response.data.url);
    }
  };

  const submitworksheet = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const body = {
      workSheetId: fullDetails.worksheets[0].id,
      file: worksheetUrl,
    };
    const res = await fetch(
      `${BASE_URL}session/worksheet-submission/${state.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
        body: JSON.stringify(body),
      }
    );
    const response = await res.json();
    console.log(response);
    if (response.success) {
      setFile("")
      alert("Worksheet Uploaded Successfully.");
      closeModal2();
      getDetails()
    }
  };

  const deleteworksheet = async (id) => {
    // console.log("deleteif", id)
    // return
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(
      `${BASE_URL}session/worksheet-submission/${id.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
      }
    );
    const response = await res.json();
    console.log(response);
    if (response.success) {
      alert("Worksheet Delete Successfully.");
      getDetails()
    }
  };

  const downloadImage = (image) => {
    // console.log(image)
    // return
    saveAs(image.file, image.file) // Put your image url here.
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

const getImageIcon = (i) => {
  if(i.file.substring(i.file.indexOf('_')+1, i.file.length).replaceAll('%20', ' ').split(".")[1] == "png" || i.file.substring(i.file.indexOf('_')+1, i.file.length).replaceAll('%20', ' ').split(".")[1] == "jpg"){
    return picture_img
  }
  if(i.file.substring(i.file.indexOf('_')+1, i.file.length).replaceAll('%20', ' ').split(".")[1] == "pdf"){
    return pdf_img
  }
  if(i.file.substring(i.file.indexOf('_')+1, i.file.length).replaceAll('%20', ' ').split(".")[1] == "csv"){
    return csv_img
  }
  if(i.file.substring(i.file.indexOf('_')+1, i.file.length).replaceAll('%20', ' ').split(".")[1] == "doc"){
    return word_img
  }
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
                        Session held on{" "}
                        {new Date(state.scheduleTime).toDateString()} with{" "}
                        {state.sessionUsers[0]?.name || ""}:{" "}
                        {new Date(state.scheduleTime).toLocaleTimeString()}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
            <div className="col-lg-12 col-12">
                  {fullDetails.recordingUrl ? 
                  
                  <ReactHlsPlayer
                    // src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                    src={fullDetails.recordingUrl}
                    autoPlay={false}
                    controls={true}
                    width="100%"
                    // height="auto"
                    height="450px"
                  />:  
                    <div style={{backgroundColor:'#ebf3f3', height:'450px', borderRadius:'10px', justifyContent:'center', alignItems:'center'}} className="blog-details-thumbnail mb-25">
                      <p style={{fontSize:'24px',textAlign: 'center',paddingTop: '200px'}}>Recording isn't Available for this Session</p>
                    </div>}
                </div>

              <div className="col-lg-12 col-md-12">
                <div className="row">
                  <div className="col-lg-10 col-md-10">
                    <h5 className="text-capitalize fw-500 mb-15">
                      Session Details
                    </h5>
                    <h5 className="text-capitalize fw-500 mb-15">
                     Session Number #{state.sessionNumber}
                    </h5>
                    <h5 className="text-capitalize fw-500 mb-15">
                    {fullDetails && ordinal_suffix_of(fullDetails.withSessionNumber)} session with {state.sessionUsers[0]?.name || ""}
                      {/* 2nd session with {state.sessionUsers[0]?.name || ""} */}
                    </h5>
                  </div>
                  {!fullDetails.ratingSubmitted && (
                    <div className="col-lg-2 col-md-2">
                      <button
                        onClick={() => showModal()}
                        type="button"
                        className="btn btn-primary btn-squared color-primary px-15"
                      >
                        Rate the Session
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-20">
                  <p className="color-gray fs-14 fw-300 align-center mb-0">
                    Notes
                  </p>
                  <p className="color-dark fs-14 fw-300 align-center mb-0">
                    {fullDetails.notes}
                  </p>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Skills mentored on
                      </p>
                      <ul className="d-flex flex-wrap user-group-people__parent">
                        <span class="badge badge-square btn-outline-emlpoy me-10">
                          {state.skills}
                        </span>
                      </ul>
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Session Objective:
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                        {state.objective}
                      </p>
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Actions Agreed On:
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {fullDetails.actionsAgreedOn}
                      </p>
                    </div>

                    <div className="col-md-11 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Feedback Given
                      </p>
                      {fullDetails && fullDetails.feedbacksGiven?.length > 0 ? (
                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                          {fullDetails.feedbacksGiven[0].feedback}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-md-11 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Feedback Received
                      </p>
                      {fullDetails &&
                      fullDetails.feedbacksRecieved?.length > 0 ? (
                        <p className="color-dark fs-14 fw-300 align-center mb-0">
                          {fullDetails.feedbacksRecieved[0].feedback}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-md-12 mb-20">
                                            <p className="color-gray fs-14 fw-300 align-center mb-0">Session Participation Rating</p>
                                            {fullDetails &&
                                                fullDetails.feedbacksRecieved?.length > 0 ? (
                                                  // <p className="color-dark fs-14 fw-300 align-center mb-0">
                                                  //   {fullDetails.feedbacksRecieved[0].feedback}
                                                  // </p>
                                                    <span className="badge badge-round btn-sky mt-10">{fullDetails.feedbacksRecieved[0].avgRating} <i className="lar la-star user_star"></i></span>
                                                ) : null}
                                        </div>
                  </div>

                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="col-lg-12 col-sm-6 col-md-12 mb-25">
                      <div className="card border-0 px-20 pb-10 project-task-list--event box_shadow1">
                        <div className="card-header px-0 border-0">
                          <h6>Skill(s) Progression</h6>
                        </div>
                        {graphData && (
                            <div className="card-body p-0">
                          <BarChart
                              width={500}
                              height={300}
                              data={graphData}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" fill="#80CED6" barSize={20} />
                            </BarChart>
                          </div>
                          )}
                      </div>
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-2">
                        Worksheet/assignment Requested
                      </p>
                      {fullDetails &&
                        fullDetails.worksheets?.map((i) => (
                          <div className="row">
                            <div className="col-md-4">
                              <div className="blog-details-meta">
                                <img src={getImageIcon(i)} className="me-10" />
                                <span className="color-dark">
                                  {i.workSheetName}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div
                                style={{
                                  display: "block",
                                  textAlign: "center",
                                }}
                                className="blog-details-meta"
                              >
                                {/* <img src={word_img} className="me-10" /> */}
                                <span className="color-dark">
                                  Due By {moment(i.dueBy).format("DD.MM.YYYY")}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div
                                onClick={() => {downloadImage(i)}}
                                style={{ float: "right" }}
                                className="blog-details-meta"
                              >
                                {/* <img src={word_img} className="me-10" /> */}
                                <span style={{color:'#508287'}} >Download</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-2">
                        Worksheet/assignment Uploaded
                      </p>
                      {fullDetails &&
                        fullDetails.worksheets?.map((i) => {
                            console.log(i)
                            if(i.submissions.length > 0){
                                console.log("here")
                                let t = i.submissions.map((i) => (
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="blog-details-meta">
                                          <img src={getImageIcon(i)} className="me-10" />
                                          <span className="color-dark">{i.file.substring(i.file.indexOf('_')+1, i.file.length).replaceAll('%20', ' ')}</span>
                                        </div>
                                      </div>
        
                                      <div className="col-md-6">
                                        <div
                                         onClick={() => {deleteworksheet(i)}}
                                          style={{ float: "right" }}
                                          className="blog-details-meta"
                                        >
                                          {/* <img src={pdf_img} className="me-10" /> */}
                                          <span style={{color:'#D54654'}} >Delete</span>
                                        </div>
                                      </div>
                                    </div>
                                ))
                                return t
                                
                            }
                         
                        })}

                      <center>
                        <button
                          onClick={() => showModal2()}
                          type="button"
                          className="btn btn-default btn-squared color-petrol btn-outline-petrol flex-grow-1"
                        >
                          Upload Worksheet/assignment
                        </button>
                      </center>
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
      <Modal show={showHello} onHide={closeModal}>
        <Modal.Header className="mentee_feedback" closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5 class="text-capitalize fw-600 mb-20">
              Rate the Quality of Content shared by {state.sessionUsers[0]?.name || ""}
              .
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
              Rate the mentoring skills of {state.sessionUsers[0]?.name || ""}
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
            Do you have any feedback for {state.sessionUsers[0]?.name || ""}?
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

      <Modal show={showWK} onHide={closeModal2}>
        <Modal.Header className="mentee_feedback" closeButton>
          <Modal.Title>Upload Worksheet/Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12">
                <FileUploader
                  onChange={uploadWorksheet}
                  onSelect={uploadWorksheet}
                  name="file"
                  types={fileTypes}
                  fileOrFiles={file}
                >
                  <div className="box_dash_mentee justify-content-center text-center">
                    <img src={uploads_img} />
                    <p className="browser">Browse Files to upload</p>
                  </div>
                </FileUploader>
                {/* <input
                                    type="file"
                                    name="file"
                                    onChange={changeHandler}
                                    accept=".csv"
                                    style={{ display: "block", margin: "10px auto" }}
                                /> */}
              </div>
              <p>{file ? file.name : ""}</p>
              <div className="layout-button mt-15">
                <div className="btn_center">
                  <button
                    type="button"
                    onClick={() => {
                      submitworksheet();
                    }}
                    className="btn btn-light-petrol btn-default btn-squared"
                  >
                    Submit
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

export default Past_Session;
