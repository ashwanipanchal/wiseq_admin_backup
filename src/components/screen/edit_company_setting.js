import camera_img from '../../img/svg/camera.svg';
import author_logo from '../../img/user_pic.png';
import { useEffect, useState } from 'react';
import { NavLink , useLocation, useNavigate} from "react-router-dom";
import Side_Bar from './sidebar';
import { BASE_URL } from '../../services/Config';


function Edit_Company_Setting() {
    // console.log("values", values)
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [aboutMe, setAboutMe] = useState(state.about)
    const [aspirationalGoal, setAspirationalGoal] = useState(state.aspirationalGoals)
    const [imagePath, setImagePath] = useState(null)
    const [comTypes, setComTypes] = useState([])
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    // useEffect(()=> {
    //     getType()
    // },[values.industry])

    // const getType = () => {
    //     if(values.industry == "Consumer"){
    //         setComTypes(["Automotive",
    //         "Consumer Products",
    //         "Retail",
    //         "Wholesale & Distribution",
    //         "Transportation"])
    //     }
    //     if(values.industry == "Energy,Resources&Industrials"){
    //         setComTypes(["Industrial Products & Construction",
    //             "Power",
    //             "Utilities & Renewables",
    //             "Energy & Chemicals",
    //             "Mining & Metals"])
    //     }
    //     if(values.industry == "FinancialServices"){
    //         setComTypes([
    //             "Banking & Capital Markets",
    //             "Insurance",
    //             "Investment Management",
    //             "Real Estate"
    //         ])
    //     }
    //     if(values.industry == "Government&PublicServices"){
    //         setComTypes([
    //             "Defense, Security & Justice",
    //             "Federal health",
    //             "Civil",
    //             "State & Local"
    //         ])
    //     }
    //     if(values.industry == "LifeSciences&HealthCare"){
    //         setComTypes([
    //             "Health Care",
    //             "Life Sciences"
    //         ])
    //     }
    //     if(values.industry == "Technology,Media,&Telecommunications"){
    //         setComTypes([
    //             "Software", "AI", "IT",
    //             "Technology",
    //             "Telecommunications", 
    //             "Media & Entertainment"
    //         ])
    //     }
    //     if(values.industry == "Education"){
    //         setComTypes([
    //             "EdTech",
    //             "University and College",
    //             "Institutions"])
    //     }
    //     if(values.industry == "ServicesandUtilities"){
    //         setComTypes([
    //             "E-Commerce",
    //             "Utilities",
    //             "Commercial and Professional Services",
    //             "Hospitality",
    //             "Tourism"])
    //     }
    //     if(values.industry == "Consulting"){
    //         setComTypes(["Consulting"])
    //     }
    //     if(values.industry == "Others"){
    //         setComTypes(["Other"])
    //     }
    // }

    const updateAboutAndAsp = async(e) => {
      // e.preventDefault()
      const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
      const body = {
          "about": aboutMe,
          "aspirationalGoals":aspirationalGoal,
        }
      //   console.log(body)
      //   return
          const res = await fetch(`${BASE_URL}organisations/1234/profile`,{
              method:'PUT',
              headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
              },
              body:JSON.stringify(body)
              })
              const response = await res.json()
          console.log(response)
          const {success} = response
          if(success){
              navigate('/')
          }
  }

    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const submitFormData = () => {

    }

    // const uploadImage = async(item) => {
    //     setImagePath(item)
    //     let formData = new FormData()
    //     formData.append("file", item)
    //             const token = await localStorage.getItem("token")
    //             const btoken = `Bearer ${token}`;  
    //             // console.log(btoken)  
    //             const res = await fetch(`${BASE_URL}files/upload?fileType=profile`,{
    //                 method:'POST',
    //                 headers:{
    //                   "Accept": "application/json",
    //                 //   'Content-Type': 'multipart/form-data',
    //                   "Authorization": btoken,
    //                 },
    //                 body:formData
    //               })
    //               const response = await res.json()
    //             // console.log(response)
    //             const {success} = response
    //             if(success){             
    //                 formData3({"logo":response.data.url})
    //             }
    // }

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
                  <div className="card card-Vertical card-default card-md mb-4">
                    <div className="card-body py-md-30">
                      <form onSubmit={submitFormData}>
                        {/* <div className="row">

                                                <div className="account-profile d-flex align-items-center mb-4 ">
                                                    <div className="ap-img pro_img_wrapper">
                                                        <input  id="file-upload" type="file" name="fileUpload" className="d-none" onChange={(event) => {
                                                            
                                                            // setImagePath(event.target.files[0])
                                                            // uploadImage(event.target.files[0])
                                                        }} />

                                                        <label for="file-upload">
                                                            {imagePath ? <img src={URL.createObjectURL(imagePath)} className="ap-img__main rounded-circle wh-120 bg-lighter d-flex" /> :
                                                                <img src={author_logo} className="ap-img__main rounded-circle wh-120 bg-lighter d-flex" />}
                                                            <span className="cross" id="remove_pro_pic">
                                                                <img src={camera_img} className="svg" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="account-profile__title">
                                                        <h6 className="fs-18 ms-20 fw-500 text-capitalize">Upload Organisation Logo</h6>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <input value={state.orgName}  type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Org Name" required />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={state.headQuarters}type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Head Quarters" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={state.founded} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Founded" required />
                                                </div>


                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={state.industry} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Industry</option>
                                                            <option value="Consumer">Consumer</option>
                                                            <option value="Energy,Resources&Industrials">Energy, Resources & Industrials</option>
                                                            <option value="FinancialServices">Financial Services</option>
                                                            <option value="Government&PublicServices">Government & Public Services</option>
                                                            <option value="LifeSciences&HealthCare">Life Sciences & Health Care</option>
                                                            <option value="Technology,Media,&Telecommunications">Technology, Media, & Telecommunications</option>
                                                            <option value="Education">Education</option>
                                                            <option value="ServicesandUtilities">Services and Utilities </option>
                                                            <option value="Consulting">Consulting </option>
                                                            <option value="Others">Others </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={state.natureOfBusiness}  type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Nature of Business" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={state.companySize}  type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Company Size" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={state.companyType}  class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Company Type</option>
                                                            
                                                            {comTypes.map((i)=>(
                                                                <option value={i}>{i}</option> 
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="col-md-6 mb-25">
                                                    <input value={state.website}  type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Website" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={state.companyEmail}  type="email" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Company Email" required/>
                                                </div>

                                                <div className="layout-button">
                                                    <div className="btn_center">
                                                        
                                                            <button type="submit"  className="btn btn-primary btn-default btn-squared flex-grow-1">Save</button>
                                                      
                                                    </div>
                                                </div>
                                            </div> */}
                        <div className="row">
                          <textarea
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                            class="form-control ip-gray radius-xs b-deep px-15 mb-10"
                            id="exampleFormControlTextarea1"
                            rows="4"
                            placeholder="About the company (100 Words)"
                          ></textarea>
                          <textarea
                            value={aspirationalGoal}
                            onChange={(e) => setAspirationalGoal(e.target.value)}
                            class="form-control ip-gray radius-xs b-deep px-15 mb-10"
                            id="exampleFormControlTextarea1"
                            rows="4"
                            placeholder="Aspirational Goal"
                          ></textarea>
                        </div>
                        <div class="col-md-12"><div class="mt-0"><button type="button" onClick={() => updateAboutAndAsp()} class="btn btn-primary btn-default btn-squared m-auto">Save</button></div></div>
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

export default Edit_Company_Setting;
