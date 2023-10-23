import team_img from '../../img/tm1.png';
import search_img from '../../img/svg/search1.svg';
import send_img from '../../img/sends.svg';
import paper_img from '../../img/papers.svg';
import authornav_img from '../../img/user_pic.png';
import Side_bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { BASE_URL } from "../../services/Config";
import { getFirestore, collection, addDoc, getDocs, query, initializeFirestore, setDoc, doc, serverTimestamp, orderBy, Query, onSnapshot } from "firebase/firestore";
const data = [
    { id: 1, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources", community_heading: "What is Lorem Ipsum?", community_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", community_react: "10 react", community_comment: "7 comments" },
    { id: 2, community_name: "Anika Schleifer", author_name: "Senior Director - Human Resources", community_heading: "What is Lorem Ipsum?", community_para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", community_react: "10 react", community_comment: "7 comments" },
];

function Chat_Screen() {
    const { state } = useLocation()
    console.log(state)
    const [EachMessages, setEachMessages] = useState("")
    const [messageForApi, setMessagesForApi] = useState('');
    const [messages, setMessages] = useState([])
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [userInfo, setUserInfo] = useState("")
    const [userName, setUserName] = useState("")
    const [userTitle, setUserTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [chatList, setChatList] = useState([])
    const [chatSearch, setChatSearch] = useState("")
    const [toCheckColor, setToCheckColor] = useState(state.id)
    const [chatPersonID, setChatPersonID] = useState(state.id)
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
        getUserID()
        getAllChat()
    }, [])
    const getUserID = async () => {
            const token = await localStorage.getItem("token");
            const btoken = `Bearer ${token}`;
            const res = await fetch(`${BASE_URL}organisation-admins/my-profile`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: btoken,
              },
            });
            const response = await res.json();
            const { success, data } = response;
            console.log(response)
            if(success){
                setUserInfo(response.data.id)
                getDATA(response.data.id)
            }
            
    }

    const getAllChat = async() => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;

        const res = await fetch(`https://api.wiseqglobal.com/api/chats`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
        // console.log(response)
        setChatList(response.data)
    }

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyA8Pxoag7noGLcWTwGDPl8H3-kGMyz_nXg",
        authDomain: "wiseq-abfae.firebaseapp.com",
        projectId: "wiseq-abfae",
        storageBucket: "wiseq-abfae.appspot.com",
        messagingSenderId: "943921110152",
        appId: "1:943921110152:web:23cc371de361a8e15a133d",
        measurementId: "G-72BMLW09E6"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = initializeFirestore(app, {
        experimentalForceLongPolling: true,
    });

    console.log(chatPersonID)
    // const getDATA = async (my_id) => {
    //     // const docId = 1 > 2 ? 2 + "-" + 1 : 1 + "-" + 2;
    //     // const docId = my_id + "-" + state.id;
    //     console.log(userInfo)
    //     console.log(state.id)
    //     let roomName = 'chat_'+(my_id<state.id ? my_id+'_'+state.id : state.id+'_'+my_id);
    //     console.log(roomName)
    //     onSnapshot(query(collection(firestore, roomName), orderBy("createdAt")), (snapshot) => {
    //         setMessages(snapshot.docs.map((doc) => doc.data()));
    //         console.log(snapshot.docs.map((doc) => doc.data()))
    //     });
    // }
    // const getDATA1 = async (user_id) => {
    //     // const docId = 1 > 2 ? 2 + "-" + 1 : 1 + "-" + 2;
    //     // const docId = userInfo + "-" + user_id;
    //     console.log(userInfo)
    //     console.log(state.id)
    //     let roomName = 'chat_'+(userInfo<user_id ? userInfo+'_'+user_id : user_id+'_'+userInfo);
    //     console.log(roomName)
    //     onSnapshot(query(collection(firestore, roomName), orderBy("createdAt")), (snapshot) => {
    //         setMessages(snapshot.docs.map((doc) => doc.data()));
    //         // console.log(snapshot.docs.map((doc) => doc.data()))
    //     });
    // }


    // const sendMessage = async () => {
    //     const token = await localStorage.getItem("token")
    //     const btoken = `Bearer ${token}`;
    //     if (!EachMessages) {
    //         alert("Write your message")
    //         return
    //     }
    //     const msg = {
    //         'message': EachMessages,
    //         'sendBy': userInfo,
    //         'sendTo': state.id,
    //         'createdAt': new Date()
    //     }
    //     // alert(JSON.stringify(msg, null, 2))
    //     setEachMessages('')
    //     setMessages(prevState => [...prevState, msg])
    //     console.log(userInfo)
    //     console.log(state.id)
    //     let roomName = 'chat_'+(userInfo<state.id || toCheckColor ? userInfo+'_'+state.id || toCheckColor: state.id ||toCheckColor+'_'+userInfo);
    //     console.log(roomName)
    //     // const docId = userInfo + "-" + state.id;
    //     // firestore().collection('chatroom').doc(docId).collection('messages').add({...msg, createAt:firestore.FieldValue.serverTimestamp()})
    //     await addDoc(collection(firestore, roomName), {
    //         ...msg, createAt: new Date(),
    //     });
    //     const body = {
            
    //             "sentFrom": userInfo,
    //             "sentTo": state.id,
    //             "message": messageForApi
              
    //       }
    //       const res = await fetch(`https://api.wiseqglobal.com/api/chats`, {
    //         method: 'POST',
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": btoken,
    //         },
    //         body:JSON.stringify(body)
    //     })
    //     const response = await res.json()
    //     // console.log(response)
    //     getAllChat()
    // }

    const getDATA = async (my_id) => {
        const docId = my_id > chatPersonID ? chatPersonID + "-" + my_id : my_id + "-" + chatPersonID;
        // const docId = my_id + "-" + state.id;
        // console.log(docId)
        onSnapshot(query(collection(firestore, docId), orderBy("createdAt")), (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
            console.log(snapshot.docs.map((doc) => doc.data()))
        });
    }
    const getDATA1 = async (user_id) => {
        const docId = userInfo > user_id ? user_id + "-" + userInfo : userInfo + "-" + user_id;
        // const docId = userInfo + "-" + user_id;
        // console.log(docId)
        onSnapshot(query(collection(firestore, docId), orderBy("createdAt")), (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
            // console.log(snapshot.docs.map((doc) => doc.data()))
        });
    }


    const sendMessage = async (e) => {
        e.preventDefault()
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        if (!EachMessages) {
            alert("Write your message")
            return
        }
        const msg = {
            'message': EachMessages,
            'sendBy': userInfo,
            // 'sendTo': state.id,
            'sendTo': chatPersonID,
            'createdAt': new Date()
        }
        // alert(JSON.stringify(msg, null, 2))
        setEachMessages('')
        setMessages(prevState => [...prevState, msg])
        // const docId = userInfo + "-" + state.id;
        const docId = userInfo > chatPersonID ? chatPersonID + "-" + userInfo : userInfo + "-" + chatPersonID;
        // firestore().collection('chatroom').doc(docId).collection('messages').add({...msg, createAt:firestore.FieldValue.serverTimestamp()})
        await addDoc(collection(firestore, docId), {
            ...msg, createAt: new Date(),
        });
        const body = {
            
                "sentFrom": userInfo,
                // "sentTo": state.id,
                "sentTo": chatPersonID,
                "message": messageForApi
              
          }
          const res = await fetch(`https://api.wiseqglobal.com/api/chats`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body:JSON.stringify(body)
        })
        const response = await res.json()
        // console.log(response)
        getAllChat()
    }

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    const filterChat = chatSearch
    ? chatList.filter(x =>
        // alert(JSON.stringify(x,null,2))
        x.userName.toLowerCase().includes(chatSearch.toLowerCase())
    )
    : chatList;

    return (

        <div className="main-content">
            <div style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }} className="contents expanded">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb-main">
                                <h4 class="text-capitalize breadcrumb-title">Chat</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-area d-flex mb-40">
                    <div className="mb-lg-0 mb-40 chat-sidebar">
                        <div className="sidebar-group left-sidebar chat_sidebar">
                            <div id="chat" className="left-sidebar-wrap radius-xl active">
                                <div className="chat-wrapper py-25">
                                    <div className="search-header">
                                        <form action="" className="d-flex align-items-center">
                                            <img src={search_img} alt="search" className="svg" />
                                            <input value={chatSearch} onChange={e => setChatSearch(e.target.value)} className="form-control me-sm-2 border-0 box-shadow-none" type="search" placeholder="Search" aria-label="Search" />
                                        </form>
                                    </div>
                                    <div className="search-body">
                                        <ul className="user-list">
                                            {filterChat.map((i)=>(
                                               <div style={{backgroundColor: i.userId == toCheckColor ? "#fdefe6": "white"}} onClick={() => {
                                                setChatPersonID(i.userId)
                                                getDATA1(i.userId)
                                                setUserTitle(i.jobTitle)
                                                setUserName(i.userName)
                                                setImageUrl(i.imageUrl)
                                                setToCheckColor(i.userId)
                                            }
                                                
                                                } className="box_shadow1 notifi  mb-15">
                                               <li className="user-list-item">
                                                   <div className="user-list-item__wrapper">
                                                       <div className="avatar avatar-circle ms-0">
                                                           <img src={i.imageUrl == "" ? authornav_img : i.imageUrl} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                       </div>
                                                       <div className="users-list-body">
                                                           <div className="users-list-body-title">
                                                               <h6>{i.userName}</h6>
                                                               <div className="text-limit" data-maxlength="10">
                                                                   <p className="mb-0"><span>{i.jobTitle}</span>...</p>
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </li>
                                           </div> 
                                            ))}
                                            {/* <div className="box_shadow1 notifi bg-petrol mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Meyri Carles</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>HR Manager - Employee Engage</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="box_shadow1 notifi mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Shreyu Neu</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>Manager - Talent Development</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="box_shadow1 notifi mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Domnic Harris</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>Manager - Talent Development</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="box_shadow1 notifi mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Khalid Hasan</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>Asst. Manager - IT</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="box_shadow1 notifi mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Tuhin Molla</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>Sr. Executive - HR</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="box_shadow1 notifi mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Shreyu Neu</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>Manager - Talent Development</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="box_shadow1 notifi mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Shreyu Neu</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>Manager - Talent Development</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="box_shadow1 notifi mb-15">
                                                <li className="user-list-item">
                                                    <div className="user-list-item__wrapper">
                                                        <div className="avatar avatar-circle ms-0">
                                                            <img src={team_img} className="rounded-circle wh-46 d-flex bg-opacity-primary" />
                                                        </div>
                                                        <div className="users-list-body">
                                                            <div className="users-list-body-title">
                                                                <h6>Billal Hossain</h6>
                                                                <div className="text-limit" data-maxlength="10">
                                                                    <p className="mb-0"><span>HR Manager - Employee Engage</span>...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="chat box_shadow1">
                        <div className="chat-body bg-white radius-xl">
                            <div style={{backgroundColor:'#fdefe6'}} className="chat-header">
                                <div className="media chat-name align-items-center">
                                    <div className="media-body align-self-center ">
                                        <div className="media-body d-flex align-items-center">
                                            <img src={imageUrl || state.imageUrl == "" ? authornav_img : imageUrl|| state.imageUrl} className="me-20 wh-50 rounded-circle bg-opacity-primary" />
                                            <div>
                                                <h4 className="fw-500">{userName || state.name}</h4>
                                                <p className="fs-13 color-light mb-0">{userTitle|| state.jobTitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chats Thread */}


                            <div className="chat-box chat-box--big p-xl-30 ps-lg-20 pe-lg-0">
                                {messages.map((item) => (
                                    item.sendBy == chatPersonID ?
                                        <div className="flex-1 incoming-chat">
                                            <div className="chat-text-box ">
                                                <div className="media d-flex">
                                                    <div className="media-body">
                                                        <div className="chat-text-box__content">
                                                            <div className="d-flex align-items-center mb-20 mt-10">
                                                                <div className="chat-text-box__subtitle p-20 bg-deep">
                                                                    <p className="color-gray">{item.message}</p>
                                                                </div>
                                                            </div>
                                                            <div className="seen-chat d-flex align-items-center  justify-content-start mb-2 mt-10">
                                                                <div className="chat-text-box__title d-flex align-items-center me-10 ">
                                                                    <span className="chat-text-box__time fs-12 color-light fw-400">{new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[1]} {new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[2]}, {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[0]}:{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[1]} {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(" ")[1]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="flex-1 justify-content-end d-flex outgoing-chat mt-20">
                                            <div className="chat-text-box">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <div className="chat-text-box__content">
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <div style={{backgroundColor:'#fdefe6'}} className="chat-text-box__subtitle p-20">
                                                                    <p className="color-dark">{item.message}</p>
                                                                </div>
                                                            </div>
                                                            <div className="seen-chat d-flex align-items-center  justify-content-end mb-2 mt-10">
                                                                <div className="chat-text-box__title d-flex align-items-center me-10 ">
                                                                    <span className="chat-text-box__time fs-12 color-light fw-400">{new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[1]} {new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[2]}, {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[0]}:{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[1]} {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(" ")[1]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                ))}




                                {/* <div className="flex-1 justify-content-end d-flex outgoing-chat">
                                    <div className="chat-text-box">
                                        <div className="media ">
                                            <div className="media-body">
                                                <div className="chat-text-box__content">
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <div className="chat-text-box__subtitle p-20 bg-petrol">
                                                            <p className="color-dark">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...</p>
                                                        </div>
                                                    </div>
                                                    <div className="seen-chat d-flex align-items-center  justify-content-end mb-2 mt-10">
                                                        <div className="chat-text-box__title d-flex align-items-center me-10 ">
                                                            <span className="chat-text-box__time fs-12 color-light fw-400">6:25 PM</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex-1 incoming-chat mt-30">
                                    <div className="chat-text-box">
                                        <div className="media d-flex">
                                            <div className="media-body">
                                                <div className="chat-text-box__content">
                                                    <div className="d-flex align-items-center mb-20 mt-10">
                                                        <div className="chat-text-box__subtitle p-20 bg-deep">
                                                            <p className="color-gray">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...</p>
                                                        </div>
                                                    </div>
                                                    <div className="seen-chat d-flex align-items-center  justify-content-start mb-2 mt-10">
                                                        <div className="chat-text-box__title d-flex align-items-center me-10 ">
                                                            <span className="chat-text-box__time fs-12 color-light fw-400">6:30 PM</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex-1 justify-content-end d-flex outgoing-chat">
                                    <div className="chat-text-box">
                                        <div className="media ">
                                            <div className="media-body">
                                                <div className="chat-text-box__content">
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <div className="chat-text-box__subtitle p-20 bg-petrol">
                                                            <p className="color-dark">Jam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
                                                        </div>
                                                    </div>
                                                    <div className="seen-chat d-flex align-items-center  justify-content-end mb-2 mt-10">
                                                        <div className="chat-text-box__title d-flex align-items-center me-10 ">
                                                            <span className="chat-text-box__time fs-12 color-light fw-400">6:35 PM</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            {/* Button Options */}
                            <div style={{backgroundColor:'#f8a046'}} className="chat-footer1 px-xl-30 px-lg-20 pt-20 pb-20 pt-1">
                            <form onSubmit={sendMessage}>
                                <div className="chat-type-text">
                                    <div className="pt-0 outline-0 pb-0 pe-0 ps-0 rounded-0 position-relative d-flex align-items-center" tabindex="-1">
                                        <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                                            {/* <button type="button" className="border-0 btn-petrol-pet wh-50 p-10 rounded-circle">
                                                <img src={paper_img} className="svg" />
                                            </button> */}

                                            <div className=" flex-1 d-flex align-items-center chat-type-text__write ms-0">
                                                <input value={EachMessages} onChange={(e) => {
                                                    setMessagesForApi(e.target.value)
                                                    setEachMessages(e.target.value)

                                                    }} className="form-control border-0 bg-transparent box-shadow-none" placeholder="Type your message..." />
                                            </div>

                                            <div className="chat-type-text__btn">
                                                <button type="submit" className="border-0 btn-petrol-pet wh-50 p-10 rounded-circle">
                                                    <img src={send_img} className="svg" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Side_bar onClick={toggle} sideBarOpen={windowSize.innerWidth > 768 && sideBarOpen ? true : windowSize.innerWidth > 768 && !sideBarOpen ? false : windowSize.innerWidth < 768 && sideBarOpen ? false : true} />
        </div>

    );
}

export default Chat_Screen;
