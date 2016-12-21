'use strict';
angular.module('zvmApp.core')
    .controller('vmsListController', function ($scope, $compile, zEntitiesService, vmsListModel, entityEvents, vpgsListEvents, vpgsContainerBtnStateService, zTabsStateConstants,
                                               $translate, createVPGFactory, $filter, zSlickGridFilterTypes, summaryMinimalModel, vpgsContainerService,
                                               zAlertFactory, deleteVpgFactory, $window, stopFailoverTestFactory, zertoServiceFactory,
                                               globalStateModel, commitVpgFactory, resumeVpgFactory, enums, siteSettingsFactory, vos) {
        //todo: there should be target type some day for remote site enum style icon

        var deleteTitle = $translate.instant('GRID_COLUMNS.DELETE_VPG');
        var editTitle = $translate.instant('GRID_COLUMNS.EDIT_VPG');
        var deleteDisable = $translate.instant('GRID_COLUMNS.DELETE_VPG_DISABLED');
        var editDisable = $translate.instant('GRID_COLUMNS.EDIT_VPG_DISABLED');

        var columnDefs = [
            {
                name: ' ',
                hideFromEditColumns: true,
                resizable: false,
                field: 'AlertStatusAndTip',
                views: ['General', 'Performance', 'Backup'],
                maxWidth: 40,
                formatter: $filter('enumToCssWithTooltipClassFormatter')('protection-group-alert-status'),
                headerCssClass: 'protection-group-alert-status-header'
            },
            {
                name: $translate.instant('VM_LIST.NAME'),
                field: 'VirtualMachineName',
                views: ['General', 'Performance', 'Backup'],
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('VM_LIST.VPG_NAME'),
                minWidth: 160, //26680
                field: 'iconsPropertyOptions',
                views: ['General', 'Performance', 'Backup'],
                filter: zSlickGridFilterTypes.WILDCARD,
                formatter: $filter('zEntitiesFormatter')(zEntitiesService.createParams('vms', editTitle, editDisable, deleteTitle, deleteDisable))
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.DIRECTION'),
                maxWidth: 100,
                field: 'DirectionObj',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                views: ['General'],
                formatter: $filter('multiSiteDirectionFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PROTECTED_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'SourceTypeObj',
                views: [''],
                formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.REMOTE_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'TargetTypeObj',
                views: [''],
                formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PEER_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'PeerSiteTypeObj',
                views: ['General'],
                formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PRIORITY'),
                maxWidth: 85,
                toolTip: $translate.instant('GRID_COLUMNS.PRIORITY'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'Priority',
                views: ['General'],
                formatter: $filter('enumToCssClassFormatter')('protection-group-priority')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PROTECTION_STATUS'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'StateLabel',
                views: ['General'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.ZORG'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'CustomerName',
                views: ['']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.STATE'),
                field: 'vpgState',
                views: ['General'],
                formatter: $filter('progressFormatter'),
                filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.IO'),
                toolTip: $translate.instant('GRID_COLUMNS.IO'),
                filter: zSlickGridFilterTypes.RANGE,
                field: 'IOPSObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.THROUGHPUT'),
                toolTip: $translate.instant('GRID_COLUMNS.THROUGHPUT'),
                filter: zSlickGridFilterTypes.RANGE,
                field: 'IncomingThroughputInMbObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.NETWORK'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                field: 'OutgoingBandWidthObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PROVISIONED_STORAGE'),
                toolTip: $translate.instant('GRID_COLUMNS.PROVISIONED'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                field: 'ProvisionedStorageInMBObj',
                formatter: $filter('objectFormatter'),
                views: ['Performance']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.USED_STORAGE'),
                toolTip: $translate.instant('GRID_COLUMNS.USED'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                field: 'UsedStorageInMBObj',
                views: ['Performance'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.ACTUAL_RPO'),
                toolTip: $translate.instant('GRID_COLUMNS.ACTUAL_RPO'),
                filter: zSlickGridFilterTypes.RANGE,
                field: 'ActualRPOObj',
                views: ['General'],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.LAST_TEST'),
                toolTip: $translate.instant('GRID_COLUMNS.LAST_TEST'),
                filter: zSlickGridFilterTypes.DATE,
                field: 'LastTestObj',
                views: [''],
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.RETENTION_POLICY'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'RetentionPolicyObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.BACKUP_STATUS'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'VpgBackupJobStatusObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.BACKUP_REPOSITORY'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'BackupRepository',
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.RESTORE_POINT_RANGE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'RestorePointsRangeObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.BACKUP_SCHEDULING'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'BackupRelatedDataObj',
                formatter: $filter('objectFormatter'),
                views: ['Backup']
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.OPERATION'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'stateProcess',
                views: ['General'],
                formatter: $filter('vpgOperationFormatter')
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true,
            defaultSortField: 'VirtualMachineName'
        };

        $scope.selectedItems = [];

        $scope.viewByValues = [
            {
                id: 'General',
                text: 'General'
            },
            {
                id: 'Performance',
                text: 'Performance'
            },
            {
                id: 'Backup',
                text: 'Backup'
            }
        ];

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'VirtualMachineName',
                text: $translate.instant('GROUP_BY_LIST.VM_NAME')
            },
            {
                id: 'VPGName',
                text: $translate.instant('GROUP_BY_LIST.VPG_NAME')
            },
            {
                id: 'Direction',
                text: $translate.instant('GROUP_BY_LIST.DIRECTION')
            },
            {
                id: 'SourceSiteName',
                text: $translate.instant('GROUP_BY_LIST.PROTECTED_SITE')
            },
            {
                id: 'TargetSiteName',
                text: $translate.instant('GROUP_BY_LIST.REMOTE_SITE')
            },
            {
                id: 'CustomerName',
                text: $translate.instant('GROUP_BY_LIST.ZORG_NAME')
            },
            {
                id: 'PeerSiteGroupBy',
                text: $translate.instant('GROUP_BY_LIST.PEER_SITE')
            }
        ];

        $scope.isPortal = globalStateModel.data.IsPortal;
        $scope.gridObj = {
            id: zTabsStateConstants.LIST.VMS
        };
        // ==========================================================================================================
        //                   Buttons State
        // ==========================================================================================================

        var checkActionButtonsState = function (selectedItems) {
            $scope.isUpdateVPGEnabled = vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled(selectedItems);
            $scope.isDeleteEnabled = vpgsContainerBtnStateService.checkSelectedForDeleteEnabled(selectedItems);
            $scope.isPauseEnabled = vpgsContainerBtnStateService.checkSelectedForPauseEnabled(selectedItems);
            $scope.isResumeEnabled = vpgsContainerBtnStateService.checkSelectedForResumeEnabled(selectedItems);
            $scope.isAbortBackupEnabled = vpgsContainerBtnStateService.checkSelectedForAbortBackup(selectedItems);
            $scope.isRunBackupEnabled = vpgsContainerBtnStateService.checkSelectedForRunBackup(selectedItems);
            $scope.isForceSyncEnabled = vpgsContainerBtnStateService.checkSelectedForForceSyncEnabled(selectedItems);
        };


        // ==========================================================================================================
        //                   Events Click
        // ==========================================================================================================
        var selectedStopVm;

        $scope.cellMouseEnter = function (event, row, cell, grid) {
            if (cell === grid.getColumnIndex('DirectionObj')) {
                event.preventDefault();
                event.stopPropagation();
                $compile($(event.target).closest('div'))($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        };

        $scope.rowClick = function (event, row) {
            if (event.target.value) {
                event.preventDefault();
            }

            var vm = $scope.gridObj.grid.getDataItem(row);

            switch (event.target.value) {
                case vpgsListEvents.commit:
                    commitVpgFactory.open(vm.VPGIdentifier);
                    break;
                case vpgsListEvents.stopFot:
                    stopFailoverTestFactory.stopTestByIds([vm.VPGIdentifier]);
                    break;
                case vpgsListEvents.stopBackup: {
                    selectedStopVm = $scope.gridObj.grid.getDataItem(row);
                    var title = $translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP');
                    zAlertFactory.warn(title, $translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP_WARNING'), handleStopOneBackup);
                    break;
                }
                case vpgsListEvents.stopClone: {
                    selectedStopVm = $scope.gridObj.grid.getDataItem(row);
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.CLONE'), $translate.instant('TASK_SUMMARY.CLONE_WARN'), handleAbortClone);
                    break;
                }
                case vpgsListEvents.rollback: {
                    selectedStopVm = $scope.gridObj.grid.getDataItem(row);
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.ROLLBACK'), $translate.instant('TASK_SUMMARY.ROLLBACK_WARN'), handleRollback);
                    break;
                }
                case entityEvents.editEntity: {
                    if (vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled([vm])) {
                        createVPGFactory.openEdit(vm.VPGIdentifier);
                    }
                    break;
                }
                case entityEvents.deleteEntity: {
                    if (vpgsContainerBtnStateService.checkSelectedForDeleteEnabled([vm])) {

                        zAlertFactory.warn(
                            $translate.instant('DELETE_VPG.TITLE'),
                            $translate.instant('DELETE_VPG.WARNING_MESSAGE_BEFORE_DELETE_VPG_INSTEAD_VM'),
                            function (event) {
                                if (angular.isObject(event) && event.currentTarget.id === 'MODAL.OK') {
                                    //add a check also for source due to bug 26932
                                    var isPublicCloud = vm.Entities.Target === enums.VpgEntityType.Aws || vm.Entities.Target === enums.VpgEntityType.Azure ||
                                        vm.Entities.Source === enums.VpgEntityType.Aws || vm.Entities.Source === enums.VpgEntityType.Azure;
                                    deleteVpgFactory.deleteVpgById(vm.VPGIdentifier, vm.VPGName, vm.State.ButtonsState.RequiresForceToDelete, isPublicCloud);
                                }
                            });
                    }
                    break;
                }
                default:
                    break;
            }
        };

        $scope.$on('$destroy', function () {
            vmsListModel.selectedVmsIdentity = [];
        });

        function handleRollback(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.MoveRollback(selectedStopVm.VPGIdentifier);
                selectedStopVm = {};
            }
        }

        var handleStopOneBackup = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.AbortBackups([selectedStopVm.VPGIdentifier]);
            }
        };

        $scope.handleRunBackupClick = function () {
            vpgsContainerService.runBackup($scope.selectedItems);
        };

        var handleStopBackup = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                vpgsContainerService.stopBackup($scope.selectedItems);
            }
        };

        $scope.handleStopBackupClick = function () {
            var title = $translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP');
            zAlertFactory.warn(title, $translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP_WARNING'), handleStopBackup);
        };

        var handleAbortClone = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.AbortClone(selectedStopVm.VPGIdentifier);
            }
        };

        $scope.handleResumeClick = function () {
            resumeVpgFactory.resume(_.map($scope.selectedItems, 'VPGIdentifier'));
        };

        $scope.handlePauseClick = function () {
            var title = $translate.instant('VPG_LIST.MORE_BUTTON.PAUSE');
            zAlertFactory.warn(title, $translate.instant('VPG_LIST.MORE_BUTTON.PAUSE_WARNING'), handlePauseVPGs);
        };

        var handlePauseVPGs = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                vpgsContainerService.pauseVPGs($scope.selectedItems);
            }
        };

        $scope.forceSync = function () {
            zAlertFactory.warn($translate.instant('VPG_DETAILS.FORCE_SYNC'), $translate.instant('VPG_DETAILS.FORCE_SYNC_WARNING'), handleForceSync);
        };

        function handleForceSync(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                var identifier = new vos.ProtectionGroupIdentifier($scope.selectedItems[0].VPGIdentifier.GroupGuid);
                zertoServiceFactory.ForceProtectionGroupSync(identifier);
            }
        }

        $scope.handleDeleteButtonClick = function () {
            //add a check also for source due to bug 26932
            var isPublicCloud = $scope.selectedItems[0].Entities.Target === enums.VpgEntityType.Aws || $scope.selectedItems[0].Entities.Target === enums.VpgEntityType.Azure ||
                $scope.selectedItems[0].Entities.Source === enums.VpgEntityType.Aws || $scope.selectedItems[0].Entities.Source === enums.VpgEntityType.Azure;
            deleteVpgFactory.deleteVpgById($scope.selectedItems[0].VPGIdentifier, $scope.selectedItems[0].VPGName, $scope.selectedItems[0].State.ButtonsState.RequiresForceToDelete, isPublicCloud);
        };

        $scope.handleVPGEditClick = function () {
            createVPGFactory.openEdit($scope.selectedItems[0].VPGIdentifier);
        };

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        $scope.selectedItemsChange = function () {
            checkActionButtonsState($scope.selectedItems);
            //pre select vpg by current vms for create add checkpoint window
            vmsListModel.selectedVmsIdentity = _.pluck(_.pluck($scope.selectedItems, 'VPGIdentifier'), 'GroupGuid');

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        // ==========================================================================================================
        //                 Register
        // ==========================================================================================================

        vmsListModel.register($scope).then(null, null, function (result) {
            $scope.data = result;
        });

        summaryMinimalModel.register($scope).then(null, null, function (result) {
            $scope.summaryState = result.SummaryState;
            checkActionButtonsState($scope.selectedItems);
        });
    });
