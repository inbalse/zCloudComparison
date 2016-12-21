'use strict';

angular.module('zvmApp.filters')
    .filter('propertyToEnumFormatter', function () {
        return function (className, propName) {
            return function (row, cell, value) {
                if (angular.isDefined(value[propName])) {
                    return '<div class="' + className + '-' + value[propName] + '"></div>';
                } else {
                    return '';
                }
            };
        };
    });
