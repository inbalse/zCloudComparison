'use strict';

angular.module('zvmApp.directives').directive('zTooltipDirective', function ($document, zTooltipService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'scripts/common/directives/z_tooltip/z-tooltip.html',
        transclude: true,
        link: function (scope, element) {
            var body = angular.element(document).find('body').eq(0);
            body.append(element);

            $document.on('mousemove', function (e) {
                if (zTooltipService.state.visible) {
                    zTooltipService.state.style = {left: e.pageX, top: e.pageY, zIndex: 2000};
                    scope.$digest();
                }
            });

            scope.$on('$destroy', function () {
                $document.off('mousemove');
                element.remove();
            });
        },
        controller: function ($scope) {
            $scope.state = zTooltipService.state;
        }
    };
});
