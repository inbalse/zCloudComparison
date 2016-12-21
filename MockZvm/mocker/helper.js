'use strict';

const _isString = require('lodash/isString');
const _includes = require('lodash/includes');
const _random = require('lodash/random');

function padZeros(value) {
    if (value.toString().length === 1) {
        return '0' + value;
    }
    return value;
}

module.exports = () => {
    return {
        isJsonStr: function (value) {
            return _isString(value) && _includes(value, '{') || _includes(value, '[')
        },
        generateCsv: function () {
            let hour = 1,
                minutes = 0,
                second = 0,
                mockCsv = 'Date,Value\n',
                range = {yAxis: 5, amount: 125};


            for (let i = 0; i < _random(100, 400); i++) {

                let yValue = parseInt(Math.random() * range.amount);

                mockCsv = mockCsv + '20150318 ' + padZeros(hour) + padZeros(minutes) + padZeros(second) + ',' + yValue + '\n';
                second = second + 5;
                if (second >= 60) {
                    second = 0;
                    minutes = minutes + 1;
                    if (minutes >= 60) {
                        minutes = 0;
                        hour = hour + 1;
                        if (hour >= 24) {
                            hour = 1;
                        }
                    }

                }
            }

            let scv = {ValuesAsCsv: mockCsv};

            return {
                IncomingIops: scv,
                VraCPUUsage: scv,
                IncomingThroughputInMBps: scv,
                OutgoingBandWidthInMBps: scv
            };
        }
    }
};