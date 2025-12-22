const Message = require("../models/message.model");
const { createMessage, generateComponent } = require("./auth.services");

exports.newMessage = async (req, res) => {
    const { messageId } = await createMessage(req, res);
    const { aiMessageId } = await generateComponent(req, res);
    res.status(201).json({ messageId, aiMessageId });
};

exports.getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatSessionId: chatId });
  res.status(200).json(messages);
};