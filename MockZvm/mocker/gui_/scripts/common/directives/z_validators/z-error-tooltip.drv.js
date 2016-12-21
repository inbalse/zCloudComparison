'use strict';

angular.module('zvmApp.directives')
    .directive('zErrorTooltip', function ($uibPosition) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attr, ngModel) {
                var tooltipElement;
                var tooltipPosition;
                var parent = elem.parent();

                function showMessage()
                {
                    $('.z-error-tooltip-drv').remove();
                    var tooltipTemplate = '<div class="z-error-tooltip-drv tooltip-invalid ' + attr.placement + '">' +
                        '<div class="tooltip-arrow"></div>' +
                        '<div class="tooltip-invalid-inner">' + attr.errorMessage + '</div></div>';

                    parent.append(tooltipTemplate);

                    tooltipElement = parent.find('.z-error-tooltip-drv');

                    tooltipPosition = $uibPosition.positionElements(elem, tooltipElement, attr.placement, false);

                    tooltipElement.css({top: tooltipPosition.top, left: tooltipPosition.left});
                    tooltipElement.show();
                }

                function hideMessage()
                {
                    if (tooltipElement) {
                        tooltipElement.hide();
                    }
                }

                ngModel.$parsers.unshift(function (value) {
                    hideMessage();
                    if(attr.ngMinlength && value)
                    {
                        var min = parseInt(attr.ngMinlength);
                        if(value.length < min)
                        {
                            showMessage();
                        }
                    }
                    if(attr.required)
                    {
                        if(!ngModel.$pristine && value === '' || value === undefined)
                        {
                            showMessage();
                        }
                    }
                    return value;
                });

                scope.$on('$destroy', function () {
                    $('.z-error-tooltip-drv').remove();
                });
            }
        };
    });
