const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleID: String,
	name: String,
	email: String,
});

mongoose.model("Users", userSchema);
