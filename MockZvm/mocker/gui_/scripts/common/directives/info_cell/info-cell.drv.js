'use strict';

angular.module('zvmApp.directives')
    .directive('infoCell', function () {
        return{
            restrict: 'E',
            templateUrl: 'scripts/common/directives/info_cell/info-cell.html',
            scope: {
                text: '=',
                numberOfLines: '='
            }
        };
    });