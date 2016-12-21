'use strict';

/**
 * This directive fixes the issue in input[type=number] where the min and max should be binded to a value
 * from the scope
 */

var ang = angular.module('zvmApp.directives');

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

ang.directive('zNgMin', function () {
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function(scope, elem, attr, ngModel) {
            scope.$watch(attr.zNgMin, function(){
                ngModel.$setViewValue(scope.value);
            });
            var minValidator = function(value) {
                var min = scope.$eval(attr.zNgMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ngModel.$setValidity('zNgMin', false);
                    return undefined;
                } else {
                    ngModel.$setValidity('zNgMin', true);
                    return value;
                }
            };

            ngModel.$parsers.push(minValidator);
            ngModel.$formatters.push(minValidator);
        }
    };
});

ang.directive('zNgMax', function () {
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function(scope, elem, attr, ngModel) {
            scope.$watch(attr.zNgMax, function(){
                ngModel.$setViewValue(scope.value);
            });
            var maxValidator = function(value) {
                var max = scope.$eval(attr.zNgMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ngModel.$setValidity('zNgMax', false);
                    return undefined;
                } else {
                    ngModel.$setValidity('zNgMax', true);
                    return value;
                }
            };

            ngModel.$parsers.push(maxValidator);
            ngModel.$formatters.push(maxValidator);
        }
    };
});
