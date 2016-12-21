'use strict';

angular.module('zvmApp.core')
    .controller('restoreSummaryController', function ($scope, restoreWizardModel, restoreWizardFactory, zAlertFactory, analyticsEventsTypes) {
        $scope.data = restoreWizardModel.data;

        $scope.handleRestoreClick = function () {
            $scope.$emit(analyticsEventsTypes.ACTIONS.RESTORE_BACKUP.SEND);
            restoreWizardModel.restoreFromBackup().then($scope.onSuccess, $scope.onFail);
        };

        $scope.onSuccess = function () {
            restoreWizardFactory.closeModal();
        };
        $scope.onFail = function (reason) {
            zAlertFactory.fail('Restore Failed', reason.faultString, undefined, undefined);
        };
    });
