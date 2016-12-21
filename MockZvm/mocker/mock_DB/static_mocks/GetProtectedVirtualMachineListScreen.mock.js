module.exports = function GetProtectedVirtualMachineListScreen() {
    return {
        "State": {
            "IsBanned": false,
            "BannedReason": null,
            "RemoteConnectionStatus": {"NumPeers": 0, "NumConnectedPeers": 0},
            "IsGeneralFailoverEnabled": true,
            "IsGeneralFailoverTestEnabled": true,
            "IsGeneralMoveEnabled": true,
            "IsGeneralInsertCheckpointEnabled": true,
            "IsGeneralCreateVPGEnabled": true,
            "IsGeneralRemoteFailoverEnabled": false,
            "IsGeneralRemoteFailoverTestEnabled": false,
            "IsGeneralLocalFailoverEnabled": true,
            "IsGeneralLocalFailoverTestEnabled": true,
            "AreThereAnyVpgs": true,
            "CanAddVCDVapps": false,
            "CanAddVCDReplicationDestinations": false,
            "AlertStatus": 2,
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG vpg3 has been protected for 13 minutes but the journal history is only 8 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:44:22.179Z"
                }, {
                    "Description": "The VPG vpg2 has been protected for 15 minutes but the journal history is only 4 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:42:51.870Z"
                }, {
                    "Description": "The VPG vpg1 has been protected for 20 minutes but the journal history is only 8 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:37:32.766Z"
                }], "HasMore": true, "TotalNumberOfAlerts": 7, "TotalNumberOfWarnings": 4, "TotalNumberOfErrors": 3
            },
            "IsManageSiteSettingsEnabled": true,
            "IsManageVraEnabled": true,
            "IsGeneralPauseEnabled": true,
            "IsGeneralResumeEnabled": false,
            "IsGeneralRestoreEnabled": true,
            "NumberOfRecentEvents": 5,
            "NumberOfVras": 1,
            "NumberOfStorages": 3,
            "NumberOfRepositories": 1,
            "IsSelfReplicationAllowed": true
        },
        "SiteDetails": {
            "SiteName": "gui_local",
            "IpAddress": "10.10.0.55",
            "VCenterName": "ZNest81VC",
            "CurrentLocalTime": "09:46",
            "ContactInfo": "guy",
            "ContactEmail": "guy@zerto.com",
            "ContactPhone": "066-6666666",
            "ServerId": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
            "Location": "at Zerto",
            "LicenseType": 1,
            "SiteVersion": "4.0",
            "BucketName": ""
        },
        "VirtualMachines": [{
            "VirtualMachineIdentifier": {
                "InternalVmName": "vm-463",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "VirtualMachineName": "liron-local-vm",
            "VPGIdentifier": {"GroupGuid": "5d554e3a-285a-46e7-97d1-ad79c52e38ba"},
            "AlertStatus": 2,
            "VPGName": "Hyper-v (1)",
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
                        "Description": "The VPG vpg1 has been protected for 20 minutes but the journal history is only 8 minutes.",
                        "SiteName": "gui_local",
                        "AlertLevel": 1,
                        "StartTime": "2015-08-09T06:37:32.766Z"
                    }], "HasMore": false, "TotalNumberOfAlerts": 1, "TotalNumberOfWarnings": 0, "TotalNumberOfErrors": 1
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
                    "IsBackupEnabled": true,
                    "IsAbortBackupEnabled": false
                },
                "ProgressObject": null
            },
            "Priority": 1,
            "ProvisionedStorageInMB": 226,
            "UsedStorageInMB": 0,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 7,
            "ConfiguredRPO": 300,
            "LastTest": null,
            "Direction": 2,
            "OwnersId": {"OwnersGuid": "a0ac3958-1176-4400-a99a-3e9d9217f5e5"},
            "SourceSiteName": "gui_local",
            "TargetSiteName": "gui_local",
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG vpg1 has been protected for 20 minutes but the journal history is only 8 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:37:32.766Z"
                }], "HasMore": false, "TotalNumberOfAlerts": 1, "TotalNumberOfWarnings": 0, "TotalNumberOfErrors": 1
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "RetentionPolicy": 1,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 1,
                "BackupRepository": "guy",
                "RestorePointsRange": 1,
                "BackupSchedulingTime": {"SchedulePeriodType": 1, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            }
        }, {
            "VirtualMachineIdentifier": {
                "InternalVmName": "vm-465",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "VirtualMachineName": "kobi-local-vm",
            "VPGIdentifier": {"GroupGuid": "e127cce6-c67e-4cff-97d5-eb824a34752d"},
            "AlertStatus": 2,
            "VPGName": "vpg1",
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
                        "Description": "The VPG vpg1 has been protected for 20 minutes but the journal history is only 8 minutes.",
                        "SiteName": "gui_local",
                        "AlertLevel": 1,
                        "StartTime": "2015-08-09T06:37:32.766Z"
                    }], "HasMore": false, "TotalNumberOfAlerts": 1, "TotalNumberOfWarnings": 0, "TotalNumberOfErrors": 1
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
                    "IsBackupEnabled": true,
                    "IsAbortBackupEnabled": false
                },
                "ProgressObject": null
            },
            "Priority": 1,
            "ProvisionedStorageInMB": 226,
            "UsedStorageInMB": 0,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 7,
            "ConfiguredRPO": 300,
            "LastTest": null,
            "Direction": 2,
            "OwnersId": {"OwnersGuid": "a0ac3958-1176-4400-a99a-3e9d9217f5e5"},
            "SourceSiteName": "gui_local",
            "TargetSiteName": "gui_local",
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG vpg1 has been protected for 20 minutes but the journal history is only 8 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:37:32.766Z"
                }], "HasMore": false, "TotalNumberOfAlerts": 1, "TotalNumberOfWarnings": 0, "TotalNumberOfErrors": 1
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "RetentionPolicy": 1,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 1,
                "BackupRepository": "guy",
                "RestorePointsRange": 1,
                "BackupSchedulingTime": {"SchedulePeriodType": 1, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            }
        }, {
            "VirtualMachineIdentifier": {
                "InternalVmName": "vm-427",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "VirtualMachineName": "vapp-vm-test",
            "VPGIdentifier": {"GroupGuid": "1efd06ea-75b3-4b5a-82b1-8796535627cf"},
            "AlertStatus": 2,
            "VPGName": "vpg2",
            "State": {
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
                    "Alerts": [{
                        "Description": "The VPG vpg2 has been protected for 15 minutes but the journal history is only 4 minutes.",
                        "SiteName": "gui_local",
                        "AlertLevel": 1,
                        "StartTime": "2015-08-09T06:42:51.870Z"
                    }, {
                        "Description": "The  journal for VM vapp-vm-test in VPG vpg2 has reached 50 percent of the protected VM volumes size.",
                        "SiteName": "gui_local",
                        "AlertLevel": 0,
                        "StartTime": "2015-08-09T06:31:01.930Z"
                    }], "HasMore": false, "TotalNumberOfAlerts": 2, "TotalNumberOfWarnings": 1, "TotalNumberOfErrors": 1
                },
                "IsDeleteEnabled": false,
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
                    "RunningFailOverTest": {"ProgressValue": 0, "StopEnabled": true, "Stage": 0},
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
            "Priority": 1,
            "ProvisionedStorageInMB": 226,
            "UsedStorageInMB": 0,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 7,
            "ConfiguredRPO": 300,
            "LastTest": "2015-08-09T06:40:03.265Z",
            "Direction": 2,
            "OwnersId": {"OwnersGuid": "a0ac3958-1176-4400-a99a-3e9d9217f5e5"},
            "SourceSiteName": "gui_local",
            "TargetSiteName": "gui_local",
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG vpg2 has been protected for 15 minutes but the journal history is only 4 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:42:51.870Z"
                }, {
                    "Description": "The  journal for VM vapp-vm-test in VPG vpg2 has reached 50 percent of the protected VM volumes size.",
                    "SiteName": "gui_local",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-09T06:31:01.930Z"
                }], "HasMore": false, "TotalNumberOfAlerts": 2, "TotalNumberOfWarnings": 1, "TotalNumberOfErrors": 1
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "RetentionPolicy": 0,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "RestorePointsRange": 5,
                "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            }
        }, {
            "VirtualMachineIdentifier": {
                "InternalVmName": "vm-469",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "VirtualMachineName": "gui-test-vm-MULTIPLE_VOLUMES",
            "VPGIdentifier": {"GroupGuid": "ed1dbc14-bac3-440e-b31e-4433d1076631"},
            "AlertStatus": 2,
            "VPGName": "vpg3",
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
                        "Description": "The VPG vpg3 has been protected for 13 minutes but the journal history is only 8 minutes.",
                        "SiteName": "gui_local",
                        "AlertLevel": 1,
                        "StartTime": "2015-08-09T06:44:22.179Z"
                    }, {
                        "Description": "The  journal for VM gui-test-vm-MULTIPLE_VOLUMES in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                        "SiteName": "gui_local",
                        "AlertLevel": 0,
                        "StartTime": "2015-08-09T06:33:32.256Z"
                    }, {
                        "Description": "The  journal for VM yaniv-local-vm in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                        "SiteName": "gui_local",
                        "AlertLevel": 0,
                        "StartTime": "2015-08-09T06:33:32.256Z"
                    }], "HasMore": true, "TotalNumberOfAlerts": 4, "TotalNumberOfWarnings": 3, "TotalNumberOfErrors": 1
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
                "ProgressObject": null
            },
            "Priority": 1,
            "ProvisionedStorageInMB": 247,
            "UsedStorageInMB": 0,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 7,
            "ConfiguredRPO": 300,
            "LastTest": null,
            "Direction": 2,
            "OwnersId": {"OwnersGuid": "a0ac3958-1176-4400-a99a-3e9d9217f5e5"},
            "SourceSiteName": "gui_local",
            "TargetSiteName": "gui_local",
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG vpg3 has been protected for 13 minutes but the journal history is only 8 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:44:22.179Z"
                }, {
                    "Description": "The  journal for VM gui-test-vm-MULTIPLE_VOLUMES in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                    "SiteName": "gui_local",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-09T06:33:32.256Z"
                }, {
                    "Description": "The  journal for VM yaniv-local-vm in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                    "SiteName": "gui_local",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-09T06:33:32.256Z"
                }], "HasMore": true, "TotalNumberOfAlerts": 4, "TotalNumberOfWarnings": 3, "TotalNumberOfErrors": 1
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "RetentionPolicy": 0,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "RestorePointsRange": 5,
                "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            }
        }, {
            "VirtualMachineIdentifier": {
                "InternalVmName": "vm-471",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "VirtualMachineName": "gui-local-IN_RESOURCE_POOL-1",
            "VPGIdentifier": {"GroupGuid": "ed1dbc14-bac3-440e-b31e-4433d1076631"},
            "AlertStatus": 2,
            "VPGName": "vpg3",
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
                        "Description": "The VPG vpg3 has been protected for 13 minutes but the journal history is only 8 minutes.",
                        "SiteName": "gui_local",
                        "AlertLevel": 1,
                        "StartTime": "2015-08-09T06:44:22.179Z"
                    }, {
                        "Description": "The  journal for VM gui-test-vm-MULTIPLE_VOLUMES in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                        "SiteName": "gui_local",
                        "AlertLevel": 0,
                        "StartTime": "2015-08-09T06:33:32.256Z"
                    }, {
                        "Description": "The  journal for VM yaniv-local-vm in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                        "SiteName": "gui_local",
                        "AlertLevel": 0,
                        "StartTime": "2015-08-09T06:33:32.256Z"
                    }], "HasMore": true, "TotalNumberOfAlerts": 4, "TotalNumberOfWarnings": 3, "TotalNumberOfErrors": 1
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
                "ProgressObject": null
            },
            "Priority": 1,
            "ProvisionedStorageInMB": 226,
            "UsedStorageInMB": 0,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 7,
            "ConfiguredRPO": 300,
            "LastTest": null,
            "Direction": 2,
            "OwnersId": {"OwnersGuid": "a0ac3958-1176-4400-a99a-3e9d9217f5e5"},
            "SourceSiteName": "gui_local",
            "TargetSiteName": "gui_local",
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG vpg3 has been protected for 13 minutes but the journal history is only 8 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:44:22.179Z"
                }, {
                    "Description": "The  journal for VM gui-test-vm-MULTIPLE_VOLUMES in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                    "SiteName": "gui_local",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-09T06:33:32.256Z"
                }, {
                    "Description": "The  journal for VM yaniv-local-vm in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                    "SiteName": "gui_local",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-09T06:33:32.256Z"
                }], "HasMore": true, "TotalNumberOfAlerts": 4, "TotalNumberOfWarnings": 3, "TotalNumberOfErrors": 1
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "RetentionPolicy": 0,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "RestorePointsRange": 5,
                "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            }
        }, {
            "VirtualMachineIdentifier": {
                "InternalVmName": "vm-478",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "VirtualMachineName": "yaniv-local-vm",
            "VPGIdentifier": {"GroupGuid": "ed1dbc14-bac3-440e-b31e-4433d1076631"},
            "AlertStatus": 2,
            "VPGName": "vpg3",
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
                        "Description": "The VPG vpg3 has been protected for 13 minutes but the journal history is only 8 minutes.",
                        "SiteName": "gui_local",
                        "AlertLevel": 1,
                        "StartTime": "2015-08-09T06:44:22.179Z"
                    }, {
                        "Description": "The  journal for VM gui-test-vm-MULTIPLE_VOLUMES in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                        "SiteName": "gui_local",
                        "AlertLevel": 0,
                        "StartTime": "2015-08-09T06:33:32.256Z"
                    }, {
                        "Description": "The  journal for VM yaniv-local-vm in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                        "SiteName": "gui_local",
                        "AlertLevel": 0,
                        "StartTime": "2015-08-09T06:33:32.256Z"
                    }], "HasMore": true, "TotalNumberOfAlerts": 4, "TotalNumberOfWarnings": 3, "TotalNumberOfErrors": 1
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
                "ProgressObject": null
            },
            "Priority": 1,
            "ProvisionedStorageInMB": 226,
            "UsedStorageInMB": 0,
            "IOPS": 0,
            "IncomingThroughputInMb": 0,
            "OutgoingBandWidth": 0,
            "ActualRPO": 7,
            "ConfiguredRPO": 300,
            "LastTest": null,
            "Direction": 2,
            "OwnersId": {"OwnersGuid": "a0ac3958-1176-4400-a99a-3e9d9217f5e5"},
            "SourceSiteName": "gui_local",
            "TargetSiteName": "gui_local",
            "CustomerName": "",
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG vpg3 has been protected for 13 minutes but the journal history is only 8 minutes.",
                    "SiteName": "gui_local",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-09T06:44:22.179Z"
                }, {
                    "Description": "The  journal for VM gui-test-vm-MULTIPLE_VOLUMES in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                    "SiteName": "gui_local",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-09T06:33:32.256Z"
                }, {
                    "Description": "The  journal for VM yaniv-local-vm in VPG vpg3 has reached 50 percent of the protected VM volumes size.",
                    "SiteName": "gui_local",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-09T06:33:32.256Z"
                }], "HasMore": true, "TotalNumberOfAlerts": 4, "TotalNumberOfWarnings": 3, "TotalNumberOfErrors": 1
            },
            "Entities": {"Source": 0, "Target": 0},
            "ZorgId": null,
            "RetentionPolicy": 0,
            "BackupRelatedData": {
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "RestorePointsRange": 5,
                "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
            }
        }]
    };
};
