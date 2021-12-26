const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const fs = require("fs");

const Photo = require("./models/photoModel");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", express.static("public"));
app.use(fileUpload());
app.use(
	methodOverride("_method", {
		methods: ["POST", "GET"],
	}),
);

app.get("/", async (req, res, next) => {
	const photos = await Photo.find({});
	res.render("index.ejs", { photos });
});
app.get("/add", (req, res, next) => {
	res.render("add.ejs");
});
app.get("/about", (req, res, next) => {
	res.render("about.ejs");
});

app.post("/photos", async (req, res, next) => {
	let uploadedImage = req.files.image;
	let image =
		"/uploads/" +
		uploadedImage.name.split(".")[0] +
		Date.now() +
		"." +
		uploadedImage.name.split(".")[1];
	let uploadPath = __dirname + "/public" + image;
	let { title, description } = req.body;
	uploadedImage.mv(uploadPath, async () => {
		await Photo.create({ title, description, image });
	});
	res.redirect("/");
});
app.get("/photo/:photoId", async (req, res, next) => {
	let photo = await Photo.findById(req.params.photoId);
	res.render("photo", { photo });
});

app.get("/photo/edit/:photoId", async (req, res, next) => {
	let photo = await Photo.findById(req.params.photoId);
	res.render("edit", { photo });
});

app.put("/photo/:photoId", async (req, res, next) => {
	let { title, description } = req.body;
	let photo = await Photo.findByIdAndUpdate(req.params.photoId, { title, description });
	res.redirect(`/photo/${req.params.photoId}`);
});

app.delete("/photo/:photoId", async (req, res, next) => {
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
});

mongoose.connect("mongodb://localhost:27017/pcap").then(() => {
	app.listen(5000, () => {
		console.log("Sunucu 5000 portunda başlatıldı ...");
	});
});
