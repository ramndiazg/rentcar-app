const express = require("express");
const Vehicle = require("../models/Vehicle.js");
const vehicleRoute = express.Router();

vehicleRoute.get("/vehicle", (req, res) => {
  res.json({ message: "getting all vehicles!" });
});

vehicleRoute.get("/vehicle:id", (req, res) => {
  res.json({ message: "getting selected vehicle!" });
});

vehicleRoute.post("/vehicle", async (req, res) => {
  const {
    make,
    model,
    color,
    year,
    chassis,
    register,
    mileage,
    imageUrl,
    status,
    comments,
  } = req.body;
  try {
    const vehicle = await Vehicle.create({
      make,
      model,
      color,
      year,
      chassis,
      register,
      mileage,
      imageUrl,
      status,
      comments,
    });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

vehicleRoute.delete("/vehicle:id", (req, res) => {
  res.json({ message: "deleting selected vehicle!" });
});

vehicleRoute.patch("/vehicle:id", (req, res) => {
  res.json({ message: "updating selected vehicle!" });
});

module.exports = vehicleRoute;
