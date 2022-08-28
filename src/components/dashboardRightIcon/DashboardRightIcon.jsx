import React, { useState } from 'react'
import { BsBell, BsFillBellFill, BsGear, BsGearFill, BsHouse, BsHouseDoor, BsHouseFill, BsPerson, BsPersonFill, BsPlusSquare } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import './DashboardRightIcon.css'

function DashboardRightIcon() {
  return (
    <>
      <div className='dashboard-right-icon-div d-flex align-items-center justify-content-between' style={{ height: "7%" }}>
        <NavLink to='/dashboard'><BsHouseDoor size={23} className="dashboard-right-icon" /></NavLink>
        <NavLink to='/addpost'><BsPlusSquare size={21} className="dashboard-right-icon" /></NavLink>
        <NavLink to='/notification'> <BsBell size={23} className="dashboard-right-icon" /></NavLink>
        <NavLink to='/profile'><BsPerson size={23} className="dashboard-right-icon" /></NavLink>
      </div>
    </>
  )
}

export default DashboardRightIcon