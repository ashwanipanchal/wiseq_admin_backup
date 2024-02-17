import edit_img from "../../img/edit_connect.svg";
import horizontal_img from "../../img/svg/more-verticals.svg";
import zoom_img from "../../img/zoom.svg";
import teamlogo_img from "../../img/team_logo.svg";
import save_img from "../../img/save.svg";
import connect_img from "../../img/connect.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Accordion from "react-bootstrap/Accordion";
import { BASE_URL } from "../../services/Config";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from 'react-bootstrap/Modal';
import { Chart } from "react-google-charts";
ChartJS.register(ArcElement, Tooltip, Legend);

const dataq = [
  {
    id: 1,
    program_id: "22/2/23",
    program_name: "₹ 10,000",
    skills: "Online",
    duration: "#1435688989",
    type: "+65 9842 5421",
  },
];



const data1 = [
  { id: 1, app_name: "Zoom", app_install: "Installed", edit_btn: "Edit" },
  { id: 2, app_name: "Zoom", app_install: "Installed", edit_btn: "Edit" },
  { id: 3, app_name: "Zoom", app_install: "Installed", edit_btn: "Edit" },
  { id: 4, app_name: "Zoom", app_install: "Installed", edit_btn: "Edit" },
];

const data2 = [
  { id: 1, app_team: "Teams", connect_btn: "Connect" },
  { id: 2, app_team: "Teams", connect_btn: "Connect" },
  { id: 3, app_team: "Teams", connect_btn: "Connect" },
  { id: 4, app_team: "Teams", connect_btn: "Connect" },
];

const data3 = [
  {
    id: 1,
    faq_heading: "Default Growth score settings (for Mentees)",
    setting: false,
  },
  {
    id: 2,
    faq_heading: "Default Impact Score Settings (for Mentors)",
    setting: false,
  },
  { id: 3, faq_heading: "Other default settings", setting: true },
];

const data4 = [
  {
    id: 1,
    faq_heading: "How can we help you?",
    faq_para:
      "Describe your issue. Learn what to do if you're having trouble getting back on WiseQ Platform. Get Help. Account Settings · Login and Password · Privacy and Security and lot more.. We are here to support you in the best possible way!",
  },
  {
    id: 2,
    faq_heading: "Account Settings",
    faq_para:
      "Describe your issue. Learn what to do if you're having trouble getting back on WiseQ Platform. Get Help. Account Settings · Login and Password · Privacy and Security and lot more.. We are here to support you in the best possible way!",
  },
  {
    id: 3,
    faq_heading: "Privacy & Security",
    faq_para:
      "Describe your issue. Learn what to do if you're having trouble getting back on WiseQ Platform. Get Help. Account Settings · Login and Password · Privacy and Security and lot more.. We are here to support you in the best possible way!",
  },
  {
    id: 4,
    faq_heading: "Reports, Assessments, Learning related support",
    faq_para:
      "Describe your issue. Learn what to do if you're having trouble getting back on WiseQ Platform. Get Help. Account Settings · Login and Password · Privacy and Security and lot more.. We are here to support you in the best possible way!",
  },
  {
    id: 5,
    faq_heading: "Common Questions, FAQs",
    faq_para:
      "Describe your issue. Learn what to do if you're having trouble getting back on WiseQ Platform. Get Help. Account Settings · Login and Password · Privacy and Security and lot more.. We are here to support you in the best possible way!",
  },
];

function Setting_Screen() {

  const navigate = useNavigate();
  const [languageChartData, setLanguageChartData] = useState({})
  const [menteeChartData, setMenteeChartData] = useState({})
  const [mentorChartData, setMentorChartData] = useState({})
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [indexValue, setIndexValue] = useState(-1);
  const [indexValue1, setIndexValue1] = useState(-1);
  const [superAdminList, setSuperAdminList] = useState([]);
  const [levels, setLevels] = useState("");
  const [fAreas, setFAreas] = useState("");
  const [locations, setLocation] = useState("");
  const [countries, setCountries] = useState("");
  const [division, setDivisions] = useState("");
  const [fSKills, setFSkills] = useState("");
  const [bSkills, setBSKills] = useState("");
  const [tools, settools] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [fullInfo, setFullInfo] = useState({});
  const [deletedID, setdeletedID] = useState("");

   //growth SCore Mentee State
   const [meOneToOne, setmeOneToOne] = useState("");
   const [meGroupSes, setmeGroupSes] = useState("");
   const [meWorksheetComp, setmeWorksheetComp] = useState("");
   const [mePodcast, setmePodcast] = useState("");
   const [meArticle, setmeArticle] = useState("");
   const [meVideo, setmeVideo] = useState("");
   const [meCaseStudy, setmeCaseStudy] = useState("");
   const [meicourse1m, setmeicourse1m] = useState("")
   const [meicourse2m, setmeicourse2m] = useState("")
   const [meicourse3m, setmeicourse3m] = useState("")
   const [meicourse3to6m, setmeicourse3to6m] = useState("")
   const [meicourseGt6m, setmeicourseGt6m] = useState("")
   const [mequickAsses, setmequickAsses] = useState("")
   const [meshortAsses, setmeshortAsses] = useState("")
   const [meLenghtlyAsses, setmeLenghtlyAsses] = useState("")
   const [meidpCreation, setmeidpCreation] = useState("")
   const [meprogramRatingFeedback, setmeprogramRatingFeedback] = useState("")
   const [mePromotionChange, setmePromotionChange] = useState("")
 
     //Impact SCore Mentor State
     const [mrOneToOne, setmrOneToOne] = useState("");
     const [mrGroupSes, setmrGroupSes] = useState("");
     const [mrreviewWorksheet, setmrreviewWorksheet] = useState("");
     const [mrPodcast, setmrPodcast] = useState("");
     const [mrArticle, setmrArticle] = useState("");
     const [mrVideo, setmrVideo] = useState("");
     const [mrCaseStudy, setmrCaseStudy] = useState("");
     const [mricourse1m, setmricourse1m] = useState("")
     const [mricourse2m, setmricourse2m] = useState("")
     const [mricourse3m, setmricourse3m] = useState("")
     const [mricourse3to6m, setmricourse3to6m] = useState("")
     const [mricourseGt6m, setmricourseGt6m] = useState("")
     const [mrquickAsses, setmrquickAsses] = useState("")
     const [mrshortAsses, setmrshortAsses] = useState("")
     const [mrLenghtlyAsses, setmrLenghtlyAsses] = useState("")
     const [mridpCreation, setmridpCreation] = useState("")
     const [mrprogramRatingFeedback, setmrprogramRatingFeedback] = useState("")
     const [mrPromotionChange, setmrPromotionChange] = useState("")
 
     //Other Default State
     const [profileLt50, setprofileLt50] = useState("");
     const [profile50to75, setprofile50to75] = useState("");
     const [profile75to90, setprofile75to90] = useState("");
     const [profile90to100, setprofile90to100] = useState("");
     const [completePrefrence, setcompletePrefrence] = useState("");
     const [onboardVideo, setonboardVideo] = useState("");
     const [recivedTestimonial, setrecivedTestimonial] = useState("");
     const [ratingSession, setratingSession] = useState("");
     const [ratingLearning, setratingLearning] = useState("");
     const [completeSurvey, setcompleteSurvey] = useState("");
     const [worksheetUpload, setworksheetUpload] = useState("");
     const [writeTestimonial, setwriteTestimonial] = useState("");
     const [giveFeedback, setgiveFeedback] = useState("");
     const [sessionRescheduleByMentor, setsessionRescheduleByMentor] = useState("");
  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  useEffect(() => {
    const getDetails = async () => {
      const token = await localStorage.getItem("token");
      const btoken = `Bearer ${token}`;
      const res = await fetch(`${BASE_URL}organisation-info`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: btoken,
        },
      });
      const response = await res.json();
      const { success, data } = response;
      // console.log(response)
      if (success) {
        if (data) {
          setLevels(data.levels);
          settools(data.tools);
          setFAreas(data.functionalAreas);
          setLocation(data.locations);
          setCountries(data.countries);
          setDivisions(data.divisions);
          setFSkills(data.coreSkills);
          setBSKills(data.businessSkills);
        }
      }
    };

    getDetails();
    getCompanyProfile()
    scoreDetails()
  }, []);

  const scoreDetails = async() => {
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;
    const res = await fetch(`${BASE_URL}org-settings/customize`,{
        method:'GET',
        headers:{
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        },
    })
    const response = await res.json()
    const{success, data} = response
    console.log("Default Score Res", response)
    if(success){
        if(data){
            //other setting
            setprofileLt50(data?.customize?.otherDefault?.profileL50)
            setprofile50to75(data?.customize?.otherDefault?.profile50to75)
            setprofile75to90(data?.customize?.otherDefault?.profile75to90)
            setprofile90to100(data?.customize?.otherDefault?.profileG90)
            setcompletePrefrence(data?.customize?.otherDefault?.completePreference)
            setonboardVideo(data?.customize?.otherDefault?.watchOnboardVideo)
            setrecivedTestimonial(data?.customize?.otherDefault?.recieveTestimonial)
            setratingSession(data?.customize?.otherDefault?.ratingSession)
            setratingLearning(data?.customize?.otherDefault?.ratingLearning)
            setcompleteSurvey(data?.customize?.otherDefault?.completeSurvey)

            //mentor setting
            setmrOneToOne(data?.customize?.impactScore?.oneToOneSesion)
            setmrGroupSes(data?.customize?.impactScore?.groupSesions)
            setmrreviewWorksheet(data?.customize?.impactScore?.sesionWorksheet)
            setmrPodcast(data?.customize?.impactScore?.podcast)
            setmrArticle(data?.customize?.impactScore?.article)
            setmrVideo(data?.customize?.impactScore?.video)
            setmrCaseStudy(data?.customize?.impactScore?.caseStudy)
            setmricourse1m(data?.customize?.impactScore?.course1m)
            setmricourse2m(data?.customize?.impactScore?.course2m)
            setmricourse3m(data?.customize?.impactScore?.course3m)
            setmricourse3to6m(data?.customize?.impactScore?.course3to6m)
            setmricourseGt6m(data?.customize?.impactScore?.courseGt6m)
            setmrquickAsses(data?.customize?.impactScore?.smallAssessment)
            setmrshortAsses(data?.customize?.impactScore?.mediumAssessment)
            setmrLenghtlyAsses(data?.customize?.impactScore?.largeAssessment)
            setmridpCreation(data?.customize?.impactScore?.idpCreationScore)
            setmrprogramRatingFeedback(data?.customize?.impactScore?.ratingFeedbackScore)
            setmrPromotionChange(data?.customize?.impactScore?.promotionScore)

            //mentee setting
            setmeOneToOne(data?.customize?.growthScore?.oneToOneSesion)
            setmeGroupSes(data?.customize?.growthScore?.groupSesions)
            setmeWorksheetComp(data?.customize?.growthScore?.sesionWorksheet)
            setmePodcast(data?.customize?.growthScore?.podcast)
            setmeArticle(data?.customize?.growthScore?.article)
            setmeVideo(data?.customize?.growthScore?.video)
            setmeCaseStudy(data?.customize?.growthScore?.caseStudy)
            setmeicourse1m(data?.customize?.growthScore?.course1m)
            setmeicourse2m(data?.customize?.growthScore?.course2m)
            setmeicourse3m(data?.customize?.growthScore?.course3m)
            setmeicourse3to6m(data?.customize?.growthScore?.course3to6m)
            setmeicourseGt6m(data?.customize?.growthScore?.courseGt6m)
            setmequickAsses(data?.customize?.growthScore?.smallAssessment)
            setmeshortAsses(data?.customize?.growthScore?.mediumAssessment)
            setmeLenghtlyAsses(data?.customize?.growthScore?.largeAssessment)
            setmeidpCreation(data?.customize?.growthScore?.idpCreationScore)
            setmeprogramRatingFeedback(data?.customize?.growthScore?.ratingFeedbackScore)
            setmePromotionChange(data?.customize?.growthScore?.promotionScore)
        }
    }
}

const [showHello, setShowHello] = useState("");
const closeDeleteConfirmModal = () => setShowHello(false);
const showDeleteConfirmModal = () => setShowHello(true);


const updateScoreInfo = async() => {
  const token = await localStorage.getItem("token")
  const btoken = `Bearer ${token}`;
        const body = {
          "customize": {
              "growthScore":{
                  "article" : parseInt(meArticle),
                  "caseStudy" :parseInt(meCaseStudy),
                  "course1m" : parseInt(meicourse1m),
                  "course2m": parseInt(meicourse2m),
                  "course3m" : parseInt(meicourse3m),
                  "course3to6m" : parseInt(meicourse3to6m),
                  "courseGt6m" : parseInt(meicourseGt6m),  
                  "groupSesions" : parseInt(meGroupSes),
                  "idpCreationScore" : parseInt(meidpCreation), 
                  "largeAssessment" : parseInt(meLenghtlyAsses),  
                  "mediumAssessment" : parseInt(meshortAsses),
                  "oneToOneSesion" : parseInt(meOneToOne),
                  "podcast" : parseInt(mePodcast),
                  "promotionScore" : parseInt(mePromotionChange),
                  "ratingFeedbackScore" : parseInt(meprogramRatingFeedback),
                  "scoreForLearningAwardBool": true,
                  "scoreForSessionAwardBool" : false,
                  "sesionWorksheet": parseInt(meWorksheetComp),
                  "smallAssessment": parseInt(mequickAsses),
                  "video": parseInt(meVideo)
              },
              "impactScore":{
                  "article" : parseInt(mrArticle),
                  "caseStudy" :parseInt(mrCaseStudy),
                  "course1m" : parseInt(mricourse1m),
                  "course2m": parseInt(mricourse2m),
                  "course3m" : parseInt(mricourse3m),
                  "course3to6m" : parseInt(mricourse3to6m),
                  "courseGt6m" : parseInt(mricourseGt6m),  
                  "groupSesions" : parseInt(mrGroupSes),
                  "idpCreationScore" : parseInt(mridpCreation), 
                  "largeAssessment" : parseInt(mrLenghtlyAsses),  
                  "mediumAssessment" : parseInt(mrshortAsses),
                  "oneToOneSesion" : parseInt(mrOneToOne),
                  "podcast" : parseInt(mrPodcast),
                  "promotionScore" : parseInt(mrPromotionChange),
                  "ratingFeedbackScore" : parseInt(mrprogramRatingFeedback),
                  "scoreForLearningAwardBool": true,
                  "scoreForSessionAwardBool" : false,
                  "sesionWorksheet": parseInt(mrreviewWorksheet),
                  "smallAssessment": parseInt(mrquickAsses),
                  "video": parseInt(mrVideo)
              },
              "otherDefault": {
                 
                  "completePreference": parseInt(completePrefrence),
                  "completeSurvey": parseInt(completeSurvey), 
                  "profile50to75": parseInt(profile50to75),
                  "profile75to90": parseInt(profile75to90),
                  "profileG90": parseInt(profile90to100),
                  "profileL50" : parseInt(profileLt50),
                  "ratingLearning": parseInt(ratingLearning),
                  "ratingSession": parseInt(ratingSession),
                  "recieveTestimonial": parseInt(recivedTestimonial),
                  "watchOnboardVideo": parseInt(onboardVideo),
                  
              }
          }
      }
        const res = await fetch(`${BASE_URL}org-settings/customize`,{
            method:'PUT',
            headers:{
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": btoken,
            },
            body:JSON.stringify(body)
          })
          const response = await res.json()
        console.log("button update Res", response)
}


  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      // console.log(getWindowSize())
    }

    window.addEventListener("resize", handleWindowResize);
    getFullDetail();
    getSuperAdmin();
    getAdmin();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      getSuperAdmin();
      getAdmin();
    };
  }, []);

  const [showFilter, setShowFilter] = useState(false);

  const showModal = () => {
    setShowFilter((prevStat) => !prevStat);
    // alert(showFilter)
  };

  const getSuperAdmin = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}organisation-admins/superadmin-list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    //   console.log(response)

    const { success } = response;
    setSuperAdminList(response.data);
  };
  const getAdmin = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}organisation-admins/admin-list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    //   console.log(response)
    const { success } = response;
    setAdminList(response.data);
  };

  const updateSettings = async (e) => {
    e.preventDefault();
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const body = {
      levels,
      functionalAreas: fAreas,
      locations,
      countries,
      divisions: division,
      coreSkills: fSKills,
      businessSkills: bSkills,
      roles: "Developer, Analyst",
      tools
    };

    console.log(body)
    // return
    const res = await fetch(`${BASE_URL}organisation-info`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    console.log(response);
    const { success } = response;
    if (success) {
      navigate("/");
    }
  };

  const getFullDetail = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}organisations/4324`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    console.log(response);
    setFullInfo(response.data);
  };

  const getCompanyProfile = async () => {
    const token = await localStorage.getItem("token");
    const btoken = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}org-settings/company-profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: btoken,
      },
    });
    const response = await res.json();
    console.log("api for chart in org", response);
    if(response.success){
      let topLables = [["Task", "Hours per Day"]]
      let topLables1 = [["Task", "Hours per Day"]]
      let topLables2 = [["Task", "Hours per Day"]]
      let lables = []
      let mapValues = []
      let menteelables;
      let menteeMapValues;
      let mentorlables;
      let mentorMapValues;

      //Languagge Old Chart Data ===========

      // response.data?.languageWeSpeak?.map((i) => {
      //   lables.push(i.language)
      //   mapValues.push(i.percentage.toFixed(1))
      // })

      //Languagge New Chart Data ===========

      response.data?.languageWeSpeak?.map((i) => {
        lables.push([i.language, i.userCount])
      })
      let final = topLables.concat(lables)
      console.log(final)
      setLanguageChartData(final)

      let aa = []

      let meCareer = response.data?.menteePreferences?.careerGrowthUserCount
      let mePersonalGrowth = response.data?.menteePreferences?.personalGrowthUserCount
      let meSkillGrowth = response.data?.menteePreferences?.skillGrowthUserCount
 
      aa.push(["Skill Growth" , meSkillGrowth],["Personal Growth" , mePersonalGrowth],["Career Growth" , meCareer])
      console.log(aa)
      let final1 = topLables1.concat(aa)
      console.log(final1)
      setMenteeChartData(final1)
 
      let bb = []
 
      let mtCareer = response.data?.menteePreferences?.careerGrowthUserCount
      let mtPersonalGrowth = response.data?.menteePreferences?.personalGrowthUserCount
      let mtSkillGrowth = response.data?.menteePreferences?.skillGrowthUserCount
 
      bb.push(["Skill Growth" , mtSkillGrowth],["Personal Growth" , mtPersonalGrowth],["Career Growth" , mtCareer])
      console.log(bb)
      let final2 = topLables2.concat(bb)
      console.log(final2)
      setMentorChartData(final2)

     menteelables = Object.keys(response.data?.menteePreferences)
     menteeMapValues = Object.values(response.data?.menteePreferences)

     mentorlables = Object.keys(response.data?.mentorPreferences)
     mentorMapValues = Object.values(response.data?.mentorPreferences)
  
      let data = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: lables,
        datasets: [
          {
            label: '# of Votes',
            data: mapValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      let data1 = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: menteelables,
        datasets: [
          {
            label: '# of Votes',
            data: menteeMapValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      let data2 = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: mentorlables,
        datasets: [
          {
            label: '# of Votes',
            data: mentorMapValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      console.log(data)
      // setLanguageChartData(data || {})

      // setMenteeChartData(data1||{})

      // setMentorChartData(data2||{})
    }
    
  };

  const deleteAdmin = async() => {
    // console.log(deletedID)
    // return
    const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;

          const res = await fetch(`${BASE_URL}organisation-admins/${deletedID.id}/org-admin`,{
              method:'DELETE',
              headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
              },
            })
            const response = await res.json()
        //   console.log(response)
          const {success} = response
          if(success){
            closeDeleteConfirmModal()
            getFullDetail();
            getSuperAdmin();
            getAdmin();
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
                <div className="breadcrumb-main user-member justify-content-sm-between">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                        Settings
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card card-default card-md">
                  <div className="">
                    <div className="tab-wrapper">
                      <div className="dm-tab tab-horizontal">
                        <Tabs>
                          <TabList className="nav nav-tabs vertical-tabs">
                            <Tab>Company Profile</Tab>
                            <Tab>Package Details</Tab>
                            <Tab>Customize</Tab>
                            <Tab>Integrations</Tab>
                            <Tab>Help & Support</Tab>
                            <Tab>Communication</Tab>
                          </TabList>

                          <TabPanel className="tab-content">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 mb-25">
                                <div className="media user-group-media d-flex justify-content-between">
                                  <div className="col-lg-9 col-md-12 col-sm-12 mb-25">
                                    <div className="media-body d-flex align-items-center">
                                      <img
                                        src={fullInfo && fullInfo.logo}
                                        className="me-20 wh-70 rounded-circle bg-opacity-primary"
                                      />
                                      <div>
                                        <h2 className="fw-500 mb-2">
                                          {fullInfo && fullInfo.orgName}
                                        </h2>
                                      </div>
                                      {localStorage.getItem("user_type") == "admin" ? null : 
                                      <img
                                        onClick={() =>
                                          navigate("/edit_company_setting", {
                                            state: fullInfo,
                                          })
                                        }
                                        src={edit_img}
                                        className="ms-3 edit_connect"
                                      />}
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-12 col-sm-12 mb-25">
                                    <div className="ap-po-details ap-po-details--2 p-15 radius-xl d-flex justify-content-between box_shadow1">
                                      <div className="overview-content w-100">
                                        <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                                          <div className="ap-po-details__titlebar">
                                            <h2 className="program_pro">
                                              Profile Status
                                            </h2>
                                            <p>Complete the profile</p>
                                          </div>

                                          {fullInfo && (
                                            <div className="ap-po-details__icon-area">
                                            <div className="svg-icon">
                                              <CircularProgressbar
                                                value={fullInfo.profilePercentage}
                                                text={`${fullInfo.profilePercentage}%`}
                                                styles={buildStyles({

                                                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                  strokeLinecap: "butt",

                                                  // Text size
                                                  textSize: "18px",

                                                  // How long animation takes to go from one percentage to another, in seconds
                                                  pathTransitionDuration: 0.5,

                                                  // Can specify path transition in more detail, or remove it entirely
                                                  // pathTransition: 'none',

                                                  // Colors
                                                  pathColor: `#f8a046`,
                                                  textColor: "#f8a046",
                                                  trailColor: "lightgray",
                                                })}
                                              />
                                            </div>
                                          </div>
                                          )}
                                          
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <h5 className="text-capitalize fw-500 mb-20">
                                Overview
                              </h5>
                              <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Head Quarters
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.headQuarters}
                                </p>
                              </div>

                              <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Company Size
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.companySize}
                                </p>
                              </div>

                              <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Industry
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.industry}
                                </p>
                              </div>

                              <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Founded
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.founded}
                                </p>
                              </div>

                              <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Company Type
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.companyType}
                                </p>
                              </div>

                              <div className="col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  About
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.about}
                                </p>
                              </div>

                              <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Website
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.website}
                                </p>
                              </div>

                              <div className="col-md-6 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Company Email
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.companyEmail}
                                </p>
                              </div>

                              <div className="col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Nature of Business
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.natureOfBusiness}
                                </p>
                              </div>

                              <div className="col-md-12 mb-20">
                                <p className="color-gray fs-14 fw-300 align-center mb-0">
                                  Aspirational Goals
                                </p>
                                <p className="color-dark fs-14 fw-300 align-center mb-0">
                                  {fullInfo && fullInfo.aspirationalGoals}
                                </p>
                              </div>

                              <div className="col-xxl-6 col-sm-6 mb-25">
                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                  <div className="card-header border-0">
                                    <h6 className="session_report">
                                      Language We Speak
                                    </h6>
                                  </div>
                                  {/* {Object.keys(languageChartData).length > 0 &&(
                                  <div style={{ height:'300px', width:'300px', marginBottom:"20px", alignSelf:'center'}}>
                                      <Doughnut data={languageChartData} />
                                  </div>
                                    )} */}
                                    <div>
                                    <Chart
                                        chartType="PieChart"
                                        data={languageChartData}
                                        // options={options}
                                        width={"100%"}
                                        height={"300px"}
                                      />
                                    </div>
                                </div>
                              </div>

                              <div className="col-xxl-6 col-sm-6 mb-25">
                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                  <div className="card-header border-0">
                                    <h6 className="session_report">
                                      Mentee Preferences
                                    </h6>
                                  </div>
                                  {/* {Object.keys(menteeChartData).length > 0 &&(
                                  <div style={{ height:'300px', width:'300px', marginBottom:"20px", alignSelf:'center'}}>
                                      <Doughnut data={menteeChartData} />
                                  </div>
                                    )} */}
                                    <div>
                                    <Chart
                                        chartType="PieChart"
                                        data={menteeChartData}
                                        // options={options}
                                        width={"100%"}
                                        height={"300px"}
                                      />
                                    </div>
                                </div>
                              </div>

                              <div className="col-xxl-6 col-sm-6 mb-25">
                                <div className="card border-0 card-timeline h-100 box_shadow1">
                                  <div className="card-header border-0">
                                    <h6 className="session_report">
                                      Mentor Preferences
                                    </h6>
                                  </div>
                                  {/* {Object.keys(mentorChartData).length > 0 &&(
                                  <div style={{ height:'300px', width:'300px', marginBottom:"20px", alignSelf:'center'}}>
                                      <Doughnut data={mentorChartData} />
                                  </div>
                                    )} */}
                                    <div>
                                    <Chart
                                        chartType="PieChart"
                                        data={mentorChartData}
                                        // options={options}
                                        width={"100%"}
                                        height={"300px"}
                                      />
                                    </div>
                                </div>
                              </div>
                              
                              {localStorage.getItem("user_type") == "admin" ? null : 
                              <>
                              <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                                        Super Admins
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                  <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                      <thead>
                                        <tr className="userDatatable-header">
                                          <th>
                                            <span className="userDatatable-title">
                                              Name
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Employee ID
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Location
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Email
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Contact
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title"></span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {superAdminList &&
                                          superAdminList.map((user, index) => (
                                            <tr>
                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.usermeta.name}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.empId}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.location}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.usermeta.email}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.usermeta.phoneNumber}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            onClick={() =>{
                                                              // showModal()
                                                              if(index == indexValue1){
                                                                setIndexValue1(-1)
                                                            }else{

                                                                setIndexValue1(index)
                                                            }
                                                            }}
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {index == indexValue1 && (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                  {/* <NavLink
                                                    className="navbar-link"
                                                    to="/edit_profile"
                                                  > */}
                                                    <div onClick={() =>alert("Please Contact WiseQ Support Team")} className="dropdown-item">
                                                      Edit
                                                    </div>
                                                  {/* </NavLink> */}
                                                  <div onClick={() =>alert("Please Contact WiseQ Support Team")} className="dropdown-item">
                                                    Remove
                                                  </div>
                                                </div>
                                                )}
                                                {/* {showFilter ? (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                    
                                                      <div onClick={() =>alert("Please Contact WiseQ Support Team")} className="dropdown-item">
                                                        Edit
                                                      </div>
                                                    <div onClick={() =>alert("Please Contact WiseQ Support Team")} className="dropdown-item">
                                                      Remove
                                                    </div>
                                                  </div>
                                                ) : (
                                                  ""
                                                )} */}
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                      <h4 className="text-capitalize fw-500 breadcrumb-title">
                                        Admins
                                      </h4>
                                    </div>
                                  </div>

                                  <NavLink
                                    className="navbar-link"
                                    to="/add_admin"
                                  >
                                    <div className="action-btn">
                                      <div className="btn px-15 btn-primary">
                                        Add Admin
                                      </div>
                                    </div>
                                  </NavLink>
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                  <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                      <thead>
                                        <tr className="userDatatable-header">
                                          <th>
                                            <span className="userDatatable-title">
                                              Name
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Employee ID
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Location
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Email
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title">
                                              Contact
                                            </span>
                                          </th>

                                          <th>
                                            <span className="userDatatable-title"></span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {adminList ? (
                                          adminList.map((user,index) => (
                                            <tr>
                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.usermeta.name}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.empId}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.location}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.usermeta.email}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="userDatatable-content">
                                                  {user.usermeta.phoneNumber}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="project-task-list__right">
                                                  <ul className="d-flex align-content-center">
                                                    <li>
                                                      <div className="dropdown dropleft">
                                                        <button className="btn-link border-0 bg-transparent p-0">
                                                          <img
                                                            src={horizontal_img}
                                                            className="svg"
                                                            onClick={() =>{
                                                                if(index == indexValue){
                                                                    setIndexValue(-1)
                                                                }else{

                                                                    setIndexValue(index)
                                                                }
                                                                // showModal()
                                                            }
                                                            }
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {index == indexValue && (
                                                  <div className="dropdown-menu dropdown-menu--dynamic box_shadow1">
                                                      <div onClick={() => navigate("/edit_admin", {state: adminList[indexValue]})} className="dropdown-item">
                                                        Edit
                                                      </div>
                                                    <div onClick={() => {
                                                      setdeletedID(adminList[indexValue])
                                                      showDeleteConfirmModal()}
                                                      } className="dropdown-item">
                                                        Remove
                                                      </div>
                                                  </div>
                                                )}
                                              </td>
                                            </tr>
                                          ))
                                        ) : (
                                          <p>No User</p>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              </>}
                            </div>
                          </TabPanel>

                          <TabPanel className="tab-content">
                            {/* <div className="row">
                                                            <div className="col-md-12 mb-20">
                                                                <p className="color-gray fs-14 fw-300 align-center mb-0">Package Name</p>
                                                                <p className="color-dark fs-14 fw-300 align-center mb-0">Standard</p>
                                                            </div>

                                                            <div className="col-md-6 mb-20">
                                                                <p className="color-gray fs-14 fw-300 align-center mb-0">Billing Cycle</p>
                                                                <p className="color-dark fs-14 fw-300 align-center mb-0">Monthly</p>
                                                            </div>

                                                            <div className="col-md-6 mb-20">
                                                                <p className="color-gray fs-14 fw-300 align-center mb-0">Billing Date</p>
                                                                <p className="color-dark fs-14 fw-300 align-center mb-0">22/02/23</p>
                                                            </div>

                                                            <div className="col-md-6 mb-20">
                                                                <p className="color-gray fs-14 fw-300 align-center mb-0">Amount Due</p>
                                                                <p className="color-pink fs-14 fw-500 align-center mb-0">5,000</p>
                                                            </div>

                                                            <div className="col-md-6 mb-20">
                                                                <p className="color-gray fs-14 fw-300 align-center mb-0">Amount Paid</p>
                                                                <p className="color-blue fs-14 fw-500 align-center mb-0">10,000</p>
                                                            </div>

                                                            <div className="col-md-12 mb-20">
                                                                <p className="color-gray fs-14 fw-300 align-center mb-0">Amount Balance</p>
                                                                <p className="color-dark fs-14 fw-500 align-center mb-0">15,000</p>
                                                            </div>

                                                            <div class="layout-button mb-20">
                                                                <button type="button" className="btn btn-primary btn-default btn-squared">Pay Now</button>
                                                                <button type="button" className="btn btn-outline-primary btn-squared color-primary">Invoices</button>
                                                            </div>


                                                            <div className="col-lg-12">
                                                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Payment History</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-12">
                                                                <div className="userDatatable global-shadow w-100 mb-30 box_shadow1">
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 table-borderless">
                                                                            <thead>
                                                                                <tr className="userDatatable-header">
                                                                                    <th>
                                                                                        <span className="userDatatable-title">Payment Date</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Amount</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Payment Mode</span>
                                                                                    </th>

                                                                                    <th>
                                                                                        <span className="userDatatable-title">Transaction Detail</span>
                                                                                    </th>

                                                                                    <th>

                                                                                    </th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {data.map((user) => (

                                                                                    <tr>
                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.program_id}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.program_name}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.skills}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td>
                                                                                            <div className="userDatatable-content">
                                                                                                {user.duration}
                                                                                            </div>
                                                                                        </td>


                                                                                        <td>
                                                                                            <div className="project-task-list__right">
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li>
                                                                                                        <button className="btn px-15 btn-primary ms-10">
                                                                                                            View Details
                                                                                                        </button>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>


                                                                                ))}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div> */}
                            <div className="col-lg-12">
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
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>

                          <TabPanel className="tab-content">
                                                        <div className="col-xxl-12 col-xl-12 col-sm-12">
                                                            <div className="mb-30">

                                                                <div className="application-faqs">
                                                                    <Accordion>
                                                                        <Accordion.Item eventKey="0" className="panel panel-default box_shadow1">
                                                                            <Accordion.Header className="faq_question">Default Growth score settings (for Mentees)</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                <div className="panel-body">
                                                                                    <div className="row">
                                                                                        <h5 class="text-capitalize fw-500 mb-10">Growth Score for Sessions</h5>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">1-1 Sessions</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meOneToOne} onChange={e => setmeOneToOne(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Group Sessions</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meGroupSes} onChange={e => setmeGroupSes(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Session Worksheet completion</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meWorksheetComp} onChange={e => setmeWorksheetComp(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <h5 class="text-capitalize fw-500 mb-10">Growth Score for Learnings</h5>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Podcast</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mePodcast} onChange={e => setmePodcast(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Article</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meArticle} onChange={e => setmeArticle(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Video</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meVideo} onChange={e => setmeVideo(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 1 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meCaseStudy} onChange={e => setmeCaseStudy(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Case Study</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={meCaseStudy} onChange={e => setmeCaseStudy(e.target.value)} 
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 1 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={meicourse1m} onChange={e => setmeicourse1m(e.target.value)} 
                                                                                                        type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 2 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input
                                                                                                        value={meicourse2m} onChange={e => setmeicourse2m(e.target.value)} 
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 3 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={meicourse3m} onChange={e => setmeicourse3m(e.target.value)} 
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 3-6 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                            value={meicourse3to6m} onChange={e => setmeicourse3to6m(e.target.value)} 
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration {'>'}6 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                         value={meicourseGt6m} onChange={e => setmeicourseGt6m(e.target.value)} 
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <h5 class="text-capitalize fw-500 mb-10">Growth Score for Assessments</h5>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Quick Assessment (5-10 mins)</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mequickAsses} onChange={e => setmequickAsses(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Short Assessment (10-20 mins)</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meshortAsses} onChange={e => setmeshortAsses(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Lenghty Assessment ({'>'}20 mins)</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input onClick={() => updateScoreInfo()} value={meLenghtlyAsses} onChange={e => setmeLenghtlyAsses(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <h5 className="text-capitalize fw-500 mb-10">Growth Score for IDP Creation</h5>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input  value={meidpCreation} onChange={e => setmeidpCreation(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <h5 className="text-capitalize fw-500 mb-10">Growth Score for Program Rating and Feedback</h5>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={meprogramRatingFeedback} onChange={e => setmeprogramRatingFeedback(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <h5 className="text-capitalize fw-500 mb-10">Growth Score for Promotion/Level change</h5>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mePromotionChange} onChange={e => setmePromotionChange(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* {(user.setting == true &&
                                                                                        <div>
                                                                                            <h5 class="text-capitalize fw-500 mb-20">Set Company Information</h5>
                                                                                            <form onSubmit={updateSettings}>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set different Level's in the company</label>
                                                                                                <input value={levels} onChange={e => setLevels(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required />
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set functional areas in the company</label>
                                                                                                <input value={fAreas} onChange={e => setFAreas(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set locations</label>
                                                                                                <input value={locations} onChange={e => setLocation(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set countries</label>
                                                                                                <input value={countries} onChange={e => setCountries(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set Division's</label>
                                                                                                <input value={division} onChange={e => setDivisions(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Functional skills you would like to list</label>
                                                                                                <input value={fSKills} onChange={e => setFSkills(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Business Skills you would like to list</label>
                                                                                                <input value={bSkills} onChange={e => setBSKills(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="action-btn">
                                                                                                <button type='submit' className="btn px-15 btn-primary">Save</button>
                                                                                            </div>
                                                                                            </form>
                                                                                        </div>)} */}
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                    <Accordion>
                                                                        <Accordion.Item eventKey="0" className="panel panel-default box_shadow1">
                                                                            <Accordion.Header className="faq_question">Default Impact score settings (for Mentors)</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                <div className="panel-body">
                                                                                    <div className="row">
                                                                                        <h5 class="text-capitalize fw-500 mb-10">Impact Score for Sessions</h5>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">1-1 Sessions</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrOneToOne} onChange={e => setmrOneToOne(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Group Sessions</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input  value={mrGroupSes} onChange={e => setmrGroupSes(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button  onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Reviewing sessions worksheets</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrreviewWorksheet} onChange={e => setmrreviewWorksheet(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button  onClick={() => updateScoreInfo()}className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <h5 class="text-capitalize fw-500 mb-10">Growth Score for Learnings</h5>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Podcast</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrPodcast} onChange={e => setmrPodcast(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Article</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrArticle} onChange={e => setmrArticle(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Video</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrVideo} onChange={e => setmrVideo(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 1 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Case Study</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={mrCaseStudy} onChange={e => setmrCaseStudy(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 1 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={mricourse1m} onChange={e => setmricourse1m(e.target.value)}
                                                                                                        type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 2 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input
                                                                                                        value={mricourse2m} onChange={e => setmricourse2m(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 3 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={mricourse3m} onChange={e => setmricourse3m(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration 3-6 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={mricourse3to6m} onChange={e => setmricourse3to6m(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Course - Duration {'>'}6 month</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={mricourseGt6m} onChange={e => setmricourseGt6m(e.target.value)} 
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <h5 class="text-capitalize fw-500 mb-10">Growth Score for Assessments</h5>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Quick Assessment (5-10 mins)</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrquickAsses} onChange={e => setmrquickAsses(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Short Assessment (10-20 mins)</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrshortAsses} onChange={e => setmrshortAsses(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Lenghty Assessment ({'>'}20 mins)</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrLenghtlyAsses} onChange={e => setmrLenghtlyAsses(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <h5 className="text-capitalize fw-500 mb-10">Growth Score for IDP Creation</h5>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mridpCreation} onChange={e => setmridpCreation(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <h5 className="text-capitalize fw-500 mb-10">Growth Score for Program Rating and Feedback</h5>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrprogramRatingFeedback} onChange={e => setmrprogramRatingFeedback(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <h5 className="text-capitalize fw-500 mb-10">Growth Score for Promotion/Level change</h5>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={mrPromotionChange} onChange={e => setmrPromotionChange(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* {(user.setting == true &&
                                                                                        <div>
                                                                                            <h5 class="text-capitalize fw-500 mb-20">Set Company Information</h5>
                                                                                            <form onSubmit={updateSettings}>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set different Level's in the company</label>
                                                                                                <input value={levels} onChange={e => setLevels(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required />
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set functional areas in the company</label>
                                                                                                <input value={fAreas} onChange={e => setFAreas(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set locations</label>
                                                                                                <input value={locations} onChange={e => setLocation(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set countries</label>
                                                                                                <input value={countries} onChange={e => setCountries(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set Division's</label>
                                                                                                <input value={division} onChange={e => setDivisions(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Functional skills you would like to list</label>
                                                                                                <input value={fSKills} onChange={e => setFSkills(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Business Skills you would like to list</label>
                                                                                                <input value={bSkills} onChange={e => setBSKills(e.target.value)} type="number" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="action-btn">
                                                                                                <button type='submit' className="btn px-15 btn-primary">Save</button>
                                                                                            </div>
                                                                                            </form>
                                                                                        </div>)} */}
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                    <Accordion>
                                                                        <Accordion.Item eventKey="0" className="panel panel-default box_shadow1">
                                                                            <Accordion.Header className="faq_question">Other Default Settings</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                <div className="panel-body">
                                                                                    <div className="row">
                                                                                        <h5 class="text-capitalize fw-500 mb-10">Both Growth & Impact Scores</h5>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Profile completion {'<'}50%</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={profileLt50} onChange={e => setprofileLt50(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Profile completion 50-75%</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={profile50to75} onChange={e => setprofile50to75(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Profile completion 75-90%</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={profile75to90} onChange={e => setprofile75to90(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* <h5 class="text-capitalize fw-500 mb-10">Growth Score for Learnings</h5> */}

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Profile completion 90-100%</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={profile90to100} onChange={e => setprofile90to100(e.target.value)}  type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Completing preferences</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={completePrefrence} onChange={e => setcompletePrefrence(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Watching platform onboarding video</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={onboardVideo} onChange={e => setonboardVideo(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">If received a testimonial</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={recivedTestimonial} onChange={e => setrecivedTestimonial(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Rating sessions</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={ratingSession} onChange={e => setratingSession(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Rating Learnings</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={ratingLearning} onChange={e => setratingLearning(e.target.value)}
                                                                                                        type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Completing a Survey</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input
                                                                                                        value={completeSurvey} onChange={e => setcompleteSurvey(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* <h5 class="text-capitalize fw-500 mb-10">Default Timelines</h5> */}

                                                                                        {/* <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Worksheet(s) upload time for sessions</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        value={worksheetUpload} onChange={e => setworksheetUpload(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        {/* <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Write a testimonial after completing a program</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                            value={writeTestimonial} onChange={e => setwriteTestimonial(e.target.value)}
                                                                                                            type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        {/* <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Giving feedback after completing a program</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input 
                                                                                                        // value={courseGt6m} onChange={e => setcourseGt6m(e.target.value)}
                                                                                                            type="number" value={giveFeedback} onChange={e => setgiveFeedback(e.target.value)} className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        

                                                                                        {/* <div className="col-md-12 mb-20">
                                                                                            <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                                                <p className="color-dark fs-15 fw-300 align-center mb-0">Limit to reschedule a particular session by the mentor</p>
                                                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                                                    <li className="customize_input">
                                                                                                        <input value={sessionRescheduleByMentor} onChange={e => setsessionRescheduleByMentor(e.target.value)} type="number" className="form-control ih-medium12 ip-gray radius-xs b-deep px-15" placeholder="200" />
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <button onClick={() => updateScoreInfo()} className="btn btn-icon btn-warning btn-squared">
                                                                                                            <img src={save_img} alt="layers" className="svg" />
                                                                                                        </button>
                                                                                                    </li>

                                                                                                </ul>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        
                                                                                        <div>
                                                                                            <h5 class="text-capitalize fw-500 mb-20">Set Company Information (You May Add Multiple Options Separated By A Comma)</h5>
                                                                                            <form onSubmit={updateSettings}>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set different Level's in the company (In the order of entry level to top management)</label>
                                                                                                <input value={levels} onChange={e => setLevels(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required />
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set functional areas in the company</label>
                                                                                                <input value={fAreas} onChange={e => setFAreas(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set locations</label>
                                                                                                <input value={locations} onChange={e => setLocation(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set countries</label>
                                                                                                <input value={countries} onChange={e => setCountries(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set Division's</label>
                                                                                                <input value={division} onChange={e => setDivisions(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Functional skills you would like to list</label>
                                                                                                <input value={fSKills} onChange={e => setFSkills(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Business Skills you would like to list</label>
                                                                                                <input value={bSkills} onChange={e => setBSKills(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="col-md-12 mb-25">
                                                                                                <label>Set Tools</label>
                                                                                                <input value={tools} onChange={e => settools(e.target.value)} type="text" className="form-control ih-medium ip-gray radius-xs b-deep px-15" placeholder="" required/>
                                                                                            </div>
                                                                                            <div className="action-btn">
                                                                                                <button type='submit' className="btn px-15 btn-primary">Save</button>
                                                                                            </div>
                                                                                            </form>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>

                          <TabPanel className="tab-content">
                            {/* <div className="row">

                                                            <div className="col-lg-12">
                                                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Integrated Apps</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {data1.map((user) => (

                                                                <div className="col-lg-3 col-sm-12 col-md-6 mb-25">
                                                                    <div className="card card-default card-md mb-4 box_shadow1">
                                                                        <div class="card-body">
                                                                            <div class="d-flex align-items-center mb-20">
                                                                                <img src={zoom_img} className="wh-46 me-10" />
                                                                                <div>
                                                                                    <p class="fs-14 fw-600 color-dark mb-0">{user.app_name}</p>
                                                                                    <span class=" mt-1 fs-14  color-light ">{user.app_install}</span>
                                                                                </div>
                                                                            </div>

                                                                            <button type="button" className="btn btn-outline-primary btn-squared color-primary w-100">{user.edit_btn}</button>
                                                                        </div>


                                                                    </div>


                                                                </div>


                                                            ))}

                                                        </div>

                                                        <div className="row">

                                                            <div className="col-lg-12">
                                                                <div className="breadcrumb-main user-member justify-content-sm-between">
                                                                    <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                                                        <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                                                                            <h4 className="text-capitalize fw-500 breadcrumb-title">Apps for Integration</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {data2.map((user) => (

                                                                <div className="col-lg-3 col-sm-12 col-md-6 mb-25">
                                                                    <div className="card card-default card-md mb-4 box_shadow1">
                                                                        <div class="card-body">
                                                                            <div class="d-flex align-items-center mb-20">
                                                                                <img src={teamlogo_img} className="wh-46 me-10" />
                                                                                <div>
                                                                                    <p class="fs-14 fw-600 color-dark mb-0">{user.app_team}</p>
                                                                                </div>
                                                                            </div>

                                                                            <button type="button" className="btn btn-primary btn-default btn-squared w-100">{user.connect_btn}</button>
                                                                        </div>


                                                                    </div>


                                                                </div>


                                                            ))}

                                                        </div> */}
                            <div className="col-lg-12">
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
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>

                          <TabPanel className="tab-content">
                            {/* <div className="col-xxl-12 col-xl-12 col-sm-12">
                                                            <div className="mb-30">

                                                                <div className="application-faqs">

                                                                    {data4.map((user) => (

                                                                        <Accordion>
                                                                            <Accordion.Item eventKey="0" className="panel panel-default box_shadow1">
                                                                                <Accordion.Header className="faq_question">{user.faq_heading}</Accordion.Header>
                                                                                <Accordion.Body>
                                                                                    <div className="panel-body">
                                                                                        <p>{user.faq_para}</p>
                                                                                        <NavLink className="navbar-link" to="/edit_setting"><button type="button" class="btn btn-primary btn-default btn-squared btn-sm">Edit</button></NavLink>
                                                                                    </div>
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>
                                                                        </Accordion>

                                                                    ))}

                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div className="col-lg-12">
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
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>

                          <TabPanel className="tab-content">
                            {/* <div className="row">
                                                            <h5 class="text-capitalize fw-500 mb-10">Auto Notification Settings</h5>
                                                            <div className="col-md-12 mb-20">
                                                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                    <p className="color-dark fs-15 fw-300 align-center mb-0">Email notification for first time onboarding invitation</p>
                                                                    <NavLink className="navbar-link" to="/notification_setting"><button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Edit</button></NavLink>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12 mb-20">
                                                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                    <p className="color-dark fs-15 fw-300 align-center mb-0">Email notification for book a session to mentee</p>
                                                                    <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Create</button>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12 mb-20">
                                                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                    <p className="color-dark fs-15 fw-300 align-center mb-0">Email notification for book a session to Mentor</p>
                                                                    <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Create</button>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12 mb-20">
                                                                <p className="color-orange fw-500 mb-0"><i className="las la-plus fs-14"></i>ADD MORE</p>
                                                            </div>

                                                            <h5 class="text-capitalize fw-500 mb-10">Broadcast Settings</h5>
                                                            <div className="col-md-12 mb-20">
                                                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                    <p className="color-dark fs-15 fw-300 align-center mb-0">Send email to all/selected users in the platform</p>
                                                                    <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Edit</button>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12 mb-20">
                                                                <p className="color-orange fw-500 mb-0"><i className="las la-plus fs-14"></i>ADD MORE</p>
                                                            </div>

                                                            <div className="col-md-12 mb-20">
                                                                <div className="ap-po-details-content d-flex flex-wrap justify-content-between align-center">
                                                                    <h5 class="text-capitalize fw-500">Default Nudge Settings</h5>
                                                                    <button type="button" className="btn btn-primary btn-default btn-squared btn-sm">Add</button>
                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div className="col-lg-12">
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
                                      We are currently developing this feature.
                                      It will be available to you soon.
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
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

<Modal show={showHello} onHide={closeDeleteConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 class="text-capitalize fw-500 mb-25">Are you sure you want to delete this profile?</h4>

                        <div class="layout-button justify-content-center">
                            <button onClick={() => closeDeleteConfirmModal()} type="button" className="btn btn-no btn-default btn-squared">No</button>
                            <button onClick={() => deleteAdmin()} type="button" className="btn btn-yes btn-default btn-squared">Yes</button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
    </div>
  );
}

export default Setting_Screen;
