const Photo = require("../models/photoModel");

exports.getEditPhoto = async (req, res, next) => {
	let photo = await Photo.findById(req.params.photoId);
	res.render("edit", { photo });
};

exports.getAboutPage = (req, res, next) => {
	res.render("about.ejs");
};

exports.getPhotoAddPage = (req, res, next) => {
	res.render("add.ejs");
};
