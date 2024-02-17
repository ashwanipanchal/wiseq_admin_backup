import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { BASE_URL, BASE_URL_APPLSURE } from "../../../services/Config";

function Edit_Created_Learning() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state in edit learning screen", state);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [learningName, setLearningName] = useState(state.learningName);
  const [growthScore, setGrowthScore] = useState(state.growthScore);
  const [selectedSkill, setSelectedSkill] = useState(state.skills?.split(","));
  const [selectedCategory, setSelectedCategory] = useState(state.category);
  const [selectedSource, setSelectedSource] = useState(state.sourceType);
  const [sourceName, setsourceName] = useState(state.sourceName);
  const [sourceLink, setsourceLink] = useState(state.sourceLink);
  const [duration, setduration] = useState(state.duration);
  const [durationType, setdurationType] = useState("");
  const [comment, setComment] = useState(state.worksheetComments);
  const [summary, setSummary] = useState(state.summary);
  const [skills, setSkillsList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [worksheetUrl, setWorksheetUrl] = useState("");
  const [discountApplied, setdiscountApplied] = useState(null);
  const [worksheetNeeded, setWorksheetNeeded] = useState(null);
  const [learningDetails, setLearningDetails] = useState({});
  const [allWorksheetFile, setAllWorksheetFile] = useState([]);
  const [allWorksheetFileString, setAllWorksheetFileString] = useState("");
  const [allFile, setAllFile] = useState([]);
  const [allFileString, setAllFileString] = useState("");
  const [FileUrlString, setFileUrlString] = useState("");
  const [key1, setKey1] = useState(0);
  const [key3, setKey3] = useState(10);
  const [key4, setKey4] = useState(100);
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };
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
    getSkills();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    getProfile();
  }, []);
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

  const getProfile = async () => {
    const btoken = `Bearer ${token}`;
    const res = await fetch(
      `${BASE_URL}learnings/${state.id}/template-details`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
      }
    );
    const response = await res.json();
    console.log("created profile details in org", response);
    if (response.success) {
      setLearningDetails(response.data);
      setGrowthScore(response.data.growthScore);
      setsourceName(response.data.sourceName);
      setsourceLink(response.data.sourceLink);
      setduration(response.data.duration);
      setdurationType(response.data.durationType);
      setComment(response.data.worksheetComments);
      setdiscountApplied(response.data.isWorksheetNeeded);
      setSummary(response.data.summary);

      setAllWorksheetFileString(response.data.worksheetFile);
      setAllFileString(response.data.otherFiles);
      if (response.data.worksheetFile) {
        let temp = [];
        response.data.worksheetFile?.split("|").map((i) => {
          temp.push(i);
        });
        setAllWorksheetFile(temp);
        console.log("temp", temp);
      }
      if (response.data.otherFiles) {
        let temp2 = [];
        response.data.otherFiles?.split("|").map((i) => {
          temp2.push(i);
        });
        setAllFile(temp2);
        console.log("temp2", temp2);
      }

      setKey1(Math.random());
    }
  };

  const updateLearning = async (e) => {
    e.preventDefault();
    const btoken = `Bearer ${token}`;
    const body = {
      learningImg: imageUrl,
      learningName,
      skills: selectedSkill.toString(),
      growthScore: parseInt(growthScore),
      category: selectedCategory,
      sourceType: selectedSource,
      sourceName,
      sourceLink,
      duration: duration,
      durationType,
      // duration,
      isWorksheetNeeded: discountApplied,
      worksheetComments: comment,
      summary,
      worksheetFile: worksheetUrl,
    };
    //   console.log(body)
    //   return
    const res = await fetch(`${BASE_URL}learnings/${state.id}/edit-template`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    if (response.success) {
      alert("Learning saved successfully");
      navigate(-1);
    }
    console.log("created learning", response);
  };

  const getSkills = async () => {
    const btoken = `Bearer ${token}`;
    const res = await fetch(`${BASE_URL}organisation-info/skills`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    console.log("skill list", response);
    if (response.success) {
      let tt = [];
      response.data.map((i) => {
        tt.push(i.skill);
      });
      setSkillsList(tt);
    }
  };

  const uploadImage = async (item, number) => {
    // setImagePath(item)
    let formData = new FormData();
    formData.append("file", item);
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    // console.log(btoken)
    const res = await fetch(`${BASE_URL}files/upload?fileType=learning_file`, {
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
      if (number == "1") {
        setImageUrl(response.data.url);
      } else {
        setWorksheetUrl(response.data.url);
      }
    }
  };

  const onSelectSkill = (selectedList, selectedItem) => {
    console.log(selectedList);
    let temp = [];
    selectedList.map((i) => {
      temp.push(i);
      setSelectedSkill(temp);
    });
    // setSelectedBSkill(selectedList)
  };

  const onRemoveSkill = (selectedList, removedItem) => {
    console.log(selectedList);
    let temp = [];
    selectedList.map((i) => {
      temp.push(i);
      setSelectedSkill(temp);
    });
    // setSelectedBSkill(selectedList)
  };

  const uploadFileInput = async (item, number) => {
    // setImagePath(item)
    console.log(item);
    let formData = new FormData();
    item.forEach((i, index) => {
      formData.append("uploadfile[]", item[index]);
      formData.append("pathto", "othfileearningtemplate");
    });

    // return
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    // console.log(btoken)
    const res = await fetch(`${BASE_URL_APPLSURE}file-upload-multiple`, {
      // const res = await fetch(`${BASE_URL}files/upload?fileType=learning_file`, {
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
    // return
    const { status } = response;
    if (status) {
      setAllFileString(response.data);
      let temp = [];
      if (response.data.split("|") != undefined) {
        response.data.split("|")?.map((i) => {
          // console.log(i)
          temp.push(i);
        });
      }
      console.log(temp);
      // setWorksheetUrl(response.data)
      setAllFile(temp);
    }
  };


  const uploadWorksheetInput = async (item, number) => {
    // setImagePath(item)
    console.log(item)
    let formData = new FormData()
    item.forEach((i,index) => {

        formData.append("uploadfile[]", item[index])
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
    const { status } = response
    if (status) {
        setAllWorksheetFileString(response.data)
        let temp = []
        if(response.data.split("|") != undefined){
            response.data.split("|")?.map((i)=> {
                // console.log(i)
                temp.push(i)
            })
        }
            console.log(temp) 
            // setWorksheetUrl(response.data)
            setAllWorksheetFile(temp)
    }
}

const removeImage = async(index) => {
      
    allFile.splice(index, 1)
    console.log(allFile)
    // return
    setAllFile(allFile)
    // console.log(allFileString.split("|").splice(index,1))
    // console.log(allFileString.join("|"))
    // setAllFileString(allFileString)
    setKey3(Math.random())
  }
  const removeImage1 = async(index) => {
    
    allWorksheetFile.splice(index, 1)
    console.log(allWorksheetFile)
    // return
    setAllWorksheetFile(allWorksheetFile)
    setKey4(Math.random())
  }
  
  return (
    <div className="main-content">
      <div
        style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
        className="contents expanded"
      >
        <div className="demo5 mt-30 mb-25">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-main user-member justify-content-sm-between ">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Edit Learning
                      </h4>
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
                          <input
                            value={learningName}
                            onChange={(e) => setLearningName(e.target.value)}
                            type="text"
                            className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                            placeholder="Learning Name"
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-25">
                          <input
                            value={growthScore}
                            onChange={(e) => setGrowthScore(e.target.value)}
                            type="text"
                            className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                            placeholder="Growth Score"
                            required
                            disabled
                          />
                        </div>

                        <div className="col-md-6 mb-25">
                          <div class="countryOption">
                            <select
                              value={selectedSkill}
                              onChange={(e) => setSelectedSkill(e.target.value)}
                              class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                              aria-label="Default select example"
                            >
                              <option value="">Skill(s) Addressed</option>
                              {skills &&
                                skills.map((i) => (
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
                            <select
                              value={selectedCategory}
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                              class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                              aria-label="Default select example"
                            >
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
                            <select
                              value={selectedSource}
                              onChange={(e) =>
                                setSelectedSource(e.target.value)
                              }
                              class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                              aria-label="Default select example"
                            >
                              <option value="">Source Type</option>
                              <option value="internal">Internal</option>
                              <option value="external">External</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 mb-25">
                          <input
                            value={sourceName}
                            onChange={(e) => setsourceName(e.target.value)}
                            type="text"
                            className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                            placeholder="Source Name"
                          />
                        </div>

                        <div className="col-md-6 mb-25">
                          <input
                            value={sourceLink}
                            onChange={(e) => setsourceLink(e.target.value)}
                            type="text"
                            className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                            placeholder="Source Link"
                          />
                        </div>

                        {/* <div className="col-md-6 mb-25">
                                                    <input value={learningDetails.duration} onChange={e => setduration(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Duration" />
                                                </div> */}
                        <div className="col-md-3 mb-25">
                          <input
                            value={duration}
                            onChange={(e) => setduration(e.target.value)}
                            type="text"
                            className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                            placeholder="Duration"
                            disabled
                          />
                        </div>

                        <div className="col-md-3 mb-25">
                          <div class="countryOption">
                            <select
                              value={durationType}
                              onChange={(e) => setdurationType(e.target.value)}
                              class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                              aria-label="Default select example"
                              disabled
                            >
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

                        <div key={key1} className="col-md-6 mb-25">
                          <div className="form-group status-radio add-product-status-radio mb-20">
                            <label className="mb-10">
                              Worksheet/Assignment Needed?
                            </label>
                            <div class="d-flex">
                              <div class="radio-horizontal-list d-flex flex-wrap">
                                <div class="radio-theme-default custom-radio ">
                                  <input
                                    class="radio"
                                    type="radio"
                                    value={1}
                                    checked={discountApplied ? 1 : 0}
                                    onChange={() => setdiscountApplied(true)}
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
                                    checked={discountApplied ? 0 : 1}
                                    onChange={() => setdiscountApplied(false)}
                                    value={1}
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
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            class="form-control ip-gray radius-xs b-deep px-15"
                            id="exampleFormControlTextarea1"
                            rows="4"
                            placeholder="Add Comments about Worksheet/Assignment"
                          ></textarea>
                        </div>

                        <div className="col-md-12 mb-25">
                          <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            class="form-control ip-gray radius-xs b-deep px-15"
                            id="exampleFormControlTextarea1"
                            rows="4"
                            placeholder="Summary"
                          ></textarea>
                        </div>

                        <div className="col-md-6 mb-30">
                          <label for="formFile" class="form-label">
                            Learning Photo
                          </label>
                          <input
                            onChange={(event) => {
                              uploadImage(event.target.files[0], "1");
                            }}
                            class="form-control ip-gray radius-xs b-deep px-15"
                            type="file"
                            id="customFile"
                          />
                        </div>

                        {/* <div className="col-md-6 mb-30">
                                                    <label for="formFile" class="form-label">Upload a File</label>
                                                    <input onChange={(event) => {
                                                                            uploadImage(event.target.files[0],"2")
                                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" />
                                                </div> */}

                        <div key={key3} className="col-md-6 mb-30">
                          <label for="formFile" class="form-label">
                            Upload a File
                          </label>
                          <input
                            onChange={(event) => {
                              // uploadImage(event.target.files[0], "2");
                              uploadFileInput(event.target.files, "2");
                            }}
                            class="form-control ip-gray radius-xs b-deep px-15"
                            type="file"
                            id="customFile"
                            multiple
                          />
                          {allFile.map((i, index) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                  width: "70%",
                                }}
                                className="color-dark fs-14 fw-300 align-center mb-0"
                                onClick={() => window.open(i, "_blank")}
                              >
                                {i.split("/")[4]}
                              </p>
                              <p
                                style={{ color: "red" }}
                                onClick={() => removeImage(index)}
                              >
                                Remove
                              </p>
                            </div>
                          ))}
                        </div>

                        {discountApplied && (
                          <div key={key4} className="col-md-6 mb-30">
                            <label for="formFile" class="form-label">
                              Upload a Worksheet
                            </label>
                            <input
                              onChange={(event) => {
                                // uploadImage(event.target.files[0], "2");
                                uploadWorksheetInput(event.target.files, "2");
                              }}
                              class="form-control ip-gray radius-xs b-deep px-15"
                              type="file"
                              id="customFile"
                              multiple
                            />
                            {allWorksheetFile.map((i, index) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    width: "70%",
                                  }}
                                  className="color-dark fs-14 fw-300 align-center mb-0"
                                  onClick={() => window.open(i, "_blank")}
                                >
                                  {i.split("/")[4]}
                                </p>
                                <p
                                  style={{ color: "red" }}
                                  onClick={() => removeImage1(index)}
                                >
                                  Remove
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="layout-button">
                          <div className="btn_center">
                            <button
                              type="button"
                              className="btn btn-outline-petrol btn-squared color-primary"
                            >
                              Preview
                            </button>
                            {/* <NavLink className="navbar-link" to="/learning_screen"> */}
                            <button
                              type="submit"
                              className="btn btn-petrol btn-default btn-squared"
                            >
                              Create & Save
                            </button>
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
    </div>
  );
}

export default Edit_Created_Learning;
