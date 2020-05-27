import axios from "axios";
import {
	FETCH_USER,
	GENERATE_PENDINGUSERS_LIST,
	ADMIN_LOGGED_IN,
} from "./types.js";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.post("api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAuthList = () => async (dispatch) => {
	const res = await axios.post("api/get_pending_users");
	dispatch({ type: GENERATE_PENDINGUSERS_LIST, payload: res.data });
};

export const addUser = (e, user) => async (dispatch) => {
	const res = await axios.post("api/add_user", { userToAdd: user });
};

export const denyUser = () => async (dispatch) => {
	return null;
};

export const checkAdmin = (e, adminPass) => async (dispatch) => {
	e.preventDefault();
	const res = await axios.post("api/check_admin", { password: adminPass });
	if (res.data.success) {
		dispatch({ type: ADMIN_LOGGED_IN, payload: res.data });
	}
	if (res.data.failure) {
		dispatch({ type: ADMIN_LOGGED_IN, payload: res.data });
	}
};
