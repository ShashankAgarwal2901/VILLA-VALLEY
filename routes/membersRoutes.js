const requireLogin = require("../middlewares/requireLogin.js");
const requireAdmin = require("../middlewares/requireAdmin.js");
const mongoose = require("mongoose");
const pendingUsersToAuthorize = mongoose.model("pendingUsers");
const superAdmins = mongoose.model("superAdmin");
const users = mongoose.model("Users");
const registeredMembers = mongoose.model("Users");
const Passwords = mongoose.model("password");
const bcrypt = require("bcrypt");

module.exports = (app) => {
	app.post("/api/get_pending_users", requireAdmin, async (req, res) => {
		pendingUsersToAuthorize
			.find({}, function (err, user) {
				return user;
			})
			.then((users) => res.send(users));
	});

	app.post("/api/users_list", requireAdmin, async (req, res) => {
		superAdmins
			.find({}, function (err, user) {
				return user;
			})
			.then((superUsers) => {
				users
					.find({}, function (err, user) {
						return user;
					})
					.then((normalUsers) =>
						res.send([...superUsers, ...normalUsers])
					);
			});
		/*users
			.find({}, function (err, user) {
				return user;
			})
			.then((users) => (stack = stack.concat(users)));*/
		/*res.send(stack);*/
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
	app.post("/api/deny_user", requireAdmin, async (req, res) => {
		const userToDel = await pendingUsersToAuthorize.findOneAndDelete({
			_id: req.body.userToDel,
		});
	});

	app.post("/api/check_admin", requireLogin, async (req, res) => {
		Passwords.findOne({ id: "password" }).then((obj) => {
			bcrypt.compare(req.body.password, obj.password, function (
				err,
				result
			) {
				if (err) {
					res.send({ err: err });
				}
				if (result) {
					res.send({ success: "success" });
				} else {
					// response is OutgoingMessage object that server response http request
					res.send({ failure: "Wrong password" });
				}
			});
		});
	});
};
