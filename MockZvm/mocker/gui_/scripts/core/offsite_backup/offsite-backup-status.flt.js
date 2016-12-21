'use strict';

angular.module('zvmApp.filters')
    .filter('offsiteBackupStatus', function (enums, $translate) {
        return function (item) {
            item.ProgressActive = item.BackupStatus === enums.VpgBackupJobSummaryStatusVisualObject.Running;

            switch (item.BackupStatus) {
                case enums.VpgBackupJobSummaryStatusVisualObject.Running:
                    item.IconClass = 'offsite-running-icon';
                    item.StatusText = $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.RUNNING');
                    break;
                case enums.VpgBackupJobSummaryStatusVisualObject.Scheduled:
                    item.IconClass = 'offsite-scheduled-icon';
                    item.StatusText = $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.SCHEDULED');
                    break;
                case enums.VpgBackupJobSummaryStatusVisualObject.InActive:
                    item.IconClass = 'offsite-inactive-icon';
                    item.StatusText = $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE');
                    break;
                case enums.VpgBackupJobSummaryStatusVisualObject.Aborting:
                    item.IconClass = 'offsite-aborting-icon';
                    item.StatusText = $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.Aborting');
                    break;
            }
    };
});
