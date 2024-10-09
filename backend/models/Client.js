const PersonSchema = require("./Person.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    ...PersonSchema.obj,
    contact: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
