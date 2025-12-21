const router = require('express').Router();
const Chat = require('../models/chatsession.model');

router.get('/chats/:chatId/components', async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat session not found' });
        }
        res.status(200).json(chat.components);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/chats/:chatId/components/:componentId', async (req, res) => {
    try {
        const { componentId } = req.params;
        const chat = await Chat.findOne({ 'components._id': componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        const component = chat.components.find(comp => comp._id.toString() === componentId);
        res.status(200).json(component);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/chats/:chatId/components/:componentId', async (req, res) => {
    try {
        const { componentId } = req.params;
        const chat = await Chat.findOne({ 'components._id': componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        chat.components = chat.components.filter(comp => comp._id.toString() !== componentId);
        await chat.save();
        res.status(200).json({ message: 'Component deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/components/:componentId/versions', async (req, res) => {
    try {
        const { componentId } = req.params;
        const chat = await Chat.findOne({ 'components._id': componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        const component = chat.components.find(comp => comp._id.toString() === componentId);
        res.status(200).json(component.versions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/components/:componentId/versions/:versionId', async (req, res) => {
    try {
        const { componentId, versionId } = req.params;
        const chat = await Chat.findOne({ 'components._id': componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        const component = chat.components.find(comp => comp._id.toString() === componentId);
        const version = component.versions.find(v => v._id.toString() === versionId);
        res.status(200).json(version);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;