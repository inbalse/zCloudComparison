'use strict';

angular.module('zvmApp.core')
    .factory('recoveryWizardFactory', function ($uibModal, $q, recoveryWizardModel, zAlertFactory, enums, $translate, $rootScope, analyticsEventsTypes, globalStateModel) {
        var recoveryWizardFactory = {};
        recoveryWizardFactory._modalInstance = null;
        recoveryWizardFactory.title = '';

        recoveryWizardFactory.failoverLive = function () {
            recoveryWizardFactory.title = $translate.instant('RECOVERY_WIZARD.TITLE_LIVE');
            recoveryWizardFactory.selectVpgsTitle = $translate.instant('RECOVERY_WIZARD.TITLE_VPGS_SELECT_FAILOVER');
            recoveryWizardFactory.buttonTitle = $translate.instant('RECOVERY_WIZARD.TITLE_LIVE_BUTTON');
            recoveryWizardFactory._failover(enums.RecoveryType.Failover);
            recoveryWizardModel.recoveryType = enums.RecoveryType.Failover;
        };

        recoveryWizardFactory.failoverTest = function () {
            recoveryWizardFactory.title = $translate.instant('RECOVERY_WIZARD.TITLE_TEST');
            recoveryWizardFactory.selectVpgsTitle = $translate.instant('RECOVERY_WIZARD.TITLE_VPGS_SELECT_FAILOVER_TEST');
            recoveryWizardFactory.buttonTitle = $translate.instant('RECOVERY_WIZARD.TITLE_TEST_BUTTON');
            recoveryWizardFactory._failover(enums.RecoveryType.FailoverTest);
            recoveryWizardModel.recoveryType = enums.RecoveryType.FailoverTest;
        };

        recoveryWizardFactory.move = function () {
            recoveryWizardFactory.title = $translate.instant('RECOVERY_WIZARD.TITLE_MOVE');
            recoveryWizardFactory.selectVpgsTitle = $translate.instant('RECOVERY_WIZARD.TITLE_VPGS_SELECT_MOVE');
            recoveryWizardFactory.buttonTitle = $translate.instant('RECOVERY_WIZARD.TITLE_MOVE_BUTTON');
            recoveryWizardFactory._failover(enums.RecoveryType.Move);
            recoveryWizardModel.recoveryType = enums.RecoveryType.Move;
        };

        recoveryWizardFactory._failover = function (type) {
            var windowClass = 'recovery-wizard',
                isPortal = globalStateModel.data.IsPortal;
            switch (type) {
                case enums.RecoveryType.Failover:
                    recoveryWizardFactory.helpValue = isPortal ? 'ZSSP_FAILOVER' : 'recoveryFOL';
                    windowClass += ' recovery-wizard-failover';
                    break;
                case enums.RecoveryType.FailoverTest:
                    recoveryWizardFactory.helpValue = isPortal ? 'ZSSP_FAILOVER_TEST' : 'recoveryFOT';
                    windowClass += ' recovery-wizard-failovertest';
                    break;
                case enums.RecoveryType.Move:
                    recoveryWizardFactory.helpValue = isPortal ? 'ZSSP_MOVE_VPG' : 'recoveryMove';
                    windowClass += ' recovery-wizard-move';
                    break;
                default:
                    break;
            }
            recoveryWizardFactory.wizardTitle = windowClass;
            recoveryWizardFactory.startWizardTime = new Date();

            recoveryWizardModel.init().then(function () {
                recoveryWizardFactory.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/recovery_wizard/recovery-wizard.html',
                    windowClass: windowClass,
                    controller: 'recoveryWizardController',
                    backdrop: 'static',
                    resolve: {
                        steps: function () {
                            return recoveryWizardModel.getSteps(type);
                        }
                    }
                });
            });
        };

        recoveryWizardFactory.closeModal = function () {
            sendToAnalytics(true);
            recoveryWizardFactory.modalInstance.close();
        };

        recoveryWizardFactory.dismissModal = function () {
            sendToAnalytics(false);
            recoveryWizardFactory.modalInstance.dismiss();
        };

        function sendToAnalytics(isSuccess) {
            $rootScope.$emit(analyticsEventsTypes.WIZARD.TIME_SPENT, {
                wizardName: recoveryWizardFactory.wizardTitle,
                secondsInWizards: Math.floor(Math.abs(recoveryWizardFactory.startWizardTime - new Date()) / 1000),
                isSuccess: isSuccess
            });
        }

        return recoveryWizardFactory;
    });
