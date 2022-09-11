const { Router } = require("express");
const pageController = require("../controller/pageController");

const router = Router();

router.get("/", pageController.getIndexPage);
router.get("/about", pageController.getAboutPage);
router.get("/photos", pageController.getPhotosPage);
router.get("/contact", pageController.getContactPage);
router.get("/login", pageController.getLoginPage);
router.get("/register", pageController.getRegisterPage);
router.get("/add_photo", pageController.getAddPhotoPage);
router.get("/photos/:photoId/update", pageController.getUpdatePhotoPage);

module.exports = router;
