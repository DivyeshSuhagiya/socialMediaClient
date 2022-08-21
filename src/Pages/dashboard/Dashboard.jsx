import React from 'react'
import './Dashboard.css'
import logo from '../../assets/images/s.png'
import { BsSearch } from "react-icons/bs";
import DashboardProfile from '../../components/dashboardProfile/DashboardProfile';
import FollowingYou from '../../components/followingYou/FollowingYou';
import DashboardSearch from '../../components/dashboardSearch/DashboardSearch';
import UserPost from '../../components/userPost/UserPost';
import DashboardRightIcon from '../../components/dashboardRightIcon/DashboardRightIcon';
import Suggestions from '../../components/Suggestion/Suggestions';
import { useSelector } from 'react-redux';

function Dashboard() {
    const user = useSelector(state => state.user.user)
    return (
        <>
            <div className='row m-0'>
                
                {/* Left  */}
                <div className='col-md-4 col-lg-3 d-none d-md-block d-none d-lg-block zIndex-10 px-3 py-2' style={{ height: "100vh", overflow: "hidden" , position:'fixed'}}>
                    <div className='d-flex align-items-center' style={{height:"7%"}}>
                        <div><img src={logo} alt="" width="40px" /></div>
                        <div className="d-flex ms-2 w-100">
                            <input type="text" className="same-input px-2 py-1 w-100" placeholder="Search.." style={{ borderRadius: "5px 0px 0px 5px" }} />
                            <span className="input-group-text same-bgcolor cursor-pointer"><BsSearch /></span>
                        </div>
                    </div>
                    <DashboardProfile />

                    <div className='following-you pe-3'>
                        <h6>Your Followers</h6>
                        {
                            user?.map((x,i)=> {
                                return <FollowingYou key={i} userName={x.firstName} email={x.email} profileImage={
                                    x?.profileImage ? x?.profileImage?.split('profileImage\\')[1] : "avatar.png"
                                }/>
                            })
                        }
                    </div>
                </div>

                {/* Center  */}
                <div className='dashboard-center col-md-8 col-lg-6 zIndex-10 py-2 pb-4' style={{ height: "100vh", overflow: "scroll" }}>
                    <DashboardSearch />
                    <UserPost />
                    <UserPost />
                    <UserPost />
                </div>

                {/* Right  */}
                <div className='col-3 d-none d-lg-block zIndex-10 py-2' style={{ height: "100vh", overflow: "hidden" , position:'fixed' , right:0}}>
                    <DashboardRightIcon />

                    <Suggestions />
                    
                </div>

                <div className='bottom-menu position-fixed px-4 py-2 bg-white d-block d-md-none' style={{zIndex:99 , bottom:"0px" , boxShadow:"0px 5px 5px 5px gray"}}>
                    <DashboardRightIcon />
                </div>
            </div>
        </>
    )
}

export default Dashboard