module.exports = function GetTasksByFilter() {
    return {
        "RunningTasksCount": 0,
        "TaskItems": [{
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
                    "IsAbortBackupEnabled": false,
                    "IsFlrEnabled": true
                },
                "ProgressObject": null,
                "VMsInInitialSync": 0
            },
            "CommandTaskRecordButtonsState": {
                "IsResumeEnabled": false,
                "IsRecoverRollbackEnabled": false,
                "IsStopFailoverTestEnabled": false,
                "IsFlrUnmountEnabled": false,
                "IsAbortBackupEnabled": false,
                "IsFlrBrowseEnabled": false,
                "IsCancelable": false
            },
            "StateAndProgress": {"Progress": 100, "CurrentState": 5},
            "RelatedEntities": [{
                "HostId": null,
                "Name": "vApp_2",
                "ProtectionGroupId": {"GroupGuid": "3a33426a-860c-4f3e-ba8c-01346c8a8dff"},
                "SiteId": null,
                "FlrSessionIdentifier": null
            }, {
                "HostId": null,
                "Name": "Site A",
                "ProtectionGroupId": null,
                "SiteId": {"SiteGuid": "abbdb7ad-42fb-4451-b6db-c19923819a5a"},
                "FlrSessionIdentifier": null
            }, {
                "HostId": null,
                "Name": "Local",
                "ProtectionGroupId": null,
                "SiteId": {"SiteGuid": "58b9e45b-a3fe-4653-9129-cd5812c38a2e"},
                "FlrSessionIdentifier": null
            }],
            "ProtectionGroupId": {"GroupGuid": "3a33426a-860c-4f3e-ba8c-01346c8a8dff"},
            "InitiatedBy": "Administrator",
            "Started": "2016-11-20T08:36:44.699Z",
            "Completed": "2016-11-20T08:37:13.199Z",
            "TaskId": {
                "Identifier": "f4e68769-8216-4645-8663-0fa62d79dd88",
                "SiteId": {"SiteGuid": "58b9e45b-a3fe-4653-9129-cd5812c38a2e"}
            },
            "IsCancellable": false,
            "Information": ""
        }, {
            "TaskType": 23,
            "VpgScreenState": null,
            "CommandTaskRecordButtonsState": {
                "IsResumeEnabled": false,
                "IsRecoverRollbackEnabled": false,
                "IsStopFailoverTestEnabled": false,
                "IsFlrUnmountEnabled": false,
                "IsAbortBackupEnabled": false,
                "IsFlrBrowseEnabled": false,
                "IsCancelable": false
            },
            "StateAndProgress": {"Progress": 100, "CurrentState": 5},
            "RelatedEntities": [{
                "HostId": null,
                "Name": "Local",
                "ProtectionGroupId": null,
                "SiteId": {"SiteGuid": "58b9e45b-a3fe-4653-9129-cd5812c38a2e"},
                "FlrSessionIdentifier": null
            }],
            "ProtectionGroupId": null,
            "InitiatedBy": "Administrator",
            "Started": "2016-11-20T08:01:42.711Z",
            "Completed": "2016-11-20T08:01:43.555Z",
            "TaskId": {
                "Identifier": "1a3eaf47-2e16-49d6-9868-fb0d0d5e03e9",
                "SiteId": {"SiteGuid": "58b9e45b-a3fe-4653-9129-cd5812c38a2e"}
            },
            "IsCancellable": false,
            "Information": ""
        }, {
            "TaskType": 30,
            "VpgScreenState": null,
            "CommandTaskRecordButtonsState": {
                "IsResumeEnabled": false,
                "IsRecoverRollbackEnabled": false,
                "IsStopFailoverTestEnabled": false,
                "IsFlrUnmountEnabled": false,
                "IsAbortBackupEnabled": false,
                "IsFlrBrowseEnabled": false,
                "IsCancelable": false
            },
            "StateAndProgress": {"Progress": 100, "CurrentState": 5},
            "RelatedEntities": [{
                "HostId": null,
                "Name": "Local",
                "ProtectionGroupId": null,
                "SiteId": {"SiteGuid": "58b9e45b-a3fe-4653-9129-cd5812c38a2e"},
                "FlrSessionIdentifier": null
            }],
            "ProtectionGroupId": null,
            "InitiatedBy": "Administrator",
            "Started": "2016-11-20T08:01:41.304Z",
            "Completed": "2016-11-20T08:01:44.773Z",
            "TaskId": {
                "Identifier": "fb468a5d-3489-4e2a-a94d-7eb0021a4f4d",
                "SiteId": {"SiteGuid": "58b9e45b-a3fe-4653-9129-cd5812c38a2e"}
            },
            "IsCancellable": false,
            "Information": ""
        }]
    };
};
