const express = require('express');
const reservationController = require('../controllers/reservation');
const reservationRouter = express.Router();
const auth = require('../middlewares/authorize');

reservationRouter.get(
  '/all',
  auth.authorizeOwner,
  reservationController.getReservationAdmin
);

reservationRouter.get(
  '/',
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
  auth.authorizeCustomer,
  reservationController.makeReservation
);

reservationRouter.patch(
  '/:id/rate',
  auth.authorizeCustomer,
  reservationController.rate
);

reservationRouter.patch(
  '/delete',
  auth.authorizeOwner,
  reservationController.deleteReservation
);

module.exports = reservationRouter;
