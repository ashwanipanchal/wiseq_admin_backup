import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState, PropTypes } from 'react';
import Side_Bar from './sidebar';
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_APPLSURE } from '../../services/Config';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';
import Multiselect from 'multiselect-react-dropdown';
import RichTextEditor from 'react-rte';

function Create_Program({ onChange }) {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [selectedIndex, setSelectedIndex] = useState(0);

    const tabCount = 4;
    const [skills, setSkillsList] = useState([])
    const [programName, setProgramName] = useState("")
    const [selectedSkill, setSelectedSkill] = useState("")
    const [selectedSkills, setSelectedSkills] = useState([])
    const [programObj, setProgramObj] = useState("")
    const [selectedProgramType, setSelectedProgramType] = useState("")
    const [sessionNumber, setsessionNumber] = useState("")
    const [programSummary, setProgramSummary] = useState(RichTextEditor.createEmptyValue())
    const [photoString, setPhotoString] = useState("")
    const [photoUrlArray, setPhotoUrlArray] = useState([])
    const [duration, setduration] = useState("")
    const [durationType, setDurationType] = useState("")
    //TAB2 States
    const [eligibility, setEligibility] = useState("")
    const [menteeNumber, setMenteeNumber] = useState("")
    const [mentorNumber, setMentorNumber] = useState("")
    const [participation, setParticipation] = useState(null)

    //Tab3 
    const [menteeGrowthScore, setMenteeGrowthScore] = useState("")
    const [mentorImpactScore, setMentorImpactScore] = useState("")
    const [evaluationMetrics, setEvaluationMetrics] = useState("")
    const [define_assessment, setDefine_assessment] = useState("")
    const [define_learnings, setDefine_learnings] = useState("")
    const [idp, setIDP] = useState(null)
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
        function handleWindowResize() {
            setWindowSize(getWindowSize());
            // console.log(getWindowSize())
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    const handleSelect = index => {
        setSelectedIndex(index)
        // this.setState({ selectedIndex: index });
      };
    
    const handleButtonClick = (index) => {
        setSelectedIndex(parseInt(index))
        // this.setState({ selectedIndex: 0 });
      };

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

const createProgram = async() => {
    const body = {
        "name": programName,
        "skills": selectedSkills.toString(),
        "objective": programObj,
        "duration": `${duration}${" "}${durationType}`,
        "type": selectedProgramType,
        "no_of_sessions": sessionNumber,
        "summary": programSummary.toString('html'),
        "image": photoString,
        "eligibility": eligibility,
        "no_of_mentees": menteeNumber,
        "no_of_mentor": mentorNumber,
        "participation": participation == true ? "1": "0",//1=mandotry,0=optional
        "growthscore_mentee": menteeGrowthScore,
        "impactscore_mentor": mentorImpactScore,
        "define_evalutaion": evaluationMetrics,
        "define_learnings": define_learnings,
        "define_assessment": define_assessment,
        "idp_creation": idp == true ? "1": "0",//1=mandotry,0=optional
        "start_date": apiDate1,
        "end_date": apiDate2,
        "cutt_off": apiDate3,
        "proposed_graduation": apiDate4
    }
    // navigate("/program_preview", {state:body})
    // return
    const token = await localStorage.getItem("program_token_old")
    const btoken = `Bearer ${token}`;
    // const btoken = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTJiNTY4ZmU0MDE4NmEyZDFmZDA4MjU1NmYxMmNiZTA5NDI2ODJiZTAxNTM1OGJhNTRlOWRmNDY1NmQzNzJjMjk0ZTBmYWI0YzE2ZGMxYzkiLCJpYXQiOjE3MDEwNTk4MjAuOTYxMjQxLCJuYmYiOjE3MDEwNTk4MjAuOTYxMjQ1LCJleHAiOjE3MzI2ODIyMjAuOTU3NDksInN1YiI6IjVjY2I5NWQwLWQwYWQtNDFjZS1iODEyLWY5YjVkZTRiMTJlMCIsInNjb3BlcyI6W119.BkZl-BXCxoYIcjXoEYOymy1I4kEVNroQy9wmDirrIuPt2tMVcRJLMXSYjGzua3TchY8cKtQGCZSW0skYinM8m5ixRatJGPIrhpjwlphY5Kfp_MquMRANJATt6C8yH3nsUtTSWR-DLdQYgIqt7HGYrxOGe2UC33_iZdY0Z9dHMOy3apio1fdlJ9xEG8hs_m3-susi_EYeeoa2CUYZpA08HqqZbm3qQXnTj3wtLv80nHWGlp-HefUyKkf5dJwJ8M9a--_H4xpvG2uNWWdX8TcX344oWSo-ttGKu5wrWz3QkHM_0KaJsVarQQP4QXhko3n1J5lvO-9uFz_wme1fpTkiipVySP_ioKzGgfkPbQxQPdp-9eftKpcpEfxvZiwzaZyZmPTK0GQjEt9JSLgoL3Us57KbO9S3nBXvYpkUmlPtU-ryChaxffnTByMyTroAw8ayMA3nu8ORHCi79Hhk4xxg3sq8GTr7PeZ4ijLxaqrQ3e-tvlVXhAVFB2s2zIdUxvt45D0NjsJrTOnf4D4ZNYuU5ggsZc1V3AwwSlPFxV8o8b2B_W7f5JZh5MEkfCq9BpCvkDpzX1TBeA9VgeeErqxIlYzH0uD640SUvvHJlNqQP3X8izpxt8e2r2Kbc8Tu2_rJU6cORhs7VF7UFhT3od5cuhpwZiAs9YCqmP1RdDlTX78`;
    // const body = {
    //     "name": programName,
    //     "skills": selectedSkills.toString(),
    //     "objective": programObj,
    //     "duration": `${duration}${" "}${durationType}`,
    //     "type": selectedProgramType,
    //     "no_of_sessions": sessionNumber,
    //     "summary": programSummary,
    //     "image": photoString,
    //     "eligibility": eligibility,
    //     "no_of_mentees": menteeNumber,
    //     "no_of_mentor": mentorNumber,
    //     "participation": participation == true ? "1": "0",//1=mandotry,0=optional
    //     "growthscore_mentee": menteeGrowthScore,
    //     "impactscore_mentor": menteeGrowthScore,
    //     "define_evalutaion": evaluationMetrics,
    //     "define_learnings": "define_learnings",
    //     "define_assessment": "define_assessment",
    //     "idp_creation": idp == true ? "1": "0",//1=mandotry,0=optional
    //     "start_date": apiDate1,
    //     "end_date": apiDate2,
    //     "cutt_off": apiDate3,
    //     "proposed_graduation": apiDate4
    // }

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

const handleEditorChange = (newValue) => {
    setProgramSummary(newValue);
    if (onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      onChange(newValue.toString('html'));
    }
    console.log(newValue.toString('html'))
  };

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Create Program</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card card-default card-md">
                                    <div className="">
                                        <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                                <Tabs selectedIndex={selectedIndex}
                                                        onSelect={handleSelect}>
                                                    <TabList className="nav nav-tabs vertical-tabs">
                                                        <Tab tabFor="0">Program Overview</Tab>
                                                        <Tab tabFor="1">Program Participation</Tab>
                                                        <Tab tabFor="2">Program Metrics</Tab>
                                                        <Tab tabFor="3">Program Schedule</Tab>
                                                    </TabList>

                                                    <TabPanel tabId="0" className="tab-content">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" value={programName} onChange={(e) => setProgramName(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Program Name" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <div className="countryOption">
                                                                                        {/*<select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                            <option value="">Skills Covered</option>
                                                                                            {skills && skills.map((i) => (
                                                                                                <option value={i}>{i}</option>
                                                                                            ))}
                                                                                            </select>*/}
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
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" value={programObj} onChange={(e) => setProgramObj(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Program Objectives" />
                                                                                </div>

                                                                                <div className="col-md-3 mb-25">
                                                                                    <input value={duration} onChange={e => {
                                                                                        const re = /^[0-9\b]+$/;
                                                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                                                            setduration(e.target.value)
                                                                                        }
                                                                                        }} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Duration" />
                                                                                </div>

                                                                                <div className="col-md-3 mb-25">
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

                                                                                <div className="col-md-6 mb-25">
                                                                                    <div className="countryOption">
                                                                                        <select value={selectedProgramType} onChange={(e) => setSelectedProgramType(e.target.value)} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                            <option value="">Program Type</option>
                                                                                            <option value="One on One">One on One</option>
                                                                                            <option value="Cohort">Cohort</option>
                                                                                            {/* <option value="Group">Group</option> */}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input value={sessionNumber} onChange={(e) => setsessionNumber(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="No. of Sessions" />
                                                                                </div>

                                                                                <div className="col-md-12 mb-25">
                                                                                    {/* <textarea value={programSummary} onChange={(e) => setProgramSummary(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="5" placeholder="Program Summary"></textarea> */}
                                                                                    <label for="formFile" className="form-label">Program Summary</label>
                                                                                    <RichTextEditor
                                                                                        value={programSummary}
                                                                                        onChange={handleEditorChange}
                                                                                    />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <label for="formFile" className="form-label">Upload Photo</label>
                                                                                    <input onChange={(e) => uploadPhoto(e.target.files,"2")} className="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                                                </div>

                                                                                <div className="col-md-12">
                                                                                    <div className="mt-0">
                                                                                    </div>
                                                                                        <button type="button" onClick={() => handleButtonClick("1")} className="btn btn-primary btn-default btn-squared m-auto">Next</button>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel tabId="1">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
                                                                                    <div className="countryOption">
                                                                                        <select value={eligibility} onChange={(e) => setEligibility(e.target.value)} className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                            <option value="">Eligibility</option>
                                                                                            <option value="Predefined Participation">Predefined Participation</option>
                                                                                            <option value="Open Participation">Open Participation</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input value={menteeNumber} onChange={(e) => setMenteeNumber(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Number of Mentees" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input value={mentorNumber} onChange={(e) => setMentorNumber(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Number of Mentors" />
                                                                                </div>

                                                                                <div className="col-md-12 mb-25">
                                                                                    <div className="form-group status-radio add-product-status-radio mb-20">
                                                                                        <label className="mb-10">Program Participation </label>
                                                                                        <div class="d-flex">
                                                                                            <div class="radio-horizontal-list d-flex flex-wrap">
                                                                                            <div class="radio-theme-default custom-radio ">
                                                                                                <input
                                                                                                class="radio"
                                                                                                type="radio"
                                                                                                value={participation}
                                                                                                onChange={()=> setParticipation(true)}
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
                                                                                                onChange={()=> setParticipation(false)}
                                                                                                value={participation}
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

                                                                                <div className="layout-button">
                                                                                    <div className="btn_center">
                                                                                        <button type="button" onClick={() => handleButtonClick("0")} className="btn btn-outline-primary btn-squared color-primary">Previous</button>
                                                                                        <button type="button" onClick={() => handleButtonClick("2")}  className="btn btn-primary btn-default btn-squared">Next</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel tabId="2" className="tab-content">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" value={menteeGrowthScore} onChange={(e) => setMenteeGrowthScore(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Growth Score for Mentees" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" value={mentorImpactScore} onChange={(e) => setMentorImpactScore(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Impact Score for Mentors" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" value={evaluationMetrics} onChange={(e) => setEvaluationMetrics(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Evaluation Metrics" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" value={define_learnings} onChange={(e) => setDefine_learnings(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Learnings" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <input type="text" value={define_assessment} onChange={(e) => setDefine_assessment(e.target.value)} className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Define Recommended Assessments" />
                                                                                </div>

                                                                                <div className="col-md-6 mb-25">
                                                                                    <div className="form-group status-radio add-product-status-radio mb-20">
                                                                                        <label className="mb-10">Creation of IDP</label>
                                                                                        <div class="d-flex">
                                                                                            <div class="radio-horizontal-list d-flex flex-wrap">
                                                                                            <div class="radio-theme-default custom-radio ">
                                                                                                <input
                                                                                                class="radio"
                                                                                                type="radio"
                                                                                                value={idp}
                                                                                                onChange={()=> setIDP(true)}
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
                                                                                                onChange={()=> setIDP(false)}
                                                                                                value={idp}
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
                                                                                <div className="layout-button">
                                                                                    <div className="btn_center">
                                                                                        <button type="button" onClick={() => handleButtonClick("1")} className="btn btn-outline-primary btn-squared color-primary">Previous</button>
                                                                                        <button type="button" onClick={() => handleButtonClick("3")} className="btn btn-primary btn-default btn-squared">Next</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel tabId="3" className="tab-content">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card card-Vertical card-default card-md mb-4">
                                                                    <div className="">
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6 mb-25">
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
                                                                                <input
                                                                                    onClick={() =>showCalc4()}
                                                                                    value={date4} 
                                                                                    className="form-control ih-medium ip-gray date_time radius-xs b-deep px-15" 
                                                                                    placeholder="Proposed Graduation Date"  required/>
                                                                                    {calc4 && (
                                                                                        <Calendar onChange={e => onChange4(e)} value={value4} minDate={new Date()} />
                                                                                    )}
                                                                                </div>

                                                                                <div className="layout-button">
                                                                                    <div className="btn_center">
                                                                                        <button type="button" onClick={() => handleButtonClick("2")}  className="btn btn-outline-primary btn-squared color-primary">Previous</button>
                                                                                        {/* <NavLink className="navbar-link" to="/program_preview"> */}
                                                                                            {/* <button onClick={() => createProgram()} type="button" className="btn btn-primary btn-default btn-squared">Preview & Create</button> */}
                                                                                            <button onClick={() => navigate("/preview_program", {state:     {
                                                                                                                "name": programName,
                                                                                                                "skills": selectedSkills.toString(),
                                                                                                                "objective": programObj,
                                                                                                                "duration": `${duration}${" "}${durationType}`,
                                                                                                                "type": selectedProgramType,
                                                                                                                "no_of_sessions": sessionNumber,
                                                                                                                "summary": programSummary.toString('html'),
                                                                                                                "image": photoString,
                                                                                                                "eligibility": eligibility,
                                                                                                                "no_of_mentees": menteeNumber,
                                                                                                                "no_of_mentor": mentorNumber,
                                                                                                                "participation": participation == true ? "1": "0",//1=mandotry,0=optional
                                                                                                                "growthscore_mentee": menteeGrowthScore,
                                                                                                                "impactscore_mentor": mentorImpactScore,
                                                                                                                "define_evalutaion": evaluationMetrics,
                                                                                                                "define_learnings": define_learnings,
                                                                                                                "define_assessment": define_assessment,
                                                                                                                "idp_creation": idp == true ? "1": "0",//1=mandotry,0=optional
                                                                                                                "start_date": apiDate1,
                                                                                                                "end_date": apiDate2,
                                                                                                                "cutt_off": apiDate3,
                                                                                                                "proposed_graduation": apiDate4
                                                                                                            }})} type="button" className="btn btn-primary btn-default btn-squared">Preview & Create</button>
                                                                                            {/* </NavLink> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>
                                                </Tabs>
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
        </div>

    );
}

export default Create_Program;
