import { useLocation, useNavigate } from 'react-router-dom';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../services/Config';
import path from "../../img/Path.png";

function Edit_Mentee() {
    const {state} = useLocation()
    const navigate = useNavigate()
    console.log("state", state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fname, setFName] = useState(state.userMeta.name.split(/\s/)[0])
    const [lname, setLName] = useState(state.userMeta.name.split(/\s/)[1] == "" ?state.userMeta.name.split(/\s/)[2]:state.userMeta.name.split(/\s/)[1])
    const [email, setEmail] = useState(state.userMeta?.email)
    const [eid, setEid] = useState(state.empId) 
    const [role, setRole] = useState(state.jobTitle) 
    const [functionalArea, setfunctionalArea] = useState(state.functionalArea)
    const [yearsWithCompany, setyearsWithCompany] = useState(state.yearsWithCompany)
    const [levelOfEmp, setlevelOfEmp] = useState(state.designationLevel)
    const [workLocation, setworkLocation] = useState(state.workLocation)
    const [division, setdivision] = useState(state.division)
    const [managerName, setmanagerName] = useState(state.reportingManagerName)
    const [managerID, setmanagerID] = useState(state.reportingManagaerEid)
    const [country, setcountry] = useState(state.country)
    const [countryList, setcountryList] = useState([])
    const [divisionList, setdivisionList] = useState([])
    const [workLocationList, setworkLocationList] = useState([])
    const [levels, setLevels] = useState([])
    const [fAreas, setFAreas] = useState([])


    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        const getDetails = async() => {
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`;
            const res = await fetch(`${BASE_URL}organisation-info`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
            })
            const response = await res.json()
            const{success, data} = response
            console.log("setting data",response)
            if(success){
                if(data){
                    setLevels(data.levels.split(','))
                    setFAreas(data.functionalAreas.split(','))
                    setcountryList(data.countries.split(','))
                    setworkLocationList(data.locations.split(','))
                    setdivisionList(data.divisions.split(','))
                    // setLocation(data.locations)
                    // setDivisions(data.divisions)
                    // setFSkills(data.coreSkills)
                    // setBSKills(data.businessSkills)
                }
            }
        }
        
            getDetails()
    },[])
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

    const updateMentee = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body = 
            {
                    "empId": eid,
                    "jobTitle": role,
                    "functionalArea": functionalArea,
                    "yearsWithCompany": parseInt(yearsWithCompany),
                    "designationLevel": levelOfEmp,
                    "workLocation": workLocation,
                    "division": division,
                    "reportingManagerName": managerName,
                    "reportingManagaerEid": managerID,
                    "country": country,
                    "name": `${fname}\u00A0${lname}`,
                    "email": email,
                    // "status": "Active"
                
              }
              console.log(body)
            //   return
              const res = await fetch(`${BASE_URL}organisation-admins/${state.id}/edit-mentor-mentee`,{
                  method:'PUT',
                  headers:{
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                  },
                  body:JSON.stringify(body)
                })
                const response = await res.json()
            //   console.log(response)
              const {success} = response
              if(success == true){
                navigate(-1)
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
                                        <p
                                            onClick={() => navigate("/mentors")}
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
                                                color: "#F8A046",
                                                fontWeight: "400",
                                                lineHeight: "22px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit Mentee
                                        </p>
                                        
                                    </div>
                                </div>
                                <div className="d-flex align-items-center user-member__title mb-10 me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Edit Mentors Profile</h4>
                                        </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-25">
                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs px-15" disabled placeholder={state.empId} />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Email" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={fname} onChange={e => setFName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="First Name" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={lname} onChange={e => setLName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Last Name" />
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                    <input value={role} onChange={e => setRole(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Job Title" />
                                                        {/* <select value={role} onChange={e => setRole(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Role</option>
                                                            <option value="Developer">Developer</option>
                                                            <option value="Designer">Designer</option>
                                                            <option value="Manager">Manager</option>
                                                            <option value="Tester">Tester</option>
                                                        </select> */}
                                                    </div>

                                                </div>
                                                {/* <div className="col-md-6 mb-25">
                                                    <input value={role} onChange={e => setRole(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Role" />
                                                </div> */}

                                                <div className="col-md-6 mb-25">
                                                        <div class="countryOption">
                                                            <select value={functionalArea} onChange={e => setfunctionalArea(e.target.value)}  class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Functional Area</option>
                                                                {fAreas.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>
                                                {/* <div className="col-md-6 mb-25">
                                                    <input value={role} onChange={e => setRole(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Role" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={functionalArea} onChange={e => setfunctionalArea(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Function Area" />
                                                </div> */}

                                                <div className="col-md-6 mb-25">
                                                    <input value={yearsWithCompany} onChange={e => setyearsWithCompany(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Years with the Company" />
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                        <div class="countryOption">
                                                            <select value={levelOfEmp} onChange={e => setlevelOfEmp(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Level of Employee</option>
                                                                {levels.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>
                                                {/* <div className="col-md-6 mb-25">
                                                    <input value={levelOfEmp} onChange={e => setlevelOfEmp(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Level of employee" />
                                                </div> */}
                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={workLocation} onChange={e => setworkLocation(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                        <option value="">Select Work Location</option>
                                                            {workLocationList.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={division} onChange={e => setdivision(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                        <option value="">Select Division</option>
                                                            {divisionList.map((i) => (
                                                                    <option value={i.trim()}>{i}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                </div>
                                                

                                                <div className="col-md-6 mb-25">
                                                    <input value={managerName} onChange={e => setmanagerName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Reporting Manager Name" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={managerID} onChange={e => setmanagerID(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Reporting Manager EID" />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select value={country} onChange={e => setcountry(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                        <option value="">Select Country</option>
                                                            {countryList.map((i) => (
                                                                    <option value={i.trim()}>{i}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        <button onClick={() => updateMentee()} type="button" className="btn btn-primary btn-default btn-squared m-auto">Save</button>
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

export default Edit_Mentee;
