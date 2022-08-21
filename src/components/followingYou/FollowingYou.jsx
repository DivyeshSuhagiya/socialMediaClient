import React from 'react'
import './FollowingYou.css'
function FollowingYou(props) {
    return (
        <>
            <div className='d-flex align-items-center justify-content-between my-2'>
                <div className='d-flex align-items-center'>
                    <div className='pro_image' style={{backgroundImage:`url(profileImage/${props.profileImage})`}}></div>
                    <div className='ps-2'>
                        <h6 className='text-color m-0' style={{ fontSize: '13px', whiteSpace:"nowrap" }}>{props.userName}</h6>
                        <p className='p' style={{ fontSize: '12px' , width:"100px", overflow:"hidden",textOverflow: "ellipsis" }}>{props.email}</p>
                    </div>
                </div>
                <button className='same-btn same-btn-hover py-1 px-4 border-radius10' style={{ fontSize: "14px" }}>Follow</button>
            </div>
        </>
    )
}

export default FollowingYou