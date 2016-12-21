'use strict';

angular.module('zvmApp.core')
    .service('createBackupService', function ($translate, $q, enums, backupDailyConst, vpgService, storageService) {
        var createBackupService = this;

        var getBackup = function () {
            return storageService.getConfigurationBackup();
        };

        //region ----------------------- initial -------------------------------//
        createBackupService.getRetentionList = function () {
            return [
                {
                    label: $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.ONE_WEEK'),
                    value: enums.RestorePointRangeType.OneWeek
                },
                {
                    label: $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.ONE_MOTH'),
                    value: enums.RestorePointRangeType.OneMonth
                },
                {
                    label: $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.THREE_MONTHS'),
                    value: enums.RestorePointRangeType.ThreeMonths
                },
                {
                    label: $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.SIX_MONTHS'),
                    value: enums.RestorePointRangeType.SixMonths
                },
                {
                    label: $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.NINE_MONTHS'),
                    value: enums.RestorePointRangeType.NineMonths
                },
                {
                    label: $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.ONE_YEAR'),
                    value: enums.RestorePointRangeType.OneYear
                }
            ];
        };

        createBackupService.getEveryList = function () {
            return [
                {label: $translate.instant('SCHEDULE_PERIOD_TYPES.DAILY'), value: backupDailyConst.DAILY},
                {label: $translate.instant('DAYS.SUNDAY'), value: enums.DayOfWeek.Sunday},
                {label: $translate.instant('DAYS.MONDAY'), value: enums.DayOfWeek.Monday},
                {label: $translate.instant('DAYS.TUESDAY'), value: enums.DayOfWeek.Tuesday},
                {label: $translate.instant('DAYS.WEDNESDAY'), value: enums.DayOfWeek.Wednesday},
                {label: $translate.instant('DAYS.THURSDAY'), value: enums.DayOfWeek.Thursday},
                {label: $translate.instant('DAYS.FRIDAY'), value: enums.DayOfWeek.Friday},
                {label: $translate.instant('DAYS.SATURDAY'), value: enums.DayOfWeek.Saturday}
            ];
        };
        //endregion ------------------------------------------------------------//

        //region -------------------- PARTIALS DEF -----------------------------//
        createBackupService.getPartialsObj = function () {
            return {
                repositoryPath: 'scripts/core/create_vpg/steps/backup/backup_partial_views/_repository_view.html',
                retentionPeriodPath: 'scripts/core/create_vpg/steps/backup/backup_partial_views/_retention_period_view.html',
                postBackupScriptPath: 'scripts/core/create_vpg/steps/backup/backup_partial_views/_post_backup_script_view.html'
            };
        };
        //endregion ------------------------------------------------------------//

        //region --------------------- HELPER FUNCTION -------------------------//
        createBackupService.setToDefaultTimeoutScript = function (backup) {
            backup.Scripting.PostScript.TimeoutInSeconds = 300;
        };

        // due to bug 26242
        createBackupService.isBackupTargetExistsInPotentials = function (target) {
            var potentialTargets = vpgService.getTargetSiteInfo().PotentialBackupTargets;
            return _.find(potentialTargets, function (potentialTarget) {
                return potentialTarget.Identifier.Identifier === target.Identifier;
            });
        };
        //endregion ------------------------------------------------------------//

        //region -------------------- UPDATE FUNCTIONS -------------------------//
        createBackupService.getRepositoryDetails = function (selectedTarget) {
            var targetSiteInfo = vpgService.getTargetSiteInfo(),
                protectionGroupId = vpgService.getProtectionGroupId(),
                isReverse = vpgService.isReverse();

            return storageService.getSelectedBackupTargetDetails(selectedTarget, protectionGroupId, targetSiteInfo.OwnersId.Id, isReverse)
                .then(function (backupDetails) {
                    return backupDetails.pieData;
                }, function (error) {
                    return error;
                });
        };

        createBackupService.setBackupTargetDetails = function (backupDetails) {
            vpgService.setBackupTargetDetails(backupDetails);
        };

        createBackupService.dailyChange = function () {
            var backup = getBackup(),
                vpgSettings = vpgService.getVpgSettings();

            if (vpgSettings.Config && vpgSettings.Config.Configuration && backup.Scheduler && backup.Scheduler.RunningTime.DayOfWeek === backupDailyConst.DAILY) {
                backup.Scheduler.RunningTime.SchedulePeriodType = enums.SchedulePeriodType.Daily;
            } else if (vpgSettings.Config && vpgSettings.Config.Configuration && backup.Scheduler) {
                backup.Scheduler.RunningTime.SchedulePeriodType = enums.SchedulePeriodType.Weekly;
            }

            storageService.setConfigurationBackup(backup);
        };

        createBackupService.getEveryType = function () {
            var backup = getBackup();
            if (!storageService.getIsSlaCustom()) {
                return backup.Scheduler.RunningTime.SchedulePeriodType === enums.SchedulePeriodType.Daily ? $translate.instant('ENUM.SCHEDULE_PERIOD_TYPE.0') : $translate.instant('ENUM.DAYS.' + backup.Scheduler.RunningTime.DayOfWeek);
            }
        };

        createBackupService.getRetentionPeriod = function () {
            var backup = getBackup();
            return _.find(createBackupService.getRetentionList(), {'value': parseInt(backup.DeleteBackup.RestorePointRange)}).label;
        };

        createBackupService.getDayOfWeek = function () {
            var backup = getBackup();
            return backup.Scheduler.RunningTime.SchedulePeriodType === enums.SchedulePeriodType.Daily ? backupDailyConst.DAILY : backup.Scheduler.RunningTime.DayOfWeek;
        };

        createBackupService.setDailyAndPeriodType = function (value) {
            var backup = getBackup();
            if (value === backupDailyConst.DAILY) {
                backup.Scheduler.RunningTime.SchedulePeriodType = enums.SchedulePeriodType.Daily;
                backup.Scheduler.RunningTime.DayOfWeek = enums.DayOfWeek.Saturday;
            } else {
                backup.Scheduler.RunningTime.SchedulePeriodType = enums.SchedulePeriodType.Weekly;
                backup.Scheduler.RunningTime.DayOfWeek = value;
            }

          storageService.setConfigurationBackup(backup);
        };
        //endregion ------------------------------------------------------------//
    });
