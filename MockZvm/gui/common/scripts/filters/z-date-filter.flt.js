'use strict';

angular.module('zvmApp.filters')
    .filter('zDateFilter', function ($filter) {
        var defaultDateFilter = $filter('date');
        return function (dateToFormat, format) {
            //.NET json Date cleanup
            if (angular.isString(dateToFormat)) {
                dateToFormat = dateToFormat.replace('/Date(', '');
                dateToFormat = dateToFormat.replace(')/', '');
            }


            return defaultDateFilter(dateToFormat, (format ? format : 'MMM d, y HH:mm:ss'));
        };
    });

