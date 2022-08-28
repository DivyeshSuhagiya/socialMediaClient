import { USER_POST_FAILURE, USER_POST_REQUEST, USER_POST_SUCCESS } from "../types/type";

const initialState = {
    loading: false,
    userPost: [],
    error: ''
}

const userPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_POST_SUCCESS:
            return {
                loading : false,
                userPost : action.payload,
                error : ''
            }
        case USER_POST_FAILURE:
            return {
                loading : true,
                userPost : [],
                error : action.payload
            }
        default : 
        return state
    }
}


export default userPostReducer