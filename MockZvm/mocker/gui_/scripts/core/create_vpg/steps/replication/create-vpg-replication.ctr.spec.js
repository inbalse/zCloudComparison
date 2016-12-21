'use strict';

describe('createVPGReplicationContollerTest', function () {
    var controller, scope, model, enums, dataCollections, advacedJournalSettingsFct, defaultVpgSettings,zAlertFactory, globalConstants;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _createVPGModel_, _enums_, _dataCollectionFactory_, _advancedJournalSettingsFactory_, _toastr_,_zAlertFactory_,_globalConstants_) {
        scope = $rootScope.$new();
        globalConstants = _globalConstants_;
        model = jasmine.createSpyObj('createVPGModel', ['initTargetSiteTypeCollection', 'defaultJournalHistoryInit', 'getDefaultVPGSettings', 'applyDefaultHost', 'getPotentials', 'applyDefaultDatastore', 'initTargetSite', 'handleChangingDefaultValues','applyServiceProfile']);
        defaultVpgSettings = {
            "Config": {
                "Name": "dffdg",
                "Configuration": {
                    "Priority": 1,
                    "MinimalJournalLenghtInMinutes": 300,
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
                        "JournalDatastore": {
                            "DisplayName": "Default",
                            "Id": {"InternalDatastoreName": "default-datastore"}
                        },
                        "JournalHardLimitPerVM": {"Type": 0, "Limit": 0},
                        "JournalWarningThresholdPerVM": {"Type": 0, "Limit": 0}
                    },
                    "BootOrder": {
                        "Groups": [{
                            "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                            "Name": "Default",
                            "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                            "Machines": []
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
                            "VCDId": "urn:vcloud:vapp:87817a3c-cbbc-446d-8497-2ee07d11404e"
                        },
                        "OrgVirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724"
                            }, "DisplayName": "NoamOrgVCD2"
                        }
                    }
                },
                "RecoveryVappSettings": {
                    "VCDVappSettings": {
                        "OrgVdcNetworkMapping": [{
                            "OriginalOrgVdcNetworkValue": {
                                "Id": {
                                    "Id": "00000000-0000-0000-0000-000000000000",
                                    "VCDId": "urn:vcloud:network:2986498e-09d7-4e5b-b989-e8d0ecce23c4"
                                }, "DisplayName": "externalNetwork"
                            },
                            "ReverseReplicationTestOrgVdcNetworkValue": {"Id": null, "DisplayName": "[Isolated]"},
                            "RecoveryOrgVdcNetworkValue": null,
                            "RecoveryTestOrgVdcNetworkValue": {"Id": null, "DisplayName": "[Isolated]"}
                        }],
                        "TargetVirtualDatacenter": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdc:2c7e1564-54f8-4b29-960e-23be9f24dd74"
                            }, "DisplayName": "orgvdc"
                        },
                        "VCDVAppNetworks": [{
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
                        }]
                    }
                },
                "VirtualMachines": [{
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-44",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    },
                    "Name": "NoamVcdVappVm31 (03178532-5110-49d2-aab4-6ffdc172f891)",
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
                    "TargetHost": null,
                    "TargetDatastore": null,
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 218,
                        "UsedStorageSizeInMB": 2,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest83Datastore]:noam1 (03178532-5110-49d2-aab4-6ffdc172f891)/noam1 (03178532-5110-49d2-aab4-6ffdc172f891).vmdk",
                        "TargetAddress": null,
                        "Swap": false,
                        "ProvisionedSizeInMB": 2,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 2c 00 c5 bf b7 cf 3f-f5 e2 78 43 c7 88 7c 92",
                                    "InstanceUuid": "50 2c c1 7e 9b 4d bf 7a-0c 96 a2 66 42 8d 9c 7d"
                                },
                                "UnitNumber": 0,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:0)"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {"VCDDatastore": {"IsThin": true}}
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
                                "MacAddress": "00:50:56:03:00:02",
                                "IsPrimary": true,
                                "IsConnected": false,
                                "IPMode": {"IpModeType": 3},
                                "VappNetworkName": "none",
                                "IpAddress": null
                            }
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": null,
                            "VCDNetworkSettings": {
                                "NicInfo": {
                                    "VNicIdentifier": {"Name": "Network adapter 1"},
                                    "MacAddress": "00:50:56:03:00:02",
                                    "IsPrimary": true,
                                    "IsConnected": false,
                                    "IPMode": {"IpModeType": 3},
                                    "VappNetworkName": "none",
                                    "IpAddress": null
                                }, "NewMacAddress": null
                            }
                        },
                        "TestSettings": {
                            "VCenterNetworkSettings": null,
                            "VCDNetworkSettings": {
                                "NicInfo": {
                                    "VNicIdentifier": {"Name": "Network adapter 1"},
                                    "MacAddress": "00:50:56:03:00:02",
                                    "IsPrimary": true,
                                    "IsConnected": false,
                                    "IPMode": {"IpModeType": 3},
                                    "VappNetworkName": "none",
                                    "IpAddress": null
                                }, "NewMacAddress": null
                            }
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:03:00:02"
                    }],
                    "CloudVmSettings": null,
                    "TargetFolder": null,
                    "StorageProfile": {
                        "VCDStorageProfile": {
                            "Id": {
                                "Id": "00000000-0000-0000-0000-000000000000",
                                "VCDId": "urn:vcloud:vdcstorageProfile:e65e49c9-5d31-4480-9482-6c9f0899752b"
                            }, "DisplayName": "Storage Policy", "Enabled": true
                        }
                    },
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [],
                    "_isNewVm": true
                }],
                "OwnersId": {"OwnersGuid": "7a3c500d-711a-406b-a9fb-d4cc56f3078f"},
                "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
            },
            "TargetSiteInfo": {
                "OwnersId": {
                    "Id": {"OwnersGuid": "7a3c500d-711a-406b-a9fb-d4cc56f3078f"},
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
                "PotentialServiceProfiles": [
                    {
                        "Identifier":{
                            "InternalId":"0b9b8de0-141e-46ef-a480-6ab37e766b62"
                        },
                        "Name":"System Service Profile"
                        ,"Rpo":{
                        "RpoInSeconds":300,
                        "DisplayName":"5 minutes"},
                        "History":{
                            "HistoryInMinutes":1440,
                            "DisplayName":"24 hours"
                        },
                        "MaxJournalSize":{
                            "MaxJournalSizeInPercent":75,
                            "DisplayName":"75%"
                        },
                        "WarningThreshold":{
                            "JournalWarningThresholdInPercent":50,
                            "DisplayName":"50%"
                        },
                        "TestInterval":{
                            "TestIntervalInMinutes":0,
                            "DisplayName":"None"
                        },
                        "Description":"System Service Profile",
                        "IsEditable":false,
                        "RetentionPolicy":{
                            "RetentionPolicy":0,
                            "DisplayName":"Disaster Recovery"
                        },
                        "RestorePointRange":{
                            "RestorePointRange":1,
                            "DisplayName":"1 Month"
                        },
                        "BackupScheduledPeriod":{
                            "SchedulePeriodType":0,
                            "DayOfWeek":6
                        }
                    },
                    {
                        "Identifier":{
                            "InternalId":"c0ddd455-05e2-4d6f-9b04-14d8ac93b123"
                        },"Name":"sp]","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":7200,"DisplayName":"120 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":0,"DisplayName":"Unlimited"},"WarningThreshold":{"JournalWarningThresholdInPercent":50,"DisplayName":"50%"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"test","IsEditable":false,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":1,"DayOfWeek":6}},{"Identifier":{"InternalId":"11111111-1111-1111-1111-111111111111"},"Name":"Custom","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":7200,"DisplayName":"120 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":0,"DisplayName":"Unlimited"},"WarningThreshold":{"JournalWarningThresholdInPercent":0,"DisplayName":"Unlimited"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"Custom Service Profile","IsEditable":true,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":1,"DayOfWeek":6}},
                    {
                        "Identifier":{
                            "InternalId":"c0ddd455-05e2-4d6f-9b04-14d8ac93bfb7"
                        },"Name":"test","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":7200,"DisplayName":"120 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":69,"DisplayName":"69%"},"WarningThreshold":{"JournalWarningThresholdInPercent":50,"DisplayName":"50%"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"test","IsEditable":false,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":1,"DayOfWeek":6}},{"Identifier":{"InternalId":"11111111-1111-1111-1111-111111111111"},"Name":"Custom","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":7200,"DisplayName":"120 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":0,"DisplayName":"Unlimited"},"WarningThreshold":{"JournalWarningThresholdInPercent":0,"DisplayName":"Unlimited"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"Custom Service Profile","IsEditable":true,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":1,"DayOfWeek":6}}],
                "PotentialPublicCloudPcns": {"PotentialPcns": []},
                "IsConnected": true,
                "IsPrePostScriptsEnabled": true,
                "PotentialBackupTargets": [{
                    "Identifier": {"Identifier": "c7df145d-ade5-43ee-ac86-b638b016dadc"},
                    "DisplayName": "test",
                    "IsDefault": true,
                    "IsCompressionEnabled": true
                }, {
                    "Identifier": {"Identifier": "00000000-0000-0000-0000-000000000000"},
                    "DisplayName": "None",
                    "IsDefault": false,
                    "IsCompressionEnabled": true
                }],
                "PotentialReplicationSiteInitialInfo": {
                    "OwnersId": {
                        "Id": {"OwnersGuid": "7a3c500d-711a-406b-a9fb-d4cc56f3078f"},
                        "DisplayName": "gui_local_vcd (Local)",
                        "IsLocal": true
                    },
                    "SiteId": {"SiteGuid": "25d571cc-8dce-428f-9ca6-32dd03d56d30"},
                    "IsConnected": true,
                    "IsVCenterEnabled": true,
                    "IsVCDEnabled": true,
                    "IsScvmmEnabled": false,
                    "IsPublicCloud": false
                }
            },
            "ProtectionGroupId": null,
            "Entities": {"Source": 2, "Target": 2},
            "ConfigurationFlags": {
                "IsStorageProfileEnabled": true,
                "IsCompressionConfigurable": true,
                "IsVmFolderConfigurable": true,
                "IsBackupFeatureSupported": true
            },
            "PotentialZertoOrganization": [{
                "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                "OrganizationName": "No Organization",
                "CrmIdentifier": "No Contact"
            }],
            "IsEnableVmJournalDatastoreSelection": true,
            "protectedVms" : [{}]
        };
        model.data = {
            id: 1,
            sourceSiteType: {},
            initialSitesInfo: {},
            defaultVpgSettings: defaultVpgSettings,
            defaultJournal: undefined
        };

        enums = _enums_;

        zAlertFactory = _zAlertFactory_;

        dataCollections = _dataCollectionFactory_;
        advacedJournalSettingsFct = {
            'openWindow': function () {
                return {
                    'then': function () {
                    }
                };
            }
        };
        spyOn(advacedJournalSettingsFct, 'openWindow').and.callThrough();

        scope.$parent.restoreSteps = angular.noop;
        scope.$parent.removePublicCloudSteps = angular.noop;


        spyOn(scope, '$watch').and.callThrough();
        controller = $controller('createVPGReplicationContoller', {
            $scope: scope,
            createVPGModel: model,
            enums: enums,
            dataCollectionFactory: dataCollections,
            advancedJournalSettingsFactory: advacedJournalSettingsFct,
            toastr: _toastr_
        });
        scope.$emit = function () {
            return '';
        };
    }));

    it('should init site type collection when target site is selected', function () {
        scope.data.targetSite = {};
        scope.data.potenaialSiteTypes = [];
        scope._private._handleTargetSiteChange({Id: 12});
        expect(model.initTargetSiteTypeCollection).toHaveBeenCalled();
    });

    it('should get default VPG settings when site type changes', function () {

        scope.data.targetSiteType = {value: 123};
        scope.data.targetSite = {SiteId: 123};
        scope._private._handleSiteTypeChange({SiteId: 1233254});
        expect(model.getDefaultVPGSettings).toHaveBeenCalled();
    });

    it('should open advanced journal settings window when a button is clicked', function () {
        scope.handleAdvancedJournalSettingsClicked();
        expect(advacedJournalSettingsFct.openWindow).toHaveBeenCalled();
    });

    it('should have the same data as in the model', function () {
        expect(scope.data).toEqual({
            id: 1,
            sourceSiteType: {},
            initialSitesInfo: {},
            defaultVpgSettings: defaultVpgSettings,
            defaultJournal: undefined
        });
    });

    it('should set isJournalMissing flag to true when selectedVms have no Journal datastore', function () {
        scope.data.protectedVms = [{
            "InternalVirtualMachineId": {
                "InternalVmName": "vm-44",
                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
            },
            "Name": "NoamVcdVappVm31 (03178532-5110-49d2-aab4-6ffdc172f891)",
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
            "TargetHost": null,
            "TargetDatastore": null,
            "StorageUsageInfo": {
                "ProvisionedStorageSizeInMB": 218,
                "UsedStorageSizeInMB": 2,
                "RecoveryStorageSizeInMB": 0
            },
            "Volumes": [{
                "SourceAddress": "[ZNest83Datastore]:noam1 (03178532-5110-49d2-aab4-6ffdc172f891)/noam1 (03178532-5110-49d2-aab4-6ffdc172f891).vmdk",
                "TargetAddress": null,
                "Swap": false,
                "ProvisionedSizeInMB": 2,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "42 2c 00 c5 bf b7 cf 3f-f5 e2 78 43 c7 88 7c 92",
                            "InstanceUuid": "50 2c c1 7e 9b 4d bf 7a-0c 96 a2 66 42 8d 9c 7d"
                        },
                        "UnitNumber": 0,
                        "ControllerNumber": 0,
                        "VolumeType": 0,
                        "DlpDescription": "Scsi(0:0)"
                    },
                    "Settings": {
                        "IsSwap": false,
                        "VolumeReplicationDestination": {"VCDDatastore": {"IsThin": true}}
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
                        "MacAddress": "00:50:56:03:00:02",
                        "IsPrimary": true,
                        "IsConnected": false,
                        "IPMode": {"IpModeType": 3},
                        "VappNetworkName": "none",
                        "IpAddress": null
                    }
                },
                "FailoverSettings": {
                    "VCenterNetworkSettings": null,
                    "VCDNetworkSettings": {
                        "NicInfo": {
                            "VNicIdentifier": {"Name": "Network adapter 1"},
                            "MacAddress": "00:50:56:03:00:02",
                            "IsPrimary": true,
                            "IsConnected": false,
                            "IPMode": {"IpModeType": 3},
                            "VappNetworkName": "none",
                            "IpAddress": null
                        }, "NewMacAddress": null
                    }
                },
                "TestSettings": {
                    "VCenterNetworkSettings": null,
                    "VCDNetworkSettings": {
                        "NicInfo": {
                            "VNicIdentifier": {"Name": "Network adapter 1"},
                            "MacAddress": "00:50:56:03:00:02",
                            "IsPrimary": true,
                            "IsConnected": false,
                            "IPMode": {"IpModeType": 3},
                            "VappNetworkName": "none",
                            "IpAddress": null
                        }, "NewMacAddress": null
                    }
                },
                "IsIPConfigurationEnabled": false,
                "MacAddress": "00:50:56:03:00:02"
            }],
            "CloudVmSettings": null,
            "TargetFolder": null,
            "StorageProfile": {
                "VCDStorageProfile": {
                    "Id": {
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "VCDId": "urn:vcloud:vdcstorageProfile:e65e49c9-5d31-4480-9482-6c9f0899752b"
                    }, "DisplayName": "Storage Policy", "Enabled": true
                }
            },
            "JournalHardLimit": {"Type": 0, "Limit": 0},
            "JournalWarningThreshold": {"Type": 0, "Limit": 0},
            "JournalDatastores": [],
            "_isNewVm": false
        }];
        scope.data.isEdit = true;
        scope.data.targetSiteType = enums.VpgEntityType.VCDvApp;

        scope._private.validateJournalExistence();
        expect(scope.isJournalMissing).toBeTruthy();
    });

    it('get potentials after target host is changed', function () {
        var bcr = 'bcr';
        var host = {ComputeResource: {BaseComputeResourceIdentifier: bcr}};
        var site = {OwnersId: 'id'};
        model.data.targetHost = host;
        model.data.targetSite = site;
        scope._private._handleTargetHostChange('foo', 'bar');
        expect(model.applyDefaultHost).toHaveBeenCalledWith(host.ComputeResource);
        expect(model.getPotentials).toHaveBeenCalledWith(undefined, site.OwnersId.Id, bcr);
    });

    it('should show a warning when selecting a zorg without custom profile', function(){
        model.toggleCustomServiceProfile = function(){};

        defaultVpgSettings.TargetSiteInfo.PotentialServiceProfiles = [{"Identifier":{"InternalId":"366dbd44-0402-4293-906e-b2b2b8bd2a63"},"Name":"System Service Profile","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":1440,"DisplayName":"24 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":75,"DisplayName":"75%"},"WarningThreshold":{"JournalWarningThresholdInPercent":50,"DisplayName":"50%"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"System Service Profile","IsEditable":false,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":0,"DayOfWeek":6}},{"Identifier":{"InternalId":"a64503cf-e9cd-4e0b-a18b-8a973baaa63d"},"Name":"test","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":1440,"DisplayName":"24 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":75,"DisplayName":"75%"},"WarningThreshold":{"JournalWarningThresholdInPercent":50,"DisplayName":"50%"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"test","IsEditable":false,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":1,"DayOfWeek":6}},{"Identifier":{"InternalId":"522f39c4-14f5-48c4-990a-f979cc972e5f"},"Name":"test3","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":1440,"DisplayName":"24 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":78,"DisplayName":"78%"},"WarningThreshold":{"JournalWarningThresholdInPercent":50,"DisplayName":"50%"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"test3","IsEditable":false,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":1,"DayOfWeek":6}},{"Identifier":{"InternalId":"11111111-1111-1111-1111-111111111111"},"Name":"Custom","Rpo":{"RpoInSeconds":300,"DisplayName":"5 minutes"},"History":{"HistoryInMinutes":1440,"DisplayName":"24 hours"},"MaxJournalSize":{"MaxJournalSizeInPercent":0,"DisplayName":"Unlimited"},"WarningThreshold":{"JournalWarningThresholdInPercent":0,"DisplayName":"Unlimited"},"TestInterval":{"TestIntervalInMinutes":0,"DisplayName":"None"},"Description":"Custom Service Profile","IsEditable":true,"RetentionPolicy":{"RetentionPolicy":0,"DisplayName":"Disaster Recovery"},"RestorePointRange":{"RestorePointRange":1,"DisplayName":"1 Month"},"BackupScheduledPeriod":{"SchedulePeriodType":1,"DayOfWeek":6}}];
        defaultVpgSettings.PotentialZertoOrganization = [{"Identifier":{"Guid":"b8c9ec6b-5d2a-4e9d-9de9-57ba9fcc3de0"},"OrganizationName":"zorg1","CrmIdentifier":"zorg1","EnableCustomProfile":true},{"Identifier":{"Guid":"d0dcce07-acc0-4a79-a808-49a63862c141"},"OrganizationName":"zorg2","CrmIdentifier":"zorg2","EnableCustomProfile":false},{"Identifier":{"Guid":"2e521bd8-9271-4efd-a77e-9a1055dc84df"},"OrganizationName":"zorg3","CrmIdentifier":"zorg3","EnableCustomProfile":true},{"Identifier":{"Guid":"00000000-0000-0000-0000-000000000000"},"OrganizationName":"No Organization","CrmIdentifier":"No Contact","EnableCustomProfile":true}];
        scope.data.selectedZORG = defaultVpgSettings.PotentialZertoOrganization[0];
        scope.data.serviceProfile = defaultVpgSettings.TargetSiteInfo.PotentialServiceProfiles[3];
        scope.$digest();
        spyOn(zAlertFactory,'warn');
        scope.data.selectedZORG = defaultVpgSettings.PotentialZertoOrganization[1];
        scope.$digest();
        expect(zAlertFactory.warn).toHaveBeenCalled();

    });

    describe('service profiles selection', function(){
        beforeEach(function() {
            scope.data.isEdit = model.data.isEdit = true;
            scope.data.defaultVpgSettings.Config.Configuration.ServiceProfile  = {
                "SelectedIdentifier": {
                    "InternalId": "0b9b8de0-141e-46ef-a480-6ab37e766b62"
                },
                "Name": "test"
            };
            var currentServiceProfileIdentifier = model.data.defaultVpgSettings.Config.Configuration.ServiceProfile.SelectedIdentifier;
            scope.currentMaxJournalSize = _.result(_.find(model.data.defaultVpgSettings.TargetSiteInfo.PotentialServiceProfiles, {Identifier: currentServiceProfileIdentifier}), 'MaxJournalSize');

        });

        it('should display a warning when selecting service profile with lower journal hard limit', function(){

            spyOn(zAlertFactory,'warn');
            scope.$digest();
            scope.data.defaultVpgSettings.Config.Configuration.ServiceProfile = {
                "SelectedIdentifier": {
                    "InternalId": "c0ddd455-05e2-4d6f-9b04-14d8ac93bfb7"
                },
                "Name": "sp]"
            };
            scope.$digest();

            expect(zAlertFactory.warn).toHaveBeenCalled();
        });

        it('should display a warning when selecting service profile with journal hard limit and current service profile is unlimited', function(){

            spyOn(zAlertFactory,'warn');
            scope.data.defaultVpgSettings.Config.Configuration.ServiceProfile = {
                "SelectedIdentifier": {
                    "InternalId": "c0ddd455-05e2-4d6f-9b04-14d8ac93b123"
                },
                "Name": "sp]"
            };
            scope.currentMaxJournalSize = _.result(_.find(model.data.defaultVpgSettings.TargetSiteInfo.PotentialServiceProfiles, {Identifier: scope.data.defaultVpgSettings.Config.Configuration.ServiceProfile.SelectedIdentifier}), 'MaxJournalSize');

            scope.$digest();
            scope.data.defaultVpgSettings.Config.Configuration.ServiceProfile = {
                "SelectedIdentifier":{
                    "InternalId":"0b9b8de0-141e-46ef-a480-6ab37e766b62"
                },
                "Name":"System Service Profile"
            };

            scope.$digest();

            expect(zAlertFactory.warn).toHaveBeenCalled();
        });

        it('should not warn about service profile change when new service profile is 0 (unlimited)', function(){
            spyOn(zAlertFactory,'warn');
            scope.$digest();
            scope.data.defaultVpgSettings.Config.Configuration.ServiceProfile = {
                "SelectedIdentifier": {
                    "InternalId": "c0ddd455-05e2-4d6f-9b04-14d8ac93b123"
                },
                "Name": "sp]123"
            };
            scope.$digest();

            expect(zAlertFactory.warn).not.toHaveBeenCalled();
        });

        it('should not warn when a new vpg is created', function() {
            scope.data.isEdit = model.data.isEdit = false;
            spyOn(zAlertFactory,'warn');
            scope.$digest();
            scope.data.defaultVpgSettings.Config.Configuration.ServiceProfile = {
                "SelectedIdentifier": {
                    "InternalId": "c0ddd455-05e2-4d6f-9b04-14d8ac93bfb7"
                },
                "Name": "sp]123"
            };
            scope.$digest();

            expect(zAlertFactory.warn).not.toHaveBeenCalled();
        });
    });
    it("should check the organization list not display when only no zorg", function () {
        scope.data.defaultVpgSettings = {PotentialZertoOrganization:[{Identifier:{Guid: globalConstants.NOZORG}}]};
        scope._private.checkZorgListDisplay();
        expect(scope.showZorgList).toBeFalsy();


    });

    it("should check the organization list display when only one real zorg", function () {
        scope.data.defaultVpgSettings = {PotentialZertoOrganization:[{Identifier:{Guid: '1111.1111.1111.111'}}]};
        scope._private.checkZorgListDisplay();
        expect(scope.showZorgList).toBeTruthy();
    });

    it("should check the organization list display when more then one zorg", function () {
        scope.data.defaultVpgSettings = {PotentialZertoOrganization:[{Identifier:{Guid: globalConstants.NOZORG}},{Identifier:{Guid: '1111.1111.1111.111'}}]};
        scope._private.checkZorgListDisplay();
        expect(scope.showZorgList).toBeTruthy();
    });
});
