'use strict';

angular.module('zvmApp.directives')
    .directive('zFlotLegend', function () {
        return{
            restrict: 'E',
            templateUrl: 'scripts/common/directives/charts/flot_legend/z-flot-legend.html',
            scope: {
                items: '=',
                clickFunc: '&'
            },
            link: function(scope){

                    scope.onClick = function (item) {
                    if (typeof (scope.clickFunc) === 'function') {
                        item.selected = !item.selected;
                        scope.clickFunc({item:item});
                    }
                };

            }
        };
    });
