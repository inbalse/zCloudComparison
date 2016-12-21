'use strict';

angular.module('zvmApp.filters')
    .filter('convertSecToMinutesFilter', function () {
        return function (input, interval) {
            var res;
            if (interval === 'hour') {
                res = input / 60;
                if (res >= 1 && res > 10) {
                    return '0' + res + ' h';
                }
                return res + ' h';
            } else if (interval === 'minute') {
                res = input % 60;
                if (res >= 1 && res > 10) {
                    return '0' + res + ' min';
                }
                return res + ' min';
            }
        };
    });