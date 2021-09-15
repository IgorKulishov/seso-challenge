"use strict";
const { createLogsList } = require('./utils');
// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  async function processLogs(allLogsList) {
    while(allLogsList.head) {
      const logsArrayIndex = allLogsList.shift().logsArrayIndex;
      printer.print(logSources[logsArrayIndex].last);
      const newSourceLog = await logSources[logsArrayIndex].popAsync();
      if(newSourceLog) {
        allLogsList.insert(logsArrayIndex, newSourceLog.date.getTime())
      }
    }
    return true;
  }
  return new Promise((resolve, reject) => {
    const allLogsList = createLogsList(logSources);
    processLogs(allLogsList).then(() => {
      printer.done();
      resolve(console.log("Async sort complete."));
    })
  });
};
