/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/extensions */
import express from 'express';
import logRoutes from '../routes/log.js';
import trxsRouter from '../routes/transaction.js';
import balanceRouter from '../routes/balance.js';

const router = express.Router();

router.use('/logs', logRoutes);

router.use('/transactions', trxsRouter);

router.use('/balance', balanceRouter);

export default router;



