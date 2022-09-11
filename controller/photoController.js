const Photo = require("../models/photoModel");
const fs = require("node:fs");
const path = require("node:path");

exports.addPhoto = async (req, res, next) => {
    await Photo.create({
        name: req.body.name,
        src: req.file.filename,
        title: req.body.title,
        description: req.body.description,
        author: req.session.user._id,
    });
    res.redirect("/photos");
};

exports.deletePhoto = (req, res, next) => {
    if (req.session.user.role == "admin") {
        Photo.findByIdAndDelete(req.params.photoId, (err, doc, res) => {
            fs.unlinkSync(path.resolve(`./public/photos/${doc.src}`));
        });
    } else {
        Photo.findOneAndDelete({ _id: req.params.photoId, author: req.session.user._id }, (err, doc, res) => {
            fs.unlinkSync(path.resolve(`./public/photos/${doc.src}`));
        });
    }

    res.status(200).json({});
};


exports.updatePhoto = async (req, res, next) => {
    console.log(req.body, req.params.photoId)
    let photo = await Photo.findByIdAndUpdate(req.params.photoIdf, {
        name: req.body.name,
        src: req.file?.filename,
        title: req.body.title,
        description: req.body.description,
    }, { runValidators: true })
    console.log(photo)
    res.redirect("/photos")
}

