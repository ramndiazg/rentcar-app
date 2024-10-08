const express = require("express");
const {
  createVehicle,
  getVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle,
} = require("../controllers/vehicleController.js");
const vehicleRoute = express.Router();

vehicleRoute.get("/vehicle", getVehicles);

vehicleRoute.get("/vehicle/:id", getVehicle);

vehicleRoute.post("/vehicle", createVehicle);

vehicleRoute.delete("/vehicle/:id", deleteVehicle);

vehicleRoute.patch("/vehicle/:id", updateVehicle);

module.exports = vehicleRoute;
