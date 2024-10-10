const Client = require("../models/Client.js");

//get all client

//get selected client

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
};
