"use strict";

function initAllLogsArray(logSources) {
  const allLogsArray = [];
  for(let i = 0; i < logSources.length; i++) {
    allLogsArray.push(logSources[i].last);
  }
  return allLogsArray;
}
function getMinIndex(allLogsArray) {
  let minIndex;
  let minValue = Infinity;
  for (let j = 0; j < allLogsArray.length; j++) {
    if(allLogsArray[j].date.getTime() < minValue) {
      minValue = allLogsArray[j].date.getTime();
      minIndex = j;
    }
  }
  return minIndex;
}
module.exports = {
  initAllLogsArray,
  getMinIndex
}
