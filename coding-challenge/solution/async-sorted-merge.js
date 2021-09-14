"use strict";
const { initAllLogsArray, getMinIndex } = require('./utils');
// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  async function processLogs(allLogsArray) {
    while(allLogsArray.length > 0) {
      const minIndex = getMinIndex(allLogsArray);
      printer.print(allLogsArray[minIndex]);
      const newSourceLog = await logSources[minIndex].popAsync();
      if (newSourceLog) {
        allLogsArray[minIndex] = newSourceLog;
      } else {
        allLogsArray.splice(minIndex, 1);
        logSources.splice(minIndex, 1);
      }
    }
    return true;
  }
  return new Promise((resolve, reject) => {
    const allLogsArray = initAllLogsArray(logSources);
    processLogs(allLogsArray).then(() => {
      printer.done();
      resolve(console.log("Async sort complete."));
    })
  });
};
