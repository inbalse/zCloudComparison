'use strict';

describe('create vpg storage step', function () {
    var scope, model, enums, controller, editVolumesFactory, editVCDVolumesFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _createVPGModel_, _enums_, _editVolumesFactory_, _editVCDVolumesFactory_) {
        scope = $rootScope.$new();
        enums = _enums_;
        model = _createVPGModel_;
        editVolumesFactory = _editVolumesFactory_;
        editVCDVolumesFactory = _editVCDVolumesFactory_;

        model.data = {
            isReverse: false,
            defaultVpgSettings: {
                ProtectionGroupId: 1,
                Config: {
                    RecoveryVappSettings: {VCDVappSettings: {TargetVirtualDatacenter: {Id: 'abc1'}}},
                    VirtualMachines: [{
                        TargetHost: 'host',
                        TargetDatastore: 'test',
                        InternalVirtualMachineId: {
                            InternalVmName: 'InternalVmName',
                            ServerIdentifier: {ServerGuid: 'ServerGuid'}
                        },
                        Volumes: [{
                            InternalVolumeManagementSettings: {
                                Settings: {
                                    VolumeReplicationDestination: {
                                        Datastore: null
                                    }
                                },
                                DiskLocationParams: {
                                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                    VolumeIdentifier: "scsi:0:0"
                                }                            }
                        },
                            {
                                InternalVolumeManagementSettings: {
                                    Settings: {
                                        VolumeReplicationDestination: {
                                            Datastore: null
                                        }
                                    },
                                    DiskLocationParams: {
                                        VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                        VolumeIdentifier: "scsi:0:1"
                                    }                                }
                            },
                            {
                                InternalVolumeManagementSettings: {
                                    Settings: {
                                        VolumeReplicationDestination: {
                                            Datastore: null
                                        }
                                    },
                                    DiskLocationParams: {
                                        VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                        VolumeIdentifier: "scsi:0:2"
                                    }
                                }
                            }]
                    }]
                },
                Entities: {Target: enums.VpgEntityType.VCVpg}
            },
            storageVolumes: [
                {
                    Index: 1,
                    VM: {TargetHost: 'host', TargetDatastore: 'datastore', InternalVirtualMachineId: 'id'},
                    Volume: {
                        InternalVolumeManagementSettings: {
                            Settings: {VolumeReplicationDestination: {Datastore: {}}},
                            DiskLocationParams: 'params'
                        }
                    }
                },
                {
                    Index: 2,
                    VM: {TargetHost: 'host', TargetDatastore: 'datastore', InternalVirtualMachineId: 'id'},
                    Volume: {
                        InternalVolumeManagementSettings: {
                            Settings: {VolumeReplicationDestination: {Datastore: {}}},
                            DiskLocationParams: 'params'
                        }
                    }
                },
                {
                    Index: 3,
                    VM: {TargetHost: 'host', TargetDatastore: 'datastore', InternalVirtualMachineId: 'id'},
                    Volume: {
                        InternalVolumeManagementSettings: {
                            Settings: {VolumeReplicationDestination: {Datastore: {}}},
                            DiskLocationParams: 'params'
                        }
                    }
                }
            ]
        };

        controller = $controller('createVPGStorageController', {
            $scope: scope,
            enums: enums,
            createVPGModel: model,
            editVolumesFactory: editVolumesFactory,
            editVCDVolumesFactory: editVCDVolumesFactory
        });

        scope.selectedItems = [
            {
                Index: 1,
                VM: {TargetHost: 'host', TargetDatastore: 'datastore', InternalVirtualMachineId: 'id'},
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {VolumeReplicationDestination: {Datastore: {}}},
                        DiskLocationParams: 'params'
                    }
                }
            },
            {
                Index: 2,
                VM: {TargetHost: 'host', TargetDatastore: 'datastore', InternalVirtualMachineId: 'id'},
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {VolumeReplicationDestination: {Datastore: {}}},
                        DiskLocationParams: 'params'
                    }
                }
            }
        ];

        scope.gridObj = {
            grid: {
                updateData: function () {

                }
            }
        };
    }));

    it('should contain defined variables to ensure in case of their names changed, the tests will fall', function () {
        expect(scope.forms).toBeDefined();
        expect(scope.selectedVolumes).toBeDefined();
        expect(scope.potentialsForVolumes).toBeDefined();
        expect(scope.vcdThinPotentials).toBeDefined();
    });

    it('should contain defined functions to ensure in case of their names changed, the tests will fall', function () {
        expect(scope.editSelectedClick).toBeDefined();
        expect(scope.notImplementedClick).toBeDefined();
        expect(scope.onSuccessResult).toBeDefined();
        expect(scope.onCancelResult).toBeDefined();
        expect(scope.resetData).toBeDefined();
        expect(scope.onConfigResult).toBeDefined();
        expect(scope.onConfigResultVCD).toBeDefined();
    });

    it('should create temp selected volumes and call backend', function () {
        model.data.defaultVpgSettings.Entities.Target = enums.VpgEntityType.VCVpg;
        scope.editSelectedClick();
        expect(scope.selectedVolumes).toEqual([
            {
                Index: 1,
                VM: {TargetHost: 'host', TargetDatastore: 'datastore', InternalVirtualMachineId: 'id'},
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {VolumeReplicationDestination: {Datastore: {}}},
                        DiskLocationParams: 'params'
                    }
                }
            },
            {
                Index: 2,
                VM: {TargetHost: 'host', TargetDatastore: 'datastore', InternalVirtualMachineId: 'id'},
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {VolumeReplicationDestination: {Datastore: {}}},
                        DiskLocationParams: 'params'
                    }
                }
            }
        ]);
    });

    it('should request potentials for volumes in case of VC target', function () {
        spyOn(editVolumesFactory, 'getVolumesConfiguration').and.callThrough();
        model.data.defaultVpgSettings.Entities.Target = enums.VpgEntityType.VCVpg;
        scope.editSelectedClick();
        expect(editVolumesFactory.getVolumesConfiguration).toHaveBeenCalled();
    });

    it('should request thinSupport for volumes in case of VCD target', function () {
        spyOn(editVCDVolumesFactory, 'getThinProvisionSupport').and.callThrough();
        model.data.defaultVpgSettings.Entities.Target = enums.VpgEntityType.VCDvApp;
        scope.editSelectedClick();
        expect(editVCDVolumesFactory.getThinProvisionSupport).toHaveBeenCalled();
    });

    it('should request reverse potentials for volumes in case of VC target', function () {
        spyOn(editVolumesFactory, 'getVolumesConfigurationReverse').and.callThrough();
        model.data.defaultVpgSettings.Entities.Target = enums.VpgEntityType.VCVpg;
        model.data.isReverse = true;
        scope.editSelectedClick();
        expect(editVolumesFactory.getVolumesConfigurationReverse).toHaveBeenCalled();
    });

    it('should request reverse thinSupport for volumes in case of VCD target', function () {
        spyOn(editVCDVolumesFactory, 'getThinProvisionSupportReverse').and.callThrough();
        model.data.defaultVpgSettings.Entities.Target = enums.VpgEntityType.VCDvApp;
        model.data.isReverse = true;
        scope.editSelectedClick();
        expect(editVCDVolumesFactory.getThinProvisionSupportReverse).toHaveBeenCalled();
    });

    it('should properly assign data on success', function () {

        scope.selectedVolumes = [
            {
                Index: 1,
                VM: {
                    TargetHost: 'host',
                    TargetDatastore: 'test',
                    InternalVirtualMachineId: {
                        InternalVmName: 'InternalVmName',
                        ServerIdentifier: {ServerGuid: 'ServerGuid'}
                    },
                    Volumes: [{
                        InternalVolumeManagementSettings: {
                            Settings: {
                                VolumeReplicationDestination: {
                                    Datastore: {}
                                }
                            },
                            DiskLocationParams: {
                                VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                VolumeIdentifier: "scsi:0:0"
                            }                            }
                    },
                        {
                            InternalVolumeManagementSettings: {
                                Settings: {
                                    VolumeReplicationDestination: {
                                        Datastore: null
                                    }
                                },
                                DiskLocationParams: {
                                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                    VolumeIdentifier: "scsi:0:1"
                                }                                }
                        },
                        {
                            InternalVolumeManagementSettings: {
                                Settings: {
                                    VolumeReplicationDestination: {
                                        Datastore: null
                                    }
                                },
                                DiskLocationParams: {
                                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                    VolumeIdentifier: "scsi:0:2"
                                }
                            }
                        }]
                },
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {
                            VolumeReplicationDestination: {
                                Datastore: {}
                            }
                        },
                        DiskLocationParams: {
                            VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                            VolumeIdentifier: "scsi:0:0"
                        }
                    }
                }
            }
        ];

        scope.onSuccessResult({
            TargetAddress: 'test',
            Swap: true,
            InternalVolumeManagementSettings: {
                Settings: {
                    VolumeReplicationDestination: {
                        Datastore: {
                            TargetDatastore: {
                                InternalDatastoreName: 'test',
                                ServerIdentifier: {
                                    ServerGuid: 'abc1'
                                }
                            },
                            IsThin: true
                        }
                    }
                },
                DiskLocationParams: {
                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                    VolumeIdentifier: "scsi:0:0"
                }
            }
        });

        expect(model.data.defaultVpgSettings.Config.VirtualMachines[0].Volumes[0].Thin).toBeTruthy();
        expect(model.data.defaultVpgSettings.Config.VirtualMachines[0].Volumes[0].TargetAddress).toEqual('test');
        expect(model.data.defaultVpgSettings.Config.VirtualMachines[0].Volumes[0].Swap).toBeTruthy();
        expect(model.data.defaultVpgSettings.Config.VirtualMachines[0].Volumes[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore.IsThin).toBeTruthy();
    });

    it('should properly assign data on success', function () {
        scope.selectedVolumes = [
            {
                Index: 1,
                VM: {
                    TargetHost: 'host',
                    TargetDatastore: 'test',
                    InternalVirtualMachineId: {
                        InternalVmName: 'InternalVmName',
                        ServerIdentifier: {ServerGuid: 'ServerGuid'}
                    },
                    Volumes: [{
                        InternalVolumeManagementSettings: {
                            Settings: {
                                VolumeReplicationDestination: {
                                    Datastore: null
                                }
                            },
                            DiskLocationParams: {
                                VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                VolumeIdentifier: "scsi:0:0"
                            }                            }
                    },
                        {
                            InternalVolumeManagementSettings: {
                                Settings: {
                                    VolumeReplicationDestination: {
                                        Datastore: null
                                    }
                                },
                                DiskLocationParams: {
                                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                    VolumeIdentifier: "scsi:0:1"
                                }                                }
                        },
                        {
                            InternalVolumeManagementSettings: {
                                Settings: {
                                    VolumeReplicationDestination: {
                                        Datastore: null
                                    }
                                },
                                DiskLocationParams: {
                                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                    VolumeIdentifier: "scsi:0:2"
                                }
                            }
                        }]
                },
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {
                            VolumeReplicationDestination: {
                                Datastore: null,
                                ExistingDisk: null,
                                RawDevice: null,
                                StoragePod: null,
                                VCDDatastore: null
                            }
                        },
                        DiskLocationParams: {
                            VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                            VolumeIdentifier: "scsi:0:0"
                        }
                    }
                }
            }
        ];

        scope.onSuccessResult({
            TargetAddress: 'test',
            Swap: true,
            InternalVolumeManagementSettings: {
                Settings: {
                    VolumeReplicationDestination: {
                        Datastore: {
                            TargetDatastore: {
                                InternalDatastoreName: 'test',
                                ServerIdentifier: {
                                    ServerGuid: 'abc1'
                                }
                            },
                            IsThin: true
                        }
                    }
                },
                DiskLocationParams: {
                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                    VolumeIdentifier: "scsi:0:0"
                }
            }
        });

        expect(model.data.defaultVpgSettings.Config.VirtualMachines[0].Volumes[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk).toBeUndefined();
    });

    it('should change target address to last volume', function () {
        scope.selectedItems = [
            {
                Index: 2,
                VM: {TargetHost: 'host', TargetDatastore: 'datastore1', InternalVirtualMachineId: 'id'},
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {VolumeReplicationDestination: {Datastore: {}}},
                        DiskLocationParams: 'params'
                    }
                }
            }
        ];
        scope.selectedVolumes = [
            {
                Index: 2,
                VM: {
                    TargetHost: 'host',
                    TargetDatastore: 'test',
                    InternalVirtualMachineId: {
                        InternalVmName: 'InternalVmName',
                        ServerIdentifier: {ServerGuid: 'ServerGuid'}
                    },
                    Volumes: [{
                        InternalVolumeManagementSettings: {
                            Settings: {
                                VolumeReplicationDestination: {
                                    Datastore: null
                                }
                            },
                            DiskLocationParams: {
                                VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                VolumeIdentifier: "scsi:0:0"
                            }                            }
                    },
                        {
                            InternalVolumeManagementSettings: {
                                Settings: {
                                    VolumeReplicationDestination: {
                                        Datastore: null
                                    }
                                },
                                DiskLocationParams: {
                                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                    VolumeIdentifier: "scsi:0:1"
                                }                                }
                        },
                        {
                            InternalVolumeManagementSettings: {
                                Settings: {
                                    VolumeReplicationDestination: {
                                        Datastore: null
                                    }
                                },
                                DiskLocationParams: {
                                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                                    VolumeIdentifier: "scsi:0:2"
                                }
                            }
                        }]
                },
                Volume: {
                    InternalVolumeManagementSettings: {
                        Settings: {
                            VolumeReplicationDestination: {
                                Datastore: null,
                                ExistingDisk: null,
                                RawDevice: null,
                                StoragePod: null,
                                VCDDatastore: null
                            }
                        },
                        DiskLocationParams: {
                            VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                            VolumeIdentifier: "scsi:0:2"
                        },
                        TargetAddress: "Datastore"
                    }
                }
            }
        ];

        scope.onSuccessResult({
            InternalVolumeManagementSettings: {
                Settings: {
                    VolumeReplicationDestination: {
                        Datastore: {
                            TargetDatastore: {
                                InternalDatastoreName: 'test',
                                ServerIdentifier: {
                                    ServerGuid: 'abc1'
                                }
                            },
                            IsThin: true
                        }
                    }
                },
                DiskLocationParams: {
                    VMUuids: {InstanceUuid: 'InstanceUuid', Uuid: 'Uuid'},
                    VolumeIdentifier: "scsi:0:2"
                }
            },
            TargetAddress: "Cluster"
        });

        expect(model.data.defaultVpgSettings.Config.VirtualMachines[0].Volumes[2].TargetAddress).toEqual('Cluster');
    });

    it('should change swap inline from false to true', function () {
        var item = {
            "id": 0,
            "Index": 0,
            "Volume": {
                "SourceAddress": "[ZNest162 DS]:Debian/Debian.vmdk",
                "TargetAddress": "ZNest162 DS",
                "Swap": false,
                "ProvisionedSizeInMB": 150,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "42 34 6a 34 6f e2 b2 a1-e5 3f 90 df 86 dc fb 55",
                            "InstanceUuid": "50 34 f4 aa fa cd d5 80-33 eb 13 e0 79 d4 b0 99"
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
                                    "InternalDatastoreName": "datastore-15",
                                    "ServerIdentifier": {
                                        "ServerGuid": "000032cb-7d1f-48f8-84a3-353a626d63ee"
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
                "IsSourceThinProvisioned": false,
                "Thin": true
            },
            "ProvisionedSizeInMB": "150.0 MB"
        };

        var column = {
            "name": "Swap",
            "field": "Volume",
            "id": "Volume_3"
        };

        var editCommand = {
            "row": 0,
            "cell": 6,
            "serializedValue": true,
            "prevSerializedValue": false,
            "execute" : function () {}
        };
        scope.gridObj.grid.commandQueue = [];
        scope.queueAndExecuteCommand(item, column, editCommand);
        expect(item.Swap).toBeTruthy();
        expect(item.InternalVolumeManagementSettings.Settings.IsSwap).toBeTruthy();
    });

    it('should change thin inline from true to false', function () {
        var item = {
            "id": 0,
            "Index": 0,
            "SourceAddress": "[ZNest162 DS]:Debian/Debian.vmdk",
            "TargetAddress": "ZNest162 DS",
            "Swap": false,
            "InternalVolumeManagementSettings": {
                "DiskLocationParams": {
                    "VMUuids": {
                        "Uuid": "42 34 6a 34 6f e2 b2 a1-e5 3f 90 df 86 dc fb 55",
                        "InstanceUuid": "50 34 f4 aa fa cd d5 80-33 eb 13 e0 79 d4 b0 99"
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
                                "InternalDatastoreName": "datastore-15",
                                "ServerIdentifier": {
                                    "ServerGuid": "000032cb-7d1f-48f8-84a3-353a626d63ee"
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
            "IsSourceThinProvisioned": false,
            "Thin": true,
            "ProvisionedSizeInMB": "150.0 MB"
        };

        var column = {
            "name": "Thin",
            "field": "Thin"
        };

        var editCommand = {
            "row": 0,
            "cell": 6,
            "serializedValue": false,
            "prevSerializedValue": true,
            "execute" : function () {}
        };
        scope.gridObj.grid.commandQueue = [];
        scope.queueAndExecuteCommand(item, column, editCommand);
        expect(item.Thin).toBeFalsy();
        expect(item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore.IsThin).toBeFalsy();
    });
});
