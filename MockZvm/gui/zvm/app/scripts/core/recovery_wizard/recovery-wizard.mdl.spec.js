'use strict';

describe('Recovery wizard model', function () {
    var controller, testScope, recoveryWizardModel, enums, zAlertFactory, recoveryPolicyFactory, configureCheckpointFactory, zertoServiceFactory, result, selectedVpgs, $translate;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _recoveryWizardModel_, _zAlertFactory_, _enums_, _recoveryPolicyFactory_, _configureCheckpointFactory_, _zertoServiceFactory_, _$translate_) {
        testScope = $rootScope.$new();
        zAlertFactory = _zAlertFactory_;
        recoveryWizardModel = _recoveryWizardModel_;
        enums = _enums_;
        recoveryPolicyFactory = _recoveryPolicyFactory_;
        configureCheckpointFactory = _configureCheckpointFactory_;
        zertoServiceFactory = _zertoServiceFactory_;
        $translate = _$translate_;

        result = {"State":{"IsBanned":false,"BannedReason":null,"RemoteConnectionStatus":{"NumPeers":0,"NumConnectedPeers":0},"IsGeneralFailoverEnabled":true,"IsGeneralFailoverTestEnabled":true,"IsGeneralMoveEnabled":true,"IsGeneralInsertCheckpointEnabled":true,"IsGeneralCreateVPGEnabled":true,"IsGeneralRemoteFailoverEnabled":false,"IsGeneralRemoteFailoverTestEnabled":false,"IsGeneralLocalFailoverEnabled":true,"IsGeneralLocalFailoverTestEnabled":true,"AreThereAnyVpgs":true,"CanAddVCDVapps":true,"CanAddVCDReplicationDestinations":false,"AlertStatus":2,"AlertTips":{"Alerts":[{"Description":"ZVM internal assert alert.","SiteName":"gui_local_vcd","AlertLevel":1,"StartTime":"2015-12-02T09:12:06.011Z"},{"Description":"Host 172.20.205.5 has no VRA installed, and is part of cluster Cluster that contains hosts with installed VRAs.","SiteName":"gui_local_vcd","AlertLevel":0,"StartTime":"2015-12-01T15:18:57.078Z"}],"HasMore":false,"TotalNumberOfAlerts":2,"TotalNumberOfWarnings":1,"TotalNumberOfErrors":1},"IsManageSiteSettingsEnabled":true,"IsManageVraEnabled":true,"IsGeneralPauseEnabled":true,"IsGeneralResumeEnabled":false,"IsGeneralRestoreEnabled":true,"NumberOfRecentEvents":3,"NumberOfVras":1,"NumberOfStorages":3,"NumberOfRepositories":1,"IsSelfReplicationAllowed":true},"SiteDetails":{"SiteName":"gui_local_vcd","IpAddress":"10.10.0.124","VCenterName":"ZNest83VC","CurrentLocalTime":"16:37","ContactInfo":"denis.gorunov","ContactEmail":"denis.gorunov@zerto.com","ContactPhone":"066-6666666","ServerId":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"Location":"at Zerto","LicenseType":1,"SiteVersion":"4.5","BucketName":""},"ProtectionGroups":[{"Identifier":{"GroupGuid":"8371ebfc-9e9d-4341-9a99-8631d245002e"},"AlertStatus":0,"Name":"vpg1","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":129,"UsedStorageInMB":109,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":10,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"SampleVM":{"InternalVmName":"vm-396","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"OwnersId":{"OwnersGuid":"bc5766ba-718f-4cb3-908f-533d6274ccc7"},"SourceSiteName":"gui_local_vcd","SourceSiteIdentifier":{"SiteGuid":"93447b61-2130-4d51-a2a8-b92d618fb509"},"TargetSiteName":"gui_local_vcd","TargetSiteIdentifier":{"SiteGuid":"93447b61-2130-4d51-a2a8-b92d618fb509"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":null,"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":109176,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240}},{"Identifier":{"GroupGuid":"b1eb9c46-c0c1-4589-aaa6-a2ee1ba2a8cf"},"AlertStatus":0,"Name":"vpg2","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":2,"ProvisionedStorageInMB":267,"UsedStorageInMB":235,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":10,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"SampleVM":{"InternalVmName":"vm-398","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"OwnersId":{"OwnersGuid":"bc5766ba-718f-4cb3-908f-533d6274ccc7"},"SourceSiteName":"gui_local_vcd","SourceSiteIdentifier":{"SiteGuid":"93447b61-2130-4d51-a2a8-b92d618fb509"},"TargetSiteName":"gui_local_vcd","TargetSiteIdentifier":{"SiteGuid":"93447b61-2130-4d51-a2a8-b92d618fb509"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":null,"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":70,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":0,"RequiredJournalHealthInMinutes":240}}]};

        recoveryWizardModel.data = [];
        selectedVpgs = [{
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
        }];


        spyOn(recoveryWizardModel, 'createRecoveryItemVO').and.callThrough();
        spyOn(recoveryWizardModel, 'saveCommitPolicy').and.callThrough();
        spyOn(recoveryWizardModel, 'reselectReverse').and.callThrough();
        spyOn(recoveryWizardModel, '_checkSelectedNotContainCheckpoint').and.callThrough();
        spyOn(recoveryWizardModel, 'setCommitPolicyDisplay').and.callThrough();
        spyOn(recoveryWizardModel, 'CreateBootOrderObj').and.callThrough();
        spyOn(recoveryWizardModel, 'CreateScriptObj').and.callThrough();
        spyOn(recoveryWizardModel, 'CreateShutdownActionObj').and.callThrough();
        spyOn(recoveryWizardModel, 'CreateForceShutdownObj').and.callThrough();

        spyOn(zertoServiceFactory, 'GetProtectionGroupListScreen').and.callThrough();
        spyOn(zertoServiceFactory, 'GetValidVpgsForKeepSourceVMs').and.callThrough();
        spyOn(zertoServiceFactory, 'GetAdvancedSiteSettings').and.callThrough();
    }));

    it("should check controller/model definitions", function () {
        expect(recoveryWizardModel.createRecoveryItemVO).toBeDefined();
        expect(recoveryWizardModel.CreateScriptObj).toBeDefined();
        expect(recoveryWizardModel.CreateBootOrderObj).toBeDefined();
        expect(recoveryWizardModel.CreateForceShutdownObj).toBeDefined();
        expect(recoveryWizardModel.CreateShutdownActionObj).toBeDefined();
        expect(recoveryWizardModel.CreateCommitPolicyObj).toBeDefined();
        expect(recoveryWizardModel.handleVpgListScreen).toBeDefined();
        expect(recoveryWizardModel.initReverseItem).toBeDefined();
        expect(recoveryWizardModel.setCommitPolicyDisplay).toBeDefined();
        expect(recoveryWizardModel.initRecoveryItemVoData).toBeDefined();
        expect(recoveryWizardModel.reselectReverse).toBeDefined();
        expect(recoveryWizardModel.saveCommitPolicy).toBeDefined();
        expect(recoveryWizardModel.validateSelectVpgs).toBeDefined();
        expect(recoveryWizardModel.validateExecutionParameters).toBeDefined();
        expect(recoveryWizardModel.validateSummary).toBeDefined();
        expect(recoveryWizardModel.getSteps).toBeDefined();
    });

    it('should check init function', function(){
        recoveryWizardModel.init();
        expect(zertoServiceFactory.GetProtectionGroupListScreen).toHaveBeenCalled();

        recoveryWizardModel.handleVpgListScreen(result.ProtectionGroups);
        recoveryWizardModel.getVpgIdentifierBulkValidationForKeepSourceVMs(result.ProtectionGroups);

        expect(zertoServiceFactory.GetValidVpgsForKeepSourceVMs).toHaveBeenCalled();
        recoveryWizardModel.validationForKeepSourceVMsSuccess(result.ProtectionGroups);
        expect(recoveryWizardModel.data.vpgs.length).toEqual(2);
        expect(recoveryWizardModel.data.selectedVpgs.length).toEqual(0);
    });

    it('should check addAllowedPropToVpg function', function(){
        var protectionGroups = [{"Identifier":{"GroupGuid":"67ab837f-e52a-4b5f-bb5d-8a5dca3e55dc"},"AlertStatus":0,"Name":"vpg","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":4223,"UsedStorageInMB":126,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":10,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"SampleVM":{"InternalVmName":"vm-975","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"OwnersId":{"OwnersGuid":"6c94d436-32c2-492c-a199-8234360add78"},"SourceSiteName":"gui_local at Zerto","SourceSiteIdentifier":{"SiteGuid":"27aebcf7-78f0-43b5-b0a8-7a06344a2cdf"},"TargetSiteName":"gui_local at Zerto","TargetSiteIdentifier":{"SiteGuid":"27aebcf7-78f0-43b5-b0a8-7a06344a2cdf"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":95950,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"ConfiguredHistoryInMinutes":1440,"EarliestCheckpoint":{"Identifier":{"Identifier":1},"TimeStamp":"2016-08-16T08:22:15.000Z","Tag":null,"Vss":false}},{"Identifier":{"GroupGuid":"f208f927-9ce3-491a-9eb6-942c78c111e6"},"AlertStatus":0,"Name":"vpg1","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false,"IsFlrEnabled":true},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":4328,"UsedStorageInMB":4096,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":10,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"SampleVM":{"InternalVmName":"vm-996","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"OwnersId":{"OwnersGuid":"6c94d436-32c2-492c-a199-8234360add78"},"SourceSiteName":"gui_local at Zerto","SourceSiteIdentifier":{"SiteGuid":"27aebcf7-78f0-43b5-b0a8-7a06344a2cdf"},"TargetSiteName":"gui_local at Zerto","TargetSiteIdentifier":{"SiteGuid":"27aebcf7-78f0-43b5-b0a8-7a06344a2cdf"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":{"Guid":"00000000-0000-0000-0000-000000000000"},"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":79177,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240,"JournalHealthDescription":""},"ConfiguredHistoryInMinutes":1440,"EarliestCheckpoint":{"Identifier":{"Identifier":3337},"TimeStamp":"2016-08-16T13:01:48.000Z","Tag":null,"Vss":false}}];
        var vpgsValidForKeepSourceVMs = [{"GroupGuid":"67ab837f-e52a-4b5f-bb5d-8a5dca3e55dc"},{"GroupGuid":"f208f927-9ce3-491a-9eb6-942c78c111e6"}];

        recoveryWizardModel.addAllowedPropToVpg(protectionGroups, vpgsValidForKeepSourceVMs);
        expect(protectionGroups[0].IsKeepSourceVMsAllowed).toBeTruthy();
        expect(protectionGroups[1].IsKeepSourceVMsAllowed).toBeTruthy();

        vpgsValidForKeepSourceVMs = [{"GroupGuid":"f208f927-9ce3-491a-9eb6-942c78c111e6"}];

        recoveryWizardModel.addAllowedPropToVpg(protectionGroups, vpgsValidForKeepSourceVMs);
        expect(protectionGroups[0].IsKeepSourceVMsAllowed).toBeFalsy();
        expect(protectionGroups[1].IsKeepSourceVMsAllowed).toBeTruthy();
    });

    it('should check _checkSelectedNotContainCheckpoint function', function(){
        expect(recoveryWizardModel._checkSelectedNotContainCheckpoint()).not.toBeDefined();
        selectedVpgs[0].checkpointObj.lastCheckpoint = null;
        recoveryWizardModel.data.selectedVpgs = selectedVpgs;
        var res = {"Identifier":{"GroupGuid":"8371ebfc-9e9d-4341-9a99-8631d245002e"},"AlertStatus":0,"Name":"vpg1","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"NumberOfVms":1,"ProvisionedStorageInMB":129,"UsedStorageInMB":109,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":9,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"SampleVM":{"InternalVmName":"vm-396","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"OwnersId":{"OwnersGuid":"bc5766ba-718f-4cb3-908f-533d6274ccc7"},"SourceSiteName":"gui_local_vcd","SourceSiteIdentifier":{"SiteGuid":"93447b61-2130-4d51-a2a8-b92d618fb509"},"TargetSiteName":"gui_local_vcd","TargetSiteIdentifier":{"SiteGuid":"93447b61-2130-4d51-a2a8-b92d618fb509"},"CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":null,"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}},"RetentionPolicy":0,"BootOrder":false,"AreScriptsDefined":false,"HistoryInSeconds":103322,"ServiceProfileName":"","ServiceProfileId":null,"JournalHealthStatus":{"ActualJournalHealthInMinutes":240,"RequiredJournalHealthInMinutes":240},"operation":{"progressValue":0,"showProgress":false,"stopTestButton":false,"stopBackupButton":false,"stopCloneButton":false,"rollbackCommitButton":false},"vpgState":{"display":"","value":0,"showProgress":false,"spanClass":"none","divClass":"none","filterValue":""},"id":0,"vpgName":"vpg1 (1)","PeerSiteTypeObj":{"display":"gui_local_vcd","filterValue":"gui_local_vcd","value":0},"LocalSiteTypeObj":{"display":"gui_local_vcd","filterValue":"gui_local_vcd","value":0},"StateLabel":{"display":"Meeting SLA","value":1},"recoveryItemVo":{"useReverseProtection":false,"isBackupInProgress":null,"vpgInfo":null,"reverseLabel":"","IsProtectedSiteConnected":true,"targetType":0},"checkpointObj":{"checkpoint":"09/12/2015 15:00:00","lastCheckpoint":null,"filterValue":"2015-12-09T13:00:00.000Z"},"commitPolicyObj":{"commitPolicy":"Auto-Commit","filterValue":"Auto-Commit","defaultAction":1,"defaultTimeout":0},"init":true,"bootOrderObj":{"value":false},"scriptObj":{"value":false},"shutdownActionObj":{"value":"No"},"forceShutdownObj":{"value":false}};
        expect(recoveryWizardModel._checkSelectedNotContainCheckpoint()).toEqual(res);
    });

    it('should check createRecoveryItemVO function', function(){
        recoveryWizardModel.recoveryType = 1;
        recoveryWizardModel.createRecoveryItemVO();
        expect(zertoServiceFactory.GetAdvancedSiteSettings).toHaveBeenCalled();
    });

    it('should check initRecoveryItemVoData function', function(){

        var item = {commitPolicyObj : {setDefaultAction : function (){}, setDefaultTimeout: function(){}}, recoveryItemVo:{}, State : {ActiveProcesses : {RunningBackup: false}}};

        recoveryWizardModel.initRecoveryItemVoData(item);
        expect(recoveryWizardModel.setCommitPolicyDisplay).toHaveBeenCalled();

        expect(recoveryWizardModel.CreateBootOrderObj).toHaveBeenCalled();
        expect(recoveryWizardModel.CreateScriptObj).toHaveBeenCalled();
        expect(recoveryWizardModel.CreateShutdownActionObj).toHaveBeenCalled();
        expect(recoveryWizardModel.CreateForceShutdownObj).toHaveBeenCalled();
    });

    it('should verify initReverseItem function with missing configuration', function () {
        var item = {
            recoveryItemVo : {
                useReverseProtection : undefined,
                reverseLabel : ''
            },
            Entities: {"Source": 0, "Target": 0}
        };
        var reverseVpgSettings = {IsComplete : false};

        recoveryWizardModel.initReverseItem(item, reverseVpgSettings);

        expect(item.recoveryItemVo.useReverseProtection).toBeFalsy();
        expect(item.recoveryItemVo.reverseLabel).toBe($translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_MISSING'));
    });

    it('should verify initReverseItem function with completed configuration', function () {
        var item = {
            recoveryItemVo : {
                useReverseProtection : undefined,
                reverseLabel : ''
            },
            Entities: {"Source": 0, "Target": 0}
        };
        var reverseVpgSettings = {IsComplete : true};

        recoveryWizardModel.initReverseItem(item, reverseVpgSettings);

        expect(item.recoveryItemVo.useReverseProtection).toBeTruthy();
        expect(item.recoveryItemVo.reverseLabel).toBe($translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR'));
    });
});
