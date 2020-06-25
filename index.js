const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const sslRedirect = require("heroku-ssl-redirect");
require("./models/pendingUser.js");
require("./models/user.js");
require("./models/superAdmin.js");
require("./models/scratches.js");
require("./models/privNotices.js");
require("./models/publicNotices.js");
require("./models/password.js");
require("./services/passport.js");
const mongoose = require("mongoose");
const keys = require("./config/keys.js");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes.js")(app);
require("./routes/membersRoutes.js")(app);

if (process.env.NODE_ENV === "production") {
  app.use(sslRedirect());
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
