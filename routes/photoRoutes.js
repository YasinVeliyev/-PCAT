const path = require("node:path");
const { Router } = require("express");
const photoController = require("../controller/photoController");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/photos/");
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            var err = new Error();
            err.code = "filetype"; // to check on file type
            return cb(err);
        }
        cb(null, file.fieldname + "-" + new Date().toISOString() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.post("/add_photo", upload.single("src"), photoController.addPhoto);
router.delete("/:photoId/delete", photoController.deletePhoto);
router.post("/:photoId/update", upload.single("src"), photoController.updatePhoto);
module.exports = router;
