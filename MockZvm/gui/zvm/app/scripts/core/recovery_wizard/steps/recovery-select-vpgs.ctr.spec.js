'use strict';

describe('Recovery select grid controller', function () {
    var controller, testScope, trans, recoveryWizardModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate, _recoveryWizardModel_) {
        testScope = $rootScope.$new();
        recoveryWizardModel = _recoveryWizardModel_;
        recoveryWizardModel.data = {};
        recoveryWizardModel.data.vpgs = [];
        recoveryWizardModel.data.selectedVpgs = [];

        controller = $controller('recoverySelectVPGController', {$scope: testScope, $translate: $translate});
    }));

    it("should check definitions", function () {
        expect(testScope.data).toBeDefined();
        expect(recoveryWizardModel.data.selectedVpgs).toBeDefined();
        expect(testScope.gridObject).toBeDefined();
        expect(testScope.gridObject.search).toEqual('');
        expect(testScope.filterOptions).toEqual({filterText: 'Name:'});
    });

    describe('calculateSummary function', function () {
        var selectedItems;

        beforeEach(function () {
            selectedItems = [
                {"Identifier": {"GroupGuid": "ebfe801f-efc8-488c-b68d-63cc5f48e966"}, "AlertStatus": 2, "Name": "New VPG", "State": {"State": 0, "Status": 4, "SubStatus": 0, "IsProgressActive": false, "ProgressPercentage": 0, "ProgressDetails": null, "IsFailoverEnabled": true, "IsMoveEnabled": true, "IsFailoverTestEnabled": true, "IsUpdateEnabled": true, "IsInsertCheckpointEnabled": true, "RelevantCheckpoint": null, "IsProtectedSiteConnected": true, "AlertStatus": 2, "AlertTips": {"Alerts": ["The VPG New VPG has been protected for 2 hours and 5 minutes but the journal history is only 32 minutes."], "HasMore": false, "TotalNumberOfAlerts": 1}, "IsDeleteEnabled": true, "IsForceSyncEnabled": false, "IsCloneEnabled": true, "VPGTimebombInfo": null, "CloneStatusVisualObject": null, "IsMoveInStagesSupported": true, "IsFailoverInStagesSupported": true, "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0}, "RequiresForceToDelete": false, "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": true, "IsResumeEnabled": false}, "IsRecoverCommitEnabled": false, "IsRecoverRollbackEnabled": false, "ActiveProcesses": {"RunningFailOverTest": null, "RunningClone": null, "Paused": null, "IsVpgNowPaused": false, "IsResumeEnabled": false, "RunningBackup": null, "IsStopFOTEnabled": false, "VpgUpdate": null, "TimebombInfo": null}, "ButtonsState": {"IsFailoverEnabled": true, "IsMoveEnabled": true, "IsFailoverTestEnabled": true, "IsUpdateEnabled": true, "IsPauseEnabled": true, "IsInsertCheckpointEnabled": true, "IsProtectedSiteConnected": true, "IsDeleteEnabled": true, "IsForceSyncEnabled": false, "IsCloneEnabled": true, "IsMoveInStagesSupported": true, "IsFailoverInStagesSupported": true, "IsRecoverCommitEnabled": false, "IsRecoverRollbackEnabled": false, "RequiresForceToDelete": false, "IsBackupEnabled": false, "IsAbortBackupEnabled": false}, "ProgressObject": null, "StatusLabel": "History Not Meeting SLA"}, "Priority": 1, "NumberOfVms": 1, "ProvisionedStorageInMB": 222, "UsedStorageInMB": 8, "IOPS": 0, "IncomingThroughputInMb": 0, "OutgoingBandWidth": 0, "ActualRPO": 4, "ConfiguredRPO": 300, "LastTest": null, "Direction": 2, "SampleVM": {"InternalVmName": "vm-278", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "OwnersId": {"OwnersGuid": "c3b65c0d-d74a-4724-aa60-65e384c76d7b"}, "SourceSiteName": "Unconfigured site name", "TargetSiteName": "Remote site", "CustomerName": "", "AlertTips": {"Alerts": ["The VPG New VPG has been protected for 2 hours and 5 minutes but the journal history is only 32 minutes."], "HasMore": false, "TotalNumberOfAlerts": 1}, "Entities": {"Source": 0, "Target": 0}, "ZorgId": null, "BackupRelatedData": {"VpgBackupJobStatus": 2, "BackupRepository": "", "RestorePointsRange": 5, "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}}, "RetentionPolicy": 0, "vpgState": {"text": "", "progress": 0, "isProgress": false, "spanClass": "none", "divClass": "none"}, "NameHTML": "<a href=\"#/main/vpg_details/ebfe801f-efc8-488c-b68d-63cc5f48e966/status\" >New VPG (1)</a>"},
                {"Identifier": {"GroupGuid": "97f0f9c4-c326-46cd-98ad-06d959aadd76"}, "AlertStatus": 2, "Name": "vpg2", "State": {"State": 0, "Status": 4, "SubStatus": 0, "IsProgressActive": false, "ProgressPercentage": 0, "ProgressDetails": null, "IsFailoverEnabled": true, "IsMoveEnabled": true, "IsFailoverTestEnabled": true, "IsUpdateEnabled": true, "IsInsertCheckpointEnabled": true, "RelevantCheckpoint": null, "IsProtectedSiteConnected": true, "AlertStatus": 2, "AlertTips": {"Alerts": ["VPG vpg2 journal history is less than 1 hour of the configured 4 hours. This has occurred because of a synchronization between the protected and recovery sites and will automatically be resolved when the journal history is fully populated."], "HasMore": false, "TotalNumberOfAlerts": 1}, "IsDeleteEnabled": true, "IsForceSyncEnabled": false, "IsCloneEnabled": true, "VPGTimebombInfo": null, "CloneStatusVisualObject": null, "IsMoveInStagesSupported": true, "IsFailoverInStagesSupported": true, "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0}, "RequiresForceToDelete": false, "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": true, "IsResumeEnabled": false}, "IsRecoverCommitEnabled": false, "IsRecoverRollbackEnabled": false, "ActiveProcesses": {"RunningFailOverTest": null, "RunningClone": null, "Paused": null, "IsVpgNowPaused": false, "IsResumeEnabled": false, "RunningBackup": null, "IsStopFOTEnabled": false, "VpgUpdate": null, "TimebombInfo": null}, "ButtonsState": {"IsFailoverEnabled": true, "IsMoveEnabled": true, "IsFailoverTestEnabled": true, "IsUpdateEnabled": true, "IsPauseEnabled": true, "IsInsertCheckpointEnabled": true, "IsProtectedSiteConnected": true, "IsDeleteEnabled": true, "IsForceSyncEnabled": false, "IsCloneEnabled": true, "IsMoveInStagesSupported": true, "IsFailoverInStagesSupported": true, "IsRecoverCommitEnabled": false, "IsRecoverRollbackEnabled": false, "RequiresForceToDelete": false, "IsBackupEnabled": true, "IsAbortBackupEnabled": false}, "ProgressObject": null, "StatusLabel": "History Not Meeting SLA"}, "Priority": 1, "NumberOfVms": 1, "ProvisionedStorageInMB": 258, "UsedStorageInMB": 40, "IOPS": 0, "IncomingThroughputInMb": 0, "OutgoingBandWidth": 0, "ActualRPO": 4, "ConfiguredRPO": 300, "LastTest": null, "Direction": 2, "SampleVM": {"InternalVmName": "vm-273", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "OwnersId": {"OwnersGuid": "c3b65c0d-d74a-4724-aa60-65e384c76d7b"}, "SourceSiteName": "Unconfigured site name", "TargetSiteName": "Second remote", "CustomerName": "", "AlertTips": {"Alerts": ["VPG vpg2 journal history is less than 1 hour of the configured 4 hours. This has occurred because of a synchronization between the protected and recovery sites and will automatically be resolved when the journal history is fully populated."], "HasMore": false, "TotalNumberOfAlerts": 1}, "Entities": {"Source": 0, "Target": 0}, "ZorgId": null, "BackupRelatedData": {"VpgBackupJobStatus": 1, "BackupRepository": "guy", "RestorePointsRange": 1, "BackupSchedulingTime": {"SchedulePeriodType": 1, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}}, "RetentionPolicy": 1, "vpgState": {"text": "", "progress": 0, "isProgress": false, "spanClass": "none", "divClass": "none"}, "NameHTML": "<a href=\"#/main/vpg_details/status?id=97f0f9c4-c326-46cd-98ad-06d959aadd76\" >vpg2 (1)</a>"}
            ];
        });

        it('should set right details', function () {
            testScope.calculateSummary(selectedItems);
            expect(testScope.selectedDetails).toEqual('RECOVERY_WIZARD.SELECTED_DETAILS :  RECOVERY_WIZARD.VPGS  -  2, RECOVERY_WIZARD.VMS  -  2, RECOVERY_WIZARD.STORAGE  -  480.0 MB.');
        });

        it('should set joined site names', function () {
            testScope.calculateSummary(selectedItems);
            expect(testScope.sitesText).toEqual('Remote site,Second remote');
        });
    });
});
