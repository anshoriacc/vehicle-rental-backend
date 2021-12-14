const express = require("express");
const vehicleController = require("../controllers/vehicles");
const vehicleRouter = express.Router();
const auth = require("../middlewares/authorize");

vehicleRouter.get("/", vehicleController.getVehicle);
vehicleRouter.get("/:id", vehicleController.vehicleDetail);
vehicleRouter.post("/", auth.authorizeAdmin, vehicleController.postNewVehicle);
vehicleRouter.patch("/:id", auth.authorizeAdmin, vehicleController.editVehicle);
vehicleRouter.delete(
  "/:id",
  auth.authorizeAdmin,
  vehicleController.deleteVehicle
);

module.exports = vehicleRouter;
