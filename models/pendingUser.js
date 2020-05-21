const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pendingSchema = new Schema({
	googleID: String,
	name: String,
	email: String,
});

mongoose.model("pendingUsers", pendingSchema);
