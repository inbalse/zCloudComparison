'use strict';

angular.module('zvmApp.filters')
    .filter('enumConvertor', function ($translate) {
        return function (enumPrefix, enumValue) {
            return $translate.instant('ENUM.' + enumPrefix + '.' + enumValue);
        };
    });