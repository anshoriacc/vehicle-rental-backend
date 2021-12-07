const express = require("express");
const profileController = require("../controllers/profile");
const profileRouter = express.Router();

profileRouter.get("/:id", profileController.getProfile);
profileRouter.post("/:id", profileController.editProfile);
profileRouter.delete("/:id", profileController.deleteUser);

module.exports = profileRouter;
