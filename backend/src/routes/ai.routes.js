const router = require('express').Router();

router.post('/ai/generate', async (req, res) => {
    try {
        const { chatId, prompt } = req.body;
        const generatedContent = `Generated content based on prompt: ${prompt}`;
        res.status(200).json({ content: generatedContent });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/ai/regenerate', async (req, res) => {
    try {
        const { componentId, prompt } = req.body;
        const regeneratedContent = `Regenerated content based on prompt: ${prompt}`;
        res.status(200).json({ content: regeneratedContent });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;