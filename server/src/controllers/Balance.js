// eslint-disable-next-line import/extensions
import { getWalletBalance } from '../ethereum/functions.js';

export default async (req, res, next) => {
  try {
    const balance = await getWalletBalance();
    return res.status(200).json({ balance });
  } catch (error) {
    return next(error);
  }
};
