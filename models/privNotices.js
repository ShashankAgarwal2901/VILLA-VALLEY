const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const repliesSchema = require("./replies.js");

const privNoticeSchema = new Schema({
	title: String,
	authorName: String,
	authorEmail: String,
	subject: String,
	content: String,
	reply: { type: [repliesSchema], default: [] },
	createdOn: Date,
	seenBy: [String],
});

mongoose.model("privNotices", privNoticeSchema);
