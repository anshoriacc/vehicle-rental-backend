const express = require('express');
const userController = require('../controllers/users');
const userRouter = express.Router();
const auth = require('../middlewares/authorize');
const upload = require('../middlewares/upload');

userRouter.get('/detail', auth.authorize, userController.detailUser);
userRouter.patch('/edit', auth.authorize, upload, userController.editUser);

module.exports = userRouter;
