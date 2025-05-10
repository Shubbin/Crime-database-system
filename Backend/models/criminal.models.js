import mongoose from 'mongoose';

const criminalSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  crimeDetails: { type: String, required: true },
  arrestDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['arrested', 'released', 'convicted'], default: 'arrested' },
  addedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Criminal = mongoose.model('Criminal', criminalSchema);