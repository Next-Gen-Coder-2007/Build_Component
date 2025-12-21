const router = require('express').Router();
const Chat = require('../models/chatsession.model');

router.post('/chats', async (req, res) => {
    try {
        const userId = req.body.id;
        const { messages } = req.body;
        const newChat = new Chat({ userId, messages });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/chats', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/chats/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat session not found' });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/chats/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params;
        const { userId, messages } = req.body;
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { userId, messages }, { new: true });
        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat session not found' });
        }
        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/chats/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params;
        const deletedChat = await Chat.findByIdAndDelete(chatId);
        if (!deletedChat) {
            return res.status(404).json({ message: 'Chat session not found' });
        }
        res.status(200).json({ message: 'Chat session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;