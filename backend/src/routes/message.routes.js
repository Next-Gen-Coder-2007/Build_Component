const router = require('express').Router();
const Chat = require('../models/chatsession.model');
const User = require('../models/user.model');

router.post('/chats/:chatId/messages', async (req, res) => {
    try {
        const { chatId, role, content } = req.body;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat session not found' });
        }
        const newMessage = { role, content, timestamp: new Date() };
        chat.messages.push(newMessage);
        chat.updatedAt = new Date();
        await chat.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/chats/:chatId/messages', async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat session not found' });
        }
        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/chats/:chatId/messages/:messageId', async (req, res) => {
    try {
        const { chatId, messageId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat session not found' });
        }
        chat.messages = chat.messages.filter(message => message._id.toString() !== messageId);
        chat.updatedAt = new Date();
        await chat.save();
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;