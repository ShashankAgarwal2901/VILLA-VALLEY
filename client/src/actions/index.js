import axios from "axios";
import { FETCH_USER, GENERATE_PENDINGUSERS_LIST } from "./types.js";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.post("api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAuthList = () => async (dispatch) => {
	const res = await axios.post("api/get_pending_users");
	dispatch({ type: GENERATE_PENDINGUSERS_LIST, payload: res.data });
};

export const addUser = (e, user) => async (dispatch) => {
	e.preventDefault();
	await axios.post("api/add_user", { userToAdd: user });
};

export const denyUser = () => async (dispatch) => {
	/*const res = await axios.post("api/get_pending_users");
	dispatch({ type: GENERATE_PENDINGUSERS_LIST, payload: res.data });*/
};
