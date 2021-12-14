const express = require("express");
const reservationController = require("../controllers/reservation");
const reservationRouter = express.Router();
const auth = require("../middlewares/authorize");

reservationRouter.get(
  "/",
  auth.authorize,
  reservationController.getReservation
);
reservationRouter.post(
  "/",
  auth.authorizeCustomer,
  reservationController.postReservation
);

module.exports = reservationRouter;
