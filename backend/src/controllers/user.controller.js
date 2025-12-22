const userService = require('../services/user.services');

exports.getUser = async (req, res) => {
    try {
        await userService.getUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        await userService.updateUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};