'use strict';

angular.module('zvmApp.directives')
    .directive('zFocus', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var timeoutPromise = $timeout(function () {
                    element[0].focus();
                }, 700);

                scope.$on('$destroy', function () {
                    $timeout.cancel(timeoutPromise);
                });
            }
        };
    });



