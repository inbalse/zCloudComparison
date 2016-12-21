'use strict';

angular.module('zvmApp.filters')
    .filter('mbToStringConvertor', function () {
        var sizeTypes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        return function (value,decimalPlace) {
            function sizeToStringConvertor(value, typeIndex, decimalPlace) {

                while (value >= 1024 && typeIndex !== sizeTypes.length - 1) {
                    value = value / 1024.0;
                    typeIndex++;
                }

                return value.toFixed(decimalPlace) + ' ' + sizeTypes[typeIndex];
            }

            return sizeToStringConvertor(Math.abs(value), 1, angular.isUndefined(decimalPlace) ? 1 : decimalPlace);
        };
    }).filter('kbToStringConvertor', function () {
        return function(value){
            if(isNaN(value))
            {
                return 0;
            }
            return (Math.abs(value) / 1024).toFixed(0);
        };
    });
