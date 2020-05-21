const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

const Pending = mongoose.model("pendingUsers");
const users = mongoose.model("Users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	users.findById(id).then((user) => done(null, user));
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
				console.log("AWAITING USER");
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
			console.log("NEW pendinguser --------------------------", pending);
			return done(null, false, {
				message: "You account has been sent to admin for Authorization",
			});
		}
	)
);
