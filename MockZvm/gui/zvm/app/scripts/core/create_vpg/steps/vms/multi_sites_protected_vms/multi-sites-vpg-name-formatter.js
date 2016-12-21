'use strict';

angular.module('zvmApp.filters')
    .filter('multiSitesVpgNameFormatter', function () {
        return function (row, cell, value) {
            return '<span title="' + value + '">' + value + '</span>';
        };
    });
