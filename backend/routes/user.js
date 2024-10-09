const express = require("express");
const User = require("../models/User.js");
const userRoute = express.Router();

userRoute.get("/user", (req, res) => {
  res.json({ message: "getting all users!" });
});

userRoute.get("/user:id", (req, res) => {
  res.json({ message: "getting selected user!" });
});

userRoute.post("/user", async (req, res) => {
  const { name, phone, email, password, role } = req.body;
  try {
    const user = await User.create({ name, phone, email, password, role });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

userRoute.delete("/user:id", (req, res) => {
  res.json({ message: "deleting selected user!" });
});

userRoute.patch("/user:id", (req, res) => {
  res.json({ message: "updating selected user!" });
});

module.exports = userRoute;
