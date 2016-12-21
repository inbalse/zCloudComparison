'use strict';

const fs = require('fs');
const hash = require('./hash');
const log = require('../log_parser/log-parser');
const _each = require('lodash/each');
const helper = require('../helper')();

const iZertoMocks = require('../mock_DB/i_zerto_static_mocks/mocks-export')();

//---------- MOCK VARIABLES -------------------------//
let staticObj = {},
    staticFolderRoot = '/mock_DB/static_mocks',
    dynamicFilesName = [],
    dynamicFolderRoot = './mock_DB/dynamic_mocks';

//require all statics files from folder
fs.readdirSync(`.${staticFolderRoot}`).forEach(function (file) {
    let key = file.substring(0, file.length - 8);
    staticObj[key] = require(`..${staticFolderRoot}/${file}`);
});

fs.readdirSync(dynamicFolderRoot).forEach(function (file) {
    dynamicFilesName.push(file);
});

//------------------------------------------------//

let addLogItemsToMock = function (logItems) {
    _each(logItems, function (logItem) {
        if (logItem.type === 'Response' && logItem.content !== '' && logItem.content !== 'Empty') {

            if (logItem.operation === 'GetSummaryScreenInformation') {
                if (helper.isJsonStr(logItem.content)) {
                    logItem.content = JSON.parse(logItem.content);
                }

                logItem.content.Graphs = helper.generateCsv();
            }

            hash.addDynamicMock(logItem.operation, logItem.content)
        }
    });
};

let load = {
    iZertoWeb: function () {
        _each(iZertoMocks[0], function (value, key) {
            hash.addMock(key, value);
        });
    },

    dynamic: function () {
        let filePath, logItems;

        if (dynamicFilesName.length) {
            _each(dynamicFilesName, function (fileName) {
                filePath = `${dynamicFolderRoot}/${fileName}`;

                fs.readFile(filePath, 'utf8', function (err, text) {
                    if (err) throw err;
                    logItems = log.paresLog(text);
                    addLogItemsToMock(logItems);
                });
            });
        }
    },
    static: function () {
        _each(staticObj, function (value, key) {
            if (key === 'RestApi') {
                let apiLogItems = value();

                _each(apiLogItems, function (rl) {
                    let key = Object.keys(rl)[0],
                        data = rl[key];

                    hash.addMock(key, data);
                });

                return;
            }

            hash.addMock(key, value());
        });
    }
};

module.exports = load;