'use strict';

angular.module('zvmApp.filters')
    .filter('propertyFormatter', function () {
        return function (propName) {
            return function (row, cell, value) {
                if (angular.isDefined(value[propName])) {
                    return value[propName];
                } else {
                    return '';
                }
            };
        };
    });