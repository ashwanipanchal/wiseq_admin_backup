import search_img from '../../img/svg/search1.svg';
import team_img from '../../img/user_pic.png';
import Side_Bar from './sidebar';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { BASE_URL, BASE_URL_APPLSURE, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
const data = [
    { id: 1, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "chat" },
    { id: 2, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Pair" },
    { id: 3, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "chat" },
    { id: 4, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Pair" },
    { id: 5, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "chat" },
    { id: 6, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Pair" },
];

const data1 = [
    { id: 1, filter_heading: "Location" },
    { id: 2, filter_heading: "Core Skills" },
    { id: 3, filter_heading: "Business Skills" },
    { id: 4, filter_heading: "Function" },
];

function Match_Making() {
    const {state} = useLocation()
    console.log(state?.myState?.name)
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [allMenteeData, setAllMenteeData] = useState([])
    const [allMenteeDataProgram, setAllMenteeDataProgram] = useState([])
    const [allMentorData, setAllMentorData] = useState([])
    const [joinList, setJoinList] = useState([])
    const [menteeSearch, setMenteeSearch] = useState('')
    const [mentorSearch, setMentorSearch] = useState('')
    const [filter0, setFilter0] = useState('');
    const [programName, setProgramName] = useState("")
    const [selectedMenteeList, setselectedMenteeList] = useState([])
    const [selectedMentorList, setselectedMentorList] = useState([])
    const [programList, setProgramList] = useState([])
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

    const [showFilter, setShowFilter] = useState(false)

    const showModal = () => {
        setShowFilter(prevStat => !prevStat)
    }

    useEffect(() => {
        const fetchListData = async(index) => {
        
          var myHeaders = new Headers();
          myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "status":[4]
        });
    
          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };
    
          fetch(`${BASE_URL_APPLSURE_MENTORING}program-list-published`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log("==",result)
              setProgramList(result.programList)
             
          })
          .catch(error => console.log('error', error));
    
          
        }
        fetchListData()
      },[])

    const getProgramMentee = async(id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id":id,
            "role":"mentee" // mentor
        });
  
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist-accepted`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("000-----------",result)
            let pp = []
            // result.userlist?.map((i) => {
            //   pp.push({id: i.user_id, name: i.user_meta?.name})
            // })
            // setMenteeList(pp)

            result?.list?.map((i) => {
                pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
                // return { ...i, isSelected: "" }
            })
            console.log(pp)
            setAllMenteeData(pp)

          })
        .catch(error => console.log('error', error));
        
   } 
//     const getProgramMentors = async(id) => {
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
//         myHeaders.append("Content-Type", "application/json");
  
//         var raw = JSON.stringify({
//             "program_id":id,
//             "role":"mentor" // mentor
//         });
  
//         var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//         };
  
//         fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist-accepted`, requestOptions)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//             let pp = []
//             // result.userlist?.map((i) => {
//             //   pp.push({id: i.user_id, name: i.user_meta?.name})
//             // })
//             // setMenteeList(pp)
//             result?.list?.map((i) => {
//                 pp.push({id: i.user_id, name: i.user_meta?.name, imageUrl: i.user_meta?.image_url, skills: i.user_meta?.user_skills, jobTitle: i?.organisation_user?.job_title, isSelected: "", scores: i.total_score})
//                 // return { ...i, isSelected: "" }
//             })
//             setAllMentorData(pp)
//           })
//         .catch(error => console.log('error', error));
        
//    } 

    useEffect(() => {
        
        fetchData();
    }, [])
    
    const fetchData = async () => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const respGlobal = await fetch(`${BASE_URL}mentee`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const mentees = await respGlobal.json()
        let newMentee = mentees.data.map((i) => {
            return { ...i, isSelected: "" }
        })
        setAllMenteeData(newMentee)
        //   console.log("mentees", mentees)
        const respRepos = await fetch(`${BASE_URL}mentor`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const mentors = await respRepos.json()
        let newMentor = mentors.data.map((i) => {
            return { ...i, isSelected: "" }
        })
        console.log(newMentor)
        // setAllData({ mentors : newMentor, mentees: newMentee });
        // setAllMentorData(newMentor)
    };
    const updateList = (item, index) => {

    }
    let selectedMentee = []
    let selectedMentor = []
    const addToList = (index, user) => {
        console.log(user)
        if (user.isSelected == "") {
            for (let i of filteredDataMentee) {
                i.isSelected = ""
            }
            filteredDataMentee[index].isSelected = "Y"
        } else {
            filteredDataMentee[index].isSelected = ""
        }
        console.log(selectedMentee)
        setAllMenteeData(allMenteeData)
        console.log(allMenteeData)
        if(filter0.length > 0){
            getRecomendedForProgramMentor(user.id)
        }else{
            getRecomended(user.id)
        }
    }

    const addToList1 = (index, user) => {
        if(mentorSearch.length > 0){
            if (user.isSelected == "") {
                filteredDataMentor[index].isSelected = "Y"
            } else {
                filteredDataMentor[index].isSelected = ""
            }
            console.log(selectedMentee)
            setAllMentorData(filteredDataMentor)
            console.log(filteredDataMentor)
        }else{
            if (user.isSelected == "") {
                allMentorData[index].isSelected = "Y"
            } else {
                allMentorData[index].isSelected = ""
            }
            console.log(selectedMentee)
            setAllMentorData(allMentorData)
            console.log(allMentorData)
        }
    }

    const getRecomended = async (id) => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const respRepos = await fetch(`${BASE_URL}mentee/recommended-mentors?userId=${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const mentors = await respRepos.json()
        console.log("new rec list", mentors)
        let newMentor = mentors.data.map((i) => {
            return { ...i, isSelected: "" }
        })
        console.log(newMentor)
        setAllMentorData(newMentor)
    }
    const getRecomendedForProgramMentor = async (id) => {
        // console.log(filter0)
        // console.log(id)
        // return
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "mentee_id": id,
        "program_id": filter0
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://www.wiseq.co/ndwiseqbackend/api/matchmaking", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.mentor)
            let pp = []
            result?.mentor?.map((i) => {
                pp.push({id: i.user_id, name: i.userDetail?.name, imageUrl: i.userDetail?.image_url, skills: i.userDetail?.skills, jobTitle: i?.userDetail?.mentordatainfo?.job_title, isSelected: "", percentageMatch: i.percentageMatch, rating: i?.userDetail?.rating})
                // return { ...i, isSelected: "" }
            })
            console.log("pp", pp)
            setAllMentorData(pp)
        })
        .catch(error => console.log('error', error));
        

    }

    const goToConfirm = () => {
        // console.log(allMenteeData)
        let gg = allMentorData.filter((i) => {
            if(i.isSelected == "Y"){
                return i
            }
        })
        console.log(gg)
        if(gg.length == 0){
            alert("Please Select Atleast One Mentor")
            return
        }else{
            let dict = {
                mentee: allMenteeData,
                mentor: gg
                // mentor: allMentorData
            }
            navigate('/confirm_pair', { state: {dict, programName, programId:filter0 }})
        }
        
    }

    const filteredDataMentee = menteeSearch
    // console.log(allMenteeData)
        ? allMenteeData.filter(x =>
            // alert(JSON.stringify(x,null,2))
            x.name.toLowerCase().includes(menteeSearch.toLowerCase())
        )
        : filter0.length > 0 ? allMenteeData: allMenteeData.slice(0, 0);

    const filteredDataMentor = mentorSearch
        ? allMentorData.filter(x =>
            // alert(JSON.stringify(x,null,2))
            x.name.toLowerCase().includes(mentorSearch.toLowerCase())
        )
        : filter0.length > 0 ? allMentorData:  allMentorData.slice(0, 3);


    const handleChangeFilter0 = event => {
        console.log(event.target.value)
        // return

        if(event.target.value.length == 0){
            fetchData()
        }else{
            programList.map((i) => {
                if(i.id == event.target.value){
                setProgramName(i.name)
                }
            })
            setFilter0(event.target.value);
            getProgramMentee(event.target.value)
        }
        
        }

        // console.log(allMenteeData)

    return (
        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">Match-Making</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card card-Vertical card-default card-md mb-2">
                                <div className="pb-20">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-25">
                                                <div className="countryOption">
                                                    <select 
                                                        className="form-select ih-medium" aria-label="Default select example"
                                                        value={filter0}
                                                        onChange={handleChangeFilter0}
                                                        >
                                                        <option value={state?.myState?.name == undefined ? "" : state?.myState?.name}>Select Program Code</option>
                                                        {programList.map((i) => (
                                                            <option value={i.id}>{`${i.program_id} - ${i.name}`}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-25">
                                            </div>

                                            <div className="col-md-6">
                                                <label style={{ fontWeight: "700" }}>Mentees</label>
                                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                                    <img src={search_img} alt="search" className="svg" />
                                                    <input value={menteeSearch} onChange={e => setMenteeSearch(e.target.value)} className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Browse Mentees" aria-label="Search" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label style={{ fontWeight: "700" }}>Mentors</label>
                                                <label className="filter_box" onClick={() => showModal()}><i class="las la-filter"></i> Filter</label>
                                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                                    <img src={search_img} alt="search" className="svg" />
                                                    <input value={mentorSearch} onChange={e => setMentorSearch(e.target.value)} className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Browse Mentors" aria-label="Search" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            {allMenteeData && filteredDataMentee.map((user, index) => (
                                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                    <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                        <div className="media user-group-media d-flex justify-content-between">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={user.imageUrl == "" ? team_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <a href="#">
                                                        <h6 className="mt-0  fw-500">{user.name}</h6>
                                                    </a>
                                                    <p className="fs-13 color-light mb-0">{user.jobTitle}</p>
                                                    <span className="badge badge-round btn-sky mt-10">{user.scores}</span>
                                                    {/* <span className="badge badge-round btn-sky mt-10">{user.scores} <i className="lar la-star user_star"></i></span> */}
                                                </div>

                                            </div>
                                            <div >
                                                <input onChange={e => addToList(index, user)} className="checkbox" type="checkbox" id="check-1" />
                                                <label for="check-1">
                                                    <span className="checkbox-text">Select</span>
                                                </label>
                                            </div>
                                        </div>

                                        <span class="badge badge-round btn-primary float-end matching">{user.mentee_matching}</span>
                                        <div className="user-group-people">
                                            <p className="mt-15">Skill to Develop</p>
                                            <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                                {user?.skills?.map((i) => (
                                                    <span className="badge badge-square btn-outline-emlpoy me-10 mb-10">{i?.toDevelop && i?.skill || i.to_develop == 1 && i.skill}</span>
                                                ))}
                                                {user?.skills?.length == "0" && (
                                                    <div style={{ height: '28px' }}></div>
                                                )}
                                                {/* <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_learning}</span>
                                                <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span> */}
                                            </ul>
                                        </div>


                                        <div className="layout-button">
                                            <button type="button" className="btn btn-default btn-squared color-primary btn-outline-primary flex-grow-1">View Profile</button>
                                            <button type="button" className="btn btn-primary btn-default btn-squared flex-grow-1"> Chat</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-6 col-md-12">
                            {allMentorData && filteredDataMentor.map((user, index) => (
                                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                    <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                        <div className="media user-group-media d-flex justify-content-between">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={user.imageUrl == "" ? team_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <a href="#">
                                                        <h6 className="mt-0  fw-500">{user.name}</h6>
                                                    </a>
                                                    <p className="fs-13 color-light mb-0">{user.jobTitle}</p>
                                                    <span className="badge badge-round btn-sky mt-10">{user?.rating?.toFixed(1)} <i className="lar la-star user_star"></i></span>
                                                </div>

                                            </div>
                                            <div>
                                                <input onChange={() => addToList1(index, user)} className="checkbox" type="checkbox" id="check-1" />
                                                <label for="check-1">
                                                    <span className="checkbox-text">Select</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* <span class="badge badge-round btn-primary float-end matching">{user.mentee_matching}</span> */}
                                        <span class="badge badge-round btn-primary float-end matching">{user.percentageMatch}% Match</span>
                                        <div className="user-group-people">
                                            <p className="mt-15">Key Skills</p>
                                            <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                                {user?.skills?.map((i) => (
                                                    <span className="badge badge-square btn-outline-emlpoy me-10 mb-10">{i?.toDevelop == false && i?.skill || i.to_develop == 0 && i.skill}</span>
                                                ))}
                                                {user?.skills?.length == "0" && (
                                                    <div style={{ height: '28px' }}></div>
                                                )}
                                                {/* <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_employee}</span>
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_learning}</span>
                                                <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span> */}
                                            </ul>
                                        </div>


                                        <div className="layout-button">
                                            <button type="button" className="btn btn-default btn-squared color-primary btn-outline-primary flex-grow-1">View Profile</button>
                                            <button type="button" className="btn btn-primary btn-default btn-squared flex-grow-1" onClick={() => goToConfirm()}> Pair</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* {data.map((user) => (
                                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                    <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                        <div className="media user-group-media d-flex justify-content-between">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={team_img} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <a href="#">
                                                        <h6 className="mt-0  fw-500">{user.mentee_name}</h6>
                                                    </a>
                                                    <p className="fs-13 color-light mb-0">{user.mentee_position}</p>
                                                    <span className="badge badge-round btn-sky mt-10">{user.mentee_number} <i className="lar la-star user_star"></i></span>
                                                </div>

                                            </div>
                                            <div className="checkbox-theme-default custom-checkbox">
                                                <input className="checkbox" type="checkbox" id="check-1" />
                                                <label for="check-1">
                                                    <span className="checkbox-text">Select</span>
                                                </label>
                                            </div>
                                        </div>

                                        <span class="badge badge-round btn-primary float-end matching">{user.mentee_matching}</span>
                                        <div className="user-group-people">
                                            <p className="mt-15">{user.mentee_skill}</p>
                                            <ul className="d-flex flex-wrap mb-15 user-group-people__parent">

                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_employee}</span>
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_learning}</span>
                                                <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span>
                                            </ul>
                                        </div>


                                        <div className="layout-button">
                                            <button type="button" className="btn btn-default btn-squared color-primary btn-outline-primary flex-grow-1">{user.mentee_profile}</button>
                                            <button type="button" className="btn btn-primary btn-default btn-squared flex-grow-1"> <NavLink className="navbar-link" to="/confirm_pair"> {user.mentee_chat}</NavLink> </button>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                    </div>

                    {/* <div className="row">
                        <div className="col-12">
                            <div className="user-pagination">
                                <div className="d-flex justify-content-md-end justify-content-center mt-1 mb-30">
                                    <nav className="dm-page ">
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
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div> */}
                </div>

                {showFilter ?
                    <div className="filter_box1">
                        <div className="products_page product_page--grid mb-30">
                            <div className="1">
                                <div className="1">
                                    <div className="1">
                                        <div className="widget box_shadow1">
                                            <div className="category_sidebar">
                                                <div className="product-sidebar-widget mb-10">
                                                    {data1.map((user) => (

                                                        <Accordion>
                                                            <Accordion.Item eventKey="0" className="filter_accor">
                                                                <Accordion.Header className="widget_title">{user.filter_heading}</Accordion.Header>
                                                                <Accordion.Body className="card border-0 shadow-none">
                                                                    <div className="product-brands">
                                                                        <ul>
                                                                            <li>
                                                                                <div className="checkbox-theme-default custom-checkbox">
                                                                                    <input className="checkbox" type="checkbox" id="check-7" />
                                                                                    <label for="check-7">
                                                                                        <span className="checkbox-text">
                                                                                            New Delhi
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="checkbox-theme-default custom-checkbox ">
                                                                                    <input className="checkbox" type="checkbox" id="check-8" />
                                                                                    <label for="check-8">
                                                                                        <span className="checkbox-text">
                                                                                            New Delhi
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="checkbox-theme-default custom-checkbox ">
                                                                                    <input className="checkbox" type="checkbox" id="check-9" />
                                                                                    <label for="check-9">
                                                                                        <span className="checkbox-text">
                                                                                            New Delhi
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>



                                                    ))}

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

export default Match_Making;
