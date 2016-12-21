'use strict';

angular.module('zvmApp.filters')
    .filter('repositoryTypeConvertor', function ($translate) {
        return function (value) {
            var enumKey = 'ENUM.REPOSITORY_TYPE.'+value;
            return $translate.instant(enumKey);
        };
    });