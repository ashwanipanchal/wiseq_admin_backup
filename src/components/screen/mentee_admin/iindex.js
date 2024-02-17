import './mentee.css';
import React from 'react'
import Side_bar from './sidebar';
import Home_Screen from './home';
import My_Profile from './my_profile';
// import My_Mentee from './my_mentee';
// import Mentee_Profile from './mentee_profile';
// import Mentee_Program_progress from './mentee_program_progress';
// import Chat_Screen from './chat';
// import Session_list from './sessions_list';
import Support_Help from './support_help';
import All_Task from './all_task';
import All_Notification from './all_notification';
import All_Activity from './all_activity';
import Past_Session from './past_session_profile';
import Live_Session from './live_session_profile';
import Mentoring_Program from './mentoring_program';
import Upcoming_Program from './mentoring_program_upcoming';
import Progress_Program from './mentoring_program_progress';
import Completed_Program from './mentoring_program_completed';
import IDP from './idp';
import Learning_Screen from './learning_screen';
import Learning_Profile_Detail from './learning_profile_detail';
import All_Completed_Learning from './all_completed_learning';
import All_ToStart_Learning from './all_toStart_learning';
import All_Progress_Learning from './all_progress_learning';
import Assessment_Screen from './assessment_screen';
import View_Ratings from './view_rating';
// import Mentoring_Program from './mentoring_program';
// import Upcoming_Program from './mentoring_program_upcoming';
// import Program_Progress from './mentoring_program_progress';
// import Completed_Program from './mentoring_program_completed';
// import Program_Statistics from './program_statistics';
// import Idp_Screen from './idp';
// import Idp_Full_View from './idp_full_view';
// import Idp_Approved from './idp_approved';
// import Learning_Screen from './learning_screen';
// import Create_Learning from './create_learning';
// import Created_Learning_Profile from './created_learning_profile';
// import Check_Learning from './check_learning';
// import Check_Verify from './check_verify_learning_profile';
// import Assessment_Screen from './assessment_screen';
// import Create_Assessment from './create_assessment';
// import Assessment_Profile from './assessment_profile';
// import Check_Assessment from './check_assessment';
// import Check_Verify_Assessment from './check_verify';
// import Resources_Screen from './resources';
// import Resources_Detail from './resources_detail';
// import Create_Community from './create_community';
import Community_Screen from './community_screen';
import Survey from './survey';
// import Create_Community from './create_community';
// import Community_Profile from './community_profile';
// import Community_Detail from './community_detail';
// import Invite_People from './invite_people';
// import Create_Post from './create_post';
// import Member_List from './member_list';
// import People_React from './people_react';
// import Comment_Screen from './comment_screen';
import Report_Screen from './reports_screen';
// import Support_Help from './support_help';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin_Login from '../admin_login';
import Edit_Profile_Mentor from './edit_profile';
import Resources_Screen from './resources';
import Resources_Detail from './resources_detail';
import Preferences_Question from './preference_question';
import Create_IDP from './create_idp';
import Preferences_Question1 from './preference_question1';
import Preferences_Question2 from './preference_question2';
import Preferences_Question3 from './preference_question3';
import My_Mentor from './my_mentor';
import Mentor_Profile from './mentor_profile';
import Calendar_Open from './calendar';
import Session_list from './sessions_list';
import Browse_Mentee from './browse_mentee';
import Chat_Screen from './chat';
import Change_Password from './change_password';
import Idp_Full_View from './idp_full_view';
import Program_Statistics from './program_statistics';


function MainRouteMentee() {
    return (
        <BrowserRouter basename="/admin">
            <Routes>
                <Route path="/sidebar" element={<Side_bar />} />
                <Route path="/" element={<Home_Screen />} />
                <Route path="/admin_login" element={<Admin_Login />} />
                <Route path="/my_profile" element={<My_Profile />} />
                <Route path="/edit_profile" element={<Edit_Profile_Mentor />} />
                <Route path="/resources" element={<Resources_Screen />} />
                <Route path="/resources_detail" element={<Resources_Detail />} />
                <Route path="/preference_one" element={<Preferences_Question />} />
                <Route path="/preference_two" element={<Preferences_Question1 />} />
                <Route path="/preference_three" element={<Preferences_Question2 />} />
                <Route path="/preference_four" element={<Preferences_Question3 />} />
                <Route path="/my_mentor" element={<My_Mentor />} />
                <Route path="/all_task" element={<All_Task />}/>
                <Route path="/idp_full_view" element={<Idp_Full_View />}/>
                <Route path="/all_notification" element={<All_Notification />}/>
                <Route path="/all_activity" element={<All_Activity />}/>
                <Route path="/program_statistics" element={<Program_Statistics />}/>
                <Route path="/mentor_profile" element={<Mentor_Profile />} />
                <Route path="/calender" element={<Calendar_Open />} />
                <Route path="/sessions_list" element={<Session_list />} />
                <Route path="/mentoring_program_rating" element={<View_Ratings />} />
                <Route path="/browse_mentee" element={<Browse_Mentee />} />
                <Route path="/create_idp" element={<Create_IDP />} />
                <Route path="/chat" element={<Chat_Screen />} />
                <Route path="/live_session_profile" element={<Live_Session />} />
                <Route path="/past_session_profile" element={<Past_Session />} />
                <Route path="/mentoring_program_completed" element={<Completed_Program />} />
                <Route path="/support_help" element={<Support_Help />} />
                <Route path="/support_help" element={<Support_Help />} />
                <Route path="/change_password" element={<Change_Password/>} /> 
                <Route path="/mentoring_program" element={<Mentoring_Program/>} /> 
                <Route path="/mentoring_program_upcoming" element={<Upcoming_Program/>} /> 
                <Route path="/mentoring_program_progress" element={<Progress_Program/>} /> 
                <Route path="/idp" element={<IDP/>} /> 
                <Route path="/learning_screen" element={<Learning_Screen/>} /> 
                <Route path="/assessment_screen" element={<Assessment_Screen />} />
                <Route path="/community_screen" element={<Community_Screen />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/reports_screen" element={<Report_Screen />} />
                <Route path="/learning_profile_detail" element={<Learning_Profile_Detail />} />
                <Route path="/all_completed_learning" element={<All_Completed_Learning />} />
                <Route path="/all_toStart_learning" element={<All_ToStart_Learning />} />
                <Route path="/all_process_learning" element={<All_Progress_Learning />} />
                
                {/* <Route path="/my_mentee" element={<My_Mentee />} />
                <Route path="/mentee_profile" element={<Mentee_Profile />} />
                <Route path="/mentee_program_progress" element={<Mentee_Program_progress />} />
                <Route path="/chat" element={<Chat_Screen />} />
                <Route path="/sessions_list" element={<Session_list />} />
                <Route path="/past_session_profile" element={<Past_Session />} />
                <Route path="/live_session_profile" element={<Live_Session />} />
                <Route path="/mentoring_program" element={<Mentoring_Program />} />
                <Route path="/mentoring_program_upcoming" element={<Upcoming_Program />} />
                <Route path="/mentoring_program_progress" element={<Program_Progress />} />
                <Route path="/mentoring_program_completed" element={<Completed_Program />} />
                <Route path="/program_statistics" element={<Program_Statistics />} />
                <Route path="/idp" element={<Idp_Screen />} />
                <Route path="/idp_full_view" element={<Idp_Full_View />} />
                <Route path="/idp_approved" element={<Idp_Approved />} />
                <Route path="/learning_screen" element={<Learning_Screen />} />
                <Route path="/create_learning" element={<Create_Learning />} />
                <Route path="/created_learning_profile" element={<Created_Learning_Profile />} />
                <Route path="/check_learning" element={<Check_Learning />} />
                <Route path="/check_verify_learning_profile" element={<Check_Verify />} />
                <Route path="/create_assessment" element={<Create_Assessment />} />
                <Route path="/assessment_profile" element={<Assessment_Profile />} />
                <Route path="/check_assessment" element={<Check_Assessment />} />
                <Route path="/check_verify" element={<Check_Verify_Assessment />} />
                <Route path="/resources" element={<Resources_Screen />} />
                <Route path="/resources_detail" element={<Resources_Detail />} />
                
                <Route path="/create_community" element={<Create_Community />} />
                <Route path="/community_profile" element={<Community_Profile />} />
                <Route path="/community_detail" element={<Community_Detail />} />
                <Route path="/invite_people" element={<Invite_People />} />
                <Route path="/create_post" element={<Create_Post />} />
                <Route path="/member_list" element={<Member_List />} />
                <Route path="/people_react" element={<People_React />} />
                <Route path="/comment_screen" element={<Comment_Screen />} />
                <Route path="/reports_screen" element={<Report_Screen />} />
                <Route path="/support_help" element={<Support_Help />} /> */}
            </Routes>
        </BrowserRouter>

    )
}

export default MainRouteMentee