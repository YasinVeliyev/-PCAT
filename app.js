const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Photo = require("./models/photoModel");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

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
	let { title, description } = req.body;
	await Photo.create({ title, description });
	res.redirect("/");
});

mongoose.connect("mongodb://localhost:27017/pcap").then(() => {
	app.listen(5000, () => {
		console.log("Sunucu 3000 portunda başlatıldı ...");
	});
});
