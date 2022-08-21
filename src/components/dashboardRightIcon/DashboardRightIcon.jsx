import React from 'react'
import { BsBell, BsFillBellFill, BsGear, BsGearFill, BsHouse, BsHouseDoor, BsHouseFill, BsPerson, BsPersonFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import FollowingYou from '../followingYou/FollowingYou'
import './DashboardRightIcon.css'

function DashboardRightIcon() {
  return (
    <>
        <div className='dashboard-right-icon-div d-flex align-items-center justify-content-between' style={{height:"7%"}}>
        <NavLink to='/dashboard'><BsHouseDoor size={23} className="dashboard-right-icon"/></NavLink>
        <NavLink to='/setting'><BsGearFill  size={23} className="dashboard-right-icon"/></NavLink>
        <NavLink to='/notification'> <BsFillBellFill  size={23} className="dashboard-right-icon"/></NavLink>
        <NavLink to='/profile'><BsPersonFill  size={23} className="dashboard-right-icon"/></NavLink>

        </div>
    </>
  )
}

export default DashboardRightIcon