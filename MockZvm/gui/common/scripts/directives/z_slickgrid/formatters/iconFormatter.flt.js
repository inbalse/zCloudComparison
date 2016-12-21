'use strict';

angular.module('zvmApp.filters')
    .filter('iconFormatter', function () {
        return function (row, cell, value) {
            return '<span class="' + value + '"></span>';
        };
    });
