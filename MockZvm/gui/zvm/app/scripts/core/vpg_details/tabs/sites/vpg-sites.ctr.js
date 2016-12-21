'use strict';

angular.module('zvmApp.core')
    .controller('vpgSitesController', function ($scope, $translate, vpgSitesModel, vpgSitesSvgFactory) {

        $scope.searchKey = null;
        $scope.groupByValues = [
            {
                text: $translate.instant('VPG_DETAILS.TOPOLOGY.GROUP_BY.PROTECTED_HOSTS'),
                value: vpgSitesModel.SOURCE_SITE_REF
            },
            {
                text: $translate.instant('VPG_DETAILS.TOPOLOGY.GROUP_BY.RECOVERY_HOSTS'),
                value: vpgSitesModel.TARGET_SITE_REF
            }
        ];

        $scope.selectedGroup = $scope.groupByValues[0];

        $scope.handleRefresh = function () {
            vpgSitesSvgFactory.refresh();
        };

        $scope.handleOrder = function () {
            vpgSitesSvgFactory.order($scope.selectedGroup.value);
        };

        $scope.handleSearch = function () {
            vpgSitesSvgFactory.filter($scope.searchKey);
        };

    });
