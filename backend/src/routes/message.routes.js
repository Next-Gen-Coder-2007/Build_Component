const router = require('express').Router();
const { getMessagesByChatId } = require('../controllers/message.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.get('/:chatId/messages', authenticateToken, getMessagesByChatId);

module.exports = router;