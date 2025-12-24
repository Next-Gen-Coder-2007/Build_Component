const {registerUser, loginUser, verifyUser } = require('../services/auth.services');

exports.registerUser = async (req, res) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.loginUser = async (req, res) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        res.status(500).json({ error});
    }
};

exports.verifyUser = async (req, res) => {
    try{
        await verifyUser(req, res);
    } catch(error){
        res.status(500).json({ error });
    }
}