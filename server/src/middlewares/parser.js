/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import File from '../models/File.js';

export default async (req, res, next) => {
  if (req.body) {
    const { file: fileName, fileId, size, single, lineNumber } = req.query;

    if (parseInt(single, 10) === 0) {
      // Check if file exist and batch logs were submitted already
      const file = await File.findOne({ sN: fileId, status: 'proven' });
      if (file) {
        // file forwarded already.
        // Don't handle batch processing again
        // Just listen to subsequent files logs forwarded
        return res.status(200).json({ status: 'ok', msg: 'record Added' });
      }
      // Continue with the processing; file doesn't exist
      // Initial Stage of Submitting Multiple Logs
      const metaData = {
        fileName,
        fileId,
        fileSize: `${size / 1000}kb`,
        ipAddress: req._remoteAddress,
      };
      // Remove empty string at the end
      const cleanStr = req.body.slice(0, req.body.length - 1);

      const content = cleanStr.split('\n');
      req.body = { content, metaData };
      return next();
    }

    const metaData = { fileId, lineNumber: parseInt(lineNumber, 10) + 1 };

    const result = req.body.slice(0, req.body.length - 2);

    const content = result.slice(13);

    req.body = { metaData, content };
    return next();
    // }
    //  Payload is a string
  }
  const error = new Error(`No data recieved.`);
  return next(error);
};
