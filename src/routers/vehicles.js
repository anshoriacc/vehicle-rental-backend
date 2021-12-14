const express = require("express");
const vehicleController = require("../controllers/vehicles");
const vehicleRouter = express.Router();
const auth = require("../middlewares/authorize");

vehicleRouter.get("/", vehicleController.getVehicle);
vehicleRouter.get("/:id", vehicleController.vehicleDetail);
vehicleRouter.post("/", vehicleController.postNewVehicle);
vehicleRouter.patch("/:id", vehicleController.editVehicle);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle);

module.exports = vehicleRouter;
