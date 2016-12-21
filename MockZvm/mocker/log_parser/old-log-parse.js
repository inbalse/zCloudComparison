'use strict';

const oldLogParser = (logPart) => {

    let mapItem = {}, content;

    if (logPart.indexOf('REST-API') === -1) {
        if (logPart.indexOf('calling:') !== -1) {
            mapItem.operation = logPart.substring(logPart.indexOf('calling:') + 9, logPart.indexOf('":'));
            mapItem.type = 'Request'
        } else {
            mapItem.operation = logPart.substring(logPart.indexOf('Z') + 2, logPart.indexOf('res:') - 1);
            mapItem.type = 'Response'
        }

        content = logPart.substring(logPart.indexOf('":') + 3, logPart.length + 1);

        mapItem.date = logPart.substring(1, logPart.indexOf('Z') + 1);
        mapItem.content = content === '""' ? 'Empty' : content;
        mapItem.protocol = 'VQ';

    } else {
        if (logPart.indexOf('request') !== -1) {
            mapItem.operation = logPart.substring(logPart.indexOf('url') + 6, logPart.indexOf('headers') - 3);
            mapItem.type = 'Request'
        } else {
            mapItem.operation = 'Unknown';
            mapItem.type = 'Response'
        }

        content = logPart.substring(logPart.indexOf('======>') + 9, logPart.length);

        mapItem.date = 'Unknown';
        mapItem.content = content === '' ? 'Empty' : content;
        mapItem.protocol = 'REST API';
    }

    return mapItem;
};

module.exports = oldLogParser;