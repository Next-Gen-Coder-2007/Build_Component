const router = require("express").Router();
const { registerUser, loginUser, verifyUser, logoutUser } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyUser);
router.post("/logout", logoutUser);

module.exports = router;