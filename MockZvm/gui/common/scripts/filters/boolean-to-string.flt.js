'use strict';

angular.module('zvmApp.filters')
    .filter('booleanToString', function ($translate) {
        return function (value) {
            return value ? $translate.instant('YES') : $translate.instant('NO');
        };
    });