const router = require('express').Router();
const Chat = require('../models/chatsession.model');
const component = require('../models/component.model');
const componentVersion = require('../models/componentversion.model');

router.get('/components/:componentId/versions', async (req, res) => {
    try {
        const { componentId } = req.params;
        const chat = await Chat.findOne({ componentId });
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
        const chat = await Chat.findOne({ componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        const component = chat.components.find(comp => comp._id.toString() === componentId);
        const version = component.versions.find(ver => ver._id.toString() === versionId);
        res.status(200).json(version);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/components/:componentId/versions', async (req, res) => {
    try {
        const { componentId } = req.params;
        const { versionNumber, changes } = req.body;
        const chat = await Chat.findOne({ componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        const component = chat.components.find(comp => comp._id.toString() === componentId);
        const newVersion = { versionNumber, changes };
        component.versions.push(newVersion);
        await chat.save();
        res.status(201).json(newVersion);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/components/:componentId/versions/:versionId', async (req, res) => {
    try {
        const { componentId, versionId } = req.params;
        const { versionNumber, changes } = req.body;
        const chat = await Chat.findOne({ componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        const component = chat.components.find(comp => comp._id.toString() === componentId);
        const version = component.versions.find(ver => ver._id.toString() === versionId);
        version.versionNumber = versionNumber;
        version.changes = changes;
        await chat.save();
        res.status(200).json(version);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/components/:componentId/versions/:versionId', async (req, res) => {
    try {
        const { componentId, versionId } = req.params;
        const chat = await Chat.findOne({ componentId });
        if (!chat) {
            return res.status(404).json({ message: 'Component not found' });
        }
        const component = chat.components.find(comp => comp._id.toString() === componentId);
        component.versions = component.versions.filter(ver => ver._id.toString() !== versionId);
        await chat.save();
        res.status(200).json({ message: 'Version deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
