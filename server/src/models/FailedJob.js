import mongoose from 'mongoose';

const failedLogSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  data: {
    fileSn: { type: Number, default: null },
    logSn: { type: Number, default: null },
  },

  state: {
    type: Boolean,
    default: false,
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('FailedJob', failedLogSchema);
