const Person = require("../models/Person.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//login
const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    if (email === "admin" && password === "123") {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
