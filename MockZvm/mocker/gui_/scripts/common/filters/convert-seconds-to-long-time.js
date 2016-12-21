'use strict';

angular.module('zvmApp.filters')
    .filter('convertSecondsToLongTime', function () {

        return function (value ,showSeconds) {
            //TODO add a moment plugin - Moment Duration Format.
            if(showSeconds) {
                return moment.utc(value * 1000).format('HH:mm:ss');
            }
            return moment.utc(value * 1000).format('HH:mm');
        };
    }).filter('convertSecondsToLongTimeWithText', function () {   // 4 hours 20 minutes 10 seconds
        return function (value) {
            //more the 60 hours
            var hours = Math.floor(value/3600);
            var minutes = (value % 3600) /60;
            var seconds = Math.floor(value % 60);

            var result = '';
            if(hours >0)
            {
                result = hours + ' hours ';
            }
            if(minutes > 0){
                result = result + Math.floor(minutes) + ' minutes ';
            }
            if(seconds > 0){
                result = result + seconds + ' seconds';
            }
            return result;

        };
    });
