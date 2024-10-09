const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const ClientSchema = extendSchema(
  UserSchema,
  {
    contact: { type: String, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["in_process", "rented", "none", "bloqued"],
      default: "none",
      required: true,
    },
  },
  { Timestamp: true }
);

module.exports = mongoose.model("Client", ClientSchema);
