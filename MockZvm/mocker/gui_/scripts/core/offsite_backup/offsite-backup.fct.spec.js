'use strict';

describe('offsite backup factory', function () {

    var offSiteBackupFactory, zAlertFactory, zertoServiceFactory, event, rootScope, analyticsEventsTypes;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_offSiteBackupFactory_, _zAlertFactory_, _zertoServiceFactory_, _$rootScope_, _analyticsEventsTypes_) {
        analyticsEventsTypes = _analyticsEventsTypes_;
        offSiteBackupFactory = _offSiteBackupFactory_;
        zertoServiceFactory = _zertoServiceFactory_;
        zAlertFactory = _zAlertFactory_;
        rootScope = _$rootScope_;

        event = {};
        event.target = {};
        event.target.name = zAlertFactory.buttons.OK;
    }));

    it("should check defined functions", function () {
        expect(offSiteBackupFactory.runBackups).toBeDefined();
        expect(offSiteBackupFactory.handleReturnStartBackup).toBeDefined();
        expect(offSiteBackupFactory.abortBackups).toBeDefined();
        expect(offSiteBackupFactory.runBackups).toBeDefined();
        expect(offSiteBackupFactory.handleReturnAbortBackup).toBeDefined();
        expect(offSiteBackupFactory.checkRunBackupEnabled).toBeDefined();
        expect(offSiteBackupFactory.checkAbortBackupEnabled).toBeDefined();
        expect(offSiteBackupFactory.lastRunResultToText).toBeDefined();
    });

    it("should check the checkRunBackupEnabled function for enabled run backup", function () {
        var selectedItems = [
            {"BackupProgress": 0, "BackupStatus": 1, "JobName": "New VPG", "JobSizeInMB": 222, "LastFullBackup": "2014-09-10T06:26:04.029Z", "LastRunResult": 0, "NextScheduledBackup": "2014-09-12T21:00:00.000Z", "NonFailingRuns": 1, "NumberOfVms": 1, "NumberOfVolumes": 1, "RepositoryName": "guy", "StartTime": "2014-09-10T06:26:04.029Z", "StartTimeOfLastRun": "2014-09-10T06:26:04.029Z", "TotalRuns": 1, "VpgIdentifier": {"GroupGuid": "32d35274-5d95-4eb9-a1f5-3f4a3660ffda"}, "VpgProtectedSiteName": "Unconfigured site name", "VpgRecoverySiteName": "Unconfigured site name", "ZorgName": null, "IsBackupEnabled": true, "IsAbortBackupEnabled": false, "LastBackupSizeInMb": 8, "ProgressActive": false, "IconClass": "offsite-scheduled-icon", "StatusText": "Scheduled", "LastRunResultText": "FullS Success", "StartTimeOfLastRunText": "10/09/2014 09:26:04", "NextScheduledBackupText": "13/09/2014 00:00:00", "LastFullBackupText": "10/09/2014 09:26:04", "RestorePoints": "1/1", "JobSizeInMBText": "222.0 MB", "LastJobSizeInMBText": "8.0 MB"},
            {"BackupProgress": 0, "BackupStatus": 1, "JobName": "New VPG1", "JobSizeInMB": 258, "LastFullBackup": "0001-01-01T00:00:00.000Z", "LastRunResult": 4, "NextScheduledBackup": "0001-01-01T00:00:00.000Z", "NonFailingRuns": 0, "NumberOfVms": 1, "NumberOfVolumes": 1, "RepositoryName": "guy", "StartTime": "0001-01-01T00:00:00.000Z", "StartTimeOfLastRun": "0001-01-01T00:00:00.000Z", "TotalRuns": 0, "VpgIdentifier": {"GroupGuid": "0fb78ade-ec6e-458c-94e6-896d760e731b"}, "VpgProtectedSiteName": "Unconfigured site name", "VpgRecoverySiteName": "Unconfigured site name", "ZorgName": null, "IsBackupEnabled": true, "IsAbortBackupEnabled": false, "LastBackupSizeInMb": 0, "ProgressActive": false, "IconClass": "offsite-scheduled-icon", "StatusText": "Scheduled", "LastRunResultText": "", "StartTimeOfLastRunText": "01/01/0001 02:00:00", "NextScheduledBackupText": "01/01/0001 02:00:00", "LastFullBackupText": "01/01/0001 02:00:00", "RestorePoints": "0/0", "JobSizeInMBText": "258.0 MB", "LastJobSizeInMBText": "0.0 MB"}
        ];
        expect(offSiteBackupFactory.checkRunBackupEnabled(selectedItems)).toBeTruthy();
        expect(offSiteBackupFactory.checkAbortBackupEnabled(selectedItems)).toBeFalsy();
    });

    it("should check the click of run backup", function () {
        spyOn(zertoServiceFactory, 'BackupProtectionGroups');
        offSiteBackupFactory.handleReturnStartBackup(event);
        expect(zertoServiceFactory.BackupProtectionGroups).toHaveBeenCalled();
    });

    it("should check the click of abort backup", function () {
        spyOn(zertoServiceFactory, 'AbortBackups');
        offSiteBackupFactory.handleReturnAbortBackup(event);
        expect(zertoServiceFactory.AbortBackups).toHaveBeenCalled();
    });

    it('verify that run backup triggers an google analytics event', function () {
        spyOn(rootScope, '$emit');
        offSiteBackupFactory.runBackups();

        expect(rootScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.OFFSITE_BACKUP.RUN.START);
    });

    it('verify that abort backup triggers an google analytics event', function () {
        spyOn(rootScope, '$emit');
        offSiteBackupFactory.abortBackups();
        
        expect(rootScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.OFFSITE_BACKUP.ABORT.START);
    });
});
