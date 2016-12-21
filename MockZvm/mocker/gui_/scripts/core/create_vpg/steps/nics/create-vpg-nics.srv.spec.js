'use strict';

describe('Nic step service', function () {
    var createVPGModel, createVpgNicsService, vpgService, networksService, vmsService, createVpgNicVCGridService, createVpgNicVCDGridService, enums;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_createVPGModel_, _createVpgNicsService_, _vpgService_, _networksService_, _vmsService_,
                                _createVpgNicVCGridService_, _createVpgNicVCDGridService_,
                                _enums_) {
        createVpgNicsService = _createVpgNicsService_;
        networksService = _networksService_;
        vpgService = _vpgService_;
        vmsService = _vmsService_;
        createVpgNicVCGridService = _createVpgNicVCGridService_;
        createVpgNicVCDGridService = _createVpgNicVCDGridService_;
        enums = _enums_;
        createVPGModel = _createVPGModel_;
        mockVpgSettings();
    }));

    it('should init the vc grid', function () {
        spyOn(networksService, 'initNicsPerVms');
        spyOn(createVpgNicVCGridService, 'init').and.callThrough();

        var vpgSettings = vpgService.getVpgSettings();
        createVpgNicsService.init();
        expect(networksService.initNicsPerVms).toHaveBeenCalledWith(vmsService.getInitializedSelectedVms());
        expect(createVpgNicVCGridService.init).toHaveBeenCalledWith(vpgSettings.Entities.Source, vpgSettings.Entities.Target);


        expect(createVpgNicsService.getGridObj()).toBeDefined();

    });

    it('should init the vcd grid', function () {
        createVPGModel.data.defaultVpgSettings.Entities.Target = enums.VpgEntityType.VCDvApp;
        spyOn(networksService, 'initVCDNicsList');
        spyOn(createVpgNicVCDGridService, 'init').and.callThrough();

        createVpgNicsService.init();

        expect(networksService.initVCDNicsList).toHaveBeenCalledWith(vmsService.getInitializedSelectedVms());
        expect(createVpgNicVCDGridService.init).toHaveBeenCalledWith(vpgService.isVCDToVCD());
        expect(createVpgNicsService.getGridObj()).toBeDefined();

    });

    it('should return the grid object', function () {
        createVpgNicsService.init();
        var gridObj = createVpgNicsService.getGridObj();
        expect(gridObj).toEqual(jasmine.any(Object));
    });

    it('should update grid date', function () {
        var data = {dummy: true};
        createVpgNicsService.init();

        createVpgNicsService.updateGridData(data);

        var gridObj = createVpgNicsService.getGridObj();

        expect(gridObj.data).toBe(data);

    });

    it('should return the vc vms nics list', function () {
        createVpgNicsService.init();
        spyOn(networksService, 'getVmsNicsList');
        var serviceNicList = createVpgNicsService.getVmsNicsList(),
            networkNicList = networksService.getVmsNicsList();
        expect(networksService.getVmsNicsList).toHaveBeenCalled();
        expect(serviceNicList).toBe(networkNicList);
    });


    it('should return the vcd vms nics list', function () {
        createVPGModel.data.defaultVpgSettings.Entities.Target = enums.VpgEntityType.VCDvApp;
        createVpgNicsService.init();
        spyOn(networksService, 'getVmsVcdNicsList');
        var serviceNicList = createVpgNicsService.getVmsVcdNicsList(),
            networkNicList = networksService.getVmsVcdNicsList();
        expect(networksService.getVmsVcdNicsList).toHaveBeenCalled();
        expect(serviceNicList).toBe(networkNicList);
    });

    it('should save vc nics', function () {
        spyOn(networksService, 'saveNics');

        var nicObject = {dummy: true},
            selectedNics = [1, 2, 3];

        createVpgNicsService.saveNics(nicObject, selectedNics);
        expect(networksService.saveNics).toHaveBeenCalledWith(nicObject, selectedNics);
    });

    it('should save vcd nics', function () {
        spyOn(networksService, 'saveVCDNics');

        var nicObject = {dummy: true},
            selectedNics = [1, 2, 3];

        createVpgNicsService.saveVCDNics(nicObject, selectedNics);
        expect(networksService.saveVCDNics).toHaveBeenCalledWith(nicObject, selectedNics);
    });


    it('should check if target is vcd', function () {
        spyOn(vpgService, 'isVcdVapp');
        var isTargetVCD = createVpgNicsService.isTargetVCD();
        expect(vpgService.isVcdVapp).toHaveBeenCalled();
        expect(isTargetVCD).toEqual(vpgService.isVcdVapp());
    });

    it('should collect selected nics', function () {
        var nicList = [{
                id: 1
            }, {
                id: 22
            }],
            selectedNics = [{
                id: 1
            }];

        var result = createVpgNicsService.collectSelectedNics(selectedNics,nicList);
        expect(result).toEqual([nicList[0]]);

    });


    function mockVpgSettings() {
        createVPGModel.data = {};
        createVPGModel.data.defaultVpgSettings = {
            "Config": {
                "Name": "New VPG",
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
                    "IsBackupEnabled": false
                },
                "Defaults": {
                    "TargetComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    },
                    "FailoverNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                            "InternalType": "Network",
                            "InternalName": "network-11"
                        }, "DisplayName": "VM Network"
                    },
                    "TestNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                            "InternalType": "Network",
                            "InternalName": "network-11"
                        }, "DisplayName": "VM Network"
                    },
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v217",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "Zerto_guy_5763e93b-423e-4f26-bcd6-5449ae89dc13"
                    },
                    "FailoverVCDVAppNetwork": null,
                    "TestVCDVAppNetwork": null
                },
                "ProtectedVappSettings": null,
                "RecoveryVappSettings": null,
                "VirtualMachines": [{
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-288",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "a-000001",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-224",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "public"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 4311,
                        "UsedStorageSizeInMB": 0,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[public]:a-000001/a-000001.vmdk",
                        "TargetAddress": "[ds_cluster]datastore1 (345MB / 0.50GB Free)",
                        "Swap": false,
                        "ProvisionedSizeInMB": 1,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d f1 3d 7d 1e 32 f7-34 c0 3c 3a 5d dc c7 21",
                                    "InstanceUuid": "50 3d 55 3b 05 b4 4f 4b-a8 3b f0 17 1e 35 7a 3b"
                                }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0
                            },
                            "Settings": {
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "IsThin": true,
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }
                                    }
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
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                },
                                "IP": {
                                    "IsDhcp": false,
                                    "StaticIP": "192.168.120.12",
                                    "SubnetMask": "255.255.255.255",
                                    "Gateway": "100.0.0.100",
                                    "PrimaryDns": "xxxxx.com",
                                    "SecondaryDns": "yyyyy.com"
                                },
                                "DnsSuffix": "zzzzz.com",
                                "ShouldReplaceMacAddress": true
                            }, "VCDNetworkSettings": null
                        },
                        "TestSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                }
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": true,
                        "MacAddress": "00:50:56:bd:af:ac"
                    }],
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v41",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    }]
                }, {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-268",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "GUY-bigVM - testing recovery",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 731,
                        "UsedStorageSizeInMB": 0,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest81Datastore]:GUI - Local VRA/6b2f09e9-d087-401a-af45-393e20d543f9/vm-28/GUY-bigVM/GUY-bigVM.vmdk",
                        "TargetAddress": "[ds_cluster]datastore1 (345MB / 0.50GB Free)",
                        "Swap": false,
                        "ProvisionedSizeInMB": 0,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 75 19 aa ca 07 d3-9d db bc e9 48 a7 d0 9a",
                                    "InstanceUuid": "52 7e 43 9c 8b 21 ff 7f-e4 c8 74 05 f4 7b b3 ac"
                                }, "UnitNumber": 1, "ControllerNumber": 0, "VolumeType": 0
                            },
                            "Settings": {
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "IsThin": false,
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
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
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                },
                                "IP": {
                                    "IsDhcp": false,
                                    "StaticIP": "192.168.120.12",
                                    "SubnetMask": "255.255.255.255",
                                    "Gateway": "100.0.0.100",
                                    "PrimaryDns": "xxxxx.com",
                                    "SecondaryDns": "yyyyy.com"
                                },
                                "DnsSuffix": "zzzzz.com",
                                "ShouldReplaceMacAddress": true
                            }, "VCDNetworkSettings": null
                        },
                        "TestSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                }
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": true,
                        "MacAddress": "00:50:56:bd:bb:92"
                    }],
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v41",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    }]
                }, {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-306",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "kobi vm 1(1)(2) - testing recovery",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 222,
                        "UsedStorageSizeInMB": 8,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest81Datastore]:GUI Local VRA/4a3f18ff-22b6-4b6e-83a6-4fb7997e0e27/vm-221/kobi vm 1(1)(2)/kobi vm 1.vmdk",
                        "TargetAddress": "[ds_cluster]datastore1 (345MB / 0.50GB Free)",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d e9 1a 86 f0 28 ab-0e 8d 41 af 3e d8 d2 0b",
                                    "InstanceUuid": "52 40 4f 64 56 b6 82 23-88 36 f7 da 15 03 d9 ea"
                                }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0
                            },
                            "Settings": {
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "IsThin": false,
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
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
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                },
                                "IP": {
                                    "IsDhcp": false,
                                    "StaticIP": "192.168.120.12",
                                    "SubnetMask": "255.255.255.255",
                                    "Gateway": "100.0.0.100",
                                    "PrimaryDns": "xxxxx.com",
                                    "SecondaryDns": "yyyyy.com"
                                },
                                "DnsSuffix": "zzzzz.com",
                                "ShouldReplaceMacAddress": true
                            }, "VCDNetworkSettings": null
                        },
                        "TestSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                }
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": true,
                        "MacAddress": "00:50:56:bd:3d:88"
                    }],
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v41",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    }]
                }, {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-281",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "kobi vm 1(1)(2)(1)(1)",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 222,
                        "UsedStorageSizeInMB": 8,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest81Datastore]:kobi vm 1(1)(2)(1)(1)/kobi vm 1.vmdk",
                        "TargetAddress": "[ds_cluster]datastore1 (345MB / 0.50GB Free)",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d c3 75 fa 1a 9a 6a-39 89 66 7d 7c 98 ed fb",
                                    "InstanceUuid": "52 7a ce 4a f3 50 16 dc-db 5f 2d 0c f9 33 f1 e1"
                                }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0
                            },
                            "Settings": {
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "IsThin": false,
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
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
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                },
                                "IP": {
                                    "IsDhcp": false,
                                    "StaticIP": "192.168.120.12",
                                    "SubnetMask": "255.255.255.255",
                                    "Gateway": "100.0.0.100",
                                    "PrimaryDns": "xxxxx.com",
                                    "SecondaryDns": "yyyyy.com"
                                },
                                "DnsSuffix": "zzzzz.com",
                                "ShouldReplaceMacAddress": true
                            }, "VCDNetworkSettings": null
                        },
                        "TestSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                }
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": true,
                        "MacAddress": "00:50:56:bd:3d:89"
                    }],
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v41",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    }]
                }, {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-297",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "kobi vm 1(1)(2)(1)(1) - testing recovery",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 222,
                        "UsedStorageSizeInMB": 8,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest81Datastore]:GUI Local VRA/9c3f451c-2db1-400f-9c79-783da1984f25/vm-281/kobi vm 1(1)(2)(1)(1)/kobi vm 1.vmdk",
                        "TargetAddress": "[ds_cluster]datastore1 (345MB / 0.50GB Free)",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "56 4d 0f aa db 4b 1d 7a-7f 16 9e 8b 92 f4 37 19",
                                    "InstanceUuid": "52 09 60 45 a5 3a 9e 0c-9d 3e 6e 3d 97 df 14 8e"
                                }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0
                            },
                            "Settings": {
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "IsThin": false,
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
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
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                },
                                "IP": {
                                    "IsDhcp": false,
                                    "StaticIP": "192.168.120.12",
                                    "SubnetMask": "255.255.255.255",
                                    "Gateway": "100.0.0.100",
                                    "PrimaryDns": "xxxxx.com",
                                    "SecondaryDns": "yyyyy.com"
                                },
                                "DnsSuffix": "zzzzz.com",
                                "ShouldReplaceMacAddress": true
                            }, "VCDNetworkSettings": null
                        },
                        "TestSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                }
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": true,
                        "MacAddress": "00:50:56:bd:3d:90"
                    }],
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v41",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "[ds_cluster]datastore1 (345MB / 0.50GB Free)"
                    }]
                }],
                "OwnersId": {"OwnersGuid": "eb01d207-8e3c-41cc-8de3-32e96c9553ad"},
                "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
            },
            "TargetSiteInfo": {
                "OwnersId": {
                    "Id": {"OwnersGuid": "eb01d207-8e3c-41cc-8de3-32e96c9553ad"},
                    "DisplayName": "Unconfigured site name (Local)",
                    "IsLocal": true
                },
                "PotentialReplicationDestinations": [{
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }, {
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "ResourcePoolIdentifier": {
                            "InternalName": "resgroup-271",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "DisplayName": "RP:172.20.200.2 puptitz-rp"
                    }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                }],
                "VCDVirtualDatacenters": [],
                "PotentialServiceProfiles": [],
                "IsConnected": true,
                "IsPrePostScriptsEnabled": true,
                "PotentialBackupTargets": [{
                    "Identifier": {"Identifier": "c482a455-70c1-4028-8dbb-acd3456457a9"},
                    "DisplayName": "guy",
                    "IsDefault": true,
                    "IsCompressionEnabled": false
                }, {
                    "Identifier": {"Identifier": "00000000-0000-0000-0000-000000000000"},
                    "DisplayName": "None",
                    "IsDefault": false,
                    "IsCompressionEnabled": true
                }]
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
                "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                "OrganizationName": "No Organization",
                "CrmIdentifier": "No Contact"
            }],
            "IsEnableVmJournalDatastoreSelection": true
        }
    }
});
