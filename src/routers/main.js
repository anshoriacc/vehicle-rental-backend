const express = require("express");
const mainRouter = express.Router();

const addUserRouter = require("./adduser");
const vehicleRouter = require("./vehicles");
const profileRouter = require("./profile");
const reservationRouter = require("./reservation");
// const historyRouter = require("./history");
// const favouriteRouter = require("./favourites");

mainRouter.use("/adduser", addUserRouter);
mainRouter.use("/vehicles", vehicleRouter);
mainRouter.use("/profile", profileRouter);
mainRouter.use("/reservation", reservationRouter);
// mainRouter.use("/history", historyRouter);
// mainRouter.use("/favourites", favouriteRouter);

mainRouter.get("/", (request, response) => {
  response.redirect("vehicles");
});

module.exports = mainRouter;
