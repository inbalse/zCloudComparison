'use strict';

angular.module('zvmApp.filters')
    .filter('objectFormatter', function () {
        return function (row, cell, value) {
            if (value){
                return value.display;
            }
            return '';
        };
    });
