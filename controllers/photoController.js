const fs = require("fs");
const path = require("path");

const Photo = require("../models/photoModel");

__dirname = path.dirname(__dirname);

exports.getAllPhotos = async (req, res, next) => {
	const photos = await Photo.find({});
	res.render("index.ejs", { photos });
};

exports.getPhotoById = async (req, res, next) => {
	let photo = await Photo.findById(req.params.photoId);
	res.render("photo", { photo });
};

exports.uploadPhoto = async (req, res, next) => {
	let uploadedImage = req.files.image;
	let image = `/uploads/${uploadedImage.name.split(".")[0]}${Date.now()}.${uploadedImage.name.split(".")[1]}`;
	let uploadPath = __dirname + "/public" + image;
	let { title, description } = req.body;
	uploadedImage.mv(uploadPath, async () => {
		await Photo.create({ title, description, image });
	});
	res.redirect("/");
};

exports.updatePhoto = async (req, res, next) => {
	let { title, description } = req.body;
	let photo = await Photo.findByIdAndUpdate(req.params.photoId, { title, description });
	res.redirect(`/photo/${req.params.photoId}`);
};

exports.deletePhoto = async (req, res, next) => {
	let photo = Photo.findByIdAndDelete(req.params.photoId, (err, data) => {
		fs.unlink(path.join(__dirname, "/public", data.image), (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log("File deleted");
			}
		});
	});
	res.redirect("/");
};
