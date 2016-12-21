'use strict';

angular.module('zvmApp.filters')
    .filter('infoCellFormatter', function (){

            return function (row, cell, value) {
                return '<p title="' + value + '" >' + value + '</p>';
            };

    });