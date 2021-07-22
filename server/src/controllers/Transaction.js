// eslint-disable-next-line import/extensions
import Receipt from '../models/Receipt.js';

// eslint-disable-next-line import/prefer-default-export
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Receipt.find();
    return res.status(200).json(transactions);
  } catch (error) {
    return next(error);
  }
};
