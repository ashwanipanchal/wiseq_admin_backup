
import './plugin.css';
import './App.css';
import Home_Screen from './components/screen/home';
import Side_Bar from './components/screen/sidebar';
import Admin_Login from './components/screen/admin_login';
import Admin_Signup from './components/screen/admin_signup';
import Mentee_Management from './components/screen/mentee_management';
import Browse_mentor_mentee from './components/screen/browse_mentor_mentee';
import Assigned_Learning_Profile from './components/screen/assigned_learning_profile';
import Add_Mentee from './components/screen/add_mentee';
import Mentors_Screen from './components/screen/mentors';
import Chat_Screen from './components/screen/chat';
import Edit_Created_Learning from './components/screen/edit_created_learning';
import Edit_Learning from './components/screen/edit_learning';
import Add_Mentor from './components/screen/add_mentor';
import Audiences from './components/screen/audiences';
import Completed_By from './components/screen/completed_by';
import Pending_By from './components/screen/pending_by';
import Competency_Report_For_Mentees from './components/screen/competency_report_for_mentees';
import Adoptation_Report from './components/screen/adoptation_report';
import Competency_Report_For_Mentors from './components/screen/competency_report_for_mentors';
import Feedback_And_Ratings_Report_Mentees from './components/screen/feedback_and_ratings_report_mentees';
import Feedback_And_Ratings_Report_Mentors from './components/screen/feedback_and_ratings_report_mentors';
import Mentoring_Impact_Report from './components/screen/mentoring_impact_report';
import Survey from './components/screen/survey';
import Forget_Password from './components/screen/forget_password';
import Reset_Password from './components/screen/reset_password';
import Change_Password from './components/screen/change_password';
import Idp_Full_View from './components/screen/idp_full_view';
import View_Ratings from './components/screen/view_rating';
import View_Testimonials from './components/screen/view_testimonials';
import Match_Making from './components/screen/match_making';
import Confirm_Pair from './components/screen/confirm_pair';
import Mentoring_Program from './components/screen/mentoring_program';
import Create_Program from './components/screen/create_program';
import Program_Preview from './components/screen/program_preview';
import Edit_Program from './components/screen/edit_program';
import Preview_Program from './components/screen/preview_program';
import Profile_View from './components/screen/program_create_profile_view';
import Program_Publish from './components/screen/program_publish_profile_view';
import Program_Progress from './components/screen/program_progress_profile_view';
import Program_Settings from './components/screen/program_settings';
import Past_Batches from './components/screen/past_batches';
import Add_Mentors from './components/screen/add_mentors';
import All_Activity from './components/screen/all_activity';
import All_Notification from './components/screen/all_notification';
import Assigned_Learning from './components/screen/assigned_learning';
import All_Task from './components/screen/all_task';
import Selected_Mentor from './components/screen/selected_mentors';
import Live_Session from './components/screen/live_session';
import Past_Session from './components/screen/past_session_profile';
import Add_Mentees from './components/screen/add_mentees';
import Edit_Mentees from './components/screen/edit_mentees';
import Edit_Mentors from './components/screen/edit_mentors';
import Selected_Mentees from './components/screen/selected_mentees';
import Mandatory_Learning from './components/screen/mandatory_learning';
import Program_Settings_Published from './components/screen/program_published_program_settings';
import Program_Settings_Progress from './components/screen/program_progress_program_settings';
import Mandatory_Assessment from './components/screen/mandatory_assessments';
import Confirmed_Participants from './components/screen/confirmed_participants';
import Program_Progress1 from './components/screen/program_progress';
import View_Worksheet from './components/screen/view_worksheets';
import Requested_Worksheet from './components/screen/requested_worksheet';
import Mentee_Wise_Program from './components/screen/mentee_wise_program';
import Mentee_Profile from './components/screen/mentee_profile';
import Edit_Mentee from './components/screen/edit_mentee';
import Mentor_Profile from './components/screen/mentor_profile';
import Edit_Mentor from './components/screen/edit_mentor';
import Resources_Screen from './components/screen/resources';
import Add_Resources from './components/screen/add_resources';
import Edit_Resources from './components/screen/edit_resources';
import Resources_Detail from './components/screen/resources_detail';
import Create_Inaugural_Session from './components/screen/create_inaugural_session';
import Edit_Inaugural_Session from './components/screen/edit_inaugural_session';
import Edit_Group_Session from './components/screen/edit_group_session';
import Edit_Cohort_Session from './components/screen/edit_cohort_session';
import IDP_Status from './components/screen/idp_status';
import Create_Group_Session from './components/screen/create_group_session';
import Create_Cohort_Session from './components/screen/create_cohort_session';
import Progress_Report from './components/screen/progress_report';
import Setting_Screen from './components/screen/setting_screen';
import Edit_Worksheet_Request from './components/screen/edit_worksheet_request';
import Edit_Company_Setting from './components/screen/edit_company_setting';
import Session_List from './components/screen/sessions_list';
import Add_Admin from './components/screen/add_admin';
import Edit_Admin from './components/screen/edit_admin';
import Edit_Profile from './components/screen/edit_profile';
import Notification_Setting from './components/screen/notification_setting';
import Edit_Setting from './components/screen/edit_setting';
import Community_Screen from './components/screen/community_screen';
import Create_Community from './components/screen/create_community';
import Community_Detail from './components/screen/community_detail';
import View_Feedbacks from './components/screen/view_feedbacks';
import Community_Profile from './components/screen/community_profile';
import Program_Past from './components/screen/program_past_profile_view';
import Comment_Screen from './components/screen/comment_screen';
import People_React from './components/screen/people_react';
import Invite_People from './components/screen/invite_people';
import Create_Post from './components/screen/create_post';
import Member_List from './components/screen/member_list';
import Learning_Screen from './components/screen/learning_screen';
import Create_Learning from './components/screen/create_learning';
import Created_Learning_Profile from './components/screen/created_learning_profile';
import Check_Learning from './components/screen/check_learning';
import Check_Verify from './components/screen/check_verify_learning_profile';
import Group_SessionList from './components/screen/group_sessionlist';
import Cohort_SessionList from './components/screen/cohort_sessionlist';
import Inaugural_SessionList from './components/screen/inaugural_sessionlist';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRouteMentor from './components/screen/mentor_admin';
import Protected from './Protected';
import MainRouteMentee from './components/screen/mentee_admin/iindex';
import Check_Learning_Mentee from './components/screen/check_learning_mentee';
import EventEmitter from "reactjs-eventemitter";
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
function App() {
  const [userCheck, setUserCheck] = useState()
  const [key, setKey] = useState(0)
  const [fcmToken, setFcmToken] = useState("")

const firebaseConfig = {
  apiKey: "AIzaSyA8Pxoag7noGLcWTwGDPl8H3-kGMyz_nXg",
  authDomain: "wiseq-abfae.firebaseapp.com",
  projectId: "wiseq-abfae",
  storageBucket: "wiseq-abfae.appspot.com",
  messagingSenderId: "943921110152",
  appId: "1:943921110152:web:23cc371de361a8e15a133d",
  measurementId: "G-72BMLW09E6"
};

const fapp = initializeApp(firebaseConfig);
const messaging = getMessaging(fapp);

useEffect(()=> {
 
    getToken()
},[])

getToken(messaging, {
  vapidKey:
    "BKIGTTHsngkhg7P28PGKUh-7qXfMZe9z6lWC73Z-U_Kg4aYb0lMFIwaHLldKg_Qo7bRf4CWJ1PWOyx-XYWo8r1U",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Firebase Token", currentToken);
      setFcmToken(currentToken)
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});
// initializeApp(firebaseConfig);

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

//   const requestPermision =async() => {
//     const permission = await Notification.requestPermission()
//     if(permission === 'granted'){

//     }else if(permission == "denied"){
//       alert("You denied for notification")
//     }
//   }

//   useEffect(() => {
//     requestPermision()
//   },[])

  useEffect(()=>{
    EventEmitter.subscribe('eventName', event => {
  //   alert(event)
     setUserCheck(event.toString())
     setKey(8)
    //  getUserType()
    })
  },[])
  useEffect(() => {
    getUserType()
  },[])
useEffect (()=>{
//console.log(userCheck)
},[userCheck])
  const getUserType = () => {
    const type =  localStorage.getItem("user_type")
    console.log("userCheck", type)
    setKey(Math.random())
    setUserCheck(type)
    //console.log("user state Check", userCheck)
  }
  return (

    <div setKey={key}>
    {[null,undefined].includes(userCheck) &&(
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/" element={<Protected Component={Home_Screen}/>} />
          <Route path="/admin_login" element={<Admin_Login fcmToken={fcmToken} />} />
          <Route path="/admin_signup" element={<Admin_Signup />} />
          <Route path="/admin_signup/:id" element={<Admin_Signup/>} />
          <Route path="/sidebar" element={<Side_Bar />} />
          <Route path="/mentee_management" element={<Mentee_Management />} />
          <Route path="/browse_mentor_mentee" element={<Browse_mentor_mentee />} />
          <Route path="/add_mentee" element={<Add_Mentee />} />
          <Route path="/mentors" element={<Mentors_Screen />} />
          <Route path="/add_mentor" element={<Add_Mentor />} />
          <Route path="/forget_password" element={<Forget_Password />} />
          <Route path="/reset_password" element={<Reset_Password />} />
          <Route path="/reset_password/:id" element={<Reset_Password/>} />
          <Route path="/change_password" element={<Change_Password/>} />
          <Route path="/match_making" element={<Match_Making />} />
          <Route path="/confirm_pair" element={<Confirm_Pair />} />
          <Route path="/mentoring_program" element={<Mentoring_Program />} />
          <Route path="/create_program" element={<Create_Program />} />
          <Route path="/program_preview" element={<Program_Preview />} />
          <Route path="/edit_program" element={<Edit_Program />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/program_create_profile_view" element={<Profile_View />} />
          <Route path="/program_publish_profile_view" element={<Program_Publish />} />
          <Route path="/program_progress_profile_view" element={<Program_Progress />} />
          <Route path="/past_batches" element={<Past_Batches />} />
          <Route path="/program_settings" element={<Program_Settings />} />
          <Route path="/edit_created_learning" element={<Protected Component={Edit_Created_Learning}/>} />
          <Route path="/preview_program" element={<Protected Component={Preview_Program}/>} />
          <Route path="/assigned_learning" element={<Protected Component={Assigned_Learning}/>} />
          <Route path="/edit_learning" element={<Protected Component={Edit_Learning}/>} />
          <Route path="/competency_report_for_mentees" element={<Protected Component={Competency_Report_For_Mentees}/>} />
          <Route path="/edit_worksheet_request" element={<Protected Component={Edit_Worksheet_Request}/>} />
          <Route path="/live_session_profile" element={<Protected Component={Live_Session}/>} />
          <Route path="/past_session_profile" element={<Protected Component={Past_Session}/>} />
          <Route path="/adoptation_report" element={<Protected Component={Adoptation_Report}/>} />
          <Route path="/competency_report_for_mentors" element={<Protected Component={Competency_Report_For_Mentors}/>} />
          <Route path="/idp_status" element={<Protected Component={IDP_Status}/>} />
          <Route path="/feedback_and_ratings_report_mentees" element={<Protected Component={Feedback_And_Ratings_Report_Mentees}/>} />
          <Route path="/feedback_and_ratings_report_mentors" element={<Protected Component={Feedback_And_Ratings_Report_Mentors}/>} />
          <Route path="/session_list" element={<Protected Component={Session_List}/>} />
          <Route path="/idp_full_view" element={<Protected Component={Idp_Full_View}/>} />
          <Route path="/create_inaugural_session" element={<Protected Component={Create_Inaugural_Session}/>} />
          <Route path="/edit_inaugural_session" element={<Protected Component={Edit_Inaugural_Session}/>} />
          <Route path="/edit_group_session" element={<Protected Component={Edit_Group_Session}/>} />
          <Route path="/group_sessionlist" element={<Protected Component={Group_SessionList}/>} />
          <Route path="/cohort_sessionlist" element={<Protected Component={Cohort_SessionList}/>} />
          <Route path="/inaugural_sessionlist" element={<Protected Component={Inaugural_SessionList}/>} />
          <Route path="/view_feedbacks" element={<Protected Component={View_Feedbacks}/>} />
          <Route path="/program_past_profile_view" element={<Protected Component={Program_Past}/>} />
          <Route path="/view_testimonials" element={<Protected Component={View_Testimonials}/>} />
          <Route path="/view_ratings" element={<Protected Component={View_Ratings}/>} />
          <Route path="/create_group_session" element={<Protected Component={Create_Group_Session}/>} />
          <Route path="/create_cohort_session" element={<Protected Component={Create_Cohort_Session}/>} />
          <Route path="/edit_cohort_session" element={<Protected Component={Edit_Cohort_Session}/>} />
          <Route path="/mentoring_impact_report" element={<Protected Component={Mentoring_Impact_Report}/>} />
          <Route path="/chat" element={<Chat_Screen />} />
          <Route path="/add_mentors" element={<Add_Mentors />} />
          <Route path="/all_task" element={<All_Task />} />
          <Route path="/all_notification" element={<All_Notification />} />
          <Route path="/all_activity" element={<All_Activity />} />
          <Route path="/selected_mentors" element={<Selected_Mentor />} />
          <Route path="/add_mentees" element={<Add_Mentees />} />
          <Route path="/edit_mentees" element={<Edit_Mentees />} />
          <Route path="/edit_mentors" element={<Edit_Mentors />} />
          <Route path="/selected_mentees" element={<Selected_Mentees />} />
          <Route path="/mandatory_learning" element={<Mandatory_Learning />} />
          <Route path="/program_published_program_settings" element={<Program_Settings_Published />} />
          <Route path="/program_progress_program_settings" element={<Program_Settings_Progress />} />
          <Route path="/mandatory_assessments" element={<Mandatory_Assessment />} />
          <Route path="/confirmed_participants" element={<Confirmed_Participants />} />
          <Route path="/program_progress" element={<Program_Progress1 />} />
          <Route path="/view_worksheets" element={<View_Worksheet />} />
          <Route path="/requested_worksheet" element={<Requested_Worksheet />} />
          <Route path="/mentee_wise_program" element={<Mentee_Wise_Program />} />
          <Route path="/mentee_profile" element={<Mentee_Profile />} />
          <Route path="/edit_mentee" element={<Edit_Mentee />} />
          <Route path="/mentor_profile" element={<Mentor_Profile />} />
          <Route path="/edit_mentor" element={<Edit_Mentor />} />
          <Route path="/resources" element={<Resources_Screen />} />
          <Route path="/add_resources" element={<Add_Resources />} />
          <Route path="/edit_resources" element={<Edit_Resources />} />
          <Route path="/resources_detail" element={<Resources_Detail />} />
          <Route path="/progress_report" element={<Progress_Report />} />
          <Route path="/setting_screen" element={<Protected Component={Setting_Screen}/>} />
          <Route path="/edit_company_setting" element={<Protected Component={Edit_Company_Setting}/>} />
          <Route path="/add_admin" element={<Add_Admin />} />
          <Route path="/audiences" element={<Audiences />} />
          <Route path="/completed_by" element={<Completed_By />} />
          <Route path="/pending_by" element={<Pending_By />} />
          <Route path="/edit_admin" element={<Edit_Admin />} />
          <Route path="/edit_profile" element={<Edit_Profile />} />
          <Route path="/notification_setting" element={<Notification_Setting />} />
          <Route path="/assigned_learning_profile" element={<Assigned_Learning_Profile />} />
          <Route path="/edit_setting" element={<Edit_Setting />} />
          <Route path="/community_screen" element={<Community_Screen />} />
          <Route path="/create_community" element={<Create_Community />} />
          <Route path="/community_detail" element={<Community_Detail />} />
          <Route path="/community_profile" element={<Community_Profile />} />
          <Route path="/comment_screen" element={<Comment_Screen />} />
          <Route path="/people_react" element={<People_React />} />
          <Route path="/invite_people" element={<Invite_People />} />
          <Route path="/create_post" element={<Create_Post />} />
          <Route path="/member_list" element={<Member_List />} />
          <Route path="/learning_screen" element={<Learning_Screen />} />
          <Route path="/create_learning" element={<Create_Learning />} />
          <Route path="/created_learning_profile" element={<Created_Learning_Profile />} />
          <Route path="/check_learning" element={<Check_Learning />} />
          <Route path="/check_learning_mentee" element={<Protected Component={Check_Learning_Mentee} />} />
          <Route path="/check_verify_learning_profile" element={<Check_Verify />} />
        </Routes>
      </BrowserRouter>
    )}
    {userCheck == "" &&(
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/" element={<Protected Component={Home_Screen}/>} />
          <Route path="/admin_login" element={<Admin_Login fcmToken={fcmToken} />} />
          <Route path="/admin_signup" element={<Admin_Signup />} />
          <Route path="/admin_signup/:id" element={<Admin_Signup />} />
          <Route path="/sidebar" element={<Side_Bar />} />
          <Route path="/mentee_management" element={<Mentee_Management />} />
          <Route path="/browse_mentor_mentee" element={<Browse_mentor_mentee />} />
          <Route path="/add_mentee" element={<Add_Mentee />} />
          <Route path="/mentors" element={<Mentors_Screen />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/add_mentor" element={<Add_Mentor />} />
          <Route path="/forget_password" element={<Forget_Password />} />
          <Route path="/reset_password" element={<Reset_Password />} />
          <Route path="/reset_password/:id" element={<Reset_Password/>} />
          <Route path="/change_password" element={<Change_Password/>} />
          <Route path="/match_making" element={<Match_Making />} />
          <Route path="/confirm_pair" element={<Confirm_Pair />} />
          <Route path="/mentoring_program" element={<Mentoring_Program />} />
          <Route path="/create_program" element={<Create_Program />} />
          <Route path="/program_preview" element={<Program_Preview />} />
          <Route path="/edit_program" element={<Edit_Program />} />
          <Route path="/program_create_profile_view" element={<Profile_View />} />
          <Route path="/assigned_learning_profile" element={<Assigned_Learning_Profile />} />
          <Route path="/program_publish_profile_view" element={<Program_Publish />} />
          <Route path="/program_progress_profile_view" element={<Program_Progress />} />
          <Route path="/past_batches" element={<Past_Batches />} />
          <Route path="/program_settings" element={<Program_Settings />} />
          <Route path="/audiences" element={<Audiences />} />
          <Route path="/completed_by" element={<Completed_By />} />
          <Route path="/pending_by" element={<Pending_By />} />
          <Route path="/add_mentors" element={<Add_Mentors />} />
          <Route path="/all_task" element={<All_Task />} />
          <Route path="/all_notification" element={<All_Notification />} />
          <Route path="/all_activity" element={<All_Activity />} />
          <Route path="/selected_mentors" element={<Selected_Mentor />} />
          <Route path="/edit_learning" element={<Protected Component={Edit_Learning}/>} />
          <Route path="/add_mentees" element={<Add_Mentees />} />
          <Route path="/edit_mentees" element={<Edit_Mentees />} />
          <Route path="/edit_mentors" element={<Edit_Mentors />} />
          <Route path="/selected_mentees" element={<Selected_Mentees />} />
          <Route path="/mandatory_learning" element={<Mandatory_Learning />} />
          <Route path="/chat" element={<Chat_Screen />} />
          <Route path="/program_published_program_settings" element={<Program_Settings_Published />} />
          <Route path="/program_progress_program_settings" element={<Program_Settings_Progress />} />
          <Route path="/edit_created_learning" element={<Protected Component={Edit_Created_Learning}/>} />
          <Route path="/preview_program" element={<Protected Component={Preview_Program}/>} />
          <Route path="/mandatory_assessments" element={<Mandatory_Assessment />} />
          <Route path="/confirmed_participants" element={<Confirmed_Participants />} />
          <Route path="/program_progress" element={<Program_Progress1 />} />
          <Route path="/view_worksheets" element={<View_Worksheet />} />
          <Route path="/requested_worksheet" element={<Requested_Worksheet />} />
          <Route path="/mentee_wise_program" element={<Mentee_Wise_Program />} />
          <Route path="/mentee_profile" element={<Mentee_Profile />} />
          <Route path="/edit_mentee" element={<Edit_Mentee />} />
          <Route path="/mentor_profile" element={<Mentor_Profile />} />
          <Route path="/edit_mentor" element={<Edit_Mentor />} />
          <Route path="/resources" element={<Resources_Screen />} />
          <Route path="/add_resources" element={<Add_Resources />} />
          <Route path="/edit_resources" element={<Edit_Resources />} />
          <Route path="/resources_detail" element={<Resources_Detail />} />
          <Route path="/progress_report" element={<Progress_Report />} />
          <Route path="/setting_screen" element={<Protected Component={Setting_Screen}/>} />
          <Route path="/edit_company_setting" element={<Protected Component={Edit_Company_Setting}/>} />
          <Route path="/program_past_profile_view" element={<Protected Component={Program_Past}/>} />
          <Route path="/assigned_learning" element={<Protected Component={Assigned_Learning}/>} />
          <Route path="/competency_report_for_mentees" element={<Protected Component={Competency_Report_For_Mentees}/>} />
          <Route path="/adoptation_report" element={<Protected Component={Adoptation_Report}/>} />
          <Route path="/edit_worksheet_request" element={<Protected Component={Edit_Worksheet_Request}/>} />
          <Route path="/idp_status" element={<Protected Component={IDP_Status}/>} />
          <Route path="/live_session_profile" element={<Protected Component={Live_Session}/>} />
          <Route path="/past_session_profile" element={<Protected Component={Past_Session}/>} />
          <Route path="/group_sessionlist" element={<Protected Component={Group_SessionList}/>} />
          <Route path="/cohort_sessionlist" element={<Protected Component={Cohort_SessionList}/>} />
          <Route path="/edit_group_session" element={<Protected Component={Edit_Group_Session}/>} />
          <Route path="/inaugural_sessionlist" element={<Protected Component={Inaugural_SessionList}/>} />
          <Route path="/view_feedbacks" element={<Protected Component={View_Feedbacks}/>} />
          <Route path="/view_testimonials" element={<Protected Component={View_Testimonials}/>} />
          <Route path="/view_ratings" element={<Protected Component={View_Ratings}/>} />
          <Route path="/competency_report_for_mentors" element={<Protected Component={Competency_Report_For_Mentors}/>} />
          <Route path="/create_inaugural_session" element={<Protected Component={Create_Inaugural_Session}/>} />
          <Route path="/edit_inaugural_session" element={<Protected Component={Edit_Inaugural_Session}/>} />
          <Route path="/create_group_session" element={<Protected Component={Create_Group_Session}/>} />
          <Route path="/create_cohort_session" element={<Protected Component={Create_Cohort_Session}/>} />
          <Route path="/session_list" element={<Protected Component={Session_List}/>} />
          <Route path="/edit_cohort_session" element={<Protected Component={Edit_Cohort_Session}/>} />
          <Route path="/idp_full_view" element={<Protected Component={Idp_Full_View}/>} />
          <Route path="/feedback_and_ratings_report_mentees" element={<Protected Component={Feedback_And_Ratings_Report_Mentees}/>} />
          <Route path="/feedback_and_ratings_report_mentors" element={<Protected Component={Feedback_And_Ratings_Report_Mentors}/>} />
          <Route path="/mentoring_impact_report" element={<Protected Component={Mentoring_Impact_Report}/>} />
          <Route path="/add_admin" element={<Add_Admin />} />
          <Route path="/edit_admin" element={<Edit_Admin />} />
          <Route path="/edit_profile" element={<Edit_Profile />} />
          <Route path="/notification_setting" element={<Notification_Setting />} />
          <Route path="/edit_setting" element={<Edit_Setting />} />
          <Route path="/community_screen" element={<Community_Screen />} />
          <Route path="/create_community" element={<Create_Community />} />
          <Route path="/community_detail" element={<Community_Detail />} />
          <Route path="/community_profile" element={<Community_Profile />} />
          <Route path="/comment_screen" element={<Comment_Screen />} />
          <Route path="/people_react" element={<People_React />} />
          <Route path="/invite_people" element={<Invite_People />} />
          <Route path="/create_post" element={<Create_Post />} />
          <Route path="/member_list" element={<Member_List />} />
          <Route path="/learning_screen" element={<Learning_Screen />} />
          <Route path="/create_learning" element={<Create_Learning />} />
          <Route path="/created_learning_profile" element={<Created_Learning_Profile />} />
          <Route path="/check_learning" element={<Check_Learning />} />
          <Route path="/check_verify_learning_profile" element={<Check_Verify />} />
          <Route path="/check_learning_mentee" element={<Protected Component={Check_Learning_Mentee} />} />
        </Routes>
      </BrowserRouter>
    )}
    {userCheck == "mentor" &&(
      <MainRouteMentor fcmToken={fcmToken}/>
    )}
    {userCheck == "super_admin" &&(
      <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/" element={<Protected Component={Home_Screen}/>} />
        <Route path="/admin_login" element={<Admin_Login fcmToken={fcmToken} />} />
        <Route path="/admin_signup" element={<Admin_Signup />} />
        <Route path="/admin_signup/:id" element={<Admin_Signup/>} />
        <Route path="/sidebar" element={<Side_Bar />} />
        <Route path="/mentee_management" element={<Mentee_Management />} />
        <Route path="/browse_mentor_mentee" element={<Browse_mentor_mentee />} />
        <Route path="/add_mentee" element={<Add_Mentee />} />
        <Route path="/mentors" element={<Mentors_Screen />} />
        <Route path="/add_mentor" element={<Add_Mentor />} />
        <Route path="/forget_password" element={<Forget_Password />} />
        <Route path="/reset_password" element={<Reset_Password />} />
        <Route path="/reset_password/:id" element={<Reset_Password/>} />
        <Route path="/change_password" element={<Change_Password/>} />
        <Route path="/match_making" element={<Match_Making />} />
        <Route path="/confirm_pair" element={<Confirm_Pair />} />
        <Route path="/mentoring_program" element={<Mentoring_Program />} />
        <Route path="/assigned_learning_profile" element={<Assigned_Learning_Profile />} />
        <Route path="/create_program" element={<Create_Program />} />
        <Route path="/program_preview" element={<Program_Preview />} />
        <Route path="/edit_program" element={<Edit_Program />} />
        <Route path="/program_create_profile_view" element={<Profile_View />} />
        <Route path="/program_publish_profile_view" element={<Program_Publish />} />
        <Route path="/edit_learning" element={<Protected Component={Edit_Learning}/>} />
        <Route path="/program_progress_profile_view" element={<Program_Progress />} />
        <Route path="/past_batches" element={<Past_Batches />} />
        <Route path="/program_settings" element={<Program_Settings />} />
        <Route path="/add_mentors" element={<Add_Mentors />} />
        <Route path="/all_task" element={<All_Task />} />
          <Route path="/all_notification" element={<All_Notification />} />
          <Route path="/audiences" element={<Audiences />} />
          <Route path="/completed_by" element={<Completed_By />} />
          <Route path="/pending_by" element={<Pending_By />} />
          <Route path="/all_activity" element={<All_Activity />} />
        <Route path="/selected_mentors" element={<Selected_Mentor />} />
        <Route path="/add_mentees" element={<Add_Mentees />} />
        <Route path="/edit_mentees" element={<Edit_Mentees />} />
          <Route path="/edit_mentors" element={<Edit_Mentors />} />
        <Route path="/selected_mentees" element={<Selected_Mentees />} />
        <Route path="/mandatory_learning" element={<Mandatory_Learning />} />
        <Route path="/program_published_program_settings" element={<Program_Settings_Published />} />
        <Route path="/program_progress_program_settings" element={<Program_Settings_Progress />} />
        <Route path="/mandatory_assessments" element={<Mandatory_Assessment />} />
        <Route path="/confirmed_participants" element={<Confirmed_Participants />} />
        <Route path="/program_progress" element={<Program_Progress1 />} />
        <Route path="/view_worksheets" element={<View_Worksheet />} />
        <Route path="/requested_worksheet" element={<Requested_Worksheet />} />
        <Route path="/mentee_wise_program" element={<Mentee_Wise_Program />} />
        <Route path="/edit_created_learning" element={<Protected Component={Edit_Created_Learning}/>} />
        <Route path="/preview_program" element={<Protected Component={Preview_Program}/>} />
        <Route path="/competency_report_for_mentees" element={<Protected Component={Competency_Report_For_Mentees}/>} />
        <Route path="/assigned_learning" element={<Protected Component={Assigned_Learning}/>} />
        <Route path="/adoptation_report" element={<Protected Component={Adoptation_Report}/>} />
        <Route path="/competency_report_for_mentors" element={<Protected Component={Competency_Report_For_Mentors}/>} />
        <Route path="/feedback_and_ratings_report_mentees" element={<Protected Component={Feedback_And_Ratings_Report_Mentees}/>} />
        <Route path="/create_inaugural_session" element={<Protected Component={Create_Inaugural_Session}/>} />
        <Route path="/edit_inaugural_session" element={<Protected Component={Edit_Inaugural_Session}/>} />
        <Route path="/idp_status" element={<Protected Component={IDP_Status}/>} />
        <Route path="/edit_worksheet_request" element={<Protected Component={Edit_Worksheet_Request}/>} />
        <Route path="/view_feedbacks" element={<Protected Component={View_Feedbacks}/>} />
        <Route path="/idp_full_view" element={<Protected Component={Idp_Full_View}/>} />
        <Route path="/view_testimonials" element={<Protected Component={View_Testimonials}/>} />
          <Route path="/view_ratings" element={<Protected Component={View_Ratings}/>} />
        <Route path="/session_list" element={<Protected Component={Session_List}/>} />
        <Route path="/group_sessionlist" element={<Protected Component={Group_SessionList}/>} />
        <Route path="/past_session_profile" element={<Protected Component={Past_Session}/>} />
        <Route path="/edit_group_session" element={<Protected Component={Edit_Group_Session}/>} />
        <Route path="/program_past_profile_view" element={<Protected Component={Program_Past}/>} />
        <Route path="/live_session_profile" element={<Protected Component={Live_Session}/>} />
        <Route path="/create_group_session" element={<Protected Component={Create_Group_Session}/>} />
        <Route path="/cohort_sessionlist" element={<Protected Component={Cohort_SessionList}/>} />
        <Route path="/inaugural_sessionlist" element={<Protected Component={Inaugural_SessionList}/>} />
        <Route path="/edit_cohort_session" element={<Protected Component={Edit_Cohort_Session}/>} />
        <Route path="/create_cohort_session" element={<Protected Component={Create_Cohort_Session}/>} />
        <Route path="/feedback_and_ratings_report_mentors" element={<Protected Component={Feedback_And_Ratings_Report_Mentors}/>} />
        <Route path="/mentoring_impact_report" element={<Protected Component={Mentoring_Impact_Report}/>} />
        <Route path="/mentee_profile" element={<Mentee_Profile />} />
        <Route path="/edit_mentee" element={<Edit_Mentee />} />
        <Route path="/mentor_profile" element={<Mentor_Profile />} />
        <Route path="/edit_mentor" element={<Edit_Mentor />} />
        <Route path="/resources" element={<Resources_Screen />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/chat" element={<Chat_Screen />} />
        <Route path="/add_resources" element={<Add_Resources />} />
        <Route path="/edit_resources" element={<Edit_Resources />} />
        <Route path="/resources_detail" element={<Resources_Detail />} />
        <Route path="/progress_report" element={<Progress_Report />} />
        <Route path="/setting_screen" element={<Protected Component={Setting_Screen}/>} />
        <Route path="/edit_company_setting" element={<Protected Component={Edit_Company_Setting}/>} />
        <Route path="/add_admin" element={<Add_Admin />} />
        <Route path="/edit_admin" element={<Edit_Admin />} />
        <Route path="/edit_profile" element={<Edit_Profile />} />
        <Route path="/notification_setting" element={<Notification_Setting />} />
        <Route path="/edit_setting" element={<Edit_Setting />} />
        <Route path="/community_screen" element={<Community_Screen />} />
        <Route path="/create_community" element={<Create_Community />} />
        <Route path="/community_detail" element={<Community_Detail />} />
        <Route path="/community_profile" element={<Community_Profile />} />
        <Route path="/comment_screen" element={<Comment_Screen />} />
        <Route path="/people_react" element={<People_React />} />
        <Route path="/invite_people" element={<Invite_People />} />
        <Route path="/create_post" element={<Create_Post />} />
        <Route path="/member_list" element={<Member_List />} />
        <Route path="/learning_screen" element={<Learning_Screen />} />
        <Route path="/create_learning" element={<Create_Learning />} />
        <Route path="/created_learning_profile" element={<Created_Learning_Profile />} />
        <Route path="/check_learning" element={<Check_Learning />} />
        <Route path="/check_verify_learning_profile" element={<Check_Verify />} />
        <Route path="/check_learning_mentee" element={<Protected Component={Check_Learning_Mentee} />} />
      </Routes>
    </BrowserRouter>
    )}
    {userCheck == "admin" &&(
      <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/" element={<Protected Component={Home_Screen}/>} />
        <Route path="/admin_login" element={<Admin_Login fcmToken={fcmToken} />} />
        <Route path="/admin_signup" element={<Admin_Signup />} />
        <Route path="/admin_signup/:id" element={<Admin_Signup/>} />
        <Route path="/sidebar" element={<Side_Bar />} />
        <Route path="/mentee_management" element={<Mentee_Management />} />
        <Route path="/browse_mentor_mentee" element={<Browse_mentor_mentee />} />
        <Route path="/add_mentee" element={<Add_Mentee />} />
        <Route path="/mentors" element={<Mentors_Screen />} />
        <Route path="/add_mentor" element={<Add_Mentor />} />
        <Route path="/forget_password" element={<Forget_Password />} />
        <Route path="/reset_password" element={<Reset_Password />} />
        <Route path="/reset_password/:id" element={<Reset_Password/>} />
        <Route path="/change_password" element={<Change_Password/>} />
        <Route path="/match_making" element={<Match_Making />} />
        <Route path="/confirm_pair" element={<Confirm_Pair />} />
        <Route path="/mentoring_program" element={<Mentoring_Program />} />
        <Route path="/assigned_learning_profile" element={<Assigned_Learning_Profile />} />
        <Route path="/create_program" element={<Create_Program />} />
        <Route path="/program_preview" element={<Program_Preview />} />
        <Route path="/edit_program" element={<Edit_Program />} />
        <Route path="/program_create_profile_view" element={<Profile_View />} />
        <Route path="/program_publish_profile_view" element={<Program_Publish />} />
        <Route path="/program_progress_profile_view" element={<Program_Progress />} />
        <Route path="/past_batches" element={<Past_Batches />} />
        <Route path="/program_settings" element={<Program_Settings />} />
        <Route path="/add_mentors" element={<Add_Mentors />} />
        <Route path="/all_task" element={<All_Task />} />
          <Route path="/all_notification" element={<All_Notification />} />
          <Route path="/all_activity" element={<All_Activity />} />
        <Route path="/selected_mentors" element={<Selected_Mentor />} />
        <Route path="/add_mentees" element={<Add_Mentees />} />
        <Route path="/edit_mentees" element={<Edit_Mentees />} />
          <Route path="/edit_mentors" element={<Edit_Mentors />} />
        <Route path="/selected_mentees" element={<Selected_Mentees />} />
        <Route path="/audiences" element={<Audiences />} />
          <Route path="/completed_by" element={<Completed_By />} />
          <Route path="/pending_by" element={<Pending_By />} />
        <Route path="/mandatory_learning" element={<Mandatory_Learning />} />
        <Route path="/program_published_program_settings" element={<Program_Settings_Published />} />
        <Route path="/program_progress_program_settings" element={<Program_Settings_Progress />} />
        <Route path="/mandatory_assessments" element={<Mandatory_Assessment />} />
        <Route path="/confirmed_participants" element={<Confirmed_Participants />} />
        <Route path="/program_progress" element={<Program_Progress1 />} />
        <Route path="/view_worksheets" element={<View_Worksheet />} />
        <Route path="/requested_worksheet" element={<Requested_Worksheet />} />
        <Route path="/mentee_wise_program" element={<Mentee_Wise_Program />} />
        <Route path="/edit_created_learning" element={<Protected Component={Edit_Created_Learning}/>} />
        <Route path="/preview_program" element={<Protected Component={Preview_Program}/>} />
        <Route path="/mentee_profile" element={<Mentee_Profile />} />
        <Route path="/edit_mentee" element={<Edit_Mentee />} />
        <Route path="/mentor_profile" element={<Mentor_Profile />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/edit_mentor" element={<Edit_Mentor />} />
        <Route path="/resources" element={<Resources_Screen />} />
        <Route path="/add_resources" element={<Add_Resources />} />
        <Route path="/edit_resources" element={<Edit_Resources />} />
        <Route path="/resources_detail" element={<Resources_Detail />} />
        <Route path="/progress_report" element={<Progress_Report />} />
        <Route path="/setting_screen" element={<Protected Component={Setting_Screen}/>} />
        <Route path="/edit_learning" element={<Protected Component={Edit_Learning}/>} />
        <Route path="/edit_company_setting" element={<Protected Component={Edit_Company_Setting}/>} />
        <Route path="/past_session_profile" element={<Protected Component={Past_Session}/>} />
        <Route path="/idp_status" element={<Protected Component={IDP_Status}/>} />
        <Route path="/competency_report_for_mentees" element={<Protected Component={Competency_Report_For_Mentees}/>} />
        <Route path="/adoptation_report" element={<Protected Component={Adoptation_Report}/>} />
        <Route path="/edit_worksheet_request" element={<Protected Component={Edit_Worksheet_Request}/>} />
        <Route path="/edit_group_session" element={<Protected Component={Edit_Group_Session}/>} />
        <Route path="/group_sessionlist" element={<Protected Component={Group_SessionList}/>} />
        <Route path="/cohort_sessionlist" element={<Protected Component={Cohort_SessionList}/>} />
        <Route path="/inaugural_sessionlist" element={<Protected Component={Inaugural_SessionList}/>} />
        <Route path="/competency_report_for_mentors" element={<Protected Component={Competency_Report_For_Mentors}/>} />
        <Route path="/assigned_learning" element={<Protected Component={Assigned_Learning}/>} />
        <Route path="/session_list" element={<Protected Component={Session_List}/>} />
        <Route path="/view_feedbacks" element={<Protected Component={View_Feedbacks}/>} />
        <Route path="/view_testimonials" element={<Protected Component={View_Testimonials}/>} />
        <Route path="/live_session_profile" element={<Protected Component={Live_Session}/>} />
          <Route path="/view_ratings" element={<Protected Component={View_Ratings}/>} />
          <Route path="/idp_full_view" element={<Protected Component={Idp_Full_View}/>} />
        <Route path="/feedback_and_ratings_report_mentees" element={<Protected Component={Feedback_And_Ratings_Report_Mentees}/>} />
        <Route path="/program_past_profile_view" element={<Protected Component={Program_Past}/>} />
        <Route path="/create_inaugural_session" element={<Protected Component={Create_Inaugural_Session}/>} />
        <Route path="/edit_inaugural_session" element={<Protected Component={Edit_Inaugural_Session}/>} />
        <Route path="/create_group_session" element={<Protected Component={Create_Group_Session}/>} />
        <Route path="/create_cohort_session" element={<Protected Component={Create_Cohort_Session}/>} />
        <Route path="/edit_cohort_session" element={<Protected Component={Edit_Cohort_Session}/>} />
        <Route path="/feedback_and_ratings_report_mentors" element={<Protected Component={Feedback_And_Ratings_Report_Mentors}/>} />
        <Route path="/mentoring_impact_report" element={<Protected Component={Mentoring_Impact_Report}/>} />
        <Route path="/add_admin" element={<Add_Admin />} />
        <Route path="/edit_admin" element={<Edit_Admin />} />
        <Route path="/edit_profile" element={<Edit_Profile />} />
        <Route path="/notification_setting" element={<Notification_Setting />} />
        <Route path="/edit_setting" element={<Edit_Setting />} />
        <Route path="/community_screen" element={<Community_Screen />} />
        <Route path="/chat" element={<Chat_Screen />} />
        <Route path="/create_community" element={<Create_Community />} />
        <Route path="/community_detail" element={<Community_Detail />} />
        <Route path="/community_profile" element={<Community_Profile />} />
        <Route path="/comment_screen" element={<Comment_Screen />} />
        <Route path="/people_react" element={<People_React />} />
        <Route path="/invite_people" element={<Invite_People />} />
        <Route path="/create_post" element={<Create_Post />} />
        <Route path="/member_list" element={<Member_List />} />
        <Route path="/learning_screen" element={<Learning_Screen />} />
        <Route path="/create_learning" element={<Create_Learning />} />
        <Route path="/created_learning_profile" element={<Created_Learning_Profile />} />
        <Route path="/check_learning" element={<Check_Learning />} />
        <Route path="/check_verify_learning_profile" element={<Check_Verify />} />
        <Route path="/check_learning_mentee" element={<Protected Component={Check_Learning_Mentee} />} />
      </Routes>
    </BrowserRouter>
    )}
    {userCheck == "mentee" &&(
      <MainRouteMentee fcmToken={fcmToken}/>
    )}
    
    </div>



  );
}

export default App;
