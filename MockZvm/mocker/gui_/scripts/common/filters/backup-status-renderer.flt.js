'use strict';

angular.module('zvmApp.filters')
    .filter('backupStatusRenderer', function ($translate) {
        return function (row, cell, value) {
            return  angular.isDefined(value) &&  value.display !== '' ? value.display : '<span class="backup-status">' + $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE') + '</span>';
        };
    });
