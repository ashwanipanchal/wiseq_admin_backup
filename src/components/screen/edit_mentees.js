import search_img from '../../img/svg/search1.svg';
import delette_mentees from '../../img/delette_mentees.svg';
import { BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function Edit_Mentees() {
    const {state} = useLocation()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [mentorList, setMentorList] = useState([])
    const [deleteID, setDeleteID] = useState("")
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
        getList()
    },[])

    const getList = async() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "program_id":state?.myState?.id,
            "role":"mentee" // mentor
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${BASE_URL_APPLSURE_MENTORING}program-userslist`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setMentorList(result.userlist)})
        .catch(error => console.log('error', error));
        
    }


    const deleteMentee = async() => {
      
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state?.myState?.id,
            "userIds":[deleteID]
        });
  
    //   console.log(raw)
    //   return
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-users-remove`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            closeModal()
            alert("Mentee removed successfully")
            getList()
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Add Mentees</h4>
                                        </div>
                                    </div>
                                    <div className="layout-button">
                                        <NavLink className="navbar-link" to="/selected_mentees"><button type="button" className="btn btn-primary btn-default btn-squared">Selected (2)</button></NavLink>
                                        <NavLink className="navbar-link" to="/add_mentees" state={{ myState: state.myState, from:"add_more" }}><button type="button" className="btn btn-outline-primary btn-default btn-squared">Add More</button></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <label>Search Mentees</label>
                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                    <img src={search_img} alt="search" className="svg" />
                                    <input className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Search by EID, Name" aria-label="Search" />
                                </div>
                            </div>
                            
                            {mentorList && mentorList.map((i) => (
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
                                                                    <input type="checkbox" id="checkbox3" />
                                                                    <label for="checkbox3"></label>
                                                                </div>

                                                            </td>
                                                            <td>-</td>
                                                            <td>{i.organisation_user?.emp_id}</td>
                                                            <td>{i.user_meta?.email}</td>
                                                            <td>{i.user_meta?.name.split(" ")[0].substring(0,6)}
                                                                {i.user_meta?.name.split(" ")[0].length > 6 ? "..." : ""}</td>
                                                                {/* <td>{i.user_meta?.name.split(" ")[1].substring(0,6)}
                                                                {i.user_meta?.name.split(" ")[1].length > 6 ? "..." : ""}</td> */}
                                                            {/* <td>-</td> */}
                                                            <td>-</td>
                                                            <td>{i.organisation_user?.division}</td>
                                                            <td>{i.organisation_user?.country}</td>
                                                            <td>{i.organisation_user?.work_location}</td>
                                                            <td>{i.organisation_user?.functional_area}</td>
                                                            <td>{i.organisation_user?.role}</td>
                                                            <td>
                                                            <img style={{cursor:'pointer'}} onClick={() => {
                                                                setDeleteID(i.id)
                                                                showModal()
                                                                }} src={delette_mentees} alt="search" className="svg" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            {/* <div className="col-md-12 mb-25">
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
                                                                    <input type="checkbox" id="checkbox1" />
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
                                                                    <input type="checkbox" checked id="checkbox2" />
                                                                    <label for="checkbox2"></label>
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
                                                                    <input type="checkbox" id="checkbox3" />
                                                                    <label for="checkbox3"></label>
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
                            </div> */}


                        </div>
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
              <h4 class="text-capitalize fw-500 mb-25">
              Are you sure you want to remove this mentee from program?
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
                  onClick={() =>{
                    deleteMentee()
                  } }
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        </div>

    );
}

export default Edit_Mentees;
