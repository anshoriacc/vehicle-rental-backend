const express = require("express");
const vehicleController = require("../controllers/vehicles");
const vehicleRouter = express.Router();
const auth = require("../middlewares/authorize");
const upload = require("../middlewares/upload");

vehicleRouter.get("/", vehicleController.getVehicle);

vehicleRouter.get("/:category", vehicleController.getVehicleByCategory);
vehicleRouter.get("/search/", vehicleController.searchVehicle);

vehicleRouter.get("/detail/:id", vehicleController.vehicleDetail);

vehicleRouter.post(
  "/",
  auth.authorizeCustomer,
  vehicleController.postNewVehicle
);

vehicleRouter.patch(
  "/:id",
  auth.authorizeCustomer,
  upload,
  vehicleController.editVehicle
);

vehicleRouter.delete("/:id", auth.authorize, vehicleController.deleteVehicle);

module.exports = vehicleRouter;
