'use strict';
angular.module('zvmApp.services')
    .factory('vpgsContainerService', function ($q, $window, $translate, vpgsContainerBtnStateService, zertoServiceUpdaterFactory,
                                               zertoServiceFactory, allRecoveredVmsApiService, vpgsModel,
                                               zsspCreateVpgFactory, createVPGFactory, resumeVpgFactory, deleteVpgFactory, stopFailoverTestFactory,
                                               zAlertFactory, allRecoveryVmsOperationServiceConstants, globalStateModel, enums) {
            var vpgsContainerService = {},
                selectedVpgsIdentity = [];

            vpgsContainerService.register = function ($scope) {
                return zertoServiceUpdaterFactory.register($scope, 'GetProtectionGroupListScreen', []);
            };

            vpgsContainerService.setSelectedVPGIds = function (selectedItems) {
                selectedVpgsIdentity = _.map(selectedItems, function(item){
                    return item.Identifier.GroupGuid;
                  });
            };
            vpgsContainerService.getSelectedVPGIds = function () {
                return selectedVpgsIdentity;
            };

            vpgsContainerService.clearSelectedVPGIds = function () {
                selectedVpgsIdentity = [];
            };

            vpgsContainerService.isPortal = function () {
                return globalStateModel.data.IsPortal;
            };

            vpgsContainerService.createVPG = function () {
                if (globalStateModel.data.IsPortal) {
                    zsspCreateVpgFactory.createPortalkNewVpg();
                } else {
                    if (globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws) {
                        zAlertFactory.fail($translate.instant('ACTIONS_BUTTON.CREATE_VPG'), $translate.instant('CREATE_VPG.BLOCK_PUBLIC_CLOUD', {env: 'AWS'}));
                    } else if (globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure) {
                        zAlertFactory.fail($translate.instant('ACTIONS_BUTTON.CREATE_VPG'), $translate.instant('CREATE_VPG.BLOCK_PUBLIC_CLOUD', {env: 'Azure'}));
                    } else {
                        createVPGFactory.openCreate();
                    }
                }
            };

            vpgsContainerService.export = function () {
                $window.open('/ZvmService/VpgList/GetVpgTextSummary');
            };

            vpgsContainerService.editVPG = function (identifier) {
                createVPGFactory.openEdit(identifier);
            };

            vpgsContainerService.pauseVPGs = function (selectedItems) {
                zAlertFactory.warn($translate.instant('VPG_LIST.MORE_BUTTON.PAUSE'),
                    $translate.instant('VPG_LIST.MORE_BUTTON.PAUSE_WARNING'),
                    vpgsContainerService.responsePauseVPGS.bind(null, selectedItems));
            };

            vpgsContainerService.responsePauseVPGS = function (selectedItems, event) {
                if (event.target.name === zAlertFactory.buttons.OK) {
                    var coll = vpgsContainerService.getProtectionGroupIdentifier(selectedItems);
                    zertoServiceFactory.PauseProtectionGroups(coll);
                }
            };

            vpgsContainerService.forceSync = function (identifier) {
                zAlertFactory.warn($translate.instant('VPG_DETAILS.FORCE_SYNC'),
                    $translate.instant('VPG_DETAILS.FORCE_SYNC_WARNING'),
                    vpgsContainerService.handleForceSync.bind(null, identifier));
            };

            vpgsContainerService.handleForceSync = function (identifier, event) {
                if (event.target.name === zAlertFactory.buttons.OK) {
                    zertoServiceFactory.ForceProtectionGroupSync(identifier);
                }
            };


            vpgsContainerService.resumeVPGs = function (selectedItems) {
                var identifiers = vpgsContainerService.getProtectionGroupIdentifier(selectedItems);
                resumeVpgFactory.resume(identifiers);
            };

            vpgsContainerService.stopBackup = function (selectedItems) {
                zAlertFactory.warn($translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP'), $translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP_WARNING'), function (event) {
                    if (event.target.name === zAlertFactory.buttons.OK) {
                        var identifiers = vpgsContainerService.getProtectionGroupIdentifier(selectedItems);
                        zertoServiceFactory.AbortBackups(identifiers);
                    }
                });
            };

            vpgsContainerService.runBackup = function (selectedItems) {
                zAlertFactory.warn($translate.instant('VPG_LIST.MORE_BUTTON.RUN_BACKUP'), $translate.instant('VPG_LIST.MORE_BUTTON.RUN_BACKUP_WARNING'), function (event) {
                    if (event.target.name === zAlertFactory.buttons.OK) {
                        var identifiers = vpgsContainerService.getProtectionGroupIdentifier(selectedItems);
                        vpgsContainerService.ensureThatAllVmsRecoveredInBackupProcess(selectedItems, identifiers[0]).then(function () {
                            zertoServiceFactory.BackupProtectionGroups(identifiers);
                        });
                    }
                });
            };

            vpgsContainerService.deleteVPG = function (selectedItem) {
                //add a check also for source due to bug 26932
                var isPublicCloud = selectedItem.Entities.Target === enums.VpgEntityType.Aws || selectedItem.Entities.Target === enums.VpgEntityType.Azure ||
                    selectedItem.Entities.Source === enums.VpgEntityType.Aws || selectedItem.Entities.Source === enums.VpgEntityType.Azure;
                deleteVpgFactory.deleteVpgById(selectedItem.Identifier, selectedItem.Name, selectedItem.State.ButtonsState.RequiresForceToDelete, isPublicCloud);
            };

            vpgsContainerService.stopFailOverTest = function (selectedItems) {
                var identifiers = vpgsContainerService.getProtectionGroupIdentifier(selectedItems);
                stopFailoverTestFactory.stopTestByIds(identifiers);
            };

            vpgsContainerService.getGroupByValues = function () {
                return vpgsModel.getGroupByValues();
            };

            vpgsContainerService.checkActionButtonsState = function (items) {
                var selectedIds, selectedItems, btnState = {};

                selectedIds = vpgsContainerService.getSelectedVPGIds();
                selectedItems = _.filter(items, function (item) {
                    return _.contains(selectedIds, item.id);
                });

                btnState.isUpdateVPGEnabled = vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled(selectedItems);
                btnState.isDeleteEnabled = vpgsContainerBtnStateService.checkSelectedForDeleteEnabled(selectedItems);
                btnState.isPauseEnabled = vpgsContainerBtnStateService.checkSelectedForPauseEnabled(selectedItems);
                btnState.isResumeEnabled = vpgsContainerBtnStateService.checkSelectedForResumeEnabled(selectedItems);
                btnState.isRunBackupEnabled = vpgsContainerBtnStateService.checkSelectedForRunBackup(selectedItems);
                btnState.isAbortBackupEnabled = vpgsContainerBtnStateService.checkSelectedForAbortBackup(selectedItems);
                btnState.isStopFotEnabled = vpgsContainerBtnStateService.checkSelectedForStopFot(selectedItems);
                btnState.isForceSyncEnabled = vpgsContainerBtnStateService.checkSelectedForForceSyncEnabled(selectedItems);

                return btnState;
            };

            vpgsContainerService.getProtectionGroupIdentifier = function (selectedItems) {
                var result = [];
                _.forEach(selectedItems, function (item) {
                    result.push(item.Identifier || item.VPGIdentifier || item.ProtectionGroupId);
                });
                return result;
            };

            vpgsContainerService.ensureThatAllVmsRecoveredInBackupProcess = function (vpgConfiguration, vpgIdentifier) {
                //todo remove after BE fix Zssp rest api issue
                if (globalStateModel.data.IsPortal) {
                    return;
                }

                var recoveredVmsDefer = $q.defer();

                var vpg = vpgConfiguration[0].VpgConfiguration || vpgConfiguration[0];

                allRecoveredVmsApiService.sureAllVmsRecoveredPerOneVpg(vpgIdentifier, vpg.Name, allRecoveryVmsOperationServiceConstants.restored).then(function (warningInfo) {
                    if (!_.isEmpty(warningInfo)) {
                        zAlertFactory.warn(allRecoveryVmsOperationServiceConstants.heading, warningInfo, function (event) {
                            if (event.target.name === 'MODAL.CANCEL') {
                                recoveredVmsDefer.reject();
                            }
                        });
                    }
                    recoveredVmsDefer.resolve();
                });

                return recoveredVmsDefer.promise;
            };

            return vpgsContainerService;
        }
    );
