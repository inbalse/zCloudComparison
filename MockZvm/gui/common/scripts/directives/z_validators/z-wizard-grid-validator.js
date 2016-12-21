'use strict';
angular.module('zvmApp.directives')
    .directive('zWizardGridValidator', function ($uibPosition) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var parent = element.parent();

                scope.$on('wizard:' + element.attr('z-wizard-grid-validator'),function(event,error){
                    var tooltipTemplate = '<div class="tooltip-invalid ' + attrs.placement + '">' +
                        '<div class="tooltip-arrow"></div>' +
                        '<div class="tooltip-invalid-inner" >' + error + '</div></div>';
                    parent.find('.tooltip-invalid').remove();
                    parent.append(tooltipTemplate);
                    var tooltipElement = parent.find('.tooltip-invalid');

                    var tooltipPosition = $uibPosition.positionElements(element, tooltipElement, attrs.placement, false);
                    tooltipElement.css({top: tooltipPosition.top, left: tooltipPosition.left});
                    tooltipElement.show();
                });

                scope.$on('wizard:hideErrors',function(){
                    parent.find('.tooltip-invalid').remove();
                    //element.addClass('ng-invalid-z-wizard-validator');
                });

                scope.$on('$destroy', function () {
                    $(scope).off('wizard:' + element.attr('z-wizard-grid-validator'));
                    $(scope).off('wizard:hideErrors');
                });
            }
        };
    });
