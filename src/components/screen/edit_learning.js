import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
import { BASE_URL } from '../../services/Config'

function Edit_Learning() {
    const navigate= useNavigate()
    const {state} = useLocation()
    console.log("state in edit learning screen", state)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [learningName, setLearningName] = useState(state.learningName)
    const [growthScore, setGrowthScore] = useState(state.growthScore)
    const [selectedSkill, setSelectedSkill] = useState(state.skills?.split(","))
    const [selectedCategory, setSelectedCategory] = useState(state.category)
    const [selectedSource, setSelectedSource] = useState(state.sourceType)
    const [sourceName, setsourceName] = useState(state.sourceName)
    const [sourceLink, setsourceLink] = useState(state.sourceLink)
    const [duration, setduration] = useState(state.duration)
    const [durationType, setdurationType] = useState("")
    const [comment, setComment] = useState(state.worksheetComments)
    const [summary, setSummary] = useState(state.summary)
    const [skills, setSkillsList] = useState([])
    const [imageUrl, setImageUrl] = useState("")
    const [worksheetUrl, setWorksheetUrl] = useState("")
    const [discountApplied, setdiscountApplied] = useState(null)
    const [worksheetNeeded, setWorksheetNeeded] = useState(null)
    const [learningDetails, setLearningDetails] = useState({})
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

    useEffect(() => {
        getProfile()
    },[])
    //     const getProfile = async() => {
    //     const btoken = `Bearer ${token}`;
    //     const res = await fetch(`${BASE_URL}learnings/${state.id}/profile`, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //     })
    //     const response = await res.json()
    //     console.log("learning profile", response)
    //     if(response.success){
    //         setLearningDetails(response.data)
    //         setWorksheetNeeded(response.data.isWorksheetNeeded)
    //     }
    // }

    const getProfile = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state.id}/profile`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("created profile details in org", response)
        if(response.success){
            setLearningDetails(response.data)
            setGrowthScore(response.data.growthScore)
            setsourceName(response.data.sourceName)
            setsourceLink(response.data.sourceLink)
            setduration(response.data.duration)
            setdurationType(response.data.durationType)
            setComment(response.data.worksheetComments)
            setSummary(response.data.summary)
        }
    }

    const updateLearning = async(e) => {
        e.preventDefault()
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
            duration: duration,
            durationType,
            // duration,
            "isWorksheetNeeded": discountApplied,
            "worksheetComments": comment,
            summary,
            worksheetFile:worksheetUrl
          }
        //   console.log(body)
        //   return
        const res = await fetch(`${BASE_URL}learnings/${state.id}/edit-learning`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        if(response.success){
            alert("Learning saved successfully")
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

    // console.log(worksheetNeeded)
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Edit Learning</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form onSubmit={updateLearning}>
                                            <div className="row">
                                                <div className="col-md-12 mb-25">
                                                    <input value={learningName} onChange={e => setLearningName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Learning Name" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={growthScore} onChange={e => setGrowthScore(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Growth Score" required disabled/>
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
                                                            style={{ searchBox: { borderColor: 'gray', },chips: { // To change css chips(Selected options)
                                                                backgroundColor: "#006666"
                                                              }
                                                              ,
                                                              multiselectContainer: { // To change css for multiselect (Width,height,etc..)
                                                                highlightOption:{
                                                                    backgroundColor:"red"
                                                                }
                                                              },
                                                            
                                                            }}
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

                                                {/* <div className="col-md-6 mb-25">
                                                    <input value={learningDetails.duration} onChange={e => setduration(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Duration" />
                                                </div> */}
                                                <div className="col-md-3 mb-25">
                                                    <input value={duration} onChange={e => setduration(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Duration" disabled/>
                                                </div>

                                                <div className="col-md-3 mb-25">
                                                    <div class="countryOption">
                                                        <select value={durationType} onChange={e => setdurationType(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                        <option value="">Select a value</option>
                                                            <option value="minutes">Minutes</option>
                                                            <option value="days">Days</option>
                                                            <option value="weeks">Weeks</option>
                                                            <option value="months">Months</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* <div className="col-md-6 mb-25">
                                                </div> */}

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
                                                                            uploadImage(event.target.files[0],"1")
                                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                </div>

                                                <div className="col-md-6 mb-30">
                                                    <label for="formFile" class="form-label">Upload a File</label>
                                                    <input onChange={(event) => {
                                                                            uploadImage(event.target.files[0],"2")
                                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                </div>

                                                <div className="layout-button">
                                                    <div className="btn_center">
                                                        <button type="button" className="btn btn-outline-petrol btn-squared color-primary">Preview</button>
                                                        {/* <NavLink className="navbar-link" to="/learning_screen"> */}
                                                            <button type="submit" className="btn btn-primary btn-default btn-squared">Create & Save</button>
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

export default Edit_Learning;
