import resources_img from '../../img/resources.png';
import userdefault_img from '../../img/user_default.svg';
import tag_img from '../../img/tag.svg';
import pdf_img from '../../img/pdf_file.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const data = [
    { id: 1, resource_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", external_link: "External Link", link: "www.google.com", file_name: "File", },
];

function Resources_Detail() {
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state)
    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);
    const [sideBarOpen, setSideBarOpen] = useState(true)
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

    const deleteRes = async(id) => {
        // alert(JSON.stringify(id))
        // return
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;   
        const res = await fetch(`https://api.wiseqglobal.com/api/resources/${id}`,{
            method:'DELETE',
            headers:{
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": btoken,
            },
          })
          const response = await res.json()
            console.log(response)
            const {success, data} = response
            if(success){
                navigate(-1)
            }
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">{state && state.name}</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button onClick={() => {
                                            if(state.organisation?.byWiseQ){
                                                alert("You cannot edit this resource.")
                                            }else{
                                                navigate('/edit_resources', {state})
                                            }
                                            }} type="button" class="btn btn px-15 btn-warning">Edit</button>
                                        <button onClick={() =>{
                                            if(state.organisation?.byWiseQ){
                                                alert("You cannot delete this resource.")
                                            }else{
                                                showModal()
                                            }
                                        } } type="button" class="btn btn px-15 btn-master">Remove</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {(state && (
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <div className="">
                                        <div className="blog-details-thumbnail">
                                            <img src={state.coverPhoto} />
                                        </div>
                                        <article className="">
                                            <div className="blog-details-content">
                                                <ul className="blog-details-meta">
                                                    <li className="blog-author">

                                                        <img src={userdefault_img} className="me-10" />
                                                        <span className="admin_name">{state.organisation?.byWiseQ ? "By WiseQ Admin": "By Orgnisation"}</span>

                                                    </li>
                                                    <li className="cate-tag">
                                                        <img src={tag_img} className="me-10" />
                                                        {state.categories.map((i) => (
                                                            <span className="admin_name"> {i.category+ ","+ " "} </span>
                                                        ))}

                                                    </li>
                                                </ul>
                                                <div className="blog-body">
                                                    <p className="">{state.description}</p>

                                                    {/* <p className="external mb-0">{state.externalLink}</p> */}
                                                    <p className="external_link mb-10">{state.externalLink}</p>
                                                    {
                                                        state.fileUrl ? (
                                                            <>
                                                            {/* <p className="external mb-1">{state.fileUrl}</p> */}
                                                    <a href={state.fileUrl} className="blog-details-meta ms-1">
                                                        <img src={pdf_img} className="me-10" />
                                                        <span className="admin_name color-orange">View</span>
                                                    </a>
                                                            </>
                                                        ) : null
                                                    }
                                                    
                                                </div>

                                            </div>

                                        </article>
                                    </div>
                                </div>
                            </div>


                        ))}

                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-25">Are you sure you want to delete this profile?</h4>

                        <div class="layout-button justify-content-center">
                            <button onClick={() => closeModal()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => deleteRes(state.id)} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Resources_Detail;
