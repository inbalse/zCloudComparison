module.exports = function GetInfoForManagingVPG() {
    return {
        "Config": {
            "Name": "sample#2",
            "Configuration": {
                "Priority": 1,
                "MinimalJournalLenghtInMinutes": 1440,
                "JournalHealthSettings": {
                    "IsFeatureSupported": true,
                    "IsEnabled": true,
                    "JournalHealthInMinutes": 720
                },
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
                    },
                    "UseScripts": false
                },
                "ManageJournalSettings": {
                    "JournalDatastore": null,
                    "JournalHardLimitPerVM": {
                        "Type": 1,
                        "Limit": 153600
                    },
                    "JournalWarningThresholdPerVM": {
                        "Type": 1,
                        "Limit": 115200
                    }
                },
                "BootOrder": {
                    "Groups": [{
                        "BootGroupIdentifier": {
                            "Guid": "00000000-0000-0000-0000-000000000000"
                        },
                        "Name": "Default",
                        "Settings": {
                            "BootDelay": 0,
                            "WaitForTools": false,
                            "ShutdownDelay": 0
                        },
                        "Machines": [{
                            "DisplayName": "vapp-vm-test",
                            "Id": {
                                "InternalVmName": "vm-662",
                                "ServerIdentifier": {
                                    "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                }
                            }
                        }]
                    }]
                },
                "ServiceProfile": null,
                "Backup": {
                    "Target": {
                        "SelectedTarget": {
                            "Identifier": "859c4db4-7ce5-4298-9efb-77d1672508fd"
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
                                "Days": [{
                                    "Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                                }, {
                                    "Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                                }, {
                                    "Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                                }, {
                                    "Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                                }, {
                                    "Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                                }, {
                                    "Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                                }, {
                                    "Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                                }]
                            }
                        }
                    },
                    "Scripting": {
                        "PostScript": {
                            "Command": "",
                            "Parameters": "",
                            "TimeoutInSeconds": 300
                        }
                    },
                    "DeleteBackup": {
                        "RestorePointRange": 1
                    }
                },
                "IsBackupEnabled": true,
                "CopyNatRulesOptions": 0,
                "CopyNatServiceAvailable": true
            },
            "Defaults": {
                "TargetComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
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
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "ZNest81 DS"
                },
                "FailoverNetwork": {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-648"
                    },
                    "DisplayName": "VM Network"
                },
                "TestNetwork": {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-648"
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
            "VirtualMachines": [{
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-662",
                    "ServerIdentifier": {
                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                    }
                },
                "Name": "vapp-vm-test",
                "SourceHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-645",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DisplayName": "RP:172.20.200.2 tes-vapp2"
                },
                "SourceDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "ZNest81 DS"
                },
                "TargetHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
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
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "ZNest81 DS"
                },
                "StorageUsageInfo": {
                    "ProvisionedStorageSizeInMB": 226,
                    "UsedStorageSizeInMB": 0,
                    "RecoveryStorageSizeInMB": 0
                },
                "Volumes": [{
                    "SourceAddress": "[ZNest81 DS]:vapp-vm-test/vapp-vm-test.vmdk",
                    "TargetAddress": "ZNest81 DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 8,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 3d ab a9 8c 44 15 98-32 a4 9d 7a 59 fa bd 84",
                                "InstanceUuid": "50 3d 18 ff fb 10 bc 90-dc d9 9d c9 4b 7e aa 95"
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
                                        "InternalDatastoreName": "datastore-647",
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
                }],
                "NetworkInterfaces": [
                    {
                        "InternalIdentifier": {
                            "Name": "Adaptateur élève 1"
                        },
                        "SourceNetwork": {
                            "VcenterNetwork": {
                                "Id": {
                                    "ServerIdentifier": {
                                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                                    },
                                    "InternalType": "Network",
                                    "InternalName": "network-648"
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
                                        "InternalName": "network-648"
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
                                        "InternalName": "network-648"
                                    },
                                    "DisplayName": "VM Network"
                                },
                                "IP": null,
                                "DnsSuffix": null,
                                "ShouldReplaceMacAddress": false
                            },
                            "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": true,
                        "MacAddress": "00:50:56:bd:f6:87"
                    },
                    {
                        "InternalIdentifier": {
                            "Name": "Adaptateur élève 2"
                        },
                        "SourceNetwork": {
                            "VcenterNetwork": {
                                "Id": {
                                    "ServerIdentifier": {
                                        "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d590"
                                    },
                                    "InternalType": "Network",
                                    "InternalName": "network-649"
                                },
                                "DisplayName": "VM Network 2"
                            },
                            "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {
                                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d590"
                                        },
                                        "InternalType": "Network",
                                        "InternalName": "network-649"
                                    },
                                    "DisplayName": "VM Network 2"
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
                                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d590"
                                        },
                                        "InternalType": "Network",
                                        "InternalName": "network-649"
                                    },
                                    "DisplayName": "VM Network 2"
                                },
                                "IP": null,
                                "DnsSuffix": null,
                                "ShouldReplaceMacAddress": false
                            },
                            "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": true,
                        "MacAddress": "00:50:56:bd:f6:88"
                    }
                ],
                "CloudVmSettings": null,
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
                    "Type": 1,
                    "Limit": 153600
                },
                "JournalWarningThreshold": {
                    "Type": 1,
                    "Limit": 115200
                },
                "JournalDatastores": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "ZNest81 DS"
                }]
            }],
            "OwnersId": {
                "OwnersGuid": "464fdc0a-e82f-4b92-9e89-bc4d0fd13a6a"
            },
            "ZertoOrganizationIdentifier": {
                "Guid": "00000000-0000-0000-0000-000000000000"
            }
        },
        "TargetSiteInfo": {
            "OwnersId": {
                "Id": {
                    "OwnersGuid": "464fdc0a-e82f-4b92-9e89-bc4d0fd13a6a"
                },
                "DisplayName": "gui_local (Local)",
                "IsLocal": true
            },
            "PotentialReplicationDestinations": [{
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "ResourcePoolIdentifier": null,
                    "DisplayName": "172.20.200.2"
                },
                "IsSuitableForRecovery": true,
                "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-644",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DisplayName": "RP:172.20.200.2 puptitz-rp"
                },
                "IsSuitableForRecovery": true,
                "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-645",
                        "ServerIdentifier": {
                            "ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "DisplayName": "RP:172.20.200.2 tes-vapp2"
                },
                "IsSuitableForRecovery": true,
                "RecoveryImpossibleReason": null
            }],
            "VCDVirtualDatacenters": [],
            "PotentialServiceProfiles": [],
            "PotentialPublicCloudPcns": {
                "PotentialPcns": []
            },
            "IsConnected": true,
            "IsPrePostScriptsEnabled": true,
            "PotentialBackupTargets": [{
                "Identifier": {
                    "Identifier": "859c4db4-7ce5-4298-9efb-77d1672508fd"
                },
                "DisplayName": "nirs_b",
                "IsDefault": true,
                "IsCompressionEnabled": true
            }, {
                "Identifier": {
                    "Identifier": "00000000-0000-0000-0000-000000000000"
                },
                "DisplayName": "None",
                "IsDefault": false,
                "IsCompressionEnabled": true
            }],
            "PotentialReplicationSiteInitialInfo": {
                "OwnersId": {
                    "Id": {
                        "OwnersGuid": "464fdc0a-e82f-4b92-9e89-bc4d0fd13a6a"
                    },
                    "DisplayName": "gui_local (Local)",
                    "IsLocal": true
                },
                "SiteId": {
                    "SiteGuid": "277cfd55-d6d1-4aea-b140-7066b9b13426"
                },
                "IsConnected": true,
                "IsVCenterEnabled": true,
                "IsVCDEnabled": false,
                "IsScvmmEnabled": false,
                "IsPublicCloud": false
            },
            "PotentialPublicCloudInstanceTypeVisualObjects": []
        },
        "ProtectionGroupId": {
            "GroupGuid": "f9a84e71-1d36-4cc8-a2e5-ebd4947e25af"
        },
        "Entities": {
            "Source": 0,
            "Target": 0
        },
        "ConfigurationFlags": {
            "IsStorageProfileEnabled": false,
            "IsCompressionConfigurable": true,
            "IsVmFolderConfigurable": true,
            "IsBackupFeatureSupported": true
        },
        "PotentialZertoOrganization": [{
            "Identifier": {
                "Guid": "00000000-0000-0000-0000-000000000000"
            },
            "OrganizationName": "No Organization",
            "CrmIdentifier": "No Contact"
        }],
        "IsEnableVmJournalDatastoreSelection": true
    };
};
