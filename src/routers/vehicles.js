const express = require("express");
const vehicleController = require("../controllers/vehicles");
const vehicleRouter = express.Router();
const auth = require("../middlewares/authorize");
const uploadMultiple = require("../middlewares/uploadMultiple");

vehicleRouter.get("/", vehicleController.getVehicle);

vehicleRouter.get("/:category", vehicleController.getVehicleByCategory);
vehicleRouter.get("/search", vehicleController.searchVehicle);

vehicleRouter.get("/detail/:id", vehicleController.vehicleDetail);

vehicleRouter.post(
  "/",
  auth.authorizeOwner,
  uploadMultiple,
  vehicleController.postNewVehicle
);

vehicleRouter.patch(
  "/:id",
  auth.authorizeOwner,
  uploadMultiple,
  vehicleController.editVehicle
);

vehicleRouter.delete(
  "/:id",
  auth.authorizeOwner,
  vehicleController.deleteVehicle
);

module.exports = vehicleRouter;
