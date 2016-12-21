module.exports = function GetRecoveryComputeResource() {
    return {
        "Datastores": [{
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-10",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (1) (61.7GB free of 63.3GB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-11",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "IS6BL05 iSCSI DataStore (119GB free of 299GB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-755",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "IS6BL05 Limited DS (48.6GB free of 49.8GB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-2005",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "DatastoreClusterIdentifier": null,
                "DisplayName": "[Cluster BK1BL05]BK01BL05vol1 (46.6GB free of 49.8GB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-2006",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "DatastoreClusterIdentifier": null,
                "DisplayName": "[Cluster BK1BL05]BK01BL05vol2 (43.0GB free of 49.8GB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-2768",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "IS6BL05 DS 350 (200GB free of 349GB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-3221",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "3TB Datastore (3.00TB free of 3.00TB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": null,
                "DatastoreClusterIdentifier": {
                    "InternalName": "group-p2007",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "DisplayName": "Cluster BK1BL05"
            }, "IsEnabled": true
        }],
        "Networks": [{
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "Network",
                "InternalName": "network-65"
            }, "DisplayName": "Net149"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "Network",
                "InternalName": "network-12"
            }, "DisplayName": "VM Network"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-123"
            }, "DisplayName": "dvs.VCDVSOVDC-IntNet-2e84c891-c3fa-4b19-a329-82a332f8c7ac"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-126"
            }, "DisplayName": "dvs.VCDVSOVDC-IntNet-09c8f147-e78a-4c5d-a580-2e737578a55c"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-146"
            }, "DisplayName": "dvs.VCDVSVM Network-4c5080f1-2304-412a-8cb9-cd9fe5c0fc11"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-147"
            }, "DisplayName": "dvs.VCDVSVM Network-fe1f0619-b43d-47d3-af64-202f1ed2566f"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-152"
            }, "DisplayName": "dvs.VCDVSOVDC-IntNet-2cb0483c-cb58-4b9f-b978-f553635e8aae"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-20"
            }, "DisplayName": "dvPortGroup"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-287"
            }, "DisplayName": "dvs.VCDVSIsolated_Net-055f18b0-c676-471b-9024-9fc510af7c7b"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-296"
            }, "DisplayName": "dvs.VCDVSIsoalted_Net-c19c24ac-d055-494d-bd7b-a6ae892c288d"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-3220"
            }, "DisplayName": "iSCSI_DR"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-388"
            }, "DisplayName": "dvs.VCDVSVM Network-a31ec95e-72f2-4c88-9ab0-930c134572a1"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-389"
            }, "DisplayName": "dvs.VCDVSVM Network-69617685-378d-453e-b53d-791810ce1ae6"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-392"
            }, "DisplayName": "dvs.VCDVSVM Network-b0eb813c-f924-46fa-a408-1bd3f4ed975f"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-417"
            }, "DisplayName": "dvs.VCDVSVM Network-32d77029-e9a3-410c-808e-bc2cb4f02c6d"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-418"
            }, "DisplayName": "dvs.VCDVSVM Network-ba3b5010-bfb9-4b72-8777-3714c3d1e855"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-419"
            }, "DisplayName": "dvs.VCDVSVM Network-b179df3a-f17d-4606-89b6-fb6a39ffb628"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-464"
            }, "DisplayName": "dvs.VCDVSVM Network-bde4f57e-7e8e-4afb-925e-2637e48636f2"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-467"
            }, "DisplayName": "dvs.VCDVSVM Network-9798dc46-1fb8-48b9-8063-ebacdb1d8920"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-470"
            }, "DisplayName": "dvs.VCDVSOrgNet_Routed-8cce7c5f-b489-4ab1-8517-dd586e36553c"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-471"
            }, "DisplayName": "dvs.VCDVSOrgNet_Isolated-f3383743-cb81-4fcd-8b57-cc7309d0c258"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-473"
            }, "DisplayName": "dvs.VCDVSvAppNet1-b104af6e-d7c4-4820-a015-c35e8df6c5a0"
        }, {
            "Id": {
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"},
                "InternalType": "DistributedVirtualPortgroup",
                "InternalName": "dvportgroup-52"
            }, "DisplayName": "dvs.VCDVSOVDC-IntNet-41f3b51b-059e-4a0f-a6b1-d5eb61e21d00"
        }],
        "DescendantHosts": [],
        "PotentialFolders": [{
            "Id": {
                "InternalFolderName": "group-v13",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Discovered virtual machine"
        }, {
            "Id": {
                "InternalFolderName": "group-v46",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Idan-vCD-NEW"
        }, {
            "Id": {
                "InternalFolderName": "group-v317",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "DR_CustA_Cloud2 (edd7b870-f0e0-44e9-a018-23c5d0eefabe)"
        }, {
            "Id": {
                "InternalFolderName": "group-v318",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "DR_CustA_Cloud2_OVDC1 (2129c158-aaf9-4b90-8094-4ce3b29da635)"
        }, {
            "Id": {
                "InternalFolderName": "group-v321",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "DR_CustA_Cloud2_OVDC2 (b4d08156-8014-4868-aeda-689cd9811460)"
        }, {
            "Id": {
                "InternalFolderName": "group-v326",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "DR_CustB_Cloud2 (f4be67b0-499d-4b53-ae15-1f5caf84f54b)"
        }, {
            "Id": {
                "InternalFolderName": "group-v327",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "DR_CustB_Cloud2_OVDC1 (365ee90a-6fb7-4417-b718-393e71a18beb)"
        }, {
            "Id": {
                "InternalFolderName": "group-v330",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "DR_CustB_Cloud2_OVDC2 (478df018-c0ad-43b1-8b64-34a97c6df310)"
        }, {
            "Id": {
                "InternalFolderName": "group-v309",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Hosting_Cloud2 (55cdcfd3-eccf-4418-bf61-8667763d4302)"
        }, {
            "Id": {
                "InternalFolderName": "group-v310",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Hosting_Cloud2_OVDC1 (48d31475-f738-4214-be17-e64f4515ad7d)"
        }, {
            "Id": {
                "InternalFolderName": "group-v482",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Hosting_40MB_Cloud2 (00e7952f-ad26-4b23-98be-5938565ec37a)"
        }, {
            "Id": {
                "InternalFolderName": "group-v468",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Win1_Cloud2 (c0fa0a7d-665f-4dfe-81d6-0a20e123354e)"
        }, {
            "Id": {
                "InternalFolderName": "group-v313",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Hosting_Cloud2_OVDC2 (da160d2c-d661-44d7-80b1-9c58cb88a5d9)"
        }, {
            "Id": {
                "InternalFolderName": "group-v447",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d0 (b214368f-e563-4393-8615-7bec9459effc)"
        }, {
            "Id": {
                "InternalFolderName": "group-v420",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d1 (b54cd28d-1cd2-4f4a-a518-f0b843c427ec)"
        }, {
            "Id": {
                "InternalFolderName": "group-v355",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d10 (cce9bfec-cbb4-4545-b3b5-92b247d251ee)"
        }, {
            "Id": {
                "InternalFolderName": "group-v450",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d11 (918ccf75-6959-4db7-baae-0aa8307e2f36)"
        }, {
            "Id": {
                "InternalFolderName": "group-v453",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d12 (87b77a06-590f-4330-88f3-6fdf3ab9dbc9)"
        }, {
            "Id": {
                "InternalFolderName": "group-v426",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d13 (c8408a8a-4589-41cf-96a1-dcfec7f19ad7)"
        }, {
            "Id": {
                "InternalFolderName": "group-v352",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d14 (8ce1acb2-bf0f-40b3-8be8-6e0b9fa2af40)"
        }, {
            "Id": {
                "InternalFolderName": "group-v456",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d15 (0b87ff5c-ca60-4313-85f3-1d4a2c08b757)"
        }, {
            "Id": {
                "InternalFolderName": "group-v459",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d16 (0565a07b-5a9a-4f1e-958a-5d08cd19b8b3)"
        }, {
            "Id": {
                "InternalFolderName": "group-v400",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d17 (e409a873-7185-40cb-a5e1-6a42267264fa)"
        }, {
            "Id": {
                "InternalFolderName": "group-v349",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d18 (7cd0d3bc-3b67-4226-848a-7a90f367bd6c)"
        }, {
            "Id": {
                "InternalFolderName": "group-v339",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d19 (94c7b22b-e862-4aa4-b66d-f1822e821024)"
        }, {
            "Id": {
                "InternalFolderName": "group-v434",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d2 (46503c13-247e-49b8-bfb1-d0e4b6721313)"
        }, {
            "Id": {
                "InternalFolderName": "group-v371",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d20 (617ed8f8-772b-44dc-a8a1-f1c3ec0b9f16)"
        }, {
            "Id": {
                "InternalFolderName": "group-v437",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d21 (7bae71c5-d599-458f-952f-21b924040dd9)"
        }, {
            "Id": {
                "InternalFolderName": "group-v439",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d22 (3cc983a4-27d1-4291-944e-53925c0675b0)"
        }, {
            "Id": {
                "InternalFolderName": "group-v346",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d23 (8ccfd1c0-bcf1-4916-b79c-a690fa131403)"
        }, {
            "Id": {
                "InternalFolderName": "group-v351",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d24 (b22e2aac-8275-450b-b349-98601c776231)"
        }, {
            "Id": {
                "InternalFolderName": "group-v344",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d25 (1614c45b-e8b5-4685-834b-3008c7cdb855)"
        }, {
            "Id": {
                "InternalFolderName": "group-v338",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d26 (c4aec8b5-b6db-4e3a-9fb0-2ca5e7f8b9bc)"
        }, {
            "Id": {
                "InternalFolderName": "group-v361",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d3 (2f9d50fb-0be9-4978-b828-f9f884e47226)"
        }, {
            "Id": {
                "InternalFolderName": "group-v354",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d4 (659dece4-beac-478f-8ea1-6165e6c11a82)"
        }, {
            "Id": {
                "InternalFolderName": "group-v409",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d5 (4d9fa1a8-1b03-4eef-9fda-a537e81dd253)"
        }, {
            "Id": {
                "InternalFolderName": "group-v462",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d6 (6e1cc9f9-aa06-4993-a5d9-fcc66b4f4f47)"
        }, {
            "Id": {
                "InternalFolderName": "group-v342",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d7 (baf9937a-5e80-4340-afdc-b357e47a1177)"
        }, {
            "Id": {
                "InternalFolderName": "group-v399",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d8 (1c33d644-aa31-4ad1-a3ae-893ecfa94a23)"
        }, {
            "Id": {
                "InternalFolderName": "group-v465",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "d9 (53620a59-680c-4669-8e6f-8e9d7d22b62e)"
        }, {
            "Id": {
                "InternalFolderName": "group-v47",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Org (1824f5d2-7c15-4235-b8a2-246e291197f2)"
        }, {
            "Id": {
                "InternalFolderName": "group-v48",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "OVDC (f51ed879-e21f-40b5-afe8-281289357f4e)"
        }, {
            "Id": {
                "InternalFolderName": "group-v257",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Cloud2_Win1 (467838a7-4f51-40bd-ab4f-3534370ee13b)"
        }, {
            "Id": {
                "InternalFolderName": "group-v259",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Cloud2_Win2 (ecca46db-807a-42cb-b30b-8ac761176111)"
        }, {
            "Id": {
                "InternalFolderName": "group-v178",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "smalldebian1 (bf21bf23-0b32-4d12-8d1d-55c9aeef636d)"
        }, {
            "Id": {
                "InternalFolderName": "group-v92",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "OVDC_new (311f6111-fa23-424b-9e53-b5bfdc2b16b9)"
        }, {
            "Id": {
                "InternalFolderName": "group-v62",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Org2 (3c324878-3af2-42a5-a60d-bccd36cbeb76)"
        }, {
            "Id": {
                "InternalFolderName": "group-v63",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "OVDC2 (45fc2785-6307-4d48-81f1-0ae160fa88b9)"
        }, {
            "Id": {
                "InternalFolderName": "group-v221",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "40MB_1 (f8bc97ce-6163-471e-9ca7-60bee73a2edd)"
        }, {
            "Id": {
                "InternalFolderName": "group-v243",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "40MB_2 (0b025c83-210b-4000-b662-c14d41dd8430)"
        }, {
            "Id": {
                "InternalFolderName": "group-v225",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "40MB_3 (69d9825e-76ff-416f-8614-351a6fd35c66)"
        }, {
            "Id": {
                "InternalFolderName": "group-v262",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Org2_Win1 (6f100e5f-9401-4fc0-b2dc-d26bacdb64cb)"
        }, {
            "Id": {
                "InternalFolderName": "group-v80",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Org3-Empty (0f217f76-5ef7-41ef-8855-dcb0a2fd138b)"
        }, {
            "Id": {
                "InternalFolderName": "group-v81",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "OVDC3 (fe4c36ca-d760-4773-ba4b-3586d84cefa8)"
        }, {
            "Id": {
                "InternalFolderName": "group-v300",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "DR: B->2 (29f50da6-ceeb-4c0d-affc-ffae71561fd7)"
        }, {
            "Id": {
                "InternalFolderName": "group-v83",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "OVDC3.1 (12d6de54-db60-4a66-86a8-6c9cd38d88af)"
        }, {
            "Id": {
                "InternalFolderName": "group-v49",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Service VMs"
        }, {
            "Id": {
                "InternalFolderName": "group-v69",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "[Default]ZertoRecoveryFolder"
        }, {
            "Id": {
                "InternalFolderName": "group-v335",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_DR_CustA_1e7df8e9-800e-4be9-83d0-7207cd161880"
        }, {
            "Id": {
                "InternalFolderName": "group-v282",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_DR_CustA_2e050dc4-7962-4008-a23b-8c2e40a9127b"
        }, {
            "Id": {
                "InternalFolderName": "group-v217",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_DR_CustA_d8273871-7bd4-4dfc-ab0d-b62232cab9e6"
        }, {
            "Id": {
                "InternalFolderName": "group-v253",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_DR_CustB_bd13dafe-64f6-4e3f-9b6f-2eda8f048caa"
        }, {
            "Id": {
                "InternalFolderName": "group-v283",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_DR_CustB_ce5076f2-292e-4f9d-9538-61075582c289"
        }, {
            "Id": {
                "InternalFolderName": "group-v219",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Hosting_0bcb3271-4923-4642-93c7-8199d8a99e80"
        }, {
            "Id": {
                "InternalFolderName": "group-v281",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Hosting_3fbe4d55-eb3b-4030-bf98-2006049fb4a8"
        }, {
            "Id": {
                "InternalFolderName": "group-v340",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Hosting_4df7b318-574c-4ad4-8d65-d8f5d4794325"
        }, {
            "Id": {
                "InternalFolderName": "group-v169",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Hosting_90c470b4-7470-4584-8e1e-7372876aedc7"
        }, {
            "Id": {
                "InternalFolderName": "group-v2723",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Hosting_Enterprise_e01312b7-ee89-497e-a41c-c9c80dc76de7"
        }, {
            "Id": {
                "InternalFolderName": "group-v480",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Hosting_ce78c0c5-d598-45e3-a275-e32a10c6fb42"
        }, {
            "Id": {
                "InternalFolderName": "group-v119",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Hosting_f2a15e7f-45cb-4aa7-ab0d-af00dff61ccc"
        }, {
            "Id": {
                "InternalFolderName": "group-v94",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Zorg1_9e81659c-b8ba-4b26-b065-fcc0a7f813b1"
        }, {
            "Id": {
                "InternalFolderName": "group-v73",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "Zerto_Zorg2_448788c3-c10d-42c8-9c96-3c016cfc41c8"
        }, {
            "Id": {
                "InternalFolderName": "group-v3",
                "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
            }, "DisplayName": "/"
        }],
        "AssociatedRawDevices": [{
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a25197770fe6a26250e4c3ddf21",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 5253120,
                "SizeInBytes": 5379194880,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a25197770fe6a26250e4c3ddf21",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a25197770fe6a26250e4c3ddf21",
                "Mode": 1
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a25197770fe6a26250e4c3ddf21) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a25197770fe6a26250e4c3ddf21",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 5253120,
                "SizeInBytes": 5379194880,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a25197770fe6a26250e4c3ddf21",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a25197770fe6a26250e4c3ddf21",
                "Mode": 2
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a25197770fe6a26250e4c3ddf21) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.6005076d0281022618000000000000ee",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 3221225472,
                "SizeInBytes": 3298534883328,
                "DeviceName": "/vmfs/devices/disks/naa.6005076d0281022618000000000000ee",
                "DevicePath": "/vmfs/devices/disks/naa.6005076d0281022618000000000000ee",
                "Mode": 2
            }, "DisplayName": "IBM iSCSI Disk (naa.6005076d0281022618000000000000ee) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a251977a0738c2825114c3dbf26",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 52439040,
                "SizeInBytes": 53697576960,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a251977a0738c2825114c3dbf26",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a251977a0738c2825114c3dbf26",
                "Mode": 1
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a251977a0738c2825114c3dbf26) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a251977a0738c2825114c3dbf26",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 52439040,
                "SizeInBytes": 53697576960,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a251977a0738c2825114c3dbf26",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a251977a0738c2825114c3dbf26",
                "Mode": 2
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a251977a0738c2825114c3dbf26) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.600601605c902e008c6f47d8ff36e311",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 52428800,
                "SizeInBytes": 53687091200,
                "DeviceName": "/vmfs/devices/disks/naa.600601605c902e008c6f47d8ff36e311",
                "DevicePath": "/vmfs/devices/disks/naa.600601605c902e008c6f47d8ff36e311",
                "Mode": 1
            }, "DisplayName": "DGC iSCSI Disk (naa.600601605c902e008c6f47d8ff36e311) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.600601605c902e008c6f47d8ff36e311",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 52428800,
                "SizeInBytes": 53687091200,
                "DeviceName": "/vmfs/devices/disks/naa.600601605c902e008c6f47d8ff36e311",
                "DevicePath": "/vmfs/devices/disks/naa.600601605c902e008c6f47d8ff36e311",
                "Mode": 2
            }, "DisplayName": "DGC iSCSI Disk (naa.600601605c902e008c6f47d8ff36e311) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a251977c0a3221a05fe4b3d2fa8",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 314572800,
                "SizeInBytes": 322122547200,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a251977c0a3221a05fe4b3d2fa8",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a251977c0a3221a05fe4b3d2fa8",
                "Mode": 1
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a251977c0a3221a05fe4b3d2fa8) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a251977c0a3221a05fe4b3d2fa8",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 314572800,
                "SizeInBytes": 322122547200,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a251977c0a3221a05fe4b3d2fa8",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a251977c0a3221a05fe4b3d2fa8",
                "Mode": 2
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a251977c0a3221a05fe4b3d2fa8) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "mpx.vmhba0:C0:T0:L0",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 71652960,
                "SizeInBytes": 73372631040,
                "DeviceName": "/vmfs/devices/disks/mpx.vmhba0:C0:T0:L0",
                "DevicePath": "/vmfs/devices/disks/mpx.vmhba0:C0:T0:L0",
                "Mode": 1
            }, "DisplayName": "Local VMware Disk (mpx.vmhba0:C0:T0:L0) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "mpx.vmhba0:C0:T0:L0",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 71652960,
                "SizeInBytes": 73372631040,
                "DeviceName": "/vmfs/devices/disks/mpx.vmhba0:C0:T0:L0",
                "DevicePath": "/vmfs/devices/disks/mpx.vmhba0:C0:T0:L0",
                "Mode": 2
            }, "DisplayName": "Local VMware Disk (mpx.vmhba0:C0:T0:L0) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.600601605c902e00ec52754e3b13e411",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 367001600,
                "SizeInBytes": 375809638400,
                "DeviceName": "/vmfs/devices/disks/naa.600601605c902e00ec52754e3b13e411",
                "DevicePath": "/vmfs/devices/disks/naa.600601605c902e00ec52754e3b13e411",
                "Mode": 1
            }, "DisplayName": "DGC iSCSI Disk (naa.600601605c902e00ec52754e3b13e411) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.600601605c902e00ec52754e3b13e411",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 367001600,
                "SizeInBytes": 375809638400,
                "DeviceName": "/vmfs/devices/disks/naa.600601605c902e00ec52754e3b13e411",
                "DevicePath": "/vmfs/devices/disks/naa.600601605c902e00ec52754e3b13e411",
                "Mode": 2
            }, "DisplayName": "DGC iSCSI Disk (naa.600601605c902e00ec52754e3b13e411) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.600601605c902e00aa088d4509a5e311",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 1048576,
                "SizeInBytes": 1073741824,
                "DeviceName": "/vmfs/devices/disks/naa.600601605c902e00aa088d4509a5e311",
                "DevicePath": "/vmfs/devices/disks/naa.600601605c902e00aa088d4509a5e311",
                "Mode": 1
            }, "DisplayName": "DGC iSCSI Disk (naa.600601605c902e00aa088d4509a5e311) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.600601605c902e00aa088d4509a5e311",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 1048576,
                "SizeInBytes": 1073741824,
                "DeviceName": "/vmfs/devices/disks/naa.600601605c902e00aa088d4509a5e311",
                "DevicePath": "/vmfs/devices/disks/naa.600601605c902e00aa088d4509a5e311",
                "Mode": 2
            }, "DisplayName": "DGC iSCSI Disk (naa.600601605c902e00aa088d4509a5e311) - physical", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a251977e0748c2855114c3d7f86",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 52439040,
                "SizeInBytes": 53697576960,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a251977e0748c2855114c3d7f86",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a251977e0748c2855114c3d7f86",
                "Mode": 1
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a251977e0748c2855114c3d7f86) - virtual", "IsEnabled": true
        }, {
            "Destination": {
                "Device": {
                    "InternalDeviceName": "naa.64ed2a251977e0748c2855114c3d7f86",
                    "ServerIdentifier": {"ServerGuid": "c7a99c33-3bad-467b-8405-fbf8fd361d9e"}
                },
                "SizeInKb": 52439040,
                "SizeInBytes": 53697576960,
                "DeviceName": "/vmfs/devices/disks/naa.64ed2a251977e0748c2855114c3d7f86",
                "DevicePath": "/vmfs/devices/disks/naa.64ed2a251977e0748c2855114c3d7f86",
                "Mode": 2
            }, "DisplayName": "EQLOGIC iSCSI Disk (naa.64ed2a251977e0748c2855114c3d7f86) - physical", "IsEnabled": true
        }]
    }
};
