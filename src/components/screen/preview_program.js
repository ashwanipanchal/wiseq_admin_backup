import moment from 'moment';
import program_img from '../../img/resour.png';
import { BASE_URL, BASE_URL_APPLSURE } from '../../services/Config';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Multiselect from 'multiselect-react-dropdown';

function Preview_Program() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [skills, setSkillsList] = useState([])
    const [programName, setProgramName] = useState("")
    const [selectedSkill, setSelectedSkill] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [programObj, setProgramObj] = useState("")
    const [selectedProgramType, setSelectedProgramType] = useState("")
    const [sessionNumber, setsessionNumber] = useState("")
    const [programSummary, setProgramSummary] = useState("")
    const [photoString, setPhotoString] = useState("")
    const [photoUrlArray, setPhotoUrlArray] = useState([])
    const [duration, setduration] = useState("")
    const [durationType, setDurationType] = useState("")
    const [participation, setParticipation] = useState(null)
    const [idp, setIDP] = useState(null)
    //TAB2 States
    const [eligibility, setEligibility] = useState("")
    const [menteeNumber, setMenteeNumber] = useState("")
    const [mentorNumber, setMentorNumber] = useState("")


    //Tab3 
    const [menteeGrowthScore, setMenteeGrowthScore] = useState("")
    const [mentorImpactScore, setMentorImpactScore] = useState("")
    const [evaluationMetrics, setEvaluationMetrics] = useState("")
    const [define_assessment, setdefine_assessment] = useState("")
    const [define_learnings, setdefine_learnings] = useState("")

    //Tab4
    const [calc1, setCalc1] = useState(false);
    const [calc2, setCalc2] = useState(false);
    const [calc3, setCalc3] = useState(false);
    const [calc4, setCalc4] = useState(false);
    const [value1, setValue1] = useState(new Date());
    const [value2, setValue2] = useState(new Date());
    const [value3, setValue3] = useState(new Date());
    const [value4, setValue4] = useState(new Date());
    const [date1, setDate1] = useState("")
    const [date2, setDate2] = useState("")
    const [date3, setDate3] = useState("")
    const [date4, setDate4] = useState("")
    const [apiDate1, setAPIDate1] = useState("")
    const [apiDate2, setAPIDate2] = useState("")
    const [apiDate3, setAPIDate3] = useState("")
    const [apiDate4, setAPIDate4] = useState("")

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
            setSkillsList(tt)
        }
}

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
        getPrevValues()
    },[])

    const getPrevValues = async() => {
        let temp = []
        state.skills.split(",")?.map((i) => {
            temp.push(i)
        })

        setSelectedSkill(temp)
        setProgramName(state.name)
        setProgramObj(state.objective)
        setSelectedProgramType(state.type)
        setduration(state.duration.split(" ")?.[0])
        setDurationType(state.duration.split(" ")?.[1])
        setsessionNumber(state.no_of_sessions)
        setEligibility(state.eligibility)
        setProgramSummary(state.summary)
        setPhotoString(state.image)
        setParticipation(state.participation)
        setIDP(state.idp_creation)
        setMenteeNumber(state.no_of_mentees)
        setMentorNumber(state.no_of_mentor)
        setMenteeGrowthScore(state.growthscore_mentee)
        setMentorImpactScore(state.impactscore_mentor)
        setEvaluationMetrics(state.define_evalutaion)
        setdefine_learnings(state.define_learnings)
        setdefine_assessment(state.define_assessment)
        setDate1(moment(new Date(state.start_date)).format("DD-MM-YYYY"))
        setDate2(moment(new Date(state.end_date)).format("DD-MM-YYYY"))
        setDate3(moment(new Date(state.cutt_off)).format("DD-MM-YYYY"))
        setDate4(moment(new Date(state.proposed_graduation)).format("DD-MM-YYYY"))
        setAPIDate1(moment(new Date(state.start_date)).format("YYYY-MM-DD"))
        setAPIDate2(moment(new Date(state.end_date)).format("YYYY-MM-DD"))
        setAPIDate3(moment(new Date(state.cutt_off)).format("YYYY-MM-DD"))
        setAPIDate4(moment(new Date(state.proposed_graduation)).format("YYYY-MM-DD"))
    }

    const uploadPhoto = async (item, number) => {
        let formData = new FormData()
        item.forEach((i,index) => {
            formData.append("uploadfile[]", item[index])
            formData.append("pathto", "program-template")
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
            setPhotoString(response.data)
            let temp = []
            if(response.data?.split("|") != undefined){
                response.data?.split("|")?.map((i)=> {
                    temp.push(i)
                })
            }
                console.log(temp) 
                setPhotoUrlArray(temp)
        }
    }

    const showCalc1 = () => {
        setCalc1(!calc1)
    }
    const showCalc2 = () => {
        setCalc2(!calc2)
    }
    const showCalc3 = () => {
        setCalc3(!calc3)
    }
    const showCalc4 = () => {
        setCalc4(!calc4)
    }
    
    const onChange1 = (e) => {
        console.log(e)
        setValue1(e)
        setDate1(moment(e).format("DD-MM-YYYY"))
        setAPIDate1(moment(e).format("YYYY-MM-DD"))
        showCalc1()
    }
    const onChange2 = (e) => {
        console.log(e)
        setValue2(e)
        setDate2(moment(e).format("DD-MM-YYYY"))
        setAPIDate2(moment(e).format("YYYY-MM-DD"))
        showCalc2()
    }
    const onChange3 = (e) => {
        console.log(e)
        setValue3(e)
        setDate3(moment(e).format("DD-MM-YYYY"))
        setAPIDate3(moment(e).format("YYYY-MM-DD"))
        showCalc3()
    }
    const onChange4 = (e) => {
        console.log(e)
        setValue4(e)
        setDate4(moment(e).format("DD-MM-YYYY"))
        setAPIDate4(moment(e).format("YYYY-MM-DD"))
        showCalc4()
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

    const editProgram = async() => {
       
        const body = {
            "name": programName,
            "skills": selectedSkills.length == 0 ? selectedSkill.toString() : selectedSkills.toString(),
            "objective": programObj,
            "duration": `${duration}${" "}${durationType}`,
            "type": selectedProgramType,
            "no_of_sessions": sessionNumber,
            "summary": programSummary,
            "image": photoString,
            "eligibility": eligibility,
            "no_of_mentees": menteeNumber,
            "no_of_mentor": mentorNumber,
            "participation": participation == true ? "1": "0",//1=mandotry,0=optional
            "growthscore_mentee": menteeGrowthScore,
            "impactscore_mentor": mentorImpactScore,
            "define_evalutaion": evaluationMetrics,
            "define_learnings": "define_learnings",
            "define_assessment": "define_assessment",
            "idp_creation": idp == true ? "1": "0",//1=mandotry,0=optional
            "start_date": apiDate1,
            "end_date": apiDate2,
            "cutt_off": apiDate3,
            "proposed_graduation": apiDate4
        }
    

        // const res = await fetch(`${BASE_URL_APPLSURE}program/template-update`, {
        //     method: 'PUT',
        //     headers: {
        //         "Accept": "application/json",
        //         'Content-Type': 'application/json',
        //         "Authorization": btoken,
        //     },
        //     body:JSON.stringify(body)
        // })
        // const response = await res.json()
        // console.log("program updated response", response)
        // if(response.status){
        //    alert("Program updated successfully")
        //    navigate(-1)
        // }else{
        //     alert("Something went wrong")
        // }

        const token = await localStorage.getItem("program_token_old")
        const btoken = `Bearer ${token}`;
    
        console.log(body)
        // return
        const res = await fetch(`${BASE_URL_APPLSURE}program/template-create`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log("program creation response", response)
        if(response.status){
           alert("Program created successfully")
           navigate(-1)
        }else{
            alert("Something went wrong")
        }

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title program_par">Program Overview</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Name</label>
                                                    <input type="text" value={programName} onChange={(e) => setProgramName(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="High Potential Employee Mentoring Program" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Skills Covered</label>
                                                    <Multiselect
                                                        style={{ searchBox: { borderColor: 'gray' } }}
                                                        isObject={false}
                                                        options={skills} // Options to display in the dropdown
                                                        placeholder='Skill(s) Addressed'
                                                        selectedValues={selectedSkill} // Preselected value to persist in dropdown
                                                        onSelect={onSelectSkill} // Function will trigger on select event
                                                        onRemove={onRemoveSkill} // Function will trigger on remove event
                                                        displayValue="skill" // Property name to display in the dropdown options
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Objectives</label>
                                                    <input type="text" value={programObj} onChange={(e) => setProgramObj(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="To Develop leadership skills and efficiency skills.." />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Duration</label>
                                                    <div className='row'>
                                                    <div className="col-md-6 mb-25">
                                                    <input value={duration} onChange={e => {
                                                        const re = /^[0-9\b]+$/;
                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            setduration(e.target.value)
                                                        }
                                                        }} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Duration" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={durationType} onChange={e => setDurationType(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                        <option value="">Select a value</option>
                                                            <option value="Minutes">Minutes</option>
                                                            <option value="Days">Days</option>
                                                            <option value="Weeks">Weeks</option>
                                                            <option value="Months">Months</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                    </div>
                                                    
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Type</label>
                                                    <div class="countryOption">
                                                        <select value={selectedProgramType} onChange={(e) => setSelectedProgramType(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option value="">Program Type</option>
                                                            <option value="One on One">One on One</option>
                                                            <option value="Cohort">Cohort</option>
                                                            <option value="Group">Group</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">No. of Sessions</label>
                                                    <input value={sessionNumber} onChange={(e) => setsessionNumber(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="16" />
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <label className="label_name">Program Summary</label>
                                                    <textarea value={programSummary} onChange={(e) => setProgramSummary(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."></textarea>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label for="formFile" class="form-label label_name">Program Photo</label>
                                                    <input onChange={(e) => uploadPhoto(e.target.files,"2")} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label for="formFile" class="form-label label_name">Program Photo</label>
                                                    <img src={photoString} className="" style={{width:'530px', height:'300px'}} />
                                                </div>

                                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Participation</h4>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Eligibility</label>
                                                    <div class="countryOption">
                                                        <select value={eligibility} onChange={(e) => setEligibility(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                        <option value="">Eligibility</option>
                                                        <option value="Predefined Participation">Predefined Participation</option>
                                                        <option value="Open Participation">Open Participation</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Max. no. of Mentees</label>
                                                    <input type="text" value={menteeNumber} onChange={(e) => setMenteeNumber(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="20" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Max. no. of Mentors</label>
                                                    <input type="text" value={mentorNumber} onChange={(e) => setMentorNumber(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="20" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div className="form-group status-radio add-product-status-radio mb-20">
                                                        <label className="mb-10 label_name">Program Participation</label>
                                                        <div class="d-flex">
                                                            <div class="radio-horizontal-list d-flex flex-wrap">
                                                            <div class="radio-theme-default custom-radio ">
                                                                <input
                                                                class="radio"
                                                                type="radio"
                                                                value={1}
                                                                checked={participation ? 1 : 0}
                                                                onChange={() => setParticipation(true)}
                                                                name="radio-optional"
                                                                id="radio-hl1"
                                                                />
                                                                <label for="radio-hl1">
                                                                <span class="radio-text">Mandatory</span>
                                                                </label>
                                                            </div>
                                                            <div class="radio-theme-default custom-radio ">
                                                                <input
                                                                class="radio"
                                                                type="radio"
                                                                checked={participation ? 0 : 1}
                                                                onChange={() => setParticipation(false)}
                                                                value={1}
                                                                name="radio-optional"
                                                                id="radio-hl2"
                                                                />
                                                                <label for="radio-hl2">
                                                                <span class="radio-text">Optional</span>
                                                                </label>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Metrics</h4>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Growth Score for Mentees</label>
                                                    <input type="text" value={menteeGrowthScore} onChange={(e) => setMenteeGrowthScore(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Impact Score for Mentors</label>
                                                    <input type="text" value={mentorImpactScore} onChange={(e) => setMentorImpactScore(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Define Evaluation Metrics</label>
                                                    <input type="text" value={evaluationMetrics} onChange={(e) => setEvaluationMetrics(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Evaluation Metrics" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Define Recommended Learnings</label>
                                                    <input type="text" value={define_learnings} onChange={(e) => setdefine_learnings(e.target.value)}  className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Learnings" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Define Recommended Assessments</label>
                                                    <input type="text" value={define_assessment} onChange={(e) => setdefine_assessment(e.target.value)}  className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Assessments" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div className="form-group status-radio add-product-status-radio mb-20">
                                                        <label className="mb-10 label_name">Creation of IDP</label>
                                                        <div class="d-flex">
                                                            <div class="radio-horizontal-list d-flex flex-wrap">
                                                            <div class="radio-theme-default custom-radio ">
                                                                <input
                                                                class="radio"
                                                                type="radio"
                                                                value={1}
                                                                checked={idp ? 1 : 0}
                                                                onChange={() => {
                                                                    // alert("true")
                                                                    setIDP(true)
                                                                }}
                                                                name="radio-optional1"
                                                                id="radio-hl111"
                                                                />
                                                                <label for="radio-hl111">
                                                                <span class="radio-text">Mandatory</span>
                                                                </label>
                                                            </div>
                                                            <div class="radio-theme-default custom-radio ">
                                                                <input
                                                                class="radio"
                                                                type="radio"
                                                                checked={idp ? 0 : 1}
                                                                onChange={() => {
                                                                    // alert("false")
                                                                    setIDP(false)
                                                                }}
                                                                value={1}
                                                                name="radio-optional2"
                                                                id="radio-hl222"
                                                                />
                                                                <label for="radio-hl222">
                                                                <span class="radio-text">Optional</span>
                                                                </label>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h4 className="text-capitalize fw-500 mb-25 program_par">Program Schedule</h4>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program Start Date</label>
                                                    <input
                                                        onClick={() =>showCalc1()}
                                                        value={date1}
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="Program Start Date"  required/>
                                                        {calc1 && (
                                                            <Calendar onChange={e => onChange1(e)} value={value1} minDate={new Date()} />
                                                        )}
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Program End Date</label>
                                                    <input
                                                        onClick={() =>showCalc2()}
                                                        value={date2} 
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="Program End Date"  required/>
                                                        {calc2 && (
                                                            <Calendar onChange={e => onChange2(e)} value={value2} minDate={new Date()} />
                                                        )}
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Cut off date for confirmation</label>
                                                    <input
                                                        onClick={() =>showCalc3()}
                                                        value={date3}
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="Cut off date for confirmation"  required/>
                                                        {calc3 && (
                                                            <Calendar onChange={e => onChange3(e)} value={value3} minDate={new Date()} />
                                                        )}
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label className="label_name">Proposed Graduation Date</label>
                                                    <input
                                                        onClick={() =>showCalc4()}
                                                        value={date4} 
                                                        className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                        placeholder="Proposed Graduation Date"  required/>
                                                        {calc4 && (
                                                            <Calendar onChange={e => onChange4(e)} value={value4} minDate={new Date()} />
                                                        )}
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        {/* <NavLink className="navbar-brand" to="/mentoring_program"> */}
                                                            <button type="button" onClick={() => editProgram()} className="btn btn-primary btn-default btn-squared m-auto">Create Program</button>
                                                            {/* </NavLink> */}
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

export default Preview_Program;
