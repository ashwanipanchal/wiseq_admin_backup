import { useState } from 'react';
import allconnect_img from '../../img/all_connect.png';
import google_img from '../../img/google-Icon.svg';
import microsoft_img from '../../img/microsoft.svg';
import wise_img from '../../img/wise.png';
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../services/Config';
import EventEmitter from "reactjs-eventemitter";

function Admin_Login({fcmToken}) {
    console.log("fcm token in login screen", fcmToken)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [wrongCount, setWrongCount] = useState(0)
    const [passwordType, setPasswordType] = useState(true)
    const adminLogin = async(e) => {
        e.preventDefault()
        if(localStorage.getItem("wrong_login") >= 5){
            alert("You acount has been locked try again after 15 min.")
            return
        }else{
            const body = {
                email,
                password,
                "deviceToken": fcmToken
            }
            // console.log(body)
            const res = await fetch(`${BASE_URL}auth/login`,{
                method:'POST',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(body)
              })
              const response = await res.json()
            //   console.log(response)
            const {success, data, err} = response;
            if(success){
                localStorage.removeItem("wrong_login")
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user_type", response.data.role)
                localStorage.setItem("pref", response.data.isFirstLogin)
                localStorage.setItem("user_info", response.data.name);
                localStorage.setItem("image", response.data.imageUrl);
                localStorage.setItem("orgLogo", response.data.orgLogo);
                EventEmitter.emit('eventName', response.data.role)
                if(data.role == "mentor" || data.role == "mentee"){
                    if(data.isFirstLogin){
                        navigate("/preference_one")
                    }else{
                        navigate("/");
                    }
                }else{
                    navigate("/");
                }
            }else{
                // console.log(data.err.error)
                setWrongCount(wrongCount+1)
                localStorage.setItem("wrong_login", wrongCount+1);
                if(localStorage.getItem("wrong_login") == 5){
                    setTimeout(()=>{
                        setWrongCount(0)
                        localStorage.removeItem("wrong_login")
                },900000)
                // },60000)
                }
                alert("Details entered are incorrect")
            }
        }
        
    }
    return (

        <div className="App">
            <div className="main-content admin">
                <div className="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-8">
                                <div className="box_box border-0">
                                    <p className="para_content">If you are working on something that you really care about,
                                        you don’t have to be pushed. The vision pulls you.
                                        -  Steve Jobs</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <div className="edit-profile">
                                    <div className="card border-0">
                                        <div className="card-header">
                                            <div className="edit-profile__title">
                                                {/* <div className="edit-profile__logos">
                                                    <a href="#">

                                                        <img src={allconnect_img} className="dark" />
                                                        <img src={allconnect_img} className="light" />
                                                    </a>
                                                </div> */}
                                                <h6 className="text-center">Sign in</h6>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            
                                            <div className="edit-profile__body">
                                            <form onSubmit={adminLogin}>
                                                <div className="form-group mb-25">
                                                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" name="username" id="username" placeholder="Email Id" required/>
                                                </div>
                                                <div className="form-group mb-10">
                                                    <div className="position-relative">
                                                        <input value={password} onChange={e => setPassword(e.target.value)} id="password" type={passwordType ? "password" : "text"} className="form-control" name="password" placeholder="Password" required/>
                                                        {passwordType ? 
                                                        <div onClick={() =>setPasswordType(false)} className="uil uil-eye-slash text-lighten fs-15 field-icon toggle-password2"></div>:
                                                        <div onClick={() =>setPasswordType(true)} className="uil uil-eye text-lighten fs-15 field-icon toggle-password2"></div>}
                                                    </div>
                                                </div>
                                                <div className="admin-condition">
                                                    <div className="checkbox-theme-default custom-checkbox ">
                                                    </div>

                                                    <NavLink className="navbar-link color-primary ms-1" to="/forget_password">
                                                        forgot password?
                                                    </NavLink>
                                                </div>

                                                {/* <NavLink className="navbar-link color-primary ms-1" > */}
                                                    <div className="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">

                                                        <button type='submit' className="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn mb-20">
                                                            sign in
                                                        </button>


                                                    </div>
                                                {/* </NavLink> */}
                                                </form>
                                            </div>

                                            {/* <p className="social-connector social-connector__admin text-center">
                                                <span>Or</span>
                                            </p>
                                            <div className="button-group">
                                                <ul className="admin-socialBtn">
                                                    <li>
                                                        <button className="btn text-dark google w-100 mb-15">
                                                            <img src={google_img} className="svg" />
                                                            Sign In with Google
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button className="btn text-dark google w-100 facebook">
                                                            <img src={microsoft_img} className="svg" />
                                                            Sign In with Microsoft
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div> */}

                                            <div className="admin-topbar">
                                                <p className="mb-0">
                                                    Don't have an account? Contact your HR.
                                                    {/* <NavLink className="navbar-link color-primary ms-1" to="/admin_signup">
                                                        Sign up
                                                    </NavLink> */}
                                                </p>
                                            </div>

                                            <div className="edit-profile__logos wise_logo mb-0">
                                                <img src={wise_img} />
                                            </div>

                                        </div>




                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Admin_Login;
