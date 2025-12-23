const Chat = require("../models/chatsession.model");
const Message = require("../models/message.model");
const { createMessage, generateComponent } = require("./ai.services");

exports.createChat = async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;
  const title = message.content.slice(0, 10) + "...";
  const newChat = new Chat({ userId, title });
  await newChat.save();
  const { newMessageId } = await createMessage(message);
  const { newAiMessageId } = await generateComponent(message);
  res.status(201).json({ newChatId: newChat._id, newMessageId, newAiMessageId });
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