import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState, useRef } from 'react';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_APPLSURE, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import Multiselect from 'multiselect-react-dropdown';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function Edit_Worksheet_Request() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const inputFile = useRef(null);
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [Name, setName] = useState(state?.worksheet?.name)
    const [date, setDate] = useState(moment(state?.worksheet?.due_date).format("YYYY-MM-DD"))
    const [value, setValue] = useState(new Date());
    const [calc, setCalc] = useState(false);
    const [listOfAcceptedMentor, setListOfAcceptedMentor] = useState([])
    const [listOfAcceptedMentee, setListOfAcceptedMentee] = useState([])
    const [selectedMentor, setSelectedMentor] = useState([])
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMentorForAssignWorksheet, setSelectedMentorForAssignWorksheet] = useState([])
    const [selectedMenteeForAssignWorksheet, setSelectedMenteeForAssignWorksheet] = useState([])
    const [imageLocal, setImageLocal] = useState(null)
    const [fileUrl, setFileUrl] = useState([])
    const [FileUrlString, setFileUrlString] = useState(state?.worksheet?.files)
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    useEffect(() => {
        let tt= []
        let nn = state?.mentors?.map((i) => {
            console.log(i)
            tt.push({user_id: i.user_id,  "role": "mentor"})
            return ({...i , name : i.user_meta?.name})
        })
        setSelectedMentor(nn)
        setSelectedMentorForAssignWorksheet(tt)

        let pp = []
        let mm = state?.mentees?.map((i) => {
            pp.push({user_id: i.user_id,  "role": "mentee"})
            return ({...i , name : i.user_meta?.name})
        })
       setSelectedMentee(mm)
       setSelectedMenteeForAssignWorksheet(pp)

       let jj = state?.worksheet?.files?.split("|")
       console.log(jj)
       let ij = []
       jj.map((i) => {
        ij.push(i.split("/")[5])
       })
       setFileUrl(ij)
    },[])
    useEffect(() => {
        getProgramMentee()
        getProgramMentor()
    },[])


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



    const editWorksheet = async(e) => {
        e.preventDefault()
        const token = await localStorage.getItem("program_token_node")
        const body = {
            "id": state?.worksheet?.id,
            "name": Name,
            "due_date": date,
            "files": FileUrlString,
            "users": selectedMenteeForAssignWorksheet.concat(selectedMentorForAssignWorksheet)
        }
              console.log(body)
            //   return
              const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}program-worksheet-edit`,{
                  method:'POST',
                  headers:{
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": token,
                  },
                  body:JSON.stringify(body)
                })
                const response = await res.json()
              console.log(response) 
              if(response.success){
                alert("Worksheet updated successfully")
                navigate(-1)
              }else{
                alert("Something went wrong")
            }

    }

    const getProgramMentee = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":state?.worksheet?.program_id,
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
            "program_id":state?.worksheet?.program_id,
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

const uploadFileInput = async (item, number) => { 
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
        setFileUrlString(response.data)
        let temp = []
        if(response.nameimg.split("|") != undefined){
            response.nameimg.split("|")?.map((i)=> {
                // console.log(i)
                temp.push(i)
            })
        }
            console.log(temp) 
            // setWorksheetUrl(response.data)
            setFileUrl(temp)
    }
}


const showCalc = () => {
    setCalc(!calc)
}

const onChange = (e) => {
    console.log(e)
    setValue(e)
    setDate(moment(e).format("YYYY-MM-DD"))
    // getTimeSlots(moment(e).format("YYYY-MM-DD"))
    showCalc()
}

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between ">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Edit Worksheet Request</h4>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form onSubmit={editWorksheet}>
                                            <div className="row">
                                                <div className="col-md-6 mb-25">
                                                    <input value={Name} onChange={e => setName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Name of the worksheet" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input
                                                    onClick={() => showCalc()}
                                                    value={date}
                                                
                                                    className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15"
                                                    placeholder="Due By"
                                                    required
                                                    />
                                                    {calc && (
                                                    <Calendar
                                                        onChange={(e) => onChange(e)}
                                                        value={value}
                                                        minDate={new Date()}
                                                    />
                                                    )}
                                                </div>
                                                
                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <Multiselect
                                                            style={{ searchBox: { borderColor: 'gray' } }}
                                                            // isObject={false}
                                                            selectionLimit="3"
                                                            value={[{ id: 1, industry: "as" }]}
                                                            options={listOfAcceptedMentee} // Options to display in the dropdown
                                                            placeholder='Select Mentees'
                                                            selectedValues={selectedMentee} // Preselected value to persist in dropdown
                                                            onSelect={onSelectMentee} // Function will trigger on select event
                                                            onRemove={onRemoveMentee} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <Multiselect
                                                            style={{ searchBox: { borderColor: 'gray' } }}
                                                            // isObject={false}
                                                            selectionLimit="3"
                                                            value={[{ id: 1, industry: "as" }]}
                                                            options={listOfAcceptedMentor} // Options to display in the dropdown
                                                            placeholder='Select Mentors'
                                                            selectedValues={selectedMentor} // Preselected value to persist in dropdown
                                                            onSelect={onSelectMentor} // Function will trigger on select event
                                                            onRemove={onRemoveMentor} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-30">
                                                    <label for="formFile" class="form-label">Upload a File</label>
                                                    <input onChange={(event) => {
                                                                            setImageLocal(event.target.files)
                                                                            uploadFileInput(event.target.files,"2")
                                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" ref={inputFile} multiple/>
                                                                        {fileUrl?.map((i)=> (
                                                                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                                                            
                                                                            <p>{i}</p>
                                                                            <p style={{cursor:'pointer', color:'red'}} onClick={() =>{
                                                                                if (inputFile.current) {
                                                                                    inputFile.current.value = "";
                                                                                    inputFile.current.type = "text";
                                                                                    inputFile.current.type = "file";
                                                                                    
                                                                                    setFileUrl([])
                                                                                }

                                                                            }}>Delete</p>
                                                                        </div>
                                                                        ))}
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        <button type="submit" className="btn btn-primary btn-default btn-squared m-auto">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

        </div>

    );
}

export default Edit_Worksheet_Request;
