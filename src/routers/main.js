const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./users");
const vehicleRouter = require("./vehicles");
const reservationRouter = require("./reservation");
const authRouter = require("./auth");

mainRouter.use("/users", userRouter);
mainRouter.use("/vehicles", vehicleRouter);
mainRouter.use("/reservation", reservationRouter);
mainRouter.use("/auth", authRouter);

mainRouter.get("/", (request, response) => {
  response.redirect("vehicles");
});

module.exports = mainRouter;
