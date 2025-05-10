import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

export const Admin = mongoose.model('Admin', adminSchema);