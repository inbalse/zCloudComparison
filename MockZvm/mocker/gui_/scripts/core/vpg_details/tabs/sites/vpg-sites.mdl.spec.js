describe('vpg-sites model', function () {
    var model;
    var Link = function () {
        this.key = 0;
        this.source = {};
        this.target = {};
    };

    var vpgData = {
        "RemoteSiteConnected": true,
        "ProtectionGroupId": {
            "GroupGuid": "edac67f8-103f-4542-8bdc-aa8e300850dc"
        },
        "VpgConfiguration": {
            "Name": "test",
            "Configuration": {
                "Priority": 1,
                "MinimalJournalLenghtInMinutes": 240,
                "RPOThressholdInSeconds": 300,
                "MaxTestIntervalInMinutes": 262080,
                "WanCompression": true,
                "ScriptingSettings": {
                    "PreRecoveryScript": {
                        "Command": null,
                        "Parameters": null,
                        "TimeoutInSeconds": 300
                    },
                    "PostRecoveryScript": {
                        "Command": null,
                        "Parameters": null,
                        "TimeoutInSeconds": 300
                    }
                },
                "ManageJournalSettings": {
                    "JournalDatastore": null,
                    "JournalHardLimitPerVM": {
                        "Type": 0,
                        "Limit": 0
                    },
                    "JournalWarningThresholdPerVM": {
                        "Type": 0,
                        "Limit": 0
                    }
                },
                "BootOrder": {
                    "Groups": [
                        {
                            "BootGroupIdentifier": {
                                "Guid": "00000000-0000-0000-0000-000000000000"
                            },
                            "Name": "Default",
                            "Settings": {
                                "BootDelay": 0,
                                "WaitForTools": false,
                                "ShutdownDelay": 0
                            },
                            "Machines": [
                                {
                                    "DisplayName": "evgeny-local-vm",
                                    "Id": {
                                        "InternalVmName": "vm-539",
                                        "ServerIdentifier": {
                                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                        }
                                    }
                                },
                                {
                                    "DisplayName": "evgeny_vm1",
                                    "Id": {
                                        "InternalVmName": "vm-559",
                                        "ServerIdentifier": {
                                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                "ServiceProfile": null,
                "Backup": {
                    "Target": {
                        "SelectedTarget": {
                            "Identifier": "dbb5420f-7161-429f-8b16-7f878f045801"
                        }
                    },
                    "Scheduler": {
                        "RunningTime": {
                            "SchedulePeriodType": 1,
                            "RunningTimeOfDayInMinutes": 0,
                            "DayOfWeek": 6
                        },
                        "Retry": {
                            "ShouldRetryOnFailure": true,
                            "RetryTimes": 3,
                            "RetryIntervalInMinutes": 10
                        },
                        "Window": {
                            "ShouldTerminateIfExceedsWindow": false,
                            "WeeklyWindow": {
                                "Days": [
                                    {
                                        "Hours": [
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true
                                        ]
                                    },
                                    {
                                        "Hours": [
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true
                                        ]
                                    },
                                    {
                                        "Hours": [
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true
                                        ]
                                    },
                                    {
                                        "Hours": [
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true
                                        ]
                                    },
                                    {
                                        "Hours": [
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true
                                        ]
                                    },
                                    {
                                        "Hours": [
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true
                                        ]
                                    },
                                    {
                                        "Hours": [
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true,
                                            true
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    "Scripting": {
                        "PostScript": {
                            "Command": "",
                            "Parameters": "",
                            "TimeoutInSeconds": 0
                        }
                    },
                    "DeleteBackup": {
                        "RestorePointRange": 1
                    }
                },
                "IsBackupEnabled": true,
                "CopyNatService": false,
                "CopyNatServiceAvailable": true
            },
            "Defaults": {
                "TargetComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-9",
                        "Type": 0,
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "ResourcePoolIdentifier": null,
                    "DisplayName": "172.20.200.2"
                },
                "TargetDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-12",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "ZNest81Datastore"
                },
                "FailoverNetwork": {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-11"
                    },
                    "DisplayName": "VM Network"
                },
                "TestNetwork": {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-11"
                    },
                    "DisplayName": "VM Network"
                },
                "TargetFolder": {
                    "Id": {
                        "InternalFolderName": "group-v368",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DisplayName": "[Default]ZertoRecoveryFolder"
                },
                "FailoverVCDVAppNetwork": null,
                "TestVCDVAppNetwork": null,
                "RecoveryCloudSettings": null
            },
            "ProtectedVappSettings": null,
            "RecoveryVappSettings": null,
            "VirtualMachines": [
                {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-539",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "Name": "evgeny-local-vm",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "ResourcePoolIdentifier": null,
                        "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "ZNest81Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "ResourcePoolIdentifier": null,
                        "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "ZNest81Datastore"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 236,
                        "UsedStorageSizeInMB": 0,
                        "RecoveryStorageSizeInMB": 320
                    },
                    "Volumes": [
                        {
                            "SourceAddress": "[ZNest81Datastore]:evgeny-local-vm/evgeny-local-vm_2.vmdk",
                            "TargetAddress": "ZNest81Datastore",
                            "Swap": false,
                            "ProvisionedSizeInMB": 6,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "56 4d c3 94 09 b9 c0 a6-ef 30 18 47 c5 70 3d 02",
                                        "InstanceUuid": "52 93 2e a4 09 6c 3c 57-29 db 59 0c 5b 37 7d bb"
                                    },
                                    "UnitNumber": 2,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:2)"
                                },
                                "Settings": {
                                    "IsSwap": false,
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-12",
                                                "ServerIdentifier": {
                                                    "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                                }
                                            },
                                            "IsThin": true
                                        },
                                        "VCDDatastore": null,
                                        "ExistingDisk": null,
                                        "RawDevice": null,
                                        "StoragePod": null
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": true
                        },
                        {
                            "SourceAddress": "[ZNest81Datastore]:evgeny-local-vm/evgeny-local-vm_1.vmdk",
                            "TargetAddress": "ZNest81Datastore",
                            "Swap": false,
                            "ProvisionedSizeInMB": 12,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "56 4d c3 94 09 b9 c0 a6-ef 30 18 47 c5 70 3d 02",
                                        "InstanceUuid": "52 93 2e a4 09 6c 3c 57-29 db 59 0c 5b 37 7d bb"
                                    },
                                    "UnitNumber": 1,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:1)"
                                },
                                "Settings": {
                                    "IsSwap": false,
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-12",
                                                "ServerIdentifier": {
                                                    "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                                }
                                            },
                                            "IsThin": true
                                        },
                                        "VCDDatastore": null,
                                        "ExistingDisk": null,
                                        "RawDevice": null,
                                        "StoragePod": null
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": true
                        }
                    ],
                    "NetworkInterfaces": [
                        {
                            "InternalIdentifier": {
                                "Name": "Network adapter 1"
                            },
                            "SourceNetwork": {
                                "VcenterNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {
                                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                        },
                                        "InternalType": "Network",
                                        "InternalName": "network-534"
                                    },
                                    "DisplayName": "none"
                                },
                                "VCDNetwork": null
                            },
                            "FailoverSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {
                                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                            },
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        },
                                        "DisplayName": "VM Network"
                                    },
                                    "IP": null,
                                    "DnsSuffix": null,
                                    "ShouldReplaceMacAddress": false
                                },
                                "VCDNetworkSettings": null
                            },
                            "TestSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {
                                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                            },
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        },
                                        "DisplayName": "VM Network"
                                    },
                                    "IP": null,
                                    "DnsSuffix": null,
                                    "ShouldReplaceMacAddress": false
                                },
                                "VCDNetworkSettings": null
                            },
                            "IsIPConfigurationEnabled": false,
                            "MacAddress": "00:50:56:bd:e5:be"
                        }
                    ],
                    "AwsNetworkSettings": null,
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v368",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {
                        "Type": 0,
                        "Limit": 0
                    },
                    "JournalWarningThreshold": {
                        "Type": 0,
                        "Limit": 0
                    },
                    "JournalDatastores": []
                },
                {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-559",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "Name": "evgeny_vm1",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "ResourcePoolIdentifier": null,
                        "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "ZNest81Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "ResourcePoolIdentifier": null,
                        "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "ZNest81Datastore"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 298,
                        "UsedStorageSizeInMB": 40,
                        "RecoveryStorageSizeInMB": 360
                    },
                    "Volumes": [
                        {
                            "SourceAddress": "[ZNest81Datastore]:evgeny_vm1/evgeny_vm1_1.vmdk",
                            "TargetAddress": "ZNest81Datastore",
                            "Swap": false,
                            "ProvisionedSizeInMB": 40,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "56 4d af 6d a6 78 9c 08-2b 91 bc 15 67 54 bb 06",
                                        "InstanceUuid": "52 4a 5f b9 f9 8b 94 45-d3 03 2d cb 75 ca ad 41"
                                    },
                                    "UnitNumber": 1,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:1)"
                                },
                                "Settings": {
                                    "IsSwap": false,
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-12",
                                                "ServerIdentifier": {
                                                    "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                                }
                                            },
                                            "IsThin": true
                                        },
                                        "VCDDatastore": null,
                                        "ExistingDisk": null,
                                        "RawDevice": null,
                                        "StoragePod": null
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": true
                        },
                        {
                            "SourceAddress": "[ZNest81Datastore]:evgeny_vm1/evgeny_vm1.vmdk",
                            "TargetAddress": "ZNest81Datastore",
                            "Swap": false,
                            "ProvisionedSizeInMB": 40,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "56 4d af 6d a6 78 9c 08-2b 91 bc 15 67 54 bb 06",
                                        "InstanceUuid": "52 4a 5f b9 f9 8b 94 45-d3 03 2d cb 75 ca ad 41"
                                    },
                                    "UnitNumber": 0,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:0)"
                                },
                                "Settings": {
                                    "IsSwap": false,
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-12",
                                                "ServerIdentifier": {
                                                    "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                                }
                                            },
                                            "IsThin": false
                                        },
                                        "VCDDatastore": null,
                                        "ExistingDisk": null,
                                        "RawDevice": null,
                                        "StoragePod": null
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": false
                        }
                    ],
                    "NetworkInterfaces": [
                        {
                            "InternalIdentifier": {
                                "Name": "Network adapter 1"
                            },
                            "SourceNetwork": {
                                "VcenterNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {
                                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                        },
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    },
                                    "DisplayName": "VM Network"
                                },
                                "VCDNetwork": null
                            },
                            "FailoverSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {
                                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                            },
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        },
                                        "DisplayName": "VM Network"
                                    },
                                    "IP": null,
                                    "DnsSuffix": null,
                                    "ShouldReplaceMacAddress": false
                                },
                                "VCDNetworkSettings": null
                            },
                            "TestSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {
                                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                            },
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        },
                                        "DisplayName": "VM Network"
                                    },
                                    "IP": null,
                                    "DnsSuffix": null,
                                    "ShouldReplaceMacAddress": false
                                },
                                "VCDNetworkSettings": null
                            },
                            "IsIPConfigurationEnabled": false,
                            "MacAddress": "00:50:56:bd:98:60"
                        },
                        {
                            "InternalIdentifier": {
                                "Name": "Network adapter 2"
                            },
                            "SourceNetwork": {
                                "VcenterNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {
                                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                        },
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    },
                                    "DisplayName": "VM Network"
                                },
                                "VCDNetwork": null
                            },
                            "FailoverSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {
                                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                            },
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        },
                                        "DisplayName": "VM Network"
                                    },
                                    "IP": null,
                                    "DnsSuffix": null,
                                    "ShouldReplaceMacAddress": false
                                },
                                "VCDNetworkSettings": null
                            },
                            "TestSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {
                                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                            },
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        },
                                        "DisplayName": "VM Network"
                                    },
                                    "IP": null,
                                    "DnsSuffix": null,
                                    "ShouldReplaceMacAddress": false
                                },
                                "VCDNetworkSettings": null
                            },
                            "IsIPConfigurationEnabled": false,
                            "MacAddress": "00:50:56:bd:a0:69"
                        }
                    ],
                    "AwsNetworkSettings": null,
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v368",
                            "ServerIdentifier": {
                                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                            }
                        },
                        "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {
                        "Type": 0,
                        "Limit": 0
                    },
                    "JournalWarningThreshold": {
                        "Type": 0,
                        "Limit": 0
                    },
                    "JournalDatastores": []
                }
            ],
            "OwnersId": {
                "OwnersGuid": "f19e68ae-c0af-4cda-bed7-1840c7b97bfd"
            },
            "ZertoOrganizationIdentifier": {
                "Guid": "00000000-0000-0000-0000-000000000000"
            }
        },
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
                "Alerts": [
                    {
                        "Description": "VPG test journal history is less than 1 hour of the configured 4 hours. This has occurred because of a synchronization between the protected and recovery sites and will automatically be resolved when the journal history is fully populated.",
                        "SiteName": "gui_local",
                        "AlertLevel": 1
                    }
                ],
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
        "Reason": "",
        "SiteDetails": {
            "SiteName": "gui_local",
            "IpAddress": "10.10.0.51",
            "VCenterName": "ZNest81VC",
            "CurrentLocalTime": "16:13",
            "ContactInfo": "evgeny.rivkin",
            "ContactEmail": "evgeny.rivkin@zerto.com",
            "ContactPhone": "066-6666666",
            "ServerId": {
                "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
            },
            "Location": "at Zerto",
            "LicenseType": 1,
            "SiteVersion": "4.0",
            "BucketName": ""
        },
        "Summary": {
            "NumberOfVms": 2,
            "NumberOfProvisionedMB": 534,
            "NumberOfUsedMB": 40,
            "RecoveryStorageSizeInMB": 680,
            "LastTest": null,
            "HistoryInSeconds": 440,
            "VpgBackupJobStatus": 1,
            "BackupRepository": "MyRep",
            "VpgDetailsScreenBackupInformation": {
                "LastRunResult": 0,
                "StartTimeOfLastRun": "2015-06-08T13:14:34.710Z"
            },
            "EarliestCheckpoint": {
                "Identifier": {
                    "Identifier": 37814
                },
                "TimeStamp": "2015-06-10T13:06:19.000Z",
                "Tag": null,
                "Vss": false
            }
        },
        "Performance": {
            "IncomingIops": {
                "Values": [
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:42.551Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:44.818Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:49.818Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:59.680Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:10.076Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:19.883Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:30.278Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:39.797Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:50.895Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:59.892Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:10.420Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:19.764Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:29.962Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:39.710Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:49.848Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:00.076Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:10.526Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:20.066Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:29.630Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:39.837Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:49.869Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:59.745Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:10.020Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:19.970Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:29.962Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:40.055Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:50.186Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:59.972Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:10.517Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:20.752Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:30.693Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:40.680Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:50.658Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:00.525Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:10.606Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:20.714Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:31.016Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:40.946Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:51.211Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:00.749Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:10.600Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:20.821Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:30.771Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:40.988Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:50.760Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:02.227Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:11.176Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:21.392Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:32.395Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:41.270Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:50.850Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:01.539Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:11.111Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:21.666Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:31.003Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:42.791Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:51.823Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:01.191Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:11.963Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:20.750Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:31.698Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:41.560Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:50.915Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:01.256Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:10.836Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:21.017Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:31.281Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:40.848Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:51.751Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:01.006Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:11.731Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:21.307Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:31.271Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:40.779Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:51.325Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:01.883Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:11.142Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:21.350Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:31.700Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:42.052Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:51.317Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:01.418Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:11.833Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:21.034Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:31.442Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:42.661Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:51.811Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:01.636Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:11.121Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:21.003Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:31.173Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:41.623Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:51.156Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:01.565Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:12.385Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:22.784Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:31.641Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:43.096Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:52.583Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:02.654Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:12.245Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:22.533Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:33.184Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:42.446Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:53.123Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:03.512Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:12.548Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:22.538Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:32.620Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:42.167Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:52.148Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:02.310Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:12.207Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:22.201Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:32.264Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:42.194Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:52.214Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:02.410Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:12.822Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:22.210Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:32.243Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:42.268Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:52.252Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:02.262Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:12.277Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:22.405Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:32.240Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:42.854Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:52.633Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:02.203Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:12.649Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:22.208Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:32.222Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:42.493Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:52.232Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:02.299Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:12.235Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:22.239Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:32.204Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:42.205Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:52.224Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:02.299Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:12.239Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:22.225Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:32.232Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:42.298Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:52.354Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:02.331Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:12.272Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:22.448Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:32.409Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:42.369Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:52.255Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:02.431Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:12.341Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:22.275Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:32.311Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:42.358Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:52.312Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:02.822Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:12.312Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:22.325Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:32.386Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:42.480Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:52.381Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:02.371Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:12.376Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:22.401Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:32.395Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:42.361Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:52.380Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:02.378Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:12.394Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:22.348Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:32.374Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:42.386Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:52.518Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:02.984Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:13.075Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:22.701Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:32.585Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:42.551Z"
                    }
                ],
                "ValuesAsCsv": "Date,Value\r\n20150610 154342,0\r\n20150610 154344,0\r\n20150610 154349,0\r\n20150610 154359,0\r\n20150610 154410,0\r\n20150610 154419,0\r\n20150610 154430,0\r\n20150610 154439,0\r\n20150610 154450,0\r\n20150610 154459,0\r\n20150610 154510,0\r\n20150610 154519,0\r\n20150610 154529,0\r\n20150610 154539,0\r\n20150610 154549,0\r\n20150610 154600,0\r\n20150610 154610,0\r\n20150610 154620,0\r\n20150610 154629,0\r\n20150610 154639,0\r\n20150610 154649,0\r\n20150610 154659,0\r\n20150610 154710,0\r\n20150610 154719,0\r\n20150610 154729,0\r\n20150610 154740,0\r\n20150610 154750,0\r\n20150610 154759,0\r\n20150610 154810,0\r\n20150610 154820,0\r\n20150610 154830,0\r\n20150610 154840,0\r\n20150610 154850,0\r\n20150610 154900,0\r\n20150610 154910,0\r\n20150610 154920,0\r\n20150610 154931,0\r\n20150610 154940,0\r\n20150610 154951,0\r\n20150610 155000,0\r\n20150610 155010,0\r\n20150610 155020,0\r\n20150610 155030,0\r\n20150610 155040,0\r\n20150610 155050,0\r\n20150610 155102,0\r\n20150610 155111,0\r\n20150610 155121,0\r\n20150610 155132,0\r\n20150610 155141,0\r\n20150610 155150,0\r\n20150610 155201,0\r\n20150610 155211,0\r\n20150610 155221,0\r\n20150610 155231,0\r\n20150610 155242,0\r\n20150610 155251,0\r\n20150610 155301,0\r\n20150610 155311,0\r\n20150610 155320,0\r\n20150610 155331,0\r\n20150610 155341,0\r\n20150610 155350,0\r\n20150610 155401,0\r\n20150610 155410,0\r\n20150610 155421,0\r\n20150610 155431,0\r\n20150610 155440,0\r\n20150610 155451,0\r\n20150610 155501,0\r\n20150610 155511,0\r\n20150610 155521,0\r\n20150610 155531,0\r\n20150610 155540,0\r\n20150610 155551,0\r\n20150610 155601,0\r\n20150610 155611,0\r\n20150610 155621,0\r\n20150610 155631,0\r\n20150610 155642,0\r\n20150610 155651,0\r\n20150610 155701,0\r\n20150610 155711,0\r\n20150610 155721,0\r\n20150610 155731,0\r\n20150610 155742,0\r\n20150610 155751,0\r\n20150610 155801,0\r\n20150610 155811,0\r\n20150610 155821,0\r\n20150610 155831,0\r\n20150610 155841,0\r\n20150610 155851,0\r\n20150610 155901,0\r\n20150610 155912,0\r\n20150610 155922,0\r\n20150610 155931,0\r\n20150610 155943,0\r\n20150610 155952,0\r\n20150610 160002,0\r\n20150610 160012,0\r\n20150610 160022,0\r\n20150610 160033,0\r\n20150610 160042,0\r\n20150610 160053,0\r\n20150610 160103,0\r\n20150610 160112,0\r\n20150610 160122,0\r\n20150610 160132,0\r\n20150610 160142,0\r\n20150610 160152,0\r\n20150610 160202,0\r\n20150610 160212,0\r\n20150610 160222,0\r\n20150610 160232,0\r\n20150610 160242,0\r\n20150610 160252,0\r\n20150610 160302,0\r\n20150610 160312,0\r\n20150610 160322,0\r\n20150610 160332,0\r\n20150610 160342,0\r\n20150610 160352,0\r\n20150610 160402,0\r\n20150610 160412,0\r\n20150610 160422,0\r\n20150610 160432,0\r\n20150610 160442,0\r\n20150610 160452,0\r\n20150610 160502,0\r\n20150610 160512,0\r\n20150610 160522,0\r\n20150610 160532,0\r\n20150610 160542,0\r\n20150610 160552,0\r\n20150610 160602,0\r\n20150610 160612,0\r\n20150610 160622,0\r\n20150610 160632,0\r\n20150610 160642,0\r\n20150610 160652,0\r\n20150610 160702,0\r\n20150610 160712,0\r\n20150610 160722,0\r\n20150610 160732,0\r\n20150610 160742,0\r\n20150610 160752,0\r\n20150610 160802,0\r\n20150610 160812,0\r\n20150610 160822,0\r\n20150610 160832,0\r\n20150610 160842,0\r\n20150610 160852,0\r\n20150610 160902,0\r\n20150610 160912,0\r\n20150610 160922,0\r\n20150610 160932,0\r\n20150610 160942,0\r\n20150610 160952,0\r\n20150610 161002,0\r\n20150610 161012,0\r\n20150610 161022,0\r\n20150610 161032,0\r\n20150610 161042,0\r\n20150610 161052,0\r\n20150610 161102,0\r\n20150610 161112,0\r\n20150610 161122,0\r\n20150610 161132,0\r\n20150610 161142,0\r\n20150610 161152,0\r\n20150610 161202,0\r\n20150610 161212,0\r\n20150610 161222,0\r\n20150610 161232,0\r\n20150610 161242,0\r\n20150610 161252,0\r\n20150610 161302,0\r\n20150610 161313,0\r\n20150610 161322,0\r\n20150610 161332,0\r\n20150610 161342,0\r\n"
            },
            "RPOInSeconds": {
                "Values": [
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:42.551Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:44.818Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:43:49.818Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:43:59.680Z"
                    },
                    {
                        "Value": 6,
                        "Time": "2015-06-10T12:44:10.076Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:44:19.883Z"
                    },
                    {
                        "Value": 16,
                        "Time": "2015-06-10T12:44:30.278Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:44:39.797Z"
                    },
                    {
                        "Value": 6,
                        "Time": "2015-06-10T12:44:50.895Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:44:59.892Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:45:10.420Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:45:19.764Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:45:29.962Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:45:39.710Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:45:49.848Z"
                    },
                    {
                        "Value": 16,
                        "Time": "2015-06-10T12:46:00.076Z"
                    },
                    {
                        "Value": 6,
                        "Time": "2015-06-10T12:46:10.526Z"
                    },
                    {
                        "Value": 16,
                        "Time": "2015-06-10T12:46:20.066Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:46:29.630Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:46:39.837Z"
                    },
                    {
                        "Value": 4,
                        "Time": "2015-06-10T12:46:49.869Z"
                    },
                    {
                        "Value": 4,
                        "Time": "2015-06-10T12:46:59.745Z"
                    },
                    {
                        "Value": 10,
                        "Time": "2015-06-10T12:47:10.020Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:47:19.970Z"
                    },
                    {
                        "Value": 4,
                        "Time": "2015-06-10T12:47:29.962Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:47:40.055Z"
                    },
                    {
                        "Value": 10,
                        "Time": "2015-06-10T12:47:50.186Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:47:59.972Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:48:10.517Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:48:20.752Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:48:30.693Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:48:40.680Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:48:50.658Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:49:00.525Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:49:10.606Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:49:20.714Z"
                    },
                    {
                        "Value": 6,
                        "Time": "2015-06-10T12:49:31.016Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:49:40.946Z"
                    },
                    {
                        "Value": 16,
                        "Time": "2015-06-10T12:49:51.211Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:50:00.749Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:50:10.600Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:50:20.821Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:50:30.771Z"
                    },
                    {
                        "Value": 15,
                        "Time": "2015-06-10T12:50:40.988Z"
                    },
                    {
                        "Value": 5,
                        "Time": "2015-06-10T12:50:50.760Z"
                    },
                    {
                        "Value": 7,
                        "Time": "2015-06-10T12:51:02.227Z"
                    },
                    {
                        "Value": 16,
                        "Time": "2015-06-10T12:51:11.176Z"
                    },
                    {
                        "Value": 6,
                        "Time": "2015-06-10T12:51:21.392Z"
                    },
                    {
                        "Value": 7,
                        "Time": "2015-06-10T12:51:32.395Z"
                    },
                    {
                        "Value": 16,
                        "Time": "2015-06-10T12:51:41.270Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:51:50.850Z"
                    },
                    {
                        "Value": 11,
                        "Time": "2015-06-10T12:52:01.539Z"
                    },
                    {
                        "Value": 6,
                        "Time": "2015-06-10T12:52:11.111Z"
                    },
                    {
                        "Value": 10,
                        "Time": "2015-06-10T12:52:21.666Z"
                    },
                    {
                        "Value": 19,
                        "Time": "2015-06-10T12:52:31.003Z"
                    },
                    {
                        "Value": 17,
                        "Time": "2015-06-10T12:52:42.791Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:52:51.823Z"
                    },
                    {
                        "Value": 4,
                        "Time": "2015-06-10T12:53:01.191Z"
                    },
                    {
                        "Value": 14,
                        "Time": "2015-06-10T12:53:11.963Z"
                    },
                    {
                        "Value": 7,
                        "Time": "2015-06-10T12:53:20.750Z"
                    },
                    {
                        "Value": 14,
                        "Time": "2015-06-10T12:53:31.698Z"
                    },
                    {
                        "Value": 4,
                        "Time": "2015-06-10T12:53:41.560Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:53:50.915Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:54:01.256Z"
                    },
                    {
                        "Value": 18,
                        "Time": "2015-06-10T12:54:10.836Z"
                    },
                    {
                        "Value": 2,
                        "Time": "2015-06-10T12:54:21.017Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:54:31.281Z"
                    },
                    {
                        "Value": 7,
                        "Time": "2015-06-10T12:54:40.848Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:54:51.751Z"
                    },
                    {
                        "Value": 7,
                        "Time": "2015-06-10T12:55:01.006Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:55:11.731Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:55:21.307Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:55:31.271Z"
                    },
                    {
                        "Value": 7,
                        "Time": "2015-06-10T12:55:40.779Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:55:51.325Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:56:01.883Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:56:11.142Z"
                    },
                    {
                        "Value": 18,
                        "Time": "2015-06-10T12:56:21.350Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:56:31.700Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:56:42.052Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:56:51.317Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:57:01.418Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:57:11.833Z"
                    },
                    {
                        "Value": 18,
                        "Time": "2015-06-10T12:57:21.034Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:57:31.442Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:57:42.661Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:57:51.811Z"
                    },
                    {
                        "Value": 23,
                        "Time": "2015-06-10T12:58:01.636Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:58:11.121Z"
                    },
                    {
                        "Value": 12,
                        "Time": "2015-06-10T12:58:21.003Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:58:31.173Z"
                    },
                    {
                        "Value": 18,
                        "Time": "2015-06-10T12:58:41.623Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:58:51.156Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T12:59:01.565Z"
                    },
                    {
                        "Value": 4,
                        "Time": "2015-06-10T12:59:12.385Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:59:22.784Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T12:59:31.641Z"
                    },
                    {
                        "Value": 10,
                        "Time": "2015-06-10T12:59:43.096Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T12:59:52.583Z"
                    },
                    {
                        "Value": 14,
                        "Time": "2015-06-10T13:00:02.654Z"
                    },
                    {
                        "Value": 19,
                        "Time": "2015-06-10T13:00:12.245Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:00:22.533Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T13:00:33.184Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:00:42.446Z"
                    },
                    {
                        "Value": 14,
                        "Time": "2015-06-10T13:00:53.123Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T13:01:03.512Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:01:12.548Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:01:22.538Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:01:32.620Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:01:42.167Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:01:52.148Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:02:02.310Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:02:12.207Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:02:22.201Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:02:32.264Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:02:42.194Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:02:52.214Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:03:02.410Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:03:12.822Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:03:22.210Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:03:32.243Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:03:42.268Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:03:52.252Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:04:02.262Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:04:12.277Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:04:22.405Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:04:32.240Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:04:42.854Z"
                    },
                    {
                        "Value": 18,
                        "Time": "2015-06-10T13:04:52.633Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:05:02.203Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:05:12.649Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:05:22.208Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:05:32.222Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:05:42.493Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:05:52.232Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:06:02.299Z"
                    },
                    {
                        "Value": 13,
                        "Time": "2015-06-10T13:06:12.235Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:06:22.239Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:06:32.204Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:06:42.205Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:06:52.224Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:07:02.299Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:07:12.239Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:07:22.225Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:07:32.232Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:07:42.298Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:07:52.354Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:08:02.331Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:08:12.272Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:08:22.448Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:08:32.409Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:08:42.369Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:08:52.255Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:09:02.431Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:09:12.341Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:09:22.275Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:09:32.311Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:09:42.358Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:09:52.312Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:10:02.822Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:10:12.312Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:10:22.325Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:10:32.386Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:10:42.480Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:10:52.381Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:11:02.371Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:11:12.376Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:11:22.401Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:11:32.395Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:11:42.361Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:11:52.380Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:12:02.378Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:12:12.394Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:12:22.348Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:12:32.374Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:12:42.386Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:12:52.518Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:13:02.984Z"
                    },
                    {
                        "Value": 9,
                        "Time": "2015-06-10T13:13:13.075Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:13:22.701Z"
                    },
                    {
                        "Value": 8,
                        "Time": "2015-06-10T13:13:32.585Z"
                    },
                    {
                        "Value": 3,
                        "Time": "2015-06-10T13:13:42.551Z"
                    }
                ],
                "ValuesAsCsv": "Date,Value\r\n20150610 154342,0\r\n20150610 154344,0\r\n20150610 154349,15\r\n20150610 154359,15\r\n20150610 154410,6\r\n20150610 154419,15\r\n20150610 154430,16\r\n20150610 154439,15\r\n20150610 154450,6\r\n20150610 154459,15\r\n20150610 154510,15\r\n20150610 154519,15\r\n20150610 154529,5\r\n20150610 154539,15\r\n20150610 154549,15\r\n20150610 154600,16\r\n20150610 154610,6\r\n20150610 154620,16\r\n20150610 154629,15\r\n20150610 154639,9\r\n20150610 154649,4\r\n20150610 154659,4\r\n20150610 154710,10\r\n20150610 154719,9\r\n20150610 154729,4\r\n20150610 154740,5\r\n20150610 154750,10\r\n20150610 154759,9\r\n20150610 154810,5\r\n20150610 154820,5\r\n20150610 154830,15\r\n20150610 154840,15\r\n20150610 154850,5\r\n20150610 154900,5\r\n20150610 154910,15\r\n20150610 154920,15\r\n20150610 154931,6\r\n20150610 154940,5\r\n20150610 154951,16\r\n20150610 155000,15\r\n20150610 155010,5\r\n20150610 155020,5\r\n20150610 155030,15\r\n20150610 155040,15\r\n20150610 155050,5\r\n20150610 155102,7\r\n20150610 155111,16\r\n20150610 155121,6\r\n20150610 155132,7\r\n20150610 155141,16\r\n20150610 155150,9\r\n20150610 155201,11\r\n20150610 155211,6\r\n20150610 155221,10\r\n20150610 155231,19\r\n20150610 155242,17\r\n20150610 155251,9\r\n20150610 155301,4\r\n20150610 155311,14\r\n20150610 155320,7\r\n20150610 155331,14\r\n20150610 155341,4\r\n20150610 155350,8\r\n20150610 155401,9\r\n20150610 155410,18\r\n20150610 155421,2\r\n20150610 155431,8\r\n20150610 155440,7\r\n20150610 155451,8\r\n20150610 155501,7\r\n20150610 155511,8\r\n20150610 155521,13\r\n20150610 155531,13\r\n20150610 155540,7\r\n20150610 155551,8\r\n20150610 155601,13\r\n20150610 155611,13\r\n20150610 155621,18\r\n20150610 155631,8\r\n20150610 155642,9\r\n20150610 155651,13\r\n20150610 155701,8\r\n20150610 155711,8\r\n20150610 155721,18\r\n20150610 155731,13\r\n20150610 155742,9\r\n20150610 155751,13\r\n20150610 155801,23\r\n20150610 155811,13\r\n20150610 155821,12\r\n20150610 155831,8\r\n20150610 155841,18\r\n20150610 155851,8\r\n20150610 155901,13\r\n20150610 155912,4\r\n20150610 155922,9\r\n20150610 155931,8\r\n20150610 155943,10\r\n20150610 155952,9\r\n20150610 160002,14\r\n20150610 160012,19\r\n20150610 160022,8\r\n20150610 160033,9\r\n20150610 160042,13\r\n20150610 160053,14\r\n20150610 160103,9\r\n20150610 160112,8\r\n20150610 160122,13\r\n20150610 160132,13\r\n20150610 160142,8\r\n20150610 160152,8\r\n20150610 160202,13\r\n20150610 160212,13\r\n20150610 160222,8\r\n20150610 160232,8\r\n20150610 160242,13\r\n20150610 160252,13\r\n20150610 160302,8\r\n20150610 160312,13\r\n20150610 160322,13\r\n20150610 160332,13\r\n20150610 160342,8\r\n20150610 160352,8\r\n20150610 160402,13\r\n20150610 160412,13\r\n20150610 160422,8\r\n20150610 160432,8\r\n20150610 160442,13\r\n20150610 160452,18\r\n20150610 160502,8\r\n20150610 160512,8\r\n20150610 160522,13\r\n20150610 160532,13\r\n20150610 160542,8\r\n20150610 160552,8\r\n20150610 160602,13\r\n20150610 160612,13\r\n20150610 160622,8\r\n20150610 160632,3\r\n20150610 160642,8\r\n20150610 160652,8\r\n20150610 160702,3\r\n20150610 160712,3\r\n20150610 160722,8\r\n20150610 160732,8\r\n20150610 160742,3\r\n20150610 160752,3\r\n20150610 160802,8\r\n20150610 160812,8\r\n20150610 160822,3\r\n20150610 160832,3\r\n20150610 160842,8\r\n20150610 160852,8\r\n20150610 160902,3\r\n20150610 160912,3\r\n20150610 160922,8\r\n20150610 160932,8\r\n20150610 160942,3\r\n20150610 160952,3\r\n20150610 161002,8\r\n20150610 161012,8\r\n20150610 161022,3\r\n20150610 161032,3\r\n20150610 161042,8\r\n20150610 161052,8\r\n20150610 161102,3\r\n20150610 161112,8\r\n20150610 161122,8\r\n20150610 161132,8\r\n20150610 161142,3\r\n20150610 161152,8\r\n20150610 161202,8\r\n20150610 161212,8\r\n20150610 161222,3\r\n20150610 161232,8\r\n20150610 161242,8\r\n20150610 161252,8\r\n20150610 161302,3\r\n20150610 161313,9\r\n20150610 161322,8\r\n20150610 161332,8\r\n20150610 161342,3\r\n"
            },
            "IncomingThroughputInMb": {
                "Values": [
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:42.551Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:44.818Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:49.818Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:59.680Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:10.076Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:19.883Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:30.278Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:39.797Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:50.895Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:59.892Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:10.420Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:19.764Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:29.962Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:39.710Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:49.848Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:00.076Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:10.526Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:20.066Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:29.630Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:39.837Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:49.869Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:59.745Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:10.020Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:19.970Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:29.962Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:40.055Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:50.186Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:59.972Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:10.517Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:20.752Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:30.693Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:40.680Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:50.658Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:00.525Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:10.606Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:20.714Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:31.016Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:40.946Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:51.211Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:00.749Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:10.600Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:20.821Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:30.771Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:40.988Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:50.760Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:02.227Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:11.176Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:21.392Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:32.395Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:41.270Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:50.850Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:01.539Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:11.111Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:21.666Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:31.003Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:42.791Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:51.823Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:01.191Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:11.963Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:20.750Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:31.698Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:41.560Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:50.915Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:01.256Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:10.836Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:21.017Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:31.281Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:40.848Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:51.751Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:01.006Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:11.731Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:21.307Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:31.271Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:40.779Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:51.325Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:01.883Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:11.142Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:21.350Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:31.700Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:42.052Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:51.317Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:01.418Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:11.833Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:21.034Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:31.442Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:42.661Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:51.811Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:01.636Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:11.121Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:21.003Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:31.173Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:41.623Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:51.156Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:01.565Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:12.385Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:22.784Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:31.641Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:43.096Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:52.583Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:02.654Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:12.245Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:22.533Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:33.184Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:42.446Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:53.123Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:03.512Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:12.548Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:22.538Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:32.620Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:42.167Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:52.148Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:02.310Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:12.207Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:22.201Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:32.264Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:42.194Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:52.214Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:02.410Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:12.822Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:22.210Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:32.243Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:42.268Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:52.252Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:02.262Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:12.277Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:22.405Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:32.240Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:42.854Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:52.633Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:02.203Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:12.649Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:22.208Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:32.222Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:42.493Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:52.232Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:02.299Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:12.235Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:22.239Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:32.204Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:42.205Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:52.224Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:02.299Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:12.239Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:22.225Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:32.232Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:42.298Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:52.354Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:02.331Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:12.272Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:22.448Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:32.409Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:42.369Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:52.255Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:02.431Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:12.341Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:22.275Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:32.311Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:42.358Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:52.312Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:02.822Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:12.312Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:22.325Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:32.386Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:42.480Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:52.381Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:02.371Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:12.376Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:22.401Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:32.395Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:42.361Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:52.380Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:02.378Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:12.394Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:22.348Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:32.374Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:42.386Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:52.518Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:02.984Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:13.075Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:22.701Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:32.585Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:42.551Z"
                    }
                ],
                "ValuesAsCsv": "Date,Value\r\n20150610 154342,0\r\n20150610 154344,0\r\n20150610 154349,0\r\n20150610 154359,0\r\n20150610 154410,0\r\n20150610 154419,0\r\n20150610 154430,0\r\n20150610 154439,0\r\n20150610 154450,0\r\n20150610 154459,0\r\n20150610 154510,0\r\n20150610 154519,0\r\n20150610 154529,0\r\n20150610 154539,0\r\n20150610 154549,0\r\n20150610 154600,0\r\n20150610 154610,0\r\n20150610 154620,0\r\n20150610 154629,0\r\n20150610 154639,0\r\n20150610 154649,0\r\n20150610 154659,0\r\n20150610 154710,0\r\n20150610 154719,0\r\n20150610 154729,0\r\n20150610 154740,0\r\n20150610 154750,0\r\n20150610 154759,0\r\n20150610 154810,0\r\n20150610 154820,0\r\n20150610 154830,0\r\n20150610 154840,0\r\n20150610 154850,0\r\n20150610 154900,0\r\n20150610 154910,0\r\n20150610 154920,0\r\n20150610 154931,0\r\n20150610 154940,0\r\n20150610 154951,0\r\n20150610 155000,0\r\n20150610 155010,0\r\n20150610 155020,0\r\n20150610 155030,0\r\n20150610 155040,0\r\n20150610 155050,0\r\n20150610 155102,0\r\n20150610 155111,0\r\n20150610 155121,0\r\n20150610 155132,0\r\n20150610 155141,0\r\n20150610 155150,0\r\n20150610 155201,0\r\n20150610 155211,0\r\n20150610 155221,0\r\n20150610 155231,0\r\n20150610 155242,0\r\n20150610 155251,0\r\n20150610 155301,0\r\n20150610 155311,0\r\n20150610 155320,0\r\n20150610 155331,0\r\n20150610 155341,0\r\n20150610 155350,0\r\n20150610 155401,0\r\n20150610 155410,0\r\n20150610 155421,0\r\n20150610 155431,0\r\n20150610 155440,0\r\n20150610 155451,0\r\n20150610 155501,0\r\n20150610 155511,0\r\n20150610 155521,0\r\n20150610 155531,0\r\n20150610 155540,0\r\n20150610 155551,0\r\n20150610 155601,0\r\n20150610 155611,0\r\n20150610 155621,0\r\n20150610 155631,0\r\n20150610 155642,0\r\n20150610 155651,0\r\n20150610 155701,0\r\n20150610 155711,0\r\n20150610 155721,0\r\n20150610 155731,0\r\n20150610 155742,0\r\n20150610 155751,0\r\n20150610 155801,0\r\n20150610 155811,0\r\n20150610 155821,0\r\n20150610 155831,0\r\n20150610 155841,0\r\n20150610 155851,0\r\n20150610 155901,0\r\n20150610 155912,0\r\n20150610 155922,0\r\n20150610 155931,0\r\n20150610 155943,0\r\n20150610 155952,0\r\n20150610 160002,0\r\n20150610 160012,0\r\n20150610 160022,0\r\n20150610 160033,0\r\n20150610 160042,0\r\n20150610 160053,0\r\n20150610 160103,0\r\n20150610 160112,0\r\n20150610 160122,0\r\n20150610 160132,0\r\n20150610 160142,0\r\n20150610 160152,0\r\n20150610 160202,0\r\n20150610 160212,0\r\n20150610 160222,0\r\n20150610 160232,0\r\n20150610 160242,0\r\n20150610 160252,0\r\n20150610 160302,0\r\n20150610 160312,0\r\n20150610 160322,0\r\n20150610 160332,0\r\n20150610 160342,0\r\n20150610 160352,0\r\n20150610 160402,0\r\n20150610 160412,0\r\n20150610 160422,0\r\n20150610 160432,0\r\n20150610 160442,0\r\n20150610 160452,0\r\n20150610 160502,0\r\n20150610 160512,0\r\n20150610 160522,0\r\n20150610 160532,0\r\n20150610 160542,0\r\n20150610 160552,0\r\n20150610 160602,0\r\n20150610 160612,0\r\n20150610 160622,0\r\n20150610 160632,0\r\n20150610 160642,0\r\n20150610 160652,0\r\n20150610 160702,0\r\n20150610 160712,0\r\n20150610 160722,0\r\n20150610 160732,0\r\n20150610 160742,0\r\n20150610 160752,0\r\n20150610 160802,0\r\n20150610 160812,0\r\n20150610 160822,0\r\n20150610 160832,0\r\n20150610 160842,0\r\n20150610 160852,0\r\n20150610 160902,0\r\n20150610 160912,0\r\n20150610 160922,0\r\n20150610 160932,0\r\n20150610 160942,0\r\n20150610 160952,0\r\n20150610 161002,0\r\n20150610 161012,0\r\n20150610 161022,0\r\n20150610 161032,0\r\n20150610 161042,0\r\n20150610 161052,0\r\n20150610 161102,0\r\n20150610 161112,0\r\n20150610 161122,0\r\n20150610 161132,0\r\n20150610 161142,0\r\n20150610 161152,0\r\n20150610 161202,0\r\n20150610 161212,0\r\n20150610 161222,0\r\n20150610 161232,0\r\n20150610 161242,0\r\n20150610 161252,0\r\n20150610 161302,0\r\n20150610 161313,0\r\n20150610 161322,0\r\n20150610 161332,0\r\n20150610 161342,0\r\n"
            },
            "OutgoingBandWidth": {
                "Values": [
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:42.551Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:44.818Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:49.818Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:43:59.680Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:10.076Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:19.883Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:30.278Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:39.797Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:50.895Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:44:59.892Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:10.420Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:19.764Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:29.962Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:39.710Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:45:49.848Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:00.076Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:10.526Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:20.066Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:29.630Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:39.837Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:49.869Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:46:59.745Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:10.020Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:19.970Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:29.962Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:40.055Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:50.186Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:47:59.972Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:10.517Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:20.752Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:30.693Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:40.680Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:48:50.658Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:00.525Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:10.606Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:20.714Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:31.016Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:40.946Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:49:51.211Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:00.749Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:10.600Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:20.821Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:30.771Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:40.988Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:50:50.760Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:02.227Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:11.176Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:21.392Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:32.395Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:41.270Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:51:50.850Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:01.539Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:11.111Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:21.666Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:31.003Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:42.791Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:52:51.823Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:01.191Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:11.963Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:20.750Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:31.698Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:41.560Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:53:50.915Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:01.256Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:10.836Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:21.017Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:31.281Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:40.848Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:54:51.751Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:01.006Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:11.731Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:21.307Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:31.271Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:40.779Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:55:51.325Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:01.883Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:11.142Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:21.350Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:31.700Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:42.052Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:56:51.317Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:01.418Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:11.833Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:21.034Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:31.442Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:42.661Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:57:51.811Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:01.636Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:11.121Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:21.003Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:31.173Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:41.623Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:58:51.156Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:01.565Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:12.385Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:22.784Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:31.641Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:43.096Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T12:59:52.583Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:02.654Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:12.245Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:22.533Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:33.184Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:42.446Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:00:53.123Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:03.512Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:12.548Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:22.538Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:32.620Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:42.167Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:01:52.148Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:02.310Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:12.207Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:22.201Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:32.264Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:42.194Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:02:52.214Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:02.410Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:12.822Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:22.210Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:32.243Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:42.268Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:03:52.252Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:02.262Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:12.277Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:22.405Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:32.240Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:42.854Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:04:52.633Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:02.203Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:12.649Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:22.208Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:32.222Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:42.493Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:05:52.232Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:02.299Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:12.235Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:22.239Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:32.204Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:42.205Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:06:52.224Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:02.299Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:12.239Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:22.225Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:32.232Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:42.298Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:07:52.354Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:02.331Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:12.272Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:22.448Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:32.409Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:42.369Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:08:52.255Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:02.431Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:12.341Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:22.275Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:32.311Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:42.358Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:09:52.312Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:02.822Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:12.312Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:22.325Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:32.386Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:42.480Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:10:52.381Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:02.371Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:12.376Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:22.401Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:32.395Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:42.361Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:11:52.380Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:02.378Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:12.394Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:22.348Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:32.374Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:42.386Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:12:52.518Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:02.984Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:13.075Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:22.701Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:32.585Z"
                    },
                    {
                        "Value": 0,
                        "Time": "2015-06-10T13:13:42.551Z"
                    }
                ],
                "ValuesAsCsv": "Date,Value\r\n20150610 154342,0\r\n20150610 154344,0\r\n20150610 154349,0\r\n20150610 154359,0\r\n20150610 154410,0\r\n20150610 154419,0\r\n20150610 154430,0\r\n20150610 154439,0\r\n20150610 154450,0\r\n20150610 154459,0\r\n20150610 154510,0\r\n20150610 154519,0\r\n20150610 154529,0\r\n20150610 154539,0\r\n20150610 154549,0\r\n20150610 154600,0\r\n20150610 154610,0\r\n20150610 154620,0\r\n20150610 154629,0\r\n20150610 154639,0\r\n20150610 154649,0\r\n20150610 154659,0\r\n20150610 154710,0\r\n20150610 154719,0\r\n20150610 154729,0\r\n20150610 154740,0\r\n20150610 154750,0\r\n20150610 154759,0\r\n20150610 154810,0\r\n20150610 154820,0\r\n20150610 154830,0\r\n20150610 154840,0\r\n20150610 154850,0\r\n20150610 154900,0\r\n20150610 154910,0\r\n20150610 154920,0\r\n20150610 154931,0\r\n20150610 154940,0\r\n20150610 154951,0\r\n20150610 155000,0\r\n20150610 155010,0\r\n20150610 155020,0\r\n20150610 155030,0\r\n20150610 155040,0\r\n20150610 155050,0\r\n20150610 155102,0\r\n20150610 155111,0\r\n20150610 155121,0\r\n20150610 155132,0\r\n20150610 155141,0\r\n20150610 155150,0\r\n20150610 155201,0\r\n20150610 155211,0\r\n20150610 155221,0\r\n20150610 155231,0\r\n20150610 155242,0\r\n20150610 155251,0\r\n20150610 155301,0\r\n20150610 155311,0\r\n20150610 155320,0\r\n20150610 155331,0\r\n20150610 155341,0\r\n20150610 155350,0\r\n20150610 155401,0\r\n20150610 155410,0\r\n20150610 155421,0\r\n20150610 155431,0\r\n20150610 155440,0\r\n20150610 155451,0\r\n20150610 155501,0\r\n20150610 155511,0\r\n20150610 155521,0\r\n20150610 155531,0\r\n20150610 155540,0\r\n20150610 155551,0\r\n20150610 155601,0\r\n20150610 155611,0\r\n20150610 155621,0\r\n20150610 155631,0\r\n20150610 155642,0\r\n20150610 155651,0\r\n20150610 155701,0\r\n20150610 155711,0\r\n20150610 155721,0\r\n20150610 155731,0\r\n20150610 155742,0\r\n20150610 155751,0\r\n20150610 155801,0\r\n20150610 155811,0\r\n20150610 155821,0\r\n20150610 155831,0\r\n20150610 155841,0\r\n20150610 155851,0\r\n20150610 155901,0\r\n20150610 155912,0\r\n20150610 155922,0\r\n20150610 155931,0\r\n20150610 155943,0\r\n20150610 155952,0\r\n20150610 160002,0\r\n20150610 160012,0\r\n20150610 160022,0\r\n20150610 160033,0\r\n20150610 160042,0\r\n20150610 160053,0\r\n20150610 160103,0\r\n20150610 160112,0\r\n20150610 160122,0\r\n20150610 160132,0\r\n20150610 160142,0\r\n20150610 160152,0\r\n20150610 160202,0\r\n20150610 160212,0\r\n20150610 160222,0\r\n20150610 160232,0\r\n20150610 160242,0\r\n20150610 160252,0\r\n20150610 160302,0\r\n20150610 160312,0\r\n20150610 160322,0\r\n20150610 160332,0\r\n20150610 160342,0\r\n20150610 160352,0\r\n20150610 160402,0\r\n20150610 160412,0\r\n20150610 160422,0\r\n20150610 160432,0\r\n20150610 160442,0\r\n20150610 160452,0\r\n20150610 160502,0\r\n20150610 160512,0\r\n20150610 160522,0\r\n20150610 160532,0\r\n20150610 160542,0\r\n20150610 160552,0\r\n20150610 160602,0\r\n20150610 160612,0\r\n20150610 160622,0\r\n20150610 160632,0\r\n20150610 160642,0\r\n20150610 160652,0\r\n20150610 160702,0\r\n20150610 160712,0\r\n20150610 160722,0\r\n20150610 160732,0\r\n20150610 160742,0\r\n20150610 160752,0\r\n20150610 160802,0\r\n20150610 160812,0\r\n20150610 160822,0\r\n20150610 160832,0\r\n20150610 160842,0\r\n20150610 160852,0\r\n20150610 160902,0\r\n20150610 160912,0\r\n20150610 160922,0\r\n20150610 160932,0\r\n20150610 160942,0\r\n20150610 160952,0\r\n20150610 161002,0\r\n20150610 161012,0\r\n20150610 161022,0\r\n20150610 161032,0\r\n20150610 161042,0\r\n20150610 161052,0\r\n20150610 161102,0\r\n20150610 161112,0\r\n20150610 161122,0\r\n20150610 161132,0\r\n20150610 161142,0\r\n20150610 161152,0\r\n20150610 161202,0\r\n20150610 161212,0\r\n20150610 161222,0\r\n20150610 161232,0\r\n20150610 161242,0\r\n20150610 161252,0\r\n20150610 161302,0\r\n20150610 161313,0\r\n20150610 161322,0\r\n20150610 161332,0\r\n20150610 161342,0\r\n"
            }
        },
        "SitesInfo": {
            "SourceSiteName": "gui_local",
            "SourceSiteIdentifier": {
                "SiteGuid": "594a2234-4b83-4cbe-b50a-f708f0609140"
            },
            "TargetSiteName": "gui_local",
            "TargetSiteIdentifier": {
                "SiteGuid": "594a2234-4b83-4cbe-b50a-f708f0609140"
            },
            "CustomerName": "N/A"
        },
        "CloneStatus": null,
        "Entities": {
            "Source": 0,
            "Target": 0
        },
        "LastUserActivityFailed": false,
        "ConfigurationFlags": {
            "IsStorageProfileEnabled": false,
            "IsCompressionConfigurable": true,
            "IsVmFolderConfigurable": true,
            "IsBackupFeatureSupported": true
        },
        "IsManageSiteSettingsEnabled": true,
        "Direction": 2,
        "ZorgId": null,
        "Topology": {
            "SourceSite": {
                "SiteName": "gui_local",
                "SiteLocation": "at Zerto",
                "SiteIp": "10.10.0.51",
                "Zorg": null,
                "Hosts": [
                    {
                        "VraName": "172.20.200.2",
                        "IsGhost": false,
                        "IsSiteToVraConnectionOk": true,
                        "IsVraToVraConnectionOk": true,
                        "Host": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-9",
                                "Type": 0,
                                "ServerIdentifier": {
                                    "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                }
                            },
                            "ResourcePoolIdentifier": null,
                            "DisplayName": "172.20.200.2"
                        },
                        "OrgVdc": null,
                        "Alerts": [],
                        "ResourcePoolAlerts": []
                    }
                ],
                "Alerts": [],
                "SiteToHostConnectivity": {
                    "[Host host-9, server 09d0d3b4-78d0-47c1-ad38-d01887e6d589]": true
                },
                "IsConnected": true
            },
            "TargetSite": {
                "SiteName": "gui_local",
                "SiteLocation": "at Zerto",
                "SiteIp": "10.10.0.51",
                "Zorg": null,
                "Hosts": [
                    {
                        "VraName": "172.20.200.2",
                        "IsGhost": false,
                        "IsSiteToVraConnectionOk": true,
                        "IsVraToVraConnectionOk": true,
                        "Host": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-9",
                                "Type": 0,
                                "ServerIdentifier": {
                                    "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                }
                            },
                            "ResourcePoolIdentifier": null,
                            "DisplayName": "172.20.200.2"
                        },
                        "OrgVdc": null,
                        "Alerts": [],
                        "ResourcePoolAlerts": []
                    }
                ],
                "Alerts": [],
                "SiteToHostConnectivity": {
                    "[Host host-9, server 09d0d3b4-78d0-47c1-ad38-d01887e6d589]": true
                },
                "IsConnected": true
            }
        }
    };

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_vpgSitesModel_) {
        model = _vpgSitesModel_;

        model._processData(vpgData);
    }));

    it('should have processed data', function () {
        spyOn(model, '_parseSite').and.callThrough();
        spyOn(model, '_createLinks').and.callThrough();
        spyOn(model, '_insertHostNodes').and.callThrough();
        spyOn(model, '_insertVmsNodes').and.callThrough();
        spyOn(model, '_calcGroupHeight').and.callThrough();

        model._processData(vpgData);

        expect(model._parseSite.calls.count()).toBe(2);
        expect(model._createLinks).toHaveBeenCalled();
        expect(model._insertHostNodes.calls.count()).toBe(2);
        expect(model._insertVmsNodes).toHaveBeenCalled();
        expect(model._calcGroupHeight.calls.count()).toBe(2);


        expect(model.TARGET_SITE_AWS).toBeFalsy();
        expect(model.SOURCE_SITE_AWS).toBeFalsy();
        expect(model._sourceSite).toBeDefined();
        expect(model._targetSite).toBeDefined();

    });

    it('should parse site details', function () {
        var site = model._parseSite(vpgData.Topology.SourceSite);
        expect(site.name).toEqual('gui_local');
        expect(site.location).toEqual('at Zerto');
    });

    //describe('count vms has 3 possible results', function () {
    //    var localModel;
    //    beforeEach(inject(function (_vpgSitesModel_) {
    //        localModel =_vpgSitesModel_;
    //        localModel._processData(vpgData);
    //        spyOn(localModel, '_getHostName').and.callThrough();
    //        spyOn(localModel, '_hasOrgVdc').and.callThrough();
    //    }));
    //
    //    it('should return all vms count when target is AWS', function () {
    //        localModel.TARGET_SITE_AWS = true;
    //        localModel._targetSite.data.Hosts = [];
    //        expect(localModel._countVms('whatever', localModel.TARGET_HOST, [{}, {}, {}])).toBe(3);
    //        expect(localModel._hasOrgVdc).not.toHaveBeenCalled();
    //        expect(localModel._getHostName).not.toHaveBeenCalled();
    //    });
    //
    //    it('should return all vms count when source is AWS', function () {
    //        localModel.SOURCE_SITE_AWS = true;
    //        localModel._sourceSite.data.Hosts = [];
    //        expect(localModel._countVms('whatever', model.SOURCE_HOST, [{}, {}, {}, {}])).toBe(4);
    //        expect(localModel._hasOrgVdc).not.toHaveBeenCalled();
    //        expect(localModel._getHostName).not.toHaveBeenCalled();
    //    });
    //    //todo: need to test reset of cases
    //});

    it('should create links', function () {
        var links = model._createLinks(vpgData.VpgConfiguration.VirtualMachines);
        expect(links.length).toEqual(4);
    });

    it('should create a target link', function () {
        var link = model._linkTarget(new Link(), vpgData.VpgConfiguration.VirtualMachines[0], 0);
        expect(link.key).toEqual(0);
        expect(link.source.type).toEqual(model.VM);
        expect(link.target.type).toEqual(model.TARGET);
    });

    it('should create a source link', function () {
        var link = model._linkSource(new Link(), vpgData.VpgConfiguration.VirtualMachines[0], 0);
        expect(link.key).toEqual(0);
        expect(link.source.type).toEqual(model.SOURCE);
        expect(link.target.type).toEqual(model.VM);
    });


    it('should create host nodes', function () {
        var nodes = model._insertHostNodes(vpgData.Topology.SourceSite.Hosts, model.SOURCE, model.SOURCE);
        expect(nodes.length).toEqual(1);
    });

    it('should create vms nodes', function () {
        var vms = model._insertVmsNodes(vpgData.VpgConfiguration.VirtualMachines, model.VM);
        expect(vms.length).toEqual(2);
    });


});
