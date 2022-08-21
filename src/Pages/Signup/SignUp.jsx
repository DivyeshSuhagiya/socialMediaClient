import React, { useEffect, useRef, useState } from 'react'
import './SignUp.css'
import logo from '../../assets/images/s.png'
import { NavLink } from 'react-router-dom'
import { fetchuserRegister } from '../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const SignUp = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const ref = useRef();


    let obj = { firstName: "", lastName: "", email: "", mobile: "", password: "", confirmPassword: "", birthDate: '' }
    const [value, setvalue] = useState({ ...obj })
    const [emailotp, setemailotp] = useState()
    const ChangeInput = (e) => {
        setvalue({ ...value, [e.target.name]: e.target.value })

    }
    const SaveData = () => {
        let currUser = user?.find(x => x.email === value.email);
        let currUserMob = user?.find(x => x.mobile === value.mobile);
        parseInt(value.mobile)
        if ((value.firstName !== "") && (value.lastName !== "") && (value.email !== "") && (value.mobile !== "") && (value.password !== "") && (value.confirmPassword !== "") && (value.birthDate !== "")) {
            if (currUser?.email === value.email) {
                Swal.fire(
                    'Faied?',
                    'Email is already registered please try with other Email!!!',
                    'question'
                )
            }
            if (value.mobile.length > 10 || value.mobile.length < 10) {
                Swal.fire(
                    'Faied?',
                    'Please enter only 10 digit!!!',
                    'question'
                )
            }
            if (currUserMob?.mobile === value.mobile) {
                Swal.fire(
                    'Faied?',
                    'Mobile number is already registered please try with other Mobile No.!!!',
                    'question'
                )
            }
            if (value.password !== value.confirmPassword) {
                Swal.fire(
                    'Faied?',
                    'Password and confirm password not match!!!',
                    'question'
                )
            }
            if ((currUser == undefined) && (value.mobile.length == 10) && (currUserMob == undefined) && (value.password === value.confirmPassword)) {
                dispatch(fetchuserRegister(value))
                window.location.replace("/signin")
            }

        }
        else {
            Swal.fire({
                icon: 'info',
                title: 'Please Fill Form.....',
                text: 'Enter All Field',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }


    return (
        <>
            <div className='signup'>
                <div className='container'>
                    <div className='row align-items-center' style={{ height: "100vh" }}>
                        <div className='col-1 d-none d-md-block'></div>
                        <div className='col-12 col-lg-5 text-center signup-name zIndex-10 d-flex justify-content-center align-items-center'>
                            <img src={logo} alt="" height="100px" />
                            <span className='ms-2 fs-1'>SDC Media</span>
                        </div>
                        <div className='col-12 signup-form col-lg-5 zIndex-10 p-3'>
                            <div className='bg-white  border-radius10 p-3'>
                                <h3 className='m-0 orange-color'>Sign Up</h3>
                                <div className='d-flex'>
                                    <input type="text" name='firstName' placeholder='First Name' value={value.firstName} className='signup-input w-100 py-2 px-3 mt-4 border-radius5 border-1 me-2' style={{ backgroundColor: "#f3f3f3" }} onChange={ChangeInput} />
                                    <input type="text" name='lastName' placeholder='Last Name' value={value.lastName} className='signup-input w-100 py-2 px-3 mt-4 border-radius5 border-1 ms-2' style={{ backgroundColor: "#f3f3f3" }} onChange={ChangeInput} />
                                </div>
                                <input type="email" name='email' placeholder='Email Address' value={value.email} className='signup-input w-100 py-2 px-3 mt-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} onChange={ChangeInput} />
                                <input type="password" name='password' placeholder='Password' value={value.password} className='signup-input w-100 py-2 px-3 mt-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} onChange={ChangeInput} />
                                <input type="password" name='confirmPassword' placeholder='Confirm Password' value={value.confirmPassword} className='signup-input w-100 py-2 px-3 mt-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} onChange={ChangeInput} />
                                <input type="number" name='mobile' placeholder='Mobile Number' value={value.mobile} className='signup-input w-100 py-2 px-3 mt-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} onChange={ChangeInput} />
                                {/* <input type="date" className='signup-input w-100 py-2 px-3 mt-3 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} /> */}
                                <input placeholder="Birth date" name='birthDate' value={value.birthDate} className='signup-input w-100 py-2 px-3 mt-3 border-radius5 border-1' type="text" ref={ref} onFocus={() => (ref.current.type = "date")} onBlur={() => (ref.current.type = "text")} style={{ backgroundColor: "#f3f3f3" }} onChange={ChangeInput}></input>

                                <button type='button' className='same-bgcolor same-btn-hover px-3 py-1 border-0 mt-4' onClick={SaveData}>Sign Up</button>
                                <p className='mt-2' style={{ fontSize: "14px" }}>have a account?<NavLink to="/">Login</NavLink></p>
                            </div>

                        </div>
                        <div className='col-1 d-none d-md-block'></div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SignUp