import resources_img from '../../../img/resources.png';
import userdefault_img from '../../../img/user_default.svg';
import tag_img from '../../../img/tag.svg';
import pdf_img from '../../../img/pdf_file.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";

// const data = [
//     { id: 1, resource_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", external_link: "External Link", link: "www.google.com", file_name: "File", },
// ];

function Resources_Detail(props) {
    const {state} = useLocation()
    console.log("state in dt", state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [data, setData] = useState([])
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

    useEffect(() => {
        // getData()
    },[])

    const getData = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;   
        const res = await fetch(`https://api.wiseqglobal.com/api/resources/${state}`,{
            method:'GET',
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
                setData(data)
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Resources</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(state &&  (
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <div className="">
                                        <div className="blog-details-thumbnail">
                                            <img src={state.coverPhoto} />
                                        </div>
                                        <article className="">
                                            <div className="blog-details-content">
                                                <h4 class="text-capitalize fw-500 mb-15">{state.name}</h4>
                                                <ul className="blog-details-meta">
                                                    <li className="blog-author">

                                                        <img src={userdefault_img} className="me-10" />
                                                        {/* <span className="admin_name">By Admin</span> */}
                                                        <span className="admin_name">{state?.organisation?.byWiseQ == false ? "By Org Admin" : "By WiseQ"}</span>

                                                    </li>
                                                    <li className="cate-tag">
                                                        <img src={tag_img} className="me-10" />
                                                        {state.categories.map((i) => (
                                                            <span className="admin_name">{i.category?.charAt(0).toUpperCase() + i.category?.slice(1)}</span>
                                                        ))}

                                                    </li>
                                                </ul>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="col-md-12 mb-20">
                                                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                                                    Description
                                                    </p>
                                                    <p className="color-dark fs-14 fw-300 align-center mb-0">
                                                    {state.description}
                                                    </p>
                                                </div>
                                                </div>

                                                <div className="col-md-12 mb-20">
                                                    <p className="color-gray fs-14 fw-300 align-center mb-0">Skill(s) Addressed</p>
                                                    <ul className="d-flex flex-wrap user-group-people__parent">
                                                        {/* {learningDetails && learningDetails.skills?.split(",")?.map((i)=> ( */}
                                                            <span class="badge badge-square btn-outline-orange me-10">{state.skills}</span>
                                                        {/* ))} */}
                                                        {/* <span class="badge badge-square btn-outline-orange me-10">Presentation Skill</span> */}
                                                    </ul>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="col-md-12 mb-20">
                                                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                                                    File Attached
                                                    </p>
                                                    <p style={{cursor:'pointer', textDecoration:'underline'}} onClick={() => window.open(state.fileUrl, "_blank")} className="color-dark fs-14 fw-300 align-center mb-0">
                                                    {state.fileUrl.split("/")[4]}
                                                    </p>
                                                </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="col-md-12 mb-20">
                                                    <p className="color-gray fs-14 fw-300 align-center mb-0">
                                                    Source Link
                                                    </p>
                                                    <p style={{cursor:'pointer', textDecoration:'underline'}} onClick={() => window.open(state.externalLink, "_blank")} className="color-dark fs-14 fw-300 align-center mb-0">
                                                    {state.externalLink}
                                                    </p>
                                                </div>
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
        </div>

    );
}

export default Resources_Detail;
