import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchuser } from '../../redux/actions/userAction'
import FollowingYou from '../followingYou/FollowingYou'
import './Suggestions.css'

function Suggestions() {
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
    return (
        <>

            <div className='suggestion pe-3 pt-3'>
                <h6>Suggestions for you</h6>
                {
                    user.filter(x => mainArray.includes(x._id)).filter(x => x._id !== loginUser?._id)?.map((x,i)=> {
                        return <FollowingYou key={i} user={x} id={x._id} userName={x.firstName} email={x.email} profileImage={
                            x?.profileImage ? x?.profileImage?.split('profileImage\\')[1] : "avatar.png"
                        }/>
                    })
                }
                
            </div>
        </>
    )
}

export default Suggestions 