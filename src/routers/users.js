const express = require("express");
const userController = require("../controllers/users");
const userRouter = express.Router();
const auth = require("../middlewares/authorize");

userRouter.post("/add", userController.addUser);
userRouter.get("/:id", userController.detailUser);
userRouter.patch("/:id", auth.authorize, userController.editUser);
userRouter.delete("/:id", auth.authorize, userController.deleteUser);

module.exports = userRouter;
