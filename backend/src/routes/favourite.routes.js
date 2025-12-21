const router = require('express').Router();
const Chat = require('../models/chatsession.model');
const User = require('../models/user.model');
const Component = require('../models/component.model');

router.post('/favourites', async (req, res) => {
    try {
        const { userId, componentId } = req.body;
        const user = await User.findById(userId);
        const component = await Component.findById(componentId);
        if (!user || !component) {
            return res.status(404).json({ message: 'User or Component not found' });
        }
        user.favourites.push(componentId);
        await user.save();
        res.status(201).json({ message: 'Component added to favourites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/favourites/:componentId', async (req, res) => {
    try {
        const { componentId } = req.params;
        const users = await User.find({ favourites: componentId });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/favourites/:componentId', async (req, res) => {
    try {
        const { componentId } = req.params;
        const users = await User.find({ favourites: componentId });
        for (const user of users) {
            user.favourites = user.favourites.filter(fav => fav.toString() !== componentId);
            await user.save();
        }
        res.status(200).json({ message: 'Component removed from all favourites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;