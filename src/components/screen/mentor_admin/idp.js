import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Progress_banner from '../../screen_components/progress_banner'
const data = [
    { id: 1, idp_name: "-", mentee_name: "Jane Arora", skills: "SWOT, +6", experience: "-", start_date: "23/01/23", end_date: "23/01/23", status_by: "Pending" },
];

function Idp_Screen() {

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
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Individual Development Plan</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                {/* <div className="row">
                                    {data.map((user) => (
                                        <div className="col-lg-12">
                                            <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                <div className="table-responsive">
                                                    <table className="table mb-0 table-borderless">
                                                        <thead>
                                                            <tr className="userDatatable-header">
                                                                <th>
                                                                    <span className="userDatatable-title">IDP Name</span>
                                                                </th>

                                                                <th>
                                                                    <span className="userDatatable-title">Mentee</span>
                                                                </th>

                                                                <th>
                                                                    <span className="userDatatable-title">Skills</span>
                                                                </th>

                                                                <th>
                                                                    <span className="userDatatable-title">Experience Gaps</span>
                                                                </th>

                                                                <th>
                                                                    <span className="userDatatable-title">Start Date</span>
                                                                </th>

                                                                <th>
                                                                    <span className="userDatatable-title">End Date</span>
                                                                </th>

                                                                <th>
                                                                    <span className="userDatatable-title">Status</span>
                                                                </th>

                                                                <th>
                                                                    <span className="userDatatable-title"></span>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>


                                                            <tr>
                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.idp_name}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.mentee_name}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.skills}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.experience}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.start_date}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.end_date}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content color-danger fw-600">
                                                                        {user.status_by}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <ul className="">
                                                                        <NavLink className="navbar-link" to="/idp_full_view">
                                                                            <li>
                                                                                <button className="btn btn-petrol btn-squared px-15">
                                                                                    Full View
                                                                                </button>
                                                                            </li>
                                                                        </NavLink>
                                                                    </ul>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}
                                <Progress_banner/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Idp_Screen;
