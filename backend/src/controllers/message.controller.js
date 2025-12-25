const messageService = require("../services/message.services");

exports.getMessagesByChatId = async (req, res) => {
  try {
    await messageService.getMessagesByChatId(req, res);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.newMessage = async (req, res) => {
  try {
    await messageService.newMessage(req, res);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};
