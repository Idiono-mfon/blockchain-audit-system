import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const logSchema = new mongoose.Schema({
  fileId: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  fileSn: {
    type: Number,
    required: true,
  },
  sN: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: ['proven', 'unproven'],
  },

  dateCreated: {
    type: Number,
    default: Date.now(),
  },
});

export default mongoose.model('Log', logSchema);
