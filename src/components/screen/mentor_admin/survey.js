import React from 'react'
import Side_Bar from './sidebar';
import { useEffect, useState } from 'react';
import Progress_banner from '../../screen_components/progress_banner'

const Survey = () => {
    const [sideBarOpen, setSideBarOpen] = useState(true)
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
                        Survey
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <Progress_banner/>
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

export default Survey