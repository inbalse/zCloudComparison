'use strict';

describe('details tabs controller', function () {
    var controller, scope, translate, vpgDetailsFactory, enums, shortEnum, parentScope, parentController;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate, _vpgDetailsFactory_, _enums_) {
        parentScope = $rootScope.$new();
        scope = parentScope.$new();
        translate = $translate;
        vpgDetailsFactory = _vpgDetailsFactory_;
        enums = _enums_;

        parentController = $controller('vpgDetailsController', {
            $scope: parentScope,
            $translate: translate,
            globalStateModel: {data:{isPortal:false}}
        });
        controller = $controller('vpgParametersController', {
            $scope: scope,
            $translate: translate,
            vpgDetailsFactory: vpgDetailsFactory,
            enums: enums
        });

        scope.result = {
            "RemoteSiteConnected": true,
            "ProtectionGroupId": {"GroupGuid": "29cbd1b2-7d3d-4d76-9c67-b6c4916fb624"},
            "VpgConfiguration": {
                "Name": "vpg",
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
                            "Machines": [{
                                "DisplayName": "kobi_vm_3",
                                "Id": {
                                    "InternalVmName": "vm-138",
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
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
                            "InternalName": "host-14",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.205.5"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-15",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1)"
                    },
                    "FailoverNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                            "InternalType": "Network",
                            "InternalName": "network-11"
                        }, "DisplayName": "VM Network"
                    },
                    "TestNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                            "InternalType": "Network",
                            "InternalName": "network-11"
                        }, "DisplayName": "VM Network"
                    },
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v131",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "FailoverVCDVAppNetwork": null,
                    "TestVCDVAppNetwork": null,
                    "RecoveryCloudSettings": null
                },
                "ProtectedVappSettings": null,
                "RecoveryVappSettings": null,
                "VirtualMachines": [{
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-138",
                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                    },
                    "Name": "kobi_vm_3",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-14",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-16",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest83Datastore"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-14",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-15",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1)"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 227,
                        "UsedStorageSizeInMB": 9,
                        "RecoveryStorageSizeInMB": 169
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest83Datastore]:kobi_vm_3/kobi_vm_3.vmdk",
                        "TargetAddress": "datastore1 (1)",
                        "Swap": false,
                        "ProvisionedSizeInMB": 9,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 2c b8 ab 13 ce 4e fa-a5 ef fa 22 c9 ca 38 28",
                                    "InstanceUuid": "50 2c db 2d 51 6c 38 c7-15 d2 d7 f8 ac f1 43 0b"
                                },
                                "UnitNumber": 0,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:0)"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-15",
                                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
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
                                    "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                    "InternalType": "Network",
                                    "InternalName": "network-11"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
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
                                        "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                                        "InternalType": "Network",
                                        "InternalName": "network-11"
                                    }, "DisplayName": "VM Network"
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:ac:6b:42"
                    }],
                    "CloudVmSettings": null,
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v131",
                            "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 0, "Limit": 0},
                    "JournalWarningThreshold": {"Type": 0, "Limit": 0},
                    "JournalDatastores": []
                }],
                "OwnersId": {"OwnersGuid": "ed223afc-a9b3-43e2-8425-99eb23b6a447"},
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
                    "Alerts": [{
                        "Description": "The VPG vpg has been protected for 3 hours but the journal history is only 14 minutes.",
                        "SiteName": "gui_local_vcd",
                        "AlertLevel": 1,
                        "$$hashKey": "06L"
                    }], "HasMore": false, "TotalNumberOfAlerts": 1, "TotalNumberOfWarnings": 0, "TotalNumberOfErrors": 1
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
                    "IsBackupEnabled": false,
                    "IsAbortBackupEnabled": false
                },
                "ProgressObject": null
            },
            "Reason": "",
            "SiteDetails": {
                "SiteName": "gui_local_vcd",
                "IpAddress": "10.10.0.91",
                "VCenterName": "ZNest83VC",
                "CurrentLocalTime": "15:22",
                "ContactInfo": "denis.gorunov",
                "ContactEmail": "denis.gorunov@zerto.com",
                "ContactPhone": "066-6666666",
                "ServerId": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
                "Location": "at Zerto",
                "LicenseType": 1
            },
            "Summary": {
                "NumberOfVms": 1,
                "NumberOfProvisionedMB": 227,
                "NumberOfUsedMB": 9,
                "RecoveryStorageSizeInMB": 169,
                "LastTest": null,
                "HistoryInSeconds": 899,
                "VpgBackupJobStatus": 2,
                "BackupRepository": "",
                "VpgDetailsScreenBackupInformation": null
            },
            "Performance": {
                "IncomingIops": {
                    "Values": [{"Value": 0, "Time": "2014-12-01T12:48:09.883Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:19.888Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:48:29.813Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:39.809Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:48:49.809Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:59.794Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:09.788Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:19.805Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:29.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:39.835Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:49.903Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:59.794Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:10.143Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:20.653Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:29.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:40.064Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:49.821Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:59.825Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:09.892Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:19.876Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:29.806Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:39.806Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:49.816Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:59.927Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:09.812Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:19.873Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:29.849Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:39.873Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:50.062Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:59.824Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:09.805Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:19.846Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:29.828Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:39.837Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:50.076Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:59.788Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:09.791Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:19.831Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:29.867Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:39.807Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:49.842Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:59.816Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:19.150Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:19.802Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:30.057Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:39.843Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:49.850Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:59.812Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:09.836Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:19.836Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:29.798Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:39.822Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:49.836Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:59.815Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:09.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:57:19.870Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:29.785Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:57:39.809Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:59.703Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:58:10.997Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:58:36.811Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:58:46.722Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:58:58.301Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:06.675Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:16.333Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:27.041Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:36.207Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:47.146Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:56.178Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:06.973Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:16.176Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:26.467Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:36.093Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:46.720Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:56.078Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:01:07.487Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:01:16.123Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:01:26.944Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:01:44.285Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:03:32.811Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:03:39.503Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:03:52.218Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:04:00.081Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:04:11.558Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:04:33.552Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:04:41.021Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:05:28.838Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:03.626Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:13.877Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:23.969Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:33.685Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:44.096Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:53.938Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:03.647Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:13.966Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:23.647Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:33.670Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:43.828Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:53.717Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:03.614Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:13.647Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:23.738Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:33.672Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:43.864Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:53.659Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:03.674Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:13.627Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:23.676Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:33.631Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:43.722Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:53.635Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:03.666Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:13.659Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:23.653Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:33.669Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:43.669Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:53.721Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:03.658Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:13.709Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:23.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:33.643Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:43.685Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:53.654Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:03.646Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:13.644Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:23.665Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:33.681Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:43.669Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:53.698Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:03.634Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:13.670Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:23.732Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:33.643Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:43.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:53.660Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:03.690Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:13.760Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:23.763Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:33.634Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:43.660Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:53.652Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:03.689Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:13.737Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:23.683Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:33.693Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:43.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:53.638Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:03.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:13.671Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:23.642Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:33.641Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:43.631Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:53.620Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:03.622Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:13.622Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:23.617Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:33.640Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:43.619Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:53.664Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:03.612Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:13.645Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:23.667Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:33.644Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:43.629Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:53.622Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:03.617Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:13.645Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:23.616Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:33.628Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:43.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:53.667Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:03.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:13.686Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:23.663Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:33.737Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:43.628Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:53.623Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:22:03.651Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:22:13.638Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:22:23.633Z"
                    }],
                    "ValuesAsCsv": "Date,Value\r\n20141201124809,0\r\n20141201124819,0\r\n20141201124829,0\r\n20141201124839,0\r\n20141201124849,0\r\n20141201124859,0\r\n20141201124909,0\r\n20141201124919,0\r\n20141201124929,0\r\n20141201124939,0\r\n20141201124949,0\r\n20141201124959,0\r\n20141201125010,0\r\n20141201125020,0\r\n20141201125029,0\r\n20141201125040,0\r\n20141201125049,0\r\n20141201125059,0\r\n20141201125109,0\r\n20141201125119,0\r\n20141201125129,0\r\n20141201125139,0\r\n20141201125149,0\r\n20141201125159,0\r\n20141201125209,0\r\n20141201125219,0\r\n20141201125229,0\r\n20141201125239,0\r\n20141201125250,0\r\n20141201125259,0\r\n20141201125309,0\r\n20141201125319,0\r\n20141201125329,0\r\n20141201125339,0\r\n20141201125350,0\r\n20141201125359,0\r\n20141201125409,0\r\n20141201125419,0\r\n20141201125429,0\r\n20141201125439,0\r\n20141201125449,0\r\n20141201125459,0\r\n20141201125519,0\r\n20141201125519,0\r\n20141201125530,0\r\n20141201125539,0\r\n20141201125549,0\r\n20141201125559,0\r\n20141201125609,0\r\n20141201125619,0\r\n20141201125629,0\r\n20141201125639,0\r\n20141201125649,0\r\n20141201125659,0\r\n20141201125709,0\r\n20141201125719,0\r\n20141201125729,0\r\n20141201125739,0\r\n20141201125759,0\r\n20141201125810,0\r\n20141201125836,0\r\n20141201125846,0\r\n20141201125858,0\r\n20141201125906,0\r\n20141201125916,0\r\n20141201125927,0\r\n20141201125936,0\r\n20141201125947,0\r\n20141201125956,0\r\n20141201010006,0\r\n20141201010016,0\r\n20141201010026,0\r\n20141201010036,0\r\n20141201010046,0\r\n20141201010056,0\r\n20141201010107,0\r\n20141201010116,0\r\n20141201010126,0\r\n20141201010144,0\r\n20141201010332,0\r\n20141201010339,0\r\n20141201010352,0\r\n20141201010400,0\r\n20141201010411,0\r\n20141201010433,0\r\n20141201010441,0\r\n20141201010528,0\r\n20141201010703,0\r\n20141201010713,0\r\n20141201010723,0\r\n20141201010733,0\r\n20141201010744,0\r\n20141201010753,0\r\n20141201010803,0\r\n20141201010813,0\r\n20141201010823,0\r\n20141201010833,0\r\n20141201010843,0\r\n20141201010853,0\r\n20141201010903,0\r\n20141201010913,0\r\n20141201010923,0\r\n20141201010933,0\r\n20141201010943,0\r\n20141201010953,0\r\n20141201011003,0\r\n20141201011013,0\r\n20141201011023,0\r\n20141201011033,0\r\n20141201011043,0\r\n20141201011053,0\r\n20141201011103,0\r\n20141201011113,0\r\n20141201011123,0\r\n20141201011133,0\r\n20141201011143,0\r\n20141201011153,0\r\n20141201011203,0\r\n20141201011213,0\r\n20141201011223,0\r\n20141201011233,0\r\n20141201011243,0\r\n20141201011253,0\r\n20141201011303,0\r\n20141201011313,0\r\n20141201011323,0\r\n20141201011333,0\r\n20141201011343,0\r\n20141201011353,0\r\n20141201011403,0\r\n20141201011413,0\r\n20141201011423,0\r\n20141201011433,0\r\n20141201011443,0\r\n20141201011453,0\r\n20141201011503,0\r\n20141201011513,0\r\n20141201011523,0\r\n20141201011533,0\r\n20141201011543,0\r\n20141201011553,0\r\n20141201011603,0\r\n20141201011613,0\r\n20141201011623,0\r\n20141201011633,0\r\n20141201011643,0\r\n20141201011653,0\r\n20141201011703,0\r\n20141201011713,0\r\n20141201011723,0\r\n20141201011733,0\r\n20141201011743,0\r\n20141201011753,0\r\n20141201011803,0\r\n20141201011813,0\r\n20141201011823,0\r\n20141201011833,0\r\n20141201011843,0\r\n20141201011853,0\r\n20141201011903,0\r\n20141201011913,0\r\n20141201011923,0\r\n20141201011933,0\r\n20141201011943,0\r\n20141201011953,0\r\n20141201012003,0\r\n20141201012013,0\r\n20141201012023,0\r\n20141201012033,0\r\n20141201012043,0\r\n20141201012053,0\r\n20141201012103,0\r\n20141201012113,0\r\n20141201012123,0\r\n20141201012133,0\r\n20141201012143,0\r\n20141201012153,0\r\n20141201012203,0\r\n20141201012213,0\r\n20141201012223,0\r\n"
                },
                "RPOInSeconds": {
                    "Values": [{"Value": 3, "Time": "2014-12-01T12:48:09.883Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:48:19.888Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:48:29.813Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:48:39.809Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:48:49.809Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:48:59.794Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:49:09.788Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:49:19.805Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:49:29.801Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:49:39.835Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:49:49.903Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:49:59.794Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:50:10.143Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:50:20.653Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:50:29.801Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:50:40.064Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:50:49.821Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:50:59.825Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:51:09.892Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:51:19.876Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:51:29.806Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:51:39.806Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:51:49.816Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:51:59.927Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:52:09.812Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:52:19.873Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:52:29.849Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:52:39.873Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:52:50.062Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:52:59.824Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:53:09.805Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:53:19.846Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:53:29.828Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:53:39.837Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:53:50.076Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:53:59.788Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:54:09.791Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:54:19.831Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:54:29.867Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:54:39.807Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:54:49.842Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:54:59.816Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:55:19.150Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:55:19.802Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:55:30.057Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:55:39.843Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:55:49.850Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:55:59.812Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:56:09.836Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:56:19.836Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:56:29.798Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:56:39.822Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:56:49.836Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:56:59.815Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:57:09.801Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:57:19.870Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:57:29.785Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T12:57:39.809Z"
                    }, {"Value": 3, "Time": "2014-12-01T12:57:59.703Z"}, {
                        "Value": 4,
                        "Time": "2014-12-01T12:58:10.997Z"
                    }, {"Value": 4, "Time": "2014-12-01T12:58:36.811Z"}, {
                        "Value": 4,
                        "Time": "2014-12-01T12:58:46.722Z"
                    }, {"Value": 5, "Time": "2014-12-01T12:58:58.301Z"}, {
                        "Value": 5,
                        "Time": "2014-12-01T12:59:06.675Z"
                    }, {"Value": 4, "Time": "2014-12-01T12:59:16.333Z"}, {
                        "Value": 5,
                        "Time": "2014-12-01T12:59:27.041Z"
                    }, {"Value": 5, "Time": "2014-12-01T12:59:36.207Z"}, {
                        "Value": 4,
                        "Time": "2014-12-01T12:59:47.146Z"
                    }, {"Value": 5, "Time": "2014-12-01T12:59:56.178Z"}, {
                        "Value": 5,
                        "Time": "2014-12-01T13:00:06.973Z"
                    }, {"Value": 4, "Time": "2014-12-01T13:00:16.176Z"}, {
                        "Value": 5,
                        "Time": "2014-12-01T13:00:26.467Z"
                    }, {"Value": 5, "Time": "2014-12-01T13:00:36.093Z"}, {
                        "Value": 4,
                        "Time": "2014-12-01T13:00:46.720Z"
                    }, {"Value": 5, "Time": "2014-12-01T13:00:56.078Z"}, {
                        "Value": 5,
                        "Time": "2014-12-01T13:01:07.487Z"
                    }, {"Value": 5, "Time": "2014-12-01T13:01:16.123Z"}, {
                        "Value": 5,
                        "Time": "2014-12-01T13:01:26.944Z"
                    }, {"Value": 5, "Time": "2014-12-01T13:01:44.285Z"}, {
                        "Value": 6,
                        "Time": "2014-12-01T13:03:32.811Z"
                    }, {"Value": 3, "Time": "2014-12-01T13:03:39.503Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T13:03:52.218Z"
                    }, {"Value": 3, "Time": "2014-12-01T13:04:00.081Z"}, {
                        "Value": 4,
                        "Time": "2014-12-01T13:04:11.558Z"
                    }, {"Value": 4, "Time": "2014-12-01T13:04:33.552Z"}, {
                        "Value": 3,
                        "Time": "2014-12-01T13:04:41.021Z"
                    }, {"Value": 3, "Time": "2014-12-01T13:05:28.838Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:07:03.626Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:07:13.877Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:07:23.969Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:07:33.685Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:07:44.096Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:07:53.938Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:08:03.647Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:08:13.966Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:08:23.647Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:08:33.670Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:08:43.828Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:08:53.717Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:09:03.614Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:09:13.647Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:09:23.738Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:09:33.672Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:09:43.864Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:09:53.659Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:10:03.674Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:10:13.627Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:10:23.676Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:10:33.631Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:10:43.722Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:10:53.635Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:11:03.666Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:11:13.659Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:11:23.653Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:11:33.669Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:11:43.669Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:11:53.721Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:12:03.658Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:12:13.709Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:12:23.648Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:12:33.643Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:12:43.685Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:12:53.654Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:13:03.646Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:13:13.644Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:13:23.665Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:13:33.681Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:13:43.669Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:13:53.698Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:14:03.634Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:14:13.670Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:14:23.732Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:14:33.643Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:14:43.648Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:14:53.660Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:15:03.690Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:15:13.760Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:15:23.763Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:15:33.634Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:15:43.660Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:15:53.652Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:16:03.689Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:16:13.737Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:16:23.683Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:16:33.693Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:16:43.648Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:16:53.638Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:17:03.652Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:17:13.671Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:17:23.642Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:17:33.641Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:17:43.631Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:17:53.620Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:18:03.622Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:18:13.622Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:18:23.617Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:18:33.640Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:18:43.619Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:18:53.664Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:19:03.612Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:19:13.645Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:19:23.667Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:19:33.644Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:19:43.629Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:19:53.622Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:20:03.617Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:20:13.645Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:20:23.616Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:20:33.628Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:20:43.652Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:20:53.667Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:21:03.652Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:21:13.686Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:21:23.663Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:21:33.737Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:21:43.628Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:21:53.623Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:22:03.651Z"
                    }, {"Value": 7, "Time": "2014-12-01T13:22:13.638Z"}, {
                        "Value": 7,
                        "Time": "2014-12-01T13:22:23.633Z"
                    }],
                    "ValuesAsCsv": "Date,Value\r\n20141201124809,3\r\n20141201124819,3\r\n20141201124829,3\r\n20141201124839,3\r\n20141201124849,3\r\n20141201124859,3\r\n20141201124909,3\r\n20141201124919,3\r\n20141201124929,3\r\n20141201124939,3\r\n20141201124949,3\r\n20141201124959,3\r\n20141201125010,3\r\n20141201125020,3\r\n20141201125029,3\r\n20141201125040,3\r\n20141201125049,3\r\n20141201125059,3\r\n20141201125109,3\r\n20141201125119,3\r\n20141201125129,3\r\n20141201125139,3\r\n20141201125149,3\r\n20141201125159,3\r\n20141201125209,3\r\n20141201125219,3\r\n20141201125229,3\r\n20141201125239,3\r\n20141201125250,3\r\n20141201125259,3\r\n20141201125309,3\r\n20141201125319,3\r\n20141201125329,3\r\n20141201125339,3\r\n20141201125350,3\r\n20141201125359,3\r\n20141201125409,3\r\n20141201125419,3\r\n20141201125429,3\r\n20141201125439,3\r\n20141201125449,3\r\n20141201125459,3\r\n20141201125519,3\r\n20141201125519,3\r\n20141201125530,3\r\n20141201125539,3\r\n20141201125549,3\r\n20141201125559,3\r\n20141201125609,3\r\n20141201125619,3\r\n20141201125629,3\r\n20141201125639,3\r\n20141201125649,3\r\n20141201125659,3\r\n20141201125709,3\r\n20141201125719,3\r\n20141201125729,3\r\n20141201125739,3\r\n20141201125759,3\r\n20141201125810,4\r\n20141201125836,4\r\n20141201125846,4\r\n20141201125858,5\r\n20141201125906,5\r\n20141201125916,4\r\n20141201125927,5\r\n20141201125936,5\r\n20141201125947,4\r\n20141201125956,5\r\n20141201010006,5\r\n20141201010016,4\r\n20141201010026,5\r\n20141201010036,5\r\n20141201010046,4\r\n20141201010056,5\r\n20141201010107,5\r\n20141201010116,5\r\n20141201010126,5\r\n20141201010144,5\r\n20141201010332,6\r\n20141201010339,3\r\n20141201010352,3\r\n20141201010400,3\r\n20141201010411,4\r\n20141201010433,4\r\n20141201010441,3\r\n20141201010528,3\r\n20141201010703,7\r\n20141201010713,7\r\n20141201010723,7\r\n20141201010733,7\r\n20141201010744,7\r\n20141201010753,7\r\n20141201010803,7\r\n20141201010813,7\r\n20141201010823,7\r\n20141201010833,7\r\n20141201010843,7\r\n20141201010853,7\r\n20141201010903,7\r\n20141201010913,7\r\n20141201010923,7\r\n20141201010933,7\r\n20141201010943,7\r\n20141201010953,7\r\n20141201011003,7\r\n20141201011013,7\r\n20141201011023,7\r\n20141201011033,7\r\n20141201011043,7\r\n20141201011053,7\r\n20141201011103,7\r\n20141201011113,7\r\n20141201011123,7\r\n20141201011133,7\r\n20141201011143,7\r\n20141201011153,7\r\n20141201011203,7\r\n20141201011213,7\r\n20141201011223,7\r\n20141201011233,7\r\n20141201011243,7\r\n20141201011253,7\r\n20141201011303,7\r\n20141201011313,7\r\n20141201011323,7\r\n20141201011333,7\r\n20141201011343,7\r\n20141201011353,7\r\n20141201011403,7\r\n20141201011413,7\r\n20141201011423,7\r\n20141201011433,7\r\n20141201011443,7\r\n20141201011453,7\r\n20141201011503,7\r\n20141201011513,7\r\n20141201011523,7\r\n20141201011533,7\r\n20141201011543,7\r\n20141201011553,7\r\n20141201011603,7\r\n20141201011613,7\r\n20141201011623,7\r\n20141201011633,7\r\n20141201011643,7\r\n20141201011653,7\r\n20141201011703,7\r\n20141201011713,7\r\n20141201011723,7\r\n20141201011733,7\r\n20141201011743,7\r\n20141201011753,7\r\n20141201011803,7\r\n20141201011813,7\r\n20141201011823,7\r\n20141201011833,7\r\n20141201011843,7\r\n20141201011853,7\r\n20141201011903,7\r\n20141201011913,7\r\n20141201011923,7\r\n20141201011933,7\r\n20141201011943,7\r\n20141201011953,7\r\n20141201012003,7\r\n20141201012013,7\r\n20141201012023,7\r\n20141201012033,7\r\n20141201012043,7\r\n20141201012053,7\r\n20141201012103,7\r\n20141201012113,7\r\n20141201012123,7\r\n20141201012133,7\r\n20141201012143,7\r\n20141201012153,7\r\n20141201012203,7\r\n20141201012213,7\r\n20141201012223,7\r\n"
                },
                "IncomingThroughputInMb": {
                    "Values": [{"Value": 0, "Time": "2014-12-01T12:48:09.883Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:19.888Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:48:29.813Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:39.809Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:48:49.809Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:59.794Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:09.788Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:19.805Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:29.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:39.835Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:49.903Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:59.794Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:10.143Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:20.653Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:29.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:40.064Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:49.821Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:59.825Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:09.892Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:19.876Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:29.806Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:39.806Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:49.816Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:59.927Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:09.812Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:19.873Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:29.849Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:39.873Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:50.062Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:59.824Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:09.805Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:19.846Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:29.828Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:39.837Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:50.076Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:59.788Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:09.791Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:19.831Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:29.867Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:39.807Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:49.842Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:59.816Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:19.150Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:19.802Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:30.057Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:39.843Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:49.850Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:59.812Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:09.836Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:19.836Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:29.798Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:39.822Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:49.836Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:59.815Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:09.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:57:19.870Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:29.785Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:57:39.809Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:59.703Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:58:10.997Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:58:36.811Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:58:46.722Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:58:58.301Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:06.675Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:16.333Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:27.041Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:36.207Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:47.146Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:56.178Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:06.973Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:16.176Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:26.467Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:36.093Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:46.720Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:56.078Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:01:07.487Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:01:16.123Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:01:26.944Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:01:44.285Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:03:32.811Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:03:39.503Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:03:52.218Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:04:00.081Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:04:11.558Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:04:33.552Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:04:41.021Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:05:28.838Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:03.626Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:13.877Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:23.969Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:33.685Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:44.096Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:53.938Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:03.647Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:13.966Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:23.647Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:33.670Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:43.828Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:53.717Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:03.614Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:13.647Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:23.738Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:33.672Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:43.864Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:53.659Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:03.674Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:13.627Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:23.676Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:33.631Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:43.722Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:53.635Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:03.666Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:13.659Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:23.653Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:33.669Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:43.669Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:53.721Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:03.658Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:13.709Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:23.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:33.643Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:43.685Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:53.654Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:03.646Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:13.644Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:23.665Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:33.681Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:43.669Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:53.698Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:03.634Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:13.670Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:23.732Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:33.643Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:43.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:53.660Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:03.690Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:13.760Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:23.763Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:33.634Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:43.660Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:53.652Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:03.689Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:13.737Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:23.683Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:33.693Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:43.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:53.638Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:03.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:13.671Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:23.642Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:33.641Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:43.631Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:53.620Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:03.622Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:13.622Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:23.617Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:33.640Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:43.619Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:53.664Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:03.612Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:13.645Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:23.667Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:33.644Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:43.629Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:53.622Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:03.617Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:13.645Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:23.616Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:33.628Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:43.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:53.667Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:03.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:13.686Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:23.663Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:33.737Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:43.628Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:53.623Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:22:03.651Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:22:13.638Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:22:23.633Z"
                    }],
                    "ValuesAsCsv": "Date,Value\r\n20141201124809,0\r\n20141201124819,0\r\n20141201124829,0\r\n20141201124839,0\r\n20141201124849,0\r\n20141201124859,0\r\n20141201124909,0\r\n20141201124919,0\r\n20141201124929,0\r\n20141201124939,0\r\n20141201124949,0\r\n20141201124959,0\r\n20141201125010,0\r\n20141201125020,0\r\n20141201125029,0\r\n20141201125040,0\r\n20141201125049,0\r\n20141201125059,0\r\n20141201125109,0\r\n20141201125119,0\r\n20141201125129,0\r\n20141201125139,0\r\n20141201125149,0\r\n20141201125159,0\r\n20141201125209,0\r\n20141201125219,0\r\n20141201125229,0\r\n20141201125239,0\r\n20141201125250,0\r\n20141201125259,0\r\n20141201125309,0\r\n20141201125319,0\r\n20141201125329,0\r\n20141201125339,0\r\n20141201125350,0\r\n20141201125359,0\r\n20141201125409,0\r\n20141201125419,0\r\n20141201125429,0\r\n20141201125439,0\r\n20141201125449,0\r\n20141201125459,0\r\n20141201125519,0\r\n20141201125519,0\r\n20141201125530,0\r\n20141201125539,0\r\n20141201125549,0\r\n20141201125559,0\r\n20141201125609,0\r\n20141201125619,0\r\n20141201125629,0\r\n20141201125639,0\r\n20141201125649,0\r\n20141201125659,0\r\n20141201125709,0\r\n20141201125719,0\r\n20141201125729,0\r\n20141201125739,0\r\n20141201125759,0\r\n20141201125810,0\r\n20141201125836,0\r\n20141201125846,0\r\n20141201125858,0\r\n20141201125906,0\r\n20141201125916,0\r\n20141201125927,0\r\n20141201125936,0\r\n20141201125947,0\r\n20141201125956,0\r\n20141201010006,0\r\n20141201010016,0\r\n20141201010026,0\r\n20141201010036,0\r\n20141201010046,0\r\n20141201010056,0\r\n20141201010107,0\r\n20141201010116,0\r\n20141201010126,0\r\n20141201010144,0\r\n20141201010332,0\r\n20141201010339,0\r\n20141201010352,0\r\n20141201010400,0\r\n20141201010411,0\r\n20141201010433,0\r\n20141201010441,0\r\n20141201010528,0\r\n20141201010703,0\r\n20141201010713,0\r\n20141201010723,0\r\n20141201010733,0\r\n20141201010744,0\r\n20141201010753,0\r\n20141201010803,0\r\n20141201010813,0\r\n20141201010823,0\r\n20141201010833,0\r\n20141201010843,0\r\n20141201010853,0\r\n20141201010903,0\r\n20141201010913,0\r\n20141201010923,0\r\n20141201010933,0\r\n20141201010943,0\r\n20141201010953,0\r\n20141201011003,0\r\n20141201011013,0\r\n20141201011023,0\r\n20141201011033,0\r\n20141201011043,0\r\n20141201011053,0\r\n20141201011103,0\r\n20141201011113,0\r\n20141201011123,0\r\n20141201011133,0\r\n20141201011143,0\r\n20141201011153,0\r\n20141201011203,0\r\n20141201011213,0\r\n20141201011223,0\r\n20141201011233,0\r\n20141201011243,0\r\n20141201011253,0\r\n20141201011303,0\r\n20141201011313,0\r\n20141201011323,0\r\n20141201011333,0\r\n20141201011343,0\r\n20141201011353,0\r\n20141201011403,0\r\n20141201011413,0\r\n20141201011423,0\r\n20141201011433,0\r\n20141201011443,0\r\n20141201011453,0\r\n20141201011503,0\r\n20141201011513,0\r\n20141201011523,0\r\n20141201011533,0\r\n20141201011543,0\r\n20141201011553,0\r\n20141201011603,0\r\n20141201011613,0\r\n20141201011623,0\r\n20141201011633,0\r\n20141201011643,0\r\n20141201011653,0\r\n20141201011703,0\r\n20141201011713,0\r\n20141201011723,0\r\n20141201011733,0\r\n20141201011743,0\r\n20141201011753,0\r\n20141201011803,0\r\n20141201011813,0\r\n20141201011823,0\r\n20141201011833,0\r\n20141201011843,0\r\n20141201011853,0\r\n20141201011903,0\r\n20141201011913,0\r\n20141201011923,0\r\n20141201011933,0\r\n20141201011943,0\r\n20141201011953,0\r\n20141201012003,0\r\n20141201012013,0\r\n20141201012023,0\r\n20141201012033,0\r\n20141201012043,0\r\n20141201012053,0\r\n20141201012103,0\r\n20141201012113,0\r\n20141201012123,0\r\n20141201012133,0\r\n20141201012143,0\r\n20141201012153,0\r\n20141201012203,0\r\n20141201012213,0\r\n20141201012223,0\r\n"
                },
                "OutgoingBandWidth": {
                    "Values": [{"Value": 0, "Time": "2014-12-01T12:48:09.883Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:19.888Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:48:29.813Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:39.809Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:48:49.809Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:48:59.794Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:09.788Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:19.805Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:29.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:39.835Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:49:49.903Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:49:59.794Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:10.143Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:20.653Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:29.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:40.064Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:50:49.821Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:50:59.825Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:09.892Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:19.876Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:29.806Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:39.806Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:51:49.816Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:51:59.927Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:09.812Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:19.873Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:29.849Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:39.873Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:52:50.062Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:52:59.824Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:09.805Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:19.846Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:29.828Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:39.837Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:53:50.076Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:53:59.788Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:09.791Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:19.831Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:29.867Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:39.807Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:54:49.842Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:54:59.816Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:19.150Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:19.802Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:30.057Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:39.843Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:55:49.850Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:55:59.812Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:09.836Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:19.836Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:29.798Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:39.822Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:56:49.836Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:56:59.815Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:09.801Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:57:19.870Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:29.785Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:57:39.809Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:57:59.703Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:58:10.997Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:58:36.811Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:58:46.722Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:58:58.301Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:06.675Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:16.333Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:27.041Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:36.207Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T12:59:47.146Z"
                    }, {"Value": 0, "Time": "2014-12-01T12:59:56.178Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:06.973Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:16.176Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:26.467Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:36.093Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:00:46.720Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:00:56.078Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:01:07.487Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:01:16.123Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:01:26.944Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:01:44.285Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:03:32.811Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:03:39.503Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:03:52.218Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:04:00.081Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:04:11.558Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:04:33.552Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:04:41.021Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:05:28.838Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:03.626Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:13.877Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:23.969Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:33.685Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:07:44.096Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:07:53.938Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:03.647Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:13.966Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:23.647Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:33.670Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:08:43.828Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:08:53.717Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:03.614Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:13.647Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:23.738Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:33.672Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:09:43.864Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:09:53.659Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:03.674Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:13.627Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:23.676Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:33.631Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:10:43.722Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:10:53.635Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:03.666Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:13.659Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:23.653Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:33.669Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:11:43.669Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:11:53.721Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:03.658Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:13.709Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:23.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:33.643Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:12:43.685Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:12:53.654Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:03.646Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:13.644Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:23.665Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:33.681Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:13:43.669Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:13:53.698Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:03.634Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:13.670Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:23.732Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:33.643Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:14:43.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:14:53.660Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:03.690Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:13.760Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:23.763Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:33.634Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:15:43.660Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:15:53.652Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:03.689Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:13.737Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:23.683Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:33.693Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:16:43.648Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:16:53.638Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:03.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:13.671Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:23.642Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:33.641Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:17:43.631Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:17:53.620Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:03.622Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:13.622Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:23.617Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:33.640Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:18:43.619Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:18:53.664Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:03.612Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:13.645Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:23.667Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:33.644Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:19:43.629Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:19:53.622Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:03.617Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:13.645Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:23.616Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:33.628Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:20:43.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:20:53.667Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:03.652Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:13.686Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:23.663Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:33.737Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:21:43.628Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:21:53.623Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:22:03.651Z"
                    }, {"Value": 0, "Time": "2014-12-01T13:22:13.638Z"}, {
                        "Value": 0,
                        "Time": "2014-12-01T13:22:23.633Z"
                    }],
                    "ValuesAsCsv": "Date,Value\r\n20141201124809,0\r\n20141201124819,0\r\n20141201124829,0\r\n20141201124839,0\r\n20141201124849,0\r\n20141201124859,0\r\n20141201124909,0\r\n20141201124919,0\r\n20141201124929,0\r\n20141201124939,0\r\n20141201124949,0\r\n20141201124959,0\r\n20141201125010,0\r\n20141201125020,0\r\n20141201125029,0\r\n20141201125040,0\r\n20141201125049,0\r\n20141201125059,0\r\n20141201125109,0\r\n20141201125119,0\r\n20141201125129,0\r\n20141201125139,0\r\n20141201125149,0\r\n20141201125159,0\r\n20141201125209,0\r\n20141201125219,0\r\n20141201125229,0\r\n20141201125239,0\r\n20141201125250,0\r\n20141201125259,0\r\n20141201125309,0\r\n20141201125319,0\r\n20141201125329,0\r\n20141201125339,0\r\n20141201125350,0\r\n20141201125359,0\r\n20141201125409,0\r\n20141201125419,0\r\n20141201125429,0\r\n20141201125439,0\r\n20141201125449,0\r\n20141201125459,0\r\n20141201125519,0\r\n20141201125519,0\r\n20141201125530,0\r\n20141201125539,0\r\n20141201125549,0\r\n20141201125559,0\r\n20141201125609,0\r\n20141201125619,0\r\n20141201125629,0\r\n20141201125639,0\r\n20141201125649,0\r\n20141201125659,0\r\n20141201125709,0\r\n20141201125719,0\r\n20141201125729,0\r\n20141201125739,0\r\n20141201125759,0\r\n20141201125810,0\r\n20141201125836,0\r\n20141201125846,0\r\n20141201125858,0\r\n20141201125906,0\r\n20141201125916,0\r\n20141201125927,0\r\n20141201125936,0\r\n20141201125947,0\r\n20141201125956,0\r\n20141201010006,0\r\n20141201010016,0\r\n20141201010026,0\r\n20141201010036,0\r\n20141201010046,0\r\n20141201010056,0\r\n20141201010107,0\r\n20141201010116,0\r\n20141201010126,0\r\n20141201010144,0\r\n20141201010332,0\r\n20141201010339,0\r\n20141201010352,0\r\n20141201010400,0\r\n20141201010411,0\r\n20141201010433,0\r\n20141201010441,0\r\n20141201010528,0\r\n20141201010703,0\r\n20141201010713,0\r\n20141201010723,0\r\n20141201010733,0\r\n20141201010744,0\r\n20141201010753,0\r\n20141201010803,0\r\n20141201010813,0\r\n20141201010823,0\r\n20141201010833,0\r\n20141201010843,0\r\n20141201010853,0\r\n20141201010903,0\r\n20141201010913,0\r\n20141201010923,0\r\n20141201010933,0\r\n20141201010943,0\r\n20141201010953,0\r\n20141201011003,0\r\n20141201011013,0\r\n20141201011023,0\r\n20141201011033,0\r\n20141201011043,0\r\n20141201011053,0\r\n20141201011103,0\r\n20141201011113,0\r\n20141201011123,0\r\n20141201011133,0\r\n20141201011143,0\r\n20141201011153,0\r\n20141201011203,0\r\n20141201011213,0\r\n20141201011223,0\r\n20141201011233,0\r\n20141201011243,0\r\n20141201011253,0\r\n20141201011303,0\r\n20141201011313,0\r\n20141201011323,0\r\n20141201011333,0\r\n20141201011343,0\r\n20141201011353,0\r\n20141201011403,0\r\n20141201011413,0\r\n20141201011423,0\r\n20141201011433,0\r\n20141201011443,0\r\n20141201011453,0\r\n20141201011503,0\r\n20141201011513,0\r\n20141201011523,0\r\n20141201011533,0\r\n20141201011543,0\r\n20141201011553,0\r\n20141201011603,0\r\n20141201011613,0\r\n20141201011623,0\r\n20141201011633,0\r\n20141201011643,0\r\n20141201011653,0\r\n20141201011703,0\r\n20141201011713,0\r\n20141201011723,0\r\n20141201011733,0\r\n20141201011743,0\r\n20141201011753,0\r\n20141201011803,0\r\n20141201011813,0\r\n20141201011823,0\r\n20141201011833,0\r\n20141201011843,0\r\n20141201011853,0\r\n20141201011903,0\r\n20141201011913,0\r\n20141201011923,0\r\n20141201011933,0\r\n20141201011943,0\r\n20141201011953,0\r\n20141201012003,0\r\n20141201012013,0\r\n20141201012023,0\r\n20141201012033,0\r\n20141201012043,0\r\n20141201012053,0\r\n20141201012103,0\r\n20141201012113,0\r\n20141201012123,0\r\n20141201012133,0\r\n20141201012143,0\r\n20141201012153,0\r\n20141201012203,0\r\n20141201012213,0\r\n20141201012223,0\r\n"
                }
            },
            "SitesInfo": {"SourceSiteName": "gui_local_vcd", "TargetSiteName": "gui_local_vcd", "CustomerName": "N/A"},
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
        shortEnum = enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum;

        spyOn(translate, 'instant');

    }));

    it('should have functions to be defined', function () {
        expect(vpgDetailsFactory.registerToDetails).toBeDefined();
        expect(scope._updateZorgName).toBeDefined();
    });

    it('should call registerToDetails function and property to be equal', function () {
        spyOn(vpgDetailsFactory, 'registerToDetails').and.callThrough(scope.setData(scope.result));
        expect(scope.vpgData).toEqual(scope.result);

        expect(scope.RetentionPolicy).toEqual(scope.vpgData.VpgConfiguration.Configuration.IsBackupEnabled ? shortEnum.Extended : shortEnum.Standard);
        expect(scope.isScvmm).toBeFalsy();
        expect(scope.textLabel).toEqual(scope.isScvmm ? translate.instant('CREATE_VPG_SUMMARY.STORAGE') : translate.instant('CREATE_VPG_SUMMARY.DATASTORE'));
        expect(scope.jornalSizeLabel).toEqual(scope.isScvmm ? translate.instant('VPG_DETAILS.PARAMETERS.JOURNAL_SIZE_STORAGE') : translate.instant('VPG_DETAILS.PARAMETERS.JOURNAL_SIZE_DATASTORE'));
    });

    it('should call _updateZorgName function with NA', function () {
        scope._updateZorgName(scope.result.SitesInfo);
        expect(scope.showZertoOrg).toBeFalsy();
    });

    it('should call _updateZorgName function with real "CustomerName"', function () {
        scope.result.SitesInfo.CustomerName = 'Zerto';
        scope._updateZorgName(scope.result.SitesInfo);

        expect(scope.zorgName).toEqual(scope.result.SitesInfo.CustomerName);
        expect(scope.showZertoOrg).toBeTruthy();
    });

    it('should call _scriptSettings function with full "ScriptingSettings"', function () {
        scope.result.VpgConfiguration.Configuration.ScriptingSettings.PreRecoveryScript.Command = 'Play';
        scope.result.VpgConfiguration.Configuration.ScriptingSettings.PostRecoveryScript.Command = 'Stop';
    });

});
