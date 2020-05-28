const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./replies.js")
conse repliesSchema = mongoose.model('replies')

const privNoticeSchema = new Schema({
	title: String,
	authorName: String,
	authorEmail: String,
	subject: String,
	content: String,
	reply: [repliesSchema],
	createdOn: Date,
	seenBy: [mongoose.Schema.Types.ObjectId],
});

mongoose.model("privNotices", privNoticeSchema);
