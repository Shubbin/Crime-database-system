import mongoose from "mongoose";

const nextOfKinSchema = new mongoose.Schema({
  fullname: String,
  relationship: String,
  phone: String,
  address: String,
});

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
  address: { type: String, required: true },
  maritalStatus: { type: String, default: 'single' },
  nextOfKin: nextOfKinSchema,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  isEmailVerified: { type: Boolean, default: false }, // ✅ Add this
  role: { type: String, default: "user" }
});

export const User = mongoose.model("User", userSchema);
