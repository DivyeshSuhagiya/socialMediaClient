import axios from "axios";
import { USER_POST_FAILURE, USER_POST_REQUEST, USER_POST_SUCCESS } from "../types/type";



export const fetchuserPost = () => {
    return (dispatch) => {
        dispatch(userPostRequest());
        axios.get("http://localhost:4000/api/userPost/get" ).then(response => {
            const user = response.data.data
            dispatch(userPostSuccess(user))
        }).catch(error => {
            dispatch(userPostFailure(error.massage))
        })
    }
}

// export const fetchuserPostDelete = (id) => {
//     return (dispatch) => {
//         let userUrl = 'https://student-api.mycodelibraries.com/api/user/delete?id=' + id;
//         dispatch(fetchRequest());
//         axios.delete(userUrl, config).then(
//             dispatch(fetchuserPost())
//         ).catch(error => {
//             dispatch(fetchFailure(error.massage))
//         })
//     }
// }

// export const fetchuserPostRegister = (value) => {
//     return (dispatch) => {
//         dispatch(userPostRequest());
//         axios.post("http://localhost:4000/api/user/register" , value).then(response => {
//             const user = response.data.data
//             dispatch(userPostSuccess(response))
//         }).catch(error => {
//             dispatch(userPostFailure(error.massage))
//         })
//     }
// }


export const fetchuserPostAdd = (value) => {

    return (dispatch) => {
        dispatch(userPostRequest());
        const formData = new FormData()
        formData.append("location", value.location)
        formData.append("discription", value.discription)
        formData.append("userId", value.userId)
        formData.append("userPostImage", value.userPostImage)

        axios.post("http://localhost:4000/api/userPost/post" , formData ).then(response => {
            const user = response.data.data
            dispatch(userPostSuccess(user))
        }).catch(error => {
            dispatch(userPostFailure(error.massage))
        })
    }
}

export const userPostRequest = () => {
    return {
        type: USER_POST_REQUEST
    }
}
export const userPostSuccess = (user) => {
    return {
        type: USER_POST_SUCCESS,
        payload: user
    }
}
export const userPostFailure = (error) => {
    return {
        type: USER_POST_FAILURE,
        payload: error
    }
}