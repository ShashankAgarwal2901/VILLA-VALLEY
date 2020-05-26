const keys = require("../config/keys.js");

module.exports = (req, res, next) => {
	if (!req.user) {
		if (req.user.admin != keys.checkingToken) {
			return res.status(401).send({ error: "you are not an admin" });
		}
	}

	next();
};
