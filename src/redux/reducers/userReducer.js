import { USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "../types/type";

const initialState = {
    loading: false,
    user: [],
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SUCCESS:
            return {
                loading : false,
                user : action.payload,
                error : ''
            }
        case USER_FAILURE:
            return {
                loading : true,
                user : [],
                error : action.payload
            }
        default : 
        return state
    }
}


export default userReducer