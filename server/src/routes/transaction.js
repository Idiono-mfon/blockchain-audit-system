import express from 'express';
import apicache from 'apicache';

// eslint-disable-next-line import/extensions
import { getTransactions } from '../controllers/Transaction.js';

const cache = apicache.middleware;

const router = express.Router();

router.get('/', cache('0.7 minutes'), getTransactions);

export default router;
