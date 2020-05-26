const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

const Pending = mongoose.model("pendingUsers");
const users = mongoose.model("Users");
const superAdmin = mongoose.model("superAdmin");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	superAdmin.findById(id).then((user) => {
		if (user) {
			done(null, user);
		}
	});

	users.findById(id).then((user) => {
		if (user) {
			done(null, user);
		}
	});
});

passport.use(
	new GoogleStratergy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingAdmin = await superAdmin.findOne({
				googleID: profile.id,
				admin: keys.checkingToken,
			});
			if (existingAdmin) {
				return done(null, existingAdmin);
			}

			const existingUser = await users.findOne({
				googleID: profile.id,
			});

			if (existingUser) {
				return done(null, existingUser);
			}
			const awaitingUser = await Pending.findOne({
				googleID: profile.id,
			});

			if (awaitingUser) {
				return done(null, false, {
					message:
						"Authorization of your account is pending from admin.",
				});
			}

			const pending = await new Pending({
				googleID: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
			}).save();

			return done(null, false, {
				message: "You account has been sent to admin for Authorization",
			});
		}
	)
);
