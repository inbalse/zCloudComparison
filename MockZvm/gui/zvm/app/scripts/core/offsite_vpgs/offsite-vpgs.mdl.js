'use strict';

angular.module('zvmApp.models')
    .factory('offsiteVpgsListModel', function (zertoServiceUpdaterFactory, enums, $filter, $translate, offsiteBackupStatusFilter, mbToStringConvertorFilter, offSiteBackupFactory, convertDateByFormatFilter, offsiteDateFormat) {
        var offsiteVpgsListModel = {};

        //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetVpgBackupJobsScreen, []);

        offsiteVpgsListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetVpgBackupJobsScreen', [], false, offsiteVpgsListModel.processData);
        };

        offsiteVpgsListModel.processData = function (data) {

            data.BackupEnabled = 0;
            var processed = _.forEach(data.VpgBackupJobInfoSummaryVisualObjects, function (item) {

                offsiteBackupStatusFilter(item);
                item.id = item.VpgIdentifier.GroupGuid;
                item.NameHTML = $filter('nameOffsiteRenderer')(item);
                item.LastRunResultText = offSiteBackupFactory.lastRunResultToText(item.LastRunResult);
                item.StartTimeOfLastRunText = convertDateByFormatFilter(item.StartTimeOfLastRun, offsiteDateFormat.NORMAL);
                item.StartTimeOfLastRunObj = {display:item.StartTimeOfLastRunText, filterValue:item.StartTimeOfLastRun};
                item.NextScheduledBackupText = convertDateByFormatFilter(item.NextScheduledBackup, offsiteDateFormat.NORMAL);
                item.NextScheduledObj = {display: item.NextScheduledBackupText, filterValue:item.NextScheduledBackup};
                item.LastFullBackupText = convertDateByFormatFilter(item.LastFullBackup, offsiteDateFormat.NORMAL);
                item.LastFullBackupObj = {display: item.LastFullBackupText, filterValue: item.LastFullBackup};
                item.RestorePoints = item.NonFailingRuns + '/' + item.TotalRuns;

                item.JobSizeInMBObj = {
                    display: mbToStringConvertorFilter(item.JobSizeInMB),
                    value: item.JobSizeInMB
                };

                item.LastJobSizeInMBObj = {
                    display: mbToStringConvertorFilter(item.LastBackupSizeInMb),
                    value: item.LastBackupSizeInMb
                };

                if (item.IsBackupEnabled) {
                    data.BackupEnabled++;
                }
            });

            data.VpgBackupJobInfoSummaryVisualObjects = processed;
            return data;
        };

        return offsiteVpgsListModel;
    });
