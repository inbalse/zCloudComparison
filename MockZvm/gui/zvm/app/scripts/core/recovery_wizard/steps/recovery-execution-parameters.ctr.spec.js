'use strict';

describe('Recovery execution parameters controller', function () {
    var controller, testScope, recoveryWizardModel, enums, zAlertFactory, recoveryPolicyFactory, configureCheckpointFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _recoveryWizardModel_, _zAlertFactory_, _enums_, _recoveryPolicyFactory_, _configureCheckpointFactory_) {
        testScope = $rootScope.$new();
        zAlertFactory = _zAlertFactory_;
        recoveryWizardModel = _recoveryWizardModel_;
        enums = _enums_;
        recoveryPolicyFactory = _recoveryPolicyFactory_;
        configureCheckpointFactory = _configureCheckpointFactory_;

        recoveryWizardModel.data = {};
        recoveryWizardModel.data.selectedVpgs = [{
            "Identifier": {"GroupGuid": "8371ebfc-9e9d-4341-9a99-8631d245002e"},
            "AlertStatus": 0,
            "Name": "vpg1",
            "State": {
                "State": 0,
                "Status": 1,
                "SubStatus": 0,
                "IsProgressActive": false,
                "ProgressPercentage": 0,
                "ProgressDetails": null,
                "IsFailoverEnabled": true,
                "IsMoveEnabled": true,
                "IsFailoverTestEnabled": true,
                "IsUpdateEnabled": true,
                "IsInsertCheckpointEnabled": true,
                "RelevantCheckpoint": null,
                "IsProtectedSiteConnected": true,
                "AlertStatus": 0,
                "AlertTips": {
                    "Alerts": [],
                    "HasMore": false,
                    "TotalNumberOfAlerts": 0,
                    "TotalNumberOfWarnings": 0,
                    "TotalNumberOfErrors": 0
                },
                "IsDeleteEnabled": true,
                "IsForceSyncEnabled": true,
                "IsCloneEnabled": true,
                "VPGTimebombInfo": null,
                "CloneStatusVisualObject": null,
                "IsMoveInStagesSupported": true,
                "IsFailoverInStagesSupported": true,
                "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
                "RequiresForceToDelete": false,
                "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": true, "IsResumeEnabled": false},
                "IsRecoverCommitEnabled": false,
                "IsRecoverRollbackEnabled": false,
                "ActiveProcesses": {
                    "RunningFailOverTest": null,
                    "RunningClone": null,
                    "Paused": null,
                    "IsVpgNowPaused": false,
                    "IsResumeEnabled": false,
                    "RunningBackup": null,
                    "IsStopFOTEnabled": false,
                    "VpgUpdate": null,
                    "TimebombInfo": null
                },
                "ButtonsState": {
                    "IsFailoverEnabled": true,
                    "IsMoveEnabled": true,
                    "IsFailoverTestEnabled": true,
                    "IsUpdateEnabled": true,
                    "IsPauseEnabled": true,
                    "IsInsertCheckpointEnabled": true,
                    "IsProtectedSiteConnected": true,
                    "IsDeleteEnabled": true,
                    "IsForceSyncEnabled": true,
                    "IsCloneEnabled": true,
                    "IsMoveInStagesSupported": true,
                    "IsFailoverInStagesSupported": true,
                    "IsRecoverCommitEnabled": false,
                    "IsRecoverRollbackEnabled": false,
                    "RequiresForceToDelete": false,
                    "IsBackupEnabled": false,
                    "IsAbortBackupEnabled": false
                },
                "ProgressObject": null,
                "VMsInInitialSync": 0
            },
            "Priority": 1,
            "NumberOfVms": 1,
            "ProvisionedStorageInMB": 129,
            "UsedStorageInMB": 109,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 9,
            "ConfiguredRPO": 300,
            "LastTest": null,
            "Direction": 2,
            "SampleVM": {
                "InternalVmName": "vm-396",
                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
            },
            "OwnersId": {"OwnersGuid": "bc5766ba-718f-4cb3-908f-533d6274ccc7"},
            "SourceSiteName": "gui_local_vcd",
            "SourceSiteIdentifier": {"SiteGuid": "93447b61-2130-4d51-a2a8-b92d618fb509"},
            "TargetSiteName": "gui_local_vcd",
            "TargetSiteIdentifier": {"SiteGuid": "93447b61-2130-4d51-a2a8-b92d618fb509"},
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [],
                "HasMore": false,
                "TotalNumberOfAlerts": 0,
                "TotalNumberOfWarnings": 0,
                "TotalNumberOfErrors": 0
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "RestorePointsRange": 5,
                "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            },
            "RetentionPolicy": 0,
            "BootOrder": false,
            "AreScriptsDefined": false,
            "HistoryInSeconds": 103322,
            "ServiceProfileName": "",
            "ServiceProfileId": null,
            "JournalHealthStatus": {"ActualJournalHealthInMinutes": 240, "RequiredJournalHealthInMinutes": 240},
            "operation": {
                "progressValue": 0,
                "showProgress": false,
                "stopTestButton": false,
                "stopBackupButton": false,
                "stopCloneButton": false,
                "rollbackCommitButton": false
            },
            "vpgState": {
                "display": "",
                "value": 0,
                "showProgress": false,
                "spanClass": "none",
                "divClass": "none",
                "filterValue": ""
            },
            "id": 0,
            "vpgName": "vpg1 (1)",
            "PeerSiteTypeObj": {"display": "gui_local_vcd", "filterValue": "gui_local_vcd", "value": 0},
            "LocalSiteTypeObj": {"display": "gui_local_vcd", "filterValue": "gui_local_vcd", "value": 0},
            "StateLabel": {"display": "Meeting SLA", "value": 1},
            "recoveryItemVo": {
                "useReverseProtection": false,
                "isBackupInProgress": null,
                "vpgInfo": null,
                "reverseLabel": "",
                "IsProtectedSiteConnected": true,
                "targetType": 0
            },
            "checkpointObj": {
                "checkpoint": "09/12/2015 15:00:00",
                "lastCheckpoint": {
                    "Identifier": {"Identifier": 60035},
                    "TimeStamp": "2015-12-09T13:00:00.000Z",
                    "Tag": null,
                    "Vss": false
                },
                "filterValue": "2015-12-09T13:00:00.000Z"
            },
            "commitPolicyObj": {
                "commitPolicy": "Auto-Commit",
                "filterValue": "Auto-Commit",
                "defaultAction": 1,
                "defaultTimeout": 0
            },
            "init": true,
            "bootOrderObj": {"value": false},
            "scriptObj": {"value": false},
            "shutdownActionObj": {"value": "No"},
            "forceShutdownObj": {"value": false}
        },{
            "Identifier": {"GroupGuid": "8371ebfc-9e9d-4341-9a99-8631d245002e"},
            "AlertStatus": 0,
            "Name": "vpg1",
            "State": {
                "State": 0,
                "Status": 1,
                "SubStatus": 0,
                "IsProgressActive": false,
                "ProgressPercentage": 0,
                "ProgressDetails": null,
                "IsFailoverEnabled": true,
                "IsMoveEnabled": true,
                "IsFailoverTestEnabled": true,
                "IsUpdateEnabled": true,
                "IsInsertCheckpointEnabled": true,
                "RelevantCheckpoint": null,
                "IsProtectedSiteConnected": true,
                "AlertStatus": 0,
                "AlertTips": {
                    "Alerts": [],
                    "HasMore": false,
                    "TotalNumberOfAlerts": 0,
                    "TotalNumberOfWarnings": 0,
                    "TotalNumberOfErrors": 0
                },
                "IsDeleteEnabled": true,
                "IsForceSyncEnabled": true,
                "IsCloneEnabled": true,
                "VPGTimebombInfo": null,
                "CloneStatusVisualObject": null,
                "IsMoveInStagesSupported": true,
                "IsFailoverInStagesSupported": true,
                "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
                "RequiresForceToDelete": false,
                "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": true, "IsResumeEnabled": false},
                "IsRecoverCommitEnabled": false,
                "IsRecoverRollbackEnabled": false,
                "ActiveProcesses": {
                    "RunningFailOverTest": null,
                    "RunningClone": null,
                    "Paused": null,
                    "IsVpgNowPaused": false,
                    "IsResumeEnabled": false,
                    "RunningBackup": null,
                    "IsStopFOTEnabled": false,
                    "VpgUpdate": null,
                    "TimebombInfo": null
                },
                "ButtonsState": {
                    "IsFailoverEnabled": true,
                    "IsMoveEnabled": true,
                    "IsFailoverTestEnabled": true,
                    "IsUpdateEnabled": true,
                    "IsPauseEnabled": true,
                    "IsInsertCheckpointEnabled": true,
                    "IsProtectedSiteConnected": true,
                    "IsDeleteEnabled": true,
                    "IsForceSyncEnabled": true,
                    "IsCloneEnabled": true,
                    "IsMoveInStagesSupported": true,
                    "IsFailoverInStagesSupported": true,
                    "IsRecoverCommitEnabled": false,
                    "IsRecoverRollbackEnabled": false,
                    "RequiresForceToDelete": false,
                    "IsBackupEnabled": false,
                    "IsAbortBackupEnabled": false
                },
                "ProgressObject": null,
                "VMsInInitialSync": 0
            },
            "Priority": 1,
            "NumberOfVms": 1,
            "ProvisionedStorageInMB": 129,
            "UsedStorageInMB": 109,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 9,
            "ConfiguredRPO": 300,
            "LastTest": null,
            "Direction": 2,
            "SampleVM": {
                "InternalVmName": "vm-396",
                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
            },
            "OwnersId": {"OwnersGuid": "bc5766ba-718f-4cb3-908f-533d6274ccc7"},
            "SourceSiteName": "gui_local_vcd",
            "SourceSiteIdentifier": {"SiteGuid": "93447b61-2130-4d51-a2a8-b92d618fb509"},
            "TargetSiteName": "gui_local_vcd",
            "TargetSiteIdentifier": {"SiteGuid": "93447b61-2130-4d51-a2a8-b92d618fb509"},
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [],
                "HasMore": false,
                "TotalNumberOfAlerts": 0,
                "TotalNumberOfWarnings": 0,
                "TotalNumberOfErrors": 0
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "RestorePointsRange": 5,
                "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            },
            "RetentionPolicy": 0,
            "BootOrder": false,
            "AreScriptsDefined": false,
            "HistoryInSeconds": 103322,
            "ServiceProfileName": "",
            "ServiceProfileId": null,
            "JournalHealthStatus": {"ActualJournalHealthInMinutes": 240, "RequiredJournalHealthInMinutes": 240},
            "operation": {
                "progressValue": 0,
                "showProgress": false,
                "stopTestButton": false,
                "stopBackupButton": false,
                "stopCloneButton": false,
                "rollbackCommitButton": false
            },
            "vpgState": {
                "display": "",
                "value": 0,
                "showProgress": false,
                "spanClass": "none",
                "divClass": "none",
                "filterValue": ""
            },
            "id": 0,
            "vpgName": "vpg1 (1)",
            "PeerSiteTypeObj": {"display": "gui_local_vcd", "filterValue": "gui_local_vcd", "value": 0},
            "LocalSiteTypeObj": {"display": "gui_local_vcd", "filterValue": "gui_local_vcd", "value": 0},
            "StateLabel": {"display": "Meeting SLA", "value": 1},
            "recoveryItemVo": {
                "useReverseProtection": false,
                "isBackupInProgress": null,
                "vpgInfo": null,
                "reverseLabel": "",
                "IsProtectedSiteConnected": true,
                "targetType": 0
            },
            "checkpointObj": {
                "checkpoint": "09/12/2015 15:00:00",
                "lastCheckpoint": {
                    "Identifier": {"Identifier": 60035},
                    "TimeStamp": "2015-12-09T13:00:00.000Z",
                    "Tag": null,
                    "Vss": false
                },
                "filterValue": "2015-12-09T13:00:00.000Z"
            },
            "commitPolicyObj": {
                "commitPolicy": "None",
                "filterValue": "None",
                "defaultAction": 2,
                "defaultTimeout": 0
            },
            "init": true,
            "bootOrderObj": {"value": false},
            "scriptObj": {"value": false},
            "shutdownActionObj": {"value": "No"},
            "forceShutdownObj": {"value": false}
        }];

        controller = $controller('recoveryExecutionParametersController', {
            $scope: testScope,
            recoveryWizardModel: recoveryWizardModel,
            zAlertFactory: zAlertFactory,
            recoveryPolicyFactory: recoveryPolicyFactory,
            configureCheckpointFactory: configureCheckpointFactory
        });


        spyOn(recoveryWizardModel, 'createRecoveryItemVO').and.callThrough();
        spyOn(recoveryWizardModel, 'saveCommitPolicy').and.callThrough();
        spyOn(recoveryWizardModel, 'reselectReverse').and.callThrough();
        spyOn(recoveryWizardModel, '_checkSelectedNotContainCheckpoint');
        spyOn(zAlertFactory, 'info');
        spyOn(recoveryPolicyFactory, 'open').and.callThrough();
        spyOn(configureCheckpointFactory, 'open').and.callThrough();
    }));

    it("should check controller/model definitions", function () {
        expect(testScope.editRecoveryDisabled).toBeTruthy();
        expect(testScope.selectedItems).toBeDefined();
        expect(testScope.viewByValues).toBeDefined();
        expect(testScope.groupByValues).toBeDefined();
        expect(testScope.gridObj).toBeDefined();
        expect(testScope.gridId).toBeDefined();
        expect(testScope.commitValues.length).toEqual(3);
        expect(testScope.showEdit).toBeDefined();
        expect(testScope.showReverseAll).toBeDefined();
        expect(testScope.customOptions).toBeDefined();
        expect(testScope.editRecovery).toBeDefined();
        expect(testScope._initData).toBeDefined();
        expect(testScope._getVPGInActiveBackup).toBeDefined();
        expect(testScope.reselectReverse).toBeDefined();
        expect(testScope.rowClick).toBeDefined();
        expect(testScope.selectedItemsChange).toBeDefined();

    });

    it('should check _initData function', function () {
        testScope._initData();
        expect(recoveryWizardModel.createRecoveryItemVO).toHaveBeenCalled();
    });

    it('should check editRecovery function', function () {
        testScope.editRecovery();
        expect(recoveryPolicyFactory.open).toHaveBeenCalled();
    });

    it('should check _getVPGInActiveBackup function', function () {
        expect(testScope._getVPGInActiveBackup(recoveryWizardModel.data.selectedVpgs)).toEqual([]);
        recoveryWizardModel.data.selectedVpgs[0].recoveryItemVo.isBackupInProgress = true;
        expect(testScope._getVPGInActiveBackup(recoveryWizardModel.data.selectedVpgs)[0].vpgName).toEqual('vpg1 (1)');
    });

    it('should check reselectReverse function', function () {
        testScope.reselectReverse();
        expect(recoveryWizardModel.reselectReverse).toHaveBeenCalled();
    });

    it('should check rowClick function', function () {
        var e = {target: {rel: 'test'}, preventDefault: function(){}};
        var row = 0;
        testScope.gridData = recoveryWizardModel.data.selectedVpgs;

        testScope.rowClick(e, row);
        expect(configureCheckpointFactory.open).toHaveBeenCalled();
    });

    it("should check vpg in backup progressing", function () {
        recoveryWizardModel.data.recoveryItemVo ={isBackupInProgress: true};
        recoveryWizardModel.createRecoveryItemVO();
        expect(recoveryWizardModel._checkSelectedNotContainCheckpoint).toHaveBeenCalled();
    });

    it('should hide "Reverse Protect All" when there are no vpg', function() {

        testScope.gridData = recoveryWizardModel.data.selectedVpgs;
        recoveryWizardModel.recoveryType = enums.RecoveryType.Failover;
        expect(testScope.showReverseAll()).toBeTruthy();
        recoveryWizardModel.recoveryType = enums.RecoveryType.Move;
        expect(testScope.showReverseAll()).toBeTruthy();
        recoveryWizardModel.recoveryType = enums.RecoveryType.FailoverTest;
        expect(testScope.showReverseAll()).toBeFalsy();


        recoveryWizardModel.recoveryType = enums.RecoveryType.Failover;

        testScope.gridData[0].commitPolicyObj.defaultAction = enums.MoveNextAction.None;
        testScope.gridData[1].commitPolicyObj.defaultAction = enums.MoveNextAction.None;
        expect(testScope.showReverseAll()).toBeFalsy();

        testScope.gridData[0].commitPolicyObj.defaultAction = enums.MoveNextAction.Commit;
        testScope.gridData[1].commitPolicyObj.defaultAction = enums.MoveNextAction.None;
        expect(testScope.showReverseAll()).toBeTruthy();

        testScope.gridData[0].commitPolicyObj.defaultAction = enums.MoveNextAction.Commit;
        testScope.gridData[1].commitPolicyObj.defaultAction = enums.MoveNextAction.Commit;
        expect(testScope.showReverseAll()).toBeTruthy();

    });

    it('should show or hide "Reverse Protect All" when vpg target type is AWS or Azure', function() {
        testScope.gridData = recoveryWizardModel.data.selectedVpgs;

        testScope.gridData[0].recoveryItemVo.targetType = enums.VpgEntityType.Aws;
        testScope.gridData[1].recoveryItemVo.targetType = enums.VpgEntityType.Azure;

        expect(testScope.showReverseAll()).toBeFalsy();

        testScope.gridData[1].recoveryItemVo.targetType = enums.VpgEntityType.VCvApp;
        testScope.gridData[1].commitPolicyObj.defaultAction = enums.MoveNextAction.Commit;

        expect(testScope.showReverseAll()).toBeTruthy();
    });
});
