const User = require("../models/User.js");

//get all users

//get selected user

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
};
