import express from 'express';
import apicache from 'apicache';
// eslint-disable-next-line import/extensions
import getBalance from '../controllers/Balance.js';

const cache = apicache.middleware;

const router = express.Router();

router.get('/', cache('0.7minutes'), getBalance);

export default router;
