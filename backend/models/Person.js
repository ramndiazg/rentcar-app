const mongoose = require("mongoose");
const { Schema } = mongoose;

const PersonSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Phone number is required"],
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, required: true }
);

module.exports = PersonSchema;
