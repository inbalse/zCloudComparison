'use strict';

angular.module('zvmApp.filters')
    .filter('convertMinToHoursOrDaysFilter', function ($translate) {
        return function (input) {
            if (!input) {
                return input;
            }

            var res;
            res = input / 60;
            //for hours
            if (res < 24) {
                res = res === 1 ? res + ' ' + $translate.instant('SCHEDULE_PERIOD_TYPES.HOUR') : res + ' ' + $translate.instant('SCHEDULE_PERIOD_TYPES.HOURS');
            } else { //for days
                res = res / 24;
                res = res === 1 ? res + ' ' + $translate.instant('SCHEDULE_PERIOD_TYPES.DAY') : res + ' ' + $translate.instant('SCHEDULE_PERIOD_TYPES.DAYS');
            }
            return res;

        };
    });