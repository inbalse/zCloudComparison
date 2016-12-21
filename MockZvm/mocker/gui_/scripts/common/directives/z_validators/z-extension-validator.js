'use strict';

angular.module('zvmApp.directives')
    .directive('extension', function () {
        return {
            require: 'ngModel',
            scope: {
                extension: '='
            },
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.extension = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    return _.contains(scope.extension, viewValue.split('.').pop().toLowerCase());
                };
            }
        };
    });