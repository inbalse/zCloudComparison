'use strict';

angular.module('zvmApp.filters')
    .filter('tcoFormatter', function () {
            return function (row, cell, value, j, o, v) {
                console.log(value);
                return '<div>'+value.realTco+' <a>'+value.bestTco+'</a></div>';




            };
    });