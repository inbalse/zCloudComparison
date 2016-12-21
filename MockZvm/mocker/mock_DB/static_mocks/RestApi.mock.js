'use strict';

module.exports = () => {
    return [
        {
            '/v1/vms': [{
                "ActualRPO": 6,
                "Entities": {"Protected": 0, "Recovery": 0, "Source": 0, "Target": 0},
                "IOPs": 0,
                "LastTest": null,
                "Link": {
                    "href": "https://10.10.1.30:9669/v1/vms/6ec256a9-033c-4cda-897d-5eb700317b17.vm-162?VpgIdentifier=9723ac14-d672-4d0b-aff5-559b8f84b6ea",
                    "identifier": "6ec256a9-033c-4cda-897d-5eb700317b17.vm-162?VpgIdentifier=9723ac14-d672-4d0b-aff5-559b8f84b6ea",
                    "rel": null,
                    "type": "VmApi"
                },
                "Link_{0}": {
                    "href": "https://10.10.1.30:9669/v1/vms/6ec256a9-033c-4cda-897d-5eb700317b17.vm-162?VpgIdentifier=9723ac14-d672-4d0b-aff5-559b8f84b6ea",
                    "rel": "self",
                    "type": "VmApi"
                },
                "OrganizationName": "",
                "Priority": 1,
                "ProtectedSite": {
                    "href": "https://10.10.1.30:9669/v1/localsite",
                    "identifier": "1b360088-7481-4e21-a439-ec38d1d46747",
                    "rel": null,
                    "type": "LocalSiteApi"
                },
                "ProvisionedStorageInMB": 2180,
                "RecoverySite": {
                    "href": "https://10.10.1.30:9669/v1/localsite",
                    "identifier": "1b360088-7481-4e21-a439-ec38d1d46747",
                    "rel": null,
                    "type": "LocalSiteApi"
                },
                "SourceSite": "gui_local_vcd at Zerto",
                "Status": 1,
                "SubStatus": 0,
                "TargetSite": "gui_local_vcd at Zerto",
                "ThroughputInMB": 0,
                "UsedStorageInMB": 2174,
                "VmIdentifier": "6ec256a9-033c-4cda-897d-5eb700317b17.vm-162",
                "VmName": "vcd-local-3discs-3nics(1)",
                "Volumes": [{"VmVolumeIdentifier": "scsi:0:0"}, {"VmVolumeIdentifier": "scsi:0:1"}, {"VmVolumeIdentifier": "scsi:0:2"}],
                "VpgName": "vpg",
                "EnabledActions": {"IsFlrEnabled": true},
                "VpgIdentifier": "9723ac14-d672-4d0b-aff5-559b8f84b6ea"
            }]
        },
        {
            '/v1/vpgs/9723ac14-d672-4d0b-aff5-559b8f84b6ea/checkpoints/stats': {
                "Earliest": {
                    "CheckpointIdentifier": "1",
                    "Tag": null,
                    "TimeStamp": "/Date(1479726853000)/",
                    "Vss": false
                },
                "Latest": {
                    "CheckpointIdentifier": "29",
                    "Tag": null,
                    "TimeStamp": "/Date(1479726993000)/",
                    "Vss": false
                }
            }
        },
        {
            '/v1/vpgs/9723ac14-d672-4d0b-aff5-559b8f84b6ea/checkpoints?startDate=2016-11-20T22%3A00%3A00.000Z&endDate=2016-11-21T21%3A59%3A59.999Z': [{
                "CheckpointIdentifier": "1",
                "Tag": null,
                "TimeStamp": "/Date(1479726853000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "2",
                "Tag": null,
                "TimeStamp": "/Date(1479726858000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "3",
                "Tag": null,
                "TimeStamp": "/Date(1479726863000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "4",
                "Tag": null,
                "TimeStamp": "/Date(1479726868000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "5",
                "Tag": null,
                "TimeStamp": "/Date(1479726873000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "6",
                "Tag": null,
                "TimeStamp": "/Date(1479726878000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "7",
                "Tag": null,
                "TimeStamp": "/Date(1479726883000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "8",
                "Tag": null,
                "TimeStamp": "/Date(1479726888000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "9",
                "Tag": null,
                "TimeStamp": "/Date(1479726893000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "10",
                "Tag": null,
                "TimeStamp": "/Date(1479726898000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "11",
                "Tag": null,
                "TimeStamp": "/Date(1479726903000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "12",
                "Tag": null,
                "TimeStamp": "/Date(1479726908000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "13",
                "Tag": null,
                "TimeStamp": "/Date(1479726913000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "14",
                "Tag": null,
                "TimeStamp": "/Date(1479726918000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "15",
                "Tag": null,
                "TimeStamp": "/Date(1479726923000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "16",
                "Tag": null,
                "TimeStamp": "/Date(1479726928000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "17",
                "Tag": null,
                "TimeStamp": "/Date(1479726933000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "18",
                "Tag": null,
                "TimeStamp": "/Date(1479726938000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "19",
                "Tag": null,
                "TimeStamp": "/Date(1479726943000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "20",
                "Tag": null,
                "TimeStamp": "/Date(1479726948000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "21",
                "Tag": null,
                "TimeStamp": "/Date(1479726953000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "22",
                "Tag": null,
                "TimeStamp": "/Date(1479726958000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "23",
                "Tag": null,
                "TimeStamp": "/Date(1479726963000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "24",
                "Tag": null,
                "TimeStamp": "/Date(1479726968000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "25",
                "Tag": null,
                "TimeStamp": "/Date(1479726973000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "26",
                "Tag": null,
                "TimeStamp": "/Date(1479726978000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "27",
                "Tag": null,
                "TimeStamp": "/Date(1479726983000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "28",
                "Tag": null,
                "TimeStamp": "/Date(1479726988000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "29",
                "Tag": null,
                "TimeStamp": "/Date(1479726993000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "30",
                "Tag": null,
                "TimeStamp": "/Date(1479726998000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "31",
                "Tag": null,
                "TimeStamp": "/Date(1479727004000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "32",
                "Tag": null,
                "TimeStamp": "/Date(1479727009000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "33",
                "Tag": null,
                "TimeStamp": "/Date(1479727014000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "34",
                "Tag": null,
                "TimeStamp": "/Date(1479727019000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "35",
                "Tag": null,
                "TimeStamp": "/Date(1479727024000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "36",
                "Tag": null,
                "TimeStamp": "/Date(1479727029000)/",
                "Vss": false
            }, {
                "CheckpointIdentifier": "37",
                "Tag": null,
                "TimeStamp": "/Date(1479727034000)/",
                "Vss": false
            }, {"CheckpointIdentifier": "38", "Tag": null, "TimeStamp": "/Date(1479727039000)/", "Vss": false}]
        },
        {'/v1/flrsessions/mount': 'f9eb7616-f453-409c-8768-8447989f79a7.1b360088-7481-4e21-a439-ec38d1d46747'},
        {
            '/v1/flrsessions?sessionId=f9eb7616-f453-409c-8768-8447989f79a7.1b360088-7481-4e21-a439-ec38d1d46747': [{
                "CheckPointId": 38,
                "FlrSesisonId": "f9eb7616-f453-409c-8768-8447989f79a7.1b360088-7481-4e21-a439-ec38d1d46747",
                "FlrSessionStatus": "MountReady",
                "VmId": "6ec256a9-033c-4cda-897d-5eb700317b17.vm-162",
                "VolumeId": "Scsi:0:0"
            }]
        },
        {
            '/v1/vms/6ec256a9-033c-4cda-897d-5eb700317b17.vm-162?VpgIdentifier=9723ac14-d672-4d0b-aff5-559b8f84b6ea': {
                "ActualRPO": 6,
                "Entities": {"Protected": 0, "Recovery": 0, "Source": 0, "Target": 0},
                "IOPs": 0,
                "LastTest": null,
                "Link": {
                    "href": "https://10.10.1.30:9669/v1/vms/6ec256a9-033c-4cda-897d-5eb700317b17.vm-162?VpgIdentifier=9723ac14-d672-4d0b-aff5-559b8f84b6ea",
                    "identifier": "6ec256a9-033c-4cda-897d-5eb700317b17.vm-162?VpgIdentifier=9723ac14-d672-4d0b-aff5-559b8f84b6ea",
                    "rel": null,
                    "type": "VmApi"
                },
                "Link_{0}": {
                    "href": "https://10.10.1.30:9669/v1/vms/6ec256a9-033c-4cda-897d-5eb700317b17.vm-162?VpgIdentifier=9723ac14-d672-4d0b-aff5-559b8f84b6ea",
                    "rel": "self",
                    "type": "VmApi"
                },
                "OrganizationName": "",
                "Priority": 1,
                "ProtectedSite": {
                    "href": "https://10.10.1.30:9669/v1/localsite",
                    "identifier": "1b360088-7481-4e21-a439-ec38d1d46747",
                    "rel": null,
                    "type": "LocalSiteApi"
                },
                "ProvisionedStorageInMB": 2180,
                "RecoverySite": {
                    "href": "https://10.10.1.30:9669/v1/localsite",
                    "identifier": "1b360088-7481-4e21-a439-ec38d1d46747",
                    "rel": null,
                    "type": "LocalSiteApi"
                },
                "SourceSite": "gui_local_vcd at Zerto",
                "Status": 1,
                "SubStatus": 0,
                "TargetSite": "gui_local_vcd at Zerto",
                "ThroughputInMB": 0,
                "UsedStorageInMB": 2174,
                "VmIdentifier": "6ec256a9-033c-4cda-897d-5eb700317b17.vm-162",
                "VmName": "vcd-local-3discs-3nics(1)",
                "Volumes": [{"VmVolumeIdentifier": "scsi:0:0"}, {"VmVolumeIdentifier": "scsi:0:1"}, {"VmVolumeIdentifier": "scsi:0:2"}],
                "VpgName": "vpg",
                "EnabledActions": {"IsFlrEnabled": true},
                "VpgIdentifier": "9723ac14-d672-4d0b-aff5-559b8f84b6ea"
            }
        },
        {
            '/v1/vpgs/9723ac14-d672-4d0b-aff5-559b8f84b6ea/checkpoints/38': {
                "CheckpointIdentifier": "38",
                "Tag": null,
                "TimeStamp": "/Date(1479727039000)/",
                "Vss": false
            }
        },
        {
            '/v1/flrsessions/f9eb7616-f453-409c-8768-8447989f79a7.1b360088-7481-4e21-a439-ec38d1d46747/': {
                "FullPath": "/",
                "PathItems": [{
                    "CreationTime": "/Date(1479727119289)/",
                    "FileSize": 0,
                    "FullPath": "",
                    "IsFolder": true,
                    "IsReadOnly": false,
                    "LastAccessTime": "/Date(1479727119325)/",
                    "LastWriteTime": "/Date(1479727119325)/"
                }, {
                    "CreationTime": "/Date(1479727119325)/",
                    "FileSize": 0,
                    "FullPath": "\\Volume1",
                    "IsFolder": true,
                    "IsReadOnly": false,
                    "LastAccessTime": "/Date(1479727119325)/",
                    "LastWriteTime": "/Date(1479727119325)/"
                }]
            }
        },
        {'/v1/flrsessions/f9eb7616-f453-409c-8768-8447989f79a7.1b360088-7481-4e21-a439-ec38d1d46747/Download': 'v1/downloads/1b360088-7481-4e21-a439-ec38d1d46747.e88f9705-c11e-4380-bba2-df35acd06bcd'},
        {'/v1/flrsessions/f9eb7616-f453-409c-8768-8447989f79a7.1b360088-7481-4e21-a439-ec38d1d46747/unmount': ''},

        {
            '/v1/vpgs/eb30aeec-7b79-48f2-b088-e16d08b642f7/CheckpointVms?checkpointIdentifier=480': [{
                "Link_{0}": {
                    "href": "https://10.10.1.30:9669/v1/vms/6ec256a9-033c-4cda-897d-5eb700317b17.vm-162",
                    "rel": "self",
                    "type": "VmApi"
                }, "VmIdentifier": "6ec256a9-033c-4cda-897d-5eb700317b17.vm-162", "VmName": "vcd-local-3discs-3nics(1)"
            }]
        }
    ]
};