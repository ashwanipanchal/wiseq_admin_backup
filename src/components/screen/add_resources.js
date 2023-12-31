import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';

const categoryOption = [
    {
        name:"PDF"
    },
    {
        name:"Presentation"
    },
    {
        name:"Documents"
    },
    {
        name:"Worksheet"
    },
    {
        name:"Video"
    },
    {
        name:"Podcast"
    },
    {
        name:"Article"
    },
    {
        name:"Case Study"
    },
    {
        name:"Course"
    },
    {
        name:"Tutorial"
    },
    {
        name:"Other"
    },
]
function Add_Resources() {
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [name, setName] = useState("")
    const [desctiption, setDescription] = useState("")
    const [category, setCategory] = useState([])
    const [skills, setSkills] = useState("")
    const [link, setLink] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [fileUrl, setFileUrl] = useState("")
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

    const uploadResources = async(e) => {
        e.preventDefault()
        const body = {
            name,
            "categories": category,
            // "organisationId": [
            //   "string"
            // ],
            description: desctiption,
            skills,
            "externalLink": link,
            "coverPhoto": photoUrl,
            "fileUrl": fileUrl
          }
        //   console.log(body)
        //   return
          const token = await localStorage.getItem("token")
                const btoken = `Bearer ${token}`;  
                // console.log(btoken)  
                const res = await fetch(`https://api.wiseqglobal.com/api/resources`,{
                    method:'POST',
                    headers:{
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                      "Authorization": btoken,
                    },
                    body:JSON.stringify(body)
                  })
                  const response = await res.json()
                console.log(response)
                const {success} = response
                if(success){
                    navigate(-1)
                }
         
    }
    const uploadImage = async(item, index) => {
        // console.log(index)
        // return
        let formData = new FormData()
        formData.append("file", item)
                const token = await localStorage.getItem("token")
                const btoken = `Bearer ${token}`;  
                // console.log(btoken)  
                const res = await fetch(`https://api.wiseqglobal.com/api/files/upload?fileType=ressource_file`,{
                    method:'POST',
                    headers:{
                      "Accept": "application/json",
                    //   'Content-Type': 'multipart/form-data',
                      "Authorization": btoken,
                    },
                    body:formData
                  })
                  const response = await res.json()
                // console.log(response)
                const {success} = response
                if(success){
                    if(index == "1"){
                        setPhotoUrl(response.data.url)
                    }else{
                        setFileUrl(response.data.url)
                    }      
                }
    }


    const onSelectCat = (selectedList, selectedItem) => {
        // console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i.name)
            setCategory(temp)
        })
    }

    const onRemoveCat = (selectedList, removedItem) => {
        // console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i.name)
            setCategory(temp)
        })
    }
    return (

        <div className="main-content">
            <div className="contents">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between ">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Add Resources</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form onSubmit={uploadResources}>
                                            <div className="row">
                                                <div className="col-md-12 mb-25">
                                                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Name" required/>
                                                </div>

                                                <div className="col-md-12 mb-25">
                                                    <textarea value={desctiption} onChange={e => setDescription(e.target.value)} class="form-control ip-gray radius-xs b-deep px-15" id="exampleFormControlTextarea1" rows="3" placeholder="Description" required></textarea>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        {/* <select value={category} onChange={e => setCategory(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Category</option>
                                                            <option value="category1">Category 1</option>
                                                            <option value="category2">Category 2</option>
                                                        </select> */}
                                                        <Multiselect
                                                            style={{ searchBox: { borderColor: 'gray' } }}
                                                            // isObject={false}
                                                            options={categoryOption} // Options to display in the dropdown
                                                            placeholder='Select Category'
                                                            // selectedValues={selectedBSkillDev} // Preselected value to persist in dropdown
                                                            onSelect={onSelectCat} // Function will trigger on select event
                                                            onRemove={onRemoveCat} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={skills} onChange={e => setSkills(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Key Skills</option>
                                                            <option value="react">React</option>
                                                            <option value="node">Node</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mb-15">
                                                    <input value={link} onChange={e => setLink(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="External Link" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label for="formFile" class="form-label">Upload Photo</label>
                                                    <input onChange={(event) => { 
                                                            uploadImage(event.target.files[0],"1")
                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <label for="formFile" class="form-label">Upload File</label>
                                                    <input onChange={(event) => { 
                                                            uploadImage(event.target.files[0],"2")
                                                        }} class="form-control ip-gray radius-xs b-deep px-15" type="file" id="customFile" required/>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        {/* <NavLink className="navbar-link" to="/resources_detail"> */}
                                                            <button type="submit" className="btn btn-primary btn-default btn-squared m-auto">Save</button>
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

export default Add_Resources;
