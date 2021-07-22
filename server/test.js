let test = '24';

console.log(test !== undefined ? 'Yes' : 'No');

// Add Something Here
// const statusPromise = new Promise((resolve, reject) =>
//   setTimeout(() => {
//     resolve(receipt);
//   }, 40000)
// );
// return
// statusPromise.then((data) => {
//   txReceipt = data;
//   txReceipt.payload = { fileId: strToBase32(_id) };
// });
// if (confirmationNumber === 1) {
//   // Work on Here latter
// }
// const evtResult = await contract.getPastEvents('fileStored', { fromBlock: 'latest' });

// const {
//   // N/B: Log will have log Number
//   LogStored: {
//     returnValues: { logId, fileId },
//   },
// } = events;

/**Query Builder */
// /**// With a JSON doc
// Person.
//   find({
//     occupation: /host/,
//     'name.last': 'Ghost',
//     age: { $gt: 17, $lt: 66 },
//     likes: { $in: ['vaporizing', 'talking'] }
//   }).
//   limit(10).
//   sort({ occupation: -1 }).
//   select({ name: 1, occupation: 1 }).
//   exec(callback);

// // Using query builder
// Person.
//   find({ occupation: /host/ }).
//   where('name.last').equals('Ghost').
//   where('age').gt(17).lt(66).
//   where('likes').in(['vaporizing', 'talking']).
//   limit(10).
//   sort('-occupation').
//   select('name occupation').
//   exec(callback); */

/**
 *   this.queue.push(async () => {
          console.log(`Submitting log ${index + 1} to blockchain`);
          const result = await submitLogsToBlockchain(log);
          console.log(`Finished Submitting log ${index + 1} to blockchain`);

          return result;
        });
 */

/* http://localhost/test/index.php?file="$FILE&"size="$FILESIZE&"fileId="$FILEID" */
