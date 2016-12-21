'use strict';

angular.module('zvmApp.directives').directive('zTimepicker', function () {
    return {
        require: 'ngModel',
        restrict: 'E',
        templateUrl: 'scripts/common/directives/z_timepicker/z-timepicker.html',
        transclude: true,
        replace: false,
        scope: {
            disabled: '=',
            required: '=',
            placeholderHours: '@',
            placeholderMinutes: '@'
        },
        link: function (scope, elem, attr, ngModel) {

            scope.$watch('minutes', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue > -1 && newValue < 60) {
                    scope.minutes = newValue;
                } else {
                    scope.minutes = oldValue;
                }
                ngModel.$setViewValue(parseInt(scope.hours, 10) * 60 + parseInt(scope.minutes, 10));
            });

            scope.$watch('hours', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue > -1 && newValue < 24) {
                    scope.hours = newValue;
                } else {
                    scope.hours = oldValue;
                }
                ngModel.$setViewValue(parseInt(scope.hours, 10) * 60 + parseInt(scope.minutes, 10));
            });

            //For model -> DOM
            ngModel.$formatters.push(function (value) {
                scope.hours = Math.floor(value / 60);
                scope.minutes = value % 60;
                return value;
            });
        }
    };
});
