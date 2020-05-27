import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import pendingListReducer from "./pendingListReducer.js";
import loginReducer from "./loginReducer.js";

export default combineReducers({
	auth: authReducer,
	pendingUsers: pendingListReducer,
	adminStatus: loginReducer,
});
