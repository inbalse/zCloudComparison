'use strict';

angular.module('zvmApp.directives').directive('inputMultiplier', function () {
    return {
        require: 'ngModel',
        scope: {
            inputMultiplier: '='
        },
        link: function (scope, elem, attr, ngModel) {
            if (!ngModel && !scope.inputMultiplier) {
                return; // do nothing if no ng-model
            }
            //For DOM -> model
            ngModel.$parsers.push(function (value) {
                scope.inputMultiplier = parseFloat(scope.inputMultiplier);
                var valid = angular.isNumber(scope.inputMultiplier) && !isNaN(scope.inputMultiplier);
                return valid ? scope._multiply(value, scope.inputMultiplier) : value;
            });

            //For model -> DOM
            ngModel.$formatters.push(function (value) {
                scope.inputMultiplier = parseFloat(scope.inputMultiplier);
                var valid = angular.isNumber(scope.inputMultiplier) && !isNaN(scope.inputMultiplier);
                return valid ? scope._divide(value, scope.inputMultiplier) : value;
            });


            scope._multiply = function (value, measure) {
                return value * measure;
            };
            scope._divide = function (value, measure) {
                return value / measure;
            };

            scope.watchers = {
                inputMultiplier: scope.$watch('inputMultiplier', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        ngModel.$setViewValue(ngModel.$viewValue, newValue);

                    }
                })
            };
        }
    };
});