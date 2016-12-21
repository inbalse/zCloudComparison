'use strict';

angular.module('zvmApp.filters')
    .filter('vcdVappNameFormatter', function () {
        return function (row, cell, value) {
            return value.DisplayName;
        };
    });

