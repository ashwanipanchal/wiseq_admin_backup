import allconnect_img from '../../img/all_connect.png';
import google_img from '../../img/google-Icon.svg';
import microsoft_img from '../../img/microsoft.svg';
import wise_img from '../../img/wise.png';
import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../services/Config';

function Forget_Password() {
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const paymentShow = () => setShow(true);

    const updateEmail = async(e) => {
        e.preventDefault()
        
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const body = {
            email
        }
            const respGlobal = await fetch(`${BASE_URL}auth/forgot-password`,{
                method:'POST',
                headers:{
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
                  "Authorization": btoken,
                },
                body: JSON.stringify(body)
              })
              const res = await respGlobal.json()
              console.log(res)
              if(res.success){
                paymentShow()
              }else{
                alert(res.err.error)
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
                                <div className="edit-profile forget_passwords">
                                    <div className="card border-0">
                                        <div className="card-header">
                                            <div className="edit-profile__title">
                                                {/* <div className="edit-profile__logos">
                                                    <a href="#">

                                                        <img src={allconnect_img} className="dark" />
                                                        <img src={allconnect_img} className="light" />
                                                    </a>
                                                </div> */}
                                                <h6 className="text-center">Forgot Password</h6>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="edit-profile__body">
                                                <form onSubmit={updateEmail}>
                                                <div className="form-group mb-25">
                                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="username" placeholder="Email Id" required/>
                                                </div>

                                                <div className="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
                                                    <button type='submit' className="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn mb-20" >
                                                        Submit
                                                    </button>
                                                </div>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">

                                <NavLink className="navbar-link" to="/admin_login">
                                    <p className="email_reset">An email has been sent to {email} with instructions for resetting your password.</p>
                                </NavLink>
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

        </div>
    );
}

export default Forget_Password;
