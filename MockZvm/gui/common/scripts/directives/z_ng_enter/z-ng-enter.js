'use strict';

angular.module('zvmApp.directives')
    .directive('zEnter', function () {
        return function (scope, element, attrs) {
            element.on('keydown', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.zEnter);
                    });
                    event.preventDefault();
                }
            });

            scope.$on('$destroy', function () {
                element.off('keydown');
            });
        };
    });
