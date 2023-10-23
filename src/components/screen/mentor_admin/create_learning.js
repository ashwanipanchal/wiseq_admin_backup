import Side_Bar from './sidebar';
import { useEffect, useState , useRef} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
import { BASE_URL } from '../../../services/Config';

function Create_Learning() {
    const navigate= useNavigate()
    const inputFile = useRef(null);
    const inputFile1 = useRef(null);
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [worksheetNeeded, setWorksheetNeeded] = useState(true)
    const [learningName, setLearningName] = useState("")
    const [growthScore, setGrowthScore] = useState("")
    const [imageLocal, setImageLocal] = useState(null)
    const [imageLocal1, setImageLocal1] = useState(null)
    const [selectedSkill, setSelectedSkill] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedSource, setSelectedSource] = useState("")
    const [sourceName, setsourceName] = useState("")
    const [sourceLink, setsourceLink] = useState("")
    const [durationType, setDurationType] = useState("")
    const [duration, setduration] = useState("")
    const [comment, setComment] = useState("")
    const [summary, setSummary] = useState("")
    const [skills, setSkillsList] = useState([])
    const [imageUrl, setImageUrl] = useState("")
    const [worksheetUrl, setWorksheetUrl] = useState("")
    const [discountApplied, setdiscountApplied] = useState(null)
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
        getSkills()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const createNewLearning = async(e) => {
        e.preventDefault()
        if(selectedSkill.length == 0){
            alert("Please select a skill")
            return
        }

        if(selectedSource == "external"){
            if(sourceName == ""){
                alert("Please enter source name")
                return
            }
            if(sourceLink == ""){
                alert("Please enter source link")
                return
            }
        }

        if(duration.length == 0){
            alert("Please enter duration")
            return
        }
        if(discountApplied == null){
            alert("Please select if assignment needed or not")
            return
        }
        const btoken = `Bearer ${token}`;
        const body = {
            "learningImg": imageUrl,
            learningName,
            "skills": selectedSkill.toString(),
            "growthScore":parseInt(growthScore),
            "category": selectedCategory,
            "sourceType":selectedSource,
            sourceName,
            sourceLink,
            duration : parseInt(duration),
            durationType,
            // duration,
            "isWorksheetNeeded": discountApplied,
            "worksheetComments": comment,
            summary,
            worksheetFile:worksheetUrl
          }
          console.log(body)
        //   return
        const res = await fetch(`${BASE_URL}learnings`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        if(response.success){
            navigate(-1)
        }
        console.log("created learning", response)
    }

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
        console.log("skill list", response)
        if(response.success){
            let tt = []
            response.data.map((i) => {
                tt.push(i.skill)
            })
            setSkillsList(tt)
        }
}

    const uploadImage = async (item,number) => {
        // setImagePath(item)
        let formData = new FormData()
        formData.append("file", item)
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        // console.log(btoken)  
        const res = await fetch(`${BASE_URL}files/upload?fileType=learning_file`, {
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
            if(number == "1"){
                setImageUrl(response.data.url)
            }else{
                setWorksheetUrl(response.data.url)
            }
        }
    }

    const onSelectSkill = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i)
            setSelectedSkill(temp)
        })
        // setSelectedBSkill(selectedList)
    }

    const onRemoveSkill = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i)
            setSelectedSkill(temp)
        })
        // setSelectedBSkill(selectedList)
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Create Learning</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form onSubmit={createNewLearning}>
                                            <div className="row">
                                                <div className="col-md-12 mb-25">
                                                    <input value={learningName} onChange={e => setLearningName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Learning Name" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={growthScore} onChange={e => {
                                                        const re = /^[0-9\b]+$/;
                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            setGrowthScore(e.target.value)
                                                        }
                                                        }} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Growth Score" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                            <option value="">Skill(s) Addressed</option>
                                                            {skills && skills.map((i) => (
                                                                <option value={i}>{i}</option>
                                                            ))}
                                                        </select>
                                                        {/* <Multiselect
                                                            style={{ searchBox: { borderColor: 'gray' } }}
                                                            isObject={false}
                                                            options={skills} // Options to display in the dropdown
                                                            placeholder='Skill(s) Addressed'
                                                            selectedValues={selectedSkill} // Preselected value to persist in dropdown
                                                            onSelect={onSelectSkill} // Function will trigger on select event
                                                            onRemove={onRemoveSkill} // Function will trigger on remove event
                                                            displayValue="skill" // Property name to display in the dropdown options
                                                        /> */}
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                        <option value="">Category</option>
                                                            <option value="podcast">Podcast</option>
                                                            <option value="article">Article</option>
                                                            <option value="video">Video</option>
                                                            <option value="case-study">Case Study</option>
                                                            <option value="course">Course</option>
                                                            {/* <option value="PDF">PDF</option>
                                                            <option value="Presentation">Presentation</option>
                                                            <option value="Documents">Documents</option>
                                                            <option value="Worksheet">Worksheet</option>
                                                            <option value="Tutorial">Tutorial</option>
                                                            <option value="Other">Other</option> */}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={selectedSource} onChange={e => setSelectedSource(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                        <option value="">Source Type</option>
                                                            <option value="internal">Internal</option>
                                                            <option value="external">External</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={sourceName} onChange={e => setsourceName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Source Name" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={sourceLink} onChange={e => setsourceLink(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Source Link" />
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
                                                            <option value="minutes">Minutes</option>
                                                            <option value="days">Days</option>
                                                            <option value="weeks">Weeks</option>
                                                            <option value="months">Months</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div className="form-group status-radio add-product-status-radio mb-20">
                                                        <label className="mb-10">Worksheet/Assignment Needed?</label>
                                                        <div class="d-flex">
                                                                <div class="radio-horizontal-list d-flex flex-wrap">
                                                                <div class="radio-theme-default custom-radio ">
                                                                    <input
                                                                    class="radio"
                                                                    type="radio"
                                                                    value={discountApplied}
                                                                    onChange={()=> setdiscountApplied(true)}
                                                                    name="radio-optional"
                                                                    id="radio-hl1"
                                                                    />
                                                                    <label for="radio-hl1">
                                                                    <span class="radio-text">Yes</span>
                                                                    </label>
                                                                </div>
                                                                <div class="radio-theme-default custom-radio ">
                                                                    <input
                                                                    class="radio"
                                                                    type="radio"
                                                                    onChange={()=> setdiscountApplied(false)}
                                                                    value={discountApplied}
                                                                    name="radio-optional"
                                                                    id="radio-hl2"
                                                                    />
                                                                    <label for="radio-hl2">
                                                                    <span class="radio-text">No</span>
                                                                    </label>
                                                                </div>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <textarea value={comment} onChange={e => setComment(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="4" placeholder="Add Comments about Worksheet/Assignment"></textarea>
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <textarea value={summary} onChange={e => setSummary(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="4" placeholder="Summary"></textarea>
                                                </div>

                                                
                                                <div className="col-md-6 mb-30">
                                                    <label for="formFile" class="form-label">Learning Photo</label>
                                                    <input onChange={(event) => {
                                                                            setImageLocal1(event.target.files[0])
                                                                            uploadImage(event.target.files[0],"1")
                                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" ref={inputFile1}/>
                                                                        {imageLocal1 && (
                                                                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                                                            <p>{imageLocal1.name}</p>
                                                                            <p style={{cursor:'pointer', color:'red'}} onClick={() =>{
                                                                                if (inputFile1.current) {
                                                                                    inputFile1.current.value = "";
                                                                                    inputFile1.current.type = "text";
                                                                                    inputFile1.current.type = "file";
                                                                                    setImageLocal1(null)
                                                                                    setWorksheetUrl("")
                                                                                }

                                                                            }}>Delete</p>
                                                                        </div>
                                                                        )}
                                                </div>
                                                {/* {discountApplied && */}
                                                <div className="col-md-6 mb-30">
                                                    <label for="formFile" class="form-label">Upload a File</label>
                                                    <input onChange={(event) => {
                                                                            setImageLocal(event.target.files[0])
                                                                            uploadImage(event.target.files[0],"2")
                                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" ref={inputFile}/>
                                                                        {imageLocal && (
                                                                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                                                            <p>{imageLocal.name}</p>
                                                                            <p style={{cursor:'pointer', color:'red'}} onClick={() =>{
                                                                                if (inputFile.current) {
                                                                                    inputFile.current.value = "";
                                                                                    inputFile.current.type = "text";
                                                                                    inputFile.current.type = "file";
                                                                                    setImageLocal(null)
                                                                                    setWorksheetUrl("")
                                                                                }

                                                                            }}>Delete</p>
                                                                        </div>
                                                                        )}
                                                </div>
                                                {/* } */}
                                                
                                                <div className="layout-button">
                                                    <div className="btn_center">
                                                        <button type="button" className="btn btn-outline-petrol btn-squared color-primary">Preview</button>
                                                        {/* <NavLink className="navbar-link" to="/learning_screen"> */}
                                                            <button type="submit" className="btn btn-petrol btn-default btn-squared">Create & Save</button>
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

export default Create_Learning;
