'use strict';

angular.module('zvmApp.directives')
    .directive('vpgSitesTooltip', function ($document, vpgSitesTooltipFactory) {
        return {
            scope: true,
            restrict: 'C',
            templateUrl: 'scripts/core/vpg_details/tabs/sites/tooltip/vpg-sites-tooltip.html',
            controller: function ($scope) {
                $scope.model = vpgSitesTooltipFactory.model;

                $scope.linkClick = function () {
                    vpgSitesTooltipFactory.hide();
                };

                $scope.onMouseEnter = vpgSitesTooltipFactory.getFocus;
                $scope.onMouseLeave = function () {
                    vpgSitesTooltipFactory.looseFocus();
                    vpgSitesTooltipFactory.hide($scope);
                };
            }
        };
    });
