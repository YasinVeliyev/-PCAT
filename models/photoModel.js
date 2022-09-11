const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

photoSchema.pre(/^find/, function () {
    this.populate("author");
});

const photoModel = mongoose.model("Photos", photoSchema);
module.exports = photoModel;
