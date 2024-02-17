import Side_Bar from './sidebar';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL_APPLSURE, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Multiselect from 'multiselect-react-dropdown';

function Program_Settings() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [mentors, setMentors] = useState([])
    const [worksheetName, setWorksheetName] = useState("")
    const [subject, setSubject] = useState("")
    const [worksheetUrlString, setWorksheetUrlString] = useState("")
    const [emailType, setEmailType] = useState("")
    const [emailTitle, setEmailTitle] = useState("")
    const [emailBody, setEmailBody] = useState("")
    const [mentees, setMentees] = useState([])
    const [worksheetNameArray, setWorksheetsNameArray] = useState([])
    const [listOfAcceptedMentee, setListOfAcceptedMentee] = useState([])
    const [checked, setChecked] = useState(false)
    const [checked1, setChecked1] = useState(false)
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMentee1, setSelectedMentee1] = useState([])
    const [selectedMentee2, setSelectedMentee2] = useState([])
    const [selectedMenteeForAssignWorksheet, setSelectedMenteeForAssignWorksheet] = useState([])
    const [selectForReminderMentor, setSelectForReminderMentor] = useState([])
    const [selectForEmailMentor, setSelectForEmailMentor] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [selectedMentor, setSelectedMentor] = useState([])
    const [selectedMentor1, setSelectedMentor1] = useState([])
    const [selectedMentor2, setSelectedMentor2] = useState([])
    const [allEmailTemplate, setAllEmailTemplate] = useState([])
    const [selectedMentorForAssignWorksheet, setSelectedMentorForAssignWorksheet] = useState([])
    const [selectForReminderMentee, setSelectForReminderMentee] = useState([])
    const [selectForEmailMentee, setSelectForEmailMentee] = useState([])
    const [listOfAcceptedMentor, setListOfAcceptedMentor] = useState([])
    const [createdLearning, setCreatedLearning] = useState([])
    const [worksheetList, setWorksheetList] = useState([])
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [date, setDate] = useState("")
    const [value1, setValue1] = useState(new Date());
    const [calc1, setCalc1] = useState(false);
    const [date1, setDate1] = useState("")
    const [fullProgram, setFullProgram] = useState({})
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
        getEmailTemplate()
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const [showHello1, setShowHello1] = useState(false);
    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    const [showHello2, setShowHello2] = useState(false);
    const closeModal2 = () => setShowHello2(false);
    const showModal2 = () => setShowHello2(true);

    useEffect(() => {
        // filterBeforePublish()
    },[])
    
    useEffect(() => {
        getProgramMentee()
        getProgramMentor()
    },[])

    useEffect(() => {
        getFullDetails()
    },[])
    
    useEffect(() => {
        getLearnings()
        getWorksheets()
    },[])

    const getLearnings = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.data?.id,
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-learning-list`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.success){
            setCreatedLearning(result.learningDetails)
          }
          })
        .catch(error => console.log('error', error));
        
   } 

   const getWorksheets = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "program_id": state,
    });
    // console.log(raw)
    // return
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`${BASE_URL_APPLSURE_MENTORING}program-worksheet-list-new`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result.success){
            setWorksheetList(result.worksheetlist)
            // alert("Worksheet added successfully")
            // closeModal()
        }
        // navigate(-1)
    })
    .catch(error => console.log('error', error));
  }

    const getFullDetails = async() => {
        var myHeaders = new Headers();
          myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "program_id": state?.data?.id,
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
             
          })
          .catch(error => console.log('error', error));
    }

    const getProgramMentee = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state?.data?.id,
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
            "program_id":state?.data?.id,
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

    
    // const filterBeforePublish = async() => {
    //     let allMentor = JSON.parse(localStorage.getItem("selected_mentors"))
    //     let allMentee = JSON.parse(localStorage.getItem("selected_mentees"))
    //     if(allMentor != null){
    //         allMentor.map((i) => {
    //             if(i.isSelected == "Y"){
    //                 console.log(i)
    //                 ttMentor.push({org_id:localStorage.getItem("user_id"), user_id: i.meta_id, role:"mentor"})
    //             }
                
    //         })
    //     }
    //     if(allMentee != null){
    //         allMentee.map((i) => {
    //             if(i.isSelected == "Y"){
    //                 // console.log(i)
    //                 ttMentee.push({org_id:localStorage.getItem("user_id"), user_id: i.meta_id, role:"mentee"})
    //             }
                
    //         })
    //     }
    // }
    const createProgram = async() => {

        let ttMentor= []
        let ttMentee= []

        let allMentor = JSON.parse(localStorage.getItem("selected_mentors"))
        let allMentee = JSON.parse(localStorage.getItem("selected_mentees"))
        if(allMentor != null){
            allMentor.map((i) => {
                if(i.isSelected == "Y"){
                    console.log(i)
                    ttMentor.push({org_id:localStorage.getItem("user_id"), user_id: i.meta_id, role:"mentor"})
                }
                
            })
        }
        if(allMentee != null){
            allMentee.map((i) => {
                if(i.isSelected == "Y"){
                    // console.log(i)
                    ttMentee.push({org_id:localStorage.getItem("user_id"), user_id: i.meta_id, role:"mentee"})
                }
                
            })
        }
        
        if(ttMentor.length == 0){
            alert("Plese select atleast one mentor")
            return
        }
        if(ttMentee.length == 0){
            alert("Plese select atleast one mentee")
            return
        }
        // return
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "template_id":state?.data?.id,
            "name": state?.data?.name,
            "skills": state?.data?.skills,
            "objective": state?.data?.objective,
            "duration": state?.data?.duration,
            "type": state?.data?.type,
            "no_of_sessions": state?.data?.no_of_sessions,
            "summary": state?.data?.summary,
            "image": state?.data?.image,
            "eligibility": state?.data?.eligibility,
            "no_of_mentees": state?.data?.no_of_mentees,
            "no_of_mentor": state?.data?.no_of_mentor,
            "participation": state?.data?.participation,//1=mandotry,0=optional
            "growthscore_mentee": state?.data?.growthscore_mentee,
            "impactscore_mentor": state?.data?.impactscore_mentor,
            "define_evalutaion": state?.data?.define_evalutaion,
            "define_learnings": state?.data?.define_learnings,
            "define_assessment": state?.data?.define_assessment,
            "idp_creation": state?.data?.idp_creation,//1=mandotry,0=optional
            "start_date": state?.data?.start_date,
            "end_date": state?.data?.end_date,
            "cutt_off": state?.data?.cutt_off,
            "proposed_graduation": state?.data?.proposed_graduation,
            "mentor_users":ttMentor,
            "mentee_users": ttMentee
          });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${BASE_URL_APPLSURE_MENTORING}program-create`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            alert("Program published successfully")
            navigate(-1)
        })
        .catch(error => console.log('error', error));
        
    }

    const activeProgram = (value) => {

        console.log(value)
        
        function isBetween(startDate, endDate) {
            console.log(startDate)
            console.log(endDate)
            let today = new Date();
            return startDate <= today && today <= endDate;
        }
        
        // Example usage:
        var startDate = new Date(fullProgram?.program?.start_date.split(" ")[0]);
        var endDate = new Date(fullProgram?.program?.end_date.split(" ")[0]);
        

        if (isBetween(startDate, endDate)) {
            console.log("Today's date is between the start and end dates.");

            var myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
            myHeaders.append("Content-Type", "application/json");
      
            var raw = JSON.stringify({
              "program_id":state?.data?.id,
              "status":value
          });
      
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
      
            fetch(`${BASE_URL_APPLSURE_MENTORING}program-status-change`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.success){
                    if(value == 1){
                        alert("Program Activated Successfully")
                    }
                    if(value == 4){
                        alert("Program Started Successfully")
                    }
                    if(value == 3){
                        alert("Program Finished Successfully")
                    }
                    navigate(-1)
                }
            })
            .catch(error => console.log('error', error));
        } else {
            console.log("Today's date is not between the start and end dates.");
            alert("you cannot start the program.")
            return
        }


        // if (isBetween(fullProgram?.program?.start_date.split(" ")[0], fullProgram?.program?.end_date.split(" ")[0])) {
        //     console.log("Today's date is between the start and end dates.");
        // } else {
        //     console.log("Today's date is not between the start and end dates.");
        // }
        
        // if(new Date(fullProgram?.program?.start_date) > new Date()){
        //     console.log("if")
        //     console.log(fullProgram?.program?.start_date)
        //     console.log(fullProgram?.program?.end_date)
        // }else{
        //     console.log("else")
        //     console.log(fullProgram?.program?.start_date)
        //     console.log(fullProgram?.program?.end_date)
        // }

      }


      const uploadWorksheetInput = async (item) => {
        // setImagePath(item)
        console.log(item)
        let formData = new FormData()
        item.forEach((i,index) => {
            formData.append("uploadfile[]", item[index])
            formData.append("pathto", "program-worksheet")
            formData.append("id", state?.data?.id)

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

    const showCalc = () => {
        setCalc(!calc)
    }

    const onChange = (e) => {
        console.log(e)
        setValue(moment(e).format("YYYY-MM-DD"))
        setDate(moment(e).format("DD/MM/YYYY"))
        showCalc()
    }
    const showCalc1 = () => {
        setCalc1(!calc1)
    }

    const onChange1 = (e) => {
        console.log(e)
        setValue1(moment(e).format("YYYY-MM-DD"))
        setDate1(moment(e).format("DD/MM/YYYY"))
        showCalc1()
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
    const onSelectMentee1 = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentee"})
            // setnewSelectedTools(temp)
        })
        setSelectedMentee1(temp)
        setSelectForReminderMentee(temp1)
    }

    const onRemoveMentee1 = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentee"})
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentee1(temp)
        setSelectForReminderMentee(temp1)
    }
    const onSelectMentee2 = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentee"})
            // setnewSelectedTools(temp)
        })
        setSelectedMentee2(temp)
        setSelectForEmailMentee(temp1)
    }

    const onRemoveMentee2 = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentee"})
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentee2(temp)
        setSelectForEmailMentee(temp1)
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
    const onSelectMentor1 = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        setSelectedMentor1(temp)
        setSelectForReminderMentor(temp1)
    }

    const onRemoveMentor1 = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentor1(temp)
        setSelectForReminderMentor(temp1)
    }
    const onSelectMentor2 = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        setSelectedMentor2(temp)
        setSelectForEmailMentor(temp1)
    }

    const onRemoveMentor2 = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({user_id: i.id,  "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentor2(temp)
        setSelectForEmailMentor(temp1)
    }

    const uploadWorksheet = (e) => {
        e.preventDefault()
        // console.log(user)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.data?.id,
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
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
      }

    const createReminder = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.data?.id,
            "reminderDetails": [
                {
                    "subject": subject,
                    "date": value1,
                    "users": selectForReminderMentee.concat(selectForReminderMentor)
                }
            ]
        }
        );
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-reminder-create`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success){
                alert("Schedule reminder created successfully")
                closeModal1()
            }else{
                // alert()
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
      }

    const getEmailTemplate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.data?.id
        }
        );
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-email-template`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success){
                setAllEmailTemplate(result.emailtemplates)
            }else{
                // alert()
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
      }


    const sendEmail = (v) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.data?.id,
            "template_id": selectedTemplate,
            "title": emailTitle,
            "body": emailBody,
            "save_as_template": v,
            "users": selectForEmailMentee.concat(selectForEmailMentor)
        }
        );
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-email-create`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success){
                // setAllEmailTemplate(result.emailtemplates)
                closeModal2()
                alert("Email added and sent successfully")
            }else{
                // alert()
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
      }

// console.log(selectedTemplate)

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Program Settings</h4>
                                        </div>
                                    </div>
                                    <div className="layout-button">
                                        {state.myState == 'created' && (
                                            <>
                                                <NavLink className="navbar-link" to="/add_mentors" state={{ myState: state.data }}><button type="button" className="btn btn-primary btn-default btn-squared">Add Mentors</button></NavLink>
                                                <NavLink className="navbar-link" to="/add_mentees" state={{ myState: state.data }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Add Mentees</button></NavLink>
                                            </>
                                        )}
                                        {state.myState == "published"  && (
                                            <>
                                                <NavLink className="navbar-link" to="/match_making" state={{ myState: state.data }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Match-making</button></NavLink>
                                                <NavLink className="navbar-link" to="/confirmed_participants" state={{ myState: state.data }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Confirmed Participants</button></NavLink>
                                                <NavLink className="navbar-link" to="/edit_mentors" state={{ myState: state.data }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Edit Mentors</button></NavLink>
                                                <NavLink className="navbar-link" to="/edit_mentees" state={{ myState: state.data }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Edit Mentees</button></NavLink>
                                            </>
                                        )}
                                        {state.myState == "progress" && (
                                            <>
                                                <NavLink className="navbar-link" to="/add_mentors"><button type="button" className="btn btn-outline-primary btn-squared color-primary">Match-making</button></NavLink>
                                                <NavLink className="navbar-link" to="/confirmed_participants" state={{ myState: state.data }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Confirmed Participants</button></NavLink>
                                                <NavLink className="navbar-link" to="/edit_mentors" state={{ myState: state.data }}><button  type="button" className="btn btn-outline-primary btn-squared color-primary">Edit Mentors</button></NavLink>
                                                <NavLink className="navbar-link" to="/edit_mentees" state={{ myState: state.data }}><button type="button" className="btn btn-outline-primary btn-squared color-primary">Edit Mentees</button></NavLink>
                                            </>
                                        )}
                                        
                                        
                                    </div>
                                </div>
                            </div>



                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Mandatory Learnings</h2>
                                            </div>
                                            <div className="layout-button">
                                                {createdLearning && createdLearning.length > 0 && (

                                                <NavLink className="navbar-link" to="/assigned_learning" state={state?.data}><button type="button" className="btn btn-outline-primary btn-default btn-squared btn-sm">Edit</button></NavLink>
                                                )}
                                                <NavLink className="navbar-link" to="/mandatory_learning" state={state?.data}><button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Request Worksheets</h2>
                                            </div>
                                            <div className="layout-button">
                                                {worksheetList && worksheetList.length > 0 && (

                                                <NavLink className="navbar-link" to="/requested_worksheet" state={state?.data?.id}><button type="button" className="btn btn-outline-primary btn-default btn-squared btn-sm">Edit</button></NavLink>
                                                )}
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm" onClick={showModal}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Mandatory Assessments</h2>
                                            </div>
                                            <div className="layout-button">
                                                <NavLink className="navbar-link" to="/mandatory_assessments"><button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Schedule Inaugural Session</h2>
                                            </div>
                                            {fullProgram?.inaugralsession?.length > 0 ? 
                                                <div className="layout-button">
                                                    <button type="button" onClick={() => navigate("/inaugural_sessionlist", {state:state})} className="btn btn-outline-primary btn-default btn-squared btn-sm">Edit</button>
                                                    <button type="button" onClick={() => navigate("/create_inaugural_session", {state:state})} className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                                </div> :

                                                <div className="layout-button">
                                                    <button type="button" onClick={() => navigate("/create_inaugural_session", {state:state})} className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                                </div>
                                            }
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Schedule a group session</h2>
                                            </div>
                                            {fullProgram?.groupsessionlist?.length > 0 ? 
                                                <div className="layout-button">
                                                    <button type="button" onClick={() => navigate("/group_sessionlist", {state:fullProgram})} className="btn btn-outline-primary btn-default btn-squared btn-sm">Edit</button>
                                                    <button type="button" onClick={() => navigate("/create_group_session", {state:state})} className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                                </div> :

                                                <div className="layout-button">
                                                    <button type="button" onClick={() => navigate("/create_group_session", {state:state})} className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Cohort Schedule</h2>
                                            </div>
                                            {fullProgram?.cohartsessionlist?.length > 0 ? 
                                                <div className="layout-button">
                                                    <button type="button" onClick={() => navigate("/cohort_sessionlist", {state:state})} className="btn btn-outline-primary btn-default btn-squared btn-sm">Edit</button>
                                                    <button type="button" onClick={() => navigate("/create_cohort_session", {state:state})} className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                                </div> :

                                                <div className="layout-button">
                                                    <button type="button" onClick={() => navigate("/create_cohort_session", {state:state})} className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Schedule Reminders</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm" onClick={showModal1}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">Send Email Messages</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm" onClick={showModal2}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-sm-12 mb-25">
                                <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                    <div className="overview-content w-100">
                                        <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                            <div className="ap-po-details__titlebar">
                                                <h2 className="reposi">IDP Status</h2>
                                            </div>
                                            <div className="layout-button">
                                                <button type="button" className="btn btn-primary btn-default btn-squared btn-sm" onClick={() => navigate("/idp_status", {state:state})}>View</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="layout-button">
                                <div className="btn_center">
                                    <button type="button" className="btn btn-outline-primary btn-squared color-primary">Preview</button>
                                    {state.myState == "published" && state?.data?.status == 0 && (
                                        <button type="button" onClick={() => activeProgram(1)} className="btn btn-primary btn-default btn-squared">Active</button>
                                    )} 
                                    {state.myState == "published" && state?.data?.status == 1 && (
                                        <button type="button" onClick={() => activeProgram(4)} className="btn btn-primary btn-default btn-squared">Start</button>
                                    )} 
                                    {state.myState == "progress" && state?.data?.status == 4 && (
                                        <button type="button" onClick={() => activeProgram(3)} className="btn btn-primary btn-default btn-squared">Finish</button>
                                    )} 
                                    {state.myState == "created" && 
                                    <button type="button" onClick={() => createProgram()} className="btn btn-primary btn-default btn-squared">Publish</button>
                                    } 
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
            
            {/* REQUEST WORKSHEET MODAL */}
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
                                    {worksheetNameArray && worksheetNameArray.map((i)=> (
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <p>{i}</p>
                                        <p style={{cursor:'pointer', color:'red'}} onClick={() =>{}}>Delete</p>
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

            {/* SEND REMINDER MODAL */}
            <Modal show={showHello1} onHide={closeModal1}>
                <Modal.Header closeButton>
                    <Modal.Title>Schedule Reminders</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={createReminder}>
                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Subject" />
                            </div>

                            <div className="col-md-12 mb-25">
                                <input 
                                    type="text"
                                    onClick={() => showCalc1()}
                                    value={date1}
                                    className="form-control ih-medium ip-gray radius-xs b-deep px-15" 
                                    placeholder="Date" />
                                    {calc1 && (
                                        <Calendar
                                        onChange={(e) => onChange1(e)}
                                        value={value1}
                                        minDate={new Date()}
                                        />
                                    )}
                            </div>

                            <div className="col-md-12 mb-10 mb-25">
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
                                        disable={checked ? true : false}
                                        value={[{ id: 1, industry: "as" }]}
                                        options={listOfAcceptedMentee} // Options to display in the dropdown
                                        placeholder="Select Mentees"
                                        selectedValues={selectedMentee1} // Preselected value to persist in dropdown
                                        onSelect={onSelectMentee1} // Function will trigger on select event
                                        onRemove={onRemoveMentee1} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        />
                                </div>
                            </div>

                            {/* <div>
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
                            </div> */}
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
                                        selectedValues={selectedMentor1} // Preselected value to persist in dropdown
                                        onSelect={onSelectMentor1} // Function will trigger on select event
                                        onRemove={onRemoveMentor1} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        />
                                </div>
                            </div>

                            {/* <div>
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
                            </div> */}

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


                            {/* <div className="col-md-12 mb-25">
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
                                    {worksheetNameArray && worksheetNameArray.map((i)=> (
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <p>{i}</p>
                                        <p style={{cursor:'pointer', color:'red'}} onClick={() =>{}}>Delete</p>
                                    </div>
                                    ))}
                            </div> */}

                            <div className="col-md-12">
                                <div className="mt-0">
                                    <button type="submit" className="btn btn-primary btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

            {/* SEND EMAIL MODAL */}
            <Modal show={showHello2} onHide={closeModal2}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Email Messages</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={createReminder}>
                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <select value={emailType} onChange={e => setEmailType(e.target.value)} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option value="">Select Type</option>
                                        <option value="Choose from template">Choose from template</option>
                                        <option value="Create">Create</option>
                                    </select>
                            </div>
                            {emailType == "Choose from template" && (
                                <div className="col-md-12 mb-25">
                                    <select value={selectedTemplate} onChange={e => {
                                        setSelectedTemplate(e.target.value)
                                        allEmailTemplate?.map((i)=>{
                                            if(i.id == e.target.value){
                                                setEmailTitle(i.title)
                                                setEmailBody(i.body)
                                            }
                                        })
                                        }} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                        <option value="">Select Template</option>
                                        {allEmailTemplate && allEmailTemplate.map((i) => (
                                            <option value={i.id}>{i.title}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            
                            <div className="col-md-12 mb-25">
                                <input type="text" value={emailTitle} onChange={e => {


                                    // if(selectedTemplate.length > 0){
                                    //     console.log("first if")
                                    //     allEmailTemplate?.map((i)=>{
                                    //         if(i.id == selectedTemplate){
                                    //             console.log("second if")
                                    //             setEmailTitle(i.title)
                                    //         }
                                    //     })
                                    // }else{
                                    //     console.log("first else")
                                    // }
                                        setEmailTitle(e.target.value)
                                    
                                    }} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Message Subject" disabled={emailType != "Create" ? true : false}/>
                            </div>

                            <div className="col-md-12 mb-25">
                              <textarea value={emailBody} onChange={e => setEmailBody(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Message Body" required disabled={emailType != "Create" ? true : false}></textarea>
                            </div>

                            <div className="col-md-12 mb-10 mb-25">
                                <div className="countryOption">
                                    <Multiselect
                                        style={{ searchBox: { borderColor: "gray" } }}
                                        // isObject={false}
                                        disable={checked ? true : false}
                                        value={[{ id: 1, industry: "as" }]}
                                        options={listOfAcceptedMentee} // Options to display in the dropdown
                                        placeholder="Select Mentees"
                                        selectedValues={selectedMentee2} // Preselected value to persist in dropdown
                                        onSelect={onSelectMentee2} // Function will trigger on select event
                                        onRemove={onRemoveMentee2} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        />
                                </div>
                            </div>

                            {/* <div>
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
                            </div> */}
                            <div className="col-md-12 mb-10">
                                <div className="countryOption">
                                    <Multiselect
                                        style={{ searchBox: { borderColor: "gray" } }}
                                        // isObject={false}
                                        disable={checked1 ? true : false}
                                        value={[{ id: 1, industry: "as" }]}
                                        options={listOfAcceptedMentor} // Options to display in the dropdown
                                        placeholder="Select Mentors"
                                        selectedValues={selectedMentor2} // Preselected value to persist in dropdown
                                        onSelect={onSelectMentor2} // Function will trigger on select event
                                        onRemove={onRemoveMentor2} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        />
                                </div>
                            </div>

                            {/* <div>
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
                            </div> */}

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


                            {/* <div className="col-md-12 mb-25">
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
                                    {worksheetNameArray && worksheetNameArray.map((i)=> (
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <p>{i}</p>
                                        <p style={{cursor:'pointer', color:'red'}} onClick={() =>{}}>Delete</p>
                                    </div>
                                    ))}
                            </div> */}

                            <div className="col-md-12">
                                <div className="layout-button mt-20">
                                    {emailType == "Create" && (
                                        <button type="button" onClick={() => sendEmail("1")} className="btn btn-outline-primary btn-squared color-primary m-auto">Save as template and send</button>
                                    )}
                                    <button type="button" onClick={() => sendEmail("0")} className="btn btn-primary btn-default btn-squared m-auto">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Program_Settings;
