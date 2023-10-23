// import team_img from '../../../img/tm1.png';
// import search_img from '../../../img/svg/search1.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import authornav_img from '../../../img/user_pic.png';
import { BASE_URL } from '../../../services/Config';
import Modal from 'react-bootstrap/Modal';
import success_msg from '../../../img/success_msg.svg';

const data = [
    { id: 1, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 2, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 3, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 4, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
    { id: 5, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources" },
];

function Audiences() {
    const {state} = useLocation()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [deleteIndex, setDeleteIndex] = useState("")
    const [deleteName, setDeleteName] = useState("")
    const [audiencesList, setAudiencesList] = useState([])
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    
    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const [showSuccess, setShowSuccess] = useState(false);
    const hideAddModel = () => setShowSuccess(false);
    const showAddModel = () => setShowSuccess(true);


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

    useEffect(() => {
        getAudiences()
    },[])
    
    const getAudiences = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state}/audience`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("audience list", response)
        setAudiencesList(response.data)
    }

    const removeAudience = async() => {
        const btoken = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}learnings/${state}/user?userId=${deleteIndex}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log("audience removed", response)
        if(response.success){
            closeModal()
            showAddModel()
            getAudiences()
        }else{
            alert("Something went wrong")
            closeModal()
        }
        // getAudiences()
        // setAudiencesList(response.data)
    }

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Assigned To</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* <div className="col-md-12 mb-25">
                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                    <img src={search_img} alt="search" className="svg" />
                                    <input className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Search here..." aria-label="Search" />
                                </div>
                            </div> */}
                            {audiencesList && audiencesList.map((i) => (
                                <div className="col-md-12 mb-15">
                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                    <div className="media-body d-flex align-items-center">
                                        <img src={i.imageUrl == "" ? authornav_img : i.imageUrl} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                        <div>
                                            <h6 className="fw-500">{i.name}</h6>
                                            <p className="fs-12 color-light mb-0">{i.jobTitle}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        showModal() 
                                        setDeleteIndex(i.userId)
                                        setDeleteName(i.name)}}
                                         style={{backgroundColor:'#EF4F5F', color:'#fff'}} className='btn'>Remove</button>
                                </div>
                            </div>
                            ))}
                            
{/* 
                            <div className="col-md-12 mb-15">
                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center join_requests">
                                    <div className="media-body d-flex align-items-center">
                                        <img src={team_img} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                        <div>
                                            <h6 className="fw-500">Anika Schleifer</h6>
                                            <p className="fs-12 color-light mb-0">Senior Director - Human Resources</p>
                                        </div>
                                    </div>
                                    <button style={{backgroundColor:'#EF4F5F', color:'#fff'}} className='btn'>Remove</button>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
          <Modal.Header className="mentor_feedback" closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-600 mb-25">
                Are you sure you want to delete {deleteName} ?
              </h4>

              <div class="layout-button justify-content-center">
                <button
                  onClick={() => closeModal()}
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  onClick={() => removeAudience()}
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showSuccess} onHide={hideAddModel}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign:'center'}}>
                    <img src={success_msg}/>
                    <h3 style={{marginTop:'10px'}}>Mentee has been removed Successfully</h3>
                    </div>
                </Modal.Body>
            </Modal>

        </div>

    );
}

export default Audiences;
