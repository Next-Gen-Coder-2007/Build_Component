const authServices = require('../services/auth.services');

exports.registerUser = async (req, res) => {
    try {
        await authServices.registerUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        await authServices.loginUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};