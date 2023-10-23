import team_img from '../../img/tm1.png';
import { BASE_URL } from '../../services/Config';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import authornav_img from '../../img/user_pic.png';
import loader from '../../img/gifs/loaderanimation';
import MultiRangeSlider from "multi-range-slider-react";
import ReactPaginate from 'react-paginate';
import Lottie from 'react-lottie';


const data = [
    { id: 1, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "221", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagment", mentee_hcm: "HCM", mentee_three: "+3" },
    { id: 2, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "221", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagment", mentee_hcm: "HCM", mentee_three: "+3" },
    { id: 3, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "221", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagment", mentee_hcm: "HCM", mentee_three: "+3" },
    { id: 4, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "221", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagment", mentee_hcm: "HCM", mentee_three: "+3" },
    { id: 5, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "221", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagment", mentee_hcm: "HCM", mentee_three: "+3" },
    { id: 6, mentee_name: "Skylar Geidt", mentee_position: "Sr. Manager - Human Resources", mentee_number: "221", mentee_skill: "Skills to Develop", mentee_employee: "Employee Engagment", mentee_hcm: "HCM", mentee_three: "+3" },
];
let workExp = ""
let locc = ""
let cSkilll = ""
let cSGkilll = ""
let bSkilll = ""
let bSGkilll = ""
function Mentee_Management() {
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [menteeList, setMenteeList] = useState([])
    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(35);
    const [showFilter, setShowFilter] = useState(false)
    const [coreSkills, setCoreSkills] = useState([])
    const [busSkills, setBusSkills] = useState([])
    const [workLocationList, setworkLocationList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [itemsPerPage] = useState(10);
    const showModal = () => {
        setShowFilter(prevStat => !prevStat)
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    useEffect(() => {
        const getAllLocationToFilter = async() => {
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
                    setworkLocationList(data.locations.split(','))
                }
            }
        }
        getAllLocationToFilter()
        getSkills()
    },[])

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
        // console.log(data)
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

    const handleInput = async (e) => {
        console.log(e)
        // return
        set_minValue(e.minValue)
        set_maxValue(e.maxValue)
        console.log(`${BASE_URL}mentor?minYearsOfExperience=${e.minValue}&maxYearsOfExperience=${e.maxValue}`)
        console.log(e)
        if(e == ""){
            workExp="" 
        }else{
            
        
            workExp = `minYearsOfExperience=${e.minValue}&maxYearsOfExperience=${e.maxValue}`
    }
        
        // workExp = `minYearOfExperience=${e.minValue}&minYearOfExperience=${e.maxValue}`
        let furl;

        // if (locc != "" || bSkilll != "" || cSkilll != "") {
        //     if (locc != "" || bSkilll == "" || cSkilll == "") {
        //         furl = workExp + "&" + locc
        //     }
        //     if (locc == "" || bSkilll != "" || cSkilll == "") {
        //         furl = bSkilll + "&" + workExp

        //     }
        //     if (locc == "" || bSkilll == "" || cSkilll != "") {
        //         furl = cSkilll + "&" + workExp

        //     }

        //     if (locc != "" || bSkilll != "" || cSkilll == "") {
        //         furl = workExp + "&" + bSkilll + "&" + locc
        //     }
        //     if (locc == "" || bSkilll != "" || cSkilll != "") {
        //         furl = cSkilll + "&" + bSkilll + "&" + workExp

        //     }
        //     if (locc != "" || bSkilll == "" || cSkilll != "") {
        //         furl = workExp + "&" + locc + "&" + cSkilll

        //     }

        //     if (locc != "" && locc != "" && cSkilll != "") {
        //         furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
        //     }
        // } else {
        //     furl = workExp
        // }

        if (locc != "" || bSkilll != "" || cSkilll != "" || bSGkilll != "" || cSGkilll != "") {
            if (locc != "" || bSkilll == "" || cSkilll == "" || bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = bSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = cSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = workExp + "&" + cSGkilll

            }

            if (locc != "" || bSkilll != "" || cSkilll == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (locc != "" || bSkilll == "" || cSkilll != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = cSkilll + "&" + locc + "&" + workExp

            }
            if (locc != "" || bSkilll == "" || cSkilll == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + workExp + "&" + locc

            }
            if (locc != "" || bSkilll == "" || cSkilll == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = locc + "&" + cSGkilll + "&" + workExp

            }
            if (locc == "" || bSkilll != "" || cSkilll != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll != "" || cSkilll == ""|| bSGkilll != "" || cSGkilll== "") {
                furl = bSkilll + "&" + workExp + "&" + bSGkilll

            }
            if (locc == "" || bSkilll != "" || cSkilll == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + workExp + "&" + cSGkilll

            }
            if (locc == "" || bSkilll == "" || cSkilll != ""|| bSGkilll != "" || cSGkilll == "") {
                furl = cSkilll + "&" + workExp + "&" + bSGkilll

            }
            if (locc == "" || bSkilll == "" || cSkilll != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = cSkilll + "&" + workExp + "&" + cSGkilll

            }
            if (locc == "" || bSkilll == "" || cSkilll == ""|| bSGkilll != "" || cSGkilll != "") {
                furl = workExp + "&" + bSGkilll + "&" + cSGkilll

            }

            if (locc != "" && cSGkilll != "" && cSGkilll != ""|| bSGkilll != "" || cSGkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll + "&" + bSGkilll + "&" + cSGkilll
            }
        } else {
            furl = workExp
        }

        console.log(furl)

        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMenteeList(response.data)
        }
    };
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
        getMentee()
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const getMentee = async () => {

        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}mentee?showInactiveUsers=true`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        setIsLoading(false)
        if (success) {
            setMenteeList(response.data)
        }
    }

    const ExpFilter = async (e) => {
        if(e == ""){
            workExp="" 
        }else{
            
        
            workExp = `yearsOfExperience=${e}`
    }
        // workExp = `yearsOfExperience=${e}`
        let furl;

        if (locc != "" || bSkilll != "" || cSkilll != "") {
            if (locc != "" || bSkilll == "" || cSkilll == "") {
                furl = workExp + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll == "") {
                furl = bSkilll + "&" + workExp

            }
            if (locc == "" || bSkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + workExp

            }

            if (locc != "" || bSkilll != "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (locc == "" || bSkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSkilll + "&" + workExp

            }
            if (locc != "" || bSkilll == "" || cSkilll != "") {
                furl = workExp + "&" + locc + "&" + cSkilll

            }

            if (locc != "" && locc != "" && cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
            }
        } else {
            furl = workExp
        }

        console.log(furl)
        console.log(e)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMenteeList(response.data)
        }
    }

    const WLFilter = async (e) => {
        console.log(e)
        if(e == ""){
            locc="" 
        }else{
            
        
            locc = `workLocation=${e}`
    }
        // locc = `workLocation=${e}`
        let furl;




        // if (workExp != "" || bSkilll != "" || cSkilll != "") {
        //     if (workExp != "" || bSkilll == "" || cSkilll == "") {
        //         furl = workExp + "&" + locc
        //     }
        //     if (workExp == "" || bSkilll != "" || cSkilll == "") {
        //         furl = bSkilll + "&" + locc

        //     }
        //     if (workExp == "" || bSkilll == "" || cSkilll != "") {
        //         furl = cSkilll + "&" + locc

        //     }

        //     if (workExp != "" || bSkilll != "" || cSkilll == "") {
        //         furl = workExp + "&" + bSkilll + "&" + locc
        //     }
        //     if (workExp == "" || bSkilll != "" || cSkilll != "") {
        //         furl = cSkilll + "&" + bSkilll + "&" + locc

        //     }
        //     if (workExp != "" || bSkilll == "" || cSkilll != "") {
        //         furl = workExp + "&" + locc + "&" + cSkilll

        //     }

        //     if (workExp != "" && locc != "" && cSkilll != "") {
        //         furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
        //     }
        // }
        // else {
        //     furl = locc
        // }

        if (workExp != "" || bSkilll != "" || cSkilll != "" || bSGkilll != "" || cSGkilll != "") {
            if (workExp != "" || bSkilll == "" || cSkilll == "" || bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + locc
            }
            if (workExp == "" || bSkilll != "" || cSkilll == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = bSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || cSkilll != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = cSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || cSkilll == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || cSkilll == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = locc + "&" + cSGkilll

            }

            if (workExp != "" || bSkilll != "" || cSkilll == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + locc
            }
            if (workExp != "" || bSkilll == "" || cSkilll != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = cSkilll + "&" + locc + "&" + workExp

            }
            if (workExp != "" || bSkilll == "" || cSkilll == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + workExp + "&" + locc

            }
            if (workExp != "" || bSkilll == "" || cSkilll == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = locc + "&" + cSGkilll + "&" + workExp

            }
            if (workExp == "" || bSkilll != "" || cSkilll != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll != "" || cSkilll == ""|| bSGkilll != "" || cSGkilll== "") {
                furl = bSkilll + "&" + locc + "&" + bSGkilll

            }
            if (workExp == "" || bSkilll != "" || cSkilll == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + locc + "&" + cSGkilll

            }
            if (workExp == "" || bSkilll == "" || cSkilll != ""|| bSGkilll != "" || cSGkilll == "") {
                furl = cSkilll + "&" + locc + "&" + bSGkilll

            }
            if (workExp == "" || bSkilll == "" || cSkilll != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = cSkilll + "&" + locc + "&" + cSGkilll

            }
            if (workExp == "" || bSkilll == "" || cSkilll == ""|| bSGkilll != "" || cSGkilll != "") {
                furl = locc + "&" + bSGkilll + "&" + cSGkilll

            }

            if (workExp != "" && locc != "" && cSkilll != ""|| bSGkilll != "" || cSGkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll + "&" + bSGkilll + "&" + cSGkilll
            }
        } else {
            furl = locc
        }

        console.log(furl)
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMenteeList(response.data)
        }
    }

    // const CSFilter = async (e) => {
    //     if(e == ""){
    //         cSkilll="" 
    //     }else{
            
        
    //         cSkilll = `coreSkills=${e}`
    // }
    //     console.log(e)
    //     // cSkilll = `coreSkills=${e}`
    //     let furl;

    //     if (workExp != "" || bSkilll != "" || locc != "") {
    //         if (workExp != "" || bSkilll == "" || locc == "") {
    //             furl = workExp + "&" + cSkilll
    //         }
    //         if (workExp == "" || bSkilll != "" || locc == "") {
    //             furl = bSkilll + "&" + cSkilll

    //         }
    //         if (workExp == "" || bSkilll == "" || locc != "") {
    //             furl = cSkilll + "&" + locc

    //         }

    //         if (workExp != "" || bSkilll != "" || locc == "") {
    //             furl = workExp + "&" + bSkilll + "&" + cSkilll
    //         }
    //         if (workExp == "" || bSkilll != "" || locc != "") {
    //             furl = cSkilll + "&" + bSkilll + "&" + locc

    //         }
    //         if (workExp != "" || bSkilll == "" || locc != "") {
    //             furl = workExp + "&" + locc + "&" + cSkilll

    //         }

    //         if (workExp != "" && locc != "" && cSkilll != "") {
    //             furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
    //         }
    //     } else {
    //         furl = cSkilll
    //     }

    //     console.log(furl)
    //     // return          
    //     const token = await localStorage.getItem("token")
    //     // console.log(token)
    //     const btoken = `Bearer ${token}`;

    //     const res = await fetch(`${BASE_URL}mentee?${furl}`, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //     })
    //     const response = await res.json()
    //     console.log(response)
    //     const { success } = response
    //     if (success) {
    //         setMenteeList(response.data)
    //     }
    // }

    const CSFilter = async (e) => {

        if(e == ""){
            cSkilll="" 
        }else{
            
        
            cSkilll = `coreSkills=${e}`
    }
        console.log(e)
        // cSkilll = `coreSkills=${e}`
        let furl;

        // if (workExp != "" || bSkilll != "" || locc != "") {
        //     if (workExp != "" || bSkilll == "" || locc == "") {
        //         furl = workExp + "&" + cSkilll
        //     }
        //     if (workExp == "" || bSkilll != "" || locc == "") {
        //         furl = bSkilll + "&" + cSkilll

        //     }
        //     if (workExp == "" || bSkilll == "" || locc != "") {
        //         furl = cSkilll + "&" + locc

        //     }

        //     if (workExp != "" || bSkilll != "" || locc == "") {
        //         furl = workExp + "&" + bSkilll + "&" + cSkilll
        //     }
        //     if (workExp == "" || bSkilll != "" || locc != "") {
        //         furl = cSkilll + "&" + bSkilll + "&" + locc

        //     }
        //     if (workExp != "" || bSkilll == "" || locc != "") {
        //         furl = workExp + "&" + locc + "&" + cSkilll

        //     }

        //     if (workExp != "" && locc != "" && cSkilll != "") {
        //         furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
        //     }
        // } else {
        //     furl = cSkilll
        // }

        if (workExp != "" || bSkilll != "" || locc != "" || bSGkilll != "" || cSGkilll != "") {
            if (workExp != "" || bSkilll == "" || locc == "" || bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + cSkilll
            }
            if (workExp == "" || bSkilll != "" || locc == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || bSkilll == "" || locc != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = cSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || locc == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = cSkilll + "&" + bSkilll

            }
            if (workExp == "" || bSkilll == "" || locc == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = cSkilll + "&" + cSGkilll

            }

            if (workExp != "" || bSkilll != "" || locc == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp != "" || bSkilll == "" || locc != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = cSkilll + "&" + locc + "&" + workExp

            }
            if (workExp != "" || bSkilll == "" || locc == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + workExp + "&" + cSkilll

            }
            if (workExp != "" || bSkilll == "" || locc == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = cSkilll + "&" + cSGkilll + "&" + workExp

            }
            if (workExp == "" || bSkilll != "" || locc != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSkilll + "&" + locc

            }
            if (workExp == "" || bSkilll != "" || locc == ""|| bSGkilll != "" || cSGkilll== "") {
                furl = bSkilll + "&" + cSkilll + "&" + bSGkilll

            }
            if (workExp == "" || bSkilll != "" || locc == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSkilll + "&" + cSGkilll

            }
            if (workExp == "" || bSkilll == "" || locc != ""|| bSGkilll != "" || cSGkilll == "") {
                furl = cSkilll + "&" + locc + "&" + bSGkilll

            }
            if (workExp == "" || bSkilll == "" || locc != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = cSkilll + "&" + locc + "&" + cSGkilll

            }
            if (workExp == "" || bSkilll == "" || locc == ""|| bSGkilll != "" || cSGkilll != "") {
                furl = cSkilll + "&" + bSGkilll + "&" + cSGkilll

            }

            if (workExp != "" && locc != "" && bSkilll != ""|| bSGkilll != "" || cSGkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll + "&" + bSGkilll + "&" + cSGkilll
            }
        } else {
            furl = cSkilll
        }

        console.log(furl)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMenteeList(response.data)
        }
    }

    const CSGFilter = async (e) => {

        if(e == ""){
            cSGkilll="" 
        }else{
            
        
            cSGkilll = `alternateCoreSkills=${e}`
    }
        console.log(e)
        // cSkilll = `coreSkills=${e}`
        let furl;

        // if (workExp != "" || bSkilll != "" || locc != "") {
        //     if (workExp != "" || bSkilll == "" || locc == "") {
        //         furl = workExp + "&" + cSkilll
        //     }
        //     if (workExp == "" || bSkilll != "" || locc == "") {
        //         furl = bSkilll + "&" + cSkilll

        //     }
        //     if (workExp == "" || bSkilll == "" || locc != "") {
        //         furl = cSkilll + "&" + locc

        //     }

        //     if (workExp != "" || bSkilll != "" || locc == "") {
        //         furl = workExp + "&" + bSkilll + "&" + cSkilll
        //     }
        //     if (workExp == "" || bSkilll != "" || locc != "") {
        //         furl = cSkilll + "&" + bSkilll + "&" + locc

        //     }
        //     if (workExp != "" || bSkilll == "" || locc != "") {
        //         furl = workExp + "&" + locc + "&" + cSkilll

        //     }

        //     if (workExp != "" && locc != "" && cSkilll != "") {
        //         furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
        //     }
        // } else {
        //     furl = cSkilll
        // }

        if (workExp != "" || bSkilll != "" || locc != "" || bSGkilll != "" || cSkilll != "") {
            if (workExp != "" || bSkilll == "" || locc == "" || bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + cSGkilll
            }
            if (workExp == "" || bSkilll != "" || locc == ""|| bSGkilll == "" || cSkilll == "") {
                furl = bSkilll + "&" + cSGkilll

            }
            if (workExp == "" || bSkilll == "" || locc != ""|| bSGkilll == "" || cSkilll == "") {
                furl = cSGkilll + "&" + locc

            }
            if (workExp == "" || bSkilll == "" || locc == ""|| bSGkilll != "" || cSkilll == "") {
                furl = cSGkilll + "&" + bSkilll

            }
            if (workExp == "" || bSkilll == "" || locc == ""|| bSGkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + cSGkilll

            }

            if (workExp != "" || bSkilll != "" || locc == ""|| bSGkilll == "" || cSkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + cSGkilll
            }
            if (workExp != "" || bSkilll == "" || locc != ""|| bSGkilll == "" || cSkilll == "") {
                furl = cSGkilll + "&" + locc + "&" + workExp

            }
            if (workExp != "" || bSkilll == "" || locc == ""|| bSGkilll != "" || cSkilll == "") {
                furl = bSGkilll + "&" + workExp + "&" + cSGkilll

            }
            if (workExp != "" || bSkilll == "" || locc == ""|| bSGkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + cSGkilll + "&" + workExp

            }
            if (workExp == "" || bSkilll != "" || locc != ""|| bSGkilll == "" || cSkilll != "") {
                furl = bSkilll + "&" + cSGkilll + "&" + locc

            }
            if (workExp == "" || bSkilll != "" || locc == ""|| bSGkilll != "" || cSkilll== "") {
                furl = bSkilll + "&" + cSGkilll + "&" + bSGkilll

            }
            if (workExp == "" || bSkilll != "" || locc == ""|| bSGkilll == "" || cSkilll != "") {
                furl = bSkilll + "&" + cSkilll + "&" + cSGkilll

            }
            if (workExp == "" || bSkilll == "" || locc != ""|| bSGkilll != "" || cSkilll == "") {
                furl = cSGkilll + "&" + locc + "&" + bSGkilll

            }
            if (workExp == "" || bSkilll == "" || locc != ""|| bSGkilll == "" || cSkilll != "") {
                furl = cSkilll + "&" + locc + "&" + cSGkilll

            }
            if (workExp == "" || bSkilll == "" || locc == ""|| bSGkilll != "" || cSkilll != "") {
                furl = cSkilll + "&" + bSGkilll + "&" + cSGkilll

            }

            if (workExp != "" && locc != "" && bSkilll != ""|| bSGkilll != "" || cSkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll + "&" + bSGkilll + "&" + cSGkilll
            }
        } else {
            furl = cSGkilll
        }

        console.log(furl)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMenteeList(response.data)
        }
    }


    // const BSFilter = async (e) => {
        
    //     if(e == ""){
    //         bSkilll="" 
    //     }else{
            
        
    //         bSkilll = `businessSkills=${e}`
    // }
    //     // bSkilll = `businessSkills=${e}`
    //     let furl;


    //     if (workExp != "" || cSkilll != "" || locc != "") {
    //         if (workExp != "" || cSkilll == "" || locc == "") {
    //             furl = workExp + "&" + bSkilll
    //         }
    //         if (workExp == "" || cSkilll != "" || locc == "") {
    //             furl = bSkilll + "&" + cSkilll

    //         }
    //         if (workExp == "" || cSkilll == "" || locc != "") {
    //             furl = bSkilll + "&" + locc

    //         }

    //         if (workExp != "" || cSkilll != "" || locc == "") {
    //             furl = workExp + "&" + bSkilll + "&" + cSkilll
    //         }
    //         if (workExp == "" || cSkilll != "" || locc != "") {
    //             furl = bSkilll + "&" + cSkilll + "&" + locc

    //         }
    //         if (workExp != "" || cSkilll == "" || locc != "") {
    //             furl = workExp + "&" + locc + "&" + bSkilll

    //         }

    //         if (workExp != "" && locc != "" && cSkilll != "") {
    //             furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
    //         }
    //     } else {
    //         furl = bSkilll
    //     }
    //     console.log(furl)
    //     // return          
    //     const token = await localStorage.getItem("token")
    //     // console.log(token)
    //     const btoken = `Bearer ${token}`;

    //     const res = await fetch(`${BASE_URL}mentee?${furl}`, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //     })
    //     const response = await res.json()
    //     console.log(response)
    //     const { success } = response
    //     if (success) {
    //         setMenteeList(response.data)
    //     }
    // }

    const BSFilter = async (e) => {
        console.log(e)

        if(e == ""){
            bSkilll="" 
        }else{
            
        
            bSkilll = `businessSkills=${e}`
    }
        let furl;


        // if (workExp != "" || cSkilll != "" || locc != "") {
        //     if (workExp != "" || cSkilll == "" || locc == "") {
        //         furl = workExp + "&" + bSkilll
        //     }
        //     if (workExp == "" || cSkilll != "" || locc == "") {
        //         furl = bSkilll + "&" + cSkilll

        //     }
        //     if (workExp == "" || cSkilll == "" || locc != "") {
        //         furl = bSkilll + "&" + locc

        //     }

        //     if (workExp != "" || cSkilll != "" || locc == "") {
        //         furl = workExp + "&" + bSkilll + "&" + cSkilll
        //     }
        //     if (workExp == "" || cSkilll != "" || locc != "") {
        //         furl = bSkilll + "&" + cSkilll + "&" + locc

        //     }
        //     if (workExp != "" || cSkilll == "" || locc != "") {
        //         furl = workExp + "&" + locc + "&" + bSkilll

        //     }

        //     if (workExp != "" && locc != "" && cSkilll != "") {
        //         furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll
        //     }
        // } else {
        //     furl = bSkilll
        // }

        if (workExp != "" || cSkilll != "" || locc != "" || bSGkilll != "" || cSGkilll != "") {
            if (workExp != "" || cSkilll == "" || locc == "" || bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + bSkilll
            }
            if (workExp == "" || cSkilll != "" || locc == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = bSkilll + "&" + cSkilll

            }
            if (workExp == "" || cSkilll == "" || locc != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = bSkilll + "&" + locc

            }
            if (workExp == "" || cSkilll == "" || locc == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSkilll + "&" + bSkilll

            }
            if (workExp == "" || cSkilll == "" || locc == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSGkilll

            }

            if (workExp != "" || cSkilll != "" || locc == ""|| bSGkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + bSkilll + "&" + cSkilll
            }
            if (workExp != "" || cSkilll == "" || locc != ""|| bSGkilll == "" || cSGkilll == "") {
                furl = bSkilll + "&" + locc + "&" + workExp

            }
            if (workExp != "" || cSkilll == "" || locc == ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSkilll + "&" + workExp + "&" + bSkilll

            }
            if (workExp != "" || cSkilll == "" || locc == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSGkilll + "&" + workExp

            }
            if (workExp == "" || cSkilll != "" || locc != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSkilll + "&" + locc

            }
            if (workExp == "" || cSkilll != "" || locc == ""|| bSGkilll != "" || cSGkilll== "") {
                furl = bSkilll + "&" + cSkilll + "&" + bSkilll

            }
            if (workExp == "" || cSkilll != "" || locc == ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + cSkilll + "&" + cSGkilll

            }
            if (workExp == "" || cSkilll == "" || locc != ""|| bSGkilll != "" || cSGkilll == "") {
                furl = bSkilll + "&" + locc + "&" + bSkilll

            }
            if (workExp == "" || cSkilll == "" || locc != ""|| bSGkilll == "" || cSGkilll != "") {
                furl = bSkilll + "&" + locc + "&" + cSGkilll

            }
            if (workExp == "" || cSkilll == "" || locc == ""|| bSGkilll != "" || cSGkilll != "") {
                furl = bSkilll + "&" + bSkilll + "&" + cSGkilll

            }

            if (workExp != "" && locc != "" && cSkilll != ""|| bSGkilll != "" || cSGkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll + "&" + bSGkilll + "&" + cSGkilll
            }
        } else {
            furl = bSkilll
        }

        console.log(furl)         
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMenteeList(response.data)
        }
    }

    const BSGFilter = async (e) => {
        console.log(e)

        if(e == ""){
            bSGkilll="" 
        }else{
            
        
            bSGkilll = `alternateBusinessSkills=${e}`
    }
        // bSkilll = `businessSkills=${e}`
        let furl;


        if (workExp != "" || cSkilll != "" || locc != "" || bSkilll != "" || cSGkilll != "") {
            if (workExp != "" || cSkilll == "" || locc == "" || bSkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + bSGkilll
            }
            if (workExp == "" || cSkilll != "" || locc == ""|| bSkilll == "" || cSGkilll == "") {
                furl = bSGkilll + "&" + cSkilll

            }
            if (workExp == "" || cSkilll == "" || locc != ""|| bSkilll == "" || cSGkilll == "") {
                furl = bSGkilll + "&" + locc

            }
            if (workExp == "" || cSkilll == "" || locc == ""|| bSkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + bSkilll

            }
            if (workExp == "" || cSkilll == "" || locc == ""|| bSkilll == "" || cSGkilll != "") {
                furl = bSGkilll + "&" + cSGkilll

            }

            if (workExp != "" || cSkilll != "" || locc == ""|| bSkilll == "" || cSGkilll == "") {
                furl = workExp + "&" + bSGkilll + "&" + cSkilll
            }
            if (workExp != "" || cSkilll == "" || locc != ""|| bSkilll == "" || cSGkilll == "") {
                furl = bSGkilll + "&" + locc + "&" + workExp

            }
            if (workExp != "" || cSkilll == "" || locc == ""|| bSkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + workExp + "&" + bSkilll

            }
            if (workExp != "" || cSkilll == "" || locc == ""|| bSkilll == "" || cSGkilll != "") {
                furl = bSGkilll + "&" + cSGkilll + "&" + workExp

            }
            if (workExp == "" || cSkilll != "" || locc != ""|| bSkilll == "" || cSGkilll != "") {
                furl = bSGkilll + "&" + cSkilll + "&" + locc

            }
            if (workExp == "" || cSkilll != "" || locc == ""|| bSkilll != "" || cSGkilll== "") {
                furl = bSGkilll + "&" + cSkilll + "&" + bSkilll

            }
            if (workExp == "" || cSkilll != "" || locc == ""|| bSkilll == "" || cSGkilll != "") {
                furl = bSGkilll + "&" + cSkilll + "&" + cSGkilll

            }
            if (workExp == "" || cSkilll == "" || locc != ""|| bSkilll != "" || cSGkilll == "") {
                furl = bSGkilll + "&" + locc + "&" + bSkilll

            }
            if (workExp == "" || cSkilll == "" || locc != ""|| bSkilll == "" || cSGkilll != "") {
                furl = bSGkilll + "&" + locc + "&" + cSGkilll

            }
            if (workExp == "" || cSkilll == "" || locc == ""|| bSkilll != "" || cSGkilll != "") {
                furl = bSGkilll + "&" + bSkilll + "&" + cSGkilll

            }

            if (workExp != "" && locc != "" && cSkilll != ""|| bSkilll != "" || cSGkilll != "") {
                furl = workExp + "&" + cSkilll + "&" + locc + "&" + bSkilll + "&" + bSGkilll + "&" + cSGkilll
            }
        } else {
            furl = bSGkilll
        }
        console.log(furl)
        // return          
        const token = await localStorage.getItem("token")
        // console.log(token)
        const btoken = `Bearer ${token}`;

        const res = await fetch(`${BASE_URL}mentee?${furl}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        console.log(response)
        const { success } = response
        if (success) {
            setMenteeList(response.data)
        }
    }

    const goToProfile = (id) => {
        navigate('/mentee_profile', { state: id })
    }

    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = menteeList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(menteeList.length / itemsPerPage);


      // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % menteeList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded mt-30">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                        <h4 className="text-capitalize fw-500 breadcrumb-title">Mentees</h4>
                                    </div>
                                </div>

                                <NavLink className="navbar-link" to="/add_mentee">
                                    <div className="action-btn">
                                        <div className="btn px-15 btn-primary">Add Mentee</div>

                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card card-Vertical card-default card-md mb-4">
                                <div className="">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                <div onClick={() =>  showModal()} style={{border: '1px solid #beb9b9', padding: "6px", borderRadius: '5px', fontSize: '14px'}} className="">
                                                    <span className="nav-item__title">Experience    <i className="las la-angle-down nav-item__arrow" style={{float:'right', marginTop:'3px'}}></i></span>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => WLFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Location</option>
                                                        {workLocationList.map((i) => (
                                                                    <option value={i}>{i}</option>
                                                                ))}
                                                        {/* <option value="delhi">New Delhi</option>
                                                        <option value="mumbai">Mumbai</option> */}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select className="form-select custom_selects" aria-label="Default select example">
                                                        <option selected>Growth Score</option>
                                                        <option value="1">9 Score</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => CSFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Core Skills Need to Develop</option>
                                                        {coreSkills.map((i) => (
                                                                    <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                ))}
                                                        {/* <option value="react">React</option>
                                                        <option value="node">Node</option>
                                                        <option value="php">PHP</option> */}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => CSGFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Core Skills Good At</option>
                                                        {coreSkills.map((i) => (
                                                                    <option value={i.skill}>{i.skill}</option>
                                                                ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => BSFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Business Skills Need to Develop</option>
                                                        {busSkills.map((i) => (
                                                                    <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                ))}
                                                        {/* <option value="coding">Coding</option>
                                                        <option value="production">Production</option> */}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 col-md-4 mb-15">
                                                <div className="countryOption">
                                                    <select onChange={e => BSGFilter(e.target.value)} className="form-select custom_selects" aria-label="Default select example">
                                                        <option value="">Business Skills Good At</option>
                                                        {busSkills.map((i) => (
                                                                    <option value={i.skill.replace("&",'%26')}>{i.skill}</option>
                                                                ))}
                                                    </select>
                                                </div>
                                            </div>

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
                        </div>

                        {isLoading ? <Lottie 
                            options={defaultOptions}
                            height={100}
                            width={100}
                        /> : 
                        <>
                        {menteeList && currentItems.map((user) => (
                            <div className="col-lg-4 col-sm-4 col-md-12 mb-25">
                                <div className="user-group px-25 pt-25 pb-20 radius-xl box_shadow1">
                                    <div className="media user-group-media d-flex justify-content-between">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={user.imageUrl == "" ? authornav_img : user.imageUrl} className="me-20 wh-70 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <a href="#">
                                                    <h6 className="mt-0  fw-500">{user.name}</h6>
                                                </a>
                                                <p className="fs-13 color-light mb-0">{user.jobTitle.substring(0, 30)}{user.jobTitle.length > 30 ? "...": ""}</p>
                                                <span className="badge badge-round btn-sky mt-10">{user.scores}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-group-people">
                                        <p className="mt-15">Skill to Develop</p>
                                        <ul className="d-flex flex-wrap mb-15 user-group-people__parent">
                                            {user.skills.slice(0,3).map((i) => (
                                                <span className="badge badge-square btn-outline-emlpoy me-10">{i.toDevelop && i.skill}</span>
                                            ))}
                                            {user.skills.length > 3  ?
                                                <span className="badge badge-square btn-outline-emlpoy me-10">+{user.skills.length - 3}</span> : null
                                            }
                                            {user.skills.length == "0" && (
                                                <div style={{ height: '20px' }}></div>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="layout-button">
                                        <button onClick={() => goToProfile(user.id)} type="button" className="btn btn-default btn-squared color-primary btn-outline-primary flex-grow-1">View Profile</button>
                                        <button onClick={() => navigate("/chat", {state: user})} type="button" className="btn btn-primary btn-default btn-squared flex-grow-1">Chat</button>
                                    </div>
                                </div>
                            </div>

                        ))}
                        </>
                        }




                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="user-pagination">
                                <div className="d-flex justify-content-md-end justify-content-center mt-1 mb-30">
                                    <ReactPaginate
                                        nextLabel="Next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={pageCount}
                                        previousLabel="< Previous"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        renderOnZeroPageCount={null}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {showFilter ?
                    <div className="filter_box_exp">
                        <div className="products_page product_page--grid mb-30">
                            <div className="1">
                                <div className="1">
                                    <div className="1">
                                        <div className="widget box_shadow1">
                                            <div className="category_sidebar">
                                                <div className="product-sidebar-widget mb-10">
                                                <MultiRangeSlider
                                                        min={0}
                                                        max={35}
                                                        step={1}
                                                        label={false}
                                                        ruler={false}
                                                        barInnerColor={'#72b8bf'}
                                                        style={{ boxShadow: 'none', padding: '13px 10px', borderRadius: "6px", border:'none' }}
                                                        minValue={minValue}
                                                        maxValue={maxValue}
                                                        onChange={(e) => {
                                                            handleInput(e);
                                                        }}
                                                    />
                                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                                        <p>min:{minValue}</p>
                                                        <p>max:{maxValue}</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""}
            </div>

            <Side_Bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>





    );
}

export default Mentee_Management;
