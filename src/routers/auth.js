const express = require('express');
const authController = require('../controllers/auth');
const authRouter = express.Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/authorize');

authRouter.post(
  '/register',
  validate.validateRegister,
  authController.register
);
authRouter.post('/login', validate.validateLogin, authController.login);
authRouter.post('/logout', auth.authorize, authController.logout);
authRouter.post('/forgot', authController.forgot);

module.exports = authRouter;
