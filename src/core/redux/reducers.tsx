import { combineReducers } from "redux";
import { authReducer } from "../../features/auth/redux/AuthReducer";

const reducers = combineReducers({
    auth : authReducer
})

export default reducers;