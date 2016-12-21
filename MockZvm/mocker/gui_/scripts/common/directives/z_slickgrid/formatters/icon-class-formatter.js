'use strict';

angular.module('zvmApp.directives')
    .filter('iconClassFormatter', function () {
        return function (className, prop) {
            return function (row, cell, value) {
                if (prop) {
                    return '<span class="' + className + '-' + !!value[prop] + '"></span>';
                } else {
                    return '<span class="' + className + '-' + !!value + '"></span>';
                }
            };
        };
    });
