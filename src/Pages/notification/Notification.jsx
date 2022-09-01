import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import DashboardRightIcon from '../../components/dashboardRightIcon/DashboardRightIcon'
import FollowingYou from '../../components/followingYou/FollowingYou'

function Notification() {
    const user = useSelector(state => state.user.user)
    const [loginUser, setloginUser] = useState()
    useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem("loginUser")))
    }, [])
    const Me = user?.find(x => x?._id === loginUser?._id)

    const array = [];
    Me?.follower?.filter(x => {
        array.push(x.userId);
    })
    const array1 = [];
    user?.filter(x => {
        array1.push(x._id)
    })
    const mainArray = array1.filter(x => !array.includes(x))
    console.log(user.filter(x => mainArray.includes(x._id)).filter(x => x._id !== loginUser?._id))
    return (
        <>
            <div className='row m-0 profile-center' >

                {/* Left  */}
                <div className='col-sm-3 col-md-3 col-lg-4 d-none d-sm-block zIndex-10 px-3 py-2' ></div>

                {/* Center  */}
                <div className=' col-sm-6 col-md-6 col-lg-4 zIndex-10 py-2 pb-4' style={{ height: "100vh" }}>

                    <div className='d-flex align-items-center justify-content-between pb-2' style={{ height: "8%", borderBottom: "1px solid gray" }}>
                        <div>
                            <h3 className='orange-color m-0' style={{ fontFamily: "Pacifico", whiteSpace: "nowrap" }}>Notifications</h3>
                        </div>
                        <div style={{ width: "200px" }} className="d-none d-md-block ps-3">
                            <DashboardRightIcon />
                        </div>
                    </div>
                    <p className='p'>No any Notification</p>



                    <h6 className='mt-5'>Suggestions for you</h6>
                    {
                        user.filter(x => mainArray.includes(x._id)).filter(x => x._id !== loginUser?._id)?.map((x, i) => {
                            return <FollowingYou key={i} user={x} id={x._id} userName={x.firstName} email={x.email} profileImage={
                                x?.profileImage ? x?.profileImage?.split('profileImage\\')[1] : "avatar.png"
                            } />
                        })
                    }
                </div>
                {/* Right  */}
                <div className='col-sm-3 col-md-3 col-lg-4 d-none d-sm-block'></div>

                <div className='bottom-menu position-fixed px-4 py-2 bg-white d-block d-md-none' style={{ zIndex: 99, bottom: "0px", boxShadow: "0px 5px 5px 5px gray" }}>
                    <DashboardRightIcon />
                </div>
            </div>


        </>
    )
}

export default Notification