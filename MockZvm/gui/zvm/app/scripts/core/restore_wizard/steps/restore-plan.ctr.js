'use strict';

angular.module('zvmApp.core')
    .controller('restorePlanController', function ($scope, $translate, enums, restoreWizardModel, restorePlanTypes) {
        $scope.data = restoreWizardModel.data;
        $scope.isZca = restoreWizardModel.licenseType === enums.SiteLicenseType.ZCA;
        $scope.data.planType = $scope.isZca ? restorePlanTypes.ByTarget : $scope.data.planType;


        $scope.restoreFromBackupTooltip = $translate.instant('RESTORE_WIZARD.RESTORE_PLAN_STEP.RESTORE_FROM_BACKUP_TOOLTIP');
        $scope.restoreFromRepositoryTooltip = $translate.instant('RESTORE_WIZARD.RESTORE_PLAN_STEP.RESTORE_FROM_REPOSITORY_TOOLTIP');

        //sort by boolean prop IsExists if true come first false come last in drop down list
        $scope.data.potentialSources.PotentialProtectionGroups = _.sortBy($scope.data.potentialSources.PotentialProtectionGroups, 'IsExists').reverse();

        $scope.deletedVpgGroup = function (item) {
            return item.IsExists ? $translate.instant('RESTORE_WIZARD.RESTORE_PLAN_STEP.EXISTING') : $translate.instant('RESTORE_WIZARD.RESTORE_PLAN_STEP.DELETED');
        };

        $scope.restorePlanTypes = restorePlanTypes;

    });
