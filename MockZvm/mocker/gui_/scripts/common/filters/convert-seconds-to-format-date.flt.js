'use strict';

angular.module('zvmApp.filters')
    .filter('convertSecondsToFormatDate', function ($filter) {
        return function (value,format) {
            if (value < 0 || value >= 3955710) {
                return 'NA';
            }

            var date = new Date(value * 1000);

            var days = date.getUTCDate() - 1;
            var hours = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            var seconds = date.getUTCSeconds();

            var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), days, hours, minutes, seconds);
            if (days > 0) {
                hours += days * 24;
            }
            return $filter('date')(utc, format);

        };
    });
