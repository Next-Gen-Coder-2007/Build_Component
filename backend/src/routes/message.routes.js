const router = require('express').Router();
const { newMessage, getMessagesByChatId } = require('../controllers/message.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, newMessage);
router.get('/:chatId', authenticateToken, getMessagesByChatId);

module.exports = router;