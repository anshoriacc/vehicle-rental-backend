const express = require("express");
const userController = require("../controllers/users");
const userRouter = express.Router();

userRouter.post("/add", userController.addUser)
userRouter.get("/:id", userController.detailUser);
userRouter.patch("/:id", userController.editUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
