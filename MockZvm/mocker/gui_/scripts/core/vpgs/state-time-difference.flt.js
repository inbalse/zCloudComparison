'use strict';
angular.module('zvmApp.filters')
    .filter('stateTimeDifference', function (millisInA) {
        return function (timeLeft) {
            // var dateTime = new Date();
            // dateTime.setUTCMilliseconds((timeLeft) * 1000);
            // var now = new Date();
            // var distance = dateTime - now;
            timeLeft = timeLeft * 1000;
            var days = Math.floor(timeLeft / millisInA.DAYS);
            var hours = Math.floor((timeLeft % millisInA.DAYS) / millisInA.HOURS);
            var minutes = Math.floor((timeLeft % millisInA.HOURS) / millisInA.MINUTES);
            var seconds = Math.floor((timeLeft % millisInA.MINUTES) / millisInA.SECONDS);

            return createTime(days, hours, minutes, seconds);
        };


        function createTime(days, hours, minutes, seconds) {
            var time = '';

            if (days === 1) {
                time = '1 day';
            } else if (days > 0) {
                time = days + ' days';
            }
            if (hours > 0) {
                if (days > 0) {
                    time += ', ';
                }
                if (hours === 1) {
                    time += '1 hour';
                } else {
                    time += hours + ' hours';
                }
            }
            if (minutes > 0) {
                if (time.length) {
                    time += ', ';
                }
                if (minutes === 1) {
                    time += '1 minute';
                } else {
                    time += minutes + ' minutes';
                }
            }
            if (seconds > 0) {
                if (time.length) {
                    time += ', ';
                }
                if (seconds === 1) {
                    time += '1 second';
                } else {
                    time += seconds + ' seconds';
                }
            }
            return time;
        }
    });
