import React, { useEffect, useState } from 'react'
import Side_bar from './sidebar';
import Multiselect from 'multiselect-react-dropdown';
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';

function Create_IDP() {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [programList, setProgramList] = useState([])
    const [key, setKey] = useState(0)
    const [idpName, setIdpName] = useState("")
    const [programName, setProgramName] = useState("")
    const [gap, setGap] = useState("")
    const [objective, setObjective] = useState("")
    const [activity, setActivity] = useState("")
    const [measure, setMeasure] = useState("")
    const [resources, setResources] = useState("")
    const [menteeList, setMenteeList] = useState([])
    const [selectedMentee, setSelectedMentee] = useState([])
    const [selectedMenteeForAssign, setSelectedMenteeForAssign] = useState([])
    const [skills, setSkillsList] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [date1, setDate1] = useState("")
    const [date2, setDate2] = useState("")
    const [calc1, setCalc1] = useState(false);
    const [calc2, setCalc2] = useState(false);
    const [value1, setValue1] = useState(new Date());
    const [value2, setValue2] = useState(new Date());
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
        fetchListData()
    },[])

    const fetchListData = async() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "status":"4"
    });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch(`${BASE_URL_APPLSURE_MENTORING}user/user-program-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log("==",result)
        //   return
        if(result.success){
            setProgramList(result.programs)
        }
         
      })
      .catch(error => console.log('error', error));

      
    }

    const [inputFields, setInputFields]=useState([{
        mentor:"",
        skill:"",
        gap:"",
        objective:"",
        activity:"",
        measure:"",
        resources:"",
    }])

    const addMore = () => {
        setInputFields([...inputFields, {
            mentor:"",
            skill:"",
            gap:"",
            objective:"",
            activity:"",
            measure:"",
            resources:"",
        }])

    }

    useEffect(() => {
        getSkills()
      },[])
      const getSkills = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}organisation-info/skills`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        // console.log("skill list", response)
        if(response.success){
            let tt = []
            response.data.map((i) => {
                tt.push(i.skill)
            })
            console.log(tt)
            setSkillsList(tt)
        }
}

    const onSelectMentee = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({"user_id" : i.id, "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        setSelectedMentee(temp)
        setSelectedMenteeForAssign(temp1)
    }

    const onRemoveMentee = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        let temp1 = []
        selectedList.map((i) => {
            temp.push(i)
            temp1.push({"user_id" : i.id, "role": "mentor"})
            // setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
        setSelectedMentee(temp)
        setSelectedMenteeForAssign(temp1)
    }

    const onSelectSkill = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i)
            setSelectedSkills(temp)
        })
        // setSelectedBSkill(selectedList)
    }
    
    const onRemoveSkill = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i)
            setSelectedSkills(temp)
        })
        // setSelectedBSkill(selectedList)
    }

    const showCalc1 = () => {
        setCalc1(!calc1)
    }
    const showCalc2 = () => {
        setCalc2(!calc2)
    }

    const onChange1 = (e) => {
        console.log(e)
        setValue1(e)
        setDate1(moment(e).format("DD-MM-YYYY"))
        // setAPIDate1(moment(e).format("YYYY-MM-DD"))
        showCalc1()
    }
    const onChange2 = (e) => {
        console.log(e)
        setValue2(e)
        setDate2(moment(e).format("DD-MM-YYYY"))
        // setAPIDate2(moment(e).format("YYYY-MM-DD"))
        showCalc2()
    }

    const createIDP = async(e) => {
        e.preventDefault()

        // console.log(inputFields)
        // if()
        let tt = []
        inputFields.map((i) => {
            tt.push({
                "program_id":programName,
                "name": idpName,
                "start_date": date1,
                "end_date": date2,
                "skills": i.skill,
                "experience_gaps":i.gap,
                "devleopment_objective": i.objective,
                "devleopment_activity": i.activity,
                "measures": i.measure,
                "support_resources":i.resources,
                "users": [
                    {
                        "user_id": i.mentor,
                        "role": "mentor"
                    }
                ]
            })
        })
        // console.log(tt)
        // return
        const token = await localStorage.getItem("program_token_node")
        // const body = {
        //     "org_id": localStorage.getItem("org_id"),
        //     "idpDetails": [
        //         {
        //             "program_id":programName,
        //             "name": idpName,
        //             "start_date": date1,
        //             "end_date": date2,
        //             "skills": selectedSkills.toString(),
        //             "experience_gaps":gap,
        //             "devleopment_objective": objective,
        //             "devleopment_activity": activity,
        //             "measures": measure,
        //             "support_resources":resources,
        //             "users": selectedMenteeForAssign
        //         }
        //     ]
        // }
        const body = {
            "org_id": localStorage.getItem("org_id"),
            "idpDetails": tt
        }

    
        
        console.log(body)
        return
        const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/ipdcreate`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": token,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("feedback res", response)
        if(response.success){
            alert("IDP has been created successfully")
            // setTestimonial("")
            // closeModal1()
        }else{
            alert(response.message)
            // setTestimonial("")
            // closeModal1()
        }
      
    } 

    const getProgramMentee = async(id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":id,
            "role":"mentor" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            let pp = []
            result.userlist?.map((i) => {
              pp.push({id: i.user_id, name: i.user_meta?.name})
            })
            console.log(pp)
            setMenteeList(pp)
          })
        .catch(error => console.log('error', error));
        
    }

    const handleChange = (index, evnt) => {
        let { name, value,maxLength } = evnt.target;
        getMentorsSkills(value)
        console.log(index)
        console.log(name, value,maxLength)
        if(value.length > 0 && name != "email"){
            value = value[0].toUpperCase() + value.slice(1);
        }
        if(value.length > 0 && name == "yearsWithCompany"){
            value = value.slice(0, maxLength)
       }

        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
    }
    

    const getMentorsSkills = async (id) => {
        const btoken = `Bearer ${token}`; 
        const res = await fetch(`${BASE_URL}organisation-admins/${id}/mentor-mentee-profile`,{
            method:'GET',
            headers:{
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
            },
          })
          const response = await res.json()
          console.log(response.data.expertise)
          let temp = []
          let temp1 = []
          for(let i of response.data.expertise?.businessSkillsGoodAt){
            temp.push(i)
        }
          for(let i of response.data.expertise?.coreSkillsGoodAt){
            temp1.push(i)
        }
            const result = [...temp, ...temp1];
            console.log(result)
            let tt = []
            result.map((i) => {
                tt.push(i.skill)
            })
            console.log(tt)
            setSkillsList(tt)
            // setSkillsList(result)

    }

  return (
    <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                        {/* <div
                  style={{ display: "flex" }}
                  className="col-lg-12 col-sm-12 col-md-12 mb-25"
                >
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
                    Mentees
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
                      color: "#f8a046",
                      fontWeight: "400",
                      lineHeight: "22px",
                      cursor: "pointer",
                      marginTop: "2px",
                    }}
                  >
                    Add Mentees
                  </p>
                        </div> */}
                            <div className="col-lg-12">
                                <div style={{marginBottom:'0px'}} className="breadcrumb-main user-member justify-content-sm-between">
                                <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                    <h4 className="text-capitalize fw-500 breadcrumb-title">
                                    Create IDP
                                    </h4>
                                    </div>
                                    
                                </div>
                                </div>
                                <p>Please fill your IDP for effective goal measurement and program outcome.</p>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                    <form onSubmit={createIDP}>
                                            <div key={key} className="row">
                                                {/* {inputFields.map((data, index)=> (
                                                    <> */}
                                                    <div className="col-md-6 mb-25">
                                                    <input name='idpName' value={idpName} onChange={(evnt) => setIdpName(evnt.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="IDP Name" required/>
                                                </div>

                                                {/* <div className="col-md-6 mb-25">
                                                    <input name='email' value={data.email} onChange={(evnt) => handleChange(index, evnt)} type="email" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Email" required/>
                                                </div> */}
                                                <div className="col-md-6 mb-25">
                                                        <div class="countryOption">
                                                            <select name='programName' value={programName} onChange={(evnt) => {
                                                                setProgramName(evnt.target.value)
                                                                getProgramMentee(evnt.target.value)
                                                                }} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                                <option value="">Program Name</option>
                                                                {programList.map((i) => (
                                                                    <option value={i.program_id}>{i?.program_model?.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>
                                                <div className="col-md-6 mb-25">
                                                    <input
                                                        onClick={() =>showCalc1()}
                                                        value={date1}
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="Start Date"  required/>
                                                        {calc1 && (
                                                            <Calendar onChange={e => onChange1(e)} value={value1} minDate={new Date()} />
                                                        )}
                                                    </div>

                                                    <div className="col-md-6 mb-25">
                                                    <input
                                                        onClick={() =>showCalc2()}
                                                        value={date2} 
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="End Date"  required/>
                                                        {calc2 && (
                                                            <Calendar onChange={e => onChange2(e)} value={value2} minDate={new Date()} />
                                                        )}
                                                    </div>

                                                    <hr/>
                                                
                                                {inputFields.map((data, index)=> (
                                                    <>
                                                <div className="col-md-6 mb-25">
                                                <div class="countryOption">
                                                    {/* <Multiselect
                                                        style={{ searchBox: { borderColor: 'gray' } }}
                                                        // selectionLimit='1'
                                                        // singleSelect={true}
                                                        options={menteeList} // Options to display in the dropdown
                                                        placeholder='Select Mentors'
                                                        selectedValues={selectedMentee} // Preselected value to persist in dropdown
                                                        onSelect={onSelectMentee} // Function will trigger on select event
                                                        onRemove={onRemoveMentee} // Function will trigger on remove event
                                                        displayValue="name" // Property name to display in the dropdown options
                                                    /> */}
                                                    <select name='mentor' value={data.mentor} onChange={(evnt) => handleChange(index, evnt)}  class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Mentor</option>
                                                            {menteeList.map((i) => (
                                                                <option value={i.id}>{i?.name}</option>
                                                            ))}
                                                        </select>
                                                </div>
                                                </div>
                                                
                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                    <Multiselect
                                                        style={{ searchBox: { borderColor: 'gray' } }}
                                                        isObject={false}
                                                        required
                                                        options={skills} // Options to display in the dropdown
                                                        placeholder='Skill(s)'
                                                        selectedValues={selectedSkills} // Preselected value to persist in dropdown
                                                        onSelect={onSelectSkill} // Function will trigger on select event
                                                        onRemove={onRemoveSkill} // Function will trigger on remove event
                                                        displayValue="skill" // Property name to display in the dropdown options
                                                    />
                                                    {/* <select name='skill' value={data.skill} onChange={(evnt) => handleChange(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                                <option value="">Skill</option>
                                                                {skills.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                            </select> */}
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input name='gap' value={data.gap} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Experience Gaps" required/>
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <input name='objective' value={data.objective} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Development Objective" required/>
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <input name='activity' value={data.activity} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Development Activity" required/>
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <input name='measure' value={data.measure} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Measure" required/>
                                                </div>


                                                <div className="col-md-6 mb-25">
                                                    <input name='resources' value={data.resources} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Support/Resource" required/>
                                                </div>
                                                {/* <hr/> */}
                                                </>
                                                ))}
                                                    
                                                {/* <div className="col-md-12">
                                                    <div className="mt-0">
                                                        <p onClick={() =>addMore()} className="color-light-petrol fw-500 mb-0"><i className="las la-plus fs-16"></i>ADD MORE</p>
                                                    </div>
                                                </div> */}

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        {/* <button onClick={() => addMentorFun()} type="button" className="btn btn-primary btn-default btn-squared m-auto">Add</button> */}
                                                        <button type="submit" className="btn btn-light-petrol btn-default btn-squared m-auto">Create</button>
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

            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <FileUploader onChange={changeHandler}
                                    onSelect={handleSelect}
                                    name="file"
                                    types={fileTypes}
                                    fileOrFiles={file} >
                                    <div className="box_dash justify-content-center text-center">
                                        <img src={uploads_img} />
                                        <p className="browser">Browse Files to upload</p>
                                    </div>
                                </FileUploader>
                                
                            </div>
                            <p>{file ? file.name : ""}</p>
                            <div className="layout-button mt-15">
                                <div className="btn_center">
                                    <button type="button" onClick={()=>downloadSample()} className="btn btn-outline-primary btn-squared color-primary">Download Sample File</button>
                                    <button type="button" onClick={()=> uploadCSV()} className="btn btn-primary btn-default btn-squared">Upload</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal> */}

            {/* <Modal show={showSuccess} onHide={hideAddModel}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign:'center'}}>
                    <img src={success_msg}/>
                    <h3 style={{marginTop:'10px'}}>Mentee Added Successfully</h3>
                    </div>
                </Modal.Body>
            </Modal> */}
        </div>
  )
}

export default Create_IDP