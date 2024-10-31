const mongoose = require("mongoose");
const { Schema } = mongoose;

const RentSchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rentDays: { type: Number, required: true },
    rentAmount: { type: Number, required: true },
    rentStatus: {
      type: String,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
      message: "{VALUE} is not supported",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rent", RentSchema);
