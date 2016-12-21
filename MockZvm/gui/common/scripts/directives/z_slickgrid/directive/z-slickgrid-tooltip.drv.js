/**
 * Created by guy.golan on 8/13/2016.
 */
'use strict';
angular.module('zvmApp.directives')
    .constant('zSlickgridTooltipConstants', {
        template: '<div></div>',
        className: 'z-slickgrid-tooltip'
    })
    .directive('zSlickgridTooltip', function ($uibPosition, zSlickgridTooltipConstants) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var content = attributes.zSlickgridTooltip,
                    body = angular.element(document.body),
                    tooltip;


                if (angular.element('.' + zSlickgridTooltipConstants.className).length > 0) {
                    removeTooltip();
                }

                appendTooltip();

                element.parent().on('mouseleave', function(){
                    removeTooltip();
                });

                body.on('click', function(){
                    removeTooltip();
                });

                scope.$on('$destroy', function(){
                    element.parent().off('mouseleave');
                    body.off('click');
                    removeTooltip();
                });

                function removeTooltip(){
                    angular.element('.' + zSlickgridTooltipConstants.className).remove();
                }

                function appendTooltip() {
                    tooltip = angular.element(zSlickgridTooltipConstants.template);
                    tooltip.addClass(zSlickgridTooltipConstants.className);
                    tooltip.append(content);
                    body.append(tooltip);
                    var pos = $uibPosition.positionElements(element.parent(), tooltip, 'top-right', true);
                    tooltip.css({
                        position: 'absolute',
                        zIndex: 9999,
                        top: pos.top,
                        left: pos.left + tooltip.width() - element.width() / 2
                    });
                }
            }
        }
    });