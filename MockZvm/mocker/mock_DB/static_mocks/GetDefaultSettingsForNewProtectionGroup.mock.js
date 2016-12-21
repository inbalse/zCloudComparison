module.exports = function GetDefaultSettingsForNewProtectionGroup() {
    return {
        "Config": {
            "Name": "New VPG",
            "Configuration": {
                "Priority": 1,
                "MinimalJournalLenghtInMinutes": 240,
                "RPOThressholdInSeconds": 300,
                "MaxTestIntervalInMinutes": 0,
                "WanCompression": true,
                "ScriptingSettings": {
                    "PreRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                    "PostRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                    "UseScripts": false
                },
                "ManageJournalSettings": {
                    "JournalDatastore": null,
                    "JournalHardLimitPerVM": {"Type": 2, "Limit": 75},
                    "JournalWarningThresholdPerVM": {"Type": 2, "Limit": 50}
                },
                "BootOrder": {
                    "Groups": [{
                        "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                        "Name": "Default",
                        "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                        "Machines": []
                    }]
                },
                "ServiceProfile": {
                    "SelectedIdentifier": {"InternalId": "99320616-bd16-4ff0-97ae-4847252dbebe"},
                    "Name": "System Service Profile"
                },
                "Backup": {
                    "Target": {"SelectedTarget": null},
                    "Scheduler": {
                        "RunningTime": {"SchedulePeriodType": 0, "RunningTimeOfDayInMinutes": 0, "DayOfWeek": 6},
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
                "CopyNatServiceAvailable": true,
                "JournalHealthSettings": {
                    "IsEnabled": true,
                    "IsFeatureSupported": true,
                    "JournalHealthInMinutes": 720
                }
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
            "ProtectedVappSettings": null,
            "RecoveryVappSettings": null,
            "VirtualMachines": [],
            "OwnersId": {"OwnersGuid": "fd4f619b-c98b-4366-87ea-010582fa62ba"},
            "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
        },
        "TargetSiteInfo": {
            "OwnersId": {
                "Id": {"OwnersGuid": "fd4f619b-c98b-4366-87ea-010582fa62ba"},
                "DisplayName": "172.20.143.20(172.20.149.6)",
                "IsLocal": false
            },
            "PotentialReplicationDestinations": [{
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-9",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "[clus]172.20.143.2"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "clus"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-21",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus PVDC"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-45",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus OVDC (f51ed879-e21f-40b5-afe8-281289357f4e)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-79",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus OVDC3 (fe4c36ca-d760-4773-ba4b-3586d84cefa8)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-82",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus OVDC3.1 (12d6de54-db60-4a66-86a8-6c9cd38d88af)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-91",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus OVDC_new (311f6111-fa23-424b-9e53-b5bfdc2b16b9)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-308",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus Hosting_Cloud2_OVDC1 (48d31475-f738-4214-be17-e64f4515ad7d)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-325",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus DR_CustB_Cloud2_OVDC1 (365ee90a-6fb7-4417-b718-393e71a18beb)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-329",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus DR_CustB_Cloud2_OVDC2 (478df018-c0ad-43b1-8b64-34a97c6df310)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-316",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus DR_CustA_Cloud2_OVDC1 (2129c158-aaf9-4b90-8094-4ce3b29da635)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-61",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus OVDC2 (45fc2785-6307-4d48-81f1-0ae160fa88b9)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-22",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus System vDC (48aef3a5-11ce-429b-9ea8-aeef0704682f)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-320",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus DR_CustA_Cloud2_OVDC2 (b4d08156-8014-4868-aeda-689cd9811460)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-312",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus Hosting_Cloud2_OVDC2 (da160d2c-d661-44d7-80b1-9c58cb88a5d9)"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-182",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus VC_DR_CustA1"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-2291",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus ZETA"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            }, {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "domain-c7",
                        "Type": 1,
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "ResourcePoolIdentifier": {
                        "InternalName": "resgroup-3107",
                        "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                    },
                    "DisplayName": "RP:clus VC_DR_CustB"
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
            "PotentialServiceProfiles": [{
                "Identifier": {"InternalId": "99320616-bd16-4ff0-97ae-4847252dbebe"},
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
                "Identifier": {"InternalId": "c09e8226-64a1-4a56-838d-b937f4f5df4c"},
                "Name": "Silver",
                "Rpo": {"RpoInSeconds": 600, "DisplayName": "10 minutes"},
                "History": {"HistoryInMinutes": 1440, "DisplayName": "24 hours"},
                "MaxJournalSize": {"MaxJournalSizeInPercent": 99, "DisplayName": "99%"},
                "WarningThreshold": {"JournalWarningThresholdInPercent": 0, "DisplayName": "Unlimited"},
                "TestInterval": {"TestIntervalInMinutes": 0, "DisplayName": "None"},
                "Description": "Silver service profile",
                "IsEditable": false,
                "RetentionPolicy": {"RetentionPolicy": 0, "DisplayName": "Disaster Recovery"},
                "RestorePointRange": {"RestorePointRange": 1, "DisplayName": "1 Month"},
                "BackupScheduledPeriod": {"SchedulePeriodType": 0, "DayOfWeek": 6}
            }, {
                "Identifier": {"InternalId": "6c2b45dd-01d9-4c9f-b57f-1057258b6026"},
                "Name": "Bronze",
                "Rpo": {"RpoInSeconds": 43200, "DisplayName": "12 hours"},
                "History": {"HistoryInMinutes": 60, "DisplayName": "1 hour"},
                "MaxJournalSize": {"MaxJournalSizeInPercent": 2, "DisplayName": "2%"},
                "WarningThreshold": {"JournalWarningThresholdInPercent": 0, "DisplayName": "Unlimited"},
                "TestInterval": {"TestIntervalInMinutes": 0, "DisplayName": "None"},
                "Description": "nothing",
                "IsEditable": false,
                "RetentionPolicy": {"RetentionPolicy": 0, "DisplayName": "Disaster Recovery"},
                "RestorePointRange": {"RestorePointRange": 1, "DisplayName": "1 Month"},
                "BackupScheduledPeriod": {"SchedulePeriodType": 0, "DayOfWeek": 6}
            }, {
                "Identifier": {"InternalId": "6e15424e-8062-4c8a-a02e-f72716bbf88d"},
                "Name": "Gold",
                "Rpo": {"RpoInSeconds": 60, "DisplayName": "1 minute"},
                "History": {"HistoryInMinutes": 7200, "DisplayName": "120 hours"},
                "MaxJournalSize": {"MaxJournalSizeInPercent": 0, "DisplayName": "Unlimited"},
                "WarningThreshold": {"JournalWarningThresholdInPercent": 0, "DisplayName": "Unlimited"},
                "TestInterval": {"TestIntervalInMinutes": 0, "DisplayName": "None"},
                "Description": "Gold",
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
            "PotentialPublicCloudPcns": {"PotentialPcns": []},
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
                    "Id": {"OwnersGuid": "fd4f619b-c98b-4366-87ea-010582fa62ba"},
                    "DisplayName": "172.20.143.20(172.20.149.6)",
                    "IsLocal": false
                },
                "SiteId": {"SiteGuid": "3a49f0ce-2088-4888-b66a-82e76815ae80"},
                "IsConnected": true,
                "IsVCenterEnabled": true,
                "IsVCDEnabled": false,
                "IsScvmmEnabled": false,
                "IsPublicCloud": false
            },
            "PotentialPublicCloudInstanceTypeVisualObjects": []
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
            "Identifier": {"Guid": "d5b947a0-9540-4312-acf0-c01e3c3cf418"},
            "OrganizationName": "DR_CustA",
            "CrmIdentifier": "Zeta CRM",
            "EnableCustomProfile": true
        }, {
            "Identifier": {"Guid": "d5b947a0-9540-4312-acf0-c01e3c3cf418"},
            "OrganizationName": "DR_CustB",
            "CrmIdentifier": "Zeta CRM",
            "EnableCustomProfile": false

        }, {
            "Identifier": {"Guid": "d5b947a0-9540-4312-acf0-c01e3c3cf418"},
            "OrganizationName": "DR_CustC",
            "CrmIdentifier": "Zeta CRM",
            "EnableCustomProfile": true
        }, {
            "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
            "OrganizationName": "No Organization",
            "CrmIdentifier": "No Contact",
            "EnableCustomProfile": true
        }],
        "IsEnableVmJournalDatastoreSelection": true
    }
};
