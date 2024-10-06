import mongoose from 'mongoose';
const { Schema } = mongoose;

const ClientSchema = new Schema({
    name: {type: String},
    contact: {type: String},
    address: {type: String},
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
  });