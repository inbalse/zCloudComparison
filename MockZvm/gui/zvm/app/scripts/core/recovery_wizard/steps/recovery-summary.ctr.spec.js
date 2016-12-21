'use strict';

describe('Recovery summary controller', function () {
    var controller, testScope, testRecoveryWizardModel, enums, testZertoServiceFactory, testRecoveryWizardFactory, testzAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, recoveryWizardModel, _enums_){
        testScope = $rootScope.$new();
        testRecoveryWizardModel = jasmine.createSpyObj('recoveryWizardModel', ['createRecoveryItemVO', 'recoveryType', 'mapDataToTopology','getTopologyData']);
        testZertoServiceFactory = jasmine.createSpyObj('testZertoServiceFactory', ['FailoverBeforeCommit', 'FailoverTest', 'MoveBeforeCommit']);
        testzAlertFactory = jasmine.createSpyObj('testzAlertFactory', ['warn', 'buttons']);
        testRecoveryWizardModel.data = {};
        testRecoveryWizardModel.data.selectedVpgs = [
            {
                "Identifier": {
                    "GroupGuid": "12103262-f709-4c5a-9605-051746aefe3d"
                },
                "AlertStatus": 0,
                "Name": "moreno",
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
                    "MoveAutoContinueState": {
                        "AutoContinueActivated": false,
                        "Action": 1,
                        "TimeLeftInSec": 0
                    },
                    "RequiresForceToDelete": false,
                    "PauseResumeVisualObject": {
                        "IsVpgNowPaused": false,
                        "IsPauseEnabled": true,
                        "IsResumeEnabled": false
                    },
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
                        "IsAbortBackupEnabled": false,
                        "IsFlrEnabled": true
                    },
                    "ProgressObject": null,
                    "VMsInInitialSync": 0
                },
                "Priority": 1,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 4223,
                "UsedStorageInMB": 126,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 4,
                "ConfiguredRPO": 300,
                "LastTest": null,
                "Direction": 2,
                "SampleVM": {
                    "InternalVmName": "vm-975",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "7db05222-22b1-446a-b4df-b080a147aa51"
                },
                "SourceSiteName": "gui_local at Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "73c0eb64-2d78-4788-b42c-19d4a24f3ba2"
                },
                "TargetSiteName": "gui_local at Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "73c0eb64-2d78-4788-b42c-19d4a24f3ba2"
                },
                "CustomerName": "",
                "AlertTips": {
                    "Alerts": [],
                    "HasMore": false,
                    "TotalNumberOfAlerts": 0,
                    "TotalNumberOfWarnings": 0,
                    "TotalNumberOfErrors": 0
                },
                "Entities": {
                    "Source": 0,
                    "Target": 0
                },
                "ZorgId": {
                    "Guid": "00000000-0000-0000-0000-000000000000"
                },
                "BackupRelatedData": {
                    "VpgBackupJobStatus": 2,
                    "BackupRepository": "",
                    "RestorePointsRange": 5,
                    "BackupSchedulingTime": {
                        "SchedulePeriodType": 0,
                        "RunningTimeOfDayInMinutes": 0,
                        "DayOfWeek": 6
                    }
                },
                "RetentionPolicy": 0,
                "BootOrder": false,
                "AreScriptsDefined": false,
                "HistoryInSeconds": 75658,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 240,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                },
                "ConfiguredHistoryInMinutes": 1440,
                "EarliestCheckpoint": {
                    "Identifier": {
                        "Identifier": 1
                    },
                    "TimeStamp": "2016-08-17T13:46:06.000Z",
                    "Tag": null,
                    "Vss": false
                },
                "vpgState": {
                    "display": "",
                    "value": 0,
                    "showProgress": false,
                    "filterValue": ""
                },
                "id": 0,
                "vpgName": "moreno (1)",
                "PeerSiteTypeObj": {
                    "display": "gui_local at Zerto",
                    "filterValue": "gui_local at Zerto",
                    "value": 0
                },
                "LocalSiteTypeObj": {
                    "display": "gui_local at Zerto",
                    "filterValue": "gui_local at Zerto",
                    "value": 0
                },
                "StateLabel": {
                    "display": "Meeting SLA",
                    "value": 1
                },
                "recoveryItemVo": {
                    "useReverseProtection": false,
                    "isBackupInProgress": null,
                    "vpgInfo": null,
                    "reverseLabel": "",
                    "IsProtectedSiteConnected": true,
                    "targetType": 0
                },
                "checkpointObj": {
                    "checkpoint": "18/08/2016 13:47:09",
                    "lastCheckpoint": {
                        "Identifier": {
                            "Identifier": 15093
                        },
                        "TimeStamp": "2016-08-18T10:47:09.000Z",
                        "Tag": null,
                        "Vss": false
                    },
                    "filterValue": "2016-08-18T10:47:09.000Z"
                },
                "commitPolicyObj": {
                    "commitPolicy": "Auto-Commit",
                    "filterValue": "Auto-Commit",
                    "defaultAction": 1,
                    "defaultTimeout": 0
                },
                "keepSourceVmsObj": {
                    "value": false
                },
                "init": true,
                "bootOrderObj": {
                    "value": false
                },
                "scriptObj": {
                    "value": false
                },
                "shutdownActionObj": {
                    "value": "No"
                },
                "forceShutdownObj": {
                    "value": false
                }
            }
        ];
        testRecoveryWizardModel.data.vpgs = [];
        testRecoveryWizardModel.createRecoveryItemVO.and.returnValue({then: function () {
        }});
        testZertoServiceFactory.FailoverBeforeCommit.and.returnValue({then: function () {
        }});
        testZertoServiceFactory.FailoverTest.and.returnValue({then: function () {
        }});
        testZertoServiceFactory.MoveBeforeCommit.and.returnValue({then: function () {
        }});
        testRecoveryWizardFactory = jasmine.createSpyObj('testRecoveryWizardFactory', ['closeModal']);
        enums = _enums_;
        controller = $controller('recoverySummaryController', {$scope: testScope, recoveryWizardModel: testRecoveryWizardModel, zertoServiceFactory:testZertoServiceFactory, recoveryWizardFactory:testRecoveryWizardFactory, zAlertFactory:testzAlertFactory});
    }));

    it("should check  definitions",function(){
        expect(testScope.data).toBeDefined();
    });

    it("should check handle failover live",function(){
        testRecoveryWizardModel.recoveryType = enums.RecoveryType.Failover;
        testScope.handleClickButton();
        expect(testZertoServiceFactory.FailoverBeforeCommit).toHaveBeenCalled();
        expect(testRecoveryWizardFactory.closeModal).toHaveBeenCalled();

    });

    it("should check handle failover test",function(){
        testRecoveryWizardModel.recoveryType = enums.RecoveryType.FailoverTest;
        testScope.handleClickButton();
        expect(testZertoServiceFactory.FailoverTest).toHaveBeenCalled();
        expect(testRecoveryWizardFactory.closeModal).toHaveBeenCalled();
    });

    it("should check Move operation",function(){
        testRecoveryWizardModel.recoveryType = enums.RecoveryType.Move;
        testScope.data[0].commitPolicyObj.defaultAction = enums.MoveNextAction.Rollback;
        testScope.handleClickButton();
        expect(testZertoServiceFactory.MoveBeforeCommit).toHaveBeenCalled();
    });

});
