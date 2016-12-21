'use strict';

angular.module('zvmApp.core')
    .factory('restoreWizardFactory', function ($uibModal, $q, restoreWizardModel, zAlertFactory, $translate, $rootScope, analyticsEventsTypes) {
        var restoreWizardFactory = {};

        restoreWizardFactory._modalInstance = null;

        restoreWizardFactory.restore = function () {
            restoreWizardModel.init().then(function () {
                restoreWizardFactory.startWizardTime = new Date();
                restoreWizardFactory.wizardTitle = 'Restore Wizard';

                restoreWizardFactory._modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/restore_wizard/restore-wizard.html',
                    windowClass: 'restore-wizard-style',
                    controller: 'restoreWizardController',
                    backdrop: 'static',
                    resolve:{
                        steps: function(){
                            return restoreWizardModel.getSteps();
                        }
                    }
                });
            },function(result){
                zAlertFactory.fail('Error', $translate.instant(result));
            });
        };

        restoreWizardFactory.closeModal = function(){
            sendToAnalytics(true);
            restoreWizardFactory._modalInstance.close();
        };

        restoreWizardFactory.dismissModal = function () {
            sendToAnalytics(false);
            restoreWizardFactory._modalInstance.dismiss();
        };

        function sendToAnalytics(isSuccess) {
            $rootScope.$emit(analyticsEventsTypes.WIZARD.TIME_SPENT, {
                wizardName: restoreWizardFactory.wizardTitle,
                secondsInWizards: Math.floor(Math.abs(restoreWizardFactory.startWizardTime - new Date()) / 1000),
                isSuccess : isSuccess
            });
        }

        return restoreWizardFactory;
    });
