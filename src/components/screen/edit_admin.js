import horizontal_img from '../../img/svg/more-verticals.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../services/Config';

function Edit_Admin() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log("state in edit admin scree", state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [Name, setName] = useState(state.usermeta?.name)
    const [Email, setEmail] = useState(state.usermeta?.email)
    const [Number, setNumber] = useState(state.usermeta?.phoneNumber)
    const [EmpId, setEmpId] = useState(state.empId)
    const [Location, setLocation] = useState(state.location)
    const [allLocation, setAllLocation] = useState([])
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
        getDetails()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

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
        if(success){
            if(data){
                setAllLocation(data.locations.split(','))
            }
        }
    }

    const addAdmin = async(e) => {
        e.preventDefault()
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body = 
                {
                    "name": Name,
                    "phoneNumber": Number,
                    "email": Email,
                    // "imageUrl": "string",
                    "empId": EmpId,
                    "location": Location
                }
            //   console.log(body)
            const res = await fetch(`${BASE_URL}organisation-admins/${state.id}/edit-org-admin`,{
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
            if(response.success){
              alert("Updated Successfully")
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
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Edit Admin</h4>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form onSubmit={addAdmin}>
                                            <div className="row">
                                                <div className="col-md-6 mb-25">
                                                    <input value={Name} onChange={e => setName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Name" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={Email} onChange={e => setEmail(e.target.value)} type="email" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Email" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={Number} onChange={e => setNumber(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Contact" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input value={EmpId} onChange={e => setEmpId(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Employee ID" required />
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select name='workLocation' value={Location} onChange={e => setLocation(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                        <option value="">Select Work Location</option>
                                                            {allLocation.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6 mb-25">
                                                    <input value={Location} onChange={e => setLocation(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Location" required/>
                                                </div> */}

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        <button type="submit" className="btn btn-primary btn-default btn-squared m-auto">Save</button>
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

export default Edit_Admin;
