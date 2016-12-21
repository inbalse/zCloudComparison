'use strict';

angular.module('zvmApp.filters')
    .filter('convertFormatSecondsFilter', function ($filter) {
        return function (value) {
            if (value < 0 || value >= 3955710) {
                return 'NA';
            }

            var time;
            var date = new Date(value * 1000);

            var days = date.getUTCDate() - 1;
            var hours = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            var seconds = date.getUTCSeconds();

            var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), days, hours, minutes, seconds);
            if (days > 0) {
                hours += days * 24;
            }

            if (hours > 0 && minutes >= 0 && seconds >= 0) {
                if (minutes > 0 && seconds > 0) {
                    time = $filter('date')(utc, 'HH:mm:ss');
                } else if (minutes > 0) {
                    time = $filter('date')(utc, 'HH:mm');
                } else {
                    time = $filter('date')(utc, 'H');
                }

                return time + ' hours';
            } else if (minutes > 0 && seconds >= 0) {
                if (seconds > 0) {
                    time = $filter('date')(utc, 'mm:ss');
                } else {
                    time = $filter('date')(utc, 'm');
                }

                return time + ' min';
            } else if (seconds > 0) {
                time = $filter('date')(utc, 's');
                return time + ' sec';
            }
        };
    });
