module.exports = function CloudPortalGetAdvancedCreateVpgScreen() {
    return {
        "Config": {
            "Name": "New VPG",
            "Configuration": {
                "Priority": 1,
                "MinimalJournalLenghtInMinutes": 240,
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
                    "SelectedIdentifier": {"InternalId": "68ce4cb8-ac71-481f-aa72-2eb98e7aac12"},
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
            "ProtectedVappSettings": null,
            "RecoveryVappSettings": null,
            "VirtualMachines": [{
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-1194",
                    "ServerIdentifier": {"ServerGuid": "34968a3d-03a1-4a80-b45f-52eae48abc42"}
                },
                "Name": "Win2008R2Base555",
                "SourceHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-1056",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "34968a3d-03a1-4a80-b45f-52eae48abc42"}
                    },
                    "ResourcePoolIdentifier": null,
                    "DisplayName": "nyc-dns-model-1-7120171057-esx19131-op-1-temp-1.zertolab.local"
                },
                "SourceDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-12",
                        "ServerIdentifier": {"ServerGuid": "34968a3d-03a1-4a80-b45f-52eae48abc42"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "BA5BL0809_VNX_DS"
                },
                "TargetHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-9",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-853",
                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                    },
                    "DisplayName": "RP_TLV"
                },
                "TargetDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-11",
                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "BA5BL10_VNX_DS"
                },
                "StorageUsageInfo": {
                    "ProvisionedStorageSizeInMB": 12519,
                    "UsedStorageSizeInMB": 9725,
                    "RecoveryStorageSizeInMB": 0
                },
                "Volumes": [{
                    "SourceAddress": "BA5BL0809_VNX_DS",
                    "TargetAddress": "BA5BL10_VNX_DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 14336,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d f2 49 49 8d dd 3f-6c 7a 2f e0 51 32 68 69",
                                "InstanceUuid": "52 d8 25 41 22 21 b6 55-c8 46 a7 b5 89 da 6c c8"
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
                                        "InternalDatastoreName": "datastore-11",
                                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                                    }, "IsThin": true
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }, {
                    "SourceAddress": "BA5BL0809_VNX_DS",
                    "TargetAddress": "BA5BL10_VNX_DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 1024,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d f2 49 49 8d dd 3f-6c 7a 2f e0 51 32 68 69",
                                "InstanceUuid": "52 d8 25 41 22 21 b6 55-c8 46 a7 b5 89 da 6c c8"
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
                                        "InternalDatastoreName": "datastore-11",
                                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                                    }, "IsThin": true
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
                                "ServerIdentifier": {"ServerGuid": "34968a3d-03a1-4a80-b45f-52eae48abc42"},
                                "InternalType": "Network",
                                "InternalName": "network-13"
                            }, "DisplayName": "VM Network"
                        }, "VCDNetwork": null
                    },
                    "FailoverSettings": {
                        "VCenterNetworkSettings": {
                            "RecoveryNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"},
                                    "InternalType": "Network",
                                    "InternalName": "network-12"
                                }, "DisplayName": "VM Network"
                            }, "IP": null, "DnsSuffix": "zerto.local", "ShouldReplaceMacAddress": false
                        }, "VCDNetworkSettings": null
                    },
                    "TestSettings": {
                        "VCenterNetworkSettings": {
                            "RecoveryNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"},
                                    "InternalType": "Network",
                                    "InternalName": "network-12"
                                }, "DisplayName": "VM Network"
                            }, "IP": null, "DnsSuffix": "zerto.local", "ShouldReplaceMacAddress": false
                        }, "VCDNetworkSettings": null
                    },
                    "IsIPConfigurationEnabled": true,
                    "MacAddress": "00:50:56:b2:22:1b"
                }],
                "AwsVmSettings": null,
                "TargetFolder": {
                    "Id": {
                        "InternalFolderName": "no folder",
                        "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                    }, "DisplayName": "[Default]ZertoRecoveryFolder"
                },
                "StorageProfile": null,
                "JournalHardLimit": {"Type": 2, "Limit": 75},
                "JournalWarningThreshold": {"Type": 2, "Limit": 50},
                "JournalDatastores": []
            }],
            "OwnersId": {"OwnersGuid": "13e9b782-cb94-40f3-b96e-f0b03d3023d6"},
            "ZertoOrganizationIdentifier": {"Guid": "21a4ee36-b8a7-4af5-8f68-ead18fc4ba2b"}
        },
        "TargetSiteInfo": {
            "OwnersId": {
                "Id": {"OwnersGuid": "13e9b782-cb94-40f3-b96e-f0b03d3023d6"},
                "DisplayName": "TLV(172.20.91.215)",
                "IsLocal": false
            },
            "PotentialReplicationDestinations": [{
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-9",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.93.21"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-9",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-853",
                        "ServerIdentifier": {"ServerGuid": "88bc71dc-654f-45bc-a2b2-20ce550c62c4"}
                    },
                    "DisplayName": "RP:172.20.93.21 RP_TLV"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }],
            "VCDVirtualDatacenters": [],
            "PotentialServiceProfiles": [{
                "Identifier": {"InternalId": "68ce4cb8-ac71-481f-aa72-2eb98e7aac12"},
                "Name": "System Service Profile",
                "Rpo": {"RpoInSeconds": 300, "DisplayName": "5 minutes"},
                "History": {"HistoryInMinutes": 240, "DisplayName": "4 hours"},
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
                "History": {"HistoryInMinutes": 240, "DisplayName": "4 hours"},
                "MaxJournalSize": {"MaxJournalSizeInPercent": 0, "DisplayName": "Unlimited"},
                "WarningThreshold": {"JournalWarningThresholdInPercent": 0, "DisplayName": "Unlimited"},
                "TestInterval": {"TestIntervalInMinutes": 0, "DisplayName": "None"},
                "Description": "Custom Service Profile",
                "IsEditable": true,
                "RetentionPolicy": {"RetentionPolicy": 0, "DisplayName": "Disaster Recovery"},
                "RestorePointRange": {"RestorePointRange": 1, "DisplayName": "1 Month"},
                "BackupScheduledPeriod": {"SchedulePeriodType": 1, "DayOfWeek": 6}
            }],
            "PotentialAwsVpcs": {"PotentialVpcs": []},
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
                    "Id": {"OwnersGuid": "13e9b782-cb94-40f3-b96e-f0b03d3023d6"},
                    "DisplayName": "TLV(172.20.91.215)",
                    "IsLocal": false
                },
                "SiteId": {"SiteGuid": "1448d145-c225-4bd6-b19a-667f92aecbcc"},
                "IsConnected": true,
                "IsVCenterEnabled": true,
                "IsVCDEnabled": false,
                "IsScvmmEnabled": false,
                "IsPublicCloud": false
            },
            "PotentialPublicCloudInstanceTypeVisualObjects": []
        },
        "ProtectionGroupId": null,
        "Entities": {"Source": 0, "Target": 0},
        "ConfigurationFlags": {
            "IsStorageProfileEnabled": false,
            "IsCompressionConfigurable": false,
            "IsVmFolderConfigurable": true,
            "IsBackupFeatureSupported": true
        },
        "PotentialZertoOrganization": [{
            "Identifier": {"Guid": "21a4ee36-b8a7-4af5-8f68-ead18fc4ba2b"},
            "OrganizationName": "tlv",
            "CrmIdentifier": ""
        }],
        "IsEnableVmJournalDatastoreSelection": true
    };
};
