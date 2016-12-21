module.exports = function GetActivityScreenVisualObject() {
    return {
        "State": {
            "IsBanned": false,
            "BannedReason": null,
            "RemoteConnectionStatus": {"NumPeers": 0, "NumConnectedPeers": 0},
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
            "CanAddVCDVapps": false,
            "CanAddVCDReplicationDestinations": false,
            "AlertStatus": 2,
            "AlertTips": {
                "Alerts": [{
                    "Description": "The file restore component is not available.",
                    "SiteName": "Site 5",
                    "AlertLevel": 1,
                    "StartTime": "2016-11-16T09:08:20.359Z"
                }], "HasMore": false, "TotalNumberOfAlerts": 1, "TotalNumberOfWarnings": 0, "TotalNumberOfErrors": 1
            },
            "IsManageSiteSettingsEnabled": true,
            "IsManageVraEnabled": true,
            "IsGeneralPauseEnabled": false,
            "IsGeneralResumeEnabled": false,
            "IsGeneralRestoreEnabled": false,
            "NumberOfRecentEvents": 2,
            "NumberOfVras": 6,
            "NumberOfStorages": 11,
            "NumberOfRepositories": 0,
            "IsSelfReplicationAllowed": true,
            "IsPairEnabled": true,
            "IsUnPairEnabled": true
        },
        "Details": {
            "SiteName": "Site 5",
            "IpAddress": "172.20.123.201",
            "VCenterName": "Pending vCenter connection",
            "CurrentLocalTime": "12:54",
            "ContactInfo": "Unconfigured contact info",
            "ContactEmail": null,
            "ContactPhone": null,
            "ServerId": {"ServerGuid": "00000000-0000-0000-0000-000000000000"},
            "Location": "Unconfigured location",
            "LicenseType": 1,
            "SiteVersion": "5.0",
            "BucketName": ""
        },
        "Events": [{
            "EventIdentifier": {"EventGuid": "9c8f4d57-6059-4d0f-a393-a7f88a568ecd"},
            "TimeStamp": "2016-11-20T10:53:59.000Z",
            "EventType": "Login",
            "User": "\\System",
            "Description": "ZVM Login. Success. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [],
            "Entity": "Site",
            "HelpId": "EV0070",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": []
        }, {
            "EventIdentifier": {"EventGuid": "35033afa-924b-4a91-89a5-70c050030f81"},
            "TimeStamp": "2016-11-20T05:52:45.000Z",
            "EventType": "Login",
            "User": "\\System",
            "Description": "ZVM Login. Success. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [],
            "Entity": "Site",
            "HelpId": "EV0070",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": []
        }, {
            "EventIdentifier": {"EventGuid": "0b8f3d9c-fda0-4e0e-b938-3fb3f6c9b8d3"},
            "TimeStamp": "2016-11-17T05:54:12.000Z",
            "EventType": "Install VRA",
            "User": "Site 5\\Administrator",
            "Description": "VRA installation IP=172.20.123.95. Success. Completed successfully. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [{
                "ProtectionGroupIdentifier": null,
                "ProtectionGroupName": null,
                "ExistingVpg": false
            }],
            "Entity": "VRA",
            "HelpId": "EV0013",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": [{
                "HostId": {
                    "InternalHostName": "host-4319",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                }, "Name": "", "ProtectionGroupId": null, "SiteId": null, "FlrSessionIdentifier": null
            }]
        }, {
            "EventIdentifier": {"EventGuid": "c6ca623c-747d-40d5-a9a5-a15bd79dd4d9"},
            "TimeStamp": "2016-11-17T05:50:49.000Z",
            "EventType": "Login",
            "User": "\\System",
            "Description": "ZVM Login. Success. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [],
            "Entity": "Site",
            "HelpId": "EV0070",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": []
        }, {
            "EventIdentifier": {"EventGuid": "65881948-9778-4cf5-b858-6bfe84bc366f"},
            "TimeStamp": "2016-11-16T09:14:14.000Z",
            "EventType": "Install VRA",
            "User": "Site 5\\Administrator",
            "Description": "VRA installation IP=172.20.123.94. Success. Completed successfully. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [{
                "ProtectionGroupIdentifier": null,
                "ProtectionGroupName": null,
                "ExistingVpg": false
            }],
            "Entity": "VRA",
            "HelpId": "EV0013",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": [{
                "HostId": {
                    "InternalHostName": "host-4317",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                }, "Name": "", "ProtectionGroupId": null, "SiteId": null, "FlrSessionIdentifier": null
            }]
        }, {
            "EventIdentifier": {"EventGuid": "2bec5ec5-79fe-4687-8ff3-353714aac0c0"},
            "TimeStamp": "2016-11-16T09:14:03.000Z",
            "EventType": "Install VRA",
            "User": "Site 5\\Administrator",
            "Description": "VRA installation IP=172.20.123.93. Success. Completed successfully. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [{
                "ProtectionGroupIdentifier": null,
                "ProtectionGroupName": null,
                "ExistingVpg": false
            }],
            "Entity": "VRA",
            "HelpId": "EV0013",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": [{
                "HostId": {
                    "InternalHostName": "host-24",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                }, "Name": "", "ProtectionGroupId": null, "SiteId": null, "FlrSessionIdentifier": null
            }]
        }, {
            "EventIdentifier": {"EventGuid": "09bb912a-3965-4c51-96c5-2908fb0ebb45"},
            "TimeStamp": "2016-11-16T09:13:39.000Z",
            "EventType": "Install VRA",
            "User": "Site 5\\Administrator",
            "Description": "VRA installation IP=172.20.123.80. Success. Completed successfully. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [{
                "ProtectionGroupIdentifier": null,
                "ProtectionGroupName": null,
                "ExistingVpg": false
            }],
            "Entity": "VRA",
            "HelpId": "EV0013",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": [{
                "HostId": {
                    "InternalHostName": "host-23",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                }, "Name": "", "ProtectionGroupId": null, "SiteId": null, "FlrSessionIdentifier": null
            }]
        }, {
            "EventIdentifier": {"EventGuid": "3969651f-e3e5-47ad-97c8-369670675dab"},
            "TimeStamp": "2016-11-16T09:13:16.000Z",
            "EventType": "Install VRA",
            "User": "Site 5\\Administrator",
            "Description": "VRA installation IP=172.20.123.77. Success. Completed successfully. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [{
                "ProtectionGroupIdentifier": null,
                "ProtectionGroupName": null,
                "ExistingVpg": false
            }],
            "Entity": "VRA",
            "HelpId": "EV0013",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": [{
                "HostId": {
                    "InternalHostName": "host-11",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                }, "Name": "", "ProtectionGroupId": null, "SiteId": null, "FlrSessionIdentifier": null
            }]
        }, {
            "EventIdentifier": {"EventGuid": "335a0c37-1a38-4043-9c06-d52f3ebd64d5"},
            "TimeStamp": "2016-11-16T09:13:07.000Z",
            "EventType": "Install VRA",
            "User": "Site 5\\Administrator",
            "Description": "VRA installation IP=172.20.123.75. Success. Completed successfully. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [{
                "ProtectionGroupIdentifier": null,
                "ProtectionGroupName": null,
                "ExistingVpg": false
            }],
            "Entity": "VRA",
            "HelpId": "EV0013",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": [{
                "HostId": {
                    "InternalHostName": "host-10",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                }, "Name": "", "ProtectionGroupId": null, "SiteId": null, "FlrSessionIdentifier": null
            }]
        }, {
            "EventIdentifier": {"EventGuid": "d34a541b-ee05-4750-a297-1cd6effffe7d"},
            "TimeStamp": "2016-11-16T09:07:42.000Z",
            "EventType": "Login",
            "User": "\\System",
            "Description": "ZVM Login. Success. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [],
            "Entity": "Site",
            "HelpId": "EV0070",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": []
        }, {
            "EventIdentifier": {"EventGuid": "8fa573d4-b654-4b69-8066-fbfff5e44ea5"},
            "TimeStamp": "2016-11-16T09:07:40.000Z",
            "EventType": "Login",
            "User": "\\System",
            "Description": "ZVM Login. Success. ",
            "ProtectedSiteName": "Site 5",
            "ProtectionGroupVisualObjects": [],
            "Entity": "Site",
            "HelpId": "EV0070",
            "ZertoOrganizationName": "N/A",
            "Success": true,
            "EventRelatedEntities": []
        }],
        "BannedReason": null,
        "QueryCriteriasOptions": {
            "TimeRange": {"From": "2016-10-31T22:00:00.000Z", "To": "2016-11-21T10:54:46.935Z"},
            "EventGeneralTypes": {"EventGeneralType": 1},
            "EventTypes": ["Login", "Install VRA"],
            "VpgNames": [],
            "PeerSites": ["Site 5"],
            "Users": ["\\System", "Site 5\\Administrator"],
            "EventHelpIds": ["EV0070", "EV0013"],
            "Entities": ["Site", "VRA"],
            "MaxResult": 0,
            "RelatedEntities": []
        }
    };
};
