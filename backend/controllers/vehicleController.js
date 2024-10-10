const Vehicle = require("../models/Vehicle.js");

//get all vehicles
const getVehicles = async (req, res) =>{
    const vehicles = await Vehicle.find({}).sort({createdAt: -1})
    res.status(200).json(vehicles)
};
//get selected vehicle

//create a new vehicle
const createVehicle = async (req, res) => {
  const {
    make,
    model,
    color,
    year,
    chassis,
    register,
    mileage,
    imageUrl,
    status,
    comments,
  } = req.body;
  //adding new vehicle to db.
  try {
    const vehicle = await Vehicle.create({
      make,
      model,
      color,
      year,
      chassis,
      register,
      mileage,
      imageUrl,
      status,
      comments,
    });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//update selected vehicle

//delete selected vehicle

module.exports = {
  createVehicle,
  getVehicles
};
