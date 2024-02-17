import search_img from '../../img/svg/search1.svg';
import delette_mentees from '../../img/delette_mentees.svg';
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import check from '../../img/checked.svg';
import uncheck from '../../img/uncheck.svg';

function Edit_Mentors() {
    const {state} = useLocation()
    console.log(state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [mentorList, setMentorList] = useState([])
    const [allMentorList, setAllMentorList] = useState([])
    const [deleteID, setDeleteID] = useState("")
    const [checked, setChecked] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [key1, setKey1] = useState(Math.random())
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const [showHello, setShowHello] = useState(false);
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

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
        getAllMentorsList()
        getList()
       
    },[])

    const getList = async() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "program_id":state?.myState?.id,
            "role":"mentor" // mentor
        });

        console.log({
            "program_id":state?.myState?.id,
            "role":"mentor" // mentor
        })
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

    const getAllMentorsList = async() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "role": "mentor"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${BASE_URL_APPLSURE_MENTORING}get-user-list`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            let newMentee = result?.users?.map((i) => {
                return { ...i, isSelected: "" }
            })
            console.log(newMentee)
            setAllMentorList(newMentee)
        })
        .catch(error => console.log('error', error));
        
    }

    const deleteMentor = async() => {
      
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
            alert("Mentor removed successfully")
            getList()
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
      }


      const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };

    const addToList1 = (index, user) => {
        if (user.isSelected == "") {
            mentorList[index].isSelected = "Y"
        } else {
            mentorList[index].isSelected = ""
        }
        setKey1(Math.random())
        setMentorList(mentorList)
        
    }

    const filteredDataMentor = searchKey
    ? allMentorList?.filter(x =>
        // alert(JSON.stringify(x,null,2))
      //   console.log(x),
      //   return
        x?.name?.toLowerCase()?.startsWith(searchKey?.toLowerCase()) || x?.emp_id?.toLowerCase()?.startsWith(searchKey?.toLowerCase())
    )
    : mentorList;


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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Add Mentors</h4>
                                        </div>
                                    </div>
                                    <div className="layout-button">
                                        <NavLink className="navbar-link" to="/selected_mentors"><button type="button" className="btn btn-primary btn-default btn-squared">Selected (2)</button></NavLink>
                                        <NavLink className="navbar-link" to="/add_mentors" state={{ myState: state.myState, from:"add_more"  }}><button type="button" className="btn btn-outline-primary btn-default btn-squared">Add More</button></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-25">
                                <label>Search Mentor</label>
                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                    <img src={search_img} alt="search" className="svg" />
                                    <input value={searchKey} onChange={e => setSearchKey(e.target.value)} className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Search by EID, Name" aria-label="Search" />
                                </div>
                            </div>

                            {mentorList && filteredDataMentor.map((i, index) => (
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
                                                            <div>
                                                                <img key ={key1} style={{width:'30px', height:'30px'}} onClick={() =>{
                                                                   addToList1(index, i) }} src={i.isSelected == "Y" ? check : uncheck}/>
                                                                </div>

                                                            </td>
                                                            <td>-</td>
                                                            <td>{i.organisation_user?.emp_id}</td>
                                                            <td>{searchKey ? i?.email : i.user_meta?.email}</td>
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
              Are you sure you want to remove this mentor from program?
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
                    deleteMentor()
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

export default Edit_Mentors;
