const User = require("../models/User.js");

//get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};
//get selected user
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ err: "User not found" });
  }
  res.status(200).json(user);
};
//create a new user
const createUser = async (req, res) => {
  const { name, phone, email, password, role } = req.body;
  //adding new user to db.
  try {
    const user = await User.create({ name, phone, email, password, role });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//update selected user

//delete selected user

module.exports = {
  createUser,
  getUsers,
  getUser,
};
