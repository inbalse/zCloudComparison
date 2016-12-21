'use strict';

angular.module('zvmApp.models')
    .factory('offsiteVmsListModel', function (zertoServiceUpdaterFactory, enums, $filter, $translate, offsiteBackupStatusFilter, mbToStringConvertorFilter, offSiteBackupFactory, convertDateByFormatFilter, offsiteDateFormat) {
        var offsiteVmsListModel = {};

        //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetVmBackupJobsScreen, []);

        offsiteVmsListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetVmBackupJobsScreen', [], false, offsiteVmsListModel.processData);
        };

        offsiteVmsListModel.processData = function (data) {
            data.BackupEnabled = 0;
            var processed = _.forEach(data.VmBackupJobInfoSummaryVisualObjects, function (item) {
                item.BackupStatus = item.BackupJobContext.BackupStatus;
                offsiteBackupStatusFilter(item);
                item.id = item.VmName + item.BackupJobContext.VpgIdentifier.GroupGuid;
                item.NameHTML = $filter('nameOffsiteRenderer')(item);
                item.LastRunResultText = offSiteBackupFactory.lastRunResultToText(item.BackupJobContext.LastRunResult);
                item.StartTimeOfLastRunText = convertDateByFormatFilter(item.BackupJobContext.StartTimeOfLastRun, offsiteDateFormat.NORMAL);
                item.StartTimeOfLastRunObj = {display:item.StartTimeOfLastRunText, filterValue: item.BackupJobContext.StartTimeOfLastRun};

                item.NextScheduledBackupText = convertDateByFormatFilter(item.BackupJobContext.NextScheduledBackup, offsiteDateFormat.NORMAL);
                item.NextScheduledBackupObj = {display: item.NextScheduledBackupText, filterValue: item.BackupJobContext.NextScheduledBackup};

                item.LastFullBackupText = convertDateByFormatFilter(item.BackupJobContext.LastFullBackup, offsiteDateFormat.NORMAL);
                item.LastFullBackupObj = {display: item.LastFullBackupText, filterValue: item.BackupJobContext.LastFullBackup};
                item.RestorePoints = item.BackupJobContext.NonFailingRuns + '/' + item.BackupJobContext.TotalRuns;

                item.JobSizeInMBObj = {
                    display: mbToStringConvertorFilter(item.VmSizeInMB),
                    value: item.VmSizeInMB
                };

                item.LastJobSizeInMBObj = {
                    display: mbToStringConvertorFilter(item.LastBackupSizeInMb),
                    value: item.LastBackupSizeInMb
                };

                item.JobName = item.BackupJobContext.JobName;
                item.VpgProtectedSiteName = item.BackupJobContext.VpgProtectedSiteName;
                item.VpgRecoverySiteName = item.BackupJobContext.VpgRecoverySiteName;
                item.RepositoryName = item.BackupJobContext.RepositoryName;
                item.ZorgName = item.BackupJobContext.ZorgName;
                item.BackupProgress = item.BackupJobContext.BackupProgress;
                item.VpgIdentifier = item.BackupJobContext.VpgIdentifier;

                if (item.IsBackupEnabled) {
                    data.BackupEnabled++;
                }
            });
            data.VmBackupJobInfoSummaryVisualObjects = processed;

            return data;
        };

        return offsiteVmsListModel;
    });
