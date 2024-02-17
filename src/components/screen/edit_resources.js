import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { BASE_URL } from "../../services/Config";

const categoryOption = [
  {
    category: "PDF",
  },
  {
    category: "Presentation",
  },
  {
    category: "Documents",
  },
  {
    category: "Worksheet",
  },
  {
    category: "Video",
  },
  {
    category: "Podcast",
  },
  {
    category: "Article",
  },
  {
    category: "Case Study",
  },
  {
    category: "Course",
  },
  {
    category: "Tutorial",
  },
  {
    category: "Other",
  },
];
function Edit_Resources() {
  const { state } = useLocation();
  console.log("state in edit res", state);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [name, setName] = useState(state.name);
  const [aSelectedValue, setaSelectedValue] = useState(state?.categories[0]?.category);
  const [description, setDescription] = useState(state.description);
  const [category, setCategory] = useState(state?.categories[0]?.category);
  const [sourceName, setSourceName] = useState(state.sourceLink);
  // const [skills, setSkills] = useState();
  const [totalOrgList, setTotalOrgList] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [link, setLink] = useState(state.externalLink);
  const [photoUrl, setPhotoUrl] = useState(state.coverPhoto);
  const [fileUrl, setFileUrl] = useState(state.fileUrl);
  const [skills, setSkillsList] = useState([])
  const [selectedSkill, setSelectedSkill] = useState(state.skills)
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
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
    console.log("skill list", response)
    if(response.success){
        let tt = []
        response.data.map((i) => {
            tt.push(i.skill)
        })
        setSkillsList(tt)
    }
}

  const addRes = async (e) => {
    e.preventDefault();
    if(photoUrl.length == 0){
      alert("Please attach a cover photo")
      return
    }
    if(fileUrl.length == 0){
      alert("Please attach a file")
      return
    }
    const body = {
      name,
      "categories": [category],
      skills:selectedSkill,
      description,
      "externalLink": link,
      "coverPhoto": photoUrl,
      fileUrl
    };
      console.log(body)
      // return
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;
    // console.log(btoken)
    const res = await fetch(`${BASE_URL}resources/${state.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    console.log(response);
    const { success } = response;
    if (success) {
      navigate('/resources');
    }
  };

  const onSelectCat = (selectedList, selectedItem) => {
    console.log(selectedList)
    let temp = []
    selectedList.map((i) => {
        temp.push(i.category)
        setCategory(temp)
    })
}

const onRemoveCat = (selectedList, removedItem) => {
    // console.log(selectedList)
    let temp = []
    selectedList.map((i) => {
        temp.push(i.category)
        setCategory(temp)
    })
}
  const uploadImage = async (item, index) => {
    // console.log(index)
    // return
    let formData = new FormData();
    formData.append("file", item);
    const btoken = `Bearer ${token}`;
    // console.log(btoken)
    const res = await fetch(`${BASE_URL}files/upload?fileType=ressource_file`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //   'Content-Type': 'multipart/form-data',
        Authorization: btoken,
      },
      body: formData,
    });
    const response = await res.json();
    console.log(response)
    const { success } = response;
    if(success){
        if(index == "1"){
            setPhotoUrl(response.data.url)
        }else{
            setFileUrl(response.data.url)
        }      
    }
  };
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
                <div className="breadcrumb-main user-member justify-content-sm-between">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Edit Resources
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <form onSubmit={addRes}>
                  <div className="row">
                    <div className="col-md-12 mb-25">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                        placeholder="Name"
                        required
                      />
                    </div>

                    <div className="col-md-12 mb-25">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        class="form-control ip-gray radius-xs b-deep px-15"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Description"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-6 mb-25">
                      <div class="countryOption">
                        {/* <Multiselect
                          style={{ searchBox: { borderColor: "gray" } }}
                          // isObject={true}
                          options={categoryOption} // Options to display in the dropdown
                          placeholder="Select Category"
                          selectedValues={aSelectedValue} // Preselected value to persist in dropdown
                          onSelect={onSelectCat} // Function will trigger on select event
                          onRemove={onRemoveCat} // Function will trigger on remove event
                          displayValue="category" // Property name to display in the dropdown options
                        /> */}
                        <select value={category} onChange={e => setCategory(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
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
                      <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Skill(s) Addressed</option>
                                                            {skills && skills.map((i) => (
                                                                <option value={i}>{i}</option>
                                                            ))}
                                                        </select>
                      </div>
                    </div>

                    <div className="col-md-6 mb-15">
                      <input
                        value={sourceName}
                        onChange={(e) => setSourceName(e.target.value)}
                        type="text"
                        className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                        placeholder="Source Name"
                      />
                    </div>
                    <div className="col-md-6 mb-15">
                      <input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                        placeholder="Source Link"
                      />
                    </div>

                    <div className="col-md-6 mb-25">
                      <label for="formFile" class="form-label">
                        Upload Photo
                      </label>
                      <input
                        onChange={(event) => {
                          uploadImage(event.target.files[0], "1");
                        }}
                        class="form-control ip-gray radius-xs b-deep px-15"
                        type="file"
                        id="customFile"
                        
                      />
                      <div  style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                              <p style={{cursor:'pointer', textDecoration:'underline', width:'70%'}} className="color-dark fs-14 fw-300 align-center mb-0"
                                  onClick={() =>
                                    window.open(state.coverPhoto, "_blank")
                                  }
                                >
                                  {photoUrl.split("/")[4]}
                                </p>
                                {photoUrl.length> 0 && (
                                <p style={{color:'red'}} onClick={() => {setPhotoUrl("")}}>Remove</p>
                                )}
                                </div>
                    </div>

                    <div className="col-md-6 mb-25">
                      <label for="formFile" class="form-label">
                        Upload File
                      </label>
                      <input
                        onChange={(event) => {
                          uploadImage(event.target.files[0], "2");
                        }}
                        class="form-control ip-gray radius-xs b-deep px-15"
                        type="file"
                        id="customFile"
                        
                      />

                    <div  style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                              <p style={{cursor:'pointer', textDecoration:'underline', width:'70%'}} className="color-dark fs-14 fw-300 align-center mb-0"
                                  onClick={() =>
                                    window.open(state.fileUrl, "_blank")
                                  }
                                >
                                  {fileUrl.split("/")[4]}
                                </p>
                                {fileUrl.length> 0 && (

                                <p style={{color:'red'}} onClick={() => {setFileUrl("")}}>Remove</p>
                                )}
                                </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mt-0">
                        {/* <NavLink className="navbar-link" to="/resources_detail"> */}
                        <button
                          type="submit"
                          className="btn btn-primary btn-default btn-squared m-auto"
                        >
                          Save
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
      <Side_Bar onClick={toggle} sideBarOpen={sideBarOpen} />
    </div>
  );
}

export default Edit_Resources;
