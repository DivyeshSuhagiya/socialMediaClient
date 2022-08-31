import React from 'react'
import './FollowingYou.css'
import {NavLink} from 'react-router-dom'
function FollowingYou(props) {
    return (
        <>
            <div className='d-flex align-items-center justify-content-between my-2'>
                <div className='d-flex align-items-center'>
                    <NavLink to={`/otheruser/${props.id}`} className='cursor-pointer'><div className='pro_image' style={{backgroundImage:`url(profileImage/${props.profileImage})`}}></div></NavLink>
                    <div className='ps-2'>
                    <NavLink to={`/otheruser/${props.id}`} className='cursor-pointer text-decoration-none'><h6 className='text-color m-0' style={{ fontSize: '13px', whiteSpace:"nowrap" }}>{props.userName}</h6></NavLink>
                        <p className='p' style={{ fontSize: '12px' , width:"100px", overflow:"hidden",textOverflow: "ellipsis" }}>{props.email}</p>
                    </div>
                </div>
                <button className='same-btn same-btn-hover py-1 px-4 border-radius10' style={{ fontSize: "14px" }}>Follow</button>
            </div>
        </>
    )
}

export default FollowingYou