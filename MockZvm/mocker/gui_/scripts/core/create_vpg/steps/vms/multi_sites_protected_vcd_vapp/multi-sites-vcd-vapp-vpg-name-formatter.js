'use strict';

angular.module('zvmApp.filters')
    .filter('multiSitesVcdVappVpgNameFormatter', function () {
        return function (row, cell, value) {
            return '<span title="' + value + '">' + value + '</span>';
        };
    });
