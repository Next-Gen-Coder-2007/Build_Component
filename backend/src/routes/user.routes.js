const userRouter = require('express').Router();
const User = require('../models/user.model');

userRouter.get('/user', async (req, res) => { // pending - have to get userId from jwt token in cookies
    try {
        const user = await User.findById(userId).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

userRouter.put('/user', async (req, res) => { // pending - have to get userId from jwt token in cookies
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true }).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

userRouter.delete('/user', async (req, res) => { // pending - have to get userId from jwt token in cookies
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = userRouter;