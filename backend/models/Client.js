import mongoose from 'mongoose';
const { Schema } = mongoose;

const ClientSchema = new Schema({
    name: {type: String, required: true},
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    contact: {type: String, required: true},
    address: {type: String, required: true},
    email: { type: String, unique: true, format: 'email', required: true},
    createdAt: { type: Date, default: Date.now , required: true}
  });

const Client = mongoose.model('Client', ClientSchema);
