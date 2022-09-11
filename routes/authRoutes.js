const { Router } = require("express");
const authController = require("../controller/authController");

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

module.exports = router;
