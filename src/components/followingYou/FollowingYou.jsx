import React, { useEffect, useState } from 'react'
import './FollowingYou.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
function FollowingYou(props) {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [loginUser, setloginUser] = useState()
    useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem("loginUser")))
    }, [])

    const Me = user?.find(x => x?._id === loginUser?._id)
    const otherUserRequestMe = Me?.follower.find(x => x.userId === props?.user?._id)?.isFollow
    const otherUserNotRequestMe = Me?.follower.find(x => x.userId === undefined)

    const array = [];
    Me?.follower?.filter(x => {
        array.push(x.userId);
    })
    const array1 = [];
    user?.filter(x => {
        array1.push(x._id)
    })
    // console.log(array1.filter(x => !array.includes(x)));
    return (
        <>
            {
                props?.other === undefined ?

                    <div className='d-flex align-items-center justify-content-between my-2'>
                        <div className='d-flex align-items-center'>
                            <NavLink to={`/otheruser/${props.id}`} className='cursor-pointer'><div className='pro_image' style={{ backgroundImage: `url(profileImage/${props.profileImage})` }}></div></NavLink>
                            <div className='ps-2'>
                                <NavLink to={`/otheruser/${props.id}`} className='cursor-pointer text-decoration-none'><h6 className='text-color m-0' style={{ fontSize: '13px', whiteSpace: "nowrap" }}>{props.userName}</h6></NavLink>
                                <p className='p' style={{ fontSize: '12px', width: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>{props.email}</p>
                            </div>
                        </div>
                        {
                            otherUserRequestMe == undefined ?
                                <button className='same-btn same-btn-hover py-1 px-1 border-radius10' style={{ fontSize: "14px", width: "100px" }}><span style={{ fontSize: "13px" }}>Follow</span></button>
                                :
                                otherUserRequestMe == false ?
                                    <button className='same-btn same-btn-hover py-1 px-0 border-radius10' style={{ fontSize: "14px", width: "100px", backgroundImage: "none" }}><span className='orange-color' style={{ fontSize: "13px" }}>Requested</span></button>
                                    :
                                    <button className='same-btn same-btn-hover py-1 px-0 border-radius10' style={{ fontSize: "14px", width: "100px" }}><span style={{ fontSize: "13px" }}>Unfollow</span></button>
                        }

                    </div>
                    :
                    <div className='d-flex align-items-center justify-content-between my-2'>
                        <div className='d-flex align-items-center'>
                            <NavLink to={`/otheruser/${props.id}`} className='cursor-pointer'><div className='pro_image' style={{ backgroundImage: `url(profileImage/${props.profileImage})` }}></div></NavLink>
                            <div className='ps-2'>
                                <NavLink to={`/otheruser/${props.id}`} className='cursor-pointer text-decoration-none'><h6 className='text-color m-0' style={{ fontSize: '13px', whiteSpace: "nowrap" }}>{props.userName}</h6></NavLink>
                                <p className='p' style={{ fontSize: '12px', width: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>{props.email}</p>
                            </div>
                        </div>
                        {
                            <button className='same-btn same-btn-hover py-1 px-1 border-radius10' style={{ fontSize: "14px", width: "100px" }}><span style={{ fontSize: "13px" }}>Unfollow</span></button>
                        }

                    </div>
            }
        </>
    )
}

export default FollowingYou