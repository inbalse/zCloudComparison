'use strict';

describe('test tasksFactory', function () {
    var factory,tasksListGridEvents;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_tasksFactory_, _tasksListGridEvents_) {
        factory = _tasksFactory_;
        tasksListGridEvents = _tasksListGridEvents_;
    }));

    it("should check definitions", function () {
        expect(factory.cancelTask).toBeDefined();
        expect(factory._processData).toBeDefined();
        expect(factory.setButtonsParameters).toBeDefined();
        expect(factory.setFotButtons).toBeDefined();
        expect(factory.setCloneButtons).toBeDefined();
        expect(factory.setResumeButtons).toBeDefined();
        expect(factory.setBackupButtons).toBeDefined();
        expect(factory.setTaskCancelButtons).toBeDefined();
        expect(factory.setRollBackCommitButtons).toBeDefined();
        expect(factory.stopBackup).toBeDefined();
        expect(factory.stopFailOverTest).toBeDefined();
        expect(factory.rollBackVpg).toBeDefined();
        expect(factory.commitVpg).toBeDefined();
        expect(factory.stopClone).toBeDefined();
        expect(factory.resume).toBeDefined();
        expect(factory.setFlrButtons).toBeDefined();
        expect(factory.flrDownloadFile).toBeDefined();
        expect(factory.flrUnmountVolume).toBeDefined();

    });

    it("should check process data function in create vpg", function () {
        var tasks = {
            "RunningTasksCount": 0, "TaskItems": [
                {
                    "TaskType": 1,
                    "VpgScreenState": {
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
                        "AlertTips": {"Alerts": [], "HasMore": false, "TotalNumberOfAlerts": 0},
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
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
                            "IsBackupEnabled": true,
                            "IsAbortBackupEnabled": false
                        },
                        "ProgressObject": null
                    },
                    "StateAndProgress": {"Progress": 100, "CurrentState": 5},
                    "RelatedEntities": [
                        {
                            "HostId": null,
                            "Name": "My VPG",
                            "ProtectionGroupId": {"GroupGuid": "e8e64927-f373-4247-a91d-c858194268b4"},
                            "SiteId": null
                        },
                        {
                            "HostId": null,
                            "Name": "Local",
                            "ProtectionGroupId": null,
                            "SiteId": {"SiteGuid": "b99a3ece-b66f-4c23-9b9a-073b538f6f51"}
                        }
                    ],
                    "ProtectionGroupId": {"GroupGuid": "e8e64927-f373-4247-a91d-c858194268b4"},
                    "InitiatedBy": "root",
                    "Started": "2014-09-16T09:18:24.504Z",
                    "Completed": "2014-09-16T09:18:57.291Z",
                    "TaskId": {
                        "Identifier": "4481c7ee-2603-46ea-b98f-9453a40b0313",
                        "SiteId": {"SiteGuid": "b99a3ece-b66f-4c23-9b9a-073b538f6f51"}
                    },
                    "IsCancellable": false,
                    "Information": ""
                }
            ]
        };

        var result = factory._processData(tasks);
        var task = result.TaskItems[0];
        expect(task.Started).toEqual('16/09/2014 12:18');
        expect(task.TaskTypeName).toEqual('Creating VPG');
        expect(task.showProgress).toBeFalsy();
        expect(task.Completed).toEqual('16/09/2014 12:18');
        expect(task.StatusText).toEqual('ENUM.TASK_STATUS.5');
        expect(task.showRightButton).toBeFalsy();
        expect(task.showLeftButton).toBeFalsy();
    });

    it("should check the buttons to be fail over test", function () {
        var tasks = {
            "RunningTasksCount": 0, "TaskItems": [
                {
                    "TaskType": 1,
                    "VpgScreenState": {
                        "State": 0,
                        "Status": 4,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": false,
                        "IsFailoverTestEnabled": false,
                        "IsUpdateEnabled": false,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 2,
                        "AlertTips": {
                            "Alerts": ["The VPG My VPG has been protected for 23 minutes but the journal history is only 6 minutes."],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 1
                        },
                        "IsDeleteEnabled": false,
                        "IsForceSyncEnabled": false,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": {
                                "ProgressValue": 0,
                                "StopEnabled": true,
                                "Stage": 0
                            },
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
                            "IsMoveEnabled": false,
                            "IsFailoverTestEnabled": false,
                            "IsUpdateEnabled": false,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": false,
                            "IsForceSyncEnabled": false,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": true,
                            "IsAbortBackupEnabled": false
                        },
                        "ProgressObject": null
                    },
                    "StateAndProgress": {"Progress": 100, "CurrentState": 5},
                    "RelatedEntities": [
                        {
                            "HostId": null,
                            "Name": "My VPG",
                            "ProtectionGroupId": {"GroupGuid": "e8e64927-f373-4247-a91d-c858194268b4"},
                            "SiteId": null
                        },
                        {
                            "HostId": null,
                            "Name": "Local",
                            "ProtectionGroupId": null,
                            "SiteId": {"SiteGuid": "b99a3ece-b66f-4c23-9b9a-073b538f6f51"}
                        }
                    ],
                    "ProtectionGroupId": {"GroupGuid": "e8e64927-f373-4247-a91d-c858194268b4"},
                    "InitiatedBy": "root",
                    "Started": "2014-09-16T09:18:24.504Z",
                    "Completed": "2014-09-16T09:18:57.291Z",
                    "TaskId": {
                        "Identifier": "4481c7ee-2603-46ea-b98f-9453a40b0313",
                        "SiteId": {"SiteGuid": "b99a3ece-b66f-4c23-9b9a-073b538f6f51"}
                    },
                    "IsCancellable": false,
                    "Information": ""
                },
                {
                    "TaskType": 4,
                    "VpgScreenState": {
                        "State": 0,
                        "Status": 4,
                        "SubStatus": 0,
                        "IsProgressActive": false,
                        "ProgressPercentage": 0,
                        "ProgressDetails": null,
                        "IsFailoverEnabled": true,
                        "IsMoveEnabled": false,
                        "IsFailoverTestEnabled": false,
                        "IsUpdateEnabled": false,
                        "IsInsertCheckpointEnabled": true,
                        "RelevantCheckpoint": null,
                        "IsProtectedSiteConnected": true,
                        "AlertStatus": 2,
                        "AlertTips": {
                            "Alerts": ["The VPG My VPG has been protected for 23 minutes but the journal history is only 6 minutes."],
                            "HasMore": false,
                            "TotalNumberOfAlerts": 1
                        },
                        "IsDeleteEnabled": false,
                        "IsForceSyncEnabled": false,
                        "IsCloneEnabled": true,
                        "VPGTimebombInfo": null,
                        "CloneStatusVisualObject": null,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
                        "RequiresForceToDelete": false,
                        "PauseResumeVisualObject": {
                            "IsVpgNowPaused": false,
                            "IsPauseEnabled": true,
                            "IsResumeEnabled": false
                        },
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "ActiveProcesses": {
                            "RunningFailOverTest": {
                                "ProgressValue": 0,
                                "StopEnabled": true,
                                "Stage": 0
                            },
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
                            "IsMoveEnabled": false,
                            "IsFailoverTestEnabled": false,
                            "IsUpdateEnabled": false,
                            "IsPauseEnabled": true,
                            "IsInsertCheckpointEnabled": true,
                            "IsProtectedSiteConnected": true,
                            "IsDeleteEnabled": false,
                            "IsForceSyncEnabled": false,
                            "IsCloneEnabled": true,
                            "IsMoveInStagesSupported": true,
                            "IsFailoverInStagesSupported": true,
                            "IsRecoverCommitEnabled": false,
                            "IsRecoverRollbackEnabled": false,
                            "RequiresForceToDelete": false,
                            "IsBackupEnabled": true,
                            "IsAbortBackupEnabled": false
                        },
                        "ProgressObject": null
                    },
                    "StateAndProgress": {"Progress": 0, "CurrentState": 2},
                    "RelatedEntities": [
                        {
                            "HostId": null,
                            "Name": "My VPG",
                            "ProtectionGroupId": {"GroupGuid": "e8e64927-f373-4247-a91d-c858194268b4"},
                            "SiteId": null
                        },
                        {
                            "HostId": null,
                            "Name": "Local",
                            "ProtectionGroupId": null,
                            "SiteId": {"SiteGuid": "b99a3ece-b66f-4c23-9b9a-073b538f6f51"}
                        }
                    ],
                    "ProtectionGroupId": {"GroupGuid": "e8e64927-f373-4247-a91d-c858194268b4"},
                    "InitiatedBy": "root",
                    "Started": "2014-09-16T09:40:33.091Z",
                    "Completed": "2014-09-16T09:41:19.711Z",
                    "TaskId": {
                        "Identifier": "94da11ad-d98d-4f42-93d4-06f9258a8571",
                        "SiteId": {"SiteGuid": "b99a3ece-b66f-4c23-9b9a-073b538f6f51"}
                    },
                    "IsCancellable": false,
                    "Information": ""
                }
            ]
        };
        var result = factory._processData(tasks);
        var task = result.TaskItems[1];
        expect(task.showRightButton).toBeTruthy();
        expect(task.rightButtonClass).toEqual('stop-btn');
        expect(task.rightButtonEvent).toEqual(tasksListGridEvents.StopFailoverTestEvent);
    });
});
