// models/auditLog.models.js
import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },         // e.g. "DELETE_USER"
  description: { type: String },                    // Optional details
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['admin', 'police', 'user'], required: true },
  timestamp: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
// In your controller where you handle the delete user action