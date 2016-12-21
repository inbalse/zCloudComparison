'use strict';

angular.module('zvmApp.core')
    .controller('recoveryWizardController', function ($scope, steps, enums, recoveryWizardFactory, recoveryWizardModel, allRecoveredVmsApiService,
                                                      zAlertFactory, allRecoveryVmsOperationServiceConstants, globalStateModel, zertoServiceFactory) {
        $scope.title = recoveryWizardFactory.title;
        steps[2].stepTitle = recoveryWizardFactory.buttonTitle;

        $scope.helpValue = recoveryWizardFactory.helpValue;

        $scope.closeHandler = function () {
            recoveryWizardFactory.closeModal();
        };

        $scope.dismissHandler = function () {
            recoveryWizardFactory.dismissModal();
        };

        $scope._handleDoneClick = function () {
            console.log('should be removed');
        };

        $scope._handleStepChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            if (!globalStateModel.data.IsPortal) {
                $scope.helpValue = recoveryWizardFactory.helpValue + '_' + newValue.targetScope.currentStep.stepTitle;
            }

        };

        $scope.$on('wizard:StepChanged', $scope._handleStepChanged);
        $scope.$on('wizard:DoneButtonClick', $scope._handleDoneClick);
        $scope.$on('wizard:CancelButtonClick', $scope.dismissHandler);

        var goNextTab = function (isOneToManyValidation) {
            if (isOneToManyValidation) {
                recoveryWizardModel.isChecksHasNoSharedVmsInProgress = false;

                if (!recoveryWizardModel.isChecksVmsRecoveredInProgress) {
                    $scope.$broadcast('wizard:ClickNextButtonManual');
                }
            } else {
                recoveryWizardModel.isChecksVmsRecoveredInProgress = false;

                if (!recoveryWizardModel.isChecksHasNoSharedVmsInProgress) {
                    $scope.$broadcast('wizard:ClickNextButtonManual');
                }
            }
        };

        var validateIfAllVmsRecoveredPerAllVpgs = function (event, args) {
            //todo remove after BE fix Zssp rest api issue
            if (globalStateModel.data.IsPortal) {
                return;
            }

            if (!recoveryWizardModel.isChecksVmsRecoveredInProgress && recoveryWizardModel.recoveryType !== enums.RecoveryType.Move && args && args.stepTitle === 'EXECUTION PARAMETERS') {
                recoveryWizardModel.isChecksVmsRecoveredInProgress = true;
                allRecoveredVmsApiService.sureAllVmsRecoveredPerAllVpgs(recoveryWizardModel.data.selectedVpgs, allRecoveryVmsOperationServiceConstants.recovered).then(function (warningInfo) {
                    if (warningInfo !== '') {
                        zAlertFactory.warn(allRecoveryVmsOperationServiceConstants.heading, warningInfo, function (event) {
                            if (event.target.name === 'MODAL.OK') {
                                goNextTab(false);
                            } else {
                                recoveryWizardModel.isChecksVmsRecoveredInProgress = false;
                            }
                        });
                    } else {
                        goNextTab(false);
                    }
                });
            }
        };

        var createNoSharedVmsObj = function (vpgId, cpId) {
            return {ProtectionGroupIdentifier: vpgId, CheckpointIdentifier: cpId};
        };

        var getSendToValidationsVpgs = function () {
            var selectedVpgs = recoveryWizardModel.data.selectedVpgs,
                sendToValidationsVpgs = [];

            _.each(selectedVpgs, function (vpg) {
                if (recoveryWizardModel.recoveryType === enums.RecoveryType.Move) {
                    if (vpg.recoveryItemVo.useReverseProtection || !vpg.keepSourceVmsObj.value) {
                        sendToValidationsVpgs.push(createNoSharedVmsObj(vpg.recoveryItemVo.vpgInfo.ManageVpgInfo.ProtectionGroupId, null));
                    }
                } else { //fail over live
                    if (vpg.recoveryItemVo.useReverseProtection) {
                        sendToValidationsVpgs.push(createNoSharedVmsObj(vpg.recoveryItemVo.vpgInfo.ManageVpgInfo.ProtectionGroupId, vpg.checkpointObj.lastCheckpoint.Identifier));
                    }
                }
            });

            return sendToValidationsVpgs;
        };

        var validateHasNoSharedVmsInAllVpgs = function (event, args) {
            if (!recoveryWizardModel.isChecksHasNoSharedVmsInProgress && recoveryWizardModel.recoveryType !== enums.RecoveryType.FailoverTest && args && args.stepTitle === 'EXECUTION PARAMETERS') {
                recoveryWizardModel.isChecksHasNoSharedVmsInProgress = true;

                var sendToValidationsVpgs = getSendToValidationsVpgs();

                if (sendToValidationsVpgs.length) {
                    zertoServiceFactory.ValidateHasNoSharedVms(sendToValidationsVpgs).then(function () {
                        goNextTab(true);
                    }, function (error) {
                        zAlertFactory.warn(allRecoveryVmsOperationServiceConstants.heading, error.faultString, function (event) {
                            if (event.target.name === 'MODAL.OK') {
                                goNextTab(true);
                            } else {
                                recoveryWizardModel.isChecksHasNoSharedVmsInProgress = false;
                            }
                        });
                    });
                } else {
                    recoveryWizardModel.isChecksHasNoSharedVmsInProgress = false;
                }
            }
        };

        $scope.$on('wizard:PreHandelNextButtonClickEvent', function (event, args) {
            validateIfAllVmsRecoveredPerAllVpgs(event, args);
            validateHasNoSharedVmsInAllVpgs(event, args);
        });

        $scope.steps = steps;
    });
