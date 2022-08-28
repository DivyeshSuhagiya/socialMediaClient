import { combineReducers } from "redux";
import userPostReducer from "./userPostReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user : userReducer,
    userPost :userPostReducer
  })
export default rootReducer