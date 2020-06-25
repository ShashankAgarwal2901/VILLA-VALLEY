import { ADMIN_LOGGED_IN } from "../actions/types.js";

export default function (state = null, action) {
	switch (action.type) {
		case ADMIN_LOGGED_IN:
			if (action.payload.success) {
				return true;
			}
			if (action.payload.failure) {
				return action.payload.failure;
			}

		default:
			return state;
	}
}
