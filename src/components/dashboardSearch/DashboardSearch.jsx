import React from 'react'
import './DashboardSearch.css'
import avatar_1 from '../../assets/images/avatar-1.png'
import logo from '../../assets/images/s.png'
import { BsSearch } from 'react-icons/bs'


function DashboardSearch() {
    return (
        <>
            <div className='border-radius10 py-1 px-3 d-flex justify-content-between align-items-center' style={{ backgroundColor: "white" }}>
                {/* <img src={logo} className="border-radius50" alt="" width="50px" height="50px" /> */}
                <h5 className='orange-color m-0' style={{ fontFamily: "Pacifico", whiteSpace: "nowrap" }}>SDC Media</h5>
                <div className='ps-2 w-100 d-flex'>
                    <input type="text" className="same-input px-2 py-1 w-100" placeholder="Search.." style={{fontSize:"14px" , borderRadius:"5px 0px 0px 5px"}} />
                    <span className="input-group-text same-bgcolor cursor-pointer"><BsSearch /></span>
                </div>
            </div>
        </>
    )
}

export default DashboardSearch