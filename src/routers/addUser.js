const express = require("express");
const addUserController = require("../controllers/addUser");
const addUserRouter = express.Router();

addUserRouter.post("/", addUserController.addUser);

module.exports = addUserRouter;
