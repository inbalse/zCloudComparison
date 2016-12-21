module.exports = function GetReverseReplicationSettings() {
    return {
        "ManageVpgInfo": {
            "Config": {
                "Name": "vpg",
                "Configuration": {
                    "Priority": 1,
                    "MinimalJournalLenghtInMinutes": 240,
                    "RPOThressholdInSeconds": 300,
                    "MaxTestIntervalInMinutes": 262080,
                    "WanCompression": true,
                    "ScriptingSettings": {
                        "PreRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                        "PostRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                        "UseScripts": false
                    },
                    "ManageJournalSettings": {
                        "JournalDatastore": null,
                        "JournalHardLimitPerVM": {"Type": 0, "Limit": 0},
                        "JournalWarningThresholdPerVM": {"Type": 0, "Limit": 0}
                    },
                    "BootOrder": {
                        "Groups": [{
                            "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                            "Name": "Default",
                            "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                            "Machines": [{
                                "DisplayName": "Guy_vApp(4)",
                                "Id": {
                                    "InternalVmName": "vm-361",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }
                            }]
                        }]
                    },
                    "ServiceProfile": null,
                    "Backup": {
                        "Target": {"SelectedTarget": null},
                        "Scheduler": {
                            "RunningTime": {"SchedulePeriodType": 1, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6},
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
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    },
                    "FailoverNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                            "InternalType": "DistributedVirtualPortgroup",
                            "InternalName": "dvportgroup-34"
                        }, "DisplayName": "dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"
                    },
                    "TestNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                            "InternalType": "DistributedVirtualPortgroup",
                            "InternalName": "dvportgroup-34"
                        }, "DisplayName": "dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"
                    },
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v143",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DisplayName": "Service VMs"
                    },
                    "FailoverVCDVAppNetwork": null,
                    "TestVCDVAppNetwork": null,
                    "RecoveryCloudSettings": null
                },
                "ProtectedVappSettings": null,
                "RecoveryVappSettings": null,
                "VirtualMachines": [{
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-361",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    },
                    "Name": "Guy_vApp(4)",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-38",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:[Cluster]172.20.205.2 alex rp"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-38",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:[Cluster]172.20.205.2 alex rp"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 122,
                        "UsedStorageSizeInMB": 109,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest83Datastore]:Guy_vApp(4)_1/Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1).vmdk",
                        "TargetAddress": "[ZNest83Datastore]:Guy_vApp(4)_1/Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1).vmdk",
                        "Swap": false,
                        "ProvisionedSizeInMB": 9,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 32 64 e7 19 89 60-fc 3d 93 99 cd d2 dd c1",
                                    "InstanceUuid": "52 5c 14 9a a2 13 d9 68-9a 53 eb 87 ef 71 05 e5"
                                },
                                "UnitNumber": 0,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:0)"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": null,
                                    "VCDDatastore": null,
                                    "ExistingDisk": {
                                        "VMIdentifier": {
                                            "InternalVmName": "vm-361",
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                        },
                                        "SpecificDisk": {
                                            "SpecificFileVmdkPath": "Guy_vApp(4)_1/Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1)-flat.vmdk",
                                            "VmdkMode": 0,
                                            "Datastore": {
                                                "InternalDatastoreName": "datastore-16",
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                            },
                                            "VmdkPath": "Guy_vApp(4)_1/Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1).vmdk",
                                            "HypervisorType": 0,
                                            "VmdkFileSuffix": "-flat.vmdk",
                                            "SpecificVmdkFileDirectory": "Guy_vApp(4)_1",
                                            "SpecificVmdkFileName": "Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1)-flat.vmdk",
                                            "VmdkDirectory": "Guy_vApp(4)_1",
                                            "VmdkFileName": "Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1).vmdk"
                                        },
                                        "SearchFlags": 2
                                    },
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
                            "VcenterNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "DistributedVirtualPortgroup",
                                    "InternalName": "dvportgroup-34"
                                }, "DisplayName": "dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                        "InternalType": "DistributedVirtualPortgroup",
                                        "InternalName": "dvportgroup-34"
                                    }, "DisplayName": "dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "TestSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                        "InternalType": "DistributedVirtualPortgroup",
                                        "InternalName": "dvportgroup-34"
                                    }, "DisplayName": "dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:ac:6b:42"
                    }],
                    "CloudVmSettings": null,
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v143",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DisplayName": "Service VMs"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    }]
                }],
                "OwnersId": {"OwnersGuid": "a3e637cc-8710-41c7-974a-746c793b4524"},
                "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
            },
            "TargetSiteInfo": {
                "OwnersId": {
                    "Id": {"OwnersGuid": "a3e637cc-8710-41c7-974a-746c793b4524"},
                    "DisplayName": "gui_local_vcd (Local)",
                    "IsLocal": true
                },
                "PotentialReplicationDestinations": [{
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.2"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "Cluster"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-38",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:Cluster alex rp"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-25",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:Cluster PVDC"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-26",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:Cluster System vDC (f78171aa-70b8-4b35-bf30-83513c328a0f)"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-40",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:Cluster NoamOrgVCD2 (22759e18-f8b0-499e-a90b-0652cc2f0724)"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-27",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:Cluster orgvdc (2c7e1564-54f8-4b29-960e-23be9f24dd74)"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-252",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:Cluster evgeny-rp"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "domain-c17",
                            "Type": 1,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-157",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "DisplayName": "RP:Cluster PVDC2"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }],
                "VCDVirtualDatacenters": [{
                    "VirtualDatacenter": {
                        "Id": {
                            "VCDId": "urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724",
                            "Id": "00000000-0000-0000-0000-000000000000"
                        }, "DisplayName": "NoamOrgVCD2"
                    },
                    "PotentialVCDVappNetworks": [{
                        "RecoveryOrganizationVCDOrgNetwork": {
                            "Id": "00000000-0000-0000-0000-000000000000",
                            "VCDId": "urn:vcloud:network:2986498e-09d7-4e5b-b989-e8d0ecce23c4"
                        },
                        "FenceMode": {"FenceModeType": 2},
                        "IpScope": null,
                        "NetworkName": "externalNetwork",
                        "OrgNetwork": null,
                        "IpScopes": [],
                        "NatService": null
                    }, {
                        "RecoveryOrganizationVCDOrgNetwork": {
                            "Id": "00000000-0000-0000-0000-000000000000",
                            "VCDId": "urn:vcloud:network:eee3536e-a889-4e55-8332-bfe4aeff8c08"
                        },
                        "FenceMode": {"FenceModeType": 2},
                        "IpScope": null,
                        "NetworkName": "NoamNetworkIso",
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
                            "VCDId": "urn:vcloud:vdc:2c7e1564-54f8-4b29-960e-23be9f24dd74",
                            "Id": "00000000-0000-0000-0000-000000000000"
                        }, "DisplayName": "orgvdc"
                    },
                    "PotentialVCDVappNetworks": [{
                        "RecoveryOrganizationVCDOrgNetwork": {
                            "Id": "00000000-0000-0000-0000-000000000000",
                            "VCDId": "urn:vcloud:network:d90af971-376e-4ce7-b0db-a5e8cf7a993a"
                        },
                        "FenceMode": {"FenceModeType": 2},
                        "IpScope": null,
                        "NetworkName": "internal network",
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
                "PotentialServiceProfiles": [],
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
                        "Id": {"OwnersGuid": "a3e637cc-8710-41c7-974a-746c793b4524"},
                        "DisplayName": "gui_local_vcd (Local)",
                        "IsLocal": true
                    },
                    "SiteId": {"SiteGuid": "6884a648-90f5-450d-844e-f018a22f3176"},
                    "IsConnected": true,
                    "IsVCenterEnabled": true,
                    "IsVCDEnabled": true,
                    "IsScvmmEnabled": false,
                    "IsPublicCloud": false
                },
                "PotentialPublicCloudInstanceTypeVisualObjects": []
            },
            "ProtectionGroupId": {"GroupGuid": "1277b426-b1e9-42a8-a78a-4b88ca43f1a8"},
            "Entities": {"Source": 0, "Target": 0},
            "ConfigurationFlags": {
                "IsStorageProfileEnabled": false,
                "IsCompressionConfigurable": true,
                "IsVmFolderConfigurable": true,
                "IsBackupFeatureSupported": true
            },
            "PotentialZertoOrganization": [{
                "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                "OrganizationName": "No Organization",
                "CrmIdentifier": "No Contact"
            }],
            "IsEnableVmJournalDatastoreSelection": true
        }, "IsComplete": true, "ShouldDefineJournalDatastoreLocation": false
    };
};
