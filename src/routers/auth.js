const express = require('express');
const authController = require('../controllers/auth');
const authRouter = express.Router();
const validate = require('../middlewares/validate');

authRouter.post(
  '/register',
  validate.validateRegister,
  authController.register
);
authRouter.post('/login', validate.validateLogin, authController.login);
authRouter.post('/forgot', authController.forgot);

module.exports = authRouter;
