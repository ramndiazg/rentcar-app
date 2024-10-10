const User = require("../models/User.js");
const mongoose = require("mongoose");

//get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};
//get selected user
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "User not found" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ err: "User not found" });
  }
  res.status(200).json(user);
};
//create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, phone, email, password, role } = req.body;
  //adding new user to db.
  try {
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//update selected user
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "User not found" });
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//delete selected user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "User not found" });
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ err: "User not found" });
  }
  res.status(200).json({ message: "User deleted" });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
