module.exports = function GetInitialSettingsForVirtualMachine() {
    return {
        "InternalVirtualMachineId": {
            "InternalVmName": "InternalVmName-MOCK",
            "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
        },
        "Name": "WinOVF_forfVCD",
        "SourceHost": {
            "BaseComputeResourceIdentifier": {
                "InternalName": "host-11",
                "Type": 0,
                "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.149.20"
        },
        "SourceDatastore": {
            "Id": {
                "InternalDatastoreName": "datastore-16",
                "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}
            }, "DatastoreClusterIdentifier": null, "DisplayName": "Cluster IS-6-14 BA5-20 iSCSI DSII"
        },
        "TargetHost": null,
        "TargetDatastore": null,
        "StorageUsageInfo": {
            "ProvisionedStorageSizeInMB": 7363,
            "UsedStorageSizeInMB": 2469,
            "RecoveryStorageSizeInMB": 0
        },
        "Volumes": [{
            "SourceAddress": "[Cluster IS-6-14 BA5-20 iSCSI DSII]:WinOVF_forfVCD_1/WinOVF_forfVCD.vmdk",
            "TargetAddress": null,
            "Swap": false,
            "ProvisionedSizeInMB": 5120,
            "InternalVolumeManagementSettings": {
                "DiskLocationParams": {
                    "VMUuids": {
                        "Uuid": "42 07 44 84 00 0d 41 d1-59 69 bf ee 09 22 6e 44",
                        "InstanceUuid": "50 07 98 10 21 e4 bf 81-d1 d2 a8 1c 53 1b f7 7a"
                    }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0, "DlpDescription": "Scsi(0:0)"
                }, "Settings": {"IsSwap": false, "VolumeReplicationDestination": {VCDDatastore: {IsThin: true}}}
            },
            "IsSourceThinProvisioned": true
        }],
        "NetworkInterfaces": [{
            "InternalIdentifier": {"Name": "Network adapter 1"},
            "SourceNetwork": {
                "VcenterNetwork": {
                    "Id": {
                        "ServerIdentifier": {"ServerGuid": "a8fed6cd-68ed-4f16-9a03-e1ac683c2828"},
                        "InternalType": "Network",
                        "InternalName": "network-22"
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
            "IsIPConfigurationEnabled": true,
            "MacAddress": "00:50:56:87:10:ec"
        }],
        "CloudVmSettings": null,
        "TargetFolder": null,
        "StorageProfile": null,
        "JournalHardLimit": {"Type": 0, "Limit": 0},
        "JournalWarningThreshold": {"Type": 0, "Limit": 0},
        "JournalDatastores": []
    }
};
