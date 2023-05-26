import React from 'react'
import NavBar from '../Shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer'

const Main = () => {
  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Main