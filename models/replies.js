const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repliesSchema = new Schema({
	reply: "String",
	userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});
