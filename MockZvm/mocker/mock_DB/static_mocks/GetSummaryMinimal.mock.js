module.exports = function GetSummaryMinimal() {

    return {
        'TaskSummary': {
            'RunningTasksCount': 0, 'WaitingTasksCount': 1, 'LastCommandTask': {
                'CommandTaskRecordButtonsState': {
                    'IsFlrBrowseEnabled': false,
                    'IsFlrUnmountEnabled': false
                },
                'ProtectionGroupId': {'GroupGuid': 'fb039d0f-4b57-45fe-8c02-cc3ec5215f2a'},
                'VpgScreenState': {'ActiveProcesses': {'RunningFailOverTest': {'StopEnabled': true}}},
                'RelatedEntities': [
                    {'Name': 'VPG1', 'ProtectionGroupId': '4734783487', 'hostIdentifier': ''}
                ],
                'StateAndProgress': {'CurrentState': 2, 'Progress': 100},
                'TaskId': {'Identifier': '11111'},
                'TaskType': 4
            }
        },
        'SummaryState': {
            "IsBanned": false,
            "BannedReason": null,
            "RemoteConnectionStatus": {"NumPeers": 0, "NumConnectedPeers": 0},
            "IsGeneralFailoverEnabled": true,
            "IsGeneralFailoverTestEnabled": true,
            "IsGeneralMoveEnabled": true,
            "IsGeneralInsertCheckpointEnabled": true,
            "IsGeneralCreateVPGEnabled": true,
            "IsGeneralRemoteFailoverEnabled": false,
            "IsGeneralRemoteFailoverTestEnabled": false,
            "IsGeneralLocalFailoverEnabled": false,
            "IsGeneralLocalFailoverTestEnabled": false,
            "AreThereAnyVpgs": true,
            "CanAddVCDVapps": true,
            "CanAddVCDReplicationDestinations": false,
            "AlertStatus": 2,
            "AlertTips": {
                "Alerts": [{
                    "Description": "Failed extracting reflection for vApp https://172.20.205.24/api/vApp/vapp-f4907c7f-da7d-4c19-8d6f-ffb411834559, exception Vim Object Reference Not Found",
                    "SiteName": "gui_local_vcd",
                    "AlertLevel": 1,
                    "StartTime": "2015-08-17T09:16:55.156Z"
                }, {
                    "Description": "Host 172.20.205.5 has no VRA installed, and is part of cluster Cluster that contains hosts with installed VRAs.",
                    "SiteName": "gui_local_vcd",
                    "AlertLevel": 0,
                    "StartTime": "2015-08-17T09:16:55.156Z"
                }, {
                    "Description": "Host 172.20.205.5 has no VRA installed",
                    "SiteName": "gui_local_vcd",
                    "AlertLevel": 1,
                    "StartTime": "2015-09-17T09:13:23.156Z"
                }], "HasMore": false, "TotalNumberOfAlerts": 3, "TotalNumberOfWarnings": 2, "TotalNumberOfErrors": 1
            },
            "IsManageSiteSettingsEnabled": true,
            "IsManageVraEnabled": true,
            "IsGeneralPauseEnabled": false,
            "IsGeneralResumeEnabled": false,
            "IsGeneralRestoreEnabled": true,
            "NumberOfRecentEvents": 0,
            "NumberOfVras": 1,
            "NumberOfStorages": 3,
            "NumberOfRepositories": 0,
            "IsSelfReplicationAllowed": true
        },
        'SiteDetails': {
            "SiteName": "gui_local_vcd",
            "IpAddress": "10.10.0.124",
            "VCenterName": "ZNest83VC",
            "CurrentLocalTime": "12:20",
            "ContactInfo": "denis.gorunov",
            "ContactEmail": "denis.gorunov@zerto.com",
            "ContactPhone": "066-6666666",
            "ServerId": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"},
            "Location": "at Zerto",
            "LicenseType": 1,
            "SiteVersion": "4.0",
            "BucketName": ""
        }
    };
};
