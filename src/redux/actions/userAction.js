import axios from "axios";
import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "../types/type";



export const fetchuser = () => {
    return (dispatch) => {
        dispatch(userRequest());
        axios.get("http://localhost:4000/api/user/get").then(response => {
            const user = response.data.data
            dispatch(userSuccess(user))
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}

// export const fetchuserDelete = (id) => {
//     return (dispatch) => {
//         let userUrl = 'https://student-api.mycodelibraries.com/api/user/delete?id=' + id;
//         dispatch(fetchRequest());
//         axios.delete(userUrl, config).then(
//             dispatch(fetchuser())
//         ).catch(error => {
//             dispatch(fetchFailure(error.massage))
//         })
//     }
// }

export const fetchuserRegister = (value) => {
    // firstName: "", lastName: "", email: "", mobile: "", password: "", confirmPassword: "", birthDate:
    return (dispatch) => {
        dispatch(userRequest());
        axios.post("http://localhost:4000/api/user/register", value).then(response => {
            const user = response.data.data
            dispatch(userSuccess(response))
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}

export const fetchuserUpdate = (value) => {
    const formData = new FormData()
    formData.append("_id", value._id)
    formData.append("firstName", value.firstName)
    formData.append("lastName", value.lastName)
    formData.append("email", value.email)
    formData.append("mobile", value.mobile)
    formData.append("profileImage", value.profileImage)
    formData.append("birthDate", value.birthDate)
    return (dispatch) => {
        dispatch(userRequest());
        axios.post("http://localhost:4000/api/user/update", formData).then(() => {
            axios.get("http://localhost:4000/api/user/get").then(response => {
                const user = response.data.data
                dispatch(userSuccess(user))
            })
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}


export const fetchuserLogin = (value) => {

    return (dispatch) => {
        dispatch(userRequest());
        axios.post("http://localhost:4000/api/user/login", value).then(response => {
            const user = response.data.userInfo
            dispatch(userSuccess(response))
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}

export const followRequest = (value) => {
    return (dispatch) => {
        dispatch(userRequest());
        axios.post("http://localhost:4000/api/user/followRequest" , value ).then((response) => {
            console.log(response)
            axios.get("http://localhost:4000/api/user/get" ).then(response => {
            const user = response.data.data
            dispatch(userSuccess(user))
        })
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}

export const followRequestAccept = (value) => {
    return (dispatch) => {
        dispatch(userRequest());
        axios.post("http://localhost:4000/api/user/followAccept" , value ).then((response) => {
            console.log(response)
            axios.get("http://localhost:4000/api/user/get" ).then(response => {
            const user = response.data.data
            dispatch(userSuccess(user))
        })
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}
export const followRequestDelete = (value) => {
    return (dispatch) => {
        dispatch(userRequest());
        axios.delete("http://localhost:4000/api/user/followDelete" , value ).then((response) => {
            console.log(response)
            axios.get("http://localhost:4000/api/user/get" ).then(response => {
            const user = response.data.data
            dispatch(userSuccess(user))
        })
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}

export const unfollow = (value) => {
    return (dispatch) => {
        dispatch(userRequest());
        axios.post("http://localhost:4000/api/user/unfollow" , value ).then((response) => {
            console.log(response)
            axios.get("http://localhost:4000/api/user/get" ).then(response => {
            const user = response.data.data
            dispatch(userSuccess(user))
        })
        }).catch(error => {
            dispatch(userFailure(error.massage))
        })
    }
}

// export const fetchuserActivationCode= (emailOtp ,value) => {

//     return (dispatch) => {
//         dispatch(userRequest());
//         let otp_obj = {email : emailOtp , accountActivationCode : value.accountActivationCode}
//         axios.post("https://shopmart-nodeapp.herokuapp.com/api/user/activateAccount" , otp_obj).then(response => {
//             const user = response.data.data
//             dispatch(userSuccess(user))
//         }).catch(error => {
//             dispatch(userFailure(error.massage))
//         })
//     }
// }

// export const fetchuserGetById= () => {
//     return (dispatch) => {
//         dispatch(userRequest());
//         let cookId = document.cookie.split("=")[1];
//         axios.get(`https://shopmart-nodeapp.herokuapp.com/api/user/getById?id=${cookId}`).then(response => {
//             const user = response.data.data
//             dispatch(userSuccess(user))
//         }).catch(error => {
//             dispatch(userFailure(error.massage))
//         })
//     }
// }


// export const fetchuserUpdate = (id) => {

//     return (dispatch) => {
//         dispatch(fetchRequest());
//         // const formData = new FormData()
//         // formData.append("firstName", value.firstName)
//         // formData.append("lastName", value.lastName)
//         // formData.append("age", value.age)
//         // formData.append("hobbies", value.hobbies)
//         // formData.append("gender", value.gender)
//         // formData.append("userImage", value.image)
//         // formData.append("city", value.city)

//         let editurl = 'https://student-api.mycodelibraries.com/api/user/update' + id
//         axios.post(editurl, config_header).then(
//             //     response => {
//             //     const user = response.data.data
//             //     dispatch(fetchSuccess(user))
//             // }
//             dispatch(fetchuser())
//         ).catch(error => {
//             dispatch(fetchFailure(error.massage))
//         })
//         console.log(editurl)
//     }
// }

export const userRequest = () => {
    return {
        type: USER_REQUEST
    }
}
export const userSuccess = (user) => {
    return {
        type: USER_SUCCESS,
        payload: user
    }
}
export const userFailure = (error) => {
    return {
        type: USER_FAILURE,
        payload: error
    }
}