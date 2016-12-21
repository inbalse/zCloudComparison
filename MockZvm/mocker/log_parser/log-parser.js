'use strict';

const _ = require('lodash');
const newLogParser = require('./new-log-parse');
const oldLogParser = require('./old-log-parse');

exports.paresLog = (log) => {
    let logItemsCollection = [],
        textToObj;

    const checkUnusedChars = (logPart) => {
        return logPart.indexOf('log start') > -1 || logPart.indexOf('log end') > -1 ||
            logPart.indexOf('-omitted-') > -1 || logPart.indexOf('Log cleared') > -1 || logPart === '';
    };

    const checkItemValidity = (textToObj) => {
        return textToObj.operation === '' || textToObj.operation.indexOf(']') === 0;
    };

    const checkIsOldLog = (log) => {
        return log.indexOf('operation') === -1 || log.indexOf('protocol') === -1;
    };

    log = checkIsOldLog(log) ? log.split(',\n') : log.split('}\n');

    _.forEach(log, function (logPart) {
        // ignore unwanted logs
        if (checkUnusedChars(logPart)) {
            return;
        }

        textToObj = checkIsOldLog(log) ? newLogParser(logPart) : oldLogParser(logPart);

        //check if item is valid
        if (checkItemValidity(textToObj)) {
            return;
        }

        logItemsCollection.push(textToObj);
    });

    return logItemsCollection;
};