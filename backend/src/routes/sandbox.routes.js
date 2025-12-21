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

router.get('/versions/:versionId/executions', async (req, res) => {
    try {
        const { versionId } = req.params;
        const component = await Component.findOne({ 'versions._id': versionId });
        if (!component) {
            return res.status(404).json({ message: 'Component version not found' });
        }
        const version = component.versions.find(ver => ver._id.toString() === versionId);
        res.status(200).json(version.executions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/versions/:versionId/executions/:executionId', async (req, res) => {
    try {
        const { versionId, executionId } = req.params;
        const component = await Component.findOne({ 'versions._id': versionId });
        if (!component) {
            return res.status(404).json({ message: 'Component version not found' });
        }
        const version = component.versions.find(ver => ver._id.toString() === versionId);
        const execution = version.executions.find(exec => exec._id.toString() === executionId);
        res.status(200).json(execution);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    } 
});

module.exports = router;