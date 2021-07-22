/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/no-useless-path-segments
// eslint-disable-next-line import/extensions
import web3 from '../ethereum/web3.js';
// eslint-disable-next-line import/extensions
import createContract from './CBNcontract.js';

// eslint-disable-next-line import/extensions
// import { ADDRESS } from '../ethereum/secret.js';

export const strToBase32 = (string) => web3.utils.asciiToHex(string);

export const removeNonAscii = (str) => {
  if (str === null || str === '') return false;
  // eslint-disable-next-line no-param-reassign
  str = str.toString();
  return str.replace(/[^\x20-\x7E]/g, '');
};

export const base32ToStr = (base32) => removeNonAscii(web3.utils.hexToString(base32));

const bytesToString = (bytes) => web3.utils.toAscii(bytes);

// const decryptContentToStr = (contents) => {
//   const decryptedContent = [];
//   contents.forEach((byte) => {
//     decryptedContent.push(bytesToString(byte));
//   });
//   return decryptedContent;
// };

const contract = createContract();

const extractTxReceipt = (receipt, type, error) => {
  if (!error) {
    const {
      transactionHash,
      transactionIndex,
      blockHash,
      blockNumber,
      gasUsed,
      status,
      cumulativeGasUsed,
      payload,
      message,
    } = receipt;

    const txtDoc = {
      txHash: transactionHash,
      txIndex: transactionIndex,
      blockHash,
      blockNum: blockNumber,
      gasUsed,
      type,
      dateCreated: Date.now(),
      txStatus: 'success',
      cumulativeGasUsed,
    };

    if (type === 'file') {
      // const { fileStored } = events;
      // const { Result } = fileStored;
      const { id: sN } = payload;

      // Enter File Transaction Reciept
      return {
        ...txtDoc,
        message:
          status && message === undefined ? 'File stored successfully in Blockchain' : message,
        data: { sN },
      };
    }

    if (type === 'log') {
      const { logId: sN, fileId: fileSn } = payload;

      return {
        ...txtDoc,
        message:
          status && message === undefined ? 'Log stored successfully in Blockchain' : message,
        data: { sN, fileSn },
      };
    }
  }

  // Error occurred
  return receipt;
};

export const submitFileToBlockchain = async ({ id, name, size, date, ipAddress }) => {
  const accounts = await web3.eth.getAccounts();

  let txrReceipt = {};
  let txrError = {};
  try {
    const gas = await contract.methods
      .setFile(parseInt(id, 10), strToBase32(name), strToBase32(size), date, strToBase32(ipAddress))
      .estimateGas();

    await contract.methods
      .setFile(parseInt(id, 10), strToBase32(name), strToBase32(size), date, strToBase32(ipAddress))
      .send({
        from: accounts[0],
        gas,
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        txrReceipt = receipt;
      })
      .on('error', (error, receipt) => {
        txrError = receipt;
        if (error) {
          console.log('1. I am here in the error');
          throw error;
        }
      }); // If there's an out of gas error the second parameter is the receipt.
    txrReceipt.payload = { id };

    return extractTxReceipt(txrReceipt, 'file', false);

    // return txReceipt
  } catch (err) {
    return extractTxReceipt(
      { ...txrError, payload: { filesN: id }, status: false, message: err.message, type: 'file' },
      'file',
      true
    );
    // console.log(error);
  }
};

export const submitLogsToBlockchain = async ({ logId, fileId, content, dateCreated }) => {
  let txrReceipt = {};
  let txrError = {};
  const accounts = await web3.eth.getAccounts();
  try {
    const gas = await contract.methods
      .setLogs(
        parseInt(logId, 10),
        parseInt(fileId, 10),
        strToBase32(content),
        parseInt(dateCreated, 10)
      )
      .estimateGas();
    await contract.methods
      .setLogs(
        parseInt(logId, 10),
        parseInt(fileId, 10),
        strToBase32(content),
        parseInt(dateCreated, 10)
      )
      .send({
        from: accounts[0],
        gas,
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        txrReceipt = receipt;
      })
      .on('error', (error, receipt) => {
        txrError = receipt;
        if (error) {
          console.log('I am here in the log part');
          throw error;
        }
      });

    txrReceipt.payload = { logId, fileId };

    return extractTxReceipt(txrReceipt, 'log', false);
  } catch (err) {
    return extractTxReceipt(
      {
        ...txrError,
        payload: { filesN: fileId, logSn: logId },
        status: false,
        message: err.message,
        type: 'log',
      },
      'file',
      true
    );
  }
};

export const getFilesFromBlockchain = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const {
      0: fId,
      1: fName,
      2: fSize,
      3: fDate,
      4: fIpAddress,
      5: fLogCount,
    } = await contract.methods.getFiles().call();

    return {
      fId,
      fName,
      fSize,
      fDate,
      fIpAddress,
      fLogCount,
    };
  } catch (error) {
    throw error;
  }
};

const getLogFromBlockchain = async (fileId) => {
  const contents = [];

  const { 0: logIds, 1: logDates } = await contract.methods.getLogData(parseInt(fileId, 10)).call();

  if (logIds) {
    await Promise.allSettled(
      logIds.map(async (logId, index) => {
        const content = await contract.methods.getLogs(fileId, logId).call();
        contents.push({ logId, content: bytesToString(content), dateCreated: logDates[index] });
      })
    );

    return contents;
  }
};

export const getLogsFromBlockchain = async ({
  fId,
  fLogCount,
  fName,
  fSize,
  fIpAddress,
  fDate,
}) => {
  const logs = [];
  try {
    await Promise.allSettled(
      fId.map(async (fileId, index) => {
        const contents = await getLogFromBlockchain(fileId);
        logs.push({
          content: contents,
          file: {
            fileId: fId[index],
            fileName: base32ToStr(fName[index]),
            size: base32ToStr(fSize[index]),
            ipAddress: base32ToStr(fIpAddress[index]),
            date: fDate[index],
            totalLogs: fLogCount[index],
          },
        });
      })
    );
    return logs;
  } catch (error) {
    console.log(error);
  }
};

export const getWalletBalance = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const balanceInDecimal = web3.utils.fromWei(balance, 'ether');
    return parseFloat(balanceInDecimal).toFixed(4);
  } catch (error) {
    throw error;
  }
};
