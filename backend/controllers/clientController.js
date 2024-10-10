const Client = require("../models/Client.js");

//get all client
const getClients = async (req, res) => {
  const clients = await Client.find({}).sort({ createdAt: -1 });
  res.status(200).json(clients);
};
//get selected client
const getClient = async (req, res) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  if (!client) {
    return res.status(404).json({ err: "Client not found" });
  }
  res.status(200).json(client);
};
//create a new client
const createClient = async (req, res) => {
  const { name, phone, email, password, address, contact } = req.body;
  //adding new client to db.
  try {
    const client = await Client.create({
      name,
      phone,
      email,
      password,
      address,
      contact,
    });
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//update selected client

//delete selected client

module.exports = {
  createClient,
  getClients,
  getClient,
};
