'use strict';

angular.module('zvmApp.directives')
    .directive('zDupValidator', function ($uibPosition) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attr, ngModel) {

                var parent = elem.parent();

                var tooltipTemplate = '<div class="tooltip-invalid ' + attr.placement + '">' +
                    '<div class="tooltip-arrow"></div>' +
                    '<div class="tooltip-invalid-inner">' + attr.errorMessage + '</div></div>';

                parent.append(tooltipTemplate);
                var tooltipElement = parent.find('.tooltip-invalid');

                var tooltipPosition = $uibPosition.positionElements(elem, tooltipElement, attr.placement, false);
                tooltipElement.css({top: tooltipPosition.top, left: tooltipPosition.left});
                tooltipElement.hide();

                function validateDuplication(value) {
                    if (ngModel.$isEmpty(value) || attr.disabled) {
                        tooltipElement.hide();
                        return true;
                    }
                    if(attr.zDupValidator === value){
                        tooltipElement.show();
                        return false;
                    }
                    tooltipElement.hide();
                    return true;
                }

                ngModel.$parsers.unshift(function (value) {
                    var valid = validateDuplication(value);

                    ngModel.$setValidity('zDupValidator', valid);
                    return valid ? value : undefined;
                });
                ngModel.$formatters.push(function (value) {
                    ngModel.$setValidity('zDupValidator', validateDuplication(value));
                    return value;
                });

                attr.$observe('disabled', function () {
                    ngModel.$setValidity('zDupValidator', validateDuplication(ngModel.$viewValue));
                });

                attr.$observe('zDupValidator', function () {
                    ngModel.$setValidity('zDupValidator', validateDuplication(ngModel.$viewValue));
                });
            }
        };
    });




