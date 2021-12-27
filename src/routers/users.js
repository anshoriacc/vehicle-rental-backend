const express = require("express");
const userController = require("../controllers/users");
const userRouter = express.Router();
const auth = require("../middlewares/authorize");
const upload = require("../middlewares/upload");

userRouter.post("/add", userController.addUser);
userRouter.get("/:id", auth.authorize, userController.detailUser);
userRouter.patch("/:id", auth.authorize, upload, userController.editUser);
userRouter.delete("/:id", auth.authorize, userController.deleteUser);

module.exports = userRouter;
