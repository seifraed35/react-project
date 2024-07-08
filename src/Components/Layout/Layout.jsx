import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { UserContext } from '../../context/UserContext'

export default function Layout() {
  let {setToken} = useContext(UserContext);
  useEffect(()=>{
    if (localStorage.getItem('userToken')!=null) {
      setToken(localStorage.getItem('userToken'))
    }
  }
  ,[])
  return <>
  <Navbar/>
<div className="min-height my-5">

  <Outlet/>
</div>
  
  <Footer></Footer>
  </>
}
