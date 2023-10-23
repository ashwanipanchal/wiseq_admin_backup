// import edit_img from '../../img/svg/edit.svg';
// import delete_img from '../../img/svg/delete.svg';
import { useEffect, useState } from 'react';
import author_logo from '../../../img/user_pic.png';
import rupees_img from '../../../img/rupees.svg';
import detail_success from '../../../img/detail_success.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Side_Bar from './sidebar';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../../services/Config';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import Multiselect from 'multiselect-react-dropdown';
import moment from 'moment'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-bootstrap/Modal';

const data = [
    { id: 1, amount_price: "10,000", total_amount: "Total Billed Amount" },
    { id: 2, amount_price: "10,000", total_amount: "Total Billed Amount" },
    { id: 3, amount_price: "10,000", total_amount: "Total Billed Amount" },
    { id: 4, amount_price: "10,000", total_amount: "Total Billed Amount" },
    { id: 5, amount_price: "10,000", total_amount: "Total Billed Amount" },
    { id: 6, amount_price: "10,000", total_amount: "Total Billed Amount" },
    { id: 7, amount_price: "10,000", total_amount: "Total Billed Amount" },
    { id: 8, amount_price: "10,000", total_amount: "Total Billed Amount" },
];

const data1 = [
    { id: 1, org_name: "HCL Technologies", amount_price: "₹10,000", user_status: "Active" },
];

function Edit_Profile_Mentor() {
    const { state } = useLocation()
    const navigate = useNavigate()
    //console.log(state.expertise)
    const [showHello, setShowHello] = useState(false);
    const [showHello1, setShowHello1] = useState(false);
    const [showHello2, setShowHello2] = useState(false);
    const [showHello3, setShowHello3] = useState(false);
    const [showHello4, setShowHello4] = useState(false);
    const [showHello5, setShowHello5] = useState(false);
    const [imagePath, setImagePath] = useState(state.imageUrl)
    const [imageUrl, setImageUrl] = useState("")
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [overview, setoverview] = useState(state.overview)
    const [empId, setempId] = useState(state.empId)
    // const [tools, setTools] = useState("")
    const [goal, setGoal] = useState(state.expertise.hasOwnProperty('aspirationalGoals') ? state.expertise.aspirationalGoals[0] : "")
    const [coreSkills, setCoreSkills] = useState([])
    const [busSkills, setBusSkills] = useState([])
    const [yearsWithCompany, setyearsWithCompany] = useState(state.yearsWithCompany)
    const [jobTitle, setjobTitle] = useState(state.jobTitle)
    const [functionalArea, setfunctionalArea] = useState(state.functionalArea)
    const [designationLevel, setdesignationLevel] = useState(state.designationLevel)
    const [yearsOfExperience, setyearsOfExperience] = useState(state.yearsOfExperience)
    const [email, setemail] = useState(state.userMeta.email)
    const [reportingManagerName, setreportingManagerName] = useState(state.reportingManagerName)
    const [linkedinProfileLink, setlinkedinProfileLink] = useState(state.linkedinProfileLink)
    const [websiteLink, setwebsiteLink] = useState(state.websiteLink)
    //States for location 
    const [workLocation, setWorkLocation] = useState(state.workLocation)
    const [division, setDivision] = useState(state.division)
    const [country, setCountry] = useState(state.country)
    const [achievment, setachievment] = useState(state.achievment)
    const [optionSelected, setOptionSelected] = useState(null)
    const [type, setType]=useState("text")
    const [selectedBSkill, setSelectedBSkill] = useState(state.expertise.businessSkillsGoodAt)
    const [selectedBSkillDev, setSelectedBSkillDev] = useState(state.expertise.businessSkillsToDevelop)
    const [selectedCSkill, setSelectedCSkill] = useState(state.expertise.coreSkillsGoodAt)
    const [selectedCSkillDev, setSelectedCSkillDev] = useState(state.expertise.coreSkillsToDevelop)
    const [selectedBSkillArr, setSelectedBSkillArr] = useState([])
    const [selectedBSkillDevArr, setSelectedBSkillDevArr] = useState([])
    const [selectedCSkillArr, setSelectedCSkillArr] = useState([])
    const [selectedCSkillDevArr, setSelectedCSkillDevArr] = useState([])
    const [allTools, setAllTools] = useState([])
    const [tools, setTools] = useState(state.expertise?.hasOwnProperty('tools') ? state.expertise?.tools : [])
    const [newSelectedTools, setnewSelectedTools] = useState([])
    const [indexValue, setIndex]=useState("")
    const [indexValue1, setIndex1]=useState("")
    const [calc, setCalc] = useState(false);
    const [calc1, setCalc1] = useState(false);
    const [value, setValue] = useState(new Date());
    const [value1, setValue1] = useState(new Date());
    const [key, setKey] = useState(0)
    const [key1, setKey1] = useState(0)
    const [key2, setKey2] = useState(0)
    const [key3, setKey3] = useState(0)
    const [deleteIndex, setDeleteIndex] = useState("")
    const toggle = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const closeModal = () => setShowHello(false);
    const showModal = () => setShowHello(true);

    const closeModal1 = () => setShowHello1(false);
    const showModal1 = () => setShowHello1(true);

    const closeModal2 = () => setShowHello2(false);
    const showModal2 = () => setShowHello2(true);

    const closeModal3 = () => setShowHello3(false);
    const showModal3 = () => setShowHello3(true);

    const closeModal4 = () => setShowHello4(false);
    const showModal4 = () => setShowHello4(true);

    const closeModal5 = () => setShowHello5(false);
    const showModal5 = () => setShowHello5(true);

    const showCalc = () => {
        setCalc(!calc)
    }
    const showCalc1 = () => {
        setCalc1(!calc1)
    }

    useEffect(()=>{
        let tempArr1 = []
        let tempArr2 = []
        let tempArr3 = []
        let tempArr4 = []
        let tempArr5 = []
        for(let skills of state.expertise.businessSkillsGoodAt ){
            tempArr1.push(skills.skill)
        }
        setSelectedBSkillArr(tempArr1)
        for(let skills of state.expertise.businessSkillsToDevelop ){
            tempArr2.push(skills.skill)
        }
        setSelectedBSkillDevArr(tempArr2)
        for(let skills of state.expertise.coreSkillsGoodAt ){
            tempArr3.push(skills.skill)
        }
        setSelectedCSkillArr(tempArr3)
        for(let skills of state.expertise.coreSkillsToDevelop ){
            tempArr4.push(skills.skill)
        }
        setSelectedCSkillDevArr(tempArr4)

        for(let skills of state.expertise?.tools || [] ){
            tempArr5.push(skills)
        }
        setnewSelectedTools(tempArr5)

    },[])
    
    useEffect(() => {
        const getSkills = async () => {
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`; 
            const res = await fetch(`${BASE_URL}organisation-info/skills`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
            })
            const response = await res.json()
            const { data } = response
            let tempCArr = []
            let tempBArr = []
            data.map((i) => {
                if (i.type == "core") {
                    tempCArr.push(i)
                    setCoreSkills(tempCArr)
                } else {
                    tempBArr.push(i)
                    setBusSkills(tempBArr)
                }
            })

        }
        getSkills()
        getDetails()
    }, [])

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
        console.log(response)
        const{success, data} = response
        if(success){
            if(data){
                setAllTools(data.tools.split(','))
                // setLevels(data.levels.split(','))
                // setFAreas(data.functionalAreas.split(','))
                // setcountryList(data.countries.split(','))
                // setworkLocationList(data.locations.split(','))
                // setdivisionList(data.divisions.split(','))
                // setLocation(data.locations)
                // setDivisions(data.divisions)
                // setFSkills(data.coreSkills)
                // setBSKills(data.businessSkills)
            }
        }
    }
        //States for Language
        const [languages, setLanguages] = useState([{
            language: '',
            proficiency:'',
            canWrite:false,
            canRead:false,
            canSpeak:false
        }])

        const addInputFieldLang = () => {
            setLanguages([...languages, {
                language: '',
            proficiency:'',
            canWrite:false,
            canRead:false,
            canSpeak:false
    
            }])
    
        }
        const handleChangeForLang = (index, evnt) => {
            //console.log(evnt.target.value)
            const { name, value } = evnt.target;
            const list = [...languages];
            list[index][name] = value;
            setLanguages(list);
        }
        const handleChangeForLang1 = (index, evnt) => {
            // console.log(evnt.target.checked)
            // return
            const { name, checked, } = evnt.target;
            const list = [...languages];
            list[index][name] = checked;
            setLanguages(list);
        }

        //States for Achivements
        const [acCount, setAcCount] = useState([{
            achivement: ''
        }])

            //States for Work History 
        const [WHinputFields, setWHInputFields] = useState([{
            jobRole: '',
            companyName: '',
            startDate: '',
            endDate: '',
            isMyCurrentRole:false
        }]);

          //States for educaation 
    const [inputFields, setInputFields] = useState([{
        degree: '',
        collegeName: '',
        passingYear: '',
    }]);

        const addInputFieldAc = () => {
            setAcCount([...acCount, {
                achivement: '',
    
            }])
    
        }

            //add more inputs for work history tab
    const addInputFieldWH = () => {
        setWHInputFields([...WHinputFields, {
            jobRole: '',
            companyName: '',
            startDate: '',
            endDate: '',
            isMyCurrentRole:false
        }])

    }

        //add more inputs for education tab
        const addInputField = () => {
            setInputFields([...inputFields, {
                degree: '',
                collegeName: '',
                passingYear: '',
            }])
    
        }
        const handleChangeForEdu = (index, evnt) => {
    
            const { name, value } = evnt.target;
            const list = [...inputFields];
            if (name == "passingYear"){
                list[index][name] = parseInt(value);
            }else{
                list[index][name] = value;
            }
            setInputFields(list);
        }

    const handleChangeForWH = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...WHinputFields];
        list[index][name] = value;
        setWHInputFields(list);
    }
    const handleChangeForWHCalender = (index, evnt) => {
        setValue(evnt)
        console.log(evnt)
        console.log(indexValue)
        // const { name, value } = evnt.target;
        const list = [...WHinputFields];
        console.log(list)
        list[indexValue]["startDate"] = moment(evnt).format("YYYY-MM-DD");
        setWHInputFields(list);
    }
    const handleChangeForWHCalender1 = (index, evnt) => {
        setValue1(evnt)
        console.log(evnt)
        console.log(indexValue1)
        // const { name, value } = evnt.target;
        const list = [...WHinputFields];
        console.log(list)
        list[indexValue1]["endDate"] = moment(evnt).format("YYYY-MM-DD");
        setWHInputFields(list);
    }
    const handleChangeForWHCheck = (index, evnt) => {
        const { name, checked } = evnt.target;
        const list = [...WHinputFields];
        list[index][name] = checked;
        setWHInputFields(list);
    }
        useEffect(()=>{
            let Acarray= []
            for(let achivements of state.keyAchievements|| []){
                let dict ={
                    achivement:achivements
                }
                Acarray.push(dict)
                
            }
            setAcCount(Acarray)
           },[]) 

           useEffect(()=>{
            let Acarray= []
            for(let work_his of state.workHistory || []){
                let dict ={
                    jobRole: work_his.jobRole,
                    companyName: work_his.companyName,
                    startDate: work_his.startDate,
                    endDate: work_his.endDate,
                    isMyCurrentRole: work_his.isMyCurrentRole,
                }
                Acarray.push(dict)
                
            }
            setWHInputFields(Acarray)
           },[]) 

           useEffect(()=>{
            let Acarray= []
            for(let education of state.education || []){
                let dict ={
                    degree: education.degree,
                    collegeName: education.collegeName,
                passingYear: education.passingYear,
                }
                Acarray.push(dict)
                
            }
            setInputFields(Acarray)
           },[]) 

           useEffect(()=>{
            let Acarray= []
            for(let lang of state.languages || []){
                let dict ={
                    language: lang.language,
                    proficiency:lang.proficiency,
                    canWrite:lang.canWrite,
                    canRead:lang.canRead,
                    canSpeak:lang.canSpeak
                }
                Acarray.push(dict)
                
            }
            setLanguages(Acarray)
           },[]) 

           const updateAchivement = async (e) => {
               e.preventDefault()
               if(acCount.length == 0){
                alert("Please enter your details first")
                return
               }
            let array = []
    
            for (let user of acCount){
                if(user.achivement.length > 0){
                    array.push(user.achivement)
                }
            }
            // console.log(array)
            // return
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`;
            const body = {
                "keyAchievements": array
            }
            //console.log(body)
            // return
            const res = await fetch(`${BASE_URL}mentee`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(body)
            })
            if(WHinputFields.length > 0){
            const taskBody = {
                "type": "complete-profile", 
                "payload": { 
                    "completedTasks": ["keyAchievements"]
                } 
            } 
            const taskRes = await fetch(`${BASE_URL}tasks/update`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(taskBody)
            })
            const taskResponse = await taskRes.json()
            console.log("task res", taskResponse)
        }
            const response = await res.json()
            //console.log("out response", response)
            // return
            const { success } = response
            if (success) {
                showModal()
            return
                navigate(-1)
            }
        }


        const updateExpertise = async (e) => {
            e.preventDefault()
            // return
            if(selectedBSkillArr.length == 0){
                alert("Please Select Your Business Skills")
                return
            }
            if(selectedBSkillDevArr.length == 0){
                alert("Please Select Your Business Skills To Develop")
                return
            }
            if(selectedCSkillArr.length == 0){
                alert("Please Select Your Core Skills")
                return
            }
            if(selectedCSkillDevArr.length == 0){
                alert("Please Select Your Core Skills To Develop")
                return
            }
            if(newSelectedTools.length == 0){
                alert("Please Select Your Tools")
                return
            }
            if(goal == ""){
                alert("Please Enter Aspirational Goals")
                return
            }
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`;
            const body = {
                "expertise":
                {
                    "businessSkillsGoodAt": selectedBSkillArr,
                    "coreSkillsGoodAt": selectedCSkillArr,
                    "businessSkillsToDevelop": selectedBSkillDevArr,
                    "coreSkillsToDevelop": selectedCSkillDevArr,
                    "tools": newSelectedTools,
                    "aspirationalGoals": [goal]
                }
    
            }
            console.log(body)
            // return
            const res = await fetch(`${BASE_URL}mentee`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(body)
            })

            const taskBody = {
                "type": "complete-profile", 
                "payload": { 
                    "completedTasks": ["expertise"]
                } 
            } 
            const taskRes = await fetch(`${BASE_URL}tasks/update`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(taskBody)
            })
            const taskResponse = await taskRes.json()
            console.log("task res", taskResponse)
            
            const response = await res.json()
            //console.log("out response", response)
            const { success } = response
            if (success) {
                showModal()
            return
                navigate(-1)
            }
        }

        
        const updateEducation = async (e) => {
            e.preventDefault()
            if(inputFields.length == 0){
                alert("Please enter your details first")
                return
               }
            //console.log("this runs")
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`;
            const body = {
                "education": inputFields
            }
            const res = await fetch(`${BASE_URL}mentee`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(body)
            })
            if(inputFields.length > 0){
                const taskBody = {
                    "type": "complete-profile", 
                    "payload": { 
                        "completedTasks": ["education"]
                    } 
                } 
                const taskRes = await fetch(`${BASE_URL}tasks/update`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        'Content-Type': 'application/json',
                        "Authorization": btoken,
                    },
                    body: JSON.stringify(taskBody)
                })
                const taskResponse = await taskRes.json()
                console.log("task res", taskResponse)
            }
            const response = await res.json()
            //console.log(response)
            const { success } = response
            if (success) {
                showModal()
            return
                navigate(-1)
            }
        }

        
    const updateLanguage = async (e) => {
        e.preventDefault()
        if(languages.length == 0){
            alert("Please enter your details first")
            return
           }
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body = {
            "languages": languages
        }
        //console.log(body)
        // return
        const res = await fetch(`${BASE_URL}mentee`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        if(languages.length > 0){
            const taskBody = {
                "type": "complete-profile", 
                "payload": { 
                    "completedTasks": ["language"]
                } 
            } 
            const taskRes = await fetch(`${BASE_URL}tasks/update`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(taskBody)
            })
            const taskResponse = await taskRes.json()
            console.log("task res", taskResponse)
        }
        const response = await res.json()
        //console.log("out response", response)
        const { success } = response
        if (success) {
            showModal()
            return
            navigate(-1)
        }
    }


        const updateWorkHistory = async (e) => {
            e.preventDefault()
            if(WHinputFields.length == 0){
                alert("Please enter your details first")
                return
               }
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`;
            const body = {
                "workHistory": WHinputFields
            }
            //console.log(body)
            // return
            const res = await fetch(`${BASE_URL}mentee`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(body)
            })
            if(WHinputFields.length > 0){
                const taskBody = {
                    "type": "complete-profile", 
                    "payload": { 
                        "completedTasks": ["workHistory"]
                    } 
                } 
                const taskRes = await fetch(`${BASE_URL}tasks/update`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        'Content-Type': 'application/json',
                        "Authorization": btoken,
                    },
                    body: JSON.stringify(taskBody)
                })
                const taskResponse = await taskRes.json()
                console.log("task res", taskResponse)
            }
            const response = await res.json()
            //console.log(response)
            const { success } = response
            if (success) {
                showModal()
            return
                navigate(-1)
            }
        }

    const handleChange1 = (selected) => {
        setOptionSelected({
            optionSelected: selected
        });
    };
    const handleChange = (index, evnt) => {
        console.log(evnt.target.value)
        const list = [...acCount];
        list[index]["achivement"] = evnt.target.value;
        setAcCount(list);



    }
    const onSelectBSkill = (selectedList, selectedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedBSkillArr(temp)
        })
        setSelectedBSkill(selectedList)
    }

    const onRemoveBSkill = (selectedList, removedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedBSkillArr(temp)
        })
        setSelectedBSkill(selectedList)
    }
    const onSelectBSkillDev = (selectedList, selectedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedBSkillDevArr(temp)
        })
        setSelectedBSkillDev(selectedList)
    }

    const onRemoveBSkillDev = (selectedList, removedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedBSkillDevArr(temp)
        })
        setSelectedBSkillDev(selectedList)
    }
    const onSelectCSkill = (selectedList, selectedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedCSkillArr(temp)
        })
        setSelectedCSkill(selectedList)
    }

    const onRemoveCSkill = (selectedList, removedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedCSkillArr(temp)
        })
        setSelectedCSkill(selectedList)
    }
    const onSelectCSkillDev = (selectedList, selectedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedCSkillDevArr(temp)
        })
        setSelectedCSkillDev(selectedList)
    }

    const onRemoveCSkillDev = (selectedList, removedItem) => {
        let temp = []
        selectedList.map((i) => {
            temp.push(i.skill)
            setSelectedCSkillDevArr(temp)
        })
        setSelectedCSkillDev(selectedList)
    }

    const onSelectTools = (selectedList, selectedItem) => {
        console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i)
            setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
    }

    const onRemoveTools = (selectedList, removedItem) => {
        console.log(selectedList)
        let temp = []
        selectedList.map((i) => {
            temp.push(i)
            setnewSelectedTools(temp)
        })
        // setSelectedCSkill(selectedList)
    }

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };
    const colourOptions = [
        { value: "ocean1", label: "Ocean" },
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
        { value: "forest", label: "Forest" },
        { value: "slate", label: "Slate" },
        { value: "silver", label: "Silver" }
    ];

    const updateOverView = async () => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const body = {
            "overview": {
                imageUrl,
                overview,
                yearsWithCompany: parseInt(yearsWithCompany),
                yearsOfExperience: parseInt(yearsOfExperience),
                linkedinProfileLink,
                websiteLink
            }
        }
        console.log(body)
        const res = await fetch(`${BASE_URL}mentee`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        if(imageUrl != "" &&
            overview != "" &&
            yearsWithCompany != "" &&
            yearsOfExperience != "" &&
            linkedinProfileLink != "" &&
            websiteLink != ""){
            const taskBody = {
                "type": "complete-profile", 
                "payload": { 
                    "completedTasks": ["overview"]
                } 
            } 
            const taskRes = await fetch(`${BASE_URL}tasks/update`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(taskBody)
            })
            const taskResponse = await taskRes.json()
            console.log("task res", taskResponse)
        }
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            localStorage.setItem("image",  imageUrl.length>0 ? imageUrl :imagePath)
            showModal()
            return
            navigate(-1)
        }
    }

    const updateLocation = async (e) => {
        e.preventDefault()
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const body = {
            "location": {
                country,
                division,
                workLocation
            }
        }
        const res = await fetch(`${BASE_URL}mentee`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        if(workLocation != ""  &&
            division != "" &&
            country != ""){
            const taskBody = {
                "type": "complete-profile", 
                "payload": { 
                    "completedTasks": ["location"]
                } 
            } 
            const taskRes = await fetch(`${BASE_URL}tasks/update`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    "Authorization": btoken,
                },
                body: JSON.stringify(taskBody)
            })
            const taskResponse = await taskRes.json()
            console.log("task res", taskResponse)
        }
        const response = await res.json()
        const { success } = response
        if (success) {
            showModal()
            return
            navigate(-1)
        }
    }

    const uploadImage = async(item) => {
        setImagePath(item)
        let formData = new FormData()
        formData.append("file", item)
                const token = await localStorage.getItem("token")
                const btoken = `Bearer ${token}`;  
                // console.log(btoken)  
                const res = await fetch(`${BASE_URL}files/upload?fileType=profile`,{
                    method:'POST',
                    headers:{
                      "Accept": "application/json",
                    //   'Content-Type': 'multipart/form-data',
                      "Authorization": btoken,
                    },
                    body:formData
                  })
                  const response = await res.json()
                console.log(response)
                const {success} = response
                if(success){             
                    setImageUrl(response.data.url)
                }
    }

    const deleteAchivement = (index) => {
        setKey(key + 1)
        acCount.pop(index);
        console.log(acCount)
        setAcCount(acCount)
        closeModal4()
        showModal5()
    }
    const deleteEducation = (index) => {
        setKey1(key1 + 1)
        inputFields.pop(index);
        console.log(inputFields)
        setInputFields(inputFields)
        closeModal2()
        showModal5()
    }
    const deleteLanguage = (index) => {
        setKey2(key2 + 1)
        languages.pop(index);
        console.log(languages)
        setLanguages(languages)
        closeModal1()
        showModal5()
    }
    const deleteWorkHistory = (index) => {
        setKey3(key3 + 1)
        WHinputFields.pop(index);
        console.log(WHinputFields)
        setWHInputFields(WHinputFields)
        closeModal3()
        showModal5()
    }

    const onChange = (e) => {
        console.log(e)
        setValue(e)
        // setDate(moment(e).format("DD/MM/YYYY"))
        showCalc()
    }
    const onChange1 = (e) => {
        console.log(e)
        setValue1(e)
        // setDate(moment(e).format("DD/MM/YYYY"))
        showCalc1()
    }

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
                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Edit Profile</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="">
                                    <div className="">
                                        <div className="tab-wrapper">
                                            <div className="dm-tab tab-horizontal">
                                                <Tabs>
                                                    <TabList className="nav nav-tabs vertical-tabs">
                                                        <Tab>Overview</Tab>
                                                        <Tab>Expertise</Tab>
                                                        <Tab>Location</Tab>
                                                        <Tab>Language</Tab>
                                                        <Tab>Education</Tab>
                                                        <Tab>Work History</Tab>
                                                        <Tab>Key Achivements</Tab>

                                                    </TabList>

                                                    {/* Overview  */}
                                                    <TabPanel className="tab-content">
                                                        <form onSubmit={updateOverView}>

                                                            <div className="row">
                                                                 <div className="account-profile d-flex align-items-center mb-4 ">
                                                                    <div className="ap-img pro_img_wrapper">
                                                                        <input id="file-upload" type="file" name="fileUpload" className="d-none" onChange={(event) => {
                                                                            //console.log(event.target.files[0]);
                                                                            // formData3(event.target.files[0])
                                                                            setImagePath(event.target.files[0])
                                                                            uploadImage(event.target.files[0])
                                                                        }} />

<label for="file-upload">
                                                                        {imagePath ? <img src={typeof(imagePath) == "string" ? imagePath :  URL.createObjectURL(imagePath) || imageUrl} className="ap-img__main rounded-circle wh-120 bg-lighter d-flex" /> :
                                                                            <img src={author_logo} className="ap-img__main rounded-circle wh-120 bg-lighter d-flex" />}
                                                                            {/* {imagePath ? <img src={URL.createObjectURL(imagePath)} className="ap-img__main rounded-circle wh-80 bg-lighter d-flex" /> :
                                                                                <img src={author_logo} className="ap-img__main rounded-circle wh-120 bg-lighter d-flex" />} */}
                                                                        </label>
                                                                    </div>
                                                                    <div className="account-profile__title">
                                                                        <h6 className="fs-18 ms-20 fw-500 text-capitalize">Upload Image (Upto 3MB)</h6>
                                                                    </div>
                                                                </div> 
                                                                <div className="col-md-12 mb-25">
                                                                    <textarea value={overview} onChange={e => setoverview(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='About Me* (Maximum 500 Characters are allowed)' required></textarea>
                                                                </div>


                                                                <div className="col-md-6 mb-25">
                                                                    <input value={empId} onChange={e => setoverview(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Employee ID" disabled />
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={yearsWithCompany} onChange={e => {
                                                                        const re = /^[0-9\b]+$/;
                                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                                            setyearsWithCompany(e.target.value)
                                                                        }
                                                                        // setGrowthScore(e.target.value)
                                                                        }}
                                                                        type="text" maxLength={2} className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Years with the Company" required/>
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={jobTitle} onChange={e => setjobTitle(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Job Title" disabled />
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={functionalArea} onChange={e => setfunctionalArea(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Fuctional Area" disabled />
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={designationLevel} onChange={e => setdesignationLevel(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Level of employee" disabled />
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={yearsOfExperience} onChange={e => {
                                                                        const re = /^[0-9\b]+$/;
                                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                                            setyearsOfExperience(e.target.value)
                                                                        }
                                                                        // setGrowthScore(e.target.value)
                                                                        }}
                                                                     type="text" maxLength={2} className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Years of experience" required/>
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={email} onChange={e => setemail(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Email address" disabled />
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={reportingManagerName} onChange={e => setreportingManagerName(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Reporting Manager" disabled />
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={linkedinProfileLink} onChange={e => setlinkedinProfileLink(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Linkedin Profile Link" />
                                                                </div>
                                                                <div className="col-md-6 mb-25">
                                                                    <input value={websiteLink} onChange={e => setwebsiteLink(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Website Link" />
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="mt-0">
                                                                        <button type="submit" className="btn btn-petrol btn-default btn-squared m-auto">save</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </TabPanel>

                                                    <TabPanel>
                                                        <div className="row">
                                                            <form onSubmit={updateExpertise}>
                                                                <div className="row">
                                                                    <div className="col-md-6 mb-25">
                                                                        <div class="countryOption">
                                                                            {/* <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                            <option selected>Business skills I am good at</option>
                                                                            <option value="1">org</option>
                                                                        </select> */}
                                                                            <Multiselect
                                                                                style={{ searchBox: {  borderColor: 'gray' } }}
                                                                                // isObject={false}
                                                                                selectionLimit="3"
                                                                                options={busSkills} // Options to display in the dropdown
                                                                                placeholder='Business skills I am good at'
                                                                                selectedValues={selectedBSkill} // Preselected value to persist in dropdown
                                                                                onSelect={onSelectBSkill} // Function will trigger on select event
                                                                                onRemove={onRemoveBSkill} // Function will trigger on remove event
                                                                                displayValue="skill" // Property name to display in the dropdown options
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6 mb-25">
                                                                        <div class="countryOption">
                                                                            {/* <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                <option selected>Business skills I need to develop</option>
                                                                                <option value="1">20/02/2023</option>
                                                                            </select> */}
                                                                            <Multiselect
                                                                                style={{ searchBox: {  borderColor: 'gray' } }}
                                                                                // isObject={false}
                                                                                selectionLimit="3"
                                                                                options={busSkills} // Options to display in the dropdown
                                                                                placeholder='Business skills I need to develop'
                                                                                selectedValues={selectedBSkillDev} // Preselected value to persist in dropdown
                                                                                onSelect={onSelectBSkillDev} // Function will trigger on select event
                                                                                onRemove={onRemoveBSkillDev} // Function will trigger on remove event
                                                                                displayValue="skill" // Property name to display in the dropdown options
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 mb-25">
                                                                        <div class="countryOption">
                                                                            {/* <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                <option selected>Core skills I am good at</option>
                                                                                <option value="1">org</option>
                                                                            </select> */}
                                                                            <Multiselect
                                                                                style={{ searchBox: { borderColor: 'gray' } }}
                                                                                // isObject={false}
                                                                                selectionLimit="3"
                                                                                value={[{id:1, industry:"as"}]}
                                                                                options={coreSkills} // Options to display in the dropdown
                                                                                placeholder='Core skills I am good at'
                                                                                selectedValues={selectedCSkill} // Preselected value to persist in dropdown
                                                                                onSelect={onSelectCSkill} // Function will trigger on select event
                                                                                onRemove={onRemoveCSkill} // Function will trigger on remove event
                                                                                displayValue="skill" // Property name to display in the dropdown options
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6 mb-25">
                                                                        <div class="countryOption">
                                                                            {/* <select class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example">
                                                                                <option selected>Core skills I need to develop</option>
                                                                                <option value="1">20/02/2023</option>
                                                                            </select> */}
                                                                            <Multiselect
                                                                                style={{ searchBox: {  borderColor: 'gray' } }}
                                                                                // isObject={false}
                                                                                selectionLimit="3"
                                                                                options={coreSkills} // Options to display in the dropdown
                                                                                placeholder='Core skills I need to develop'
                                                                                selectedValues={selectedCSkillDev} // Preselected value to persist in dropdown
                                                                                onSelect={onSelectCSkillDev} // Function will trigger on select event
                                                                                onRemove={onRemoveCSkillDev} // Function will trigger on remove event
                                                                                displayValue="skill" // Property name to display in the dropdown options
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 mb-25">
                                                                        <div class="countryOption">
                                                                            <Multiselect
                                                                                style={{ searchBox: { borderColor: 'gray' } }}
                                                                                isObject={false}
                                                                                selectionLimit="3"
                                                                                value={[{ id: 1, industry: "as" }]}
                                                                                options={allTools} // Options to display in the dropdown
                                                                                placeholder='Tools I would like to Develop'
                                                                                selectedValues={tools} // Preselected value to persist in dropdown
                                                                                onSelect={onSelectTools} // Function will trigger on select event
                                                                                onRemove={onRemoveTools} // Function will trigger on remove event
                                                                                // displayValue="skill" // Property name to display in the dropdown options
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12 mb-25">
                                                                        <textarea value={goal} onChange={(e) => setGoal(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Aspirational Goals'></textarea>
                                                                    </div>
                                                                    {/* <div className="col-md-6 mb-25">
                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Amount" disabled />
                                                                </div> */}

                                                                    <div className="col-md-12">
                                                                        <div className="mt-0">
                                                                            <button type="submit" className="btn btn-light-petrol btn-default btn-squared m-auto">Save</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                        <form onSubmit={updateLocation}>
                                                            <div className="row">
                                                            <div className="col-md-6 mb-25">
                                                                    <div class="countryOption">
                                                                        <select value={workLocation} onChange={e => setWorkLocation(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                                            <option value={workLocation}>{workLocation}</option>
                                                                            {/* <option value="">Select Work Location</option>
                                                                            <option value="Delhi">Delhi</option>
                                                                            <option value="Mumbai">Mumbai</option> */}
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6 mb-25">
                                                                    <div class="countryOption">
                                                                        <select value={division} onChange={e => setDivision(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                                        <option value={division}>{division}</option>
                                                                            {/* <option value="">Select Division</option>
                                                                            <option value="Central">Central</option>
                                                                            <option value="Western">Western</option> */}
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6 mb-25">
                                                                    <div class="countryOption">
                                                                        <select value={country} onChange={e => setCountry(e.target.value)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" aria-label="Default select example" disabled>
                                                                            <option value={country}>{country}</option>
                                                                            {/* <option value="">Select Country</option>
                                                                            <option value="India">India</option>
                                                                            <option value="United States">United States</option> */}
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                {/* <div className="col-md-6 mb-25">
                                                                    <input type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Amount" disabled />
                                                                </div> */}

                                                                <div className="col-md-12">
                                                                    <div className="mt-0">
                                                                        <button type="submit" className="btn btn-light-petrol btn-default btn-squared m-auto">save</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </TabPanel>

                                                    <TabPanel className="tab-content">
                                                        <form onSubmit={updateLanguage}>
                                                            <div className="row">
                                                                {languages.map((data, index)=>(
                                                                    <>
                                                                    <div className="col-md-6 mb-25">
                                                                    <input name="language" value={data.language} onChange={(evnt) => handleChangeForLang(index, evnt)} type="text" className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Language" />
                                                                    <div className='layout-button justify-content-between mt-3'>
                                                                        <div >
                                                                            <input name='canRead' defaultChecked={data.canRead} onChange={(evnt) => handleChangeForLang1(index, evnt)} className="checkbox" type="checkbox" id="check-1" />
                                                                            <label for="check-1">
                                                                                <span className="checkbox-text fw-600">Read</span>
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input name='canWrite' defaultChecked={data.canWrite} onChange={(evnt) => handleChangeForLang1(index, evnt)} className="checkbox" type="checkbox" id="check-2" />
                                                                            <label for="check-2">
                                                                                <span className="checkbox-text fw-600">Write</span>
                                                                            </label>
                                                                        </div>
                                                                        <div >
                                                                            <input name='canSpeak' defaultChecked={data.canSpeak} onChange={(evnt) => handleChangeForLang1(index, evnt)} className="checkbox" type="checkbox" id="check-3" />
                                                                            <label for="check-3">
                                                                                <span className="checkbox-text fw-600">Speak</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="col-md-6 mb-25">
                                                                    <div class="countryOption">
                                                                        <select name='proficiency' value={data.proficiency} onChange={(evnt) => handleChangeForLang(index, evnt)} class="form-select form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder='Select Proficiency' aria-label="Select Proficiency">
                                                                            <option value="">Select Proficiency</option>
                                                                            <option value="Beginner">Beginner</option>
                                                                            <option value="Proficient">Proficient</option>
                                                                            <option value="Expert">Expert</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-1 mb-25">
                                                                            <button type='button' onClick={() => {
                                                                                setDeleteIndex(index)
                                                                                showModal1()
                                                                                // deleteLanguage(index)
                                                                                }} class="btn btn-icon btn-danger btn-squared ms-10"><img src="/admin/static/media/delete.b1b3f65b6ae97f82f445da289c28da65.svg" alt="layers" class="svg"></img></button>
                                                                        </div>

                                                                        <hr className='mb-4' />
                                                                    </>
                                                                ))}
                                                            
                                                                <h6 onClick={() => addInputFieldLang()}>+ ADD ANOTHER LANGUAGE</h6>
                                                                <div className="layout-button">
                                                                    <div className="btn_center">

                                                                        <button type="submit" className="btn btn-light-petrol btn-default btn-squared">Save</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </TabPanel>

                                                    {/* Education Tab */}
                                                    <TabPanel className="tab-content">
                                                        <form onSubmit={updateEducation}>
                                                            <div className="row">
                                                                {inputFields.map((data, index) => (
                                                                    <>
                                                                        <div className="col-md-6 mb-25">
                                                                            <input type="text" name="degree" value={data.degree} onChange={(evnt) => handleChangeForEdu(index, evnt)} className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Degree" />
                                                                        </div>
                                                                        <div className="col-md-6 mb-25">
                                                                            <input type="text" name="collegeName" value={data.collegeName} onChange={(evnt) => handleChangeForEdu(index, evnt)} className="form-control ih-medium ip-gray radius-xs px-15" placeholder="College Name" />
                                                                        </div>
                                                                        <div className="col-md-6 mb-25">
                                                                            <input type="number" name="passingYear" value={data.passingYear} onChange={(evnt) => handleChangeForEdu(index, evnt)} className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Passing Year" />
                                                                        </div>
                                                                        <div className="col-md-1 mb-25">
                                                                            <button type='button' onClick={() => {
                                                                                setDeleteIndex(index)
                                                                                showModal2()
                                                                                // deleteLanguage(index)
                                                                                }} class="btn btn-icon btn-danger btn-squared ms-10"><img src="/admin/static/media/delete.b1b3f65b6ae97f82f445da289c28da65.svg" alt="layers" class="svg"></img></button>
                                                                        </div>

                                                                        <hr className='mb-4' />
                                                                    </>
                                                                ))}


                                                                <h6 onClick={() => addInputField()}>+ ADD MORE</h6>
                                                                <div className="layout-button">
                                                                    <div className="btn_center">

                                                                        <button type="submit" className="btn btn-light-petrol btn-default btn-squared">Save</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </TabPanel>


                                                    {/* Work History Tab */}
                                                    <TabPanel className="tab-content">
                                                        <form onSubmit={updateWorkHistory}>
                                                            <div className="row">
                                                                {WHinputFields.map((data, index) => (
                                                                    <>
                                                                        <div className="col-md-6 mb-25">
                                                                            <input type="text" name="jobRole" value={data.jobRole} onChange={(evnt) => handleChangeForWH(index, evnt)} className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Role" />
                                                                        </div>
                                                                        <div className="col-md-6 mb-25">
                                                                            <input type="text" name="companyName" value={data.companyName} onChange={(evnt) => handleChangeForWH(index, evnt)} className="form-control ih-medium ip-gray radius-xs px-15" placeholder="Company Name" />
                                                                        </div>
                                                                        {/* <div className="col-md-6 mb-25">
                                                                            <input name="startDate" value={moment(data.startDate).format("DD/MM/YYYY")} onChange={(evnt) => handleChangeForWH(index, evnt)} onFocus={() => setType('date')}
                                                                                onBlur={() => setType('text')} type={type} className="form-control ih-medium ip-gray radius-xs px-15 date_time" placeholder="Start Date" />
                                                                        </div> */}
                                                                        <div className="col-md-6 mb-25">
                                                                            <input 
                                                                            onClick={() =>{
                                                                                setIndex(index)
                                                                                showCalc()}
                                                                            }
                                                                            value={moment(data.startDate).format("DD/MM/YYYY")} 
                                                                            // value={data.startDate}
                                                                            name="startDate"
                                                                            // onChange={(evnt) => handleChangeForWH(index, evnt)} 
                                                                            // onFocus={() => setType('date')}
                                                                            // onBlur={() => setType('text')} 
                                                                            // type={type} 
                                                                            className="form-control ih-medium ip-gray radius-xs px-15 date_time" 
                                                                            placeholder="Start Date" />
                                                                            {calc && (
                                                                                <Calendar onChange={e => {
                                                                                    onChange(e)
                                                                                    handleChangeForWHCalender(index, e)
                                                                                }} value={data.startDate} maxDate={new Date()} />
                                                                            )}
                                                                        </div>
                                                                        {/* <div className="col-md-6">
                                                                                <input onFocus={() => setType('date')}
                                                                                onBlur={() => setType('text')} type={type} name="endDate" value={moment(data.endDate).format("DD/MM/YYYY")} onChange={(evnt) => handleChangeForWH(index, evnt)} className="form-control ih-medium ip-gray radius-xs px-15 date_time" placeholder="End Date" disabled={data.isMyCurrentRole ? true: false} />
                                                                            <div >
                                                                                <input name='isMyCurrentRole' defaultChecked={data.isMyCurrentRole} onChange={(evnt) => handleChangeForWHCheck(index, evnt)} className="checkbox" type="checkbox" id="check-2" />
                                                                                <label for="check-2">
                                                                                    <span className="checkbox-text fw-600">This is my current role</span>
                                                                                </label>
                                                                            </div>
                                                                        </div> */}
                                                                        <div className="col-md-6 mb-25">
                                                                            
                                                                            <input 
                                                                            // onFocus={() => setType('date')}
                                                                            // onBlur={() => setType('text')} 
                                                                            // type={type} 
                                                                            // value={data.endDate}
                                                                            name="endDate"
                                                                            onClick={() =>{
                                                                                setIndex1(index)
                                                                                showCalc1()}
                                                                            } 
                                                                            value={moment(data.endDate).format("DD/MM/YYYY")} 
                                                                            // onChange={(evnt) => handleChangeForWH(index, evnt)} 
                                                                            className="form-control ih-medium ip-gray radius-xs px-15 date_time" 
                                                                            placeholder="End Date" 
                                                                            disabled={data.isMyCurrentRole ? true: false} />
                                                                      {calc1 && (
                                                                            <Calendar onChange={e => {
                                                                                onChange1(e)
                                                                                handleChangeForWHCalender1(index, e)
                                                                            }} value={data.endDate} maxDate={new Date()} />
                                                                        )}
                                                                        
                                                                        <div >
                                                                            <input name='isMyCurrentRole' defaultChecked={data.isMyCurrentRole} onChange={(evnt) => handleChangeForWHCheck(index, evnt)} className="checkbox" type="checkbox" id="check-2" />
                                                                            <label for="check-2">
                                                                                <span className="checkbox-text fw-600">This is my current role</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                        <div className="col-md-1 mb-25">
                                                                            <button type='button'onClick={() => {
                                                                                setDeleteIndex(index)
                                                                                showModal3()
                                                                                // deleteLanguage(index)
                                                                                }} class="btn btn-icon btn-danger btn-squared ms-10"><img src="/admin/static/media/delete.b1b3f65b6ae97f82f445da289c28da65.svg" alt="layers" class="svg"></img></button>
                                                                        </div>

                                                                        {/* <input type="checkbox" name="end_date" value={data.end_date} onChange={(evnt)=>handleChangeForEdu(index, evnt)} placeholder="End Date" /> */}


                                                                        <hr className='mb-4' />
                                                                    </>
                                                                ))}
                                                                <h6 onClick={() => addInputFieldWH()}>+ ADD MORE</h6>
                                                                <div className="layout-button">
                                                                    <div className="btn_center">

                                                                        <button type="submit" className="btn btn-light-petrol btn-default btn-squared">Save</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </TabPanel>


                                                    {/* Key Achivement Tab */}
                                                    <TabPanel className="tab-content">
                                                        <form onSubmit={updateAchivement}>
                                                            <div className="row">
                                                                {acCount.map((i, index) => {
                                                                    return (
                                                                        <>
                                                                        <div className="col-md-6 mb-25">
                                                                            <input type="text" name='achivement' onChange={(evnt) => handleChange(index, evnt)} value={i.achivement}
                                                                                className="form-control ih-medium ip-gray b-deep radius-xs px-15" placeholder="Add Achievement" />
                                                                        </div>
                                                                        <div className="col-md-1 mb-25">
                                                                            <button type='button' onClick={() => {
                                                                                setDeleteIndex(index)
                                                                                showModal4()
                                                                                // deleteLanguage(index)
                                                                                }} class="btn btn-icon btn-danger btn-squared ms-10"><img src="/admin/static/media/delete.b1b3f65b6ae97f82f445da289c28da65.svg" alt="layers" class="svg"></img></button>
                                                                        </div>
                                                                        <hr className='mb-4' />
                                                                    </>
                                                                    )
                                                                })}


                                                                <h6 onClick={() => addInputFieldAc()}>+ ADD MORE</h6>


                                                                <div className="layout-button">
                                                                    <div className="btn_center">

                                                                        <button type="submit" className="btn btn-light-petrol btn-default btn-squared">Save</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </TabPanel>
                                                </Tabs>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Side_Bar onClick={toggle} sideBarOpen={sideBarOpen} />
            <Modal show={showHello} onHide={closeModal}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
                <img src={detail_success}/>
              <h4 class="text-capitalize fw-800 mb-25 mt-10">
                Details are updated successfully.
              </h4>

              {/* <div class="layout-button justify-content-center">
                <button
                  type="button"
                  className="btn btn-no btn-default btn-squared"
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-yes btn-default btn-squared"
                >
                  Yes
                </button>
              </div> */}
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showHello1} onHide={closeModal1}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Are you sure you want to delete this field?</h4>
                        <div class="layout-button justify-content-center">
                            <button onClick={() => closeModal1()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => deleteLanguage(deleteIndex)} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                            {/* <button onClick={() => navigate('/edit_calender')} type="button" className="btn btn-yes btn-default btn-squared">Accept</button> */}
                        </div>
                    </div>

                </Modal.Body>
            </Modal>

        <Modal show={showHello2} onHide={closeModal2}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Are you sure you want to delete this field?</h4>
                        <div class="layout-button justify-content-center">
                            <button onClick={() => closeModal2()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => deleteEducation(deleteIndex)} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                            {/* <button onClick={() => navigate('/edit_calender')} type="button" className="btn btn-yes btn-default btn-squared">Accept</button> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        <Modal show={showHello3} onHide={closeModal3}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Are you sure you want to delete this field?</h4>
                        <div class="layout-button justify-content-center">
                            <button onClick={() => closeModal3()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => deleteWorkHistory(deleteIndex)} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                            {/* <button onClick={() => navigate('/edit_calender')} type="button" className="btn btn-yes btn-default btn-squared">Accept</button> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        <Modal show={showHello4} onHide={closeModal4}>
                <Modal.Header className="mentor_feedback" closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-600 mb-10">Are you sure you want to delete this field?</h4>
                        <div class="layout-button justify-content-center">
                            <button onClick={() => closeModal4()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => deleteAchivement(deleteIndex)} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                            {/* <button onClick={() => navigate('/edit_calender')} type="button" className="btn btn-yes btn-default btn-squared">Accept</button> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showHello5} onHide={closeModal5}>
          <Modal.Header className="mentee_feedback" closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
                <img src={detail_success}/>
              <h4 class="text-capitalize fw-800 mb-25 mt-10">
                Field Deleted Successfully.
              </h4>
            </div>
          </Modal.Body>
        </Modal>

        </div>

    );
}

export default Edit_Profile_Mentor;
