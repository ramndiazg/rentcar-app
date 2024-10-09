const express = require("express");
const Client = require("../models/Client.js");
const clientRoute = express.Router();

clientRoute.get("/client", (req, res) => {
  res.json({ message: "getting all clients!" });
});

clientRoute.get("/client:id", (req, res) => {
  res.json({ message: "getting selected client!" });
});

clientRoute.post("/client", async (req, res) => {
  const { name, phone, email, password, contact, address } = req.body;
  try {
    const client = await Client.create({
      name,
      phone,
      email,
      password,
      contact,
      address,
    });
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

clientRoute.delete("/client:id", (req, res) => {
  res.json({ message: "deleting selected client!" });
});

clientRoute.patch("/client:id", (req, res) => {
  res.json({ message: "updating selected client!" });
});

module.exports = clientRoute;
