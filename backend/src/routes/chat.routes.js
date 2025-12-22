const router = require('express').Router();
const { createChat, getChats, getChatById, deleteChat } = require('../controllers/chat.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, createChat);
router.get('/', authenticateToken, getChats);
router.get('/:chatId', authenticateToken, getChatById);
router.delete('/:chatId', authenticateToken, deleteChat);

module.exports = router;