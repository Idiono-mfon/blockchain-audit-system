import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  sN: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now(),
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['proven', 'unproven'],
  },
});

export default mongoose.model('File', fileSchema);
