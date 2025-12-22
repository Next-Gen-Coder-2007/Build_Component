const { authenticateToken } = require('../middleware/auth.middleware');
const { getUserById, updateUser, deleteUser } = require('../services/user.services');

const userRouter = require('express').Router();

userRouter.get('/', authenticateToken, getUserById);
userRouter.put('/', authenticateToken, updateUser);
userRouter.delete('/', authenticateToken, deleteUser);

module.exports = userRouter;