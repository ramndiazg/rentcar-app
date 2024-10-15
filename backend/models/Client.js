const PersonSchema = require("./Person.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    ...PersonSchema.obj,
    contact: [{ relationship: String, name: String, phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Phone number is required"],
    } }],
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
