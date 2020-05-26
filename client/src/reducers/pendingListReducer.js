import { GENERATE_PENDINGUSERS_LIST } from "../actions/types.js";

export default function (state = null, action) {
	switch (action.type) {
		case GENERATE_PENDINGUSERS_LIST:
			return action.payload || false;
		default:
			return state;
	}
}
