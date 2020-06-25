const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const superSchema = new Schema({
	googleID: String,
	name: String,
	email: String,
	admin: { type: String, default: "" },
});

mongoose.model("superAdmin", superSchema);
