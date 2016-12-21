describe('advancedVmReplicationSettingsModel', function () {
    var model;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$uibModal_, _advancedVmReplicationSettingsModel_) {
        model = _advancedVmReplicationSettingsModel_;
    }));

    it('should process an item properly', function () {
        var item = {
            "InternalVirtualMachineId": {
                "InternalVmName": "vm-370",
                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
            },
            "Name": "liron-vm-2",
            "SourceHost": {
                "BaseComputeResourceIdentifier": {
                    "InternalName": "host-9",
                    "Type": 0,
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.2"
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
                "ProvisionedStorageSizeInMB": 166,
                "UsedStorageSizeInMB": 166,
                "RecoveryStorageSizeInMB": 0
            },
            "Volumes": [{
                "SourceAddress": "[ZNest83Datastore]:liron-vm-2_1/liron-vm-2.vmdk",
                "TargetAddress": null,
                "Swap": false,
                "ProvisionedSizeInMB": 40,
                "InternalVolumeManagementSettings": {
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "56 4d 56 9c 11 a1 e5 e1-14 bd ae ea c7 49 2d 9d",
                            "InstanceUuid": "52 83 42 4d 14 79 b0 0e-a2 12 9d 1e 05 ce a2 77"
                        },
                        "UnitNumber": 0,
                        "ControllerNumber": 0,
                        "VolumeType": 0,
                        "DlpDescription": "Scsi(0:0)",
                        "VolumeIdentifier": "scsi:0:0"
                    }, "Settings": {"IsSwap": false, "VolumeReplicationDestination": null}
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
                "MacAddress": "00:50:56:ac:eb:6d",
                "vmId": {
                    "InternalVmName": "vm-370",
                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                },
                "id": "vm-37000:50:56:ac:eb:6d",
                "vmName": "liron-vm-2",
                "nicName": "Network adapter 1",
                "ProtectedNetwork": "VM Network",
                "FailoverIp": "",
                "FailoverNetwork": "No Settings",
                "TestNetwork": "No Settings",
                "TestIP": "",
                "isInMultiNicVM": false,
                "TargetHost": null
            }],
            "CloudVmSettings": null,
            "TargetFolder": null,
            "StorageProfile": null,
            "JournalHardLimit": {"Type": 1, "Limit": 153600},
            "JournalWarningThreshold": {"Type": 1, "Limit": 115200},
            "_isNewVm": true
        };

        model.processItem(item);

        var exp = {"InternalVirtualMachineId":{"InternalVmName":"vm-370","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"Name":"liron-vm-2","SourceHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.205.2"},"SourceDatastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore"},"TargetHost":null,"TargetDatastore":null,"StorageUsageInfo":{"ProvisionedStorageSizeInMB":166,"UsedStorageSizeInMB":166,"RecoveryStorageSizeInMB":0},"Volumes":[{"SourceAddress":"[ZNest83Datastore]:liron-vm-2_1/liron-vm-2.vmdk","TargetAddress":null,"Swap":false,"ProvisionedSizeInMB":40,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"56 4d 56 9c 11 a1 e5 e1-14 bd ae ea c7 49 2d 9d","InstanceUuid":"52 83 42 4d 14 79 b0 0e-a2 12 9d 1e 05 ce a2 77"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)","VolumeIdentifier":"scsi:0:0"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":null}},"IsSourceThinProvisioned":false}],"NetworkInterfaces":[{"InternalIdentifier":{"Name":"Network adapter 1"},"SourceNetwork":{"VcenterNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"Network","InternalName":"network-11"},"DisplayName":"VM Network"},"VCDNetwork":null},"FailoverSettings":{"VCenterNetworkSettings":{"RecoveryNetwork":null,"IP":null,"DnsSuffix":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":null},"TestSettings":{"VCenterNetworkSettings":{"RecoveryNetwork":null,"IP":null,"DnsSuffix":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":null},"IsIPConfigurationEnabled":false,"MacAddress":"00:50:56:ac:eb:6d","vmId":{"InternalVmName":"vm-370","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"id":"vm-37000:50:56:ac:eb:6d","vmName":"liron-vm-2","nicName":"Network adapter 1","ProtectedNetwork":"VM Network","FailoverIp":"","FailoverNetwork":"No Settings","TestNetwork":"No Settings","TestIP":"","isInMultiNicVM":false,"TargetHost":null}],"CloudVmSettings":null,"TargetFolder":null,"StorageProfile":null,"JournalHardLimit":{"Type":1,"Limit":153600},"JournalWarningThreshold":{"Type":1,"Limit":115200},"_isNewVm":true,"id":"598e5def-3500-4409-a691-d25b5cd10d22vm-370","RecoveryHost":{"display":"","value":null,"filterValue":""},"RecoveryHostName":"","RecoveryDatastore":{"display":"","value":null,"filterValue":""},"RecoveryDatastoreName":"","JournalDatastores":[],"JournalDatastoresObj":{"display":null,"filterValue":null,"value":null},"JournalHardLimitObj":{"display":"150GB","value":{"Type":1,"Limit":153600},"filterValue":153600},"JournalWarningThresholdObj":{"display":"112.5GB","value":{"Type":1,"Limit":115200},"filterValue":115200}};

        expect(angular.equals(item, exp)).toBeTruthy();
    });


});
