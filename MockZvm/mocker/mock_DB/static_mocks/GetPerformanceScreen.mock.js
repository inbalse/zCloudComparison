module.exports = function GetPerformanceScreen() {
    return {
        "State": {
            "IsBanned": false,
            "BannedReason": null,
            "RemoteConnectionStatus": {"NumPeers": 1, "NumConnectedPeers": 1},
            "IsGeneralFailoverEnabled": true,
            "IsGeneralFailoverTestEnabled": true,
            "IsGeneralMoveEnabled": true,
            "IsGeneralInsertCheckpointEnabled": true,
            "IsGeneralCreateVPGEnabled": true,
            "IsGeneralRemoteFailoverEnabled": false,
            "IsGeneralRemoteFailoverTestEnabled": false,
            "IsGeneralLocalFailoverEnabled": true,
            "IsGeneralLocalFailoverTestEnabled": true,
            "AreThereAnyVpgs": true,
            "CanAddVCDVapps": false,
            "CanAddVCDReplicationDestinations": false,
            "AlertStatus": 2,
            "AlertTips": {
                "Alerts": [{
                    "Description": "VRA on host hvp05.jhkelly.com is powered off.",
                    "SiteName": "Longview",
                    "AlertLevel": 1,
                    "StartTime": "2016-06-27T19:57:25.631Z"
                }, {
                    "Description": "Zerto Virtual Manager is not connected to VRA with IP 10.1.201.104 on host hvp04.jhkelly.com.",
                    "SiteName": "Longview",
                    "AlertLevel": 1,
                    "StartTime": "2016-06-27T19:55:14.923Z"
                }, {
                    "Description": "VRA on host hvp12.jhkelly.com is powered off.",
                    "SiteName": "Longview",
                    "AlertLevel": 0,
                    "StartTime": "2016-06-27T17:45:38.702Z"
                }], "HasMore": true, "TotalNumberOfAlerts": 5, "TotalNumberOfWarnings": 3, "TotalNumberOfErrors": 2
            },
            "IsManageSiteSettingsEnabled": true,
            "IsManageVraEnabled": true,
            "IsGeneralPauseEnabled": true,
            "IsGeneralResumeEnabled": false,
            "IsGeneralRestoreEnabled": false,
            "NumberOfRecentEvents": 10,
            "NumberOfVras": 6,
            "NumberOfStorages": 47,
            "NumberOfRepositories": 0,
            "IsSelfReplicationAllowed": false,
            "IsPairEnabled": true,
            "IsUnPairEnabled": true
        },
        "Details": {
            "SiteName": "Longview",
            "IpAddress": "10.1.1.51",
            "VCenterName": "Pending vCenter connection",
            "CurrentLocalTime": "13:16",
            "ContactInfo": "Eric Smith",
            "ContactEmail": "esmith@jhkelly.com",
            "ContactPhone": "360-575-3123",
            "ServerId": {"ServerGuid": "00000000-0000-0000-0000-000000000000"},
            "Location": "Longview, WA",
            "LicenseType": 1,
            "SiteVersion": "4.5",
            "BucketName": ""
        },
        "PotentialVpgs": [{
            "Identifier": {"GroupGuid": "f72bd262-b63b-46bc-8c62-7f514c7c3bec"},
            "Name": "Sharepoint"
        }, {
            "Identifier": {"GroupGuid": "1380228d-b97c-47cc-810d-6ba94fa553a3"},
            "Name": "SQL - VP-Img-KDoc-KNet"
        }, {
            "Identifier": {"GroupGuid": "931ff708-fb07-4b9f-8672-1f56480da102"},
            "Name": "SQL-Misc-Sys"
        }, {
            "Identifier": {"GroupGuid": "889e98a4-b1e4-4722-9cc3-01fc8732de08"},
            "Name": "HD_Systool_ToolTix_Radius_Crystal"
        }, {
            "Identifier": {"GroupGuid": "a8ecfb8b-a2c5-4ab1-a4da-9a6a7b29b6d6"},
            "Name": "LVKdocsFSP01"
        }, {
            "Identifier": {"GroupGuid": "c929e67a-a63c-4828-8ab5-a70d73a69925"},
            "Name": "LVKDWebP01-LVVPP01-LVImagingP01"
        }, {"Identifier": {"GroupGuid": "e7b1bc83-1b1d-4c78-a8d9-164ba589a861"}, "Name": "LVStorP01"}],
        "IncomingIOPS": {
            "Values": [{
                "Time": "2016-06-27T15:56:40.718Z",
                "VpgValues": [0, 0]
            }, {"Time": "2016-06-27T16:00:54.023Z", "VpgValues": [6, 64]}, {
                "Time": "2016-06-27T16:05:14.281Z",
                "VpgValues": [6, 69]
            }, {"Time": "2016-06-27T16:09:24.567Z", "VpgValues": [7, 70]}, {
                "Time": "2016-06-27T16:13:24.768Z",
                "VpgValues": [10, 62]
            }, {"Time": "2016-06-27T16:17:46.596Z", "VpgValues": [6, 106]}, {
                "Time": "2016-06-27T16:22:05.811Z",
                "VpgValues": [4, 63]
            }],
            "ValuesAsCsv": "Date,Value\r\n20160627 085640,0,0\r\n20160627 090054,6,64\r\n20160627 090514,6,69\r\n20160627 090924,7,70\r\n20160627 091324,10,62\r\n20160627 091746,6,106\r\n20160627 092205,4,63\r\n",
            "ProtectionGroupIdentifiers": [{"GroupGuid": "1380228d-b97c-47cc-810d-6ba94fa553a3"}, {"GroupGuid": "931ff708-fb07-4b9f-8672-1f56480da102"}],
            "ProtectionGroupNames": ["SQL - VP-Img-KDoc-KNet", "SQL-Misc-Sys"]
        },
        "IncomingThroughputInMb": {
            "Values": [{
                "Time": "2016-06-27T15:56:40.718Z",
                "VpgValues": [0, 0]
            }, {
                "Time": "2016-06-27T16:00:54.023Z",
                "VpgValues": [0.03466796875, 0.26025390625]
            }, {
                "Time": "2016-06-27T16:05:14.281Z",
                "VpgValues": [0.04150390625, 0.28125]
            }, {
                "Time": "2016-06-27T16:09:24.567Z",
                "VpgValues": [0.06005859375, 0.572265625]
            }, {
                "Time": "2016-06-27T16:13:24.768Z",
                "VpgValues": [0.06396484375, 0.275390625]
            }, {
                "Time": "2016-06-27T16:17:46.596Z",
                "VpgValues": [0.04443359375, 1.232421875]
            }, {"Time": "2016-06-27T16:22:05.811Z", "VpgValues": [0.03173828125, 0.52294921875]}],
            "ValuesAsCsv": "Date,Value\r\n20160627 085640,0,0\r\n20160627 090054,0.03466796875,0.26025390625\r\n20160627 090514,0.04150390625,0.28125\r\n20160627 090924,0.06005859375,0.572265625\r\n20160627 091324,0.06396484375,0.275390625\r\n20160627 091746,0.04443359375,1.232421875\r\n20160627 092205,0.03173828125,0.52294921875\r\n",
            "ProtectionGroupIdentifiers": [{"GroupGuid": "1380228d-b97c-47cc-810d-6ba94fa553a3"}, {"GroupGuid": "931ff708-fb07-4b9f-8672-1f56480da102"}],
            "ProtectionGroupNames": ["SQL - VP-Img-KDoc-KNet", "SQL-Misc-Sys"]
        },
        "OutgoingBandWidth": {
            "Values": [{
                "Time": "2016-06-27T15:56:40.718Z",
                "VpgValues": [0, 0]
            }, {
                "Time": "2016-06-27T16:00:54.023Z",
                "VpgValues": [0.03515625, 0.2626953125]
            }, {
                "Time": "2016-06-27T16:05:14.281Z",
                "VpgValues": [0.0419921875, 0.28369140625]
            }, {
                "Time": "2016-06-27T16:09:24.567Z",
                "VpgValues": [0.06103515625, 0.57470703125]
            }, {
                "Time": "2016-06-27T16:13:24.768Z",
                "VpgValues": [0.064453125, 0.27783203125]
            }, {"Time": "2016-06-27T16:17:46.596Z", "VpgValues": [0.044921875, 0]}, {
                "Time": "2016-06-27T16:22:05.811Z",
                "VpgValues": [0.0322265625, 3.3486328125]
            }],
            "ValuesAsCsv": "Date,Value\r\n20160627 085640,0,0\r\n20160627 090054,0.03515625,0.2626953125\r\n20160627 090514,0.0419921875,0.28369140625\r\n20160627 090924,0.06103515625,0.57470703125\r\n20160627 091324,0.064453125,0.27783203125\r\n20160627 091746,0.044921875,0\r\n20160627 092205,0.0322265625,3.3486328125\r\n",
            "ProtectionGroupIdentifiers": [{"GroupGuid": "1380228d-b97c-47cc-810d-6ba94fa553a3"}, {"GroupGuid": "931ff708-fb07-4b9f-8672-1f56480da102"}],
            "ProtectionGroupNames": ["SQL - VP-Img-KDoc-KNet", "SQL-Misc-Sys"]
        },
        "ActualRPOInSeconds": {
            "Values": [{
                "Time": "2016-06-27T15:56:40.718Z",
                "VpgValues": [-2147483648, -2147483648]
            }, {"Time": "2016-06-27T16:00:54.023Z", "VpgValues": [14, 14]}, {
                "Time": "2016-06-27T16:05:14.281Z",
                "VpgValues": [18, 8]
            }, {"Time": "2016-06-27T16:09:24.567Z", "VpgValues": [13, 13]}, {
                "Time": "2016-06-27T16:13:24.768Z",
                "VpgValues": [12, 12]
            }, {"Time": "2016-06-27T16:17:46.596Z", "VpgValues": [17, 143]}, {
                "Time": "2016-06-27T16:22:05.811Z",
                "VpgValues": [13, 13]
            }],
            "ValuesAsCsv": "Date,Value\r\n20160627 085640,-2147483648,-2147483648\r\n20160627 090054,14,14\r\n20160627 090514,18,8\r\n20160627 090924,13,13\r\n20160627 091324,12,12\r\n20160627 091746,17,143\r\n20160627 092205,13,13\r\n",
            "ProtectionGroupIdentifiers": [{"GroupGuid": "1380228d-b97c-47cc-810d-6ba94fa553a3"}, {"GroupGuid": "931ff708-fb07-4b9f-8672-1f56480da102"}],
            "ProtectionGroupNames": ["SQL - VP-Img-KDoc-KNet", "SQL-Misc-Sys"]
        }
    };
};

