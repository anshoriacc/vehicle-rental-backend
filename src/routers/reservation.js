const express = require('express');
const reservationController = require('../controllers/reservation');
const reservationRouter = express.Router();
const auth = require('../middlewares/authorize');

reservationRouter.get(
  '/all',
  auth.authorize,
  auth.authorizeOwner,
  reservationController.getReservationAdmin
);

reservationRouter.get(
  '/',
  auth.authorize,
  auth.authorizeCustomer,
  reservationController.getReservationCustomer
);

reservationRouter.get(
  '/:id',
  auth.authorize,
  reservationController.getReservationDetail
);

reservationRouter.post(
  '/',
  auth.authorize,
  auth.authorizeCustomer,
  reservationController.makeReservation
);

reservationRouter.patch(
  '/:id/rate',
  auth.authorize,
  auth.authorizeCustomer,
  reservationController.rate
);

reservationRouter.patch(
  '/delete',
  auth.authorize,
  auth.authorizeOwner,
  reservationController.deleteReservation
);

module.exports = reservationRouter;
