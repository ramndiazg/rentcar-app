const PersonSchema = require("./Person.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    ...PersonSchema.obj,
    contact: [{ relationship: String, name: String, phone: String }],
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
