import './mentor.css';
import React from 'react'
import Side_bar from './sidebar';
import Home_Screen from './home';
import My_Profile from './my_profile';
import My_Mentee from './my_mentee';
import Browse_Mentee from './browse_mentee';
import Mentee_Profile from './mentee_profile';
import Mentee_Program_progress from './mentee_program_progress';
import Chat_Screen from './chat';
import Session_list from './sessions_list';
import Past_Session from './past_session_profile';
import Survey from './survey';
import Live_Session from './live_session_profile';
import Edit_Created_Learning from './edit_created_learning';
import Edit_Learning from './edit_learning';
import Mentoring_Program from './mentoring_program';
import Upcoming_Program from './mentoring_program_upcoming';
import Program_Progress from './mentoring_program_progress';
import Completed_Program from './mentoring_program_completed';
import Audiences from './audiences';
import Completed_By from './completed_by';
import Pending_By from './pending_by';
import Program_Statistics from './program_statistics';
import Idp_Screen from './idp';
import Idp_Full_View from './idp_full_view';
import Idp_Approved from './idp_approved';
import Learning_Screen from './learning_screen';
import Create_Learning from './create_learning';
import Create_Time_Slot from './create_time_slot';
import Created_Learning_Profile from './created_learning_profile';
import Assigned_Learning_Profile from './assigned_learning_profile';
import Check_Learning from './check_learning';
import Check_Learning_Mentee from './check_learning_mentee';
import Check_Verify from './check_verify_learning_profile';
import Assessment_Screen from './assessment_screen';
import All_Task from './all_task';
import All_Notification from './all_notification';
import All_Activity from './all_activity';
import Create_Assessment from './create_assessment';
import Assessment_Profile from './assessment_profile';
import Check_Assessment from './check_assessment';
import Check_Verify_Assessment from './check_verify';
import Resources_Screen from './resources';
import Resources_Detail from './resources_detail';
import Community_Screen from './community_screen';
import Create_Community from './create_community';
import Community_Profile from './community_profile';
import Community_Detail from './community_detail';
import Invite_People from './invite_people';
import Create_Post from './create_post';
import Member_List from './member_list';
import People_React from './people_react';
import Comment_Screen from './comment_screen';
import Report_Screen from './reports_screen';
import Support_Help from './support_help';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin_Login from '../admin_login';
import Edit_Profile_Mentor from './edit_profile';
import Preferences_Question from './preference_question';
import Preferences_Question1 from './preference_question1';
import Preferences_Question2 from './preference_question2';
import Calendar_Open from './calendar';
import Edit_Calendar from './edit_calendar';
import Change_Password from './change_password';
import Protected from '../../../Protected'

function MainRouteMentor({fcmToken}) {
    return (
        <BrowserRouter basename="/admin">
            <Routes>
                <Route path="/sidebar" element={Side_bar} />
                <Route path="/" element={<Protected Component={Home_Screen} />} />
                <Route path="/admin_login" element={<Admin_Login fcmToken={fcmToken}/>} />
                <Route path="/my_profile" element={<Protected Component={My_Profile} />} />
                <Route path="/edit_profile" element={<Protected Component={Edit_Profile_Mentor} />} />
                <Route path="/my_mentee" element={<Protected Component={My_Mentee} />} />
                <Route path="/browse_mentee" element={<Protected Component={Browse_Mentee} />} />
                <Route path="/mentee_profile" element={<Protected Component={Mentee_Profile} />} />
                <Route path="/preference_one" element={<Protected Component={Preferences_Question} />} />
                <Route path="/preference_two" element={<Protected Component={Preferences_Question1} />} />
                <Route path="/preference_three" element={<Protected Component={Preferences_Question2} />} />
                <Route path="/mentee_program_progress" element={<Protected Component={Mentee_Program_progress} />} />
                <Route path="/chat" element={<Protected Component={Chat_Screen} />} />
                <Route path="/sessions_list" element={<Protected Component={Session_list} />} />
                <Route path="/calender" element={<Protected Component={Calendar_Open} />} />
                <Route path="/edit_calendar" element={<Protected Component={Edit_Calendar} />} />
                <Route path="/past_session_profile" element={<Protected Component={Past_Session} />} />
                <Route path="/live_session_profile" element={<Protected Component={Live_Session} />} />
                <Route path="/mentoring_program" element={<Protected Component={Mentoring_Program} />} />
                <Route path="/mentoring_program_upcoming" element={<Protected Component={Upcoming_Program} />} />
                <Route path="/mentoring_program_progress" element={<Protected Component={Program_Progress} />} />
                <Route path="/mentoring_program_completed" element={<Protected Component={Completed_Program} />} />
                <Route path="/program_statistics" element={<Protected Component={Program_Statistics} />} />
                <Route path="/idp" element={<Protected Component={Idp_Screen} />} />
                <Route path="/idp_full_view" element={<Protected Component={Idp_Full_View} />} />
                <Route path="/idp_approved" element={<Protected Component={Idp_Approved} />} />
                <Route path="/learning_screen" element={<Protected Component={Learning_Screen} />} />
                <Route path="/audiences" element={<Protected Component={Audiences} />} />
                <Route path="/completed_by" element={<Protected Component={Completed_By} />} />
                <Route path="/pending_by" element={<Protected Component={Pending_By} />} />
                <Route path="/assigned_learning_profile" element={<Protected Component={Assigned_Learning_Profile} />} />
                <Route path="/edit_learning" element={<Protected Component={Edit_Learning} />} />
                <Route path="/survey" element={<Protected Component={Survey} />} />
                <Route path="/create_learning" element={<Protected Component={Create_Learning} />} />
                <Route path="/edit_created_learning" element={<Protected Component={Edit_Created_Learning}/>} />
                <Route path="/create_time_slot" element={<Protected Component={Create_Time_Slot} />} />
                <Route path="/created_learning_profile" element={<Protected Component={Created_Learning_Profile} />} />
                <Route path="/check_learning" element={<Protected Component={Check_Learning} />} />
                <Route path="/check_learning_mentee" element={<Protected Component={Check_Learning_Mentee} />} />
                <Route path="/check_verify_learning_profile" element={<Protected Component={Check_Verify} />} />
                <Route path="/assessment_screen" element={<Protected Component={Assessment_Screen} />} />
                <Route path="/all_task" element={<Protected Component={All_Task} />} />
                <Route path="/all_notification" element={<Protected Component={All_Notification} />} />
                <Route path="/all_activity" element={<Protected Component={All_Activity} />} />
                <Route path="/create_assessment" element={<Protected Component={Preferences_Question} />} />
                <Route path="/assessment_profile" element={<Protected Component={Assessment_Profile} />} />
                <Route path="/check_assessment" element={<Protected Component={Check_Assessment} />} />
                <Route path="/check_verify" element={<Protected Component={Check_Verify_Assessment} />} />
                <Route path="/resources" element={<Protected Component={Resources_Screen} />} />
                <Route path="/resources_detail" element={<Protected Component={Resources_Detail} />} />
                <Route path="/community_screen" element={<Protected Component={Community_Screen} />} />
                <Route path="/create_community" element={<Protected Component={Create_Community} />} />
                <Route path="/community_profile" element={<Protected Component={Community_Profile} />} />
                <Route path="/community_detail" element={<Protected Component={Community_Detail} />} />
                <Route path="/invite_people" element={<Protected Component={Invite_People} />} />
                <Route path="/create_post" element={<Protected Component={Create_Post} />} />
                <Route path="/member_list" element={<Protected Component={Member_List} />} />
                <Route path="/people_react" element={<Protected Component={People_React} />} />
                <Route path="/comment_screen" element={<Protected Component={Comment_Screen} />} />
                <Route path="/reports_screen" element={<Protected Component={Report_Screen} />} />
                <Route path="/support_help" element={<Protected Component={Support_Help} />} /> 
                <Route path="/change_password" element={<Protected Component={Change_Password} />} /> 
            </Routes>
        </BrowserRouter>

    )
}

export default MainRouteMentor