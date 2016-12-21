'use strict';
angular.module('zvmApp.filters')
    .filter('nicsMacaddressFormatter', function () {
        return  function (row, cell, value) {

            return value === '' ? 'Reset' : value;
        };
    });