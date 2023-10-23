import uploads_img from '../../img/uploads.svg';
import success_msg from '../../img/success_msg.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FileUploader } from "react-drag-drop-files";
import { BASE_URL } from '../../services/Config'
import Papa from "papaparse";
import { useNavigate } from 'react-router-dom';
import { ExportToCsv } from 'export-to-csv';
import path from "../../img/Path.png";

var sampleData = [
    {
        EID: "",
        Email: "",
        First_Name: '',
        Last_Name: '',
        Job_Title: "",
        Functional_Area: "",
        Years_With_Company: "",
        Level_Of_Emp: "",
        Work_Location: "",
        Division: "",
        Reporting_Manager_EID: "",
        Reporting_Manager_Name: "",
        Country: "", 
    },
  ];

  const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
const data = [
    { id: 1, organisations: "Organisations", counsellor_num: "7816" },
    { id: 2, organisations: "Organisations", counsellor_num: "7816" },
    { id: 3, organisations: "Organisations", counsellor_num: "7816" },
    { id: 4, organisations: "Organisations", counsellor_num: "7816" },
    { id: 5, organisations: "Organisations", counsellor_num: "7816" },
    { id: 6, organisations: "Organisations", counsellor_num: "7816" },
];

const fileTypes = ["CSV"];

function Add_Mentor() {
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [eid, setEid] = useState("")
    const [role, setRole] = useState("")
    const [functionalArea, setfunctionalArea] = useState("")
    const [fAreas, setFAreas] = useState([])
    const [yearsWithCompany, setyearsWithCompany] = useState("")
    const [levelOfEmp, setlevelOfEmp] = useState("")
    const [levels, setLevels] = useState([])
    const [workLocation, setworkLocation] = useState("")
    const [workLocationList, setworkLocationList] = useState([])
    const [division, setdivision] = useState("")
    const [divisionList, setdivisionList] = useState([])
    const [managerName, setmanagerName] = useState("")
    const [managerID, setmanagerID] = useState("")
    const [country, setcountry] = useState("")
    const [countryList, setcountryList] = useState([])
    const [status, setStatus] = useState("")
    const [key, setKey] = useState(0)

    useEffect(() => {
        const getDetails = async() => {
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`;
            const res = await fetch(`${BASE_URL}organisation-info`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
            })
            const response = await res.json()
            const{success, data} = response
            if(success){
                if(data){
                    setLevels(data.levels.split(','))
                    setFAreas(data.functionalAreas.split(','))
                    setcountryList(data.countries.split(','))
                    setworkLocationList(data.locations.split(','))
                    setdivisionList(data.divisions.split(','))
                    // setLocation(data.locations)
                    // setDivisions(data.divisions)
                    // setFSkills(data.coreSkills)
                    // setBSKills(data.businessSkills)
                }
            }
        }
        
            getDetails()
    },[])
    
    const [inputFields, setInputFields]=useState([{
        eid:"",
        email:"",
        fname:"",
        lname:"",
        role:"",
        functionalArea:"",
        yearsWithCompany:"",
        levelOfEmp:"",
        workLocation:"",
        division:"",
        managerName:"",
        managerID:"",
        country:"",
    }])

    const addMore = () => {
        setInputFields([...inputFields, {
            eid:"",
            email:"",
            fname:"",
            lname:"",
            role:"",
            functionalArea:"",
            yearsWithCompany:"",
            levelOfEmp:"",
            workLocation:"",
            division:"",
            managerName:"",
            managerID:"",
            country:"",
        }])

    }
      // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const paymentShow = () => setShow(true);

    const [showSuccess, setShowSuccess] = useState(false);
    const hideAddModel = () => {
        setShowSuccess(false)
        navigate(-1)
            setEid("")
            setEmail('')
            setFName('')
            setLName('')
            setRole('')
            setcountry('')
            setdivision('')
            setfunctionalArea('')
            setlevelOfEmp('')
            setmanagerID('')
            setmanagerName('')
            setworkLocation('')
            setyearsWithCompany('')
    };
    const showAddModel = () => setShowSuccess(true);

    const [file, setFile] = useState(null);
    const handleSelect = (file) => {
        // console.log(file.name)
        // alert(file.name)
        setFile(file);
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            encoding: "ISO-8859-1",
            complete: function (results) {
              const rowsArray = [];
              const valuesArray = [];
      
              // Iterating data to get column name and their values
              results.data.map((d) => {
                //   console.log(d)
                rowsArray.push(Object.keys(d));
                valuesArray.push(Object.values(d));
              });
      
              // Parsed Data Response in array format
              setParsedData(results.data);
            //   console.log("RESULT", results.data)
              // Filtered Column Names
              setTableRows(rowsArray[0]);
      
              // Filtered Valuesa
              setValues(valuesArray);
            },
          });
    };
    const handleChange = (index, evnt) => {
        let { name, value, maxLength } = evnt.target;
        if(value.length > 0 && name != "email"){
            value = value[0].toUpperCase() + value.slice(1);
        }
        if(value.length > 0 && name == "yearsWithCompany"){
            value = value.slice(0, maxLength)
       }
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
    }
    // const handleChange = (file) => {
    //     // console.log(file.name)
    //     // alert(file.name)
    //     setFile(file);
    // };

    // const handleChange = (event) => {
    //     // Passing file data (event.target.files[0]) to parse using Papa.parse
    //     Papa.parse(event.target.files[0], {
    //       header: true,
    //       skipEmptyLines: true,
    //       complete: function (results) {
    //         console.log(results.data)
    //       },
    //     });
    //   };
    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        // console.log(event.target.files[0])
        Papa.parse(event.target.files[0], {
          header: true,
          skipEmptyLines: true,
          encoding: "ISO-8859-1",
          complete: function (results) {
            const rowsArray = [];
            const valuesArray = [];
    
            // Iterating data to get column name and their values
            results.data.map((d) => {
                // console.log(d)
              rowsArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
            });
    
            // Parsed Data Response in array format
            setParsedData(results.data);
            // console.log("RESULT", results.data)
            // Filtered Column Names
            setTableRows(rowsArray[0]);
    
            // Filtered Valuesa
            setValues(valuesArray);
          },
        });
      };

      const uploadCSV = async() => {
        // console.log(parsedData)
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        let temp = []
        for(let data of parsedData){
            if(data.email == '' || data.first_namename == "" ){
                alert(`${data.email} Either name or email is empty`)
            }else{
                let dict =  {
                    country: data.Country + '',
                    designationLevel: data.Level_Of_Emp+ "",
                    division: data.Division+ "",
                    email: data.Email + "",
                    empId: data.EID + "",
                    functionalArea: data.Functional_Area+ "",
                    jobTitle: data.Job_Title+ "",
                    name: data.First_Name+" "+data.Last_Name,
                    reportingManagerName: data.Reporting_Manager_Name+ "",
                    reportingManagaerEid: data.Reporting_Manager_EID+ "",
                    workLocation: data.Work_Location+ "",
                    yearsWithCompany: parseInt(data.Years_With_Company+ "")
    
                }
                temp.push(dict)
                
            }
            
        }
        // console.log(temp)
        // return
        const body = {
            data: temp
        }
        // console.log("body",body)
        const res = await fetch(`${BASE_URL}mentor`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        console.log("response", response)
        const { success } = response        
        if(success){
            setShow(false)
            alert("File Uploaded Successfully")
            setFile(null);
        }else{
            setShow(false)
            alert("There are some wrong input values. Please check and try again")
            setFile(null);
        }
      }
    const addMentorFun = async (e) => {
        e.preventDefault()
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        let temp = []
        for(let key of inputFields){
            let dict = {
                "empId": key.eid,
                "jobTitle": key.role,
                "functionalArea": key.functionalArea,
                "yearsWithCompany": parseInt(key.yearsWithCompany),
                "designationLevel": key.levelOfEmp,
                "workLocation": key.workLocation,
                "division": key.division,
                "reportingManagerName": key.managerName,
                "reportingManagaerEid": key.managerID,
                "country": key.country,
                // "noSqlProfileId": "string",
                // "password": "string",
                "name": `${key.fname}\u00A0${key.lname}`,
                // "phoneNumber": "9090909090",
                "email": key.email,
            }
            temp.push(dict)
        }
        const body = {
            data:temp
        }
        
        // console.log(body)
        // return
        const res = await fetch(`${BASE_URL}mentor`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success == true) {
            showAddModel()
            
        }else{
            alert(response.err.message.message)
        }


    }

    const downloadSample = ()=> {
        const csvExporter = new ExportToCsv(options);
 
        csvExporter.generateCsv(sampleData);
    }

    const deleteMentor = (index) => {
        setKey(key+1)
        inputFields.pop(index);
        console.log(inputFields)
        setInputFields(inputFields)
    }
    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div className="demo5 mt-30 mb-25">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-lg-12">
                            <div className=" d-flex flex-wrap breadcrumb-main__wrapper">
                                        <p
                                            onClick={() => navigate("/mentors")}
                                            style={{
                                                marginRight: "10px",
                                                color: "#7A7A7A",
                                                fontWeight: "400",
                                                lineHeight: "22px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Mentors
                                        </p>
                                        <img
                                            style={{
                                                marginRight: "10px",
                                                width: "6px",
                                                height: "13px",
                                                marginTop: "6px",
                                            }}
                                            src={path}
                                        />
                                        <p
                                            style={{
                                                color: "#F8A046",
                                                fontWeight: "400",
                                                lineHeight: "22px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Add Mentor
                                        </p>
                                        
                                    </div>
                                <div className="breadcrumb-main user-member justify-content-sm-between ">
                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Add Mentors</h4>
                                        </div>
                                    </div>
                                    <div className="action-btn">
                                        <a href="#" className="btn px-15 btn-outline-primary" onClick={paymentShow}>Upload CSV File</a>

                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card card-Vertical card-default card-md mb-4">
                                    <div className="">
                                        <form onSubmit={addMentorFun}>
                                            <div key={key} className="row">
                                            {inputFields.map((data, index)=> (
                                                    <>
                                                    <div className="col-md-6 mb-25">
                                                    <input name='eid' value={data.eid} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="EID" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input name='email' value={data.email} onChange={(evnt) => handleChange(index, evnt)} type="email" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Email" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input name='fname' value={data.fname} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="First Name" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input name='lname' value={data.lname} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Last Name" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                    <input name='role' value={data.role} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Job Title" required/>
                                                        {/* <select name='role' value={data.role} onChange={(evnt) => handleChange(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Role</option>
                                                            <option value="Developer">Developer</option>
                                                            <option value="Designer">Designer</option>
                                                            <option value="Manager">Manager</option>
                                                            <option value="Tester">Tester</option>
                                                        </select> */}
                                                    </div>

                                                </div>
                                                {/* <div className="col-md-6 mb-25">
                                                    <input name='role' value={data.role} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Role" />
                                                </div> */}

                                                    <div className="col-md-6 mb-25">
                                                        <div class="countryOption">
                                                            <select name='functionalArea' value={data.functionalArea} onChange={(evnt) => handleChange(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                                <option value="">Select Functional Area</option>
                                                                {fAreas.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                                {/* <option value="React">React</option>
                                                                <option value="Node">Node</option>
                                                                <option value="PHP">PHP</option>
                                                                <option value="Java">Java</option> */}
                                                            </select>
                                                        </div>

                                                    </div>
                                                {/* <div className="col-md-6 mb-25">
                                                    <input name='functionalArea' value={data.functionalArea} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Function" />
                                                </div> */}

                                                <div className="col-md-6 mb-25">
                                                    <input name='yearsWithCompany' value={data.yearsWithCompany} onChange={(evnt) => handleChange(index, evnt)} type="number" maxlength="2" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Years with the Company" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                        <div class="countryOption">
                                                            <select name='levelOfEmp' value={data.levelOfEmp} onChange={(evnt) => handleChange(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Level of Employee</option>
                                                                {levels.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                                {/* <option value="">Select Level of Employee</option> */}
                                                                {/* <option value="Level1">Level 1</option>
                                                                <option value="Level2">Level 2</option>
                                                                <option value="Level3">Level 3</option>
                                                                <option value="Level4">Level 4</option> */}
                                                            </select>
                                                        </div>

                                                    </div>
                                                {/* <div className="col-md-6 mb-25">
                                                    <input name='levelOfEmp' value={data.levelOfEmp} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Level of employee" required/>
                                                </div> */}

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select name='workLocation' value={data.workLocation} onChange={(evnt) => handleChange(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Work Location</option>
                                                            {workLocationList.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                            
                                                        </select>
                                                    </div>

                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select name='division' value={data.division} onChange={(evnt) => handleChange(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Division</option>
                                                            {divisionList.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <input name='managerName' value={data.managerName} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Reporting Manager Name" required/>
                                                </div>

                                                <div className="col-md-6 mb-25">
                                                    <input name='managerID' value={data.managerID} onChange={(evnt) => handleChange(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="Reporting Manager EID" required/>
                                                </div>
                                                <div className="col-md-6 mb-25">
                                                    <div class="countryOption">
                                                        <select name='country' value={data.country} onChange={(evnt) => handleChange(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" required>
                                                            <option value="">Select Country</option>
                                                            {countryList.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                            
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="col-md-1 mb-25">
                                                    <button type='button' onClick={() => deleteMentor(index)} class="btn btn-icon btn-danger btn-squared ms-10"><img src="/admin/static/media/delete.b1b3f65b6ae97f82f445da289c28da65.svg" alt="layers" class="svg"></img></button>
                                                </div>
                                                <hr className='mb-4'/>
                                                </>
                                                ))}
                                                

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        <p style={{cursor:'pointer'}} onClick={() =>addMore()} className="color-orange fw-500 mb-0"><i className="las la-plus fs-16"></i>ADD MORE</p>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mt-0">
                                                        {/* <button onClick={() => addMentorFun()} type="button" className="btn btn-primary btn-default btn-squared m-auto">Add</button> */}
                                                        <button type="submit" className="btn btn-primary btn-default btn-squared m-auto">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <FileUploader onChange={changeHandler}
                                    onSelect={handleSelect}
                                    name="file"
                                    types={fileTypes}
                                    fileOrFiles={file} >
                                    <div className="box_dash justify-content-center text-center">
                                        <img src={uploads_img} />
                                        <p className="browser">Browse Files to upload</p>
                                    </div>
                                </FileUploader>
                                {/* <input
                                    type="file"
                                    name="file"
                                    onChange={changeHandler}
                                    accept=".csv"
                                    style={{ display: "block", margin: "10px auto" }}
                                /> */}
                            </div>
                            <p>{file ? file.name : ""}</p>
                            <div className="layout-button mt-15">
                                <div className="btn_center">
                                    <button type="button" onClick={()=> downloadSample()} className="btn btn-outline-primary btn-squared color-primary">Download Sample File</button>
                                    <button type="button" onClick={() => uploadCSV()} className="btn btn-primary btn-default btn-squared">Upload</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showSuccess} onHide={hideAddModel}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign:'center'}}>
                    <img src={success_msg}/>
                    <h3 style={{marginTop:'10px'}}>Mentor Added Successfully</h3>
                    </div>
                </Modal.Body>
            </Modal>
        </div>





    );
}

export default Add_Mentor;
