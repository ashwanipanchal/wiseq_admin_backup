import resources_img from '../../img/resources.png';
import { useEffect, useState } from 'react';
import Side_Bar from './sidebar';

const data = [
    { id: 1, admin_user: "Admin", admin_name: "Rahul Matthan", admin_description: "Description", admin_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", },
];

function Community_Detail() {

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Community Name</h4>
                                        </div>
                                    </div>
                                    <div class="layout-button">
                                        <button type="button" class="btn btn-decline btn-default btn-squared">Decline</button>
                                        <button type="button" class="btn btn-approve btn-default btn-squared">Approve</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {data.map((user) => (
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="">
                                        <div className="blog-details-thumbnail">
                                            <img src={resources_img} />
                                        </div>
                                        <article className="">
                                            <div className="blog-details-content">
                                                <div className="col-md-12 mb-20">
                                                    <p className="color-gray fs-14 fw-300 align-center mb-0">{user.admin_user}</p>
                                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{user.admin_name}</p>
                                                </div>
                                                <div className="col-md-12 mb-20">
                                                    <p className="color-gray fs-14 fw-300 align-center mb-0">{user.admin_description}</p>
                                                    <p className="color-dark fs-14 fw-300 align-center mb-0">{user.admin_para}</p>
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

export default Community_Detail;
