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
  const [aSelectedValue, setaSelectedValue] = useState(state.categories);
  const [description, setDescription] = useState(state.description);
  const [category, setCategory] = useState(state.categories);
  const [skills, setSkills] = useState(state.skills);
  const [totalOrgList, setTotalOrgList] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [link, setLink] = useState(state.externalLink);
  const [photoUrl, setPhotoUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const addRes = async (e) => {
    e.preventDefault();
   let nn = category.map((i)=> {
    console.log(i)
      return i.category
    })
    const body = {
      name,
      "categories": nn,
      skills,
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
    const res = await fetch(`http://13.235.104.81:8000/api/resources/${state.id}`, {
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
    const res = await fetch(`http://13.235.104.81:8000/api/files/upload?fileType=ressource_file`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //   'Content-Type': 'multipart/form-data',
        Authorization: btoken,
      },
      body: formData,
    });
    const response = await res.json();
    // console.log(response)
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
                        <Multiselect
                          style={{ searchBox: { borderColor: "gray" } }}
                          // isObject={true}
                          options={categoryOption} // Options to display in the dropdown
                          placeholder="Select Category"
                          selectedValues={aSelectedValue} // Preselected value to persist in dropdown
                          onSelect={onSelectCat} // Function will trigger on select event
                          onRemove={onRemoveCat} // Function will trigger on remove event
                          displayValue="category" // Property name to display in the dropdown options
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-25">
                      <div class="countryOption">
                        <select
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                          class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15"
                          aria-label="Default select example"
                          required
                        >
                          <option value="">Select Key Skills</option>
                          <option value="react">React</option>
                          <option value="node">Node</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-12 mb-15">
                      <input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                        placeholder="External Link"
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
                        required
                      />
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
                        required
                      />
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
