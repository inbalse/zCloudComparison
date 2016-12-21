'use strict';

xdescribe('Edit VM aws network dialog controller', function () {
    var controller, testScope, createVPGModel, publicCloudNetworkEditService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate, _createVPGModel_, _publicCloudNetworkEditService_) {
        testScope = $rootScope.$new();
        createVPGModel = _createVPGModel_;
        publicCloudNetworkEditService = _publicCloudNetworkEditService_;

        /// --- mock data ----
        testScope.oneVm = {
            "InternalVirtualMachineId": {
                "InternalVmName": "vm-330",
                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
            },
            "Name": "evgeny-local-vm(1)",
            "SourceHost": {
                "BaseComputeResourceIdentifier": {
                    "InternalName": "host-14",
                    "Type": 0,
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
            },
            "SourceDatastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-16",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
            },
            "TargetHost": null,
            "TargetDatastore": {
                "Id": {
                    "InternalDatastoreName": "NO-DATASTORE",
                    "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": ""
            },
            "StorageUsageInfo": {
                "ProvisionedStorageSizeInMB": 244,
                "UsedStorageSizeInMB": 0,
                "RecoveryStorageSizeInMB": 0
            },
            "Volumes": [
                {
                "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm(1)/evgeny-local-vm_2.vmdk",
                "TargetAddress": "",
                "Swap": false,
                "ProvisionedSizeInMB": 6,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "56 4d 6b 8b 66 e7 00 34-bd 8a cc 6a 63 df ec 16",
                            "InstanceUuid": "52 ad c6 b8 23 76 94 27-fd d2 31 aa 5e d4 28 2c"
                        }, "UnitNumber": 2, "ControllerNumber": 0, "VolumeType": 0, "DlpDescription": "Scsi(0:2)"
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
            }, {
                "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm(1)/evgeny-local-vm_1.vmdk",
                "TargetAddress": "",
                "Swap": false,
                "ProvisionedSizeInMB": 12,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "56 4d 6b 8b 66 e7 00 34-bd 8a cc 6a 63 df ec 16",
                            "InstanceUuid": "52 ad c6 b8 23 76 94 27-fd d2 31 aa 5e d4 28 2c"
                        }, "UnitNumber": 1, "ControllerNumber": 0, "VolumeType": 0, "DlpDescription": "Scsi(0:1)"
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
            }, {
                "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm(1)/evgeny-local-vm.vmdk",
                "TargetAddress": "",
                "Swap": false,
                "ProvisionedSizeInMB": 8,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "56 4d 6b 8b 66 e7 00 34-bd 8a cc 6a 63 df ec 16",
                            "InstanceUuid": "52 ad c6 b8 23 76 94 27-fd d2 31 aa 5e d4 28 2c"
                        }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0, "DlpDescription": "Scsi(0:0)"
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
            "NetworkInterfaces": [
                {
                "InternalIdentifier": {"Name": "Network adapter 1"},
                "SourceNetwork": {
                    "VcenterNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                            "InternalType": "Network",
                            "InternalName": "network-33"
                        }, "DisplayName": "none"
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
                "MacAddress": "00:50:56:bd:e5:be",
                "vmId": {
                    "InternalVmName": "vm-330",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "id": "vm-33000:50:56:bd:e5:be",
                "vmName": "evgeny-local-vm(1)",
                "nicName": "Network adapter 1",
                "ProtectedNetwork": "none",
                "FailoverIp": "",
                "FailoverNetwork": "No Settings",
                "TestNetwork": "No Settings",
                "TestIP": "",
                "isInMultiNicVM": false,
                "TargetHost": null
            }],
            "CloudVmSettings": {
                "FailoverSettings": {
                    "Vpc": {
                        "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                        "Id": {"Identifier": "vpc-0b2dc76e"}
                    },
                    "Subnet": {
                        "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                        "Id": {"Identifier": "subnet-0f5f5a49"}
                    },
                    "PrimaryIp": "",
                    "SecurityGroups": [{
                        "Name": "sg-26d21343 | default | default",
                        "Id": {"Identifier": "sg-26d21343"}
                    }],
                    "PublicCloudInstanceTypeVisualObject": {
                        "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                        "FamilyName": "General Purpose",
                        "CpusCount": 4,
                        "MemoryAmountGB": 15,
                        "EbsOptimized": true,
                        "IsSupportLinux": true,
                        "DisplayName": "InstanceType: m3.xlarge",
                        "IsFeatureEnabled": true
                    }
                },
                "FailoverTestSettings": {
                    "Vpc": {
                        "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                        "Id": {"Identifier": "vpc-0b2dc76e"}
                    },
                    "Subnet": {
                        "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                        "Id": {"Identifier": "subnet-0f5f5a49"}
                    },
                    "PrimaryIp": "",
                    "SecurityGroups": [{
                        "Name": "sg-26d21343 | default | default",
                        "Id": {"Identifier": "sg-26d21343"}
                    }],
                    "PublicCloudInstanceTypeVisualObject": {
                        "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                        "FamilyName": "General Purpose",
                        "CpusCount": 4,
                        "MemoryAmountGB": 15,
                        "EbsOptimized": true,
                        "IsSupportLinux": true,
                        "DisplayName": "InstanceType: m3.xlarge",
                        "IsFeatureEnabled": true
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
            "JournalHardLimit": {"Type": 0, "Limit": 0},
            "JournalWarningThreshold": {"Type": 0, "Limit": 0},
            "JournalDatastores": [],
            "id": "598e5def-3500-4409-a691-d25b5cd10d22vm-330",
            "FailoverVpc": "vpc-0b2dc76e (172.31.0.0/16) (default)",
            "FailoverTestVpc": "vpc-0b2dc76e (172.31.0.0/16) (default)",
            "FailoverPrivateIp": "",
            "FailoverTestPrivateIp": "",
            "FailoverSubnet": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
            "FailoverTestSubnet": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
            "FailoverSecurityGroups": [{
                "Name": "sg-26d21343 | default | default",
                "Id": {"Identifier": "sg-26d21343"}
            }],
            "FailoverTestSecurityGroups": [{
                "Name": "sg-26d21343 | default | default",
                "Id": {"Identifier": "sg-26d21343"}
            }],
            "FailoverInstanceType": "m3.xlarge",
            "TestInstanceType": "m3.xlarge"
        };

        createVPGModel.data = {};
        createVPGModel.data.defaultVpgSettings = {
            "Config": {
                "Name": "xxx",
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
                        }, "PostRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300}
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
                                "DisplayName": "evgeny-local-vm(1)",
                                "Id": {
                                    "InternalVmName": "vm-330",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }
                            }, {
                                "DisplayName": "evgeny-local-vm-2 - 2015-03-16_10-20-40 - testing recovery(1)",
                                "Id": {
                                    "InternalVmName": "vm-333",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
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
                    "CopyNatService": false,
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
                            "Vpc": {
                                "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                                "Id": {"Identifier": "vpc-0b2dc76e"}
                            },
                            "Subnet": {
                                "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                                "Id": {"Identifier": "subnet-0f5f5a49"}
                            },
                            "SecurityGroups": [{
                                "Name": "sg-26d21343 | default | default",
                                "Id": {"Identifier": "sg-26d21343"}
                            }],
                            "PublicCloudInstanceTypeVisualObject": {
                                "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                                "FamilyName": "General Purpose",
                                "CpusCount": 4,
                                "MemoryAmountGB": 15,
                                "EbsOptimized": true,
                                "IsSupportLinux": true,
                                "DisplayName": "InstanceType: m3.xlarge",
                                "IsFeatureEnabled": true
                            }
                        },
                        "CloudVpgFailoverTestCloudSettings": {
                            "Vpc": {
                                "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                                "Id": {"Identifier": "vpc-0b2dc76e"}
                            },
                            "Subnet": {
                                "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                                "Id": {"Identifier": "subnet-0f5f5a49"}
                            },
                            "SecurityGroups": [{
                                "Name": "sg-26d21343 | default | default",
                                "Id": {"Identifier": "sg-26d21343"}
                            }],
                            "PublicCloudInstanceTypeVisualObject": {
                                "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                                "FamilyName": "General Purpose",
                                "CpusCount": 4,
                                "MemoryAmountGB": 15,
                                "EbsOptimized": true,
                                "IsSupportLinux": true,
                                "DisplayName": "InstanceType: m3.xlarge",
                                "IsFeatureEnabled": true
                            }
                        }
                    }
                },
                "ProtectedVappSettings": null,
                "RecoveryVappSettings": null,
                "VirtualMachines": [{
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-330",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    },
                    "Name": "evgeny-local-vm(1)",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-14",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    },
                    "TargetHost": null,
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "NO-DATASTORE",
                            "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": ""
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 244,
                        "UsedStorageSizeInMB": 0,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm(1)/evgeny-local-vm_2.vmdk",
                        "TargetAddress": "",
                        "Swap": false,
                        "ProvisionedSizeInMB": 6,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 6b 8b 66 e7 00 34-bd 8a cc 6a 63 df ec 16",
                                    "InstanceUuid": "52 ad c6 b8 23 76 94 27-fd d2 31 aa 5e d4 28 2c"
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
                                            "InternalDatastoreName": "NO-DATASTORE",
                                            "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                                        }, "IsThin": false
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm(1)/evgeny-local-vm_1.vmdk",
                        "TargetAddress": "",
                        "Swap": false,
                        "ProvisionedSizeInMB": 12,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 6b 8b 66 e7 00 34-bd 8a cc 6a 63 df ec 16",
                                    "InstanceUuid": "52 ad c6 b8 23 76 94 27-fd d2 31 aa 5e d4 28 2c"
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
                                            "InternalDatastoreName": "NO-DATASTORE",
                                            "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                                        }, "IsThin": false
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm(1)/evgeny-local-vm.vmdk",
                        "TargetAddress": "",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 6b 8b 66 e7 00 34-bd 8a cc 6a 63 df ec 16",
                                    "InstanceUuid": "52 ad c6 b8 23 76 94 27-fd d2 31 aa 5e d4 28 2c"
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
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-33"
                                }, "DisplayName": "none"
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
                        "MacAddress": "00:50:56:bd:e5:be",
                        "vmId": {
                            "InternalVmName": "vm-330",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "id": "vm-33000:50:56:bd:e5:be",
                        "vmName": "evgeny-local-vm(1)",
                        "nicName": "Network adapter 1",
                        "ProtectedNetwork": "none",
                        "FailoverIp": "",
                        "FailoverNetwork": "No Settings",
                        "TestNetwork": "No Settings",
                        "TestIP": "",
                        "isInMultiNicVM": false,
                        "TargetHost": null
                    }],
                    "CloudVmSettings": {
                        "FailoverSettings": {
                            "Vpc": {
                                "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                                "Id": {"Identifier": "vpc-0b2dc76e"}
                            },
                            "Subnet": {
                                "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                                "Id": {"Identifier": "subnet-0f5f5a49"}
                            },
                            "PrimaryIp": "",
                            "SecurityGroups": [{
                                "Name": "sg-26d21343 | default | default",
                                "Id": {"Identifier": "sg-26d21343"}
                            }],
                            "PublicCloudInstanceTypeVisualObject": {
                                "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                                "FamilyName": "General Purpose",
                                "CpusCount": 4,
                                "MemoryAmountGB": 15,
                                "EbsOptimized": true,
                                "IsSupportLinux": true,
                                "DisplayName": "InstanceType: m3.xlarge",
                                "IsFeatureEnabled": true
                            }
                        },
                        "FailoverTestSettings": {
                            "Vpc": {
                                "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                                "Id": {"Identifier": "vpc-0b2dc76e"}
                            },
                            "Subnet": {
                                "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                                "Id": {"Identifier": "subnet-0f5f5a49"}
                            },
                            "PrimaryIp": "",
                            "SecurityGroups": [{
                                "Name": "sg-26d21343 | default | default",
                                "Id": {"Identifier": "sg-26d21343"}
                            }],
                            "PublicCloudInstanceTypeVisualObject": {
                                "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                                "FamilyName": "General Purpose",
                                "CpusCount": 4,
                                "MemoryAmountGB": 15,
                                "EbsOptimized": true,
                                "IsSupportLinux": true,
                                "DisplayName": "InstanceType: m3.xlarge",
                                "IsFeatureEnabled": true
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
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": []
                }, {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-333",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    },
                    "Name": "evgeny-local-vm-2 - 2015-03-16_10-20-40 - testing recovery(1)",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-14",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    },
                    "TargetHost": null,
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "NO-DATASTORE",
                            "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": ""
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 129,
                        "UsedStorageSizeInMB": 109,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm-2 - 2015-03-16_10-20-40 - testing recovery(1)/evgeny-local-vm-2.vmdk",
                        "TargetAddress": "",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 75 ca cb 45 a6 d9-a7 c1 d4 fd d8 fc 53 9e",
                                    "InstanceUuid": "52 e6 aa 8c cb 59 ea 0e-bc d5 b3 09 34 90 6b b3"
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
                                            "InternalDatastoreName": "NO-DATASTORE",
                                            "ServerIdentifier": {"ServerGuid": "00000000-0000-0000-0000-000000000000"}
                                        }, "IsThin": false
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest83Datastore]:evgeny-local-vm-2 - 2015-03-16_10-20-40 - testing recovery(1)/evgeny-local-vm-2_1.vmdk",
                        "TargetAddress": "",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 75 ca cb 45 a6 d9-a7 c1 d4 fd d8 fc 53 9e",
                                    "InstanceUuid": "52 e6 aa 8c cb 59 ea 0e-bc d5 b3 09 34 90 6b b3"
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
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
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
                        "MacAddress": "00:50:56:bd:fd:90",
                        "vmId": {
                            "InternalVmName": "vm-333",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "id": "vm-33300:50:56:bd:fd:90",
                        "vmName": "evgeny-local-vm-2 - 2015-03-16_10-20-40 - testing recovery(1)",
                        "nicName": "Network adapter 1",
                        "ProtectedNetwork": "VM Network",
                        "FailoverIp": "",
                        "FailoverNetwork": "No Settings",
                        "TestNetwork": "No Settings",
                        "TestIP": "",
                        "isInMultiNicVM": false,
                        "TargetHost": null
                    }],
                    "CloudVmSettings": {
                        "FailoverSettings": {
                            "Vpc": {
                                "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                                "Id": {"Identifier": "vpc-0b2dc76e"}
                            },
                            "Subnet": {
                                "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                                "Id": {"Identifier": "subnet-0f5f5a49"}
                            },
                            "PrimaryIp": "",
                            "SecurityGroups": [{
                                "Name": "sg-26d21343 | default | default",
                                "Id": {"Identifier": "sg-26d21343"}
                            }],
                            "PublicCloudInstanceTypeVisualObject": {
                                "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                                "FamilyName": "General Purpose",
                                "CpusCount": 4,
                                "MemoryAmountGB": 15,
                                "EbsOptimized": true,
                                "IsSupportLinux": true,
                                "DisplayName": "InstanceType: m3.xlarge",
                                "IsFeatureEnabled": true
                            }
                        },
                        "FailoverTestSettings": {
                            "Vpc": {
                                "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                                "Id": {"Identifier": "vpc-0b2dc76e"}
                            },
                            "Subnet": {
                                "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                                "Id": {"Identifier": "subnet-0f5f5a49"}
                            },
                            "PrimaryIp": "",
                            "SecurityGroups": [{
                                "Name": "sg-26d21343 | default | default",
                                "Id": {"Identifier": "sg-26d21343"}
                            }],
                            "PublicCloudInstanceTypeVisualObject": {
                                "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                                "FamilyName": "General Purpose",
                                "CpusCount": 4,
                                "MemoryAmountGB": 15,
                                "EbsOptimized": true,
                                "IsSupportLinux": true,
                                "DisplayName": "InstanceType: m3.xlarge",
                                "IsFeatureEnabled": true
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
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": []
                }],
                "OwnersId": {"OwnersGuid": "53898f72-95b2-4bf3-b2ed-cd6bb4cc767d", "siteName": "gui_local_vcd"},
                "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
            },
            "TargetSiteInfo": {
                "OwnersId": {
                    "Id": {"OwnersGuid": "53898f72-95b2-4bf3-b2ed-cd6bb4cc767d"},
                    "DisplayName": "omri_remote_aws(localhost)",
                    "IsLocal": false
                },
                "PotentialReplicationDestinations": [],
                "VCDVirtualDatacenters": [],
                "PotentialServiceProfiles": [],
                "PotentialPublicCloudPcns": {
                    "PotentialPcns": [{
                        "Vpc": {
                            "Name": "vpc-0b2dc76e (172.31.0.0/16) (default)",
                            "Id": {"Identifier": "vpc-0b2dc76e"}
                        },
                        "Subnets": [{
                            "Name": "subnet-0f5f5a49(172.31.0.0/20) | ABC | Default in us-west-1b",
                            "Id": {"Identifier": "subnet-0f5f5a49"}
                        }, {
                            "Name": "subnet-59f4313c(172.31.16.0/20) | Default in us-west-1c",
                            "Id": {"Identifier": "subnet-59f4313c"}
                        }],
                        "DefaultSubnet": {"Identifier": "subnet-0f5f5a49"},
                        "SecurityGroups": [{
                            "Name": "sg-26d21343 | default | default",
                            "Id": {"Identifier": "sg-26d21343"}
                        }],
                        "DefaultSecurityGroup": {"Identifier": "sg-26d21343"}
                    }]
                },
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
                        "Id": {"OwnersGuid": "53898f72-95b2-4bf3-b2ed-cd6bb4cc767d"},
                        "DisplayName": "omri_remote_aws(localhost)",
                        "IsLocal": false
                    },
                    "SiteId": {"SiteGuid": "e1f7ad7a-3b57-4689-b2de-32cad58933b7"},
                    "IsConnected": true,
                    "IsVCenterEnabled": false,
                    "IsVCDEnabled": false,
                    "IsScvmmEnabled": false,
                    "IsPublicCloud": true
                },
                "PotentialPublicCloudInstanceTypeVisualObjects": [{
                    "InstanceTypeIdentifier": {"InstanceType": "t2.micro"},
                    "FamilyName": "General Purpose",
                    "CpusCount": 1,
                    "MemoryAmountGB": 1,
                    "EbsOptimized": false,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: t2.micro",
                    "IsFeatureEnabled": true,
                    "Description": "t2.micro (1 vCPUs, 1 GiB, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "t2.small"},
                    "FamilyName": "General Purpose",
                    "CpusCount": 1,
                    "MemoryAmountGB": 2,
                    "EbsOptimized": false,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: t2.small",
                    "IsFeatureEnabled": true,
                    "Description": "t2.small (1 vCPUs, 2 GiB, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "t2.medium"},
                    "FamilyName": "General Purpose",
                    "CpusCount": 2,
                    "MemoryAmountGB": 4,
                    "EbsOptimized": false,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: t2.medium",
                    "IsFeatureEnabled": true,
                    "Description": "t2.medium (2 vCPUs, 4 GiB, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "m3.medium"},
                    "FamilyName": "General Purpose",
                    "CpusCount": 1,
                    "MemoryAmountGB": 3.75,
                    "EbsOptimized": false,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: m3.medium",
                    "IsFeatureEnabled": true,
                    "Description": "m3.medium (1 vCPUs, 3.75 GiB, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "m3.large"},
                    "FamilyName": "General Purpose",
                    "CpusCount": 2,
                    "MemoryAmountGB": 7.5,
                    "EbsOptimized": false,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: m3.large",
                    "IsFeatureEnabled": true,
                    "Description": "m3.large (2 vCPUs, 7.5 GiB, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "m3.xlarge"},
                    "FamilyName": "General Purpose",
                    "CpusCount": 4,
                    "MemoryAmountGB": 15,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: m3.xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "m3.xlarge (4 vCPUs, 15 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "m3.2xlarge"},
                    "FamilyName": "General Purpose",
                    "CpusCount": 8,
                    "MemoryAmountGB": 30,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: m3.2xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "m3.2xlarge (8 vCPUs, 30 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c4.large"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 2,
                    "MemoryAmountGB": 3.75,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: c4.large",
                    "IsFeatureEnabled": true,
                    "Description": "c4.large (2 vCPUs, 3.75 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c4.xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 4,
                    "MemoryAmountGB": 7.5,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: c4.xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c4.xlarge (4 vCPUs, 7.5 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c4.2xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 8,
                    "MemoryAmountGB": 15,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: c4.2xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c4.2xlarge (8 vCPUs, 15 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c4.4xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 16,
                    "MemoryAmountGB": 30,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: c4.4xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c4.4xlarge (16 vCPUs, 30 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c4.8xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 36,
                    "MemoryAmountGB": 60,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: c4.8xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c4.8xlarge (36 vCPUs, 60 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c3.large"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 2,
                    "MemoryAmountGB": 3.75,
                    "EbsOptimized": false,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: c3.large",
                    "IsFeatureEnabled": true,
                    "Description": "c3.large (2 vCPUs, 3.75 GiB, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c3.xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 4,
                    "MemoryAmountGB": 7.5,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: c3.xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c3.xlarge (4 vCPUs, 7.5 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c3.2xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 8,
                    "MemoryAmountGB": 15,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: c3.2xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c3.2xlarge (8 vCPUs, 15 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c3.4xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 16,
                    "MemoryAmountGB": 30,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: c3.4xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c3.4xlarge (16 vCPUs, 30 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "c3.8xlarge"},
                    "FamilyName": "Compute Optimized",
                    "CpusCount": 32,
                    "MemoryAmountGB": 60,
                    "EbsOptimized": false,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: c3.8xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "c3.8xlarge (32 vCPUs, 60 GiB)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "g2.2xlarge"},
                    "FamilyName": "GPU",
                    "CpusCount": 8,
                    "MemoryAmountGB": 15,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: g2.2xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "g2.2xlarge (8 vCPUs, 15 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "g2.8xlarge"},
                    "FamilyName": "GPU",
                    "CpusCount": 32,
                    "MemoryAmountGB": 60,
                    "EbsOptimized": false,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: g2.8xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "g2.8xlarge (32 vCPUs, 60 GiB)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "r3.large"},
                    "FamilyName": "Memory Optimized",
                    "CpusCount": 2,
                    "MemoryAmountGB": 15.25,
                    "EbsOptimized": false,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: r3.large",
                    "IsFeatureEnabled": true,
                    "Description": "r3.large (2 vCPUs, 15.25 GiB)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "r3.xlarge"},
                    "FamilyName": "Memory Optimized",
                    "CpusCount": 4,
                    "MemoryAmountGB": 30.5,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: r3.xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "r3.xlarge (4 vCPUs, 30.5 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "r3.2xlarge"},
                    "FamilyName": "Memory Optimized",
                    "CpusCount": 8,
                    "MemoryAmountGB": 61,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: r3.2xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "r3.2xlarge (8 vCPUs, 61 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "r3.4xlarge"},
                    "FamilyName": "Memory Optimized",
                    "CpusCount": 16,
                    "MemoryAmountGB": 122,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: r3.4xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "r3.4xlarge (16 vCPUs, 122 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "r3.8xlarge"},
                    "FamilyName": "Memory Optimized",
                    "CpusCount": 32,
                    "MemoryAmountGB": 244,
                    "EbsOptimized": false,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: r3.8xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "r3.8xlarge (32 vCPUs, 244 GiB)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "i2.xlarge"},
                    "FamilyName": "Storage Optimized",
                    "CpusCount": 4,
                    "MemoryAmountGB": 30.5,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: i2.xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "i2.xlarge (4 vCPUs, 30.5 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "i2.2xlarge"},
                    "FamilyName": "Storage Optimized",
                    "CpusCount": 8,
                    "MemoryAmountGB": 61,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: i2.2xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "i2.2xlarge (8 vCPUs, 61 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "i2.4xlarge"},
                    "FamilyName": "Storage Optimized",
                    "CpusCount": 16,
                    "MemoryAmountGB": 122,
                    "EbsOptimized": true,
                    "IsSupportLinux": true,
                    "DisplayName": "InstanceType: i2.4xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "i2.4xlarge (16 vCPUs, 122 GiB, EBS only, Linux supported)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "i2.8xlarge"},
                    "FamilyName": "Storage Optimized",
                    "CpusCount": 32,
                    "MemoryAmountGB": 244,
                    "EbsOptimized": false,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: i2.8xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "i2.8xlarge (32 vCPUs, 244 GiB)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "d2.xlarge"},
                    "FamilyName": "Dense-storage Instances",
                    "CpusCount": 4,
                    "MemoryAmountGB": 30.5,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: d2.xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "d2.xlarge (4 vCPUs, 30.5 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "d2.2xlarge"},
                    "FamilyName": "Dense-storage Instances",
                    "CpusCount": 8,
                    "MemoryAmountGB": 61,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: d2.2xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "d2.2xlarge (8 vCPUs, 61 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "d2.4xlarge"},
                    "FamilyName": "Dense-storage Instances",
                    "CpusCount": 16,
                    "MemoryAmountGB": 122,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: d2.4xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "d2.4xlarge (16 vCPUs, 122 GiB, EBS only)"
                }, {
                    "InstanceTypeIdentifier": {"InstanceType": "d2.8xlarge"},
                    "FamilyName": "Dense-storage Instances",
                    "CpusCount": 36,
                    "MemoryAmountGB": 244,
                    "EbsOptimized": true,
                    "IsSupportLinux": false,
                    "DisplayName": "InstanceType: d2.8xlarge",
                    "IsFeatureEnabled": true,
                    "Description": "d2.8xlarge (36 vCPUs, 244 GiB, EBS only)"
                }]
            },
            "ProtectionGroupId": {"GroupGuid": "372472cd-1fc4-4a84-81eb-091239c939f1"},
            "Entities": {"Source": 0, "Target": 3},
            "ConfigurationFlags": {
                "IsStorageProfileEnabled": false,
                "IsCompressionConfigurable": false,
                "IsVmFolderConfigurable": true,
                "IsBackupFeatureSupported": true
            },
            "PotentialZertoOrganization": [{
                "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                "OrganizationName": "No Organization",
                "CrmIdentifier": "No Contact"
            }],
            "IsEnableVmJournalDatastoreSelection": true
        };

        controller = $controller('publicCloudNetworkEditController', {
            $scope: testScope,
            $translate: $translate,
            oneVm: testScope.oneVm,
            isBulk: false
        });
    }));

    it("should have function defined", function () {
        expect(testScope.close).toBeDefined();
        expect(testScope.initData).toBeDefined();
        expect(testScope.save).toBeDefined();
    });

    it("should check properties defined", function () {
        expect(testScope.loading).toBeDefined();
        expect(testScope.forms).toBeDefined();
        expect(testScope.vmObject).toBeDefined();
        expect(testScope.FailoverPrivateIpDisabled).toBeFalsy();
        expect(testScope.FailoverTestPrivateIpDisabled).toBeFalsy();
    });

    it("should check initInstanceLists", function () {
        testScope.initInstanceLists();
        expect(testScope.showInstanceTypes).toBeTruthy();
        expect(testScope.familyTypes.length).toEqual(6);
        expect(testScope.vmObject.selectedFolInstanceFamily.instances[0].Description).toEqual('t2.micro (1 vCPUs, 1 GB, Linux supported)');
        expect(testScope.vmObject.selectedTestInstanceFamily.instances[0].Description).toEqual('t2.micro (1 vCPUs, 1 GB, Linux supported)');
        expect(testScope.instanceFolList.length).toEqual(7);
        expect(testScope.instanceTestList.length).toEqual(7);
    });

});
