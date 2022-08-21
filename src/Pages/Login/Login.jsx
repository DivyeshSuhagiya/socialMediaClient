import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/images/s.png'
import { NavLink } from 'react-router-dom'
import { fetchuserLogin } from '../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'

const Login = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const obj = { email: '', password: "" }
    const [value, setvalue] = useState({ ...obj })

    const onChangeInput = (e) => {
        setvalue({ ...value, [e.target.name]: e.target.value })
    }
    const save = () => {
        let currUser = user.find(x => x.email === value.email);
        if (currUser?.email === value.email) {
            if (bcrypt.compareSync(value.password, currUser?.password)) {
                dispatch(fetchuserLogin(value))
                Swal.fire({
                    title: 'Login Successfull',
                    html: 'Please 4-5 second wait...',
                    timer: 4000,
                    timerProgressBar: true,
                    showConfirmButton:false
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                    }
                })
                setTimeout(() => {
                    if(currUser !== undefined)
                    {
                        localStorage.setItem('loginUser', JSON.stringify(currUser));
                    }
                }, 3000);
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            }
            else {
                Swal.fire(
                    'Faied?',
                    'Password is wrong please try agin!!!',
                    'question'
                )
            }
        }
        else {
            Swal.fire(
                'Faied?',
                'Email is not register please signup with this email!!!',
                'question'
            )
        }
    }
    return (
        <>
            <div className='login'>
                <div className='container'>
                    <div className='row align-items-center' style={{ height: "100vh" }}>
                        <div className='col-1 d-none d-md-block'></div>
                        <div className='col-12 col-lg-5 text-center login-name zIndex-10 d-flex justify-content-center align-items-center'>
                            <img src={logo} alt="" height="100px" />
                            <span className='ms-2 fs-1'>SDC Media</span>
                        </div>
                        <div className='col-12 login-form col-lg-5 zIndex-10 p-3'>
                            <div className='bg-white  border-radius10 p-4'>
                                <form>
                                    <h3 className='m-0 orange-color'>Login</h3>
                                    <input type="email" name='email' placeholder='Email Address' className='login-input w-100 py-2 px-3 mt-5 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} onChange={onChangeInput} required />
                                    <input type="password" name='password' placeholder='Password' className='login-input w-100 py-2 px-3 mt-4 border-radius5 border-1' style={{ backgroundColor: "#f3f3f3" }} onChange={onChangeInput} />
                                    <button type='button' className='same-bgcolor px-3 py-1 border-0 mt-4 same-btn-hover' onClick={() => save()}>Login</button>
                                </form>
                                <p className='mt-2' style={{ fontSize: "14px" }}>Don"t have account?<NavLink to="/signup">Sign Up</NavLink></p>
                            </div>

                        </div>
                        <div className='col-1 d-none d-md-block'></div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login