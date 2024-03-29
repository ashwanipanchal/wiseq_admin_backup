// import resources_img from '../../../img/programs.png';
import Side_Bar from './sidebar';
import pdf_img from "../../../img/pdf_file.svg";
import word_img from "../../../img/word.svg";
import csv_img from "../../../img/csv.svg";
import picture_img from "../../../img/picture.svg";
import resources_img from '../../../img/past_session.png';
import uploads_img from "../../../img/uploadslight.svg";
// import pdf_img from '../../../img/pdf_file.svg';
// import pdf_img from '../../../img/svg_icon.svg';
// import xls_img from '../../../img/xls.png';
// import pic_img from '../../../img/picture.png';
import { useEffect, useState } from 'react';
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Rating } from 'react-simple-star-rating'
import { BASE_URL } from "../../../services/Config";
import { FileUploader } from "react-drag-drop-files";
import moment from 'moment'


const fileTypes = ["CSV", "PNG", "JPG", "DOC", "PDF"];

function Learning_Profile_Detail() {
    const navigate = useNavigate()
    const {state, hint} = useLocation()
    console.log(state)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [rating1, setRating1] = useState(0)
    const [rating2, setRating2] = useState(0)
    const [rating3, setRating3] = useState(0)
    const [feedbackText, setfeedbackText] = useState("")
    const [learningDetails, setLearningDetails] = useState({})
    const [worksheetList, setWorksheetList] = useState([])
    const [worksheetUrl, setworksheetUrl] = useState("");
    const [istart, setIsStart] = useState(false);
    const [showWK, setShowWK] = useState(false);
    const [file, setFile] = useState(null);
    const closeModal2 = () => setShowWK(false);
    const showModal2 = () => setShowWK(true);

    const handleRating1 = (rate) => {
        setRating1(rate)
        // other logic
    }

    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value, index) => console.log(value, index)

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
    const closeModal = () => {
        setShowHello(false)
        navigate(-1)
    };
    const showModal = () => setShowHello(true);

    useEffect(() => {
        getProfile()
    },[])
    
    const [showCormfirm, setConfirmModal] = useState(false);
    const hideConfirm = () => setConfirmModal(false);
    const showConfirmModal = () => setConfirmModal(true);

    const [showCormfirm1, setConfirmModal1] = useState(false);
    const hideConfirm1 = () => {
      setConfirmModal1(false);
      // showModal()
    }
    const showConfirmModal1 = () => setConfirmModal1(true);

    const getProfile = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}mentee-learnings/${state.data?.learning_id}/profile`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("learning profile on mentee side", response)
        if(response.success){
            setLearningDetails(response.data)
            if(response.data.menteeFeedback?.worksheets != null){
              let totalWorksheet = response.data.menteeFeedback?.worksheets.split(",")
              console.log(totalWorksheet)
              console.log(totalWorksheet[0].substring(totalWorksheet[0].indexOf('_')+1, totalWorksheet[0].length).replaceAll('%20', ' '))
              setWorksheetList(totalWorksheet)
            }
        }
    }

    const markAsBegin = async() => {
      if(new Date(state.data?.finish_by) <  new Date()){
        showConfirmModal()
        return
      }else{
        const btoken = `Bearer ${token}`;
        // const body = {
        //   status: "begin"
        // }
        const res = await fetch(`${BASE_URL}mentee-learnings/change-status/${learningDetails.id}?status=begin`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            // body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("learning started Status", response)
        if(response.success){
          // alert("Learning has been started successfully")
          setIsStart(true)
          if(learningDetails.sourceType ==  "internal"){
            // window.open(learningDetails.worksheetFile, "_blank")
          }else{
            window.open(learningDetails.sourceLink, "_blank")
          }
        }
        
      }

    }
    const markAsDone = async() => {
      // console.log(new Date(state.data.finish_by) <  new Date())
      // return
      if(new Date(state.data.finish_by) <  new Date()){
        showConfirmModal()
        return
      }else if(state.data.is_worksheet_needed == 1 && worksheetList.length == 0){
        showConfirmModal1()
        return
      }else{
        // return
        const btoken = `Bearer ${token}`;
        // const body = {
        //   status: "begin"
        // }
        const res = await fetch(`${BASE_URL}mentee-learnings/change-status/${learningDetails.id}?status=done`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            // body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("learning done Status", response)
        showModal()
      }
    }

    const submitRating = async() => {
        markAsDone()
        const btoken = `Bearer ${token}`;
        const body = {
            "menteeFeedback": feedbackText,
            "menteeRating": rating1
          }
          console.log(body)
          // return
        const res = await fetch(`${BASE_URL}mentee-learnings/${state.data.learning_id}/feedback`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("learning rating Status", response)
        closeModal()
        return
        navigate(-1)
    }

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
        "worksheet": worksheetUrl,
      };
      const res = await fetch(
        `${BASE_URL}mentee-learnings/${learningDetails.id}/upload-worksheet`,
        {
          method: "POST",
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
        getProfile()
        // getDetails()
      }
    };

    const deleteWorksheet = async (i) => {
      const token = await localStorage.getItem("token");
      const btoken = `Bearer ${token}`;
  
      // const body = {
      //   "worksheet": worksheetUrl,
      // };
      const res = await fetch(
        `${BASE_URL}mentee-learnings/${state.data.learning_id}/remove-worksheet?worksheet=${i}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: btoken,
          },
          // body: JSON.stringify(body),
        }
      );
      const response = await res.json();
      console.log(response);
      if (response.success) {
        alert("Worksheet deleted Successfully.");
        getProfile()
      }
    };

    const getImageIcon = (i) => {
      // console.log(i)
      // return
      if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "png" || i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "jpg"){
        return picture_img
      }
      if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "pdf"){
        return pdf_img
      }
      if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "csv"){
        return csv_img
      }
      if(i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ').split(".")[1] == "doc"){
        return word_img
      }
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
                          {learningDetails && learningDetails.learningName}
                        </h4>
                      </div>
                    </div>
                    <div class="layout-button">
                      {state.hint == "start" ? (
                        <button
                          onClick={() => markAsBegin()}
                          type="button"
                          class="btn btn-default btn-squared color-primary btn-outline-light-petrol  flex-grow-1 mentee_btn"
                        >
                          Begin
                        </button>
                      ) : state.hint == "progress" ? (
                        <>
                        {state.data?.source_type == "internal" && state.data?.source_link.length > 0 && (
                          <button
                          onClick={() =>
                            window.open(learningDetails.sourceLink, "_blank")
                          }
                          type="button"
                          class="btn btn-default btn-squared color-primary btn-outline-light-petrol  flex-grow-1 mentee_btn"
                        >
                          Resume
                        </button>
                        )}
                        
                        <button
                        onClick={() => {
                          markAsDone();
                          // showConfirmModal1()
                          // showConfirmModal()
                        }}
                        type="button"
                        class="btn btn-light-petrol btn-default btn-squared"
                      >
                        Mark as Done
                      </button>
                      </>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-light-petrol btn-default btn-squared"
                        >
                          Completed
                        </button>
                      )}
                      {/* <NavLink className="navbar-link" to="/create_learning"> */}
                      {/* {state.hint != "done" && (
                        <button
                          onClick={() => {
                            markAsDone();
                            // showModal()
                          }}
                          type="button"
                          class="btn btn-light-petrol btn-default btn-squared"
                        >
                          Mark as Done
                        </button>
                      )} */}
                      {/* </NavLink> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="">
                    <div className="blog-details-thumbnail mb-25">
                      <img src={state.data?.learning_img} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Summary
                    </p>
                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.summary}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-6 col-sm-6">
                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Growth Score
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                        {learningDetails && learningDetails.growthScore}
                      </p>
                    </div>

                    {/* <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceType}</p>
                                </div> */}

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Source Name
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                        {learningDetails && learningDetails.sourceName}
                      </p>
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Assigned by
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {capitalizeFirstLetter(state?.data?.role == "super_admin" ? "Administrator": state?.data?.role)}({state?.data?.name})
                      {/* {capitalizeFirstLetter(state?.data?.role)} */}
                      </p>
                    </div>

                    {/* <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Link</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.sourceLink}</p>
                                </div> */}

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Skill(s) Addressed
                      </p>
                      <ul className="d-flex flex-wrap user-group-people__parent">
                      {learningDetails && learningDetails.skills?.split(",")?.map((i)=> (
                                            <span class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                        {/* <span class="badge badge-square btn-outline-orange me-10">
                          {learningDetails && learningDetails.skills}
                        </span> */}
                        {/* <span class="badge badge-square btn-outline-orange me-10">Presentation Skill</span> */}
                      </ul>
                    </div>

                    {learningDetails.otherFiles != "" &&
                    <div className="col-md-12 mb-20">
                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                     File Attached
                    </p>
                    {state.hint == "start" && istart == false? 
                    // <p>
                        `Click on "Begin" to view files`
                    // </p>
                     : state.data.other_files?.split("|").map((i)=>(
                      <p style={{cursor:'pointer', textDecoration:'underline'}} className="color-dark fs-14 fw-300 align-center mb-0"
                      onClick={() =>
                        window.open(i, "_blank")
                      }
                    >
                      {i.split("/")[4]}
                    </p>
                    ))}
                    {/* {state.hint == "progress" &&  
                    state.data.other_files?.split("|").map((i)=>(
                      <p style={{cursor:'pointer', textDecoration:'underline'}} className="color-dark fs-14 fw-300 align-center mb-0"
                      onClick={() =>
                        window.open(i, "_blank")
                      }
                    >
                      {i}
                    </p>
                    ))} */}
                    
                  </div>
                  
                  }
                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Finish by
                      </p>
                      {/* <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(learningDetails.finishBy).format("DD MMMM YYYY")}</p> */}
                      <p className="color-dark fs-14 fw-300 align-center mb-0">{ moment(learningDetails?.finishBy?.split('T')[0]).format("DD MMMM YYYY")}</p>
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Duration
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                        {learningDetails && learningDetails.duration}{" "}{learningDetails && learningDetails.durationType?.charAt(0).toUpperCase() + learningDetails.durationType?.slice(1)}
                      </p>
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Program Type
                      </p>
                      {/* <p className="color-dark fs-14 fw-300 align-center mb-0">{learningDetails && learningDetails.duration}</p> */}
                    </div>

                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                        Learning’s Rating
                      </p>
                      {state.data?.mentee_rating == 0 ? 
                        "Be the first to rate this learning":
                        <span className="badge badge-round btn-light-petrol mt-10">{state.data?.mentee_rating} <i className="lar la-star user_star"></i></span>
                      }
                    </div>
                    {state.hint == "done" && (
                      <>
                      <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                      Your Feedback
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.menteeFeedback?.menteeFeedback}
                      </p>
                    </div>
                    <div className="col-md-12 mb-20">
                      <p className="color-gray fs-14 fw-300 align-center mb-0">
                      {state.data?.role == "mentor"? "Mentor": "Administrator"} Feedback
                      </p>
                      <p className="color-dark fs-14 fw-300 align-center mb-0">
                      {learningDetails && learningDetails.menteeFeedback?.assigneeFeedback}
                      </p>
                    </div>
                    </>
                    )}
                    
                  </div>

                  {state.hint == "progress" && state.data?.is_worksheet_needed == 1 && state.data?.worksheet_file.length > 0? (
                    <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="col-md-12 mb-20 ">
                      <p className="color-gray fs-14 fw-300 align-center mb-2">
                      Worksheets Attached
                      </p>
                      {state.data?.worksheet_file.split("|") != undefined  && state.data?.worksheet_file.split("|")?.map((i) => (
                        <div className="row">
                            <div className="col-md-4">
                              <div className="blog-details-meta">
                                <span className="color-dark">
                                  {i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ')}
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
                                <span className="color-dark">
                                </span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div
                                onClick={() => {window.open(i, "_blank")}}
                                style={{ float: "right", cursor:'pointer' }}
                                className="blog-details-meta"
                              >
                                <span style={{color:'#508287'}} >Download</span>
                              </div>
                            </div>
                          </div>
                      ))}
                      
                      <button
                        onClick={() => {
                          if(new Date(state.data?.finish_by) <  new Date()){
                            showConfirmModal()
                            return
                          }else{
                            showModal2()
                          }
                        }}
                        type="button"
                        className="btn btn-default btn-squared color-light-petrol btn-outline-light-petrol flex-grow-1 mb-10"
                      >
                        Upload Worksheet/assignment
                      </button>
                      <p className="color-gray fs-14 fw-300 align-center mb-2">
                        Worksheet/assignment Uploaded
                      </p>
                      {worksheetList &&
                        worksheetList?.map((i, index) => (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="blog-details-meta">
                            <img src={getImageIcon(i)} className="me-10" />
                            <span className="color-dark">{i.substring(i.indexOf('_')+1, i.length).replaceAll('%20', ' ')}</span>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div
                            style={{ float: "right" }}
                            className="blog-details-meta"
                          >
                            <span onClick={() => deleteWorksheet(i)} style={{cursor:'pointer'}} className="color-dark">Delete</span>
                          </div>
                        </div>
                      </div>
                       )) }
                       
                    </div>
                  </div>
                  ):null}
                  
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
            <Modal.Title>Rate this Learning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 class="text-capitalize fw-600 mb-20">
                Rate this learning on usefulness and context
              </h5>
              <Rating
                onClick={handleRating1}
                size={30}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
            </div>

            <h6 class="text-capitalize fw-600 mb-10 mt-25">
              Share your feedback on the learning ?
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
                type="button"
                onClick={() => submitRating()}
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
                    {/* <img src={uploads_img} /> */}
                    <p className="browser">Browse Files to upload</p>
                  </div>
                </FileUploader>
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

      <Modal show={showCormfirm} onHide={hideConfirm}>
      <Modal.Header className="mentee_feedback" closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">You have surpassed the due date for this learning. Please contact "{learningDetails.assignedBy}" to ask for an extention.</h4>

                        {/* <h6 style={{fontWeight:'bold'}} class="text-capitalize mb-25">You have surpassed the due date for this learning. Please contact "{learningDetails.assignedBy}" to ask for an extention.</h6> */}

                        {/* <div class="layout-button justify-content-center">
                            <button onClick={() =>{
                                setVideoCall(false)
                                
                                endCallAndRecording()
                                
                                // endCallAndRecording()
                            }} type="button" className="btn btn-no btn-default btn-squared">Yes</button>
                            <button onClick={() => hideConfirm()} type="button" className="btn btn-yes btn-default btn-squared">No</button>
                        </div> */}
                    </div>

                </Modal.Body>
      </Modal>
      <Modal show={showCormfirm1} onHide={hideConfirm1}>
      <Modal.Header className="mentee_feedback" closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">This learning requires a worksheet(s) to be submitted. Please attach the necessary worksheet(s) to the learning to mark it as done</h4>

                        {/* <h6 style={{fontWeight:'bold'}} class="text-capitalize mb-25">You have surpassed the due date for this learning. Please contact "{learningDetails.assignedBy}" to ask for an extention.</h6> */}

                        <div class="layout-button justify-content-center">
                           
                            <button onClick={() => hideConfirm1()} type="button" className="btn btn-yes btn-default btn-squared">OK</button>
                        </div>
                    </div>

                </Modal.Body>
      </Modal>

      </div>
    );
}

export default Learning_Profile_Detail;
