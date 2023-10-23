import clock_img from '../../img/clocks.svg';
import team_img from '../../img/tm1.png';
import { useEffect, useState } from 'react';
import edit_img from '../../img/edit.svg';
import Side_Bar from './sidebar';
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../services/Config';
import authornav_img from '../../img/user_pic.png';
import InputRange from 'react-input-range'
import loader from '../../img/gifs/loaderanimation';
import MultiRangeSlider from "multi-range-slider-react";
import ReactPaginate from 'react-paginate';
import Lottie from 'react-lottie';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

const data = [
    { id: 1, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "4.5", mentee_skill: "Key Skills", mentee_employee: "IT Strategy", mentee_hcm: "Leadership", mentee_three: "+3" },
    { id: 2, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "4.5", mentee_skill: "Key Skills", mentee_employee: "IT Strategy", mentee_hcm: "Leadership", mentee_three: "+3" },
    { id: 3, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "4.5", mentee_skill: "Key Skills", mentee_employee: "IT Strategy", mentee_hcm: "Leadership", mentee_three: "+3" },
    { id: 4, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "4.5", mentee_skill: "Key Skills", mentee_employee: "IT Strategy", mentee_hcm: "Leadership", mentee_three: "+3" },
    { id: 5, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "4.5", mentee_skill: "Key Skills", mentee_employee: "IT Strategy", mentee_hcm: "Leadership", mentee_three: "+3" },
    { id: 6, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "4.5", mentee_skill: "Key Skills", mentee_employee: "IT Strategy", mentee_hcm: "Leadership", mentee_three: "+3" },
];
var filterUrl = ""
let workExp = ""
let locc = ""
let cSkilll = ""
let bSkilll = ""
function Mentors_Screen() {
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [exp, setExp] = useState("")
    const [sliderVal, setSliderVal] = useState(0)
    const [mentorList, setMentorList] = useState([])
    const [Cskills, setCSkills] = useState([])
    const [Bskills, setBSkills] = useState([])
    const [skills, setSkills] = useState([])
    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(35);
    const [showFilter, setShowFilter] = useState(false)
    const [coreSkills, setCoreSkills] = useState([])
    const [busSkills, setBusSkills] = useState([])
    const [workLocationList, setworkLocationList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [itemsPerPage] = useState(10);
    const showModal = () => {
        setShowFilter(prevStat => !prevStat)
    }
    const handleInput = async (e) => {
        console.log(e)
        // return
        set_minValue(e.minValue)
        set_maxValue(e.maxValue)
        console.log(`${BASE_URL}mentor?minYearsOfExperience=${e.minValue}&maxYearsOfExperience=${e.maxValue}`)
        console.log(e)
        if(e == ""){
            workExp="" 
        }else{
            
        
            workExp = `minYearsOfExperience=${e.minValue}&maxYearsOfExperience=${e.maxValue}`
    }
        
        // workExp = `minYearOfExperience=${e.minValue}&minYearOfExperience=${e.maxValue}`
        let furl;

        if (locc != "" || bSkilll != "" || cSkilll != "") {
            if (locc != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + workExp

            }

            if (locc != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + workExp

            }
            if (locc != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (locc != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = workExp
        }

        console.log(furl)

        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentor?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMentorList(response.data)
        }
    };
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
        getSkills()
        getAllLocationToFilter()
        getMentor()
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const getMentor = async () => {
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}mentor?showInactiveUsers=true`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
          console.log(response)
        const { success } = response
        setIsLoading(false)
        if (success) {
            setMentorList(response.data)
        }
    }

    const getAllLocationToFilter = async() => {
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
                setworkLocationList(data.locations.split(','))
            }
        }
    }

    const getSkills = async () => {
        const token = await localStorage.getItem("token")
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
        const { data } = response
        // console.log(data)
        let tempCArr = []
        let tempBArr = []
        data.map((i) => {
            if (i.type == "core") {
                tempCArr.push(i)
                setCoreSkills(tempCArr)

            } else {
                tempBArr.push(i)
                setBusSkills(tempBArr)
            }
        })

    }
    const ExpFilter = async (e) => {
        // if (filterUrl.includes("yearsOfExperience")){
        //     let after_ = filterUrl.split("yearsOfExperience=");
        //     console.log(after_)

        //     console.log(filterUrl)
        //     let b = `yearsOfExperience=${after_[1]}`
        //     let c=  b.split("&")
        //     console.log(b.split("&"))
        //     filterUrl =filterUrl.replace(c[0],"")

        // }
        // workExp = ""
        // if(locc == "" && cSkilll == "" && bSkilll == ""){

        //     workExp = `yearsOfExperience=${e}`
        // }

        // if(locc != "" && cSkilll == "" && bSkilll == ""){
        //     workExp = `yearsOfExperience=${e}&${locc}`
        // }
        // if(locc != "" && cSkilll != "" && bSkilll == ""){
        //     workExp = `yearsOfExperience=${e}&${cSkilll}&${locc}`
        // }
        // if(locc != "" && cSkilll != "" && bSkilll != ""){
        //     workExp = `yearsOfExperience=${e}&${cSkilll}&${locc}&${bSkilll}`
        // }


        // if(cSkilll != "" && locc == "" && bSkilll == ""){
        //     workExp = `yearsOfExperience=${e}&${cSkilll}`
        // }
        // if(cSkilll != "" && locc != "" && bSkilll == ""){
        //     workExp = `yearsOfExperience=${e}&${cSkilll}&${locc}`
        // }
        // if(cSkilll != "" && locc != "" && bSkilll != ""){
        //     workExp = `yearsOfExperience=${e}&${cSkilll}&${locc}&${bSkilll}`
        // }



        // if(bSkilll != "" && cSkilll == "" && locc == ""){
        //     workExp = `yearsOfExperience=${e}&${bSkilll}`
        // }
        // if(bSkilll != "" && cSkilll != "" && locc == ""){
        //     workExp = `yearsOfExperience=${e}&${bSkilll}&${cSkilll}`
        // }
        // if(bSkilll != "" && cSkilll != "" && locc != ""){
        //     workExp = `yearsOfExperience=${e}&${bSkilll}&${cSkilll}&${locc}`
        // }

        console.log(e)
        workExp = `yearsOfExperience=${e}`
        let furl;

        if (locc != "" || bSkilll != "" || cSkilll != "") {
            if (locc != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + workExp

            }

            if (locc != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + workExp

            }
            if (locc != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (locc != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = workExp
        }

        console.log(furl)

        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentor?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMentorList(response.data)
        }
    }

    const WLFilter = async (e) => {
        // console.log(filterUrl)
        // if (filterUrl.includes("workLocation")){
        //     let after_ = filterUrl.split("workLocation=");
        //     console.log(after_)

        //     console.log(filterUrl)
        //     let b = `workLocation=${after_[1]}`
        //     console.log(b)
        //     filterUrl =filterUrl.replace(b,"")



        // }

        // locc = ""
        // if(workExp == "" && cSkilll == "" && bSkilll == ""){

        //     locc = `workLocation=${e}`
        // }

        // if(workExp != "" && cSkilll == "" && bSkilll == ""){
        //     locc = `workLocation=${e}&${workExp}`
        // }
        // if(workExp != "" && cSkilll != "" && bSkilll == ""){
        //     locc = `workLocation=${e}&${cSkilll}&${workExp}`
        // }
        // if(workExp != "" && cSkilll != "" && bSkilll != ""){
        //     locc = `workLocation=${e}&${cSkilll}&${workExp}&${bSkilll}`
        // }


        // if(cSkilll != "" && workExp == "" && bSkilll == ""){
        //     locc = `workLocation=${e}&${cSkilll}`
        // }
        // if(cSkilll != "" && workExp != "" && bSkilll == ""){
        //     locc = `workLocation=${e}&${cSkilll}&${workExp}`
        // }
        // if(cSkilll != "" && workExp != "" && bSkilll != ""){
        //     locc = `workLocation=${e}&${cSkilll}&${workExp}&${bSkilll}`
        // }



        // if(bSkilll != "" && cSkilll == "" && workExp == ""){
        //     locc = `workLocation=${e}&${bSkilll}`
        // }
        // if(bSkilll != "" && cSkilll != "" && workExp == ""){
        //     locc = `workLocation=${e}&${bSkilll}&${cSkilll}`
        // }
        // if(bSkilll != "" && cSkilll != "" && workExp != ""){
        //     locc = `workLocation=${e}&${bSkilll}&${cSkilll}&${workExp}`
        // }

        // console.log(locc)
        if(e == ""){
            locc="" 
        }else{
            
        
        locc = `workLocation=${e}`
    }
        let furl;



        if (workExp != "" || bSkilll != "" || cSkilll != "") {
            if (workExp != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (workExp == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + locc

            }

            if (workExp != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (workExp == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + locc

            }
            if (workExp != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        }
        else {
            furl = locc
        }
        console.log(furl)

        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentor?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMentorList(response.data)
        }
    }

    const CSFilter = async (e) => {
        // console.log(e) 
        // return         
        if(e == ""){
            cSkilll="" 
        }else{
            
        
            cSkilll = `coreSkills=${e}`
    }      
        // cSkilll = `coreSkills=${e}`
        let furl;

        if (workExp != "" || bSkilll != "" || locc != "") {
            if (workExp != "" || bSkilll == "" || locc == "") {
                furl = workExp + "&" + cSkilll
            }
            if (workExp == "" || bSkilll != "" || locc == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || bSkilll == "" || locc != "") {
                furl = cSkilll + "&" + locc

            }

            if (workExp != "" || bSkilll != "" || locc == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp == "" || bSkilll != "" || locc != "") {
                furl = cSkilll + "&" + bSkilll + "&" + locc

            }
            if (workExp != "" || bSkilll == "" || locc != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = cSkilll
        }

        console.log(furl)

        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentor?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMentorList(response.data)
        }
    }

    const BSFilter = async (e) => {
        // console.log(e)
        if(e == ""){
            bSkilll="" 
        }else{
            
        
            bSkilll = `businessSkills=${e}`
    }  
        // bSkilll = `businessSkills=${e}`
        let furl;


        if (workExp != "" || cSkilll != "" || locc != "") {
            if (workExp != "" || cSkilll == "" || locc == "") {
                furl = workExp + "&" + bSkilll
            }
            if (workExp == "" || cSkilll != "" || locc == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || cSkilll == "" || locc != "") {
                furl = bSkilll + "&" + locc

            }

            if (workExp != "" || cSkilll != "" || locc == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp == "" || cSkilll != "" || locc != "") {
                furl = bSkilll + "&" + cSkilll + "&" + locc

            }
            if (workExp != "" || cSkilll == "" || locc != "") {
                furl = workExp + "&" + locc + "&" + bSkilll

            }

            if (workExp != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = bSkilll
        }
        console.log(furl)


        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentor?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMentorList(response.data)
        }
    }

    const goToProfile = (id) => {
        navigate('/mentor_profile', { state: id })
    }

    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = mentorList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(mentorList.length / itemsPerPage);


      // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % mentorList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}, item : ${itemsPerPage}`
    );
    setItemOffset(newOffset);
  };

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">Mentors</h4>
                                    </div>
                                </div>

                                <NavLink className="navbar-link" to="/add_mentor">
                                    <div className="action-btn">
                                        <div className="btn px-15 btn-primary">Add Mentor</div>

                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            {/* <InputRange
                                maxValue={20}
                                minValue={0}
                                value={sliderVal}
                                onChange={value => setSliderVal(value)} /> */}
                            <div className="card card-Vertical card-default card-md mb-4">
                                <div className="">
                                    <form>
                                        <div className="row">



                                            <div className="col-lg-4 col-md-8 mb-15">
                                                <div className="countryOption">
                                                    {/* <select value={exp} onChange={e => {
                                                        setExp(e.target.value)
                                                        ExpFilter(e.target.value)
                                                    }} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Select Experience</option>
                                                        <option value="1">1 Years</option>
                                                        <option value="2">2 Years</option>
                                                        <option value="3">3 Years</option>
                                                        <option value="3"><input
                                                            id="typeinp"
                                                            type="range"
                                                            min="0" max="5"
                                                            step="1" /></option>

                                                    </select> */}
                                                    {/* <input
                                                        style={{ width: '100%' }}
                                                        value={sliderVal}
                                                        max={35}
                                                        onChange={e => setSliderVal(e.target.value)}
                                                        type='range'
                                                    />
                                                    {sliderVal} */}
                                                    <div onClick={() =>  showModal()} style={{border: '1px solid #beb9b9', padding: "6px", borderRadius: '5px', fontSize: '14px'}} className="">
                                                    <span className="nav-item__title">Experience    <i className="las la-angle-down nav-item__arrow" style={{float:'right', marginTop:'3px'}}></i></span>
                                                </div>

                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => WLFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Location</option>
                                                        {/* <option value="delhi">New Delhi</option>
                                                        <option value="mumbai">Mumbai</option> */}
                                                        {workLocationList.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => CSFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Core Skills</option>
                                                        {coreSkills.map((i) => (
                                                                    <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => BSFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Business Skills</option>
                                                        {busSkills.map((i) => (
                                                                    <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select className="form-select custom_selects" aria-label="Default select example">
                                                        <option selected>All Filters</option>
                                                        <option value="1">3</option>
                                                    </select>
                                                </div>
                                            </div> */}

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {isLoading ? <Lottie 
                            options={defaultOptions}
                            height={100}
                            width={100}
                        /> : 
                        <>
                        
                        {mentorList && currentItems.map((user, index) => (
                            <div key={index} className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <a href="#">
                                                    <h6 className="mt-0  fw-500">{user.name}</h6>
                                                </a>
                                                <p className="fs-13 color-light mb-0">{user.jobTitle}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.rating.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-group-people">
                                        <p className="mt-15">Key Skill</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.slice(0,3).map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{i.toDevelop == false && i.skill}</span>
                                            ))}
                                            {user.skills.length > 3  ?
                                                <span className="badge badge-square btn-outline-emlpoy me-10">+{user.skills.length - 3}</span> : null
                                            }
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="layout-button">
                                        <button onClick={() => goToProfile(user.id)} type="button" className="btn btn-default btn-squared color-primary btn-outline-primary flex-grow-1">View Profile</button>
                                        <button onClick={() => navigate("/chat", {state: user})} type="button" className="btn btn-primary btn-default btn-squared flex-grow-1">Chat</button>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </>}



                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="user-pagination">
                                <div className="d-flex justify-content-md-end justify-content-center mt-1 mb-30">
                                    {/* <nav className="dm-page ">
                                        <ul className="dm-pagination d-flex">
                                            <li className="dm-pagination__item">
                                                <a href="#" className="dm-pagination__link pagination-control"><span className="la la-angle-left"></span></a>
                                                <a href="#" className="dm-pagination__link active"><span className="page-number">1</span></a>
                                                <a href="#" className="dm-pagination__link"><span className="page-number">2</span></a>
                                                <a href="#" className="dm-pagination__link"><span className="page-number">3</span></a>
                                                <a href="#" className="dm-pagination__link pagination-control"><span className="page-number">...</span></a>
                                                <a href="#" className="dm-pagination__link"><span className="page-number">12</span></a>
                                                <a href="#" className="dm-pagination__link pagination-control"><span className="la la-angle-right"></span></a>
                                                <a href="#" className="dm-pagination__option">
                                                </a>
                                            </li>
                                        </ul>
                                    </nav> */}
                                    <ReactPaginate
                                        nextLabel="Next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={pageCount}
                                        itemsPerPage={10}
                                        previousLabel="< Previous"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        renderOnZeroPageCount={null}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {showFilter ?
                    <div className="filter_box_exp">
                        <div className="products_page product_page--grid mb-30">
                            <div className="1">
                                <div className="1">
                                    <div className="1">
                                        <div className="widget box_shadow1">
                                            <div className="category_sidebar">
                                                <div className="product-sidebar-widget mb-10">
                                                <MultiRangeSlider
                                                        min={0}
                                                        max={35}
                                                        step={1}
                                                        label={false}
                                                        ruler={false}
                                                        barInnerColor={'#72b8bf'}
                                                        style={{ boxShadow: 'none', padding: '13px 10px', borderRadius: "6px", border:'none' }}
                                                        minValue={minValue}
                                                        maxValue={maxValue}
                                                        onChange={(e) => {
                                                            handleInput(e);
                                                        }}
                                                    />
                                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                                        <p>min:{minValue}</p>
                                                        <p>max:{maxValue}</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""}
            </div>

            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>





    );
}

export default Mentors_Screen;
