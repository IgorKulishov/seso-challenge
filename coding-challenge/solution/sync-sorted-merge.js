"use strict";
const { initAllLogsArray, getMinIndex } = require('./utils');
// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const allLogsArray = initAllLogsArray(logSources);
  while(allLogsArray.length > 0) {
    const minIndex = getMinIndex(allLogsArray);
    printer.print(allLogsArray[minIndex]);
    const newSourceLog = logSources[minIndex].pop();
    if (newSourceLog) {
      allLogsArray[minIndex] = logSources[minIndex].last;
    } else {
      allLogsArray.splice(minIndex, 1);
      logSources.splice(minIndex, 1);
    }
  }
  printer.done();
  return console.log("Sync sort complete.");
};
