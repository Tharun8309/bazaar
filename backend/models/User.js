const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  userType: {type: String, required: true, enum: ['customer', 'seller']},
  cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: []}],
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: []}],
  otp: { type: String },
  otpExpiry: { type: Date }, // Set to 10 minutes from OTP generation in controller
});

module.exports = mongoose.model("User", userSchema);