'use strict';

describe('create vpg validation factory', function () {
    var factory, model, steps, VPGWizardStepStates;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (createVPGModel, createVPGWizardModel, _VPGWizardStepStates_) {
        VPGWizardStepStates = _VPGWizardStepStates_;
        factory = createVPGWizardModel;
        model = createVPGModel;
        model.data = {isEdit: false};
        steps = factory.getSteps(null, false);
    }));

    describe('should check the recovery step', function () {
        it('should success validation - case VCVpg', function () {
            model.data = {
                "targetSiteType": {"type": "VCVpg", "value": 0},
                "defaultVpgSettings": {
                    "Config": {
                        "Name": "xxx",
                        "Configuration": {
                            "Priority": 1,
                            "MinimalJournalLenghtInMinutes": 240,
                            "RPOThressholdInSeconds": 300,
                            "MaxTestIntervalInMinutes": 0,
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
                                "JournalHardLimitPerVM": {"Limit": 75, "Type": 2},
                                "JournalWarningThresholdPerVM": {"Limit": 50, "Type": 2}
                            },
                            "BootOrder": {
                                "Groups": [{
                                    "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                                    "Name": "Default",
                                    "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                                    "Machines": [{
                                        "DisplayName": "kobi-test-vm",
                                        "Id": {
                                            "InternalVmName": "vm-158",
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                        },
                                        "SizeInMb": 121,
                                        "id": 0,
                                        "SizeInMbFiltered": "121.0 MB"
                                    }]
                                }]
                            },
                            "ServiceProfile": {
                                "SelectedIdentifier": {"InternalId": "0f50774a-8d90-48de-81db-e5d5dd116bc2"},
                                "Name": "System Service Profile"
                            },
                            "Backup": {
                                "Target": {"SelectedTarget": null},
                                "Scheduler": {
                                    "RunningTime": {
                                        "SchedulePeriodType": 0,
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
                                        "WeeklyWindow": {"Days": [{"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}]}
                                    }
                                },
                                "Scripting": {"PostScript": {"Command": "", "Parameters": "", "TimeoutInSeconds": 0}},
                                "DeleteBackup": {"RestorePointRange": 1}
                            },
                            "IsBackupEnabled": false
                        },
                        "Defaults": {
                            "TargetComputeResource": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                            },
                            "TargetDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            },
                            "FailoverNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            },
                            "TestNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            },
                            "TargetFolder": {
                                "Id": {
                                    "InternalFolderName": "group-v131",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DisplayName": "[Default]ZertoRecoveryFolder"
                            },
                            "FailoverVCDVAppNetwork": null,
                            "TestVCDVAppNetwork": null,
                            "RecoveryCloudSettings": null
                        },
                        "ProtectedVappSettings": null,
                        "RecoveryVappSettings": null,
                        "VirtualMachines": [{
                            "InternalVirtualMachineId": {
                                "InternalVmName": "vm-158",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "Name": "kobi-test-vm",
                            "SourceHost": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                            },
                            "SourceDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-16",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                            },
                            "TargetHost": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                            },
                            "TargetDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            },
                            "StorageUsageInfo": {
                                "ProvisionedStorageSizeInMB": 121,
                                "UsedStorageSizeInMB": 117,
                                "RecoveryStorageSizeInMB": 0
                            },
                            "Volumes": [{
                                "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                                "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                                "Swap": false,
                                "ProvisionedSizeInMB": 8,
                                "InternalVolumeManagementSettings": {
                                    "DiskLocationParams": {
                                        "VMUuids": {
                                            "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                            "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                                        },
                                        "UnitNumber": 0,
                                        "ControllerNumber": 0,
                                        "VolumeType": 0,
                                        "DlpDescription": "Scsi(0:0)"
                                    },
                                    "Settings": {
                                        "VolumeReplicationDestination": {
                                            "Datastore": {
                                                "IsThin": false,
                                                "TargetDatastore": {
                                                    "InternalDatastoreName": "datastore-15",
                                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                                }
                                            }
                                        }
                                    }
                                },
                                "IsSourceThinProvisioned": false
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
                                        "RecoveryNetwork": {
                                            "Id": {
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                                "InternalType": "Network",
                                                "InternalName": "network-11"
                                            }, "DisplayName": "VM Network"
                                        }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                    }, "VCDNetworkSettings": null
                                },
                                "TestSettings": {
                                    "VCenterNetworkSettings": {
                                        "RecoveryNetwork": {
                                            "Id": {
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                                "InternalType": "Network",
                                                "InternalName": "network-11"
                                            }, "DisplayName": "VM Network"
                                        }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                    }, "VCDNetworkSettings": null
                                },
                                "IsIPConfigurationEnabled": false,
                                "MacAddress": "00:50:56:ac:44:fa",
                                "vmId": {
                                    "InternalVmName": "vm-158",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "id": "vm-15800:50:56:ac:44:fa",
                                "vmName": "kobi-test-vm",
                                "nicName": "Network adapter 1",
                                "ProtectedNetwork": "VM Network",
                                "FailoverNetwork": "No Settings",
                                "FailoverIp": "",
                                "TestNetwork": "No Settings",
                                "TestIP": "",
                                "isInMultiNicVM": false
                            }],
                            "CloudVmSettings": null,
                            "TargetFolder": {
                                "Id": {
                                    "InternalFolderName": "group-v131",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DisplayName": "[Default]ZertoRecoveryFolder"
                            },
                            "StorageProfile": null,
                            "JournalHardLimit": {"Type": 0, "Limit": 0},
                            "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                            "JournalDatastores": [{
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            }]
                        }],
                        "OwnersId": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                        "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
                    },
                    "TargetSiteInfo": {},
                    "ProtectionGroupId": null,
                    "Entities": {"Source": 0, "Target": 0},
                    "ConfigurationFlags": {
                        "IsStorageProfileEnabled": false,
                        "IsCompressionConfigurable": true,
                        "IsVmFolderConfigurable": true,
                        "IsBackupFeatureSupported": true
                    }
                },
                "isPortal": false,
                "tmpVpgSettings": {}
            };
            expect(factory.validateRecoveryStep(steps[4])).toBeTruthy();
        });

        it('should success validation - case VCDvApp', function () {
            model.data = {
                "targetSiteType": {"type": "VCDvApp", "value": 2},
                "defaultVpgSettings": {
                    "Config": {
                        "Name": "xxx",
                        "Configuration": {
                            "Priority": 1,
                            "MinimalJournalLenghtInMinutes": 240,
                            "RPOThressholdInSeconds": 300,
                            "MaxTestIntervalInMinutes": 0,
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
                                "JournalHardLimitPerVM": {"Limit": 75, "Type": 2},
                                "JournalWarningThresholdPerVM": {"Limit": 50, "Type": 2}
                            },
                            "BootOrder": {
                                "Groups": [{
                                    "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                                    "Name": "Default",
                                    "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                                    "Machines": [{
                                        "DisplayName": "kobi-test-vm",
                                        "Id": {
                                            "InternalVmName": "vm-158",
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                        },
                                        "SizeInMb": 121,
                                        "id": 0,
                                        "SizeInMbFiltered": "121.0 MB"
                                    }]
                                }]
                            },
                            "ServiceProfile": {
                                "SelectedIdentifier": {"InternalId": "0f50774a-8d90-48de-81db-e5d5dd116bc2"},
                                "Name": "System Service Profile"
                            },
                            "Backup": {
                                "Target": {"SelectedTarget": null},
                                "Scheduler": {
                                    "RunningTime": {
                                        "SchedulePeriodType": 0,
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
                                        "WeeklyWindow": {"Days": [{"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}]}
                                    }
                                },
                                "Scripting": {"PostScript": {"Command": "", "Parameters": "", "TimeoutInSeconds": 0}},
                                "DeleteBackup": {"RestorePointRange": 1}
                            },
                            "IsBackupEnabled": false
                        },
                        "Defaults": {
                            "TargetComputeResource": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                            },
                            "TargetDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            },
                            "FailoverNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            },
                            "TestNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            },
                            "TargetFolder": {
                                "Id": {
                                    "InternalFolderName": "group-v131",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DisplayName": "[Default]ZertoRecoveryFolder"
                            },
                            "FailoverVCDVAppNetwork": null,
                            "TestVCDVAppNetwork": null,
                            "RecoveryCloudSettings": null
                        },
                        "ProtectedVappSettings": null,
                        "RecoveryVappSettings": {},
                        "VirtualMachines": [{
                            "InternalVirtualMachineId": {
                                "InternalVmName": "vm-158",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "Name": "kobi-test-vm",
                            "SourceHost": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                            },
                            "SourceDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-16",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                            },
                            "TargetHost": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                            },
                            "TargetDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            },
                            "StorageUsageInfo": {
                                "ProvisionedStorageSizeInMB": 121,
                                "UsedStorageSizeInMB": 117,
                                "RecoveryStorageSizeInMB": 0
                            },
                            "Volumes": [{
                                "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                                "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                                "Swap": false,
                                "ProvisionedSizeInMB": 8,
                                "InternalVolumeManagementSettings": {
                                    "DiskLocationParams": {
                                        "VMUuids": {
                                            "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                            "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                                        },
                                        "UnitNumber": 0,
                                        "ControllerNumber": 0,
                                        "VolumeType": 0,
                                        "DlpDescription": "Scsi(0:0)"
                                    },
                                    "Settings": {
                                        "VolumeReplicationDestination": {
                                            "Datastore": {
                                                "IsThin": false,
                                                "TargetDatastore": {
                                                    "InternalDatastoreName": "datastore-15",
                                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                                }
                                            }
                                        }
                                    }
                                },
                                "IsSourceThinProvisioned": false
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
                                        "RecoveryNetwork": {
                                            "Id": {
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                                "InternalType": "Network",
                                                "InternalName": "network-11"
                                            }, "DisplayName": "VM Network"
                                        }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                    }, "VCDNetworkSettings": null
                                },
                                "TestSettings": {
                                    "VCenterNetworkSettings": {
                                        "RecoveryNetwork": {
                                            "Id": {
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                                "InternalType": "Network",
                                                "InternalName": "network-11"
                                            }, "DisplayName": "VM Network"
                                        }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                    }, "VCDNetworkSettings": null
                                },
                                "IsIPConfigurationEnabled": false,
                                "MacAddress": "00:50:56:ac:44:fa",
                                "vmId": {
                                    "InternalVmName": "vm-158",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "id": "vm-15800:50:56:ac:44:fa",
                                "vmName": "kobi-test-vm",
                                "nicName": "Network adapter 1",
                                "ProtectedNetwork": "VM Network",
                                "FailoverNetwork": "No Settings",
                                "FailoverIp": "",
                                "TestNetwork": "No Settings",
                                "TestIP": "",
                                "isInMultiNicVM": false
                            }],
                            "CloudVmSettings": null,
                            "TargetFolder": {
                                "Id": {
                                    "InternalFolderName": "group-v131",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DisplayName": "[Default]ZertoRecoveryFolder"
                            },
                            "StorageProfile": null,
                            "JournalHardLimit": {"Type": 0, "Limit": 0},
                            "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                            "JournalDatastores": [{
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            }]
                        }],
                        "OwnersId": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                        "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
                    },
                    "TargetSiteInfo": {},
                    "ProtectionGroupId": null,
                    "Entities": {"Source": 0, "Target": 0},
                    "ConfigurationFlags": {
                        "IsStorageProfileEnabled": false,
                        "IsCompressionConfigurable": true,
                        "IsVmFolderConfigurable": true,
                        "IsBackupFeatureSupported": true
                    }
                },
                "isPortal": false,
                "selectedVCDVapp": [],
                "tmpVpgSettings": {"vapp": null}
            };
            expect(factory.validateRecoveryStep(steps[4])).toBeTruthy();
        });

        it('should fail validation - case no defaultVpgSettings', function () {
            model.data = {
                defaultVpgSettings: null,
                tmpVpgSettings: {}
            };
            expect(factory.validateRecoveryStep(steps[4])).toBeFalsy();
        });

        it('should fail validation - case VCDvApp, there is no RecoveryVappSettings', function () {
            model.data = {
                "targetSiteType": {"type": "VCDvApp", "value": 2},
                "defaultVpgSettings": {
                    "Config": {
                        "Name": "xxx",
                        "Configuration": {
                            "Priority": 1,
                            "MinimalJournalLenghtInMinutes": 240,
                            "RPOThressholdInSeconds": 300,
                            "MaxTestIntervalInMinutes": 0,
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
                                "JournalHardLimitPerVM": {"Limit": 75, "Type": 2},
                                "JournalWarningThresholdPerVM": {"Limit": 50, "Type": 2}
                            },
                            "BootOrder": {
                                "Groups": [{
                                    "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                                    "Name": "Default",
                                    "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                                    "Machines": [{
                                        "DisplayName": "kobi-test-vm",
                                        "Id": {
                                            "InternalVmName": "vm-158",
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                        },
                                        "SizeInMb": 121,
                                        "id": 0,
                                        "SizeInMbFiltered": "121.0 MB"
                                    }]
                                }]
                            },
                            "ServiceProfile": {
                                "SelectedIdentifier": {"InternalId": "0f50774a-8d90-48de-81db-e5d5dd116bc2"},
                                "Name": "System Service Profile"
                            },
                            "Backup": {
                                "Target": {"SelectedTarget": null},
                                "Scheduler": {
                                    "RunningTime": {
                                        "SchedulePeriodType": 0,
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
                                        "WeeklyWindow": {"Days": [{"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}]}
                                    }
                                },
                                "Scripting": {"PostScript": {"Command": "", "Parameters": "", "TimeoutInSeconds": 0}},
                                "DeleteBackup": {"RestorePointRange": 1}
                            },
                            "IsBackupEnabled": false
                        },
                        "Defaults": {
                            "TargetComputeResource": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                            },
                            "TargetDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            },
                            "FailoverNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            },
                            "TestNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            },
                            "TargetFolder": {
                                "Id": {
                                    "InternalFolderName": "group-v131",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DisplayName": "[Default]ZertoRecoveryFolder"
                            },
                            "FailoverVCDVAppNetwork": null,
                            "TestVCDVAppNetwork": null,
                            "RecoveryCloudSettings": null
                        },
                        "ProtectedVappSettings": null,
                        "RecoveryVappSettings": null,
                        "VirtualMachines": [{
                            "InternalVirtualMachineId": {
                                "InternalVmName": "vm-158",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "Name": "kobi-test-vm",
                            "SourceHost": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                            },
                            "SourceDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-16",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                            },
                            "TargetHost": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-14",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                            },
                            "TargetDatastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            },
                            "StorageUsageInfo": {
                                "ProvisionedStorageSizeInMB": 121,
                                "UsedStorageSizeInMB": 117,
                                "RecoveryStorageSizeInMB": 0
                            },
                            "Volumes": [{
                                "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                                "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                                "Swap": false,
                                "ProvisionedSizeInMB": 8,
                                "InternalVolumeManagementSettings": {
                                    "DiskLocationParams": {
                                        "VMUuids": {
                                            "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                            "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                                        },
                                        "UnitNumber": 0,
                                        "ControllerNumber": 0,
                                        "VolumeType": 0,
                                        "DlpDescription": "Scsi(0:0)"
                                    },
                                    "Settings": {
                                        "VolumeReplicationDestination": {
                                            "Datastore": {
                                                "IsThin": false,
                                                "TargetDatastore": {
                                                    "InternalDatastoreName": "datastore-15",
                                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                                }
                                            }
                                        }
                                    }
                                },
                                "IsSourceThinProvisioned": false
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
                                        "RecoveryNetwork": {
                                            "Id": {
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                                "InternalType": "Network",
                                                "InternalName": "network-11"
                                            }, "DisplayName": "VM Network"
                                        }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                    }, "VCDNetworkSettings": null
                                },
                                "TestSettings": {
                                    "VCenterNetworkSettings": {
                                        "RecoveryNetwork": {
                                            "Id": {
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                                "InternalType": "Network",
                                                "InternalName": "network-11"
                                            }, "DisplayName": "VM Network"
                                        }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                    }, "VCDNetworkSettings": null
                                },
                                "IsIPConfigurationEnabled": false,
                                "MacAddress": "00:50:56:ac:44:fa",
                                "vmId": {
                                    "InternalVmName": "vm-158",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "id": "vm-15800:50:56:ac:44:fa",
                                "vmName": "kobi-test-vm",
                                "nicName": "Network adapter 1",
                                "ProtectedNetwork": "VM Network",
                                "FailoverNetwork": "No Settings",
                                "FailoverIp": "",
                                "TestNetwork": "No Settings",
                                "TestIP": "",
                                "isInMultiNicVM": false
                            }],
                            "CloudVmSettings": null,
                            "TargetFolder": {
                                "Id": {
                                    "InternalFolderName": "group-v131",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                }, "DisplayName": "[Default]ZertoRecoveryFolder"
                            },
                            "StorageProfile": null,
                            "JournalHardLimit": {"Type": 0, "Limit": 0},
                            "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                            "JournalDatastores": [{
                                "Id": {
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                            }]
                        }],
                        "OwnersId": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                        "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
                    },
                    "TargetSiteInfo": {},
                    "ProtectionGroupId": null,
                    "Entities": {"Source": 0, "Target": 0},
                    "ConfigurationFlags": {
                        "IsStorageProfileEnabled": false,
                        "IsCompressionConfigurable": true,
                        "IsVmFolderConfigurable": true,
                        "IsBackupFeatureSupported": true
                    }
                },
                "isPortal": false,
                "selectedVCDVapp": [],
                "tmpVpgSettings": {"vapp": "myVapp"}
            };
            expect(factory.validateRecoveryStep(steps[4])).toBeFalsy();
        });
    });

    it('should check valid icon on step', function () {
        var step = steps[0];
        step.isEnabled = true;
        factory._setValidationState(step, true);
        expect(step.stateIcon).toEqual(VPGWizardStepStates.VALID);
        step.isEnabled = false;
        factory._setValidationState(step);
        expect(step.stateIcon).toEqual(VPGWizardStepStates.INITIAL);
    });

    it("should check init step validation", function () {
        model.data = {name: '', tmpVpgSettings: {}};
        expect(factory.validateInitialStep(steps[0])).toBeFalsy();
        expect(steps[0].validationComponents).toEqual([{id: 'vpgName', error: 'CREATE_VPG_INITIAL.NAME_INVALID'}]);
    });

    it("should check vm validation", function () {
        model.data = {
            "isPortal": false,
            "tmpVpgSettings":{
                vms: [{
                    "DisplayName": "kobi-test-vm",
                    "Id": {
                        "InternalVmName": "vm-158",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    },
                    "SizeInMb": 121,
                    "id": 0,
                    "SizeInMbFiltered": "121.0 MB"
                }]
            }
        };
        expect(factory.validateSelectVMsStep(steps[1])).toBeTruthy();
        model.data.tmpVpgSettings.vms = [];
        expect(factory.validateSelectVMsStep(steps[1])).toBeFalsy();
        expect(steps[1].validationComponents).toEqual([{
            id: 'selectedVms',
            error: 'CREATE_VPG_SELECT_VMS.NONE_SELECTED'
        }]);
    });

    it("should check replication step", function () {
        model.data = {
            "defaultVpgSettings": null,
            "editValidationFlags": {
                "AllowChangeDatastore": true,
                "DoZertoOrganizationValidation": false,
                "KeepUnprotectedDisks": false,
                "ReprotectInsteadOfChangeDatastore": false
            },
            "createValidationFlags": {"DoZertoOrganizationValidation": true},
            "isPortal": false,
            "tmpVpgSettings":{}
        };
        expect(factory.validateReplicationStep(steps[2])).toBeFalsy();

        model.data = {
            "potentialResrouce": {
                "Datastores": [{
                    "Datastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-15",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                    }, "IsEnabled": true, "_uiSelectChoiceDisabled": false
                }, {
                    "Datastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore (132GB / 149GB Free)"
                    }, "IsEnabled": true, "_uiSelectChoiceDisabled": false
                }],
                "Networks": [{
                    "Id": {
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                        "InternalType": "Network",
                        "InternalName": "network-11"
                    }, "DisplayName": "VM Network"
                }, {
                    "Id": {
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-145"
                    }, "DisplayName": "dvs.VCDVSNoamNetworkIso-f9a84b4e-7bc1-434d-8a38-b0c4e47a357b"
                }, {
                    "Id": {
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-34"
                    }, "DisplayName": "dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"
                }, {
                    "Id": {
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-21"
                    }, "DisplayName": "dvPortGroup"
                }],
                "DescendantHosts": [],
                "PotentialFolders": [{
                    "Id": {
                        "InternalFolderName": "group-v131",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "[Default]ZertoRecoveryFolder"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v142",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "vcd"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v143",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "Service VMs"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v28",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "vcloud"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v41",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "NoamOrgInc (043816c2-b470-4be7-807a-2cb3e3567cee)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v42",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "NoamOrgVCD2 (22759e18-f8b0-499e-a90b-0652cc2f0724)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v121",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "Guy Vapp (dont touch) (f4907c7f-da7d-4c19-8d6f-ffb411834559)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v48",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "NoamVcdVapp4 (7c6a7547-4140-4176-a7f8-669e4bb060e4)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v43",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "vApp_system_1 (87817a3c-cbbc-446d-8497-2ee07d11404e)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v150",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "vApp_system_6 (eefb7ec7-ff13-44ed-a8a3-4a1ae307a833)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v29",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "ORG (d446e662-c129-487a-a594-8d2f06550ec1)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v30",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "orgvdc (2c7e1564-54f8-4b29-960e-23be9f24dd74)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v129",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "naom vm (15bc6809-8ccd-4595-91ab-420c6a9af690)"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v31",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "Service VMs"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v3",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "DisplayName": "/"
                }],
                "AssociatedRawDevices": [{
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "naa.60050768028180700000000000000190",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "SizeInKb": 157286400,
                        "SizeInBytes": 161061273600,
                        "DeviceName": "/vmfs/devices/disks/naa.60050768028180700000000000000190",
                        "DevicePath": "/vmfs/devices/disks/naa.60050768028180700000000000000190",
                        "Mode": 1
                    },
                    "DisplayName": "IBM iSCSI Disk (naa.60050768028180700000000000000190) - virtual",
                    "IsEnabled": true
                }, {
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "naa.60050768028180700000000000000190",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "SizeInKb": 157286400,
                        "SizeInBytes": 161061273600,
                        "DeviceName": "/vmfs/devices/disks/naa.60050768028180700000000000000190",
                        "DevicePath": "/vmfs/devices/disks/naa.60050768028180700000000000000190",
                        "Mode": 2
                    },
                    "DisplayName": "IBM iSCSI Disk (naa.60050768028180700000000000000190) - physical",
                    "IsEnabled": true
                }, {
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "mpx.vmhba1:C0:T0:L0",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "SizeInKb": 8388608,
                        "SizeInBytes": 8589934592,
                        "DeviceName": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "DevicePath": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "Mode": 1
                    }, "DisplayName": "Local VMware Disk (mpx.vmhba1:C0:T0:L0) - virtual", "IsEnabled": true
                }, {
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "mpx.vmhba1:C0:T0:L0",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "SizeInKb": 8388608,
                        "SizeInBytes": 8589934592,
                        "DeviceName": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "DevicePath": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "Mode": 2
                    }, "DisplayName": "Local VMware Disk (mpx.vmhba1:C0:T0:L0) - physical", "IsEnabled": true
                }]
            },
            "potentialVms": [{
                "DisplayName": "vse-NoamNetworkIso (630c2e3b-d356-4d43-ba84-56b49f5cfa03)-0",
                "Id": {
                    "InternalVmName": "vm-146",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 685,
                "id": 1,
                "SizeInMbFiltered": "685.0 MB"
            }, {
                "DisplayName": "vse-GW1 (b20ef632-0e63-44a1-9224-769915e337ed)-0",
                "Id": {
                    "InternalVmName": "vm-133",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 790,
                "id": 2,
                "SizeInMbFiltered": "790.0 MB"
            }, {
                "DisplayName": "kobi_vm_3",
                "Id": {
                    "InternalVmName": "vm-138",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 227,
                "id": 3,
                "SizeInMbFiltered": "227.0 MB"
            }, {
                "DisplayName": "kobi-test-vm - 2014-12-22_12-22-14",
                "Id": {
                    "InternalVmName": "vm-160",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 226,
                "id": 4,
                "SizeInMbFiltered": "226.0 MB"
            }, {
                "DisplayName": "New Virtual Machine",
                "Id": {
                    "InternalVmName": "vm-136",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 227,
                "id": 5,
                "SizeInMbFiltered": "227.0 MB"
            }, {
                "DisplayName": "vse-GW1 (b20ef632-0e63-44a1-9224-769915e337ed)-0",
                "Id": {
                    "InternalVmName": "vm-32",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 685,
                "id": 6,
                "SizeInMbFiltered": "685.0 MB"
            }, {
                "DisplayName": "kobi-test-vm",
                "Id": {
                    "InternalVmName": "vm-140",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 226,
                "id": 7,
                "SizeInMbFiltered": "226.0 MB"
            }, {
                "DisplayName": "alex test rp vm - testing recovery",
                "Id": {
                    "InternalVmName": "vm-128",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 4367,
                "id": 8,
                "SizeInMbFiltered": "4.3 GB"
            }],
            "initialSitesInfo": {
                "LocalVCDVapps": [{
                    "Vapp": {
                        "DisplayName": "NoamVcdVapp4",
                        "Id": {
                            "Id": "00000000-0000-0000-0000-000000000000",
                            "VCDId": "urn:vcloud:vapp:7c6a7547-4140-4176-a7f8-669e4bb060e4"
                        }
                    }, "OwningVirtualDataCenterName": "NoamOrgVCD2"
                }, {
                    "Vapp": {
                        "DisplayName": "NoamVcdVapp3",
                        "Id": {
                            "Id": "00000000-0000-0000-0000-000000000000",
                            "VCDId": "urn:vcloud:vapp:87817a3c-cbbc-446d-8497-2ee07d11404e"
                        }
                    }, "OwningVirtualDataCenterName": "NoamOrgVCD2"
                }, {
                    "Vapp": {
                        "DisplayName": "naom vm",
                        "Id": {
                            "Id": "00000000-0000-0000-0000-000000000000",
                            "VCDId": "urn:vcloud:vapp:15bc6809-8ccd-4595-91ab-420c6a9af690"
                        }
                    }, "OwningVirtualDataCenterName": "orgvdc"
                }],
                "TargetSites": [{
                    "OwnersId": {
                        "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                        "DisplayName": "gui_local_vcd (Local)",
                        "IsLocal": true
                    },
                    "SiteId": {"SiteGuid": "20805526-536c-4291-874b-d80939cf5e87"},
                    "IsConnected": true,
                    "IsVCenterEnabled": true,
                    "IsVCDEnabled": true,
                    "IsScvmmEnabled": false,
                    "IsPublicCloud": false
                }],
                "AllowSourceVcenter": true,
                "PotentialZertoOrganization": [{
                    "Identifier": {"Guid": "a8a0c687-066a-4377-a8d2-2a1ccfc70631"},
                    "OrganizationName": "guy",
                    "CrmIdentifier": "cxcx"
                }, {
                    "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                    "OrganizationName": "No Organization",
                    "CrmIdentifier": "No Contact"
                }]
            },
            "priorityCollection": [{"enum": 2, "label": "High"}, {"enum": 1, "label": "Medium"}, {
                "enum": 0,
                "label": "Low"
            }],
            "potenaialSiteTypes": [{"type": "VCD", "value": 2}, {"type": "VC", "value": 0}],
            "defaultJournalHistoryCollection": [{"label": "1 Hour", "value": 60}, {
                "label": "2 Hours",
                "value": 120
            }, {"label": "3 Hours", "value": 180}, {"label": "4 Hours", "value": 240}, {
                "label": "5 Hours",
                "value": 300
            }, {"label": "6 Hours", "value": 360}, {"label": "7 Hours", "value": 420}, {
                "label": "8 Hours",
                "value": 480
            }, {"label": "9 Hours", "value": 540}, {"label": "10 Hours", "value": 600}, {
                "label": "11 Hours",
                "value": 660
            }, {"label": "12 Hours", "value": 720}, {"label": "13 Hours", "value": 780}, {
                "label": "14 Hours",
                "value": 840
            }, {"label": "15 Hours", "value": 900}, {"label": "16 Hours", "value": 960}, {
                "label": "17 Hours",
                "value": 1020
            }, {"label": "18 Hours", "value": 1080}, {"label": "19 Hours", "value": 1140}, {
                "label": "20 Hours",
                "value": 1200
            }, {"label": "21 Hours", "value": 1260}, {"label": "22 Hours", "value": 1320}, {
                "label": "23 Hours",
                "value": 1380
            }, {"label": "24 Hours", "value": 1440}, {"label": "48 Hours", "value": 2880}, {
                "label": "72 Hours",
                "value": 4320
            }, {"label": "96 Hours", "value": 5760}, {"label": "120 Hours", "value": 7200}],
            "defaultTestPeriodCollection": [{"label": "1 Month", "value": 43200}, {
                "label": "3 Months",
                "value": 131040
            }, {"label": "6 Months", "value": 262080}, {"label": "9 Months", "value": 394560}, {
                "label": "12 Months",
                "value": 525600
            }, {"label": "None", "value": 0}],
            "priority": 1,
            "RPOAlertOptions": {"from": 0, "to": 38, "step": 1, "smooth": true},
            "RPOAlert": "9",
            "protectionGroupId": null,
            "isReverse": false,
            "vms": [{
                "DisplayName": "kobi-test-vm",
                "Id": {
                    "InternalVmName": "vm-158",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 121,
                "id": 0,
                "SizeInMbFiltered": "121.0 MB"
            }],
            "targetSite": {
                "OwnersId": {
                    "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                    "DisplayName": "gui_local_vcd (Local)",
                    "IsLocal": true
                },
                "SiteId": {"SiteGuid": "20805526-536c-4291-874b-d80939cf5e87"},
                "IsConnected": true,
                "IsVCenterEnabled": true,
                "IsVCDEnabled": true,
                "IsScvmmEnabled": false,
                "IsPublicCloud": false
            },
            "targetSiteType": {"type": "VC", "value": 0},
            "targetHost": {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-14",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            },
            "name": "xxx",
            "description": "",
            "defaultVpgSettings": {
                "Config": {
                    "Name": "xxx",
                    "Configuration": {
                        "Priority": 1,
                        "MinimalJournalLenghtInMinutes": 240,
                        "RPOThressholdInSeconds": 300,
                        "MaxTestIntervalInMinutes": 0,
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
                            "JournalHardLimitPerVM": {"Limit": 75, "Type": 2},
                            "JournalWarningThresholdPerVM": {"Limit": 50, "Type": 2}
                        },
                        "BootOrder": {
                            "Groups": [{
                                "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                                "Name": "Default",
                                "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                                "Machines": [{
                                    "DisplayName": "kobi-test-vm",
                                    "Id": {
                                        "InternalVmName": "vm-158",
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                    },
                                    "SizeInMb": 121,
                                    "id": 0,
                                    "SizeInMbFiltered": "121.0 MB"
                                }]
                            }]
                        },
                        "ServiceProfile": {
                            "SelectedIdentifier": {"InternalId": "0f50774a-8d90-48de-81db-e5d5dd116bc2"},
                            "Name": "System Service Profile"
                        },
                        "Backup": {
                            "Target": {"SelectedTarget": null},
                            "Scheduler": {
                                "RunningTime": {
                                    "SchedulePeriodType": 0,
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
                        "IsBackupEnabled": false
                    },
                    "Defaults": {
                        "TargetComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        },
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
                            "InternalVmName": "vm-158",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "Name": "kobi-test-vm",
                        "SourceHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                        },
                        "SourceDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-16",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                        },
                        "TargetHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        },
                        "StorageUsageInfo": {
                            "ProvisionedStorageSizeInMB": 121,
                            "UsedStorageSizeInMB": 117,
                            "RecoveryStorageSizeInMB": 0
                        },
                        "Volumes": [{
                            "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                            "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                            "Swap": false,
                            "ProvisionedSizeInMB": 8,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                        "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                                    },
                                    "UnitNumber": 0,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:0)"
                                },
                                "Settings": {
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "IsThin": false,
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-15",
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                            }
                                        }
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": false
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
                            "MacAddress": "00:50:56:ac:44:fa",
                            "vmId": {
                                "InternalVmName": "vm-158",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "id": "vm-15800:50:56:ac:44:fa",
                            "vmName": "kobi-test-vm",
                            "nicName": "Network adapter 1",
                            "ProtectedNetwork": "VM Network",
                            "FailoverNetwork": "No Settings",
                            "FailoverIp": "",
                            "TestNetwork": "No Settings",
                            "TestIP": "",
                            "isInMultiNicVM": false
                        }],
                        "CloudVmSettings": null,
                        "TargetFolder": null,
                        "StorageProfile": null,
                        "JournalHardLimit": {"Type": 0, "Limit": 0},
                        "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                        "JournalDatastores": [{
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        }]
                    }],
                    "OwnersId": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                    "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
                },
                "TargetSiteInfo": {
                    "OwnersId": {
                        "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                        "DisplayName": "gui_local_vcd (Local)",
                        "IsLocal": true
                    },
                    "PotentialReplicationDestinations": [{
                        "ComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
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
                                "InternalName": "resgroup-157",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "DisplayName": "RP:Cluster PVDC2"
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
                    }],
                    "VCDVirtualDatacenters": [{
                        "VirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724"
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
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:network:eee3536e-a889-4e55-8332-bfe4aeff8c08"
                            },
                            "FenceMode": {"FenceModeType": 2},
                            "IpScope": null,
                            "NetworkName": "NoamNetworkIso",
                            "OrgNetwork": null,
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": null,
                            "FenceMode": {"FenceModeType": 0},
                            "IpScope": null,
                            "NetworkName": "none",
                            "OrgNetwork": null,
                            "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}]
                        }],
                        "IsThinProvision": true
                    }, {
                        "VirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:2c7e1564-54f8-4b29-960e-23be9f24dd74"
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
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": null,
                            "FenceMode": {"FenceModeType": 0},
                            "IpScope": null,
                            "NetworkName": "none",
                            "OrgNetwork": null,
                            "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}]
                        }],
                        "IsThinProvision": true
                    }],
                    "PotentialServiceProfiles": [{
                        "Identifier": {"InternalId": "0f50774a-8d90-48de-81db-e5d5dd116bc2"},
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
                    "PotentialPublicCloudPcns": {
                        "PotentialPcns": [],
                        "DefaultVpc": {"Identifier": "5d0e1721-a816-45ad-b449-89825781a40e"}
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
                            "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                            "DisplayName": "gui_local_vcd (Local)",
                            "IsLocal": true
                        },
                        "SiteId": {"SiteGuid": "20805526-536c-4291-874b-d80939cf5e87"},
                        "IsConnected": true,
                        "IsVCenterEnabled": true,
                        "IsVCDEnabled": true,
                        "IsScvmmEnabled": false,
                        "IsPublicCloud": false
                    }
                },
                "ProtectionGroupId": null,
                "Entities": {"Source": 0, "Target": 0},
                "ConfigurationFlags": {
                    "IsStorageProfileEnabled": false,
                    "IsCompressionConfigurable": true,
                    "IsVmFolderConfigurable": true,
                    "IsBackupFeatureSupported": true
                },
                "PotentialZertoOrganization": [{
                    "Identifier": {"Guid": "a8a0c687-066a-4377-a8d2-2a1ccfc70631"},
                    "OrganizationName": "guy",
                    "CrmIdentifier": "cxcx"
                }, {
                    "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                    "OrganizationName": "No Organization",
                    "CrmIdentifier": "No Contact"
                }],
                "IsEnableVmJournalDatastoreSelection": true
            },
            "useScripts": false,
            "selectedVCDVapp": null,
            "isUsingVappNetworkMapping": false,
            "targetOrgvDC": null,
            "backupTargetDetails": {},
            "totalProvisionedSpace": 121,
            "vmsNicsList": [{
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
                "MacAddress": "00:50:56:ac:44:fa",
                "vmId": {
                    "InternalVmName": "vm-158",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "id": "vm-15800:50:56:ac:44:fa",
                "vmName": "kobi-test-vm",
                "nicName": "Network adapter 1",
                "ProtectedNetwork": "VM Network",
                "FailoverNetwork": "No Settings",
                "FailoverIp": "",
                "TestNetwork": "No Settings",
                "TestIP": "",
                "isInMultiNicVM": false
            }],
            "isSlaCustom": false,
            "selectedZORG": {
                "Identifier": {"Guid": "a8a0c687-066a-4377-a8d2-2a1ccfc70631"},
                "OrganizationName": "guy",
                "CrmIdentifier": "cxcx"
            },
            "awsSelected": false,
            "storageVolumes": [{
                "id": 0,
                "Index": 0,
                "VMName": "kobi-test-vm",
                "VM": {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-158",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    },
                    "Name": "kobi-test-vm",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-14",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-14",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-15",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 121,
                        "UsedStorageSizeInMB": 117,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                        "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                    "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                                },
                                "UnitNumber": 0,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:0)"
                            },
                            "Settings": {
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "IsThin": false,
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-15",
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                        }
                                    }
                                }
                            }
                        },
                        "IsSourceThinProvisioned": false
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
                        "MacAddress": "00:50:56:ac:44:fa",
                        "vmId": {
                            "InternalVmName": "vm-158",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "id": "vm-15800:50:56:ac:44:fa",
                        "vmName": "kobi-test-vm",
                        "nicName": "Network adapter 1",
                        "ProtectedNetwork": "VM Network",
                        "FailoverNetwork": "No Settings",
                        "FailoverIp": "",
                        "TestNetwork": "No Settings",
                        "TestIP": "",
                        "isInMultiNicVM": false
                    }],
                    "CloudVmSettings": null,
                    "TargetFolder": null,
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-15",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                    }]
                },
                "Volume": {
                    "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                    "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                    "Swap": false,
                    "ProvisionedSizeInMB": 8,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                            }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0, "DlpDescription": "Scsi(0:0)"
                        },
                        "Settings": {
                            "VolumeReplicationDestination": {
                                "Datastore": {
                                    "IsThin": false,
                                    "TargetDatastore": {
                                        "InternalDatastoreName": "datastore-15",
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                    }
                                }
                            }
                        }
                    },
                    "IsSourceThinProvisioned": false
                },
                "Thin": false,
                "ProvisionedSizeInMB": "8.0 MB"
            }],
            "enableBackupScripts": false,
            "sourceSiteType": {"sourceType": 0},
            "vmsVCDNicsList": [],
            "selectedVcdVappVMs": [],
            "isEdit": false,
            "vpgId": null,
            "isScvmm": false,
            "potentialMappingNetworks": [],
            "potentialReverseMappingNetworks": [],
            "killDailyBackupWatch": {},
            "editValidationFlags": {
                "AllowChangeDatastore": true,
                "DoZertoOrganizationValidation": false,
                "KeepUnprotectedDisks": false,
                "ReprotectInsteadOfChangeDatastore": false
            },
            "createValidationFlags": {"DoZertoOrganizationValidation": true},
            "isPortal": false,
            "serviceProfileName": "System Service Profile",
            "defaultTestNetwork": null,
            "defaultFailoverNetwork": null,
            "tmpVpgSettings" : {},
            "protectedVms": [{
                "DisplayName": "kobi-test-vm",
                "Id": {
                    "InternalVmName": "vm-158",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "SizeInMb": 121,
                "id": 0,
                "SizeInMbFiltered": "121.0 MB"
            }]
        };
        expect(factory.validateReplicationStep(steps[2])).toBeTruthy();
    });

    it("should check the backup step", function () {
        model.data = {
            "defaultVpgSettings": {
                "Config": {
                    "Name": "xxx",
                    "Configuration": {
                        "Priority": 1,
                        "MinimalJournalLenghtInMinutes": 240,
                        "RPOThressholdInSeconds": 300,
                        "MaxTestIntervalInMinutes": 0,
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
                            "JournalHardLimitPerVM": {"Type": 0},
                            "JournalWarningThresholdPerVM": {"Type": 0}
                        },
                        "BootOrder": {
                            "Groups": [{
                                "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                                "Name": "Default",
                                "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                                "Machines": [{
                                    "DisplayName": "kobi-test-vm",
                                    "Id": {
                                        "InternalVmName": "vm-158",
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                    },
                                    "SizeInMb": 121,
                                    "id": 0,
                                    "SizeInMbFiltered": "121.0 MB"
                                }]
                            }]
                        },
                        "ServiceProfile": {
                            "SelectedIdentifier": {"InternalId": "11111111-1111-1111-1111-111111111111"},
                            "Name": "System Service Profile"
                        },
                        "Backup": {
                            "Target": {"SelectedTarget": {"Identifier": "00000000-0000-0000-0000-000000000000"}},
                            "Scheduler": {
                                "RunningTime": {
                                    "SchedulePeriodType": 1,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                },
                                "Retry": {"ShouldRetryOnFailure": true, "RetryIntervalInMinutes": 10},
                                "Window": {
                                    "ShouldTerminateIfExceedsWindow": false,
                                    "WeeklyWindow": {"Days": [{"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}]}
                                }
                            },
                            "Scripting": {"PostScript": {"Command": "", "Parameters": "", "TimeoutInSeconds": 0}},
                            "DeleteBackup": {"RestorePointRange": 1}
                        },
                        "IsBackupEnabled": true
                    },
                    "Defaults": {
                        "TargetComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        },
                        "FailoverNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                "InternalType": "Network",
                                "InternalName": "network-11"
                            }, "DisplayName": "VM Network"
                        },
                        "TestNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                "InternalType": "Network",
                                "InternalName": "network-11"
                            }, "DisplayName": "VM Network"
                        },
                        "TargetFolder": {
                            "Id": {
                                "InternalFolderName": "group-v131",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DisplayName": "[Default]ZertoRecoveryFolder"
                        },
                        "FailoverVCDVAppNetwork": null,
                        "TestVCDVAppNetwork": null,
                        "RecoveryCloudSettings": null
                    },
                    "ProtectedVappSettings": null,
                    "RecoveryVappSettings": null,
                    "VirtualMachines": [{
                        "InternalVirtualMachineId": {
                            "InternalVmName": "vm-158",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "Name": "kobi-test-vm",
                        "SourceHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                        },
                        "SourceDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-16",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                        },
                        "TargetHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        },
                        "StorageUsageInfo": {
                            "ProvisionedStorageSizeInMB": 121,
                            "UsedStorageSizeInMB": 117,
                            "RecoveryStorageSizeInMB": 0
                        },
                        "Volumes": [{
                            "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                            "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                            "Swap": false,
                            "ProvisionedSizeInMB": 8,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                        "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                                    },
                                    "UnitNumber": 0,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:0)"
                                },
                                "Settings": {
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "IsThin": false,
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-15",
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                            }
                                        }
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": false
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
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        }, "DisplayName": "VM Network"
                                    }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                }, "VCDNetworkSettings": null
                            },
                            "TestSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        }, "DisplayName": "VM Network"
                                    }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                }, "VCDNetworkSettings": null
                            },
                            "IsIPConfigurationEnabled": false,
                            "MacAddress": "00:50:56:ac:44:fa",
                            "vmId": {
                                "InternalVmName": "vm-158",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "id": "vm-15800:50:56:ac:44:fa",
                            "vmName": "kobi-test-vm",
                            "nicName": "Network adapter 1",
                            "ProtectedNetwork": "VM Network",
                            "FailoverNetwork": "VM Network",
                            "FailoverIp": "",
                            "TestNetwork": "VM Network",
                            "TestIP": "",
                            "isInMultiNicVM": false
                        }],
                        "CloudVmSettings": null,
                        "TargetFolder": {
                            "Id": {
                                "InternalFolderName": "group-v131",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DisplayName": "[Default]ZertoRecoveryFolder"
                        },
                        "StorageProfile": null,
                        "JournalHardLimit": {"Type": 0},
                        "JournalWarningThreshold": {"Type": 0},
                        "JournalDatastores": [{
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        }]
                    }],
                    "OwnersId": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                    "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
                },
                "TargetSiteInfo": {
                    "OwnersId": {
                        "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                        "DisplayName": "gui_local_vcd (Local)",
                        "IsLocal": true
                    },
                    "PotentialReplicationDestinations": [{
                        "ComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
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
                                "InternalName": "resgroup-157",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "DisplayName": "RP:Cluster PVDC2"
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
                    }],
                    "VCDVirtualDatacenters": [{
                        "VirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724"
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
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:network:eee3536e-a889-4e55-8332-bfe4aeff8c08"
                            },
                            "FenceMode": {"FenceModeType": 2},
                            "IpScope": null,
                            "NetworkName": "NoamNetworkIso",
                            "OrgNetwork": null,
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": null,
                            "FenceMode": {"FenceModeType": 0},
                            "IpScope": null,
                            "NetworkName": "none",
                            "OrgNetwork": null,
                            "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}]
                        }],
                        "IsThinProvision": true
                    }, {
                        "VirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:2c7e1564-54f8-4b29-960e-23be9f24dd74"
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
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": null,
                            "FenceMode": {"FenceModeType": 0},
                            "IpScope": null,
                            "NetworkName": "none",
                            "OrgNetwork": null,
                            "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}]
                        }],
                        "IsThinProvision": true
                    }],
                    "PotentialServiceProfiles": [{
                        "Identifier": {"InternalId": "0f50774a-8d90-48de-81db-e5d5dd116bc2"},
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
                    "PotentialPublicCloudPcns": {
                        "PotentialPcns": [],
                        "DefaultVpc": {"Identifier": "5ca76c0d-b62f-424d-9ca1-4fa8beab4f8c"}
                    },
                    "IsConnected": true,
                    "IsPrePostScriptsEnabled": true,
                    "PotentialBackupTargets": [{
                        "Identifier": {"Identifier": "20000000-0000-0000-0000-000000000000"},
                        "DisplayName": "None",
                        "IsDefault": true,
                        "IsCompressionEnabled": true
                    }],
                    "PotentialReplicationSiteInitialInfo": {
                        "OwnersId": {
                            "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                            "DisplayName": "gui_local_vcd (Local)",
                            "IsLocal": true
                        },
                        "SiteId": {"SiteGuid": "20805526-536c-4291-874b-d80939cf5e87"},
                        "IsConnected": true,
                        "IsVCenterEnabled": true,
                        "IsVCDEnabled": true,
                        "IsScvmmEnabled": false,
                        "IsPublicCloud": false
                    }
                },
                "ProtectionGroupId": null,
                "Entities": {"Source": 0, "Target": 0},
                "ConfigurationFlags": {
                    "IsStorageProfileEnabled": false,
                    "IsCompressionConfigurable": true,
                    "IsVmFolderConfigurable": true,
                    "IsBackupFeatureSupported": true
                },
                "PotentialZertoOrganization": [{
                    "Identifier": {"Guid": "a8a0c687-066a-4377-a8d2-2a1ccfc70631"},
                    "OrganizationName": "guy",
                    "CrmIdentifier": "cxcx"
                }, {
                    "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                    "OrganizationName": "No Organization",
                    "CrmIdentifier": "No Contact"
                }],
                "IsEnableVmJournalDatastoreSelection": true
            }
        };
        expect(factory.validateBackupStep(steps[6])).toBeFalsy();
        expect(steps[6].validationComponents).toEqual([{ id: 'repository', error: 'CREATE_VPG_BACKUP.ERROR_REP' },{id: 'retryTimes', error: 'CREATE_VPG_BACKUP.ERROR_RETRY'}]);
        model.data = {
            "defaultVpgSettings": {
                "Config": {
                    "Name": "xxx",
                    "Configuration": {
                        "Priority": 1,
                        "MinimalJournalLenghtInMinutes": 240,
                        "RPOThressholdInSeconds": 300,
                        "MaxTestIntervalInMinutes": 0,
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
                            "JournalHardLimitPerVM": {"Type": 0},
                            "JournalWarningThresholdPerVM": {"Type": 0}
                        },
                        "BootOrder": {
                            "Groups": [{
                                "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                                "Name": "Default",
                                "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                                "Machines": [{
                                    "DisplayName": "kobi-test-vm",
                                    "Id": {
                                        "InternalVmName": "vm-158",
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                    },
                                    "SizeInMb": 121,
                                    "id": 0,
                                    "SizeInMbFiltered": "121.0 MB"
                                }]
                            }]
                        },
                        "ServiceProfile": {
                            "SelectedIdentifier": {"InternalId": "11111111-1111-1111-1111-111111111111"},
                            "Name": "System Service Profile"
                        },
                        "Backup": {
                            "Target": {"SelectedTarget": {"Identifier": "20000000-0000-0000-0000-000000000000"}},
                            "Scheduler": {
                                "RunningTime": {
                                    "SchedulePeriodType": 1,
                                    "RunningTimeOfDayInMinutes": 0,
                                    "DayOfWeek": 6
                                },
                                "Retry": {"ShouldRetryOnFailure": true, "RetryTimes": 2, "RetryIntervalInMinutes": 10},
                                "Window": {
                                    "ShouldTerminateIfExceedsWindow": false,
                                    "WeeklyWindow": {"Days": [{"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}, {"Hours": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]}]}
                                }
                            },
                            "Scripting": {"PostScript": {"Command": "", "Parameters": "", "TimeoutInSeconds": 0}},
                            "DeleteBackup": {"RestorePointRange": 1}
                        },
                        "IsBackupEnabled": true
                    },
                    "Defaults": {
                        "TargetComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        },
                        "FailoverNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                "InternalType": "Network",
                                "InternalName": "network-11"
                            }, "DisplayName": "VM Network"
                        },
                        "TestNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                "InternalType": "Network",
                                "InternalName": "network-11"
                            }, "DisplayName": "VM Network"
                        },
                        "TargetFolder": {
                            "Id": {
                                "InternalFolderName": "group-v131",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DisplayName": "[Default]ZertoRecoveryFolder"
                        },
                        "FailoverVCDVAppNetwork": null,
                        "TestVCDVAppNetwork": null,
                        "RecoveryCloudSettings": null
                    },
                    "ProtectedVappSettings": null,
                    "RecoveryVappSettings": null,
                    "VirtualMachines": [{
                        "InternalVirtualMachineId": {
                            "InternalVmName": "vm-158",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        },
                        "Name": "kobi-test-vm",
                        "SourceHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                        },
                        "SourceDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-16",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                        },
                        "TargetHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        },
                        "StorageUsageInfo": {
                            "ProvisionedStorageSizeInMB": 121,
                            "UsedStorageSizeInMB": 117,
                            "RecoveryStorageSizeInMB": 0
                        },
                        "Volumes": [{
                            "SourceAddress": "[ZNest83Datastore]:kobi-test-vm_1/kobi-test-vm.vmdk",
                            "TargetAddress": "datastore1 (1) (390MB / 0.50GB Free)",
                            "Swap": false,
                            "ProvisionedSizeInMB": 8,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "56 4d 43 33 36 7e 19 a3-27 8f 66 c4 5e ea 1e 83",
                                        "InstanceUuid": "52 39 06 73 9d 16 73 94-cf 1c 75 0f 30 82 93 6e"
                                    },
                                    "UnitNumber": 0,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:0)"
                                },
                                "Settings": {
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "IsThin": false,
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-15",
                                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                                            }
                                        }
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": false
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
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        }, "DisplayName": "VM Network"
                                    }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                }, "VCDNetworkSettings": null
                            },
                            "TestSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                            "InternalType": "Network",
                                            "InternalName": "network-11"
                                        }, "DisplayName": "VM Network"
                                    }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                }, "VCDNetworkSettings": null
                            },
                            "IsIPConfigurationEnabled": false,
                            "MacAddress": "00:50:56:ac:44:fa",
                            "vmId": {
                                "InternalVmName": "vm-158",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "id": "vm-15800:50:56:ac:44:fa",
                            "vmName": "kobi-test-vm",
                            "nicName": "Network adapter 1",
                            "ProtectedNetwork": "VM Network",
                            "FailoverNetwork": "VM Network",
                            "FailoverIp": "",
                            "TestNetwork": "VM Network",
                            "TestIP": "",
                            "isInMultiNicVM": false
                        }],
                        "CloudVmSettings": null,
                        "TargetFolder": {
                            "Id": {
                                "InternalFolderName": "group-v131",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DisplayName": "[Default]ZertoRecoveryFolder"
                        },
                        "StorageProfile": null,
                        "JournalHardLimit": {"Type": 0},
                        "JournalWarningThreshold": {"Type": 0},
                        "JournalDatastores": [{
                            "Id": {
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (390MB / 0.50GB Free)"
                        }]
                    }],
                    "OwnersId": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                    "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
                },
                "TargetSiteInfo": {
                    "OwnersId": {
                        "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                        "DisplayName": "gui_local_vcd (Local)",
                        "IsLocal": true
                    },
                    "PotentialReplicationDestinations": [{
                        "ComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
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
                                "InternalName": "resgroup-157",
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            },
                            "DisplayName": "RP:Cluster PVDC2"
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
                    }],
                    "VCDVirtualDatacenters": [{
                        "VirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724"
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
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:network:eee3536e-a889-4e55-8332-bfe4aeff8c08"
                            },
                            "FenceMode": {"FenceModeType": 2},
                            "IpScope": null,
                            "NetworkName": "NoamNetworkIso",
                            "OrgNetwork": null,
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": null,
                            "FenceMode": {"FenceModeType": 0},
                            "IpScope": null,
                            "NetworkName": "none",
                            "OrgNetwork": null,
                            "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}]
                        }],
                        "IsThinProvision": true
                    }, {
                        "VirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:2c7e1564-54f8-4b29-960e-23be9f24dd74"
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
                            "IpScopes": []
                        }, {
                            "RecoveryOrganizationVCDOrgNetwork": null,
                            "FenceMode": {"FenceModeType": 0},
                            "IpScope": null,
                            "NetworkName": "none",
                            "OrgNetwork": null,
                            "IpScopes": [{"Netmask": "0.0.0.0", "Gateway": "0.0.0.0", "IpRanges": []}]
                        }],
                        "IsThinProvision": true
                    }],
                    "PotentialServiceProfiles": [{
                        "Identifier": {"InternalId": "0f50774a-8d90-48de-81db-e5d5dd116bc2"},
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
                    "PotentialPublicCloudPcns": {
                        "PotentialPcns": [],
                        "DefaultVpc": {"Identifier": "5ca76c0d-b62f-424d-9ca1-4fa8beab4f8c"}
                    },
                    "IsConnected": true,
                    "IsPrePostScriptsEnabled": true,
                    "PotentialBackupTargets": [{
                        "Identifier": {"Identifier": "20000000-0000-0000-0000-000000000000"},
                        "DisplayName": "None",
                        "IsDefault": true,
                        "IsCompressionEnabled": true
                    }],
                    "PotentialReplicationSiteInitialInfo": {
                        "OwnersId": {
                            "Id": {"OwnersGuid": "5aab4a04-d111-453e-85ad-d91eb784b059"},
                            "DisplayName": "gui_local_vcd (Local)",
                            "IsLocal": true
                        },
                        "SiteId": {"SiteGuid": "20805526-536c-4291-874b-d80939cf5e87"},
                        "IsConnected": true,
                        "IsVCenterEnabled": true,
                        "IsVCDEnabled": true,
                        "IsScvmmEnabled": false,
                        "IsPublicCloud": false
                    }
                },
                "ProtectionGroupId": null,
                "Entities": {"Source": 0, "Target": 0},
                "ConfigurationFlags": {
                    "IsStorageProfileEnabled": false,
                    "IsCompressionConfigurable": true,
                    "IsVmFolderConfigurable": true,
                    "IsBackupFeatureSupported": true
                },
                "PotentialZertoOrganization": [{
                    "Identifier": {"Guid": "a8a0c687-066a-4377-a8d2-2a1ccfc70631"},
                    "OrganizationName": "guy",
                    "CrmIdentifier": "cxcx"
                }, {
                    "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                    "OrganizationName": "No Organization",
                    "CrmIdentifier": "No Contact"
                }],
                "IsEnableVmJournalDatastoreSelection": true
            }
        };
        expect(factory.validateBackupStep(steps[6])).toBeTruthy();
    });
});
