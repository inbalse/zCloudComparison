module.exports = function GetProtectionGroupDetailsScreen() {
    return {
        "RemoteSiteConnected": true,
        "ProtectionGroupId": {"GroupGuid": "c318e849-590a-4db3-9c6c-1ac14ca7c853"},
        "VpgConfiguration": {
            "Name": "abcde",
            "Configuration": {
                "Priority": 1,
                "MinimalJournalLenghtInMinutes": 1440,
                "RPOThressholdInSeconds": 300,
                "MaxTestIntervalInMinutes": 262080,
                "WanCompression": true,
                "ScriptingSettings": {
                    "PreRecoveryScript": {
                        "Command": null,
                        "Parameters": null,
                        "TimeoutInSeconds": 300
                    },
                    "PostRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                    "UseScripts": false
                },
                "ManageJournalSettings": {
                    "JournalDatastore": null,
                    "JournalHardLimitPerVM": {"Type": 1, "Limit": 153600},
                    "JournalWarningThresholdPerVM": {"Type": 1, "Limit": 115200}
                },
                "BootOrder": {
                    "Groups": [{
                        "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                        "Name": "Default",
                        "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                        "Machines": [{
                            "DisplayName": "Dummy2",
                            "Id": {
                                "InternalVmName": "vm-34",
                                "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"}
                            }
                        }]
                    }]
                },
                "ServiceProfile": null,
                "Backup": {
                    "Target": {"SelectedTarget": null},
                    "Scheduler": {
                        "RunningTime": {
                            "SchedulePeriodType": 1,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        },
                        "Retry": {"ShouldRetryOnFailure": true, "RetryTimes": 3, "RetryIntervalInMinutes": 10},
                        "Window": {
                            "ShouldTerminateIfExceedsWindow": false,
                            "WeeklyWindow": {"Days": [{"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}]}
                        }
                    },
                    "Scripting": {"PostScript": {"Command": "", "Parameters": "", "TimeoutInSeconds": 0}},
                    "DeleteBackup": {"RestorePointRange": 1}
                },
                "IsBackupEnabled": false,
                "CopyNatRulesOptions": 0,
                "CopyNatServiceAvailable": true
            },
            "Defaults": {
                "TargetComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-fake",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "[?????]"
                },
                "TargetDatastore": null,
                "FailoverNetwork": null,
                "TestNetwork": null,
                "TargetFolder": null,
                "FailoverVCDVAppNetwork": null,
                "TestVCDVAppNetwork": null,
                "RecoveryCloudSettings": {
                    "CloudVpgFailoverCloudSettings": {
                        "Pcn": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
                        },
                        "Subnet": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
                        },
                        "SecurityGroups": [{
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
                        }],
                        "PublicCloudInstanceTypeVisualObject": {
                            "Id": {"InstanceType": "Standard_D3"},
                            "Name": "Standard_D3",
                            "FamilyName": "D-series"
                        }
                    },
                    "CloudVpgFailoverTestCloudSettings": {
                        "Pcn": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
                        },
                        "Subnet": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
                        },
                        "SecurityGroups": [{
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
                        }],
                        "PublicCloudInstanceTypeVisualObject": {
                            "Id": {"InstanceType": "Standard_D3"},
                            "Name": "Standard_D3",
                            "FamilyName": "D-series"
                        }
                    }
                }
            },
            "ProtectedVappSettings": null,
            "RecoveryVappSettings": null,
            "VirtualMachines": [{
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-34",
                    "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"}
                },
                "Name": "Dummy2",
                "SourceHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-29",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster1]172.20.113.1"
                },
                "SourceDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-31",
                        "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "Znest92 MS DS"
                },
                "TargetHost": null,
                "TargetDatastore": {
                    "Id": {
                        "InternalDatastoreName": "NO-DATASTORE",
                        "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": ""
                },
                "StorageUsageInfo": {
                    "ProvisionedStorageSizeInMB": 567,
                    "UsedStorageSizeInMB": 517,
                    "RecoveryStorageSizeInMB": 837
                },
                "Volumes": [{
                    "SourceAddress": "[Znest92 MS DS]:Dummy2_1/Dummy2.vmdk",
                    "TargetAddress": "",
                    "Swap": false,
                    "ProvisionedSizeInMB": 400,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 12 ca ca ed 66 90 d5-24 c1 73 4d 7a 37 e8 c7",
                                "InstanceUuid": "50 12 27 8d c7 6f df 1a-a7 93 f5 b3 65 17 ad 13"
                            },
                            "UnitNumber": 0,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:0)",
                            "VolumeIdentifier": "scsi:0:0"
                        },
                        "Settings": {
                            "IsSwap": false,
                            "VolumeReplicationDestination": {
                                "Datastore": {
                                    "TargetDatastore": {
                                        "InternalDatastoreName": "NO-DATASTORE",
                                        "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                                    }, "IsThin": false
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": false
                }, {
                    "SourceAddress": "[Znest92 MS DS]:Dummy2_1/Dummy2_1.vmdk",
                    "TargetAddress": "",
                    "Swap": false,
                    "ProvisionedSizeInMB": 50,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 12 ca ca ed 66 90 d5-24 c1 73 4d 7a 37 e8 c7",
                                "InstanceUuid": "50 12 27 8d c7 6f df 1a-a7 93 f5 b3 65 17 ad 13"
                            },
                            "UnitNumber": 1,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:1)",
                            "VolumeIdentifier": "scsi:0:1"
                        },
                        "Settings": {
                            "IsSwap": false,
                            "VolumeReplicationDestination": {
                                "Datastore": {
                                    "TargetDatastore": {
                                        "InternalDatastoreName": "NO-DATASTORE",
                                        "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                                    }, "IsThin": false
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }],
                "NetworkInterfaces": [{
                    "InternalIdentifier": {"Name": "Network adapter 1"},
                    "SourceNetwork": {
                        "VcenterNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"},
                                "InternalType": "Network",
                                "InternalName": "network-32"
                            }, "DisplayName": "VM Network"
                        }, "VCDNetwork": null
                    },
                    "FailoverSettings": {
                        "VCenterNetworkSettings": {
                            "RecoveryNetwork": null,
                            "IP": null,
                            "DnsSuffix": null,
                            "ShouldReplaceMacAddress": false
                        }, "VCDNetworkSettings": null
                    },
                    "TestSettings": {
                        "VCenterNetworkSettings": {
                            "RecoveryNetwork": null,
                            "IP": null,
                            "DnsSuffix": null,
                            "ShouldReplaceMacAddress": false
                        }, "VCDNetworkSettings": null
                    },
                    "IsIPConfigurationEnabled": false,
                    "MacAddress": "00:50:56:92:77:ba"
                }],
                "CloudVmSettings": {
                    "FailoverSettings": {
                        "Pcn": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
                        },
                        "Subnet": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
                        },
                        "PrimaryIp": null,
                        "SecurityGroups": [{
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
                        }],
                        "PublicCloudInstanceTypeVisualObject": {
                            "Id": {"InstanceType": "Standard_D3"},
                            "Name": "Standard_D3",
                            "FamilyName": "D-series"
                        }
                    },
                    "FailoverTestSettings": {
                        "Pcn": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
                        },
                        "Subnet": {
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
                        },
                        "PrimaryIp": null,
                        "SecurityGroups": [{
                            "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                            "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
                        }],
                        "PublicCloudInstanceTypeVisualObject": {
                            "Id": {"InstanceType": "Standard_D3"},
                            "Name": "Standard_D3",
                            "FamilyName": "D-series"
                        }
                    }
                },
                "TargetFolder": {
                    "Id": {
                        "InternalFolderName": "no folder",
                        "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                    }, "DisplayName": "[Default]ZertoRecoveryFolder"
                },
                "StorageProfile": null,
                "JournalHardLimit": {"Type": 1, "Limit": 153600},
                "JournalWarningThreshold": {"Type": 1, "Limit": 115200},
                "JournalDatastores": []
            }],
            "OwnersId": {"OwnersGuid": "39b3e9ff-30c8-47a2-8896-c8e2a568b832"},
            "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
        },
        "State": {
            "State": 0,
            "Status": 4,
            "SubStatus": 0,
            "IsProgressActive": false,
            "ProgressPercentage": 0,
            "ProgressDetails": null,
            "IsFailoverEnabled": false,
            "IsMoveEnabled": false,
            "IsFailoverTestEnabled": false,
            "IsUpdateEnabled": false,
            "IsInsertCheckpointEnabled": true,
            "RelevantCheckpoint": {
                "Identifier": {"Identifier": 2393},
                "TimeStamp": "2016-07-14T06:12:59.000Z",
                "Tag": null,
                "Vss": false
            },
            "IsProtectedSiteConnected": true,
            "AlertStatus": 2,
            "AlertTips": {
                "Alerts": [{
                    "Description": "The VPG abcde has been protected for 17 hours and 14 minutes but the journal history is only 8 minutes.",
                    "SiteName": "omri_azure_remote at Zerto",
                    "AlertLevel": 1,
                    "StartTime": "2016-07-14T06:11:22.017Z"
                }], "HasMore": false, "TotalNumberOfAlerts": 1, "TotalNumberOfWarnings": 0, "TotalNumberOfErrors": 1
            },
            "IsDeleteEnabled": false,
            "IsForceSyncEnabled": true,
            "IsCloneEnabled": false,
            "VPGTimebombInfo": null,
            "CloneStatusVisualObject": null,
            "IsMoveInStagesSupported": true,
            "IsFailoverInStagesSupported": true,
            "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
            "RequiresForceToDelete": false,
            "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": false, "IsResumeEnabled": false},
            "IsRecoverCommitEnabled": false,
            "IsRecoverRollbackEnabled": false,
            "ActiveProcesses": {
                "RunningFailOverTest": {"ProgressValue": 95, "StopEnabled": false, "Stage": 2},
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
                "IsUpdateEnabled": false,
                "IsPauseEnabled": false,
                "IsInsertCheckpointEnabled": true,
                "IsProtectedSiteConnected": true,
                "IsDeleteEnabled": false,
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
            "ProgressObject": null,
            "VMsInInitialSync": 0
        },
        "Reason": "",
        "SiteDetails": {
            "SiteName": "omri_local_3 at Zerto",
            "IpAddress": "10.10.0.59",
            "VCenterName": "Pending vCenter connection",
            "CurrentLocalTime": "09:20",
            "ContactInfo": "omri",
            "ContactEmail": "omri@zerto.com",
            "ContactPhone": "066-6666666",
            "ServerId": {"ServerGuid": "00000000-0000-0000-0000-000000000000"},
            "Location": "someLocaiton",
            "LicenseType": 1,
            "SiteVersion": "5.0",
            "BucketName": ""
        },
        "Summary": {
            "NumberOfVms": 1,
            "NumberOfProvisionedMB": 567,
            "NumberOfUsedMB": 517,
            "RecoveryStorageSizeInMB": 837,
            "LastTest": {"Description": "Testing now", "State": "running", "TestEndTime": "2016-07-14T06:15:18.966Z"},
            "HistoryInSeconds": 527,
            "VpgBackupJobStatus": 2,
            "BackupRepository": "",
            "VpgDetailsScreenBackupInformation": null,
            "EarliestCheckpoint": {
                "Identifier": {"Identifier": 2375},
                "TimeStamp": "2016-07-14T06:11:28.000Z",
                "Tag": "VM 'Dummy2' is fully synced",
                "Vss": false
            },
            "JournalHealthStatusVisualObject": {
                "ActualJournalHealthInMinutes": 60,
                "RequiredJournalHealthInMinutes": 240,
                "JournalHealthDescription": ""
            }
        },
        "Performance": {
            "IncomingIops": {
                "Values": [{"Value": 0, "Time": "2016-07-14T02:20:12.473Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:42:07.457Z"
                }, {"Value": 0, "Time": "2016-07-14T05:42:12.457Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:42:52.420Z"
                }, {"Value": 0, "Time": "2016-07-14T05:43:22.635Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:43:52.881Z"
                }, {"Value": 0, "Time": "2016-07-14T05:44:23.993Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:44:54.471Z"
                }, {"Value": 0, "Time": "2016-07-14T05:45:25.750Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:45:57.147Z"
                }, {"Value": 0, "Time": "2016-07-14T05:46:27.520Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:46:57.880Z"
                }, {"Value": 0, "Time": "2016-07-14T05:47:29.752Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:47:59.762Z"
                }, {"Value": 0, "Time": "2016-07-14T05:48:39.761Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:49:09.781Z"
                }, {"Value": 0, "Time": "2016-07-14T05:49:39.792Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:50:09.903Z"
                }, {"Value": 0, "Time": "2016-07-14T05:50:40.066Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:51:10.107Z"
                }, {"Value": 0, "Time": "2016-07-14T05:51:40.150Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:52:10.202Z"
                }, {"Value": 0, "Time": "2016-07-14T05:52:40.232Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:53:10.276Z"
                }, {"Value": 0, "Time": "2016-07-14T05:53:40.318Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:54:10.331Z"
                }, {"Value": 0, "Time": "2016-07-14T05:54:40.369Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:55:10.447Z"
                }, {"Value": 0, "Time": "2016-07-14T05:55:40.480Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:56:10.506Z"
                }, {"Value": 0, "Time": "2016-07-14T05:56:40.618Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:57:10.657Z"
                }, {"Value": 0, "Time": "2016-07-14T05:57:40.664Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:58:10.718Z"
                }, {"Value": 0, "Time": "2016-07-14T05:58:40.735Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:59:10.794Z"
                }, {"Value": 0, "Time": "2016-07-14T05:59:40.847Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:00:10.892Z"
                }, {"Value": 0, "Time": "2016-07-14T06:00:40.915Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:01:10.962Z"
                }, {"Value": 0, "Time": "2016-07-14T06:01:41.001Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:02:11.068Z"
                }, {"Value": 0, "Time": "2016-07-14T06:02:41.136Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:03:11.181Z"
                }, {"Value": 0, "Time": "2016-07-14T06:03:41.208Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:04:11.271Z"
                }, {"Value": 0, "Time": "2016-07-14T06:04:41.317Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:05:11.348Z"
                }, {"Value": 0, "Time": "2016-07-14T06:05:41.383Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:06:11.419Z"
                }, {"Value": 0, "Time": "2016-07-14T06:06:41.462Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:07:11.498Z"
                }, {"Value": 0, "Time": "2016-07-14T06:07:41.522Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:08:11.542Z"
                }, {"Value": 0, "Time": "2016-07-14T06:08:41.574Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:09:11.618Z"
                }, {"Value": 0, "Time": "2016-07-14T06:09:41.664Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:10:11.757Z"
                }, {"Value": 0, "Time": "2016-07-14T06:10:41.818Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:11:11.837Z"
                }, {"Value": 0, "Time": "2016-07-14T06:11:41.856Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:12:11.887Z"
                }, {"Value": 0, "Time": "2016-07-14T06:12:41.957Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:13:12.004Z"
                }, {"Value": 0, "Time": "2016-07-14T06:13:42.042Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:14:12.063Z"
                }, {"Value": 0, "Time": "2016-07-14T06:14:42.096Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:15:12.112Z"
                }, {"Value": 0, "Time": "2016-07-14T06:15:42.142Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:16:12.184Z"
                }, {"Value": 0, "Time": "2016-07-14T06:16:42.217Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:17:12.253Z"
                }, {"Value": 0, "Time": "2016-07-14T06:17:42.284Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:18:12.313Z"
                }, {"Value": 0, "Time": "2016-07-14T06:18:42.345Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:19:12.382Z"
                }, {"Value": 0, "Time": "2016-07-14T06:19:42.421Z"}, {"Value": 0, "Time": "2016-07-14T06:20:12.473Z"}],
                "ValuesAsCsv": "Date,Value\r\n20160714 052012,0\r\n20160714 084207,0\r\n20160714 084212,0\r\n20160714 084252,0\r\n20160714 084322,0\r\n20160714 084352,0\r\n20160714 084423,0\r\n20160714 084454,0\r\n20160714 084525,0\r\n20160714 084557,0\r\n20160714 084627,0\r\n20160714 084657,0\r\n20160714 084729,0\r\n20160714 084759,0\r\n20160714 084839,0\r\n20160714 084909,0\r\n20160714 084939,0\r\n20160714 085009,0\r\n20160714 085040,0\r\n20160714 085110,0\r\n20160714 085140,0\r\n20160714 085210,0\r\n20160714 085240,0\r\n20160714 085310,0\r\n20160714 085340,0\r\n20160714 085410,0\r\n20160714 085440,0\r\n20160714 085510,0\r\n20160714 085540,0\r\n20160714 085610,0\r\n20160714 085640,0\r\n20160714 085710,0\r\n20160714 085740,0\r\n20160714 085810,0\r\n20160714 085840,0\r\n20160714 085910,0\r\n20160714 085940,0\r\n20160714 090010,0\r\n20160714 090040,0\r\n20160714 090110,0\r\n20160714 090141,0\r\n20160714 090211,0\r\n20160714 090241,0\r\n20160714 090311,0\r\n20160714 090341,0\r\n20160714 090411,0\r\n20160714 090441,0\r\n20160714 090511,0\r\n20160714 090541,0\r\n20160714 090611,0\r\n20160714 090641,0\r\n20160714 090711,0\r\n20160714 090741,0\r\n20160714 090811,0\r\n20160714 090841,0\r\n20160714 090911,0\r\n20160714 090941,0\r\n20160714 091011,0\r\n20160714 091041,0\r\n20160714 091111,0\r\n20160714 091141,0\r\n20160714 091211,0\r\n20160714 091241,0\r\n20160714 091312,0\r\n20160714 091342,0\r\n20160714 091412,0\r\n20160714 091442,0\r\n20160714 091512,0\r\n20160714 091542,0\r\n20160714 091612,0\r\n20160714 091642,0\r\n20160714 091712,0\r\n20160714 091742,0\r\n20160714 091812,0\r\n20160714 091842,0\r\n20160714 091912,0\r\n20160714 091942,0\r\n20160714 092012,0\r\n"
            },
            "RPOInSeconds": {
                "Values": [{"Value": 0, "Time": "2016-07-14T02:20:12.473Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:42:07.457Z"
                }, {"Value": -2147483648, "Time": "2016-07-14T05:42:12.457Z"}, {
                    "Value": -2147483648,
                    "Time": "2016-07-14T05:42:52.420Z"
                }, {"Value": -2147483648, "Time": "2016-07-14T05:43:22.635Z"}, {
                    "Value": -2147483648,
                    "Time": "2016-07-14T05:43:52.881Z"
                }, {"Value": 652, "Time": "2016-07-14T05:44:23.993Z"}, {
                    "Value": 19,
                    "Time": "2016-07-14T05:44:54.471Z"
                }, {"Value": 14, "Time": "2016-07-14T05:45:25.750Z"}, {
                    "Value": 15,
                    "Time": "2016-07-14T05:45:57.147Z"
                }, {"Value": 7, "Time": "2016-07-14T05:46:27.520Z"}, {
                    "Value": 14,
                    "Time": "2016-07-14T05:46:57.880Z"
                }, {"Value": 21, "Time": "2016-07-14T05:47:29.752Z"}, {
                    "Value": 10,
                    "Time": "2016-07-14T05:47:59.762Z"
                }, {"Value": 9, "Time": "2016-07-14T05:48:39.761Z"}, {
                    "Value": 4,
                    "Time": "2016-07-14T05:49:09.781Z"
                }, {"Value": 4, "Time": "2016-07-14T05:49:39.792Z"}, {
                    "Value": 9,
                    "Time": "2016-07-14T05:50:09.903Z"
                }, {"Value": 10, "Time": "2016-07-14T05:50:40.066Z"}, {
                    "Value": 10,
                    "Time": "2016-07-14T05:51:10.107Z"
                }, {"Value": 5, "Time": "2016-07-14T05:51:40.150Z"}, {
                    "Value": 15,
                    "Time": "2016-07-14T05:52:10.202Z"
                }, {"Value": 10, "Time": "2016-07-14T05:52:40.232Z"}, {
                    "Value": 9,
                    "Time": "2016-07-14T05:53:10.276Z"
                }, {"Value": 9, "Time": "2016-07-14T05:53:40.318Z"}, {
                    "Value": 14,
                    "Time": "2016-07-14T05:54:10.331Z"
                }, {"Value": 9, "Time": "2016-07-14T05:54:40.369Z"}, {
                    "Value": 4,
                    "Time": "2016-07-14T05:55:10.447Z"
                }, {"Value": 4, "Time": "2016-07-14T05:55:40.480Z"}, {
                    "Value": 9,
                    "Time": "2016-07-14T05:56:10.506Z"
                }, {"Value": 14, "Time": "2016-07-14T05:56:40.618Z"}, {
                    "Value": 9,
                    "Time": "2016-07-14T05:57:10.657Z"
                }, {"Value": 4, "Time": "2016-07-14T05:57:40.664Z"}, {
                    "Value": 14,
                    "Time": "2016-07-14T05:58:10.718Z"
                }, {"Value": 9, "Time": "2016-07-14T05:58:40.735Z"}, {
                    "Value": 9,
                    "Time": "2016-07-14T05:59:10.794Z"
                }, {"Value": 8, "Time": "2016-07-14T05:59:40.847Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:00:10.892Z"
                }, {"Value": 8, "Time": "2016-07-14T06:00:40.915Z"}, {
                    "Value": 8,
                    "Time": "2016-07-14T06:01:10.962Z"
                }, {"Value": 4, "Time": "2016-07-14T06:01:41.001Z"}, {
                    "Value": 14,
                    "Time": "2016-07-14T06:02:11.068Z"
                }, {"Value": 14, "Time": "2016-07-14T06:02:41.136Z"}, {
                    "Value": 9,
                    "Time": "2016-07-14T06:03:11.181Z"
                }, {"Value": 9, "Time": "2016-07-14T06:03:41.208Z"}, {
                    "Value": 14,
                    "Time": "2016-07-14T06:04:11.271Z"
                }, {"Value": 14, "Time": "2016-07-14T06:04:41.317Z"}, {
                    "Value": 8,
                    "Time": "2016-07-14T06:05:11.348Z"
                }, {"Value": 8, "Time": "2016-07-14T06:05:41.383Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:06:11.419Z"
                }, {"Value": 13, "Time": "2016-07-14T06:06:41.462Z"}, {
                    "Value": 8,
                    "Time": "2016-07-14T06:07:11.498Z"
                }, {"Value": 3, "Time": "2016-07-14T06:07:41.522Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:08:11.542Z"
                }, {"Value": 8, "Time": "2016-07-14T06:08:41.574Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:09:11.618Z"
                }, {"Value": 8, "Time": "2016-07-14T06:09:41.664Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:10:11.757Z"
                }, {"Value": 8, "Time": "2016-07-14T06:10:41.818Z"}, {
                    "Value": 8,
                    "Time": "2016-07-14T06:11:11.837Z"
                }, {"Value": 8, "Time": "2016-07-14T06:11:41.856Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:12:11.887Z"
                }, {"Value": 12, "Time": "2016-07-14T06:12:41.957Z"}, {
                    "Value": 8,
                    "Time": "2016-07-14T06:13:12.004Z"
                }, {"Value": 3, "Time": "2016-07-14T06:13:42.042Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:14:12.063Z"
                }, {"Value": 8, "Time": "2016-07-14T06:14:42.096Z"}, {
                    "Value": 8,
                    "Time": "2016-07-14T06:15:12.112Z"
                }, {"Value": 8, "Time": "2016-07-14T06:15:42.142Z"}, {
                    "Value": 13,
                    "Time": "2016-07-14T06:16:12.184Z"
                }, {"Value": 13, "Time": "2016-07-14T06:16:42.217Z"}, {
                    "Value": 8,
                    "Time": "2016-07-14T06:17:12.253Z"
                }, {"Value": 7, "Time": "2016-07-14T06:17:42.284Z"}, {
                    "Value": 12,
                    "Time": "2016-07-14T06:18:12.313Z"
                }, {"Value": 7, "Time": "2016-07-14T06:18:42.345Z"}, {
                    "Value": 7,
                    "Time": "2016-07-14T06:19:12.382Z"
                }, {"Value": 7, "Time": "2016-07-14T06:19:42.421Z"}, {"Value": 12, "Time": "2016-07-14T06:20:12.473Z"}],
                "ValuesAsCsv": "Date,Value\r\n20160714 052012,0\r\n20160714 084207,0\r\n20160714 084212,-2147483648\r\n20160714 084252,-2147483648\r\n20160714 084322,-2147483648\r\n20160714 084352,-2147483648\r\n20160714 084423,652\r\n20160714 084454,19\r\n20160714 084525,14\r\n20160714 084557,15\r\n20160714 084627,7\r\n20160714 084657,14\r\n20160714 084729,21\r\n20160714 084759,10\r\n20160714 084839,9\r\n20160714 084909,4\r\n20160714 084939,4\r\n20160714 085009,9\r\n20160714 085040,10\r\n20160714 085110,10\r\n20160714 085140,5\r\n20160714 085210,15\r\n20160714 085240,10\r\n20160714 085310,9\r\n20160714 085340,9\r\n20160714 085410,14\r\n20160714 085440,9\r\n20160714 085510,4\r\n20160714 085540,4\r\n20160714 085610,9\r\n20160714 085640,14\r\n20160714 085710,9\r\n20160714 085740,4\r\n20160714 085810,14\r\n20160714 085840,9\r\n20160714 085910,9\r\n20160714 085940,8\r\n20160714 090010,13\r\n20160714 090040,8\r\n20160714 090110,8\r\n20160714 090141,4\r\n20160714 090211,14\r\n20160714 090241,14\r\n20160714 090311,9\r\n20160714 090341,9\r\n20160714 090411,14\r\n20160714 090441,14\r\n20160714 090511,8\r\n20160714 090541,8\r\n20160714 090611,13\r\n20160714 090641,13\r\n20160714 090711,8\r\n20160714 090741,3\r\n20160714 090811,13\r\n20160714 090841,8\r\n20160714 090911,13\r\n20160714 090941,8\r\n20160714 091011,13\r\n20160714 091041,8\r\n20160714 091111,8\r\n20160714 091141,8\r\n20160714 091211,13\r\n20160714 091241,12\r\n20160714 091312,8\r\n20160714 091342,3\r\n20160714 091412,13\r\n20160714 091442,8\r\n20160714 091512,8\r\n20160714 091542,8\r\n20160714 091612,13\r\n20160714 091642,13\r\n20160714 091712,8\r\n20160714 091742,7\r\n20160714 091812,12\r\n20160714 091842,7\r\n20160714 091912,7\r\n20160714 091942,7\r\n20160714 092012,12\r\n"
            },
            "IncomingThroughputInMb": {
                "Values": [{"Value": 0, "Time": "2016-07-14T02:20:12.473Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:42:07.457Z"
                }, {"Value": 0, "Time": "2016-07-14T05:42:12.457Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:42:52.420Z"
                }, {"Value": 0, "Time": "2016-07-14T05:43:22.635Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:43:52.881Z"
                }, {"Value": 0, "Time": "2016-07-14T05:44:23.993Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:44:54.471Z"
                }, {"Value": 0, "Time": "2016-07-14T05:45:25.750Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:45:57.147Z"
                }, {"Value": 0, "Time": "2016-07-14T05:46:27.520Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:46:57.880Z"
                }, {"Value": 0, "Time": "2016-07-14T05:47:29.752Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:47:59.762Z"
                }, {"Value": 0, "Time": "2016-07-14T05:48:39.761Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:49:09.781Z"
                }, {"Value": 0, "Time": "2016-07-14T05:49:39.792Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:50:09.903Z"
                }, {"Value": 0, "Time": "2016-07-14T05:50:40.066Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:51:10.107Z"
                }, {"Value": 0, "Time": "2016-07-14T05:51:40.150Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:52:10.202Z"
                }, {"Value": 0, "Time": "2016-07-14T05:52:40.232Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:53:10.276Z"
                }, {"Value": 0, "Time": "2016-07-14T05:53:40.318Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:54:10.331Z"
                }, {"Value": 0, "Time": "2016-07-14T05:54:40.369Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:55:10.447Z"
                }, {"Value": 0, "Time": "2016-07-14T05:55:40.480Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:56:10.506Z"
                }, {"Value": 0, "Time": "2016-07-14T05:56:40.618Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:57:10.657Z"
                }, {"Value": 0, "Time": "2016-07-14T05:57:40.664Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:58:10.718Z"
                }, {"Value": 0, "Time": "2016-07-14T05:58:40.735Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:59:10.794Z"
                }, {"Value": 0, "Time": "2016-07-14T05:59:40.847Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:00:10.892Z"
                }, {"Value": 0, "Time": "2016-07-14T06:00:40.915Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:01:10.962Z"
                }, {"Value": 0, "Time": "2016-07-14T06:01:41.001Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:02:11.068Z"
                }, {"Value": 0, "Time": "2016-07-14T06:02:41.136Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:03:11.181Z"
                }, {"Value": 0, "Time": "2016-07-14T06:03:41.208Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:04:11.271Z"
                }, {"Value": 0, "Time": "2016-07-14T06:04:41.317Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:05:11.348Z"
                }, {"Value": 0, "Time": "2016-07-14T06:05:41.383Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:06:11.419Z"
                }, {"Value": 0, "Time": "2016-07-14T06:06:41.462Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:07:11.498Z"
                }, {"Value": 0, "Time": "2016-07-14T06:07:41.522Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:08:11.542Z"
                }, {"Value": 0, "Time": "2016-07-14T06:08:41.574Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:09:11.618Z"
                }, {"Value": 0, "Time": "2016-07-14T06:09:41.664Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:10:11.757Z"
                }, {"Value": 0, "Time": "2016-07-14T06:10:41.818Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:11:11.837Z"
                }, {"Value": 0, "Time": "2016-07-14T06:11:41.856Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:12:11.887Z"
                }, {"Value": 0, "Time": "2016-07-14T06:12:41.957Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:13:12.004Z"
                }, {"Value": 0, "Time": "2016-07-14T06:13:42.042Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:14:12.063Z"
                }, {"Value": 0, "Time": "2016-07-14T06:14:42.096Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:15:12.112Z"
                }, {"Value": 0, "Time": "2016-07-14T06:15:42.142Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:16:12.184Z"
                }, {"Value": 0, "Time": "2016-07-14T06:16:42.217Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:17:12.253Z"
                }, {"Value": 0, "Time": "2016-07-14T06:17:42.284Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:18:12.313Z"
                }, {"Value": 0, "Time": "2016-07-14T06:18:42.345Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:19:12.382Z"
                }, {"Value": 0, "Time": "2016-07-14T06:19:42.421Z"}, {"Value": 0, "Time": "2016-07-14T06:20:12.473Z"}],
                "ValuesAsCsv": "Date,Value\r\n20160714 052012,0\r\n20160714 084207,0\r\n20160714 084212,0\r\n20160714 084252,0\r\n20160714 084322,0\r\n20160714 084352,0\r\n20160714 084423,0\r\n20160714 084454,0\r\n20160714 084525,0\r\n20160714 084557,0\r\n20160714 084627,0\r\n20160714 084657,0\r\n20160714 084729,0\r\n20160714 084759,0\r\n20160714 084839,0\r\n20160714 084909,0\r\n20160714 084939,0\r\n20160714 085009,0\r\n20160714 085040,0\r\n20160714 085110,0\r\n20160714 085140,0\r\n20160714 085210,0\r\n20160714 085240,0\r\n20160714 085310,0\r\n20160714 085340,0\r\n20160714 085410,0\r\n20160714 085440,0\r\n20160714 085510,0\r\n20160714 085540,0\r\n20160714 085610,0\r\n20160714 085640,0\r\n20160714 085710,0\r\n20160714 085740,0\r\n20160714 085810,0\r\n20160714 085840,0\r\n20160714 085910,0\r\n20160714 085940,0\r\n20160714 090010,0\r\n20160714 090040,0\r\n20160714 090110,0\r\n20160714 090141,0\r\n20160714 090211,0\r\n20160714 090241,0\r\n20160714 090311,0\r\n20160714 090341,0\r\n20160714 090411,0\r\n20160714 090441,0\r\n20160714 090511,0\r\n20160714 090541,0\r\n20160714 090611,0\r\n20160714 090641,0\r\n20160714 090711,0\r\n20160714 090741,0\r\n20160714 090811,0\r\n20160714 090841,0\r\n20160714 090911,0\r\n20160714 090941,0\r\n20160714 091011,0\r\n20160714 091041,0\r\n20160714 091111,0\r\n20160714 091141,0\r\n20160714 091211,0\r\n20160714 091241,0\r\n20160714 091312,0\r\n20160714 091342,0\r\n20160714 091412,0\r\n20160714 091442,0\r\n20160714 091512,0\r\n20160714 091542,0\r\n20160714 091612,0\r\n20160714 091642,0\r\n20160714 091712,0\r\n20160714 091742,0\r\n20160714 091812,0\r\n20160714 091842,0\r\n20160714 091912,0\r\n20160714 091942,0\r\n20160714 092012,0\r\n"
            },
            "OutgoingBandWidth": {
                "Values": [{"Value": 0, "Time": "2016-07-14T02:20:12.473Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:42:07.457Z"
                }, {"Value": 0, "Time": "2016-07-14T05:42:12.457Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:42:52.420Z"
                }, {"Value": 0, "Time": "2016-07-14T05:43:22.635Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:43:52.881Z"
                }, {"Value": 0, "Time": "2016-07-14T05:44:23.993Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:44:54.471Z"
                }, {"Value": 0, "Time": "2016-07-14T05:45:25.750Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:45:57.147Z"
                }, {"Value": 0, "Time": "2016-07-14T05:46:27.520Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:46:57.880Z"
                }, {"Value": 0, "Time": "2016-07-14T05:47:29.752Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:47:59.762Z"
                }, {"Value": 0, "Time": "2016-07-14T05:48:39.761Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:49:09.781Z"
                }, {"Value": 0, "Time": "2016-07-14T05:49:39.792Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:50:09.903Z"
                }, {"Value": 0, "Time": "2016-07-14T05:50:40.066Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:51:10.107Z"
                }, {"Value": 0, "Time": "2016-07-14T05:51:40.150Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:52:10.202Z"
                }, {"Value": 0, "Time": "2016-07-14T05:52:40.232Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:53:10.276Z"
                }, {"Value": 0, "Time": "2016-07-14T05:53:40.318Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:54:10.331Z"
                }, {"Value": 0, "Time": "2016-07-14T05:54:40.369Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:55:10.447Z"
                }, {"Value": 0, "Time": "2016-07-14T05:55:40.480Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:56:10.506Z"
                }, {"Value": 0, "Time": "2016-07-14T05:56:40.618Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:57:10.657Z"
                }, {"Value": 0, "Time": "2016-07-14T05:57:40.664Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:58:10.718Z"
                }, {"Value": 0, "Time": "2016-07-14T05:58:40.735Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T05:59:10.794Z"
                }, {"Value": 0, "Time": "2016-07-14T05:59:40.847Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:00:10.892Z"
                }, {"Value": 0, "Time": "2016-07-14T06:00:40.915Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:01:10.962Z"
                }, {"Value": 0, "Time": "2016-07-14T06:01:41.001Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:02:11.068Z"
                }, {"Value": 0, "Time": "2016-07-14T06:02:41.136Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:03:11.181Z"
                }, {"Value": 0, "Time": "2016-07-14T06:03:41.208Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:04:11.271Z"
                }, {"Value": 0, "Time": "2016-07-14T06:04:41.317Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:05:11.348Z"
                }, {"Value": 0, "Time": "2016-07-14T06:05:41.383Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:06:11.419Z"
                }, {"Value": 0, "Time": "2016-07-14T06:06:41.462Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:07:11.498Z"
                }, {"Value": 0, "Time": "2016-07-14T06:07:41.522Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:08:11.542Z"
                }, {"Value": 0, "Time": "2016-07-14T06:08:41.574Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:09:11.618Z"
                }, {"Value": 0, "Time": "2016-07-14T06:09:41.664Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:10:11.757Z"
                }, {"Value": 0, "Time": "2016-07-14T06:10:41.818Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:11:11.837Z"
                }, {"Value": 0, "Time": "2016-07-14T06:11:41.856Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:12:11.887Z"
                }, {"Value": 0, "Time": "2016-07-14T06:12:41.957Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:13:12.004Z"
                }, {"Value": 0, "Time": "2016-07-14T06:13:42.042Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:14:12.063Z"
                }, {"Value": 0, "Time": "2016-07-14T06:14:42.096Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:15:12.112Z"
                }, {"Value": 0, "Time": "2016-07-14T06:15:42.142Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:16:12.184Z"
                }, {"Value": 0, "Time": "2016-07-14T06:16:42.217Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:17:12.253Z"
                }, {"Value": 0, "Time": "2016-07-14T06:17:42.284Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:18:12.313Z"
                }, {"Value": 0, "Time": "2016-07-14T06:18:42.345Z"}, {
                    "Value": 0,
                    "Time": "2016-07-14T06:19:12.382Z"
                }, {"Value": 0, "Time": "2016-07-14T06:19:42.421Z"}, {"Value": 0, "Time": "2016-07-14T06:20:12.473Z"}],
                "ValuesAsCsv": "Date,Value\r\n20160714 052012,0\r\n20160714 084207,0\r\n20160714 084212,0\r\n20160714 084252,0\r\n20160714 084322,0\r\n20160714 084352,0\r\n20160714 084423,0\r\n20160714 084454,0\r\n20160714 084525,0\r\n20160714 084557,0\r\n20160714 084627,0\r\n20160714 084657,0\r\n20160714 084729,0\r\n20160714 084759,0\r\n20160714 084839,0\r\n20160714 084909,0\r\n20160714 084939,0\r\n20160714 085009,0\r\n20160714 085040,0\r\n20160714 085110,0\r\n20160714 085140,0\r\n20160714 085210,0\r\n20160714 085240,0\r\n20160714 085310,0\r\n20160714 085340,0\r\n20160714 085410,0\r\n20160714 085440,0\r\n20160714 085510,0\r\n20160714 085540,0\r\n20160714 085610,0\r\n20160714 085640,0\r\n20160714 085710,0\r\n20160714 085740,0\r\n20160714 085810,0\r\n20160714 085840,0\r\n20160714 085910,0\r\n20160714 085940,0\r\n20160714 090010,0\r\n20160714 090040,0\r\n20160714 090110,0\r\n20160714 090141,0\r\n20160714 090211,0\r\n20160714 090241,0\r\n20160714 090311,0\r\n20160714 090341,0\r\n20160714 090411,0\r\n20160714 090441,0\r\n20160714 090511,0\r\n20160714 090541,0\r\n20160714 090611,0\r\n20160714 090641,0\r\n20160714 090711,0\r\n20160714 090741,0\r\n20160714 090811,0\r\n20160714 090841,0\r\n20160714 090911,0\r\n20160714 090941,0\r\n20160714 091011,0\r\n20160714 091041,0\r\n20160714 091111,0\r\n20160714 091141,0\r\n20160714 091211,0\r\n20160714 091241,0\r\n20160714 091312,0\r\n20160714 091342,0\r\n20160714 091412,0\r\n20160714 091442,0\r\n20160714 091512,0\r\n20160714 091542,0\r\n20160714 091612,0\r\n20160714 091642,0\r\n20160714 091712,0\r\n20160714 091742,0\r\n20160714 091812,0\r\n20160714 091842,0\r\n20160714 091912,0\r\n20160714 091942,0\r\n20160714 092012,0\r\n"
            }
        },
        "SitesInfo": {
            "SourceSiteName": "omri_local_3 at Zerto",
            "SourceSiteIdentifier": {"SiteGuid": "4115930d-1a87-4fc1-94dc-475dd6175482"},
            "TargetSiteName": "omri_azure_remote at Zerto",
            "TargetSiteIdentifier": {"SiteGuid": "2c08335b-2c14-4744-a172-680d12b7245a"},
            "CustomerName": "N/A"
        },
        "CloneStatus": null,
        "Entities": {"Source": 0, "Target": 5},
        "LastUserActivityFailed": false,
        "ConfigurationFlags": {
            "IsStorageProfileEnabled": false,
            "IsCompressionConfigurable": false,
            "IsVmFolderConfigurable": true,
            "IsBackupFeatureSupported": true
        },
        "IsManageSiteSettingsEnabled": true,
        "Direction": 0,
        "ZorgId": null,
        "Topology": {
            "SourceSite": {
                "SiteName": "omri_local_3 at Zerto",
                "SiteLocation": "someLocaiton",
                "SiteIp": "10.10.0.59",
                "Zorg": null,
                "Hosts": [{
                    "VraName": "[Cluster1]172.20.113.1",
                    "IsGhost": false,
                    "IsSiteToVraConnectionOk": true,
                    "IsVraToVraConnectionOk": true,
                    "Host": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-29",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster1]172.20.113.1"
                    },
                    "OrgVdc": null,
                    "Alerts": [],
                    "ResourcePoolAlerts": []
                }],
                "Alerts": [],
                "SiteToHostConnectivity": {"[Host host-29, server 3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5]": true},
                "IsConnected": true
            },
            "TargetSite": {
                "SiteName": "omri_azure_remote at Zerto",
                "SiteLocation": "someLocaiton",
                "SiteIp": "10.10.0.59",
                "Zorg": null,
                "Hosts": [],
                "Alerts": [{
                    "Affectedhost": null,
                    "AffectedOrgs": [],
                    "AlertEntity": "VPG",
                    "Description": "The VPG abcde has been protected for 17 hours and 14 minutes but the journal history is only 8 minutes.",
                    "Entities": [{
                        "Identifier": {"GroupGuid": "c318e849-590a-4db3-9c6c-1ac14ca7c853"},
                        "Name": "abcde",
                        "SampleVM": {
                            "InternalVmName": "vm-34",
                            "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"}
                        },
                        "Direction": 1
                    }],
                    "HelpId": "VPG0038",
                    "Id": "ccb4ce1e-a222-44cd-aff0-8f311d7340cb",
                    "IsDismissed": false,
                    "Level": 1,
                    "SiteName": "omri_azure_remote at Zerto",
                    "StartTime": "2016-07-14T06:11:22.017Z"
                }],
                "SiteToHostConnectivity": [],
                "IsConnected": true
            }
        }
    };

};
