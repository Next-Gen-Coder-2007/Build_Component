const router = require('express').Router();
const Component = require('../models/component.model');

router.post('/sandbox/run', async (req, res) => {
    try {
        const { code, language } = req.body;
        const output = `Executed code in ${language}: ${code}`;
        res.status(200).json({ output });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;