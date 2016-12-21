'use strict';

describe('vms list window', function () {
    var controller, testScope, vmsListModel, vpgsListModel, zAlertFactory, deleteVpgFactory, createVPGFactory, globalStateModel, resumeVpgFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _vmsListModel_, _vpgsListModel_, _zAlertFactory_, _deleteVpgFactory_, _createVPGFactory_, _globalStateModel_, _resumeVpgFactory_) {
        testScope = $rootScope.$new();
        vmsListModel = _vmsListModel_;
        vpgsListModel = _vpgsListModel_;
        zAlertFactory = _zAlertFactory_;
        deleteVpgFactory = _deleteVpgFactory_;
        createVPGFactory = _createVPGFactory_;
        resumeVpgFactory = _resumeVpgFactory_;

        globalStateModel = _globalStateModel_;
        globalStateModel.data ={};

        spyOn(zAlertFactory, 'warn');
        spyOn(resumeVpgFactory, 'resume');
        spyOn(deleteVpgFactory, 'deleteVpgById');
        spyOn(createVPGFactory, 'openEdit');

        controller = $controller('vmsListController', {$scope: testScope, vmsListModel: vmsListModel, vpgsListModel: vpgsListModel, deleteVpgFactory: deleteVpgFactory, createVPGFactory: createVPGFactory,globalStateModel:globalStateModel});
    }));

    beforeEach(function () {
        testScope.selectedItems = [
            {"VirtualMachineIdentifier": {"InternalVmName": "vm-383", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "VirtualMachineName": "kobi_vm(2)", "VPGIdentifier": {"GroupGuid": "d316acc9-64dd-41ba-8302-574c8f889872"}, "AlertStatus": 0, "VPGName": "vpg", "State": {"State": 0, "Status": 1, "SubStatus": 0, "IsProgressActive": false, "ProgressPercentage": 0, "ProgressDetails": null, "IsFailoverEnabled": true, "IsMoveEnabled": true, "IsFailoverTestEnabled": true, "IsUpdateEnabled": true, "IsInsertCheckpointEnabled": true, "RelevantCheckpoint": null, "IsProtectedSiteConnected": true, "AlertStatus": 0, "AlertTips": {"Alerts": [], "HasMore": false, "TotalNumberOfAlerts": 0}, "IsDeleteEnabled": true, "IsForceSyncEnabled": true, "IsCloneEnabled": true, "VPGTimebombInfo": null, "CloneStatusVisualObject": null, "IsMoveInStagesSupported": true, "IsFailoverInStagesSupported": true, "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0}, "RequiresForceToDelete": false, "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": true, "IsResumeEnabled": false}, "IsRecoverCommitEnabled": false, "IsRecoverRollbackEnabled": false, "ActiveProcesses": {"RunningFailOverTest": null, "RunningClone": null, "Paused": null, "IsVpgNowPaused": false, "IsResumeEnabled": false, "RunningBackup": null, "IsStopFOTEnabled": false, "VpgUpdate": null, "TimebombInfo": null}, "ButtonsState": {"IsFailoverEnabled": true, "IsMoveEnabled": true, "IsFailoverTestEnabled": true, "IsUpdateEnabled": true, "IsPauseEnabled": true, "IsInsertCheckpointEnabled": true, "IsProtectedSiteConnected": true, "IsDeleteEnabled": true, "IsForceSyncEnabled": true, "IsCloneEnabled": true, "IsMoveInStagesSupported": true, "IsFailoverInStagesSupported": true, "IsRecoverCommitEnabled": false, "IsRecoverRollbackEnabled": false, "RequiresForceToDelete": false, "IsBackupEnabled": false, "IsAbortBackupEnabled": false}, "ProgressObject": null}, "Priority": 1, "ProvisionedStorageInMB": 121, "UsedStorageInMB": 109, "IOPS": 0, "IncomingThroughputInMb": 0, "OutgoingBandWidth": 0, "ActualRPO": 5, "ConfiguredRPO": 300, "LastTest": null, "Direction": 2, "OwnersId": {"OwnersGuid": "e3858814-a160-437b-a3d6-a2d3bae629a7"}, "SourceSiteName": "gui_local", "TargetSiteName": "gui_local", "CustomerName": "", "AlertTips": {"Alerts": [], "HasMore": false, "TotalNumberOfAlerts": 0}, "Entities": {"Source": 0, "Target": 0}, "ZorgId": null, "RetentionPolicy": 0, "BackupRelatedData": {"VpgBackupJobStatus": 2, "BackupRepository": "", "RestorePointsRange": 5, "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}}, "operation": {"progressValue": 0, "showProgress": false, "stopTestButton": false, "stopBackupButton": false}, "vpgState": {"display": "", "value": 0, "showProgress": false, "spanClass": "none", "divClass": "none"}, "id": "{\"InternalVmName\":\"vm-383\",\"ServerIdentifier\":{\"ServerGuid\":\"09d0d3b4-78d0-47c1-ad38-d01887e6d589\"}}", "StateLabel": {"display": "Meeting SLA", "value": 1}, "IOPSObj": {"display": "0 / sec", "value": 0}, "IncomingThroughputInMbObj": {"display": "0.0 MB / sec", "value": 0}, "OutgoingBandWidthObj": {"display": "0.0 MB", "value": 0}, "ProvisionedStorageInMBObj": {"display": "121 MB", "value": 121}, "UsedStorageInMBObj": {"display": "109 MB", "value": 109}, "ActualRPOObj": {"display": "5 sec", "value": 5}, "LastTestObj": {"display": null, "value": null}, "RetentionPolicyObj": {"display": "Disaster Recovery", "value": 0}, "BackupRepository": "", "VpgBackupJobStatusObj": {"display": " ", "value": 2}, "RestorePointsRangeObj": {"display": " ", "value": 5}, "BackupRelatedDataObj": {"display": " ", "value": {"VpgBackupJobStatus": 2, "BackupRepository": "", "RestorePointsRange": 5, "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}}}}
        ];
    });

    it('should have function been exist', function () {
        expect(testScope.selectedItemsChange).toBeDefined();
    });

    it('should have collection been exist', function () {
        expect(testScope.selectedItems).toBeDefined();
        expect(testScope.viewByValues).toBeDefined();
        expect(testScope.groupByValues).toBeDefined();
        expect(testScope.customOptions).toBeDefined();
    });

    it('should have run backup handler', function () {
        testScope.handleRunBackupClick();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should have stop backup handler', function () {
        testScope.handleStopBackupClick();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should have resume handler', function () {
        testScope.handleResumeClick();
        expect(resumeVpgFactory.resume).toHaveBeenCalled();
    });

    it('should have pause handler', function () {
        testScope.handlePauseClick();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should have delete handler', function () {
        testScope.handleDeleteButtonClick();
        expect(deleteVpgFactory.deleteVpgById).toHaveBeenCalled();
    });

    it('should have delete handler', function () {
        testScope.handleVPGEditClick();
        expect(createVPGFactory.openEdit).toHaveBeenCalled();
    });

    it('should have force handler', function () {
        testScope.forceSync();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

});
