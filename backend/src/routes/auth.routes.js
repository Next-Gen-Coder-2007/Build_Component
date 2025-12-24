const router = require("express").Router();
const { registerUser, loginUser, verifyUser } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyUser);

module.exports = router;