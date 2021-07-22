import mongoose from 'mongoose';

const ReceiptSchema = new mongoose.Schema({
  txHash: {
    type: String,
    required: true,
  },
  txIndex: {
    type: Number,
    required: true,
  },
  blockNum: {
    type: String,
    required: true,
  },

  blockHash: {
    type: String,
    required: true,
  },
  gasUsed: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ['file', 'log'],
  },

  cumulativeGasUsed: {
    type: Number,
    required: true,
  },

  txStatus: {
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
});

export default mongoose.model('Receipt', ReceiptSchema);
