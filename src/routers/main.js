const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./users");
const vehicleRouter = require("./vehicles");
const reservationRouter = require("./reservation");
const authRouter = require("./auth");
const upload = require("../middlewares/upload");

mainRouter.use("/users", userRouter);
mainRouter.use("/vehicles", vehicleRouter);
mainRouter.use("/reservation", reservationRouter);
mainRouter.use("/auth", authRouter);

mainRouter.use("/upload", upload.single("profile"), (req, res) => {
  res.status(200).json({ msg: "Upload berhasil", url: req.file });
});

mainRouter.get("/", (request, response) => {
  response.redirect("vehicles");
});

module.exports = mainRouter;
