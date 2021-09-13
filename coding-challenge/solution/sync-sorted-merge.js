"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const allLogsArray = [];
  for(let i = 0; i < logSources.length; i++) {
    allLogsArray.push(logSources[i].last);
  }
  while(allLogsArray.length > 0) {
    let minIndex = undefined;
    let minValue = Infinity;
    for (let j = 0; j < allLogsArray.length; j++) {
      if(allLogsArray[j].date.getTime() < minValue) {
        minValue = allLogsArray[j].date.getTime();
        minIndex = j;
      }
    }
    printer.print(allLogsArray[minIndex]);
    const checkNewSourceLog = logSources[minIndex].pop();
    if (checkNewSourceLog) {
      allLogsArray[minIndex] = logSources[minIndex].last;
    } else {
      allLogsArray.splice(minIndex, 1);
      logSources.splice(minIndex, 1);
    }
  }
  printer.done();
  return console.log("Sync sort complete.");
};
