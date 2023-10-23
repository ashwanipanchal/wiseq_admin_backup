import allconnect_img from '../../img/all_connect.png';
import wise_img from '../../img/wise.png';
import { NavLink, useNavigate,useParams  } from "react-router-dom";
import { BASE_URL } from '../../services/Config';
import { useEffect, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

function Admin_Signup(props) {
    let { id } = useParams();
    // console.log(id)
    const navigate = useNavigate()
    const [user_id, setUser_Id] = useState('')
    const [name, setName] = useState('')
    const [Lname, setLname] = useState('')
    const [score, setScore] = useState(0)
    const [email, setEmail] = useState('')
    const [termCheck, setTermCheck] = useState(false)
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [seePassword, setSeePassword] = useState("password")
    const [seeCpassword, setseeCPassword] = useState("password")
    useEffect(()=> {
        const checkUser = async() => {

            const res = await fetch(`${BASE_URL}auth/user-onboard/${id}`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                },
            })
            const response = await res.json()
            console.log(response)
            
            if(response.success){
                if(response.data.isNewUser == true){
                    
                    let fn = response.data.user.name
                    let ln = response.data.user.name
                    // console.log(fn.split(""))
                    // console.log(ln)
                    setName(fn)
                    setLname(ln)
                    setEmail(response.data.user.email)
                    setUser_Id(response.data.user.id)
                }else{
                    alert("Password Created Already")
                }
            }
        }
        checkUser()
    },[])

    const createPassword = async(e) => {
        e.preventDefault()
        if(password !== cpassword){
            alert("Password and Confirm Password Doesn't Match")
            return
        }
        if(!termCheck){
            alert("Please check terms")
            return
        }
        // if(score< 3){
        //     alert("Please Create Strong Password")
        //     return
        // }
        const body = 
        {
            "password": password,
        }
      console.log(body)
      const res = await fetch(`${BASE_URL}users/${user_id}/create-password`,{
          method:'PUT',
          headers:{
            "Accept": "application/json",
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(body)
        })
        const response = await res.json()
        console.log(response)
        if(response.success){
            navigate('/admin_login')
        }
    }

    const changePasswordType = (type) => {
        if(type == "password"){
            setSeePassword("text")
        }else{
            setSeePassword("password")
        }
    }
    const changePasswordType2 = (type) => {
        if(type == "password"){
            setseeCPassword("text")
        }else{
            setseeCPassword("password")
        }
    }

    return (

        <div className="App">
            <main className="main-content admin sign_up1">
                <div className="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 col-md-6 col-sm-8 content_par">
                                <div className="box_box border-0">
                                    <p className="para_content">Today is the oppertunity to build the tomorrow you want <br />- Ken Poirot</p>
                                </div>
                            </div>

                           

                            <div className="col-lg-4 col-md-6 col-sm-4">
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
                                                <h2 className="text-center">Sign Up</h2>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="edit-profile__body">
                                                <form onSubmit={createPassword}>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group mb-25">
                                                            <input value={name}  type="text" className="form-control" id="firstname" placeholder="First Name" disabled/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="form-group mb-25">
                                                            <input value={Lname}  type="text" className="form-control" id="lastname" placeholder="Last Name" disabled />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-25">
                                                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="email" placeholder="Email Id" disabled/>
                                                    </div>

                                                    <div className="form-group mb-20">
                                                        <div className="position-relative">
                                                            <input value={password} onChange={e => setPassword(e.target.value)} id="password-field" type={seePassword} className="form-control" name="password" placeholder="Password" />
                                                            <div onClick={()=> changePasswordType(seePassword)} className="uil uil-eye-slash text-lighten fs-15 field-icon toggle-password2">
                                                            </div>
                                                        </div>
                                                        <PasswordStrengthBar onChangeScore={(score)=>setScore(score)} password={password} />
                                                        <p className="password_length mb-0 mt-10">Min. 8 Characters with 1 Upper case, 1 Lower case, 1 number & 1 Special character</p>
                                                    </div>

                                                    <div className="form-group mb-10">
                                                        <div className="position-relative">
                                                            <input value={cpassword} onChange={e => setCPassword(e.target.value)} id="password-field" type={seeCpassword} className="form-control" name="password" placeholder="Verify Password" />
                                                            <div onClick={()=> changePasswordType2(seeCpassword)} className="uil uil-eye-slash text-lighten fs-15 field-icon1 toggle-password2">
                                                            </div>
                                                            <PasswordStrengthBar password={cpassword} />
                                                        </div>
                                                    </div>

                                                    <div className="admin-condition1">
                                                        <div className="checkbox-theme-default custom-checkbox">
                                                            <input  value={termCheck} onChange={() => setTermCheck(!termCheck)} className="checkbox" type="checkbox" id="admin-1" required/>
                                                            <label for="admin-1">
                                                                <span className="checkbox-text">I have read and agree to the <a onClick={()=> window.open("https://wiseqglobal.com/term.html", "_blank")} className="color-primary">Terms & Conditions</a>.</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* <NavLink className="navbar-link color-primary ms-1"> */}
                                                        <div className="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">

                                                            <button type='submit' className="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn mb-20">
                                                                sign Up
                                                            </button>


                                                        </div>
                                                    {/* </NavLink> */}
                                                </div>
                                                </form>
                                            </div>

                                            <div className="admin-topbar">
                                                <p className="mb-0">
                                                    Already have an account?

                                                    <NavLink className="navbar-link color-primary ms-1" to="/admin_login">
                                                        Sign In

                                                    </NavLink>
                                                    {/* <span onClick={() =>  createPassword()} className="navbar-link color-primary ms-1" >
                                                        Sign In

                                                    </span> */}

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
            </main>

        </div>
    );
}

export default Admin_Signup;
