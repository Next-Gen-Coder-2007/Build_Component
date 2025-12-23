const router = require('express').Router();
const { createMessage, getMessagesByChatId } = require('../controllers/message.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/message', authenticateToken, createMessage);
router.get('/:chatId/messages', authenticateToken, getMessagesByChatId);


module.exports = router;