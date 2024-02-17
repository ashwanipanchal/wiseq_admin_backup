import clock_img from '../../img/mentee_user.svg';
import resources_img from '../../img/programs.png';
import Side_Bar from './sidebar';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BASE_URL_APPLSURE, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Multiselect from 'multiselect-react-dropdown';
import path from "../../img/Path.png";

function Program_Progress() {
    const {state} = useLocation()
    const navigate = useNavigate()
    const [worksheetName, setWorksheetName] = useState("")
    const [worksheetNameArray, setWorksheetsNameArray] = useState([])
    const [worksheetUrlString, setWorksheetUrlString] = useState("")
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [date, setDate] = useState("")
    const [checked, setChecked] = useState(false)
    const [checked1, setChecked1] = useState(false)
    const [listOfAcceptedMentee, setListOfAcceptedMentee] = useState([])
    const [listOfAcceptedMentor, setListOfAcceptedMentor] = useState([])
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMentor, setSelectedMentor] = useState([])
    const [selectedMenteeForAssignWorksheet, setSelectedMenteeForAssignWorksheet] = useState([])    
    const [selectedMentorForAssignWorksheet, setSelectedMentorForAssignWorksheet] = useState([])
    const [Namekey, setNameKey] = useState(Math.random())

    const [data, setData] = useState([
        { id: 1, mentoring_hours: "Mentees", mentoring_num: "50" },
        { id: 2, mentoring_hours: "Mentors", mentoring_num: "30" },
    ]);
    console.log("state in progress profile", state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fullProgram, setFullProgram] = useState({})
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    useEffect(() => {
        getProgramMentee()
        getProgramMentor()
    },[])

    const getProgramMentee = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state?.id,
            "role":"mentee" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist-accepted`, requestOptions)
        .then(response => response.json())
        .then(result => {
           let pp = []
            result?.list?.map((i) => {
                pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
            })
            console.log(pp)
            setListOfAcceptedMentee(pp)

          })
        .catch(error => console.log('error', error));
        
   } 
    const getProgramMentor = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state?.id,
            "role":"mentor" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist-accepted`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("000-----------",result)
            let pp = []
            result?.list?.map((i) => {
                pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
            })
            console.log(pp)
            setListOfAcceptedMentor(pp)

          })
        .catch(error => console.log('error', error));
        
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

    const showCalc = () => {
        setCalc(!calc)
    }

    const onChange = (e) => {
        console.log(e)
        setValue(moment(e).format("YYYY-MM-DD"))
        setDate(moment(e).format("DD/MM/YYYY"))
        showCalc()
    }

    const myRef = useRef(null);

    useEffect(() => {
        getFullDetails()
    },[myRef])
    
    const getFullDetails = async() => {
        var myHeaders = new Headers();
          myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "program_id": state?.id,
        });
    
          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };
    
          fetch(`${BASE_URL_APPLSURE_MENTORING}program-details`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log("full program details",result)
              setFullProgram(result)
              setData([
                { id: 1, mentoring_hours: "Program Progress", },
                { id: 2, mentoring_hours: "Sessions", mentoring_num: result?.program?.no_of_sessions },
                { id: 3, mentoring_hours: "Mentees", mentoring_num: result.totalmenteeaccepted },
                { id: 4, mentoring_hours: "Mentors", mentoring_num: result.totalmentoraccepted },
            ])
            myRef.current.innerHTML = result?.program?.summary; 
          })
          .catch(error => console.log('error', error));
    }

    const uploadWorksheet = (e) => {
        e.preventDefault()
        // console.log(user)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.id,
            "name": worksheetName,
            "due_date": value,
            "files": worksheetUrlString,
            "users": selectedMenteeForAssignWorksheet.concat(selectedMentorForAssignWorksheet),
        });
 
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-worksheet-create`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success){
                alert("Worksheet added successfully")
                closeModal()
                getFullDetails()
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
      }


      const onSelectMentee = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentee"})
            // setnewSelectedTools(temp)
        })
        setSelectedMentee(temp)
        setSelectedMenteeForAssignWorksheet(temp1)
    }

    const onRemoveMentee = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentee"})
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentee(temp)
        setSelectedMenteeForAssignWorksheet(temp1)
    }

    const onSelectMentor = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        setSelectedMentor(temp)
        setSelectedMentorForAssignWorksheet(temp1)
    }

    const onRemoveMentor = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentor(temp)
        setSelectedMentorForAssignWorksheet(temp1)
    }

    const uploadWorksheetInput = async (item) => {
        // setImagePath(item)
        console.log(item)
        let formData = new FormData()
        item.forEach((i,index) => {
            formData.append("uploadfile[]", item[index])
            formData.append("pathto", "program-worksheet")
            formData.append("id", state?.id)

        })

        // return
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        // console.log(btoken)  
        const res = await fetch(`${BASE_URL_APPLSURE}file-upload-multiple`, {
        // const res = await fetch(`${BASE_URL}files/upload?fileType=learning_file`, {
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
        // return
        const { status } = response
        if (status) {
            setWorksheetUrlString(response.data)
            let temp = []
            if(response?.nameimg?.split("|") != undefined){
                response?.nameimg?.split("|")?.map((i)=> {
                    // console.log(i)
                    temp.push(i)
                })
            }
                console.log(temp) 
                // setWorksheetUrl(response.data)
                setWorksheetsNameArray(temp)
        }
    }

    const goToSceen = (index) => {
        console.log(state.data)
        // return
        if(index == 0) {
            navigate("/program_progress", {state: { state }})
        }
        if(index == 1) {
            navigate("/session_list", {state:state})
        }
        if(index == 2) {
            navigate("/confirmed_participants", {state: { myState: state }})
        }
        if(index == 3) {
            navigate("/confirmed_participants", {state: { myState: state }})
        }
    }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className=" d-flex flex-wrap breadcrumb-main__wrapper">
                                <p
                                onClick={() => navigate(-1)}
                                style={{
                                marginRight: "10px",
                                color: "#7A7A7A",
                                fontWeight: "400",
                                lineHeight: "22px",
                                cursor: "pointer",
                                }}
                            >
                                Mentoring Programs
                            </p>
                            <img
                                style={{
                                marginRight: "10px",
                                width: "6px",
                                height: "13px",
                                marginTop: "6px",
                                }}
                                src={path}
                            />
                            <p
                                style={{
                                color: "#F8A046",
                                fontWeight: "400",
                                lineHeight: "22px",
                                
                                }}
                            >
                                Profile
                            </p>
                                </div>
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">{fullProgram && fullProgram.program?.name}</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" className="btn btn-primary btn-default btn-squared">Mandatory</button>
                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Edit</button>
                                        <NavLink className="navbar-link" to="/program_settings" state={{ myState: "progress", data:state }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Program Settings</button></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="">
                                    <div className="mb-25">
                                        <img style={{display: 'block', margin: 'auto'}} src={fullProgram?.program?.image} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Overview</h4>
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program ID</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">#{fullProgram && fullProgram.program?.program_id}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Name</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.name}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skills Covered</p>
                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                        {fullProgram?.program?.skills?.split(",").map((i, index)=>(
                                            <span key={index} class="badge badge-square btn-outline-orange me-10">{i}</span>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Objectives:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.objective}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Duration:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.duration}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.type}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Total Sessions:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.no_of_sessions}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Summary:</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0" ref={myRef}>
                                        {/* {fullProgram && fullProgram.program?.summary} */}
                                        </p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Participation</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Eligibility</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.eligibility}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Participation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram.program?.participation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentees allowed</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.no_of_mentees}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Max. no. of Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.no_of_mentor}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Metrics</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Growth Score for Mentees</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.growthscore_mentee}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Impact Score for Mentors</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.impactscore_mentor}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Evaluation Metrics</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.define_evalutaion}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Learnings</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.define_learnings}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Recommended Assessments</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.define_assessment}</p>
                                </div>
                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Creation of IDP</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram && fullProgram?.program?.idp_creation == "1" ? "Mandatory" : "Optional"}</p>
                                </div>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Program Schedule</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program Start Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.start_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Program End Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.end_date).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Cut off date for confirmation</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.cutt_off).format("DD MMM, YYYY")}</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Proposed Graduation Date</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{moment(fullProgram?.program?.proposed_graduation).format("DD MMM, YYYY")}</p>
                                </div>

                                {/* <h4 className="text-capitalize fw-500 mb-25 program_par_org">Mandatory Learnings</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Title</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Public Speaking</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">External</p>
                                </div>

                                <div className="col-md-12 mb-15">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finished By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <p className="color-orange fs-12 fw-500 align-center mb-20 view_more">View More Info</p>

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Mandatory Assessments</h4>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Title</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">Public Speaking</p>
                                </div>

                                <div className="col-md-12 mb-20">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Source Type</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">External</p>
                                </div>

                                <div className="col-md-12 mb-15">
                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Finished By</p>
                                    <p className="color-dark fs-14 fw-300 align-center mb-0">05 Jul, 2023</p>
                                </div>

                                <p className="color-orange fs-12 fw-500 align-center mb-20 view_more">View More Info</p> */}

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Inaugural Session</h4>

                                {fullProgram && fullProgram?.inaugralsession?.length > 0 && (
                                    <>
                                        <div className="col-md-12 mb-20">
                                            <p className="color-gray fs-14 fw-300 align-center mb-0">Date</p>
                                            <p className="color-dark fs-14 fw-300 align-center mb-0">{fullProgram.inaugralsession.map((i) => (
                                                <p>
                                                    {moment(i?.schedule_time).format("DD MMM, YYYY")}
                                                </p>
                                            ))}</p>
                                        </div>

                                        <div className="col-md-12 mb-20">
                                            <p className="color-gray fs-14 fw-300 align-center mb-0">Time</p>
                                            <p className="color-dark fs-14 fw-300 align-center mb-0">
                                            {fullProgram.inaugralsession.map((i) => (
                                                <p>
                                                    {new Date(`${i.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}
                                                    {/* {moment(`${i?.schedule_time.split(' ').join('T')}Z`).format("HH:MM A")} */}
                                                </p>
                                            ))}</p>
                                        </div>
                                    </>
                                )}

                                <h4 className="text-capitalize fw-500 mb-25 program_par_org">Cohort Session Schedule</h4>

                                <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>S No.</th>
                                                                <th>Title</th>
                                                                <th>Mentor Name</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {fullProgram && fullProgram?.cohartsessionlist?.map((i)=>(
                                                            <tr>
                                                                <td>{i?.session?.session_number}</td>
                                                                <td>-</td>
                                                                <td>{i.mentors[0]?.name.substring(
                                                                            0,
                                                                            8
                                                                          )}
                                                                          {i.mentors[0]?.name.length >
                                                                          8
                                                                            ? "..."
                                                                            : "" }
                                                                            {`${
                                                                              i.mentors.length > 1
                                                                                ? ` + ${
                                                                                    i.mentors
                                                                                      .length - 1
                                                                                  }`
                                                                                : ""
                                                                            }`}</td>
                                                                <td>{moment(i?.session?.schedule_time).format("DD MMM, YYYY")}</td>
                                                                <td>{new Date(`${i?.session?.schedule_time.split(' ').join('T')}Z`).toLocaleTimeString()}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="col-lg-6 col-md-12 col-sm-12">

                                {/* <div className="col-xxl-6 col-sm-6 mb-25">
                                    <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                        <div className="overview-content w-100">
                                            <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                <div className="ap-po-details__titlebar">
                                                    <NavLink className="navbar-link" to="/program_progress" state={{state}}><h2 className="program_pro">Program Progress</h2></NavLink>
                                                </div>

                                                <div className="ap-po-details__icon-area">
                                                    <div className="svg-icon">
                                                        <CircularProgressbar
                                                            value={fullProgram.hasOwnProperty('totolprogress') ? parseInt(fullProgram?.totolprogress).toFixed() : 0}
                                                            text={fullProgram.hasOwnProperty('totolprogress') ? `${parseInt(fullProgram?.totolprogress).toFixed()}%` : '0%'}
                                                            styles={buildStyles({
                                                                // Rotation of path and trail, in number of turns (0-1)
                                                                // rotation: 0.25,
                                
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: "butt",
                                
                                                                // Text size
                                                                textSize: "18px",
                                
                                                                // How long animation takes to go from one percentage to another, in seconds
                                                                pathTransitionDuration: 0.5,
                                
                                                                // Can specify path transition in more detail, or remove it entirely
                                                                // pathTransition: 'none',
                                
                                                                // Colors
                                                                pathColor:"#F8A046",
                                                        textColor: "#323232",
                                                        trailColor: "#fdefe6",
                                                              })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    {data.map((user,index) => (
                                        <div style={{cursor:'pointer'}} onClick={() => {
                                            goToSceen(index)
                                        }} className="col-xxl-6 col-sm-6 mb-25">
                                            <div className="ap-po-details ap-po-details--2 p-10 radius-xl d-flex justify-content-between box_shadow1">
                                                <div className="overview-content w-100">
                                                    <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                                        <div className="ap-po-details__titlebar">
                                                            <p>{user.mentoring_hours}</p>
                                                            <h2>{user.mentoring_num}</h2>
                                                        </div>
                                                        <div className="ap-po-details__icon-area">
                                                            {user.id == 1 ? (
                                                                <div className="svg-icon">
                                                                <CircularProgressbar
                                                                    value={fullProgram.hasOwnProperty('totolprogress') ? parseInt(fullProgram?.totolprogress).toFixed() : 0}
                                                                    text={fullProgram.hasOwnProperty('totolprogress') ? `${parseInt(fullProgram?.totolprogress).toFixed()}%` : '0%'}
                                                                    styles={buildStyles({
                                                                        // Rotation of path and trail, in number of turns (0-1)
                                                                        // rotation: 0.25,
                                        
                                                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                        strokeLinecap: "butt",
                                        
                                                                        // Text size
                                                                        textSize: "18px",
                                        
                                                                        // How long animation takes to go from one percentage to another, in seconds
                                                                        pathTransitionDuration: 0.5,
                                        
                                                                        // Can specify path transition in more detail, or remove it entirely
                                                                        // pathTransition: 'none',
                                        
                                                                        // Colors
                                                                        pathColor:"#F8A046",
                                                                textColor: "#323232",
                                                                trailColor: "#fdefe6",
                                                                      })}
                                                                />
                                                            </div>
                                                            ):(
                                                                <div className="svg-icon">
                                                                    <img src={clock_img} className="svg" />
                                                                </div>
                                                            )}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    ))}

                                    <div onClick={() =>{
                                        navigate("/program_settings", {state:{ myState: "progress", data:state }})
                                    }} className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" className="btn btn-outline-primary">Schedule a Session</button>
                                    </div>

                                    <div onClick={() =>{
                                        navigate("/mandatory_learning", {state:state})
                                    }} className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Assign a Learning</button>
                                    </div>

                                    {/* <div className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" className="btn btn-outline-primary btn-squared color-primary">Assign an Assessment</button>
                                    </div> */}

                                    <div className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" onClick={showModal} className="btn btn-outline-primary btn-squared color-primary">Request Worksheet</button>
                                    </div>

                                    <div className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" onClick={() =>navigate("/session_list", {state:state})} className="btn btn-outline-primary btn-squared color-primary">View Sessions</button>
                                    </div>
                                    <div className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" onClick={() =>navigate("/view_feedbacks", {state:state})} className="btn btn-outline-primary btn-squared color-primary">View Feedback</button>
                                    </div>
                                    <div className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" onClick={() =>navigate("/view_testimonials", {state:state})} className="btn btn-outline-primary btn-squared color-primary">View Testimonials</button>
                                    </div>
                                    <div className="col-xxl-6 col-sm-6 mb-25">
                                        <button type="button" onClick={() =>navigate("/view_ratings", {state:state})} className="btn btn-outline-primary btn-squared color-primary">View Rating</button>
                                    </div>

                                    <h4 className="text-capitalize fw-500 mb-25 program_par_org">Worksheets Requested </h4>

                                    <div className="col-md-12 mb-25">
                                    <div className="card border-0 px-25 h-100 box_shadow1">
                                        <div className="card-body p-0">
                                            <div className="selling-table-wrap selling-table-wrap--source">
                                                <div className="table-responsive">
                                                    <table className="table table--default table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Worksheet Name</th>
                                                                <th>Due Date</th>
                                                                <th>Requested by</th>
                                                                <th>File</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {fullProgram && fullProgram?.worksheetassigned?.map((i)=>(
                                                                <tr>
                                                                <td>{i.name}</td>
                                                                <td>{moment(i.due_date).format("DD MMM, YYYY")}</td>
                                                                <td>-</td>
                                                                <td>{i.files.split("/")[5]}</td>
                                                                <td onClick={() => {
                                                                    i?.files.split("|").map((j)=>{
                                                                        console.log(j)
                                                                        window.open(j, "_blank")
                                                                    })
                                                                }} style={{color:'#F8A046', fontWeight:'bold', cursor:'pointer'}}>View</td>
                                                            </tr>
                                                            ))}
                                                            {/* <tr>
                                                                <td>Session 1</td>
                                                                <td>Public Speaking</td>
                                                                <td>Santosh Bala</td>
                                                                <td>05 Jul, 2023</td>
                                                                <td>10:00 AM</td>
                                                            </tr> */}

                                                        </tbody>
                                                    </table>
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
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Worksheets</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={uploadWorksheet}>
                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <input type="text" value={worksheetName} onChange={e => setWorksheetName(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Name of the worksheet" />
                            </div>

                            <div className="col-md-12 mb-25">
                                <input 
                                    type="text"
                                    onClick={() => showCalc()}
                                    value={date}
                                    className="form-control ih-medium ip-gray radius-xs b-deep px-15" 
                                    placeholder="Due By" />
                                    {calc && (
                                        <Calendar
                                        onChange={(e) => onChange(e)}
                                        value={value}
                                        minDate={new Date()}
                                        />
                                    )}
                            </div>

                            <div className="col-md-12 mb-10">
                                <div className="countryOption">
                                    <Multiselect
                                        style={{ searchBox: { borderColor: "gray" } }}
                                        // isObject={false}
                                        disable={checked ? true : false}
                                        value={[{ id: 1, industry: "as" }]}
                                        options={listOfAcceptedMentee} // Options to display in the dropdown
                                        placeholder="Select Mentees"
                                        selectedValues={selectedMentee} // Preselected value to persist in dropdown
                                        onSelect={onSelectMentee} // Function will trigger on select event
                                        onRemove={onRemoveMentee} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        />
                                </div>
                            </div>

                            <div>
                                <input
                                    value="test"
                                    placeholder="Select All Mentees"
                                    type="checkbox"
                                    onChange={(e) => {
                                    setChecked(e.target.checked);
                                    }}
                                />
                                <label for="check-1">
                                    <span style={{marginLeft:'5px'}} className="checkbox-text fw-600">
                                    Select All Mentees
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-12 mb-10">
                                <div className="countryOption">
                                    {/* <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option value="">Select Mentees</option>
                                        {listOfAcceptedMentee&& listOfAcceptedMentee.map((i)=>(
                                            <option value={i.id}>{i.name}</option>
                                        ))}
                                    </select> */}
                                    <Multiselect
                                        style={{ searchBox: { borderColor: "gray" } }}
                                        // isObject={false}
                                        disable={checked1 ? true : false}
                                        value={[{ id: 1, industry: "as" }]}
                                        options={listOfAcceptedMentor} // Options to display in the dropdown
                                        placeholder="Select Mentors"
                                        selectedValues={selectedMentor} // Preselected value to persist in dropdown
                                        onSelect={onSelectMentor} // Function will trigger on select event
                                        onRemove={onRemoveMentor} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        />
                                </div>
                            </div>

                            <div>
                                <input
                                    value="test"
                                    placeholder="Select All Mentors"
                                    type="checkbox"
                                    onChange={(e) => {
                                    setChecked1(e.target.checked);
                                    }}
                                />
                                <label for="check-1">
                                    <span style={{marginLeft:'5px'}} className="checkbox-text fw-600">
                                    Select All Mentors
                                    </span>
                                </label>
                            </div>

                            {/* <div className="col-md-12 mb-20">
                                <div className="countryOption">
                                    <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option value="">Select Mentors</option>
                                        {listOfAcceptedMentor&& listOfAcceptedMentor.map((i)=>(
                                            <option value={i.id}>{i.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}


                            <div className="col-md-12 mb-25">
                                <label for="formFile" className="form-label">File</label>
                                <input 
                                    className="form-control ip-gray radius-xs b-deep px-15" 
                                    type="file" 
                                    id="customFile"
                                    multiple 
                                    onChange={(event) => {
                                        // setImageLocal(event.target.files)
                                        uploadWorksheetInput(event.target.files)
                                    }} />
                                    {worksheetNameArray && worksheetNameArray.map((i, index)=> (
                                        <div key={Namekey} style={{display:'flex', justifyContent:'space-between'}}>
                                        <p>{i}</p>
                                        <p style={{cursor:'pointer', color:'red'}} onClick={() =>{
                                            let tt = worksheetNameArray.splice(index, 1)
                                            setWorksheetsNameArray(tt)
                                            setNameKey(Math.random())
                                            }}>Delete</p>
                                    </div>
                                    ))}
                            </div>

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="submit" className="btn btn-primary btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Program_Progress;
