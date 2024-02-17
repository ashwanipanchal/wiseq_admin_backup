import edit_img from '../../img/svg/edit.svg';
import delete_img from '../../img/svg/delete.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../services/Config';

const data = [
    { id: 1, name: "How to set...", category: "Lorem Ipsum", key_skills: "Corporate", external_link: "www.link.com", cover_photo: "View", user_status: "Active" },
];

function Resources_Screen() {
    const navigate = useNavigate()
    const [showHello, setShowHello] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [resourcesList, setResourcesList] = useState([])
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

    useEffect(()=>{
        getList()
    },[])

    const getList = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;   
        const res = await fetch(`${BASE_URL}resources`,{
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
                setResourcesList(data)
            }
    }

    const deleteRes = async(id) => {
        // alert(JSON.stringify(id))
        // return
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;   
        const res = await fetch(`${BASE_URL}resources/${id}`,{
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
                getList()
                closeModal()
            }
    }
    
    return (
      <div className="main-content">
        <div
          style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
          className="contents expanded"
        >
          <div className="blog-page2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-main user-member justify-content-sm-between ">
                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                      <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                        <h4 className="text-capitalize fw-500 breadcrumb-title">
                          Resources
                        </h4>
                      </div>
                    </div>

                    <NavLink className="navbar-link" to="/add_resources">
                      <div className="action-btn">
                        <div className="btn px-15 btn-primary">
                          Add Resources
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="row">
                        <div className="col-lg-12">
                            <div className="userDatatable1 w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless1 table_borr">
                                        <thead className="table_bor">
                                        <tr className="userDatatable-header py-20">
                                                    <th>
                                                        <span className="userDatatable-title">Name</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Category</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Key Skills</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">External Link</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Cover Photo</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Status</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title float-end">Action</span>
                                                    </th>
                                                </tr>
                                        </thead>
                                        <tbody>

                                            {resourcesList && resourcesList.map((user) => (
                                                <>
                                                <tr className="box_shadow2">
                                                    <td>
                                                            <a onClick={() => navigate('/resources_detail', {state:user})} className="userDatatable-content">
                                                                {user.name}
                                                            </a>
                                                        </td>

                                                        <td>
                                                            {user.categories.map((i) => (
                                                                <div className="userDatatable-content">
                                                                    {i.category}
                                                                </div>
                                                            ))}
                                                            
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.skills}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {user.externalLink}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <a href={user.coverPhoto} target='_blank' className="userDatatable-content">
                                                                View
                                                            </a>
                                                        </td>

                                                        <td>
                                                            <div className="userDatatable-content color-status fw-700">
                                                                {user.status}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                                <li>
                                                                    <button onClick={() => {
                                                                         if(user.organisation?.byWiseQ){
                                                                            alert("You cannot edit this resource.")
                                                                        }else{
                                                                            navigate("/edit_resources", {state:user})
                                                                        }
                                                                    } } className="btn btn-icon btn-warning btn-squared">
                                                                        <img src={edit_img} alt="layers" className="svg" />
                                                                    </button>
                                                                </li>

                                                                <li>
                                                                    <button onClick={() =>{
                                                                        if(user.organisation?.byWiseQ){
                                                                            alert("You cannot delete this resource.")
                                                                        }else{
                                                                            setDeleteId(user.id)
                                                                            showModal()
                                                                        }
                                                                        
                                                                        } } className="btn btn-icon btn-danger btn-squared ms-10">
                                                                        <img src={delete_img} alt="layers" className="svg" />
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                </tr>
                                                <br/>
                                                </>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

              {/* <div className="col-lg-12">
                <div className="row">
                  <div
                    style={{
                      backgroundColor: "#feeee6",
                      padding: "50px",
                      borderRadius: "10px",
                    }}
                    className="col-lg-12 col-sm-12 col-md-12 mb-25"
                  >
                    <div>
                      <h3 style={{ textAlign: "center" }}>
                        We are currently developing this feature. It will be
                        available to you soon.
                      </h3>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Side_Bar
          onClick={toggle}
          sideBarOpen={
            windowSize.innerWidth > 768 && sideBarOpen
              ? true
              : windowSize.innerWidth > 768 && !sideBarOpen
              ? false
              : windowSize.innerWidth < 768 && sideBarOpen
              ? false
              : true
          }
        />
        <Modal show={showHello} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h4 class="text-capitalize fw-600 mb-25">
                Are you sure you want to delete this resource?
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
                  onClick={() => deleteRes(deleteId)}
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

export default Resources_Screen;
