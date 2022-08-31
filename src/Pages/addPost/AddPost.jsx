import React, { useEffect, useState } from 'react'
import { BsArrowBarLeft, BsArrowBarRight, BsFillCloudArrowUpFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import DashboardRightIcon from '../../components/dashboardRightIcon/DashboardRightIcon'
import { fetchuserPostAdd } from '../../redux/actions/userPostAction'
import './AddPost.css'

function AddPost() {
    const [loginUser, setloginUser] = useState()
    const [nextPre, setnextPre] = useState(0)
    const [selectedImage, setselectedImage] = useState("")
    const obj = { location: '', discription: "", userPostImage: "", userId: loginUser }
    const [value, setvalue] = useState({ ...obj })
    const toBase64 = filepath => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(filepath);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error)
    })
    
    useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem("loginUser")))
    }, [])
    const dispatch = useDispatch()
    const next = () => {
        setnextPre(1)
    }
    const previous = () => {
        setnextPre(0)
    }
    const onChangeInput = async (e) => {
        if (e.target.name === 'userPostImage') {
            let filepath = e.target.files[0];
            setvalue({ ...value, [e.target.name]: filepath })
        }
        else {
            setvalue({ ...value, [e.target.name]: e.target.value })
        }
        imageLoad(e.target.files[0])
    }
    const imageLoad = async (image) => {
        let f = await toBase64(image)
        setselectedImage(f)
    }
    const save = async () => {
        value.userId = loginUser._id
        if (value.userId !== "" && value.userPostImage !== "") {
            dispatch(fetchuserPostAdd(value))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your Post is added successfull!',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location.href = "/dashboard"
            }, 1500);
        }
        else{
            Swal.fire(
                'Failed?',
                'Image not selected please try agin!!!',
                'question'
            )
        }
        setvalue({ ...obj })
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
                            <h3 className='orange-color m-0' style={{ fontFamily: "Pacifico", whiteSpace: "nowrap" }}>+ Add your new post</h3>
                        </div>
                        <div style={{ width: "300px" }} className="d-none d-md-block ps-3">
                            <DashboardRightIcon />
                        </div>
                    </div>

                    <div className='bg-white position-relative mt-3' style={{ width: "100%", height: "450px" }}>
                        <div className={`${nextPre === 1 ? "d-none" : "d-block"} d-flex justify-content-center align-items-center`}>
                            {
                                selectedImage === "" ?
                                    <label className='position-absolute top-0 d-flex justify-content-center align-items-center cursor-pointer p-3' htmlFor="postImage" style={{ display: "block", width: "100%", height: "100%" }}>
                                        <div className='text-center'>
                                            <BsFillCloudArrowUpFill size={100} color="#fa6132" />
                                            <h5>Click here to choose photo</h5>
                                        </div>
                                    </label>
                                    :
                                    <div className='position-absolute top-0 h-100 w-100 d-flex justify-content-center align-items-center'>
                                        <img src={selectedImage} alt="" height="90%" className='border-radius10' />
                                        {/* <textarea name="" id="" style={{ width: "700px", backgroundImage: `url(${selectedImage})` , resize:"horizontal" , resize:"vertical" , backgroundSize:"cover" }}>
                                        </textarea> */}
                                    </div>
                            }
                            <input type="file" name='userPostImage' id='postImage' className='d-none' accept="image/png, image/jpg, image/jpeg" onChange={onChangeInput} />
                        </div>
                        <div className={`${nextPre === 0 ? "d-none" : "d-block"} p-3 pt-4`}>
                            <h5>Add other details</h5>

                            <input type="text" name='location' value={value?.location} placeholder='Enter Location' onChange={onChangeInput} className="post-input w-100 py-2 px-3 mt-3 border-radius5 border-1 " />
                            <textarea type="text" name='discription' value={value?.discription} placeholder='Enter Discription' onChange={onChangeInput} className="post-input w-100 py-2 px-3 mt-3 border-radius5 border-1" style={{ height: "200px", resize: "none" }} />
                            <button className='same-btn same-btn-hover float-end mt-4' onClick={() => save()}>POST</button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <button onClick={() => setselectedImage("")} className={`${(nextPre === 1) || (selectedImage === "") ? "d-none" : ""} same-btn`}>Remove Image</button>
                        <button onClick={() => next()} className={`${nextPre === 1 ? "d-none" : "d-block"} float-end same-btn`}>next <BsArrowBarRight className='ms-2' /></button>
                        <button onClick={() => previous()} className={`${nextPre === 0 ? "d-none" : "d-block"} same-btn`}><BsArrowBarLeft className='me-2' /> Previous</button>
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

export default AddPost