import React, { useEffect, useState } from 'react'
import './DashboardProfile.css'
import avatar from '../../assets/images/avatar.jpeg'

function DashboardProfile() {
    const [loginUser, setloginUser] = useState()
     useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem("loginUser")))
     }, [])
    return (
        <>
            <div className='dashboard-prof my-2'>
                <div className='dashboard-prof-bg'>
                    <div className='dashboard-pro-image' style={{ backgroundImage: `url(profileImage/${loginUser?.profileImage ? loginUser?.profileImage?.split('profileImage\\')[1] : ""})` }}></div>
                </div>

                <div className='dashboard-pro-detail px-3'>
                    <div className='border-bottom'>
                        <h6 className='text-color my-1 orange-color-hover cursor-pointer'>{loginUser?.firstName} {loginUser?.lastName}</h6>
                        <p className='p pb-2'> <span style={{display:"inline-block", width:"200px", overflow:"hidden",textOverflow: "ellipsis" }}>{loginUser?.email}</span></p>
                    </div>
                    <div className='border-bottom d-flex justify-content-center py-2'>
                        <div className='border-right pe-4'>
                            <h6 className='text-color my-1'>1289</h6>
                            <p className='p pb-2'>Followers</p>
                        </div>
                        <div className='ps-4'>
                            <h6 className='text-color my-1'>15</h6>
                            <p className='p pb-2'>Following</p>
                        </div>
                    </div>
                    <h5 className='m-0 mt-2 fw-bold orange-color cursor-pointer' style={{fontSize:"18px"}}>My Profile</h5>
                </div>
            </div>
        </>
    )
}

export default DashboardProfile