'use strict';

angular.module('zvmApp.directives').directive('toAddressesEmptyOrValid', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {

            //For DOM -> model validation
            ngModel.$parsers.push(function (value) {

                var tempAddresses = value.split(';');
                var validAddresses = [];
                _.each(tempAddresses, function (item) {
                    if (item.trim() !== '') {
                        validAddresses.push({ToAddress: item});
                    }
                });

                return scope.validateToAddresses(validAddresses) ? validAddresses : undefined;
            });

            //For model -> DOM validation
            ngModel.$formatters.push(function (value) {
                scope.validateToAddresses(value);
                return  _.map(value, 'ToAddress').join(';');
            });

            scope._validateEmail = function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            };

            scope.validateToAddresses = function (value) {
                var flag = true;

                _.each(value, function (item) {
                    if (!scope._validateEmail(item.ToAddress)) {
                        flag = false;
                        return false;
                    }
                });

                ngModel.$setValidity('toAddressesEmptyOrValid', flag);

                return flag;
            };

        }
    };
});
