import community_img from '../../../img/community.png';
import userdefault_img from '../../../img/user_default.svg';
import tag_img from '../../../img/tag.svg';
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Progress_banner from '../../screen_components/progress_banner'

const data = [
    { id: 1, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
    { id: 2, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
    { id: 3, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
    { id: 4, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
    { id: 5, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
    { id: 6, community_name: "Lorem Ipsum is simply dummy text of the printing", author_name: "By Admin" },
];

function Resources_Screen() {
    const navigate = useNavigate()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [resourcesList, setResourcesList] = useState([])
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

    useEffect(()=>{
        const getRes = async() => {
            const token = await localStorage.getItem("token")
            const btoken = `Bearer ${token}`;   
            const res = await fetch(`https://api.wiseqglobal.com/api/resources`,{
                method:'GET',
                headers:{
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": btoken,
                },
              })
              const response = await res.json()
                console.log(response)
                const {success, data} = response
                if(success){
                    setResourcesList(data)
                }
        }
        getRes()
    },[])
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
                          Resources
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                {resourcesList && resourcesList.map((user) => (
                                <div class="col-lg-4 col-sm-12 col-md-12 mb-25">
                                    <div class="blog-card blog-card--2 box_shadow1">
                                        <div class="blog-card__thumbnail">
                                            <a href="#">
                                                <img src={user.coverPhoto} />
                                            </a>
                                        </div>
                                        <div class="blog-card__details pt-1 pb-20 px-20">
                                            <div class="blog-card__content">
                                                <h4 class="blog-card__title">
                                                    <a className="entry-title" style={{cursor: "pointer"}} onClick={() => navigate('/resources_detail', {state: user})}>{user.name}</a>
                                                </h4>
                                            </div>
                                            <div class="blog-card__meta">
                                                <div class="blog-card__meta-reaction">
                                                    <img src={userdefault_img} className="" />
                                                    <span class="blog-card__meta-reaction-like">{user.author_name}</span>
                                                </div>
                                                <div class="blog-card__meta-count">
                                                    <ul>
                                                        <li>
                                                            <div class="blog-card__meta-reaction">
                                                                <img src={tag_img} className="" />
                                                                {user.categories.map((i) => (

                                                                <span class="blog-card__meta-reaction-like">{i.category},</span>
                                                                ))}
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}

                {/* <Progress_banner/> */}
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

export default Resources_Screen;
