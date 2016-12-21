'use strict';

describe('edit vm aws network settings factory', function () {
    var publicCloudNetworkEditFactory, modal;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_, _publicCloudNetworkEditFactory_) {
        publicCloudNetworkEditFactory = _publicCloudNetworkEditFactory_;
        modal = _$uibModal_;
    }));

    it('should have function defined', function () {
        expect(publicCloudNetworkEditFactory.open).toBeDefined();
        expect(publicCloudNetworkEditFactory.close).toBeDefined();
        expect(publicCloudNetworkEditFactory.save).toBeDefined();
    });


    it("should check the build of the bulk object", function () {

        var selectedVms = [{
            "InternalVirtualMachineId": {
                "InternalVmName": "vm-404",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "Name": "kobi_vm(2)",
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
            "TargetHost": null,
            "TargetDatastore": null,
            "StorageUsageInfo": {
                "ProvisionedStorageSizeInMB": 226,
                "UsedStorageSizeInMB": 0,
                "RecoveryStorageSizeInMB": 0
            },
            "Volumes": [{
                "SourceAddress": "[ZNest81Datastore]:kobi_vm(2)/kobi_vm.vmdk",
                "TargetAddress": null,
                "Swap": false,
                "ProvisionedSizeInMB": 8,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "56 4d 8f 3a 14 3a 50 6b-97 ad 5a b4 fd 74 25 ed",
                            "InstanceUuid": "52 58 41 00 53 d9 b0 cd-f7 4d 09 fd cb 14 7a 4d"
                        }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0, "DlpDescription": "Scsi(0:0)"
                    }, "Settings": {"IsSwap": false, "VolumeReplicationDestination": null}
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
                "MacAddress": "00:50:56:bd:f8:8e"
            }],
            "CloudVmSettings": {
                "FailoverSettings": {
                    "Vpc": {
                        "Name": "Identifier=vpc-6ce65c09",
                        "Id": {"Identifier": "vpc-6ce65c09"}
                    },
                    "Subnet": {"Name": "Identifier=subnet-2814cc5f", "Id": {"Identifier": "subnet-2814cc5f"}},
                    "SecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}]
                },
                "FailoverTestSettings": {
                    "Vpc": {
                        "Name": "Identifier=vpc-6ce65c09",
                        "Id": {"Identifier": "vpc-6ce65c09"}
                    },
                    "Subnet": {"Name": "Identifier=subnet-2814cc5f", "Id": {"Identifier": "subnet-2814cc5f"}},
                    "SecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}]
                }
            },
            "TargetFolder": null,
            "StorageProfile": null,
            "JournalHardLimit": {"Type": 0, "Limit": 0},
            "JournalWarningThreshold": {"Type": 0, "Limit": 0},
            "id": "09d0d3b4-78d0-47c1-ad38-d01887e6d589vm-404",
            "FailoverVpc": "Identifier=vpc-6ce65c09",
            "FailoverTestVpc": "Identifier=vpc-6ce65c09",
            "FailoverSubnet": "Identifier=subnet-2814cc5f",
            "FailoverTestSubnet": "Identifier=subnet-2814cc5f",
            "FailoverSecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}],
            "FailoverTestSecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}]
        }, {
            "InternalVirtualMachineId": {
                "InternalVmName": "vm-378",
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
            },
            "Name": "vm_liron",
            "SourceHost": {
                "BaseComputeResourceIdentifier": {
                    "InternalName": "host-9",
                    "Type": 0,
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
            },
            "SourceDatastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-10",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1"
            },
            "TargetHost": null,
            "TargetDatastore": null,
            "StorageUsageInfo": {
                "ProvisionedStorageSizeInMB": 4350,
                "UsedStorageSizeInMB": 40,
                "RecoveryStorageSizeInMB": 0
            },
            "Volumes": [{
                "SourceAddress": "[datastore1]:vm_liron/vm_liron.vmdk",
                "TargetAddress": null,
                "Swap": false,
                "ProvisionedSizeInMB": 40,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "42 3d 3c dd 4b ba bd 5a-66 3b 54 3a 0c e4 e0 90",
                            "InstanceUuid": "50 3d 08 36 7b 52 13 22-29 70 92 60 06 2f ee 63"
                        }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0, "DlpDescription": "Scsi(0:0)"
                    }, "Settings": {"IsSwap": false, "VolumeReplicationDestination": null}
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
                "MacAddress": "00:50:56:bd:0b:61"
            }],
            "CloudVmSettings": {
                "FailoverSettings": {
                    "Vpc": {
                        "Name": "Identifier=vpc-6ce65c09",
                        "Id": {"Identifier": "vpc-6ce65c09"}
                    },
                    "Subnet": {"Name": "Identifier=subnet-2814cc5f", "Id": {"Identifier": "subnet-2814cc5f"}},
                    "SecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}]
                },
                "FailoverTestSettings": {
                    "Vpc": {
                        "Name": "Identifier=vpc-6ce65c09",
                        "Id": {"Identifier": "vpc-6ce65c09"}
                    },
                    "Subnet": {"Name": "Identifier=subnet-2814cc5f", "Id": {"Identifier": "subnet-2814cc5f"}},
                    "SecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}]
                }
            },
            "TargetFolder": null,
            "StorageProfile": null,
            "JournalHardLimit": {"Type": 0, "Limit": 0},
            "JournalWarningThreshold": {"Type": 0, "Limit": 0},
            "id": "09d0d3b4-78d0-47c1-ad38-d01887e6d589vm-378",
            "FailoverVpc": "Identifier=vpc-6ce65c09",
            "FailoverTestVpc": "Identifier=vpc-6ce65c09",
            "FailoverSubnet": "Identifier=subnet-2814cc5f",
            "FailoverTestSubnet": "Identifier=subnet-2814cc5f",
            "FailoverSecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}],
            "FailoverTestSecurityGroups": [{"Name": "default", "Id": {"Identifier": "sg-a7b082c2"}, "ticked": true}]
        }];

        var vm = publicCloudNetworkEditFactory.getBulkVm(selectedVms);

        expect(vm.CloudVmSettings.FailoverSettings.Vpc.Id.Identifier).toEqual('vpc-6ce65c09');
        expect(vm.CloudVmSettings.FailoverTestSettings.Vpc.Id.Identifier).toEqual('vpc-6ce65c09');
        expect(vm.CloudVmSettings.FailoverSettings.Subnet.Id.Identifier).toEqual('subnet-2814cc5f');
        expect(vm.CloudVmSettings.FailoverTestSettings.Subnet.Id.Identifier).toEqual('subnet-2814cc5f');

        expect(vm.CloudVmSettings.FailoverSettings.SecurityGroups).toEqual([{
            Name: 'default',
            Id: {Identifier: 'sg-a7b082c2'},
            ticked: true
        }]);
        expect(vm.CloudVmSettings.FailoverTestSettings.SecurityGroups).toEqual([{
            Name: 'default',
            Id: {Identifier: 'sg-a7b082c2'},
            ticked: true
        }]);
    });
});
