module.exports = function GetVraListScreen() {
    return {
        "VraListTree": {
            "NodeType": 0,
            "DisplayName": "Root",
            "children": [{
                "NodeType": 1,
                "DisplayName": "Cluster-B",
                "children": [],
                "VraInfo": null,
                "HostVersion": null,
                "Selected": false
            }, {
                "NodeType": 1,
                "DisplayName": "Cluster-B",
                "children": [{
                    "NodeType": 2,
                    "DisplayName": "172.20.123.4",
                    "children": [],
                    "VraInfo": {
                        "State": {
                            "Status": 0,
                            "InstallOrUninstallProgress": 0,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "GhostStatus": {"IsGhost": false},
                            "UpgradeStatus": 4,
                            "UpgradeDetails": "Latest Version",
                            "IsEditEnabled": true,
                            "IsChangePasswordEnabled": true,
                            "IsUpgradeEnabled": false,
                            "IsUninstallEnabled": true,
                            "IsChangeHostEnabled": false
                        },
                        "HostInfo": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-23",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.4"
                        },
                        "VraInfo": {
                            "Datastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-365",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest163 MSFT Datastore"
                            },
                            "StoragePod": null,
                            "Network": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"},
                                    "InternalType": "Network",
                                    "InternalName": "network-17"
                                }, "DisplayName": "VM Network"
                            },
                            "IpConfiguration": {
                                "Ip": "172.20.123.80",
                                "NetMask": "255.255.255.0",
                                "DefaultGw": "172.20.123.254",
                                "PeerNetwork": "",
                                "PeerNetMask": "",
                                "PeerGw": ""
                            },
                            "InstalledVraVersion": "5.0",
                            "IsDhcpConf": true,
                            "BandwidthGroup": "default_group",
                            "MemoryInGB": 3,
                            "VraVM": {
                                "DisplayName": "Z-VRA-172.20.123.4",
                                "Id": {
                                    "InternalVmName": "vm-4566",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }
                            },
                            "InstalledUsingSshKey": false
                        },
                        "Version": {
                            "Version": "5.5",
                            "Build": "2068190",
                            "HostCredentialRequired": true,
                            "VibSupported": true
                        },
                        "LastError": null,
                        "IsPartOfCluster": true,
                        "ProtectedCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "RecoveryCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "SelfProtectedVpgs": 0,
                        "OwningClusterName": "Cluster-B"
                    },
                    "HostVersion": {
                        "Version": "5.5",
                        "Build": "2068190",
                        "HostCredentialRequired": true,
                        "VibSupported": true
                    },
                    "Selected": false
                }, {
                    "NodeType": 2,
                    "DisplayName": "172.20.123.5",
                    "children": [],
                    "VraInfo": {
                        "State": {
                            "Status": 0,
                            "InstallOrUninstallProgress": 0,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "GhostStatus": {"IsGhost": false},
                            "UpgradeStatus": 4,
                            "UpgradeDetails": "Latest Version",
                            "IsEditEnabled": true,
                            "IsChangePasswordEnabled": true,
                            "IsUpgradeEnabled": false,
                            "IsUninstallEnabled": true,
                            "IsChangeHostEnabled": false
                        },
                        "HostInfo": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-24",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.5"
                        },
                        "VraInfo": {
                            "Datastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-365",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest163 MSFT Datastore"
                            },
                            "StoragePod": null,
                            "Network": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"},
                                    "InternalType": "Network",
                                    "InternalName": "network-17"
                                }, "DisplayName": "VM Network"
                            },
                            "IpConfiguration": {
                                "Ip": "172.20.123.93",
                                "NetMask": "255.255.255.0",
                                "DefaultGw": "172.20.123.254",
                                "PeerNetwork": "",
                                "PeerNetMask": "",
                                "PeerGw": ""
                            },
                            "InstalledVraVersion": "5.0",
                            "IsDhcpConf": true,
                            "BandwidthGroup": "default_group",
                            "MemoryInGB": 3,
                            "VraVM": {
                                "DisplayName": "Z-VRA-172.20.123.5",
                                "Id": {
                                    "InternalVmName": "vm-4567",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }
                            },
                            "InstalledUsingSshKey": false
                        },
                        "Version": {
                            "Version": "5.5",
                            "Build": "2068190",
                            "HostCredentialRequired": true,
                            "VibSupported": true
                        },
                        "LastError": null,
                        "IsPartOfCluster": true,
                        "ProtectedCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "RecoveryCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "SelfProtectedVpgs": 0,
                        "OwningClusterName": "Cluster-B"
                    },
                    "HostVersion": {
                        "Version": "5.5",
                        "Build": "2068190",
                        "HostCredentialRequired": true,
                        "VibSupported": true
                    },
                    "Selected": false
                }, {
                    "NodeType": 2,
                    "DisplayName": "172.20.123.6",
                    "children": [],
                    "VraInfo": {
                        "State": {
                            "Status": 0,
                            "InstallOrUninstallProgress": 0,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "GhostStatus": {"IsGhost": false},
                            "UpgradeStatus": 4,
                            "UpgradeDetails": "Latest Version",
                            "IsEditEnabled": true,
                            "IsChangePasswordEnabled": true,
                            "IsUpgradeEnabled": false,
                            "IsUninstallEnabled": true,
                            "IsChangeHostEnabled": false
                        },
                        "HostInfo": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-4317",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.6"
                        },
                        "VraInfo": {
                            "Datastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-365",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest163 MSFT Datastore"
                            },
                            "StoragePod": null,
                            "Network": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"},
                                    "InternalType": "Network",
                                    "InternalName": "network-17"
                                }, "DisplayName": "VM Network"
                            },
                            "IpConfiguration": {
                                "Ip": "172.20.123.94",
                                "NetMask": "255.255.255.0",
                                "DefaultGw": "",
                                "PeerNetwork": "",
                                "PeerNetMask": "",
                                "PeerGw": ""
                            },
                            "InstalledVraVersion": "5.0",
                            "IsDhcpConf": true,
                            "BandwidthGroup": "default_group",
                            "MemoryInGB": 3,
                            "VraVM": {
                                "DisplayName": "Z-VRA-172.20.123.6",
                                "Id": {
                                    "InternalVmName": "vm-4568",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }
                            },
                            "InstalledUsingSshKey": false
                        },
                        "Version": {
                            "Version": "5.1",
                            "Build": "2323236",
                            "HostCredentialRequired": true,
                            "VibSupported": false
                        },
                        "LastError": null,
                        "IsPartOfCluster": true,
                        "ProtectedCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "RecoveryCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "SelfProtectedVpgs": 0,
                        "OwningClusterName": "Cluster-B"
                    },
                    "HostVersion": {
                        "Version": "5.1",
                        "Build": "2323236",
                        "HostCredentialRequired": true,
                        "VibSupported": false
                    },
                    "Selected": false
                }, {
                    "NodeType": 2,
                    "DisplayName": "172.20.123.7",
                    "children": [],
                    "VraInfo": {
                        "State": {
                            "Status": 0,
                            "InstallOrUninstallProgress": 0,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "GhostStatus": {"IsGhost": false},
                            "UpgradeStatus": 4,
                            "UpgradeDetails": "Latest Version",
                            "IsEditEnabled": true,
                            "IsChangePasswordEnabled": true,
                            "IsUpgradeEnabled": false,
                            "IsUninstallEnabled": true,
                            "IsChangeHostEnabled": false
                        },
                        "HostInfo": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-4319",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.7"
                        },
                        "VraInfo": {
                            "Datastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-365",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest163 MSFT Datastore"
                            },
                            "StoragePod": null,
                            "Network": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"},
                                    "InternalType": "Network",
                                    "InternalName": "network-17"
                                }, "DisplayName": "VM Network"
                            },
                            "IpConfiguration": {
                                "Ip": "172.20.123.95",
                                "NetMask": "255.255.255.0",
                                "DefaultGw": "",
                                "PeerNetwork": "",
                                "PeerNetMask": "",
                                "PeerGw": ""
                            },
                            "InstalledVraVersion": "5.0",
                            "IsDhcpConf": true,
                            "BandwidthGroup": "default_group",
                            "MemoryInGB": 3,
                            "VraVM": {
                                "DisplayName": "Z-VRA-172.20.123.7",
                                "Id": {
                                    "InternalVmName": "vm-4569",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }
                            },
                            "InstalledUsingSshKey": false
                        },
                        "Version": {
                            "Version": "5.1",
                            "Build": "2323236",
                            "HostCredentialRequired": true,
                            "VibSupported": false
                        },
                        "LastError": null,
                        "IsPartOfCluster": true,
                        "ProtectedCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "RecoveryCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "SelfProtectedVpgs": 0,
                        "OwningClusterName": "Cluster-B"
                    },
                    "HostVersion": {
                        "Version": "5.1",
                        "Build": "2323236",
                        "HostCredentialRequired": true,
                        "VibSupported": false
                    },
                    "Selected": false
                }],
                "VraInfo": null,
                "HostVersion": null,
                "Selected": false
            }, {
                "NodeType": 1,
                "DisplayName": "Cluster-A",
                "children": [],
                "VraInfo": null,
                "HostVersion": null,
                "Selected": false
            }, {
                "NodeType": 1,
                "DisplayName": "Cluster-A",
                "children": [{
                    "NodeType": 2,
                    "DisplayName": "172.20.123.1",
                    "children": [],
                    "VraInfo": {
                        "State": {
                            "Status": 0,
                            "InstallOrUninstallProgress": 0,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "GhostStatus": {"IsGhost": false},
                            "UpgradeStatus": 4,
                            "UpgradeDetails": "Latest Version",
                            "IsEditEnabled": true,
                            "IsChangePasswordEnabled": true,
                            "IsUpgradeEnabled": false,
                            "IsUninstallEnabled": true,
                            "IsChangeHostEnabled": false
                        },
                        "HostInfo": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-10",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.1"
                        },
                        "VraInfo": {
                            "Datastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-12",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "BF4BL1-01"
                            },
                            "StoragePod": null,
                            "Network": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"},
                                    "InternalType": "Network",
                                    "InternalName": "network-17"
                                }, "DisplayName": "VM Network"
                            },
                            "IpConfiguration": {
                                "Ip": "172.20.123.75",
                                "NetMask": "255.255.255.0",
                                "DefaultGw": "172.20.123.254",
                                "PeerNetwork": "",
                                "PeerNetMask": "",
                                "PeerGw": ""
                            },
                            "InstalledVraVersion": "5.0",
                            "IsDhcpConf": true,
                            "BandwidthGroup": "default_group",
                            "MemoryInGB": 3,
                            "VraVM": {
                                "DisplayName": "Z-VRA-172.20.123.1",
                                "Id": {
                                    "InternalVmName": "vm-4564",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }
                            },
                            "InstalledUsingSshKey": false
                        },
                        "Version": {
                            "Version": "5.5",
                            "Build": "2068190",
                            "HostCredentialRequired": true,
                            "VibSupported": true
                        },
                        "LastError": null,
                        "IsPartOfCluster": true,
                        "ProtectedCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "RecoveryCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "SelfProtectedVpgs": 0,
                        "OwningClusterName": "Cluster-A"
                    },
                    "HostVersion": {
                        "Version": "5.5",
                        "Build": "2068190",
                        "HostCredentialRequired": true,
                        "VibSupported": true
                    },
                    "Selected": false
                }, {
                    "NodeType": 2,
                    "DisplayName": "172.20.123.2",
                    "children": [],
                    "VraInfo": {
                        "State": {
                            "Status": 0,
                            "InstallOrUninstallProgress": 0,
                            "AlertStatus": 0,
                            "AlertTips": {
                                "Alerts": [],
                                "HasMore": false,
                                "TotalNumberOfAlerts": 0,
                                "TotalNumberOfWarnings": 0,
                                "TotalNumberOfErrors": 0
                            },
                            "GhostStatus": {"IsGhost": false},
                            "UpgradeStatus": 4,
                            "UpgradeDetails": "Latest Version",
                            "IsEditEnabled": true,
                            "IsChangePasswordEnabled": true,
                            "IsUpgradeEnabled": false,
                            "IsUninstallEnabled": true,
                            "IsChangeHostEnabled": false
                        },
                        "HostInfo": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-11",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.123.2"
                        },
                        "VraInfo": {
                            "Datastore": {
                                "Id": {
                                    "InternalDatastoreName": "datastore-19",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }, "DatastoreClusterIdentifier": null, "DisplayName": "BF4BL1-02"
                            },
                            "StoragePod": null,
                            "Network": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"},
                                    "InternalType": "Network",
                                    "InternalName": "network-17"
                                }, "DisplayName": "VM Network"
                            },
                            "IpConfiguration": {
                                "Ip": "172.20.123.77",
                                "NetMask": "255.255.255.0",
                                "DefaultGw": "172.20.123.254",
                                "PeerNetwork": "",
                                "PeerNetMask": "",
                                "PeerGw": ""
                            },
                            "InstalledVraVersion": "5.0",
                            "IsDhcpConf": true,
                            "BandwidthGroup": "default_group",
                            "MemoryInGB": 3,
                            "VraVM": {
                                "DisplayName": "Z-VRA-172.20.123.2",
                                "Id": {
                                    "InternalVmName": "vm-4565",
                                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                                }
                            },
                            "InstalledUsingSshKey": false
                        },
                        "Version": {
                            "Version": "5.5",
                            "Build": "1331820",
                            "HostCredentialRequired": true,
                            "VibSupported": true
                        },
                        "LastError": null,
                        "IsPartOfCluster": true,
                        "ProtectedCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "RecoveryCounters": {
                            "Vpgs": 0,
                            "Vms": 0,
                            "PromotingVms": 0,
                            "TestOrRecoverBeforeCommitVms": 0,
                            "Volumes": 0,
                            "StorageSizeInMB": 0
                        },
                        "SelfProtectedVpgs": 0,
                        "OwningClusterName": "Cluster-A"
                    },
                    "HostVersion": {
                        "Version": "5.5",
                        "Build": "1331820",
                        "HostCredentialRequired": true,
                        "VibSupported": true
                    },
                    "Selected": false
                }],
                "VraInfo": null,
                "HostVersion": null,
                "Selected": false
            }],
            "VraInfo": null,
            "HostVersion": null,
            "Selected": false
        },
        "CanInstallAdditionalVras": false,
        "LatestVraVersion": "5.0 Update 1 Build 050101156",
        "EnableManageVras": true,
        "EnablePairedSiteRouting": true
    }
};
