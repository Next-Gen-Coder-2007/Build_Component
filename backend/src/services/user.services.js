const chatsessionModel = require("../models/chatsession.model");
const messageModel = require("../models/message.model");
const User = require("../models/user.model");

exports.getUserById = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.status(200).json({ user });
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email, password: passwordHash },
    { new: true }
  ).select("-password");
  res.status(200).json({ user });
};

exports.deleteUser = async (req, res) => {
  const userId = req.user.id;
  const chatSessions = await chatsessionModel.find({ userId: userId });
  const chatSessionIds = chatSessions.map((session) => session._id);
  await messageModel.deleteMany({ chatSessionId: { $in: chatSessionIds } });
  await chatsessionModel.deleteMany({ userId: userId });
  await User.findByIdAndDelete(userId);
  res.status(200).json({ message: "User deleted successfully" });
};
