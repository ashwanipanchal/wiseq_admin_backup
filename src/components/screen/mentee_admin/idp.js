import React from 'react'
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import edit_img from '../../../img/svg/edit.svg';
import { BASE_URL_APPLSURE_MENTORING } from '../../../services/Config';
import moment from 'moment';

const data = [
  { id: 1, idp_name: "-", mentee_name: "Jane Arora", skills: "SWOT, +6", experience: "-", start_date: "23/01/23", end_date: "23/01/23", status_by: "Pending" },
];
const IDP = () => {
    const navigate = useNavigate() 
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [idpList, setIDPList] = useState([])
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
        getIDPList()
    },[])

    const getIDPList = async() => {
          // return
          const token = await localStorage.getItem("program_token_node")
          const res = await fetch(`${BASE_URL_APPLSURE_MENTORING}user/listidp`, {
              method: 'POST',
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": token,
              },
          })
          const response = await res.json()
          console.log("idp list res", response)
          if(response.success){
            setIDPList(response.allidps)
          }else{
          }
        
    }
    
  return (
    <div className="main-content">
      <div
        style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
        className="contents expanded"
      >
        <div className="demo5 mt-30 mb-25">
          <div className="container-fluid">
            <div className="row">
            <div className="col-lg-12">
                <div style={{marginBottom:'0px'}} className="breadcrumb-main user-member justify-content-sm-between">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                      Individual Development Plan
                      </h4>
                    </div>
                    
                  </div>
                  <div className='layout-button'>
                    <button type="button" onClick={() => navigate("/create_idp")} class="btn px-15 btn-light-petrol">Create IDP</button>
                  </div>
                </div>
                <p>Please fill your IDP for effective goal measurement and program outcome.</p>
              </div>

              <div className="col-lg-12">
               <div className="row">
                                    {idpList && idpList.map((user) => (
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
                                                                    <span className="userDatatable-title">Mentor</span>
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
                                                                    {user?.name.substring(0,
                                                                                                    4
                                                                                                    )}
                                                                                                    {user?.name.length >
                                                                                                    4
                                                                                                    ? "..."
                                                                                                    : ""}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.mentorlist[0]?.user_meta?.name}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                    {user?.skills?.split(",")
                                                                        .length > 1
                                                                        ? `${
                                                                            user?.skills?.split(
                                                                                ","
                                                                            )[0]
                                                                            } + ${
                                                                            user?.skills?.split(
                                                                                ","
                                                                            )?.length - 1
                                                                            }`
                                                                        : user?.skills}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                        {user.experience_gaps}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                    {moment(
                                                                        user?.program_model?.start_date
                                                                        ).format("DD/MM/YY")}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content">
                                                                    {moment(
                                                                        user?.program_model?.end_date
                                                                        ).format("DD/MM/YY")}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="userDatatable-content color-danger fw-600">
                                                                    {user.status == "0" ? "Pending" : user.status == "1" ? "Active" : user.status == "3" ? "Completed" : "Deleted"}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                <button onClick={() => { navigate('/edit_calendar') }} className="btn btn-icon btn-warning btn-squared">
                                                                <img src={edit_img} alt="layers" className="svg" />
                                                            </button>
                                                                </td>
                                                                <td>
                                                                    <ul className="">
                                                                        <NavLink className="navbar-link" to="/idp_full_view" state={user}>
                                                                            <li>
                                                                                <button className="btn btn-light-petrol btn-squared px-15">
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
                                </div>                                              
              </div>
            </div>
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
    </div>
  );
}

export default IDP