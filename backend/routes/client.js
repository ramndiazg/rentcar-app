const express = require("express");
const {
  createClient,
  getClient,
  getClients,
  deleteClient,
  updateClient,
} = require("../controllers/clientController.js");
const clientRoute = express.Router();

clientRoute.get("/client", getClients);

clientRoute.get("/client/:id", getClient);

clientRoute.post("/client", createClient);

clientRoute.delete("/client/:id", deleteClient);

clientRoute.patch("/client/:id", updateClient);

module.exports = clientRoute;
