'use strict';

const helper = require('../../helper')();

module.exports = function GetSummaryScreenInformation() {
    let result = {};

    result.LocalSiteInfo = {
        "Details": {
            "SiteName": "Site C - Cancun",
            "IpAddress": "172.20.240.45",
            "VCenterName": "ZNest106VC.zertolab.local",
            "CurrentLocalTime": "09:30",
            "ContactInfo": "ZertoTrial",
            "ContactEmail": "Unconfigured contact email",
            "ContactPhone": "Unconfigured contact phone",
            "ServerId": {
                "ServerGuid": "c1371e3a-bd60-4de7-b67f-bfa5731def6c"
            },
            "Location": "ZNEST106ZVM",
            "LicenseType": 1,
            "BucketName": ""
        },
        "RemoteInboudStorageInMB": 0,
        "HostsInfo": {
            "NumberOfHosts": 3,
            "NumberOfInstalledHosts": 3
        },
        "Stats": {
            "NumberOfVmsConfigured": 4,
            "NumberOfVmsReplicating": 4,
            "NumberOfVpgsConfigured": 4,
            "NumberOfVpgsReplicating": 4,
            "StorageProvisionedSizeInMB": 36326,
            "StorageProtectedSiteInMB": 36326,
            "AverageRpoInSec": 8,
            "AverageJournalHistoryInSec": 146309,
            "CompressionRatePrecentage": 50,
            "SumRpoInSec": 32
        },
        "ConfiguredSelfVpgs": 0,
        "ConfiguredVmsSelf": 0
    };

    result.RemoteSiteInfo = {
        "Details": {
            "SiteName": "AWS - Ireland",
            "IpAddress": "172.31.12.113",
            "VCenterName": "Pending vcenter connection",
            "CurrentLocalTime": "09:30",
            "ContactInfo": "ZertoTrial",
            "ContactEmail": "",
            "ContactPhone": "",
            "ServerId": {
                "ServerGuid": "00000000-0000-0000-0000-000000000000"
            },
            "Location": "WIN-5QAEGI24KFS",
            "LicenseType": 4,
            "BucketName": ""
        },
        "RemoteInboudStorageInMB": 320,
        "HostsInfo": {
            "NumberOfHosts": 0,
            "NumberOfInstalledHosts": 1
        },
        "Stats": {
            "NumberOfVmsConfigured": 0,
            "NumberOfVmsReplicating": 0,
            "NumberOfVpgsConfigured": 0,
            "NumberOfVpgsReplicating": 0,
            "StorageProvisionedSizeInMB": 0,
            "StorageProtectedSiteInMB": 0,
            "AverageRpoInSec": 0,
            "AverageJournalHistoryInSec": 0,
            "CompressionRatePrecentage": 50,
            "SumRpoInSec": 0
        },
        "ConfiguredSelfVpgs": 0,
        "ConfiguredVmsSelf": 0
    };

    result.RPOMessage = "";
    result.TestInformation = {
        "LastTestMessage": "Last test was performed 2/25/2015 4:17:26 PM on VPG Win",
        "TestIntervalThresholdMessage": "2 VPGs exceeded test interval threshold"
    };

    result.CanManageRemoteSite = true;
    result.LicenseMessage = null;
    result.IsPaired = true;

    //generate graph obj with mock values
    result.Graphs = helper.generateCsv();

    result.State = {
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
    };

    return result;
};