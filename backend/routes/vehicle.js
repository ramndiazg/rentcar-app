const express = require("express");
const vehicleRoute = express.Router();

vehicleRoute.get("/vehicle", (req, res) => {
  res.json({ message: "getting all vehicles!" });
});

vehicleRoute.get("/vehicle:id", (req, res) => {
  res.json({ message: "getting selected vehicle!" });
});

vehicleRoute.post("/vehicle", (req, res) => {
  res.json({ message: "post new vehicle!" });
});

vehicleRoute.delete("/vehicle:id", (req, res) => {
  res.json({ message: "deleting selected vehicle!" });
});

vehicleRoute.patch("/vehicle:id", (req, res) => {
  res.json({ message: "updating selected vehicle!" });
});

module.exports = vehicleRoute;
