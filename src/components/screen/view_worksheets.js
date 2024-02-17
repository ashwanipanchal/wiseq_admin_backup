// import search_img from '../../img/svg/search1.svg';
import { useLocation } from 'react-router-dom';
import { BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import Side_Bar from './sidebar';
// import view_img from '../../img/view.svg';
// import delete_img from '../../img/svg/delete.svg';
import { useEffect, useState } from 'react';
import moment from 'moment';
// import { NavLink } from "react-router-dom";

function View_Worksheet() {
    const {state} = useLocation()
    console.log("state in view worksheet", state)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [worksheetList, setWorksheetList] = useState([])
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
        getWorksheets()
    },[])
    const getWorksheets = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "program_id": state,
        });
        // console.log(raw)
        // return
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
  
        fetch(`${BASE_URL_APPLSURE_MENTORING}program-worksheet-list`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success){
                setWorksheetList(result.worksheetAssignedDetails)
                // alert("Worksheet added successfully")
                // closeModal()
            }
            // navigate(-1)
        })
        .catch(error => console.log('error', error));
      }

      const downloadFiles = (files) => {
        // console.log(files)
        files.program_worksheet?.files.split("|").map((i)=>{
            console.log(i)
            window.open(i, "_blank")
        })
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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Worksheets</h4>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="countryOption">
                                            <select className="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                <option selected>Select Worksheets</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-25">
                                {worksheetList && worksheetList.map((i, index)=> {
                                    if(i.user_meta?.role == "mentee"){
                                        return(
                                            <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                            <div className="table-responsive">
                                                <table className="table mb-0 table-borderless">
                                                    <thead>
                                                        <tr className="userDatatable-header py-20">
                                                            <th>
                                                                <span className="userDatatable-title">S.no</span>
                                                            </th>
                                                            <th>
                                                                <span className="userDatatable-title">Mentee Name</span>
                                                            </th>
                                                            <th>
                                                                <span className="userDatatable-title">Worksheet Name</span>
                                                            </th>
                                                            <th>
                                                                <span className="userDatatable-title">Uploaded On</span>
                                                            </th>
                                                            <th>
                                                                <span className="userDatatable-title float-end">action</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
        
                                                        <tr>
                                                            <td>
                                                                <div className="userDatatable-content">
                                                                    {index+1}
                                                                </div>
                                                            </td>
        
                                                            <td>
                                                                <div className="userDatatable-content">
                                                                    {i.user_meta?.name}
                                                                </div>
                                                            </td>
        
                                                            <td>
                                                                <div className="userDatatable-content">
                                                                    {i?.program_worksheet?.name}
                                                                </div>
                                                            </td>
        
                                                            <td>
                                                                <div className="userDatatable-content">
                                                                    {moment(i.created_at).format("DD/MM/YY")}
                                                                </div>
                                                            </td>
        
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
        
                                                                    <li>
                                                                        <button onClick={() => downloadFiles(i)} className="btn px-15 btn-primary ms-10">
                                                                            Download
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        )
                                    }
                                    
                                    
                                    })}
                                
{/* 
                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-borderless">
                                            <thead>
                                                <tr className="userDatatable-header py-20">
                                                    <th>
                                                        <span className="userDatatable-title">S.no</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Mentee Name</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Worksheet Name</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Uploaded On</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title float-end">action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            2
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            Jane Arora
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            12/12/23
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                            <li>
                                                                <button className="btn px-15 btn-primary ms-10">
                                                                    Download
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-borderless">
                                            <thead>
                                                <tr className="userDatatable-header py-20">
                                                    <th>
                                                        <span className="userDatatable-title">S.no</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Mentee Name</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Worksheet Name</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Uploaded On</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title float-end">action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            3
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            Jane Arora
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            -
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="userDatatable-content">
                                                            12/12/23
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                            <li>
                                                                <button className="btn px-15 btn-primary ms-10">
                                                                    Download
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default View_Worksheet;
