import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import { BsCamera, BsCameraFill, BsGrid3X3, BsSearch } from "react-icons/bs";
import DashboardRightIcon from '../dashboardRightIcon/DashboardRightIcon';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchuserUpdate } from '../../redux/actions/userAction';

function Profile() {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    let obj = { firstName: "", lastName: "", email: "", mobile: "", birthDate: '', profileImage: "" }
    const [value, setvalue] = useState({ ...obj })
    const userPost = useSelector(state => state.userPost.userPost)
    const [count, setcount] = useState(0)
    const [loginUser, setloginUser] = useState()
    const ref = useRef(); 
    useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem("loginUser")))
    }, [])
    const userAllPost = userPost.filter((x) => x?.userId === loginUser?._id)
    const profileImage = loginUser?.profileImage.split('profileImage\\')[1];
    const [selectedImage, setselectedImage] = useState("")
    const toBase64 = filepath => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(filepath);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error)
    })
    const ChangeInput = (e) => {
        if (e.target.name === 'profileImage') {
            let filepath = e.target.files[0]
            value.profileImage = filepath
        }
        else {
            setvalue({ ...value, [e.target.name]: e.target.value })
        }
        imageLoad(e.target.files[0])
    }
    const imageLoad = async (image) => {
        let f = await toBase64(image)
        setselectedImage(f);
        // console.log(value);
    }
    const SaveData = () => {
        dispatch(fetchuserUpdate(value))
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: "Your profile is saved and update in 10-20 second",
            // title: 'Your profile is saved and update in 10-20 second',
            showConfirmButton: false,
            timer: 1500
        })
        setvalue({ ...obj })
        setcount(1)
        setTimeout(() => {
            // window.location.reload()
            window.location.href = "http://localhost:3000/dashboard"
        }, 1000);
        

    }
    const saveEdit = (editId) => {
        const crrUser = user.find((x) => x._id === editId)
        setvalue(crrUser)
        value.firstName = crrUser?.firstName
        value.lastName = crrUser?.lastName
        value.email = crrUser?.email
        value.mobile = crrUser?.mobile
        value.birthDate = crrUser?.birthDate
        value.profileImage = crrUser?.profileImage
    }

    function logout() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fa6132',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.reload();
            }
        })
    }

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
                                loginUser?.profileImage ?
                                    <div className='profile-image' style={{ backgroundImage: `url(profileImage/${profileImage})` }}></div>
                                    :
                                    <div className='profile-image' style={{ backgroundImage: `url(profileImage/avatar.png)` }}></div>

                            }

                        </div>
                        <div className='profile-discription pt-4 position-relative ps-2'>
                            <p className='userName display-6' style={{ fontWeight: '100', whiteSpace: "nowrap" }}>{loginUser?.firstName} {loginUser?.lastName}</p>
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
                                {
                                    loginUser?.discription ?
                                        <p className='p'></p>
                                        :
                                        <p className='p'>---------</p>
                                }

                            </div>
                            <div className='position-absolute bottom-0 d-flex justify-content-between' style={{ width: "90%" }}>
                                <button className='same-btn same-btn-hover py-1 px-0 border-radius5' style={{ width: "60%", whiteSpace: "nowrap", overflow: "hidden" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => saveEdit(loginUser?._id)}>Edit Profile</button>
                                <button className='logout-btn logout-btn-hover py-1 border-radius5 ms-2' style={{ whiteSpace: "nowrap", overflow: "hidden", width: "38%" }} onClick={() => logout()}>Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className='my-4'>
                        <h6 className='py-2 text-center' style={{ backgroundColor: "white" }}><BsGrid3X3 size={15} /> <span className='ps-2'>POSTS</span></h6>

                        <div className='row g-3'>
                            {
                                userAllPost.map((x, i) => {
                                    return <div className='col-4' key={i}>
                                        <div className='posted-image' style={{ backgroundImage: `url(userPostImage/${x.userPostImage.split('userPostImage\\')[1]})` }}></div>
                                    </div>
                                })
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

            {/* <Blank /> */}
            {/* Model  */}
            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className='orange-color m-0'>Edit your profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setvalue({ ...obj })}></button>
                        </div>
                        <div className="modal-body" >
                            <div style={{ width: "150px", height: "150px" }} className="text-center mx-auto position-relative">
                                <label htmlFor="postImage" className='cursor-pointer' data-bs-toggle="tooltip" data-bs-placement="right" title="Change profile photo">
                                    {
                                        loginUser?.profileImage ?

                                            selectedImage !== "" ?
                                                <div style={{ width: '150px', height: "150px", backgroundImage: `url(${selectedImage})`, backgroundPosition: "center center", backgroundSize: "cover", borderRadius: "50%" }}></div> :
                                                <div style={{ width: '150px', height: "150px", backgroundImage: `url(profileImage/${profileImage})`, backgroundPosition: "center center", backgroundSize: "cover", borderRadius: "50%" }}></div>

                                            :
                                            <div style={{ width: '150px', height: "150px", backgroundImage: `url(profileImage/avatar.png)`, backgroundPosition: "center center", backgroundSize: "cover", borderRadius: "50%" }}></div>
                                    }
                                </label>
                                <div style={{ width: "40px", height: "40px", top: "70%", left: "75%" }} className="position-absolute bg-dark border-1 border-radius50 d-flex align-items-center justify-content-center">
                                    <label htmlFor="postImage"><BsCamera size="60%" color='white' className='cursor-pointer' /></label>
                                    <input type="file" onChange={ChangeInput} name='profileImage' id='postImage' className='d-none' accept="image/png, image/jpg, image/jpeg" />
                                </div>
                            </div>

                            <div className='row p-3 g-3'>
                                <div className='col-12 col-md-6'>
                                    <input type="text" name='firstName' placeholder='First Name' className='profile-input w-100 py-2 px-3 border-radius5 border-1 ' style={{ backgroundColor: "#f3f3f3" }} value={value.firstName} onChange={ChangeInput} />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <input type="text" name='lastName' placeholder='Last Name' className='profile-input w-100 py-2 px-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} value={value.lastName} onChange={ChangeInput} />
                                </div>
                                <div className='col-12'>
                                    <input type="email" name='email' placeholder='Email Address' className='profile-input w-100 py-2 px-3 mt-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} value={value.email} onChange={ChangeInput} />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <input type="number" name='mobile' placeholder='Mobile Number' className='profile-input w-100 py-2 px-3 mt-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} value={value.mobile} onChange={ChangeInput} />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <input placeholder="Birth date" name='birthDate' className='profile-input w-100 py-2 px-3 mt-3 border-radius5 border-1' type="date" style={{ backgroundColor: "#f3f3f3" }} defaultValue={loginUser?.birthDate.split('T')[0]} onChange={ChangeInput} />
                                </div>

                                <div className='float-end'>
                                    <button className='same-btn mt-5 ms-2 bg-dark float-end' data-bs-dismiss="modal" aria-label="Close" style={{ backgroundImage: "none" }} onClick={() => setvalue({ ...obj })}>CANCEL</button>
                                    <button className='same-btn same-btn-hover mt-5 float-end' onClick={() => SaveData()} data-bs-dismiss="modal" aria-label="Close">SAVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile