'use strict';
/**
 * This directive should be user with ui-select for insuring that the applyed value is an object
 * and not a json string
 */
angular.module('zvmApp.directives')
    .directive('stringToBoolean', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {

                ngModel.$parsers.push(function (value) {
                    if (value === undefined) {
                        return value;
                    }
                    if ('true' === value) {
                        return true;
                    }
                    return false;
                });

                ngModel.$formatters.push(function (value) {
                    if (value === undefined) {
                        return value;
                    }
                    if (true === value) {
                        return 'true';
                    }
                    return 'false';
                });
            }
        };
    });

