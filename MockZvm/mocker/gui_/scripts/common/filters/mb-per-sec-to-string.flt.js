'use strict';

angular.module('zvmApp.filters')
    .filter('mbPerSecToStringConvertor', function (mbToStringConvertorFilter) {
        return function (value) {
            return mbToStringConvertorFilter(value) + '/sec';
        };
    });