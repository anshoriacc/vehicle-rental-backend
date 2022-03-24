const express = require('express');
const favouriteRouter = express.Router();
const auth = require('../middlewares/authorize');

const favouriteController = require('../controllers/favourite');

favouriteRouter.get(
  '/',
  auth.authorize,
  auth.authorizeCustomer,
  favouriteController.userFavourite
);

favouriteRouter.post(
  '/',
  auth.authorize,
  auth.authorizeCustomer,
  favouriteController.addToFavourite
);

favouriteRouter.delete(
  '/:id',
  auth.authorize,
  auth.authorizeCustomer,
  favouriteController.deleteFromFavourite
);

module.exports = favouriteRouter;
