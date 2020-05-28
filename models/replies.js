const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repliesSchema = new Schema({
	reply: "String",
	userID: mongoose.Schema.Types.ObjectId,
});

mongoose.model("replies", repliesSchema);
