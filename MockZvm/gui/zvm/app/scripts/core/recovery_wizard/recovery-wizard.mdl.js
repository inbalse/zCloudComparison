'use strict';

angular.module('zvmApp.core')
    .factory('recoveryWizardModel', function ($q, zertoServiceFactory, vpgsProgressService, $filter, $translate, enums, failoverShutdownAction, vpgsContainerService,
                                              $stateParams, policiesConstants, vmsListModel, zAlertFactory, zertoLoggerServiceFactory) {
        var recoveryWizardModel = {};

        recoveryWizardModel.RecoveryItemVO = function () {
            this.useReverseProtection = false;
            this.isBackupInProgress = false;
            this.vpgInfo = null;
            this.reverseLabel = '';
        };

        recoveryWizardModel.CreateScriptObj = function (useScripts) {
            this.value = useScripts || false;
        };

        recoveryWizardModel.CreateBootOrderObj = function (bootOrder) {
            this.value = bootOrder ? true : false;
        };

        recoveryWizardModel.CreateForceShutdownObj = function (isForceShutdown) {
            this.value = isForceShutdown || false;//for move operation
        };

        recoveryWizardModel.CreateKeepSourceVmsObj = function (isKeepSourceVms, item) {
            var state = item.recoveryItemVo.useReverseProtection;

            this.value = item.IsKeepSourceVMsAllowed ? isKeepSourceVms || false : false;
            this.isDisabled = item.IsKeepSourceVMsAllowed ? state : true;
            this.infoMessage = item.IsKeepSourceVMsAllowed ?
                $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.GRAYED_OUT_REVERSE_PROTECT_INFO') :
                $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.GRAYED_OUT_BC_INFO');

            this.setKeepSourceVmsState = function (state, item) {
                if (item.IsKeepSourceVMsAllowed) {
                    this.isDisabled = state;
                    this.value = state ? false : this.value;
                }
            };
        };

        recoveryWizardModel.CreateShutdownActionObj = function (shutdownAction) {
            this.value = shutdownAction || '';
        };

        recoveryWizardModel.CreateCommitPolicyObj = function (commitPolicy, defaultAction, defaultTimeout) {
            this.commitPolicy = angular.isDefined(commitPolicy) ? commitPolicy : '';
            this.filterValue = angular.isDefined(commitPolicy) ? commitPolicy : '';
            this.defaultAction = angular.isDefined(defaultAction) ? defaultAction : enums.MoveNextAction.None;
            this.defaultTimeout = angular.isDefined(defaultTimeout) ? defaultTimeout : 0;

            this.setDefaultAction = function (defaultAction) {
                this.defaultAction = angular.isDefined(defaultAction) ? defaultAction : enums.MoveNextAction.None;
            };

            this.setDefaultTimeout = function (defaultTimeout) {
                this.defaultTimeout = angular.isDefined(defaultTimeout) ? defaultTimeout : 0;
            };
        };

        recoveryWizardModel.CreateCheckpointObj = function (checkpoint, lastCheckpoint, filterValue) {
            this.checkpoint = checkpoint || '';
            this.lastCheckpoint = lastCheckpoint || null;
            this.filterValue = filterValue || '';
        };

        recoveryWizardModel.isChecksVmsRecoveredInProgress = false;
        recoveryWizardModel.isChecksHasNoSharedVmsInProgress = false;

        recoveryWizardModel.recoveryType = enums.RecoveryType.Failover;

        recoveryWizardModel.initPromise = null;

        recoveryWizardModel.addAllowedPropToVpg = function (protectionGroups, vpgsValidForKeepSourceVMs) {
            var ids = _.pluck(vpgsValidForKeepSourceVMs, 'GroupGuid');

            _.each(protectionGroups, function (vpg) {
                vpg.IsKeepSourceVMsAllowed = _.contains(ids, vpg.Identifier.GroupGuid);
            });

            return protectionGroups;
        };

        recoveryWizardModel.getVpgIdentifierBulkValidationForKeepSourceVMs = function (protectionGroups) {
            var vpgsIdentifier = _.pluck(protectionGroups, 'Identifier'),
                deferred = $q.defer();

            zertoServiceFactory.GetValidVpgsForKeepSourceVMs(vpgsIdentifier).then(function (vpgsValidForKeepSourceVMs) {
                recoveryWizardModel.addAllowedPropToVpg(protectionGroups, vpgsValidForKeepSourceVMs);
                deferred.resolve(protectionGroups);

            }, function (error) {
                zertoLoggerServiceFactory.logError('GetValidVpgsForKeepSourceVMs', vpgsIdentifier, error);
                deferred.reject(error);
            });

            return deferred.promise;
        };


        recoveryWizardModel.validationForKeepSourceVMsSuccess = function (protectionGroups) {
            recoveryWizardModel.data.vpgs = protectionGroups;
            var processed = recoveryWizardModel.data.vpgs;
            var index = 0;
            var preSelected = [];

            processed = _.forEach(processed, function (item) {
                item.vpgState = vpgsProgressService.convertStateData(item);
                item.id = index;
                item.vpgName = item.Name + ' (' + item.NumberOfVms + ')';

                item.PeerSiteTypeObj = item.Direction === enums.ProtectionGroupStateVisual.Protected ?
                {display: item.TargetSiteName, filterValue: item.TargetSiteName, value: item.Entities.Target} :
                {display: item.SourceSiteName, filterValue: item.SourceSiteName, value: item.Entities.Source};

                item.LocalSiteTypeObj = item.Direction === enums.ProtectionGroupStateVisual.Protected ?
                {display: item.SourceSiteName, filterValue: item.SourceSiteName, value: item.Entities.Source} :
                {display: item.TargetSiteName, filterValue: item.TargetSiteName, value: item.Entities.Target};

                item.StateLabel = item.State ? {
                    display: $filter('vpgVisualStatusEmun')(item.State.Status),
                    value: item.State.Status
                } : {display: '', value: ''};

                item.recoveryItemVo = new recoveryWizardModel.RecoveryItemVO();
                item.checkpointObj = new recoveryWizardModel.CreateCheckpointObj();
                item.commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj();

                //check if vpg been selected in vpgs-list or open from vpg details and pre select them
                var selectedVPGs = vpgsContainerService.getSelectedVPGIds();
                if (!_.isEmpty(selectedVPGs)) {
                    if (_.contains(selectedVPGs, item.Identifier.GroupGuid)) {
                        preSelected.push(item);
                    }
                } else if (angular.isDefined(vmsListModel.selectedVmsIdentity) && vmsListModel.selectedVmsIdentity.length !== 0) {
                    if (_.contains(vmsListModel.selectedVmsIdentity, item.Identifier.GroupGuid)) {
                        preSelected.push(item);
                    }
                } else {
                    if (angular.isDefined($stateParams.id) && $stateParams.id === item.Identifier.GroupGuid) {
                        preSelected.push(item);
                    }
                }

                index++;
            });

            recoveryWizardModel.data.vpgs = processed;
            recoveryWizardModel.data.selectedVpgs = preSelected;
            recoveryWizardModel.initPromise.resolve();
        };

        recoveryWizardModel.handleVpgListScreen = function (protectionGroups) {
            if (protectionGroups.length === 0) {
                var warninig = $translate.instant('RECOVERY_WIZARD.FAILOVER_LIVE_PERMISSION_FAILED');
                if (recoveryWizardModel.recoveryType === enums.RecoveryType.FailoverTest) {
                    warninig = $translate.instant('RECOVERY_WIZARD.FAILOVER_TEST_PERMISSION_FAILED');
                } else if (recoveryWizardModel.recoveryType === enums.RecoveryType.Move) {
                    warninig = $translate.instant('RECOVERY_WIZARD.FAILOVER_MOVE_PERMISSION_FAILED');
                }

                zAlertFactory.fail(warninig);

            } else {
                if(recoveryWizardModel.recoveryType === enums.RecoveryType.Move){
                    recoveryWizardModel.getVpgIdentifierBulkValidationForKeepSourceVMs(protectionGroups).then(recoveryWizardModel.validationForKeepSourceVMsSuccess);
                }else{
                    recoveryWizardModel.validationForKeepSourceVMsSuccess(protectionGroups);
                }
            }
        };

        recoveryWizardModel.init = function () {
            recoveryWizardModel.initPromise = $q.defer();
            recoveryWizardModel.data = {selectedVpgs: []};
            var protectionGroups;

            zertoServiceFactory.GetProtectionGroupListScreen().then(function (result) {
                //first check if permission allowed and vpg state
                protectionGroups = checkVpgsState(result.ProtectionGroups);
                recoveryWizardModel.handleVpgListScreen(protectionGroups);
            });

            return recoveryWizardModel.initPromise.promise;
        };

        recoveryWizardModel._checkSelectedNotContainCheckpoint = function () {
            return _.find(recoveryWizardModel.data.selectedVpgs, function (vpg) {
                if (!vpg.checkpointObj.lastCheckpoint) {
                    return true;
                }
            });
        };

        recoveryWizardModel.createRecoveryItemVO = function (reverseResult) {
            var deferred = $q.defer();
            //if not first loading and there is already configured data

            if ((recoveryWizardModel.recoveryType === enums.RecoveryType.Failover || recoveryWizardModel.recoveryType === enums.RecoveryType.FailoverTest) &&
                (!recoveryWizardModel._checkSelectedNotContainCheckpoint())) {
                //don't change
                deferred.resolve(recoveryWizardModel.data.selectedVpgs);
                return deferred.promise;
            }

            var defaultAction = enums.MoveNextAction.None;
            var defaultTimeout = 0;
            zertoServiceFactory.GetAdvancedSiteSettings().then(function (result) {
                if (result.MoveCommitWaitInSec >= 0 && result.MoveCommitWaitInSec <= policiesConstants.MAX_STAGED_ACTION_TIMEOUT_SECONDS) {
                    defaultAction = enums.MoveNextAction.Commit;
                    defaultTimeout = result.MoveCommitWaitInSec;
                } else if (result.MoveRollbackWaitInSec >= 0 && result.MoveRollbackWaitInSec <= policiesConstants.MAX_STAGED_ACTION_TIMEOUT_SECONDS) {
                    defaultAction = enums.MoveNextAction.Rollback;
                    defaultTimeout = result.MoveRollbackWaitInSec;
                } else {
                    defaultTimeout = 0;
                    defaultAction = enums.MoveNextAction.None;
                }

                var processed = recoveryWizardModel.data.selectedVpgs;
                var counter = recoveryWizardModel.data.selectedVpgs.length;

                processed = _.forEach(processed, function (item) {
                    if (!item.init) {
                        item.init = true;

                        item.recoveryItemVo = new recoveryWizardModel.RecoveryItemVO();
                        item.commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj();

                        item.recoveryItemVo.IsProtectedSiteConnected = item.State.IsProtectedSiteConnected;
                        item.recoveryItemVo.targetType = item.Entities.Target;

                        if (recoveryWizardModel.recoveryType === enums.RecoveryType.Failover || recoveryWizardModel.recoveryType === enums.RecoveryType.FailoverTest) {
                            zertoServiceFactory.GetLatestCheckpoint(item.Identifier).then(function (result) {

                                if (result) {
                                    item.checkpointObj = new recoveryWizardModel.CreateCheckpointObj($filter('date')(result.TimeStamp, 'dd/MM/yyyy HH:mm:ss'), result, result.TimeStamp);
                                } else {
                                    var emptyCp = $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.NO_CHECKPOINTS');
                                    item.checkpointObj = new recoveryWizardModel.CreateCheckpointObj(emptyCp, result, emptyCp);
                                }

                                recoveryWizardModel.initRecoveryItemVoData(item, defaultAction, defaultTimeout);

                                counter--;
                                if (counter <= 0) {
                                    deferred.resolve(processed);
                                }
                            }, function (error) {
                                deferred.reject(error);
                            });
                        } else {
                            var reverseVpgSettings = _.find(reverseResult, function (vpg) {
                                if (vpg.ManageVpgInfo.ProtectionGroupId.GroupGuid === item.Identifier.GroupGuid) {
                                    return true;
                                }
                            });

                            recoveryWizardModel.initRecoveryItemVoData(item, defaultAction, defaultTimeout);
                            if (reverseVpgSettings) {
                                recoveryWizardModel.initReverseItem(item, reverseVpgSettings);
                            }
                            deferred.resolve(processed);
                        }
                    } else {
                        counter--;
                        if (counter <= 0) {
                            deferred.resolve(processed);
                        }
                    }
                });

            });
            return deferred.promise;
        };

        recoveryWizardModel.initReverseItem = function (item, reverseVpgSettings) {
            //useReverseProtection will disable edit reverse configuration
            //when IsComplete is false, there is missing configuration and user should edit reverse configuration
            item.recoveryItemVo.useReverseProtection = (item.Entities.Target !== enums.VpgEntityType.Aws) && (reverseVpgSettings.IsComplete);
            item.recoveryItemVo.reverseLabel = reverseVpgSettings.IsComplete ? $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR') :
                $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_MISSING');
            item.recoveryItemVo.vpgInfo = reverseVpgSettings;
        };

        recoveryWizardModel.setCommitPolicyDisplay = function (item) {
            item.commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj($translate.instant('ENUM.MOVE_NEXT_ACTION.' + item.commitPolicyObj.defaultAction), item.commitPolicyObj.defaultAction, item.commitPolicyObj.defaultTimeout);
            if (item.commitPolicyObj.defaultTimeout > 0 && item.commitPolicyObj.defaultAction !== enums.MoveNextAction.None) {
                item.commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj($translate.instant('ENUM.MOVE_NEXT_ACTION.' + item.commitPolicyObj.defaultAction) + ', ' +
                    (item.commitPolicyObj.defaultTimeout) / 60 + ' ' + $translate.instant('METRICS.MIN'), item.commitPolicyObj.defaultAction, item.commitPolicyObj.defaultTimeout);
            }
        };

        recoveryWizardModel.initRecoveryItemVoData = function (item, defaultAction, defaultTimeout) {
            item.commitPolicyObj.setDefaultAction(defaultAction);
            item.commitPolicyObj.setDefaultTimeout(defaultTimeout);

            recoveryWizardModel.setCommitPolicyDisplay(item);

            item.recoveryItemVo.useReverseProtection = false;
            item.bootOrderObj = new recoveryWizardModel.CreateBootOrderObj(item.BootOrder);
            item.scriptObj = new recoveryWizardModel.CreateScriptObj(!!item.AreScriptsDefined);
            item.shutdownActionObj = new recoveryWizardModel.CreateShutdownActionObj(failoverShutdownAction.NO_SHUTDOWN);
            item.forceShutdownObj = new recoveryWizardModel.CreateForceShutdownObj(false);
            item.keepSourceVmsObj = new recoveryWizardModel.CreateKeepSourceVmsObj(false, item);
            item.recoveryItemVo.isBackupInProgress = item.State.ActiveProcesses && item.State.ActiveProcesses.RunningBackup;
        };

        recoveryWizardModel.reselectReverse = function (data) {
            var deferred = $q.defer();
            var unReversedVpgs = [];

            //find just reverse available vpg
            var gridData = _.filter(data, function (vpg) {
                return vpg.State.IsProtectedSiteConnected &&
                    vpg.Entities.Target !== enums.VpgEntityType.Aws && // Public Cloud doesn't support reverse protection yet
                    vpg.Entities.Target !== enums.VpgEntityType.Azure; // TODO: In Balvenie Azure might use reverse protection
            });

            var vpgsMissingConfig = [];
            _.forEach(gridData, function (vpg) {
                if (!vpg.recoveryItemVo.useReverseProtection) {
                    unReversedVpgs.push(vpg);
                    vpg.recoveryItemVo.useReverseProtection = vpg.Entities.Target !== enums.VpgEntityType.Aws;
                    if (!vpg.recoveryItemVo.vpgInfo) {
                        vpgsMissingConfig.push(vpg.Identifier);
                    }
                }
            });

            if (unReversedVpgs.length === 0) {
                _.forEach(gridData, function (vpg) {
                    vpg.recoveryItemVo.useReverseProtection = false;
                });
            }

            if (vpgsMissingConfig.length > 0) {
                zertoServiceFactory.GetBulkReverseReplicationSettings(vpgsMissingConfig).then(function (reverseResult) {

                    _.forEach(unReversedVpgs, function (vpg) {
                        var reverseVpgSettings = _.find(reverseResult, function (item) {
                            if (item.ManageVpgInfo.ProtectionGroupId.GroupGuid === vpg.Identifier.GroupGuid) {
                                return true;
                            }
                        });

                        if (reverseVpgSettings) {
                            vpg.recoveryItemVo.reverseLabel = reverseVpgSettings.IsComplete ?
                                $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR') : $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_MISSING');
                            vpg.recoveryItemVo.vpgInfo = reverseVpgSettings;
                        }
                    });
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        };

        var checkVpgsState = function (vpgsCollection) {
            var vpgsStateEnableCollection = [];

            switch (recoveryWizardModel.recoveryType) {
                case enums.RecoveryType.Failover:
                    vpgsStateEnableCollection = _.filter(vpgsCollection, function (item) {
                        return item.State.IsFailoverEnabled;
                    });
                    break;
                case enums.RecoveryType.FailoverTest:
                    vpgsStateEnableCollection = _.filter(vpgsCollection, function (item) {
                        return item.State.IsFailoverTestEnabled;
                    });
                    break;
                case enums.RecoveryType.Move:
                    vpgsStateEnableCollection = _.filter(vpgsCollection, function (item) {
                        return item.State.IsMoveEnabled;
                    });
                    break;
            }
            return vpgsStateEnableCollection;
        };

        recoveryWizardModel.saveCommitPolicy = function (bulkVpg, vpgs, selectedVpgs) {
            _.forEach(selectedVpgs, function (selectedVpg) {
                var changeVpg = _.find(vpgs, function (vpg) {
                    return vpg.Identifier === selectedVpg.Identifier;
                });
                if (changeVpg) {
                    changeVpg.commitPolicyObj.defaultAction = bulkVpg.commitPolicyObj.defaultAction;
                    changeVpg.commitPolicyObj.defaultTimeout = bulkVpg.commitPolicyObj.defaultTimeout;
                    recoveryWizardModel.setCommitPolicyDisplay(changeVpg);
                }
            });
        };

        recoveryWizardModel.applyForceShutdown = function (item, state) {
            item.forceShutdownObj = new recoveryWizardModel.CreateForceShutdownObj(state);
        };

        recoveryWizardModel.applyKeepSourceVms = function (item, state) {
            item.keepSourceVmsObj = new recoveryWizardModel.CreateKeepSourceVmsObj(state, item);
        };

        /**********************************
         * Steps Validations
         * */
        recoveryWizardModel.validateSelectVpgs = function (step) {
            var result = true;
            var selected = recoveryWizardModel.data.selectedVpgs;
            if (!selected || selected.length === 0) {
                result = false;
            }
            step.isEnabled = result;
            return result;
        };

        recoveryWizardModel.validateExecutionParameters = function (step) {
            if (recoveryWizardModel.isChecksVmsRecoveredInProgress || recoveryWizardModel.isChecksHasNoSharedVmsInProgress) {
                step.isEnabled = false;
                return false;
            }

            var result = true;
            var selected = recoveryWizardModel.data.selectedVpgs;
            if (!selected || selected.length === 0) {
                result = false;
            }

            _.forEach(recoveryWizardModel.data.selectedVpgs, function (vpg) {
                if (vpg.recoveryItemVo.useReverseProtection && (!vpg.recoveryItemVo.vpgInfo ||
                    vpg.recoveryItemVo.reverseLabel !== $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR') || !vpg.recoveryItemVo.vpgInfo.IsComplete)) {
                    step.validationError = $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.ERROR_MISSING');
                    result = false;
                }
                if ((recoveryWizardModel.recoveryType === enums.RecoveryType.Failover || recoveryWizardModel.recoveryType === enums.RecoveryType.Move) &&
                    vpg.commitPolicyObj.defaultAction === enums.MoveNextAction.Rollback && vpg.commitPolicyObj.defaultTimeout < 600) {
                    result = false;
                    step.validationError = $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.ERROR_ROLLBACK');
                }
            });

            step.isEnabled = result;
            return result;
        };

        recoveryWizardModel.validateSummary = function (step) {
            var result = true;
            var selected = recoveryWizardModel.data.selectedVpgs;
            if (!selected || selected.length === 0) {
                result = false;
                //todo need create better validation
                //work around validation check if user visit middle tab
            } else if (recoveryWizardModel.recoveryType !== enums.RecoveryType.Move && selected[0].checkpointObj.lastCheckpoint === null) {
                result = false;
            }

            step.isEnabled = result;
            return result;
        };

        recoveryWizardModel.actualSteps = null;

        recoveryWizardModel.getSteps = function (type) {
            //TODO: this should be used to change the steps based on the type of the operation. failover and test might have different steps
            recoveryWizardModel.recoveryType = type;

            recoveryWizardModel.actualSteps = angular.copy(recoveryWizardModel.steps);

            if (recoveryWizardModel.recoveryType === enums.RecoveryType.Move) {
                recoveryWizardModel.actualSteps[2].stepTitle = 'MOVE';
            }

            return recoveryWizardModel.actualSteps;
        };

        recoveryWizardModel.invalidateAllSteps = function () {
            _.forEach(recoveryWizardModel.actualSteps, function (step) {
                step.isValid(step);
            });
        };

        /**********************************
         * Steps
         * */
        recoveryWizardModel.steps = [
            {
                class: '',
                isEnabled: false,
                stateIcon: '',
                id: 'SELECT_VPGs',
                stepTitle: 'SELECT VPGs',
                template: '<ng-include src="\'scripts/core/recovery_wizard/steps/recovery-select-vpgs.html\'"></ng-include>',
                isValid: recoveryWizardModel.validateSelectVpgs,
                validationError: $translate.instant('RECOVERY_WIZARD.VPG_LIST_ERROR')
            },
            {
                class: '',
                isEnabled: false,
                stateIcon: '',
                id: 'EXECUTION_PARAMETERS',
                stepTitle: 'EXECUTION PARAMETERS',
                template: '<ng-include src="\'scripts/core/recovery_wizard/steps/recovery-execution-parameters.html\'"></ng-include>',
                isValid: recoveryWizardModel.validateExecutionParameters
            },
            {
                class: '',
                isEnabled: false,
                stateIcon: '',
                id: 'FAILOVER',
                stepTitle: 'FAILOVER',
                template: '<ng-include src="\'scripts/core/recovery_wizard/steps/recovery-summary.html\'"></ng-include>',
                isValid: recoveryWizardModel.validateSummary
            }
        ];

        return recoveryWizardModel;
    });
