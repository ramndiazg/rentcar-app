import mongoose from 'mongoose';
const { Schema } = mongoose;

const VehicleSchema = new Schema({
    make: {type: String},
    model: {type: String},
    year: {type: Number},
    mileage: {type: Number},
    status: { type: String, enum: ['available', 'in use', 'maintenance'], default: 'maintenance' },
    comments: [{ body: String, date: Date }],
    lastServiceDate: Date
  });