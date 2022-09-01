import React, { useEffect, useState } from 'react'
import './DashboardProfile.css'
import avatar from '../../assets/images/avatar.jpeg'
import { NavLink } from 'react-router-dom'

function DashboardProfile(props) {
    const [loginUser, setloginUser] = useState()
    useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem("loginUser")))
    }, [])
    return (
        <>
            <div className='dashboard-prof my-2'>
                <div className='dashboard-prof-bg'>
                    <NavLink to='/profile' style={{ textDecoration: "none" }}><div className='dashboard-pro-image' style={{ backgroundImage: `url(profileImage/${loginUser?.profileImage ? loginUser?.profileImage.split('profileImage\\')[1] : "avatar.png"})` }}></div></NavLink>
                </div>

            <div className='dashboard-pro-detail px-3'>
                <div className='border-bottom'>
                    <NavLink to='/profile' style={{ textDecoration: "none" }}><h6 className='text-color my-1 orange-color-hover cursor-pointer'>{loginUser?.firstName} {loginUser?.lastName}</h6></NavLink>
                    <p className='p pb-2'> <span style={{ display: "inline-block", width: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{loginUser?.email}</span></p>
                </div>
                <div className='border-bottom d-flex justify-content-center py-2'>
                    <div className='border-right pe-4'>
                        <h6 className='text-color my-1'>{props.followers}</h6>
                        <p className='p pb-2'>Followers</p>
                    </div>
                    <div className='ps-4'>
                        <h6 className='text-color my-1'>15</h6>
                        <p className='p pb-2'>Following</p>
                    </div>
                </div>
                <NavLink to='/profile' style={{ textDecoration: "none" }}><h5 className='m-0 mt-2 fw-bold orange-color cursor-pointer' style={{ fontSize: "18px" }}>My Profile</h5></NavLink>
            </div>
        </div>
        </>
    )
}

export default DashboardProfile