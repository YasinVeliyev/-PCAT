const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");

const photoContreller = require("./controllers/photoController");
const phageContreller = require("./controllers/phageController");

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

app.get("/add", phageContreller.getPhotoAddPage);
app.get("/about", phageContreller.getAboutPage);
app.get("/photo/edit/:photoId", phageContreller.getEditPhoto);

app.get("/", photoContreller.getAllPhotos);
app.post("/photos", photoContreller.uploadPhoto);
app.get("/photo/:photoId", photoContreller.getPhotoById);
app.put("/photo/:photoId", photoContreller.updatePhoto);
app.delete("/photo/:photoId", photoContreller.deletePhoto);

mongoose.connect("mongodb://localhost:27017/pcap").then(() => {
	app.listen(5000, () => {
		console.log("Sunucu 5000 portunda başlatıldı ...");
	});
});
