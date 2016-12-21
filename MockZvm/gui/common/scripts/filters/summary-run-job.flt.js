'use strict';

angular.module('zvmApp.filters')
    .filter('summaryRunJobFilter', function ($translate) {
        function helper(value) {
            value = Math.floor(value);
            if (value < 10) {
                value = '0' + value;
            }
            return value;
        }

        return function (obj) {
            var result = '';
            if (!obj) {
                return undefined;

            }
            var schedule = obj.SchedulePeriodType,
                timeOfDay = obj.RunningTimeOfDayInMinutes,
                day = obj.DayOfWeek;

            if (obj.hasOwnProperty('SchedulePeriodType')) {
                result = $translate.instant('ENUM.SCHEDULE_PERIOD_TYPE.' + schedule);
            }
            if (obj.hasOwnProperty('DayOfWeek') && schedule !== 0) {
                result += ', ' + $translate.instant('ENUM.DAYS.' + day);
            }
            if (obj.hasOwnProperty('RunningTimeOfDayInMinutes')) {
                result += ' ' + $translate.instant('AT') + ' ' + helper(timeOfDay / 60) + ':' + helper(timeOfDay % 60);
            }
            return result;

        };
    });
