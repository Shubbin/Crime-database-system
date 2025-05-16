import mongoose from 'mongoose';

const policeSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  profilePic:{ type: String, required:true},
  maritalStatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed'], required: true },
  nextOfKin: {
    fullname: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  badgeNumber: { type: String, default: null, unique: true, sparse: true },
  rank: { type: String, default: 'officer' },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'police' },
  createdAt: { type: Date, default: Date.now },
});

export const Police = mongoose.model('Police', policeSchema);