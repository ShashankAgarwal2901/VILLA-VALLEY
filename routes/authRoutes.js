const passport = require("passport");

module.exports = (app) => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"],
		})
	);

	app.get("/auth/google/callback", function (req, res, next) {
		passport.authenticate("google", function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.redirect("/pending");
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				return res.redirect("/members");
			});
		})(req, res, next);
	});

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
};
