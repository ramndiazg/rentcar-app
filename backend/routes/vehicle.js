const express = require("express");
const {
  createVehicle,
  getVehicles,
  getVehicle,
} = require("../controllers/vehicleController.js");
const vehicleRoute = express.Router();

vehicleRoute.get("/vehicle", getVehicles);

vehicleRoute.get("/vehicle/:id", getVehicle);

vehicleRoute.post("/vehicle", createVehicle);

vehicleRoute.delete("/vehicle:id", (req, res) => {
  res.json({ message: "deleting selected vehicle!" });
});

vehicleRoute.patch("/vehicle:id", (req, res) => {
  res.json({ message: "updating selected vehicle!" });
});

module.exports = vehicleRoute;
