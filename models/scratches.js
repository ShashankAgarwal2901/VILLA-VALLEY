const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const repliesSchema = require("./replies.js");

const scratchesSchema = new Schema({
	content: String,
	createdOn: Date,
	authorEmail: String,
	reply: { type: [repliesSchema], default: [] },
});

mongoose.model("scratches", scratchesSchema);
