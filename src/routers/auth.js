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
authRouter.patch(
  '/change-password',
  auth.authorize,
  authController.changePassword,
)
authRouter.post('/logout', auth.authorize, authController.logout);
authRouter.post('/forgot', authController.forgot);
authRouter.post('/check-otp', authController.checkOtp)
authRouter.post('/reset-password', authController.resetPassword);

module.exports = authRouter;
