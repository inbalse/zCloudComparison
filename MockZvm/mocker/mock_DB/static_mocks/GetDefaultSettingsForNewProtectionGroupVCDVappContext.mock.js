module.exports = function GetDefaultSettingsForNewProtectionGroupVCDVappContext() {
    return {
        "Config": {
            "Name": "SdVapp1Org2",
            "Configuration": {
                "Priority": 1,
                "MinimalJournalLenghtInMinutes": 1440,
                "RPOThressholdInSeconds": 300,
                "MaxTestIntervalInMinutes": 0,
                "WanCompression": true,
                "ScriptingSettings": {
                    "PreRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                    "PostRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                    "UseScripts": false
                },
                "ManageJournalSettings": {
                    "JournalDatastore": null,
                    "JournalHardLimitPerVM": {"Type": 2, "Limit": 75},
                    "JournalWarningThresholdPerVM": {"Type": 2, "Limit": 50}
                },
                "BootOrder": {
                    "Groups": [{
                        "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                        "Name": "Default",
                        "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                        "Machines": []
                    }]
                },
                "ServiceProfile": {
                    "SelectedIdentifier": {"InternalId": "7fa2fd05-00f3-4f2a-991b-b4e1c20c9356"},
                    "Name": "System Service Profile"
                },
                "Backup": {
                    "Target": {"SelectedTarget": null},
                    "Scheduler": {
                        "RunningTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6},
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
                "CopyNatRulesOptions": 2,
                "CopyNatServiceAvailable": true
            },
            "Defaults": {
                "TargetComputeResource": null,
                "TargetDatastore": null,
                "FailoverNetwork": null,
                "TestNetwork": null,
                "TargetFolder": null,
                "FailoverVCDVAppNetwork": null,
                "TestVCDVAppNetwork": null,
                "RecoveryCloudSettings": null
            },
            "ProtectedVappSettings": {
                "VcenterVappId": null,
                "VCDVappSettings": {
                    "VCDVappId": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:vapp:ba3003b0-5935-4781-90a6-3d1ddbd94376"
                    },
                    "OrgVirtualDatacenter": {
                        "Id": {
                            "Id": "00000000-0000-0000-0000-000000000000",
                            "VCDId": "urn:vcloud:vdc:4e38301a-98dd-4ca7-b591-dd9bfb7d5101"
                        }, "DisplayName": "OrgvDCSiteD2"
                    },
                    "VCDVappDisplayName": "SdVapp1Org2"
                },
                "VcenterVappDisplayName": ""
            },
            "RecoveryVappSettings": null,
            "VirtualMachines": [{
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-2781",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                },
                "Name": "SdVm3 (a074f231-4c62-4be0-ad76-7f6a1bfcb110)",
                "SourceHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-10",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.1"
                },
                "SourceDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-14",
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "BF4BL1-01_02 IBM Datastore Vol2"
                },
                "TargetHost": null,
                "TargetDatastore": null,
                "StorageUsageInfo": {
                    "ProvisionedStorageSizeInMB": 1338,
                    "UsedStorageSizeInMB": 605,
                    "RecoveryStorageSizeInMB": 0
                },
                "Volumes": [{
                    "SourceAddress": "[BF4BL1-01_02 IBM Datastore Vol2]:SdVm3 (a074f231-4c62-4be0-ad76-7f6a1bfcb110)/SdVm3 (a074f231-4c62-4be0-ad76-7f6a1bfcb110)_2.vmdk",
                    "TargetAddress": null,
                    "Swap": false,
                    "ProvisionedSizeInMB": 512,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d a7 e3 96 b0 86 77-a4 c7 9d d4 cc ef 5d cc",
                                "InstanceUuid": "50 25 b4 d0 22 17 54 56-2a fd b7 e3 63 f9 a3 4d"
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
                                "Datastore": null,
                                "VCDDatastore": {"IsThin": true},
                                "ExistingDisk": null,
                                "RawDevice": null,
                                "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }, {
                    "SourceAddress": "[BF4BL1-01_02 IBM Datastore Vol2]:SdVm3 (a074f231-4c62-4be0-ad76-7f6a1bfcb110)/SdVm3 (a074f231-4c62-4be0-ad76-7f6a1bfcb110)_1.vmdk",
                    "TargetAddress": null,
                    "Swap": false,
                    "ProvisionedSizeInMB": 512,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d a7 e3 96 b0 86 77-a4 c7 9d d4 cc ef 5d cc",
                                "InstanceUuid": "50 25 b4 d0 22 17 54 56-2a fd b7 e3 63 f9 a3 4d"
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
                                "Datastore": null,
                                "VCDDatastore": {"IsThin": true},
                                "ExistingDisk": null,
                                "RawDevice": null,
                                "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }],
                "NetworkInterfaces": [{
                    "InternalIdentifier": {"Name": "Network adapter 1"},
                    "SourceNetwork": {
                        "VcenterNetwork": null,
                        "VCDNetwork": {
                            "VNicIdentifier": {"Name": "Network adapter 1"},
                            "MacAddress": "00:50:56:1f:00:92",
                            "IsPrimary": true,
                            "IsConnected": true,
                            "IPMode": {"IpModeType": 0},
                            "VappNetworkName": "ExtNet1Org2",
                            "IpAddress": null
                        }
                    },
                    "FailoverSettings": {
                        "VCenterNetworkSettings": null,
                        "VCDNetworkSettings": {
                            "NicInfo": {
                                "VNicIdentifier": {"Name": "Network adapter 1"},
                                "MacAddress": "00:50:56:1f:00:92",
                                "IsPrimary": true,
                                "IsConnected": true,
                                "IPMode": {"IpModeType": 0},
                                "VappNetworkName": "ExtNet1Org2",
                                "IpAddress": null
                            }, "NewMacAddress": null
                        }
                    },
                    "TestSettings": {
                        "VCenterNetworkSettings": null,
                        "VCDNetworkSettings": {
                            "NicInfo": {
                                "VNicIdentifier": {"Name": "Network adapter 1"},
                                "MacAddress": "00:50:56:1f:00:92",
                                "IsPrimary": true,
                                "IsConnected": true,
                                "IPMode": {"IpModeType": 0},
                                "VappNetworkName": "ExtNet1Org2",
                                "IpAddress": null
                            }, "NewMacAddress": null
                        }
                    },
                    "IsIPConfigurationEnabled": false,
                    "MacAddress": "00:50:56:1f:00:92"
                }],
                "CloudVmSettings": null,
                "TargetFolder": null,
                "StorageProfile": null,
                "JournalHardLimit": {"Type": 2, "Limit": 75},
                "JournalWarningThreshold": {"Type": 2, "Limit": 50},
                "JournalDatastores": []
            }, {
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-2777",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                },
                "Name": "SdVapp1Org2 (58f804c4-0b6e-41a5-ba9e-2b5f4862d186)",
                "SourceHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-11",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.2"
                },
                "SourceDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-14",
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "BF4BL1-01_02 IBM Datastore Vol2"
                },
                "TargetHost": null,
                "TargetDatastore": null,
                "StorageUsageInfo": {
                    "ProvisionedStorageSizeInMB": 1850,
                    "UsedStorageSizeInMB": 619,
                    "RecoveryStorageSizeInMB": 0
                },
                "Volumes": [{
                    "SourceAddress": "[BF4BL1-01_02 IBM Datastore Vol2]:SdVapp1Org2/SdVapp1Org2 (87e04fcf-f2bd-418d-be6c-3f38ab35ddee)_2.vmdk",
                    "TargetAddress": null,
                    "Swap": false,
                    "ProvisionedSizeInMB": 512,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d 6f e4 dd 7b fc 68-48 94 58 49 fb d9 28 43",
                                "InstanceUuid": "52 c2 68 02 c1 46 7d 7f-40 72 c0 7e c3 01 2d 92"
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
                                "Datastore": null,
                                "VCDDatastore": {"IsThin": true},
                                "ExistingDisk": null,
                                "RawDevice": null,
                                "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }, {
                    "SourceAddress": "[BF4BL1-01_02 IBM Datastore Vol2]:SdVapp1Org2/SdVapp1Org2 (87e04fcf-f2bd-418d-be6c-3f38ab35ddee)_1.vmdk",
                    "TargetAddress": null,
                    "Swap": false,
                    "ProvisionedSizeInMB": 1024,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d 6f e4 dd 7b fc 68-48 94 58 49 fb d9 28 43",
                                "InstanceUuid": "52 c2 68 02 c1 46 7d 7f-40 72 c0 7e c3 01 2d 92"
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
                                "Datastore": null,
                                "VCDDatastore": {"IsThin": true},
                                "ExistingDisk": null,
                                "RawDevice": null,
                                "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }],
                "NetworkInterfaces": [{
                    "InternalIdentifier": {"Name": "Network adapter 1"},
                    "SourceNetwork": {
                        "VcenterNetwork": null,
                        "VCDNetwork": {
                            "VNicIdentifier": {"Name": "Network adapter 1"},
                            "MacAddress": "00:50:56:80:66:48",
                            "IsPrimary": true,
                            "IsConnected": true,
                            "IPMode": {"IpModeType": 0},
                            "VappNetworkName": "ExtNet1Org2",
                            "IpAddress": null
                        }
                    },
                    "FailoverSettings": {
                        "VCenterNetworkSettings": null,
                        "VCDNetworkSettings": {
                            "NicInfo": {
                                "VNicIdentifier": {"Name": "Network adapter 1"},
                                "MacAddress": "00:50:56:80:66:48",
                                "IsPrimary": true,
                                "IsConnected": true,
                                "IPMode": {"IpModeType": 0},
                                "VappNetworkName": "ExtNet1Org2",
                                "IpAddress": null
                            }, "NewMacAddress": null
                        }
                    },
                    "TestSettings": {
                        "VCenterNetworkSettings": null,
                        "VCDNetworkSettings": {
                            "NicInfo": {
                                "VNicIdentifier": {"Name": "Network adapter 1"},
                                "MacAddress": "00:50:56:80:66:48",
                                "IsPrimary": true,
                                "IsConnected": true,
                                "IPMode": {"IpModeType": 0},
                                "VappNetworkName": "ExtNet1Org2",
                                "IpAddress": null
                            }, "NewMacAddress": null
                        }
                    },
                    "IsIPConfigurationEnabled": false,
                    "MacAddress": "00:50:56:80:66:48"
                }],
                "CloudVmSettings": null,
                "TargetFolder": null,
                "StorageProfile": null,
                "JournalHardLimit": {"Type": 2, "Limit": 75},
                "JournalWarningThreshold": {"Type": 2, "Limit": 50},
                "JournalDatastores": []
            }, {
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-2780",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                },
                "Name": "SdVm2 (82cba892-72b3-4c5a-93d4-ae1de28b5ff3)",
                "SourceHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-10",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.1"
                },
                "SourceDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-14",
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "BF4BL1-01_02 IBM Datastore Vol2"
                },
                "TargetHost": null,
                "TargetDatastore": null,
                "StorageUsageInfo": {
                    "ProvisionedStorageSizeInMB": 826,
                    "UsedStorageSizeInMB": 601,
                    "RecoveryStorageSizeInMB": 0
                },
                "Volumes": [{
                    "SourceAddress": "[BF4BL1-01_02 IBM Datastore Vol2]:SdVm2 (82cba892-72b3-4c5a-93d4-ae1de28b5ff3)/SdVm2 (82cba892-72b3-4c5a-93d4-ae1de28b5ff3).vmdk",
                    "TargetAddress": null,
                    "Swap": false,
                    "ProvisionedSizeInMB": 512,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d 0a da 5f 0e 30 9f-f3 da c1 d1 6f e0 32 67",
                                "InstanceUuid": "50 25 cb 04 2a aa c1 d6-b4 36 db fd 74 f0 5a a3"
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
                                "Datastore": null,
                                "VCDDatastore": {"IsThin": true},
                                "ExistingDisk": null,
                                "RawDevice": null,
                                "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }],
                "NetworkInterfaces": [{
                    "InternalIdentifier": {"Name": "Network adapter 1"},
                    "SourceNetwork": {
                        "VcenterNetwork": null,
                        "VCDNetwork": {
                            "VNicIdentifier": {"Name": "Network adapter 1"},
                            "MacAddress": "00:50:56:1f:00:91",
                            "IsPrimary": true,
                            "IsConnected": true,
                            "IPMode": {"IpModeType": 0},
                            "VappNetworkName": "ExtNet1Org2",
                            "IpAddress": null
                        }
                    },
                    "FailoverSettings": {
                        "VCenterNetworkSettings": null,
                        "VCDNetworkSettings": {
                            "NicInfo": {
                                "VNicIdentifier": {"Name": "Network adapter 1"},
                                "MacAddress": "00:50:56:1f:00:91",
                                "IsPrimary": true,
                                "IsConnected": true,
                                "IPMode": {"IpModeType": 0},
                                "VappNetworkName": "ExtNet1Org2",
                                "IpAddress": null
                            }, "NewMacAddress": null
                        }
                    },
                    "TestSettings": {
                        "VCenterNetworkSettings": null,
                        "VCDNetworkSettings": {
                            "NicInfo": {
                                "VNicIdentifier": {"Name": "Network adapter 1"},
                                "MacAddress": "00:50:56:1f:00:91",
                                "IsPrimary": true,
                                "IsConnected": true,
                                "IPMode": {"IpModeType": 0},
                                "VappNetworkName": "ExtNet1Org2",
                                "IpAddress": null
                            }, "NewMacAddress": null
                        }
                    },
                    "IsIPConfigurationEnabled": false,
                    "MacAddress": "00:50:56:1f:00:91"
                }],
                "CloudVmSettings": null,
                "TargetFolder": null,
                "StorageProfile": null,
                "JournalHardLimit": {"Type": 2, "Limit": 75},
                "JournalWarningThreshold": {"Type": 2, "Limit": 50},
                "JournalDatastores": []
            }],
            "OwnersId": {"OwnersGuid": "aebe9ef5-754d-4742-bcfc-1ca1b708de16"},
            "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
        },
        "TargetSiteInfo": {
            "OwnersId": {
                "Id": {"OwnersGuid": "aebe9ef5-754d-4742-bcfc-1ca1b708de16"},
                "DisplayName": "SiteC(172.20.149.88)",
                "IsLocal": false
            },
            "PotentialReplicationDestinations": [{
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-460",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "[ClusterVSAN]172.20.149.7"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-17",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "[ClusterVSAN]172.20.149.8"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "ClusterVSAN"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-792",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN ProviderVdcSiteC3"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-794",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN OrgVdcSiteC3 (10bc7e9b-4d9e-4a16-9613-ba1da7301078)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-793",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN System vDC (82233e74-c1b0-46d3-bddd-a220f019ee87)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-724",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN ProviderVcdSiteC2"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-726",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN OrgVdcSiteC2 (7ea47eab-b08c-4058-afc1-18e748fc5b4d)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-725",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN System vDC (a4928258-ad28-4296-8c7e-92710e8e8efa)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-714",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN ProviderVdcSiteC1"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-716",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN OrgVdcSiteC1 (1d6cc8d1-2351-4329-8390-27644fb47c4a)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-715",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN System vDC (c4bcefd4-83e7-467e-ad79-cea6af6a0082)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-43",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN PVDC"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-45",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN System vDC (b06ec80f-12da-4ac4-961b-d480f3db7916)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-41",
                        "ServerIdentifier": {"ServerGuid": "a0f79174-de18-4b9c-b928-a17431f8526d"}
                    },
                    "DisplayName": "RP:ClusterVSAN RpSiteC1"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }],
            "VCDVirtualDatacenters": [{
                "VirtualDatacenter": {
                    "Id": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:vdc:7ea47eab-b08c-4058-afc1-18e748fc5b4d"
                    }, "DisplayName": "OrgVdcSiteC2"
                },
                "PotentialVCDVappNetworks": [{
                    "RecoveryOrganizationVCDOrgNetwork": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:network:35e45522-eca6-4b75-9500-88c1d027557e"
                    },
                    "FenceMode": {"FenceModeType": 2},
                    "IpScope": null,
                    "NetworkName": "ExtNet1Org1",
                    "OrgNetwork": null,
                    "IpScopes": [],
                    "NatService": null
                }, {
                    "RecoveryOrganizationVCDOrgNetwork": null,
                    "FenceMode": {"FenceModeType": 0},
                    "IpScope": null,
                    "NetworkName": "none",
                    "OrgNetwork": null,
                    "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}],
                    "NatService": null
                }],
                "IsThinProvision": true
            }, {
                "VirtualDatacenter": {
                    "Id": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:vdc:1d6cc8d1-2351-4329-8390-27644fb47c4a"
                    }, "DisplayName": "OrgVdcSiteC1"
                },
                "PotentialVCDVappNetworks": [{
                    "RecoveryOrganizationVCDOrgNetwork": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:network:6c092580-4675-4e59-a900-d708e4af1b78"
                    },
                    "FenceMode": {"FenceModeType": 2},
                    "IpScope": null,
                    "NetworkName": "RoutedToExtNet",
                    "OrgNetwork": null,
                    "IpScopes": [],
                    "NatService": null
                }, {
                    "RecoveryOrganizationVCDOrgNetwork": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:network:a5672721-7cf1-4330-9e13-0868e23a43f1"
                    },
                    "FenceMode": {"FenceModeType": 2},
                    "IpScope": null,
                    "NetworkName": "RoutedToExtNet4",
                    "OrgNetwork": null,
                    "IpScopes": [],
                    "NatService": null
                }, {
                    "RecoveryOrganizationVCDOrgNetwork": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:network:b44f2fd9-981c-4564-8153-ce2f8eaeffd3"
                    },
                    "FenceMode": {"FenceModeType": 2},
                    "IpScope": null,
                    "NetworkName": "RoutedToExtNet3",
                    "OrgNetwork": null,
                    "IpScopes": [],
                    "NatService": null
                }, {
                    "RecoveryOrganizationVCDOrgNetwork": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:network:eb9eca7e-73e1-420e-bd78-03749b52f6c5"
                    },
                    "FenceMode": {"FenceModeType": 2},
                    "IpScope": null,
                    "NetworkName": "RoutedToExtNet2",
                    "OrgNetwork": null,
                    "IpScopes": [],
                    "NatService": null
                }, {
                    "RecoveryOrganizationVCDOrgNetwork": null,
                    "FenceMode": {"FenceModeType": 0},
                    "IpScope": null,
                    "NetworkName": "none",
                    "OrgNetwork": null,
                    "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}],
                    "NatService": null
                }],
                "IsThinProvision": true
            }, {
                "VirtualDatacenter": {
                    "Id": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:vdc:10bc7e9b-4d9e-4a16-9613-ba1da7301078"
                    }, "DisplayName": "OrgVdcSiteC3"
                },
                "PotentialVCDVappNetworks": [{
                    "RecoveryOrganizationVCDOrgNetwork": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:network:5342b0b0-21a4-4dd1-8dd9-bb86842f175b"
                    },
                    "FenceMode": {"FenceModeType": 2},
                    "IpScope": null,
                    "NetworkName": "OrgSiteC3Ext1",
                    "OrgNetwork": null,
                    "IpScopes": [],
                    "NatService": null
                }, {
                    "RecoveryOrganizationVCDOrgNetwork": null,
                    "FenceMode": {"FenceModeType": 0},
                    "IpScope": null,
                    "NetworkName": "none",
                    "OrgNetwork": null,
                    "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}],
                    "NatService": null
                }],
                "IsThinProvision": true
            }],
            "PotentialServiceProfiles": [{
                "Identifier": {"InternalId": "7fa2fd05-00f3-4f2a-991b-b4e1c20c9356"},
                "Name": "System Service Profile",
                "Rpo": {"RpoInSeconds": 300, "DisplayName": "5 minutes"},
                "History": {"HistoryInMinutes": 1440, "DisplayName": "1 day"},
                "MaxJournalSize": {"MaxJournalSizeInPercent": 75, "DisplayName": "75%"},
                "WarningThreshold": {"JournalWarningThresholdInPercent": 50, "DisplayName": "50%"},
                "TestInterval": {"TestIntervalInMinutes": 0, "DisplayName": "None"},
                "Description": "System Service Profile",
                "IsEditable": false,
                "RetentionPolicy": {"RetentionPolicy": 0, "DisplayName": "Disaster Recovery"},
                "RestorePointRange": {"RestorePointRange": 1, "DisplayName": "1 Month"},
                "BackupScheduledPeriod": {"SchedulePeriodType": 0, "DayOfWeek": 6}
            }, {
                "Identifier": {"InternalId": "11111111-1111-1111-1111-111111111111"},
                "Name": "Custom",
                "Rpo": {"RpoInSeconds": 300, "DisplayName": "5 minutes"},
                "History": {"HistoryInMinutes": 1440, "DisplayName": "1 day"},
                "MaxJournalSize": {"MaxJournalSizeInPercent": 0, "DisplayName": "Unlimited"},
                "WarningThreshold": {"JournalWarningThresholdInPercent": 0, "DisplayName": "Unlimited"},
                "TestInterval": {"TestIntervalInMinutes": 0, "DisplayName": "None"},
                "Description": "Custom Service Profile",
                "IsEditable": true,
                "RetentionPolicy": {"RetentionPolicy": 0, "DisplayName": "Disaster Recovery"},
                "RestorePointRange": {"RestorePointRange": 1, "DisplayName": "1 Month"},
                "BackupScheduledPeriod": {"SchedulePeriodType": 1, "DayOfWeek": 6}
            }],
            "PotentialPublicCloudPcns": {"PotentialPcns": []},
            "IsConnected": true,
            "IsPrePostScriptsEnabled": true,
            "PotentialBackupTargets": [{
                "Identifier": {"Identifier": "00000000-0000-0000-0000-000000000000"},
                "DisplayName": "None",
                "IsDefault": true,
                "IsCompressionEnabled": true
            }],
            "PotentialReplicationSiteInitialInfo": {
                "OwnersId": {
                    "Id": {"OwnersGuid": "aebe9ef5-754d-4742-bcfc-1ca1b708de16"},
                    "DisplayName": "SiteC(172.20.149.88)",
                    "IsLocal": false
                },
                "SiteId": {"SiteGuid": "a7ba31b8-6c90-4f13-b7ee-8e1cb0978204"},
                "IsConnected": true,
                "IsVCenterEnabled": true,
                "IsVCDEnabled": true,
                "VirtualizationProviderType": 0
            },
            "PotentialPublicCloudInstanceTypeVisualObjects": []
        },
        "ProtectionGroupId": null,
        "Entities": {"Source": 2, "Target": 2},
        "ConfigurationFlags": {
            "IsStorageProfileEnabled": true,
            "IsCompressionConfigurable": false,
            "IsVmFolderConfigurable": true,
            "IsBackupFeatureSupported": true
        },
        "PotentialZertoOrganization": [{
            "Identifier": {"Guid": "a313fb95-35f4-4681-95e8-93d0ecc9676b"},
            "OrganizationName": "HostingVcdZorg",
            "CrmIdentifier": "",
            "EnableCustomProfile": true
        }, {
            "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
            "OrganizationName": "No Organization",
            "CrmIdentifier": "No Contact",
            "EnableCustomProfile": true
        }],
        "IsEnableVmJournalDatastoreSelection": true
    };
};
