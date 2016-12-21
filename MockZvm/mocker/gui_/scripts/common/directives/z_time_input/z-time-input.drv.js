'use strict';

angular.module('zvmApp.directives')
    .directive('zTimeInput', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                min: '=',
                max: '=',
                ngModel: '=',
                persistTimeValidation: '=',
                pHolder: '@',
                elementDisabled: '='
            },
            templateUrl: 'scripts/common/directives/z_time_input/z-time-input.html',

            link: function (scope, iElement, iAttrs, ngModel) {


                scope.isOverMin = isOverMin;
                scope.isOverMax = isOverMax;
                scope.increment = increment;
                scope.decrement = decrement;
                scope._handleBlur = _handleBlur;


                /************************************
                 * Formatters (ngModel)
                 * */
                ngModel.$formatters.push(function (value) {

                    //Wrong character
                    if (isNaN(parseInt(value))) {
                        return;
                    }

                    //String - change from input
                    if (angular.isString(value)) {
                        if (value === '') {
                            ngModel.$setViewValue(undefined);
                        }
                        if (value.length > 2) {
                            var cuttedInput = value.slice(0, 2);
                            ngModel.$setViewValue(cuttedInput);
                            return cuttedInput;
                        }
                    }

                    //Integer - change from buttons
                    else if (angular.isNumber(value)) {
                        ngModel.$setViewValue(value);

                        if (value < 10 && value > 0) {
                            ngModel.$setViewValue('0' + value);
                        } else if (value === 0) {
                            ngModel.$setViewValue('0' + value);
                        } else {
                            ngModel.$setViewValue(value);
                        }
                    }

                    //Check validation
                    ngModel.$setValidity('outOfBounds', isOutOfBound((parseInt(value, 10))));

                    return value;
                });


                /************************************
                 * Functions
                 * */
                function isOutOfBound(value) {
                    return (angular.isDefined(scope.min) && angular.isDefined(scope.max) && value >= parseInt(scope.min, 10) && value <= parseInt(scope.max, 10));
                }

                function updateModel(offset) {
                    scope.ngModel = (parseInt(scope.ngModel, 10) || 0) + offset;
                }

                function isOverMin(strict) {
                    var offset = strict ? 0 : 1;
                    return (angular.isDefined(scope.min) && ((parseInt(ngModel.$viewValue, 10) || 0) - offset) < parseInt(scope.min, 10));
                }

                function isOverMax(strict) {
                    var offset = strict ? 0 : 1;
                    return (angular.isDefined(scope.max) && ((parseInt(ngModel.$viewValue, 10) || 0) + offset) > parseInt(scope.max, 10));
                }

                function increment() {
                    updateModel(+1);
                }

                function decrement() {
                    updateModel(-1);
                }

                function _handleBlur() {
                    var updatedValue = parseInt(ngModel.$modelValue, 10);

                    if (!isNaN(updatedValue)) {
                        if (updatedValue < 10 && updatedValue >= 0) {
                            updatedValue = '0' + updatedValue;
                        }
                        ngModel.$setViewValue(updatedValue);
                    }
                    ngModel.$setValidity('outOfBounds', isOutOfBound((updatedValue)));
                }


                /************************************
                 * Watchers
                 * */
                scope.$watch('elementDisabled', function (newValue) {
                    if (angular.isDefined(newValue) && newValue) {
                        ngModel.$setValidity('outOfBounds', true);
                    }
                });

                if (angular.isDefined(scope.persistTimeValidation) && scope.persistTimeValidation) {
                    scope.$watch('ngModel', function (newValue, oldValue) {
                        scope.ngModel = (newValue > scope.max || newValue < scope.min) ? oldValue : newValue;
                    });
                }
            }
        };
    });
