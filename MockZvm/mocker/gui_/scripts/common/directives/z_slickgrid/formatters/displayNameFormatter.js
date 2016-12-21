'use strict';

angular.module('zvmApp.filters')
    .filter('displayNameFormatter', function () {
        return function (row, cell, value) {
            return value ? value.DisplayName : '';
        };
    });