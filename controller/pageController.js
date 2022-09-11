const Photo = require("../models/photoModel");

exports.getIndexPage = (req, res) => {
    res.render("index", { page: " index" });
};
exports.getAboutPage = (req, res) => {
    res.render("about", { page: " about" });
};
exports.getPhotosPage = async (req, res) => {
    const photos = await Photo.find({});

    res.render("photo", { page: " photos", photos });
};
exports.getContactPage = (req, res) => {
    res.render("contact", { page: " contact" });
};
exports.getLoginPage = (req, res) => {
    res.render("login", { page: " login" });
};
exports.getRegisterPage = (req, res) => {
    res.render("register", { page: " register" });
};

exports.getAddPhotoPage = (req, res) => {
    res.render("add_photo", { page: " add_photo" });
};

exports.getUpdatePhotoPage = async (req, res) => {
    let photo = await Photo.findById(req.params.photoId).lean()
    res.render("update", { page: " update", photo });
};
