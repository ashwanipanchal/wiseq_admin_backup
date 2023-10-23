import search_img from '../../img/svg/search1.svg';
import team_img from '../../img/user_pic.png';
import confirmation from '../../img/confirmation.png';
import success_check from '../../img/success_check.png';
import Side_Bar from './sidebar';
import { NavLink , useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState,  } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../services/Config';

const data = [
    { id: 1, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "chat" },
    { id: 2, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Pair" },
    { id: 3, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "chat" },
    { id: 4, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Pair" },
    { id: 5, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Pair" },
    { id: 6, mentee_name: "Marley Donin", mentee_position: "Manager - Talent Development", mentee_number: "4.5", mentee_matching: "92% Match", mentee_skill: "Skills to Develop", mentee_employee: "Talent Startegy", mentee_hcm: "Budgeting", mentee_learning: "Learning", mentee_three: "+3", mentee_profile: "View Profile", mentee_chat: "Pair" },
];

const data1 = [
    { id: 1, filter_heading: "Location" },
    { id: 2, filter_heading: "Core Skills" },
    { id: 3, filter_heading: "Business Skills" },
    { id: 4, filter_heading: "Function" },
];

function Confirm_Pair() {
    const {state} = useLocation()
    console.log(state)
    const navigate = useNavigate()
    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);
    const [showHello1, setShowHello1] = useState(false);
    const closeModalC = () => {
        setShowHello1(false)
        navigate(-1)
    };
    const showModalC = () => setShowHello1(true);
    const [token , setToken] = useState(localStorage.getItem("token"))
    console.log("mentee in confirm", state)
    // console.log("mentor in confirm", mentor)
    const [sideBarOpen, setSideBarOpen] = useState(true)
        const [allData, setAllData] = useState()
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

    const showModal1 = () => {
        setShowFilter(prevStat => !prevStat)
        // alert(showFilter)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const fetchData = async () => {
            const respGlobal = await fetch(`${BASE_URL}mentee`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
              })
              const mentees = await respGlobal.json()
            //   console.log("mentees", mentees)
            const respRepos = await fetch(`${BASE_URL}mentor`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
              })
              const mentors = await respRepos.json()
            //   console.log("mentors",mentors)
            setAllData({ mentors : mentors.data, mentees: mentees.data });
          };
      
          fetchData();
    },[])

    const confirm = async() => {
        // showModal()
        // return
        closeModal();
        let newM;
        newM = state.mentee.filter((i) => {
            return (i.isSelected == "Y")
        })
        // console.log(newM)
        let newMt;
        newMt = state.mentor.filter((i) => {
            return (i.isSelected == "Y")
        })
        // console.log(newMt)


        let dict = []
        for(let i = 0; i < newMt.length; i++){
            dict.push({mentorId : newMt[i].id})
        }

        let dict1 = []
        for(let i = 0; i < newM.length; i++){
            let tt = dict.map((j) => {
                return ({...j, menteeId : newM[i].id})
            })
            dict1.push(...tt)
        }

        const btoken = `Bearer ${token}`;
        const body = {
            data: dict1
        }
        const res = await fetch(`https://api.wiseqglobal.com/api/match-making`,{
            method:'POST',
            headers:{
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
            },
            body: JSON.stringify(body)
          })
          const response = await res.json()
          const {success} = response
          if(success){
            showModalC();
            // navigate('/')
          }

    }

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
                                <div className="action-btn">
                                    <div onClick={() => showModal()} className="btn px-15 btn-primary">Confirm Pair</div>
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
                                            {/* <div className="col-md-12 mb-25">
                                                <p className="color-gray fs-14 fw-500 align-center mb-10">Select Program Code</p>
                                                <p className="color-dark fs-14 fw-400 align-center mb-0">#12345</p>
                                            </div> */}

                                            <div className="col-md-6">
                                                <label>Mentees</label>
                                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                                    <img src={search_img} alt="search" className="svg" />
                                                    <input className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Browse Mentees" aria-label="Search" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label>Mentors</label>
                                                <label className="filter_box" onClick={() => showModal1()}><i class="las la-filter"></i> Filter</label>
                                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                                    <img src={search_img} alt="search" className="svg" />
                                                    <input className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Browse Mentors" aria-label="Search" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-6 col-md-6">
                            {state && state.mentee.map((user, index) => (
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    {(user.isSelected == "Y" && (
                                        <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                        <div className="media user-group-media d-flex justify-content-between">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={user.imageUrl == "" ? team_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <a href="#">
                                                        <h6 className="mt-0  fw-500">{user.isSelected == "Y" ? user.name : "No"}</h6>
                                                    </a>
                                                    <p className="fs-13 color-light mb-0">{user.jobTitle}</p>
                                                    <span className="badge badge-round btn-sky mt-10">{user.mentee_number} <i className="lar la-star user_star"></i></span>
                                                </div>

                                            </div>
                                            <div >
                                                <input className="checkbox" type="checkbox" id="check-1" />
                                                <label for="check-1">
                                                    <span className="checkbox-text">Select</span>
                                                </label>
                                            </div>
                                        </div>

                                        <span class="badge badge-round btn-primary float-end matching">{user.mentee_matching}</span>
                                        <div className="user-group-people">
                                            <p className="mt-15">Skill to Develop</p>
                                            <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                                {user.skills.map((i) => (
                                                    <span className="badge badge-square btn-outline-emlpoy me-10">{i.skill}</span>
                                                ))}
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
                                    ))}
                                    
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-6 col-md-6">
                            {state && state.mentor.map((user, index) => (
                                <div className="col-lg-12 col-sm-12 col-md-12 mb-25">
                                    {(user.isSelected == "Y" && (
                                    <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                        <div className="media user-group-media d-flex justify-content-between">
                                            <div className="media-body d-flex align-items-center">
                                                <img src={user.imageUrl == "" ? team_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                                <div>
                                                    <a href="#">
                                                        <h6 className="mt-0  fw-500">{user.name}</h6>
                                                    </a>
                                                    <p className="fs-13 color-light mb-0">{user.jobTitle}</p>
                                                    <span className="badge badge-round btn-sky mt-10">{user.mentee_number} <i className="lar la-star user_star"></i></span>
                                                </div>

                                            </div>
                                            <div>
                                                <input className="checkbox" type="checkbox" id="check-1" />
                                                <label for="check-1">
                                                    <span className="checkbox-text">Select</span>
                                                </label>
                                            </div>
                                        </div>

                                        <span class="badge badge-round btn-primary float-end matching">{user.mentee_matching}</span>
                                        <div className="user-group-people">
                                            <p className="mt-15">Key Skills</p>
                                            <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                                {user.skills.map((i) => (
                                                        <span className="badge badge-square btn-outline-emlpoy me-10">{i.skill}</span>
                                                    ))}
                                                {/* <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_employee}</span>
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_hcm}</span>
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{user.mentee_learning}</span>
                                                <span className="badge badge-square btn-outline-emlpoy">{user.mentee_three}</span> */}
                                            </ul>
                                        </div>


                                        <div className="layout-button">
                                            <button type="button" className="btn btn-default btn-squared color-primary btn-outline-primary flex-grow-1">View Profile</button>
                                            <button type="button" className="btn btn-primary btn-default btn-squared flex-grow-1">Pair</button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            ))}
                        </div>
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
                                                                                        <span className="checkbox-text">New Delhi</span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>

                                                                            <li>
                                                                                <div className="checkbox-theme-default custom-checkbox ">
                                                                                    <input className="checkbox" type="checkbox" id="check-8" />
                                                                                    <label for="check-8">
                                                                                        <span className="checkbox-text">New Delhi</span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>

                                                                            <li>
                                                                                <div className="checkbox-theme-default custom-checkbox ">
                                                                                    <input className="checkbox" type="checkbox" id="check-9" />
                                                                                    <label for="check-9">
                                                                                        <span className="checkbox-text">New Delhi</span>
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
            <Modal show={showHello} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Pair Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img src={confirmation} />
              <h2 class="text-capitalize fw-600 mb-10">Pair Confirmation</h2>
              <p style={{ color: "#7A7A7A", marginBottom: "20px" }}>
                Would you like to go head pairing {state.mentee.map((i) =>{
                    if(i.isSelected == "Y"){
                        return i.name
                    }
                })} (Mentee) with {' '}
                {state.mentor.map((i, index) =>{
                    if(i.isSelected == "Y"){
                        return index ?    `${i.name}, ` : ''
                    }
                })} (Mentor)?
              </p>
              <div class="layout-button justify-content-center">
                <div className="layout-button">
                  <button
                    type="button"
                    onClick={() => closeModal()}
                    className="btn btn-default btn-squared color-primary btn-outline-primary flex-grow-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                        confirm()
                      
                      
                    }}
                    className="btn btn-primary btn-default btn-squared flex-grow-1"
                  >
                    Confirm Pair
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showHello1} onHide={closeModalC}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img src={success_check} />
              <h2 class="text-capitalize fw-600 mb-25">Successfully Done</h2>
              <p style={{ color: "#7A7A7A", marginBottom: "20px" }}>
                Mentee: {state.mentee.map((i) =>{
                    if(i.isSelected == "Y"){
                        return i.name
                    }
                })} has been successfully paired with Mentor:
                {state.mentor.map((i) =>{
                    if(i.isSelected == "Y"){
                        return i.name
                    }
                })}
              </p>
              <div class="layout-button justify-content-center"></div>
            </div>
          </Modal.Body>
        </Modal>
        </div>
    );
}

export default Confirm_Pair;
