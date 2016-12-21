'use strict';

angular.module('zvmApp.filters')
    .filter('convertFormatHoursToMinutes', function () {
        return function (value) {
            //HH:MM - > minutes
            if(value && value.length > 0) {
                var timeArray = value.split(':');
                var minutes = timeArray[0] * 60;
                minutes = minutes + parseInt(timeArray[1]);
                return minutes;
            }
            return 0;
        };
    });
