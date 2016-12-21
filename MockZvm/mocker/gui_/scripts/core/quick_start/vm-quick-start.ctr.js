'use strict';
angular.module('zvmApp.core')
    .controller('vmViewController', function ($scope, createVPGFactory, selectVpgFactory, globalStateModel, navigationTabsFactory, checkActiveState, vmContextModel, zAlertFactory) {

        $scope.$on('$stateChangeSuccess', function () {
            checkActiveState.byPartialName($scope.tabs);
        });

        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (_.contains(fromState.name, 'main.vm_quick_start') && !_.contains(toState.name, 'main.vm_quick_start')) {
                vmContextModel.unregisterDetails();
            }
        });

        $scope.vmIdentifier = globalStateModel.vmIdentifier;

        $scope.onVmContextInfoProcess = function (data) {
            $scope.vmContextInfo = data;
            var id = $scope.vmContextInfo.Identifier.ServerIdentifier.ServerGuid;
            var name = $scope.vmContextInfo.Identifier.InternalVmName;

            navigationTabsFactory.addTab({
                id: id,
                name: name,
                route: 'main.vm_quick_start',
                active: false,
                title: 'VM: ' + $scope.vmContextInfo.DisplayName
            });

            navigationTabsFactory.selectTab(id, name);
            checkActiveState.byPartialName($scope.tabs);
        };

        $scope.onVmpContextInfoFail = function (reason) {
            zAlertFactory.fail('Error code: ' + reason.faultCode, reason.faultString, null, null);
        };

        $scope.addToVPG = function () {
            selectVpgFactory.open().then($scope.onVpgSelected);
        };

        $scope.onVpgSelected = function (result) {
            createVPGFactory.openEdit(result.Identifier, $scope.vmContextInfo.Identifier);
        };

        $scope.protect = function () {
            createVPGFactory.vSphereProtectStandalone($scope.vmContextInfo.DisplayName, $scope.vmContextInfo.Identifier);
        };

        $scope.createVpg = function () {
            createVPGFactory.vSphereCreateNewVPG($scope.vmContextInfo.Identifier);
        };

        vmContextModel.registerForVMContextInfo($scope, $scope.vmIdentifier).then(null, $scope.onVmpContextInfoFail, $scope.onVmContextInfoProcess);


    });
