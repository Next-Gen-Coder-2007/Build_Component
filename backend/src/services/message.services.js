const Message = require("../models/message.model");
const { createMessage, generateComponent } = require("./ai.services");

exports.newMessage = async (req, res) => {
  const { chatId, message } = req.body;
  const { messageId } = await createMessage(chatId, message);
  const { aiMessageId } = await generateComponent(chatId, message);
  res.status(201).json({ messageId, aiMessageId });
};

exports.getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatSessionId: chatId });
  res.status(200).json(messages);
};
