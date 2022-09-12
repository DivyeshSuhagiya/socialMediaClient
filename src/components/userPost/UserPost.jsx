import React, { useEffect, useState } from 'react'
import './UserPost.css'
import user1 from '../../assets/images/user/user-2.jpg'
import { BsChatSquareText, BsCursor, BsHeart, BsHeartFill, BsTranslate } from 'react-icons/bs';
import avatar_1 from '../../assets/images/avatar-1.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchuserPost, fetchuserPostLike } from '../../redux/actions/userPostAction';
import { NavLink } from 'react-router-dom';

function UserPost(props) {
    const user = useSelector(state => state.user.user)
    const userPost = useSelector(state => state.userPost.userPost)
    const dispatch = useDispatch()
    const [loginUser, setloginUser] = useState()
    useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem("loginUser")))
    }, [])
    useEffect(() => {
        dispatch(fetchuserPost())
    }, [])
    const [likeCount, setlikeCount] = useState()
    useEffect(() => {
        setlikeCount(props.isLike)
    }, [])
    useEffect(() => {
        setTimeout(() => {
            seticonDisplay("d-none")
        }, 1000)
    }, [])

    const [iconDisplay, seticonDisplay] = useState("d-block")
    const like = (postId, userId) => {
        setlikeCount(!likeCount)
        const value = { _id: postId, userId: userId, isLike: !likeCount }
        setTimeout(() => {
            if (userId != undefined) {
            dispatch(fetchuserPostLike(value))
            }
        }, 500);
        iconDisplay === "d-block" ?
            setTimeout(() => {
                seticonDisplay("d-none")
            }, 1200)
            : seticonDisplay("d-block")
        setTimeout(() => {
        }, 2000);
    }
    const DoubleClicklike = (postId, userId) => {
        setlikeCount(true)
        // iconDisplay === "d-block" ?
        seticonDisplay("d-block")
        setTimeout(() => {
            seticonDisplay("d-none")
        }, 1000)
        const value = { _id: postId, userId: userId, isLike: true }
        if (userId != undefined) {
            dispatch(fetchuserPostLike(value))
        }
    }
    const mainUserName = user.find(x => x._id == props.userPost?.userId)
    const profileImage = mainUserName?.profileImage.split('profileImage\\')[1];

    return (
        <>
            <div className='user-post border-radius10 my-2 p-3'>
                <div className='d-flex align-items-center mb-2'>
                    {/* <img src={`profileImage/${profileImage}`} alt="" width="45px" height="45px" className='border-radius50' /> */}
                    {
                        mainUserName?.profileImage ?
                        <NavLink to={`otheruser/${mainUserName?._id}`} className='text-decoration-none'><div className='profile-image' style={{ backgroundImage: `url(profileImage/${profileImage})`, width: "45px", height: "45px" }}></div></NavLink>
                            :
                            <NavLink to={`otheruser/${mainUserName?._id}`} className='text-decoration-none'><div className='profile-image' style={{ backgroundImage: `url(profileImage/avatar.png)`, width: "45px", height: "45px" }}></div></NavLink>

                    }
                    <div className='ps-2'>
                        <NavLink to={`otheruser/${mainUserName?._id}`} className='text-decoration-none'><h6 className='text-color m-0' style={{ fontSize: '13px' }}>{mainUserName?.firstName} {mainUserName?.lastName}</h6></NavLink>
                        <p className='p' style={{ fontSize: '12px' }}>{props.userPost?.location}</p>
                    </div>
                </div>
                <div className='post-image border-radius10 position-relative d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(userPostImage/${props.userPost?.userPostImage.split('userPostImage\\')[1]})` }} onDoubleClick={() => DoubleClicklike(props.userPost?._id, loginUser?._id)}>
                    {
                        likeCount === true ?
                            <>
                                <div style={{ width: "100px", height: "100px" }}>
                                    <BsHeartFill color="white" size="100%" className={iconDisplay + " " + "heart-icon"} />
                                </div>
                            </>
                            :
                            ""
                    }

                </div>
                <div className='d-flex my-3 justify-content-between' style={{ width: "100px" }}>
                    {
                        // props.userPost?.like.find(x => x.isLike === true)?.isLike
                        likeCount === true ?
                            <BsHeartFill color={likeCount === true ? "#fa6132" : ""} size={24} onClick={() => like(props.userPost?._id, loginUser?._id)} className="cursor-pointer" /> :
                            <BsHeart size={24} onClick={() => like(props.userPost?._id, loginUser?._id)} className="cursor-pointer" />
                    }
                    <BsChatSquareText size={24} />
                    <BsCursor size={24} />
                </div>
                <p className='p' style={{ fontSize: "12px" }}>300 Likes</p>
                <p className='p'>{props.userPost?.discription}</p>
            </div>
        </>
    )
}

export default UserPost