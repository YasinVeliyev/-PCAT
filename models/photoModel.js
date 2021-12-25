const mongoose = require("mongoose");

let photoScheam = new mongoose.Schema({
	title: String,
	description: String,
	image: String,
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

const Photo = mongoose.model("Photo", photoScheam);

module.exports = Photo;
