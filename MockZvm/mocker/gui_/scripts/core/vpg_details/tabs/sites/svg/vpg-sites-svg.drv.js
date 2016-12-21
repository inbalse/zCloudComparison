'use strict';

angular.module('zvmApp.directives').directive('vpgSitesSvg', function (vpgSitesSvgFactory) {
    return {
        restrict: 'C',
        scope: true,
        templateUrl: 'scripts/core/vpg_details/tabs/sites/svg/vpg-sites-svg.html',
        link: function (scope, elem) {

            vpgSitesSvgFactory.init(elem, scope);

            scope.$on('$destroy', function () {
                vpgSitesSvgFactory.destroy();
            });

            scope.$on('zResize::resize', function () {
                vpgSitesSvgFactory.init(elem, scope);
            });
        }
    };
});
