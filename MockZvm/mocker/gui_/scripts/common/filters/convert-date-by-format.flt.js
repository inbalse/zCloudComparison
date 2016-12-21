'use strict';
angular.module('zvmApp.filters')
    .filter('convertDateByFormat', function ($filter) {
        return function (currentDate,format) {
            //check if the date is a min date value
            if (angular.isObject(currentDate) && currentDate.getFullYear() < 1970) {
                return '';
            }
            return $filter('date')(currentDate, format);
        };
    });