import React from 'react'
import NavBar from '../Shared/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Shared/Footer'

const Main = () => {

  
  const location = useLocation();
  const navbarCondition = location.pathname.includes('login') || location.pathname.includes('register');

  return (
    <>
    
    {navbarCondition || <NavBar></NavBar>}
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Main