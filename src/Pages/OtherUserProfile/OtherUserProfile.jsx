import React from 'react'
import './OtherUserProfile.css'
import { BsCamera, BsGrid3X3, BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DashboardRightIcon from '../../components/dashboardRightIcon/DashboardRightIcon'

function OtherUserProfile() {
    let { id } = useParams()
    const userPost = useSelector(state => state.userPost.userPost)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const mainUser = user?.find(x => x._id === id)
    const userAllPost = userPost.filter((x) => x?.userId === id)
    const profileImage = mainUser?.profileImage?.split('profileImage\\')[1];
    return (
        <>
            <div className='row m-0'>

                {/* Left  */}
                <div className='col-md-1 col-lg-2 d-none d-md-block zIndex-10 px-3 py-2'></div>

                {/* Center  */}
                <div className='profile-center col-md-10 col-lg-8 zIndex-10 py-2 pb-4' style={{ height: "100vh" }}>
                    <div className='d-flex align-items-center justify-content-between ps-3 pb-2' style={{ height: "8%", borderBottom: "1px solid gray" }}>
                        <div>
                            <h3 className='orange-color m-0' style={{ fontFamily: "Pacifico", whiteSpace: "nowrap" }}>SDC Media</h3>
                        </div>
                        <div className="profile-search d-flex ms-2 d-none d-md-flex">
                            <input type="text" className="same-input px-2 py-1 w-100" placeholder="Search.." style={{ borderRadius: "5px 0px 0px 5px" }} />
                            <span className="input-group-text same-bgcolor cursor-pointer"><BsSearch /></span>
                        </div>
                        <div style={{ width: "200px" }} className="d-none d-md-block ps-3">
                            <DashboardRightIcon />
                        </div>
                    </div>


                    <div className='profile d-flex'>
                        <div className='profile-image-div d-flex align-items-center justify-content-center'>
                            {
                                profileImage != undefined ?
                                    <div className='profile-image' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/profileImage/${profileImage})` }}></div>
                                    :
                                    <div className='profile-image' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/profileImage/avatar.png)` }}></div>
                            }

                        </div>
                        <div className='profile-discription pt-4 position-relative ps-2'>
                            <p className='userName display-6' style={{ fontWeight: '100', whiteSpace: "nowrap" }}>{mainUser?.firstName} {mainUser?.lastName}</p>
                            <div className='profile-detail d-flex justify-content-between align-items-center text-center mt-3' >
                                <div>
                                    <h6>12</h6>
                                    <span>Posts</span>
                                </div>
                                <div>
                                    <h6>12</h6>
                                    <span>Followers</span>
                                </div>
                                <div>
                                    <h6>12</h6>
                                    <span>Following</span>
                                </div>
                            </div>
                            <div className='mt-3 overflow-hidden'>
                                <h6 className='m-0'>Your Discription</h6>

                            </div>
                            <div className='position-absolute bottom-0 d-flex justify-content-between' style={{ width: "90%" }}>
                                <button className='same-btn same-btn-hover py-1 px-0 border-radius5' style={{ width: "60%", whiteSpace: "nowrap", overflow: "hidden" }} data-bs-toggle="modal" data-bs-target="#exampleModal" >Follow</button>
                                <button className='logout-btn logout-btn-hover py-1 border-radius5 ms-2' style={{ whiteSpace: "nowrap", overflow: "hidden", width: "38%" }}>Message</button>
                            </div>
                        </div>
                    </div>
                    <div className='my-4'>
                        <h6 className='py-2 text-center' style={{ backgroundColor: "white" }}><BsGrid3X3 size={15} /> <span className='ps-2'>POSTS</span></h6>

                        <div className='row g-3'>
                            {
                                userAllPost.length > 0 ?
                                    userAllPost.map((x, i) => {
                                        return <div className='col-4' key={i}>
                                            <div className='posted-image' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/userPostImage/${x.userPostImage.split('userPostImage\\')[1]})` }}></div>
                                        </div>
                                    })
                                    :
                                    <>
                                        <div>
                                            <div className='border-radius50 mx-auto mt-5 d-flex justify-content-center align-items-center' style={{ width: "90px", height: "90px", border: "1px solid black" }}>
                                                <BsCamera size={40}/>
                                            </div>
                                            <h6 className='text-center mt-2'>No Postes Yet</h6>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>

                {/* Right  */}
                <div className='col-md-1 col-lg-2 d-none d-md-block'></div>

                <div className='bottom-menu position-fixed px-4 py-2 bg-white d-block d-md-none' style={{ zIndex: 99, bottom: "0px", boxShadow: "0px 5px 5px 5px gray" }}>
                    <DashboardRightIcon />
                </div>
            </div>

        </>
    )
}

export default OtherUserProfile