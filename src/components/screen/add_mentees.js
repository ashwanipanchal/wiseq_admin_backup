import search_img from '../../img/svg/search1.svg';
import { BASE_URL, BASE_URL_APPLSURE_MENTORING } from '../../services/Config';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import check from '../../img/checked.svg';
import uncheck from '../../img/uncheck.svg';

function Add_Mentees() {
    const {state} = useLocation()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [menteeList, setMenteeList] = useState([])
    const [searchKey, setSearchKey] = useState("");
    const [selectedCount, setselectedCount] = useState("");
    const [checked, setChecked] = useState([]);
    const [key1, setKey1] = useState(Math.random())
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
    getList()
},[])

    const getList = async() => {

        if(state?.from != ""){

            var myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem('program_token_node') );
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "program_id":state?.myState?.id,
                "role":"mentee"
            });
    
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
    
            fetch(`${BASE_URL_APPLSURE_MENTORING}program-userlistdontinclude`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                let newMentee = result?.users?.map((i) => {
                    return { ...i, isSelected: "" }
                })
                console.log(newMentee)
                setMenteeList(newMentee)
            })
            .catch(error => console.log('error', error));

        }else{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", localStorage.getItem("program_token_node"));
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
            "role": "mentee"
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
                // console.log(result)
                let newMentee = result?.users?.map((i) => {
                    return { ...i, isSelected: "" }
                })
                console.log(newMentee)
                setMenteeList(newMentee)
            })
            .catch(error => console.log('error', error));
        }
 
        
    }

    const addToList1 = (index, user) => {
        let count = 1;
        if (user.isSelected == "") {
            for (let i = 0; i < menteeList.length; i++) {

                if( menteeList[i].isSelected == "Y"){
                    count++
                }
            }
        
            if(count > state?.myState?.no_of_mentor){
                alert(`You can add ${state?.myState?.no_of_mentor} mentees only`)
                return
            }
            menteeList[index].isSelected = "Y"
        } else {
            menteeList[index].isSelected = ""
        }
        setMenteeList(menteeList)
        setKey1(Math.random())
        setselectedCount(count)
    }

    const filteredDataMentee = searchKey
    ? menteeList.filter(x =>
        // alert(JSON.stringify(x,null,2))
        x.name.toLowerCase().startsWith(searchKey.toLowerCase()) || x.emp_id.toLowerCase().startsWith(searchKey.toLowerCase())
    )
    : menteeList;

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };


    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="blog-page2">
                    <div className="container-fluid">
                        
                        <div className="row">
                            <h4 className='mb-20'>Add Mentees</h4>
                        </div>
                        <div className="row">
                            <h5 className='mb-20'>Eligibility - {state?.myState?.eligibility}</h5>
                        </div>

                        <div className="row">
                        <div className="col-md-12 mb-25">
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

                                <label style={{textDecoration:'bold'}}>Search Mentees</label>
                                <div className="layout-button mb-10">
                                        {/* <NavLink className="navbar-link" to="/selected_mentees" state={{myState: menteeList, number:checked.length}}><button type="button" className="btn btn-primary btn-default btn-squared">Selected ({checked.length})</button></NavLink> */}
                                        <NavLink className="navbar-link" to="/selected_mentees" state={{myState: menteeList, number:checked.length, from :state?.from}}><button type="button" className="btn btn-primary btn-default btn-squared">Selected ({selectedCount == "" ? 0 : selectedCount})</button></NavLink>
                                    </div>
                                </div>

                                {state?.myState?.eligibility != "Open Participation" ? 
                                <div className="d-flex align-items-center user-member__form my-sm-0 my-2">
                                    <img src={search_img} alt="search" className="svg" />
                                    <input  value={searchKey} onChange={e => setSearchKey(e.target.value)}  className="me-sm-2 border-0 box-shadow-none ms-10" type="search" placeholder="Search by EID, Name" aria-label="Search" />
                                </div> :


                                <div className="col-lg-12">
                                    <div className="card card-Vertical card-default card-md mb-4">
                                        <div className="">
                                            <form>
                                                <div className="row">
                                                    {/* <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                        <div onClick={() =>  showModal()} style={{border: '1px solid #beb9b9', padding: "6px", borderRadius: '5px', fontSize: '14px'}} className="">
                                                            <span className="nav-item__title">Experience    <i className="las la-angle-down nav-item__arrow" style={{float:'right', marginTop:'3px'}}></i></span>
                                                        </div>
                                                        </div>
                                                    </div> */}
{/* 
                                                    <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select onChange={e => WLFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                                <option value="">Location</option>
                                                                {workLocationList.map((i) => (
                                                                            <option value={i}>{i}</option>
                                                                        ))}
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                    <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select className="form-select custom_selects" aria-label="Default select example">
                                                                <option selected>Select Level</option>
                                                                <option value="1">9 Score</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select className="form-select custom_selects" aria-label="Default select example">
                                                                <option selected>Functional</option>
                                                                <option value="1">9 Score</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select className="form-select custom_selects" aria-label="Default select example">
                                                                <option selected>Division</option>
                                                                <option value="1">9 Score</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select className="form-select custom_selects" aria-label="Default select example">
                                                                <option selected>Country</option>
                                                                <option value="1">9 Score</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select className="form-select custom_selects" aria-label="Default select example">
                                                                <option selected>Location</option>
                                                                <option value="1">9 Score</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select onChange={e => CSFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                                <option value="">Core Skills Need to Develop</option>
                                                                {coreSkills.map((i) => (
                                                                            <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                        ))}
                                                                
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select onChange={e => CSGFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                                <option value="">Core Skills Good At</option>
                                                                {coreSkills.map((i) => (
                                                                            <option value={i.skill}>{i.skill}</option>
                                                                        ))}
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select onChange={e => BSFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                                <option value="">Business Skills Need to Develop</option>
                                                                {busSkills.map((i) => (
                                                                            <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                        ))}
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select onChange={e => BSGFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                                <option value="">Business Skills Good At</option>
                                                                {busSkills.map((i) => (
                                                                            <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                        ))}
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="col-lg-2 col-md-4 mb-15">
                                                        <div className="countryOption">
                                                            <select className="form-select custom_selects" aria-label="Default select example">
                                                                <option selected>All Filters</option>
                                                                <option value="1">3</option>
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>}
                            </div>

                            {/* {menteeList && menteeList.map((i) => (
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
                                                            <td>{i.emp_id}</td>
                                                            <td>{i.email}</td>
                                                            <td>{i.name.split(" ")[0].substring(0,6)}
                                                                {i.name.split(" ")[0].length > 6 ? "..." : ""}</td>
                                                            <td>{i.name.split(" ")[1]}</td>
                                                            <td>{i.division}</td>
                                                            <td>{i.country}</td>
                                                            <td>{i.work_location}</td>
                                                            <td>{i.functional_area}</td>
                                                            <td>{i.role}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))} */}
                            

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
                            </div> */}

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
                            </div> */}

                            {menteeList && filteredDataMentee.map((i,index) => (
                            <div className="col-md-12 mb-25">
                                <div className="card border-0 px-25 h-100 box_shadow1">
                                    <div className="card-body p-0">
                                        <div className="selling-table-wrap selling-table-wrap--source">
                                            <div className="table-responsive">
                                                <table className="table table--default table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th className="table_colour">Select</th>
                                                            {/* <th className="table_colour">S.no</th> */}
                                                            <th className="table_colour">EID</th>
                                                            {/* <th className="table_colour">Email</th> */}
                                                            <th className="table_colour">First Name</th>
                                                            <th className="table_colour">Last Name</th>
                                                            {/* <th className="table_colour">Division</th> */}
                                                            <th className="table_colour">Country</th>
                                                            <th className="table_colour">Location</th>
                                                            <th className="table_colour">Function</th>
                                                            {/* <th className="table_colour">Role</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                            <div>
                                                                    {/* <input value={i.id} className="checkbox" type="checkbox" id="check-1" onChange={(e) => {
                                                                        addToList1(index, i)
                                                                        handleCheck(e)
                                                                        }} />
                                                                    <label for="check-1"></label> */}
                                                                    <img key ={key1} style={{width:'30px', height:'30px'}} onClick={() =>{
                                                                            

                                                                            //     if(count > state?.myState?.no_of_mentor){
                                                                            //         alert("you cannot add")
                                                                            //         return
                                                                            //     }else{
                                                                            //         alert("ellse")
                                                                                    addToList1(index, i)
                                                                                    
                                                                                //  handleCheck(e)
                                                                                // }
                                                                            // }
                                                                    }} src={i.isSelected == "Y" ? check : uncheck}/>
                                                                </div>

                                                            </td>
                                                            {/* <td>-</td> */}
                                                            <td>{i.emp_id != null && i.emp_id.length > 2 ?`${i.emp_id.substring(0, 4)}...` : "-------"}</td>
                                                            {/* <td>{i.emp_id != null && i.emp_id.length > 3 ?`${i.emp_id.substring(0, 4)}...` : i.emp_id}</td> */}
                                                            {/* <td>{i.email.length > 6 ? "..." : ""}</td> */}
                                                            <td>{i.name.split(" ")[0].substring(0,6)}
                                                                {i.name.split(" ")[0].length > 6 ? "..." : ""}</td>
                                                            <td>{i.name.split(" ")[1]}</td>
                                                            {/* <td>{i.division}</td> */}
                                                            <td>{i.country}</td>
                                                            <td>{i.work_location}</td>
                                                            <td>{i.functional_area}</td>
                                                            {/* <td>{i.role}</td> */}
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
        </div>

    );
}

export default Add_Mentees;
