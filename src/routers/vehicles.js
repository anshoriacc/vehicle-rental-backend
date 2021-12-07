const express = require("express");
const vehicleController = require("../controllers/vehicles");
const vehicleRouter = express.Router();

vehicleRouter.get("/", vehicleController.getVehicle);
vehicleRouter.post("/", vehicleController.postNewVehicle);
vehicleRouter.get("/:id", vehicleController.vehicleDetail);
vehicleRouter.post("/:id", vehicleController.editVehicle);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle)

module.exports = vehicleRouter;
