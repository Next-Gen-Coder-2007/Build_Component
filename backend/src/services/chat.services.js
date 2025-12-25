const Chat = require("../models/chatsession.model");
const Message = require("../models/message.model");
const { createMessage, generateComponent } = require("./ai.services");

exports.createChat = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: User missing" });
    }
    const userId = req.user.id;
    const { message } = req.body;
    console.log(typeof message);
    const title = message.slice(0, 20) + "...";
    const newChat = new Chat({ userId, title });
    await newChat.save();
    await createMessage(
      newChat._id,
      message
    );
    await generateComponent(
      newChat._id,
      message
    );
    return res.status(201).json({ newChatId: newChat._id });
  } catch (err) {
    console.error("Crash:", err.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.getChats = async (req, res) => {
  const chats = await Chat.find({ userId: req.user.id });
  res.status(200).json(chats);
};

exports.getChatById = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
  if (!chat) {
    return res.status(404).json({ message: "Chat session not found" });
  }
  res.status(200).json(chat);
};

exports.deleteChat = async (req, res) => {
  const { chatId } = req.params;
  const deleteMessages = await Message.deleteMany({ chatSessionId: chatId });
  const deletedChat = await Chat.findOneAndDelete({
    _id: chatId,
    userId: req.user.id,
  });
  if (!deletedChat) {
    return res.status(404).json({ message: "Chat session not found" });
  }
  res.status(200).json({ message: "Chat session deleted successfully" });
};
