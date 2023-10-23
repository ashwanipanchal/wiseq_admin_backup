import { useEffect, useState } from 'react';
import allconnect_img from '../../img/all_connect.png';
import google_img from '../../img/google-Icon.svg';
import microsoft_img from '../../img/microsoft.svg';
import wise_img from '../../img/wise.png';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../services/Config';

function Reset_Password() {
    let { id } = useParams();
    console.log(id)
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [passwordType, setPasswordType] = useState(true)
    const [passwordType1, setPasswordType1] = useState(true)
    useEffect(() => {
        if(id){
            removeUser()
        }
    },[])

    const removeUser = () => {
        window.localStorage.clear();
        window.sessionStorage.clear()
    }

    const updatePassword = async(e) => {
            e.preventDefault()
            if(password != cpassword){
                alert("Password and Confirm Password Doesn't Match")
                return
            }else{
                const body = {
                    password
                }
                const respGlobal = await fetch(`${BASE_URL}auth/reset-password`, {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${id}`,
                    },
                    body: JSON.stringify(body)
                })
                const mentees = await respGlobal.json()
                console.log("mentees", mentees)
                if(mentees.success){
                    alert("Password is updated successfully")
                    navigate('/')
                }else{
                    alert("something went wrong")
                }
            }
            
    }

    return (

        <div className="App">
            <div className="main-content admin">
                <div className="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 col-md-6 col-sm-8 content_par">
                                <div className="box_box border-0">
                                    <p className="para_content">If you are working on something that you really care about,
                                        you don’t have to be pushed. The vision pulls you.
                                        -  Steve Jobs</p>
                                </div>
                            </div>


                            <div className="col-lg-4 col-md-6 col-sm-4">
                                <div className="edit-profile forget_passwordss">
                                    <div className="card border-0">
                                        <div className="card-header">
                                            <div className="edit-profile__title">
                                                <div className="edit-profile__logos">
                                                    <a href="#">

                                                        <img src={allconnect_img} className="dark" />
                                                        <img src={allconnect_img} className="light" />
                                                    </a>
                                                </div>
                                                <h6 className="text-center">Reset Your Password</h6>
                                                <p className="password_para">Strong passwords include numbers, letters, and punctuation marks.</p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="edit-profile__body">
                                                <form onSubmit={updatePassword}>
                                                <div className="form-group mb-25">
                                                <div className="position-relative">
                                                    <input value={password} onChange={e => setPassword(e.target.value)} type={passwordType ? "password" : "text"} className="form-control" id="username" placeholder="New Password" required/>
                                                    {passwordType ? 
                                                        <div onClick={() =>setPasswordType(false)} className="uil uil-eye-slash text-lighten fs-15 field-icon toggle-password2"></div>:
                                                        <div onClick={() =>setPasswordType(true)} className="uil uil-eye text-lighten fs-15 field-icon toggle-password2"></div>}
                                                    </div>
                                                </div>

                                                <div className="form-group mb-25">
                                                <div className="position-relative">
                                                    <input value={cpassword} onChange={e => setCPassword(e.target.value)} type={passwordType1 ? "password" : "text"} className="form-control" id="username" placeholder="Confirm New Password" required/>
                                                    {passwordType1 ? 
                                                        <div onClick={() =>setPasswordType1(false)} className="uil uil-eye-slash text-lighten fs-15 field-icon toggle-password2"></div>:
                                                        <div onClick={() =>setPasswordType1(true)} className="uil uil-eye text-lighten fs-15 field-icon toggle-password2"></div>}
                                                    </div>
                                                </div>
                                                {/* <NavLink className="navbar-link color-primary ms-1" to="/admin_login"> */}
                                                    <div className="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
                                                        <button type="submit" className="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn mb-20">
                                                            Submit
                                                        </button>
                                                    </div>

                                                {/* </NavLink> */}
                                                </form>
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

export default Reset_Password;
