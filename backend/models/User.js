import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
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
    email: { type: String, unique: true, required: true},
    password: {type: String},
    role: { type: String, enum: ['user', 'admin'], default: 'user',message: '{VALUE} is not supported' },
  });

const User = mongoose.model('User', UserSchema);
