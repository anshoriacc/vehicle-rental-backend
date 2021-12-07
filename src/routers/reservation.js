const express = require("express");
const reservationController = require("../controllers/reservation");
const reservationRouter = express.Router();

reservationRouter.get("/", reservationController.getReservation);
reservationRouter.post("/", reservationController.postReservation);

module.exports = reservationRouter;
