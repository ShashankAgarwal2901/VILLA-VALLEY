const requireLogin = require("../middlewares/requireLogin.js");
const requireAdmin = require("../middlewares/requireAdmin.js");
const mongoose = require("mongoose");
const pendingUsersToAuthorize = mongoose.model("pendingUsers");
const superAdmins = mongoose.model("superAdmin");
const users = mongoose.model("Users");
const registeredMembers = mongoose.model("Users");
const Passwords = mongoose.model("password");
const keys = require("../config/keys.js");
const bcrypt = require("bcrypt");
const PrivNotice = mongoose.model("privNotices");
const PublicNotice = mongoose.model("publicNotices");

module.exports = (app) => {
	app.post("/api/get_pending_users", requireAdmin, async (req, res) => {
		pendingUsersToAuthorize
			.find({}, function (err, user) {
				return user;
			})
			.then((users) => res.send(users));
	});

	app.post("/api/saw_notice", requireLogin, async (req, res) => {
		const updatedNotice = await PrivNotice.findOneAndUpdate(
			{ _id: req.body.whichNotice },
			{ $addToSet: { seenBy: req.body.userThatSaw } },
			function (err, doc) {
				if (err) return res.send(500, { error: err });
				return res.send("Succesfully saved.");
			}
		);
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
			res.send({ message: "success" });
		} else res.send({ message: "error" });
	});

	app.post("/api/deny_user", requireAdmin, async (req, res) => {
		const userToDel = await pendingUsersToAuthorize.findOneAndDelete({
			_id: req.body.userToDel,
		});
		if (newUser) {
			res.send({ message: "success" });
		} else res.send({ message: "error" });
	});

	app.post("/api/new_admin", requireAdmin, (req, res) => {
		users
			.findOneAndDelete({
				_id: req.body.idOfUser,
			})
			.then((user) =>
				new superAdmins({
					admin: keys.checkingToken,
					googleID: user.googleID,
					name: user.name,
					email: user.email,
				})
					.save()
					.then((user) => res.send({ message: "success" }))
			);
	});

	app.post("/api/remove_user", requireAdmin, async (req, res) => {
		const userToDel = await users.findOneAndDelete({
			_id: req.body.idOfUser,
		});

		if (userToDel) {
			res.send({ message: "success" });
		}
	});

	app.post("/api/new_notice", requireAdmin, async (req, res) => {
		const { title, subject, content, visibility } = req.body.NoticeContent;
		if (visibility === "Members") {
			const newNotice = await new PrivNotice({
				title,
				subject,
				content,
				authorName: req.user.name,
				authorEmail: req.user.email,
				createdOn: Date.now(),
			}).save();
			if (newNotice) {
				res.send({ message: "success" });
			} else {
				res.send({ message: "error" });
			}
		}
		if (visibility === "Public") {
			const newNotice = await new PublicNotice({
				title,
				subject,
				content,
				authorName: req.user.name,
				authorEmail: req.user.email,
				reply: [],
				createdOn: Date.now(),
				seenBy: [],
			}).save();
			if (newNotice) {
				res.send({ message: "success" });
			} else {
				res.send({ message: "error" });
			}
		}
	});

	app.post("/api/get_private_notices", requireLogin, async (req, res) => {
		PrivNotice.find({}, function (err, notice) {
			return notice;
		}).then((notices) => {
			res.send(notices);
		});
	});

	app.post("/api/get_public_notices", requireLogin, async (req, res) => {
		PublicNotice.find({}, function (err, notice) {
			return notice;
		}).then((notices) => {
			res.send(notices);
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
