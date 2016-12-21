'use strict';

angular.module('zvmApp.core')
    .constant('backupDailyConst', {
        DAILY: '7'
    })
    .controller('createVPGBackupController', function ($scope, enums, $translate, createVPGModel, vos, backupDailyConst,
                                                       createBackupService, zAlertFactory, globalConstants, storageService, vpgService) {

        var backup = storageService.getConfigurationBackup();

        $scope.isValid = false;
        $scope.isEnabled = false;
        $scope.backupObj = {
            dayOfWeek: createBackupService.getDayOfWeek()
        };
        $scope.forms = {};

        var oldBackup = angular.copy(storageService.getConfigurationBackup());
        $scope.data = {
            backup: storageService.getConfigurationBackup(),
            isSlaCustom: storageService.getIsSlaCustom(),
            isBackupEnabled: storageService.getIsBackupEnabled(),
            backupTargetIdentifier: (backup.Target.SelectedTarget) ? backup.Target.SelectedTarget.Identifier : null,
            potentialBackupTargets: vpgService.getTargetSiteInfo().PotentialBackupTargets,
            serviceProfileName : storageService.getServiceProfileName()
        };

        var setBackupViewFlags = function () {
            $scope.isBackupTimeoutScriptDisabled = !$scope.data.isBackupEnabled || !$scope.data.enableBackupScripts || !$scope.data.backup.Scripting.PostScript.Command;
        };

        $scope.postScriptChange = function () {
            setBackupViewFlags();
        };

        createBackupService.setToDefaultTimeoutScript(backup);
        $scope.partialViews = createBackupService.getPartialsObj();
        $scope.runEvery = createBackupService.getEveryType();
        $scope.retentionList = createBackupService.getRetentionList();
        $scope.everyList = createBackupService.getEveryList();
        $scope.restorePointRangeLabel = createBackupService.getRetentionPeriod();

        var setSelectedTarget = function (backup, Identifier) {
            backup.Target.SelectedTarget = {Identifier: Identifier};
            $scope.data.backupTargetIdentifier = Identifier;
        };

        var setPieData = function (data) {
            $scope.pieData = data;
            $scope.data.backupTargetDetails = storageService.getBackupTargetDetails();

            if ($scope.data.backupTargetDetails) {
                $scope.data.backupTargetDetails.RepositoryTypeText = $scope.data.backupTargetDetails.DisplayName !== 'None' ? $scope.data.backupTargetDetails.RepositoryTypeText : '';
            }
            setBackupViewFlags();
        };

        var updateBackupTargetDetails = function () {
            $scope.data.backupTargetDetails = storageService.getBackupTargetDetails();
        };

        if (_.isNullOrUndefined(backup.Target.SelectedTarget)) {
            setSelectedTarget(backup, globalConstants.NONE_REPOSITORY);
        }

        $scope.handleChangeRepository = function () {
            backup.Target.SelectedTarget.Identifier = $scope.data.backupTargetIdentifier;

            //set chosen repository to default
            _.each($scope.data.potentialBackupTargets, function (rep) {
                rep.IsDefault = rep.Identifier.Identifier === $scope.data.backupTargetIdentifier;
            });

            setPieData(null);
            createBackupService.setBackupTargetDetails(null);
            $scope.setRepositoryData();
        };

        $scope.setRepositoryData = function () {
            var backupObj = storageService.getConfigurationBackup(),
                backupTargetDetails = storageService.getBackupTargetDetails();

            if (!_.isNullOrUndefined(backupTargetDetails) && !_.isNullOrUndefined(backupTargetDetails.pieData)) {
                setPieData(backupTargetDetails.pieData);
            } else if (backupObj.Target.SelectedTarget && backupObj.Target.SelectedTarget.Identifier) {
                createBackupService.getRepositoryDetails(backupObj.Target.SelectedTarget)
                    .then(function (pieData) {
                        setPieData(pieData);
                        updateBackupTargetDetails();
                    });
            }
        };

        $scope.handleChangeRestorePointRange = function () {
            var backup = storageService.getConfigurationBackup();
            backup.DeleteBackup.RestorePointRange = $scope.data.backup.DeleteBackup.RestorePointRange;

            if (backup.DeleteBackup.RestorePointRange) {
                var value = backup.DeleteBackup.RestorePointRange;
                $scope.restorePointRangeLabel = _.find($scope.retentionList, {'value': parseInt(value)}).label;
            }
        };

        $scope._handleChangeDaily = function () {
            createBackupService.dailyChange();
        };

        $scope.dayOfWeekChange = function () {
            var value = $scope.backupObj.dayOfWeek;

            if (value === undefined || value === null) {
                $scope.backupObj.dayOfWeek = createBackupService.getDayOfWeek();
            } else {
                createBackupService.setDailyAndPeriodType(value);
            }
        };

        $scope.$watch('forms.backupForm.$valid', function () {
            $scope.$emit('wizard:FormValidationChanged');
        });

        $scope.handleSwitchChanged = function () {
            var backup = storageService.getConfigurationBackup(),
                targetSiteInfo = vpgService.getTargetSiteInfo(),
                isBackupEnabled = $scope.data.isBackupEnabled;
            storageService.setIsBackupEnabled(!isBackupEnabled);

            // isBackupEnabled value is the opposite because switching its value happens after this handler
            if (!isBackupEnabled && targetSiteInfo.PotentialBackupTargets.length < 2) {
                //switching to ON, and there are no repositories - warn "Repository not defined"
                zAlertFactory.warn('Warning', $translate.instant('CREATE_VPG_BACKUP.REPOSITORY_NOT_DEFINED'), function () {
                    //We change this back in the callback because
                    //normally it will happen before the model updates
                    $scope.data.isBackupEnabled = false;
                    storageService.setIsBackupEnabled(false);

                }, [zAlertFactory.buttons.OK]);
            }
            else if (!isBackupEnabled && backup.Target.SelectedTarget.Identifier === globalConstants.NONE_REPOSITORY) {
                //switching to ON - get the default repository
                var defaultRepo = _.find(targetSiteInfo.PotentialBackupTargets, {'IsDefault': true});
                if (defaultRepo) {//set the default if exists
                    setSelectedTarget(backup, defaultRepo.Identifier.Identifier);
                    $scope.handleChangeRepository();
                }
            }
            else if (isBackupEnabled) {
                // switching back to OFF - clear details and set selected target to None
                createBackupService.setBackupTargetDetails(null);
                createVPGModel.setConfigurationBackup(angular.copy(oldBackup));
                $scope.data.backup = storageService.getConfigurationBackup();
                $scope.backupObj.dayOfWeek = createBackupService.getDayOfWeek();
                setPieData(null);
                setSelectedTarget(backup, globalConstants.NONE_REPOSITORY);
                $scope.$broadcast('wizard:hideErrors');
            }
        };

        updateBackupTargetDetails();
        $scope.setRepositoryData();
        setBackupViewFlags();
    });
