/* eslint-disable no-console */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions
import Queue from 'queue';
import Log from '../models/Log.js';
import File from '../models/File.js';
import Reciept from '../models/Receipt.js';
import FailedJob from '../models/FailedJob.js';

import {
  submitFileToBlockchain,
  submitLogsToBlockchain,
  getFilesFromBlockchain,
  getLogsFromBlockchain,
} from '../ethereum/functions.js';

class FileQueue {
  constructor() {
    this.queue = Queue({ results: [] });
    this.index = 1;
    this.done = false; // track when the file is added successfully;
    // get notified when jobs complete
  }

  async enqueueFile({ sN: id, name, size, date, ipAddress }) {
    this.file = { id, name, size, date, ipAddress };

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

  async enqueueLog({ sN: logId, fileSn: fileId, content, dateCreated }) {
    // Use the serial Number of the file and the serial Number of the file
    // when storing to the blockchain
    this.queue.push(async () => {
      console.log(`Submitting log to blockchain`);
      try {
        const result = await submitLogsToBlockchain({ logId, fileId, content, dateCreated });
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
        const { type, status } = result;

        if (status !== false) {
          // transaction successful
          if (type === 'file') {
            const {
              data: { sN },
            } = result;
            // console.log(data);
            // Update File document status
            // Store transaction receipt
            await Reciept.create(result);

            // Update status of the file
            await File.findOneAndUpdate({ sN }, { status: 'proven' });

            this.queue.start(); // Start the queue to send all blogs blockchain too
          } else {
            const {
              data: { sN, fileSn },
            } = result;
            // console.log(result);
            // Create receipt
            await Reciept.create(result);
            // Update status of the Log
            await Log.findOneAndUpdate({ sN, fileSn }, { status: 'proven' });
            // Store transaction receipt
          }
        } else {
          // Error occured
          // persist Error in database also
          const { payload: data, message } = result;

          await FailedJob.create({ type, status, data, message });
          // FailedJob
        }
      } catch (error) {
        console.log('The Error Unhandled Occured...Please take note');
        console.log(error);
      }
    });
    // });

    // // // Executed on the failure of a particular job
    // this.queue.on('error', (error, job) => {
    //   console.log(error);
    //   // console.log('I am in the error queue');
    //   // console.log('Error receIpt for failed transactions');
    //   // console.log(error);
    // });

    // // Exceuted at the end of the queue
    this.queue.on('end', (result, job) => {
      this.done = true;
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
  // console.log(req.body);
  // return res.status(200).json({ status: 'ok received' });
  try {
    if (Array.isArray(content)) {
      // initial receival of entire log's file content
      console.log(content);

      const { fileId, fileName, fileSize, ipAddress } = metaData;

      const file = await File.create({
        name: fileName,
        sN: parseInt(fileId, 10),
        size: fileSize,
        ipAddress,
        status: 'unproven',
      });

      const { _id: id } = file;

      const logs = content.map((value, index) => ({
        fileId: id,
        content: value,
        sN: index + 1,
        fileSn: parseInt(fileId, 10),
        status: 'unproven',
        dateCreated: Date.now(),
      }));

      await Log.insertMany(logs);

      await fileQueue.enqueueFile(file);

      // Submit file to Blockchain
      await fileQueue.startQueue();

      await fileQueue.enqueueLogs(logs);

      console.log(fileQueue.getQueueLength());
      // fileQueue.startQueue();
      return res.status(201).json({ status: 'ok', msg: 'log file submited' });
    }
    // Subsequent submission of each log file
    const { fileId, lineNumber } = metaData;
    // Retrieve file Id by filename;
    const { _id } = await File.findOne({ sN: fileId, status: 'proven' }).select('_id');
    // Retrieve the serial Number of the last log record tied to the file

    const currentLog = await Log.create({
      fileId: _id,
      status: 'unproven',
      content,
      sN: parseInt(lineNumber, 10),
      fileSn: parseInt(fileId, 10),
    });

    if (currentLog) {
      // Queue record to forward to blockhain
      await fileQueue.enqueueLog(currentLog);
    }
    // // start the Queue
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
    console.log(`I am here, error is ${error.message}`);
    next(error);
  }
};
