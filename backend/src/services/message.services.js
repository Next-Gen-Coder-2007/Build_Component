const Message = require("../models/message.model");
const { createMessage, generateComponent } = require("./ai.services");

exports.newMessage = async (req, res) => {
  const { chatId, message } = req.body;
  const { newMessage } = await createMessage(chatId, message);
  const { newAiMessage } = await generateComponent(chatId, message);
  res.status(201).json({ newMessage, newAiMessage });
};

exports.getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatSessionId: chatId }).select("-_id -chatSessionId -createdAt");
  res.status(200).json(messages)
};