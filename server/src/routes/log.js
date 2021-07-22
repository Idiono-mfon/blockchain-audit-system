/* eslint-disable import/extensions */
import express from 'express';
import apicache from 'apicache';
import { insertLogs, getAllLogs } from '../controllers/Log.js';
import parser from '../middlewares/parser.js';

const cache = apicache.middleware;

const router = express.Router();

router.post('/', parser, insertLogs);
router.get('/', cache('0.7 minutes'), getAllLogs);

export default router;
