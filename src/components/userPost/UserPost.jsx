import React, { useState } from 'react'
import './UserPost.css'
import user1 from '../../assets/images/user/user-2.jpg'
import { BsChatSquareText, BsCursor, BsHeart, BsHeartFill, BsTranslate } from 'react-icons/bs';
import avatar_1 from '../../assets/images/avatar-1.png'
import { useSelector } from 'react-redux';

function UserPost(props) {
    const user = useSelector(state => state.user.user)
    const [likeCount, setlikeCount] = useState(false)
    const [iconDisplay, seticonDisplay] = useState("d-block")
    const like = () => {
        setlikeCount(!likeCount)
        iconDisplay === "d-block" ?
            setTimeout(() => {
                seticonDisplay("d-none")
            }, 1200)
            : seticonDisplay("d-block")
    }
    const DoubleClicklike = () => {
        setlikeCount(true)
        // iconDisplay === "d-block" ?
        seticonDisplay("d-block")
        setTimeout(() => {
            seticonDisplay("d-none")
        }, 1200)
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
                            <div className='profile-image' style={{ backgroundImage: `url(profileImage/${profileImage})`, width:"45px" , height:"45px" }}></div>
                            :
                            <div className='profile-image' style={{ backgroundImage: `url(profileImage/avatar.png)`, width:"45px" , height:"45px" }}></div>

                    }
                    <div className='ps-2'>
                        <h6 className='text-color m-0' style={{ fontSize: '13px' }}>{mainUserName?.firstName} {mainUserName?.lastName}</h6>
                        <p className='p' style={{ fontSize: '12px' }}>{props.userPost?.location}</p>
                    </div>
                </div>
                <div className='post-image border-radius10 position-relative d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(userPostImage/${props.userPost?.userPostImage.split('userPostImage\\')[1]})` }} onDoubleClick={() => DoubleClicklike()}>
                    {
                        likeCount === true ?
                            <>
                                <div style={{ width: "100px", height: "100px" }}>
                                    <BsHeartFill color="white" size="100%" className={iconDisplay + " " + "heart-icon"} onClick={() => like()} />
                                </div>
                            </>
                            :
                            ""
                    }

                </div>
                <div className='d-flex my-3 justify-content-between' style={{ width: "100px" }}>
                    {
                        likeCount === true ?
                            <BsHeartFill color={likeCount === true ? "#fa6132" : ""} size={24} onClick={() => like()} className="cursor-pointer" /> :
                            <BsHeart size={24} onClick={() => like()} className="cursor-pointer" />
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