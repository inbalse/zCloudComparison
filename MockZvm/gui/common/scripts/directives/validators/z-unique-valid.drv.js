'use strict';

angular.module('zvmApp.directives')
    .directive('zUniqueValid', function ($uibPosition) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                collection: '='
            },
            link: function (scope, element, attr, ngModel) {

                //======= variables =============
                var parent = element.parent();
                var isTooltipBeenSet = false;
                var tooltipElement;

                //======= template =============
                var asterisk = '<span class="z-asterisk">*</span>';
                var tooltipTemplate = '<div class="tooltip-invalid ' + attr.placement + '">' +
                    '<div class="tooltip-arrow"></div>' +
                    '<div class="tooltip-invalid-inner">' + attr.errorMessage + '</div></div>';

                //======= check if need asterisk =============
                if (attr.asterisk) {
                    parent.append(asterisk);
                }

                //======= invalid tooltip =============
                function setTooltip() {
                    parent.append(tooltipTemplate);
                    tooltipElement = parent.find('.tooltip-invalid');

                    var tooltipPosition = $uibPosition.positionElements(element, tooltipElement, attr.placement, false);
                    tooltipElement.css({top: tooltipPosition.top, left: tooltipPosition.left});
                    tooltipElement.hide();
                    isTooltipBeenSet = true;
                }
                //======= validation function =============
                function isValueExist(value) {
                    return !_.contains(_.invoke(_.map(scope.collection, attr.propertyName), 'toLowerCase'), value.toLowerCase());
                }

                //======= angular $valid override =============
                ngModel.$parsers.unshift(function (value) {
                    if(!isTooltipBeenSet){ setTooltip(); }
                    var invalid = angular.isDefined(value) ? isValueExist(value) : true;
                    if (invalid) { tooltipElement.hide(); } else { tooltipElement.show(); }
                    ngModel.$setValidity('zUniqueValid', invalid);
                    return value;
                });
            }
        };
    });

