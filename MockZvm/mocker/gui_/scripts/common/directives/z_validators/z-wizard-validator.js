'use strict';
angular.module('zvmApp.directives')
    .directive('zWizardValidator', function ($uibPosition) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {

                var parent = element.parent();

                scope.$on('wizard:' + element.attr('z-wizard-validator'),function(event,error){

                    var tooltipTemplate = '<div class="tooltip-invalid ' + attrs.placement + '">' +
                        '<div class="tooltip-arrow"></div>' +
                        '<div class="tooltip-invalid-inner" >' + error + '</div></div>';
                    parent.find('.tooltip-invalid').remove();
                    parent.append(tooltipTemplate);
                    var tooltipElement = parent.find('.tooltip-invalid');

                    var tooltipPosition = $uibPosition.positionElements(element, tooltipElement, attrs.placement, false);
                    tooltipElement.css({top: tooltipPosition.top, left: tooltipPosition.left});
                    tooltipElement.show();
                    ngModel.$setValidity('zWizardValidator', false);
                });

                ngModel.$parsers.push(function(value){
                    ngModel.$setValidity('zWizardValidator', true);
                    var tooltipElement = parent.find('.tooltip-invalid');
                    tooltipElement.hide();
                    return value;
                });

                scope.$on('wizard:hideErrors',function(){
                    parent.find('.tooltip-invalid').remove();
                    ngModel.$setValidity('zWizardValidator', true);
                });

                scope.$on('$destroy', function () {
                    $(scope).off('wizard:' + element.attr('z-wizard-validator'));
                    $(scope).off('wizard:hideErrors');
                });
            }
        };
    });
