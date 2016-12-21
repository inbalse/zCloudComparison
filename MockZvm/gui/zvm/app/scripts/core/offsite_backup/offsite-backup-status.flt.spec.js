'use strict';

describe('offsite backup status filter', function () {

    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_) {
        filter = _$filter_('offsiteBackupStatus');
    }));

    it("should return the schedule status", function () {
        var vpgItem = {"BackupProgress":0,"BackupStatus":1,"JobName":"New VPG","JobSizeInMB":222,"LastFullBackup":"0001-01-01T00:00:00.000Z","LastRunResult":4,"NextScheduledBackup":"0001-01-01T00:00:00.000Z","NonFailingRuns":0,"NumberOfVms":1,"NumberOfVolumes":1,"RepositoryName":"guy","StartTime":"0001-01-01T00:00:00.000Z","StartTimeOfLastRun":"0001-01-01T00:00:00.000Z","TotalRuns":0,"VpgIdentifier":{"GroupGuid":"32d35274-5d95-4eb9-a1f5-3f4a3660ffda"},"VpgProtectedSiteName":"Unconfigured site name","VpgRecoverySiteName":"Unconfigured site name","ZorgName":null,"IsBackupEnabled":true,"IsAbortBackupEnabled":false,"LastBackupSizeInMb":0};
        filter(vpgItem);
        expect(vpgItem.IconClass).toEqual('offsite-scheduled-icon');
        expect(vpgItem.StatusText).toEqual('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.SCHEDULED');
    });

    it("should return the running status", function () {
        var vpgItem = {"BackupProgress":0,"BackupStatus":0,"JobName":"New VPG","JobSizeInMB":222,"LastFullBackup":"0001-01-01T00:00:00.000Z","LastRunResult":4,"NextScheduledBackup":"0001-01-01T00:00:00.000Z","NonFailingRuns":0,"NumberOfVms":1,"NumberOfVolumes":1,"RepositoryName":"guy","StartTime":"0001-01-01T00:00:00.000Z","StartTimeOfLastRun":"0001-01-01T00:00:00.000Z","TotalRuns":0,"VpgIdentifier":{"GroupGuid":"32d35274-5d95-4eb9-a1f5-3f4a3660ffda"},"VpgProtectedSiteName":"Unconfigured site name","VpgRecoverySiteName":"Unconfigured site name","ZorgName":null,"IsBackupEnabled":true,"IsAbortBackupEnabled":false,"LastBackupSizeInMb":0};
        filter(vpgItem);
        expect(vpgItem.IconClass).toEqual('offsite-running-icon');
        expect(vpgItem.StatusText).toEqual('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.RUNNING');
    });

    it("should return the inactive status", function () {
        var vpgItem = {"BackupProgress":0,"BackupStatus":2,"JobName":"New VPG","JobSizeInMB":222,"LastFullBackup":"0001-01-01T00:00:00.000Z","LastRunResult":4,"NextScheduledBackup":"0001-01-01T00:00:00.000Z","NonFailingRuns":0,"NumberOfVms":1,"NumberOfVolumes":1,"RepositoryName":"guy","StartTime":"0001-01-01T00:00:00.000Z","StartTimeOfLastRun":"0001-01-01T00:00:00.000Z","TotalRuns":0,"VpgIdentifier":{"GroupGuid":"32d35274-5d95-4eb9-a1f5-3f4a3660ffda"},"VpgProtectedSiteName":"Unconfigured site name","VpgRecoverySiteName":"Unconfigured site name","ZorgName":null,"IsBackupEnabled":true,"IsAbortBackupEnabled":false,"LastBackupSizeInMb":0};
        filter(vpgItem);
        expect(vpgItem.IconClass).toEqual('offsite-inactive-icon');
        expect(vpgItem.StatusText).toEqual('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE');
    });
});