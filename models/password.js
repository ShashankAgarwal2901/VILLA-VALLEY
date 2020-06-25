const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
	id: String,
	password: String,
});

mongoose.model("password", passwordSchema);
