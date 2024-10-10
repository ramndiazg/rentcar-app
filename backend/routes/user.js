const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
} = require("../controllers/userController.js");
const userRoute = express.Router();

userRoute.get("/user", getUsers);

userRoute.get("/user/:id", getUser);

userRoute.post("/user", createUser);

userRoute.delete("/user:id", (req, res) => {
  res.json({ message: "deleting selected user!" });
});

userRoute.patch("/user:id", (req, res) => {
  res.json({ message: "updating selected user!" });
});

module.exports = userRoute;
