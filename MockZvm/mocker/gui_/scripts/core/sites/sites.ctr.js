'use strict';
angular.module('zvmApp.core')
    .controller('sitesController', function ($scope, $translate, checkActiveState) {

        $scope.tabs = [
            {title: $translate.instant('SITES'), route: 'main.sites.list', active: false }
        ];

        $scope.$on('$stateChangeSuccess', function () {
            checkActiveState.byPartialName($scope.tabs);
        });
    });
