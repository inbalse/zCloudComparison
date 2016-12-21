module.exports = function GetMinimalVpgList() {
    return {
        "ProtectionGroups": [
            {
                "Identifier": {"GroupGuid": "2594a4db-e82f-4d99-af19-4105a90687b6"},
                "Name": "xxx",
                "State": {
                    "State": 0,
                    "Status": 4,
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
                    "AlertStatus": 2,
                    "AlertTips": {
                        "Alerts": [{
                            "Description": "VPG xxx journal history is less than 1 hour of the configured 4 hours. This has occurred because of a synchronization between the protected and recovery sites and will automatically be resolved when the journal history is fully populated.",
                            "SiteName": "gui_local",
                            "AlertLevel": 1,
                            "StartTime": "2015-08-20T03:45:14.217Z"
                        }],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 1,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 1
                    },
                    "IsDeleteEnabled": true,
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
                        "IsForceSyncEnabled": false,
                        "IsCloneEnabled": true,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "RequiresForceToDelete": false,
                        "IsBackupEnabled": false,
                        "IsAbortBackupEnabled": false
                    },
                    "ProgressObject": null
                },
                "Direction": 2,
                "SourceSiteName": "gui_local",
                "TargetSiteName": "gui_local",
                "Entities": {"Source": 0, "Target": 0},
                "BootOrder": false,
                "AreScriptsDefined": false
            }, {
                "Identifier": {"GroupGuid": "b6ad8833-3c5b-4439-b4d0-a64cfc1ee64e"},
                "Name": "xxxaa",
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
                        "IsAbortBackupEnabled": false
                    },
                    "ProgressObject": null
                },
                "Direction": 2,
                "SourceSiteName": "gui_local",
                "TargetSiteName": "gui_local",
                "Entities": {"Source": 0, "Target": 0},
                "BootOrder": false,
                "AreScriptsDefined": false
            }]
    };
};
