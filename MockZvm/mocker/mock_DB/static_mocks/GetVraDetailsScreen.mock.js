module.exports = function GetVraDetailsScreen() {
    return {
        "State": {
            "Status": 0,
            "InstallOrUninstallProgress": 0,
            "AlertStatus": 0,
            "AlertTips": {
                "Alerts": [],
                "HasMore": false,
                "TotalNumberOfAlerts": 0,
                "TotalNumberOfWarnings": 0,
                "TotalNumberOfErrors": 0
            },
            "GhostStatus": {
                "IsGhost": false
            },
            "MaintenanceStatus": {
                "MaintainedGroups": [],
                "State": 7,
                "Progress": 536870911
            },
            "UpgradeStatus": 4,
            "UpgradeDetails": "Latest Version",
            "IsEditEnabled": true,
            "IsChangePasswordEnabled": true,
            "IsUpgradeEnabled": false,
            "IsUninstallEnabled": true,
            "IsChangeHostEnabled": false
        },
        "Summary": {
            "HostInfo": {
                "BaseComputeResourceIdentifier": {
                    "InternalName": "host-643",
                    "Type": 0,
                    "ServerIdentifier": {
                        "ServerGuid": "09d50d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "ResourcePoolIdentifier": null,
                "DisplayName": "172.20.200.2"
            },
            "HostVersion": {
                "Version": "5.5",
                "Build": "1331820",
                "HostCredentialRequired": true
            },
            "OwningClusterName": "",
            "ProtectedCounters": {
                "Vpgs": 0,
                "Vms": 0,
                "PromotingVms": 0,
                "TestOrRecoverBeforeCommitVms": 0,
                "Volumes": 0,
                "StorageSizeInMB": 0
            },
            "RecoveryCounters": {
                "Vpgs": 0,
                "Vms": 0,
                "PromotingVms": 0,
                "TestOrRecoverBeforeCommitVms": 0,
                "Volumes": 0,
                "StorageSizeInMB": 0
            },
            "DiskBoxGroup": []
        },
        "Config": {
            "Info": {
                "Datastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "ZNest81 DS"
                },
                "StoragePod": null,
                "Network": {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-648"
                    },
                    "DisplayName": "VM Network"
                },
                "IpConfiguration": {
                    "Ip": "",
                    "NetMask": "",
                    "DefaultGw": "",
                    "PeerNetwork": "",
                    "PeerNetMask": "",
                    "PeerGw": ""
                },
                "InstalledVraVersion": "4.5",
                "IsDhcpConf": true,
                "BandwidthGroup": "default_group",
                "MemoryInGB": 0,
                "VraVM": {
                    "DisplayName": "vra",
                    "Id": {
                        "InternalVmName": "vm-701",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    }
                },
                "InstalledUsingSshKey": false
            }
        },
        "Performance": {
            "CpuUsageInPercent": {
                "Values": [{
                    "Value": 0,
                    "Time": "2015-11-23T14:19:31.507Z"
                }, {
                    "Value": 0,
                    "Time": "2015-11-23T14:20:09.126Z"
                }],
                "ValuesAsCsv": "Date,Value\r\n20151123 161931,0\r\n20151123 162009,0\r\n"
            },
            "LocalMemoryUsageInPercent": {
                "Values": [{
                    "Value": 0,
                    "Time": "2015-11-23T14:19:31.507Z"
                }, {
                    "Value": 0,
                    "Time": "2015-11-23T14:20:09.126Z"
                }],
                "ValuesAsCsv": "Date,Value\r\n20151123 161931,0\r\n20151123 162009,0\r\n"
            },
            "RemoteMemoryUsageInPercent": {
                "Values": [{
                    "Value": 0,
                    "Time": "2015-11-23T14:19:31.507Z"
                }, {
                    "Value": 0,
                    "Time": "2015-11-23T14:20:09.126Z"
                }],
                "ValuesAsCsv": "Date,Value\r\n20151123 161931,0\r\n20151123 162009,0\r\n"
            }
        },
        "Usage": {
            "VPGs": [{
                "Identifier": {"GroupGuid": "a873d13a-1393-495e-a714-8b2460601477"},
                "Name": "vyum y7y",
                "Direction": 0,
                "Entities": {"Source": 0, "Target": 0},
                "SourceSiteName": "CustA",
                "TargetSiteName": "CustB",
                "CustomerName": "",
                "State": {
                    "State": 0,
                    "Status": 2,
                    "SubStatus": 30,
                    "IsProgressActive": true,
                    "ProgressPercentage": 100,
                    "ProgressDetails": {
                        "TotalKiloBytes": 11392,
                        "ProgressInKiloBytes": 11392,
                        "EtaInSeconds": 536870911
                    },
                    "IsFailoverEnabled": false,
                    "IsMoveEnabled": false,
                    "IsFailoverTestEnabled": false,
                    "IsUpdateEnabled": true,
                    "IsInsertCheckpointEnabled": true,
                    "RelevantCheckpoint": null,
                    "IsProtectedSiteConnected": true,
                    "AlertStatus": 2,
                    "AlertTips": {
                        "Alerts": [{
                            "Description": "VPG vyum y7y exceeds configured RPO of 5 minutes by more than 25%.",
                            "SiteName": "CustA",
                            "AlertLevel": 1,
                            "StartTime": "2016-07-13T08:55:51.120Z"
                        }, {
                            "Description": "Cannot write to journal disk [datastore1] ZeRTO volumes/319_datastore1_vm-340_history_172_20_70_50_base318log_volume.vmdk because storage is almost full.",
                            "SiteName": "CustB",
                            "AlertLevel": 1,
                            "StartTime": "2016-07-13T08:49:59.680Z"
                        }, {
                            "Description": "The storage datastore1 is close to full capacity and further protection of VMs in VPGs using this storage cannot continue until you increase the storage size. The minimum free space required is 30GB.",
                            "SiteName": "CustB",
                            "AlertLevel": 1,
                            "StartTime": "2016-07-13T08:49:39.680Z"
                        }],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 3,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 3
                    },
                    "IsDeleteEnabled": true,
                    "IsForceSyncEnabled": true,
                    "IsCloneEnabled": false,
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
                        "IsFailoverEnabled": false,
                        "IsMoveEnabled": false,
                        "IsFailoverTestEnabled": false,
                        "IsUpdateEnabled": true,
                        "IsPauseEnabled": true,
                        "IsInsertCheckpointEnabled": true,
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
                        "ProgressPercentage": 100,
                        "ProgressDetails": {
                            "TotalKiloBytes": 11392,
                            "ProgressInKiloBytes": 11392,
                            "EtaInSeconds": 536870911
                        }
                    },
                    "VMsInInitialSync": 0
                },
                "NumberOfVms": 1,
                "TotalNumberOfVms": 1,
                "ProvisionedStorageInMB": 30945,
                "TotalProvisionedStorageInMB": 30945,
                "UsedStorageInMB": 16455,
                "TotalUsedStorageInMB": 16455,
                "IOPS": 8,
                "TotalIOPS": 8,
                "IncomingThroughputInMb": 1,
                "TotalIncomingThroughputInMb": 1.99560546875,
                "BackupRelatedData": {
                    "VpgBackupJobStatus": 2,
                    "BackupRepository": "",
                    "RestorePointsRange": 5,
                    "BackupSchedulingTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6}
                },
                "RetentionPolicy": 0
            }],
            "VMs": [{
                "VirtualMachineIdentifier": {
                    "InternalVmName": "vm-340",
                    "ServerIdentifier": {"ServerGuid": "d09c7643-fc3a-4dd6-b68d-f0b4f18b2d49"}
                },
                "VirtualMachineName": "Windows Server 2012 Standard(1)(1)",
                "VPGIdentifier": {"GroupGuid": "a873d13a-1393-495e-a714-8b2460601477"},
                "VPGName": "vyum y7y",
                "Direction": 0,
                "State": {
                    "State": 0,
                    "Status": 2,
                    "SubStatus": 30,
                    "IsProgressActive": true,
                    "ProgressPercentage": 100,
                    "ProgressDetails": {
                        "TotalKiloBytes": 11392,
                        "ProgressInKiloBytes": 11392,
                        "EtaInSeconds": 536870911
                    },
                    "IsFailoverEnabled": false,
                    "IsMoveEnabled": false,
                    "IsFailoverTestEnabled": false,
                    "IsUpdateEnabled": true,
                    "IsInsertCheckpointEnabled": true,
                    "RelevantCheckpoint": null,
                    "IsProtectedSiteConnected": true,
                    "AlertStatus": 2,
                    "AlertTips": {
                        "Alerts": [{
                            "Description": "VPG vyum y7y exceeds configured RPO of 5 minutes by more than 25%.",
                            "SiteName": "CustA",
                            "AlertLevel": 1,
                            "StartTime": "2016-07-13T08:55:51.120Z"
                        }, {
                            "Description": "Cannot write to journal disk [datastore1] ZeRTO volumes/319_datastore1_vm-340_history_172_20_70_50_base318log_volume.vmdk because storage is almost full.",
                            "SiteName": "CustB",
                            "AlertLevel": 1,
                            "StartTime": "2016-07-13T08:49:59.680Z"
                        }, {
                            "Description": "The storage datastore1 is close to full capacity and further protection of VMs in VPGs using this storage cannot continue until you increase the storage size. The minimum free space required is 30GB.",
                            "SiteName": "CustB",
                            "AlertLevel": 1,
                            "StartTime": "2016-07-13T08:49:39.680Z"
                        }],
                        "HasMore": false,
                        "TotalNumberOfAlerts": 3,
                        "TotalNumberOfWarnings": 0,
                        "TotalNumberOfErrors": 3
                    },
                    "IsDeleteEnabled": true,
                    "IsForceSyncEnabled": true,
                    "IsCloneEnabled": false,
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
                        "IsFailoverEnabled": false,
                        "IsMoveEnabled": false,
                        "IsFailoverTestEnabled": false,
                        "IsUpdateEnabled": true,
                        "IsPauseEnabled": true,
                        "IsInsertCheckpointEnabled": true,
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
                        "ProgressPercentage": 100,
                        "ProgressDetails": {
                            "TotalKiloBytes": 11392,
                            "ProgressInKiloBytes": 11392,
                            "EtaInSeconds": 536870911
                        }
                    },
                    "VMsInInitialSync": 0
                },
                "SourceSiteName": "CustA",
                "TargetSiteName": "CustB",
                "CustomerName": "",
                "ProvisionedStorageInMB": 30945,
                "UsedStorageInMB": 16455,
                "IOPS": 8,
                "IncomingThroughputInMb": 1
            }]
        }
    }
};
