import uploadpic_img from '../../img/checked.svg';
import Side_Bar from './sidebar';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Selected_Mentors() {

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

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Selected Mentor(2)</h4>
                                        </div>
                                    </div>
                                    <div className="layout-button">
                                        <button type="button" className="btn btn-primary btn-default btn-squared" onClick={showModal}>Confirm Selection</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <div className="card border-0 px-25 h-100 box_shadow1">
                                    <div className="card-body p-0">
                                        <div className="selling-table-wrap selling-table-wrap--source">
                                            <div className="table-responsive">
                                                <table className="table table--default table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th className="table_colour">Select</th>
                                                            <th className="table_colour">S.no</th>
                                                            <th className="table_colour">EID</th>
                                                            <th className="table_colour">Email</th>
                                                            <th className="table_colour">First Name</th>
                                                            <th className="table_colour">Last Name</th>
                                                            <th className="table_colour">Division</th>
                                                            <th className="table_colour">Country</th>
                                                            <th className="table_colour">Location</th>
                                                            <th className="table_colour">Function</th>
                                                            <th className="table_colour">Role</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="round">
                                                                    <input type="checkbox" checked id="checkbox" />
                                                                    <label for="checkbox"></label>
                                                                </div>

                                                            </td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mb-25">
                                <div className="card border-0 px-25 h-100 box_shadow1">
                                    <div className="card-body p-0">
                                        <div className="selling-table-wrap selling-table-wrap--source">
                                            <div className="table-responsive">
                                                <table className="table table--default table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th className="table_colour">Select</th>
                                                            <th className="table_colour">S.no</th>
                                                            <th className="table_colour">EID</th>
                                                            <th className="table_colour">Email</th>
                                                            <th className="table_colour">First Name</th>
                                                            <th className="table_colour">Last Name</th>
                                                            <th className="table_colour">Division</th>
                                                            <th className="table_colour">Country</th>
                                                            <th className="table_colour">Location</th>
                                                            <th className="table_colour">Function</th>
                                                            <th className="table_colour">Role</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="round">
                                                                    <input type="checkbox" checked id="checkbox1" />
                                                                    <label for="checkbox1"></label>
                                                                </div>

                                                            </td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={showHello} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={uploadpic_img} className="mb-25" />
                        <h4 class="text-capitalize fw-500">Mentors Added Successfully!</h4>
                    </div>

                </Modal.Body>
            </Modal>
        </div>

    );
}

export default Selected_Mentors;
