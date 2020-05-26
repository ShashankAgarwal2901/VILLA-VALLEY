const requireLogin = require("../middlewares/requireLogin.js");
const requireAdmin = require("../middlewares/requireAdmin.js");
const mongoose = require("mongoose");
const pendingUsersToAuthorize = mongoose.model("pendingUsers");
const registeredMembers = mongoose.model("Users");

module.exports = (app) => {
	app.post("/api/get_pending_users", requireAdmin, async (req, res) => {
		pendingUsersToAuthorize
			.find({}, function (err, user) {
				return user;
			})
			.then((users) => res.send(users));
	});

	app.post("/api/add_user", requireAdmin, async (req, res) => {
		const userToAdd = await pendingUsersToAuthorize.findOneAndDelete({
			_id: req.body.userToAdd,
		});

		const newUser = await new registeredMembers({
			googleID: userToAdd.googleID,
			name: userToAdd.name,
			email: userToAdd.email,
		}).save();
		if (newUser) {
			res.send({ newUser: newUser });
		} else res.send({ message: "error" });
	});
};
