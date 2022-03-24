const express = require('express');
const vehicleController = require('../controllers/vehicles');
const vehicleRouter = express.Router();
const auth = require('../middlewares/authorize');
const uploadMultiple = require('../middlewares/uploadMultiple');

vehicleRouter.get('/detail/:id', vehicleController.vehicleDetail);

vehicleRouter.get('/search', vehicleController.searchVehicle);

vehicleRouter.get('/:category', vehicleController.getVehicleByCategory);

// vehicleRouter.get('/', vehicleController.getVehicle);

vehicleRouter.post(
  '/',
  auth.authorize,
  auth.authorizeOwner,
  uploadMultiple,
  vehicleController.postNewVehicle
);

vehicleRouter.patch(
  '/:id',
  auth.authorize,
  auth.authorizeOwner,
  uploadMultiple,
  vehicleController.editVehicle
);

vehicleRouter.delete(
  '/:id',
  auth.authorize,
  auth.authorizeOwner,
  vehicleController.deleteVehicle
);

module.exports = vehicleRouter;
