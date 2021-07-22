/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions
import Queue from 'queue';
import Log from '../models/Log.js';
import File from '../models/File.js';
import Reciept from '../models/Receipt.js';

import {
  submitFileToBlockchain,
  submitLogsToBlockchain,
  base32ToStr,
  getFilesFromBlockchain,
  getLogsFromBlockchain,
} from '../ethereum/functions.js';

class FileQueue {
  constructor() {
    this.queue = Queue({ autostart: true, results: [] });
    this.index = 1;
    // get notified when jobs complete
  }

  async enqueueFile({ _id, name, size, date, ipAddress }) {
    this.file = { _id, name, size, date, ipAddress };

    this.queue.push(async () => {
      try {
        console.log(`Submitting file to blockchain`);
        const result = await submitFileToBlockchain(this.file);
        if (result) {
          console.log(`Finished submitting file to blockchain`);
          return result;
        }
      } catch (error) {
        console.log(error);
      }
    });
    return this.queue;
  }

  async enqueueLog(log) {
    this.log = log;
    this.queue.push(async () => {
      console.log(`Submitting log to blockchain`);
      try {
        const result = await submitLogsToBlockchain(this.log);
        if (result) {
          console.log(`Finished Submitting log to blockchain`);
          return result;
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async enqueueLogs(logs) {
    // Add something here after modifying the smart contract
    // TODO: Add serial Nos
    logs.forEach(async (log) => {
      this.enqueueLog(log);
    });
  }

  getQueueLength() {
    return this.queue.length;
  }

  async startQueue() {
    this.queue.start(); // Start Queue

    console.log('Job execution begins......');
    // Executed when a particular job is done
    this.queue.on('success', async (result, job) => {
      // console.log(result);
      // Transactions exist here. Proceed to database
      try {
        console.log(`recording transaction receipt on Database....`);
        const { type } = result;
        if (type === 'file') {
          const {
            data: { fileId },
          } = result;
          // console.log(data);
          // Update File document status
          // Store transaction receipt
          await Reciept.create(result);

          // Update status of the file
          await File.findOneAndUpdate({ _id: fileId }, { status: 'proven' });
        } else {
          const {
            data: { logId, logSnNum },
          } = result;

          // Create receipt
          await Reciept.create(result);

          // Update status of the Log
          await Log.findOneAndUpdate({ _id: logId, sN: logSnNum }, { status: 'proven' });
          // Store transaction receipt
        }
      } catch (error) {
        console.log(error);
      }
    });
    // });

    // Executed on the failure of a particular job
    this.queue.on('error', (error, job) => {
      console.log(error);
      console.log('I am in the error queue');
      console.log('Error receIpt for failed transactions');
      // console.log(error);
    });

    // // Exceuted at the end of the queue
    this.queue.on('end', (result, job) => {
      console.log('Finished Processing all jobs in the queue');
    });
  }

  getLastestJob() {
    return this.queue.pop().toString().replace(/\n/g, '');
  }

  getEarliestJob() {
    return this.queue.shift().toString().replace(/\n/g, '');
  }
}

export const insertLogs = async (req, res, next) => {
  const fileQueue = new FileQueue();
  const { content, metaData } = req.body;

  try {
    if (Array.isArray(content)) {
      // initial recieval of entire log's file content
      const { fileId, fileName, fileSize, dateRead, ipAddress } = metaData;
      const file = await File.create({
        name: fileName,
        sN: parseInt(fileId, 10),
        size: fileSize,
        date: dateRead,
        ipAddress,
        status: 'unproven',
      });

      const { _id: id } = file;

      const logs = content.map((value, index) => ({
        fileId: id,
        content: value,
        sN: index + 1,
        status: 'unproven',
      }));

      await Log.insertMany(logs);

      await fileQueue.enqueueFile(file);

      // Submit file to Blockchain
      await fileQueue.startQueue();

      // retrieve all logs uproven logs tied and add to queue
      const unprovenLogs = await Log.find({ fileId: id, status: 'unproven' }).select([
        '_id',
        'fileId',
        'sN',
        'content',
      ]);

      if (unprovenLogs) {
        await fileQueue.enqueueLogs(unprovenLogs);
      }

      console.log(fileQueue.getQueueLength());
      // fileQueue.startQueue();
      return res.status(201).json({ status: 'ok', msg: 'log file submited' });
    }
    // Subsequent submission of each log file
    const { fileId } = metaData;
    // Retrieve file Id by filename;
    const { _id } = await File.findOne({ sN: fileId, status: 'proven' }).select('_id');
    // Retrieve the serial Number of the last log record tied to the file
    const { sN } = await Log.findOne({ fileId: _id, status: 'proven' })
      .sort({ sN: -1 })
      .select('sN');

    const currentLog = await Log.create({
      fileId: _id,
      status: 'unproven',
      content,
      sN: parseInt(sN + 1, 10),
    });

    if (currentLog) {
      // Queue record to forward to blokchain
      await fileQueue.enqueueLog(currentLog);
    }

    // start the Queue
    fileQueue.startQueue();

    return res.status(201).json({ status: 'ok', msg: 'record Added' });
  } catch (error) {
    next(error);
  }
};

export const getAllLogs = async (req, res, next) => {
  try {
    const files = await getFilesFromBlockchain();
    if (files) {
      const retrieveLogs = await getLogsFromBlockchain(files);
      if (retrieveLogs) {
        return res.status(200).json(retrieveLogs);
      }
    }
  } catch (error) {
    next(error);
  }
};
