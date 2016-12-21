module.exports = function GetProtectionGroupListScreen() {
    return {
        "State": {
            "IsBanned": false,
            "BannedReason": null,
            "RemoteConnectionStatus": {
                "NumPeers": 0,
                "NumConnectedPeers": 0
            },
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
            "AlertStatus": 1,
            "AlertTips": {
                "Alerts": [
                    {
                        "Description": "Disk Scsi:2:9 on VRA vra on host 172.20.200.2 is unknown.",
                        "SiteName": "gui_localat Zerto",
                        "AlertLevel": 0,
                        "StartTime": "2016-05-15T09:13:43.446Z"
                    },
                    {
                        "Description": "Disk Scsi:2:10 on VRA vra on host 172.20.200.2 is unknown.",
                        "SiteName": "gui_localat Zerto",
                        "AlertLevel": 0,
                        "StartTime": "2016-05-15T09:13:43.446Z"
                    },
                    {
                        "Description": "Disk Scsi:0:13 on VRA vra on host 172.20.200.2 is unknown.",
                        "SiteName": "gui_localat Zerto",
                        "AlertLevel": 0,
                        "StartTime": "2016-05-15T08:16:08.939Z"
                    }
                ],
                "HasMore": true,
                "TotalNumberOfAlerts": 27,
                "TotalNumberOfWarnings": 27,
                "TotalNumberOfErrors": 0
            },
            "IsManageSiteSettingsEnabled": true,
            "IsManageVraEnabled": true,
            "IsGeneralPauseEnabled": true,
            "IsGeneralResumeEnabled": false,
            "IsGeneralRestoreEnabled": true,
            "NumberOfRecentEvents": 13,
            "NumberOfVras": 1,
            "NumberOfStorages": 2,
            "NumberOfRepositories": 1,
            "IsSelfReplicationAllowed": true,
            "IsPairEnabled": true,
            "IsUnPairEnabled": true
        },
        "SiteDetails": {
            "SiteName": "gui_localat Zerto",
            "IpAddress": "10.10.0.97",
            "VCenterName": "Pending vCenter connection",
            "CurrentLocalTime": "14:28",
            "ContactInfo": "guy.golan",
            "ContactEmail": "guy.golan@zerto.com",
            "ContactPhone": "066-6666666",
            "ServerId": {
                "ServerGuid": "00000000-0000-0000-0000-000000000000"
            },
            "Location": "someLocaiton",
            "LicenseType": 1,
            "SiteVersion": "4.5",
            "BucketName": ""
        },
        "ProtectionGroups": [
            {
                "Identifier": {
                    "GroupGuid": "eb30aeec-7b79-48f2-b088-e16d08b642f7"
                },
                "AlertStatus": 1,
                "Name": "sdfsdfsd",
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
                    "IsRecoverRollbackEnabled": true,
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
                        "IsAbortBackupEnabled": false,
                        "IsFlrEnabled": true
                    },
                    "ProgressObject": null,
                    "VMsInInitialSync": 0
                },
                "Priority": 1,
                "NumberOfVms": 4,
                "ProvisionedStorageInMB": 950,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 22.5,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 2,
                "SampleVM": {
                    "InternalVmName": "vm-669",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                    "VpgBackupJobStatus": 1,
                    "BackupRepository": "test",
                    "RestorePointsRange": 1,
                    "BackupSchedulingTime": {
                        "SchedulePeriodType": 1,
                        "RunningTimeOfDayInMinutes": 0,
                        "DayOfWeek": 6
                    }
                },
                "RetentionPolicy": 1,
                "BootOrder": false,
                "AreScriptsDefined": false,
                "HistoryInSeconds": 11152,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 180,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "7503a74d-48b9-4d36-ae01-ed460dfcb5b9"
                },
                "AlertStatus": 2,
                "Name": "fdsfds",
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
                "Priority": 2,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 226,
                "UsedStorageInMB": 0,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 12.5,
                "ConfiguredRPO": 600,
                "LastTest": "2016-05-09T06:40:03.265Z",
                "Direction": 1,
                "SampleVM": {
                    "InternalVmName": "vm-663",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto1",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 10679,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 180,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "bcfaa8ce-93b5-4f74-8a2b-9742e29486f9"
                },
                "AlertStatus": 0,
                "Name": "asdas",
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
                        "IsBackupEnabled": true,
                        "IsAbortBackupEnabled": false,
                        "IsFlrEnabled": true
                    },
                    "ProgressObject": null,
                    "VMsInInitialSync": 0
                },
                "Priority": 1,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 227,
                "UsedStorageInMB": 4,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 2,
                "SampleVM": {
                    "InternalVmName": "vm-673",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto1",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                    "VpgBackupJobStatus": 1,
                    "BackupRepository": "test",
                    "RestorePointsRange": 1,
                    "BackupSchedulingTime": {
                        "SchedulePeriodType": 1,
                        "RunningTimeOfDayInMinutes": 0,
                        "DayOfWeek": 6
                    }
                },
                "RetentionPolicy": 1,
                "BootOrder": false,
                "AreScriptsDefined": false,
                "HistoryInSeconds": 6900,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79a"
                },
                "AlertStatus": 0,
                "Name": "yoni",
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
                "Priority": 0,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 499,
                "ConfiguredRPO": 300,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto3",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto4",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "c12559a1-7f01-45f0-84a6-3733ccce74b3"
                },
                "AlertStatus": 0,
                "Name": "dasdsad",
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
                "ProvisionedStorageInMB": 226,
                "UsedStorageInMB": 0,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-672",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto5",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                    "Target": 1
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
                "HistoryInSeconds": 6583,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "a58719b9-d5c3-4213-a012-aa5e090b7b83"
                },
                "AlertStatus": 0,
                "Name": "rrsfsdfsd",
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
                        "Paused": true,
                        "IsVpgNowPaused": true,
                        "IsResumeEnabled": true,
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
                "Priority": 0,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 226,
                "UsedStorageInMB": 0,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 1,
                "SampleVM": {
                    "InternalVmName": "vm-664",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto4",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 5909,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "ef69981d-3731-41e7-9d84-5ee1003cbc43"
                },
                "AlertStatus": 0,
                "Name": "bfdbfdb",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 2,
                "SampleVM": {
                    "InternalVmName": "vm-680",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto5",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                    "Target": 2
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
                "HistoryInSeconds": 827,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 0,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "d563aabb-6762-405c-91e2-1881941606df"
                },
                "AlertStatus": 0,
                "Name": "czxczxc",
                "State": {
                    "State": 0,
                    "Status": 0,
                    "SubStatus": 4,
                    "IsProgressActive": true,
                    "ProgressPercentage": 0,
                    "ProgressDetails": null,
                    "IsFailoverEnabled": false,
                    "IsMoveEnabled": false,
                    "IsFailoverTestEnabled": false,
                    "IsUpdateEnabled": true,
                    "IsInsertCheckpointEnabled": false,
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
                    "IsCloneEnabled": false,
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
                        "IsFailoverEnabled": false,
                        "IsMoveEnabled": false,
                        "IsFailoverTestEnabled": false,
                        "IsUpdateEnabled": true,
                        "IsPauseEnabled": true,
                        "IsInsertCheckpointEnabled": false,
                        "IsProtectedSiteConnected": true,
                        "IsDeleteEnabled": true,
                        "IsForceSyncEnabled": true,
                        "IsCloneEnabled": false,
                        "IsMoveInStagesSupported": true,
                        "IsFailoverInStagesSupported": true,
                        "IsRecoverCommitEnabled": false,
                        "IsRecoverRollbackEnabled": false,
                        "RequiresForceToDelete": false,
                        "IsBackupEnabled": false,
                        "IsAbortBackupEnabled": false,
                        "IsFlrEnabled": false
                    },
                    "ProgressObject": {
                        "ProgressPercentage": 0,
                        "ProgressDetails": null
                    },
                    "VMsInInitialSync": 0
                },
                "Priority": 2,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 236,
                "UsedStorageInMB": 4,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 0,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 1,
                "SampleVM": {
                    "InternalVmName": "vm-674",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto1",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 0,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": null
            },
            {
                "Identifier": {"GroupGuid": "5d554e3a-285a-46e7-97d1-ad79c52e38b1"},
                "AlertStatus": 0,
                "Name": "VCDvApp",
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
                        "RunningFailOverTest": {"StopEnabled": true},
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
                        "IsAbortBackupEnabled": true
                    },
                    "ProgressObject": null
                },
                "Priority": 1,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 130,
                "UsedStorageInMB": 118,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 4894,
                "ConfiguredRPO": 300,
                "LastTest": null,
                "Direction": 1,
                "SampleVM": {
                    "InternalVmName": "vm-348",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "OwnersId": {"OwnersGuid": "f92f46dd-f39e-46ec-a3fa-33a6a86084e7"},
                "SourceSiteName": "gui_local_vcd3",
                "SourceSiteIdentifier": {"SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"},
                "TargetSiteName": "gui_local_vcd",
                "TargetSiteIdentifier": {"SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"},
                "CustomerName": "",
                "AlertTips": {
                    "Alerts": [],
                    "HasMore": false,
                    "TotalNumberOfAlerts": 0,
                    "TotalNumberOfWarnings": 0,
                    "TotalNumberOfErrors": 0
                },
                "Entities": {"Source": 0, "Target": 2},
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
                "HistoryInSeconds": 30,
                "ServiceProfileName": "System Service Profile",
                "ServiceProfileId": {"InternalId": "42da6ae7-1acf-4d96-9b82-82c2bf42a098"}
            },
            {
                "Identifier": {"GroupGuid": "5d554e3a-285a-46e7-97d1-ad79c52e38be"},
                "AlertStatus": 0,
                "Name": "VCDvApp2",
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
                        "RunningBackup": {"StopEnabled": true, ProgressValue: 50},
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
                        "IsAbortBackupEnabled": true
                    },
                    "ProgressObject": null
                },
                "Priority": 2,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 130,
                "UsedStorageInMB": 118,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 1500,
                "ConfiguredRPO": 300,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-348",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "OwnersId": {"OwnersGuid": "f92f46dd-f39e-46ec-a3fa-33a6a86084e7"},
                "SourceSiteName": "gui_local_vcd3",
                "SourceSiteIdentifier": {"SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"},
                "TargetSiteName": "gui_local_vcd",
                "TargetSiteIdentifier": {"SiteGuid": "5c45bea6-124b-4a6b-b817-1cc193aa1270"},
                "CustomerName": "",
                "AlertTips": {
                    "Alerts": [],
                    "HasMore": false,
                    "TotalNumberOfAlerts": 0,
                    "TotalNumberOfWarnings": 0,
                    "TotalNumberOfErrors": 0
                },
                "Entities": {"Source": 0, "Target": 2},
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
                "HistoryInSeconds": 30,
                "ServiceProfileName": "System Service Profile",
                "ServiceProfileId": {"InternalId": "42da6ae7-1acf-4d96-9b82-82c2bf42a098"}
            },
            {
                "Identifier": {
                    "GroupGuid": "1b89e9dc-7899-4878-8c99-ea553181f79a"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                    "Target": 3
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7699-4878-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "Priority": 0,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                    "Target": 4
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f78c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "Priority": 0,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 102124,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-4878-8c99-ba553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "Priority": 0,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                    "Target": 5
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89f9dc-7899-4878-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "Priority": 2,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-3878-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79d"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "Priority": 2,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79e"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "Priority": 0,
                "NumberOfVms": 1,
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-4878-8c99-ea553181f79b"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 1,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "4b89e9dc-7899-4878-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 2,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-1878-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b79e9dc-7899-4878-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 1,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9da-7899-4878-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 2,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "9b89e9dc-7899-c87a-8c99-ea553181f79c"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 0,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            },
            {
                "Identifier": {
                    "GroupGuid": "ab89e9dc-7899-4878-8c99-ea553181f79a"
                },
                "AlertStatus": 0,
                "Name": "asdasdsa",
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
                "ProvisionedStorageInMB": 272,
                "UsedStorageInMB": 50,
                "IOPS": 0,
                "IncomingThroughputInMb": 0,
                "OutgoingBandWidth": 0,
                "ActualRPO": 9,
                "ConfiguredRPO": 20,
                "LastTest": null,
                "Direction": 2,
                "SampleVM": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "OwnersId": {
                    "OwnersGuid": "c5f70408-143e-454f-802d-9d4142cefb78"
                },
                "SourceSiteName": "gui_localat Zerto",
                "SourceSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
                },
                "TargetSiteName": "gui_localat Zerto",
                "TargetSiteIdentifier": {
                    "SiteGuid": "75dd30bd-d8e2-46ce-9ff3-ad1fbd5a1642"
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
                "HistoryInSeconds": 6704,
                "ServiceProfileName": "",
                "ServiceProfileId": null,
                "JournalHealthStatus": {
                    "ActualJournalHealthInMinutes": 120,
                    "RequiredJournalHealthInMinutes": 240,
                    "JournalHealthDescription": ""
                }
            }
        ]
    };
};
