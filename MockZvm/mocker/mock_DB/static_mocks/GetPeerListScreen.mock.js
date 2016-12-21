module.exports = function GetPeerListScreen() {
    return {
        "State": {
            "IsBanned": false,
            "BannedReason": null,
            "RemoteConnectionStatus": {"NumPeers": 1, "NumConnectedPeers": 1},
            "IsGeneralFailoverEnabled": false,
            "IsGeneralFailoverTestEnabled": false,
            "IsGeneralMoveEnabled": false,
            "IsGeneralInsertCheckpointEnabled": false,
            "IsGeneralCreateVPGEnabled": true,
            "IsGeneralRemoteFailoverEnabled": false,
            "IsGeneralRemoteFailoverTestEnabled": false,
            "IsGeneralLocalFailoverEnabled": false,
            "IsGeneralLocalFailoverTestEnabled": false,
            "AreThereAnyVpgs": false,
            "CanAddVCDVapps": true,
            "CanAddVCDReplicationDestinations": true,
            "AlertStatus": 2,
            "AlertTips": {
                "Alerts": [{
                    "Description": "Failed extracting reflection for vApp https://172.20.205.24/api/vApp/vapp-f4907c7f-da7d-4c19-8d6f-ffb411834559, exception Vim Object Reference Not Found",
                    "SiteName": "gui_local_vcd",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-11T04:46:39.136Z"
                }, {
                    "Description": "Host 172.20.205.7 has no VRA installed, and is part of cluster Cluster that contains hosts with installed VRAs.",
                    "SiteName": "gui_remote_vcd",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-11T05:02:40.356Z"
                }, {
                    "Description": "Host 172.20.205.5 has no VRA installed, and is part of cluster Cluster that contains hosts with installed VRAs.",
                    "SiteName": "gui_local_vcd",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-11T04:46:39.136Z"
                }], "HasMore": false, "TotalNumberOfAlerts": 3, "TotalNumberOfWarnings": 2, "TotalNumberOfErrors": 1
            },
            "IsManageSiteSettingsEnabled": true,
            "IsManageVraEnabled": true,
            "IsGeneralPauseEnabled": false,
            "IsGeneralResumeEnabled": false,
            "IsGeneralRestoreEnabled": false,
            "NumberOfRecentEvents": 1,
            "NumberOfVras": 1,
            "NumberOfStorages": 3,
            "NumberOfRepositories": 0
        },
        "SiteDetails": {
            "SiteName": "gui_local_vcd",
            "IpAddress": "10.10.0.76",
            "VCenterName": "ZNest83VC",
            "CurrentLocalTime": "08:02",
            "ContactInfo": "liron",
            "ContactEmail": "liron@zerto.com",
            "ContactPhone": "066-6666666",
            "ServerId": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
            "Location": "at Zerto",
            "LicenseType": 1,
            "SiteVersion": "4.0",
            "BucketName": ""
        },
        "PeerSites": [{
            "SiteName": "gui_remote_vcd",
            "CustomerName": "",
            "Location": "at Zerto",
            "OwnersId": {"OwnersGuid": "03166d06-be4c-4ecc-9c06-920bb34875d5"},
            "AlertStatus": 0,
            "NumberOfVpgs": 0,
            "ProvisionedStorageInMB": 0,
            "UsedStorageInMB": 0,
            "IOPS": 0,
            "IncomingThroughputInMB": 0,
            "OutgoingBandWidth": 0,
            "ProtectionLimitsUsage": {"VmsCount": 0, "StorageUsedInMB": 0},
            "SiteId": {"SiteGuid": "7610390a-ad08-4d5c-9a08-a28edf0af235"},
            "HostName": "127.0.0.1:9082",
            "ZertoVersion": {"Major": 4, "Minor": 0, "Update": 0, "Branch": "engineering", "Build": 999},
            "HasDisksToKeep": false
        },
            {
                "SiteName": "test",
                "CustomerName": "",
                "Location": "at Zerto",
                "OwnersId": {"OwnersGuid": "03166d06-be4c-4ecc-9c06-920bb34875d6"},
                "AlertStatus": 0,
                "NumberOfVpgs": 0,
                "ProvisionedStorageInMB": 0,
                "UsedStorageInMB": 0,
                "IOPS": 0,
                "IncomingThroughputInMB": 0,
                "OutgoingBandWidth": 0,
                "ProtectionLimitsUsage": {"VmsCount": 0, "StorageUsedInMB": 0},
                "SiteId": {"SiteGuid": "7610390a-ad08-4d5c-9a08-a28edf0af236"},
                "HostName": "127.0.0.1:9082",
                "ZertoVersion": {"Major": 4, "Minor": 0, "Update": 0, "Branch": "engineering", "Build": 999},
                "HasDisksToKeep": false
            }]
    };
};




