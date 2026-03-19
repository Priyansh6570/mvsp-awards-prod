import mongoose from 'mongoose';

const activeSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  lastSeen: { type: Date, default: Date.now },
});

// Auto-delete documents not updated in 3 minutes (TTL index)
activeSessionSchema.index({ lastSeen: 1 }, { expireAfterSeconds: 180 });

export default mongoose.models.ActiveSession || mongoose.model('ActiveSession', activeSessionSchema);