const express = require("express");
const reservationController = require("../controllers/reservation");
const reservationRouter = express.Router();
const auth = require("../middlewares/authorize");

reservationRouter.get(
  "/all",
  auth.authorizeAdmin,
  reservationController.getReservationAdmin
);

reservationRouter.get(
  "/",
  auth.authorizeCustomer,
  reservationController.getReservationCustomer
);

reservationRouter.post(
  "/",
  auth.authorizeCustomer,
  reservationController.makeReservation
);

reservationRouter.patch(
  "/:id/rate",
  auth.authorizeCustomer,
  reservationController.rate
);

module.exports = reservationRouter;
