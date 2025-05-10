import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  maritalStatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed'], required: true },
  nextOfKin: {
    fullname: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);