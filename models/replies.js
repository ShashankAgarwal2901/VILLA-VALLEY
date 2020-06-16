const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repliesSchema = new Schema({
	reply: String,
	createdAt: String,
	userEmail: String,
});
