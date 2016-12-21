'use strict';
angular.module('zvmApp.core')
    .constant('vpgsListEvents', {
        commit: 'Vpg::Commit',
        stopFot: 'Vpg::StopFot',
        stopBackup: 'Vpg::StopBackup',
        stopClone: 'Vpg::StopClone',
        resume: 'Vpg::Resume',
        rollback: 'Vpg::Rollback'
    })
    .controller('vpgsContainerController', function ($scope, vpgsContainerService, siteSettingsFactory,
                                                     summaryMinimalModel, analyticsEventsTypes, vpgsStatusFilterService) {
        var ctrl = this;
        ctrl.selectedItems = [];
        ctrl.isPortal = vpgsContainerService.isPortal();
        ctrl.btnState = {};
        ctrl.groupByValues = vpgsContainerService.getGroupByValues();
        ctrl.statusFilter = vpgsStatusFilterService.statusFilter;

        ctrl.checkboxChanged = function () {
            vpgsStatusFilterService.statusFilterChanged();
        };

        ctrl.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        ctrl.onNewVPGClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.NEW_VPG.INITIAL);
            vpgsContainerService.createVPG();
        };

        ctrl.handleExportClick = function () {
            vpgsContainerService.export();
        };

        ctrl.onVPGEditClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.EDIT_VPG.INITIAL);
            vpgsContainerService.editVPG(ctrl.selectedItems[0].Identifier);
        };

        ctrl.onPauseClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.PAUSE_VPG);
            vpgsContainerService.pauseVPGs(ctrl.selectedItems);
        };

        ctrl.onForceSyncClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.FORCE_SYNC);
            vpgsContainerService.forceSync(ctrl.selectedItems[0].Identifier);
        };

        ctrl.onResumeClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.RESUME_VPG);
            vpgsContainerService.resumeVPGs(ctrl.selectedItems);
        };

        ctrl.onStopBackupClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.ABORT_BACKUP);
            vpgsContainerService.stopBackup(ctrl.selectedItems);
        };

        ctrl.onRunBackupClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.RUN_BACKUP);
            vpgsContainerService.runBackup(ctrl.selectedItems);
        };

        ctrl.onDeleteButtonClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.DELETE_VPG);
            vpgsContainerService.deleteVPG(ctrl.selectedItems[0]);
        };

        ctrl.onStopFailOverTestClick = function () {
            $scope.$emit(analyticsEventsTypes.VPGS.STOP_TEST);
            vpgsContainerService.stopFailOverTest(ctrl.selectedItems);
        };

        ctrl.selectedItemsChange = function () {
            vpgsContainerService.setSelectedVPGIds(ctrl.selectedItems);

            ctrl.btnState = vpgsContainerService.checkActionButtonsState(ctrl.selectedItems);

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.$on('$destroy', function () {
            vpgsContainerService.clearSelectedVPGIds();
            //Clear the search value when switching the main tabs
        });

        ctrl.onResult = function (result) {
            ctrl.isCreateVPGEnabled = result.SummaryState.IsGeneralCreateVPGEnabled;
        };

        ctrl.updateBtnState = function (data) {
            ctrl.btnState = vpgsContainerService.checkActionButtonsState(data.ProtectionGroups);
        };

        vpgsContainerService.register($scope).then(null, null, ctrl.updateBtnState);

        //register to the summaryMinimalModel for knowing i create vpg enable
        summaryMinimalModel.register($scope).then(null, null, ctrl.onResult);
    });
