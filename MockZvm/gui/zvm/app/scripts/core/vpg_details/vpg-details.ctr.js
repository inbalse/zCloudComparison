'use strict';

angular.module('zvmApp.core')
    .controller('vpgDetailsController', function ($scope, $state, $stateParams, $translate, vpgDetailsFactory, checkActiveState,
                                                  zAlertFactory, navigationTabsFactory, cloneVpgFactory, vpgsContainerService, createVPGFactory,
                                                  deleteVpgFactory, zertoServiceFactory, vos, globalStateModel, vpgDetailsModel, $filter, enums, tweaksService) {
        $scope.isPortal = globalStateModel.data.IsPortal;
        $scope.isPortalAllowVpgSiteDetails = tweaksService.getTweak('t_isPortalAllowVpgSiteDetails');
        $scope.enums = enums;
        $scope.lastTestText = '';
        $scope.lastTestTooltip = '';

        $scope.tabs = [
            {route: 'main.vpg_details.status', active: false, title: 'STATUS'},
            {route: 'main.vpg_details.vms', active: false, title: $translate.instant('VPG_DETAILS.TABS.VMS')},
            {route: 'main.vpg_details.sites', active: false, title: $translate.instant('VPG_DETAILS.TABS.SITES')},
            {
                route: 'main.vpg_details.parameters',
                active: false,
                title: $translate.instant('VPG_DETAILS.TABS.PARAMETERS')
            }
        ];

        $scope.$on('$stateChangeSuccess', function () {
            checkActiveState.byPartialName($scope.tabs);
        });

        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (_.contains(fromState.name, 'main.vpg_details') && !_.contains(toState.name, 'main.vpg_details') ||
                (_.contains(fromState.name, 'main.vpg_details') && _.contains(toState.name, 'main.vpg_details') && fromParams.id !== toParams.id)) {
                vpgDetailsFactory.unregisterDetails();
                vpgDetailsFactory.unregisterVPGEvents();
            }
        });

        $scope.handlePauseClick = function () {
            vpgsContainerService.pauseVPGs([{'Identifier': $scope.vpgData.ProtectionGroupId}]);
        };

        $scope.handleEditVPGClick = function () {
            createVPGFactory.openEdit($scope.vpgData.ProtectionGroupId);
        };

        //function that divided string result after filter for GD
        var _mappingStorageLabel = function (Provisioned) {
            if (Provisioned) {
                var recovery = $filter('mbToStringConvertor')(Provisioned);
                var result = recovery.split(' ');
                $scope.ProvisionedPreffix = result[0];
                $scope.ProvisionedSuffix = result[1];
            }
        };

        $scope.onSuccess = function (result) {

            $scope.vpgData = vpgDetailsModel.proccessData(result);

            var buttonsState = $scope.vpgData.State.ButtonsState;

            navigationTabsFactory.addTab({
                id: $stateParams.id, route: 'main.vpg_details({id: "' + $stateParams.id + '"})',
                active: false, title: 'VPG: ' + $scope.vpgData.VpgConfiguration.Name
            });

            if ($scope.oldName && $scope.oldName !== $scope.vpgData.VpgConfiguration.Name) {
                navigationTabsFactory.changeTabName({
                    id: $stateParams.id, route: 'main.vpg_details({id: "' + $stateParams.id + '"})',
                    active: false, title: 'VPG: ' + $scope.vpgData.VpgConfiguration.Name
                });
            }

            //if source is aws - change title 'protected VMs' to 'Recovered to "Recovered VMs'
            if ($scope.vpgData.Entities.Source === enums.VpgEntityType.Aws) {
                $scope.tabs[1].title = $translate.instant('VPG_DETAILS.TABS.RECOVERED_VMS');
            }
            $scope.oldName = $scope.vpgData.VpgConfiguration.Name;

            navigationTabsFactory.selectTab($stateParams.id);
            checkActiveState.byPartialName($scope.tabs);
            $scope.lastTestTooltip = $scope.vpgData.Summary.LastTest ? $filter('date')($scope.vpgData.Summary.LastTest.TestEndTime, 'dd/MM/yyyy') : $translate.instant('VPG_DETAILS.TABS.NOT_PERFORMED');
            $scope.lastTestText = $scope.vpgData.Summary.LastTest ? $filter('date')($scope.vpgData.Summary.LastTest.TestEndTime, 'dd/MM/yyyy') : $translate.instant('VPG_DETAILS.TABS.NOT_PERFORMED_SHORT');

            $scope.isRunBackupEnabled = buttonsState.IsBackupEnabled;
            $scope.isDeleteEnabled = buttonsState.IsDeleteEnabled;
            $scope.isCloneEnabled = buttonsState.IsCloneEnabled;
            $scope.isPauseEnabled = buttonsState.IsPauseEnabled;
            $scope.isForceSyncEnabled = buttonsState.IsForceSyncEnabled;
            $scope.isUpdateEnabled = buttonsState.IsUpdateEnabled;

            _mappingStorageLabel($scope.vpgData.Summary.NumberOfProvisionedMB);

        };

        $scope.onFail = function (reason) {
            //todo: refactoring needed here for better error handling
            if (reason && reason.faultCode === 'Server.Processing' && ( reason.faultString === 'VpgDoesntExist' || reason.faultString === 'VpgAlreadyRemoved' || reason.faultString === 'VpgCreationFailed')) {
                // stop update data every 5 sec
                vpgDetailsFactory.unregisterDetails();
                vpgDetailsFactory.unregisterVPGEvents();
                zAlertFactory.fail($translate.instant('VPG_DETAILS.VPG_NOT_FOUND.TITLE'),
                    $translate.instant('VPG_DETAILS.VPG_NOT_FOUND.DESCRIPTION'), function () {
                        navigationTabsFactory.removeTab($stateParams.id);
                        $state.go('main.vpgs');
                    });
            } else {
                zAlertFactory.fail('Unknown Error', 'Unknown error occurred.', function () {
                    navigationTabsFactory.removeTab($stateParams.id);
                    $state.go('main.vpgs');
                });
            }
        };

        $scope.handleRunBackupClick = function () {
            vpgsContainerService.runBackup([$scope.vpgData]);
        };

        $scope.forceSync = function () {
            zAlertFactory.warn($translate.instant('VPG_DETAILS.FORCE_SYNC'), $translate.instant('VPG_DETAILS.FORCE_SYNC_WARNING'), handleForceSync);
        };

        function handleForceSync(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                var identifier = new vos.ProtectionGroupIdentifier($scope.vpgData.ProtectionGroupId.GroupGuid);
                zertoServiceFactory.ForceProtectionGroupSync(identifier);
            }
        }

        $scope.handleDeleteClick = function () {
            //add a check also for source due to bug 26932
            var isPublicCloud = $scope.vpgData.Entities.Target === enums.VpgEntityType.Aws || $scope.vpgData.Entities.Target === enums.VpgEntityType.Azure ||
                $scope.vpgData.Entities.Source === enums.VpgEntityType.Aws || $scope.vpgData.Entities.Source === enums.VpgEntityType.Azure;
            deleteVpgFactory.deleteVpgById($scope.vpgData.ProtectionGroupId, $scope.vpgData.VpgConfiguration.Name, $scope.vpgData.State.ButtonsState.RequiresForceToDelete, isPublicCloud);
        };

        vpgDetailsFactory.initDetailsFactory($stateParams.id);

        vpgDetailsFactory.registerToDetails($scope).then(null, $scope.onFail, $scope.onSuccess);

        $scope.handleCloneButtonClick = function () {
            var data = $scope.vpgData;
            var checkpoint = data.State.RelevantCheckpoint ? data.State.RelevantCheckpoint : null;
            cloneVpgFactory.open(data.ProtectionGroupId, data.VpgConfiguration.Name, data.Entities.Target, checkpoint);
        };

        /*  $scope.handleStopCloneButtonClick = function () {
         var data = $scope.vpgData;
         cloneVpgFactory.stopClone(data.ProtectionGroupId);
         };*/

        $scope.handleEditVPGClick = function () {
            createVPGFactory.openEdit($scope.vpgData.ProtectionGroupId);
        };
    });
