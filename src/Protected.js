import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Audio, Rings } from 'react-loader-spinner'
import loader from './img/img.gif'
function Protected(props) {
  const {Component} = props
  const navigate = useNavigate();
  const [key, setKey]= useState(0)
  const [token, setToken]= useState("")

  useEffect(() => {
    const checkAuth = () => {
      setToken(localStorage.getItem('token'))
      let b = localStorage.getItem('token')
      console.log(b)
      if(!b){
        // setTimeout(()=>{
        //   setKey(1)
        // },500)
        
        navigate('/admin_login')
      }else{
        // setKey(1)
      }
    }
    checkAuth()
  },[])

  return (
    <>
    {/* {key == 0 ? <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/> :  */}
{token == "" ? <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/> : <Component/>}
      
    </>
  )
}

export default Protected