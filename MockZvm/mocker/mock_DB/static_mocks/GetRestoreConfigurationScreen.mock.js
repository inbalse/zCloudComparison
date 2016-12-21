module.exports = function GetRestoreConfigurationScreen() {
    return {
        "PotentialRestoreMainEntities": {
            "PotentialComputeResources": [{
                "BaseComputeResourceIdentifier": {
                    "InternalName": "host-9",
                    "Type": 0,
                    "ServerIdentifier": {
                        "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                    }
                },
                "ResourcePoolIdentifier": null,
                "DisplayName": "172.20.70.17"
            }],
            "PotentialOrgVdc": null
        },
        "Configuration": {
            "VirtualMachines": [{
                "VMIdentifier": {
                    "InternalVmName": "vm-159",
                    "ServerIdentifier": {
                        "ServerGuid": "db1a77e2-d019-4ce4-b7c1-70d8ac80e68c"
                    }
                },
                "Name": "10 vol",
                "ComputeResource": null,
                "Datastore": null,
                "VMFolder": null,
                "StorageProfile": null,
                "Status": "Full",
                "FullVolumes": 10,
                "TotalVolumes": 10,
                "IsPowerOn": false,
                "Volumes": [{
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                            "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                        },
                        "UnitNumber": 1,
                        "ControllerNumber": 0,
                        "VolumeType": 0,
                        "DlpDescription": "Scsi(0:1)",
                        "VolumeIdentifier": "scsi:0:1"
                    },
                    "Path": "10 vol/10 vol_1.vmdk",
                    "IsThinEnabled": true,
                    "Destination": {
                        "Datastore": null
                    }
                },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 0,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:0)",
                            "VolumeIdentifier": "scsi:0:0"
                        },
                        "Path": "10 vol/10 vol.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 3,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:3)",
                            "VolumeIdentifier": "scsi:0:3"
                        },
                        "Path": "10 vol/10 vol_3.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 2,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:2)",
                            "VolumeIdentifier": "scsi:0:2"
                        },
                        "Path": "10 vol/10 vol_2.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 5,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:5)",
                            "VolumeIdentifier": "scsi:0:5"
                        },
                        "Path": "10 vol/10 vol_5.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 4,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:4)",
                            "VolumeIdentifier": "scsi:0:4"
                        },
                        "Path": "10 vol/10 vol_4.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 6,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:6)",
                            "VolumeIdentifier": "scsi:0:6"
                        },
                        "Path": "10 vol/10 vol_6.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 9,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:9)",
                            "VolumeIdentifier": "scsi:0:9"
                        },
                        "Path": "10 vol/10 vol_8.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 8,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:8)",
                            "VolumeIdentifier": "scsi:0:8"
                        },
                        "Path": "10 vol/10 vol_7.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 10,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:10)",
                            "VolumeIdentifier": "scsi:0:10"
                        },
                        "Path": "10 vol/10 vol_9.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    }],
                "VNics": [{
                    "DisplayName": "Network adapter 1",
                    "VNicIdentifier": {
                        "Name": "Network adapter 1"
                    },
                    "VCenterVNicRestoreConfiguration": {
                        "Network": null,
                        "IsNewMacAddress": false,
                        "IPConfiguration": {
                            "Type": 2,
                            "IP": null,
                            "SubnetMask": null,
                            "Gateway": null,
                            "PrimaryDns": null,
                            "SecondaryDns": null,
                            "DnsSuffix": null
                        },
                        "IsIPConfigurationEnabled": true
                    },
                    "VcdVNicRestoreConfiguration": null
                }]
            },
                {
                    "VMIdentifier": {
                        "InternalVmName": "vm-160",
                        "ServerIdentifier": {
                            "ServerGuid": "db1a77e2-d019-4ce4-b7c1-70d8ac80e68c"
                        }
                    },
                    "Name": "10 vol(2)",
                    "ComputeResource": null,
                    "Datastore": null,
                    "VMFolder": null,
                    "StorageProfile": null,
                    "Status": "Full",
                    "FullVolumes": 10,
                    "TotalVolumes": 10,
                    "IsPowerOn": false,
                    "Volumes": [{
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                            },
                            "UnitNumber": 2,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:2)",
                            "VolumeIdentifier": "scsi:0:2"
                        },
                        "Path": "10 vol(2)/10 vol(2)_2.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": null
                        }
                    },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 3,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:3)",
                                "VolumeIdentifier": "scsi:0:3"
                            },
                            "Path": "10 vol(2)/10 vol(2)_3.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 0,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:0)",
                                "VolumeIdentifier": "scsi:0:0"
                            },
                            "Path": "10 vol(2)/10 vol(2).vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 1,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:1)",
                                "VolumeIdentifier": "scsi:0:1"
                            },
                            "Path": "10 vol(2)/10 vol(2)_1.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 6,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:6)",
                                "VolumeIdentifier": "scsi:0:6"
                            },
                            "Path": "10 vol(2)/10 vol(2)_6.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 4,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:4)",
                                "VolumeIdentifier": "scsi:0:4"
                            },
                            "Path": "10 vol(2)/10 vol(2)_4.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 5,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:5)",
                                "VolumeIdentifier": "scsi:0:5"
                            },
                            "Path": "10 vol(2)/10 vol(2)_5.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 10,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:10)",
                                "VolumeIdentifier": "scsi:0:10"
                            },
                            "Path": "10 vol(2)/10 vol(2)_9.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 8,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:8)",
                                "VolumeIdentifier": "scsi:0:8"
                            },
                            "Path": "10 vol(2)/10 vol(2)_7.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 9,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:9)",
                                "VolumeIdentifier": "scsi:0:9"
                            },
                            "Path": "10 vol(2)/10 vol(2)_8.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": null
                            }
                        }],
                    "VNics": [{
                        "DisplayName": "Network adapter 1",
                        "VNicIdentifier": {
                            "Name": "Network adapter 1"
                        },
                        "VCenterVNicRestoreConfiguration": {
                            "Network": null,
                            "IsNewMacAddress": false,
                            "IPConfiguration": {
                                "Type": 2,
                                "IP": null,
                                "SubnetMask": null,
                                "Gateway": null,
                                "PrimaryDns": null,
                                "SecondaryDns": null,
                                "DnsSuffix": null
                            },
                            "IsIPConfigurationEnabled": true
                        },
                        "VcdVNicRestoreConfiguration": null
                    }]
                }],
            "SelectedOrgVdc": null
        },
        "PopulatedConfiguration": {
            "VirtualMachines": [{
                "VMIdentifier": {
                    "InternalVmName": "vm-159",
                    "ServerIdentifier": {
                        "ServerGuid": "db1a77e2-d019-4ce4-b7c1-70d8ac80e68c"
                    }
                },
                "Name": "10 vol",
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-9",
                        "Type": 0,
                        "ServerIdentifier": {
                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                        }
                    },
                    "ResourcePoolIdentifier": null,
                    "DisplayName": "172.20.70.17"
                },
                "Datastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-10",
                        "ServerIdentifier": {
                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                },
                "VMFolder": {
                    "Id": {
                        "InternalFolderName": "group-v3",
                        "ServerIdentifier": {
                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                        }
                    },
                    "DisplayName": "/"
                },
                "StorageProfile": null,
                "Status": "Full",
                "FullVolumes": 10,
                "TotalVolumes": 10,
                "IsPowerOn": false,
                "Volumes": [{
                    "DiskLocationParams": {
                        "VMUuids": {
                            "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                            "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                        },
                        "UnitNumber": 1,
                        "ControllerNumber": 0,
                        "VolumeType": 0,
                        "DlpDescription": "Scsi(0:1)",
                        "VolumeIdentifier": "scsi:0:1"
                    },
                    "Path": "10 vol/10 vol_1.vmdk",
                    "IsThinEnabled": true,
                    "Destination": {
                        "Datastore": {
                            "Datastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-10",
                                    "ServerIdentifier": {
                                        "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                    }
                                },
                                "DatastoreClusterIdentifier": null,
                                "DisplayName": "BA6BL01-04_NTAP_DS2"
                            }
                        }
                    }
                },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 0,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:0)",
                            "VolumeIdentifier": "scsi:0:0"
                        },
                        "Path": "10 vol/10 vol.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 3,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:3)",
                            "VolumeIdentifier": "scsi:0:3"
                        },
                        "Path": "10 vol/10 vol_3.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 2,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:2)",
                            "VolumeIdentifier": "scsi:0:2"
                        },
                        "Path": "10 vol/10 vol_2.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 5,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:5)",
                            "VolumeIdentifier": "scsi:0:5"
                        },
                        "Path": "10 vol/10 vol_5.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 4,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:4)",
                            "VolumeIdentifier": "scsi:0:4"
                        },
                        "Path": "10 vol/10 vol_4.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 6,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:6)",
                            "VolumeIdentifier": "scsi:0:6"
                        },
                        "Path": "10 vol/10 vol_6.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 9,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:9)",
                            "VolumeIdentifier": "scsi:0:9"
                        },
                        "Path": "10 vol/10 vol_8.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 8,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:8)",
                            "VolumeIdentifier": "scsi:0:8"
                        },
                        "Path": "10 vol/10 vol_7.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                    {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 dd 26 48 55 b0 24-d5 ee 4e 28 51 16 b8 58",
                                "InstanceUuid": "50 16 7c c3 f6 8d cb f4-44 d3 d1 c4 50 0c 3a c5"
                            },
                            "UnitNumber": 10,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:10)",
                            "VolumeIdentifier": "scsi:0:10"
                        },
                        "Path": "10 vol/10 vol_9.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    }],
                "VNics": [{
                    "DisplayName": "Network adapter 1",
                    "VNicIdentifier": {
                        "Name": "Network adapter 1"
                    },
                    "VCenterVNicRestoreConfiguration": {
                        "Network": {
                            "Id": {
                                "ServerIdentifier": {
                                    "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                },
                                "InternalType": "Network",
                                "InternalName": "network-12"
                            },
                            "DisplayName": "VM Network"
                        },
                        "IsNewMacAddress": false,
                        "IPConfiguration": {
                            "Type": 2,
                            "IP": null,
                            "SubnetMask": null,
                            "Gateway": null,
                            "PrimaryDns": null,
                            "SecondaryDns": null,
                            "DnsSuffix": null
                        },
                        "IsIPConfigurationEnabled": true
                    },
                    "VcdVNicRestoreConfiguration": null
                }]
            },
                {
                    "VMIdentifier": {
                        "InternalVmName": "vm-160",
                        "ServerIdentifier": {
                            "ServerGuid": "db1a77e2-d019-4ce4-b7c1-70d8ac80e68c"
                        }
                    },
                    "Name": "10 vol(2)",
                    "ComputeResource": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {
                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                            }
                        },
                        "ResourcePoolIdentifier": null,
                        "DisplayName": "172.20.70.17"
                    },
                    "Datastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-10",
                            "ServerIdentifier": {
                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                            }
                        },
                        "DatastoreClusterIdentifier": null,
                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                    },
                    "VMFolder": {
                        "Id": {
                            "InternalFolderName": "group-v3",
                            "ServerIdentifier": {
                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                            }
                        },
                        "DisplayName": "/"
                    },
                    "StorageProfile": null,
                    "Status": "Full",
                    "FullVolumes": 10,
                    "TotalVolumes": 10,
                    "IsPowerOn": false,
                    "Volumes": [{
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                            },
                            "UnitNumber": 2,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:2)",
                            "VolumeIdentifier": "scsi:0:2"
                        },
                        "Path": "10 vol(2)/10 vol(2)_2.vmdk",
                        "IsThinEnabled": true,
                        "Destination": {
                            "Datastore": {
                                "Datastore": {
                                    "Id": {
                                        "InternalDatastoreName": "datastore-10",
                                        "ServerIdentifier": {
                                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                        }
                                    },
                                    "DatastoreClusterIdentifier": null,
                                    "DisplayName": "BA6BL01-04_NTAP_DS2"
                                }
                            }
                        }
                    },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 3,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:3)",
                                "VolumeIdentifier": "scsi:0:3"
                            },
                            "Path": "10 vol(2)/10 vol(2)_3.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 0,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:0)",
                                "VolumeIdentifier": "scsi:0:0"
                            },
                            "Path": "10 vol(2)/10 vol(2).vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 1,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:1)",
                                "VolumeIdentifier": "scsi:0:1"
                            },
                            "Path": "10 vol(2)/10 vol(2)_1.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 6,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:6)",
                                "VolumeIdentifier": "scsi:0:6"
                            },
                            "Path": "10 vol(2)/10 vol(2)_6.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 4,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:4)",
                                "VolumeIdentifier": "scsi:0:4"
                            },
                            "Path": "10 vol(2)/10 vol(2)_4.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 5,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:5)",
                                "VolumeIdentifier": "scsi:0:5"
                            },
                            "Path": "10 vol(2)/10 vol(2)_5.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 10,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:10)",
                                "VolumeIdentifier": "scsi:0:10"
                            },
                            "Path": "10 vol(2)/10 vol(2)_9.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 8,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:8)",
                                "VolumeIdentifier": "scsi:0:8"
                            },
                            "Path": "10 vol(2)/10 vol(2)_7.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        },
                        {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 16 9b 8d f0 4e fc 44-0d 57 66 aa 81 e5 57 71",
                                    "InstanceUuid": "50 16 94 c2 66 18 b3 14-3f 97 af 27 e0 53 e2 23"
                                },
                                "UnitNumber": 9,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:9)",
                                "VolumeIdentifier": "scsi:0:9"
                            },
                            "Path": "10 vol(2)/10 vol(2)_8.vmdk",
                            "IsThinEnabled": true,
                            "Destination": {
                                "Datastore": {
                                    "Datastore": {
                                        "Id": {
                                            "InternalDatastoreName": "datastore-10",
                                            "ServerIdentifier": {
                                                "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                            }
                                        },
                                        "DatastoreClusterIdentifier": null,
                                        "DisplayName": "BA6BL01-04_NTAP_DS2"
                                    }
                                }
                            }
                        }],
                    "VNics": [{
                        "DisplayName": "Network adapter 1",
                        "VNicIdentifier": {
                            "Name": "Network adapter 1"
                        },
                        "VCenterVNicRestoreConfiguration": {
                            "Network": {
                                "Id": {
                                    "ServerIdentifier": {
                                        "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                                    },
                                    "InternalType": "Network",
                                    "InternalName": "network-12"
                                },
                                "DisplayName": "VM Network"
                            },
                            "IsNewMacAddress": false,
                            "IPConfiguration": {
                                "Type": 2,
                                "IP": null,
                                "SubnetMask": null,
                                "Gateway": null,
                                "PrimaryDns": null,
                                "SecondaryDns": null,
                                "DnsSuffix": null
                            },
                            "IsIPConfigurationEnabled": true
                        },
                        "VcdVNicRestoreConfiguration": null
                    }]
                }],
            "SelectedOrgVdc": null
        },
        "SiteIdentifier": {
            "SiteGuid": "e67eb594-382d-4929-b6cb-121cbbdf6143"
        },
        "BackupTargetIdentifier": {
            "Identifier": "0867b5ad-e193-4200-8135-fc846cdb467a"
        },
        "BackupJobIdentifier": {
            "Identifier": "0902620d-4025-4d27-904e-0656658a9920"
        },
        "Type": 0
    };
};
