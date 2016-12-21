'use strict';

angular.module('zvmApp.directives').directive('emailEmptyOrValid', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            //For DOM -> model validation
            ngModel.$parsers.unshift(function (value) {
                var valid = isValid(value);
                ngModel.$setValidity('emailEmptyOrValid', valid);
                return valid ? value : undefined;
            });
            //For model -> DOM validation
            ngModel.$formatters.unshift(function (value) {
                ngModel.$setValidity('emailEmptyOrValid', isValid(value));
                return value;
            });

            var isValid = function(value) {
                if (value) {
                    return scope._validateEmail(value);
                }
                else {
                    return attr.required ? false : true;
                }
            };

            scope._validateEmail = function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            };

        }
    };
});