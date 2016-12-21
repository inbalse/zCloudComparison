'use strict';

angular.module('zvmApp.directives')
    .directive('zStepper', function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                min: '=',
                max: '=',
                ngModel: '=',
                pHolder: '@',
                elementDisabled: '='
            },
            templateUrl: 'scripts/common/directives/z_stepper/z-stepper.html',

            link: function (scope, iElement, iAttrs, ngModel) {

                ngModel.$render = function () {
                    // update the validation status
                    checkValidity();
                };

                // when model change, cast to integer
                ngModel.$formatters.push(function (value) {
                    //check if value defined and not empty
                    if (angular.isDefined(value)) {
                        //check if value contains numbers
                        value = /\d/g.test(value) ? value : '';
                        //check if value is string an cast to int
                        //if string has letters removes them and leaves just numbers
                        value = angular.isString(value) && value !== '' ? parseInt(value.match(/\d+/)[0], 10) : value;

                        scope.ngModel = value;
                        ngModel.$setViewValue(value);
                    } else {
                        scope.ngModel = value;
                        ngModel.$setViewValue(value);
                    }
                    checkValidity();
                    return value;
                });

                // when view change, cast to integer
                ngModel.$parsers.push(function (value) {
                    return value === '' || angular.isUndefined(value) ? undefined : parseInt(value, 10);
                });

                function checkValidity() {
                    // check if min/max defined to check validity
                    var valid = !(scope.isOverMin(true) || scope.isOverMax(true));
                    // set our model validity
                    // the outOfBounds is an arbitrary key for the error.
                    // will be used to generate the CSS class names for the errors
                    ngModel.$setValidity('outOfBounds', valid);
                }

                function updateModel(offset) {
                    //check that view value is empty string
                    ngModel.$viewValue = ngModel.$viewValue === '' ? 0 : ngModel.$viewValue;
                    // update the model, call $parsers pipeline...
                    ngModel.$setViewValue(ngModel.$viewValue + offset);
                    // update the local view
                    ngModel.$render();
                }

                scope.isOverMin = function (strict) {
                    var offset = strict ? 0 : 1;
                    return (angular.isDefined(scope.min) && (ngModel.$viewValue - offset) < parseInt(scope.min, 10));
                };
                scope.isOverMax = function (strict) {
                    var offset = strict ? 0 : 1;
                    return (angular.isDefined(scope.max) && (ngModel.$viewValue + offset) > parseInt(scope.max, 10));
                };

                // update the value when user clicks the buttons
                scope.increment = function () {
                    updateModel(+1);
                };
                scope.decrement = function () {
                    updateModel(-1);
                };

                // check validity on start, in case we're directly out of bounds
                checkValidity();

                // watch out min/max and recheck validity when they change
                scope.$watch('min+max', function () {
                    checkValidity();
                });

            }
        };
    });
