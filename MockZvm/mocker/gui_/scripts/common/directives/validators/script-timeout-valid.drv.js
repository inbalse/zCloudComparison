'use strict';

angular.module('zvmApp.directives')
    .directive('scriptTimeOutValid', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                min: '=min',
                max: '=max',
                none: '=none',
            },
            link: function (scope, elem, attr, ngModel) {
                ngModel.$parsers.unshift(function (value) {
                    var valid = scope._valid(value);
                    ngModel.$setValidity('scriptTimeOutValid', valid);
                    return valid ? value : undefined;
                });

                ngModel.$formatters.unshift(function (value) {
                    var valid = scope._valid(value);
                    ngModel.$setValidity('scriptTimeOutValid', valid);
                    return value;
                });

                scope._valid = function (value) {
                    if (value >= scope.min && value <= scope.max || value === scope.none) {
                        return true;
                    }
                    return false;
                };
            }
        };
    });