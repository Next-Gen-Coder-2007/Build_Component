const chatService = require("../services/chat.services");

exports.createChat = async (req, res) => {
  try {
    await chatService.createChat(req, res);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getChats = async (req, res) => {
  try {
    await chatService.getChats(req, res);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getChatById = async (req, res) => {
  try {
    await chatService.getChatById(req, res);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    await chatService.deleteChat(req, res);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addMessageToChat = async (req, res) => {
  try {
    await chatService.addMessageToChat(req, res);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};