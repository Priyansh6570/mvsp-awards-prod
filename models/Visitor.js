import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // "2026-03-19"
  count: { type: Number, default: 0 },
  peakConcurrent: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);