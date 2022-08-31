import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchuser } from '../../redux/actions/userAction'
import FollowingYou from '../followingYou/FollowingYou'
import './Suggestions.css'

function Suggestions() {
    const user = useSelector(state => state.user.user)
    
    return (
        <>

            <div className='suggestion pe-3 pt-3'>
                <h6>Suggestions for you</h6>
                {
                    user?.map((x,i)=> {
                        return <FollowingYou key={i} id={x._id} userName={x.firstName} email={x.email} profileImage={
                            x?.profileImage ? x?.profileImage?.split('profileImage\\')[1] : "avatar.png"
                        }/>
                    })
                }
                
            </div>
        </>
    )
}

export default Suggestions 