'use strict';

describe('create-vpg - Nics', function () {
    var controller, scope, createVPGModel, createVpgNicsService, nicEditFactory, nicVCDEditFactory, q;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, $q, _createVPGModel_, _createVpgNicsService_, _nicEditFactory_, _nicVCDEditFactory_) {
        scope = $rootScope.$new();
        createVpgNicsService = _createVpgNicsService_;
        nicEditFactory = _nicEditFactory_;
        nicVCDEditFactory = _nicVCDEditFactory_;
        createVPGModel = _createVPGModel_;
        q = $q;
        mockVpgSettings();

        controller = $controller('createVPGNICsController', {
            $scope: scope, createVpgNicsService: createVpgNicsService,
            nicEditFactory: nicEditFactory, nicVCDEditFactory: nicVCDEditFactory
        });
    }));

    it('should have data properties', function () {

        expect(scope.data.isTargetVCD).toBeBoolean();
        expect(scope.data.selectedItems).toBeEmptyArray();
        expect(scope.data.selectedVCDItems).toBeEmptyArray();
        expect(scope.data.editNicsDisabled).toBeTruthy();
        expect(scope.data.editVCDNicsDisabled).toBeTruthy();

    });

    it('should have a grid object defined', function () {
        expect(scope.data.gridObj).toBeNonEmptyObject();
    });

    it('should disable/enable edit nic button when selected items are changed', function () {
        scope.data.selectedItems = [];
        scope.selectedItemsChange();
        expect(scope.data.editNicsDisabled).toBeTruthy();

        scope.data.selectedItems.push({});
        scope.selectedItemsChange();
        expect(scope.data.editNicsDisabled).toBeFalsy();
    });

    it('should disable/enable edit vcd nic button when vcd selected items are changed', function () {
        scope.data.selectedVCDItems = [];
        scope.selectedVCDItemsChange();
        expect(scope.data.editVCDNicsDisabled).toBeTruthy();

        scope.data.selectedVCDItems.push({});
        scope.selectedVCDItemsChange();
        expect(scope.data.editVCDNicsDisabled).toBeFalsy();
    });


    // it('should open the edit vcd nic window when clicking edit nic',function(){
    //     spyOn(nicEditFactory, 'open').and.callFake(function(){
    //         var deferred = q.defer();
    //         return deferred.promise;
    //     });
    //     scope.editNics();
    //     expect(nicEditFactory.open).toHaveBeenCalled();
    // });


    it('should open the edit cd nic window when clicking edit nic', function () {
        var deferred = q.defer();
        spyOn(nicEditFactory, 'open').and.returnValue(deferred.promise);
        spyOn(createVpgNicsService, 'saveNics');
        spyOn(createVpgNicsService, 'updateGridData');

        scope.editNics();
        expect(nicEditFactory.open).toHaveBeenCalled();

        var nicObjectMock = [{x: 'x'}, {y: 'y'}],
            collectedNics = createVpgNicsService.collectSelectedNics(scope.data.selectedItems, createVpgNicsService.getVmsNicsList()),
            nicList = createVpgNicsService.getVmsNicsList();



        deferred.resolve(nicObjectMock);
        scope.$apply();

        expect(createVpgNicsService.saveNics).toHaveBeenCalledWith(nicObjectMock,collectedNics);
        expect(createVpgNicsService.updateGridData).toHaveBeenCalledWith(nicList);

    });

    it('should open the edit vcd nic window when clicking edit nic', function () {
        mockVCDVpgSettings();

        var deferred = q.defer();
        spyOn(nicVCDEditFactory, 'open').and.returnValue(deferred.promise);
        spyOn(createVpgNicsService, 'saveVCDNics');
        spyOn(createVpgNicsService, 'updateGridData');

        scope.editVCDNics();
        expect(nicVCDEditFactory.open).toHaveBeenCalled();

        var nicObjectMock = [{x: 'x'}, {y: 'y'}],
            collectedNics = createVpgNicsService.collectSelectedNics(scope.data.selectedVCDItems, createVpgNicsService.getVmsVcdNicsList()),
            nicList = createVpgNicsService.getVmsVcdNicsList();



        deferred.resolve(nicObjectMock);
        scope.$apply();

        expect(createVpgNicsService.saveVCDNics).toHaveBeenCalledWith(nicObjectMock,collectedNics);
        expect(createVpgNicsService.updateGridData).toHaveBeenCalledWith(nicList);

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

    function mockVCDVpgSettings() {
        createVPGModel.data.defaultVpgSettings = {"Config":{"Name":"e34534534","Configuration":{"Priority":1,"MinimalJournalLenghtInMinutes":1440,"RPOThressholdInSeconds":40,"MaxTestIntervalInMinutes":262080,"WanCompression":true,"ScriptingSettings":{"PreRecoveryScript":{"Command":null,"Parameters":null,"TimeoutInSeconds":300},"PostRecoveryScript":{"Command":null,"Parameters":null,"TimeoutInSeconds":300},"UseScripts":false},"ManageJournalSettings":{"JournalDatastore":null,"JournalHardLimitPerVM":{"Type":1,"Limit":153600},"JournalWarningThresholdPerVM":{"Type":1,"Limit":115200}},"BootOrder":{"Groups":[{"Machines":[{"DisplayName":"naom vm - testing recovery","Id":{"InternalVmName":"vm-343","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInMb":243,"id":"vm-343598e5def-3500-4409-a691-d25b5cd10d22","SizeInMbFiltered":{"display":"243.0 MB","value":243},"BootOrderGroup":"Default"},{"DisplayName":"vm2-vapp (05b9df67-2e4f-4a99-8583-b0f547dfe4ee)","Id":{"InternalVmName":"vm-352","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInMb":258,"id":"vm-352598e5def-3500-4409-a691-d25b5cd10d22","SizeInMbFiltered":{"display":"258.0 MB","value":258},"BootOrderGroup":"Default"},{"DisplayName":"Guy_vApp(4)(2)","Id":{"InternalVmName":"vm-382","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInMb":227,"id":"vm-382598e5def-3500-4409-a691-d25b5cd10d22","SizeInMbFiltered":{"display":"227.0 MB","value":227},"BootOrderGroup":"Default"},{"DisplayName":"Guy_vApp(4)","Id":{"InternalVmName":"vm-383","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"SizeInMb":227,"id":"vm-383598e5def-3500-4409-a691-d25b5cd10d22","SizeInMbFiltered":{"display":"227.0 MB","value":227},"BootOrderGroup":"Default"}],"BootGroupIdentifier":{"Guid":"00000000-0000-0000-0000-000000000000"},"Name":"Default","Settings":{"BootDelay":0,"ShutdownDelay":0,"WaitForTools":false}}]},"ServiceProfile":null,"Backup":{"Target":{"SelectedTarget":null},"Scheduler":{"RunningTime":{"SchedulePeriodType":1,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6},"Retry":{"ShouldRetryOnFailure":true,"RetryTimes":3,"RetryIntervalInMinutes":10},"Window":{"ShouldTerminateIfExceedsWindow":false,"WeeklyWindow":{"Days":[{"Hours":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]},{"Hours":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]},{"Hours":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]},{"Hours":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]},{"Hours":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]},{"Hours":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]},{"Hours":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]}]}}},"Scripting":{"PostScript":{"Command":"","Parameters":"","TimeoutInSeconds":0}},"DeleteBackup":{"RestorePointRange":1}},"IsBackupEnabled":false,"CopyNatRulesOptions":2,"CopyNatServiceAvailable":true},"Defaults":{"TargetComputeResource":null,"TargetDatastore":null,"FailoverNetwork":null,"TestNetwork":null,"TargetFolder":null,"FailoverVCDVAppNetwork":null,"TestVCDVAppNetwork":null,"RecoveryCloudSettings":null},"ProtectedVappSettings":null,"RecoveryVappSettings":{"VCDVappSettings":{"TargetVirtualDatacenter":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724"},"DisplayName":"NoamOrgVCD2"},"VCDVAppNetworks":[{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:2986498e-09d7-4e5b-b989-e8d0ecce23c4"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"externalNetwork","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:eee3536e-a889-4e55-8332-bfe4aeff8c08"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"NoamNetworkIso","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":null,"FenceMode":{"FenceModeType":0},"IpScope":null,"NetworkName":"none","OrgNetwork":null,"IpScopes":[{"Netmask":"0.0.0.0","Gateway":"0.0.0.0","IpRanges":[]}],"NatService":null}]}},"VirtualMachines":[{"InternalVirtualMachineId":{"InternalVmName":"vm-343","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"Name":"naom vm - testing recovery","SourceHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.205.2"},"SourceDatastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore"},"TargetHost":null,"TargetDatastore":null,"StorageUsageInfo":{"ProvisionedStorageSizeInMB":243,"UsedStorageSizeInMB":0,"RecoveryStorageSizeInMB":0},"Volumes":[{"SourceAddress":"[ZNest83Datastore]:VRA1/040278a9-7e09-4979-a0a0-11693833debd/vm-227/naom vm (dcd4ae1e-dd51-4823-abe7-0424bbc6f47b).vmdk","TargetAddress":null,"Swap":false,"ProvisionedSizeInMB":8,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"56 4d 8a 01 fa 5e b5 e4-f8 8d 13 b4 ec f9 23 1e","InstanceUuid":"52 ed 9d 87 35 7d 2f 0a-4e 81 b0 cd dd 68 5f ea"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)","VolumeIdentifier":"scsi:0:0"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"Datastore":null,"VCDDatastore":{"IsThin":true},"ExistingDisk":null,"RawDevice":null,"StoragePod":null}}},"IsSourceThinProvisioned":true,"Thin":true}],"NetworkInterfaces":[{"InternalIdentifier":{"Name":"Network adapter 1"},"SourceNetwork":{"VcenterNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-34"},"DisplayName":"dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d"},"VCDNetwork":null},"FailoverSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:03:00:05","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:03:00:05"}}},"TestSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:03:00:05","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:03:00:05"}}},"IsIPConfigurationEnabled":false,"MacAddress":"00:50:56:03:00:05","vmId":{"InternalVmName":"vm-343","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"id":"vm-34300:50:56:03:00:05","vmName":"naom vm - testing recovery","index":1,"FailoverConnected":true,"TestConnected":true,"FailoverPrimary":true,"TestPrimary":true,"FailoverIp":"IP Pool","TestIP":"IP Pool","TestMac":"00:50:56:03:00:05","FailoverMac":"00:50:56:03:00:05","nicName":"Network adapter 1"}],"AwsVmSettings":null,"TargetFolder":null,"StorageProfile":{"VCDStorageProfile":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdcstorageProfile:bbe543cf-e38c-4b70-a299-3bfabb013959"},"DisplayName":"Storage Policy","Enabled":true}},"JournalHardLimit":{"Type":1,"Limit":153600},"JournalWarningThreshold":{"Type":1,"Limit":115200},"JournalDatastores":[],"_isNewVm":true},{"InternalVirtualMachineId":{"InternalVmName":"vm-352","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"Name":"vm2-vapp (05b9df67-2e4f-4a99-8583-b0f547dfe4ee)","SourceHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.205.2"},"SourceDatastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore"},"TargetHost":null,"TargetDatastore":null,"StorageUsageInfo":{"ProvisionedStorageSizeInMB":258,"UsedStorageSizeInMB":0,"RecoveryStorageSizeInMB":0},"Volumes":[{"SourceAddress":"[ZNest83Datastore]:vm2-vapp (05b9df67-2e4f-4a99-8583-b0f547dfe4ee)/vm2-vapp (05b9df67-2e4f-4a99-8583-b0f547dfe4ee).vmdk","TargetAddress":null,"Swap":false,"ProvisionedSizeInMB":40,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"42 2c c6 a7 e7 10 98 53-1d 78 0d 62 75 c1 32 a6","InstanceUuid":"50 2c a3 03 96 4a e3 3a-22 2a 37 59 81 d2 57 d8"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)","VolumeIdentifier":"scsi:0:0"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"Datastore":null,"VCDDatastore":{"IsThin":true},"ExistingDisk":null,"RawDevice":null,"StoragePod":null}}},"IsSourceThinProvisioned":true,"Thin":true}],"NetworkInterfaces":[{"InternalIdentifier":{"Name":"Network adapter 1"},"SourceNetwork":{"VcenterNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"Network","InternalName":"network-33"},"DisplayName":"none"},"VCDNetwork":null},"FailoverSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:03:00:0a","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:03:00:0a"}}},"TestSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:03:00:0a","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:03:00:0a"}}},"IsIPConfigurationEnabled":false,"MacAddress":"00:50:56:03:00:0a","vmId":{"InternalVmName":"vm-352","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"id":"vm-35200:50:56:03:00:0a","vmName":"vm2-vapp (05b9df67-2e4f-4a99-8583-b0f547dfe4ee)","index":2,"FailoverConnected":true,"TestConnected":true,"FailoverPrimary":true,"TestPrimary":true,"FailoverIp":"IP Pool","TestIP":"IP Pool","TestMac":"00:50:56:03:00:0a","FailoverMac":"00:50:56:03:00:0a","nicName":"Network adapter 1"}],"AwsVmSettings":null,"TargetFolder":null,"StorageProfile":{"VCDStorageProfile":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdcstorageProfile:bbe543cf-e38c-4b70-a299-3bfabb013959"},"DisplayName":"Storage Policy","Enabled":true}},"JournalHardLimit":{"Type":1,"Limit":153600},"JournalWarningThreshold":{"Type":1,"Limit":115200},"JournalDatastores":[],"_isNewVm":true},{"InternalVirtualMachineId":{"InternalVmName":"vm-383","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"Name":"Guy_vApp(4)","SourceHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.205.2"},"SourceDatastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore"},"TargetHost":null,"TargetDatastore":null,"StorageUsageInfo":{"ProvisionedStorageSizeInMB":227,"UsedStorageSizeInMB":0,"RecoveryStorageSizeInMB":0},"Volumes":[{"SourceAddress":"[ZNest83Datastore]:Guy_vApp(4)_2/Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1).vmdk","TargetAddress":null,"Swap":false,"ProvisionedSizeInMB":9,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"56 4d f9 74 55 e0 64 ed-c2 55 ef e4 2f 02 57 54","InstanceUuid":"52 47 16 2c 03 dc e1 fe-0b f6 8b f0 cb 84 88 f4"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)","VolumeIdentifier":"scsi:0:0"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"Datastore":null,"VCDDatastore":{"IsThin":true},"ExistingDisk":null,"RawDevice":null,"StoragePod":null}}},"IsSourceThinProvisioned":true,"Thin":true}],"NetworkInterfaces":[{"InternalIdentifier":{"Name":"Network adapter 1"},"SourceNetwork":{"VcenterNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"Network","InternalName":"network-11"},"DisplayName":"VM Network"},"VCDNetwork":null},"FailoverSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:ac:6b:42","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:ac:6b:42"}}},"TestSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:ac:6b:42","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:ac:6b:42"}}},"IsIPConfigurationEnabled":false,"MacAddress":"00:50:56:ac:6b:42","vmId":{"InternalVmName":"vm-383","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"id":"vm-38300:50:56:ac:6b:42","vmName":"Guy_vApp(4)","index":3,"FailoverConnected":true,"TestConnected":true,"FailoverPrimary":true,"TestPrimary":true,"FailoverIp":"IP Pool","TestIP":"IP Pool","TestMac":"00:50:56:ac:6b:42","FailoverMac":"00:50:56:ac:6b:42","nicName":"Network adapter 1"}],"AwsVmSettings":null,"TargetFolder":null,"StorageProfile":{"VCDStorageProfile":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdcstorageProfile:bbe543cf-e38c-4b70-a299-3bfabb013959"},"DisplayName":"Storage Policy","Enabled":true}},"JournalHardLimit":{"Type":1,"Limit":153600},"JournalWarningThreshold":{"Type":1,"Limit":115200},"JournalDatastores":[],"_isNewVm":true},{"InternalVirtualMachineId":{"InternalVmName":"vm-382","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"Name":"Guy_vApp(4)(2)","SourceHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.205.2"},"SourceDatastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore"},"TargetHost":null,"TargetDatastore":null,"StorageUsageInfo":{"ProvisionedStorageSizeInMB":227,"UsedStorageSizeInMB":0,"RecoveryStorageSizeInMB":0},"Volumes":[{"SourceAddress":"[ZNest83Datastore]:Guy_vApp(4)(2)/Guy_vApp (0b2f0f8c-3436-4c8b-b17c-a758bd8f10c1).vmdk","TargetAddress":null,"Swap":false,"ProvisionedSizeInMB":9,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"56 4d ce 75 ac 72 ac 74-76 be 43 9a cd 36 fe aa","InstanceUuid":"52 c8 12 05 d2 91 29 5a-b3 5b d6 47 a5 81 db e3"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)","VolumeIdentifier":"scsi:0:0"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"Datastore":null,"VCDDatastore":{"IsThin":true},"ExistingDisk":null,"RawDevice":null,"StoragePod":null}}},"IsSourceThinProvisioned":true,"Thin":true}],"NetworkInterfaces":[{"InternalIdentifier":{"Name":"Network adapter 1"},"SourceNetwork":{"VcenterNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"Network","InternalName":"network-33"},"DisplayName":"none"},"VCDNetwork":null},"FailoverSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:ac:6b:42","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:ac:6b:42"}}},"TestSettings":{"VCenterNetworkSettings":{"DnsSuffix":null,"IP":null,"RecoveryNetwork":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":{"NicInfo":{"VNicIdentifier":{"Name":"Network adapter 1"},"MacAddress":"00:50:56:ac:6b:42","IsPrimary":true,"IsConnected":true,"IPMode":{"IpModeType":0},"VappNetworkName":"","IpAddress":null},"NewMacAddress":{"MacAddress":"00:50:56:ac:6b:42"}}},"IsIPConfigurationEnabled":false,"MacAddress":"00:50:56:ac:6b:42","vmId":{"InternalVmName":"vm-382","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"id":"vm-38200:50:56:ac:6b:42","vmName":"Guy_vApp(4)(2)","index":4,"FailoverConnected":true,"TestConnected":true,"FailoverPrimary":true,"TestPrimary":true,"FailoverIp":"IP Pool","TestIP":"IP Pool","TestMac":"00:50:56:ac:6b:42","FailoverMac":"00:50:56:ac:6b:42","nicName":"Network adapter 1"}],"AwsVmSettings":null,"TargetFolder":null,"StorageProfile":{"VCDStorageProfile":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdcstorageProfile:bbe543cf-e38c-4b70-a299-3bfabb013959"},"DisplayName":"Storage Policy","Enabled":true}},"JournalHardLimit":{"Type":1,"Limit":153600},"JournalWarningThreshold":{"Type":1,"Limit":115200},"JournalDatastores":[],"_isNewVm":true}],"OwnersId":{"OwnersGuid":"d8d20f79-d57f-4216-98f8-e58a2173392f","siteName":"gui_local_vcdat Zerto"},"ZertoOrganizationIdentifier":{"Guid":"00000000-0000-0000-0000-000000000000"}},"TargetSiteInfo":{"OwnersId":{"Id":{"OwnersGuid":"d8d20f79-d57f-4216-98f8-e58a2173392f"},"DisplayName":"gui_local_vcdat Zerto (Local)","IsLocal":true},"PotentialReplicationDestinations":[{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":null,"DisplayName":"[Cluster]172.20.205.2"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":null,"DisplayName":"Cluster"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-38","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster alex rp"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-25","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster PVDC"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-26","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster System vDC (f78171aa-70b8-4b35-bf30-83513c328a0f)"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-40","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster NoamOrgVCD2 (22759e18-f8b0-499e-a90b-0652cc2f0724)"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-252","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster evgeny-rp"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-640","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster MorenoOrg (f6885d6c-d608-41ae-b8bd-c3252087f74b)"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-27","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster orgvdc (2c7e1564-54f8-4b29-960e-23be9f24dd74)"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-424","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster SigalVDC (8d76c734-ddc8-42e3-a429-b95e5f09bf46)"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null},{"ComputeResource":{"BaseComputeResourceIdentifier":{"InternalName":"domain-c17","Type":1,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":{"InternalName":"resgroup-157","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"RP:Cluster PVDC2"},"IsSuitableForRecovery":true,"RecoveryImpossibleReason":null}],"VCDVirtualDatacenters":[{"VirtualDatacenter":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724"},"DisplayName":"NoamOrgVCD2"},"PotentialVCDVappNetworks":[{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:2986498e-09d7-4e5b-b989-e8d0ecce23c4"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"externalNetwork","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:eee3536e-a889-4e55-8332-bfe4aeff8c08"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"NoamNetworkIso","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":null,"FenceMode":{"FenceModeType":0},"IpScope":null,"NetworkName":"none","OrgNetwork":null,"IpScopes":[{"Netmask":"0.0.0.0","Gateway":"0.0.0.0","IpRanges":[]}],"NatService":null}],"IsThinProvision":true,"$$hashKey":"object:623"},{"VirtualDatacenter":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdc:8d76c734-ddc8-42e3-a429-b95e5f09bf46"},"DisplayName":"SigalVDC"},"PotentialVCDVappNetworks":[{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:294d6295-83d3-4841-96fe-90f77804dc16"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"SigalNetwork","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:2986498e-09d7-4e5b-b989-e8d0ecce23c4"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"externalNetwork","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":null,"FenceMode":{"FenceModeType":0},"IpScope":null,"NetworkName":"none","OrgNetwork":null,"IpScopes":[{"Netmask":"0.0.0.0","Gateway":"0.0.0.0","IpRanges":[]}],"NatService":null}],"IsThinProvision":false,"$$hashKey":"object:624"},{"VirtualDatacenter":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdc:2c7e1564-54f8-4b29-960e-23be9f24dd74"},"DisplayName":"orgvdc"},"PotentialVCDVappNetworks":[{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:c931d2fa-04cc-4968-9fa2-d1178e1e35f4"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"Kobi network","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:d90af971-376e-4ce7-b0db-a5e8cf7a993a"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"internal network","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":null,"FenceMode":{"FenceModeType":0},"IpScope":null,"NetworkName":"none","OrgNetwork":null,"IpScopes":[{"Netmask":"0.0.0.0","Gateway":"0.0.0.0","IpRanges":[]}],"NatService":null}],"IsThinProvision":true,"$$hashKey":"object:625"},{"VirtualDatacenter":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdc:f6885d6c-d608-41ae-b8bd-c3252087f74b"},"DisplayName":"MorenoOrg"},"PotentialVCDVappNetworks":[{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:2c04aea7-1fdd-4058-9756-0be3476e244d"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"ExtNet_1","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:8ce6c2a4-4b90-44b7-a635-9757da8720b9"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"ExtNet_2","OrgNetwork":null,"IpScopes":[],"NatService":null},{"RecoveryOrganizationVCDOrgNetwork":null,"FenceMode":{"FenceModeType":0},"IpScope":null,"NetworkName":"none","OrgNetwork":null,"IpScopes":[{"Netmask":"0.0.0.0","Gateway":"0.0.0.0","IpRanges":[]}],"NatService":null}],"IsThinProvision":true,"$$hashKey":"object:626"}],"PotentialServiceProfiles":[],"PotentialAwsVpcs":{"PotentialVpcs":[]},"IsConnected":true,"IsPrePostScriptsEnabled":true,"PotentialBackupTargets":[{"Identifier":{"Identifier":"00000000-0000-0000-0000-000000000000"},"DisplayName":"None","IsDefault":true,"IsCompressionEnabled":true}],"PotentialReplicationSiteInitialInfo":{"OwnersId":{"Id":{"OwnersGuid":"d8d20f79-d57f-4216-98f8-e58a2173392f"},"DisplayName":"gui_local_vcdat Zerto (Local)","IsLocal":true},"SiteId":{"SiteGuid":"053f0dd8-f43b-4093-877d-b22dbe59b838"},"IsConnected":true,"IsVCDEnabled":true,"VirtualizationProviderType":0},"PotentialPublicCloudInstanceTypeVisualObjects":[]},"ProtectionGroupId":null,"Entities":{"Source":0,"Target":2},"ConfigurationFlags":{"IsStorageProfileEnabled":true,"IsCompressionConfigurable":true,"IsVmFolderConfigurable":true,"IsBackupFeatureSupported":true},"PotentialZertoOrganization":[{"Identifier":{"Guid":"00000000-0000-0000-0000-000000000000"},"OrganizationName":"No Organization","CrmIdentifier":"No Contact","EnableCustomProfile":true}],"IsEnableVmJournalDatastoreSelection":true};
    }
});
