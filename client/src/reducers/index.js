import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import loginReducer from "./loginReducer.js";

export default combineReducers({
	auth: authReducer,
	adminStatus: loginReducer,
});
