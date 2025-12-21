const router = require('express').Router();
const Chat = require('../models/chatsession.model');
const User = require('../models/user.model');
const Component = require('../models/component.model');

router.get('/usage/', async (req, res) => {
    try {
        const { userId } = req.params;
        const chats = await Chat.find({ userId });
        let totalMessages = 0;
        let totalComponents = 0;
        chats.forEach(chat => {
            totalMessages += chat.messages.length;
            totalComponents += chat.components.length;
        }
        );
        res.status(200).json({ totalMessages, totalComponents });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/usage/increment', async (req, res) => {
    try {
        const { userId, componentId } = req.body;
        const user = await User.findById(userId);
        const component = await Component.findById(componentId);
        if (!user || !component) {
            return res.status(404).json({ message: 'User or Component not found' });
        }
        user.usageCount += 1;
        component.usageCount += 1;
        await user.save();
        await component.save();
        res.status(200).json({ message: 'Usage incremented successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;