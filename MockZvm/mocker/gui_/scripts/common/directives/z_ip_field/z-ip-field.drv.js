'use strict';

angular.module('zvmApp.directives')
    .directive('zIpField', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, elem, attr, ngModel) {

                var _events = [];

                function validateIp(ip){
                    if (ngModel.$isEmpty(ip) || attr.disabled){
                        return true;
                    }
                    var re = /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-9]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/;
                    return re.test(ip);
                }

                elem.attr('placeholder', 'xxx.xxx.xxx.xxx');

                ngModel.$parsers.unshift(function (value) {
                    var valid = validateIp(value);
                    return valid ? value : undefined;
                });
                ngModel.$formatters.push(function (value) {
                    return value;
                });

                attr.$observe('disabled', function() {
                    ngModel.$setValidity('zIpField', validateIp(ngModel.$viewValue));
                });

                _events.push(elem.bind('blur', function () {
                    ngModel.$setValidity('zIpField', validateIp(ngModel.$viewValue));
                }));

                $scope.$on('$destroy', function () {
                    _events.forEach(function (event) {
                        event.remove();
                    });
                });
            }
        };
    });





