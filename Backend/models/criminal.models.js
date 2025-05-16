import mongoose from 'mongoose';

const criminalSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  crimeDetails: { type: String, required: true },
  arrestDate: { type: Date, required: true },
  status: { type: String, enum: ['In Custody', 'Released'], required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastUpdatedBy: {
    name: { type: String },
    badgeNumber: { type: String, default: null }
  }
}, { timestamps: true });

export const Criminal = mongoose.model('Criminal', criminalSchema);
