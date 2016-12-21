'use strict';

// input example : max=300 min=20 values='1,3,5'
angular.module('zvmApp.directives').directive('inputMaxMinExtraValuesValid', function () {
    return {
        require: 'ngModel',
        scope: {
            min: '=min',
            max: '=max',
            values: '@'
        },
        link: function (scope, elem, attr, ngModel) {
            //For DOM -> model validation
            ngModel.$parsers.unshift(function (value) {
                var valid = scope._validateValue(value);
                ngModel.$setValidity('scriptExecTimeoutValid', valid);
                return valid ? value : undefined;
            });
            //For model -> DOM validation
            ngModel.$formatters.unshift(function (value) {
                ngModel.$setValidity('scriptExecTimeoutValid', scope._validateValue(value));
                return value;
            });

            scope._validateValue = function (value) {
                var checkValues = scope.values.split(',');
                var isContain = _.contains(checkValues, value);
                return (parseInt(value) >= scope.min  && parseInt(value) <= scope.max) || isContain;
            };

        }
    };
});
