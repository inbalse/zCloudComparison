'use strict';

angular.module('zvmApp.core')
    .filter('nameOffsiteRenderer', function () {
        return function (item) {
            if (item.BackupJobContext) {
                return '<a href="#/main/vpg_details/status?id=' + item.BackupJobContext.VpgIdentifier.GroupGuid + '" >' + item.BackupJobContext.JobName + '</a>';
            } else {
                return '<a href="#/main/vpg_details/status?id=' + item.VpgIdentifier.GroupGuid + '" >' + item.JobName + '</a>';
            }
        };
    });