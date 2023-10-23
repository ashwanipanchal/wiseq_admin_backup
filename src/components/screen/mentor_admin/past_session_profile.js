import resources_img from '../../../img/past_session.png';
import pdf_img from "../../../img/pdf_file.svg";
import word_img from "../../../img/word.svg";
import csv_img from "../../../img/csv.svg";
import picture_img from "../../../img/picture.svg";
import Side_Bar from './sidebar';
import path from '../../../img/Path.png';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Iframe from 'react-iframe';
import Modal from 'react-bootstrap/Modal';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rating } from 'react-simple-star-rating';
import { Rate } from 'antd';
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
import moment from 'moment'
import { BASE_URL } from '../../../services/Config';
// const cardStyles = {
//  ":where(.css-dev-only-do-not-override-w8mnev).ant-rate .ant-rate-star-full .ant-rate-star-second": {
//     color: '#000',
//     backgroundColor: "#fff3d0",
//     width: "40px",
//     height: "40px",
//     borderRadius: "5px"
// }
// };

const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <FrownOutlined />,
    4: <FrownOutlined />,
    5: <MehOutlined />,
    6: <SmileOutlined />,
    7: <SmileOutlined />,
};

function Past_Session() {
    const { state } = useLocation()
    const navigate = useNavigate()
    console.log("session in pas", state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullDetails, setFullDetails] = useState({})
    const [prevScore, setPrevScore] = useState("");
    const [graphData, setGraphData] = useState([])
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
        getDetails()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const getDetails = async () => {
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
        setFullDetails(response.data)
        console.log("session full details", response)
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
        if(response.data.pendingFeedbacks[0].hasOwnProperty('prevSkillRating')){
          setPrevScore(response.data?.pendingFeedbacks[0]?.prevSkillRating)
        }else{
          setPrevScore(0)
        }
        
    }
    
    const data = [
      {
        name: "Prev",
        uv: 0,
    
      },
      {
        name: "Curr",
        uv: 6,
    
      },
    ];

    const [rating1, setRating1] = useState(0)
    const [rating2, setRating2] = useState(0)
    const [rating3, setRating3] = useState(0)
    const [numberRating, setNumberRating] = useState(0)
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

        const body = {
            feedbackFor: state.scheduler.id,
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
            navigate(-1)
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
  

  const reviewWorksheet = async(i) => {
    const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const body = {
          "workSheetId": i.id,
          "menteeId": i.userId
        }
        const res = await fetch(`${BASE_URL}session/worksheet-review/${state.id}`, {
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
          window.open(i.file, "_blank")
            // navigate(-1)
        }

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
              <div style={{display:'flex'}} className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                <p onClick={() => navigate(-1)} style={{marginRight:'10px', color:'#7A7A7A', fontWeight:'400', lineHeight:'22px', cursor:'pointer'}}>Sessions</p>
                                <img style={{marginRight:'10px',width:'6px', height:'13px', marginTop:'6px'}} src={path}/>
                                <p style={{color:"#005B5B", fontWeight:'400', lineHeight:'22px', cursor:'pointer', marginTop:'2px'}}>Past Session</p>
                            </div>
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          Session held on{" "}
                          {new Date(state.scheduleTime).toDateString()} with{" "}
                          {state.scheduler.name}:{" "}
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
                      {fullDetails && ordinal_suffix_of(fullDetails.withSessionNumber)} session with {state.scheduler.name}
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
                        {fullDetails &&
                        fullDetails.feedbacksGiven?.length > 0 ? (
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
                        <p className="color-gray fs-14 fw-300 align-center mb-0">
                          Session Score by Mentee
                        </p>
                        {fullDetails &&
                        fullDetails.feedbacksRecieved?.length > 0 ? (
                          <span className="badge badge-round btn-petrol mt-10">
                            {fullDetails.feedbacksRecieved[0].avgRating}{" "}
                            <i className="lar la-star user_star"></i>
                          </span>
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
                                <div
                                  onClick={() => {
                                    window.open(i.file, "_blank")
                                  }}
                                  className="blog-details-meta"
                                >
                                  <img src={getImageIcon(i)} className="me-10" />
                                  <span className="color-dark">
                                    {i.workSheetName}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-4">
                                  <span className="color-dark">
                                    Due By {moment(i.dueBy).format("DD.MM.YYYY")}
                                  </span>
                              </div>
                            </div>
                          ))}
                        {/* {fullDetails && fullDetails.worksheets?.length > 0 ? (
                          <div className="row">
                            <div className="col-md-3">
                              <div
                                onClick={() =>
                                  window.open(
                                    fullDetails.worksheets[0].file,
                                    "_blank"
                                  )
                                }
                                className="blog-details-meta"
                              >
                                <img src={word_img} className="me-10" />
                                <span className="color-dark">
                                  {fullDetails.worksheets[0].workSheetName}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : null} */}
                      </div>

                      <div className="col-md-12 mb-20">
                        <p className="color-gray fs-14 fw-300 align-center mb-2">
                          Worksheet/assignment uploaded by Mentee
                        </p>
                        {fullDetails &&
                          fullDetails.worksheets?.map((i) => {
                            console.log(i);
                            if (i.submissions.length > 0) {
                              console.log("here");
                              let t = i.submissions.map((i) => (
                                <div className="row">
                                  <div className="col-md-6">
                                    <div
                                    style={{cursor:'pointer'}}
                                      onClick={() =>
                                        // window.open(i.file, "_blank")
                                        
                                        reviewWorksheet(i)
                                      }
                                      className="blog-details-meta"
                                    >
                                      <img src={getImageIcon(i)} className="me-10" />
                                      <span className="color-dark">
                                        {i.file.substring(i.file.indexOf('_')+1, i.file.length).replaceAll('%20', ' ')}
                                      </span>
                                    </div>
                                  </div>

                                  {/* <div className="col-md-6">
                                    <div
                                      style={{ float: "right" }}
                                      className="blog-details-meta"
                                    >
                                      <span
                                        style={{ color: "#D54654" }}
                                        className="color-dark"
                                      >
                                        Delete
                                      </span>
                                    </div>
                                  </div> */}
                                </div>
                              ));
                              return t;
                            }
                          })}
                        {/* <div className="row">
                          <div className="col-md-3">
                            <div className="blog-details-meta">
                              <img src={word_img} className="me-10" />
                              <span className="color-dark">abcd.doc</span>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="blog-details-meta">
                              <img src={pdf_img} className="me-10" />
                              <span className="color-dark">abcd.pdf</span>
                            </div>
                          </div>
                        </div> */}
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
          <Modal.Header className="mentor_feedback" closeButton>
            <Modal.Title>Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 class="text-capitalize fw-600 mb-10">
                Rate {state.sessionUsers[0].name}'s Skill Progression On A Scale
                of 1 To 10.
              </h5>
              <h5 class="text-capitalize fw-900 mb-20">
                ({state.sessionUsers[0].name} Is Currently At ({prevScore}) For {fullDetails && fullDetails.skills})
              </h5>
              {/* <Rate
                defaultValue={0}
                count={10}
                onChange={(e) => setNumberRating(e)}
                character={({ index }) => index + 1}
              /> */}
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
                Rate {state.sessionUsers[0].name}'s session participation
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
              {state.sessionUsers[0].name}'s progression?
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
      </div>
    );
}

export default Past_Session;
