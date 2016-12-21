'use strict';
describe("vpg status controller", function () {
    var controller, parentController, testScope, parentScope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate) {
        parentScope = $rootScope.$new();
        testScope = parentScope.$new();

        parentController = $controller('vpgDetailsController', {$scope: parentScope, globalStateModel: {data:{isPortal:false}}});
        controller = $controller('vpgStatusController', {$scope: testScope, $translate: $translate});
    }));

    it("should test the apply journal details function", function () {
        testScope.vpgData = {
            "RemoteSiteConnected": true,
            "ProtectionGroupId": {"GroupGuid": "e8e18eb7-aa8a-4294-ac62-afee5d622abf"},
            "VpgConfiguration": {
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
                    JournalHealthSettings: {
                        JournalHealthInMinutes: 300
                    },
                    "BootOrder": {
                        "Groups": [{
                            "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                            "Name": "Default",
                            "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                            "Machines": [{
                                "DisplayName": "Evgeny-vm1",
                                "Id": {
                                    "InternalVmName": "vm-273",
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                }
                            }]
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
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
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
                    "TargetFolder": null,
                    "FailoverVCDVAppNetwork": null,
                    "TestVCDVAppNetwork": null
                },
                "ProtectedVappSettings": null,
                "RecoveryVappSettings": null,
                "VirtualMachines": [{
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-273",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "Evgeny-vm1",
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
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 258,
                        "UsedStorageSizeInMB": 40,
                        "RecoveryStorageSizeInMB": 200
                    },
                    "Volumes": [{
                        "SourceAddress": "[datastore1]:Evgeny-vm1/Evgeny-vm1.vmdk",
                        "TargetAddress": "ZNest81Datastore",
                        "Swap": false,
                        "ProvisionedSizeInMB": 40,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d 8e b8 54 3d dd 4a-b5 9c 7a 84 5b 26 c9 6c",
                                    "InstanceUuid": "50 3d 71 00 15 a6 cd 2e-63 3a 27 43 d0 01 24 d5"
                                }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-12",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": false
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
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
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
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
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:bd:9d:24"
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
                    "JournalDatastores": []
                }],
                "OwnersId": {"OwnersGuid": "5d6aa4f5-9613-43a2-a3f7-da3ce1f6527d"},
                "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
            },
            "State": {
                "State": 0,
                "Status": 1,
                "SubStatus": 0,
                "IsProgressActive": false,
                "ProgressPercentage": 0,
                "ProgressDetails": null,
                "IsFailoverEnabled": true,
                "IsMoveEnabled": true,
                "IsFailoverTestEnabled": true,
                "IsUpdateEnabled": true,
                "IsInsertCheckpointEnabled": true,
                "RelevantCheckpoint": null,
                "IsProtectedSiteConnected": true,
                "AlertStatus": 0,
                "AlertTips": {"Alerts": [], "HasMore": false, "TotalNumberOfAlerts": 0},
                "IsDeleteEnabled": true,
                "IsForceSyncEnabled": true,
                "IsCloneEnabled": true,
                "VPGTimebombInfo": null,
                "CloneStatusVisualObject": null,
                "IsMoveInStagesSupported": true,
                "IsFailoverInStagesSupported": true,
                "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
                "RequiresForceToDelete": false,
                "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": true, "IsResumeEnabled": false},
                "IsRecoverCommitEnabled": false,
                "IsRecoverRollbackEnabled": false,
                "ActiveProcesses": {
                    "RunningFailOverTest": null,
                    "RunningClone": null,
                    "Paused": null,
                    "IsVpgNowPaused": false,
                    "IsResumeEnabled": false,
                    "RunningBackup": null,
                    "IsStopFOTEnabled": false,
                    "VpgUpdate": null,
                    "TimebombInfo": null
                },
                "ButtonsState": {
                    "IsFailoverEnabled": true,
                    "IsMoveEnabled": true,
                    "IsFailoverTestEnabled": true,
                    "IsUpdateEnabled": true,
                    "IsPauseEnabled": true,
                    "IsInsertCheckpointEnabled": true,
                    "IsProtectedSiteConnected": true,
                    "IsDeleteEnabled": true,
                    "IsForceSyncEnabled": true,
                    "IsCloneEnabled": true,
                    "IsMoveInStagesSupported": true,
                    "IsFailoverInStagesSupported": true,
                    "IsRecoverCommitEnabled": false,
                    "IsRecoverRollbackEnabled": false,
                    "RequiresForceToDelete": false,
                    "IsBackupEnabled": false,
                    "IsAbortBackupEnabled": false
                },
                "ProgressObject": null
            },
            "Reason": "",
            "SiteDetails": {
                "SiteName": "Unconfigured site name",
                "IpAddress": "127.0.0.1",
                "VCenterName": "ZNest81VC",
                "CurrentLocalTime": "09:03",
                "ContactInfo": "Unconfigured contact info",
                "ContactEmail": "Unconfigured contact email",
                "ContactPhone": "Unconfigured contact phone",
                "ServerId": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                "Location": "Unconfigured location",
                "LicenseType": 1
            },
            "Summary": {
                "NumberOfVms": 1,
                "NumberOfProvisionedMB": 258,
                "NumberOfUsedMB": 40,
                "RecoveryStorageSizeInMB": 200,
                "LastTest": null,
                "HistoryInSeconds": 174,
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "EarliestCheckpoint": {
                    "TimeStamp":  "2014-09-15T06:00:49.038Z"
                }
            },
            "Performance": {
                "IncomingIOPS": {
                    "Values": [{"Value": 0, "Time": "2014-09-15T06:00:39.347Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:00:49.038Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:00:59.052Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:09.035Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:19.057Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:29.034Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:39.043Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:49.036Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:59.056Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:09.054Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:19.062Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:29.044Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:39.063Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:49.065Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:59.042Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:09.337Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:03:19.050Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:29.032Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:03:39.093Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:49.050Z"
                    }], "MaxVerticalAxisScale": 120
                },
                "RPOInSeconds": {
                    "Values": [{
                        "Value": -2147483648,
                        "Time": "2014-09-15T06:00:39.347Z"
                    }, {"Value": -2147483648, "Time": "2014-09-15T06:00:49.038Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:00:59.052Z"
                    }, {"Value": 4, "Time": "2014-09-15T06:01:09.035Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:01:19.057Z"
                    }, {"Value": 4, "Time": "2014-09-15T06:01:29.034Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:01:39.043Z"
                    }, {"Value": 9, "Time": "2014-09-15T06:01:49.036Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:01:59.056Z"
                    }, {"Value": 4, "Time": "2014-09-15T06:02:09.054Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:02:19.062Z"
                    }, {"Value": 4, "Time": "2014-09-15T06:02:29.044Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:02:39.063Z"
                    }, {"Value": 4, "Time": "2014-09-15T06:02:49.065Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:02:59.042Z"
                    }, {"Value": 5, "Time": "2014-09-15T06:03:09.337Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:03:19.050Z"
                    }, {"Value": 4, "Time": "2014-09-15T06:03:29.032Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T06:03:39.093Z"
                    }, {"Value": 4, "Time": "2014-09-15T06:03:49.050Z"}], "MaxVerticalAxisScale": 72
                },
                "IncomingThroughputInMb": {
                    "Values": [{"Value": 0, "Time": "2014-09-15T06:00:39.347Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:00:49.038Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:00:59.052Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:09.035Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:19.057Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:29.034Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:39.043Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:49.036Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:59.056Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:09.054Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:19.062Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:29.044Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:39.063Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:49.065Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:59.042Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:09.337Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:03:19.050Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:29.032Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:03:39.093Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:49.050Z"
                    }], "MaxVerticalAxisScale": 24
                },
                "OutgoingBandWidth": {
                    "Values": [{"Value": 0, "Time": "2014-09-15T06:00:39.347Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:00:49.038Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:00:59.052Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:09.035Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:19.057Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:29.034Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:39.043Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:01:49.036Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:01:59.056Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:09.054Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:19.062Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:29.044Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:39.063Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:02:49.065Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:02:59.042Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:09.337Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:03:19.050Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:29.032Z"
                    }, {"Value": 0, "Time": "2014-09-15T06:03:39.093Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T06:03:49.050Z"
                    }], "MaxVerticalAxisScale": 24
                }
            },
            "SitesInfo": {
                "SourceSiteName": "Unconfigured site name",
                "TargetSiteName": "Unconfigured site name",
                "CustomerName": "N/A"
            },
            "CloneStatus": null,
            "Entities": {"Source": 0, "Target": 0},
            "LastUserActivityFailed": false,
            "ConfigurationFlags": {
                "IsStorageProfileEnabled": false,
                "IsCompressionConfigurable": true,
                "IsVmFolderConfigurable": true,
                "IsBackupFeatureSupported": true
            },
            "IsManageSiteSettingsEnabled": true,
            "Direction": 2,
            "ZorgId": null
        };
        testScope.applyJournalDetails();
        expect(testScope.timeFrame).toEqual('VPG_DETAILS.STATUS.MINUTES');
        expect(testScope.historyFormatted).toEqual('00:02');
        expect(testScope.ringColors).toEqual(['#8d9fb8', '#e1e1e5']);
        expect(testScope.ringData).toEqual([3, 237]);
    });

    it("should test the applyBackupDetails function", function () {
        testScope.vpgData = {
            "RemoteSiteConnected": true,
            "ProtectionGroupId": {"GroupGuid": "d4218b76-00c3-4e21-8d2b-77203778d1c5"},
            "VpgConfiguration": {
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
                    JournalHealthSettings: {
                        JournalHealthInMinutes: 300
                    },
                    "BootOrder": {
                        "Groups": [{
                            "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                            "Name": "Default",
                            "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                            "Machines": [{
                                "DisplayName": "Evgeny-vm1",
                                "Id": {
                                    "InternalVmName": "vm-273",
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                }
                            }]
                        }]
                    },
                    "ServiceProfile": null,
                    "Backup": {
                        "Target": {"SelectedTarget": {"Identifier": "c0930a0f-efea-495e-974d-ac647f2114ad"}},
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
                        "Scripting": {"PostScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 0}},
                        "DeleteBackup": {"RestorePointRange": 1}
                    },
                    "IsBackupEnabled": true
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
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
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
                    "TargetFolder": null,
                    "FailoverVCDVAppNetwork": null,
                    "TestVCDVAppNetwork": null
                },
                "ProtectedVappSettings": null,
                "RecoveryVappSettings": null,
                "VirtualMachines": [{
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-273",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "Evgeny-vm1",
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
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-9",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-12",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 258,
                        "UsedStorageSizeInMB": 40,
                        "RecoveryStorageSizeInMB": 200
                    },
                    "Volumes": [{
                        "SourceAddress": "[datastore1]:Evgeny-vm1/Evgeny-vm1.vmdk",
                        "TargetAddress": "ZNest81Datastore",
                        "Swap": false,
                        "ProvisionedSizeInMB": 40,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d 8e b8 54 3d dd 4a-b5 9c 7a 84 5b 26 c9 6c",
                                    "InstanceUuid": "50 3d 71 00 15 a6 cd 2e-63 3a 27 43 d0 01 24 d5"
                                }, "UnitNumber": 0, "ControllerNumber": 0, "VolumeType": 0
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-12",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": false
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
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
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
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
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:bd:9d:24"
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
                    "JournalDatastores": []
                }],
                "OwnersId": {"OwnersGuid": "faf2771b-ece2-40c4-beb2-b4e0bc73ae43"},
                "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
            },
            "State": {
                "State": 0,
                "Status": 4,
                "SubStatus": 0,
                "IsProgressActive": false,
                "ProgressPercentage": 0,
                "ProgressDetails": null,
                "IsFailoverEnabled": true,
                "IsMoveEnabled": true,
                "IsFailoverTestEnabled": true,
                "IsUpdateEnabled": true,
                "IsInsertCheckpointEnabled": true,
                "RelevantCheckpoint": null,
                "IsProtectedSiteConnected": true,
                "AlertStatus": 2,
                "AlertTips": {
                    "Alerts": ["The VPG New VPG has been protected for 1 hour and 11 minutes but the journal history is only 15 minutes."],
                    "HasMore": false,
                    "TotalNumberOfAlerts": 1
                },
                "IsDeleteEnabled": true,
                "IsForceSyncEnabled": false,
                "IsCloneEnabled": true,
                "VPGTimebombInfo": null,
                "CloneStatusVisualObject": null,
                "IsMoveInStagesSupported": true,
                "IsFailoverInStagesSupported": true,
                "MoveAutoContinueState": {"AutoContinueActivated": false, "Action": 1, "TimeLeftInSec": 0},
                "RequiresForceToDelete": false,
                "PauseResumeVisualObject": {"IsVpgNowPaused": false, "IsPauseEnabled": true, "IsResumeEnabled": false},
                "IsRecoverCommitEnabled": false,
                "IsRecoverRollbackEnabled": false,
                "ActiveProcesses": {
                    "RunningFailOverTest": null,
                    "RunningClone": null,
                    "Paused": null,
                    "IsVpgNowPaused": false,
                    "IsResumeEnabled": false,
                    "RunningBackup": null,
                    "IsStopFOTEnabled": false,
                    "VpgUpdate": null,
                    "TimebombInfo": null
                },
                "ButtonsState": {
                    "IsFailoverEnabled": true,
                    "IsMoveEnabled": true,
                    "IsFailoverTestEnabled": true,
                    "IsUpdateEnabled": true,
                    "IsPauseEnabled": true,
                    "IsInsertCheckpointEnabled": true,
                    "IsProtectedSiteConnected": true,
                    "IsDeleteEnabled": true,
                    "IsForceSyncEnabled": false,
                    "IsCloneEnabled": true,
                    "IsMoveInStagesSupported": true,
                    "IsFailoverInStagesSupported": true,
                    "IsRecoverCommitEnabled": false,
                    "IsRecoverRollbackEnabled": false,
                    "RequiresForceToDelete": false,
                    "IsBackupEnabled": true,
                    "IsAbortBackupEnabled": false
                },
                "ProgressObject": null
            },
            "Reason": "",
            "SiteDetails": {
                "SiteName": "Unconfigured site name",
                "IpAddress": "127.0.0.1",
                "VCenterName": "ZNest81VC",
                "CurrentLocalTime": "13:56",
                "ContactInfo": "Unconfigured contact info",
                "ContactEmail": "Unconfigured contact email",
                "ContactPhone": "Unconfigured contact phone",
                "ServerId": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                "Location": "Unconfigured location",
                "LicenseType": 1
            },
            "Summary": {
                "NumberOfVms": 1,
                "NumberOfProvisionedMB": 258,
                "NumberOfUsedMB": 40,
                "RecoveryStorageSizeInMB": 200,
                "LastTest": null,
                "HistoryInSeconds": 945,
                "VpgBackupJobStatus": 1,
                "VpgDetailsScreenBackupInformation": {
                    "BackupProgress": 0,
                    "BackupStatus": 0,
                    "JobName": "stubBackup",
                    "JobSizeInMB": 500,
                    "LastFullBackup": "0001-01-01T00:00:00.000Z",
                    "LastRunResult": 1,
                    "NextScheduledBackup": "0001-01-01T00:00:00.000Z",
                    "NonFailingRuns": 1,
                    "NumberOfVms": 5,
                    "NumberOfVolumes": 5,
                    "RepositoryName": "stubTarget",
                    "StartTime": "0001-01-01T00:00:00.000Z",
                    "StartTimeOfLastRun": "2010-12-12T08:10:10Z",
                    "TotalRuns": 10,
                    "VpgIdentifier": {"GroupGuid": "ff21b874-000a-473f-9e7d-49d56de26f2a"},
                    "VpgProtectedSiteName": "protectedSiteName",
                    "VpgRecoverySiteName": "recoverySiteName",
                    "ZorgName": "zorgName",
                    "IsBackupEnabled": true,
                    "IsAbortBackupEnabled": false,
                    "LastBackupSizeInMb": 500
                },
                "EarliestCheckpoint": {
                    "TimeStamp":  "2014-09-15T06:00:49.038Z"
                },
                JournalHealthStatusVisualObject: {
                    ActualJournalHealthInMinutes: 600
                },
                "BackupRepository": "guy"
            },
            "Performance": {
                "IncomingIOPS": {
                    "Values": [{"Value": 0, "Time": "2014-09-15T10:42:56.354Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:06.401Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:16.337Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:26.349Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:36.392Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:46.365Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:56.337Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:06.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:16.359Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:26.342Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:36.381Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:46.333Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:56.371Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:06.358Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:16.344Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:26.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:36.395Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:46.344Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:56.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:06.362Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:16.356Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:26.399Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:36.352Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:46.348Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:56.380Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:06.363Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:16.357Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:26.336Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:36.365Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:46.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:56.433Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:06.345Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:16.360Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:26.350Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:36.421Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:46.409Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:56.619Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:06.353Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:16.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:26.386Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:36.448Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:46.394Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:56.366Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:06.399Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:16.707Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:26.439Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:36.632Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:46.353Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:56.375Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:06.424Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:16.371Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:26.423Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:36.342Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:46.381Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:56.385Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:06.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:16.341Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:26.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:36.384Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:46.465Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:56.645Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:06.358Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:16.373Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:26.347Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:36.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:46.394Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:56.377Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:06.628Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:16.360Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:26.355Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:36.347Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:46.334Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:56.339Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:06.389Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:16.344Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:26.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:36.534Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:46.343Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:56.388Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:56:06.357Z"
                    }], "MaxVerticalAxisScale": 120
                },
                "RPOInSeconds": {
                    "Values": [{"Value": 4, "Time": "2014-09-15T10:42:56.354Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:43:06.401Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:43:16.337Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:43:26.349Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:43:36.392Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:43:46.365Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:43:56.337Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:44:06.335Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:44:16.359Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:44:26.342Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:44:36.381Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:44:46.333Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:44:56.371Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:45:06.358Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:45:16.344Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:45:26.335Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:45:36.395Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:45:46.344Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:45:56.349Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:46:06.362Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:46:16.356Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:46:26.399Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:46:36.352Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:46:46.348Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:46:56.380Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:47:06.363Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:47:16.357Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:47:26.336Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:47:36.365Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:47:46.372Z"
                    }, {"Value": 5, "Time": "2014-09-15T10:47:56.433Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:48:06.345Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:48:16.360Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:48:26.350Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:48:36.421Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:48:46.409Z"
                    }, {"Value": 5, "Time": "2014-09-15T10:48:56.619Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:49:06.353Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:49:16.349Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:49:26.386Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:49:36.448Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:49:46.394Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:49:56.366Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:50:06.399Z"
                    }, {"Value": 5, "Time": "2014-09-15T10:50:16.707Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:50:26.439Z"
                    }, {"Value": 5, "Time": "2014-09-15T10:50:36.632Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:50:46.353Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:50:56.375Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:51:06.424Z"
                    }, {"Value": 14, "Time": "2014-09-15T10:51:16.371Z"}, {
                        "Value": 9,
                        "Time": "2014-09-15T10:51:26.423Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:51:36.342Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:51:46.381Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:51:56.385Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:52:06.372Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:52:16.341Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:52:26.372Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:52:36.384Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:52:46.465Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:52:56.645Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:53:06.358Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:53:16.373Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:53:26.347Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:53:36.349Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:53:46.394Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:53:56.377Z"}, {
                        "Value": 5,
                        "Time": "2014-09-15T10:54:06.628Z"
                    }, {"Value": 9, "Time": "2014-09-15T10:54:16.360Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:54:26.355Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:54:36.347Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:54:46.334Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:54:56.339Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:55:06.389Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:55:16.344Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:55:26.335Z"
                    }, {"Value": 5, "Time": "2014-09-15T10:55:36.534Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:55:46.343Z"
                    }, {"Value": 4, "Time": "2014-09-15T10:55:56.388Z"}, {
                        "Value": 4,
                        "Time": "2014-09-15T10:56:06.357Z"
                    }], "MaxVerticalAxisScale": 72
                },
                "IncomingThroughputInMb": {
                    "Values": [{"Value": 0, "Time": "2014-09-15T10:42:56.354Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:06.401Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:16.337Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:26.349Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:36.392Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:46.365Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:56.337Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:06.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:16.359Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:26.342Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:36.381Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:46.333Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:56.371Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:06.358Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:16.344Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:26.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:36.395Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:46.344Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:56.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:06.362Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:16.356Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:26.399Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:36.352Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:46.348Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:56.380Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:06.363Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:16.357Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:26.336Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:36.365Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:46.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:56.433Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:06.345Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:16.360Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:26.350Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:36.421Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:46.409Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:56.619Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:06.353Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:16.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:26.386Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:36.448Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:46.394Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:56.366Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:06.399Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:16.707Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:26.439Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:36.632Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:46.353Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:56.375Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:06.424Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:16.371Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:26.423Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:36.342Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:46.381Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:56.385Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:06.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:16.341Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:26.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:36.384Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:46.465Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:56.645Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:06.358Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:16.373Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:26.347Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:36.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:46.394Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:56.377Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:06.628Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:16.360Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:26.355Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:36.347Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:46.334Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:56.339Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:06.389Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:16.344Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:26.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:36.534Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:46.343Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:56.388Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:56:06.357Z"
                    }], "MaxVerticalAxisScale": 24
                },
                "OutgoingBandWidth": {
                    "Values": [{"Value": 0, "Time": "2014-09-15T10:42:56.354Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:06.401Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:16.337Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:26.349Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:36.392Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:43:46.365Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:43:56.337Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:06.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:16.359Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:26.342Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:36.381Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:44:46.333Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:44:56.371Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:06.358Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:16.344Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:26.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:36.395Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:45:46.344Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:45:56.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:06.362Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:16.356Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:26.399Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:36.352Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:46:46.348Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:46:56.380Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:06.363Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:16.357Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:26.336Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:36.365Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:47:46.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:47:56.433Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:06.345Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:16.360Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:26.350Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:36.421Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:48:46.409Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:48:56.619Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:06.353Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:16.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:26.386Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:36.448Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:49:46.394Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:49:56.366Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:06.399Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:16.707Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:26.439Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:36.632Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:50:46.353Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:50:56.375Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:06.424Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:16.371Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:26.423Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:36.342Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:51:46.381Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:51:56.385Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:06.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:16.341Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:26.372Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:36.384Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:52:46.465Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:52:56.645Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:06.358Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:16.373Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:26.347Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:36.349Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:53:46.394Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:53:56.377Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:06.628Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:16.360Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:26.355Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:36.347Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:54:46.334Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:54:56.339Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:06.389Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:16.344Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:26.335Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:36.534Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:55:46.343Z"
                    }, {"Value": 0, "Time": "2014-09-15T10:55:56.388Z"}, {
                        "Value": 0,
                        "Time": "2014-09-15T10:56:06.357Z"
                    }], "MaxVerticalAxisScale": 24
                }
            },
            "SitesInfo": {
                "SourceSiteName": "Unconfigured site name",
                "TargetSiteName": "Unconfigured site name",
                "CustomerName": "N/A"
            },
            "CloneStatus": null,
            "Entities": {"Source": 0, "Target": 0},
            "LastUserActivityFailed": false,
            "ConfigurationFlags": {
                "IsStorageProfileEnabled": false,
                "IsCompressionConfigurable": true,
                "IsVmFolderConfigurable": true,
                "IsBackupFeatureSupported": true
            },
            "IsManageSiteSettingsEnabled": true,
            "Direction": 2,
            "ZorgId": null
        };
        testScope.applyBackupDetails();
        expect(testScope.isBackupEnabled).toBeTruthy();
        expect(testScope.showSucessImage).toBeTruthy();
        expect(testScope.showFailedImage).toBeFalsy();
        expect(testScope.backupLastDate).toEqual('12/12/2010 10:10');

    });
});
