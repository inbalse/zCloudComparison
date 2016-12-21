'use strict';

describe('advancedVmReplicationSettingsPopupTest', function () {
    var scope, controller, advancedVmReplicationSettingsFactory, advancedVmReplicationSettingsModel, editVmFactory, createVPGModel, data;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _advancedVmReplicationSettingsFactory_, _advancedVmReplicationSettingsModel_, _editVmFactory_, _createVPGModel_) {
        scope = $rootScope.$new();
        advancedVmReplicationSettingsFactory = _advancedVmReplicationSettingsFactory_;
        advancedVmReplicationSettingsModel = _advancedVmReplicationSettingsModel_;
        editVmFactory = _editVmFactory_;
        createVPGModel = _createVPGModel_;

        data = {
            "potentialResrouce": {
                "Datastores": [{
                    "Datastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-646",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (455MB free of 0.50GB)"
                    }, "IsEnabled": true
                }, {
                    "Datastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS (43.5GB free of 99.8GB)"
                    }, "IsEnabled": true
                }],
                "Networks": [{
                    "Id": {
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                        "InternalType": "Network",
                        "InternalName": "network-648"
                    }, "DisplayName": "VM Network"
                }],
                "DescendantHosts": [],
                "PotentialFolders": [{
                    "Id": {
                        "InternalFolderName": "group-v368",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DisplayName": "[Default]ZertoRecoveryFolder"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v492",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DisplayName": "Zerto_guy_13d3e82a-fbaf-4003-adc8-5bc9cb7f1caf"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v439",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DisplayName": "Zerto_guy_248a80a9-0337-4bbc-9661-6e52e1aeee8a"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v428",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DisplayName": "Zerto_guy_d095d012-90ce-494c-a973-ea36e91df467"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v432",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DisplayName": "Zerto_guy_d627cce4-f3a6-4008-a165-75719d2b908c"
                }, {
                    "Id": {
                        "InternalFolderName": "group-v3",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DisplayName": "/"
                }],
                "AssociatedRawDevices": [{
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "naa.60003ff44dc75adc94385dd8bba75c3b",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "SizeInKb": 104857600,
                        "SizeInBytes": 107374182400,
                        "DeviceName": "/vmfs/devices/disks/naa.60003ff44dc75adc94385dd8bba75c3b",
                        "DevicePath": "/vmfs/devices/disks/naa.60003ff44dc75adc94385dd8bba75c3b",
                        "Mode": 1
                    },
                    "DisplayName": "MSFT iSCSI Disk (naa.60003ff44dc75adc94385dd8bba75c3b) - virtual",
                    "IsEnabled": true
                }, {
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "naa.60003ff44dc75adc94385dd8bba75c3b",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "SizeInKb": 104857600,
                        "SizeInBytes": 107374182400,
                        "DeviceName": "/vmfs/devices/disks/naa.60003ff44dc75adc94385dd8bba75c3b",
                        "DevicePath": "/vmfs/devices/disks/naa.60003ff44dc75adc94385dd8bba75c3b",
                        "Mode": 2
                    },
                    "DisplayName": "MSFT iSCSI Disk (naa.60003ff44dc75adc94385dd8bba75c3b) - physical",
                    "IsEnabled": true
                }, {
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "mpx.vmhba1:C0:T0:L0",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "SizeInKb": 8388608,
                        "SizeInBytes": 8589934592,
                        "DeviceName": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "DevicePath": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "Mode": 1
                    }, "DisplayName": "Local VMware Disk (mpx.vmhba1:C0:T0:L0) - virtual", "IsEnabled": true
                }, {
                    "Destination": {
                        "Device": {
                            "InternalDeviceName": "mpx.vmhba1:C0:T0:L0",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "SizeInKb": 8388608,
                        "SizeInBytes": 8589934592,
                        "DeviceName": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "DevicePath": "/vmfs/devices/disks/mpx.vmhba1:C0:T0:L0",
                        "Mode": 2
                    }, "DisplayName": "Local VMware Disk (mpx.vmhba1:C0:T0:L0) - physical", "IsEnabled": true
                }]
            },
            "potentialVms": [{
                "DisplayName": "d1",
                "Id": {
                    "InternalVmName": "vm-680",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 272,
                "id": "vm-68009d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "272.0 MB", "value": 272}
            }, {
                "DisplayName": "d2",
                "Id": {
                    "InternalVmName": "vm-671",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 272,
                "id": "vm-67109d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "272.0 MB", "value": 272}
            }, {
                "DisplayName": "d3",
                "Id": {
                    "InternalVmName": "vm-677",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 272,
                "id": "vm-67709d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "272.0 MB", "value": 272}
            }, {
                "DisplayName": "denis-local-vm-2",
                "Id": {
                    "InternalVmName": "vm-676",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-67609d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "Dummy(1)(1)",
                "Id": {
                    "InternalVmName": "vm-681",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 272,
                "id": "vm-68109d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "272.0 MB", "value": 272}
            }, {
                "DisplayName": "evgeny-local-vm",
                "Id": {
                    "InternalVmName": "vm-674",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 236,
                "id": "vm-67409d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "236.0 MB", "value": 236}
            }, {
                "DisplayName": "evgeny-local-vm (2)",
                "Id": {
                    "InternalVmName": "vm-683",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 244,
                "id": "vm-68309d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "244.0 MB", "value": 244}
            }, {
                "DisplayName": "evgeny-local-vm (3)",
                "Id": {
                    "InternalVmName": "vm-684",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 245,
                "id": "vm-68409d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "245.0 MB", "value": 245}
            }, {
                "DisplayName": "evgeny-local-vm(1)",
                "Id": {
                    "InternalVmName": "vm-679",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 236,
                "id": "vm-67909d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "236.0 MB", "value": 236}
            }, {
                "DisplayName": "evgeny-local-vm-2",
                "Id": {
                    "InternalVmName": "vm-682",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-68209d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "evgeny_vm1",
                "Id": {
                    "InternalVmName": "vm-678",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 298,
                "id": "vm-67809d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "298.0 MB", "value": 298}
            }, {
                "DisplayName": "ex-vm",
                "Id": {
                    "InternalVmName": "vm-697",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 2262,
                "id": "vm-69709d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "2.2 GB", "value": 2262}
            }, {
                "DisplayName": "gui-local-IN_RESOURCE_POOL-2",
                "Id": {
                    "InternalVmName": "vm-663",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-66309d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "gui-test-vm-MULTIPLE_NICS",
                "Id": {
                    "InternalVmName": "vm-661",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-66109d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "gui-test-vm_1_GB_VOLUME",
                "Id": {
                    "InternalVmName": "vm-670",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 1242,
                "id": "vm-67009d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "1.2 GB", "value": 1242}
            }, {
                "DisplayName": "gui-test-vm_1_GB_VOLUME - testing recovery",
                "Id": {
                    "InternalVmName": "vm-690",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 1242,
                "id": "vm-69009d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "1.2 GB", "value": 1242}
            }, {
                "DisplayName": "gui-test-vm_1_GB_VOLUME(1)",
                "Id": {
                    "InternalVmName": "vm-688",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 1242,
                "id": "vm-68809d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "1.2 GB", "value": 1242}
            }, {
                "DisplayName": "kobi-local-vm",
                "Id": {
                    "InternalVmName": "vm-672",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-67209d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "kobi-local-vm - testing recovery",
                "Id": {
                    "InternalVmName": "vm-691",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-69109d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "kobi-local-vm-2",
                "Id": {
                    "InternalVmName": "vm-673",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-67309d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "liron-local-vm",
                "Id": {
                    "InternalVmName": "vm-665",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-66509d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "liron-local-vm - testing recovery",
                "Id": {
                    "InternalVmName": "vm-689",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-68909d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "liron-local-vm(1)",
                "Id": {
                    "InternalVmName": "vm-695",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-69509d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "liron-local-vm(2)",
                "Id": {
                    "InternalVmName": "vm-694",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-69409d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "liron-local-vm-2(1)",
                "Id": {
                    "InternalVmName": "vm-692",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-69209d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "liron-local-vm-2(2)",
                "Id": {
                    "InternalVmName": "vm-693",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-69309d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "vapp-vm-test",
                "Id": {
                    "InternalVmName": "vm-662",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-66209d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "vapp-vm-test - 2015-11-03_08-33-55",
                "Id": {
                    "InternalVmName": "vm-698",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-69809d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "vapp-vm-test - 2015-11-03_08-36-30",
                "Id": {
                    "InternalVmName": "vm-699",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-69909d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "vapp-vm-test - 2015-11-03_08-40-26",
                "Id": {
                    "InternalVmName": "vm-700",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-70009d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }, {
                "DisplayName": "Win2k12R_Evgeny-flr",
                "Id": {
                    "InternalVmName": "vm-686",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 77731,
                "id": "vm-68609d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "75.9 GB", "value": 77731}
            }, {
                "DisplayName": "Windows Server 2012 R2 EFI",
                "Id": {
                    "InternalVmName": "vm-685",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 24830,
                "id": "vm-68509d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "24.2 GB", "value": 24830}
            }, {
                "DisplayName": "yaniv-local-vm",
                "Id": {
                    "InternalVmName": "vm-669",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 226,
                "id": "vm-66909d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "226.0 MB", "value": 226}
            }],
            "initialSitesInfo": {
                "LocalVCDVapps": [],
                "TargetSites": [{
                    "OwnersId": {
                        "Id": {"OwnersGuid": "a05b4d99-df80-466b-9cc5-77e6a115b62e"},
                        "DisplayName": "gui_local (Local)",
                        "IsLocal": true
                    },
                    "SiteId": {"SiteGuid": "b2679465-2213-49ba-b578-a7a05a89496a"},
                    "IsConnected": true,
                    "IsVCenterEnabled": true,
                    "IsVCDEnabled": false,
                    "IsScvmmEnabled": false,
                    "IsPublicCloud": false
                }],
                "AllowSourceVcenter": true,
                "PotentialZertoOrganization": [{
                    "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                    "OrganizationName": "No Organization",
                    "CrmIdentifier": "No Contact"
                }]
            },
            "priorityCollection": [{"enum": 2, "label": "High"}, {"enum": 1, "label": "Medium"}, {
                "enum": 0,
                "label": "Low"
            }],
            "potenaialSiteTypes": [],
            "defaultJournalHistoryCollection": [{"label": "Days", "value": 1}, {"label": "Hours", "value": 2}],
            "defaultTestPeriodCollection": [{"label": "1 Month", "value": 43200}, {
                "label": "3 Months",
                "value": 131040
            }, {"label": "6 Months", "value": 262080}, {"label": "9 Months", "value": 394560}, {
                "label": "12 Months",
                "value": 525600
            }, {"label": "None", "value": 0}],
            "copyNatRulesCollection": [{"value": 1, "label": "Use automatically allocated IP"}, {
                "value": 2,
                "label": "Use source external IP"
            }],
            "priority": 0,
            "RPOAlertOptions": {"from": 0, "to": 38, "step": 1, "smooth": true},
            "RPOAlert": "9",
            "defaultJournal": {"historyTypeValue": 1, "defaultJournalHistoryStepper": 1},
            "protectionGroupId": {"GroupGuid": "411ef600-89cf-4377-9818-840b8fa19cdb"},
            "isReverse": false,
            "vms": [{
                "DisplayName": "gui-test-vm-MULTIPLE_VOLUMES",
                "Id": {
                    "InternalVmName": "vm-668",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "SizeInMb": 247,
                "id": "vm-66809d0d3b4-78d0-47c1-ad38-d01887e6d589",
                "SizeInMbFiltered": {"display": "247.0 MB", "value": 247},
                "BootOrderGroup": "Default"
            }],
            "protectedVms": [{
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-668",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "Name": "gui-test-vm-MULTIPLE_VOLUMES",
                "SourceHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                },
                "SourceDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                },
                "TargetHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                },
                "TargetDatastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                },
                "StorageUsageInfo": {
                    "ProvisionedStorageSizeInMB": 247,
                    "UsedStorageSizeInMB": 0,
                    "RecoveryStorageSizeInMB": 0
                },
                "Volumes": [{
                    "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES.vmdk",
                    "TargetAddress": "ZNest81 DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 8,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
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
                                        "InternalDatastoreName": "datastore-647",
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                    }, "IsThin": true
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }, {
                    "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_1.vmdk",
                    "TargetAddress": "ZNest81 DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 10,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                            },
                            "UnitNumber": 1,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:1)",
                            "VolumeIdentifier": "scsi:0:1"
                        },
                        "Settings": {
                            "IsSwap": false,
                            "VolumeReplicationDestination": {
                                "Datastore": {
                                    "TargetDatastore": {
                                        "InternalDatastoreName": "datastore-647",
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                    }, "IsThin": true
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                }, {
                    "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_2.vmdk",
                    "TargetAddress": "ZNest81 DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 11,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                            },
                            "UnitNumber": 2,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:2)",
                            "VolumeIdentifier": "scsi:0:2"
                        },
                        "Settings": {
                            "IsSwap": false,
                            "VolumeReplicationDestination": {
                                "Datastore": {
                                    "TargetDatastore": {
                                        "InternalDatastoreName": "datastore-647",
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                    }, "IsThin": true
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
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
                                "InternalName": "network-648"
                            }, "DisplayName": "VM Network"
                        }, "VCDNetwork": null
                    },
                    "FailoverSettings": {
                        "VCenterNetworkSettings": {
                            "RecoveryNetwork": {
                                "Id": {
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                    "InternalType": "Network",
                                    "InternalName": "network-648"
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
                                    "InternalName": "network-648"
                                }, "DisplayName": "VM Network"
                            }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                        }, "VCDNetworkSettings": null
                    },
                    "IsIPConfigurationEnabled": false,
                    "MacAddress": "00:50:56:bd:c1:5a"
                }],
                "CloudVmSettings": null,
                "TargetFolder": {
                    "Id": {
                        "InternalFolderName": "group-v368",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DisplayName": "[Default]ZertoRecoveryFolder"
                },
                "StorageProfile": null,
                "JournalHardLimit": {"Type": 1, "Limit": 153600},
                "JournalWarningThreshold": {"Type": 1, "Limit": 115200},
                "JournalDatastores": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-647",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                }]
            }],
            "targetSite": {
                "OwnersId": {
                    "Id": {"OwnersGuid": "a05b4d99-df80-466b-9cc5-77e6a115b62e"},
                    "DisplayName": "gui_local (Local)",
                    "IsLocal": true
                },
                "SiteId": {"SiteGuid": "b2679465-2213-49ba-b578-a7a05a89496a"},
                "IsConnected": true,
                "IsVCenterEnabled": true,
                "IsVCDEnabled": false,
                "IsScvmmEnabled": false,
                "IsPublicCloud": false
            },
            "targetSiteType": {"type": "VC", "value": 0},
            "targetHost": {
                "ComputeResource": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
            },
            "targetFolder": {
                "Id": {
                    "InternalFolderName": "group-v368",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "DisplayName": "[Default]ZertoRecoveryFolder"
            },
            "name": "blabla",
            "description": "",
            "defaultVpgSettings": {
                "Config": {
                    "Name": "blabla",
                    "Configuration": {
                        "Priority": 0,
                        "MinimalJournalLenghtInMinutes": 1440,
                        "JournalHealthSettings": {
                            "IsFeatureSupported": true,
                            "IsEnabled": true,
                            "JournalHealthInMinutes": 240
                        },
                        "RPOThressholdInSeconds": 300,
                        "MaxTestIntervalInMinutes": 262080,
                        "WanCompression": true,
                        "ScriptingSettings": {
                            "PreRecoveryScript": {
                                "Command": null,
                                "Parameters": null,
                                "TimeoutInSeconds": 300
                            },
                            "PostRecoveryScript": {"Command": null, "Parameters": null, "TimeoutInSeconds": 300},
                            "UseScripts": false
                        },
                        "ManageJournalSettings": {
                            "JournalDatastore": null,
                            "JournalHardLimitPerVM": {"Type": 1, "Limit": 153600},
                            "JournalWarningThresholdPerVM": {"Type": 1, "Limit": 115200}
                        },
                        "BootOrder": {
                            "Groups": [{
                                "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                                "Name": "Default",
                                "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                                "Machines": [{
                                    "DisplayName": "gui-test-vm-MULTIPLE_VOLUMES",
                                    "Id": {
                                        "InternalVmName": "vm-668",
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
                        "IsBackupEnabled": false,
                        "CopyNatRulesOptions": 0,
                        "CopyNatServiceAvailable": true
                    },
                    "Defaults": {
                        "TargetComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-647",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS (43.5GB free of 99.8GB)"
                        },
                        "FailoverNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                "InternalType": "Network",
                                "InternalName": "network-648"
                            }, "DisplayName": "VM Network"
                        },
                        "TestNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                "InternalType": "Network",
                                "InternalName": "network-648"
                            }, "DisplayName": "VM Network"
                        },
                        "TargetFolder": {
                            "Id": {
                                "InternalFolderName": "group-v368",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
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
                            "InternalVmName": "vm-668",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "Name": "gui-test-vm-MULTIPLE_VOLUMES",
                        "SourceHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                        },
                        "SourceDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-647",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                        },
                        "TargetHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                        },
                        "TargetDatastore": {
                            "Id": {
                                "InternalDatastoreName": "datastore-647",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                        },
                        "StorageUsageInfo": {
                            "ProvisionedStorageSizeInMB": 247,
                            "UsedStorageSizeInMB": 0,
                            "RecoveryStorageSizeInMB": 0
                        },
                        "Volumes": [{
                            "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES.vmdk",
                            "TargetAddress": "ZNest81 DS",
                            "Swap": false,
                            "ProvisionedSizeInMB": 8,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                        "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
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
                                                "InternalDatastoreName": "datastore-647",
                                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                            }, "IsThin": true
                                        },
                                        "VCDDatastore": null,
                                        "ExistingDisk": null,
                                        "RawDevice": null,
                                        "StoragePod": null
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": true
                        }, {
                            "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_1.vmdk",
                            "TargetAddress": "ZNest81 DS",
                            "Swap": false,
                            "ProvisionedSizeInMB": 10,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                        "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                    },
                                    "UnitNumber": 1,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:1)",
                                    "VolumeIdentifier": "scsi:0:1"
                                },
                                "Settings": {
                                    "IsSwap": false,
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-647",
                                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                            }, "IsThin": true
                                        },
                                        "VCDDatastore": null,
                                        "ExistingDisk": null,
                                        "RawDevice": null,
                                        "StoragePod": null
                                    }
                                }
                            },
                            "IsSourceThinProvisioned": true
                        }, {
                            "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_2.vmdk",
                            "TargetAddress": "ZNest81 DS",
                            "Swap": false,
                            "ProvisionedSizeInMB": 11,
                            "InternalVolumeManagementSettings": {
                                "DiskLocationParams": {
                                    "VMUuids": {
                                        "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                        "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                    },
                                    "UnitNumber": 2,
                                    "ControllerNumber": 0,
                                    "VolumeType": 0,
                                    "DlpDescription": "Scsi(0:2)",
                                    "VolumeIdentifier": "scsi:0:2"
                                },
                                "Settings": {
                                    "IsSwap": false,
                                    "VolumeReplicationDestination": {
                                        "Datastore": {
                                            "TargetDatastore": {
                                                "InternalDatastoreName": "datastore-647",
                                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                            }, "IsThin": true
                                        },
                                        "VCDDatastore": null,
                                        "ExistingDisk": null,
                                        "RawDevice": null,
                                        "StoragePod": null
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
                                        "InternalName": "network-648"
                                    }, "DisplayName": "VM Network"
                                }, "VCDNetwork": null
                            },
                            "FailoverSettings": {
                                "VCenterNetworkSettings": {
                                    "RecoveryNetwork": {
                                        "Id": {
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                            "InternalType": "Network",
                                            "InternalName": "network-648"
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
                                            "InternalName": "network-648"
                                        }, "DisplayName": "VM Network"
                                    }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                                }, "VCDNetworkSettings": null
                            },
                            "IsIPConfigurationEnabled": false,
                            "MacAddress": "00:50:56:bd:c1:5a",
                            "vmId": {
                                "InternalVmName": "vm-668",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            },
                            "id": "vm-66800:50:56:bd:c1:5a",
                            "vmName": "gui-test-vm-MULTIPLE_VOLUMES",
                            "nicName": "Network adapter 1",
                            "ProtectedNetwork": "VM Network",
                            "FailoverIp": "",
                            "FailoverNetwork": "VM Network",
                            "TestNetwork": "VM Network",
                            "TestIP": "",
                            "isInMultiNicVM": false,
                            "TargetHost": {
                                "BaseComputeResourceIdentifier": {
                                    "InternalName": "host-643",
                                    "Type": 0,
                                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                            }
                        }],
                        "CloudVmSettings": null,
                        "TargetFolder": {
                            "Id": {
                                "InternalFolderName": "group-v368",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "DisplayName": "[Default]ZertoRecoveryFolder"
                        },
                        "StorageProfile": null,
                        "JournalHardLimit": {"Type": 1, "Limit": 153600},
                        "JournalWarningThreshold": {"Type": 1, "Limit": 115200},
                        "JournalDatastores": [{
                            "Id": {
                                "InternalDatastoreName": "datastore-647",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                        }]
                    }],
                    "OwnersId": {"OwnersGuid": "a05b4d99-df80-466b-9cc5-77e6a115b62e", "siteName": "gui_local"},
                    "ZertoOrganizationIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"}
                },
                "TargetSiteInfo": {
                    "OwnersId": {
                        "Id": {"OwnersGuid": "a05b4d99-df80-466b-9cc5-77e6a115b62e"},
                        "DisplayName": "gui_local (Local)",
                        "IsLocal": true
                    },
                    "PotentialReplicationDestinations": [{
                        "ComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                        }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                    }, {
                        "ComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            },
                            "ResourcePoolIdentifier": {
                                "InternalName": "resgroup-644",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            },
                            "DisplayName": "RP:172.20.200.2 puptitz-rp"
                        }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                    }, {
                        "ComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            },
                            "ResourcePoolIdentifier": {
                                "InternalName": "resgroup-645",
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            },
                            "DisplayName": "RP:172.20.200.2 tes-vapp2"
                        }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                    }],
                    "VCDVirtualDatacenters": [],
                    "PotentialServiceProfiles": [],
                    "PotentialPublicCloudPcns": {"PotentialPcns": []},
                    "IsConnected": true,
                    "IsPrePostScriptsEnabled": true,
                    "PotentialBackupTargets": [{
                        "Identifier": {"Identifier": "4adf9b50-33ff-45d3-8136-e81226d6b32f"},
                        "DisplayName": "pinkRep",
                        "IsDefault": true,
                        "IsCompressionEnabled": true
                    }, {
                        "Identifier": {"Identifier": "00000000-0000-0000-0000-000000000000"},
                        "DisplayName": "None",
                        "IsDefault": false,
                        "IsCompressionEnabled": true
                    }],
                    "PotentialReplicationSiteInitialInfo": {
                        "OwnersId": {
                            "Id": {"OwnersGuid": "a05b4d99-df80-466b-9cc5-77e6a115b62e"},
                            "DisplayName": "gui_local (Local)",
                            "IsLocal": true
                        },
                        "SiteId": {"SiteGuid": "b2679465-2213-49ba-b578-a7a05a89496a"},
                        "IsConnected": true,
                        "IsVCenterEnabled": true,
                        "IsVCDEnabled": false,
                        "IsScvmmEnabled": false,
                        "IsPublicCloud": false
                    },
                    "PotentialPublicCloudInstanceTypeVisualObjects": []
                },
                "ProtectionGroupId": {"GroupGuid": "411ef600-89cf-4377-9818-840b8fa19cdb"},
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
            },
            "selectedVCDVapp": null,
            "isUsingVappNetworkMapping": false,
            "targetOrgvDC": null,
            "backupTargetDetails": {},
            "vmsNicsList": [{
                "InternalIdentifier": {"Name": "Network adapter 1"},
                "SourceNetwork": {
                    "VcenterNetwork": {
                        "Id": {
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                            "InternalType": "Network",
                            "InternalName": "network-648"
                        }, "DisplayName": "VM Network"
                    }, "VCDNetwork": null
                },
                "FailoverSettings": {
                    "VCenterNetworkSettings": {
                        "RecoveryNetwork": {
                            "Id": {
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                "InternalType": "Network",
                                "InternalName": "network-648"
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
                                "InternalName": "network-648"
                            }, "DisplayName": "VM Network"
                        }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                    }, "VCDNetworkSettings": null
                },
                "IsIPConfigurationEnabled": false,
                "MacAddress": "00:50:56:bd:c1:5a",
                "vmId": {
                    "InternalVmName": "vm-668",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                },
                "id": "vm-66800:50:56:bd:c1:5a",
                "vmName": "gui-test-vm-MULTIPLE_VOLUMES",
                "nicName": "Network adapter 1",
                "ProtectedNetwork": "VM Network",
                "FailoverIp": "",
                "FailoverNetwork": "VM Network",
                "TestNetwork": "VM Network",
                "TestIP": "",
                "isInMultiNicVM": false,
                "TargetHost": {
                    "BaseComputeResourceIdentifier": {
                        "InternalName": "host-643",
                        "Type": 0,
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                }
            }],
            "isSlaCustom": true,
            "selectedZORG": {
                "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                "OrganizationName": "No Organization",
                "CrmIdentifier": "No Contact"
            },
            "awsSelected": false,
            "storageVolumes": [{
                "id": 0,
                "Index": 0,
                "VMName": "gui-test-vm-MULTIPLE_VOLUMES",
                "VM": {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-668",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "gui-test-vm-MULTIPLE_VOLUMES",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-643",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-643",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 247,
                        "UsedStorageSizeInMB": 0,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
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
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_1.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 10,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                },
                                "UnitNumber": 1,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:1)",
                                "VolumeIdentifier": "scsi:0:1"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_2.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 11,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                },
                                "UnitNumber": 2,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:2)",
                                "VolumeIdentifier": "scsi:0:2"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
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
                                    "InternalName": "network-648"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-648"
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
                                        "InternalName": "network-648"
                                    }, "DisplayName": "VM Network"
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:bd:c1:5a",
                        "vmId": {
                            "InternalVmName": "vm-668",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "id": "vm-66800:50:56:bd:c1:5a",
                        "vmName": "gui-test-vm-MULTIPLE_VOLUMES",
                        "nicName": "Network adapter 1",
                        "ProtectedNetwork": "VM Network",
                        "FailoverIp": "",
                        "FailoverNetwork": "VM Network",
                        "TestNetwork": "VM Network",
                        "TestIP": "",
                        "isInMultiNicVM": false,
                        "TargetHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                        }
                    }],
                    "CloudVmSettings": null,
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v368",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 1, "Limit": 153600},
                    "JournalWarningThreshold": {"Type": 1, "Limit": 115200},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    }]
                },
                "Volume": {
                    "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES.vmdk",
                    "TargetAddress": "ZNest81 DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 8,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
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
                                        "InternalDatastoreName": "datastore-647",
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                    }, "IsThin": true
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                },
                "Thin": true,
                "ProvisionedSizeInMB": "8.0 MB"
            }, {
                "id": 1,
                "Index": 1,
                "VMName": "gui-test-vm-MULTIPLE_VOLUMES",
                "VM": {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-668",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "gui-test-vm-MULTIPLE_VOLUMES",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-643",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-643",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 247,
                        "UsedStorageSizeInMB": 0,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
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
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_1.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 10,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                },
                                "UnitNumber": 1,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:1)",
                                "VolumeIdentifier": "scsi:0:1"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_2.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 11,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                },
                                "UnitNumber": 2,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:2)",
                                "VolumeIdentifier": "scsi:0:2"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
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
                                    "InternalName": "network-648"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-648"
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
                                        "InternalName": "network-648"
                                    }, "DisplayName": "VM Network"
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:bd:c1:5a",
                        "vmId": {
                            "InternalVmName": "vm-668",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "id": "vm-66800:50:56:bd:c1:5a",
                        "vmName": "gui-test-vm-MULTIPLE_VOLUMES",
                        "nicName": "Network adapter 1",
                        "ProtectedNetwork": "VM Network",
                        "FailoverIp": "",
                        "FailoverNetwork": "VM Network",
                        "TestNetwork": "VM Network",
                        "TestIP": "",
                        "isInMultiNicVM": false,
                        "TargetHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                        }
                    }],
                    "CloudVmSettings": null,
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v368",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 1, "Limit": 153600},
                    "JournalWarningThreshold": {"Type": 1, "Limit": 115200},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    }]
                },
                "Volume": {
                    "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_1.vmdk",
                    "TargetAddress": "ZNest81 DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 10,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                            },
                            "UnitNumber": 1,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:1)",
                            "VolumeIdentifier": "scsi:0:1"
                        },
                        "Settings": {
                            "IsSwap": false,
                            "VolumeReplicationDestination": {
                                "Datastore": {
                                    "TargetDatastore": {
                                        "InternalDatastoreName": "datastore-647",
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                    }, "IsThin": true
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                },
                "Thin": true,
                "ProvisionedSizeInMB": "10.0 MB"
            }, {
                "id": 2,
                "Index": 2,
                "VMName": "gui-test-vm-MULTIPLE_VOLUMES",
                "VM": {
                    "InternalVirtualMachineId": {
                        "InternalVmName": "vm-668",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Name": "gui-test-vm-MULTIPLE_VOLUMES",
                    "SourceHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-643",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "SourceDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    },
                    "TargetHost": {
                        "BaseComputeResourceIdentifier": {
                            "InternalName": "host-643",
                            "Type": 0,
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                    },
                    "TargetDatastore": {
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    },
                    "StorageUsageInfo": {
                        "ProvisionedStorageSizeInMB": 247,
                        "UsedStorageSizeInMB": 0,
                        "RecoveryStorageSizeInMB": 0
                    },
                    "Volumes": [{
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 8,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
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
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_1.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 10,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                },
                                "UnitNumber": 1,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:1)",
                                "VolumeIdentifier": "scsi:0:1"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                                }
                            }
                        },
                        "IsSourceThinProvisioned": true
                    }, {
                        "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_2.vmdk",
                        "TargetAddress": "ZNest81 DS",
                        "Swap": false,
                        "ProvisionedSizeInMB": 11,
                        "InternalVolumeManagementSettings": {
                            "DiskLocationParams": {
                                "VMUuids": {
                                    "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                    "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                                },
                                "UnitNumber": 2,
                                "ControllerNumber": 0,
                                "VolumeType": 0,
                                "DlpDescription": "Scsi(0:2)",
                                "VolumeIdentifier": "scsi:0:2"
                            },
                            "Settings": {
                                "IsSwap": false,
                                "VolumeReplicationDestination": {
                                    "Datastore": {
                                        "TargetDatastore": {
                                            "InternalDatastoreName": "datastore-647",
                                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                        }, "IsThin": true
                                    }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
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
                                    "InternalName": "network-648"
                                }, "DisplayName": "VM Network"
                            }, "VCDNetwork": null
                        },
                        "FailoverSettings": {
                            "VCenterNetworkSettings": {
                                "RecoveryNetwork": {
                                    "Id": {
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                                        "InternalType": "Network",
                                        "InternalName": "network-648"
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
                                        "InternalName": "network-648"
                                    }, "DisplayName": "VM Network"
                                }, "IP": null, "DnsSuffix": null, "ShouldReplaceMacAddress": false
                            }, "VCDNetworkSettings": null
                        },
                        "IsIPConfigurationEnabled": false,
                        "MacAddress": "00:50:56:bd:c1:5a",
                        "vmId": {
                            "InternalVmName": "vm-668",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        },
                        "id": "vm-66800:50:56:bd:c1:5a",
                        "vmName": "gui-test-vm-MULTIPLE_VOLUMES",
                        "nicName": "Network adapter 1",
                        "ProtectedNetwork": "VM Network",
                        "FailoverIp": "",
                        "FailoverNetwork": "VM Network",
                        "TestNetwork": "VM Network",
                        "TestIP": "",
                        "isInMultiNicVM": false,
                        "TargetHost": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-643",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "172.20.200.2"
                        }
                    }],
                    "CloudVmSettings": null,
                    "TargetFolder": {
                        "Id": {
                            "InternalFolderName": "group-v368",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DisplayName": "[Default]ZertoRecoveryFolder"
                    },
                    "StorageProfile": null,
                    "JournalHardLimit": {"Type": 1, "Limit": 153600},
                    "JournalWarningThreshold": {"Type": 1, "Limit": 115200},
                    "JournalDatastores": [{
                        "Id": {
                            "InternalDatastoreName": "datastore-647",
                            "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                        }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS"
                    }]
                },
                "Volume": {
                    "SourceAddress": "[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_2.vmdk",
                    "TargetAddress": "ZNest81 DS",
                    "Swap": false,
                    "ProvisionedSizeInMB": 11,
                    "InternalVolumeManagementSettings": {
                        "DiskLocationParams": {
                            "VMUuids": {
                                "Uuid": "42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a",
                                "InstanceUuid": "50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"
                            },
                            "UnitNumber": 2,
                            "ControllerNumber": 0,
                            "VolumeType": 0,
                            "DlpDescription": "Scsi(0:2)",
                            "VolumeIdentifier": "scsi:0:2"
                        },
                        "Settings": {
                            "IsSwap": false,
                            "VolumeReplicationDestination": {
                                "Datastore": {
                                    "TargetDatastore": {
                                        "InternalDatastoreName": "datastore-647",
                                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                                    }, "IsThin": true
                                }, "VCDDatastore": null, "ExistingDisk": null, "RawDevice": null, "StoragePod": null
                            }
                        }
                    },
                    "IsSourceThinProvisioned": true
                },
                "Thin": true,
                "ProvisionedSizeInMB": "11.0 MB"
            }],
            "enableBackupScripts": false,
            "sourceSiteType": {"sourceType": 0},
            "vmsVCDNicsList": [],
            "selectedVcdVappVMs": [],
            "isEdit": true,
            "vpgId": {"GroupGuid": "411ef600-89cf-4377-9818-840b8fa19cdb"},
            "isScvmm": false,
            "potentialMappingNetworks": [],
            "potentialReverseMappingNetworks": [],
            "editValidationFlags": {
                "AllowChangeDatastore": false,
                "DoZertoOrganizationValidation": false,
                "KeepUnprotectedDisks": false,
                "ReprotectInsteadOfChangeDatastore": false
            },
            "createValidationFlags": {"DoZertoOrganizationValidation": true},
            "isPortal": false,
            "isFirstAwsLoadingFailover": true,
            "isFirstAwsLoadingTest": true,
            "vcdVMsSize": 247,
            "isDefaultValueChange": false,
            "initSingleSiteType": false,
            "vappVmsLoaded": false,
            "copyNatRulesAvailable": false,
            "isSourceVcd": false,
            "totalProvisionedSpace": null,
            "defaultFailoverNetwork": {
                "Id": {
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                    "InternalType": "Network",
                    "InternalName": "network-648"
                }, "DisplayName": "VM Network"
            },
            "defaultTestNetwork": {
                "Id": {
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                    "InternalType": "Network",
                    "InternalName": "network-648"
                }, "DisplayName": "VM Network"
            }
        };

        createVPGModel.data = data;

        controller = $controller('advancedVmReplicationSettingsPopup', {$scope: scope, data: data});

        scope.selectedItems = data.defaultVpgSettings.Config.VirtualMachines;

        scope.gridObj = {
            advancedVmSettingsGrid: {
                updateData: function () {
                }
            }
        };

        spyOn(editVmFactory, 'openWindow').and.callThrough();
        spyOn(scope.gridObj.advancedVmSettingsGrid, 'updateData');
    }));

    it("should have functions on scope", function () {
        expect(scope.data).toBeDefined();
        expect(scope.gridData).toBeDefined();
        expect(scope.gridObj.advancedVmSettingsGrid).toBeDefined();
        expect(scope.customOptions).toBeDefined();
        expect(scope.selectedItems).toBeDefined();
        expect(scope.groupByValues).toBeDefined();
        expect(scope.handleApplyDefaultsClick).toBeDefined();
        expect(scope.handleEditSelectedClick).toBeDefined();
        expect(scope.onEditVMFactoryResultSave).toBeDefined();
        expect(scope.selectedItemsChange).toBeDefined();
    });

    it('should call editVmFactory', function () {
        scope.selectedItems = [];

        scope.handleEditSelectedClick();
        expect(editVmFactory.openWindow).toHaveBeenCalled();
    });

    it('it should properly assign values when result is returned', function () {
        var result = {
            TargetHost: {DisplayName: 'TargetHost'},
            TargetDatastore: {DisplayName: 'TargetDatastore'},
            JournalHardLimit: 2048,
            JournalWarningThreshold: 2048,
            JournalDatastores: []
        };
        scope.onEditVMFactoryResultSave(result);
        var e = '[{"InternalVirtualMachineId":{"InternalVmName":"vm-668","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"Name":"gui-test-vm-MULTIPLE_VOLUMES","SourceHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-643","Type":0,"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.200.2"},"SourceDatastore":{"Id":{"InternalDatastoreName":"datastore-647","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81 DS"},"TargetHost":{"DisplayName":"TargetHost"},"TargetDatastore":{"DisplayName":"TargetDatastore"},"StorageUsageInfo":{"ProvisionedStorageSizeInMB":247,"UsedStorageSizeInMB":0,"RecoveryStorageSizeInMB":0},"Volumes":[{"SourceAddress":"[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES.vmdk","TargetAddress":"ZNest81 DS","Swap":false,"ProvisionedSizeInMB":8,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a","InstanceUuid":"50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)","VolumeIdentifier":"scsi:0:0"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"Datastore":{"TargetDatastore":{"InternalDatastoreName":"datastore-647","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"IsThin":true},"VCDDatastore":null,"ExistingDisk":null,"RawDevice":null,"StoragePod":null}}},"IsSourceThinProvisioned":true},{"SourceAddress":"[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_1.vmdk","TargetAddress":"ZNest81 DS","Swap":false,"ProvisionedSizeInMB":10,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a","InstanceUuid":"50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"},"UnitNumber":1,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:1)","VolumeIdentifier":"scsi:0:1"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"Datastore":{"TargetDatastore":{"InternalDatastoreName":"datastore-647","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"IsThin":true},"VCDDatastore":null,"ExistingDisk":null,"RawDevice":null,"StoragePod":null}}},"IsSourceThinProvisioned":true},{"SourceAddress":"[ZNest81 DS]:gui-test-vm-MULTIPLE_VOLUMES/gui-test-vm-MULTIPLE_VOLUMES_2.vmdk","TargetAddress":"ZNest81 DS","Swap":false,"ProvisionedSizeInMB":11,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"42 3d bc f4 86 a8 ea 82-2f af ff 14 36 76 31 5a","InstanceUuid":"50 3d ef b4 fb a9 72 a8-c0 0b c7 76 ef 1d 4c 10"},"UnitNumber":2,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:2)","VolumeIdentifier":"scsi:0:2"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"Datastore":{"TargetDatastore":{"InternalDatastoreName":"datastore-647","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"IsThin":true},"VCDDatastore":null,"ExistingDisk":null,"RawDevice":null,"StoragePod":null}}},"IsSourceThinProvisioned":true}],"NetworkInterfaces":[{"InternalIdentifier":{"Name":"Network adapter 1"},"SourceNetwork":{"VcenterNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"},"InternalType":"Network","InternalName":"network-648"},"DisplayName":"VM Network"},"VCDNetwork":null},"FailoverSettings":{"VCenterNetworkSettings":{"RecoveryNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"},"InternalType":"Network","InternalName":"network-648"},"DisplayName":"VM Network"},"IP":null,"DnsSuffix":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":null},"TestSettings":{"VCenterNetworkSettings":{"RecoveryNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"},"InternalType":"Network","InternalName":"network-648"},"DisplayName":"VM Network"},"IP":null,"DnsSuffix":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":null},"IsIPConfigurationEnabled":false,"MacAddress":"00:50:56:bd:c1:5a","vmId":{"InternalVmName":"vm-668","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"id":"vm-66800:50:56:bd:c1:5a","vmName":"gui-test-vm-MULTIPLE_VOLUMES","nicName":"Network adapter 1","ProtectedNetwork":"VM Network","FailoverIp":"","FailoverNetwork":"VM Network","TestNetwork":"VM Network","TestIP":"","isInMultiNicVM":false,"TargetHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-643","Type":0,"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.200.2"}}],"CloudVmSettings":null,"TargetFolder":{"Id":{"InternalFolderName":"group-v368","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DisplayName":"[Default]ZertoRecoveryFolder"},"StorageProfile":null,"JournalHardLimit":2048,"JournalWarningThreshold":2048,"JournalDatastores":[{"Id":{"InternalDatastoreName":"datastore-647","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81 DS"}],"id":"09d0d3b4-78d0-47c1-ad38-d01887e6d589vm-668","RecoveryHost":{"display":"TargetHost","value":{"DisplayName":"TargetHost"},"filterValue":"TargetHost"},"RecoveryHostName":"TargetHost","RecoveryDatastore":{"display":"TargetDatastore","value":{"DisplayName":"TargetDatastore"},"filterValue":"TargetDatastore"},"RecoveryDatastoreName":"TargetDatastore","JournalDatastoresObj":{"display":"ZNest81 DS","value":{"Id":{"InternalDatastoreName":"datastore-647","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81 DS"},"filterValue":"ZNest81 DS"},"JournalHardLimitObj":{"display":"Unlimited","value":2048},"JournalWarningThresholdObj":{"display":"Unlimited","value":2048}}]';

        expect(JSON.stringify(scope.selectedItems)).toEqual(e);
    });
});
