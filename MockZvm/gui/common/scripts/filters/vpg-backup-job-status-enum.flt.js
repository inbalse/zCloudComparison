'use strict';

angular.module('zvmApp.filters')
    .filter('vpgBackupJobStatusEnum', function (enums, $translate) {
        return function (enumValue, type) {
            if (type === enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended) {
                switch (enumValue) {
                    case enums.VpgBackupJobSummaryStatusVisualObject.Running:
                        return $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.RUNNING');
                    case enums.VpgBackupJobSummaryStatusVisualObject.Scheduled:
                        return $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.SCHEDULED');
                    case enums.VpgBackupJobSummaryStatusVisualObject.InActive:
                        return $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE');
                    case enums.VpgBackupJobSummaryStatusVisualObject.Aborting:
                        return $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.Aborting');

                    default:
                        return enumValue;
                }
            } else {
                return '';
            }

        };
    });
