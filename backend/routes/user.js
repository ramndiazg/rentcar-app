const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController.js");
const userRoute = express.Router();

userRoute.get("/user", getUsers);

userRoute.get("/user/:id", getUser);

userRoute.post("/user", createUser);

userRoute.delete("/user/:id", deleteUser);

userRoute.patch("/user/:id", updateUser);

module.exports = userRoute;
