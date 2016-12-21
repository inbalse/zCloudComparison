'use strict';
angular.module('zvmApp.core')
    .constant('offsiteDateFormat', {
        NORMAL: 'MM/dd/yyyy HH:mm:ss'
    })
    .controller('offsiteController', function ($scope, $translate, checkActiveState, offsiteVmsListModel, offsiteVpgsListModel) {

        $scope.tabs = [
            {title: $translate.instant('VPGS'), route: 'main.offsite.vpgs', active: false},
            {title: $translate.instant('VMS'), route: 'main.offsite.vms', active: false}
        ];

        $scope.$on('$stateChangeSuccess', function () {
            checkActiveState.byPartialName($scope.tabs);
        });

        offsiteVmsListModel.register($scope).then(null, null, function (result) {
            $scope.dataVMs = result;
        });

        offsiteVpgsListModel.register($scope).then(null, null, function (result) {
            $scope.dataVPGs = result;
        });
    });
