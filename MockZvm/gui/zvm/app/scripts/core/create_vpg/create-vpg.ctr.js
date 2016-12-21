'use strict';

angular.module('zvmApp.core')
    .controller('createVPGController', function ($scope, $state, createVPGFactory, zExceptionParser, guiVisibleException, createVpgUserActions,
                                                 zAlertFactory, steps, createVPGModel, title, $translate, vpgService, enums, globalStateModel,
                                                 analyticsEventsTypes, vmsService, networksService, storageService) {
        //===========================================================================
        // handle user interaction with the modal/wizard (external buttons)
        //===========================================================================
        $scope.currentStep = '';
        $scope.originalSteps = [];
        $scope.title = title;
        $scope.doneEnabled = false;
        $scope.busy = false;
        $scope.steps = steps;

        var SAVE_ANYWAY = 'SAVE ANYWAY';
        var ZORG_BUTTONS = ['NO', 'SAVE ANYWAY'];

        $scope._closeHandler = function () {
            createVPGFactory.dismissModal();
        };

        $scope._handleDoneClick = function () {
            $scope.doneEnabled = false;
            //boot group empty
            if (!createVPGModel.isSourceVcd() && createVPGModel.hasEmptyBootGroups()) {
                zAlertFactory.warn(null, $translate.instant('CREATE_VPG.EMPTY_BOOTGROUP_WARNING'), function (event) {
                    if (event.target.name === zAlertFactory.buttons.OK) {
                        $scope._sendCreateOrUpdate();
                    }
                    else {
                        $scope.doneEnabled = true;
                    }
                }, [zAlertFactory.buttons.OK, zAlertFactory.buttons.CANCEL]);
            } else {
                $scope._sendCreateOrUpdate();
            }
        };

        $scope._sendCreateOrUpdate = function () {
            if (createVPGModel.isInEditMode() && !createVPGModel.isReverse()) {
                createVPGModel.sendUpdateVPG().then(function () {

                    //send event to Google Analytics - (false - Edit VPG)
                    var vpgIdentifier = vpgService.getProtectionGroupId();
                    sendVpgNewOrEditToAnalytics(false, vpgIdentifier.GroupGuid);

                    createVPGFactory.closeModal();
                }, $scope._handleFailedEdit);

            }
            else if (createVPGModel.isZssp()) {
                if (createVPGModel.isReverse()) {
                    createVPGFactory.closeModal(createVPGModel.data.defaultVpgSettings);
                } else {
                    createVPGModel.sendCreateVPG().then(function (result) {
                        createVPGFactory.closeModal();
                        //redirect to vpg details
                        $state.go('main.vpg_details', {id: result.GroupGuid});
                    }, $scope._handleFailedCreate);
                }

            }
            else if (createVPGModel.isReverse()) {
                createVPGFactory.closeModal(createVPGModel.data.defaultVpgSettings);
            }
            else {
                createVPGModel.sendCreateVPG().then(function (result) {

                    //send event to Google Analytics - (true - new VPG)
                    sendVpgNewOrEditToAnalytics(true, result.GroupGuid);
                    sendVpgVmsDetailsToAnalytics();

                    createVPGFactory.closeModal();
                    if (!globalStateModel.isIframe) { //in zcm it shouldnt go to vpg details
                        //redirect to vpg details
                        $state.go('main.vpg_details', {id: result.GroupGuid});
                    }
                }, $scope._handleFailedCreate);
            }
        };

        $scope._handleFailedCreate = function (reason) {
            if (reason) {
                if (zExceptionParser.faultCodeIs(reason, guiVisibleException.FAULT_CODE_NO_ZORG) ||
                    zExceptionParser.exceptionIs(reason, guiVisibleException.VPG_OUTSIDE_OF_ZORG)) {
                    zAlertFactory.warn('Warning', reason.faultString, function (event) {
                        if (event.target.name === SAVE_ANYWAY) {
                            createVPGModel.getCreateValidationFlags().DoZertoOrganizationValidation = false;
                            $scope._handleDoneClick();
                        }

                        $scope.doneEnabled = true;
                    }, ZORG_BUTTONS);
                } else {
                    zAlertFactory.fail('Error', reason.faultString, null);
                    $scope.doneEnabled = true;
                }
            }
        };

        $scope._handleFailedEdit = function (reason) {
            if (reason) {
                if (zExceptionParser.faultCodeIs(reason, guiVisibleException.FAULT_CODE_NO_ZORG) ||
                    zExceptionParser.exceptionIs(reason, guiVisibleException.VPG_OUTSIDE_OF_ZORG)) {
                    zAlertFactory.warn('Warning', reason.faultString, function (event) {
                        if (event.target.name === SAVE_ANYWAY) {
                            createVPGModel.getEditValidationFlags().DoZertoOrganizationValidation = false;
                            $scope._handleDoneClick();
                        }
                    }, ZORG_BUTTONS);
                } else if (zExceptionParser.exceptionIs(reason, guiVisibleException.VPG_UPDATE_WILL_MIGRATE)) {
                    zAlertFactory.warn('Warning', reason.faultString, function (event) {
                        if (event.target.name === zAlertFactory.buttons.OK) {
                            createVPGModel.getEditValidationFlags().AllowChangeDatastore = true;
                            $scope._handleDoneClick();
                        }
                    });
                } else if (zExceptionParser.exceptionIs(reason, 'Warning:')) {//one to many bug26134
                    zAlertFactory.warn('Warning', reason.faultString, function (event) {
                        if (event.target.name === zAlertFactory.buttons.OK) {
                            createVPGModel.getEditValidationFlags().IgnoreReverseReplicationWarning = true;
                            $scope._handleDoneClick();
                        }
                    });
                } else if (zExceptionParser.exceptionIs(reason, guiVisibleException.VPG_UPDATE_WILL_LOSE_HISTORY)) {
                    zAlertFactory.warn('Warning', reason.faultString, function (event) {
                        if (event.target.name === zAlertFactory.buttons.OK) {
                            createVPGModel.getEditValidationFlags().ReprotectInsteadOfChangeDatastore = true;
                            $scope._handleDoneClick();
                        }
                    });
                } else if (reason === createVpgUserActions.REMOVE_VM_WARNING_DIALOG_CANCELED) {
                    $scope._handleDoneButtonState();
                } else {
                    zAlertFactory.fail('Error', reason.faultString, null);
                    $scope.doneEnabled = true;
                }
            }
        };

        $scope._handleStepChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            $scope.currentStep = globalStateModel.data.IsPortal ? 'ZSSP_NEW_VPG' : newValue.targetScope.currentStep.stepTitle;
            $scope.doneEnabled = $scope._isDoneEnabled();
        };

        $scope._preHandelNextButton = function () {
            var name = vpgService.getVpgName();

            if ($scope.vpgName !== name) {
                $scope.vpgName = ': ' + name;
            }
        };

        $scope._handleDoneButtonState = function () {
            $scope.doneEnabled = $scope._isDoneEnabled();
        };
        $scope._isDoneEnabled = function () {
            if (!$scope.steps) {
                return false;
            }

            var result = true;
            _.forEach($scope.steps, function (step) {
                if (!step.isValid(step, false)) {
                    result = false;
                }
            });
            return result;
        };
        $scope._onBusy = function () {
            $scope.busy = true;
        };
        $scope._onFree = function () {
            $scope.busy = false;
        };

        $scope.removePublicCloudSteps = function () {
            $scope.originalSteps = angular.copy($scope.steps);

            var nicsIndex = _.findIndex($scope.steps, {stepTitle: $translate.instant('CREATE_VPG.STEP_NICS')});
            $scope.steps.splice(nicsIndex, 1);
        };

        $scope.restoreSteps = function () {
            if ($scope.originalSteps.length > 0) {
                $scope.steps = $scope.originalSteps;
                $scope.$broadcast('wizard:updateCurrentStepReference', $scope.currentStep);
            }
        };

        //Watchers
        $scope.$on('wizard:NextButtonFailedEvent', $scope._handleDoneButtonState);
        $scope.$on('wizard:StepChanged', $scope._handleStepChanged);
        $scope.$on('wizard:PreHandelNextButtonClickEvent', $scope._preHandelNextButton);
        $scope.$on('wizard:DoneButtonClick', $scope._handleDoneClick);
        $scope.$on('wizard:CancelButtonClick', $scope._closeHandler);

        //GA
        function sendVpgNewOrEditToAnalytics(isNewVpg, vpgGuid) {
            var eventName = isNewVpg ? analyticsEventsTypes.VPGS.NEW_VPG.SEND : analyticsEventsTypes.VPGS.EDIT_VPG.SEND,
                scriptSettings = vpgService.getScriptingSettings(),
                backupSettings = storageService.getConfigurationBackup(),
                journalHistoryInMinutes = storageService.getJournalLengthInMinutes(),
                targetRpoInSeconds = storageService.getRPOThresholdInSeconds(),
                isBackupEnabled = storageService.getIsBackupEnabled(),
                gaEventData = {};

            try {
                gaEventData.numberOfVms = vmsService.getSelectedVms().length;
                gaEventData.wanCompressionEnabled = networksService.getWanCompression();
                gaEventData.storageProvision = vpgService.getTotalProvisionedSpace();
                gaEventData.isPreConfigScript = !_.isNullOrUndefined(scriptSettings.PreRecoveryScript.Command);
                gaEventData.isPostConfigScript = !_.isNullOrUndefined(scriptSettings.PostRecoveryScript.Command);
                gaEventData.journalHistoryInMinutes = journalHistoryInMinutes;
                gaEventData.targetRpoInSeconds = targetRpoInSeconds;
                gaEventData.isBackupEnabled = isBackupEnabled;
                gaEventData.vpgGuid = vpgGuid;

                if (isBackupEnabled) {
                    gaEventData.retentionPeriod = backupSettings.DeleteBackup.RestorePointRange;
                    gaEventData.runJobEvery = backupSettings.Scheduler.RunningTime.DayOfWeek;
                    gaEventData.postBackupScript = !_.isEmpty(backupSettings.Scripting.PostScript.Command);
                }
            }

            catch (e) {
                gaEventData = {};
            }

            $scope.$emit(eventName, gaEventData);
        }

        function sendVpgVmsDetailsToAnalytics() {
            if (vpgService.isSourceVcd()) {
                //todo - vapp not supported
            }
            else {
                try {
                    _.forEach(vmsService.getSelectedVms(), function (vm) {
                        $scope.$emit(analyticsEventsTypes.VPGS.VM_DETAILS, {
                            numberOfVpgsThatProtectThisVm: vm.ProtectedVmVpgsInfo.TotalNumberOfVpgs,
                            vmUsedStorage: vm.SizeInMb
                        });
                    });
                } catch (e) {
                }
            }
        }
    });


















