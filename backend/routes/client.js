const express = require("express");
const {
   createClient,
   getClientsClients,
   getClients
   } = require("../controllers/clientController.js");
const clientRoute = express.Router();

clientRoute.get("/client", getClients);

clientRoute.get("/client:id", (req, res) => {
  res.json({ message: "getting selected client!" });
});

clientRoute.post("/client", createClient);

clientRoute.delete("/client:id", (req, res) => {
  res.json({ message: "deleting selected client!" });
});

clientRoute.patch("/client:id", (req, res) => {
  res.json({ message: "updating selected client!" });
});

module.exports = clientRoute;
