"use strict";
const { LogsList } = require('./list.class');
function createLogsList(logSources) {
  const logsList = new LogsList();
  for(let i = 0; i < logSources.length; i++) {
    logsList.insert(i, logSources[i].last.date.getTime());
  }
  return logsList;
}
module.exports = {
  createLogsList
}
