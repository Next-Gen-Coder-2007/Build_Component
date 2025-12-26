const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../middleware/auth.middleware");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")

dotenv.config();

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("request Recieved")
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res
    .status(201)
    .json({
      message: "User registered successfully",
    });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ message: "Login successful", token });
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Logout successful" });
}

exports.verifyUser = async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ authenticated: false })
  }
  jwt.verify(token, process.env.JWT_SECRET)
  return res.status(200).json({ authenticated: true })
}
