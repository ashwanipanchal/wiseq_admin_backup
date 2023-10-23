import "react-tabs/style/react-tabs.css";
import Side_Bar from "./sidebar";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import Accordion from "react-bootstrap/Accordion";
import path from "../../../img/Path.png";
import { BASE_URL } from '../../../services/Config';

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

function Support_Help() {
  const navigate = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [allImage, setAllImage] = useState([]);

  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
  };
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

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  const showModal = () => {
    setShowFilter((prevStat) => !prevStat);
    // alert(showFilter)
  };

  const sendReport = async(e) => {
    e.preventDefault()
    let formData = new FormData()
    console.log(allImage)
    allImage.forEach((i) => {
      formData.append("files", i)
    })
    // formData.append("files", allImage)
    formData.append("title", title)
    formData.append("description", description)
   const token = await localStorage.getItem("token")
    const btoken = `Bearer ${token}`;
    const body = {
        title,
        description,
        file
      }
    // return
    const res = await fetch(`${BASE_URL}ticket`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            // 'Content-Type': 'application/json',
            "Authorization": btoken,
        },
        body: formData
    })
    const response = await res.json()
    console.log(response)
    if(response.success){
        alert("Report Sent")
        navigate('/')
    }else{
      alert("Something went wrong")
    }
  }


//   const uploadImage = async (item) => {
//     setImagePath(item)
//     let formData = new FormData()
//     formData.append("file", item)
//     const token = await localStorage.getItem("token")
//     const btoken = `Bearer ${token}`;
//     const res = await fetch(`${BASE_URL}files/upload?fileType=support_file`, {
//         method: 'POST',
//         headers: {
//             "Accept": "application/json",
//             "Authorization": btoken,
//         },
//         body: formData
//     })
//     const response = await res.json()
//     console.log(response)
//     const { success } = response
//     if (success) {
//         setFile(response.data.url)
//     }
// }

  return (
    <div className="main-content">
      <div
        style={{ paddingLeft: sideBarOpen ? "295px" : "93px" }}
        className="contents expanded"
      >
        <div className="demo5 mt-30 mb-25">
          <div className="container-fluid">
            <div className="row">
              <div
                style={{ display: "flex" }}
                className="col-lg-12 col-sm-12 col-md-12 mb-25"
              >
                <p
                  onClick={() => navigate(-1)}
                  style={{
                    marginRight: "10px",
                    color: "#7A7A7A",
                    fontWeight: "400",
                    lineHeight: "22px",
                    cursor: "pointer",
                  }}
                >
                  Support & Help
                </p>
                <img
                  style={{
                    marginRight: "10px",
                    width: "6px",
                    height: "13px",
                    marginTop: "6px",
                  }}
                  src={path}
                />
                <p
                  style={{
                    color: "#005B5B",
                    fontWeight: "400",
                    lineHeight: "22px",
                    cursor: "pointer",
                  }}
                >
                  File Ticket
                </p>
              </div>
              <div className="col-lg-12">
                <div className="breadcrumb-main user-member justify-content-sm-between ">
                  <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                    <div className="d-flex align-items-center user-member__title justify-content-center me-sm-25">
                      <h4 className="fw-500 breadcrumb-title">File Ticket</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="card card-Vertical card-default card-md mb-4">
                  <div className="">
                    <form onSubmit={sendReport}>
                      <div className="row">
                        <div className="col-md-12 mb-25">
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control ih-medium ip-gray radius-xs b-deep px-15"
                            placeholder="Brief title of the issue"
                          />
                        </div>

                        <div className="col-md-12 mb-25">
                          <textarea
                            class="form-control ip-gray radius-xs b-deep px-15"
                            id="exampleFormControlTextarea1"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the issue"
                          ></textarea>
                        </div>

                        <div className="col-md-6 mb-30">
                          <label for="formFile" class="form-label">
                            Attach files (Upto 4 files of 10 MB each)
                          </label>
                          <input
                            class="form-control ip-gray radius-xs b-deep px-15"
                            onChange={(event) => {
                                setImagePath(event.target.files[0])
                                // uploadImage(event.target.files[0])
                                setAllImage(event.target.files)
                            }}
                            type="file"
                            id="customFile"
                            inputProps={{ accept: 'image/*' }}
                            multiple
                          />
                        </div>

                        <div className="layout-button">
                          <div className="btn_center">
                              <button
                                type="submit"
                                className="btn btn-light-petrol btn-default btn-squared"
                              >
                                Send
                              </button>
                          </div>
                        </div>
                      </div>
                    </form>
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
    </div>
  );
}

export default Support_Help;
