const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicNoticeSchema = new Schema({
	title: String,
	authorName: String,
	authorEmail: String,
	subject: String,
	content: String,
	createdOn: Date,
});

mongoose.model("publicNotices", publicNoticeSchema);
