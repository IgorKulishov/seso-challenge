"use strict";
const { createLogsList } = require('./utils');

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const allLogsList = createLogsList(logSources);
  while(allLogsList.head) {
    const logsArrayIndex = allLogsList.shift().logsArrayIndex;
    printer.print(logSources[logsArrayIndex].last);
    const newSourceLog = logSources[logsArrayIndex].pop();
    if(newSourceLog) {
      allLogsList.insert(logsArrayIndex, newSourceLog.date.getTime())
    }
  }
  printer.done();
  return console.log("Sync sort complete.");
};
